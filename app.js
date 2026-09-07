function uid() {
  return Math.random().toString(36).slice(2, 9);
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

// fields: [{ name, label, value, placeholder, required, min, max }] for
// text/date/time/number fields (type defaults to 'text', also accepts
// 'date'/'time'/'number'/'textarea'; min/max only apply to 'number' and are
// native HTML constraints, not enforced beyond what the browser's own number
// input does),
// [{ name, label, type: 'select', options: [{value, label}], value }] for a
// select, or [{ name, label, type: 'checkboxes', options: [{value, label}],
// value: string[] }] for a multi-select (resolves to an array). Fields
// default to required (non-empty / non-empty-array); pass required: false to
// allow blank. Resolves { [field.name]: value } on OK, MODAL_DELETE_RESULT if
// opts.deleteLabel is set and its two-click arm/confirm is completed, or null
// on Cancel/Escape. opts.okLabel/cancelLabel override the button text.
function showFormModal(title, fields, opts = {}) {
  return new Promise((resolve) => {
    modalTitle.textContent = title;
    modalFields.innerHTML = '';
    modalOk.textContent = opts.okLabel || 'OK';
    modalCancel.textContent = opts.cancelLabel || 'Cancel';

    // The overlay's DOM (including .modal-actions) is reused across every
    // showFormModal() call in the app, so any delete button from a previous
    // call must be torn down before conditionally adding a fresh one here.
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

    const interactiveEls = [];
    const fieldGetters = fields.map((field) => {
      const wrap = document.createElement('div');
      wrap.className = 'modal-field';

      const label = document.createElement('label');
      label.textContent = field.label;
      wrap.appendChild(label);

      let getValue;
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
        wrap.appendChild(select);
        interactiveEls.push(select);
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
        wrap.appendChild(box);
        getValue = () => checkboxes.filter((cb) => cb.checked).map((cb) => cb.dataset.value);
      } else if (field.type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.className = 'modal-input modal-textarea';
        textarea.value = field.value || '';
        textarea.placeholder = field.placeholder || '';
        wrap.appendChild(textarea);
        interactiveEls.push(textarea);
        getValue = () => textarea.value.trim();
      } else {
        const input = document.createElement('input');
        input.className = 'modal-input';
        input.type = field.type || 'text';
        input.value = field.value || '';
        input.placeholder = field.placeholder || '';
        if (field.min != null) input.min = field.min;
        if (field.max != null) input.max = field.max;
        wrap.appendChild(input);
        interactiveEls.push(input);
        getValue = () => input.value.trim();
      }

      modalFields.appendChild(wrap);
      return {
        getValue,
        name: field.name,
        required: field.required !== false,
        isArray: field.type === 'checkboxes',
        wrap,
        showIf: field.showIf,
      };
    });

    // Fields with a `showIf(values)` predicate (e.g. a monthly-only option
    // that's irrelevant unless "Repeats" is set to monthly) are hidden/shown
    // as any field changes, rather than always showing every field
    // regardless of the current selection. A hidden field's own
    // required-ness is ignored on submit, but its value is still included in
    // the result -- so switching frequency back and forth doesn't lose
    // whatever was entered in a temporarily-hidden field.
    function currentValues() {
      const values = {};
      for (const f of fieldGetters) values[f.name] = f.getValue();
      return values;
    }

    function updateVisibility() {
      if (!fieldGetters.some((f) => f.showIf)) return; // no conditional fields, skip the work
      const values = currentValues();
      for (const f of fieldGetters) {
        if (f.showIf) f.wrap.classList.toggle('modal-field-hidden', !f.showIf(values));
      }
    }

    modalOverlay.classList.remove('hidden');
    interactiveEls[0].focus(); // select-all-on-focus (except textareas) is handled generically by sharedInputBehavior.js
    updateVisibility();

    function finish(result) {
      modalOverlay.classList.add('hidden');
      modalOk.onclick = null;
      modalCancel.onclick = null;
      interactiveEls.forEach((el) => {
        el.onkeydown = null;
        el.onchange = null;
        el.oninput = null;
      });
      resolve(result);
    }

    function submit() {
      const result = {};
      for (const f of fieldGetters) {
        const value = f.getValue();
        const visible = !f.wrap.classList.contains('modal-field-hidden');
        if (visible && f.required && (f.isArray ? value.length === 0 : !value)) return;
        result[f.name] = value;
      }
      finish(result);
    }

    modalOk.onclick = submit;
    modalCancel.onclick = () => finish(null);
    interactiveEls.forEach((el) => {
      el.onchange = updateVisibility;
      el.oninput = updateVisibility;
      el.onkeydown = (e) => {
        if (e.key === 'Enter' && el.tagName !== 'TEXTAREA') submit();
        if (e.key === 'Escape') {
          e.stopPropagation(); // don't let other Escape handlers also fire
          finish(null);
        }
      };
    });
  });
}

// ---------------------------------------------------------------------------
// To-do list.
// ---------------------------------------------------------------------------

const TASKS_STORAGE_KEY = 'advanced-todo-tasks';
const ACTIVE_TASK_STORAGE_KEY = 'advanced-todo-active-task';

