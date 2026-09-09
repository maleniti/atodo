function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// task.log ({ message, timestamp }[]) is the side panel's short activity
// history -- lazily created like task.focusLog, not present on every task
// from the start. Recorded per task record (not per taskId/seriesId); the
// side panel merges every record's log together when it displays "this
// task" or "this series" (see aggregateSidePanelRecords).
function logTaskEvent(task, message) {
  if (!task.log) task.log = [];
  task.log.push({ message, timestamp: Date.now() });
}

// task.comments ({ text, timestamp }[]) -- the side panel's user-entered
// notes, same lazy/per-record storage as task.log above.
function addTaskComment(task, text) {
  if (!task.comments) task.comments = [];
  task.comments.push({ text, timestamp: Date.now() });
}

// window.prompt() has no native implementation on Linux (Chromium doesn't
// provide an OS text-input dialog there), so it silently no-ops. This modal
// replaces it for every case that needs free-text input; confirm() still
// works fine cross-platform and is used as-is for delete confirmations.
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = modalOverlay.querySelector('.modal-title');
const modalFields = modalOverlay.querySelector('.modal-fields');
const modalOk = modalOverlay.querySelector('.modal-ok');
const modalCancel = modalOverlay.querySelector('.modal-cancel');

// Resolved instead of a values object when the modal's delete button (see
// opts.deleteLabel below) is confirmed -- a dedicated Symbol so it can never
// collide with a legitimate field-values result.
const MODAL_DELETE_RESULT = Symbol('modal-delete');

// Stamped (non-enumerably... actually just as a Symbol key, so it never
// shows up in Object.keys/JSON.stringify or collides with a real field name)
// onto the result object when opts.secondaryLabel's button is what was
// clicked, instead of the main OK/okLabel button -- lets a caller offer two
// different submit actions over the same set of fields (e.g. "Set" vs.
// "Start" a timer) without needing a whole second modal.
const MODAL_SECONDARY_RESULT = Symbol('modal-secondary');

// fields: [{ name, label, value, placeholder, required, min, max }] for
// text/date/time/number fields (type defaults to 'text', also accepts
// 'date'/'time'/'number'/'textarea'; min/max only apply to 'number' and are
// native HTML constraints, not enforced beyond what the browser's own number
// input does),
// [{ name, label, type: 'select', options: [{value, label}], value }] for a
// select, or [{ name, label, type: 'checkboxes', options: [{value, label}],
// value: string[] }] for a multi-select (resolves to an array). Fields
// default to required (non-empty / non-empty-array); pass required: false to
// allow blank. Resolves { [field.name]: value } on OK (with result[MODAL_
// SECONDARY_RESULT] set to true if opts.secondaryLabel's button was clicked
// instead), MODAL_DELETE_RESULT if opts.deleteLabel is set and its two-click
// arm/confirm is completed, or null on Cancel/Escape. opts.okLabel/
// cancelLabel/secondaryLabel override/add button text.
function showFormModal(title, fields, opts = {}) {
  return new Promise((resolve) => {
    modalTitle.textContent = title;
    modalFields.innerHTML = '';
    modalOk.textContent = opts.okLabel || 'OK';
    modalCancel.textContent = opts.cancelLabel || 'Cancel';

    // The overlay's DOM (including .modal-actions) is reused across every
    // showFormModal() call in the app, so any delete/secondary button from a
    // previous call must be torn down before conditionally adding a fresh
    // one here.
    const staleDeleteBtn = modalOverlay.querySelector('.modal-delete');
    if (staleDeleteBtn) staleDeleteBtn.remove();
    if (opts.deleteLabel) {
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'modal-delete';
      deleteBtn.textContent = opts.deleteLabel;
      let deleteArmed = false;
      deleteBtn.onclick = () => {
        if (!deleteArmed) {
          deleteArmed = true;
          deleteBtn.textContent = 'Click again to delete';
          deleteBtn.classList.add('confirm');
          return;
        }
        finish(MODAL_DELETE_RESULT);
      };
      deleteBtn.addEventListener('mouseleave', () => {
        if (!deleteArmed) return;
        deleteArmed = false;
        deleteBtn.textContent = opts.deleteLabel;
        deleteBtn.classList.remove('confirm');
      });
      modalCancel.parentElement.insertBefore(deleteBtn, modalCancel);
    }

    const staleSecondaryBtn = modalOverlay.querySelector('.modal-secondary');
    if (staleSecondaryBtn) staleSecondaryBtn.remove();
    let secondaryBtn = null;
    if (opts.secondaryLabel) {
      secondaryBtn = document.createElement('button');
      secondaryBtn.className = 'modal-secondary';
      secondaryBtn.textContent = opts.secondaryLabel;
      secondaryBtn.onclick = () => submit(true);
      modalOk.parentElement.insertBefore(secondaryBtn, modalOk);
    }

    const interactiveEls = [];
    const fieldGetters = [];
    // A `fields` entry is normally a single field spec, each getting its own
    // stacked label+control block. Passing an array instead groups several
    // specs into one shared row (e.g. "[x] Repeats every [N] [unit]") --
    // see .modal-field-inline. Grouped fields skip their own block-style
    // label (there's one shared row, not one per control); a checkbox
    // field's own inline option label still reads fine there on its own.
    for (const entry of fields) {
      const isGroup = Array.isArray(entry);
      const wrap = document.createElement('div');
      wrap.className = 'modal-field' + (isGroup ? ' modal-field-inline' : '');

      if (!isGroup) {
        const label = document.createElement('label');
        label.textContent = entry.label;
        wrap.appendChild(label);
      }

      for (const field of isGroup ? entry : [entry]) {
        // Non-checkbox controls within a group get their own small host
        // element -- disableIf toggles .modal-field-disabled on THIS, not
        // the shared row, so disabling e.g. the interval field doesn't also
        // grey out/disable the checkbox that gates it (they'd otherwise
        // share one element, since disabling is normally a whole-field, i.e.
        // whole-row, affair).
        const host = isGroup && field.type !== 'checkboxes' ? document.createElement('span') : wrap;
        if (host !== wrap) {
          host.className = 'modal-field-inline-item';
          if (field.inlineWidth) host.style.width = field.inlineWidth;
          wrap.appendChild(host);
        }

        let getValue;
        let fieldEls;
        if (field.type === 'select') {
          const select = document.createElement('select');
          select.className = 'modal-input';
          for (const option of field.options) {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            select.appendChild(optionEl);
          }
          if (field.value != null) select.value = field.value;
          host.appendChild(select);
          interactiveEls.push(select);
          fieldEls = [select];
          getValue = () => select.value;
        } else if (field.type === 'checkboxes') {
          const box = document.createElement('div');
          box.className = 'modal-checkboxes';
          const checkboxes = field.options.map((option) => {
            const row = document.createElement('label');
            row.className = 'modal-checkbox-row';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = (field.value || []).includes(option.value);
            cb.dataset.value = option.value;
            row.appendChild(cb);
            const span = document.createElement('span');
            span.textContent = option.label;
            row.appendChild(span);
            box.appendChild(row);
            interactiveEls.push(cb);
            return cb;
          });
          host.appendChild(box);
          fieldEls = checkboxes;
          getValue = () => checkboxes.filter((cb) => cb.checked).map((cb) => cb.dataset.value);
        } else if (field.type === 'textarea') {
          const textarea = document.createElement('textarea');
          textarea.className = 'modal-input modal-textarea';
          textarea.value = field.value || '';
          textarea.placeholder = field.placeholder || '';
          host.appendChild(textarea);
          interactiveEls.push(textarea);
          fieldEls = [textarea];
          getValue = () => textarea.value.trim();
        } else {
          const input = document.createElement('input');
          input.className = 'modal-input';
          input.type = field.type || 'text';
          input.value = field.value || '';
          input.placeholder = field.placeholder || '';
          if (field.min != null) input.min = field.min;
          if (field.max != null) input.max = field.max;
          host.appendChild(input);
          interactiveEls.push(input);
          fieldEls = [input];
          getValue = () => input.value.trim();
        }

        fieldGetters.push({
          getValue,
          name: field.name,
          required: field.required !== false,
          isArray: field.type === 'checkboxes',
          wrap,
          disableTarget: host,
          els: fieldEls,
          showIf: field.showIf,
          disableIf: field.disableIf,
        });
      }

      modalFields.appendChild(wrap);
    }

    // Fields with a `showIf(values)` predicate (e.g. a monthly-only option
    // that's irrelevant unless "Repeats" is set to monthly) are hidden/shown
    // as any field changes, rather than always showing every field
    // regardless of the current selection. A hidden field's own
    // required-ness is ignored on submit, but its value is still included in
    // the result -- so switching frequency back and forth doesn't lose
    // whatever was entered in a temporarily-hidden field. `disableIf(values)`
    // is the same idea but for a field that should stay visible, greyed out
    // and non-interactive instead of disappearing (e.g. a duration that's
    // irrelevant while a "count up instead" checkbox is on, but worth
    // leaving in view for context) -- also exempted from its own
    // required-ness on submit, same as a hidden field.
    function currentValues() {
      const values = {};
      for (const f of fieldGetters) values[f.name] = f.getValue();
      return values;
    }

    function updateVisibility() {
      if (!fieldGetters.some((f) => f.showIf || f.disableIf)) return; // no conditional fields, skip the work
      const values = currentValues();
      for (const f of fieldGetters) {
        if (f.showIf) f.wrap.classList.toggle('modal-field-hidden', !f.showIf(values));
        if (f.disableIf) {
          const disabled = f.disableIf(values);
          f.disableTarget.classList.toggle('modal-field-disabled', disabled);
          f.els.forEach((el) => (el.disabled = disabled));
        }
      }
    }

    modalOverlay.classList.remove('hidden');
    interactiveEls[0].focus(); // select-all-on-focus (except textareas) is handled generically by sharedInputBehavior.js
    updateVisibility();

    function finish(result) {
      modalOverlay.classList.add('hidden');
      modalOk.onclick = null;
      modalCancel.onclick = null;
      if (secondaryBtn) secondaryBtn.onclick = null;
      interactiveEls.forEach((el) => {
        el.onkeydown = null;
        el.onchange = null;
        el.oninput = null;
      });
      resolve(result);
    }

    function submit(secondary) {
      const result = {};
      for (const f of fieldGetters) {
        const value = f.getValue();
        const visible = !f.wrap.classList.contains('modal-field-hidden');
        const enabled = !f.disableTarget.classList.contains('modal-field-disabled');
        if (visible && enabled && f.required && (f.isArray ? value.length === 0 : !value)) return;
        result[f.name] = value;
      }
      if (secondary) result[MODAL_SECONDARY_RESULT] = true;
      finish(result);
    }

    modalOk.onclick = () => submit(false);
    modalCancel.onclick = () => finish(null);
    interactiveEls.forEach((el) => {
      el.onchange = updateVisibility;
      el.oninput = updateVisibility;
      el.onkeydown = (e) => {
        if (e.key === 'Enter' && el.tagName !== 'TEXTAREA') submit(false);
        if (e.key === 'Escape') {
          e.stopPropagation(); // don't let other Escape handlers also fire
          finish(null);
        }
      };
    });
  });
}

// ---------------------------------------------------------------------------
// Auth -- entirely fake for now; there's no backend yet to actually check
// credentials against or issue real tokens. login()/getMe() have the same
// async, token-in/token-out shape a real backend's equivalent endpoints
// will eventually have, so swapping their bodies for real fetch() calls
// later shouldn't need to touch any caller. Every username/password
// combination "succeeds" and resolves to the one real user (FAKE_USER_ID).
// The token itself is a base64'd JSON blob (not a real JWT -- there's no
// signature, nothing else to actually verify it), just enough structure
// that a real backend swap only changes what's inside, not how it's used.
// ---------------------------------------------------------------------------

const AUTH_TOKEN_KEY = 'advanced-todo-auth-token';
const FAKE_USER_ID = 'nikola';

async function login(username, password) {
  return { token: btoa(JSON.stringify({ sub: FAKE_USER_ID, issuedAt: Date.now() })) };
}

async function getMe(token) {
  const payload = JSON.parse(atob(token));
  return { id: payload.sub };
}

// Set once boot()/the login form resolves a user -- every call site below
// that needs "the current user" (loadTasks/saveTasks) defaults to it rather
// than requiring every one of the app's many saveTasks() call sites to pass
// it explicitly, while still accepting an explicit userId for whenever a
// real backend (and maybe switching accounts) exists.
let currentUserId = null;

// ---------------------------------------------------------------------------
// To-do list.
// ---------------------------------------------------------------------------

const TASKS_STORAGE_KEY = 'advanced-todo-tasks';
const ACTIVE_TASK_STORAGE_KEY = 'advanced-todo-active-task';
const ACTIVE_OCCURRENCE_STORAGE_KEY = 'advanced-todo-active-occurrence';

// SHORTCUT: userId is accepted but ignored -- there's only one real user
// until a backend exists, so this always reads/writes the same single
// shared blob regardless of which userId is passed. Upgrading to a real
// per-user backend means replacing the body here (and in saveTasks) with a
// fetch() keyed by userId; every caller already passes one.
function loadTasks(userId = currentUserId) {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (raw) {
      const loaded = JSON.parse(raw);
      // Backward compatibility: tasks saved before seriesId/taskId existed
      // each get their own fresh one -- they were never part of a split, so
      // there's no correct value to backfill beyond "distinct from
      // everything else".
      for (const task of loaded) {
        if (!task.seriesId) task.seriesId = uid();
        if (!task.taskId) task.taskId = uid();
      }
      return loaded;
    }
  } catch {
    // fall through to empty
  }
  return [];
}

// Populated once startApp() runs (after boot()/login resolves a user), not
// at script-load time -- there's nothing to load until then.
let tasks = [];
let activeTaskId = localStorage.getItem(ACTIVE_TASK_STORAGE_KEY) || null;
// Which occurrence of activeTaskId is focused -- a recurring task can show
// up to three rows at once (yesterday's still-overdue one, today's, and
// tomorrow's preview -- see computeTodoDisplayItems/computeNextRecurrenceItems),
// and only the one actually clicked (via its "Work on this now" button or
// the context menu's Focus item) should end up highlighted/eligible, not
// every row sharing the same task. null whenever activeTaskId is null.
let activeOccurrenceDate = activeTaskId ? localStorage.getItem(ACTIVE_OCCURRENCE_STORAGE_KEY) || null : null;

// Wall-clock timestamp since the active task started being focused WITHOUT a
// timer running -- the focus-only counterpart of a timer's own runningSince.
// In-memory only (unlike activeTaskId/timers, an interrupted no-timer focus
// session isn't worth persisting/resuming across a reload): null whenever
// there's no such session live, i.e. whenever there's no active task or the
// active task has a timer instead (see flushFocusOnlyElapsed/setActiveTaskId).
let activeFocusOnlySince = null;

// SHORTCUT: see loadTasks above -- userId is accepted but ignored for now.
function saveTasks(userId = currentUserId) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function saveActiveTaskId() {
  if (activeTaskId) localStorage.setItem(ACTIVE_TASK_STORAGE_KEY, activeTaskId);
  else localStorage.removeItem(ACTIVE_TASK_STORAGE_KEY);
  if (activeOccurrenceDate) localStorage.setItem(ACTIVE_OCCURRENCE_STORAGE_KEY, activeOccurrenceDate);
  else localStorage.removeItem(ACTIVE_OCCURRENCE_STORAGE_KEY);
}

// A task's timer only actually counts down while its task is the active one
// (see currentTimerRemaining/freezeTimer below) -- every place that changes
// activeTaskId (the user marking/un-marking a task as the one being worked
// on, deleting the active task, or auto-clearing one that's no longer
// eligible) goes through here instead of assigning it directly, so the
// outgoing task's timer (if any)
// gets checkpointed and the incoming one (if any) starts ticking again,
// uniformly, in exactly one place. A task's own "resume"/"pause" timer
// actions are really just this same active-task change, worded for the
// timer instead of the generic "work on this now" button (see the todo
// context menu). `occurrenceDate` (ignored when newId is null) is which of
// the task's currently-shown rows this applies to -- see
// activeOccurrenceDate. Compared alongside newId for the no-op check below,
// since re-focusing the very same task but a different one of its own
// occurrences (e.g. switching from yesterday's still-overdue row to
// today's) is a real change, not a no-op.
function setActiveTaskId(newId, occurrenceDate) {
  if (newId === activeTaskId && occurrenceDate === activeOccurrenceDate) return;
  const prevTask = tasks.find((t) => t.id === activeTaskId);
  if (prevTask) {
    if (prevTask.timer) {
      flushTimerElapsed(prevTask); // log this run's elapsed time before freezeTimer erases runningSince
      freezeTimer(prevTask.timer);
    } else {
      flushFocusOnlyElapsed(prevTask);
    }
    logTaskEvent(prevTask, 'Unfocused');
  }
  activeTaskId = newId;
  activeOccurrenceDate = newId ? occurrenceDate : null;
  saveActiveTaskId();
  const nextTask = tasks.find((t) => t.id === activeTaskId);
  if (nextTask) {
    // Only actually resume the timer if it belongs to the occurrence being
    // focused now -- nextTask can be the very same task object as prevTask
    // above (switching which of a recurring task's own occurrences is
    // focused, not switching task entirely), whose timer was just frozen a
    // moment ago but still tagged to the *previous* occurrence. Without this
    // check it would immediately un-pause again here, ticking away on an
    // occurrence that no longer shows as focused.
    if (timerMatchesOccurrence(nextTask.timer, activeOccurrenceDate)) nextTask.timer.runningSince = Date.now();
    else activeFocusOnlySince = Date.now();
    logTaskEvent(nextTask, 'Focused');
  }
  saveTasks();
}

