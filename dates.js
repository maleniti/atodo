// Plain calendar helpers for the client -- formatting and stepping dates
// ('YYYY-MM-DD' strings in the browser's local time). No rules: what a task
// does on which day is the server's business (male-niti-api's
// lib/atodo/domain/, which recurrence.js and occurrence.js moved to).

const Dates = {
  dateToISO(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  },
  addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  },
  // dateISO plus `days` days.
  shiftISO(dateISO, days) {
    return Dates.dateToISO(Dates.addDays(new Date(dateISO + 'T00:00:00'), days));
  },
  daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  },
  todayISO() {
    return Dates.dateToISO(new Date());
  },
  // The browser's time zone (IANA), sent with every API request -- the
  // server works out "today" and due times in it.
  timeZone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch {
      return '';
    }
  },
};