function loadTasks() {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (raw) {
      const loaded = JSON.parse(raw);
      // Backward compatibility: tasks saved before seriesId existed each get
      // their own fresh one -- they were never part of a split, so there's
      // no correct value to backfill beyond "distinct from everything else".
      for (const task of loaded) {
        if (!task.seriesId) task.seriesId = uid();
      }
      return loaded;
    }
  } catch {
    // fall through to empty
  }
  return [];
}

let tasks = loadTasks();
let activeTaskId = localStorage.getItem(ACTIVE_TASK_STORAGE_KEY) || null;

function saveTasks() {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

function saveActiveTaskId() {
  if (activeTaskId) localStorage.setItem(ACTIVE_TASK_STORAGE_KEY, activeTaskId);
  else localStorage.removeItem(ACTIVE_TASK_STORAGE_KEY);
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
// context menu).
function setActiveTaskId(newId) {
  if (newId === activeTaskId) return;
  const prevTask = tasks.find((t) => t.id === activeTaskId);
  if (prevTask && prevTask.timer) freezeTimer(prevTask.timer);
  activeTaskId = newId;
  saveActiveTaskId();
  const nextTask = tasks.find((t) => t.id === activeTaskId);
  if (nextTask && nextTask.timer) nextTask.timer.runningSince = Date.now();
  saveTasks();
}

// A timer's remaining time is derived from a fixed checkpoint
// (remainingSeconds) plus, only while actually running, elapsed wall-clock
// time since runningSince -- not a plain JS countdown -- so it keeps
// counting correctly across a page reload (runningSince survives in
// localStorage as an absolute timestamp) without drifting.
function currentTimerRemaining(timer) {
  if (timer.runningSince == null) return timer.remainingSeconds;
  const elapsed = (Date.now() - timer.runningSince) / 1000;
  return Math.max(0, timer.remainingSeconds - elapsed);
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

// "Timer..." on the to-do context menu -- prompts for a duration (capped at
// 360 minutes/6 hours) and, if confirmed, starts it and marks the task
// active (see setActiveTaskId), same as clicking its "Work on this now"
// button would.
async function startTaskTimerPrompt(task) {
  const result = await showFormModal(
    'Set a timer',
    [{ name: 'minutes', label: 'Minutes to work on this task', type: 'number', value: '25', min: 1, max: 360 }],
    { okLabel: 'Start' }
  );
  if (!result) return;
  const minutes = Math.min(360, Math.max(1, Math.round(Number(result.minutes)) || 0));
  if (!minutes) return;
  // runningSince is set here directly, not left for setActiveTaskId below to
  // fill in -- if this task was already the active one (e.g. it stayed
  // active after a previous timer on it was cancelled), setActiveTaskId is
  // a same-id no-op and would never start this brand-new timer ticking.
  task.timer = { totalSeconds: minutes * 60, remainingSeconds: minutes * 60, runningSince: Date.now() };
  saveTasks();
  setActiveTaskId(task.id);
  renderTodo();
}

function cancelTaskTimer(task) {
  task.timer = null;
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
// (see buildTodoItemRow) -- starting or resuming a timer marks the task
// active the same way that button does, so it's gated identically. A timer
// that already exists can always be cancelled regardless, even if the task
// somehow stopped being eligible in the meantime.
function showTodoContextMenu(event, task, canWorkOnNow) {
  closeTodoContextMenu();
  const menu = document.createElement('div');
  menu.className = 'todo-context-menu';

  function addItem(label, onClick) {
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

  if (!task.timer) {
    if (canWorkOnNow) addItem('Timer…', () => startTaskTimerPrompt(task));
  } else if (task.id === activeTaskId) {
    addItem('Pause timer', () => {
      setActiveTaskId(null);
      renderTodo();
    });
    addItem('Cancel timer', () => cancelTaskTimer(task));
  } else {
    if (canWorkOnNow) {
      addItem('Resume timer', () => {
        setActiveTaskId(task.id);
        renderTodo();
      });
    }
    addItem('Cancel timer', () => cancelTaskTimer(task));
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

// A single select value like "custom-days" <-> the stored {type, interval}
// shape, so "Daily"/"Weekly"/"Monthly" can be plain one-click options while
// "Every N ..." only needs one extra number field regardless of unit.
function encodeFrequency(freq) {
  if (freq.type === 'once') return 'once';
  if (freq.interval === 1) {
    if (freq.type === 'days') return 'daily';
    if (freq.type === 'weeks') return 'weekly';
    if (freq.type === 'months') return 'monthly';
  }
  return 'custom-' + freq.type;
}

// `extra` carries the task form's weekly/monthly sub-fields (weekdays,
// monthlyMode, monthlyOffset, monthlyWeekday, monthlyOrdinal) -- folded into
// the decoded frequency only when they're actually relevant to the chosen
// type, so e.g. leftover monthly fields from switching frequencyType back
// and forth don't leak into a plain weekly/daily task.
function decodeFrequency(frequencyType, intervalStr, extra = {}) {
  const interval = Math.max(1, parseInt(intervalStr, 10) || 1);
  const base = (() => {
    switch (frequencyType) {
      case 'once':
        return { type: 'once', interval: 1 };
      case 'daily':
        return { type: 'days', interval: 1 };
      case 'weekly':
        return { type: 'weeks', interval: 1 };
      case 'monthly':
        return { type: 'months', interval: 1 };
      case 'custom-days':
        return { type: 'days', interval };
      case 'custom-weeks':
        return { type: 'weeks', interval };
      case 'custom-months':
        return { type: 'months', interval };
      default:
        return { type: 'days', interval: 1 };
    }
  })();

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
    }
  }
  return base;
}

const WEEKDAY_SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORDINAL_LABELS = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', last: 'last' };

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
      label = `${base}, ${ORDINAL_LABELS[freq.ordinal]} ${WEEKDAY_SHORT_NAMES[freq.weekday]}`;
    } else {
      label = base;
    }
  } else {
    label = '';
  }
  const scheduleBase = `${task.dueDate} ${task.allDay ? 'all day' : task.dueTime} · ${label}`;
  const withEnd = task.endDate ? `${scheduleBase} until ${task.endDate}` : scheduleBase;
  if (task.appointment) return `${withEnd} · Appointment (expires)`;
  return withEnd;
}

const FREQUENCY_OPTIONS = [
  { value: 'once', label: 'Once' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom-days', label: 'Every N days' },
  { value: 'custom-weeks', label: 'Every N weeks' },
  { value: 'custom-months', label: 'Every N months' },
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
];

const ORDINAL_OPTIONS = [
  { value: '1', label: '1st' },
  { value: '2', label: '2nd' },
  { value: '3', label: '3rd' },
  { value: '4', label: '4th' },
  { value: '5', label: '5th' },
  { value: 'last', label: 'Last' },
];

const isWeeklyFrequencyType = (frequencyType) => frequencyType === 'weekly' || frequencyType === 'custom-weeks';
const isMonthlyFrequencyType = (frequencyType) => frequencyType === 'monthly' || frequencyType === 'custom-months';

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
async function openTaskForm(existingTask, splitContext, initialDueDate) {
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
      { name: 'name', label: 'Name', value: existingTask ? existingTask.name : '' },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        value: existingTask ? existingTask.description : '',
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
      {
        name: 'frequencyType',
        label: 'Repeats',
        type: 'select',
        value: existingTask ? encodeFrequency(existingTask.frequency) : 'once',
        options: FREQUENCY_OPTIONS,
      },
      {
        name: 'interval',
        label: 'N (only used for "Every N ..." above)',
        value: existingTask ? String(existingTask.frequency.interval || 1) : '1',
        required: false,
      },
      {
        name: 'weekdays',
        label: "Also recur on these days (weekly only; leave blank to just use the due date's weekday)",
        type: 'checkboxes',
        value: existingTask && existingTask.frequency.weekdays ? existingTask.frequency.weekdays.map(String) : [],
        options: WEEKDAY_CHECKBOX_OPTIONS,
        required: false,
        showIf: (v) => isWeeklyFrequencyType(v.frequencyType),
      },
      {
        name: 'monthlyMode',
        label: 'Monthly pattern',
        type: 'select',
        value: existingTask ? existingTask.frequency.dayMode || 'day' : 'day',
        options: MONTHLY_MODE_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v.frequencyType),
      },
      {
        name: 'monthlyOffset',
        label: 'Days before last day of month (0-3)',
        value: existingTask && existingTask.frequency.offset != null ? String(existingTask.frequency.offset) : '0',
        required: false,
        showIf: (v) => isMonthlyFrequencyType(v.frequencyType) && v.monthlyMode === 'before-last',
      },
      {
        name: 'monthlyWeekday',
        label: 'Day of week',
        type: 'select',
        value: existingTask && existingTask.frequency.weekday != null ? String(existingTask.frequency.weekday) : '1',
        options: WEEKDAY_SELECT_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v.frequencyType) && v.monthlyMode === 'weekday',
      },
      {
        name: 'monthlyOrdinal',
        label: 'Which occurrence',
        type: 'select',
        value: existingTask && existingTask.frequency.ordinal != null ? String(existingTask.frequency.ordinal) : '1',
        options: ORDINAL_OPTIONS,
        showIf: (v) => isMonthlyFrequencyType(v.frequencyType) && v.monthlyMode === 'weekday',
      },
      {
        name: 'endDate',
        label: 'End date (optional, recurring tasks only -- last recurrence on or before this date)',
        type: 'date',
        value: existingTask && existingTask.endDate ? existingTask.endDate : '',
        required: false,
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
    ],
    { okLabel: existingTask ? 'Save' : 'Add', deleteLabel: existingTask ? 'Delete' : undefined }
  );

  if (result === MODAL_DELETE_RESULT) {
    // Editing "all occurrences" has no splitContext (see the double-click
    // handler below and the manage list's own edit button) and deletes the
    // whole task. Editing a single occurrence or "this and following"
    // instead deletes only that slice of the series, per applySplitDelete.
    if (!splitContext) {
      deleteTask(existingTask.id);
    } else {
      applySplitDelete(existingTask, splitContext.occurrenceDate, splitContext.scope);
      saveTasks();
      renderTodo();
      renderTodoManageList();
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
  const frequency = decodeFrequency(result.frequencyType, result.interval, result);

  if (splitContext) {
    applySplitEdit(existingTask, {
      originalOccurrenceDate: splitContext.occurrenceDate,
      newOccurrenceDate: result.dueDate,
      scope: splitContext.scope,
    }, {
      name: result.name,
      description: result.description,
      dueTime,
      allDay,
      appointment,
      frequency,
      endDate,
    });
  } else if (existingTask) {
    existingTask.name = result.name;
    existingTask.description = result.description;
    existingTask.dueDate = result.dueDate;
    existingTask.dueTime = dueTime;
    existingTask.allDay = allDay;
    existingTask.appointment = appointment;
    existingTask.frequency = frequency;
    existingTask.endDate = endDate;
  } else {
    tasks.push({
      id: uid(),
      seriesId: uid(),
      name: result.name,
      description: result.description,
      dueDate: result.dueDate,
      dueTime,
      allDay,
      appointment,
      endDate,
      frequency,
      completions: {},
      dismissed: {},
    });
  }
  saveTasks();
  renderTodo();
  renderTodoManageList();
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
  const originalCompletions = originalTask.completions || {};
  const originalDismissed = originalTask.dismissed || {};
  const originalEndDate = originalTask.endDate || null;
  const wasOriginalOccurrenceDone = !!originalCompletions[originalOccurrenceDate];
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

  if (scope === 'instance') {
    tasks.push({
      id: uid(),
      seriesId: originalTask.seriesId,
      name: edited.name,
      description: edited.description,
      dueDate: newOccurrenceDate,
      dueTime: edited.dueTime,
      allDay: edited.allDay,
      appointment: edited.appointment,
      frequency: { type: 'once', interval: 1 },
      endDate: null,
      completions: wasOriginalOccurrenceDone ? { [newOccurrenceDate]: true } : {},
      dismissed: {},
    });

    if (nextDate) {
      tasks.push({
        id: uid(),
        seriesId: originalTask.seriesId,
        name: originalTask.name,
        description: originalTask.description,
        dueDate: nextDate,
        dueTime: originalTask.dueTime,
        allDay: originalTask.allDay,
        appointment: originalTask.appointment,
        frequency: originalTask.frequency,
        endDate: originalEndDate,
        completions: { ...originalCompletions },
        dismissed: { ...originalDismissed },
      });
    }
  } else if (scope === 'following') {
    tasks.push({
      id: uid(),
      seriesId: originalTask.seriesId,
      name: edited.name,
      description: edited.description,
      dueDate: newOccurrenceDate,
      dueTime: edited.dueTime,
      allDay: edited.allDay,
      appointment: edited.appointment,
      frequency: edited.frequency,
      endDate: edited.endDate,
      completions: {
        ...originalCompletions,
        ...(wasOriginalOccurrenceDone ? { [newOccurrenceDate]: true } : {}),
      },
      dismissed: { ...originalDismissed },
    });
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
  const originalCompletions = originalTask.completions || {};
  const originalDismissed = originalTask.dismissed || {};
  const originalEndDate = originalTask.endDate || null;
  const prevDate = Recurrence.previousOccurrenceBefore(originalTask, occurrenceDate);
  const nextDate = Recurrence.nextOccurrenceAfter(originalTask, occurrenceDate);

  if (prevDate) {
    originalTask.endDate = prevDate; // truncate the historical portion to end right before this occurrence
    markOccurrencesDismissedBefore(originalTask, Recurrence.dateToISO(new Date()));
  } else {
    tasks = tasks.filter((t) => t.id !== originalTask.id); // this was the series' very first occurrence -- nothing historical to keep
  }

  if (scope === 'instance' && nextDate) {
    tasks.push({
      id: uid(),
      seriesId: originalTask.seriesId,
      name: originalTask.name,
      description: originalTask.description,
      dueDate: nextDate,
      dueTime: originalTask.dueTime,
      allDay: originalTask.allDay,
      appointment: originalTask.appointment,
      frequency: originalTask.frequency,
      endDate: originalEndDate,
      completions: { ...originalCompletions },
      dismissed: { ...originalDismissed },
    });
  }
}

function forEachOccurrenceBefore(task, cutoffISO, fn) {
  let cursor = task.dueDate;
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
// window to cancel it (see unscheduleOccurrencesDismissalBefore).
function scheduleOccurrencesDismissalBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => scheduleDismissal(task, date));
}

// Undoes the above when the completion that triggered it gets unchecked --
// cancels any of those occurrences' still-pending scheduled dismissals (so
// one doesn't fire later and re-hide something this just restored), and
// resets each one's dismissed flag back to whatever its own completed flag
// already is (never touched here), immediately: a genuinely-incomplete one
// reappears on the list right away, while one that happened to be
// separately completed on its own stays exactly as it was.
function unscheduleOccurrencesDismissalBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => {
    cancelScheduledDismissal(task, date);
    task.dismissed[date] = !!task.completions[date];
  });
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

function deleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;
  tasks = tasks.filter((t) => t.id !== taskId);
  if (activeTaskId === taskId) setActiveTaskId(null);
  saveTasks();
  renderTodo();
  renderTodoManageList();
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
    // Mirrors the backfill below in reverse -- if this was still within its
    // own linger window, or even after it fired, put any earlier occurrence
    // this had scheduled/marked dismissed back to reflecting its own
    // (untouched) completed state, so a genuinely missed one reappears.
    unscheduleOccurrencesDismissalBefore(task, occurrenceDate);
  } else {
    task.completions[occurrenceDate] = true;
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
    // setActiveTaskId, same as completing any other active task already does.
    if (task.timer) task.timer = null;
  }
  saveTasks();
  renderTodo();
}