// task.focusLog is per-occurrence -- { [occurrenceDate]: { focusedSeconds,
// timerSeconds } }. `occurrenceDate`, if given (a timer session always has
// one, see task.timer.occurrenceDate; so does a focus-only session, see
// activeOccurrenceDate), is exactly which occurrence to credit; otherwise it
// falls back to whichever is currently pending for the task (today's, if it
// has one, otherwise the most recent carried-over one) -- kept only for
// robustness against a caller that genuinely has no specific occurrence in
// mind, not exercised by either of this app's own call sites anymore.
// Session lengths are flushed in here rather than measured after the fact,
// so a focus-only session that happens to straddle midnight is simply
// credited to whatever occurrence is current at flush time -- not worth the
// bookkeeping needed to split it precisely.
function addFocusStat(task, kind, seconds, occurrenceDate) {
  if (!(seconds > 0)) return;
  const date = occurrenceDate || Recurrence.mostRecentOccurrenceOnOrBefore(task, Recurrence.dateToISO(new Date())) || task.dueDate;
  if (!task.focusLog) task.focusLog = {};
  if (!task.focusLog[date]) task.focusLog[date] = { focusedSeconds: 0, timerSeconds: 0 };
  task.focusLog[date][kind] += seconds;
}

// Logs whatever a currently-running timer has accumulated since it last
// started/resumed -- called right before anything that would otherwise lose
// that span: the task losing active status (freezeTimer, which only
// checkpoints remainingSeconds, not the stats log), or the timer being
// cancelled outright. A no-op for an already-paused timer (runningSince ==
// null): its elapsed time up to the pause was already flushed when it was
// paused. Credited to the specific occurrence the timer was started against
// (task.timer.occurrenceDate) rather than recomputed from today's date, so
// it can't drift to a different occurrence than the one actually worked --
// e.g. a timer started against yesterday's still-overdue occurrence stays
// credited to yesterday even if it's flushed after midnight.
function flushTimerElapsed(task) {
  if (task.timer && task.timer.runningSince != null) {
    addFocusStat(task, 'timerSeconds', (Date.now() - task.timer.runningSince) / 1000, task.timer.occurrenceDate);
  }
}

// Logs whatever the active-but-timerless task has accumulated since it (or a
// since-cancelled timer on it, see cancelTaskTimer) started this focus-only
// session. A no-op if there's no such session live.
function flushFocusOnlyElapsed(task) {
  if (activeFocusOnlySince != null) {
    addFocusStat(task, 'focusedSeconds', (Date.now() - activeFocusOnlySince) / 1000, activeOccurrenceDate);
    activeFocusOnlySince = null;
  }
}

// Hard ceiling on how long any single timer -- counting down, counting up,
// or counting down and past zero into overtime -- is allowed to run before
// it's automatically stopped (see expireFinishedTimers). A plain countdown
// is already kept under this via the minutes field's own max (see
// startTaskTimerPrompt), but count-up and past-zero-overtime timers have no
// other natural end, so this is what actually bounds those two.
const MAX_TIMER_MINUTES = 360;
const MAX_TIMER_SECONDS = MAX_TIMER_MINUTES * 60;

// A timer's remaining time is derived from a fixed checkpoint
// (remainingSeconds) plus, only while actually running, elapsed wall-clock
// time since runningSince -- not a plain JS countdown -- so it keeps
// counting correctly across a page reload (runningSince survives in
// localStorage as an absolute timestamp) without drifting. Deliberately
// unclamped -- it goes negative once a countdown timer with
// continuePastZero runs past its planned duration, and a count-up timer
// (totalSeconds 0) is negative from the very first tick, its magnitude
// being exactly how long it's been running (see timerElapsedSeconds).
function currentTimerRemaining(timer) {
  if (timer.runningSince == null) return timer.remainingSeconds;
  const elapsed = (Date.now() - timer.runningSince) / 1000;
  return timer.remainingSeconds - elapsed;
}

// How long a timer has actually been running, regardless of mode -- for a
// plain countdown this is just totalSeconds - remaining; the same formula
// happens to also give a count-up timer's elapsed time (its totalSeconds is
// 0, so remaining is already -elapsed) and a past-zero countdown's overtime
// included (remaining already went negative on its own).
function timerElapsedSeconds(timer) {
  return timer.totalSeconds - currentTimerRemaining(timer);
}

// The progress bar (see buildTodoItemRow) normally empties out as a
// countdown approaches its planned duration. That stops being meaningful
// once there's no planned duration to count down to -- a count-up timer, or
// a countdown that's run past zero into overtime -- so it switches to
// filling up toward the absolute MAX_TIMER_SECONDS cap instead. Callers
// still clamp the result to [0, 100] themselves (elapsed can start already
// past totalSeconds on the very first render of a resumed overtime timer).
function timerProgressPercent(timer) {
  const remaining = currentTimerRemaining(timer);
  if (timer.mode === 'countup' || remaining < 0) {
    return (timerElapsedSeconds(timer) / MAX_TIMER_SECONDS) * 100;
  }
  return (remaining / timer.totalSeconds) * 100;
}

// A recurring task can show up to three rows at once for the same task
// object (yesterday's still-overdue occurrence, today's, and tomorrow's
// preview -- see computeTodoDisplayItems/computeNextRecurrenceItems), but a
// timer only ever belongs to whichever single occurrence it was started
// against (task.timer.occurrenceDate, see startTaskTimerPrompt) -- this is
// what decides both which row renders the countdown (see timerBelongsToItem)
// and, in setActiveTaskId, whether focusing a given occurrence is allowed to
// resume it. Falls back to matching today's date for a timer saved before
// occurrenceDate existed (undefined there), since that's what this app has
// always effectively meant by "the" occurrence up to now.
function timerMatchesOccurrence(timer, occurrenceDate) {
  if (!timer) return false;
  if (timer.occurrenceDate != null) return timer.occurrenceDate === occurrenceDate;
  return occurrenceDate === Recurrence.dateToISO(new Date());
}

function timerBelongsToItem(item) {
  return timerMatchesOccurrence(item.task.timer, item.occurrenceDate);
}

// Snapshots a running timer's current remaining time back into
// remainingSeconds and stops it counting -- called right before whatever
// would otherwise invalidate runningSince's "still ticking" meaning (the
// task losing active status, or the timer being paused/cancelled outright).
function freezeTimer(timer) {
  timer.remainingSeconds = currentTimerRemaining(timer);
  timer.runningSince = null;
}

function formatTimerDuration(totalSeconds) {
  const seconds = Math.round(totalSeconds);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const parts = [];
  if (m > 0) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  if (s > 0 || m === 0) parts.push(`${s} second${s === 1 ? '' : 's'}`);
  return parts.join(' ');
}

