const assert = require('node:assert');
const O = require('./occurrence');

// -- findOccurrence / pendingOccurrenceFor ----------------------------------
const occurrences = [
  { id: 'o1', taskId: 't1', occurrenceDate: '2026-09-23', status: 'completed' },
  { id: 'o2', taskId: 't1', occurrenceDate: '2026-09-29', status: 'pending' },
  { id: 'o3', taskId: 't2', occurrenceDate: '2026-09-23', status: 'pending' },
];
assert.strictEqual(O.findOccurrence(occurrences, 't1', '2026-09-23'), occurrences[0]);
assert.strictEqual(O.findOccurrence(occurrences, 't1', '2026-09-29'), occurrences[1]);
assert.strictEqual(O.findOccurrence(occurrences, 't1', '2026-10-05'), null, 'no row for that date');
assert.strictEqual(O.findOccurrence(occurrences, 't2', '2026-09-23'), occurrences[2], 'keyed by taskId, not which Task record you happen to be looking at');

assert.strictEqual(O.pendingOccurrenceFor(occurrences, 't1'), occurrences[1], "the one still-'pending' row, not the completed one");
assert.strictEqual(O.pendingOccurrenceFor(occurrences, 't3'), null, 'no occurrences at all for this taskId');

// -- createOccurrence --------------------------------------------------------
const fresh = O.createOccurrence({ id: 'o9', taskId: 't9', occurrenceDate: '2026-01-01' });
assert.deepStrictEqual(fresh, {
  id: 'o9',
  taskId: 't9',
  occurrenceDate: '2026-01-01',
  pendingReschedules: [],
  status: 'pending',
  resolvedAt: null,
  dismissed: false,
  manual: false,
  overrides: null,
  comments: [],
  log: [],
  focusedSeconds: 0,
  timerSeconds: 0,
  timer: null,
});
const manualOne = O.createOccurrence({ id: 'o10', taskId: 't9', occurrenceDate: '2026-01-05', manual: true });
assert.strictEqual(manualOne.manual, true);

// -- effectiveDueDate ---------------------------------------------------
assert.strictEqual(O.effectiveDueDate({ occurrenceDate: '2026-09-23', pendingReschedules: [] }), '2026-09-23', 'never pushed -- still its own occurrenceDate');
assert.strictEqual(
  O.effectiveDueDate({ occurrenceDate: '2026-09-23', pendingReschedules: ['2026-09-24', '2026-09-25'] }),
  '2026-09-25',
  'pushed twice -- the chain\'s own last entry, not occurrenceDate'
);

// -- recurrenceShim -----------------------------------------------------
const task = { frequency: { type: 'days', interval: 6 }, endDate: '2026-12-31' };
const occurrence = { occurrenceDate: '2026-09-23', pendingReschedules: ['2026-09-24'] };
assert.deepStrictEqual(O.recurrenceShim(task, occurrence), {
  dueDate: '2026-09-23',
  pendingReschedules: ['2026-09-24'],
  recurUntilCompleted: true,
  frequency: task.frequency,
  endDate: task.endDate,
});
// no pendingReschedules at all on the occurrence -- shim still gets a real array, not undefined
assert.deepStrictEqual(O.recurrenceShim(task, { occurrenceDate: '2026-09-23' }).pendingReschedules, []);

// -- applyOverrides -------------------------------------------------------
const plainTask = { name: 'Water plants', dueTime: '09:00', appointment: false };
assert.strictEqual(O.applyOverrides(plainTask, null), plainTask, 'no occurrence at all -- task fields as-is');
assert.strictEqual(O.applyOverrides(plainTask, { overrides: null }), plainTask, 'occurrence exists but carries no override');
assert.deepStrictEqual(
  O.applyOverrides(plainTask, { overrides: { name: 'Water plants (extra today)' } }),
  { name: 'Water plants (extra today)', dueTime: '09:00', appointment: false },
  'only the overridden field changes, everything else still comes from the task'
);

// -- statusOf -------------------------------------------------------------
assert.strictEqual(O.statusOf(occurrences, 't1', '2026-09-23'), 'completed');
assert.strictEqual(O.statusOf(occurrences, 't1', '2026-10-05'), 'pending', 'no row at all -- still pending, not an error');

// -- notesCount -----------------------------------------------------------
const taskRecords = [
  { taskId: 'tA', comments: [{ text: 'a' }, { text: 'b' }] },
  { taskId: 'tA', comments: [{ text: 'c' }] }, // a second fragment sharing the same taskId (post-split)
  { taskId: 'tB', comments: [{ text: 'z' }] },
];
const occForNotes = [
  { taskId: 'tA', comments: [{ text: 'd' }] },
  { taskId: 'tA', comments: [] },
  { taskId: 'tB', comments: [{ text: 'y' }, { text: 'x' }] },
];
assert.strictEqual(O.notesCount(taskRecords, occForNotes, 'tA'), 4, '2 + 1 task-level across both fragments, plus 1 occurrence-level');
assert.strictEqual(O.notesCount(taskRecords, occForNotes, 'tB'), 3, '1 task-level plus 2 occurrence-level');
assert.strictEqual(O.notesCount(taskRecords, occForNotes, 'tC'), 0, 'no records at all for this taskId');

console.log('occurrence.test.js: all assertions passed');
