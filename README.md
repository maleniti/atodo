# A-To-Do

A to-do list web app for tasks that repeat: recurring tasks with flexible
patterns, overdue and failed states, work timers, notes and an activity log
per task. Free to use with limits, or unlimited with a paid Pro subscription.
Available in English and Croatian.

This repository is the **client**: plain HTML, CSS and JavaScript, with no
build step, framework or dependencies. The backend it talks to lives in a
separate repository (see [How it fits together](#how-it-fits-together)).

## Features

- **Tasks and recurrence** — one-off and recurring tasks (every N days,
  weekly on chosen weekdays, monthly by day or by "2nd Tuesday", …), with an
  end date, all-day or timed, and "recur until completed" tasks that carry
  over day by day until done.
- **Overdue vs. failed** — a missed task carries over as overdue; one marked
  as an appointment becomes failed once its time has passed.
- **Occurrences** — every occurrence of a recurring task has its own state,
  notes, details and activity log; past occurrences stay as they were when
  the pattern changes. Recurrence can be paused until a date and resumed.
- **Views** — pending & overdue, next recurrence, and all tasks of a month;
  the day being read is highlighted while scrolling (Page Up/Down and Space
  step a day at a time).
- **Focus and timers** — one active task at a time, with a countdown or
  count-up timer that survives reloads; per-task, per-series and overall
  stats.
- **Side panel and agenda** — notes and the activity log of the selected
  task, occurrence or series; today's agenda as a timeline.
- **Accounts** — registration with email verification, password reset,
  email change with an undo link, data export and import, account deletion
  (immediate, or scheduled for when a paid subscription ends).
- **Subscriptions** — a 14-day free trial (one per account), monthly or
  yearly Pro through Stripe Checkout, cancelling and resuming, Stripe's
  Customer Portal for card updates. Every payment gets a fiscalized
  receipt (Croatian B2C fiscalization, done by the backend).
- **Prices** — every price shown comes from the published price list, with
  its anchor price ("sidrena cijena") next to it, as Croatian law requires;
  the price list (CSV) and its recent versions can be downloaded from the
  landing page.
- **Help** — a FAQ and a support form (billing, account, bug, feature
  suggestion, complaint), reachable from the avatar menu, the login screen
  and every page's footer.
- **Personalisation** — nickname and avatar, light and dark themes,
  backgrounds from Unsplash, 12/24-hour time, first day of the week,
  English or Croatian.

## How it fits together

| Repository | What it is |
|---|---|
| **atodo** (this one) | The client: the app (`index.html`) and its website — landing page with pricing, checkout, FAQ, support, Privacy Policy, Terms of Service. |
| **male-niti-api** | The backend. Implements this client's contract, [`api-spec.yaml`](api-spec.yaml) (`/atodo/v1`), plus the published price lists (`/maleniti/v1/price-lists`), Stripe billing, fiscalization and email. Its database schema is versioned there (`db/migrations/`). |
| **male-niti-admin** | The admin app: price lists, products and points of sale, support messages. |
| **male-niti** | The platform: builds and deploys everything with Docker Compose (`./mn`), including the TLS proxy, database backups, maintenance mode and versioned releases. |

The client keeps nothing of value in the browser: tasks, settings and
subscriptions live on the backend. `localStorage` only holds the session
token and a few display preferences from before login.

## Files

| Files | Purpose |
|---|---|
| `index.html`, `app.js`, `style.css` | The app itself. |
| `recurrence.js`, `occurrence.js` | Recurrence date math and the task/occurrence data model — pure logic, unit-tested. |
| `auth.js` | The API client every page uses (`apiFetch`), plus thin wrappers for the auth and subscription endpoints. |
| `anchor-prices.js` | Loads the current prices and fills every price and anchor-price badge. |
| `sharedInputBehavior.js` | Text-selection behaviour for every input. |
| `landing.*`, `checkout.*`, `success.*`, `cancel.*` | The website and the subscription flow. |
| `faq.*`, `support.*`, `privacy.*`, `terms.*` | Help and legal pages. |
| `site-i18n.js` | Language handling for the website pages (the app has its own). |
| `api-spec.yaml` | The OpenAPI contract the backend implements (a copy lives in the backend repository — keep them in sync). |
| `Dockerfile`, `nginx.conf`, `docker-entrypoint.d/`, `atd` | The container that serves the client. |
| `CLAUDE.md` | Detailed architecture notes: how each part works and why. |

## Running it locally

You need a backend implementing `api-spec.yaml` — see male-niti-api.

**Without Docker:**

1. Copy `config.example.js` to `config.js` (gitignored) and set
   `apiBaseUrl` to the backend, e.g. `http://localhost:50000`.
2. Serve the directory, e.g. `npx serve .`, and open `landing.html` or
   `index.html`.

`config.js` is optional: without it the client calls a same-origin
`/atodo/v1`, which works when the backend is reverse-proxied onto the same
origin (as the platform does in production).

**With Docker:**

1. Create a `.env` file (gitignored) next to the `Dockerfile` — see
   [Configuration](#configuration).
2. Run `./atd <port>`, e.g. `./atd 8099`. It builds the image and (re)starts
   the container `advanced-todo-<port>`; each port gets its own image and
   container, so builds of different checkouts can run side by side.

The container generates `config.js` from the environment on every start,
so configuration changes need only a re-run, not a rebuild.

## Configuration

| Setting (`config.js` / `.env`) | Purpose |
|---|---|
| `apiBaseUrl` / `API_BASE_URL` | The backend's base URL; empty means same-origin `/atodo/v1`. |
| `unsplashAccessKey` / `UNSPLASH_ACCESS_KEY` | An app-wide Unsplash key for the background picker. Without it, each user can enter their own. |
| `landingVideoUrlEn`, `landingVideoUrlHr` / `LANDING_VIDEO_URL_EN`, `LANDING_VIDEO_URL_HR` | YouTube links for the landing page's walkthrough video, per language; empty shows a placeholder. |

The Docker build also takes a `VERSION` build argument (the platform
release, `dev` by default), written to `version.js`: open tabs compare it
with the live version and offer a reload after a deploy.

Everything about billing — Stripe keys, which brand's products are sold,
prices, fiscalization — is configured on the backend and in the admin app,
not here.

## Tests

```bash
node recurrence.test.js
node occurrence.test.js
```

Plain Node scripts using `node:assert`; each stops at the first failure.
They cover the recurrence and occurrence logic only — the rest of the
client is tested by hand against a running backend.

## Deployment

The platform (male-niti) deploys versioned releases: `./mn deploy
<version>` builds every repository at that version's tag, migrates the
database (behind a maintenance page) and starts the new release. See
male-niti's README.

## Known limitations

- **The whole task list travels in every request** — see the plan below.
  Until then, a save is limited to 10 MB.
- **Last save wins between devices.** Saving replaces the account's whole
  task list, without checking whether another device or tab saved in the
  meantime, so two devices editing at once can overwrite each other's
  changes.
- **Unsaved changes live in the open tab only.** A save that fails (no
  connection, an update in progress) stays queued and is retried, with a
  "not saved" banner and a warning before leaving the page — but closing the
  tab loses it.
- **Import replaces everything.** Importing a data export replaces the
  account's whole task list; there is no merging.
- **No plan switching.** Moving between monthly and yearly isn't supported
  (fiscal receipts don't model prorations); a subscriber cancels and
  subscribes again once the paid period ends.
- **Price changes reach new subscriptions only.** Existing subscriptions
  keep renewing at the price they were taken out at; changing their price
  would mean notifying subscribers and updating each subscription in Stripe,
  which isn't automated.
- **Some billing cases are handled by hand.** A lost payment dispute needs
  its storno receipt issued manually; refunds and extensions are done in the
  Stripe Dashboard.
- **Support replies are sent by email by hand**, and support messages are
  not deleted automatically.
- **Two languages**: English and Croatian.
- **Little automated testing**: only the recurrence and occurrence logic
  has unit tests.

## Planned

### Saving and loading individual tasks

Today the client loads and saves the account's entire task list at once —
every task, every occurrence, and their notes and activity logs. That's
simple and keeps the client the single place where changes are computed,
but the requests grow with the account's history:

| Endpoint | What it carries |
|---|---|
| `GET /atodo/v1/tasks` | The whole task list, on every app load. |
| `PUT /atodo/v1/tasks` | The whole task list, after every change — a checkbox, a note, a timer checkpoint. Allowed up to 10 MB (the backend's limit for this route and the TLS proxy's `client_max_body_size`); everything else is limited to 100 kB. |
| `PUT /atodo/v1/tasks`, via Settings → Import data | A whole imported list at once. |

(Settings → Download my data is built in the browser from what's already
loaded, so it isn't a request.)

The plan is to change the API and the client to work with individual tasks
and occurrences instead:

- **API** — endpoints for one task or occurrence at a time (create, update,
  delete), with a revision per record so a save made on a stale copy is
  detected instead of silently overwriting another device's change; loading
  limited to what's being shown (e.g. a month, or active tasks) rather than
  the whole history; import as a batch operation of its own.
- **Client** — saving only what changed, keeping the queue-and-retry
  behaviour for each change, and reconciling with the server when another
  device has changed the same task.

This removes the size limit, makes saves cheap regardless of history, and
fixes the "last save wins" problem between devices.

### Under consideration

- A billing view in the admin app: per account, our receipts and checkout
  sessions next to what Stripe reports, flagging mismatches.
- Answering support messages from the admin app, and automatic deletion of
  resolved ones after a set period.
- Changing the price of existing subscriptions with advance notice to their
  subscribers.
