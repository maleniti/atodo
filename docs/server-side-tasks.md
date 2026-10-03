# Server-side tasks — design

Status: agreed, being built on branch `feature/server-side-tasks` (atodo and
male-niti-api). Delete or fold into CLAUDE.md/README before merging.

## Why

Today the client downloads the account's whole task list (every task, every
recorded occurrence, every note and log entry) on load, works out everything
it shows from it, and uploads the whole list again after every change. That
costs time and mobile data as accounts grow, caps saves at 10 MB, lets two
devices overwrite each other, and puts every rule — recurrence, what each
view shows, what a click changes — in the browser, where a mobile app would
have to repeat it.

After this change:

- **The server owns the data and the rules.** It answers "what does this
  view show on this day" and applies every change ("complete this
  occurrence", "pause until 12 Oct") itself, in a transaction.
- **The client renders and sends intents.** It loads one day at a time as
  the list scrolls, keeps only what's near the viewport in the DOM, and
  never holds the whole task list.

Decisions taken: action endpoints for writes; month pages with endless
scrolling inside a month; one branch per repo, merged when done.

## Ground rules

- **Time zones.** Every time the user enters or a request refers to is
  local time. Each request sends `X-Timezone` (the browser's IANA zone, e.g.
  `Europe/Zagreb`); the server computes `now`, `today` and the local hour in
  it (default `Europe/Zagreb` if missing or unknown). Dates stay plain
  `YYYY-MM-DD` strings.
  - **Fluid (default):** a task's due time is local time wherever the user
    is — 09:00 is 09:00 in Zagreb or New York, moving with them.
  - **Fixed zone (timed tasks only):** a task can name a time zone
    (`timeZone`, new column `atodo.tasks.time_zone`; null = fluid). Its
    pattern's dates and due time are then that zone's, so the due moment is
    fixed; it appears on whichever of the user's local days that moment
    falls on (a daily 23:00 New York task shows at 05:00 the next morning in
    Zagreb), and overdue/failed are decided from that moment, with the
    zone's own summer/winter time. All-day tasks never have a zone: they
    follow the user's local calendar day.
  - **Display:** a card shows the due time in the user's local time, plus
    the task's own time when they differ ("Due 15:00 · 09:00 New York").
    Forms that take a due time get a zone picker defaulting to "Fluid".
  - `GET /days` always covers the user's current local day, midnight to
    midnight, whatever zones its tasks have.