// For a task not done by its due date: normally "overdue" -- carries over.
// An "appointment" task (expires on its due date, see the form's checkbox)
// is "failed" instead -- shown crossed out in red, but can still be checked
// off after the fact. Returns {overdue: false, failed: false} for anything
// not actually past due (or already completed, via the `completed` param).
//
// An appointment that's currently the active task (being worked on, see the
// "Work on this now" button below) is exempt from failing for as long as
// that lasts -- most real appointments can't just be "tried again", so once
// it's no longer active (or never was) and its due date is past, that's
// terminal: failed is permanent from then on, not something re-activating
// can undo (canWorkOnNow below excludes a failed task entirely).
function pastDueStatus(task, occurrenceDate, completed, now) {
  if (completed || !Recurrence.isOverdue(task, occurrenceDate, now)) return { overdue: false, failed: false };
  if (task.appointment && task.id === activeTaskId) return { overdue: false, failed: false };
  return task.appointment ? { overdue: false, failed: true } : { overdue: true, failed: false };
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

// One item per task for today's own occurrence (if it has one) AND,
// independently, one for the most recent occurrence strictly before today
// (if it has one and isn't dismissed) -- shown side by side when both
// exist, so a still-missed earlier occurrence doesn't get eclipsed by
// today's own. Plus, after 6pm local time, a preview item for tomorrow's
// occurrence, shown regardless of today's status.
//
// Whether the prior occurrence is dismissed (task.dismissed) is the ONLY
// thing that decides whether it's shown at all -- see scheduleDismissal/
// isDismissalPending. Whether it currently *displays* as completed just
// reflects its own completions entry, or a dismissal already pending for it
// (about to fire once its short linger elapses, whether that was scheduled
// by completing it directly or via backfill from completing a later
// occurrence -- see scheduleOccurrencesDismissalBefore), independent of
// which triggered that.
function computeTodoDisplayItems() {
  const now = new Date();
  const todayISO = Recurrence.dateToISO(now);
  const items = [];

  for (const task of tasks) {
    if (Recurrence.occursOn(task, todayISO)) {
      const completed = !!task.completions[todayISO];
      const { overdue, failed } = pastDueStatus(task, todayISO, completed, now);
      items.push({ task, occurrenceDate: todayISO, completed, overdue, failed, kind: 'today' });
    }

    const priorDate = Recurrence.previousOccurrenceBefore(task, todayISO);
    if (priorDate && !task.dismissed[priorDate]) {
      const completed = !!task.completions[priorDate] || isDismissalPending(task, priorDate);
      if (completed) scheduleDismissal(task, priorDate); // idempotent -- also covers a dismissal already pending from backfill
      const { overdue, failed } = completed ? { overdue: false, failed: false } : pastDueStatus(task, priorDate, false, now);
      items.push({ task, occurrenceDate: priorDate, completed, overdue, failed, kind: 'carried-over' });
    }
  }

  if (now.getHours() >= 18) {
    const tomorrowISO = Recurrence.dateToISO(Recurrence.addDays(now, 1));
    for (const task of tasks) {
      if (Recurrence.occursOn(task, tomorrowISO)) {
        items.push({ task, occurrenceDate: tomorrowISO, completed: false, overdue: false, kind: 'tomorrow' });
      }
    }
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
    const todayPending = todayOccurs && !task.completions[todayISO];
    if (todayOccurs) {
      if (todayPending) {
        const { overdue, failed } = pastDueStatus(task, todayISO, false, now);
        items.push({ task, occurrenceDate: todayISO, completed: false, overdue, failed, kind: 'today' });
      } else {
        // Still shows (crossed out) alongside whatever's next -- confirms
        // what was just checked off without it just vanishing.
        items.push({ task, occurrenceDate: todayISO, completed: true, overdue: false, kind: 'today' });
      }
    }

    const priorDate = Recurrence.previousOccurrenceBefore(task, todayISO);
    let priorPending = false;
    if (priorDate && !task.dismissed[priorDate]) {
      const completed = !!task.completions[priorDate] || isDismissalPending(task, priorDate);
      if (completed) scheduleDismissal(task, priorDate); // idempotent -- also covers a dismissal already pending from backfill
      else priorPending = true;
      const { overdue, failed } = completed ? { overdue: false, failed: false } : pastDueStatus(task, priorDate, false, now);
      items.push({ task, occurrenceDate: priorDate, completed, overdue, failed, kind: 'carried-over' });
    }

    // Nothing left pending (today's, if it has one, is done; the prior
    // occurrence, if any, is done/lingering-before-dismissal or dismissed)
    // -- preview what's next.
    if (!todayPending && !priorPending) {
      const recentDate = todayOccurs ? todayISO : priorDate;
      const nextDate = recentDate == null ? task.dueDate : Recurrence.nextOccurrenceAfter(task, recentDate);
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

function loadTodoViewMode() {
  return localStorage.getItem(TODO_VIEW_MODE_KEY) === 'next-recurrence' ? 'next-recurrence' : 'pending';
}

let todoViewMode = loadTodoViewMode();

function saveTodoViewMode() {
  localStorage.setItem(TODO_VIEW_MODE_KEY, todoViewMode);
}

const todoSectionEl = document.getElementById('todo-section');
const todoListEl = document.getElementById('todo-list');
const todoViewportEl = document.getElementById('todo-viewport');
const todoScrollUpBtn = document.getElementById('todo-scroll-up');
const todoScrollDownBtn = document.getElementById('todo-scroll-down');
const todoViewToggleBtn = document.getElementById('todo-view-toggle-btn');

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

function updateTodoViewToggleButton() {
  if (todoViewMode === 'next-recurrence') {
    todoViewToggleBtn.innerHTML = NEXT_RECURRENCE_VIEW_ICON;
    todoViewToggleBtn.title = 'Showing: next recurrence of every task -- click to switch to pending/overdue tasks';
  } else {
    todoViewToggleBtn.innerHTML = PENDING_VIEW_ICON;
    todoViewToggleBtn.title = 'Showing: pending/overdue tasks -- click to switch to next recurrence of every task';
  }
}

todoViewToggleBtn.onclick = () => {
  todoViewMode = todoViewMode === 'next-recurrence' ? 'pending' : 'next-recurrence';
  saveTodoViewMode();
  updateTodoViewToggleButton();
  renderTodo();
};

function updateTodoScrollButtons() {
  const overflowing = todoViewportEl.scrollHeight > todoViewportEl.clientHeight + 1;
  todoScrollUpBtn.classList.toggle('visible', overflowing);
  todoScrollDownBtn.classList.toggle('visible', overflowing);
  if (!overflowing) return;
  todoScrollUpBtn.disabled = todoViewportEl.scrollTop <= 0;
  todoScrollDownBtn.disabled = todoViewportEl.scrollTop >= todoViewportEl.scrollHeight - todoViewportEl.clientHeight - 1;
}

// A one-task step stopped making sense once day headers were added -- each
// click would land on an arbitrary item mid-day rather than a meaningful
// boundary. Instead, page by 3/4 of the viewport's own height; the quarter
// left overlapping keeps the jump from feeling disorienting.
function todoScrollStep() {
  return todoViewportEl.clientHeight * 0.75;
}

todoScrollUpBtn.onclick = () => todoViewportEl.scrollBy({ top: -todoScrollStep(), behavior: 'smooth' });
todoScrollDownBtn.onclick = () => todoViewportEl.scrollBy({ top: todoScrollStep(), behavior: 'smooth' });
todoViewportEl.addEventListener('scroll', updateTodoScrollButtons);
todoViewportEl.addEventListener('scroll', updatePinnedTodoHeader);
window.addEventListener('resize', updateTodoScrollButtons);
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

// Builds a single to-do row -- extracted from renderTodo's per-day loop so
// it can be appended into either of a day's two columns rather than always
// straight into todoListEl.
function buildTodoItemRow(item, isToday, pendingOverdue) {
  const row = document.createElement('div');
  row.className =
    'todo-item' +
    (item.completed ? ' completed' : '') +
    (item.failed ? ' failed' : '') +
    (item.task.id === activeTaskId ? ' active' : '') +
    (item.task.allDay ? ' all-day' : '') +
    // Only while it's neither failed nor done yet -- see pastDueStatus;
    // an appointment past its due date is tagged .failed instead (red,
    // crossed out), and once checked off it just looks like any other
    // completed task, not still flagged green.
    (item.task.appointment && !item.completed && !item.failed ? ' appointment' : '') +
    (isToday && !item.completed ? '' : ' not-today');

  // A reverse progress bar behind the row's own content -- full at the
  // start, empties out to nothing as the timer counts down to zero.
  // Appended first (before anything else below) and left in normal flow
  // stacking (position: absolute, z-index: auto) so it paints underneath
  // the row's actual (position: relative) content regardless of DOM order,
  // per how CSS stacking contexts order positioned-but-unlayered elements.
  if (item.task.timer) {
    const bar = document.createElement('div');
    bar.className = 'todo-timer-bar';
    const percent = (currentTimerRemaining(item.task.timer) / item.task.timer.totalSeconds) * 100;
    bar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
    row.appendChild(bar);
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = item.completed;
  // Styled as a red "X" instead of the usual checkbox (see
  // .todo-checkbox-failed) purely to read as "failed", not to change what
  // clicking it does -- a failed appointment stays toggleable like any
  // other carried-over task, it can still be checked off after the fact.
  if (item.failed) checkbox.classList.add('todo-checkbox-failed');
  checkbox.disabled = item.kind === 'tomorrow' || item.kind === 'upcoming';
  checkbox.onclick = (e) => {
    e.stopPropagation();
    toggleTaskCompletion(item.task, item.occurrenceDate);
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
  if (item.task.timer) {
    // Takes over the whole meta line -- the due date this would otherwise
    // show isn't relevant while a timer's actively being worked against
    // instead.
    meta.textContent = `${formatTimerDuration(currentTimerRemaining(item.task.timer))} of ${formatTimerDuration(item.task.timer.totalSeconds)}`;
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

  // Focusing is entirely user-initiated -- nothing auto-activates a task
  // (see renderTodo). A carried-over (already-past) overdue task has no
  // dedicated button (see canWorkOnNow below, scoped to today's tasks), so
  // clicking anywhere on its row is the only way to focus it; applies
  // regardless of how many other tasks are also overdue.
  if (pendingOverdue.some((i) => i.task.id === item.task.id)) {
    row.title = 'Click to work on this task now';
    row.onclick = () => {
      setActiveTaskId(item.task.id);
      renderTodo();
    };
  }

  // Lets the user voluntarily mark any of today's tasks as the one they're
  // working on -- not just an overdue one -- and toggle back off again.
  // Only one task can be active at a time (activeTaskId is a single value,
  // not a set), so marking a different task implicitly un-marks whichever
  // one was active before. Scoped to today's tasks only: a carried-over
  // (already-past) task has no button here, just the whole-row click above.
  // A carried-over APPOINTMENT is the one exception -- it gets this button
  // too. Excluding a failed one (!item.failed below) is what makes failing
  // terminal: it was already active (and stayed exempt from failing) or it
  // wasn't, but once it's failed, re-activating can't undo that -- only
  // checking it off can. Shared with the timer context menu below: starting
  // a timer is the same kind of voluntary "work on this now" this button
  // offers, just worded for the timer instead.
  const canWorkOnNow =
    (item.kind === 'today' || (item.kind === 'carried-over' && item.task.appointment)) &&
    !item.completed &&
    !item.failed;
  if (canWorkOnNow) {
    const isActive = item.task.id === activeTaskId;
    const workOnBtn = document.createElement('button');
    workOnBtn.className = 'todo-focus-btn' + (isActive ? ' active' : '');
    workOnBtn.innerHTML = isActive ? WORKING_ON_ICON : WORK_ON_ICON;
    workOnBtn.title = isActive ? 'Stop working on this task' : 'Work on this task now';
    workOnBtn.onclick = (e) => {
      e.stopPropagation();
      setActiveTaskId(isActive ? null : item.task.id);
      renderTodo();
    };
    row.appendChild(workOnBtn);
  }

  // Timer... / Pause|Resume timer / Cancel timer -- gated the same as the
  // "Work on this now" button above (starting one marks the task active,
  // same restriction), except a task that already has a timer keeps the
  // option to cancel it even if it somehow stopped being eligible in the
  // meantime.
  if (canWorkOnNow || item.task.timer) {
    row.oncontextmenu = (e) => {
      e.preventDefault();
      showTodoContextMenu(e, item.task, canWorkOnNow);
    };
  }

  // A 'once' task has no recurrence to split, so its double-click skips
  // straight to editing it -- only recurring tasks get the "which
  // occurrence(s)" choice.
  row.ondblclick = async () => {
    if (item.task.frequency.type === 'once') {
      openTaskForm(item.task);
      return;
    }
    const scope = await showEditScopeChoice();
    if (!scope) return;
    if (scope === 'all') {
      openTaskForm(item.task);
    } else {
      openTaskForm(item.task, { occurrenceDate: item.occurrenceDate, scope });
    }
  };

  return row;
}

// A timer that's actually counted all the way down to zero is done, not
// merely paused at zero -- there's nothing left to pause/resume, so it's
// cancelled the same way the context menu's own Cancel would. Checked
// against every task with a timer (not just the currently-active one) so
// one left paused right at zero also gets cleaned up, not just a running
// one crossing zero live.
function expireFinishedTimers() {
  let changed = false;
  for (const t of tasks) {
    if (t.timer && currentTimerRemaining(t.timer) <= 0) {
      t.timer = null;
      changed = true;
    }
  }
  if (changed) saveTasks();
}

function renderTodo() {
  expireFinishedTimers();
  updateTodoViewToggleButton();

  if (tasks.length === 0) {
    todoSectionEl.classList.remove('hidden');
    renderTodoEmptyState();
    updateTodoScrollButtons();
    return;
  }

  // Stays visible once there are any tasks at all, even if none happen to be
  // due today/tomorrow right now -- otherwise the view-mode toggle itself
  // would be unreachable, and "next recurrence" mode specifically exists to
  // show tasks that aren't due today/tomorrow.
  todoSectionEl.classList.remove('hidden');

  const items = todoViewMode === 'next-recurrence' ? computeNextRecurrenceItems() : computeTodoDisplayItems();

  const pendingOverdue = items.filter((item) => item.overdue && !item.completed);
  // Eligible to be (or stay) the active task: today's occurrence (whether
  // overdue yet or not -- the "Work on this now" button lets the user opt
  // into any of today's tasks, not just overdue ones) or a carried-over
  // overdue one.
  const activeEligible = items.filter((item) => (item.kind === 'today' || item.kind === 'carried-over') && !item.completed);

  // Focusing a task is only ever user-initiated (via "Work on this task
  // now" below) -- nothing is auto-activated here. Still clears a stale
  // selection on its own, though: if the previously-active task stops being
  // eligible (completed, or rolled past today), there's nothing left for it
  // to refer to.
  if (activeTaskId && !activeEligible.some((item) => item.task.id === activeTaskId)) {
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
        column.appendChild(buildTodoItemRow(item, isToday, pendingOverdue));
      }
      columns.appendChild(column);
    }
    todoListEl.appendChild(columns);
  }

  updateTodoScrollButtons();
  updatePinnedTodoHeader();
  ensureTimerTicking();
}

// A running timer's remaining time needs to visibly count down every
// second, not just on whatever triggered the last render -- rather than
// duplicate renderTodo's formatting/eligibility logic in a separate
// second-by-second DOM patch, this just re-runs renderTodo itself once a
// second while (and only while) the active task actually has a timer,
// starting/stopping the interval as that stops being true (including once
// this same call, at the end of every render, re-evaluates it).
let timerTickIntervalId = null;
function ensureTimerTicking() {
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  const shouldTick = !!(activeTask && activeTask.timer);
  if (shouldTick && !timerTickIntervalId) {
    timerTickIntervalId = setInterval(renderTodo, 1000);
  } else if (!shouldTick && timerTickIntervalId) {
    clearInterval(timerTickIntervalId);
    timerTickIntervalId = null;
  }
}

const todoManageOverlay = document.getElementById('todo-manage-overlay');
const todoManageListEl = document.getElementById('todo-manage-list');
const todoManageViewToggleBtn = document.getElementById('todo-manage-view-toggle-btn');

// A recurring task whose series has ended (endDate passed) and whose last
// occurrence (on/before endDate) is marked done -- nothing more will ever
// come of it, so "active only" hides it to declutter a long-lived list.
function isTaskDoneAndEnded(task, todayISO) {
  if (!task.endDate || task.endDate >= todayISO) return false;
  const lastOccurrence = Recurrence.mostRecentOccurrenceOnOrBefore(task, todayISO);
  return !!lastOccurrence && !!task.completions[lastOccurrence];
}

const ALL_TASKS_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z"/></svg>';
const ACTIVE_ONLY_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>';

let todoManageViewMode = 'all'; // not persisted -- resets to "all" each session

function updateTodoManageViewToggleButton() {
  if (todoManageViewMode === 'active') {
    todoManageViewToggleBtn.innerHTML = ACTIVE_ONLY_ICON;
    todoManageViewToggleBtn.title = 'Showing: active tasks only (hiding completed tasks past their end date) -- click to show all tasks';
  } else {
    todoManageViewToggleBtn.innerHTML = ALL_TASKS_ICON;
    todoManageViewToggleBtn.title = 'Showing: all tasks -- click to hide completed tasks past their end date';
  }
}

todoManageViewToggleBtn.onclick = () => {
  todoManageViewMode = todoManageViewMode === 'active' ? 'all' : 'active';
  renderTodoManageList();
};

function renderTodoManageList() {
  updateTodoManageViewToggleButton();
  todoManageListEl.innerHTML = '';

  const todayISO = Recurrence.dateToISO(new Date());
  const visibleTasks =
    todoManageViewMode === 'active' ? tasks.filter((t) => !isTaskDoneAndEnded(t, todayISO)) : tasks;

  if (tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'todo-manage-empty';
    empty.textContent = 'No tasks yet.';
    todoManageListEl.appendChild(empty);
    return;
  }
  if (visibleTasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'todo-manage-empty';
    empty.textContent = 'No active tasks -- everything is completed and past its end date.';
    todoManageListEl.appendChild(empty);
    return;
  }

  for (const task of visibleTasks) {
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

    // Two clicks to delete (arm -> confirm), instead of a native confirm()
    // dialog. Moving off the row disarms it back to the trash-can icon.
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
        deleteTask(task.id);
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

    todoManageListEl.appendChild(row);
  }
}

document.getElementById('todo-manage-btn').onclick = () => {
  renderTodoManageList();
  todoManageOverlay.classList.remove('hidden');
};
document.getElementById('todo-manage-close').onclick = () => todoManageOverlay.classList.add('hidden');
document.getElementById('todo-add-btn').onclick = () => openTaskForm(null);

renderTodo();
