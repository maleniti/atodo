const assert = require('node:assert');
const R = require('./recurrence');

// -- occursOn --------------------------------------------------------------
const once = { dueDate: '2026-03-10', frequency: { type: 'once' } };
assert.ok(R.occursOn(once, '2026-03-10'));
assert.ok(!R.occursOn(once, '2026-03-11'));
assert.ok(!R.occursOn(once, '2026-03-09'), 'no occurrence before the due date');

const daily = { dueDate: '2026-03-10', frequency: { type: 'days', interval: 1 } };
assert.ok(R.occursOn(daily, '2026-03-10'));
assert.ok(R.occursOn(daily, '2026-03-15'));
assert.ok(!R.occursOn(daily, '2026-03-09'));

const everyThreeDays = { dueDate: '2026-03-10', frequency: { type: 'days', interval: 3 } };
assert.ok(R.occursOn(everyThreeDays, '2026-03-13'));
assert.ok(!R.occursOn(everyThreeDays, '2026-03-12'));

const weekly = { dueDate: '2026-03-10', frequency: { type: 'weeks', interval: 1 } };
assert.ok(R.occursOn(weekly, '2026-03-17'));
assert.ok(!R.occursOn(weekly, '2026-03-16'));

const monthly = { dueDate: '2026-01-31', frequency: { type: 'months', interval: 1 } };
assert.ok(R.occursOn(monthly, '2026-01-31'));
assert.ok(R.occursOn(monthly, '2026-02-28'), 'Feb has no 31st, clamps to the last day');
assert.ok(R.occursOn(monthly, '2026-03-31'));
assert.ok(!R.occursOn(monthly, '2026-03-30'));

const everyTwoMonths = { dueDate: '2026-01-15', frequency: { type: 'months', interval: 2 } };
assert.ok(R.occursOn(everyTwoMonths, '2026-03-15'));
assert.ok(!R.occursOn(everyTwoMonths, '2026-02-15'));

// -- weekly on specific weekdays ---------------------------------------
// dueDate 2026-07-01 is a Wednesday; the anchor week runs Sun 2026-06-28
// through Sat 2026-07-04.
const weeklySpecificDays = { dueDate: '2026-07-01', frequency: { type: 'weeks', interval: 1, weekdays: [1, 3, 5] } }; // Mon/Wed/Fri
assert.ok(R.occursOn(weeklySpecificDays, '2026-07-01'), 'Wed, dueDate itself');
assert.ok(R.occursOn(weeklySpecificDays, '2026-07-03'), 'Fri, same anchor week');
assert.ok(!R.occursOn(weeklySpecificDays, '2026-06-29'), "Mon before dueDate doesn't count, even same week");
assert.ok(!R.occursOn(weeklySpecificDays, '2026-07-02'), 'Thu is not a selected weekday');
assert.ok(R.occursOn(weeklySpecificDays, '2026-07-06'), 'Mon of the following week');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(weeklySpecificDays, '2026-07-04'), '2026-07-03', 'most recent is Fri, not Sat itself');
assert.strictEqual(R.nextOccurrenceAfter(weeklySpecificDays, '2026-07-03'), '2026-07-06', 'next after Fri is the following Mon, not Wed of the same week (already passed)');

const biweeklySpecificDays = {
  dueDate: '2026-07-01',
  frequency: { type: 'weeks', interval: 2, weekdays: [1, 3, 5] },
};
assert.ok(R.occursOn(biweeklySpecificDays, '2026-07-01'), 'anchor week (week 0) counts');
assert.ok(!R.occursOn(biweeklySpecificDays, '2026-07-06'), 'week 1 is skipped on a biweekly cadence');
assert.ok(R.occursOn(biweeklySpecificDays, '2026-07-13'), 'week 2 counts again');

// Omitting weekdays entirely still falls back to the original single-day
// behavior (backward compatible with already-saved tasks).
assert.deepStrictEqual(weekly.frequency.weekdays, undefined);
assert.ok(R.occursOn(weekly, '2026-03-17'));

