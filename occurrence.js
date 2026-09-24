// Pure helpers over the { tasks, occurrences } data model -- no DOM, no
// network, same UMD-lite pattern as recurrence.js (module.exports under
// Node so occurrence.test.js can require it directly, window.Occurrence in
// the browser).
//
// A Task is a recurrence PATTERN (dueDate/frequency/endDate/...). An
// Occurrence is one interacted-with instance of it, sparse: a
// pattern-predicted date with nothing recorded against it yet (still
// pending, no note, no override, no timer) has no row at all -- exactly
// like an absent key in the old completions/dismissed/markedFailed maps
// meant "still pending". Occurrences are addressed by (taskId,
// occurrenceDate) -- taskId, not any single Task record's own id, since a
// "this and following" split forks a new Task row for the pattern going
// forward while every already-recorded Occurrence stays exactly where it is.
//
// recurUntilCompleted tasks keep at most one 'pending' Occurrence alive at a
// time -- see recurrenceShim below for how its pendingReschedules chain
// feeds back into recurrence.js's own chain-membership logic unchanged.

function findOccurrence(occurrences, taskId, occurrenceDate) {
  for (const o of occurrences) {
    if (o.taskId === taskId && o.occurrenceDate === occurrenceDate) return o;
  }
  return null;
}

// The (at most one) still-'pending' occurrence for a recurUntilCompleted
// task's taskId -- its current, not-yet-resolved occurrence.
function pendingOccurrenceFor(occurrences, taskId) {
  for (const o of occurrences) {
    if (o.taskId === taskId && o.status === 'pending') return o;
  }
  return null;
}

// A fresh occurrence row in its default (untouched) shape -- callers supply
// `id` themselves (via uid(), same as every other id-minting site in this
// app) since this module stays free of any global/DOM dependency.
function createOccurrence({ id, taskId, occurrenceDate, manual }) {
  return {
    id,
    taskId,
    occurrenceDate,
    pendingReschedules: [],
    // `status` (pending/completed/failed) is this occurrence's OUTCOME,
    // mutually exclusive. `dismissed` is a separate, independent axis --
    // whether it's hidden from the list regardless of outcome. An occurrence
    // can be 'completed' and not yet dismissed (the brief linger before it
    // visually disappears), or still 'pending' and already dismissed (a
    // genuinely missed occurrence swept off the list without ever being
    // resolved) -- see toggleTaskCompletion/scheduleDismissal/
    // markOccurrencesDismissedBefore in app.js for where each comes from.
    status: 'pending',
    resolvedAt: null,
    dismissed: false,
    manual: !!manual,
    overrides: null,
    comments: [],
    log: [],
    focusedSeconds: 0,
    timerSeconds: 0,
    timer: null,
  };
}

// Which date a recurUntilCompleted occurrence is *currently* due on --
// wherever its reschedule chain has last pushed it, or its own
// occurrenceDate if it hasn't been pushed at all yet. Mirrors the old
// task.dueDate-as-live-pointer read, now off the occurrence itself.
function effectiveDueDate(occurrence) {
  const chain = occurrence.pendingReschedules || [];
  return chain.length ? chain[chain.length - 1] : occurrence.occurrenceDate;
}

// Builds the plain-object shape recurrence.js's own recurUntilCompleted
// handling expects (occursOn/advanceRecurUntilCompletedChain) -- these
// operate on a generic { dueDate, pendingReschedules, recurUntilCompleted,
// frequency, endDate } shape, not literally a Task record, so a
// recurUntilCompleted task's live state (now split across a Task and its
// current pending Occurrence) can be fed straight in without recurrence.js
// itself needing to change at all.
function recurrenceShim(task, occurrence) {
  return {
    dueDate: occurrence.occurrenceDate,
    pendingReschedules: occurrence.pendingReschedules || [],
    recurUntilCompleted: true,
    frequency: task.frequency,
    endDate: task.endDate,
  };
}

// The effective display fields for one occurrence of `task` -- an
// 'instance'-scope override wins field-by-field over the owning task's own
// current values; anything not overridden falls back to the task.
// Deliberately never touches pattern-level fields (frequency/
// recurUntilCompleted/endDate) -- those can't be overridden per-occurrence.
function applyOverrides(task, occurrence) {
  const overrides = occurrence && occurrence.overrides;
  if (!overrides) return task;
  return { ...task, ...overrides };
}

// 'pending' for a date with no recorded Occurrence row at all -- same
// meaning as an absent key in the old completions/dismissed/markedFailed
// maps.
function statusOf(occurrences, taskId, occurrenceDate) {
  const occurrence = findOccurrence(occurrences, taskId, occurrenceDate);
  return occurrence ? occurrence.status : 'pending';
}

// Total notes recorded against a taskId -- task-level comments (general
// notes, not tied to one date) plus every occurrence-level comment across
// every Occurrence row for that taskId. Used by the free-tier per-task note
// limit, which counts across both buckets (see notesUsedFor, app.js).
function notesCount(taskRecords, occurrences, taskId) {
  const taskLevel = taskRecords
    .filter((t) => t.taskId === taskId)
    .reduce((sum, t) => sum + (t.comments ? t.comments.length : 0), 0);
  const occurrenceLevel = occurrences
    .filter((o) => o.taskId === taskId)
    .reduce((sum, o) => sum + (o.comments ? o.comments.length : 0), 0);
  return taskLevel + occurrenceLevel;
}

const occurrenceApi = {
  findOccurrence,
  pendingOccurrenceFor,
  createOccurrence,
  effectiveDueDate,
  recurrenceShim,
  applyOverrides,
  statusOf,
  notesCount,
};

if (typeof module === 'object' && module.exports) {
  module.exports = occurrenceApi;
} else {
  window.Occurrence = occurrenceApi;
}