// Same idea as formatTimerDuration but spelling out hours too (a count-up or
// overtime timer can run for hours, where "360 minutes" reads far worse than
// "6 hours 0 minutes") and always including every unit down to seconds, per
// the "Total elapsed time is X hours Y minutes Z seconds" wording it's used
// for (see buildTodoItemRow).
function formatElapsedDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h} hour${h === 1 ? '' : 's'}`);
  if (h > 0 || m > 0) parts.push(`${m} minute${m === 1 ? '' : 's'}`);
  parts.push(`${s} second${s === 1 ? '' : 's'}`);
  return parts.join(' ');
}

// "Timer..." on the to-do context menu -- prompts for a duration (capped at
// 360 minutes/6 hours) and, if confirmed, starts it and marks the task
// active (see setActiveTaskId), same as clicking its "Work on this now"
// button would. "Count up" swaps it for an open-ended stopwatch instead (the
// duration field is meaningless then, so it's disabled rather than hidden --
// still there for context, just inert); "Continue counting down past zero"
// (on by default) keeps a countdown running as overtime instead of stopping
// it the moment it hits zero. Both open-ended cases are still bounded by
// MAX_TIMER_SECONDS (see expireFinishedTimers) -- "no fixed duration" isn't
// the same as "no limit". `occurrenceDate` is whichever row's context menu
// this was opened from -- stamped onto the timer so it displays (and its
// stats get credited, see flushTimerElapsed) against only that one
// occurrence, not every row currently showing this task (a recurring task
// can show up to three at once: yesterday's still-overdue one, today's, and
// tomorrow's preview).
async function startTaskTimerPrompt(task, occurrenceDate) {
  const result = await showFormModal(
    'Set a timer',
    [
      {
        name: 'countUp',
        label: '',
        type: 'checkboxes',
        value: [],
        required: false,
        options: [{ value: 'countUp', label: 'Count up (no fixed duration -- stops automatically after 6 hours)' }],
      },
      {
        name: 'minutes',
        label: 'Minutes to work on this task',
        type: 'number',
        value: '25',
        min: 1,
        max: MAX_TIMER_MINUTES,
        disableIf: (v) => v.countUp.length > 0,
      },
      {
        name: 'continuePastZero',
        label: '',
        type: 'checkboxes',
        value: ['continuePastZero'],
        required: false,
        options: [{ value: 'continuePastZero', label: 'Continue counting down past zero instead of stopping' }],
        disableIf: (v) => v.countUp.length > 0,
      },
    ],
    { okLabel: 'Start', secondaryLabel: 'Set' }
  );
  if (!result) return;
  const countUp = result.countUp.length > 0;
  let totalSeconds = 0;
  if (!countUp) {
    const minutes = Math.min(MAX_TIMER_MINUTES, Math.max(1, Math.round(Number(result.minutes)) || 0));
    if (!minutes) return;
    totalSeconds = minutes * 60;
  }

  // "Set" attaches the timer without starting or focusing anything --
  // runningSince stays null, exactly like a paused timer (see freezeTimer),
  // so it just sits there until the user starts it themselves. That's
  // already exactly what focusing the task does for any task with an
  // unstarted/paused timer (see setActiveTaskId's nextTask.timer branch --
  // the same mechanism "Resume timer" on the context menu uses), so no
  // separate start-on-focus logic is needed here.
  if (result[MODAL_SECONDARY_RESULT]) {
    task.timer = {
      mode: countUp ? 'countup' : 'countdown',
      continuePastZero: result.continuePastZero.length > 0,
      totalSeconds,
      remainingSeconds: totalSeconds,
      runningSince: null,
      occurrenceDate,
    };
    logTaskEvent(task, 'Timer set');
    saveTasks();
    renderTodo();
    return;
  }

  // If this task was already the active one, on this same occurrence,
  // focus-only (no timer yet -- e.g. "Work on this now" was clicked first,
  // or a previous timer on it was cancelled but it stayed active), that
  // focus-only session's elapsed time needs logging now: setActiveTaskId
  // below is a same-task-and-occurrence no-op in that case and would never
  // otherwise flush it. (If it was active on a *different* occurrence of
  // this same task, that's a real switch, not a no-op -- setActiveTaskId
  // below handles flushing that one itself.)
  if (task.id === activeTaskId && activeOccurrenceDate === occurrenceDate && !task.timer) flushFocusOnlyElapsed(task);
  // runningSince is set here directly, not left for setActiveTaskId below to
  // fill in -- if this task+occurrence was already the active one (e.g. it
  // stayed active after a previous timer on it was cancelled), setActiveTaskId
  // is a no-op and would never start this brand-new timer ticking.
  task.timer = {
    mode: countUp ? 'countup' : 'countdown',
    continuePastZero: result.continuePastZero.length > 0,
    totalSeconds,
    remainingSeconds: totalSeconds,
    runningSince: Date.now(),
    occurrenceDate,
  };
  logTaskEvent(task, 'Timer set');
  saveTasks();
  setActiveTaskId(task.id, occurrenceDate);
  renderTodo();
}

// Cancelling logs whatever the timer's current run (if any) had already
// accumulated -- only the elapsed portion, not the whole timer -- rather
// than just discarding it; see flushTimerElapsed. If the task is still
// active afterward (cancelling doesn't itself un-focus it, just removes the
// timer), it keeps being focused, now in plain focus-only mode.
function cancelTaskTimer(task) {
  flushTimerElapsed(task);
  task.timer = null;
  logTaskEvent(task, 'Timer cancelled');
  if (task.id === activeTaskId) activeFocusOnlySince = Date.now();
  saveTasks();
  renderTodo();
}

// A right-clicked to-do task's own menu -- built fresh per click (there's
// nothing to keep around between clicks, unlike a toggle's show/hide),
// closed on the next click anywhere or Escape.
let activeTodoContextMenu = null;

function closeTodoContextMenu() {
  if (!activeTodoContextMenu) return;
  activeTodoContextMenu.remove();
  activeTodoContextMenu = null;
}
// Right-clicking a different task while one of these is already open closes
// this one first via showTodoContextMenu's own call to this -- there's no
// separate document-level 'contextmenu' listener for that (a right-click
// bubbles up through the row that opened this in the first place, so a
// document-wide listener would immediately close the very menu that same
// event just opened).
document.addEventListener('click', closeTodoContextMenu);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeTodoContextMenu();
});

// canWorkOnNow mirrors the row's own "Work on this now" button eligibility
// (see buildTodoItemRow) -- starting/resuming a timer or focusing marks the
// task active the same way that button does, so they're all gated
// identically. A timer that already exists can always be cancelled
// regardless, even if the task somehow stopped being eligible in the
// meantime. Everything except Task stats/Edit is hidden entirely for a
// not-yet-due tomorrow/upcoming preview row -- there's nothing to mark
// done/failed, hide, or focus on something that isn't due yet.
function showTodoContextMenu(event, item, canWorkOnNow) {
  const { task, occurrenceDate, completed, failed, kind } = item;
  // Whether THIS row's own occurrence, specifically, is the focused one --
  // not just whether the task is focused on some other occurrence of itself
  // (a recurring task can show up to three rows at once; see
  // activeOccurrenceDate).
  const isActiveHere = task.id === activeTaskId && activeOccurrenceDate === occurrenceDate;
  closeTodoContextMenu();
  const menu = document.createElement('div');
  menu.className = 'todo-context-menu';

  // Fixed display order: timer controls, then state actions (done/failed,
  // focus, show/hide), then edit, then stats -- each its own group,
  // separated by a divider. Groups are collected first and rendered after,
  // so an empty group (e.g. no timer eligible) just drops out instead of
  // leaving a stray/doubled-up separator next to its neighbor.
  const groups = [[], [], [], []];
  function addItem(groupIndex, label, onClick) {
    groups[groupIndex].push({ label, onClick });
  }

  // Gated on timerBelongsToItem(item), not just task.timer -- a task only
  // ever has one timer slot, but it's tagged to a single occurrence (see
  // timerMatchesOccurrence), so a row whose occurrence *isn't* the one the
  // timer belongs to is treated the same as having no timer at all: offering
  // "Timer" there would start a fresh one (replacing whatever's parked on
  // the other occurrence), not touch that other one. Without this, "Cancel
  // timer" on this row could delete a timer that actually belongs to (and is
  // still shown ticking or paused on) a completely different occurrence of
  // the same recurring task.
  const isFutureItem = kind === 'tomorrow' || kind === 'upcoming';
  const timerIsHere = timerBelongsToItem(item);
  if (isFutureItem) {
    // Nothing below applies to a not-yet-due preview -- see above.
  } else if (!timerIsHere) {
    if (canWorkOnNow) addItem(0, 'Timer', () => startTaskTimerPrompt(task, occurrenceDate));
  } else if (isActiveHere) {
    addItem(0, 'Pause timer', () => {
      setActiveTaskId(null);
      renderTodo();
    });
    addItem(0, 'Cancel timer', () => cancelTaskTimer(task));
  } else {
    if (canWorkOnNow) {
      addItem(0, 'Resume timer', () => {
        setActiveTaskId(task.id, occurrenceDate);
        renderTodo();
      });
    }
    addItem(0, 'Cancel timer', () => cancelTaskTimer(task));
  }

  if (!isFutureItem) {
    if (!task.passive && !completed) {
      addItem(1, 'Mark as done', () => toggleTaskCompletion(task, occurrenceDate));
    }
    if (task.passive && !failed) {
      addItem(1, 'Mark as failed', () => toggleTaskFailedMark(task, occurrenceDate));
    }

    if (canWorkOnNow && !isActiveHere) {
      addItem(1, 'Focus', () => {
        setActiveTaskId(task.id, occurrenceDate);
        renderTodo();
      });
    }
    if (isActiveHere) {
      addItem(1, 'Unfocus', () => {
        setActiveTaskId(null);
        renderTodo();
      });
    }

    if (kind === 'carried-over') {
      if (task.dismissed[occurrenceDate]) {
        addItem(1, 'Show', () => restoreOccurrence(task, occurrenceDate));
      } else {
        addItem(1, 'Hide', () => dismissOccurrence(task, occurrenceDate));
      }
    }
  }

  addItem(2, 'Edit', () => editTaskOccurrence(task, occurrenceDate));
  addItem(3, 'Task stats', () => showTaskStatsModal(task));

  for (const group of groups) {
    if (!group.length) continue;
    if (menu.children.length) {
      const sep = document.createElement('div');
      sep.className = 'menu-separator';
      menu.appendChild(sep);
    }
    for (const { label, onClick } of group) {
      const el = document.createElement('div');
      el.className = 'menu-item';
      el.textContent = label;
      el.onclick = (e) => {
        e.stopPropagation();
        closeTodoContextMenu();
        onClick();
      };
      menu.appendChild(el);
    }
  }

  if (!menu.children.length) return;

  document.body.appendChild(menu);
  activeTodoContextMenu = menu;
  // Measured after appending (so it has real dimensions) but before
  // positioning it, so this can clamp to the viewport without an
  // additional reflow the user would see as a jump.
  const rect = menu.getBoundingClientRect();
  const x = Math.max(4, Math.min(event.clientX, window.innerWidth - rect.width - 4));
  const y = Math.max(4, Math.min(event.clientY, window.innerHeight - rect.height - 4));
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
}

// `extra` carries the task form's weekly/monthly sub-fields (weekdays,
// monthlyMode, monthlyOffset, monthlyWeekday, monthlyOrdinal,
// multiWeekdayDays, multiWeekdayOrdinal, multiWeekdayOffsetDirection,
// multiWeekdayOffsetDays) -- folded into the decoded frequency only when
// they're actually relevant to the chosen type, so e.g. leftover monthly
// fields from switching the unit back and forth don't leak into a plain
// weekly/daily task. `type` is 'days'/'weeks'/'months' directly (the
// "Repeats every N ..." unit dropdown's own value) -- there's no longer a
// separate "daily"/"custom-days"-style shortcut to decode, since N is
// always its own editable field now rather than implied-1-unless-picking-
// the-"every N" option.
function decodeFrequency(type, intervalStr, extra = {}) {
  const interval = Math.max(1, parseInt(intervalStr, 10) || 1);
  const base = { type, interval };

  if (base.type === 'weeks' && extra.weekdays && extra.weekdays.length > 0) {
    base.weekdays = extra.weekdays.map(Number).sort((a, b) => a - b);
  }
  if (base.type === 'months' && extra.monthlyMode && extra.monthlyMode !== 'day') {
    base.dayMode = extra.monthlyMode;
    if (extra.monthlyMode === 'before-last') {
      base.offset = Math.min(3, Math.max(0, parseInt(extra.monthlyOffset, 10) || 0));
    } else if (extra.monthlyMode === 'weekday') {
      base.weekday = Number(extra.monthlyWeekday);
      base.ordinal = extra.monthlyOrdinal === 'last' ? 'last' : parseInt(extra.monthlyOrdinal, 10);
    } else if (extra.monthlyMode === 'multi-weekday' || extra.monthlyMode === 'multi-weekday-offset') {
      base.weekdays = (extra.multiWeekdayDays || []).map(Number).sort((a, b) => a - b);
      base.ordinal = Math.max(1, parseInt(extra.multiWeekdayOrdinal, 10) || 1);
      if (extra.monthlyMode === 'multi-weekday-offset') {
        base.offsetDirection = extra.multiWeekdayOffsetDirection === 'after' ? 'after' : 'before';
        base.offsetDays = Math.min(6, Math.max(0, parseInt(extra.multiWeekdayOffsetDays, 10) || 0));
      }
    } else if (extra.monthlyMode === 'multi-day') {
      base.days = (extra.multiDayDays || []).map(Number).sort((a, b) => a - b);
    }
  }
  return base;
}

const WEEKDAY_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORDINAL_LABELS = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', last: 'last' };

// ORDINAL_LABELS only covers the single-weekday "Nth weekday" mode's range
// (1-5, or 'last') -- the multi-weekday modes' ordinal isn't capped there,
// so this falls back to a generic 1st/2nd/3rd/nth suffix for anything else.
function ordinalLabel(n) {
  if (ORDINAL_LABELS[n]) return ORDINAL_LABELS[n];
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function describeTaskSchedule(task) {
  const freq = task.frequency;
  let label;
  if (freq.type === 'once') {
    label = 'Once';
  } else if (freq.type === 'days') {
    label = freq.interval === 1 ? 'Daily' : `Every ${freq.interval} days`;
  } else if (freq.type === 'weeks') {
    const base = freq.interval === 1 ? 'Weekly' : `Every ${freq.interval} weeks`;
    label =
      freq.weekdays && freq.weekdays.length > 0
        ? `${base} on ${freq.weekdays.map((d) => WEEKDAY_SHORT_NAMES[d]).join('/')}`
        : base;
  } else if (freq.type === 'months') {
    const base = freq.interval === 1 ? 'Monthly' : `Every ${freq.interval} months`;
    if (freq.dayMode === 'last') {
      label = `${base}, last day`;
    } else if (freq.dayMode === 'before-last') {
      label = freq.offset === 0 ? `${base}, last day` : `${base}, ${freq.offset} day(s) before last`;
    } else if (freq.dayMode === 'weekday') {
      label = `${base}, ${ordinalLabel(freq.ordinal)} ${WEEKDAY_SHORT_NAMES[freq.weekday]}`;
    } else if (freq.dayMode === 'multi-weekday') {
      label = `${base}, earliest ${ordinalLabel(freq.ordinal)} of ${freq.weekdays.map((d) => WEEKDAY_SHORT_NAMES[d]).join('/')}`;
    } else if (freq.dayMode === 'multi-weekday-offset') {
      label =
        freq.offsetDays === 0
          ? `${base}, earliest ${ordinalLabel(freq.ordinal)} of ${freq.weekdays.map((d) => WEEKDAY_SHORT_NAMES[d]).join('/')}`
          : `${base}, ${freq.offsetDays} day(s) ${freq.offsetDirection} earliest ${ordinalLabel(freq.ordinal)} of ${freq.weekdays.map((d) => WEEKDAY_SHORT_NAMES[d]).join('/')}`;
    } else if (freq.dayMode === 'multi-day') {
      label = `${base}, on day(s) ${freq.days.join(', ')}`;
    } else {
      label = base;
    }
  } else {
    label = '';
  }
  const scheduleBase = `${task.dueDate} ${task.allDay ? 'all day' : task.dueTime} · ${label}`;
  const withEnd = task.endDate ? `${scheduleBase} until ${task.endDate}` : scheduleBase;
  if (task.passive) return `${withEnd} · Passive (reminder only)`;
  if (task.appointment) return `${withEnd} · Appointment (expires)`;
  return withEnd;
}

// The "Repeats every N ..." unit dropdown -- see the 'repeats' field group
// in openTaskForm. No "once" option: that's the group's own checkbox.
const FREQUENCY_OPTIONS = [
  { value: 'days', label: 'day(s)' },
  { value: 'weeks', label: 'week(s)' },
  { value: 'months', label: 'month(s)' },
];

const WEEKDAY_CHECKBOX_OPTIONS = [
  { value: '0', label: 'Sun' },
  { value: '1', label: 'Mon' },
  { value: '2', label: 'Tue' },
  { value: '3', label: 'Wed' },
  { value: '4', label: 'Thu' },
  { value: '5', label: 'Fri' },
  { value: '6', label: 'Sat' },
];

const WEEKDAY_SELECT_OPTIONS = [
  { value: '0', label: 'Sunday' },
  { value: '1', label: 'Monday' },
  { value: '2', label: 'Tuesday' },
  { value: '3', label: 'Wednesday' },
  { value: '4', label: 'Thursday' },
  { value: '5', label: 'Friday' },
  { value: '6', label: 'Saturday' },
];

const MONTHLY_MODE_OPTIONS = [
  { value: 'day', label: 'Same day of month as due date' },
  { value: 'last', label: 'Last day of month' },
  { value: 'before-last', label: 'N days before last day of month' },
  { value: 'weekday', label: 'Nth weekday of month' },
  { value: 'multi-weekday', label: 'Earliest Nth occurrence of any of the selected days' },
  { value: 'multi-weekday-offset', label: 'N days before/after earliest Nth occurrence of any of the selected days' },
  { value: 'multi-day', label: 'Multiple days of month (1-28)' },
];

// Capped at 28 (not 31) so every selected day exists in every month --
// avoids the ambiguity of what a 30th or 31st should do in a 28/29/30-day
// month (unlike dayMode 'day', which has an explicit clamp-to-last-day rule
// for exactly that case; a multi-day list has no single anchor day to
// clamp, so this just sidesteps the question instead).
const MONTH_DAY_CHECKBOX_OPTIONS = Array.from({ length: 28 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

const BEFORE_AFTER_OPTIONS = [
  { value: 'before', label: 'Before' },
  { value: 'after', label: 'After' },
];

const ORDINAL_OPTIONS = [
  { value: '1', label: '1st' },
  { value: '2', label: '2nd' },
  { value: '3', label: '3rd' },
  { value: '4', label: '4th' },
  { value: '5', label: '5th' },
  { value: 'last', label: 'Last' },
];

// Both take the form's whole current values object (not just frequencyType)
// so they also gate on the 'repeats' checkbox -- otherwise the weekly/
// monthly sub-fields could stay visible from a leftover unit selection even
// after unchecking "Repeats every".
const isWeeklyFrequencyType = (v) => v.repeats.length > 0 && v.frequencyType === 'weeks';
const isMonthlyFrequencyType = (v) => v.repeats.length > 0 && v.frequencyType === 'months';
const isMultiWeekdayMonthlyMode = (monthlyMode) => monthlyMode === 'multi-weekday' || monthlyMode === 'multi-weekday-offset';

// `splitContext` (only ever set together with an existingTask) is
// `{ occurrenceDate, scope }` -- present when editing a recurring task via
// the "only this occurrence" / "this and following occurrences" choice (see
// showEditScopeChoice below), rather than the whole series in place. It
// changes the modal's title and, on save, routes to applySplitEdit() instead
// of mutating existingTask directly. The due date shown/edited is the
// specific occurrence being split off, not the series' original anchor date.
// `initialDueDate` only applies to a brand-new task (no existingTask) --
// used by each to-do day header's own "+" button so the form opens
// pre-filled with that day's date instead of always defaulting to today.
async function openTaskForm(existingTask, splitContext, initialDueDate, seriesOptions = {}) {
  const formTitle = splitContext
    ? splitContext.scope === 'instance'
      ? 'Edit this occurrence'
      : 'Edit this and following occurrences'
    : existingTask
      ? 'Edit task'
      : 'Add task';
  const formDueDate = splitContext
    ? splitContext.occurrenceDate
    : existingTask
      ? existingTask.dueDate
      : initialDueDate || Recurrence.dateToISO(new Date());
  const result = await showFormModal(
    formTitle,
    [
      { name: 'name', label: 'Name', value: existingTask ? existingTask.name : seriesOptions.nameDefault || '' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        value: existingTask ? existingTask.description : '',
        required: false,
      },
      {
        name: 'details',
        label: 'Details',
        type: 'textarea',
        value: existingTask ? existingTask.details : '',
        required: false,
      },
      {
        name: 'dueDate',
        label: 'Due date',
        type: 'date',
        value: formDueDate,
      },
      {
        name: 'allDay',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.allDay ? ['allDay'] : [],
        options: [{ value: 'allDay', label: 'All day (no specific time)' }],
        required: false,
      },
      {
        name: 'dueTime',
        label: 'Due time',
        type: 'time',
        value: existingTask ? existingTask.dueTime || '18:00' : '18:00',
        showIf: (v) => v.allDay.length === 0,
      },
      [
        {
          name: 'repeats',
          type: 'checkboxes',
          value: existingTask && existingTask.frequency.type !== 'once' ? ['repeats'] : [],
          options: [{ value: 'repeats', label: 'Repeats every' }],
          required: false,
        },
        {
          name: 'interval',
          type: 'number',
          value: existingTask ? String(existingTask.frequency.interval || 1) : '1',
          min: 1,
          required: false,
          inlineWidth: '64px',
          disableIf: (v) => v.repeats.length === 0,
        },
        {
          name: 'frequencyType',
          type: 'select',
          value: existingTask && existingTask.frequency.type !== 'once' ? existingTask.frequency.type : 'days',
          options: FREQUENCY_OPTIONS,
          inlineWidth: '100px',
          disableIf: (v) => v.repeats.length === 0,
        },
      ],
      {
        name: 'weekdays',
        label: "Also recur on these days (weekly only; leave blank to just use the due date's weekday)",
        type: 'checkboxes',
        value: existingTask && existingTask.frequency.weekdays ? existingTask.frequency.weekdays.map(String) : [],
        options: WEEKDAY_CHECKBOX_OPTIONS,
        required: false,
        showIf: (v) => isWeeklyFrequencyType(v),
      },
      {
        name: 'monthlyMode',
        label: 'Monthly pattern',
        type: 'select',
        value: existingTask ? existingTask.frequency.dayMode || 'day' : 'day',
        options: MONTHLY_MODE_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v),
      },
      {
        name: 'monthlyOffset',
        label: 'Days before last day of month (0-3)',
        value: existingTask && existingTask.frequency.offset != null ? String(existingTask.frequency.offset) : '0',
        required: false,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'before-last',
      },
      {
        name: 'monthlyWeekday',
        label: 'Day of week',
        type: 'select',
        value: existingTask && existingTask.frequency.weekday != null ? String(existingTask.frequency.weekday) : '1',
        options: WEEKDAY_SELECT_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
      },
      {
        name: 'monthlyOrdinal',
        label: 'Which occurrence',
        type: 'select',
        value: existingTask && existingTask.frequency.ordinal != null ? String(existingTask.frequency.ordinal) : '1',
        options: ORDINAL_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
      },
      {
        name: 'multiWeekdayDays',
        label: 'Selected days (earliest Nth occurrence of any of these)',
        type: 'checkboxes',
        value:
          existingTask && existingTask.frequency.weekdays && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
            ? existingTask.frequency.weekdays.map(String)
            : [],
        options: WEEKDAY_CHECKBOX_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
      },
      {
        name: 'multiWeekdayOrdinal',
        label: 'Which occurrence (N -- e.g. 2 for "earliest 2nd")',
        type: 'number',
        value:
          existingTask && existingTask.frequency.ordinal != null && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
            ? String(existingTask.frequency.ordinal)
            : '1',
        min: 1,
        showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
      },
      {
        name: 'multiWeekdayOffsetDirection',
        label: 'Before or after that day',
        type: 'select',
        value:
          existingTask && existingTask.frequency.offsetDirection && existingTask.frequency.dayMode === 'multi-weekday-offset'
            ? existingTask.frequency.offsetDirection
            : 'before',
        options: BEFORE_AFTER_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        name: 'multiWeekdayOffsetDays',
        label: 'How many days before/after (0-6)',
        type: 'number',
        value:
          existingTask && existingTask.frequency.offsetDays != null && existingTask.frequency.dayMode === 'multi-weekday-offset'
            ? String(existingTask.frequency.offsetDays)
            : '0',
        min: 0,
        max: 6,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        name: 'multiDayDays',
        label: 'Days of the month (1-28)',
        type: 'checkboxes',
        value:
          existingTask && existingTask.frequency.days && existingTask.frequency.dayMode === 'multi-day'
            ? existingTask.frequency.days.map(String)
            : [],
        options: MONTH_DAY_CHECKBOX_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-day',
      },
      {
        name: 'endDate',
        label: 'End date (optional -- last recurrence on or before this date)',
        type: 'date',
        value: existingTask && existingTask.endDate ? existingTask.endDate : '',
        required: false,
        showIf: (v) => v.repeats.length > 0,
      },
      {
        name: 'appointment',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.appointment ? ['appointment'] : [],
        options: [
          {
            value: 'appointment',
            label:
              "Appointment -- its due date is an expiration, not a standing reminder: if not done by then, it's marked failed (crossed out, red) instead of staying overdue. Can still be checked off as done afterward.",
          },
        ],
        required: false,
      },
      {
        name: 'passive',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.passive ? ['passive'] : [],
        options: [
          {
            value: 'passive',
            label:
              "Passive -- a plain reminder, not an actionable task: can't be focused on or timed, and its checkbox marks it failed instead of done. Never auto-resolves once overdue -- stays visible until you mark it failed or, once it's no longer due today, dismiss it.",
          },
        ],
        required: false,
      },
    ],
    { okLabel: existingTask ? 'Save' : 'Add', deleteLabel: existingTask ? 'Delete' : undefined }
  );

  if (result === MODAL_DELETE_RESULT) {
    // Editing "all occurrences" has no splitContext (see the double-click
    // handler below and the series editor's own edit button) and deletes the
    // whole task. Editing a single occurrence or "this and following"
    // instead deletes only that slice of the series, per applySplitDelete.
    if (!splitContext) {
      deleteTask(existingTask.id);
    } else {
      applySplitDelete(existingTask, splitContext.occurrenceDate, splitContext.scope);
      saveTasks();
      renderTodo();
      refreshTodoManageModal();
    }
    return;
  }
  if (!result) return;

  const endDate = result.endDate || null;
  if (endDate && endDate < result.dueDate) {
    alert('End date can\'t be before the due date.');
    return;
  }

  const allDay = result.allDay.length > 0;
  const dueTime = allDay ? null : result.dueTime;
  const appointment = result.appointment.length > 0;
  const passive = result.passive.length > 0;
  const frequency = result.repeats.length > 0 ? decodeFrequency(result.frequencyType, result.interval, result) : { type: 'once', interval: 1 };

  if (splitContext) {
    applySplitEdit(existingTask, {
      originalOccurrenceDate: splitContext.occurrenceDate,
      newOccurrenceDate: result.dueDate,
      scope: splitContext.scope,
    }, {
      name: result.name,
      description: result.description,
      details: result.details,
      dueTime,
      allDay,
      appointment,
      passive,
      frequency,
      endDate,
    });
  } else if (existingTask) {
    existingTask.name = result.name;
    existingTask.description = result.description;
    existingTask.details = result.details;
    existingTask.dueDate = result.dueDate;
    existingTask.dueTime = dueTime;
    existingTask.allDay = allDay;
    existingTask.appointment = appointment;
    existingTask.passive = passive;
    existingTask.frequency = frequency;
    existingTask.endDate = endDate;
    logTaskEvent(existingTask, 'Edited');
  } else {
    tasks.push({
      id: uid(),
      taskId: uid(),
      seriesId: seriesOptions.forcedSeriesId || uid(),
      name: result.name,
      description: result.description,
      details: result.details,
      dueDate: result.dueDate,
      dueTime,
      allDay,
      appointment,
      passive,
      endDate,
      frequency,
      completions: {},
      dismissed: {},
      markedFailed: {},
    });
  }
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

// Splits a recurring task's series around newOccurrenceDate -- the split
// point, which is normally the occurrence that was double-clicked
// (originalOccurrenceDate) but becomes wherever the user retargeted the
// "Due date" field to in the edit form, if they changed it. scope:
//  - 'instance': the historical portion ends at the occurrence just before
//    this one (or is dropped entirely if this was the series' very first
//    occurrence -- nothing historical to keep). This occurrence becomes its
//    own standalone 'once' task carrying the edits. The rest of the
//    ORIGINAL series (its own unedited settings) continues, starting at the
//    next occurrence after this one.
//  - 'following': the historical portion ends the same way, but a single new
//    task with the EDITED settings takes over starting at this occurrence
//    (no separate "original settings continue" task -- there's nothing left
//    of the old pattern after this point).
function applySplitEdit(originalTask, { originalOccurrenceDate, newOccurrenceDate, scope }, edited) {
  const originalTaskId = originalTask.taskId;
  const originalCompletions = originalTask.completions || {};
  const originalDismissed = originalTask.dismissed || {};
  const originalMarkedFailed = originalTask.markedFailed || {};
  const originalEndDate = originalTask.endDate || null;
  const wasOriginalOccurrenceDone = !!originalCompletions[originalOccurrenceDate];
  const wasOriginalOccurrenceFailed = !!originalMarkedFailed[originalOccurrenceDate];
  const prevDate = Recurrence.previousOccurrenceBefore(originalTask, newOccurrenceDate);
  const nextDate = Recurrence.nextOccurrenceAfter(originalTask, newOccurrenceDate);

  if (prevDate) {
    originalTask.endDate = prevDate; // truncate the historical portion to end right before this occurrence
    // Once split off, the historical portion can never advance past this
    // fixed end date -- if its last occurrence were left incomplete, it
    // would show as a perpetually "carried over" overdue item with no
    // future occurrence to ever replace it. Dismiss whatever's already in
    // the past; anything on/after today hasn't happened yet.
    markOccurrencesDismissedBefore(originalTask, Recurrence.dateToISO(new Date()));
  } else {
    tasks = tasks.filter((t) => t.id !== originalTask.id); // this was the series' very first occurrence -- nothing historical to keep
  }

  // Every fragment created here keeps the ORIGINAL task's taskId -- it's
  // still the same logical task, however many records its history now
  // spans (see the "task" side of the series/task distinction in the
  // manage-tasks modal and the side panel's per-task aggregation).
  if (scope === 'instance') {
    const editedFragment = {
      id: uid(),
      taskId: originalTaskId,
      seriesId: originalTask.seriesId,
      name: edited.name,
      description: edited.description,
      details: edited.details,
      dueDate: newOccurrenceDate,
      dueTime: edited.dueTime,
      allDay: edited.allDay,
      appointment: edited.appointment,
      passive: edited.passive,
      frequency: { type: 'once', interval: 1 },
      endDate: null,
      completions: wasOriginalOccurrenceDone ? { [newOccurrenceDate]: true } : {},
      dismissed: {},
      markedFailed: wasOriginalOccurrenceFailed ? { [newOccurrenceDate]: true } : {},
    };
    tasks.push(editedFragment);
    logTaskEvent(editedFragment, 'Recurrence edited (only this occurrence)');

    if (nextDate) {
      tasks.push({
        id: uid(),
        taskId: originalTaskId,
        seriesId: originalTask.seriesId,
        name: originalTask.name,
        description: originalTask.description,
        details: originalTask.details,
        dueDate: nextDate,
        dueTime: originalTask.dueTime,
        allDay: originalTask.allDay,
        appointment: originalTask.appointment,
        passive: originalTask.passive,
        frequency: originalTask.frequency,
        endDate: originalEndDate,
        completions: { ...originalCompletions },
        dismissed: { ...originalDismissed },
        markedFailed: { ...originalMarkedFailed },
      });
    }
  } else if (scope === 'following') {
    const editedFragment = {
      id: uid(),
      taskId: originalTaskId,
      seriesId: originalTask.seriesId,
      name: edited.name,
      description: edited.description,
      details: edited.details,
      dueDate: newOccurrenceDate,
      dueTime: edited.dueTime,
      allDay: edited.allDay,
      appointment: edited.appointment,
      passive: edited.passive,
      frequency: edited.frequency,
      endDate: edited.endDate,
      completions: {
        ...originalCompletions,
        ...(wasOriginalOccurrenceDone ? { [newOccurrenceDate]: true } : {}),
      },
      dismissed: { ...originalDismissed },
      markedFailed: {
        ...originalMarkedFailed,
        ...(wasOriginalOccurrenceFailed ? { [newOccurrenceDate]: true } : {}),
      },
    };
    tasks.push(editedFragment);
    logTaskEvent(editedFragment, 'Recurrence edited (this and following occurrences)');
  }
}

// Deletes a recurring task around occurrenceDate, same split point as
// applySplitEdit but with no edited replacement -- just removing what scope
// says to remove:
//  - 'instance': only this occurrence is gone. The series continues
//    afterward under its original settings, same as if this occurrence had
//    simply never existed.
//  - 'following': this occurrence and everything after it is gone. No
//    continuation task -- there's nothing left of the series past this
//    point.
function applySplitDelete(originalTask, occurrenceDate, scope) {
  const originalTaskId = originalTask.taskId;
  const originalCompletions = originalTask.completions || {};
  const originalDismissed = originalTask.dismissed || {};
  const originalMarkedFailed = originalTask.markedFailed || {};
  const originalEndDate = originalTask.endDate || null;
  const prevDate = Recurrence.previousOccurrenceBefore(originalTask, occurrenceDate);
  const nextDate = Recurrence.nextOccurrenceAfter(originalTask, occurrenceDate);
  const originalKept = !!prevDate;

  if (prevDate) {
    originalTask.endDate = prevDate; // truncate the historical portion to end right before this occurrence
    markOccurrencesDismissedBefore(originalTask, Recurrence.dateToISO(new Date()));
  } else {
    tasks = tasks.filter((t) => t.id !== originalTask.id); // this was the series' very first occurrence -- nothing historical to keep
  }

  // Whichever fragment still carries this taskId forward afterward gets the
  // log line -- the new continuation task if there is one, otherwise the
  // truncated original if it's still around, otherwise there's nothing left
  // of this taskId to log against at all.
  let loggedFragment = originalKept ? originalTask : null;
  if (scope === 'instance' && nextDate) {
    const continuation = {
      id: uid(),
      taskId: originalTaskId,
      seriesId: originalTask.seriesId,
      name: originalTask.name,
      description: originalTask.description,
      details: originalTask.details,
      dueDate: nextDate,
      dueTime: originalTask.dueTime,
      allDay: originalTask.allDay,
      appointment: originalTask.appointment,
      passive: originalTask.passive,
      frequency: originalTask.frequency,
      endDate: originalEndDate,
      completions: { ...originalCompletions },
      dismissed: { ...originalDismissed },
      markedFailed: { ...originalMarkedFailed },
    };
    tasks.push(continuation);
    loggedFragment = continuation;
  }
  if (loggedFragment) {
    logTaskEvent(
      loggedFragment,
      scope === 'instance' ? 'Recurrence occurrence deleted' : 'Recurrence and following occurrences deleted'
    );
  }
}

function forEachOccurrenceBefore(task, cutoffISO, fn) {
  let cursor = task.dueDate;
  for (let i = 0; i < 3660 && cursor < cutoffISO; i++) {
    if (Recurrence.occursOn(task, cursor)) fn(cursor);
    cursor = Recurrence.dateToISO(Recurrence.addDays(new Date(cursor + 'T00:00:00'), 1));
  }
}

// Same as forEachOccurrenceBefore, but bounded below too -- starts at
// whichever is later, task.dueDate or startISO, instead of always scanning
// from dueDate (which could be years before the range actually of interest,
// e.g. this month -- see computeAllTasksItems/the "pending/overdue" side of
// computeTodoDisplayItems).
function forEachOccurrenceInRange(task, startISO, cutoffISO, fn) {
  let cursor = task.dueDate > startISO ? task.dueDate : startISO;
  for (let i = 0; i < 3660 && cursor < cutoffISO; i++) {
    if (Recurrence.occursOn(task, cursor)) fn(cursor);
    cursor = Recurrence.dateToISO(Recurrence.addDays(new Date(cursor + 'T00:00:00'), 1));
  }
}

// Marks every occurrence of task strictly before cutoffISO as dismissed
// (task.dismissed, not task.completions -- whether it was ever actually
// done stays whatever it already was, so an appointment's genuinely missed
// past occurrences stay recorded as failed rather than silently rewritten
// to "completed") -- used right after truncating a split-off historical
// task to a fixed end date, so it doesn't linger as an incomplete "carried
// over" item forever. Immediate, unlike scheduleOccurrencesDismissalBefore
// below -- there's no live "uncheck to undo" interaction happening here to
// leave a linger window for.
function markOccurrencesDismissedBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => {
    task.dismissed[date] = true;
  });
}

// Same idea, but for completing a later occurrence after one or more
// earlier ones were missed (see toggleTaskCompletion) -- otherwise those
// missed occurrences stay shown forever even though the to-do list itself
// never shows more than the single most-recent one, and can resurface as
// "ghost" carried-over items if the task's recurrence pattern is edited
// later. Goes through the same scheduleDismissal linger as completing an
// ordinary carried-over item does, rather than dismissing them this
// instant, so unchecking the completion that triggered this still has a
// window to cancel it for the single most recent one of them (see
// restorePriorOccurrenceIfIncomplete) -- any further-back ones this reaches
// stay dismissed even if that completion gets undone.
function scheduleOccurrencesDismissalBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => scheduleDismissal(task, date));
}

// Partially undoes the above when the completion that triggered it gets
// unchecked -- but only for the single most recent prior occurrence (the
// one carried-over slot that would actually have been visible right before
// that completion swept it away), not every occurrence all the way back to
// the task's own due date the way the forward sweep above can reach.
// Unchecking a completion shouldn't resurrect a long, unrelated history of
// much older missed days just because they happened to get backfilled at
// the same time -- those stay dismissed, restorable only by explicitly
// clicking Show on them (see restoreOccurrence). Only ever called (see
// toggleTaskCompletion) when *today's* own occurrence is what's being
// unchecked, never a carried-over one -- unchecking yesterday's shouldn't
// reach back and restore the day before that either. Cancels that one
// occurrence's still-pending scheduled dismissal too (so it doesn't fire
// later and re-hide what this just restored), and resets its dismissed flag
// back to whatever its own completed flag already is (never touched here),
// immediately: if it's genuinely still incomplete it reappears on the list
// right away, while one that happened to be separately completed on its own
// stays exactly as it was.
function restorePriorOccurrenceIfIncomplete(task, cutoffISO) {
  const priorDate = Recurrence.previousOccurrenceBefore(task, cutoffISO);
  if (!priorDate) return;
  cancelScheduledDismissal(task, priorDate);
  task.dismissed[priorDate] = !!task.completions[priorDate];
}

const editScopeOverlay = document.getElementById('edit-scope-overlay');

// Resolves 'instance' | 'following' | 'all' | null (cancelled). Only shown
// for recurring tasks -- a 'once' task has nothing to split, so its
// double-click skips straight to editing it.
function showEditScopeChoice() {
  return new Promise((resolve) => {
    editScopeOverlay.classList.remove('hidden');
    const instanceBtn = document.getElementById('edit-scope-instance');
    const followingBtn = document.getElementById('edit-scope-following');
    const allBtn = document.getElementById('edit-scope-all');
    const cancelBtn = document.getElementById('edit-scope-cancel');

    function finish(choice) {
      editScopeOverlay.classList.add('hidden');
      instanceBtn.onclick = null;
      followingBtn.onclick = null;
      allBtn.onclick = null;
      cancelBtn.onclick = null;
      resolve(choice);
    }

    instanceBtn.onclick = () => finish('instance');
    followingBtn.onclick = () => finish('following');
    allBtn.onclick = () => finish('all');
    cancelBtn.onclick = () => finish(null);
  });
}

// Shared by a row's double-click and its context menu's "Edit" item. A
// 'once' task has no recurrence to split, so it skips straight to editing
// it -- only recurring tasks get the "which occurrence(s)" choice.
async function editTaskOccurrence(task, occurrenceDate) {
  if (task.frequency.type === 'once') {
    openTaskForm(task);
    return;
  }
  const scope = await showEditScopeChoice();
  if (!scope) return;
  if (scope === 'all') {
    openTaskForm(task);
  } else {
    openTaskForm(task, { occurrenceDate, scope });
  }
}

function deleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
  tasks = tasks.filter((t) => t.id !== taskId);
  if (activeTaskId === taskId) setActiveTaskId(null);
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

function toggleTaskCompletion(task, occurrenceDate) {
  if (task.completions[occurrenceDate]) {
    delete task.completions[occurrenceDate];
    // Cancels this occurrence's own pending dismissal (computeTodoDisplayItems
    // schedules one for the "prior occurrence" slot once it displays as
    // completed, but deliberately never cancels one on a plain re-render --
    // see isDismissalPending there) -- unchecking within the linger window
    // keeps it shown instead of it still vanishing later on a stale timer.
    cancelScheduledDismissal(task, occurrenceDate);
    // Partially mirrors the backfill below in reverse -- see
    // restorePriorOccurrenceIfIncomplete for why only the single most recent
    // prior occurrence, not every one the backfill could have reached, and
    // only when it's *today's* own occurrence being unchecked, not a
    // carried-over one -- unchecking, say, yesterday's shouldn't reach back
    // and restore the day before that.
    if (occurrenceDate === Recurrence.dateToISO(new Date())) {
      restorePriorOccurrenceIfIncomplete(task, occurrenceDate);
    }
    logTaskEvent(task, 'Marked not done');
  } else {
    task.completions[occurrenceDate] = true;
    logTaskEvent(task, 'Marked done');
    // Only this task's "today" or carried-over occurrence is ever checked
    // off this way (see the checkbox's disabled condition below), so
    // occurrenceDate is always on or before today here -- dismiss any
    // earlier occurrence(s) skipped without ever being explicitly checked
    // off (e.g. missed a few days), otherwise they'd stay shown in the data
    // forever and can resurface as "ghost" carried-over items if the task's
    // recurrence is edited later. Their completions entry is untouched --
    // they're dismissed, not retroactively marked done, so an appointment's
    // genuinely missed occurrences stay recorded as failed. Scheduled with
    // the same short linger as an ordinary completion, not instant, so
    // unchecking this one right back still has a window to cancel it.
    scheduleOccurrencesDismissalBefore(task, occurrenceDate);
    // A running timer stops making sense once its task is done -- cancelled
    // outright rather than just frozen. renderTodo's own "no longer
    // eligible" check un-marks it as active right after this, via
    // setActiveTaskId, same as completing any other active task already does
    // (which is what flushes this task's own now-empty focus-only session,
    // so it isn't set up again here).
    if (task.timer) {
      flushTimerElapsed(task);
      task.timer = null;
    }
  }
  selectTaskForSidePanel(task);
  saveTasks();
  renderTodo();
}

// For a task not done by its due date: normally "overdue" -- carries over.
// An "appointment" task (expires on its due date, see the form's checkbox)
// is "failed" instead -- shown crossed out in red, but can still be checked
// off after the fact. Returns {overdue: false, failed: false} for anything
// not actually past due (or already completed, via the `completed` param).
//
// An appointment is exempt from failing for as long as THIS SPECIFIC
// occurrence is the active one (being worked on, see the "Work on this now"
// button below and activeOccurrenceDate) -- most real appointments can't
// just be "tried again", so once it's no longer active on this occurrence
// (or never was) and its due date is past, that's terminal: failed is
// permanent from then on, not something re-activating can undo (canWorkOnNow
// below excludes a failed task entirely).
//
// A "passive" task (a plain reminder, see the form's checkbox) is neither --
// it's never auto-marked failed just for going past due (`completed` is
// always false for it too, since it has no completions entry to begin with;
// see toggleTaskFailedMark instead of toggleTaskCompletion). It stays
// "overdue" through the one extra day it's shown carried-over (see
// autoDismissStaleCarriedOverOccurrences, which clears away ANY carried-over
// occurrence once it's older than that, passive or not), giving the user a
// chance to instead mark it failed (task.markedFailed) or dismiss it (see
// dismissOccurrence) before it's cleared away on its own.
function pastDueStatus(task, occurrenceDate, completed, now) {
  if (task.passive) {
    if (task.markedFailed && task.markedFailed[occurrenceDate]) return { overdue: false, failed: true };
    return { overdue: Recurrence.isOverdue(task, occurrenceDate, now), failed: false };
  }
  if (completed || !Recurrence.isOverdue(task, occurrenceDate, now)) return { overdue: false, failed: false };
  if (task.appointment && task.id === activeTaskId && occurrenceDate === activeOccurrenceDate) return { overdue: false, failed: false };
  return task.appointment ? { overdue: false, failed: true } : { overdue: true, failed: false };
}

// Toggles whether a passive task's occurrence is marked failed -- the only
// action available on it besides dismissing (see dismissOccurrence): a
// passive task's checkbox means this instead of "mark complete" (see
// buildTodoItemRow), since it's a plain reminder with no real "done" state.
function toggleTaskFailedMark(task, occurrenceDate) {
  if (!task.markedFailed) task.markedFailed = {};
  if (task.markedFailed[occurrenceDate]) {
    delete task.markedFailed[occurrenceDate];
    logTaskEvent(task, 'Marked not failed');
  } else {
    task.markedFailed[occurrenceDate] = true;
    logTaskEvent(task, 'Marked failed');
  }
  selectTaskForSidePanel(task);
  saveTasks();
  renderTodo();
}

// Immediately clears any task's carried-over (yesterday-or-earlier)
// occurrence from the list, whatever state it's currently in -- an
// alternative to whatever the checkbox on that occurrence would otherwise do
// (mark complete for an ordinary or already-failed-appointment task, mark
// failed for a passive one). Unlike scheduleDismissal's short linger (for
// confirming a just-completed checkbox click before it disappears), this is
// a direct, deliberate action with nothing to visually confirm, so it takes
// effect right away.
function dismissOccurrence(task, occurrenceDate) {
  task.dismissed[occurrenceDate] = true;
  selectTaskForSidePanel(task);
  saveTasks();
  renderTodo();
}

// Undoes dismissOccurrence -- brings a hidden carried-over occurrence back
// (the "pending/overdue" and "all tasks" views show it either way, since
// both already ignore task.dismissed, but "next recurrence" only shows it
// once this clears the flag).
function restoreOccurrence(task, occurrenceDate) {
  delete task.dismissed[occurrenceDate];
  selectTaskForSidePanel(task);
  saveTasks();
  renderTodo();
}

// Whether an occurrence still needs to show on the to-do list is tracked
// separately from whether it's complete (task.dismissed, alongside
// task.completions) -- otherwise "done" and "no longer relevant to show"
// end up conflated, which would force treating an appointment's missed
// (failed, never actually done) past occurrences as if they'd been
// completed just to stop them cluttering the list. A carried-over
// occurrence (an ordinary one, or the "yesterday companion" below) that's
// just been completed lingers crossed out for a few seconds instead of
// vanishing the instant it's done, so the checkmark is actually visible
// before it disappears -- scheduleDismissal sets task.dismissed after that
// delay, which is what actually hides it (see the `if (task.dismissed[...])
// continue/return null` checks below and in computeTodoDisplayItems). Since
// task.dismissed is persisted, it survives reload/restart.
const dismissalTimers = new Map(); // "taskId:date" -> timer handle, in-memory only

