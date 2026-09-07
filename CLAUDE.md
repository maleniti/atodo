# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A standalone to-do list web app (recurring tasks, overdue/failed states, work timers), ported out of the `browser` project's new-tab widget. Plain HTML/CSS/JS, no build step, no framework, no package.json. Data lives entirely in `localStorage` — there is no backend.

## Commands

- **Run the app**: open `index.html` directly in a browser, or serve the directory (e.g. `npx serve .`). There's no dev server or build step.
- **Run tests**: `node recurrence.test.js` — a plain Node script using `node:assert`, not a test framework (no jest/mocha). It exits non-zero and throws on the first failed assertion; there's no way to run a single test in isolation, just re-run the whole file. Prints `recurrence.test.js: all assertions passed` on success.
- **Docker**: `docker build .` copies the five static files (`index.html`, `style.css`, `app.js`, `recurrence.js`, `sharedInputBehavior.js`) into an `nginx:alpine` image. If you add a new source file, add it to the `COPY` line in `Dockerfile` too, or it won't ship.

## Architecture

Four scripts, loaded via plain `<script>` tags in this order (`index.html`): `sharedInputBehavior.js`, `recurrence.js`, `app.js`. No modules, no bundler — load order matters and everything is global.

- **`recurrence.js`** — pure recurrence/overdue date math, no DOM or localStorage access. UMD-lite: exports via `module.exports` under Node (so `recurrence.test.js` can require it directly) and `window.Recurrence` in the browser. This is the only file with a test suite, and the only one that's meaningfully unit-testable in isolation — `app.js` is DOM-driven and untested. When changing recurrence/due-date logic, add assertions to `recurrence.test.js` in the same style as the existing ones (plain `assert.ok`/`assert.strictEqual` with a descriptive message as the last arg).
- **`app.js`** — everything else: task CRUD, the to-do list rendering/state machine, timers, the generic `showFormModal()` used for all add/edit forms (a `window.prompt()`/native-dialog replacement, since Linux Chromium has no OS text-input dialog), and the recurring-task edit/delete "split" logic (`applySplitEdit`/`applySplitDelete`). One large file with heavy comments explaining *why*, not what — read the comments before changing behavior near timers, dismissal, or the recurrence split logic; the invariants are non-obvious and are explained inline rather than in a design doc.
- **`sharedInputBehavior.js`** — document-delegated focus/click/double-click text-selection behavior for every text `<input>`/`<textarea>` on the page, including ones created dynamically by modals. Self-contained IIFE, no exports.

### Key domain concepts (in `app.js`)

- **Task model**: `{ id, name, description, dueDate, dueTime, allDay, appointment, endDate, frequency, completions: {dateISO: true}, dismissed: {dateISO: true}, timer? }`. `frequency` shapes are documented at the top of `recurrence.js` (`once`/`days`/`weeks`/`months`, with weekly weekday lists and several monthly day-selection modes).
- **Overdue vs. failed**: a normal task that's missed becomes "overdue" and carries over; a task flagged `appointment` becomes "failed" (permanent, crossed out red) instead once past due — see `pastDueStatus()`.
- **Dismissal**: `task.dismissed` (separate from `task.completions`) tracks whether a past occurrence should still show on the list, so a failed appointment's history isn't rewritten to look completed just to declutter the view. Completing a carried-over item lingers ~5s before dismissing (`scheduleDismissal`) so the checkmark is visible before it disappears.
- **Active task / timers**: only one task can be "active" at a time (`activeTaskId`), always changed through `setActiveTaskId()` so a timer's running/paused state is checkpointed consistently. A timer's remaining time is derived from a fixed checkpoint plus elapsed wall-clock time (`currentTimerRemaining`), not a live countdown, so it survives page reloads without drift.
- **Recurring task edits/deletes**: double-clicking a recurring occurrence prompts for scope (`showEditScopeChoice`: this occurrence / this and following / all). Non-"all" scopes split the series into new task records rather than mutating in place — see the extensive comments on `applySplitEdit`/`applySplitDelete`.
- **Two list views**: "pending/overdue" (`computeTodoDisplayItems`) vs. "next recurrence" (`computeNextRecurrenceItems`), toggled and persisted separately from the underlying overdue/active computations (view mode is a display preference only).