- **One source of rules.** The domain logic moves to the API as a library
  (`lib/atodo/domain/`): the client's `recurrence.js` and `occurrence.js`
  (moved with their tests — neither stays in the client) and the
  rule-bearing parts of `app.js`, ported from operating on global arrays to
  operating on a per-request state object. What the client used
  `recurrence.js` for (schedule descriptions, which dates the pause and
  "Find occurrence" calendars allow, the editor's occurrence list) comes
  from the server; plain date helpers (adding days, formatting) move to a
  small client `dates.js`, which holds no rules.
- **Transactions per action.** An action locks the task's row (`SELECT … FOR
  UPDATE`), loads what it needs, applies the change, writes only the rows
  that changed, and commits. Two devices acting on the same task are
  serialized instead of overwriting each other.
- **Same storage.** `atodo.tasks` / `atodo.occurrences` stay as they are (a
  migration adds indexes, and possibly an account time-zone column and a
  focus-session start — see below).

## Reads

### `GET /atodo/v1/days`

One day of one view per request.

| Param | Meaning |
|---|---|
| `view` | `pending`, `next-recurrence` or `all` |
| `date` | The day wanted. Its month is the month the view covers (what "pending since the start of the month" and "all of the month" mean); `next-recurrence` isn't month-bound |
| `direction` | `after` (default) or `before` — if `date` has nothing to show, the server returns the nearest day that does, in that direction |

Response:

```json
{
  "date": "2026-10-05",
  "items": [ /* Item, see below */ ],
  "previousDate": "2026-10-03",   // nearest earlier day with items, or null
  "nextDate": "2026-10-07"        // nearest later day with items, or null
}
```

`previousDate`/`nextDate` are returned even when they fall in another
month; the client decides whether to follow them (with month pages, it
doesn't).

Returning the nearest *non-empty* day keeps one request per day the user
actually sees: the pending view is mostly empty days, and a request per
empty day would be wasted. The client starts at today (or the 1st, for
another month), asks for days `after` until the viewport is full, and for
days `before` when the user scrolls up.

How the server computes it: the current `computeTodoDisplayItems` /
`computeAllTasksItems` / `computeNextRecurrenceItems`, ported, restricted to
the requested day plus a scan for the neighbouring non-empty days. To do
that it loads the account's task rows **without** their `log`/`comments`
(those are only needed for the side panel), and the occurrence rows'
state columns (not their notes and logs). That's still per-account work, but
it stays inside the server and the database — nothing large crosses the
network. (A later optimization can narrow the occurrence query by date.)

### Item

What a row on the list needs — and nothing else:

```json
{
  "taskId": "…", "seriesId": "…",
  "occurrenceDate": "2026-10-05",
  "kind": "today",                    // carried-over | today | tomorrow | upcoming
  "name": "…", "label": "Series: name", // label: with the mixed-series prefix
  "description": "…",
  "allDay": false,
  "dueTime": "15:00",                 // in the user's local time
  "timeZone": "America/New_York",     // null = fluid
  "zoneDueTime": "09:00",             // in the task's zone, when fixed
  "appointment": false, "passive": false, "recurUntilCompleted": false,
  "completed": false, "failed": false, "overdue": false, "dismissed": false,
  "active": false,                    // this occurrence is the focused one
  "locked": false,                    // beyond a lapsed plan's limits
  "virtual": null,                    // "subscription-prompt" for the reminder task
  "timer": null,                      // { mode, totalSeconds, remainingSeconds, runningSince, continuePastZero }
  "actions": ["complete", "focus", "timer", "dismiss", "edit", "pause", "stats"]
}
```

`actions` replaces the eligibility logic in `buildTodoItemRow` and
`showTodoContextMenu` (canWorkOnNow, isLockedByLimit, canPauseRecurrence,
currentPause, …): the server says what's possible, the client draws buttons
and menu entries for those. The subscription reminder task stops being a
stored task: the server adds it as a virtual item for free accounts, and
the client shows its text in the user's language.

### Other reads

| Endpoint | Replaces | Returns |
|---|---|---|
| `GET /tasks/{taskId}` | the editor, the side panel's task scope | The task with all its occurrence rows, notes and logs |
| `GET /series/{seriesId}` | the side panel's series scope, series editor | Its tasks with their occurrences, notes and logs |
| `GET /tasks/{taskId}/occurrences?from&to` | the editor's Occurrences tab, "Find occurrence", the pause date picker | Every date the task occurs on in the range, with its state |
| `GET /agenda?date` | `buildTodayAgendaItems` | The day's items with agenda colour, duration (average focus time) and draggability |
| `GET /manage?month` | Manage Tasks (`computeSeriesMonthGroups`) | Series and their tasks occurring in that month, without occurrences |
| `GET /stats?scope=task:{id}\|series:{id}\|all` | the stats modal | The computed numbers, per day where shown |
| `GET /export` | Download my data | The whole account, as today's export file — the one deliberately large response, only on request |

### Maintenance on read

Three things the client now does on every render will run on the server at
the start of a read, writing only if something changed:
`expireFinishedTimers`, `autoDismissStaleCarriedOverOccurrences`,
`advanceRecurUntilCompletedTasks`. The chime for an expired timer stays a
client effect: the client sees the timer gone (or its own countdown reach
zero) and plays it.

Older data in the pre-occurrence "fragments" format
(`migrateToSingleRecordTasks`) is migrated by the server: on import, and
once per account if a cheap check finds several rows sharing a `task_id`.

## Writes (actions)

Every action returns `{ affected: { taskId, dates: […] | "all" } }` plus
whatever the client needs to update in place (the item, the active task,
the user's subscription token where relevant). The client re-fetches the
affected days it has loaded (or marks them stale until scrolled into view).

| Endpoint | Replaces |
|---|---|
| `POST /tasks` | `openTaskForm` (create; free-tier limits enforced here) |
| `PATCH /tasks/{taskId}` | `applyGeneralInfoInPlace` (+ `freezeMixedSeriesNameIfRenaming`) |
| `PUT /tasks/{taskId}/pattern` | `applyPatternChange` (+ `rollPatternForward`, `recomputeUntouchedNextCycle`) |
| `DELETE /tasks/{taskId}` | `deleteTask` |
| `POST /tasks/{taskId}/pause` `{ from, until }` | `promptPauseRecurrence` → `pause…` |
| `POST /tasks/{taskId}/resume` | `resumeRecurrenceNow` |
| `POST /tasks/{taskId}/notes`, `PATCH`/`DELETE …/notes/{timestamp}` | task-level notes |
| `POST /tasks/{taskId}/occurrences` `{ date }` | `promptManualOccurrence` (extra occurrence) |
| `POST /tasks/{taskId}/occurrences/{date}/{action}` — `complete`, `reopen`, `fail`, `unfail`, `dismiss`, `restore` | `toggleTaskCompletion`, `toggleTaskFailedMark`, `dismissOccurrence`, `restoreOccurrence` (incl. recur-until-completed resolve/reopen, sweeping earlier missed occurrences) |
| `POST …/occurrences/{date}/reschedule` `{ date }` | `rescheduleOccurrencePrompt` |
| `DELETE …/occurrences/{date}` | `deleteOccurrence` |
| `PUT …/occurrences/{date}/details`, notes as above | occurrence details and notes |
| `POST …/occurrences/{date}/time` `{ dueTime }` | the agenda's drag-to-reschedule |
| `PUT /focus` `{ taskId, date }` / `DELETE /focus` | `setActiveTaskId` — the server keeps the focus session's start, so focus time is credited server-side (today it's in page memory and lost on reload) |
| `POST …/occurrences/{date}/timer` `{ mode, minutes, continuePastZero, start }`, `DELETE …/timer` | `startTaskTimerPrompt`, `cancelTaskTimer` |
| `PATCH /series/{seriesId}`, membership changes | the series editor |
| `POST /stats/reset` `{ scope }` | `resetStats` |

`PUT /tasks` and the whole-list `GET /tasks` go away.

The 5-second "linger" stays in the client: after completing an item it
keeps it shown crossed out for 5 s and only then re-fetches the day, so the
check mark is visible before the item (and any earlier missed occurrences
the server swept up with it) disappears.

## Import

- `POST /imports` → `{ importId }`
- `POST /imports/{importId}/chunks` — a chunk of tasks with their
  occurrences (≈ 200 KB each, whole tasks only), staged server-side
- `POST /imports/{importId}/commit` — migrates old formats, applies the
  free-tier limits, and replaces the account's tasks in one transaction;
  until then nothing changes, so a failed or abandoned import leaves the
  account untouched
- **Progress:** the client splits the file, shows a progress bar (bytes sent
  of total) and keeps the app usable meanwhile
- **Throttling:** the client sends one chunk at a time with a short pause
  between them; the server limits chunk uploads per account and expires
  abandoned imports
- **Metered connections:** before starting, the client always shows the
  import's size; where the browser says the connection is metered
  (`navigator.connection.saveData`, or `type === "cellular"` — reported by
  Chromium-based browsers only) it adds a warning about mobile data

## Client

- **State:** a cache of loaded days per (view, month); the focused task and
  its timer; what's selected in the side panel (fetched on selection).
  No `tasks`/`occurrences` arrays.
- **Endless list:** days are fetched in order from today (or the 1st) until
  the viewport is filled plus a margin, then as the user scrolls in either
  direction. Days far outside the viewport keep their measured height but
  drop their rows from the DOM. The day highlight, Page Up/Down stepping and
  the date panels keep working on this structure.
- **Timers tick locally** from the item's timer data; only the timer's own
  row is updated each second (today the whole list re-renders every second).
- **Forms** (create, edit, pattern, pause, timers) stay as they are and
  submit to the endpoints above.
- **Offline / failure:** an action that fails shows an error and leaves the
  list as the server last reported it; "unsaved changes" no longer exist as
  a client-side queue. Maintenance mode keeps its banner.

## Testing

- The ported domain library gets the existing `recurrence.test.js` and
  `occurrence.test.js`, plus new tests for each view and each action,
  written against the behaviour of the current client (the tests encode
  today's rules before the code moves).
- An integration harness runs the API against a scratch database: create
  tasks, run actions across simulated days and time zones, check the
  `/days` responses.
- The client is checked in the browser against that API, view by view.

## Order of work

1. Domain library in the API, ported from the client, with tests.
2. Read endpoints (`/days`, task, series, occurrences, agenda, manage,
   stats, export) and maintenance-on-read.
3. Action endpoints, focus and timers.
4. Import endpoints.
5. Client: data layer and endless list; then side panel, agenda, editor,
   Manage Tasks, stats, import UI.
6. Remove `PUT /tasks` / `GET /tasks`, update both API specs, docs, README.

## Decided

- `recurrence.js` and `occurrence.js` leave the client entirely.
- The time zone travels with each request (`X-Timezone`); storing it on the
  account as well isn't needed yet.
- Fixed time zones for timed tasks, fluid by default; all-day tasks have
  none.
- `GET /days` has no `month`; neighbouring days are returned across months.