function scheduleDismissal(task, occurrenceDate) {
  const key = `${task.id}:${occurrenceDate}`;
  if (dismissalTimers.has(key)) return;
  dismissalTimers.set(
    key,
    setTimeout(() => {
      dismissalTimers.delete(key);
      task.dismissed[occurrenceDate] = true;
      saveTasks();
      renderTodo();
    }, 5000)
  );
}

// Cancels a pending dismissal -- e.g. the occurrence went back to
// incomplete before the timer fired, so unchecking it within the window
// doesn't still dismiss it later on a stale timer.
function cancelScheduledDismissal(task, occurrenceDate) {
  const key = `${task.id}:${occurrenceDate}`;
  clearTimeout(dismissalTimers.get(key));
  dismissalTimers.delete(key);
}

function isDismissalPending(task, occurrenceDate) {
  return dismissalTimers.has(`${task.id}:${occurrenceDate}`);
}

// "Pending/overdue" view: every occurrence since the start of viewedMonthKey
// that's overdue or failed (see pastDueStatus) -- regardless of
// task.dismissed, unlike every other view here. This is meant to be a
// standing audit of everything unresolved in that month, not a decluttered
// day-to-day list, so a dismissal made to tidy up the "next recurrence" view
// doesn't also hide something from this one. A completed occurrence is
// dropped instead of shown -- it's resolved, not overdue/failed anymore, so
// it has nothing to say here.
//
// Only makes sense relative to *real* today, so browsing to a past month
// scans that whole month (everything in it is already over), a future month
// scans nothing (nothing in it can be overdue yet), and only the actual
// current month gets today's/tomorrow's occurrence unconditionally, no 6pm
// gate the way "next recurrence"'s tomorrow preview has -- this view's job is
// showing what's due, not previewing ahead.
function computeTodoDisplayItems(viewedMonthKey) {
  const now = new Date();
  const todayISO = Recurrence.dateToISO(now);
  const tomorrowISO = Recurrence.dateToISO(Recurrence.addDays(now, 1));
  const monthStartISO = `${viewedMonthKey}-01`;
  const currentMonthKey = monthKeyOf(todayISO);
  const isCurrentMonth = viewedMonthKey === currentMonthKey;
  const scanCutoffISO = isCurrentMonth
    ? todayISO
    : viewedMonthKey < currentMonthKey
      ? `${addMonthsToKey(viewedMonthKey, 1)}-01`
      : monthStartISO; // future month -- empty range, nothing can be overdue yet
  const items = [];

  for (const task of tasks) {
    forEachOccurrenceInRange(task, monthStartISO, scanCutoffISO, (date) => {
      if (task.completions[date]) return; // resolved -- not "pending/overdue" anymore
      const { overdue, failed } = pastDueStatus(task, date, false, now);
      if (overdue || failed) {
        items.push({ task, occurrenceDate: date, completed: false, overdue, failed, dismissed: !!task.dismissed[date], kind: 'carried-over' });
      }
    });

    if (!isCurrentMonth) continue;

    if (Recurrence.occursOn(task, todayISO)) {
      const completed = !!task.completions[todayISO];
      const { overdue, failed } = pastDueStatus(task, todayISO, completed, now);
      items.push({ task, occurrenceDate: todayISO, completed, overdue, failed, dismissed: !!task.dismissed[todayISO], kind: 'today' });
    }

    if (Recurrence.occursOn(task, tomorrowISO)) {
      items.push({
        task,
        occurrenceDate: tomorrowISO,
        completed: false,
        overdue: false,
        failed: false,
        dismissed: !!task.dismissed[tomorrowISO],
        kind: 'tomorrow',
      });
    }
  }

  return items;
}