// -- monthly: last day of month / N days before last --------------------
const monthlyLastDay = { dueDate: '2026-01-15', frequency: { type: 'months', interval: 1, dayMode: 'last' } };
assert.ok(R.occursOn(monthlyLastDay, '2026-01-31'));
assert.ok(R.occursOn(monthlyLastDay, '2026-02-28'));
assert.ok(!R.occursOn(monthlyLastDay, '2026-01-30'));
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(monthlyLastDay, '2026-02-15'), '2026-01-31');
assert.strictEqual(R.nextOccurrenceAfter(monthlyLastDay, '2026-01-31'), '2026-02-28');

const monthlyBeforeLast = {
  dueDate: '2026-01-15',
  frequency: { type: 'months', interval: 1, dayMode: 'before-last', offset: 2 },
};
assert.ok(R.occursOn(monthlyBeforeLast, '2026-01-29'), 'Jan has 31 days, 2 before last is the 29th');
assert.ok(R.occursOn(monthlyBeforeLast, '2026-02-26'), 'Feb has 28 days, 2 before last is the 26th');
assert.ok(!R.occursOn(monthlyBeforeLast, '2026-01-31'), 'offset 2 is not the last day itself');
assert.strictEqual(R.nextOccurrenceAfter(monthlyBeforeLast, '2026-01-29'), '2026-02-26');

// -- monthly: nth/last weekday of month -----------------------------------
// January 2026's Tuesdays fall on the 6th, 13th, 20th, 27th (4 of them, no
// 5th); March 2026 has 5 Tuesdays (3rd, 10th, 17th, 24th, 31st).
const firstTuesday = {
  dueDate: '2026-01-01',
  frequency: { type: 'months', interval: 1, dayMode: 'weekday', weekday: 2, ordinal: 1 },
};
assert.ok(R.occursOn(firstTuesday, '2026-01-06'));
assert.ok(!R.occursOn(firstTuesday, '2026-01-13'), 'the 2nd Tuesday, not the 1st');

const lastTuesday = {
  dueDate: '2026-01-01',
  frequency: { type: 'months', interval: 1, dayMode: 'weekday', weekday: 2, ordinal: 'last' },
};
assert.ok(R.occursOn(lastTuesday, '2026-01-27'), 'last Tuesday in a 4-Tuesday January');
assert.ok(!R.occursOn(lastTuesday, '2026-01-20'), 'the 3rd Tuesday is not the last one');
assert.ok(R.occursOn(lastTuesday, '2026-03-31'), 'last Tuesday in a 5-Tuesday March');
assert.ok(!R.occursOn(lastTuesday, '2026-03-24'), '4th Tuesday is not last when March has a 5th');

const fifthTuesday = {
  dueDate: '2026-01-01',
  frequency: { type: 'months', interval: 1, dayMode: 'weekday', weekday: 2, ordinal: 5 },
};
assert.ok(!R.occursOn(fifthTuesday, '2026-01-27'), 'January has no 5th Tuesday');
assert.ok(R.occursOn(fifthTuesday, '2026-03-31'), "March's 5th Tuesday");
assert.strictEqual(
  R.nextOccurrenceAfter(fifthTuesday, '2026-01-01'),
  '2026-03-31',
  'correctly skips January and February, which have no 5th Tuesday'
);
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(fifthTuesday, '2026-03-31'), '2026-03-31');