// "All tasks" view: every occurrence of every task that falls within
// viewedMonthKey, start to end, whatever its state -- done or not, failed or
// not, dismissed or not. A plain calendar-month listing rather than a
// todo-workflow view like the other two, so nothing here is filtered by
// task.dismissed/task.completions the way they are.
function computeAllTasksItems(viewedMonthKey) {
  const now = new Date();
  const todayISO = Recurrence.dateToISO(now);
  const tomorrowISO = Recurrence.dateToISO(Recurrence.addDays(now, 1));
  const [viewedYear, viewedMonth] = viewedMonthKey.split('-').map(Number);
  const monthStartISO = `${viewedMonthKey}-01`;
  const daysInViewedMonth = Recurrence.daysInMonth(viewedYear, viewedMonth - 1);
  const monthEndExclusiveISO = Recurrence.dateToISO(Recurrence.addDays(new Date(viewedYear, viewedMonth - 1, 1), daysInViewedMonth));
  const items = [];

  for (const task of tasks) {
    forEachOccurrenceInRange(task, monthStartISO, monthEndExclusiveISO, (date) => {
      const completed = !!task.completions[date];
      const { overdue, failed } = completed ? { overdue: false, failed: false } : pastDueStatus(task, date, false, now);
      const kind = date < todayISO ? 'carried-over' : date === todayISO ? 'today' : date === tomorrowISO ? 'tomorrow' : 'upcoming';
      items.push({ task, occurrenceDate: date, completed, overdue, failed, dismissed: !!task.dismissed[date], kind });
    });
  }

  return items;
}

// "Next recurrence" view: one entry per task for whatever's next -- its
// current pending occurrence (today/carried-over, same as the "pending"
// view) if there is one, otherwise the occurrence after it (once today's is
// completed, or before its very first one if it hasn't started yet). A task
// that occurs tomorrow still gets a separate preview there after 6pm even
// when today's is still pending, same as the "pending" view -- deduped
// against whatever's already been added for that date, so it doesn't show
// twice once today's occurrence is actually completed.
function computeNextRecurrenceItems() {
  const now = new Date();
  const todayISO = Recurrence.dateToISO(now);
  const tomorrowISO = Recurrence.dateToISO(Recurrence.addDays(now, 1));
  const items = [];

  for (const task of tasks) {
    const todayOccurs = Recurrence.occursOn(task, todayISO);
    // A failed occurrence (a past-due appointment, or a manually-marked-
    // failed passive task -- see pastDueStatus) is just as resolved as a
    // completed one for the purposes of previewing what's next: neither is
    // still waiting on the user, so there's no reason to hold back the next
    // occurrence's preview until they explicitly check it off too.
    let todayPending = false;
    if (todayOccurs) {
      const completed = !!task.completions[todayISO];
      if (completed) {
        // Still shows (crossed out) alongside whatever's next -- confirms
        // what was just checked off without it just vanishing.
        items.push({ task, occurrenceDate: todayISO, completed: true, overdue: false, kind: 'today' });
      } else {
        const { overdue, failed } = pastDueStatus(task, todayISO, false, now);
        todayPending = !failed;
        items.push({ task, occurrenceDate: todayISO, completed: false, overdue, failed, kind: 'today' });
      }
    }

    const priorDate = Recurrence.previousOccurrenceBefore(task, todayISO);
    let priorPending = false;
    if (priorDate && !task.dismissed[priorDate]) {
      const completed = !!task.completions[priorDate];
      // A dismissal can be pending here for two different reasons: the
      // occurrence was genuinely completed (its own linger), or it was
      // swept up by scheduleOccurrencesDismissalBefore when a *later*
      // occurrence (today's) got completed, despite never being completed
      // itself. Only the former should ever display as completed -- the
      // latter should keep showing its real overdue/failed state right up
      // until it silently disappears, not flash as done.
      if (completed || isDismissalPending(task, priorDate)) {
        scheduleDismissal(task, priorDate); // idempotent -- also covers a dismissal already pending from backfill
        const { overdue, failed } = completed ? { overdue: false, failed: false } : pastDueStatus(task, priorDate, false, now);
        items.push({ task, occurrenceDate: priorDate, completed, overdue, failed, kind: 'carried-over' });
      } else {
        const { overdue, failed } = pastDueStatus(task, priorDate, false, now);
        priorPending = !failed;
        items.push({ task, occurrenceDate: priorDate, completed, overdue, failed, kind: 'carried-over' });
      }
    }

    // Nothing left pending (today's, if it has one, is done; the prior
    // occurrence, if any, is done/lingering-before-dismissal or dismissed)
    // -- preview what's next. When the task hasn't had any occurrence at all
    // yet (recentDate null), search from the day before its due date rather
    // than assuming the due date itself is a valid occurrence -- it's just
    // the pattern's anchor point, not necessarily a date the pattern itself
    // lands on (see nextOccurrenceAfter).
    if (!todayPending && !priorPending) {
      const recentDate = todayOccurs ? todayISO : priorDate;
      const searchFrom = recentDate == null ? Recurrence.dateToISO(Recurrence.addDays(new Date(task.dueDate + 'T00:00:00'), -1)) : recentDate;
      const nextDate = Recurrence.nextOccurrenceAfter(task, searchFrom);
      if (nextDate) {
        items.push({
          task,
          occurrenceDate: nextDate,
          completed: false,
          overdue: false,
          kind: nextDate === todayISO ? 'today' : nextDate === tomorrowISO ? 'tomorrow' : 'upcoming',
        });
      }
    }
  }

  if (now.getHours() >= 18) {
    for (const task of tasks) {
      const alreadyShown = items.some((i) => i.task.id === task.id && i.occurrenceDate === tomorrowISO);
      if (!alreadyShown && Recurrence.occursOn(task, tomorrowISO)) {
        items.push({ task, occurrenceDate: tomorrowISO, completed: false, overdue: false, kind: 'tomorrow' });
      }
    }
  }

  return items;
}

// Persisted across restarts. Deliberately independent of the overdue/active
// computations above, which always use the "pending" computation regardless
// of this toggle -- which tasks are actually overdue isn't a display
// preference.
const TODO_VIEW_MODE_KEY = 'advanced-todo-view-mode';
const TODO_VIEW_MODES = ['pending', 'next-recurrence', 'all'];

function loadTodoViewMode() {
  const stored = localStorage.getItem(TODO_VIEW_MODE_KEY);
  return TODO_VIEW_MODES.includes(stored) ? stored : 'pending';
}

let todoViewMode = loadTodoViewMode();

function saveTodoViewMode() {
  localStorage.setItem(TODO_VIEW_MODE_KEY, todoViewMode);
}

const todoSectionEl = document.getElementById('todo-section');
const todoListEl = document.getElementById('todo-list');
const todoViewportEl = document.getElementById('todo-viewport');
const todoViewToggleEl = document.getElementById('todo-view-toggle');
const todoViewToggleThumb = todoViewToggleEl.querySelector('.todo-view-toggle-thumb');
const todoViewToggleOpts = Array.from(todoViewToggleEl.querySelectorAll('.todo-view-toggle-opt'));

// { sentinel, header } per visible day, in display order -- rebuilt on every
// renderTodo(). See updatePinnedTodoHeader.
let todoDayHeaderRefs = [];

// Keeps exactly one day header "pinned" (position: sticky, see .todo-day-
// header.pinned) at a time: the last one (in display order) whose day has
// already started scrolling past the top of #todo-viewport. Every other
// header is left in plain flow, so a day that's fully scrolled past just
// scrolls away with the rest of its own content instead of lingering
// underneath the next one -- there's only ever one sticky element, not a
// stack of them, so there's nothing for that next header to visually cover.
function updatePinnedTodoHeader() {
  if (todoDayHeaderRefs.length === 0) return;
  const viewportTop = todoViewportEl.getBoundingClientRect().top;
  let pinnedIndex = 0;
  for (let i = 0; i < todoDayHeaderRefs.length; i++) {
    if (todoDayHeaderRefs[i].sentinel.getBoundingClientRect().top <= viewportTop) pinnedIndex = i;
  }
  todoDayHeaderRefs.forEach(({ header }, i) => header.classList.toggle('pinned', i === pinnedIndex));
}

const PENDING_VIEW_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z"/></svg>';
const NEXT_RECURRENCE_VIEW_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M17 1l4 4-4 4V6H7a4 4 0 0 0-4 4v1H1v-1a6 6 0 0 1 6-6h10V1zm-10 22l-4-4 4-4v3h10a4 4 0 0 0 4-4v-1h2v1a6 6 0 0 1-6 6H7v3z"/></svg>';
const ALL_TASKS_VIEW_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg>';