// -- monthly: earliest Nth occurrence of any of the selected weekdays --------
// "Earliest 2nd of Mon/Wed/Fri" is NOT the 2nd date overall among every
// selected weekday's occurrences (that would be the first Friday) -- it's
// whichever of {2nd Monday, 2nd Wednesday, 2nd Friday} comes first.
// April 2026 starts on a Wednesday: 2nd Monday the 13th, 2nd Wednesday the
// 8th, 2nd Friday the 10th -- earliest is the 8th.
const multiWeekday2nd = {
  dueDate: '2026-01-01',
  frequency: { type: 'months', interval: 1, dayMode: 'multi-weekday', weekdays: [1, 3, 5], ordinal: 2 },
};
assert.ok(R.occursOn(multiWeekday2nd, '2026-04-08'), 'April starts on Wednesday -- earliest 2nd is that 2nd Wednesday, the 8th');
assert.ok(!R.occursOn(multiWeekday2nd, '2026-04-10'), 'the 2nd Friday, not the earliest of the three');
assert.ok(!R.occursOn(multiWeekday2nd, '2026-04-13'), 'the 2nd Monday, not the earliest of the three');
// January 2026 starts on a Thursday: 2nd Monday the 12th, 2nd Wednesday the
// 14th, 2nd Friday the 9th -- earliest is the 9th.
assert.ok(R.occursOn(multiWeekday2nd, '2026-01-09'), 'January starts on Thursday -- earliest 2nd is that 2nd Friday, the 9th');
assert.strictEqual(R.nextOccurrenceAfter(multiWeekday2nd, '2026-01-09'), '2026-02-09', "February starts on Sunday -- earliest 2nd is also the 2nd Friday, the 9th");
assert.strictEqual(R.nextOccurrenceAfter(multiWeekday2nd, '2026-02-09'), '2026-03-09', "March starts on Sunday too -- same as February");
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(multiWeekday2nd, '2026-04-08'), '2026-04-08');

const multiWeekdayNoMatch = {
  dueDate: '2026-01-01',
  frequency: { type: 'months', interval: 1, dayMode: 'multi-weekday', weekdays: [2], ordinal: 5 },
};
assert.ok(!R.occursOn(multiWeekdayNoMatch, '2026-01-27'), 'a single selected weekday with no 5th occurrence that month has nothing to be earliest among');

// -- monthly: multiple fixed days of the month (1-28) ------------------------
// Repeats on the 15th, 16th, and 17th of every month -- a plain membership
// check against target's day-of-month, no anchor/clamping logic needed since
// every day 1-28 exists in every month.
const multiDay = {
  dueDate: '2026-01-15',
  frequency: { type: 'months', interval: 1, dayMode: 'multi-day', days: [15, 16, 17] },
};
assert.ok(R.occursOn(multiDay, '2026-01-15'), 'the 15th is one of the selected days');
assert.ok(R.occursOn(multiDay, '2026-01-16'), 'so is the 16th');
assert.ok(R.occursOn(multiDay, '2026-01-17'), 'so is the 17th');
assert.ok(!R.occursOn(multiDay, '2026-01-14'), 'the 14th is not selected');
assert.ok(!R.occursOn(multiDay, '2026-01-18'), 'nor the 18th');
assert.ok(R.occursOn(multiDay, '2026-02-15'), 'the pattern repeats identically in February');
assert.ok(R.occursOn(multiDay, '2026-02-17'), 'every day in the shorter month of February still exists (capped at 28)');
assert.strictEqual(R.nextOccurrenceAfter(multiDay, '2026-01-15'), '2026-01-16', 'next after the 15th is the 16th, same month');
assert.strictEqual(R.nextOccurrenceAfter(multiDay, '2026-01-17'), '2026-02-15', 'next after the last selected day of the month rolls over to next month');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(multiDay, '2026-01-16'), '2026-01-16');
assert.strictEqual(R.previousOccurrenceBefore(multiDay, '2026-01-16'), '2026-01-15');
assert.strictEqual(R.previousOccurrenceBefore(multiDay, '2026-02-15'), '2026-01-17', 'the occurrence right before the 15th of the next month is the previous month\'s last selected day, the 17th');