const TODO_VIEW_MODE_INFO = {
  pending: { icon: PENDING_VIEW_ICON },
  'next-recurrence': { icon: NEXT_RECURRENCE_VIEW_ICON },
  all: { icon: ALL_TASKS_VIEW_ICON },
};

// Icons are static per option, so this only needs to run once -- unlike the
// active state/thumb position below, which change on every renderTodo().
todoViewToggleOpts.forEach((btn) => {
  btn.innerHTML = TODO_VIEW_MODE_INFO[btn.dataset.mode].icon;
});

function updateTodoViewToggleButton() {
  const activeIndex = TODO_VIEW_MODES.indexOf(todoViewMode);
  todoViewToggleOpts.forEach((btn, i) => btn.classList.toggle('active', i === activeIndex));
  // Percentage-based, not measured off the buttons' own rendered boxes --
  // those come back 0 while #todo-section is still .hidden (e.g. the very
  // first renderTodo()), but this doesn't depend on layout having happened
  // yet, only on the CSS that sizes .todo-view-toggle-thumb to exactly one
  // option's width (see there).
  todoViewToggleThumb.style.transform = `translateX(${activeIndex * 100}%)`;
}

todoViewToggleOpts.forEach((btn) => {
  btn.onclick = () => {
    if (todoViewMode === btn.dataset.mode) return;
    todoViewMode = btn.dataset.mode;
    saveTodoViewMode();
    renderTodo();
  };
});

// Which calendar month "pending/overdue" and "all tasks" currently display
// (see computeTodoDisplayItems/computeAllTasksItems) -- not persisted, and
// deliberately never consulted by anything that determines real overdue
// status or which occurrence is active/timed, only by what the list shows.
// "Next recurrence" ignores this entirely: it's one upcoming occurrence per
// task, not a month range, so there's nothing for it to page through (see
// updateTodoMonthNav).
let viewedMonthKey = monthKeyOf(Recurrence.dateToISO(new Date()));

const todoMonthNavEl = document.getElementById('todo-month-nav');
const todoMonthPrevBtn = document.getElementById('todo-month-prev');
const todoMonthNextBtn = document.getElementById('todo-month-next');
const todoMonthLabelEl = document.getElementById('todo-month-label');

todoMonthPrevBtn.innerHTML =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z"/></svg>';
todoMonthNextBtn.innerHTML =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M8.6 7.4L10 6l6 6-6 6-1.4-1.4L13.2 12z"/></svg>';

// Hidden entirely in "next recurrence" mode -- that view shows one upcoming
// occurrence per task (plus yesterday's still-undismissed one) regardless of
// which month either lands in, so there's no month range for it to page
// through at all.
function updateTodoMonthNav() {
  const isNextRecurrence = todoViewMode === 'next-recurrence';
  todoMonthNavEl.classList.toggle('hidden', isNextRecurrence);
  if (isNextRecurrence) return;
  todoMonthLabelEl.textContent = formatMonthLabel(viewedMonthKey);
  const isCurrentMonth = viewedMonthKey === monthKeyOf(Recurrence.dateToISO(new Date()));
  todoMonthLabelEl.title = isCurrentMonth ? '' : 'Jump to current month';
}

todoMonthPrevBtn.onclick = () => {
  viewedMonthKey = addMonthsToKey(viewedMonthKey, -1);
  renderTodo();
};
todoMonthNextBtn.onclick = () => {
  viewedMonthKey = addMonthsToKey(viewedMonthKey, 1);
  renderTodo();
};
todoMonthLabelEl.onclick = () => {
  const currentMonthKey = monthKeyOf(Recurrence.dateToISO(new Date()));
  if (viewedMonthKey === currentMonthKey) return;
  viewedMonthKey = currentMonthKey;
  renderTodo();
};

todoViewportEl.addEventListener('scroll', updatePinnedTodoHeader);
window.addEventListener('resize', updatePinnedTodoHeader);

function renderTodoEmptyState() {
  todoListEl.innerHTML = '';

  const message = document.createElement('div');
  message.className = 'empty-state';
  message.textContent = 'You have no to-dos yet.';
  todoListEl.appendChild(message);

  const btn = document.createElement('button');
  btn.className = 'accent-btn';
  btn.textContent = '+ Add task';
  btn.onclick = () => openTaskForm(null);
  todoListEl.appendChild(btn);
}

// "Today"/"Yesterday"/"Tomorrow" relative to the real current date, so it
// stays correct across the day boundary without re-deriving it per call --
// anything further out (a carried-over item more than a day overdue) just
// gets its plain weekday + date, since "3 days ago" style phrasing wasn't
// asked for.
function describeDayLabel(dateISO, todayISO) {
  const dateStr = new Date(dateISO + 'T00:00:00').toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  if (dateISO === todayISO) return `Today, ${dateStr}`;
  if (dateISO === Recurrence.dateToISO(Recurrence.addDays(new Date(todayISO + 'T00:00:00'), -1))) {
    return `Yesterday, ${dateStr}`;
  }
  if (dateISO === Recurrence.dateToISO(Recurrence.addDays(new Date(todayISO + 'T00:00:00'), 1))) {
    return `Tomorrow, ${dateStr}`;
  }
  return dateStr;
}

// Same order tasks appear in the to-do list: earliest occurrence date first,
// then within a day all-day tasks first, then earliest due time, then
// alphabetically by name for ties.
function compareTodoDisplayOrder(a, b) {
  if (a.occurrenceDate !== b.occurrenceDate) return a.occurrenceDate < b.occurrenceDate ? -1 : 1;
  if (!!a.task.allDay !== !!b.task.allDay) return a.task.allDay ? -1 : 1;
  if (!a.task.allDay && a.task.dueTime !== b.task.dueTime) return a.task.dueTime < b.task.dueTime ? -1 : 1;
  return a.task.name.localeCompare(b.task.name, undefined, { sensitivity: 'base' });
}

const WORK_ON_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const WORKING_ON_ICON = '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>';
const DISMISS_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>';
const SHOW_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/></svg>';

// Builds a single to-do row -- extracted from renderTodo's per-day loop so
// it can be appended into either of a day's two columns rather than always
// straight into todoListEl.
function buildTodoItemRow(item, isToday) {
  // Whether THIS row's own occurrence, specifically, is the focused one --
  // not just whether the task is focused on some other occurrence of itself
  // (a recurring task can show up to three rows at once; see
  // activeOccurrenceDate).
  const isActiveHere = item.task.id === activeTaskId && item.occurrenceDate === activeOccurrenceDate;
  const row = document.createElement('div');
  row.__task = item.task; // back-reference for refreshPreviewedHighlight's cheap re-tag, see there
  row.className =
    'todo-item' +
    (item.completed ? ' completed' : '') +
    (item.failed ? ' failed' : '') +
    (isActiveHere ? ' active' : '') +
    (item.task.allDay ? ' all-day' : '') +
    // Only while it's neither failed nor done yet -- see pastDueStatus;
    // an appointment past its due date is tagged .failed instead (red,
    // crossed out), and once checked off it just looks like any other
    // completed task, not still flagged green.
    (item.task.appointment && !item.completed && !item.failed ? ' appointment' : '') +
    // Same idea for a passive task's own tint -- once it's marked failed
    // (see toggleTaskFailedMark), .failed's own red styling takes over.
    (item.task.passive && !item.failed ? ' passive' : '') +
    // The "pending/overdue" and "all tasks" views show a dismissed
    // occurrence right alongside ones that aren't (see
    // computeTodoDisplayItems/computeAllTasksItems, both of which ignore
    // task.dismissed for filtering) -- this is the only visual cue telling
    // the two apart, since otherwise a dismissed item looks identical to an
    // active one. "Next recurrence" never shows a dismissed item at all, so
    // item.dismissed is always false there.
    (item.dismissed ? ' dismissed' : '') +
    // Whichever task's notes/history are currently showing in the side
    // panel (see selectTaskForSidePanel) -- reference equality against the
    // exact record last interacted with, not just a matching id, since a
    // recurring task's own separate occurrences are still separate rows.
    (item.task === sidePanelTask ? ' previewed' : '') +
    (isToday && !item.completed ? '' : ' not-today');

  // A reverse progress bar behind the row's own content -- full at the
  // start, empties out to nothing as the timer counts down to zero.
  // Appended first (before anything else below) and left in normal flow
  // stacking (position: absolute, z-index: auto) so it paints underneath
  // the row's actual (position: relative) content regardless of DOM order,
  // per how CSS stacking contexts order positioned-but-unlayered elements.
  const timerIsForThisRow = timerBelongsToItem(item);
  if (timerIsForThisRow) {
    const bar = document.createElement('div');
    bar.className = 'todo-timer-bar';
    bar.style.width = `${Math.max(0, Math.min(100, timerProgressPercent(item.task.timer)))}%`;
    row.appendChild(bar);
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  // A passive task has no "done" state to check off -- its box means
  // "marked failed" instead (see toggleTaskFailedMark), so it reflects
  // item.failed rather than item.completed (which is always false for it
  // anyway, see pastDueStatus).
  checkbox.checked = item.task.passive ? item.failed : item.completed;
  // Styled as a red "X" instead of the usual checkbox (see
  // .todo-checkbox-failed) purely to read as "failed", not to change what
  // clicking it does -- a failed appointment (or a passive task marked
  // failed) stays toggleable like any other carried-over task.
  if (item.failed) checkbox.classList.add('todo-checkbox-failed');
  checkbox.disabled = item.kind === 'tomorrow' || item.kind === 'upcoming';
  checkbox.onclick = (e) => {
    e.stopPropagation();
    if (item.task.passive) toggleTaskFailedMark(item.task, item.occurrenceDate);
    else toggleTaskCompletion(item.task, item.occurrenceDate);
  };
  row.appendChild(checkbox);

  const text = document.createElement('div');
  text.className = 'todo-item-text';

  const name = document.createElement('div');
  name.className = 'todo-item-name';
  name.textContent = item.task.name;
  text.appendChild(name);

  if (item.task.description) {
    const desc = document.createElement('div');
    desc.className = 'todo-item-desc';
    desc.textContent = item.task.description;
    text.appendChild(desc);
  }

  const meta = document.createElement('div');
  meta.className =
    'todo-item-meta' + (item.overdue && !item.completed ? ' overdue' : '') + (item.failed ? ' failed' : '');
  if (timerIsForThisRow) {
    // Takes over the whole meta line -- the due date this would otherwise
    // show isn't relevant while a timer's actively being worked against
    // instead. Three cases: a plain countdown still ticking down shows
    // "X of Y" as before; a count-up timer, or a countdown that's run past
    // zero into overtime, switch to the elapsed-time wording instead since
    // there's no meaningful "of Y" left (see startTaskTimerPrompt).
    const timer = item.task.timer;
    const remaining = currentTimerRemaining(timer);
    if (timer.mode === 'countup') {
      meta.textContent = `Total elapsed time is ${formatElapsedDuration(timerElapsedSeconds(timer))}`;
    } else if (remaining < 0) {
      meta.textContent = `Total elapsed time is ${formatElapsedDuration(timerElapsedSeconds(timer))} with ${formatElapsedDuration(timer.totalSeconds)} planned`;
    } else {
      meta.textContent = `${formatTimerDuration(remaining)} of ${formatTimerDuration(timer.totalSeconds)}`;
    }
  } else {
    meta.textContent = item.task.allDay
      ? item.kind === 'tomorrow'
        ? 'Tomorrow, all day'
        : item.failed
          ? `Failed -- was due ${item.occurrenceDate}`
          : item.overdue && !item.completed
            ? `Overdue since ${item.occurrenceDate}`
            : 'All day'
      : item.kind === 'tomorrow'
        ? `Tomorrow, ${item.task.dueTime}`
        : item.failed
          ? `Failed -- was due ${item.occurrenceDate} ${item.task.dueTime}`
          : item.overdue && !item.completed
            ? `Overdue since ${item.occurrenceDate} ${item.task.dueTime}`
            : `Due ${item.task.dueTime}`;
  }
  text.appendChild(meta);

  row.appendChild(text);

  // Focusing is entirely user-initiated, via the "Work on this now" button
  // below only -- nothing auto-activates a task, and clicking anywhere else
  // on a row (including an overdue one) never does either, so it can't ever
  // race with row.ondblclick's edit-task action below.

  // Lets the user voluntarily mark any of today's tasks (or a carried-over
  // one) as the one they're working on -- and toggle back off again. Only
  // one task can be active at a time (activeTaskId is a single value, not a
  // set), so marking a different task implicitly un-marks whichever one was
  // active before. Passive tasks never get this -- they can't be focused or
  // timed at all. Excluding a failed one (!item.failed below) is what makes
  // failing terminal for an appointment: it was already active (and stayed
  // exempt from failing) or it wasn't, but once it's failed, re-activating
  // can't undo that -- only checking it off can. A plain overdue task is
  // never "failed" (that's appointment/passive-only), so this still lets it
  // be focused however long it's been carried over. Shared with the context
  // menu below: its own Focus/Unfocus items do exactly this, and starting a
  // timer is the same kind of voluntary "work on this now", just worded for
  // the timer instead.
  const canWorkOnNow = !item.task.passive && (item.kind === 'today' || item.kind === 'carried-over') && !item.completed && !item.failed;
  if (canWorkOnNow) {
    const workOnBtn = document.createElement('button');
    workOnBtn.className = 'todo-focus-btn' + (isActiveHere ? ' active' : '');
    workOnBtn.innerHTML = isActiveHere ? WORKING_ON_ICON : WORK_ON_ICON;
    workOnBtn.title = isActiveHere ? 'Stop working on this task' : 'Work on this task now';
    workOnBtn.onclick = (e) => {
      e.stopPropagation();
      setActiveTaskId(isActiveHere ? null : item.task.id, item.occurrenceDate);
      selectTaskForSidePanel(item.task);
      renderTodo();
    };
    row.appendChild(workOnBtn);
  }

  // Any carried-over (due yesterday or earlier) occurrence can be cleared
  // without going through its checkbox -- a plain overdue task or a failed
  // appointment can be dismissed instead of marked complete, and a passive
  // one instead of marked failed. Any carried-over occurrence left alone for
  // two or more days is cleared this same way automatically regardless of
  // state (see autoDismissStaleCarriedOverOccurrences); this button just
  // lets the user do it themselves right away instead of waiting out that
  // day. Once dismissed, the "pending/overdue" and "all tasks" views still
  // show it (both ignore task.dismissed -- see computeTodoDisplayItems/
  // computeAllTasksItems), so the button flips to undoing that instead.
  if (item.kind === 'carried-over') {
    const isDismissed = !!item.task.dismissed[item.occurrenceDate];
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'todo-focus-btn';
    dismissBtn.innerHTML = isDismissed ? SHOW_ICON : DISMISS_ICON;
    dismissBtn.title = isDismissed ? 'Show (undo hiding it)' : 'Hide (remove from the list)';
    dismissBtn.onclick = (e) => {
      e.stopPropagation();
      if (isDismissed) restoreOccurrence(item.task, item.occurrenceDate);
      else dismissOccurrence(item.task, item.occurrenceDate);
    };
    row.appendChild(dismissBtn);
  }

  // Always available -- Task stats and Edit are plain actions with no
  // eligibility requirement of their own. Everything else showTodoContextMenu
  // offers is gated the same as the buttons above (and hidden entirely for a
  // not-yet-due tomorrow/upcoming preview row).
  row.oncontextmenu = (e) => {
    e.preventDefault();
    selectTaskForSidePanel(item.task);
    showTodoContextMenu(e, item, canWorkOnNow);
  };

  // Plain click (anything not otherwise handled above -- those all
  // stopPropagation their own clicks) just selects this task for the side
  // panel; it never focuses/edits/etc. on its own (see the comment above
  // canWorkOnNow). Deliberately doesn't renderTodo() itself (selectTaskFor
  // SidePanel already handles the .previewed accent without a full rebuild,
  // see refreshPreviewedHighlight) -- replacing this row's own DOM node
  // mid-gesture broke the browser's double-click detection for
  // row.ondblclick below, since the second click then lands on a different
  // element than the first.
  row.onclick = () => selectTaskForSidePanel(item.task);

  row.ondblclick = () => editTaskOccurrence(item.task, item.occurrenceDate);

  return row;
}

// A short, non-looping two-note chime built from plain oscillators -- no
// audio asset file to bundle/ship, and nothing to loop or stop later.
// AudioContext is created fresh per chime and closed once it's done playing;
// wrapped in try/catch since audio can fail to init (no output device,
// autoplay policy, etc.) and a missing chime shouldn't be fatal to the timer
// actually expiring.
function playTimerChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    [880, 660].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = now + i * 0.12;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.3, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    });
    setTimeout(() => ctx.close(), 600);
  } catch {
    // No audio output available -- nothing more to do here.
  }
}