// -- monthly: N days before/after the earliest Nth occurrence ---------------
// Same April-2026 anchor (the 8th, its earliest 2nd of Mon/Wed/Fri) shifted
// 6 days before -- crosses into March, which is fine (see occursOn's
// dedicated multi-weekday-offset branch: the interval/dueDate check is
// re-evaluated per candidate anchor month, not just the target date's own).
const multiWeekdayOffsetBefore = {
  dueDate: '2026-01-01',
  frequency: {
    type: 'months',
    interval: 1,
    dayMode: 'multi-weekday-offset',
    weekdays: [1, 3, 5],
    ordinal: 1,
    offsetDirection: 'before',
    offsetDays: 6,
  },
};
// April's earliest 1st of Mon/Wed/Fri is Wed the 1st itself (day 1 is a
// Wednesday); 6 days before that is March 26.
assert.ok(R.occursOn(multiWeekdayOffsetBefore, '2026-03-26'), '6 days before April\'s anchor lands in March, which is allowed');
assert.ok(!R.occursOn(multiWeekdayOffsetBefore, '2026-04-01'), 'the anchor itself is not the occurrence once an offset applies');

// April's 5th Wednesday (the 29th, its only weekday selected here) shifted
// 6 days after crosses into May.
const multiWeekdayOffsetAfter = {
  dueDate: '2026-01-01',
  frequency: {
    type: 'months',
    interval: 1,
    dayMode: 'multi-weekday-offset',
    weekdays: [3],
    ordinal: 5,
    offsetDirection: 'after',
    offsetDays: 6,
  },
};
assert.ok(R.occursOn(multiWeekdayOffsetAfter, '2026-05-05'), '6 days after April\'s 5th Wednesday (the 29th) lands in May');

// Every-2-months interval still governs from the anchor month, even when the
// offset pushes the actual date into the adjacent month: with dueDate
// anchored to January, March (diffMonths 2) is a valid anchor month but
// February (diffMonths 1) is not, regardless of which month the offset
// result actually lands in.
const multiWeekdayOffsetEveryTwoMonths = {
  dueDate: '2026-01-01',
  frequency: {
    type: 'months',
    interval: 2,
    dayMode: 'multi-weekday-offset',
    weekdays: [1, 3, 5],
    ordinal: 1,
    offsetDirection: 'before',
    offsetDays: 6,
  },
};
assert.ok(R.occursOn(multiWeekdayOffsetEveryTwoMonths, '2026-02-24'), "March's anchor (the 2nd) minus 6 days lands on Feb 24 -- March is a valid anchor month (diffMonths 2)");
assert.ok(!R.occursOn(multiWeekdayOffsetEveryTwoMonths, '2026-01-27'), "would be February's anchor minus 6 days, but February isn't a valid anchor month (diffMonths 1)");

// -- nextOccurrenceAfter when dueDate itself isn't a valid occurrence -------
// dueDate is just the pattern's anchor for interval counting -- nothing
// guarantees the literal entered date itself satisfies the pattern (a task
// due on a Monday but recurring only on Tue/Wed/Thu/Fri, say). Regression
// test for a bug where nextOccurrenceAfter, when called with a date before
// dueDate, blindly returned dueDate itself without checking it actually
// occurs there.
const dueDateNotItselfValid = {
  dueDate: '2026-09-07', // a Monday
  frequency: { type: 'months', interval: 1, dayMode: 'multi-weekday-offset', weekdays: [2, 3, 4, 5], ordinal: 1, offsetDirection: 'before', offsetDays: 1 },
};
assert.ok(!R.occursOn(dueDateNotItselfValid, '2026-09-07'), "due date itself (a Monday) isn't a valid occurrence of this Tue-Fri-anchored pattern");
assert.strictEqual(
  R.nextOccurrenceAfter(dueDateNotItselfValid, '2026-09-06'),
  '2026-09-30',
  "must not blindly return dueDate itself just because it's the first date on/after afterISO -- September's earliest 1st of Tue-Fri is the 1st itself, one day before is Aug 31 (before dueDate, so not eligible); the next valid one after dueDate is October's anchor (the 1st) minus 1, landing on Sep 30"
);
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(dueDateNotItselfValid, '2026-09-07'), null, 'dueDate has no valid occurrence on or before it yet');

// Same bug, simpler pattern: a weekly task whose selected weekdays don't
// include dueDate's own weekday.
const weeklyDueDateMismatch = {
  dueDate: '2026-09-07', // a Monday
  frequency: { type: 'weeks', interval: 1, weekdays: [2, 4] }, // Tue/Thu only
};
assert.ok(!R.occursOn(weeklyDueDateMismatch, '2026-09-07'), "due date (Monday) isn't one of the selected weekdays");
assert.strictEqual(R.nextOccurrenceAfter(weeklyDueDateMismatch, '2026-09-06'), '2026-09-08', 'the first real occurrence is that Tuesday, not dueDate itself');

// -- endDate ------------------------------------------------------------
const dailyWithEnd = { dueDate: '2026-03-10', frequency: { type: 'days', interval: 1 }, endDate: '2026-03-20' };
assert.ok(R.occursOn(dailyWithEnd, '2026-03-20'), 'occurs on the end date itself');
assert.ok(!R.occursOn(dailyWithEnd, '2026-03-21'), 'no occurrence after the end date');
assert.strictEqual(
  R.mostRecentOccurrenceOnOrBefore(dailyWithEnd, '2026-03-25'),
  '2026-03-20',
  'a today past the end date clamps to the last occurrence on/before endDate, not endDate + drift'
);
assert.strictEqual(
  R.mostRecentOccurrenceOnOrBefore(dailyWithEnd, '2026-03-15'),
  '2026-03-15',
  'today before the end date is unaffected'
);

const monthlyWithEnd = { dueDate: '2026-01-31', frequency: { type: 'months', interval: 1 }, endDate: '2026-02-28' };
assert.ok(R.occursOn(monthlyWithEnd, '2026-02-28'));
assert.ok(!R.occursOn(monthlyWithEnd, '2026-03-31'), 'the 3rd occurrence would be after endDate');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(monthlyWithEnd, '2026-06-01'), '2026-02-28');

// -- mostRecentOccurrenceOnOrBefore -----------------------------------------
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(once, '2026-03-15'), '2026-03-10', 'a missed one-off stays pending, doesn\'t vanish');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(once, '2026-03-01'), null, 'not due yet');

assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(daily, '2026-03-15'), '2026-03-15');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(everyThreeDays, '2026-03-15'), '2026-03-13', 'most recent 3-day step on/before the 15th');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(weekly, '2026-03-20'), '2026-03-17');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(monthly, '2026-02-27'), '2026-01-31', 'Feb 27 is before Feb\'s clamped 28th occurrence');
assert.strictEqual(R.mostRecentOccurrenceOnOrBefore(monthly, '2026-02-28'), '2026-02-28');

// -- nextOccurrenceAfter ------------------------------------------------
assert.strictEqual(R.nextOccurrenceAfter(once, '2026-03-10'), null, 'a once task has no occurrence after its due date');
assert.strictEqual(R.nextOccurrenceAfter(once, '2026-01-01'), '2026-03-10', "hasn't started yet -- its first occurrence is next");

assert.strictEqual(R.nextOccurrenceAfter(daily, '2026-03-15'), '2026-03-16');
assert.strictEqual(R.nextOccurrenceAfter(everyThreeDays, '2026-03-13'), '2026-03-16', 'next 3-day step strictly after the 13th');
assert.strictEqual(R.nextOccurrenceAfter(weekly, '2026-03-17'), '2026-03-24');

assert.strictEqual(R.nextOccurrenceAfter(monthly, '2026-01-31'), '2026-02-28', 'Feb clamps to the 28th');
assert.strictEqual(R.nextOccurrenceAfter(monthly, '2026-02-28'), '2026-03-31', 'back to the 31st once March allows it');
assert.strictEqual(R.nextOccurrenceAfter(monthly, '2026-02-01'), '2026-02-28', 'the very next occurrence, not skipped over');