// A timer stops on its own for one of two reasons:
//  - A plain countdown (mode 'countdown', continuePastZero off) reaches
//    zero -- done, not merely paused at zero.
//  - Any timer -- count-up, or a countdown left to run past zero as
//    overtime -- hits the absolute MAX_TIMER_SECONDS ceiling, since neither
//    of those otherwise has a natural end.
// Either way it's cancelled the same way the context menu's own Cancel
// would (including logging its final run's elapsed time, same as
// cancelTaskTimer) and announced with a short chime. Checked against every
// task with a timer (not just the currently-active one) so one left paused
// right at zero also gets cleaned up, not just a running one crossing zero
// live -- though in practice only a running (active) timer's remaining/
// elapsed time actually changes on its own to trigger this. If its task was
// the active one, expiring also unfocuses it -- unlike a manual cancel,
// which leaves the task active in plain focus-only mode, a timer stopping
// this way means the time set aside for it is over, so there's nothing left
// to stay focused on it for.
function expireFinishedTimers() {
  let changed = false;
  for (const t of tasks) {
    if (!t.timer) continue;
    const remaining = currentTimerRemaining(t.timer);
    const ranPastCap = timerElapsedSeconds(t.timer) >= MAX_TIMER_SECONDS;
    const countdownDone = t.timer.mode !== 'countup' && !t.timer.continuePastZero && remaining <= 0;
    if (countdownDone || ranPastCap) {
      flushTimerElapsed(t);
      t.timer = null;
      logTaskEvent(t, 'Timer elapsed');
      changed = true;
      playTimerChime();
      if (t.id === activeTaskId) setActiveTaskId(null);
    }
  }
  if (changed) saveTasks();
}

// Any carried-over occurrence -- done or not, failed or not, recurring or a
// plain one-off task -- gets exactly one extra day shown (as "yesterday"
// carried over) before it's quietly cleared away on its own, the same way
// the Dismiss button would, so nothing lingers on the list forever just
// because it was never explicitly checked off, marked failed, or dismissed.
// Once its most recent occurrence is two or more days old, it's gone from
// here regardless of state -- there's nothing left to act on by then; the
// user had their day.
function autoDismissStaleCarriedOverOccurrences() {
  const todayISO = Recurrence.dateToISO(new Date());
  const yesterdayISO = Recurrence.dateToISO(Recurrence.addDays(new Date(), -1));
  let changed = false;
  for (const task of tasks) {
    const priorDate = Recurrence.previousOccurrenceBefore(task, todayISO);
    if (!priorDate || task.dismissed[priorDate]) continue;
    if (priorDate < yesterdayISO) {
      task.dismissed[priorDate] = true;
      changed = true;
    }
  }
  if (changed) saveTasks();
}

function renderTodo() {
  expireFinishedTimers();
  autoDismissStaleCarriedOverOccurrences();
  updateTodoViewToggleButton();
  updateTodoMonthNav();

  if (tasks.length === 0) {
    todoSectionEl.classList.remove('hidden');
    renderTodoEmptyState();
    return;
  }

  // Stays visible once there are any tasks at all, even if none happen to be
  // due today/tomorrow right now -- otherwise the view-mode toggle itself
  // would be unreachable, and "next recurrence" mode specifically exists to
  // show tasks that aren't due today/tomorrow.
  todoSectionEl.classList.remove('hidden');

  const items =
    todoViewMode === 'next-recurrence'
      ? computeNextRecurrenceItems()
      : todoViewMode === 'all'
        ? computeAllTasksItems(viewedMonthKey)
        : computeTodoDisplayItems(viewedMonthKey);

  // Eligible to be (or stay) the active task: today's occurrence (whether
  // overdue yet or not -- the "Work on this now" button lets the user opt
  // into any of today's tasks, not just overdue ones) or a carried-over
  // overdue one. Passive tasks are never eligible -- they can't be focused
  // on or timed (see canWorkOnNow in buildTodoItemRow).
  //
  // Deliberately NOT just `items` filtered -- those are scoped to whichever
  // month is currently being *browsed* (viewedMonthKey), but eligibility has
  // to stay pinned to the real current month regardless. Otherwise paging
  // away to look at another month while a task is actively being timed would
  // make it look ineligible and clear the timer (see setActiveTaskId below).
  // "Next recurrence" has no such month scoping to begin with, so its own
  // items are already correct as-is.
  const eligibilityItems = todoViewMode === 'next-recurrence' ? items : computeTodoDisplayItems(monthKeyOf(Recurrence.dateToISO(new Date())));
  const activeEligible = eligibilityItems.filter(
    (item) => !item.task.passive && (item.kind === 'today' || item.kind === 'carried-over') && !item.completed
  );

  // Focusing a task is only ever user-initiated (via "Work on this task
  // now" below) -- nothing is auto-activated here. Still clears a stale
  // selection on its own, though: if the specific occurrence that's active
  // (see activeOccurrenceDate) stops being eligible (completed, or rolled
  // past today), there's nothing left for it to refer to -- even if a
  // *different* occurrence of the same recurring task is still eligible,
  // that's not the one the user actually focused.
  if (activeTaskId && !activeEligible.some((item) => item.task.id === activeTaskId && item.occurrenceDate === activeOccurrenceDate)) {
    setActiveTaskId(null);
  }

  todoListEl.innerHTML = '';

  // Grouped and headed by occurrence date (Today/Tomorrow/Yesterday/plain
  // date) rather than the flat, task-creation-order list this used to be --
  // makes the 6pm-onward boundary between today's and tomorrow's preview
  // (and any older carried-over items) visually unambiguous. ISO date
  // strings sort chronologically as plain strings, no date parsing needed.
  const itemsByDate = new Map();
  for (const item of items) {
    if (!itemsByDate.has(item.occurrenceDate)) itemsByDate.set(item.occurrenceDate, []);
    itemsByDate.get(item.occurrenceDate).push(item);
  }
  const todayISO = Recurrence.dateToISO(new Date());

  todoDayHeaderRefs = [];

  for (const dateISO of [...itemsByDate.keys()].sort()) {
    const isToday = dateISO === todayISO;

    // Zero-height marker at exactly this day's own natural (never-sticky)
    // flow position -- updatePinnedTodoHeader reads its position on scroll
    // to tell whether this day has started scrolling past the top, which a
    // header itself can't reliably report once it's the one being pinned
    // (position: sticky overrides its own natural position).
    const sentinel = document.createElement('div');
    sentinel.className = 'todo-day-sentinel';
    todoListEl.appendChild(sentinel);

    const header = document.createElement('div');
    header.className = 'todo-day-header' + (isToday ? '' : ' not-today');

    const headerLabel = document.createElement('span');
    headerLabel.textContent = describeDayLabel(dateISO, todayISO);
    header.appendChild(headerLabel);

    const addBtn = document.createElement('button');
    addBtn.className = 'todo-day-add-btn';
    addBtn.textContent = '+';
    addBtn.title = `Add a task due ${dateISO}`;
    addBtn.onclick = () => openTaskForm(null, undefined, dateISO);
    header.appendChild(addBtn);

    todoListEl.appendChild(header);
    todoDayHeaderRefs.push({ sentinel, header });

    // Within a day: all-day tasks first (they have no due time to sort by),
    // then earliest due time first, ties broken alphabetically by name
    // ("HH:MM" strings compare correctly as plain strings).
    const dayItems = itemsByDate.get(dateISO).sort(compareTodoDisplayOrder);

    // Split into two columns, ordered into them (not across them in rows) in
    // that same display order -- the first column gets the earlier-due
    // tasks, the second the later-due ones, with the first column taking the
    // extra task when the day's count is odd.
    const columns = document.createElement('div');
    columns.className = 'todo-day-columns';
    const firstColumnCount = Math.ceil(dayItems.length / 2);
    const columnItemLists = [dayItems.slice(0, firstColumnCount), dayItems.slice(firstColumnCount)];
    for (const columnItems of columnItemLists) {
      const column = document.createElement('div');
      column.className = 'todo-day-column';
      for (const item of columnItems) {
        column.appendChild(buildTodoItemRow(item, isToday));
      }
      columns.appendChild(column);
    }
    todoListEl.appendChild(columns);
  }

  updatePinnedTodoHeader();
  ensureTimerTicking();
  renderSidePanel();
}

// A running timer's remaining time needs to visibly count down every
// second, not just on whatever triggered the last render -- rather than
// duplicate renderTodo's formatting/eligibility logic in a separate
// second-by-second DOM patch, this just re-runs renderTodo itself once a
// second while (and only while) the active task's timer is actually running
// (runningSince set -- a "Set" timer waiting to be started via focus, see
// startTaskTimerPrompt, has none yet and its frozen display has nothing to
// tick), starting/stopping the interval as that stops being true (including
// once this same call, at the end of every render, re-evaluates it).
let timerTickIntervalId = null;
function ensureTimerTicking() {
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const shouldTick = !!(activeTask && activeTask.timer && activeTask.timer.runningSince != null);
  if (shouldTick && !timerTickIntervalId) {
    timerTickIntervalId = setInterval(renderTodo, 1000);
  } else if (!shouldTick && timerTickIntervalId) {
    clearInterval(timerTickIntervalId);
    timerTickIntervalId = null;
  }
}

// ---------------------------------------------------------------------------
// Side panel -- notes and activity history for whichever task was last
// interacted with (see selectTaskForSidePanel, called from the to-do list's
// click/right-click/checkbox/focus/dismiss handlers). Scoped to either just
// that one logical task (every record sharing its taskId -- e.g. every
// fragment of a recurring task that's been split via edit-scope) or its
// whole series (every record sharing its seriesId, which can span multiple
// distinct taskIds once tasks have been merged together in the manage-tasks
// modal) -- see sidePanelScope/sidePanelRecords.
// ---------------------------------------------------------------------------

const sidePanelEmptyEl = document.getElementById('side-panel-empty');
const sidePanelContentEl = document.getElementById('side-panel-content');
const sidePanelTitleEl = document.getElementById('side-panel-title');
const sidePanelDetailsEl = document.getElementById('side-panel-details');
const sidePanelToggleBtn = document.getElementById('side-panel-toggle-btn');
const sidePanelCommentInput = document.getElementById('side-panel-comment-input');
const sidePanelCommentsEl = document.getElementById('side-panel-comments');
const sidePanelLogEl = document.getElementById('side-panel-log');

let sidePanelTask = null; // the specific task record last interacted with
let sidePanelScope = 'task'; // 'task' | 'series'

function selectTaskForSidePanel(task) {
  sidePanelTask = task;
  renderSidePanel();
  refreshPreviewedHighlight();
}

// Retags which rendered .todo-item row(s) carry the .previewed accent
// without rebuilding the list (renderTodo() does that too, as a side effect
// of recomputing each row's className from scratch, but a full rebuild on
// every plain click broke double-click-to-edit -- see row.onclick in
// buildTodoItemRow). Relies on each row's own __task back-reference.
function refreshPreviewedHighlight() {
  document.querySelectorAll('.todo-item.previewed').forEach((el) => el.classList.remove('previewed'));
  if (!sidePanelTask) return;
  document.querySelectorAll('.todo-item').forEach((el) => {
    if (el.__task === sidePanelTask) el.classList.add('previewed');
  });
}

function sidePanelRecords() {
  if (!sidePanelTask) return [];
  return sidePanelScope === 'series'
    ? tasksInSeries(sidePanelTask.seriesId)
    : tasks.filter((t) => t.taskId === sidePanelTask.taskId);
}

function buildSidePanelEmptyRow(text) {
  const empty = document.createElement('div');
  empty.className = 'todo-manage-empty';
  empty.textContent = text;
  return empty;
}

function renderSidePanel() {
  // The selected record can vanish out from under the panel (deleted, or
  // merged away -- tasksInSeries/taskId lookups above would just silently
  // return nothing for it), so this doubles as the panel's own cleanup.
  if (!sidePanelTask || !tasks.includes(sidePanelTask)) {
    sidePanelTask = null;
    sidePanelEmptyEl.classList.remove('hidden');
    sidePanelContentEl.classList.add('hidden');
    return;
  }

  sidePanelEmptyEl.classList.add('hidden');
  sidePanelContentEl.classList.remove('hidden');
  sidePanelTitleEl.textContent = sidePanelTask.name;
  // Tied to the exact record last interacted with, same as the title above,
  // not aggregated across the task/series toggle -- there's one "Details"
  // per task record, not a merged history of every fragment's own text.
  sidePanelDetailsEl.textContent = sidePanelTask.details || '';
  sidePanelDetailsEl.classList.toggle('hidden', !sidePanelTask.details);
  sidePanelToggleBtn.textContent = sidePanelScope === 'series' ? 'Series' : 'Task';
  sidePanelToggleBtn.title =
    sidePanelScope === 'series'
      ? 'Showing the whole series -- click to show just this task'
      : 'Showing just this task -- click to show its whole series';

  const records = sidePanelRecords();

  const comments = records.flatMap((t) => t.comments || []).sort((a, b) => b.timestamp - a.timestamp);
  sidePanelCommentsEl.innerHTML = '';
  if (comments.length === 0) {
    sidePanelCommentsEl.appendChild(buildSidePanelEmptyRow('No notes yet.'));
  } else {
    for (const c of comments) {
      const item = document.createElement('div');
      item.className = 'side-panel-comment-item';
      const time = document.createElement('div');
      time.className = 'side-panel-comment-time';
      time.textContent = new Date(c.timestamp).toLocaleString();
      const text = document.createElement('div');
      text.className = 'side-panel-comment-text';
      text.textContent = c.text;
      item.appendChild(time);
      item.appendChild(text);
      sidePanelCommentsEl.appendChild(item);
    }
  }

  const logEntries = records.flatMap((t) => t.log || []).sort((a, b) => b.timestamp - a.timestamp);
  sidePanelLogEl.innerHTML = '';
  if (logEntries.length === 0) {
    sidePanelLogEl.appendChild(buildSidePanelEmptyRow('No activity yet.'));
  } else {
    for (const entry of logEntries) {
      const item = document.createElement('div');
      item.className = 'side-panel-log-item';
      const msg = document.createElement('span');
      msg.textContent = entry.message;
      const time = document.createElement('span');
      time.className = 'side-panel-log-time';
      time.textContent = new Date(entry.timestamp).toLocaleString();
      item.appendChild(msg);
      item.appendChild(time);
      sidePanelLogEl.appendChild(item);
    }
  }
}

sidePanelToggleBtn.onclick = () => {
  sidePanelScope = sidePanelScope === 'series' ? 'task' : 'series';
  renderSidePanel();
};

document.getElementById('side-panel-comment-add').onclick = () => {
  if (!sidePanelTask) return;
  const text = sidePanelCommentInput.value.trim();
  if (!text) return;
  addTaskComment(sidePanelTask, text);
  sidePanelCommentInput.value = '';
  saveTasks();
  renderSidePanel();
};

const todoManageOverlay = document.getElementById('todo-manage-overlay');
const todoManageMonthsEl = document.getElementById('todo-manage-months');
const seriesEditEmptyEl = document.getElementById('series-edit-empty');
const seriesEditPanelEl = document.getElementById('series-edit-panel');
const seriesEditNameInput = document.getElementById('series-edit-name-input');
const seriesEditListEl = document.getElementById('series-edit-list');
const todoManageRightEl = document.querySelector('.todo-manage-right');

// Two clicks to delete (arm -> confirm), instead of a native confirm()
// dialog -- shared by every per-task row that offers deleting. Moving off
// `row` disarms it back to the trash-can icon.
function appendDeleteButton(row, onConfirm) {
  const deleteBtn = document.createElement('button');
  const trashIcon =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>';
  const confirmIcon =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M11 7h2v8h-2zM11 16h2v2h-2z"/></svg>';
  deleteBtn.title = 'Delete';
  deleteBtn.innerHTML = trashIcon;
  let deleteArmed = false;
  deleteBtn.onclick = () => {
    if (!deleteArmed) {
      deleteArmed = true;
      deleteBtn.innerHTML = confirmIcon;
      deleteBtn.title = 'Click again to delete';
      deleteBtn.classList.add('confirm');
    } else {
      onConfirm();
    }
  };
  row.addEventListener('mouseleave', () => {
    if (!deleteArmed) return;
    deleteArmed = false;
    deleteBtn.innerHTML = trashIcon;
    deleteBtn.title = 'Delete';
    deleteBtn.classList.remove('confirm');
  });
  row.appendChild(deleteBtn);
}

function monthKeyOf(dateISO) {
  return dateISO.slice(0, 7); // 'YYYY-MM'
}