assert.strictEqual(R.nextOccurrenceAfter(dailyWithEnd, '2026-03-19'), '2026-03-20', 'the last occurrence, right at the end date');
assert.strictEqual(R.nextOccurrenceAfter(dailyWithEnd, '2026-03-20'), null, 'nothing after the end date');

// -- previousOccurrenceBefore ------------------------------------------------
assert.strictEqual(R.previousOccurrenceBefore(once, '2026-03-10'), null, "a once task's due date is its only occurrence");
assert.strictEqual(R.previousOccurrenceBefore(daily, '2026-03-10'), null, 'the very first occurrence has nothing before it');
assert.strictEqual(R.previousOccurrenceBefore(daily, '2026-03-15'), '2026-03-14');
assert.strictEqual(R.previousOccurrenceBefore(everyThreeDays, '2026-03-13'), '2026-03-10', 'previous 3-day step is the due date itself');
assert.strictEqual(R.previousOccurrenceBefore(weekly, '2026-03-17'), '2026-03-10');
assert.strictEqual(R.previousOccurrenceBefore(monthly, '2026-02-28'), '2026-01-31', 'Feb clamped occurrence, previous is Jan 31st');
assert.strictEqual(R.previousOccurrenceBefore(monthly, '2026-03-31'), '2026-02-28');

// -- isOverdue ---------------------------------------------------------------
const t = { dueTime: '18:00', frequency: { type: 'once' } };
assert.ok(R.isOverdue(t, '2026-03-10', new Date('2026-03-10T18:01:00')));
assert.ok(!R.isOverdue(t, '2026-03-10', new Date('2026-03-10T17:59:00')));
assert.ok(R.isOverdue(t, '2026-03-10', new Date('2026-03-11T00:00:00')), 'any later day is overdue regardless of time');

// -- isOverdue: all-day tasks --------------------------------------------
const allDayOnce = { allDay: true, frequency: { type: 'once' } };
assert.ok(!R.isOverdue(allDayOnce, '2026-03-10', new Date('2026-03-10T23:00:00')), "not overdue during its own day, no matter the time");
assert.ok(R.isOverdue(allDayOnce, '2026-03-10', new Date('2026-03-11T00:00:01')), 'overdue as soon as the day itself has passed');

// every-3-days all-day: independent occurrences, same "overdue once the day
// has passed" rule per occurrence -- NOT the continuous-task special case
// (that's daily/interval-1 only).
const allDayEveryThreeDays = { allDay: true, endDate: null, frequency: { type: 'days', interval: 3 } };
assert.ok(!R.isOverdue(allDayEveryThreeDays, '2026-03-10', new Date('2026-03-10T23:00:00')));
assert.ok(R.isOverdue(allDayEveryThreeDays, '2026-03-10', new Date('2026-03-11T00:00:01')));

// daily (interval 1) all-day: one continuous task -- never overdue without
// an end date, and not overdue on/before the end date even long after the
// due date; only overdue once actually past the end date.
const allDayDailyNoEnd = { allDay: true, endDate: null, frequency: { type: 'days', interval: 1 } };
assert.ok(!R.isOverdue(allDayDailyNoEnd, '2026-03-10', new Date('2026-03-10T23:00:00')));
assert.ok(!R.isOverdue(allDayDailyNoEnd, '2026-03-10', new Date('2027-01-01T00:00:00')), 'no end date -- never overdue, however long it runs');

const allDayDailyWithEnd = { allDay: true, endDate: '2026-03-20', frequency: { type: 'days', interval: 1 } };
assert.ok(!R.isOverdue(allDayDailyWithEnd, '2026-03-15', new Date('2026-03-20T23:59:00')), 'still on/before its end date');
assert.ok(R.isOverdue(allDayDailyWithEnd, '2026-03-15', new Date('2026-03-21T00:00:01')), 'overdue once truly past the end date');

console.log('recurrence.test.js: all assertions passed');