function addMonthsToKey(monthKey, n) {
  const [y, m] = monthKey.split('-').map(Number);
  const total = y * 12 + (m - 1) + n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, '0')}`;
}

function formatMonthLabel(monthKey) {
  const [y, m] = monthKey.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

// Whether `task` lands on any date within monthKey, without enumerating
// every day in it -- the first occurrence on/after the month's first day
// either falls inside the month or it doesn't.
function taskOccursInMonth(task, monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  const startISO = `${monthKey}-01`;
  const endISO = `${monthKey}-${String(Recurrence.daysInMonth(year, month - 1)).padStart(2, '0')}`;
  if (Recurrence.occursOn(task, startISO)) return true;
  const dayBeforeStart = Recurrence.dateToISO(Recurrence.addDays(new Date(startISO + 'T00:00:00'), -1));
  const occ = Recurrence.nextOccurrenceAfter(task, dayBeforeStart);
  return !!occ && occ <= endISO;
}

// Safety net matching recurrence.js's own MAX_SCAN_DAYS -- an implausible
// endDate shouldn't make the month scan below iterate for centuries.
const MAX_SCAN_MONTHS = 1200;

// monthKey -> Set(seriesId) for every series with at least one occurrence
// landing in that month. Each task is only scanned across its own relevant
// span -- its due date's month through its end date's month, or through the
// current month if it's still open-ended -- rather than some arbitrary
// global range.
function computeSeriesMonthGroups() {
  const currentMonthKey = monthKeyOf(Recurrence.dateToISO(new Date()));
  const monthsMap = new Map();

  for (const task of tasks) {
    const startMonth = monthKeyOf(task.dueDate);
    const endMonth = task.endDate
      ? monthKeyOf(task.endDate)
      : startMonth > currentMonthKey
        ? startMonth
        : currentMonthKey;

    let cursor = startMonth;
    for (let i = 0; i < MAX_SCAN_MONTHS && cursor <= endMonth; i++) {
      if (taskOccursInMonth(task, cursor)) {
        if (!monthsMap.has(cursor)) monthsMap.set(cursor, new Set());
        monthsMap.get(cursor).add(task.seriesId);
      }
      cursor = addMonthsToKey(cursor, 1);
    }
  }

  return monthsMap;
}

// Which series (if any) is open in the right-hand editor pane.
let manageSelectedSeriesId = null;

function selectSeriesInManage(seriesId) {
  manageSelectedSeriesId = seriesId;
  renderTodoManageMonths();
  renderSeriesEditorPane();
}

function renderTodoManageMonths() {
  const monthsMap = computeSeriesMonthGroups();
  const monthKeys = [...monthsMap.keys()].sort().reverse();
  todoManageMonthsEl.innerHTML = '';

  if (monthKeys.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'todo-manage-empty';
    empty.textContent = 'No tasks yet.';
    todoManageMonthsEl.appendChild(empty);
    return;
  }

  for (const monthKey of monthKeys) {
    const group = document.createElement('div');
    group.className = 'series-month-group';

    const header = document.createElement('div');
    header.className = 'series-month-header';
    header.textContent = formatMonthLabel(monthKey);
    group.appendChild(header);

    const seriesInMonth = [...monthsMap.get(monthKey)]
      .map((seriesId) => ({ seriesId, members: tasksInSeries(seriesId) }))
      .sort((a, b) => a.members[0].name.localeCompare(b.members[0].name));

    for (const { seriesId, members } of seriesInMonth) {
      // White: a single task record (whether a plain one-off or an unbroken
      // recurring task). Blue: more than one record, but all of them are
      // fragments of the SAME logical task (one taskId) -- a recurring task
      // that's been split via edit-scope but never merged with anything
      // else. Green: more than one record spanning multiple distinct
      // taskIds -- this series is itself a merge of separately-created
      // tasks (see the drag & drop handling below).
      const distinctTaskIds = new Set(members.map((t) => t.taskId));
      const colorClass =
        members.length <= 1 ? 'series-row-single' : distinctTaskIds.size === 1 ? 'series-row-multi' : 'series-row-mixed';

      const row = document.createElement('div');
      row.className = 'series-row ' + colorClass;
      if (seriesId === manageSelectedSeriesId) row.classList.add('selected');
      row.textContent = members[0].name;
      row.onclick = () => selectSeriesInManage(seriesId);

      // Only a series representing a single logical task -- white or blue,
      // i.e. exactly one taskId, however many records it's split into --
      // can be dragged into another one. A green (already-mixed) series
      // can't be pulled in as a further unit; peeling a task back out of it
      // still has to go through the explicit "Remove from series" button.
      if (distinctTaskIds.size === 1) {
        row.draggable = true;
        row.ondragstart = (e) => {
          e.dataTransfer.setData('text/plain', seriesId);
          e.dataTransfer.effectAllowed = 'move';
        };
      }

      group.appendChild(row);
    }

    todoManageMonthsEl.appendChild(group);
  }
}

function buildSeriesMemberRow(task) {
  const row = document.createElement('div');
  row.className = 'todo-manage-item';

  const info = document.createElement('div');
  info.className = 'todo-manage-item-info';
  const name = document.createElement('div');
  name.className = 'todo-manage-item-name';
  name.textContent = task.name;
  info.appendChild(name);
  const meta = document.createElement('div');
  meta.className = 'todo-manage-item-meta';
  meta.textContent = describeTaskSchedule(task);
  info.appendChild(meta);
  row.appendChild(info);

  const editBtn = document.createElement('button');
  editBtn.title = 'Edit';
  editBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
  editBtn.onclick = () => openTaskForm(task);
  row.appendChild(editBtn);

  // Leaving the series is nothing but getting a fresh seriesId -- the task
  // itself, and everything else about it, is untouched.
  const removeBtn = document.createElement('button');
  removeBtn.title = 'Remove from series';
  removeBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M5 11v2h9v-2H5zm11-4-1.41 1.41L17.17 11H10v2h7.17l-2.58 2.59L16 17l5-5-5-5z"/></svg>';
  removeBtn.onclick = () => {
    task.seriesId = uid();
    saveTasks();
    renderTodo();
    refreshTodoManageModal();
  };
  row.appendChild(removeBtn);

  appendDeleteButton(row, () => deleteTask(task.id)); // deleteTask itself calls refreshTodoManageModal

  return row;
}

function renderSeriesEditorPane() {
  const members = manageSelectedSeriesId ? tasksInSeries(manageSelectedSeriesId) : [];
  if (members.length === 0) {
    manageSelectedSeriesId = null; // the selected series was emptied out (last member deleted/moved away)
    seriesEditEmptyEl.classList.remove('hidden');
    seriesEditPanelEl.classList.add('hidden');
    return;
  }

  seriesEditEmptyEl.classList.add('hidden');
  seriesEditPanelEl.classList.remove('hidden');

  const sorted = members.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  // Prefills with whatever the first member is currently called -- just a
  // starting point for the rename field, not a stored "series name".
  seriesEditNameInput.value = sorted[0].name;
  seriesEditListEl.innerHTML = '';
  for (const task of sorted) seriesEditListEl.appendChild(buildSeriesMemberRow(task));
}

// The one hook every task-data mutation (add/edit/delete/split/rename/
// reassign) calls to keep both halves of the modal in sync -- which months
// have activity and the blue/white series coloring can both change from any
// of them.
function refreshTodoManageModal() {
  renderTodoManageMonths();
  renderSeriesEditorPane();
}

document.getElementById('series-edit-rename-btn').onclick = () => {
  if (!manageSelectedSeriesId) return;
  const newName = seriesEditNameInput.value.trim();
  if (!newName) return;
  for (const task of tasksInSeries(manageSelectedSeriesId)) task.name = newName;
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
};

document.getElementById('series-edit-add-new-btn').onclick = async () => {
  if (!manageSelectedSeriesId) return;
  const nameDefault = seriesEditNameInput.value.trim();
  await openTaskForm(null, null, null, { forcedSeriesId: manageSelectedSeriesId, nameDefault });
};

// Dropping a dragged white/blue series (see renderTodoManageMonths -- a
// single logical task, whether it's one record or several split fragments)
// onto the right-hand pane pulls every one of its records into whichever
// series is currently open there, all at once -- the only way to move a
// task between series, per the "only a single-taskId series can be pulled
// into another one" rule. A green (already-mixed) series is never a drag
// source to begin with, so there's no drop path that could merge two
// already-merged series together.
todoManageRightEl.addEventListener('dragover', (e) => {
  if (!manageSelectedSeriesId) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  todoManageRightEl.classList.add('drag-over');
});
todoManageRightEl.addEventListener('dragleave', () => todoManageRightEl.classList.remove('drag-over'));
todoManageRightEl.addEventListener('drop', (e) => {
  e.preventDefault();
  todoManageRightEl.classList.remove('drag-over');
  if (!manageSelectedSeriesId) return;
  const sourceSeriesId = e.dataTransfer.getData('text/plain');
  if (!sourceSeriesId || sourceSeriesId === manageSelectedSeriesId) return;
  const sourceMembers = tasksInSeries(sourceSeriesId);
  // Re-checks single-taskId-ness at drop time, not just at drag start --
  // the dragged series could have changed in between (e.g. another drop
  // already claimed part of it).
  if (sourceMembers.length === 0 || new Set(sourceMembers.map((t) => t.taskId)).size !== 1) return;
  for (const task of sourceMembers) task.seriesId = manageSelectedSeriesId;
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
});

document.getElementById('todo-manage-btn').onclick = () => {
  refreshTodoManageModal();
  todoManageOverlay.classList.remove('hidden');
};
document.getElementById('todo-manage-close').onclick = () => {
  todoManageOverlay.classList.add('hidden');
  manageSelectedSeriesId = null;
};
document.getElementById('todo-add-btn').onclick = () => openTaskForm(null);

// ---------------------------------------------------------------------------
// Task stats ("Task stats..." on the to-do context menu).
// ---------------------------------------------------------------------------

// A recurring task split via "only this occurrence" / "this and following"
// (see applySplitEdit/applySplitDelete) spreads its history across multiple
// task records that all share the original's seriesId -- any true total has
// to look across every one of them, not just whichever record is currently
// on-screen representing "the task".
function tasksInSeries(seriesId) {
  return tasks.filter((t) => t.seriesId === seriesId);
}

// A series counts as recurring if any fragment still has a repeating
// frequency, or if it's already been split into more than one record --
// even an entirely-split series of individually-'once' fragments is still a
// recurring task's history, not a plain one-off.
function isRecurringSeries(seriesTasks) {
  return seriesTasks.length > 1 || seriesTasks.some((t) => t.frequency.type !== 'once');
}

// Merges every fragment's focusLog into one per-occurrence-date map plus
// running totals. Fragments' date ranges never overlap (each split truncates
// the historical portion's endDate right before the next fragment starts),
// so this never double-counts a date across fragments.
function aggregateFocusLog(seriesTasks) {
  const byDate = new Map();
  let totalFocusedSeconds = 0;
  let totalTimerSeconds = 0;
  for (const t of seriesTasks) {
    for (const [date, entry] of Object.entries(t.focusLog || {})) {
      const bucket = byDate.get(date) || { focusedSeconds: 0, timerSeconds: 0 };
      bucket.focusedSeconds += entry.focusedSeconds || 0;
      bucket.timerSeconds += entry.timerSeconds || 0;
      byDate.set(date, bucket);
      totalFocusedSeconds += entry.focusedSeconds || 0;
      totalTimerSeconds += entry.timerSeconds || 0;
    }
  }
  return { byDate, totalFocusedSeconds, totalTimerSeconds };
}

function countSeriesCompletions(seriesTasks) {
  let count = 0;
  for (const t of seriesTasks) count += Object.values(t.completions || {}).filter(Boolean).length;
  return count;
}

// How many occurrences of the series have happened up to and including
// today, across every fragment -- reuses forEachOccurrenceBefore (see the
// dismissal logic above), which already respects each fragment's own
// dueDate/endDate via Recurrence.occursOn.
function countSeriesOccurrencesToDate(seriesTasks, todayISO) {
  const cutoff = Recurrence.dateToISO(Recurrence.addDays(new Date(todayISO + 'T00:00:00'), 1));
  let count = 0;
  for (const t of seriesTasks) forEachOccurrenceBefore(t, cutoff, () => count++);
  return count;
}

function formatStatsDuration(totalSeconds) {
  const seconds = Math.round(totalSeconds);
  if (seconds <= 0) return '0s';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (h > 0 || m > 0) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(' ');
}

function buildStatRow(label, value) {
  const row = document.createElement('div');
  row.className = 'task-stats-row';
  const labelEl = document.createElement('span');
  labelEl.className = 'task-stats-label';
  labelEl.textContent = label;
  const valueEl = document.createElement('span');
  valueEl.className = 'task-stats-value';
  valueEl.textContent = value;
  row.appendChild(labelEl);
  row.appendChild(valueEl);
  return row;
}

function buildStatsSection(heading) {
  const section = document.createElement('div');
  section.className = 'task-stats-section';
  const headingEl = document.createElement('div');
  headingEl.className = 'task-stats-heading';
  headingEl.textContent = heading;
  section.appendChild(headingEl);
  return section;
}

const taskStatsOverlay = document.getElementById('task-stats-overlay');
const taskStatsTitleEl = document.getElementById('task-stats-title');
const taskStatsBodyEl = document.getElementById('task-stats-body');

function showTaskStatsModal(task) {
  taskStatsTitleEl.textContent = `Stats: ${task.name}`;
  taskStatsBodyEl.innerHTML = '';

  const seriesTasks = tasksInSeries(task.seriesId);
  const recurring = isRecurringSeries(seriesTasks);
  const { byDate, totalFocusedSeconds, totalTimerSeconds } = aggregateFocusLog(seriesTasks);

  const totalsSection = buildStatsSection(recurring ? 'Total time focused (all recurrences)' : 'Total time focused');
  totalsSection.appendChild(buildStatRow('Total', formatStatsDuration(totalFocusedSeconds + totalTimerSeconds)));
  totalsSection.appendChild(buildStatRow('Just focused', formatStatsDuration(totalFocusedSeconds)));
  totalsSection.appendChild(buildStatRow('Focused with timer', formatStatsDuration(totalTimerSeconds)));
  taskStatsBodyEl.appendChild(totalsSection);

  if (!recurring) {
    taskStatsOverlay.classList.remove('hidden');
    return;
  }

  const todayISO = Recurrence.dateToISO(new Date());
  const completed = countSeriesCompletions(seriesTasks);
  const occurrences = countSeriesOccurrencesToDate(seriesTasks, todayISO);
  const percent = occurrences > 0 ? Math.round((completed / occurrences) * 100) : 0;

  const completionSection = buildStatsSection('Completion');
  completionSection.appendChild(buildStatRow('Completed', String(completed)));
  completionSection.appendChild(buildStatRow('Recurrences to date', String(occurrences)));
  completionSection.appendChild(buildStatRow('Completion rate', `${percent}%`));
  taskStatsBodyEl.appendChild(completionSection);

  const perRecurrenceSection = buildStatsSection('Time per recurrence');
  const dates = [...byDate.keys()].sort().reverse();
  if (dates.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'task-stats-empty';
    empty.textContent = 'No focused time logged yet.';
    perRecurrenceSection.appendChild(empty);
  } else {
    const list = document.createElement('div');
    list.className = 'task-stats-occurrence-list';
    for (const date of dates) {
      const entry = byDate.get(date);
      const item = document.createElement('div');
      item.className = 'task-stats-occurrence-item';
      const dateEl = document.createElement('span');
      dateEl.className = 'task-stats-occurrence-date';
      dateEl.textContent = date;
      const timeEl = document.createElement('span');
      timeEl.className = 'task-stats-occurrence-time';
      timeEl.textContent = `${formatStatsDuration(entry.focusedSeconds)} focused · ${formatStatsDuration(entry.timerSeconds)} timer`;
      item.appendChild(dateEl);
      item.appendChild(timeEl);
      list.appendChild(item);
    }
    perRecurrenceSection.appendChild(list);
  }
  taskStatsBodyEl.appendChild(perRecurrenceSection);

  taskStatsOverlay.classList.remove('hidden');
}

document.getElementById('task-stats-close').onclick = () => taskStatsOverlay.classList.add('hidden');

// ---------------------------------------------------------------------------
// Boot -- gates the app behind the (fake, see login()/getMe() above) login
// screen. Everything above this point is safe to run unconditionally at
// script-load time (it's all function/event-listener setup, nothing reads
// `tasks` yet); only actually loading data and rendering waits for a user.
// ---------------------------------------------------------------------------

const loginScreenEl = document.getElementById('login-screen');
const appMainEl = document.getElementById('app-main');

// The one-time "we now know who's logged in" entry point, run either right
// after boot() finds an existing token or right after the login form
// resolves a fresh one -- loads that user's tasks and renders for the first
// time. Everything from here on (every saveTasks()/loadTasks() call
// elsewhere in the app) already defaults to currentUserId on its own.
function startApp() {
  tasks = loadTasks(currentUserId);
  renderTodo();
}

function boot() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    loginScreenEl.classList.remove('hidden');
    return;
  }
  appMainEl.classList.remove('hidden');
  getMe(token).then((user) => {
    currentUserId = user.id;
    startApp();
  });
}

document.getElementById('login-form').onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const { token } = await login(username, password);
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const user = await getMe(token);
  currentUserId = user.id;
  loginScreenEl.classList.add('hidden');
  appMainEl.classList.remove('hidden');
  startApp();
};

// Clears the saved token and reloads -- the easiest way back to the login
// screen for testing it, and simpler/more robust than manually resetting
// every piece of in-memory state (tasks, activeTaskId, sidePanelTask, ...)
// by hand.
document.getElementById('logout-btn').onclick = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  location.reload();
};

boot();
