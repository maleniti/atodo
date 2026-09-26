// uid()/AUTH_TOKEN_KEY/codeError/apiFetch/decodeToken/describeSubscription/
// startTrialSubscription/createCheckoutSession/getCheckoutSessionStatus/
// cancelSubscription/scheduleAccountDeletion/cancelScheduledAccountDeletion
// all live in auth.js now (loaded before this file -- see index.html)
// since landing.html/checkout.html need them too and can't load this whole
// SPA script just for them.

// ---------------------------------------------------------------------------
// i18n -- English + Croatian. Deliberately NOT covering everything in the
// app: activity-log entries (task.log messages -- see logTaskEvent) are
// permanent historical text once written, so translating the dictionary
// later wouldn't retranslate old entries and would just produce a mixed-
// language log; and describeTaskSchedule's natural-language recurrence
// summary ("Every 2 weeks on Mon/Wed") joins ordinals/weekday abbreviations
// in a way that would need real Croatian grammatical-case handling to read
// naturally, not just swapped-in word-for-word strings. Both are left in
// English on purpose.
//
// currentUserLanguage is read by t() below and by every option-list
// function (getFrequencyOptions() etc.) at the point they're actually
// called (building a form, rendering the list, ...) -- never cached in a
// plain array at script-load time -- so a language change picked up by
// applyLanguage() takes effect immediately, without a page reload.
// ---------------------------------------------------------------------------

const I18N = {
  en: {
    'login.title': 'Log in',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Log in',
    'login.noAccount': "Don't have an account?",
    'login.registerLink': 'Create one',
    'login.invalidCredentials': 'Incorrect email or password.',
    'login.networkError': 'Could not reach the server. Check your connection and try again.',
    'login.notVerified': "That email hasn't been verified yet – check your inbox for the verification link.",
    'login.accountExpired': "This account was automatically deleted after 12 months of inactivity, along with all its data. You're welcome to create a new one.",
    'login.accountDeletedScheduled': "This account was deleted, as scheduled, once its subscription ended, along with all its data. You're welcome to create a new one.",
    'login.verifiedSuccess': 'Email verified – you can now log in as {email}.',
    'login.verifyExpired': 'That verification link has expired. Please register again.',
    'login.verifyInvalid': 'That verification link is invalid or has already been used.',

    'register.title': 'Create account',
    'register.confirmPassword': 'Confirm password',
    'register.passwordHint': 'At least 8 characters.',
    'register.submit': 'Create account',
    'register.haveAccount': 'Already have an account?',
    'register.loginLink': 'Log in',
    'register.backToLogin': 'Back to log in',
    'register.passwordMismatch': "Passwords don't match.",
    'register.passwordTooShort': 'Password must be at least 8 characters.',
    'register.invalidEmail': 'Enter a valid email address.',
    'register.emailTaken': 'An account with that email already exists.',
    'register.genericError': 'Something went wrong – please try again.',
    'register.checkEmail': "We've sent a verification link to {email}. Click it within 6 hours to activate your account.",

    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.ok': 'OK',
    'common.add': 'Add',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.remove': 'Remove',
    'common.clickAgainToDelete': 'Click again to delete',

    'avatar.accountMenu': 'Account menu',
    'menu.manageTasks': 'Manage tasks…',
    'menu.settings': 'Settings…',
    'menu.privacyPolicy': 'Privacy Policy',
    'menu.termsOfService': 'Terms of Service',
    'menu.logout': 'Log out',
    'menu.logoutTitle': 'Log out (for testing the login screen)',

    'app.titleGeneric': 'To-Do List',
    'app.titleWithName': "{name}'s To-Do List",

    'month.prev': 'Previous month',
    'month.next': 'Next month',
    'month.jumpToCurrent': 'Jump to current month',
    'view.pending': 'Pending & overdue tasks this month',
    'view.next': 'Next recurrence of every task',
    'view.all': 'All tasks this month',

    'todo.addTask': '+ Add task',
    'todo.addTaskDue': 'Add a task due {date}',
    'todo.empty': 'You have no to-dos yet.',
    'todo.today': 'Today',
    'todo.yesterday': 'Yesterday',
    'todo.tomorrow': 'Tomorrow',
    'todo.tomorrowAllDay': 'Tomorrow, all day',
    'todo.tomorrowAt': 'Tomorrow, {time}',
    'todo.allDay': 'All day',
    'todo.due': 'Due {time}',
    'todo.overdueSince': 'Overdue since {date}',
    'todo.overdueSinceAt': 'Overdue since {date} {time}',
    'todo.failedWasDue': 'Failed – was due {date}',
    'todo.failedWasDueAt': 'Failed – was due {date} {time}',
    'todo.timerElapsed': 'Total elapsed time is {elapsed}',
    'todo.timerElapsedPlanned': 'Total elapsed time is {elapsed} with {planned} planned',
    'todo.timerRemainingOfTotal': '{remaining} of {total}',
    'todo.stopWorking': 'Stop working on this task',
    'todo.workOnNow': 'Work on this task now',
    'todo.showUndo': 'Show (undo hiding it)',
    'todo.hideRemove': 'Hide (remove from the list)',

    'menu.timer': 'Timer',
    'menu.pauseTimer': 'Pause timer',
    'menu.cancelTimer': 'Cancel timer',
    'menu.resumeTimer': 'Resume timer',
    'menu.markDone': 'Mark as done',
    'menu.markFailed': 'Mark as failed',
    'menu.focus': 'Focus',
    'menu.unfocus': 'Unfocus',
    'menu.show': 'Show',
    'menu.hide': 'Hide',
    'menu.editPattern': 'Edit recurrence pattern…',
    'menu.pauseRecurrence': 'Pause recurrence until…',
    'pause.title': 'Pause "{name}"',
    'pause.hint': 'From {date}, until the date you pick -- recurrence starts again on that exact date.',
    'pause.summary': 'Paused {from} – {to}, resumes {resume}.',
    'pause.nothingAfter': "This task's recurrence ends before there's anything left to resume.",
    'pause.unsupportedMixed': 'Pausing isn\'t available for a task that has been both "recur until completed" and a regular recurring task.',
    'datePicker.prevMonth': 'Previous month',
    'datePicker.nextMonth': 'Next month',
    'menu.taskStats': 'Task stats',

    'sidePanel.agendaHeading': "Today's agenda",
    'sidePanel.agendaEmpty': 'No tasks today.',
    'sidePanel.occurrence': 'Occurrence',
    'sidePanel.occurrenceTitle': 'Just this occurrence',
    'sidePanel.task': 'Task',
    'sidePanel.taskTitle': 'Every fragment of this task',
    'sidePanel.series': 'Series',
    'sidePanel.seriesTitle': 'Every task in this series',
    'sidePanel.commentPlaceholder': 'Add a note about this task…',
    'sidePanel.addNote': 'Add note',
    'sidePanel.notes': 'Notes',
    'sidePanel.activity': 'Activity',
    'sidePanel.noNotes': 'No notes yet.',
    'sidePanel.noActivity': 'No activity yet.',
    'sidePanel.editNote': 'Edit note',
    'sidePanel.noteLabel': 'Note',
    'sidePanel.done': 'Done',
    'sidePanel.stopEditing': 'Stop editing/deleting notes',
    'sidePanel.editOrDelete': 'Edit or delete notes',

    'timer.setTitle': 'Set a timer',
    'timer.countUp': 'Count up (no fixed duration – stops automatically after 6 hours)',
    'timer.minutesLabel': 'Minutes to work on this task',
    'timer.continuePastZero': 'Continue counting down past zero instead of stopping',
    'timer.start': 'Start',
    'timer.set': 'Set',

    'taskForm.editOccurrence': 'Edit this occurrence',
    'taskForm.editFollowing': 'Edit this and following occurrences',
    'taskForm.editTask': 'Edit task',
    'taskForm.addTask': 'Add task',
    'taskForm.name': 'Name',
    'taskForm.description': 'Description',
    'taskForm.details': 'Details',
    'taskForm.dueDate': 'Due date',
    'taskForm.allDay': 'All day (no specific time)',
    'taskForm.dueTime': 'Due time',
    'taskForm.repeatsEvery': 'Repeats every',
    'taskForm.days': 'day(s)',
    'taskForm.weeks': 'week(s)',
    'taskForm.months': 'month(s)',
    'taskForm.weekdayMon': 'Mon',
    'taskForm.weekdayTue': 'Tue',
    'taskForm.weekdayWed': 'Wed',
    'taskForm.weekdayThu': 'Thu',
    'taskForm.weekdayFri': 'Fri',
    'taskForm.weekdaySat': 'Sat',
    'taskForm.weekdaySun': 'Sun',
    'taskForm.sunday': 'Sunday',
    'taskForm.monday': 'Monday',
    'taskForm.tuesday': 'Tuesday',
    'taskForm.wednesday': 'Wednesday',
    'taskForm.thursday': 'Thursday',
    'taskForm.friday': 'Friday',
    'taskForm.saturday': 'Saturday',
    'taskForm.alsoRecurOn': "Also recur on these days (weekly only; leave blank to just use the due date's weekday)",
    'taskForm.monthlyPattern': 'Monthly pattern',
    'taskForm.monthlySameDay': 'Same day of month as due date',
    'taskForm.monthlyLastDay': 'Last day of month',
    'taskForm.monthlyBeforeLast': 'N days before last day of month',
    'taskForm.monthlyWeekday': 'Nth weekday of month',
    'taskForm.monthlyMultiWeekday': 'Earliest Nth occurrence of any of the selected days',
    'taskForm.monthlyMultiWeekdayOffset': 'N days before/after earliest Nth occurrence of any of the selected days',
    'taskForm.monthlyMultiDay': 'Multiple days of month (1-28)',
    'taskForm.monthlyOffsetLabel': 'Days before last day of month (0-3)',
    'taskForm.dayOfWeek': 'Day of week',
    'taskForm.whichOccurrence': 'Which occurrence',
    'taskForm.ordinal1': '1st',
    'taskForm.ordinal2': '2nd',
    'taskForm.ordinal3': '3rd',
    'taskForm.ordinal4': '4th',
    'taskForm.ordinal5': '5th',
    'taskForm.ordinalLast': 'Last',
    'taskForm.selectedDays': 'Selected days (earliest Nth occurrence of any of these)',
    'taskForm.daysInline': 'days',
    'taskForm.before': 'Before',
    'taskForm.after': 'After',
    'taskForm.occurrenceWord': 'occurrence',
    'taskForm.occurrenceHr': '. occurrence',
    'taskForm.multiDayDays': 'Days of the month (1-28)',
    'taskForm.endDate': 'End date (optional – last recurrence on or before this date)',
    'taskForm.appointmentDesc':
      "Appointment – its due date is an expiration, not a standing reminder: if not done by then, it's marked failed (crossed out, red) instead of staying overdue. Can still be checked off as done afterward.",
    'taskForm.passiveDesc':
      "Passive – a plain reminder, not an actionable task: can't be focused on or timed, and its checkbox marks it failed instead of done. Never auto-resolves once overdue – stays visible until you mark it failed or, once it's no longer due today, dismiss it.",
    'taskForm.recurUntilCompletedDesc':
      "Recur until completed – never marked overdue or failed: if not done by its due time, it's rescheduled to the next day instead (same time), and the missed occurrence stays visible alongside the new one until either is checked off. A recurring task's next occurrence is then counted from whenever it's actually completed, not the original schedule.",
    'taskForm.endDateBeforeDue': "End date can't be before the due date.",

    'manualOccurrence.title': 'Add manual occurrence',
    'manualOccurrence.cantAdd': "Can't add a manual occurrence – this task already recurs indefinitely",
    'manualOccurrence.add': 'Add manual occurrence',
    'manualOccurrence.endDateTooEarly': "Due date can't be earlier than the original recurrence's end date.",

    'manage.title': 'To-do list',
    'manage.selectSeries': 'Select a series on the left to edit it.',
    'manage.addNewTask': '+ Add new task',
    'manage.seriesNamePlaceholder': 'Series name',
    'manage.saved': 'Saved',
    'manage.noTasksYet': 'No tasks yet.',
    'manage.resetName': 'Reset name to match series name',
    'manage.removeFromSeries': 'Remove from series',

    'editScope.title': 'Edit recurring task',
    'editScope.desc': 'This task repeats. What would you like to edit?',
    'editScope.instance': 'Only this occurrence',
    'editScope.following': 'This and following occurrences',
    'editScope.all': 'All occurrences',

    'patternEdit.titleInPlace': 'Edit recurrence pattern',
    'patternEdit.titleFollowing': 'Edit recurrence pattern (this and following occurrences)',

    'occurrencePanel.editThisOccurrence': 'Edit this occurrence…',
    'occurrencePanel.reschedule': 'Reschedule…',
    'occurrencePanel.rescheduleTitle': 'Reschedule occurrence',
    'occurrencePanel.rescheduleDateLabel': 'New date',
    'occurrencePanel.rescheduleCollision': 'Another occurrence of this task is already recorded on that date.',
    'occurrencePanel.blockedRecurUntilCompleted': "Not available while this task's next occurrence is still pending.",
    'todo.reopenBlockedRecurUntilCompleted': 'A later occurrence of this task has already been completed since, so this one can no longer be marked not done.',

    'taskStats.title': 'Stats: {name}',
    'taskStats.totalFocusedAllRecurrences': 'Total time focused (all recurrences)',
    'taskStats.totalFocused': 'Total time focused',
    'taskStats.total': 'Total',
    'taskStats.justFocused': 'Just focused',
    'taskStats.focusedWithTimer': 'Focused with timer',
    'taskStats.completion': 'Completion',
    'taskStats.completed': 'Completed',
    'taskStats.recurrencesToDate': 'Recurrences to date',
    'taskStats.completionRate': 'Completion rate',
    'taskStats.timePerRecurrence': 'Time per recurrence',
    'taskStats.noFocusedTime': 'No focused time logged yet.',
    'taskStats.focusedAndTimer': '{focused} focused · {timer} timer',

    'settings.title': 'Settings',
    'settings.nickname': 'Nickname',
    'settings.nicknamePlaceholder': 'e.g. Nikola',
    'settings.timeFormat': 'Time format',
    'settings.timeFormat24': '24-hour (e.g. 18:00)',
    'settings.timeFormat12': '12-hour (e.g. 6:00 PM)',
    'settings.language': 'Language',
    'settings.languageEnglish': 'English',
    'settings.languageCroatian': 'Hrvatski (Croatian)',
    'settings.theme': 'Theme',
    'settings.themeDark': 'Dark',
    'settings.themeLight': 'Light',
    'settings.avatar': 'Avatar',
    'settings.uploadImage': 'Upload image…',
    'settings.background': 'Background',
    'settings.changeBackground': 'Change background…',
    'settings.subscription': 'Subscription',
    'settings.subscriptionFree': 'Free',
    'settings.subscriptionTrial': 'Trial (ends at: {date})',
    'settings.subscriptionTrialExpired': 'Trial (ended at: {date})',
    'settings.subscriptionPro': 'Pro (billed {interval}, next billing at: {date})',
    'settings.subscriptionProCancelling': 'Pro (billed {interval}, cancels at: {date})',
    'settings.subscriptionProExpired': 'Pro (expired at: {date})',
    'settings.billingMonthly': 'monthly',
    'settings.billingAnnual': 'annually',
    'settings.cancelSubscription': 'Cancel subscription',
    'settings.scheduledDeletionNotice': 'This account will be deleted upon subscription expiration.',
    'settings.cancelScheduledDeletion': 'Cancel scheduled deletion',
    'settings.password': 'Password',
    'settings.changePassword': 'Change password…',
    'settings.data': 'Data',
    'settings.downloadData': 'Download my data…',
    'settings.importData': 'Import data…',
    'settings.dangerZone': 'Danger zone',
    'settings.deleteAccount': 'Delete account…',

    'changePassword.title': 'Change password',
    'changePassword.current': 'Current password',
    'changePassword.new': 'New password',
    'changePassword.confirm': 'Confirm new password',
    'changePassword.submit': 'Change password',
    'changePassword.tooShort': 'New password must be at least 8 characters.',
    'changePassword.mismatch': "New passwords don't match.",
    'changePassword.wrongCurrent': 'Current password is incorrect.',
    'changePassword.genericError': "Couldn't change your password. Try again in a bit.",
    'changePassword.success': 'Your password has been changed.',

    'deleteAccount.title': 'Delete account',
    'deleteAccount.warning':
      "This permanently deletes your account and every task, note, and setting tied to it – immediately, with no way to undo it. Download a copy first if you want to keep it.",
    'deleteAccount.subscriberNotice':
      "You have an active Pro subscription. Deleting immediately forfeits the rest of your paid period with no refund, and cuts off access right away. You can instead schedule deletion for when your subscription ends – it'll be cancelled now, but you'll keep full access until then.",
    'deleteAccount.confirm': 'Delete my account permanently',
    'deleteAccount.confirmImmediate': 'Delete immediately',
    'deleteAccount.schedule': 'Schedule deletion for {date}',

    'subscribe.title': 'Upgrade to A-To-Do Pro',
    'subscribe.cta': 'Start free trial…',
    'subscribe.headerCta': 'Subscribe',
    'subscribe.maybeLater': 'Maybe later',
    'subscribe.benefitTasks': 'Unlimited tasks, recurring or not',
    'subscribe.benefitNotes': 'Unlimited notes on every task',
    'subscribe.benefitAds': 'No more subscription reminders cluttering your list',
    'subscribe.priceHint': "Just 2 EUR/month afterwards – start with a free 14-day trial, no payment required now.",
    'subscribe.reasonCreateLimit': "You've hit a limit of what we can do for you for free. Subscribe today and keep adding to your To-Do list indefinitely!",
    'subscribe.reasonTaskLimit': "This task is beyond your free plan's limit, so it can't be completed or noted on.",
    'subscribe.taskName': 'Subscribe to A-To-Do',
    'subscribe.taskDescription': "It's only 2 EUR/month",
    'subscribe.taskDetails':
      'Unlock A-To-Do Pro:\n– Unlimited tasks, recurring or not\n– Unlimited notes on every task\n– No more subscription reminders cluttering your list',

    'background.title': 'Change background',
    'background.accessKeyLabel': 'Unsplash Access Key',
    'background.accessKeyPlaceholder': 'Paste your Unsplash API Access Key',
    'background.hint':
      'Backgrounds are pulled from <a href="https://unsplash.com/developers" target="_blank" rel="noopener">Unsplash’s free developer API</a>. Create a free app there and paste its Access Key here — it’s saved only on this device, separately from your task data.',
    'background.saveKey': 'Save key',
    'background.searchPlaceholder': 'Search Unsplash, e.g. mountains, minimal, ocean',
    'background.search': 'Search',
    'background.loading': 'Loading…',
    'background.noResults': 'No results.',
    'background.usePhoto': 'Use this photo – by {name} on Unsplash',
    'background.keyRejected': 'That Unsplash Access Key was rejected – double-check it and try again.',
    'background.rateLimited': "Unsplash's free-tier rate limit was hit for this key – try again in a bit.",
    'background.requestFailed': 'Unsplash request failed ({status}).',
    'background.creditBy': 'Photo by',
    'background.creditOn': 'on',
    'background.creditUnsplashName': 'Unsplash',

    'data.notJson': "That file isn't valid JSON.",
    'data.notExport': "That file doesn't look like an advanced-todo data export.",
    'data.importConfirm': "Importing will replace all of your current tasks and settings with what's in this file. Continue?",
    'data.importLimitedByFreePlan':
      "Your free plan's limits apply to imports too, so some of this file's tasks and/or notes were left out. Subscribe to import everything.",
    'saveStatus.failed': "Your latest changes haven't been saved yet ({message}). Retrying automatically -- keep this tab open until this message goes away, or they'll be lost.",
    'saveStatus.retryNow': 'Retry now',
    'saveStatus.retrying': 'Retrying…',
    'data.importSaveFailed':
      "Your tasks were imported here, but saving them to your account failed, so they may not actually be there yet: {message} Try again in a bit, and if it keeps happening, please contact support and attach the file you tried to import so we can look into it.",
  },
  hr: {
    'login.title': 'Prijava',
    'login.email': 'E-mail',
    'login.password': 'Lozinka',
    'login.submit': 'Prijava',
    'login.noAccount': 'Nemate račun?',
    'login.registerLink': 'Napravite ga',
    'login.invalidCredentials': 'Netočan e-mail ili lozinka.',
    'login.networkError': 'Nije moguće spojiti se na poslužitelj. Provjerite vezu i pokušajte ponovno.',
    'login.notVerified': 'Taj e-mail još nije potvrđen – provjerite poštanski sandučić za poveznicu za potvrdu.',
    'login.accountExpired': 'Ovaj račun je automatski izbrisan nakon 12 mjeseci neaktivnosti, zajedno sa svim podacima. Slobodno otvorite novi.',
    'login.accountDeletedScheduled': 'Ovaj račun je izbrisan, kako je zakazano, po isteku pretplate, zajedno sa svim podacima. Slobodno otvorite novi.',
    'login.verifiedSuccess': 'E-mail potvrđen – sada se možete prijaviti kao {email}.',
    'login.verifyExpired': 'Ta poveznica za potvrdu je istekla. Molimo registrirajte se ponovno.',
    'login.verifyInvalid': 'Ta poveznica za potvrdu nije valjana ili je već iskorištena.',

    'register.title': 'Napravi račun',
    'register.confirmPassword': 'Potvrdite lozinku',
    'register.passwordHint': 'Najmanje 8 znakova.',
    'register.submit': 'Napravi račun',
    'register.haveAccount': 'Već imate račun?',
    'register.loginLink': 'Prijavite se',
    'register.backToLogin': 'Natrag na prijavu',
    'register.passwordMismatch': 'Lozinke se ne podudaraju.',
    'register.passwordTooShort': 'Lozinka mora imati najmanje 8 znakova.',
    'register.invalidEmail': 'Unesite valjanu e-mail adresu.',
    'register.emailTaken': 'Račun s tom e-mail adresom već postoji.',
    'register.genericError': 'Nešto je pošlo po zlu – pokušajte ponovno.',
    'register.checkEmail': 'Poslali smo poveznicu za potvrdu na {email}. Kliknite je unutar 6 sati kako biste aktivirali račun.',

    'common.close': 'Zatvori',
    'common.cancel': 'Odustani',
    'common.save': 'Spremi',
    'common.ok': 'U redu',
    'common.add': 'Dodaj',
    'common.delete': 'Izbriši',
    'common.edit': 'Uredi',
    'common.remove': 'Ukloni',
    'common.clickAgainToDelete': 'Kliknite ponovno za brisanje',

    'avatar.accountMenu': 'Izbornik računa',
    'menu.manageTasks': 'Upravljanje zadacima…',
    'menu.settings': 'Postavke…',
    'menu.privacyPolicy': 'Pravila privatnosti',
    'menu.termsOfService': 'Uvjeti korištenja',
    'menu.logout': 'Odjava',
    'menu.logoutTitle': 'Odjava (za testiranje zaslona za prijavu)',

    'app.titleGeneric': 'Popis obveza',
    'app.titleWithName': 'Popis obveza – {name}',

    'month.prev': 'Prethodni mjesec',
    'month.next': 'Sljedeći mjesec',
    'month.jumpToCurrent': 'Skoči na trenutni mjesec',
    'view.pending': 'Zadaci na čekanju i zakašnjeli ovaj mjesec',
    'view.next': 'Sljedeće ponavljanje svakog zadatka',
    'view.all': 'Svi zadaci ovaj mjesec',

    'todo.addTask': '+ Dodaj zadatak',
    'todo.addTaskDue': 'Dodaj zadatak s rokom {date}',
    'todo.empty': 'Još nemate zadataka.',
    'todo.today': 'Danas',
    'todo.yesterday': 'Jučer',
    'todo.tomorrow': 'Sutra',
    'todo.tomorrowAllDay': 'Sutra, cijeli dan',
    'todo.tomorrowAt': 'Sutra, {time}',
    'todo.allDay': 'Cijeli dan',
    'todo.due': 'Rok: {time}',
    'todo.overdueSince': 'Zakašnjelo od {date}',
    'todo.overdueSinceAt': 'Zakašnjelo od {date} {time}',
    'todo.failedWasDue': 'Neuspješno – rok je bio {date}',
    'todo.failedWasDueAt': 'Neuspješno – rok je bio {date} {time}',
    'todo.timerElapsed': 'Ukupno proteklo vrijeme: {elapsed}',
    'todo.timerElapsedPlanned': 'Ukupno proteklo vrijeme: {elapsed} od planiranih {planned}',
    'todo.timerRemainingOfTotal': '{remaining} od {total}',
    'todo.stopWorking': 'Prestani raditi na ovom zadatku',
    'todo.workOnNow': 'Radi na ovom zadatku sada',
    'todo.showUndo': 'Prikaži (poništi skrivanje)',
    'todo.hideRemove': 'Sakrij (ukloni s popisa)',

    'menu.timer': 'Mjerač vremena',
    'menu.pauseTimer': 'Pauziraj mjerač vremena',
    'menu.cancelTimer': 'Odustani od mjerača vremena',
    'menu.resumeTimer': 'Nastavi mjerač vremena',
    'menu.markDone': 'Označi kao obavljeno',
    'menu.markFailed': 'Označi kao neuspješno',
    'menu.focus': 'Fokusiraj',
    'menu.unfocus': 'Ukloni fokus',
    'menu.show': 'Prikaži',
    'menu.hide': 'Sakrij',
    'menu.editPattern': 'Uredi obrazac ponavljanja…',
    'menu.pauseRecurrence': 'Pauziraj ponavljanje do…',
    'pause.title': 'Pauziraj "{name}"',
    'pause.hint': 'Od {date} do datuma koji odaberete -- ponavljanje se nastavlja točno na taj datum.',
    'pause.summary': 'Pauzirano {from} – {to}, nastavlja se {resume}', // no trailing period: Croatian dates already end in one
    'pause.nothingAfter': 'Ponavljanje ovog zadatka završava prije nego što bi se imalo što nastaviti.',
    'pause.unsupportedMixed': 'Pauziranje nije dostupno za zadatak koji je bio i "ponavljaj do dovršetka" i obični ponavljajući zadatak.',
    'datePicker.prevMonth': 'Prethodni mjesec',
    'datePicker.nextMonth': 'Sljedeći mjesec',
    'menu.taskStats': 'Statistika zadatka',

    'sidePanel.agendaHeading': 'Današnji raspored',
    'sidePanel.agendaEmpty': 'Danas nema zadataka.',
    'sidePanel.occurrence': 'Pojava',
    'sidePanel.occurrenceTitle': 'Samo ova pojava',
    'sidePanel.task': 'Zadatak',
    'sidePanel.taskTitle': 'Svaki dio ovog zadatka',
    'sidePanel.series': 'Niz',
    'sidePanel.seriesTitle': 'Svaki zadatak u ovom nizu',
    'sidePanel.commentPlaceholder': 'Dodajte bilješku o ovom zadatku…',
    'sidePanel.addNote': 'Dodaj bilješku',
    'sidePanel.notes': 'Bilješke',
    'sidePanel.activity': 'Aktivnost',
    'sidePanel.noNotes': 'Još nema bilješki.',
    'sidePanel.noActivity': 'Još nema aktivnosti.',
    'sidePanel.editNote': 'Uredi bilješku',
    'sidePanel.noteLabel': 'Bilješka',
    'sidePanel.done': 'Gotovo',
    'sidePanel.stopEditing': 'Prestani uređivati/brisati bilješke',
    'sidePanel.editOrDelete': 'Uredi ili izbriši bilješke',

    'timer.setTitle': 'Postavi mjerač vremena',
    'timer.countUp': 'Broji unaprijed (bez fiksnog trajanja – automatski se zaustavlja nakon 6 sati)',
    'timer.minutesLabel': 'Minute rada na ovom zadatku',
    'timer.continuePastZero': 'Nastavi odbrojavati ispod nule umjesto zaustavljanja',
    'timer.start': 'Pokreni',
    'timer.set': 'Postavi',

    'taskForm.editOccurrence': 'Uredi ovu pojavu',
    'taskForm.editFollowing': 'Uredi ovu i sljedeće pojave',
    'taskForm.editTask': 'Uredi zadatak',
    'taskForm.addTask': 'Dodaj zadatak',
    'taskForm.name': 'Naziv',
    'taskForm.description': 'Opis',
    'taskForm.details': 'Detalji',
    'taskForm.dueDate': 'Datum dospijeća',
    'taskForm.allDay': 'Cijeli dan (bez određenog vremena)',
    'taskForm.dueTime': 'Vrijeme dospijeća',
    'taskForm.repeatsEvery': 'Ponavlja se svakih',
    'taskForm.days': 'dan(a)',
    'taskForm.weeks': 'tjedan(a)',
    'taskForm.months': 'mjesec(a)',
    'taskForm.weekdayMon': 'Pon',
    'taskForm.weekdayTue': 'Uto',
    'taskForm.weekdayWed': 'Sri',
    'taskForm.weekdayThu': 'Čet',
    'taskForm.weekdayFri': 'Pet',
    'taskForm.weekdaySat': 'Sub',
    'taskForm.weekdaySun': 'Ned',
    'taskForm.sunday': 'Nedjelja',
    'taskForm.monday': 'Ponedjeljak',
    'taskForm.tuesday': 'Utorak',
    'taskForm.wednesday': 'Srijeda',
    'taskForm.thursday': 'Četvrtak',
    'taskForm.friday': 'Petak',
    'taskForm.saturday': 'Subota',
    'taskForm.alsoRecurOn': 'Također se ponavlja ovim danima (samo tjedno; ostavite prazno za dan u tjednu datuma dospijeća)',
    'taskForm.monthlyPattern': 'Mjesečni obrazac',
    'taskForm.monthlySameDay': 'Isti dan u mjesecu kao datum dospijeća',
    'taskForm.monthlyLastDay': 'Zadnji dan u mjesecu',
    'taskForm.monthlyBeforeLast': 'N dana prije zadnjeg dana u mjesecu',
    'taskForm.monthlyWeekday': 'N-ti dan u tjednu u mjesecu',
    'taskForm.monthlyMultiWeekday': 'Najranija N-ta pojava bilo kojeg od odabranih dana',
    'taskForm.monthlyMultiWeekdayOffset': 'N dana prije/poslije najranije N-te pojave bilo kojeg od odabranih dana',
    'taskForm.monthlyMultiDay': 'Više dana u mjesecu (1-28)',
    'taskForm.monthlyOffsetLabel': 'Dana prije zadnjeg dana u mjesecu (0-3)',
    'taskForm.dayOfWeek': 'Dan u tjednu',
    'taskForm.whichOccurrence': 'Koja pojava',
    'taskForm.ordinal1': '1.',
    'taskForm.ordinal2': '2.',
    'taskForm.ordinal3': '3.',
    'taskForm.ordinal4': '4.',
    'taskForm.ordinal5': '5.',
    'taskForm.ordinalLast': 'Zadnja',
    'taskForm.selectedDays': 'Odabrani dani (najranija N-ta pojava bilo kojeg od njih)',
    'taskForm.daysInline': 'dana',
    'taskForm.before': 'Prije',
    'taskForm.after': 'Poslije',
    'taskForm.occurrenceWord': 'pojava',
    'taskForm.occurrenceHr': '. pojava',
    'taskForm.multiDayDays': 'Dani u mjesecu (1-28)',
    'taskForm.endDate': 'Datum završetka (neobavezno – zadnje ponavljanje na ili prije ovog datuma)',
    'taskForm.appointmentDesc':
      "Termin – datum dospijeća je rok, a ne stalni podsjetnik: ako nije obavljen do tada, označava se kao neuspješan (precrtano, crveno) umjesto da ostane zakašnjelo. Ipak se može naknadno označiti kao obavljeno.",
    'taskForm.passiveDesc':
      "Pasivno – običan podsjetnik, a ne izvediv zadatak: ne može se fokusirati niti mjeriti vrijeme, a njegova kvačica označava neuspjeh umjesto dovršenosti. Nikad se automatski ne rješava nakon isteka roka – ostaje vidljivo dok ga ne označite neuspješnim ili, kad više nije na redu za danas, ga uklonite.",
    'taskForm.recurUntilCompletedDesc':
      "Ponavljaj do dovršetka – nikad se ne označava kao zakašnjelo ili neuspješno: ako nije obavljeno do roka, premješta se na sljedeći dan (isto vrijeme), a propušteni rok ostaje vidljiv uz novi sve dok jedan od njih ne označite obavljenim. Sljedeća pojava ponavljajućeg zadatka tada se računa od trenutka kad je stvarno dovršen, a ne prema izvornom rasporedu.",
    'taskForm.endDateBeforeDue': 'Datum završetka ne može biti prije datuma dospijeća.',

    'manualOccurrence.title': 'Dodaj ručnu pojavu',
    'manualOccurrence.cantAdd': 'Nije moguće dodati ručnu pojavu – ovaj se zadatak već ponavlja bez ograničenja',
    'manualOccurrence.add': 'Dodaj ručnu pojavu',
    'manualOccurrence.endDateTooEarly': 'Datum dospijeća ne može biti raniji od datuma završetka izvornog ponavljanja.',

    'manage.title': 'Popis zadataka',
    'manage.selectSeries': 'Odaberite niz slijeva za njegovo uređivanje.',
    'manage.addNewTask': '+ Dodaj novi zadatak',
    'manage.seriesNamePlaceholder': 'Naziv niza',
    'manage.saved': 'Spremljeno',
    'manage.noTasksYet': 'Još nema zadataka.',
    'manage.resetName': 'Vrati naziv na naziv niza',
    'manage.removeFromSeries': 'Ukloni iz niza',

    'editScope.title': 'Uredi ponavljajući zadatak',
    'editScope.desc': 'Ovaj se zadatak ponavlja. Što želite urediti?',
    'editScope.instance': 'Samo ovu pojavu',
    'editScope.following': 'Ovu i sljedeće pojave',
    'editScope.all': 'Sve pojave',

    'patternEdit.titleInPlace': 'Uredi obrazac ponavljanja',
    'patternEdit.titleFollowing': 'Uredi obrazac ponavljanja (ova i sljedeće pojave)',

    'occurrencePanel.editThisOccurrence': 'Uredi ovu pojavu…',
    'occurrencePanel.reschedule': 'Promijeni datum…',
    'occurrencePanel.rescheduleTitle': 'Promjena datuma pojave',
    'occurrencePanel.rescheduleDateLabel': 'Novi datum',
    'occurrencePanel.rescheduleCollision': 'Druga pojava ovog zadatka već je zabilježena na taj datum.',
    'occurrencePanel.blockedRecurUntilCompleted': 'Nije dostupno dok je sljedeća pojava ovog zadatka još na čekanju.',
    'todo.reopenBlockedRecurUntilCompleted': 'Kasnija pojava ovog zadatka od tada je već dovršena, pa se ova više ne može označiti kao nedovršena.',

    'taskStats.title': 'Statistika: {name}',
    'taskStats.totalFocusedAllRecurrences': 'Ukupno vrijeme fokusa (sva ponavljanja)',
    'taskStats.totalFocused': 'Ukupno vrijeme fokusa',
    'taskStats.total': 'Ukupno',
    'taskStats.justFocused': 'Samo fokusirano',
    'taskStats.focusedWithTimer': 'Fokusirano uz mjerač vremena',
    'taskStats.completion': 'Dovršenost',
    'taskStats.completed': 'Dovršeno',
    'taskStats.recurrencesToDate': 'Ponavljanja do danas',
    'taskStats.completionRate': 'Stopa dovršenosti',
    'taskStats.timePerRecurrence': 'Vrijeme po ponavljanju',
    'taskStats.noFocusedTime': 'Još nije zabilježeno vrijeme fokusa.',
    'taskStats.focusedAndTimer': '{focused} fokusirano · {timer} mjerač',

    'settings.title': 'Postavke',
    'settings.nickname': 'Nadimak',
    'settings.nicknamePlaceholder': 'npr. Nikola',
    'settings.timeFormat': 'Format vremena',
    'settings.timeFormat24': '24-satni (npr. 18:00)',
    'settings.timeFormat12': '12-satni (npr. 6:00 PM)',
    'settings.language': 'Jezik',
    'settings.languageEnglish': 'English (engleski)',
    'settings.languageCroatian': 'Hrvatski',
    'settings.theme': 'Tema',
    'settings.themeDark': 'Tamna',
    'settings.themeLight': 'Svijetla',
    'settings.avatar': 'Avatar',
    'settings.uploadImage': 'Učitaj sliku…',
    'settings.background': 'Pozadina',
    'settings.changeBackground': 'Promijeni pozadinu…',
    'settings.subscription': 'Pretplata',
    'settings.subscriptionFree': 'Besplatno',
    'settings.subscriptionTrial': 'Probno razdoblje (do: {date})',
    'settings.subscriptionTrialExpired': 'Probno razdoblje (isteklo: {date})',
    'settings.subscriptionPro': 'Pro (naplata {interval}, sljedeća naplata: {date})',
    'settings.subscriptionProCancelling': 'Pro (naplata {interval}, otkazuje se: {date})',
    'settings.subscriptionProExpired': 'Pro (isteklo: {date})',
    'settings.billingMonthly': 'mjesečno',
    'settings.billingAnnual': 'godišnje',
    'settings.cancelSubscription': 'Otkaži pretplatu',
    'settings.scheduledDeletionNotice': 'Ovaj račun će biti izbrisan po isteku pretplate.',
    'settings.cancelScheduledDeletion': 'Otkaži zakazano brisanje',
    'settings.password': 'Lozinka',
    'settings.changePassword': 'Promijeni lozinku…',
    'settings.data': 'Podaci',
    'settings.downloadData': 'Preuzmi moje podatke…',
    'settings.importData': 'Uvezi podatke…',
    'settings.dangerZone': 'Opasna zona',
    'settings.deleteAccount': 'Izbriši račun…',

    'changePassword.title': 'Promjena lozinke',
    'changePassword.current': 'Trenutna lozinka',
    'changePassword.new': 'Nova lozinka',
    'changePassword.confirm': 'Potvrdi novu lozinku',
    'changePassword.submit': 'Promijeni lozinku',
    'changePassword.tooShort': 'Nova lozinka mora imati najmanje 8 znakova.',
    'changePassword.mismatch': 'Nove lozinke se ne podudaraju.',
    'changePassword.wrongCurrent': 'Trenutna lozinka nije točna.',
    'changePassword.genericError': 'Nismo uspjeli promijeniti vašu lozinku. Pokušajte ponovno za koji trenutak.',
    'changePassword.success': 'Vaša lozinka je promijenjena.',

    'deleteAccount.title': 'Izbriši račun',
    'deleteAccount.warning':
      'Ovime se trajno briše vaš račun te svaki zadatak, bilješka i postavka vezana uz njega – odmah, bez mogućnosti poništenja. Preuzmite kopiju prije brisanja ako je želite zadržati.',
    'deleteAccount.subscriberNotice':
      'Imate aktivnu Pro pretplatu. Trenutačno brisanje znači gubitak preostalog plaćenog razdoblja bez povrata novca, te odmah gubite pristup. Umjesto toga možete zakazati brisanje za trenutak isteka pretplate – pretplata će se odmah otkazati, ali pristup ćete imati do tada.',
    'deleteAccount.confirm': 'Trajno izbriši moj račun',
    'deleteAccount.confirmImmediate': 'Izbriši odmah',
    'deleteAccount.schedule': 'Zakaži brisanje za {date}',

    'subscribe.title': 'Nadogradite na A-To-Do Pro',
    'subscribe.cta': 'Isprobajte besplatno…',
    'subscribe.headerCta': 'Pretplati se',
    'subscribe.maybeLater': 'Možda kasnije',
    'subscribe.benefitTasks': 'Neograničen broj zadataka, ponavljajućih ili ne',
    'subscribe.benefitNotes': 'Neograničen broj bilješki na svakom zadatku',
    'subscribe.benefitAds': 'Bez podsjetnika za pretplatu koji zatrpavaju popis',
    'subscribe.priceHint': 'Nakon toga samo 2 EUR/mjesečno – započnite s besplatnim probnim razdobljem od 14 dana, bez plaćanja sada.',
    'subscribe.reasonCreateLimit': 'Dosegli ste granicu onoga što možemo ponuditi besplatno. Pretplatite se danas i nastavite neograničeno dodavati zadatke na svoj popis obveza!',
    'subscribe.reasonTaskLimit': 'Ovaj zadatak je izvan ograničenja besplatnog plana, pa se ne može završiti ni komentirati.',
    'subscribe.taskName': 'Pretplatite se na A-To-Do',
    'subscribe.taskDescription': 'Samo 2 EUR/mjesečno',
    'subscribe.taskDetails':
      'Otključajte A-To-Do Pro:\n– Neograničen broj zadataka, ponavljajućih ili ne\n– Neograničen broj bilješki na svakom zadatku\n– Bez podsjetnika za pretplatu koji zatrpavaju popis',

    'background.title': 'Promjena pozadine',
    'background.accessKeyLabel': 'Unsplash API ključ',
    'background.accessKeyPlaceholder': 'Zalijepite svoj Unsplash API ključ',
    'background.hint':
      'Pozadine se preuzimaju putem <a href="https://unsplash.com/developers" target="_blank" rel="noopener">Unsplashovog besplatnog razvojnog API-ja</a>. Ondje izradite besplatnu aplikaciju i zalijepite ovdje njezin pristupni ključ — sprema se samo na ovom uređaju, odvojeno od podataka o vašim zadacima.',
    'background.saveKey': 'Spremi ključ',
    'background.searchPlaceholder': 'Pretraži Unsplash, npr. planine, minimalizam, more',
    'background.search': 'Pretraži',
    'background.loading': 'Učitavanje…',
    'background.noResults': 'Nema rezultata.',
    'background.usePhoto': 'Koristi ovu fotografiju – autor {name} na Unsplashu',
    'background.keyRejected': 'Taj Unsplash API ključ je odbijen – provjerite ga i pokušajte ponovno.',
    'background.rateLimited': 'Dosegnuto je ograničenje besplatnog Unsplash plana za ovaj ključ – pokušajte ponovno za koji trenutak.',
    'background.requestFailed': 'Unsplash zahtjev nije uspio ({status}).',
    'background.creditBy': 'Fotografija autora',
    'background.creditOn': 'na',
    'background.creditUnsplashName': 'Unsplashu',

    'data.notJson': 'Ta datoteka nije valjani JSON.',
    'data.notExport': 'Čini se da ta datoteka nije izvoz podataka iz ove aplikacije.',
    'data.importConfirm': 'Uvoz će zamijeniti sve vaše trenutne zadatke i postavke sadržajem ove datoteke. Želite li nastaviti?',
    'data.importLimitedByFreePlan':
      'Ograničenja vašeg besplatnog plana vrijede i za uvoz, pa su neki zadaci i/ili bilješke iz ove datoteke izostavljeni. Pretplatite se za potpuni uvoz.',
    'saveStatus.failed': 'Vaše posljednje promjene još nisu spremljene ({message}). Spremanje se automatski ponavlja -- ne zatvarajte ovu karticu dok ova poruka ne nestane, inače će se promjene izgubiti.',
    'saveStatus.retryNow': 'Pokušaj ponovno',
    'saveStatus.retrying': 'Ponovni pokušaj…',
    'data.importSaveFailed':
      'Zadaci su uvezeni ovdje, ali njihovo spremanje na vaš račun nije uspjelo, pa možda još nisu tamo: {message} Pokušajte ponovno za koji trenutak, a ako se problem nastavi, javite se podršci i priložite datoteku koju ste pokušali uvesti kako bismo to mogli istražiti.',
  },
};

// Falls back to English for any key missing from the current language (lets
// hr stay incomplete without ever showing a raw key or blank string), then
// to the key itself if even English is somehow missing it (should never
// happen in practice -- a visible "raw key" is easier to notice/fix than a
// silent blank). {placeholder} tokens in the string are replaced from
// `vars` -- a plain templating scheme, not full ICU pluralization/gendering,
// which none of these strings need.
function t(key, vars) {
  const str = (I18N[currentUserLanguage] && I18N[currentUserLanguage][key]) || I18N.en[key] || key;
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, name) => (vars[name] != null ? vars[name] : `{${name}}`));
}

// Maps the app's own language codes to a BCP-47 tag for toLocaleDateString/
// toLocaleString calls elsewhere (formatDateTime, describeDayLabel,
// formatMonthLabel) -- lets weekday/month names follow the app's own
// language setting instead of whatever locale the browser happens to be
// configured with.
function currentLocaleTag() {
  return currentUserLanguage === 'hr' ? 'hr-HR' : 'en-US';
}

// Walks every element carrying one of these data-i18n* attributes and sets
// the corresponding property from the current language -- covers all the
// static chrome across every modal (only ever set once from the HTML
// otherwise), including ones currently hidden, which is harmless. Dynamic
// content built in JS (modal titles, list rows, ...) isn't marked up this
// way -- those call t() directly at the point they're rendered instead, so
// they're always current without needing a translation pass of their own.
function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
  });
  document.documentElement.lang = currentUserLanguage;
  updateOutboundLegalLinks();
}

// The reverse of site-i18n.js's own a.js-login-link handling: every link
// out of the app into the separately-i18n'd marketing/legal flow (the
// avatar menu's Privacy Policy/Terms of Service, the same two below the
// login/register form, and the header's Subscribe button) gets `?lang=`
// set to the app's own current language, so the destination page opens
// already matching it instead of falling back to its own stored
// preference/IP guess (see resolveInitialSiteLanguage there).
function updateOutboundLegalLinks() {
  document.querySelectorAll('a.js-legal-link, #app-header-subscribe-btn').forEach((el) => {
    const url = new URL(el.getAttribute('href'), location.href);
    url.searchParams.set('lang', currentUserLanguage);
    el.setAttribute('href', url.pathname + '?' + url.searchParams.toString() + url.hash);
  });
}

// task.log ({ message, timestamp, occurrenceDate }[]) is the side panel's
// short activity history for whole-task/pattern-level events -- lazily
// created, not present on every task from the start. Recorded per task
// record (not per
// taskId/seriesId); the side panel merges every record's log together when
// it displays "this task" or "this series" (see aggregateSidePanelRecords).
// occurrenceDate is which occurrence the action was actually about (omit it
// for an action on the task/series as a whole, e.g. a plain edit) --
// recorded explicitly rather than left for buildSidePanelLogRow to infer
// from the record's own task.dueDate, since a record's dueDate is its own
// *base* due date (a whole recurring series' anchor, or -- after a split
// edit/delete -- the split's continuation point), which often isn't the
// occurrence the entry is actually about.
function logTaskEvent(task, message, occurrenceDate) {
  if (!task.log) task.log = [];
  task.log.push({ message, timestamp: Date.now(), occurrenceDate: occurrenceDate || null });
}

// The occurrence-scoped counterpart to logTaskEvent above -- for an event
// that's genuinely ABOUT one specific occurrence (marked done/failed, timer
// set/cancelled/elapsed, focused/unfocused), not just tagged with one for
// context on an otherwise task/pattern-level event (a whole-task edit, a
// series split). Lives on Occurrence.log instead of Task.log; no
// occurrenceDate field of its own needed there -- which occurrence it's
// about is already implied by the row it's attached to.
function logOccurrenceEvent(task, occurrenceDate, message) {
  ensureOccurrence(task, occurrenceDate).log.push({ message, timestamp: Date.now() });
}

// Focusing an occurrence and then unfocusing it again (or vice versa)
// within this window is treated as a misclick rather than a real change --
// neither toggle ends up in the log.
const FOCUS_TOGGLE_LOG_WINDOW_MS = 10 * 1000;

// Checking off the focused occurrence also unfocuses it, synchronously
// within the very same click (renderTodo's "no longer eligible" check, via
// setActiveTaskId) -- one user action, so it's logged as one combined entry
// instead of two separate ones. No 'Marked failed' counterpart: that's only
// ever a passive task's action, and a passive task can't be focused at all
// (see canWorkOnNow in buildTodoItemRow).
const RESOLVE_WITH_UNFOCUS_MESSAGES = {
  'Marked done': 'Unfocused and marked done',
};
const RESOLVE_WITH_UNFOCUS_WINDOW_MS = 1000;

// logOccurrenceEvent for 'Focused'/'Unfocused' -- drops the opposite entry
// instead of logging this one when it's the occurrence's very last entry
// and recent enough (see FOCUS_TOGGLE_LOG_WINDOW_MS). The time actually
// spent focused is still credited (focusedSeconds/timerSeconds), only the
// log entries go. An 'Unfocused' that's really just the side effect of the
// occurrence having been resolved a moment ago is folded into that entry
// instead (see RESOLVE_WITH_UNFOCUS_MESSAGES).
function logFocusToggle(task, occurrenceDate, message, oppositeMessage) {
  const log = ensureOccurrence(task, occurrenceDate).log;
  const last = log[log.length - 1];
  if (last && last.message === oppositeMessage && Date.now() - last.timestamp < FOCUS_TOGGLE_LOG_WINDOW_MS) {
    log.pop();
    return;
  }
  const combined = message === 'Unfocused' && last && RESOLVE_WITH_UNFOCUS_MESSAGES[last.message];
  if (combined && Date.now() - last.timestamp < RESOLVE_WITH_UNFOCUS_WINDOW_MS) {
    last.message = combined;
    return;
  }
  logOccurrenceEvent(task, occurrenceDate, message);
}

// Undoing a resolution (marking an occurrence not done/not failed) straight
// back after making it, with no other action on it in between, takes back
// its log entry instead of adding an opposite one -- returns whether it
// did. A plain 'Marked done'/'Marked failed' entry is simply removed; a
// combined 'Unfocused and marked ...' one (see RESOLVE_WITH_UNFOCUS_MESSAGES)
// is turned back into a plain 'Unfocused', since that part of it did happen
// and isn't undone. A note added to the occurrence, or a task-level entry
// tagged with it, since then counts as an action in between.
function takeBackResolutionLogEntry(task, occurrence, resolvedMessage) {
  const log = occurrence.log;
  const last = log[log.length - 1];
  const combined = RESOLVE_WITH_UNFOCUS_MESSAGES[resolvedMessage];
  if (!last || (last.message !== resolvedMessage && last.message !== combined)) return false;
  if ((occurrence.comments || []).some((c) => c.timestamp >= last.timestamp)) return false;
  const taskLevelSince = tasks.some(
    (t) => t.taskId === task.taskId && (t.log || []).some((e) => e.occurrenceDate === occurrence.occurrenceDate && e.timestamp >= last.timestamp)
  );
  if (taskLevelSince) return false;
  if (last.message === combined) last.message = 'Unfocused';
  else log.pop();
  return true;
}

// task.comments ({ text, timestamp }[]) -- general notes about the task as a
// whole (side panel scoped to 'task'/'series'), same lazy/per-record storage
// as task.log above. See addOccurrenceComment for the per-occurrence
// counterpart ('occurrence' scope).
function addTaskComment(task, text) {
  if (!task.comments) task.comments = [];
  task.comments.push({ text, timestamp: Date.now() });
}

function addOccurrenceComment(task, occurrenceDate, text) {
  ensureOccurrence(task, occurrenceDate).comments.push({ text, timestamp: Date.now() });
}

// getSeriesName falls back to the earliest member's own name when no member
// has an explicit seriesName yet (see getSeriesName) -- purely a
// display-time default. Without this, renaming a member here would make the
// mixed-series label/editor appear to rename itself. Freeze the current
// (pre-rename) display name as the real seriesName the first time a rename
// would otherwise change it, so it only changes again via the series
// editor's own "Save". Shared by every general-info edit path (openTaskForm,
// openTaskGeneralInfoForm) -- called with the OLD task record and the NEW
// (about-to-be-applied) name, before the actual rename happens.
function freezeMixedSeriesNameIfRenaming(task, newName) {
  if (newName === task.name || !isMixedSeries(task.seriesId)) return;
  const members = tasksInSeries(task.seriesId);
  if (!members.some((t) => t.seriesName)) {
    const frozenName = getSeriesName(task.seriesId);
    for (const t of members) t.seriesName = frozenName;
  }
}

// Mutates `task`'s general/display fields in place -- name/description/
// details/dueTime/allDay/appointment/passive, exactly the same whitelist
// Occurrence.applyOverrides and applySplitEdit's 'instance' scope use (see
// occurrence.js). Safe to apply in place regardless of a task's recorded
// history: these fields are never schedule-determining, so changing them
// can't retroactively alter which dates a task occurs on -- unlike
// applyPatternInPlace below, this never needs to fork the series.
function applyGeneralInfoInPlace(task, { name, description, details, dueTime, allDay, appointment, passive }) {
  task.name = name;
  task.description = description;
  task.details = details;
  task.dueTime = dueTime;
  task.allDay = allDay;
  task.appointment = appointment;
  task.passive = passive;
  logTaskEvent(task, 'Edited');
}

// Mutates `task`'s recurrence-pattern fields in place -- dueDate/frequency/
// endDate/recurUntilCompleted. Only ever safe to call when there's no
// history to protect (a brand-new task, or a recurUntilCompleted task, whose
// live due date is governed entirely by its current pending Occurrence's own
// pendingReschedules chain, never by these fields directly -- see
// editTaskPattern's own dispatch for why forking is actually the unsafe
// option there). Editing a plain recurring task's pattern with existing
// history must go through forkTaskFragment instead, never this.
//
// logMessage defaults to a standalone pattern-edit entry, but openTaskForm's
// existing-task branch (editing a 'once' task, where this always runs right
// alongside applyGeneralInfoInPlace as one user action) passes null to skip
// it -- that path's own single 'Edited' entry already covers it, and a
// separate "Recurrence pattern edited" entry every time would be redundant.
function applyPatternInPlace(task, { dueDate, frequency, endDate, recurUntilCompleted }, logMessage = 'Recurrence pattern edited') {
  // Only when this edit is what actually turns recurUntilCompleted on (it
  // was off before, or this is the first time it's ever been set) -- see
  // firstRecurUntilCompletedDueDate's own comment for why an
  // already-recurUntilCompleted task must NOT get this: its dueDate by then
  // represents wherever its own reschedule chain has gotten to, not the
  // original pattern, so re-snapping it here would silently discard that
  // progress.
  const startingRecurUntilCompleted = recurUntilCompleted && !task.recurUntilCompleted;
  // Only when turning the flag off -- otherwise editing anything else about
  // a task mid-chain would silently discard however far its current
  // reschedule chain has already gotten. Preserves wherever the chain
  // actually is (not the stale original dueDate) as the new plain anchor
  // once it stops being recurUntilCompleted; the now orphaned Occurrence row
  // itself is harmless leftover data -- an ordinary task only ever looks
  // occurrences up by their real pattern-predicted date, so a row that
  // doesn't happen to land on one is simply never found again.
  const stoppingRecurUntilCompleted = !recurUntilCompleted && task.recurUntilCompleted;
  const currentOccurrence = stoppingRecurUntilCompleted ? findOccurrence(task, null) : null;
  task.dueDate = currentOccurrence
    ? Occurrence.effectiveDueDate(currentOccurrence)
    : startingRecurUntilCompleted
      ? Recurrence.firstRecurUntilCompletedDueDate({ dueDate, frequency, endDate }) || dueDate
      : dueDate;
  task.recurUntilCompleted = recurUntilCompleted;
  task.frequency = frequency;
  task.endDate = endDate;
  if (logMessage) logTaskEvent(task, logMessage);
  // Seeds the first live Occurrence for a task newly becoming
  // recurUntilCompleted -- an already-recurUntilCompleted task already has
  // one (wherever its chain currently is), which stays exactly as valid
  // under whatever else this edit just changed.
  if (startingRecurUntilCompleted) ensureOccurrence(task, task.dueDate);
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

// Drives one hour/minute segment of the time field below (field.type ===
// 'time'): a plain text box restricted to digits, with the same two-stage
// "type a digit, maybe wait for a second one, then auto-advance" behavior
// native date/time pickers use. `firstDigitRule(d)` classifies the first
// digit typed into a segment -- { complete: true } if `d` alone is already
// the whole segment (advance immediately), or { complete: false,
// allowedSecond } to wait for a second digit (allowedSecond: null means any
// digit 0-9 is valid next, otherwise the explicit set of digits that keep
// the combined two-digit value in range -- anything else is ignored,
// leaving focus on this segment). `onAdvance()` runs once a full value has
// been committed to `input.value` (zero-padded), so the caller decides
// where focus goes next (the next segment, or nowhere for the last one).
// normalizeValue: applied to a just-committed two-digit value before display
// -- used by the 12-hour hour segment (see below) since "00" isn't a real
// 12-hour hour (0 means the 12 o'clock hour, displayed as "12").
function attachTimeSegmentInput(input, firstDigitRule, onAdvance, normalizeValue = (v) => v) {
  let buffer = '';
  const commit = (value) => {
    input.value = String(normalizeValue(value)).padStart(2, '0');
    buffer = '';
    onAdvance();
  };
  // A fresh focus (click or Tab) always starts a new entry -- the field's
  // existing value gets fully selected by sharedInputBehavior.js, so the
  // next digit typed should replace it rather than resume some stale buffer.
  input.addEventListener('focus', () => {
    buffer = '';
  });
  input.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      buffer = '';
      input.value = '';
      return;
    }
    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      const digit = parseInt(e.key, 10);
      if (buffer === '') {
        const rule = firstDigitRule(digit);
        if (rule.complete) commit(digit);
        else {
          buffer = String(digit);
          input.value = buffer;
        }
        return;
      }
      const rule = firstDigitRule(parseInt(buffer, 10));
      if (rule.allowedSecond && !rule.allowedSecond.includes(digit)) return;
      commit(parseInt(buffer, 10) * 10 + digit);
      return;
    }
    const navigationKeys = ['Tab', 'Shift', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!navigationKeys.includes(e.key)) e.preventDefault();
  });
  // Pasting arbitrary text would bypass the digit-by-digit rules above.
  input.addEventListener('paste', (e) => e.preventDefault());
}

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
    modalOk.textContent = opts.okLabel || t('common.ok');
    modalCancel.textContent = opts.cancelLabel || t('common.cancel');

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
          deleteBtn.textContent = t('common.clickAgainToDelete');
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
    // Reactive plain-text pieces within an inline group (e.g. the "st/nd/rd/
    // th occurrence" ordinal suffix next to the "which occurrence" number
    // input) -- see field.type === 'static' below. Not a fieldGetters entry:
    // no name/value, just text that's recomputed from the live form values
    // and a host that can be shown/hidden like any other grouped item.
    const staticEls = [];
    // wrap -> every item host created within that group, so a group whose
    // items are ALL individually hidden by their own showIf (e.g. every
    // multi-weekday-only item, when monthlyMode is 'day') can also collapse
    // its shared row -- see the groupWraps pass in updateVisibility. A group
    // with no per-item showIf at all (e.g. the plain "Repeats every" row)
    // never has all its hosts hidden, so it's always left visible, same as
    // before this existed.
    const groupWraps = new Map();
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
      if (isGroup) groupWraps.set(wrap, []);

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
          // Pulls this item closer to the one before it than the row's
          // normal .modal-field-inline gap (e.g. the ordinal suffix hugging
          // its number input instead of sitting a full gap away from it).
          if (field.tightGap) host.classList.add('modal-field-inline-item-tight');
          wrap.appendChild(host);
        }
        if (groupWraps.has(wrap)) groupWraps.get(wrap).push(host);

        if (field.type === 'static') {
          // A non-interactive text fragment inside an inline group (e.g. the
          // word "occurrence", or a suffix computed from another field's
          // current value) -- see field.text below and its recomputation in
          // updateVisibility. Skips the fieldGetters bookkeeping entirely:
          // there's no value to collect on submit.
          const span = document.createElement('span');
          span.className = 'modal-static-text';
          host.appendChild(span);
          staticEls.push({ el: span, text: field.text, host, showIf: field.showIf });
          continue;
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
          // gridColumns lays the options out horizontally in a wrapping grid
          // (e.g. Mon-Sun across 4 columns -> two rows) instead of the
          // default scrollable vertical list -- see .modal-checkboxes-grid.
          box.className = 'modal-checkboxes' + (field.gridColumns ? ' modal-checkboxes-grid' : '');
          if (field.gridColumns) box.style.setProperty('--modal-checkboxes-columns', field.gridColumns);
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
        } else if (field.type === 'time') {
          // Not a native <input type="time">: Chromium picks that control's
          // AM/PM-vs-24-hour display from the browser's own UI language,
          // ignoring both the page's `lang` attribute and navigator.language
          // -- there is no way from page JS to make it follow
          // currentUserTimeFormat. So the hour/minute (and, in 12-hour mode,
          // AM/PM) are built as plain inputs here instead, always stored
          // externally as a 24-hour "HH:MM" string (see field.value below).
          const [vh, vm] = (field.value || '00:00').split(':').map((n) => parseInt(n, 10));
          const is12Hour = currentUserTimeFormat === '12';

          const container = document.createElement('div');
          container.className = 'modal-time-input';

          const hourInput = document.createElement('input');
          hourInput.type = 'text';
          hourInput.inputMode = 'numeric';
          hourInput.className = 'modal-input modal-time-part';
          hourInput.value = String(is12Hour ? vh % 12 || 12 : vh).padStart(2, '0');

          const sep = document.createElement('span');
          sep.className = 'modal-time-sep';
          sep.textContent = ':';

          const minuteInput = document.createElement('input');
          minuteInput.type = 'text';
          minuteInput.inputMode = 'numeric';
          minuteInput.className = 'modal-input modal-time-part';
          minuteInput.value = String(vm).padStart(2, '0');

          container.appendChild(hourInput);
          container.appendChild(sep);
          container.appendChild(minuteInput);

          let ampmSelect = null;
          if (is12Hour) {
            ampmSelect = document.createElement('select');
            ampmSelect.className = 'modal-input modal-time-ampm';
            for (const period of ['AM', 'PM']) {
              const option = document.createElement('option');
              option.value = period;
              option.textContent = period;
              ampmSelect.appendChild(option);
            }
            ampmSelect.value = vh < 12 ? 'AM' : 'PM';
            // A native <select>'s arrow keys clamp at the first/last option
            // instead of wrapping -- with only two options (AM/PM) that
            // makes one direction dead at each end, so wrap manually.
            // Leaves every other key (e.g. typing "a"/"p" to jump straight
            // to AM/PM) on the browser's own default handling.
            ampmSelect.addEventListener('keydown', (e) => {
              if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
              e.preventDefault();
              const count = ampmSelect.options.length;
              const delta = e.key === 'ArrowDown' ? 1 : -1;
              ampmSelect.selectedIndex = (ampmSelect.selectedIndex + delta + count) % count;
            });
            container.appendChild(ampmSelect);
          }

          // Hour: a first digit above the valid tens digit (>1 in 12-hour,
          // >2 in 24-hour) is already a complete single-digit hour, so
          // advance right away; 12-hour's leading "1" only admits a second
          // digit of 0-2 (10/11/12), 24-hour's leading "2" only admits 0-3
          // (20-23), and a leading 0 (either format) or 1 (24-hour) admits
          // any second digit.
          attachTimeSegmentInput(
            hourInput,
            (d) => {
              if (is12Hour) {
                if (d > 1) return { complete: true };
                return { complete: false, allowedSecond: d === 1 ? [0, 1, 2] : null };
              }
              if (d > 2) return { complete: true };
              return { complete: false, allowedSecond: d === 2 ? [0, 1, 2, 3] : null };
            },
            () => minuteInput.focus(),
            is12Hour ? (v) => v || 12 : undefined
          );
          // Minute: same two-stage idea (0-5 as a leading digit admits any
          // second digit for 00-59; above 5 is already a complete
          // single-digit minute) -- but landing spot after a complete value
          // differs: 24-hour has nowhere else to go, 12-hour advances to
          // AM/PM.
          attachTimeSegmentInput(
            minuteInput,
            (d) => (d > 5 ? { complete: true } : { complete: false, allowedSecond: null }),
            () => {
              if (ampmSelect) ampmSelect.focus();
            }
          );

          host.appendChild(container);
          interactiveEls.push(hourInput, minuteInput);
          if (ampmSelect) interactiveEls.push(ampmSelect);
          fieldEls = ampmSelect ? [hourInput, minuteInput, ampmSelect] : [hourInput, minuteInput];
          getValue = () => {
            let h = parseInt(hourInput.value, 10);
            const m = parseInt(minuteInput.value, 10);
            if (Number.isNaN(h) || Number.isNaN(m)) return '';
            if (is12Hour) {
              h = h % 12;
              if (ampmSelect.value === 'PM') h += 12;
            }
            h = Math.min(23, Math.max(0, h));
            const mm = Math.min(59, Math.max(0, m));
            return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
          };
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
          // showIf hides `hideTarget` -- the field's own host within a group,
          // so one item in an inline row (e.g. "3 days before/after") can be
          // hidden without hiding the whole shared row. Outside a group,
          // host === wrap, so this is the same as hiding the whole field, as
          // before. disableIf always targets just the individual host (dim
          // one control, not the row it shares with others).
          hideTarget: host,
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
      if (!fieldGetters.some((f) => f.showIf || f.disableIf) && staticEls.length === 0) return; // no conditional/reactive fields, skip the work
      const values = currentValues();
      for (const f of fieldGetters) {
        if (f.showIf) f.hideTarget.classList.toggle('modal-field-hidden', !f.showIf(values));
        if (f.disableIf) {
          const disabled = f.disableIf(values);
          f.disableTarget.classList.toggle('modal-field-disabled', disabled);
          f.els.forEach((el) => (el.disabled = disabled));
        }
      }
      for (const s of staticEls) {
        if (s.text) s.el.textContent = s.text(values);
        if (s.showIf) s.host.classList.toggle('modal-field-hidden', !s.showIf(values));
      }
      // A group's own row collapses once every item in it is individually
      // hidden (e.g. all of a multi-weekday-only row's items, when
      // monthlyMode is 'day') -- otherwise it'd linger as an empty flex row.
      for (const [wrap, hosts] of groupWraps) {
        wrap.classList.toggle('modal-field-hidden', hosts.every((host) => host.classList.contains('modal-field-hidden')));
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
        const visible = !f.hideTarget.classList.contains('modal-field-hidden');
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

// window.alert()'s replacement, the same way showFormModal above replaces
// window.prompt() -- a one-button, message-only modal for a notice the user
// just needs to acknowledge (a validation failure, an import that dropped
// some tasks, a password change succeeding, ...), not answer. Deliberately
// NOT a Promise like showFormModal: every call site so far just shows the
// notice and moves on (or already returned before calling this), none of
// them need to know when/whether the user dismissed it. kind matches
// showAuthMessage's own convention ('error'/'success' style .modal-message
// tints, see style.css) -- defaults to 'error' since that's what most of
// these notices are.
const infoModalOverlay = document.getElementById('info-overlay');
const infoModalMessageEl = document.getElementById('info-modal-message');

function showInfoModal(message, kind = 'error') {
  infoModalMessageEl.textContent = message;
  infoModalMessageEl.className = `modal-message ${kind}`;
  infoModalOverlay.classList.remove('hidden');
}
function closeInfoModal() {
  infoModalOverlay.classList.add('hidden');
}
document.getElementById('info-modal-ok').onclick = closeInfoModal;

// ---------------------------------------------------------------------------
// Auth -- registerUser()/login()/getMe() are thin wrappers around
// api-spec.yaml's /auth endpoints (see auth.js's apiFetch/codeError).
// Password hashing, verification email delivery, and the 12-month-
// inactivity/scheduled-deletion checks all happen server-side now -- none
// of that lives in this file anymore, unlike the localStorage-only mock
// this app started as.
// ---------------------------------------------------------------------------

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /auth/register -- throws codeError('INVALID_EMAIL' | 'EMAIL_TAKEN')
// for the form to translate and show. isValidEmail is still checked
// client-side first, purely to skip a pointless round trip for an
// obviously malformed address -- the server re-validates regardless (see
// api-spec.yaml) and is the real authority either way.
async function registerUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) throw codeError('INVALID_EMAIL');
  await apiFetch('/auth/register', { method: 'POST', body: { email: normalizedEmail, password } });
}

// POST /auth/verify-email -- resolves a verification link's token. Returns
// { ok: true, email } or { ok: false, code } rather than throwing, since
// handleEmailVerificationLink (below) shows a specific message for an
// already-used/expired link rather than treating it as an unexpected error.
async function verifyEmailToken(token) {
  try {
    const { email } = await apiFetch('/auth/verify-email', { method: 'POST', body: { token } });
    return { ok: true, email };
  } catch (err) {
    return { ok: false, code: err.code };
  }
}

// ---------------------------------------------------------------------------
// User profile -- nickname/avatar/timeFormat/background/language/theme,
// fetched as part of GET /auth/me's User (see getMe below) and written back
// via PATCH /users/me (see saveUserProfile). Held in memory only
// (currentUser* below), not re-fetched on every use -- every write site
// builds its PATCH body from currentUserProfileSnapshot so none of them can
// accidentally drop a field a *different* write site owns.
// ---------------------------------------------------------------------------

// Only actually used to backfill a field an *imported* data export might
// predate (see the Settings import handler below) -- a fresh GET /auth/me
// response is trusted to always include every field, so nothing else needs
// this as a fallback anymore.
// language: null means "never chosen or auto-detected yet" -- see
// detectLanguageAndTimeFormatFromLocation below, which only ever runs once
// (while this is still null) and then PATCHes a real 'en'/'hr' over it, so
// a user's own choice in Settings (or a failed detection falling back to
// 'en') always sticks instead of being silently re-detected on every load.
// theme has no such detection step -- 'dark' is just a real, always-valid
// default (see applyTheme/currentUserTheme below).
const DEFAULT_USER_PROFILE = { nickname: '', avatar: null, timeFormat: '24', background: null, language: null, theme: 'dark' };

// PATCH /users/me -- fire-and-forget from the caller's perspective, same as
// saveTasks below: nothing here awaits the request finishing, and a failure
// is just logged rather than surfaced. An acceptable gap for now (the next
// save attempt will just try again with whatever's current by then), not a
// data-loss risk the way losing a task edit would be.
function saveUserProfile(profile) {
  apiFetch('/users/me', { method: 'PATCH', body: profile }).catch((err) => {
    console.error('Failed to save profile:', err);
  });
}

// POST /auth/login -- throws codeError('INVALID_CREDENTIALS' |
// 'EMAIL_NOT_VERIFIED' | 'ACCOUNT_EXPIRED_INACTIVITY' |
// 'ACCOUNT_DELETED_SCHEDULED') for the form to translate and show (see
// describeAuthError below) -- the last two are this app's data-retention
// policy (see the Privacy Policy) actually taking effect, deleting the
// account server-side as part of handling this request. The caller still
// calls getMe(token) right after (see the login form's submit handler
// below) rather than trusting this response's own `user` for anything but
// the fresh token -- keeps this and boot()'s existing-token path resolving
// "is this session still good" through the one shared codepath.
async function login(email, password) {
  return apiFetch('/auth/login', { method: 'POST', body: { email, password } });
}

// GET /auth/me -- the one place a token actually gets resolved into a live
// session, called both by boot()'s existing-token path and right after a
// fresh login() (see both below). `token` is passed explicitly rather than
// left for apiFetch to read from localStorage, since the login form's own
// call happens with a token that hasn't been stored anywhere yet. Throws
// the same codes login() can -- resuming a stored token is just as much
// "using the account" as a fresh login, so the same policies apply here
// too (see api-spec.yaml). Every caller must treat any of them as "not
// logged in", not silently proceed with whatever's left in local state.
async function getMe(token) {
  return apiFetch('/auth/me', { token });
}

// Shared by boot()'s and the login form's own catch blocks below --
// ACCOUNT_NOT_FOUND has no specific copy of its own (rare enough in
// practice, see getMe's comment, that "wrong email or password"/a plain
// return to the login screen is an acceptable generic fallback). Also
// covers NETWORK_ERROR (see apiFetch in auth.js) -- the one failure mode
// that's new now that this actually talks to a server.
function describeAuthError(err) {
  if (err.code === 'EMAIL_NOT_VERIFIED') return t('login.notVerified');
  if (err.code === 'ACCOUNT_EXPIRED_INACTIVITY') return t('login.accountExpired');
  if (err.code === 'ACCOUNT_DELETED_SCHEDULED') return t('login.accountDeletedScheduled');
  if (err.code === 'NETWORK_ERROR') return t('login.networkError');
  return t('login.invalidCredentials');
}

// Set once boot()/the login form resolves a user (see applyUserSession).
// Not passed explicitly to loadTasks/saveTasks/apiFetch -- every request
// is scoped server-side by the bearer token in localStorage instead (see
// auth.js's apiFetch), so this is read-only bookkeeping for the UI (e.g.
// collectUserDataExport), not something request bodies need to carry.
let currentUserId = null;
// Kept in sync with the saved profile by the Settings modal's Save button,
// not re-read from storage on every render -- see renderAppTitle/
// renderUserAvatar (nickname/avatar) and formatTimeOfDay/formatDateTime
// (timeFormat), the only things that read these.
let currentUserNickname = null;
let currentUserAvatar = null; // data URL, or null for the initials fallback
let currentUserTimeFormat = '24'; // '12' | '24' -- see formatTimeOfDay/formatDateTime
let currentUserBackground = null; // same shape as the profile's background field, or null -- see applyBackground
let currentUserLanguage = 'en'; // 'en' | 'hr' -- see the i18n section up top (t()/currentLocaleTag())
let currentUserTheme = 'dark'; // 'dark' | 'light' -- see applyTheme below
// Same shape as getMe()'s subscription field (null | { id, plan, ... }) --
// see describeSubscription/isSubscriptionActive. Refreshed after boot()/
// login resolve a token and again after subscribeCurrentUserToTrial() mints
// a fresh one, same as the profile fields above.
let currentUserSubscription = null;

// Applies a (possibly new) language everywhere it matters -- called on
// startup and whenever Settings' Save button changes it. No page reload
// needed: every dynamic string call t() fresh at render time (see the i18n
// section up top), so re-running the renders below is enough to pick up the
// change immediately, the same as any other Settings field.
function applyLanguage(language) {
  currentUserLanguage = language;
  ensureSubscriptionPromptTask(); // refreshes the nag task's own text into the new language, see its own comment
  applyStaticTranslations();
  renderAppTitle();
  renderTodo();
  renderSidePanel();
  refreshTodoManageModal();
}

// Applies a (possibly new) theme -- called on startup (startApp) and
// whenever Settings' Save button changes it. Purely a CSS hook (see
// style.css's `html[data-theme="light"]` rules): setting/clearing the
// `data-theme` attribute is all that's needed, no re-render, since nothing
// in the DOM's structure or text depends on theme, only its paint.
function applyTheme(theme) {
  currentUserTheme = theme;
  if (theme === 'light') {
    document.documentElement.dataset.theme = 'light';
  } else {
    delete document.documentElement.dataset.theme;
  }
}

// Free, keyless IP geolocation (no account/API key to configure, unlike
// Unsplash) -- runs at most once per profile, the first time it's ever
// loaded (see DEFAULT_USER_PROFILE.language), to guess a sensible starting
// language + time format instead of always defaulting to English/24-hour
// regardless of where the user actually is. Never overrides an explicit
// choice: both are saved as real (non-null) values right after this runs,
// successfully or not, so it's a one-time first-run guess, never a
// recurring override of the user's own Settings.
const IP_GEOLOCATION_API = 'https://ipwho.is/';

// Countries where a 12-hour clock (with AM/PM) is the everyday convention,
// as opposed to the 24-hour clock most of the world (including Croatia)
// uses -- necessarily a rough, incomplete list (this isn't strictly a
// national standard anywhere), just enough to get a sensible default rather
// than none at all. The user can always override it in Settings regardless.
const TWELVE_HOUR_CLOCK_COUNTRIES = new Set(['US', 'CA', 'AU', 'NZ', 'PH', 'IN', 'EG', 'SA', 'CO', 'PK']);

async function detectLanguageAndTimeFormatFromLocation() {
  let countryCode = null;
  try {
    const res = await fetch(IP_GEOLOCATION_API);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false && data.country_code) countryCode = data.country_code;
    }
  } catch {
    // Offline, blocked, or the service is down -- fall through to the
    // English/24-hour default below rather than leaving language null
    // forever (which would just retry, silently, on every future load).
  }
  return {
    language: countryCode === 'HR' ? 'hr' : 'en',
    timeFormat: countryCode && TWELVE_HOUR_CLOCK_COUNTRIES.has(countryCode) ? '12' : '24',
  };
}

// Language for the login/register screens themselves, i.e. before there's
// any account to read a saved language from (see boot() below) -- separate
// from AUTH_TOKEN_KEY (auth.js) and from a logged-in profile's own
// `language` field. Same idea as site-i18n.js's SITE_LANG_STORAGE_KEY for
// the marketing flow, kept as its own key since the two flows' languages
// are otherwise entirely independent (see that file's own comment).
const PRE_LOGIN_LANG_STORAGE_KEY = 'advanced-todo-pre-login-language';

// Applies `lang` to the (not yet logged in) login/register screens and
// remembers it for next time -- used both by boot()'s own detection below
// and by the EN/HR toggle on those screens. Deliberately not applyLanguage()
// (app.js's post-login equivalent): that one also re-renders the to-do list/
// side panel/manage-tasks modal, none of which exist yet at this point.
function applyPreLoginLanguage(lang) {
  currentUserLanguage = lang;
  applyStaticTranslations();
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem(PRE_LOGIN_LANG_STORAGE_KEY, lang);
}

// Builds the full profile object saveUserProfile expects (it always
// overwrites the stored blob wholesale, no partial-patch merge) from
// whatever's currently in memory -- every write site below (Settings' Save
// button, picking/removing a background) goes through this so none of them
// can accidentally drop a field a *different* write site owns.
function currentUserProfileSnapshot() {
  return {
    nickname: currentUserNickname,
    avatar: currentUserAvatar,
    timeFormat: currentUserTimeFormat,
    background: currentUserBackground,
    language: currentUserLanguage,
    theme: currentUserTheme,
  };
}

// ---------------------------------------------------------------------------
// To-do list.
// ---------------------------------------------------------------------------

// Backward compatibility: tasks saved before seriesId/taskId existed each get
// their own fresh one -- they were never part of a split, so there's no
// correct value to backfill beyond "distinct from everything else". Shared
// by loadTasks and importUserData, since an imported backup can be just as
// old as whatever's already on the server.
//
// Tasks saved before createdAt existed (see the free-tier task/note limits
// below) get their array index instead -- small integers that always sort
// before any real Date.now() timestamp, so pre-existing tasks are treated as
// the very earliest ones ever created (and so never unexpectedly frozen out
// by a limit that postdates them) while still sorting stably relative to
// each other.
function normalizeLoadedTasks(loadedTasks) {
  loadedTasks.forEach((task, index) => {
    if (!task.seriesId) task.seriesId = uid();
    if (!task.taskId) task.taskId = uid();
    if (!task.createdAt) task.createdAt = index;
  });
  return loadedTasks;
}

// GET /tasks -- the current account's entire task list and occurrence
// history, scoped server-side by the bearer token (see api-spec.yaml), not
// by anything passed here. Awaited exactly once, inside startApp(), before
// the first render.
async function loadTasks() {
  const data = await apiFetch('/tasks');
  return { tasks: normalizeLoadedTasks(data.tasks), occurrences: data.occurrences || [] };
}

// Populated once startApp() runs (after boot()/login resolves a user), not
// at script-load time -- there's nothing to load until then.
let tasks = [];
// One row per *interacted-with* occurrence -- see occurrence.js's own
// top-of-file comment for the data model this and `tasks` together make up.
// findOccurrence/ensureOccurrence below are the one chokepoint every
// mutation goes through, so an occurrence's state can never bleed into a
// different one's the way it could when it lived in a shared per-task map.
let occurrences = [];

// Resolves which Occurrence row a click on (task, occurrenceDate) actually
// refers to. For an ordinary task this is an exact (taskId, occurrenceDate)
// match, the same key the row was created under.
//
// For a recurUntilCompleted task an exact match is tried FIRST too -- this
// is what lets code re-derive "the same occurrence" by its own date even
// after changing its status (e.g. logging an event right after marking it
// done, or flushing its timer): looking it up by status alone would
// otherwise stop finding it the instant it stops being 'pending', minting a
// second stray row at the same date and violating the (taskId,
// occurrenceDate) uniqueness this whole model depends on. Only once no
// exact row exists does this fall back to chain membership -- the clicked
// date might be one of the current pending occurrence's own
// pendingReschedules entries rather than its own occurrenceDate (see
// occurrence.js's own comment on the field). The live pending chain is
// checked first; failing that, a resolved occurrence whose (now frozen)
// chain covers the date is still that same occurrence -- e.g. one checked
// off from a carried-over date, whose 'Marked done' entry and the
// automatic unfocus right after are both logged against that date AFTER its
// status has already changed. Without this, both would mint a stray new
// 'pending' row there instead. Chains only ever move forward, so no two
// occurrences' chains within one fragment overlap.
// occurrenceDate == null means "just the current pending one, whichever
// date it's at" (see occurrenceScanShape and friends) -- skips the exact
// match entirely, since there's no date to match.
//
// The pending lookup only considers rows belonging to this fragment (see
// Occurrence.occurrenceBelongsToFragment) -- a taskId whose history predates
// its recurUntilCompleted fragment can still carry a stale plain-task
// 'pending' row from back then, which must never be mistaken for the live
// chain. If several still qualify, the latest-starting one wins: a stale
// row always predates the live chain, and once mistaken for it would get
// advanced (advanceRecurUntilCompletedTasks) right into this fragment's own
// range, qualifying by effectiveDueDate from then on.
function findOccurrence(task, occurrenceDate) {
  if (!task.recurUntilCompleted) return Occurrence.findOccurrence(occurrences, task.taskId, occurrenceDate);
  let pending = null;
  for (const o of occurrences) {
    if (o.taskId !== task.taskId || o.status !== 'pending' || !Occurrence.occurrenceBelongsToFragment(task, o)) continue;
    if (!pending || o.occurrenceDate > pending.occurrenceDate) pending = o;
  }
  if (occurrenceDate == null) return pending;
  const exact = Occurrence.findOccurrence(occurrences, task.taskId, occurrenceDate);
  if (exact) return exact;
  if (pending && (pending.pendingReschedules || []).includes(occurrenceDate)) return pending;
  return (
    occurrences.find(
      (o) =>
        o.taskId === task.taskId &&
        o.status !== 'pending' &&
        (o.pendingReschedules || []).includes(occurrenceDate) &&
        Occurrence.occurrenceBelongsToFragment(task, o)
    ) || null
  );
}

function ensureOccurrence(task, occurrenceDate) {
  const existing = findOccurrence(task, occurrenceDate);
  if (existing) return existing;
  const occurrence = Occurrence.createOccurrence({ id: uid(), taskId: task.taskId, occurrenceDate });
  occurrences.push(occurrence);
  return occurrence;
}

let activeTaskId = null;
// Which occurrence of activeTaskId is focused -- a recurring task can show
// up to three rows at once (yesterday's still-overdue one, today's, and
// tomorrow's preview -- see computeTodoDisplayItems/computeNextRecurrenceItems),
// and only the one actually clicked (via its "Work on this now" button or
// the context menu's Focus item) should end up highlighted/eligible, not
// every row sharing the same task. null whenever activeTaskId is null. Both
// fields are populated from the getMe()/login response, alongside
// activeTaskId, once startApp() runs -- see boot()/the login submit handler.
let activeOccurrenceDate = null;

// Wall-clock timestamp since the active task started being focused WITHOUT a
// timer running -- the focus-only counterpart of a timer's own runningSince.
// In-memory only (unlike activeTaskId/timers, an interrupted no-timer focus
// session isn't worth persisting/resuming across a reload): null whenever
// there's no such session live, i.e. whenever there's no active task or the
// active task has a timer instead (see flushFocusOnlyElapsed/setActiveTaskId).
let activeFocusOnlySince = null;

// PUT /tasks -- bulk-replaces the account's entire task/occurrence state.
// Callers still fire-and-forget (every caller already computes the full
// resulting `tasks`/`occurrences` arrays locally before calling this), but
// the writes themselves are serialized: at most one request in flight, with
// any saveTasks() calls made meanwhile folded into one follow-up request
// carrying whatever the state is by then. Parallel requests could otherwise
// land out of order, an older state overwriting a newer one, and since
// every request sends the full state, nothing is lost by skipping the ones
// in between.
//
// A failure is NOT silent: the unsaved state stays queued, a banner says so
// (renderSaveStatus), it's retried automatically (SAVE_RETRY_DELAYS_MS, or
// right away on the next change or the banner's Retry button), and the
// browser's own "leave site?" prompt guards against reloading/closing the
// tab meanwhile. Before this, a rejected save (e.g. a fractional
// focusedSeconds the backend's integer column refused -- see addFocusStat)
// went only to the console, and the next reload quietly lost everything
// since.
const SAVE_RETRY_DELAYS_MS = [5000, 15000, 30000, 60000];
let taskSaveInFlight = false;
let taskSaveQueued = false; // state has changed since the last attempt began
let taskSaveFailure = null; // the last error, while unsaved changes remain
let taskSaveRetryTimer = null;
let taskSaveRetryCount = 0;

function saveTasks() {
  taskSaveQueued = true;
  if (!taskSaveInFlight) runTaskSave();
}

async function runTaskSave() {
  clearTimeout(taskSaveRetryTimer);
  taskSaveRetryTimer = null;
  taskSaveInFlight = true;
  renderSaveStatus();
  while (taskSaveQueued) {
    taskSaveQueued = false;
    try {
      // apiFetch serializes the body synchronously, before its first await,
      // so later mutations can't leak into this request -- they re-queue
      // via saveTasks() and go out in the next loop iteration instead.
      await apiFetch('/tasks', { method: 'PUT', body: { tasks, occurrences } });
      taskSaveFailure = null;
      taskSaveRetryCount = 0;
    } catch (err) {
      console.error('Failed to save tasks:', err);
      taskSaveFailure = err;
      taskSaveQueued = true; // still unsaved
      break;
    }
  }
  taskSaveInFlight = false;
  if (taskSaveFailure) {
    const delay = SAVE_RETRY_DELAYS_MS[Math.min(taskSaveRetryCount, SAVE_RETRY_DELAYS_MS.length - 1)];
    taskSaveRetryCount++;
    taskSaveRetryTimer = setTimeout(runTaskSave, delay);
  }
  renderSaveStatus();
}

function hasUnsavedTaskChanges() {
  return taskSaveInFlight || taskSaveQueued;
}

// For a deliberate exit where unsaved task changes no longer matter (the
// account is being deleted) -- skips the "leave site?" prompt.
function discardUnsavedTaskChanges() {
  clearTimeout(taskSaveRetryTimer);
  taskSaveRetryTimer = null;
  taskSaveQueued = false;
  taskSaveFailure = null;
}

const saveStatusBannerEl = document.getElementById('save-status-banner');
const saveStatusMessageEl = document.getElementById('save-status-message');
const saveStatusRetryBtn = document.getElementById('save-status-retry');

function renderSaveStatus() {
  saveStatusBannerEl.classList.toggle('hidden', !taskSaveFailure);
  if (!taskSaveFailure) return;
  saveStatusMessageEl.textContent = t('saveStatus.failed', { message: taskSaveFailure.message });
  saveStatusRetryBtn.disabled = taskSaveInFlight;
  saveStatusRetryBtn.textContent = t(taskSaveInFlight ? 'saveStatus.retrying' : 'saveStatus.retryNow');
}

saveStatusRetryBtn.onclick = () => {
  if (!taskSaveInFlight) runTaskSave();
};

window.addEventListener('beforeunload', (e) => {
  if (!hasUnsavedTaskChanges()) return;
  e.preventDefault();
  e.returnValue = ''; // older Chromium only shows the prompt with this set
});

// activeTaskId/activeOccurrenceDate are User fields, not their own resource
// (see api-spec.yaml's PATCH /users/me) -- fire-and-forget, same as
// saveTasks/saveUserProfile above.
function saveActiveTaskId() {
  apiFetch('/users/me', { method: 'PATCH', body: { activeTaskId, activeOccurrenceDate } }).catch((err) => {
    console.error('Failed to save active task:', err);
  });
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
    const prevOccurrence = findOccurrence(prevTask, activeOccurrenceDate);
    if (prevOccurrence && prevOccurrence.timer) {
      flushTimerElapsed(prevTask, activeOccurrenceDate); // log this run's elapsed time before freezeTimer erases runningSince
      freezeTimer(prevOccurrence.timer);
    } else {
      flushFocusOnlyElapsed(prevTask, activeOccurrenceDate);
    }
    logFocusToggle(prevTask, activeOccurrenceDate, 'Unfocused', 'Focused');
  }
  activeTaskId = newId;
  activeOccurrenceDate = newId ? occurrenceDate : null;
  saveActiveTaskId();
  const nextTask = tasks.find((t) => t.id === activeTaskId);
  if (nextTask) {
    // nextTask can be the very same task object as prevTask above (switching
    // which of a recurring task's own occurrences is focused, not switching
    // task entirely) -- its timer, if any, already lives on the Occurrence
    // row for THIS specific occurrenceDate now, so there's no risk of
    // resuming a timer that actually belongs to the occurrence just
    // unfocused above (unlike before, when both shared one task-level slot).
    const nextOccurrence = findOccurrence(nextTask, activeOccurrenceDate);
    if (nextOccurrence && nextOccurrence.timer) nextOccurrence.timer.runningSince = Date.now();
    else activeFocusOnlySince = Date.now();
    logFocusToggle(nextTask, activeOccurrenceDate, 'Focused', 'Unfocused');
  }
  saveTasks();
}

// Credits focused/timer time to the specific occurrence it was actually
// earned against (see Occurrence.focusedSeconds/timerSeconds) -- falls back
// to whichever is currently pending for the task (today's, if it has one,
// otherwise the most recent carried-over one) if no occurrenceDate is given,
// for robustness against a caller with no specific occurrence in mind; not
// exercised by either of this app's own call sites anymore, both of which
// always know their occurrence. Session lengths are flushed in here rather
// than measured after the fact, so a focus-only session that happens to
// straddle midnight is simply credited to whatever occurrence is current at
// flush time -- not worth the bookkeeping needed to split it precisely.
//
// Rounded to whole seconds: focusedSeconds/timerSeconds are integers in
// api-spec.yaml (and the backend's own columns), and PUT /tasks is
// all-or-nothing -- a single fractional value anywhere makes the backend
// reject the entire save, silently (saveTasks is fire-and-forget).
function addFocusStat(task, kind, seconds, occurrenceDate) {
  const wholeSeconds = Math.round(seconds);
  if (!(wholeSeconds > 0)) return;
  const date = occurrenceDate || Recurrence.mostRecentOccurrenceOnOrBefore(task, Recurrence.dateToISO(new Date())) || task.dueDate;
  ensureOccurrence(task, date)[kind] += wholeSeconds;
}

// Logs whatever a currently-running timer has accumulated since it last
// started/resumed -- called right before anything that would otherwise lose
// that span: the task losing active status (freezeTimer, which only
// checkpoints remainingSeconds, not the stats log), or the timer being
// cancelled outright. A no-op for an already-paused timer (runningSince ==
// null): its elapsed time up to the pause was already flushed when it was
// paused. `occurrenceDate` is always the specific occurrence the timer
// belongs to (it lives on that Occurrence row -- see Occurrence.timer), so
// it can't drift to a different occurrence than the one actually worked --
// e.g. a timer started against yesterday's still-overdue occurrence stays
// credited to yesterday even if it's flushed after midnight.
function flushTimerElapsed(task, occurrenceDate) {
  const occurrence = findOccurrence(task, occurrenceDate);
  if (occurrence && occurrence.timer && occurrence.timer.runningSince != null) {
    addFocusStat(task, 'timerSeconds', (Date.now() - occurrence.timer.runningSince) / 1000, occurrenceDate);
  }
}

// Logs whatever the active-but-timerless task has accumulated since it (or a
// since-cancelled timer on it, see cancelTaskTimer) started this focus-only
// session. A no-op if there's no such session live.
function flushFocusOnlyElapsed(task, occurrenceDate) {
  if (activeFocusOnlySince != null) {
    addFocusStat(task, 'focusedSeconds', (Date.now() - activeFocusOnlySince) / 1000, occurrenceDate);
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
// timer lives on one specific Occurrence row (see Occurrence.timer,
// startTaskTimerPrompt) -- this is what decides both which row renders the
// countdown (see below) and, in setActiveTaskId, whether focusing a given
// occurrence is allowed to resume it.
function timerBelongsToItem(item) {
  const occurrence = findOccurrence(item.task, item.occurrenceDate);
  return !!(occurrence && occurrence.timer);
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
    t('timer.setTitle'),
    [
      {
        name: 'countUp',
        label: '',
        type: 'checkboxes',
        value: [],
        required: false,
        options: [{ value: 'countUp', label: t('timer.countUp') }],
      },
      {
        name: 'minutes',
        label: t('timer.minutesLabel'),
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
        options: [{ value: 'continuePastZero', label: t('timer.continuePastZero') }],
        disableIf: (v) => v.countUp.length > 0,
      },
    ],
    { okLabel: t('timer.start'), secondaryLabel: t('timer.set') }
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
  // unstarted/paused timer (see setActiveTaskId's nextOccurrence.timer
  // branch -- the same mechanism "Resume timer" on the context menu uses), so no
  // separate start-on-focus logic is needed here.
  const occurrence = ensureOccurrence(task, occurrenceDate);
  if (result[MODAL_SECONDARY_RESULT]) {
    occurrence.timer = {
      mode: countUp ? 'countup' : 'countdown',
      continuePastZero: result.continuePastZero.length > 0,
      totalSeconds,
      remainingSeconds: totalSeconds,
      runningSince: null,
    };
    logOccurrenceEvent(task, occurrenceDate, 'Timer set');
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
  if (task.id === activeTaskId && activeOccurrenceDate === occurrenceDate && !occurrence.timer) flushFocusOnlyElapsed(task, occurrenceDate);
  // runningSince is set here directly, not left for setActiveTaskId below to
  // fill in -- if this task+occurrence was already the active one (e.g. it
  // stayed active after a previous timer on it was cancelled), setActiveTaskId
  // is a no-op and would never start this brand-new timer ticking.
  occurrence.timer = {
    mode: countUp ? 'countup' : 'countdown',
    continuePastZero: result.continuePastZero.length > 0,
    totalSeconds,
    remainingSeconds: totalSeconds,
    runningSince: Date.now(),
  };
  logOccurrenceEvent(task, occurrenceDate, 'Timer set');
  saveTasks();
  setActiveTaskId(task.id, occurrenceDate);
  renderTodo();
}

// Cancelling logs whatever the timer's current run (if any) had already
// accumulated -- only the elapsed portion, not the whole timer -- rather
// than just discarding it; see flushTimerElapsed. If the task is still
// active afterward (cancelling doesn't itself un-focus it, just removes the
// timer), it keeps being focused, now in plain focus-only mode.
function cancelTaskTimer(task, occurrenceDate) {
  flushTimerElapsed(task, occurrenceDate);
  ensureOccurrence(task, occurrenceDate).timer = null;
  logOccurrenceEvent(task, occurrenceDate, 'Timer cancelled');
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
// done/failed, hide, or focus on something that isn't due yet. A locked
// occurrence (isLockedByLimit -- see buildTodoItemRow) goes further still:
// nothing at all is actionable on it until it's unlocked, so only Task
// stats is offered, same as if every other group here were empty.
function showTodoContextMenu(event, item, canWorkOnNow, isLockedByLimit) {
  const { task, occurrenceDate, completed, failed, kind } = item;
  // Same "this occurrence only" override handling as buildTodoItemRow -- see
  // its own comment.
  const effectiveTask = Occurrence.applyOverrides(task, findOccurrence(task, occurrenceDate));
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
    if (isLockedByLimit && groupIndex !== 3) return;
    groups[groupIndex].push({ label, onClick });
  }

  // Gated on timerBelongsToItem(item), not just whether the task has any
  // timer anywhere -- a timer lives on one specific Occurrence row, so a row
  // whose occurrence has no timer of its own is treated the same as having
  // no timer at all: offering "Timer" there starts a fresh one on THIS
  // occurrence, never touching a timer parked on a different occurrence of
  // the same recurring task.
  const isFutureItem = kind === 'tomorrow' || kind === 'upcoming';
  const timerIsHere = timerBelongsToItem(item);
  if (isFutureItem) {
    // Nothing below applies to a not-yet-due preview -- see above.
  } else if (!timerIsHere) {
    if (canWorkOnNow) addItem(0, t('menu.timer'), () => startTaskTimerPrompt(task, occurrenceDate));
  } else if (isActiveHere) {
    addItem(0, t('menu.pauseTimer'), () => {
      setActiveTaskId(null);
      renderTodo();
    });
    addItem(0, t('menu.cancelTimer'), () => cancelTaskTimer(task, occurrenceDate));
  } else {
    if (canWorkOnNow) {
      addItem(0, t('menu.resumeTimer'), () => {
        setActiveTaskId(task.id, occurrenceDate);
        renderTodo();
      });
    }
    addItem(0, t('menu.cancelTimer'), () => cancelTaskTimer(task, occurrenceDate));
  }

  if (!isFutureItem) {
    if (!effectiveTask.passive && !completed && !isProtectedTask(task)) {
      addItem(1, t('menu.markDone'), () => attemptResolveTaskOccurrence(task, occurrenceDate, toggleTaskCompletion));
    }
    if (effectiveTask.passive && !failed && !isProtectedTask(task)) {
      addItem(1, t('menu.markFailed'), () => attemptResolveTaskOccurrence(task, occurrenceDate, toggleTaskFailedMark));
    }

    if (canWorkOnNow && !isActiveHere) {
      addItem(1, t('menu.focus'), () => {
        setActiveTaskId(task.id, occurrenceDate);
        renderTodo();
      });
    }
    if (isActiveHere) {
      addItem(1, t('menu.unfocus'), () => {
        setActiveTaskId(null);
        renderTodo();
      });
    }

    if (kind === 'carried-over') {
      if (item.dismissed) {
        addItem(1, t('menu.show'), () => restoreOccurrence(task, occurrenceDate));
      } else {
        addItem(1, t('menu.hide'), () => dismissOccurrence(task, occurrenceDate));
      }
    }
  }

  if (!isProtectedTask(task)) addItem(2, t('common.edit'), () => editTaskOccurrence(task, occurrenceDate));
  if (!isProtectedTask(task) && task.frequency.type !== 'once') {
    addItem(2, t('menu.editPattern'), () => editTaskPattern(task, occurrenceDate));
  }
  if (canPauseRecurrence(item)) addItem(2, t('menu.pauseRecurrence'), () => promptPauseRecurrence(task, occurrenceDate));
  addItem(3, t('menu.taskStats'), () => showTaskStatsModal(task));

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
      base.ordinal = Math.min(5, Math.max(1, parseInt(extra.multiWeekdayOrdinal, 10) || 1));
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

// task.dueTime is always stored as a plain 24-hour "HH:MM" string regardless
// of display preference -- this is the one place that reformats it for
// display, per currentUserTimeFormat (see Settings). Every other on-screen
// due time in the app (to-do list rows, describeTaskSchedule) goes through
// this rather than showing task.dueTime directly.
function formatTimeOfDay(hhmm) {
  if (currentUserTimeFormat !== '12') return hhmm;
  const [h, m] = hhmm.split(':').map(Number);
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

// Same idea as formatTimeOfDay but for a full Date/timestamp (comment and
// activity-log entries, which store a real Date.now() rather than a plain
// "HH:MM" string) -- toLocaleString's own date formatting is left alone,
// only the hour cycle is forced one way or the other instead of following
// whatever the browser's locale would otherwise pick.
function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString(currentLocaleTag(), { hour12: currentUserTimeFormat === '12' });
}

// The bare "st"/"nd"/"rd"/"th" suffix for a number, ignoring ORDINAL_LABELS'
// 1-5/'last' special-casing -- used inline right after a number input (e.g.
// "[[3]] rd occurrence"), where the digits themselves are already visible in
// the input and only the suffix needs to be supplied as text.
function ordinalSuffix(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

// ORDINAL_LABELS only covers the single-weekday "Nth weekday" mode's range
// (1-5, or 'last') -- the multi-weekday modes' ordinal isn't capped there,
// so this falls back to a generic 1st/2nd/3rd/nth suffix for anything else.
function ordinalLabel(n) {
  if (ORDINAL_LABELS[n]) return ORDINAL_LABELS[n];
  return n + ordinalSuffix(n);
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
  const scheduleBase = `${task.dueDate} ${task.allDay ? 'all day' : formatTimeOfDay(task.dueTime)} · ${label}`;
  const withEnd = task.endDate ? `${scheduleBase} until ${task.endDate}` : scheduleBase;
  if (task.passive) return `${withEnd} · Passive (reminder only)`;
  if (task.appointment) return `${withEnd} · Appointment (expires)`;
  if (task.recurUntilCompleted) return `${withEnd} · Recurs until completed`;
  return withEnd;
}

// ---------------------------------------------------------------------------
// Subscriptions & free-tier limits -- a free (never-subscribed) account can
// create at most FREE_TASK_LIMITS.once non-recurring tasks and
// FREE_TASK_LIMITS.recurring recurring tasks (a live cap: deleting one frees
// a slot), and write at most NOTES_PER_TASK_LIMIT notes on any one of them.
// A lapsed trial/subscription keeps every task and note it already has, but
// only its first FREE_TASK_LIMITS.once/.recurring tasks EVER CREATED (by
// createdAt, backfilled by the next-oldest survivor if one of those is
// deleted) can still be completed or noted on -- see unlockedTaskIds. An
// active subscription (see isSubscriptionActive) lifts every limit here.
//
// "Task" throughout this section means task.taskId, not task.id -- editing a
// recurring task ("this occurrence" / "this and following", see
// applySplitEdit) creates new task.id records for the SAME logical task, so
// counting by task.id would let ordinary editing silently eat into someone's
// quota. A taskId counts as "recurring" if any of its still-existing
// fragments has frequency.type !== 'once' -- see applySplitEdit's own
// comment for why a single taskId can span a mix of 'once' and recurring
// fragments at once.
// ---------------------------------------------------------------------------

const FREE_TASK_LIMITS = { once: 10, recurring: 5 };
const NOTES_PER_TASK_LIMIT = 5;

// The permanent, unremovable nag task a free/lapsed account gets (see
// ensureSubscriptionPromptTask) -- a fixed id/taskId rather than an extra
// flag, so "is this the nag task" needs nothing more to survive save/load,
// and "does it already exist" is a single lookup.
const SUBSCRIPTION_PROMPT_TASK_ID = 'subscription-prompt';

function isProtectedTask(task) {
  return !!task && task.id === SUBSCRIPTION_PROMPT_TASK_ID;
}

function isSubscriptionActive() {
  return describeSubscription(currentUserSubscription).active;
}

function isTaskIdRecurring(taskId) {
  return tasks.some((t) => t.taskId === taskId && t.frequency.type !== 'once');
}

// Every distinct real (non-nag) taskId currently on the list.
function distinctRealTaskIds() {
  const ids = new Set();
  for (const t of tasks) {
    if (!isProtectedTask(t)) ids.add(t.taskId);
  }
  return ids;
}

// The earliest createdAt among a taskId's surviving fragments -- they're all
// carried forward from the same original value (see applySplitEdit/
// applySplitDelete/promptManualOccurrence), so any one would do; Math.min is
// just cheap insurance against them ever drifting apart.
function taskIdCreatedAt(taskId) {
  let earliest = Infinity;
  for (const t of tasks) {
    if (t.taskId === taskId && t.createdAt < earliest) earliest = t.createdAt;
  }
  return earliest;
}

// null => unlimited (active subscription) -- every task can be completed/
// noted on. Otherwise the Set of taskIds still allowed to be: the first
// FREE_TASK_LIMITS.once non-recurring and .recurring recurring taskIds ever
// created, among ones that still exist. A never-subscribed account can never
// have exceeded these counts in the first place (see canCreateTaskOfKind),
// so this ends up covering everything it has; a lapsed trial/subscription
// may have created more while still licensed -- those extra ones are
// excluded (frozen, not deleted) here instead.
function unlockedTaskIds() {
  if (isSubscriptionActive()) return null;
  const once = [];
  const recurring = [];
  for (const taskId of distinctRealTaskIds()) {
    (isTaskIdRecurring(taskId) ? recurring : once).push(taskId);
  }
  once.sort((a, b) => taskIdCreatedAt(a) - taskIdCreatedAt(b));
  recurring.sort((a, b) => taskIdCreatedAt(a) - taskIdCreatedAt(b));
  return new Set([...once.slice(0, FREE_TASK_LIMITS.once), ...recurring.slice(0, FREE_TASK_LIMITS.recurring)]);
}

function canCompleteOrNoteTask(task) {
  const unlocked = unlockedTaskIds();
  return unlocked === null || unlocked.has(task.taskId);
}

// Gates creating a genuinely NEW task (a fresh taskId) -- not editing one,
// and not a split/manual-occurrence fragment of an existing one, neither of
// which mint a new taskId (see the section comment above).
function canCreateTaskOfKind(isRecurring) {
  if (isSubscriptionActive()) return true;
  const limit = isRecurring ? FREE_TASK_LIMITS.recurring : FREE_TASK_LIMITS.once;
  let count = 0;
  for (const taskId of distinctRealTaskIds()) {
    if (isTaskIdRecurring(taskId) === isRecurring) count++;
  }
  return count < limit;
}

function notesUsedFor(task) {
  return Occurrence.notesCount(tasks, occurrences, task.taskId);
}

function canAddNoteToTask(task) {
  if (!canCompleteOrNoteTask(task)) return false;
  if (isSubscriptionActive()) return true;
  return notesUsedFor(task) < NOTES_PER_TASK_LIMIT;
}

// Settings' data import (see settingsImportDataFileInput.onchange) bulk-
// replaces the whole task/occurrence state in one shot, bypassing
// canCreateTaskOfKind/canAddNoteToTask -- both only ever gate one new
// task/note at a time, so an imported backup could otherwise hand a
// free/lapsed account far more tasks and notes than it could ever have
// created on its own. Enforce the same numeric limits here instead of just
// leaving the excess to sit permanently padlocked (see unlockedTaskIds):
// drop taskIds beyond the limit outright (both their Task records and their
// Occurrence rows), and pool+trim notes (Task-level and Occurrence-level
// together, same as notesUsedFor counts them) down to NOTES_PER_TASK_LIMIT,
// same grandfather-by-createdAt/timestamp order as the rest of this section,
// rather than importing them just to freeze them. Returns
// { tasks, occurrences } unchanged if the account already has an active
// subscription.
function applyFreeTierLimitsToImportedTasks(importedTasks, importedOccurrences) {
  if (isSubscriptionActive()) return { tasks: importedTasks, occurrences: importedOccurrences };

  const isRecurringTaskId = (taskId) => importedTasks.some((t) => t.taskId === taskId && t.frequency.type !== 'once');
  const earliestCreatedAt = (taskId) => Math.min(...importedTasks.filter((t) => t.taskId === taskId).map((t) => t.createdAt));

  const taskIds = [...new Set(importedTasks.filter((t) => !isProtectedTask(t)).map((t) => t.taskId))];
  const once = taskIds.filter((id) => !isRecurringTaskId(id)).sort((a, b) => earliestCreatedAt(a) - earliestCreatedAt(b));
  const recurring = taskIds.filter((id) => isRecurringTaskId(id)).sort((a, b) => earliestCreatedAt(a) - earliestCreatedAt(b));
  const allowedTaskIds = new Set([...once.slice(0, FREE_TASK_LIMITS.once), ...recurring.slice(0, FREE_TASK_LIMITS.recurring)]);

  const keptTasks = importedTasks.filter((t) => isProtectedTask(t) || allowedTaskIds.has(t.taskId));
  const keptOccurrences = importedOccurrences.filter((o) => allowedTaskIds.has(o.taskId));

  // Notes are stored per record (Task-level) or per occurrence
  // (Occurrence-level) but counted per taskId across both (see
  // notesUsedFor) -- pool them together, keep only the earliest
  // NOTES_PER_TASK_LIMIT by timestamp, same as if they'd been added one at a
  // time on a free account.
  const entriesByTaskId = {};
  for (const record of [...keptTasks, ...keptOccurrences]) {
    for (const comment of record.comments || []) {
      (entriesByTaskId[record.taskId] || (entriesByTaskId[record.taskId] = [])).push({ record, comment });
    }
  }
  for (const taskId in entriesByTaskId) {
    const dropped = new Set(
      entriesByTaskId[taskId]
        .sort((a, b) => a.comment.timestamp - b.comment.timestamp)
        .slice(NOTES_PER_TASK_LIMIT)
        .map((entry) => entry.comment)
    );
    if (!dropped.size) continue;
    for (const record of [...keptTasks, ...keptOccurrences]) {
      if (record.taskId === taskId && record.comments) record.comments = record.comments.filter((c) => !dropped.has(c));
    }
  }

  return { tasks: keptTasks, occurrences: keptOccurrences };
}

// Checks whether creating a task of this kind is currently allowed,
// prompting the subscription paywall first if it isn't (see
// offerSubscriptionUpgrade) and re-checking afterward -- so a successful
// subscribe there lets the caller's already-validated form data go through
// immediately instead of being discarded.
async function ensureCanCreateTaskOfKind(isRecurring) {
  if (canCreateTaskOfKind(isRecurring)) return true;
  return offerSubscriptionUpgrade(t('subscribe.reasonCreateLimit'));
}

// Idempotent -- call freely. A free/lapsed account gets a permanent daily
// all-day task nagging it to subscribe (can't be edited or deleted, see
// isProtectedTask's other call sites; doesn't count against
// FREE_TASK_LIMITS.recurring, see distinctRealTaskIds excluding it); an
// active subscription removes it again. Also called from applyLanguage --
// unlike every other string in the app, this task's name/description/
// details are plain data on a task record, not recomputed by t() at render
// time, so a language change needs this to explicitly refresh them on the
// existing record instead of just re-rendering. Otherwise only re-evaluated
// at login/subscribe time (see startApp/subscribeCurrentUserToTrial), not on
// every render -- a trial silently expiring mid-session while the tab stays
// open won't bring this back until the next reload, an acceptable gap for a
// mock feature like this one.
function ensureSubscriptionPromptTask() {
  const existing = tasks.find((t) => t.id === SUBSCRIPTION_PROMPT_TASK_ID);
  if (isSubscriptionActive()) {
    if (existing) {
      tasks = tasks.filter((t) => t.id !== SUBSCRIPTION_PROMPT_TASK_ID);
      saveTasks();
    }
    return;
  }
  if (existing) {
    existing.name = t('subscribe.taskName');
    existing.description = t('subscribe.taskDescription');
    existing.details = t('subscribe.taskDetails');
    saveTasks();
    return;
  }
  tasks.push({
    id: SUBSCRIPTION_PROMPT_TASK_ID,
    taskId: SUBSCRIPTION_PROMPT_TASK_ID,
    seriesId: SUBSCRIPTION_PROMPT_TASK_ID,
    name: t('subscribe.taskName'),
    description: t('subscribe.taskDescription'),
    details: t('subscribe.taskDetails'),
    dueDate: Recurrence.dateToISO(new Date()),
    dueTime: null,
    allDay: true,
    appointment: false,
    passive: false,
    recurUntilCompleted: false,
    endDate: null,
    frequency: { type: 'days', interval: 1 },
    createdAt: Date.now(),
    log: [],
    comments: [],
  });
  saveTasks();
}

// Mints and stores a fresh trial subscription for the current account (see
// startTrialSubscription), then refreshes every bit of state that snapshot
// touches -- the stored bearer token, the in-memory subscription, the nag
// task, and the render. startTrialSubscription's response already carries
// the updated user, so no separate getMe() round trip is needed.
async function subscribeCurrentUserToTrial() {
  const { token, user } = await startTrialSubscription();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  ensureSubscriptionPromptTask();
  saveTasks();
  renderTodo();
  renderSettingsSubscriptionSection();
  renderSubscribeHeaderButton();
}

// Marks the current account's subscription to not renew (see
// cancelSubscription) -- access/limits are untouched until it actually
// expires (see isSubscriptionActive), so nothing here needs to touch tasks
// or re-render the to-do list itself, just the bits of chrome that show
// subscription status.
async function cancelCurrentUserSubscription() {
  const { token, user } = await cancelSubscription();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  renderSettingsSubscriptionSection();
  renderSubscribeHeaderButton();
}

// "Cancel scheduled deletion" in Settings (see scheduleAccountDeletion in
// auth.js) -- deliberately doesn't touch cancelAtPeriodEnd itself, see
// cancelScheduledAccountDeletion's own comment.
async function cancelCurrentUserScheduledDeletion() {
  const { token, user } = await cancelScheduledAccountDeletion();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  renderSettingsSubscriptionSection();
}

// Every one of these option lists is a function, not a plain array -- called
// fresh each time openTaskForm actually builds the field list, so a
// language change (see applyLanguage) is reflected the next time the form
// opens, rather than being frozen into whatever language was active the
// first time this module-level code happened to run.

// The "Repeats every N ..." unit dropdown -- see the 'repeats' field group
// in openTaskForm. No "once" option: that's the group's own checkbox.
function getFrequencyOptions() {
  return [
    { value: 'days', label: t('taskForm.days') },
    { value: 'weeks', label: t('taskForm.weeks') },
    { value: 'months', label: t('taskForm.months') },
  ];
}

function getWeekdayCheckboxOptions() {
  return [
    { value: '1', label: t('taskForm.weekdayMon') },
    { value: '2', label: t('taskForm.weekdayTue') },
    { value: '3', label: t('taskForm.weekdayWed') },
    { value: '4', label: t('taskForm.weekdayThu') },
    { value: '5', label: t('taskForm.weekdayFri') },
    { value: '6', label: t('taskForm.weekdaySat') },
    { value: '0', label: t('taskForm.weekdaySun') },
  ];
}

function getWeekdaySelectOptions() {
  return [
    { value: '0', label: t('taskForm.sunday') },
    { value: '1', label: t('taskForm.monday') },
    { value: '2', label: t('taskForm.tuesday') },
    { value: '3', label: t('taskForm.wednesday') },
    { value: '4', label: t('taskForm.thursday') },
    { value: '5', label: t('taskForm.friday') },
    { value: '6', label: t('taskForm.saturday') },
  ];
}

function getMonthlyModeOptions() {
  return [
    { value: 'day', label: t('taskForm.monthlySameDay') },
    { value: 'last', label: t('taskForm.monthlyLastDay') },
    { value: 'before-last', label: t('taskForm.monthlyBeforeLast') },
    { value: 'weekday', label: t('taskForm.monthlyWeekday') },
    { value: 'multi-weekday', label: t('taskForm.monthlyMultiWeekday') },
    { value: 'multi-weekday-offset', label: t('taskForm.monthlyMultiWeekdayOffset') },
    { value: 'multi-day', label: t('taskForm.monthlyMultiDay') },
  ];
}

// Capped at 28 (not 31) so every selected day exists in every month --
// avoids the ambiguity of what a 30th or 31st should do in a 28/29/30-day
// month (unlike dayMode 'day', which has an explicit clamp-to-last-day rule
// for exactly that case; a multi-day list has no single anchor day to
// clamp, so this just sidesteps the question instead). Plain numbers, not
// translated text, so this stays a plain array rather than a function.
const MONTH_DAY_CHECKBOX_OPTIONS = Array.from({ length: 28 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

function getBeforeAfterOptions() {
  return [
    { value: 'before', label: t('taskForm.before') },
    { value: 'after', label: t('taskForm.after') },
  ];
}

function getOrdinalOptions() {
  return [
    { value: '1', label: t('taskForm.ordinal1') },
    { value: '2', label: t('taskForm.ordinal2') },
    { value: '3', label: t('taskForm.ordinal3') },
    { value: '4', label: t('taskForm.ordinal4') },
    { value: '5', label: t('taskForm.ordinal5') },
    { value: 'last', label: t('taskForm.ordinalLast') },
  ];
}

// Both take the form's whole current values object (not just frequencyType)
// so they also gate on the 'repeats' checkbox -- otherwise the weekly/
// monthly sub-fields could stay visible from a leftover unit selection even
// after unchecking "Repeats every".
const isWeeklyFrequencyType = (v) => v.repeats.length > 0 && v.frequencyType === 'weeks';
const isMonthlyFrequencyType = (v) => v.repeats.length > 0 && v.frequencyType === 'months';
const isMultiWeekdayMonthlyMode = (monthlyMode) => monthlyMode === 'multi-weekday' || monthlyMode === 'multi-weekday-offset';

// `initialDueDate` only applies to a brand-new task (no existingTask) --
// used by each to-do day header's own "+" button so the form opens
// pre-filled with that day's date instead of always defaulting to today.
// Only ever reached for a brand-new task, or for editing an existing 'once'
// task -- every recurring-task edit goes through openTaskGeneralInfoForm/
// openPatternEditForm instead (see editTaskOccurrence/editTaskPattern),
// since a 'once' task has no series/pattern history to protect and so
// doesn't need the general-vs-pattern split at all: it's always safe to edit
// both together, in place, in one form.
async function openTaskForm(existingTask, initialDueDate, seriesOptions = {}) {
  if (existingTask && isProtectedTask(existingTask)) return; // can't be edited or deleted (its own Delete button lives inside this same form) -- see the section comment above isProtectedTask
  const formTitle = existingTask ? t('taskForm.editTask') : t('taskForm.addTask');
  const formDueDate = existingTask ? existingTask.dueDate : initialDueDate || Recurrence.dateToISO(new Date());
  const result = await showFormModal(
    formTitle,
    [
      { name: 'name', label: t('taskForm.name'), value: existingTask ? existingTask.name : seriesOptions.nameDefault || '' },
      {
        // Single-line like Name, not a textarea like Details -- the to-do
        // list shows this truncated to one line too (see .todo-item-desc),
        // so a multi-line value could never be seen in full there anyway.
        name: 'description',
        label: t('taskForm.description'),
        value: existingTask ? existingTask.description : '',
        required: false,
      },
      {
        name: 'details',
        label: t('taskForm.details'),
        type: 'textarea',
        value: existingTask ? existingTask.details : '',
        required: false,
      },
      {
        name: 'dueDate',
        label: t('taskForm.dueDate'),
        type: 'date',
        value: formDueDate,
      },
      {
        name: 'allDay',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.allDay ? ['allDay'] : [],
        options: [{ value: 'allDay', label: t('taskForm.allDay') }],
        required: false,
      },
      {
        name: 'dueTime',
        label: t('taskForm.dueTime'),
        type: 'time',
        value: existingTask ? existingTask.dueTime || '18:00' : '18:00',
        showIf: (v) => v.allDay.length === 0,
      },
      [
        {
          name: 'repeats',
          type: 'checkboxes',
          value: existingTask && existingTask.frequency.type !== 'once' ? ['repeats'] : [],
          options: [{ value: 'repeats', label: t('taskForm.repeatsEvery') }],
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
          options: getFrequencyOptions(),
          inlineWidth: '100px',
          disableIf: (v) => v.repeats.length === 0,
        },
      ],
      {
        name: 'weekdays',
        label: t('taskForm.alsoRecurOn'),
        type: 'checkboxes',
        value: existingTask && existingTask.frequency.weekdays ? existingTask.frequency.weekdays.map(String) : [],
        options: getWeekdayCheckboxOptions(),
        gridColumns: 4,
        required: false,
        showIf: (v) => isWeeklyFrequencyType(v),
      },
      {
        name: 'monthlyMode',
        label: t('taskForm.monthlyPattern'),
        type: 'select',
        value: existingTask ? existingTask.frequency.dayMode || 'day' : 'day',
        options: getMonthlyModeOptions(),
        showIf: (v) => isMonthlyFrequencyType(v),
      },
      {
        name: 'monthlyOffset',
        label: t('taskForm.monthlyOffsetLabel'),
        value: existingTask && existingTask.frequency.offset != null ? String(existingTask.frequency.offset) : '0',
        required: false,
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'before-last',
      },
      {
        name: 'monthlyWeekday',
        label: t('taskForm.dayOfWeek'),
        type: 'select',
        value: existingTask && existingTask.frequency.weekday != null ? String(existingTask.frequency.weekday) : '1',
        options: getWeekdaySelectOptions(),
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
      },
      {
        name: 'monthlyOrdinal',
        label: t('taskForm.whichOccurrence'),
        type: 'select',
        value: existingTask && existingTask.frequency.ordinal != null ? String(existingTask.frequency.ordinal) : '1',
        options: getOrdinalOptions(),
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
      },
      {
        name: 'multiWeekdayDays',
        label: t('taskForm.selectedDays'),
        type: 'checkboxes',
        value:
          existingTask && existingTask.frequency.weekdays && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
            ? existingTask.frequency.weekdays.map(String)
            : [],
        options: getWeekdayCheckboxOptions(),
        gridColumns: 4,
        showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
      },
      // Merged into one row -- "[N] days [Before/After] [N]<suffix>
      // occurrence" -- rather than three stacked label+control blocks, which
      // otherwise pushed the modal taller than the screen once
      // 'multi-weekday-offset' was selected. The ordinal suffix ("st"/"nd"/
      // "rd"/"th") is a `static` text field recomputed live from the ordinal
      // input's own current value (see showFormModal's staticEls handling).
      // The offset fields' showIf hides just their own item within the row
      // (not the whole row -- see hideTarget), so plain 'multi-weekday' mode
      // still shows only the ordinal + "occurrence" part.
      [
        {
          name: 'multiWeekdayOffsetDays',
          type: 'number',
          value:
            existingTask && existingTask.frequency.offsetDays != null && existingTask.frequency.dayMode === 'multi-weekday-offset'
              ? String(existingTask.frequency.offsetDays)
              : '0',
          min: 0,
          max: 6,
          inlineWidth: '56px',
          showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
        },
        {
          type: 'static',
          text: () => t('taskForm.daysInline'),
          showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
        },
        {
          name: 'multiWeekdayOffsetDirection',
          type: 'select',
          value:
            existingTask && existingTask.frequency.offsetDirection && existingTask.frequency.dayMode === 'multi-weekday-offset'
              ? existingTask.frequency.offsetDirection
              : 'before',
          options: getBeforeAfterOptions(),
          inlineWidth: '90px',
          showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
        },
        {
          name: 'multiWeekdayOrdinal',
          type: 'number',
          value:
            existingTask && existingTask.frequency.ordinal != null && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
              ? String(existingTask.frequency.ordinal)
              : '1',
          min: 1,
          max: 5,
          inlineWidth: '56px',
          showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
        },
        {
          type: 'static',
          // Croatian ordinals are just "N." (no letter suffix like English's
          // "1st"/"2nd"/"3rd") -- the number itself already shown by the
          // input right before this, so this only ever supplies the trailing
          // punctuation/word, not the ordinal itself, in either language.
          text: (v) =>
            currentUserLanguage === 'hr'
              ? t('taskForm.occurrenceHr')
              : `${ordinalSuffix(parseInt(v.multiWeekdayOrdinal, 10) || 1)} ${t('taskForm.occurrenceWord')}`,
          tightGap: true,
          showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
        },
      ],
      {
        name: 'multiDayDays',
        label: t('taskForm.multiDayDays'),
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
        label: t('taskForm.endDate'),
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
        options: [{ value: 'appointment', label: t('taskForm.appointmentDesc') }],
        required: false,
      },
      {
        name: 'passive',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.passive ? ['passive'] : [],
        options: [{ value: 'passive', label: t('taskForm.passiveDesc') }],
        required: false,
      },
      {
        name: 'recurUntilCompleted',
        label: '',
        type: 'checkboxes',
        value: existingTask && existingTask.recurUntilCompleted ? ['recurUntilCompleted'] : [],
        options: [{ value: 'recurUntilCompleted', label: t('taskForm.recurUntilCompletedDesc') }],
        required: false,
      },
    ],
    { okLabel: existingTask ? t('common.save') : t('common.add'), deleteLabel: existingTask ? t('common.delete') : undefined }
  );

  if (result === MODAL_DELETE_RESULT) {
    deleteTask(existingTask.id);
    return;
  }
  if (!result) return;

  const endDate = result.endDate || null;
  if (endDate && endDate < result.dueDate) {
    showInfoModal(t('taskForm.endDateBeforeDue'));
    return;
  }

  const allDay = result.allDay.length > 0;
  const dueTime = allDay ? null : result.dueTime;
  const appointment = result.appointment.length > 0;
  const passive = result.passive.length > 0;
  const recurUntilCompleted = result.recurUntilCompleted.length > 0;
  const frequency = result.repeats.length > 0 ? decodeFrequency(result.frequencyType, result.interval, result) : { type: 'once', interval: 1 };

  if (existingTask) {
    freezeMixedSeriesNameIfRenaming(existingTask, result.name);
    applyGeneralInfoInPlace(existingTask, { name: result.name, description: result.description, details: result.details, dueTime, allDay, appointment, passive });
    // null: this once-task edit's own 'Edited' entry above already covers
    // it -- see applyPatternInPlace's own comment on logMessage.
    applyPatternInPlace(existingTask, { dueDate: result.dueDate, frequency, endDate, recurUntilCompleted }, null);
  } else {
    const isRecurring = frequency.type !== 'once';
    if (!(await ensureCanCreateTaskOfKind(isRecurring))) return;
    // A brand-new recurUntilCompleted task's raw, user-picked due date isn't
    // necessarily a date `frequency` itself lands on (e.g. "1st Monday of
    // the month" with some other weekday picked in the date field) -- snap
    // it forward to the first date the pattern actually produces, same as
    // firstRecurUntilCompletedDueDate's own comment explains. A plain
    // (non-recurUntilCompleted) task doesn't need this: occursOn recomputes
    // each candidate date's own pattern date fresh, so an "off" dueDate
    // self-corrects at display time regardless -- only recurUntilCompleted's
    // literal chain-membership check (see occursOn) actually needs dueDate
    // itself to already be correct. || result.dueDate: same null-guard as
    // nextRecurUntilCompletedDueDate's own call site, in case the pattern's
    // first occurrence would actually fall after endDate itself.
    const dueDate = recurUntilCompleted
      ? Recurrence.firstRecurUntilCompletedDueDate({ dueDate: result.dueDate, frequency, endDate }) || result.dueDate
      : result.dueDate;
    const newTask = {
      id: uid(),
      taskId: uid(),
      seriesId: seriesOptions.forcedSeriesId || uid(),
      name: result.name,
      description: result.description,
      details: result.details,
      dueDate,
      dueTime,
      allDay,
      appointment,
      passive,
      recurUntilCompleted,
      endDate,
      frequency,
      createdAt: Date.now(),
      log: [],
      comments: [],
    };
    // Joining an existing series -- carry its saved name over so
    // getSeriesName can find it on this record too, not just whichever
    // member happened to have it before. Only if the series has actually
    // been explicitly named (some member carries seriesName): getSeriesName's
    // fallback to the earliest member's own name is a display-time default,
    // not something that should get permanently frozen onto a new record.
    if (seriesOptions.forcedSeriesId) {
      const namedMember = tasksInSeries(seriesOptions.forcedSeriesId).find((t) => t.seriesName);
      if (namedMember) newTask.seriesName = namedMember.seriesName;
    }
    tasks.push(newTask);
    if (recurUntilCompleted) ensureOccurrence(newTask, dueDate);
  }
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

// General-info-only counterpart to openTaskForm, for a recurring task's
// name/description/details/dueTime/allDay/appointment/passive -- exactly
// applyGeneralInfoInPlace's field set (occurrence.js's own override
// whitelist). No due-date field at all: retargeting the fork point is a
// pattern-edit-only concern now (see openPatternEditForm) -- this form's
// split point is always exactly `occurrenceDate`, whatever scope is chosen.
// scope is always a real choice from showEditScopeChoice ('instance' /
// 'following' / 'all'), never null -- callers resolve that before calling in.
//
// 'instance'/'following' get a delete button -- the only remaining UI path
// to applySplitDelete's "delete just this occurrence" / "delete this and
// following" (deleting the whole task/series slice this way is otherwise
// unreachable now that this form has taken over from openTaskForm for every
// recurring edit). 'all' doesn't: deleting the entire task is a Manage
// Tasks/series-editor action (see its own row's delete button), not a
// general-info-edit one.
async function openTaskGeneralInfoForm(existingTask, { occurrenceDate, scope }) {
  if (isProtectedTask(existingTask)) return;
  const formTitle = scope === 'instance' ? t('taskForm.editOccurrence') : scope === 'following' ? t('taskForm.editFollowing') : t('taskForm.editTask');
  const result = await showFormModal(formTitle, [
    { name: 'name', label: t('taskForm.name'), value: existingTask.name },
    {
      name: 'description',
      label: t('taskForm.description'),
      value: existingTask.description,
      required: false,
    },
    {
      name: 'details',
      label: t('taskForm.details'),
      type: 'textarea',
      value: existingTask.details,
      required: false,
    },
    {
      name: 'allDay',
      label: '',
      type: 'checkboxes',
      value: existingTask.allDay ? ['allDay'] : [],
      options: [{ value: 'allDay', label: t('taskForm.allDay') }],
      required: false,
    },
    {
      name: 'dueTime',
      label: t('taskForm.dueTime'),
      type: 'time',
      value: existingTask.dueTime || '18:00',
      showIf: (v) => v.allDay.length === 0,
    },
    {
      name: 'appointment',
      label: '',
      type: 'checkboxes',
      value: existingTask.appointment ? ['appointment'] : [],
      options: [{ value: 'appointment', label: t('taskForm.appointmentDesc') }],
      required: false,
    },
    {
      name: 'passive',
      label: '',
      type: 'checkboxes',
      value: existingTask.passive ? ['passive'] : [],
      options: [{ value: 'passive', label: t('taskForm.passiveDesc') }],
      required: false,
    },
  ], { okLabel: t('common.save'), deleteLabel: scope !== 'all' ? t('common.delete') : undefined });

  if (result === MODAL_DELETE_RESULT) {
    applySplitDelete(existingTask, occurrenceDate, scope);
    saveTasks();
    renderTodo();
    refreshTodoManageModal();
    return;
  }
  if (!result) return;

  const allDay = result.allDay.length > 0;
  const dueTime = allDay ? null : result.dueTime;
  const appointment = result.appointment.length > 0;
  const passive = result.passive.length > 0;
  const fields = { name: result.name, description: result.description, details: result.details, dueTime, allDay, appointment, passive };

  freezeMixedSeriesNameIfRenaming(existingTask, result.name);
  if (scope === 'all') {
    applyGeneralInfoInPlace(existingTask, fields);
  } else {
    // Pattern fields are explicitly carried through unedited from
    // existingTask -- this form never touches them, so a 'following' fork
    // always inherits the exact original pattern (only its general fields
    // differ going forward).
    applySplitEdit(
      existingTask,
      { originalOccurrenceDate: occurrenceDate, newOccurrenceDate: occurrenceDate, scope },
      { ...fields, recurUntilCompleted: existingTask.recurUntilCompleted, frequency: existingTask.frequency, endDate: existingTask.endDate }
    );
  }
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

// Recurrence-pattern-only counterpart to openTaskForm, for a recurring
// task's dueDate/frequency/endDate/recurUntilCompleted. Never 'instance'-
// scoped (occurrence.js's own applyOverrides comment already forbids
// per-occurrence pattern overrides), and never offered an 'all'-style
// in-place-with-history option either -- see editTaskPattern, the only
// caller, for how opts is decided:
//  - { inPlace: true }: mutates existingTask's pattern fields directly,
//    only ever safe to call when there's no history to protect (see
//    applyPatternInPlace).
//  - { occurrenceDate, scope: 'following' }: forks a new Task fragment
//    carrying the edited pattern forward from occurrenceDate, exactly like
//    a general-info 'following' edit but with the pattern fields (not the
//    general ones) actually changing.
async function openPatternEditForm(existingTask, opts) {
  if (isProtectedTask(existingTask)) return;
  const formTitle = opts.inPlace ? t('patternEdit.titleInPlace') : t('patternEdit.titleFollowing');
  const result = await showFormModal(formTitle, [
    {
      name: 'dueDate',
      label: t('taskForm.dueDate'),
      type: 'date',
      value: opts.inPlace ? existingTask.dueDate : opts.occurrenceDate,
    },
    [
      {
        name: 'repeats',
        type: 'checkboxes',
        value: existingTask.frequency.type !== 'once' ? ['repeats'] : [],
        options: [{ value: 'repeats', label: t('taskForm.repeatsEvery') }],
        required: false,
      },
      {
        name: 'interval',
        type: 'number',
        value: String(existingTask.frequency.interval || 1),
        min: 1,
        required: false,
        inlineWidth: '64px',
        disableIf: (v) => v.repeats.length === 0,
      },
      {
        name: 'frequencyType',
        type: 'select',
        value: existingTask.frequency.type !== 'once' ? existingTask.frequency.type : 'days',
        options: getFrequencyOptions(),
        inlineWidth: '100px',
        disableIf: (v) => v.repeats.length === 0,
      },
    ],
    {
      name: 'weekdays',
      label: t('taskForm.alsoRecurOn'),
      type: 'checkboxes',
      value: existingTask.frequency.weekdays ? existingTask.frequency.weekdays.map(String) : [],
      options: getWeekdayCheckboxOptions(),
      gridColumns: 4,
      required: false,
      showIf: (v) => isWeeklyFrequencyType(v),
    },
    {
      name: 'monthlyMode',
      label: t('taskForm.monthlyPattern'),
      type: 'select',
      value: existingTask.frequency.dayMode || 'day',
      options: getMonthlyModeOptions(),
      showIf: (v) => isMonthlyFrequencyType(v),
    },
    {
      name: 'monthlyOffset',
      label: t('taskForm.monthlyOffsetLabel'),
      value: existingTask.frequency.offset != null ? String(existingTask.frequency.offset) : '0',
      required: false,
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'before-last',
    },
    {
      name: 'monthlyWeekday',
      label: t('taskForm.dayOfWeek'),
      type: 'select',
      value: existingTask.frequency.weekday != null ? String(existingTask.frequency.weekday) : '1',
      options: getWeekdaySelectOptions(),
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
    },
    {
      name: 'monthlyOrdinal',
      label: t('taskForm.whichOccurrence'),
      type: 'select',
      value: existingTask.frequency.ordinal != null ? String(existingTask.frequency.ordinal) : '1',
      options: getOrdinalOptions(),
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
    },
    {
      name: 'multiWeekdayDays',
      label: t('taskForm.selectedDays'),
      type: 'checkboxes',
      value:
        existingTask.frequency.weekdays && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
          ? existingTask.frequency.weekdays.map(String)
          : [],
      options: getWeekdayCheckboxOptions(),
      gridColumns: 4,
      showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
    },
    [
      {
        name: 'multiWeekdayOffsetDays',
        type: 'number',
        value:
          existingTask.frequency.offsetDays != null && existingTask.frequency.dayMode === 'multi-weekday-offset'
            ? String(existingTask.frequency.offsetDays)
            : '0',
        min: 0,
        max: 6,
        inlineWidth: '56px',
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        type: 'static',
        text: () => t('taskForm.daysInline'),
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        name: 'multiWeekdayOffsetDirection',
        type: 'select',
        value:
          existingTask.frequency.offsetDirection && existingTask.frequency.dayMode === 'multi-weekday-offset'
            ? existingTask.frequency.offsetDirection
            : 'before',
        options: getBeforeAfterOptions(),
        inlineWidth: '90px',
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        name: 'multiWeekdayOrdinal',
        type: 'number',
        value:
          existingTask.frequency.ordinal != null && isMultiWeekdayMonthlyMode(existingTask.frequency.dayMode)
            ? String(existingTask.frequency.ordinal)
            : '1',
        min: 1,
        max: 5,
        inlineWidth: '56px',
        showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
      },
      {
        type: 'static',
        text: (v) =>
          currentUserLanguage === 'hr'
            ? t('taskForm.occurrenceHr')
            : `${ordinalSuffix(parseInt(v.multiWeekdayOrdinal, 10) || 1)} ${t('taskForm.occurrenceWord')}`,
        tightGap: true,
        showIf: (v) => isMonthlyFrequencyType(v) && isMultiWeekdayMonthlyMode(v.monthlyMode),
      },
    ],
    {
      name: 'multiDayDays',
      label: t('taskForm.multiDayDays'),
      type: 'checkboxes',
      value: existingTask.frequency.days && existingTask.frequency.dayMode === 'multi-day' ? existingTask.frequency.days.map(String) : [],
      options: MONTH_DAY_CHECKBOX_OPTIONS,
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-day',
    },
    {
      name: 'endDate',
      label: t('taskForm.endDate'),
      type: 'date',
      value: existingTask.endDate || '',
      required: false,
      showIf: (v) => v.repeats.length > 0,
    },
    {
      name: 'recurUntilCompleted',
      label: '',
      type: 'checkboxes',
      value: existingTask.recurUntilCompleted ? ['recurUntilCompleted'] : [],
      options: [{ value: 'recurUntilCompleted', label: t('taskForm.recurUntilCompletedDesc') }],
      required: false,
    },
  ]);
  if (!result) return;

  const endDate = result.endDate || null;
  if (endDate && endDate < result.dueDate) {
    showInfoModal(t('taskForm.endDateBeforeDue'));
    return;
  }
  const recurUntilCompleted = result.recurUntilCompleted.length > 0;
  const frequency = result.repeats.length > 0 ? decodeFrequency(result.frequencyType, result.interval, result) : { type: 'once', interval: 1 };

  if (opts.inPlace) {
    applyPatternInPlace(existingTask, { dueDate: result.dueDate, frequency, endDate, recurUntilCompleted });
  } else {
    forkTaskFragment(existingTask, result.dueDate, {
      name: existingTask.name,
      description: existingTask.description,
      details: existingTask.details,
      dueTime: existingTask.dueTime,
      allDay: existingTask.allDay,
      appointment: existingTask.appointment,
      passive: existingTask.passive,
      frequency,
      endDate,
      recurUntilCompleted,
    });
  }
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

// Splits a recurring task's series around newOccurrenceDate -- the split
// point, which is normally the occurrence that was double-clicked
// (originalOccurrenceDate) but becomes wherever the user retargeted the
// "Due date" field to in the edit form, if they changed it (following scope
// only -- see below). scope:
//  - 'instance': no split at all anymore -- the rest of the pattern is
//    completely untouched. This is purely a per-occurrence override
//    (Occurrence.overrides) on the EXISTING task, keyed at its own pattern
//    slot (originalOccurrenceDate); the task's own history needs nothing
//    copied anywhere, since every already-recorded Occurrence already
//    belongs to the right taskId regardless of which Task record currently
//    owns the pattern. Unlike before, an 'instance' edit can no longer also
//    move this occurrence to a different calendar date -- an Occurrence
//    row's date is its own identity -- only its other fields (name/
//    description/details/dueTime/allDay/appointment/passive).
//  - 'following': the historical portion ends right before this occurrence
//    (or is dropped entirely if this was the series' very first occurrence
//    -- nothing historical to keep), and a single new task with the EDITED
//    settings takes over starting at newOccurrenceDate. Keeps the ORIGINAL
//    task's taskId -- still the same logical task, however many records its
//    pattern's history now spans (see the "task" side of the series/task
//    distinction in the manage-tasks modal and the side panel's per-task
//    aggregation) -- so every already-recorded Occurrence stays correctly
//    associated without anything needing to be copied forward.
function applySplitEdit(originalTask, { originalOccurrenceDate, newOccurrenceDate, scope }, edited) {
  if (isProtectedTask(originalTask)) return;

  if (scope === 'instance') {
    const occurrence = ensureOccurrence(originalTask, originalOccurrenceDate);
    occurrence.overrides = {
      name: edited.name,
      description: edited.description,
      details: edited.details,
      dueTime: edited.dueTime,
      allDay: edited.allDay,
      appointment: edited.appointment,
      passive: edited.passive,
    };
    occurrence.log.push({ message: 'Recurrence edited (only this occurrence)', timestamp: Date.now(), occurrenceDate: null });
    return;
  }

  return forkTaskFragment(originalTask, newOccurrenceDate, edited);
}

// The "this and following" mechanics shared by applySplitEdit and
// openPatternEditForm: truncates/removes the historical portion of
// originalTask up to (not including) newOccurrenceDate, then pushes a brand
// new Task record (same taskId/seriesId) carrying `fields` -- the COMPLETE
// field set for the new fragment, general and pattern alike -- forward from
// there. Already-recorded Occurrence rows need no copying, since they're
// keyed by taskId, not any one Task record's own id, and so stay correctly
// associated regardless of how many fragments the pattern's history now
// spans.
function forkTaskFragment(originalTask, newOccurrenceDate, fields) {
  const originalTaskId = originalTask.taskId;
  const prevDate = previousOccurrenceBeforeDate(originalTask, newOccurrenceDate);

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

  // This fragment starts a brand-new occurrence chain from here on (same as
  // a freshly-created task, not an incremental edit of one already in
  // progress) -- if it's (becoming) recurUntilCompleted, its dueDate needs
  // the same snap-to-the-pattern's-actual-first-occurrence treatment a new
  // task gets (see the no-existingTask branch of openTaskForm's submit
  // handler and firstRecurUntilCompletedDueDate's own comment), since
  // newOccurrenceDate is just whatever the split point ended up being and
  // isn't guaranteed to itself be a date `fields.frequency` lands on --
  // most obviously when this same edit also changes the frequency to
  // something the split point doesn't match.
  const fragmentDueDate = fields.recurUntilCompleted
    ? Recurrence.firstRecurUntilCompletedDueDate({ dueDate: newOccurrenceDate, frequency: fields.frequency, endDate: fields.endDate }) ||
      newOccurrenceDate
    : newOccurrenceDate;
  const editedFragment = {
    id: uid(),
    taskId: originalTaskId,
    seriesId: originalTask.seriesId,
    seriesName: originalTask.seriesName,
    name: fields.name,
    description: fields.description,
    details: fields.details,
    dueDate: fragmentDueDate,
    dueTime: fields.dueTime,
    allDay: fields.allDay,
    appointment: fields.appointment,
    passive: fields.passive,
    recurUntilCompleted: fields.recurUntilCompleted,
    frequency: fields.frequency,
    endDate: fields.endDate,
    createdAt: originalTask.createdAt,
    log: [],
    comments: [],
  };
  tasks.push(editedFragment);
  logTaskEvent(editedFragment, 'Recurrence edited (this and following occurrences)', newOccurrenceDate);
  // Seeds the first live Occurrence for a task newly becoming
  // recurUntilCompleted via this same edit -- an already-recurUntilCompleted
  // taskId already has a live pending Occurrence (wherever its chain
  // currently is), which stays exactly as valid under this fragment's own
  // settings; nothing to seed.
  if (fields.recurUntilCompleted && !originalTask.recurUntilCompleted) {
    ensureOccurrence(editedFragment, fragmentDueDate);
  }
  return editedFragment;
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
  if (isProtectedTask(originalTask)) return;
  const originalTaskId = originalTask.taskId;
  const originalEndDate = originalTask.endDate || null;
  const prevDate = previousOccurrenceBeforeDate(originalTask, occurrenceDate);
  const nextDate = nextOccurrenceAfterDate(originalTask, occurrenceDate);
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
  // of this taskId to log against at all. No occurrence data needs copying
  // either way -- every already-recorded Occurrence already belongs to the
  // right taskId regardless of which Task record currently owns the pattern.
  let loggedFragment = originalKept ? originalTask : null;
  if (scope === 'instance' && nextDate) {
    const continuation = {
      id: uid(),
      taskId: originalTaskId,
      seriesId: originalTask.seriesId,
      seriesName: originalTask.seriesName,
      name: originalTask.name,
      description: originalTask.description,
      details: originalTask.details,
      dueDate: nextDate,
      dueTime: originalTask.dueTime,
      allDay: originalTask.allDay,
      appointment: originalTask.appointment,
      passive: originalTask.passive,
      recurUntilCompleted: originalTask.recurUntilCompleted,
      frequency: originalTask.frequency,
      endDate: originalEndDate,
      createdAt: originalTask.createdAt,
      log: [],
      comments: [],
    };
    tasks.push(continuation);
    loggedFragment = continuation;
  }
  if (loggedFragment) {
    logTaskEvent(
      loggedFragment,
      scope === 'instance' ? 'Recurrence occurrence deleted' : 'Recurrence and following occurrences deleted',
      occurrenceDate
    );
  }
}

// task-shaped view for previousOccurrenceBeforeDate/nextOccurrenceAfterDate's
// own generic scan (via Recurrence.occursOn) -- an ordinary task's own
// fields already work directly; a recurUntilCompleted task has no pattern to
// scan this way (see occurrence.js's own module comment) -- there's just its
// one live pending Occurrence's own occurrenceDate/pendingReschedules chain,
// fed through the same occursOn via Occurrence.recurrenceShim. This
// deliberately only ever reflects the CURRENT pending Occurrence, not any
// already-resolved one -- "what's the next/previous occurrence relative to
// what's still live" is a different question from "list everything that's
// ever been recorded" (see allRecurUntilCompletedDatesInRange below, used by
// forEachOccurrenceBefore/InRange instead, for exactly that reason). null if
// a recurUntilCompleted task somehow has no pending Occurrence yet (nothing
// to scan).
function occurrenceScanShape(task) {
  if (!task.recurUntilCompleted) return task;
  const occurrence = findOccurrence(task, null);
  return occurrence ? Occurrence.recurrenceShim(task, occurrence) : null;
}

// occursOn, generalized for recurUntilCompleted -- but unlike
// occurrenceScanShape above, this needs to answer "is there ANY recorded
// Occurrence (resolved or still pending) at exactly this date", not just
// "does the current pending chain cover it": once an occurrence resolves,
// it's a fixed historical fact at its own date forever, and findOccurrence's
// own exact-match-first lookup (see its own comment) already finds it
// regardless of status -- this is what lets a completed recurUntilCompleted
// occurrence still show up (crossed out) on its own date instead of
// vanishing the moment a new pending occurrence takes over.
//
// A plain (non-recurUntilCompleted) task's occurrence set is normally pure
// pattern math (sparse model -- most dates have no row at all), but
// rescheduleOccurrencePrompt can move one Occurrence's own occurrenceDate
// independently of the pattern, in either direction:
//  - a real row sitting on a date the pattern itself wouldn't predict (moved
//    TO a mismatched date) must still count -- found directly, same as the
//    recurUntilCompleted branch, before ever consulting the pattern.
//  - a date the pattern WOULD predict, but whose own occurrence has since
//    moved elsewhere (moved AWAY from), must NOT count anymore -- otherwise
//    the vacated date reappears as a fresh, unclaimed occurrence right
//    alongside the real one now sitting on its new date. See
//    Occurrence.isDateExcluded for how the vacated date is tracked (reusing
//    pendingReschedules' own array-of-dates shape).
//
// A found row only counts if it belongs to THIS fragment (see
// Occurrence.occurrenceBelongsToFragment) -- otherwise every fragment
// sharing a taskId would also render every other fragment's rows, e.g. an
// old truncated fragment showing a later one's occurrence past its own
// endDate.
function occursOnDate(task, dateISO) {
  const found = findOccurrence(task, dateISO);
  if (found && Occurrence.occurrenceBelongsToFragment(task, found)) return true;
  if (task.recurUntilCompleted) return false;
  return Recurrence.occursOn(task, dateISO) && !Occurrence.isDateExcluded(occurrences, task.taskId, dateISO);
}

// previousOccurrenceBefore/nextOccurrenceAfter, skipping any date
// Occurrence.isDateExcluded has vacated (see rescheduleOccurrencePrompt) --
// otherwise a preview view (computeNextRecurrenceItems's "what's next") could
// still surface a date whose own occurrence has since moved elsewhere, as if
// it were still a live, unclaimed one. recurUntilCompleted has no such
// exclusion history to check (occurrenceScanShape's own chain-membership
// scan already only ever reflects the live pending occurrence's real dates).
function previousOccurrenceBeforeDate(task, dateISO) {
  if (task.recurUntilCompleted) {
    const shape = occurrenceScanShape(task);
    return shape ? Recurrence.previousOccurrenceBefore(shape, dateISO) : null;
  }
  let cursor = dateISO;
  for (let i = 0; i < 3660; i++) {
    const prev = Recurrence.previousOccurrenceBefore(task, cursor);
    if (!prev) return null;
    if (!Occurrence.isDateExcluded(occurrences, task.taskId, prev)) return prev;
    cursor = prev;
  }
  return null;
}

function nextOccurrenceAfterDate(task, afterISO) {
  if (task.recurUntilCompleted) {
    const shape = occurrenceScanShape(task);
    return shape ? Recurrence.nextOccurrenceAfter(shape, afterISO) : null;
  }
  let cursor = afterISO;
  for (let i = 0; i < 3660; i++) {
    const next = Recurrence.nextOccurrenceAfter(task, cursor);
    if (!next) return null;
    if (!Occurrence.isDateExcluded(occurrences, task.taskId, next)) return next;
    cursor = next;
  }
  return null;
}

// Every date recurUntilCompleted's own forEachOccurrenceBefore/InRange
// should visit: every already-resolved Occurrence's own (fixed,
// never-repeated) date, plus -- for whichever one Occurrence is still
// 'pending' -- its full live chain (occurrenceDate and every
// pendingReschedules entry), same as before. Listing every resolved
// occurrence (not just the live one) is what lets a month view keep showing
// an occurrence crossed out on its own date after a later one has already
// taken over as current.
function allRecurUntilCompletedDatesInRange(task, startISO, cutoffISO, fn) {
  for (const occurrence of occurrences) {
    if (occurrence.taskId !== task.taskId || !Occurrence.occurrenceBelongsToFragment(task, occurrence)) continue;
    const dates = occurrence.status === 'pending' ? [occurrence.occurrenceDate, ...(occurrence.pendingReschedules || [])] : [occurrence.occurrenceDate];
    for (const date of dates) {
      if (date >= startISO && date < cutoffISO) fn(date);
    }
  }
}

function forEachOccurrenceBefore(task, cutoffISO, fn) {
  if (task.recurUntilCompleted) return allRecurUntilCompletedDatesInRange(task, '', cutoffISO, fn);
  let cursor = task.dueDate;
  for (let i = 0; i < 3660 && cursor < cutoffISO; i++) {
    // occursOnDate, not Recurrence.occursOn directly -- this loop only ever
    // reaches here for a non-recurUntilCompleted task (see the early return
    // above), so occursOnDate's own recurUntilCompleted branch is simply
    // never taken; its plain-task branch is what accounts for a
    // rescheduled occurrence (see occursOnDate's own comment), which raw
    // pattern math alone would miss/duplicate.
    if (occursOnDate(task, cursor)) fn(cursor);
    cursor = Recurrence.dateToISO(Recurrence.addDays(new Date(cursor + 'T00:00:00'), 1));
  }
}

// Same as forEachOccurrenceBefore, but bounded below too -- starts at
// whichever is later, task.dueDate or startISO, instead of always scanning
// from dueDate (which could be years before the range actually of interest,
// e.g. this month -- see computeAllTasksItems/the "pending/overdue" side of
// computeTodoDisplayItems).
function forEachOccurrenceInRange(task, startISO, cutoffISO, fn) {
  if (task.recurUntilCompleted) return allRecurUntilCompletedDatesInRange(task, startISO, cutoffISO, fn);
  let cursor = task.dueDate > startISO ? task.dueDate : startISO;
  for (let i = 0; i < 3660 && cursor < cutoffISO; i++) {
    // See forEachOccurrenceBefore's own comment on why occursOnDate, not
    // Recurrence.occursOn directly.
    if (occursOnDate(task, cursor)) fn(cursor);
    cursor = Recurrence.dateToISO(Recurrence.addDays(new Date(cursor + 'T00:00:00'), 1));
  }
}

// Marks every occurrence of task strictly before cutoffISO as dismissed
// (Occurrence.dismissed, not its status -- whether it was ever actually
// done stays whatever it already was, so an appointment's genuinely missed
// past occurrences stay recorded as failed rather than silently rewritten
// to "completed") -- used right after truncating a split-off historical
// task to a fixed end date, so it doesn't linger as an incomplete "carried
// over" item forever. Immediate, unlike scheduleOccurrencesDismissalBefore
// below -- there's no live "uncheck to undo" interaction happening here to
// leave a linger window for.
//
// Never dismisses a recurUntilCompleted task's still-'pending' occurrence,
// even if forEachOccurrenceBefore visits one of its (overdue) dates here --
// that one Occurrence row is still live and governed by whichever Task
// fragment now owns the pattern going forward (its taskId doesn't change
// across a split), so hiding it would bury something still actionable, not
// sweep away dead history (see autoDismissStaleCarriedOverOccurrences'
// own comment on the same exemption).
function markOccurrencesDismissedBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => {
    const occurrence = ensureOccurrence(task, date);
    if (task.recurUntilCompleted && occurrence.status === 'pending') return;
    occurrence.dismissed = true;
  });
}

// Same idea, but for completing a later occurrence after one or more
// earlier ones were missed (see toggleTaskCompletion) -- otherwise those
// missed occurrences stay shown forever even though the to-do list itself
// never shows more than the single most-recent one, and can resurface as
// "ghost" carried-over items if the task's recurrence pattern is edited
// later. Goes through the same scheduleDismissal linger as completing an
// ordinary carried-over item does, rather than dismissing them this instant,
// purely so the checkmark on the one just completed is visible for a moment
// first (see scheduleDismissal's own comment) -- unchecking that completion
// within the linger window does not restore any of these; once missed and
// swept up here, they stay dismissed, restorable only by explicitly clicking
// Show on them (see restoreOccurrence).
function scheduleOccurrencesDismissalBefore(task, cutoffISO) {
  forEachOccurrenceBefore(task, cutoffISO, (date) => scheduleDismissal(task, date));
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

// Shared by a row's double-click and its context menu's "Edit" item --
// general info only (name/description/details/...), never the recurrence
// pattern (see editTaskPattern for that, reached separately from the
// context menu). A 'once' task has no recurrence to split, so it skips
// straight to editing it -- only recurring tasks get the "which
// occurrence(s)" choice.
async function editTaskOccurrence(task, occurrenceDate) {
  if (isProtectedTask(task)) return;
  if (task.frequency.type === 'once') {
    openTaskForm(task);
    return;
  }
  const scope = await showEditScopeChoice();
  if (!scope) return;
  openTaskGeneralInfoForm(task, { occurrenceDate, scope });
}

function taskHasRecordedHistory(task) {
  return occurrences.some((o) => o.taskId === task.taskId);
}

// The recurrence-pattern counterpart to editTaskOccurrence, reached only via
// the context menu (never double-click -- pattern editing is a deliberately
// less-common action than general-info editing). Whether the edit applies
// in place or forces a "this and following" fork is a fact about the task,
// not a user choice -- see openPatternEditForm's own comment:
//  - no recorded history yet: nothing to protect, edit in place.
//  - recurUntilCompleted: ALWAYS in place, regardless of history -- its live
//    due date is governed by its current pending Occurrence's own
//    pendingReschedules chain, not by these fields, so in-place is always
//    safe and forking is actually the risky option (see applyPatternInPlace
//    and forkTaskFragment's own comments).
//  - otherwise: forced fork, so history before this point is never
//    retroactively affected.
async function editTaskPattern(task, occurrenceDate) {
  if (isProtectedTask(task) || task.frequency.type === 'once') return;
  if (task.recurUntilCompleted || !taskHasRecordedHistory(task)) {
    openPatternEditForm(task, { inPlace: true });
  } else {
    openPatternEditForm(task, { occurrenceDate, scope: 'following' });
  }
}

function deleteTask(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task || isProtectedTask(task)) return;
  tasks = tasks.filter((t) => t.id !== taskId);
  if (activeTaskId === taskId) setActiveTaskId(null);
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

// Resolves a task.recurUntilCompleted task's current pending Occurrence once
// whichever instance of it is marked done (see toggleTaskCompletion) -- the
// next occurrence's own due date is computed counted from *today* (real
// time, when this actually runs) rather than completedDate itself (see
// Recurrence.nextRecurUntilCompletedDueDate) -- "the date of completion" is
// when the task was actually done, not whichever backlogged instance's row
// happened to get clicked. Using completedDate instead would make
// completing an old backlogged instance (rather than the most recent one)
// immediately fall behind again by however many days separate them, needing
// another whole run of catch-up reschedules right on the next render,
// instead of actually resolving anything. A fresh 'pending' Occurrence is
// created for that next cycle; `occurrence` itself is marked 'completed' and
// never touched again -- unlike before, there's no shared dueDate pointer
// left for a later edit to collide with. A 'once' task (or one whose
// endDate is now behind it) has no next occurrence -- nothing new is
// created, so the just-completed occurrence (crossed out) is all that's
// left to show.
function resolveRecurUntilCompletedOccurrence(task, occurrence) {
  occurrence.status = 'completed';
  occurrence.resolvedAt = Date.now();
  const todayISO = Recurrence.dateToISO(new Date());
  const nextDate = Recurrence.nextRecurUntilCompletedDueDate(task, todayISO) || null;
  if (nextDate) ensureOccurrence(task, nextDate);
}

// Undoes resolveRecurUntilCompletedOccurrence when a checked-off occurrence
// is unchecked again: the next cycle that completing it created is taken
// back, since `occurrence` goes back to being the live pending one --
// leaving both would give the task two live occurrences at once (see
// findOccurrence's own comment on stale pending rows). Anything already
// recorded against that next cycle in the meantime (notes, log, focused/
// timer time, a still-running timer, overrides) moves onto `occurrence`
// rather than being lost, and so does being the active/selected
// occurrence. Returns false (changing nothing) when a LATER cycle has
// already been resolved since: reopening this one would then put a second
// live chain back in the middle of history, so it's refused instead.
function reopenRecurUntilCompletedOccurrence(task, occurrence) {
  const laterResolved = occurrences.some(
    (o) =>
      o !== occurrence &&
      o.taskId === task.taskId &&
      o.status !== 'pending' &&
      o.occurrenceDate > occurrence.occurrenceDate &&
      Occurrence.occurrenceBelongsToFragment(task, o)
  );
  if (laterResolved) return false;

  const successor = findOccurrence(task, null);
  if (successor && successor !== occurrence) {
    const byTimestamp = (a, b) => a.timestamp - b.timestamp;
    occurrence.comments = [...(occurrence.comments || []), ...(successor.comments || [])].sort(byTimestamp);
    occurrence.log = [...(occurrence.log || []), ...(successor.log || [])].sort(byTimestamp);
    occurrence.focusedSeconds = (occurrence.focusedSeconds || 0) + (successor.focusedSeconds || 0);
    occurrence.timerSeconds = (occurrence.timerSeconds || 0) + (successor.timerSeconds || 0);
    if (!occurrence.timer) occurrence.timer = successor.timer;
    if (!occurrence.overrides) occurrence.overrides = successor.overrides;
    const successorDates = [successor.occurrenceDate, ...(successor.pendingReschedules || [])];
    if (activeTaskId === task.id && successorDates.includes(activeOccurrenceDate)) {
      activeOccurrenceDate = Occurrence.effectiveDueDate(occurrence);
      saveActiveTaskId();
    }
    if (sidePanelTask === task && successorDates.includes(sidePanelOccurrenceDate)) {
      sidePanelOccurrenceDate = Occurrence.effectiveDueDate(occurrence);
    }
    occurrences.splice(occurrences.indexOf(successor), 1);
  }
  // Live again -- a dismissal from its brief post-completion linger would
  // otherwise hide the task's one current occurrence.
  occurrence.dismissed = false;
  return true;
}

function toggleTaskCompletion(task, occurrenceDate) {
  const occurrence = ensureOccurrence(task, occurrenceDate);
  if (occurrence.status === 'completed') {
    if (task.recurUntilCompleted && !reopenRecurUntilCompletedOccurrence(task, occurrence)) {
      showInfoModal(t('todo.reopenBlockedRecurUntilCompleted'));
      return;
    }
    occurrence.status = 'pending';
    occurrence.resolvedAt = null;
    // Cancels this occurrence's own pending dismissal (computeTodoDisplayItems
    // schedules one for the "prior occurrence" slot once it displays as
    // completed, but deliberately never cancels one on a plain re-render --
    // see isDismissalPending there) -- unchecking within the linger window
    // keeps it shown instead of it still vanishing later on a stale timer.
    cancelScheduledDismissal(task, occurrenceDate);
    if (!takeBackResolutionLogEntry(task, occurrence, 'Marked done')) logOccurrenceEvent(task, occurrenceDate, 'Marked not done');
  } else {
    occurrence.status = 'completed';
    occurrence.resolvedAt = Date.now();
    logOccurrenceEvent(task, occurrenceDate, 'Marked done');
    if (task.recurUntilCompleted) {
      // Whichever instance of the chain this was (occurrence.occurrenceDate
      // itself, or one its own pendingReschedules has since pushed it to --
      // see occurrence.js's own comment on the field), completing it
      // resolves the whole chain: a fresh Occurrence takes over as the
      // live pending one (see resolveRecurUntilCompletedOccurrence), rather
      // than lingering as a dismissed-once-the-more-recent-one-completes
      // carried-over item the way an ordinary task's missed occurrences do
      // below.
      resolveRecurUntilCompletedOccurrence(task, occurrence);
    } else {
      // Only this task's "today" or carried-over occurrence is ever checked
      // off this way (see the checkbox's disabled condition below), so
      // occurrenceDate is always on or before today here -- dismiss any
      // earlier occurrence(s) skipped without ever being explicitly checked
      // off (e.g. missed a few days), otherwise they'd stay shown in the data
      // forever and can resurface as "ghost" carried-over items if the task's
      // recurrence is edited later. Their own status is untouched -- they're
      // dismissed, not retroactively marked done, so an appointment's
      // genuinely missed occurrences stay recorded as failed. Scheduled with
      // the same short linger as an ordinary completion, not instant, so
      // unchecking this one right back still has a window to cancel it.
      scheduleOccurrencesDismissalBefore(task, occurrenceDate);
    }
    // A running timer stops making sense once its occurrence is done --
    // cancelled outright rather than just frozen. renderTodo's own "no
    // longer eligible" check un-marks it as active right after this, via
    // setActiveTaskId, same as completing any other active task already does
    // (which is what flushes this task's own now-empty focus-only session,
    // so it isn't set up again here).
    if (occurrence.timer) {
      flushTimerElapsed(task, occurrenceDate);
      occurrence.timer = null;
    }
  }
  // Not on narrow screens (see isNarrowLayout) -- checking a task off is a
  // plain list action there, not a request to see its full-screen details.
  if (!isNarrowLayout()) selectTaskForSidePanel(task, occurrenceDate);
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
// always false for it too, since it has no completed status to begin with;
// see toggleTaskFailedMark instead of toggleTaskCompletion). It stays
// "overdue" through the one extra day it's shown carried-over (see
// autoDismissStaleCarriedOverOccurrences, which clears away ANY carried-over
// occurrence once it's older than that, passive or not), giving the user a
// chance to instead mark it failed (Occurrence.status) or dismiss it (see
// dismissOccurrence) before it's cleared away on its own.
function pastDueStatus(task, occurrenceDate, completed, now) {
  // Never overdue or failed -- a missed occurrence is rescheduled to the
  // next day instead (see advanceRecurUntilCompletedTasks/occursOn's own
  // comment on the field), so there's nothing here for it to carry over or
  // expire as.
  if (task.recurUntilCompleted) return { overdue: false, failed: false };
  if (task.passive) {
    const occurrence = findOccurrence(task, occurrenceDate);
    if (occurrence && occurrence.status === 'failed') return { overdue: false, failed: true };
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
  const occurrence = ensureOccurrence(task, occurrenceDate);
  if (occurrence.status === 'failed') {
    occurrence.status = 'pending';
    occurrence.resolvedAt = null;
    if (!takeBackResolutionLogEntry(task, occurrence, 'Marked failed')) logOccurrenceEvent(task, occurrenceDate, 'Marked not failed');
  } else {
    occurrence.status = 'failed';
    occurrence.resolvedAt = Date.now();
    logOccurrenceEvent(task, occurrenceDate, 'Marked failed');
  }
  // See the same guard in toggleTaskCompletion above.
  if (!isNarrowLayout()) selectTaskForSidePanel(task, occurrenceDate);
  saveTasks();
  renderTodo();
}

// Shared gate in front of toggleTaskCompletion/toggleTaskFailedMark (the
// checkbox and the context menu's Mark done/Mark failed items) -- only
// blocks the transition INTO done/failed, never out of it, so un-checking
// something that was completed/failed before a subscription lapsed always
// stays possible. See canCompleteOrNoteTask for what "allowed" means here.
async function attemptResolveTaskOccurrence(task, occurrenceDate, resolveFn) {
  const occurrence = findOccurrence(task, occurrenceDate);
  const alreadyResolved = occurrence ? occurrence.status === (task.passive ? 'failed' : 'completed') : false;
  if (!alreadyResolved && !canCompleteOrNoteTask(task)) {
    const accepted = await offerSubscriptionUpgrade(t('subscribe.reasonTaskLimit'));
    if (!accepted) return;
  }
  resolveFn(task, occurrenceDate);
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
  ensureOccurrence(task, occurrenceDate).dismissed = true;
  selectTaskForSidePanel(task, occurrenceDate);
  saveTasks();
  renderTodo();
}

// Undoes dismissOccurrence -- brings a hidden carried-over occurrence back
// (the "pending/overdue" and "all tasks" views show it either way, since
// both already ignore Occurrence.dismissed, but "next recurrence" only shows
// it once this clears the flag).
function restoreOccurrence(task, occurrenceDate) {
  ensureOccurrence(task, occurrenceDate).dismissed = false;
  selectTaskForSidePanel(task, occurrenceDate);
  saveTasks();
  renderTodo();
}

// Whether an occurrence still needs to show on the to-do list is tracked
// separately from whether it's complete (Occurrence.dismissed, alongside
// Occurrence.status) -- otherwise "done" and "no longer relevant to show"
// end up conflated, which would force treating an appointment's missed
// (failed, never actually done) past occurrences as if they'd been
// completed just to stop them cluttering the list. A carried-over
// occurrence (an ordinary one, or the "yesterday companion" below) that's
// just been completed lingers crossed out for a few seconds instead of
// vanishing the instant it's done, so the checkmark is actually visible
// before it disappears -- scheduleDismissal sets Occurrence.dismissed after
// that delay, which is what actually hides it (see the `if
// (occurrence.dismissed) continue/return null` checks below and in
// computeTodoDisplayItems). Since it's persisted, it survives
// reload/restart.
const dismissalTimers = new Map(); // "taskId:date" -> timer handle, in-memory only

function scheduleDismissal(task, occurrenceDate) {
  const key = `${task.id}:${occurrenceDate}`;
  if (dismissalTimers.has(key)) return;
  dismissalTimers.set(
    key,
    setTimeout(() => {
      dismissalTimers.delete(key);
      ensureOccurrence(task, occurrenceDate).dismissed = true;
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
// Occurrence.dismissed, unlike every other view here. This is meant to be a
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
      const occurrence = findOccurrence(task, date);
      if (occurrence && occurrence.status === 'completed') return; // resolved -- not "pending/overdue" anymore
      const { overdue, failed } = pastDueStatus(task, date, false, now);
      if (overdue || failed) {
        items.push({ task, occurrenceDate: date, completed: false, overdue, failed, dismissed: !!(occurrence && occurrence.dismissed), kind: 'carried-over' });
      }
    });

    if (!isCurrentMonth) continue;

    if (occursOnDate(task, todayISO)) {
      const occurrence = findOccurrence(task, todayISO);
      const completed = !!(occurrence && occurrence.status === 'completed');
      const { overdue, failed } = pastDueStatus(task, todayISO, completed, now);
      items.push({ task, occurrenceDate: todayISO, completed, overdue, failed, dismissed: !!(occurrence && occurrence.dismissed), kind: 'today' });
    }

    if (occursOnDate(task, tomorrowISO)) {
      const occurrence = findOccurrence(task, tomorrowISO);
      items.push({
        task,
        occurrenceDate: tomorrowISO,
        completed: false,
        overdue: false,
        failed: false,
        dismissed: !!(occurrence && occurrence.dismissed),
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
// Occurrence.dismissed/status the way they are.
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
      const occurrence = findOccurrence(task, date);
      const completed = !!(occurrence && occurrence.status === 'completed');
      const { overdue, failed } = completed ? { overdue: false, failed: false } : pastDueStatus(task, date, false, now);
      const kind = date < todayISO ? 'carried-over' : date === todayISO ? 'today' : date === tomorrowISO ? 'tomorrow' : 'upcoming';
      items.push({ task, occurrenceDate: date, completed, overdue, failed, dismissed: !!(occurrence && occurrence.dismissed), kind });
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
    const todayOccurs = occursOnDate(task, todayISO);
    // A failed occurrence (a past-due appointment, or a manually-marked-
    // failed passive task -- see pastDueStatus) is just as resolved as a
    // completed one for the purposes of previewing what's next: neither is
    // still waiting on the user, so there's no reason to hold back the next
    // occurrence's preview until they explicitly check it off too.
    let todayPending = false;
    if (todayOccurs) {
      const todayOccurrence = findOccurrence(task, todayISO);
      const completed = !!(todayOccurrence && todayOccurrence.status === 'completed');
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

    const priorDate = previousOccurrenceBeforeDate(task, todayISO);
    const priorOccurrence = priorDate ? findOccurrence(task, priorDate) : null;
    let priorPending = false;
    if (priorDate && !(priorOccurrence && priorOccurrence.dismissed)) {
      const completed = !!(priorOccurrence && priorOccurrence.status === 'completed');
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
    // yet (recentDate null), search from yesterday rather than assuming the
    // due date itself is a valid occurrence -- it's just the pattern's
    // anchor point, not necessarily a date the pattern itself lands on (see
    // nextOccurrenceAfterDate) -- yesterday works as a safe start regardless
    // of how far in the future the task's first/next occurrence actually is.
    if (!todayPending && !priorPending) {
      const recentDate = todayOccurs ? todayISO : priorDate;
      const searchFrom = recentDate == null ? Recurrence.dateToISO(Recurrence.addDays(now, -1)) : recentDate;
      const nextDate = nextOccurrenceAfterDate(task, searchFrom);
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
      if (!alreadyShown && occursOnDate(task, tomorrowISO)) {
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
const TODO_VIEW_MODES = ['pending', 'next-recurrence', 'all'];

// Populated from the getMe()/login response once startApp() runs, same as
// activeTaskId/activeOccurrenceDate above -- see boot()/the login submit
// handler.
let todoViewMode = 'pending';

// PATCH /users/me -- fire-and-forget, same as saveActiveTaskId above.
function saveTodoViewMode() {
  apiFetch('/users/me', { method: 'PATCH', body: { todoViewMode } }).catch((err) => {
    console.error('Failed to save view mode:', err);
  });
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

// Reset at the top of each renderTodo() call (see there) and consulted by
// buildTodoItemRow's seriesRowLabelInfo -- isMixedSeries/getSeriesName each
// scan the full task list, and without this a render with N rows sharing a
// handful of series would redo that scan 2N times instead of twice per
// distinct series.
let todoSeriesLabelCache = new Map();

// Mixed-ness and display name only matter together (see buildTodoItemRow) --
// bundled into one lookup so a cache hit skips both scans, not just one.
function seriesRowLabelInfo(seriesId) {
  if (todoSeriesLabelCache.has(seriesId)) return todoSeriesLabelCache.get(seriesId);
  const mixed = isMixedSeries(seriesId);
  const info = { mixed, name: mixed ? getSeriesName(seriesId) : '' };
  todoSeriesLabelCache.set(seriesId, info);
  return info;
}

// Keeps exactly one day header "pinned" (position: sticky, see .todo-day-
// header.pinned in style.css) at a time: the last one (in display order)
// whose day has already started scrolling past the top of #todo-viewport --
// including index 0 itself, no special-casing needed there, since at rest
// (pinnedIndex still -1, nothing scrolled past yet) its natural, unstuck
// flow position already sits exactly where sticky would hold it anyway.
// Every day header already looks like its own opaque glass card (see
// .todo-day-header in style.css), so whichever one is currently pinned
// simply covers whatever's behind it just by being drawn there -- nothing
// else here needs to track or react to the handoff.
function updatePinnedTodoHeader() {
  if (todoDayHeaderRefs.length === 0) return;
  const viewportTop = todoViewportEl.getBoundingClientRect().top;
  let pinnedIndex = -1;
  for (let i = 0; i < todoDayHeaderRefs.length; i++) {
    // Strictly less than, not <= -- the very first sentinel sits exactly at
    // the viewport's own top edge before any scrolling at all (0 == 0), so
    // <= pinned it from the very first render for no visible reason.
    if (todoDayHeaderRefs[i].sentinel.getBoundingClientRect().top < viewportTop) pinnedIndex = i;
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
  todoMonthLabelEl.title = isCurrentMonth ? '' : t('month.jumpToCurrent');
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
  message.textContent = t('todo.empty');
  todoListEl.appendChild(message);

  const btn = document.createElement('button');
  btn.className = 'accent-btn';
  btn.textContent = t('todo.addTask');
  btn.onclick = () => openTaskForm(null);
  todoListEl.appendChild(btn);
}

// "Today"/"Yesterday"/"Tomorrow" relative to the real current date, so it
// stays correct across the day boundary without re-deriving it per call --
// anything further out (a carried-over item more than a day overdue) just
// gets its plain weekday + date, since "3 days ago" style phrasing wasn't
// asked for.
function describeDayLabel(dateISO, todayISO) {
  // Only once the year itself differs from the real current year -- true for
  // the vast majority of rows (everything within the current year), so this
  // keeps the common case as short as it already was. ISO strings' own
  // leading 4 characters are the year, cheaper and tz-safe compared to
  // parsing both into Dates just to call getFullYear(). Applies even to
  // "Tomorrow"/"Yesterday" below -- on Dec 31/Jan 1 those genuinely do fall
  // in a different year than today, same as any other date would.
  const showYear = dateISO.slice(0, 4) !== todayISO.slice(0, 4);
  const dateStr = new Date(dateISO + 'T00:00:00').toLocaleDateString(currentLocaleTag(), {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...(showYear ? { year: 'numeric' } : {}),
  });
  if (dateISO === todayISO) return `${t('todo.today')}, ${dateStr}`;
  if (dateISO === Recurrence.dateToISO(Recurrence.addDays(new Date(todayISO + 'T00:00:00'), -1))) {
    return `${t('todo.yesterday')}, ${dateStr}`;
  }
  if (dateISO === Recurrence.dateToISO(Recurrence.addDays(new Date(todayISO + 'T00:00:00'), 1))) {
    return `${t('todo.tomorrow')}, ${dateStr}`;
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

// A closed eye (not yet focused on) vs. an open one (currently focused) --
// same eye outline as SHOW_ICON below (same "this is visible/active" idea,
// and the closed state reuses just its top eyelid curve for visual
// continuity), but with a white sclera fill plus a colored iris/black pupil
// on the open state, so the icon itself reads clearly against any
// background color rather than relying on a border/backdrop behind it.
const WORK_ON_ICON =
  '<svg viewBox="0 0 24 24" width="25" height="25"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7"/></svg>';
const WORKING_ON_ICON =
  '<svg viewBox="0 0 24 24" width="25" height="25"><path fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="black" stroke="none"/></svg>';
const DISMISS_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>';
const SHOW_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/></svg>';
// Shown in place of a checkbox (see buildTodoItemRow), prefixed onto the
// side panel's "Add note" button (see renderSidePanel), and next to a name
// in the Manage Tasks modal (see buildSeriesMemberRow) -- everywhere a task
// is beyond canCompleteOrNoteTask's grandfathered set for a lapsed
// subscription. width/height set per call site, not baked in here, since
// the three spots use different sizes.
const LOCK_ICON =
  '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/></svg>';

// Builds a single to-do row -- extracted from renderTodo's per-day loop so
// it can be appended into either of a day's two columns rather than always
// straight into todoListEl.
function buildTodoItemRow(item, isToday) {
  // Whether THIS row's own occurrence, specifically, is the focused one --
  // not just whether the task is focused on some other occurrence of itself
  // (a recurring task can show up to three rows at once; see
  // activeOccurrenceDate).
  const isActiveHere = item.task.id === activeTaskId && item.occurrenceDate === activeOccurrenceDate;
  // A "this occurrence only" edit (see applySplitEdit's 'instance' scope)
  // stores its overrides on the Occurrence row itself rather than the task
  // -- effectiveTask is what should actually be displayed for this one row;
  // item.task stays the real record for identity/actions (taskId lookups,
  // toggling, editing, ...).
  const rowOccurrence = findOccurrence(item.task, item.occurrenceDate);
  const effectiveTask = Occurrence.applyOverrides(item.task, rowOccurrence);
  const row = document.createElement('div');
  row.__task = item.task; // back-reference for refreshSelectedHighlight's cheap re-tag, see there
  row.__occurrenceDate = item.occurrenceDate;
  row.className =
    'todo-item' +
    (item.completed ? ' completed' : '') +
    (item.failed ? ' failed' : '') +
    (isActiveHere ? ' focused' : '') +
    (effectiveTask.allDay ? ' all-day' : '') +
    // Kept through .completed (still green, just crossed out like any other
    // completed task -- see .todo-item.appointment .todo-item-name's own
    // source-order comment in style.css) but not through .failed -- an
    // appointment past its due date is tagged .failed instead (red, crossed
    // out), and that should win over the still-green appointment tint.
    (effectiveTask.appointment && !item.failed ? ' appointment' : '') +
    // Same idea for a passive task's own tint -- once it's marked failed
    // (see toggleTaskFailedMark), .failed's own red styling takes over.
    (effectiveTask.passive && !item.failed ? ' passive' : '') +
    // The "pending/overdue" and "all tasks" views show a dismissed
    // occurrence right alongside ones that aren't (see
    // computeTodoDisplayItems/computeAllTasksItems, both of which ignore
    // Occurrence.dismissed for filtering) -- this is the only visual cue telling
    // the two apart, since otherwise a dismissed item looks identical to an
    // active one. "Next recurrence" never shows a dismissed item at all, so
    // item.dismissed is always false there.
    (item.dismissed ? ' dismissed' : '') +
    // Whichever task's notes/history are currently showing in the side
    // panel (see selectTaskForSidePanel) -- reference equality against the
    // exact record last interacted with, not just a matching id, since a
    // recurring task's own separate occurrences are still separate rows.
    (item.task === sidePanelTask && item.occurrenceDate === sidePanelOccurrenceDate ? ' selected' : '') +
    (isToday ? '' : ' not-today');

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
    bar.style.width = `${Math.max(0, Math.min(100, timerProgressPercent(rowOccurrence.timer)))}%`;
    row.appendChild(bar);
  }

  // Whether this occurrence is still unresolved AND beyond a lapsed
  // subscription's grandfathered set (see canCompleteOrNoteTask) -- shown as
  // a padlock instead of a checkbox (below) rather than just a disabled one,
  // so "this needs a subscription" reads differently from "not due yet"
  // (tomorrow/upcoming) or "this is the nag task itself". Never true once
  // already resolved: completing/failing it while still licensed and only
  // losing that license afterward doesn't retroactively hide the result.
  const isResolved = effectiveTask.passive ? item.failed : item.completed;
  const isLockedByLimit = !isResolved && !isProtectedTask(item.task) && !canCompleteOrNoteTask(item.task);

  if (isLockedByLimit) {
    const lock = document.createElement('span');
    lock.className = 'todo-item-lock';
    lock.title = t('subscribe.reasonTaskLimit');
    lock.innerHTML = LOCK_ICON;
    lock.onclick = (e) => {
      e.stopPropagation();
      offerSubscriptionUpgrade(t('subscribe.reasonTaskLimit'));
    };
    row.appendChild(lock);
  } else {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // A passive task has no "done" state to check off -- its box means
    // "marked failed" instead (see toggleTaskFailedMark), so it reflects
    // item.failed rather than item.completed (which is always false for it
    // anyway, see pastDueStatus).
    checkbox.checked = effectiveTask.passive ? item.failed : item.completed;
    // Styled as a red "X" instead of the usual checkbox (see
    // .todo-checkbox-failed) purely to read as "failed", not to change what
    // clicking it does -- a failed appointment (or a passive task marked
    // failed) stays toggleable like any other carried-over task.
    if (item.failed) checkbox.classList.add('todo-checkbox-failed');
    checkbox.disabled = item.kind === 'tomorrow' || item.kind === 'upcoming' || isProtectedTask(item.task);
    checkbox.onclick = (e) => {
      e.stopPropagation();
      attemptResolveTaskOccurrence(item.task, item.occurrenceDate, effectiveTask.passive ? toggleTaskFailedMark : toggleTaskCompletion);
    };
    row.appendChild(checkbox);
  }

  const text = document.createElement('div');
  text.className = 'todo-item-text';

  const name = document.createElement('div');
  name.className = 'todo-item-name';
  // A task that's part of a mixed series (see isMixedSeries) is shown as
  // "[series name]: [task name]" so it reads as belonging to that group;
  // a single task or same-taskId recurring fragments just show their own
  // name, as before.
  const seriesLabelInfo = seriesRowLabelInfo(item.task.seriesId);
  name.textContent = seriesLabelInfo.mixed ? `${seriesLabelInfo.name}: ${effectiveTask.name}` : effectiveTask.name;
  text.appendChild(name);

  // Always rendered, even when empty -- so every row reserves the same
  // description line and they're all the same height (see .todo-item-desc),
  // instead of a description-less task's row being shorter than one with a
  // description.
  if (effectiveTask.description) {
    const desc = document.createElement('div');
    desc.className = 'todo-item-desc';
    desc.textContent = effectiveTask.description;
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
    const timer = rowOccurrence.timer;
    const remaining = currentTimerRemaining(timer);
    if (timer.mode === 'countup') {
      meta.textContent = t('todo.timerElapsed', { elapsed: formatElapsedDuration(timerElapsedSeconds(timer)) });
    } else if (remaining < 0) {
      meta.textContent = t('todo.timerElapsedPlanned', {
        elapsed: formatElapsedDuration(timerElapsedSeconds(timer)),
        planned: formatElapsedDuration(timer.totalSeconds),
      });
    } else {
      meta.textContent = t('todo.timerRemainingOfTotal', {
        remaining: formatTimerDuration(remaining),
        total: formatTimerDuration(timer.totalSeconds),
      });
    }
  } else {
    meta.textContent = effectiveTask.allDay
      ? item.kind === 'tomorrow'
        ? t('todo.tomorrowAllDay')
        : item.failed
          ? t('todo.failedWasDue', { date: item.occurrenceDate })
          : item.overdue && !item.completed
            ? t('todo.overdueSince', { date: item.occurrenceDate })
            : t('todo.allDay')
      : item.kind === 'tomorrow'
        ? t('todo.tomorrowAt', { time: formatTimeOfDay(effectiveTask.dueTime) })
        : item.failed
          ? t('todo.failedWasDueAt', { date: item.occurrenceDate, time: formatTimeOfDay(effectiveTask.dueTime) })
          : item.overdue && !item.completed
            ? t('todo.overdueSinceAt', { date: item.occurrenceDate, time: formatTimeOfDay(effectiveTask.dueTime) })
            : t('todo.due', { time: formatTimeOfDay(effectiveTask.dueTime) });
  }
  text.appendChild(meta);

  // Render description to reserve space and make all todo items same height.
  if (!effectiveTask.description) {
    const desc = document.createElement('div');
    desc.className = 'todo-item-desc';
    desc.textContent = effectiveTask.description;
    text.appendChild(desc);
  }

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
  // the timer instead. Excludes a locked occurrence too (see isLockedByLimit
  // above) -- there's nothing to work toward on a task that can't actually
  // be resolved right now.
  const canWorkOnNow = !effectiveTask.passive && (item.kind === 'today' || item.kind === 'carried-over') && !item.completed && !item.failed && !isLockedByLimit;
  if (canWorkOnNow) {
    const workOnBtn = document.createElement('button');
    workOnBtn.className = 'todo-work-on-btn' + (isActiveHere ? ' active' : '');
    workOnBtn.innerHTML = isActiveHere ? WORKING_ON_ICON : WORK_ON_ICON;
    workOnBtn.title = isActiveHere ? t('todo.stopWorking') : t('todo.workOnNow');
    workOnBtn.onclick = (e) => {
      e.stopPropagation();
      setActiveTaskId(isActiveHere ? null : item.task.id, item.occurrenceDate);
      // See the same guard in toggleTaskCompletion -- focusing/unfocusing is
      // a plain list action on narrow screens, not a request to see details.
      if (!isNarrowLayout()) selectTaskForSidePanel(item.task, item.occurrenceDate);
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
  // show it (both ignore Occurrence.dismissed -- see computeTodoDisplayItems/
  // computeAllTasksItems), so the button flips to undoing that instead.
  if (item.kind === 'carried-over') {
    const isDismissed = item.dismissed;
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'todo-focus-btn';
    dismissBtn.innerHTML = isDismissed ? SHOW_ICON : DISMISS_ICON;
    dismissBtn.title = isDismissed ? t('todo.showUndo') : t('todo.hideRemove');
    dismissBtn.onclick = (e) => {
      e.stopPropagation();
      if (isDismissed) restoreOccurrence(item.task, item.occurrenceDate);
      else dismissOccurrence(item.task, item.occurrenceDate);
    };
    row.appendChild(dismissBtn);
  }

  // Always available -- Task stats and Edit are plain actions with no
  // eligibility requirement of their own (except on a locked occurrence,
  // where showTodoContextMenu hides everything but Task stats -- see
  // isLockedByLimit). Everything else showTodoContextMenu offers is gated
  // the same as the buttons above (and hidden entirely for a not-yet-due
  // tomorrow/upcoming preview row).
  row.oncontextmenu = (e) => {
    e.preventDefault();
    selectTaskForSidePanel(item.task, item.occurrenceDate);
    showTodoContextMenu(e, item, canWorkOnNow, isLockedByLimit);
  };

  // Plain click (anything not otherwise handled above -- those all
  // stopPropagation their own clicks) just selects this task for the side
  // panel; it never focuses/edits/etc. on its own (see the comment above
  // canWorkOnNow). Clicking the already-selected row again deselects it
  // instead (see deselectSidePanelTask), same as pressing Escape.
  // Deliberately doesn't renderTodo() itself (selectTaskForSidePanel/
  // deselectSidePanelTask already handle the .selected accent without a
  // full rebuild, see refreshSelectedHighlight) -- replacing this row's own
  // DOM node mid-gesture broke the browser's double-click detection for
  // row.ondblclick below, since the second click then lands on a different
  // element than the first.
  row.onclick = () => {
    if (item.task === sidePanelTask && item.occurrenceDate === sidePanelOccurrenceDate) deselectSidePanelTask();
    else selectTaskForSidePanel(item.task, item.occurrenceDate);
  };

  // A locked occurrence has nothing to edit right now (see
  // isLockedByLimit/showTodoContextMenu's own equivalent above) -- offers
  // the same upgrade prompt instead of opening a form whose Save/Delete
  // couldn't do anything useful anyway.
  row.ondblclick = () => (isLockedByLimit ? offerSubscriptionUpgrade(t('subscribe.reasonTaskLimit')) : editTaskOccurrence(item.task, item.occurrenceDate));

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
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  for (const occurrence of occurrences) {
    if (!occurrence.timer) continue;
    const remaining = currentTimerRemaining(occurrence.timer);
    const ranPastCap = timerElapsedSeconds(occurrence.timer) >= MAX_TIMER_SECONDS;
    const countdownDone = occurrence.timer.mode !== 'countup' && !occurrence.timer.continuePastZero && remaining <= 0;
    if (countdownDone || ranPastCap) {
      if (occurrence.timer.runningSince != null) {
        occurrence.timerSeconds += Math.round((Date.now() - occurrence.timer.runningSince) / 1000); // whole seconds, see addFocusStat
      }
      occurrence.timer = null;
      occurrence.log.push({ message: 'Timer elapsed', timestamp: Date.now() });
      changed = true;
      playTimerChime();
      if (activeTask && activeTask.taskId === occurrence.taskId && activeOccurrenceDate === occurrence.occurrenceDate) {
        setActiveTaskId(null);
      }
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
    // A recurUntilCompleted task's missed occurrences are deliberately never
    // auto-dismissed -- they stay visible (see advanceRecurUntilCompletedTasks)
    // until the chain actually resolves, however old they get.
    if (task.recurUntilCompleted) continue;
    const priorDate = Recurrence.previousOccurrenceBefore(task, todayISO);
    const priorOccurrence = priorDate ? findOccurrence(task, priorDate) : null;
    if (!priorDate || (priorOccurrence && priorOccurrence.dismissed)) continue;
    if (priorDate < yesterdayISO) {
      ensureOccurrence(task, priorDate).dismissed = true;
      changed = true;
    }
  }
  if (changed) saveTasks();
}

// A recurUntilCompleted task's current pending Occurrence, once its due date
// has passed without being completed, gets pushed one day at a time (same
// due time) rather than going overdue/failed (see pastDueStatus) -- this is
// what actually does that pushing, backfilling one entry per day since the
// app was last open (see Recurrence.advanceRecurUntilCompletedChain), not
// just today's. The previous entries stay in the occurrence's own
// pendingReschedules (not replaced) -- occursOn treats every one of them as
// its own still-live occurrence until the chain is finally resolved (see
// resolveRecurUntilCompletedOccurrence), which is what keeps each of them
// visible on the to-do list rather than just the latest.
function advanceRecurUntilCompletedTasks() {
  const todayISO = Recurrence.dateToISO(new Date());
  let changed = false;
  for (const task of tasks) {
    if (!task.recurUntilCompleted) continue;
    const occurrence = findOccurrence(task, null);
    if (!occurrence) continue;
    const grown = Recurrence.advanceRecurUntilCompletedChain(Occurrence.recurrenceShim(task, occurrence), todayISO);
    if (grown !== occurrence.pendingReschedules) {
      occurrence.pendingReschedules = grown;
      changed = true;
    }
  }
  if (changed) saveTasks();
}

function renderTodo() {
  todoSeriesLabelCache = new Map();
  expireFinishedTimers();
  autoDismissStaleCarriedOverOccurrences();
  advanceRecurUntilCompletedTasks();
  updateTodoViewToggleButton();
  updateTodoMonthNav();

  if (tasks.length === 0) {
    todoSectionEl.classList.remove('hidden');
    renderTodoEmptyState();
    renderSidePanel();
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
    addBtn.title = t('todo.addTaskDue', { date: dateISO });
    addBtn.onclick = () => openTaskForm(null, dateISO);
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
    const firstColumnCount = Math.ceil(dayItems.length / 2);
    const columnItemLists = [dayItems.slice(0, firstColumnCount), dayItems.slice(firstColumnCount)];
    // Only draw the between-columns separator when there's actually a second
    // column of tasks to separate from -- a single task fills the first
    // column alone, leaving the second empty, so a border there would just
    // be a stray line next to nothing.
    columns.className = 'todo-day-columns' + (columnItemLists[1].length > 0 ? ' todo-day-columns-separated' : '');
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
  const activeOccurrence = activeTask ? findOccurrence(activeTask, activeOccurrenceDate) : null;
  const shouldTick = !!(activeOccurrence && activeOccurrence.timer && activeOccurrence.timer.runningSince != null);
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
// click/right-click/checkbox/focus/dismiss handlers). Scoped to just the one
// selected record ('occurrence'), every record sharing its taskId ('task' --
// e.g. every fragment of a recurring task that's been split via edit-scope),
// or its whole series ('series' -- every record sharing its seriesId, which
// can span multiple distinct taskIds once tasks have been merged together in
// the manage-tasks modal) -- see sidePanelScope/sidePanelRecords.
// ---------------------------------------------------------------------------

const sidePanelEl = document.querySelector('.side-panel');
const sidePanelEmptyEl = document.getElementById('side-panel-empty');
const sidePanelCloseBtn = document.getElementById('side-panel-close-btn');
const agendaToggleBtn = document.getElementById('agenda-toggle-btn');
const agendaCloseBtn = document.getElementById('agenda-close-btn');
const agendaAllDayEl = document.getElementById('agenda-all-day');
const agendaEmptyEl = document.getElementById('agenda-empty');
const agendaTimelineEl = document.getElementById('agenda-timeline');
const agendaTracksEl = document.getElementById('agenda-tracks');
const sidePanelContentEl = document.getElementById('side-panel-content');
const sidePanelTitleEl = document.getElementById('side-panel-title');
const sidePanelSummariesEl = document.getElementById('side-panel-task-summaries');
const sidePanelOccurrenceActionsEl = document.getElementById('side-panel-occurrence-actions');
const sidePanelScopeToggleEl = document.getElementById('side-panel-scope-toggle');
const sidePanelScopeToggleThumb = sidePanelScopeToggleEl.querySelector('.side-panel-scope-toggle-thumb');
const sidePanelScopeOpts = Array.from(sidePanelScopeToggleEl.querySelectorAll('.side-panel-scope-opt'));
const sidePanelEditToggleBtn = document.getElementById('side-panel-edit-toggle-btn');
const sidePanelCommentInput = document.getElementById('side-panel-comment-input');
const sidePanelCommentAddBtn = document.getElementById('side-panel-comment-add');
const sidePanelCommentsEl = document.getElementById('side-panel-comments');
const sidePanelLogEl = document.getElementById('side-panel-log');

const SIDE_PANEL_SCOPES = ['occurrence', 'task', 'series'];

// Sizes/positions the thumb off the active option's own rendered box rather
// than assuming equal thirds (see the CSS comment on .side-panel-scope-
// toggle-thumb) -- "Occurrence" is much wider than "Task"/"Series", so the
// buttons are naturally different widths themselves. Only meaningful while
// the panel is actually visible (renderSidePanel's own early return covers
// that); harmless no-op sizing off a 0-width button otherwise.
function updateSidePanelScopeThumb(activeIndex) {
  const activeBtn = sidePanelScopeOpts[activeIndex];
  sidePanelScopeToggleThumb.style.left = `${activeBtn.offsetLeft}px`;
  sidePanelScopeToggleThumb.style.width = `${activeBtn.offsetWidth}px`;
}

let sidePanelTask = null; // the specific task record last interacted with
// Which occurrence of sidePanelTask was actually clicked -- a recurring task
// can show more than one row at once (carried-over/today/tomorrow), and only
// 'occurrence' scope's own notes/log actually depend on which one this is
// (see sidePanelOccurrence/renderSidePanel); 'task'/'series' scope don't care.
let sidePanelOccurrenceDate = null;
let sidePanelScope = 'task'; // 'occurrence' | 'task' | 'series'
// Whether notes show their edit/delete controls -- off by default, and reset
// back off whenever a different task is selected (see the sidePanelTask
// comparison below), so it's never silently left armed against whatever task
// happens to be clicked next.
let sidePanelEditMode = false;

// Same breakpoint as the max-width: 1000px query (style.css) that turns the
// side panel into a full-screen drawer -- used by call sites below that
// select a task for the panel only as a side effect of some other action
// (checking it off, focusing it, ...), to skip actually opening that
// full-screen drawer on narrow screens where doing so would just get in the
// way of whatever the user actually clicked to do.
function isNarrowLayout() {
  return window.matchMedia('(max-width: 1000px)').matches;
}

// Narrow-screen-only (see the max-width: 1000px query, style.css): the side
// panel is a toggleable drawer there instead of a permanent column, and this
// is the drawer's own open/closed state for when nothing's selected --
// selecting a task always shows the panel regardless (see renderSidePanel),
// so this only matters for reaching today's agenda with nothing selected.
let agendaDrawerOpenNarrow = false;

function selectTaskForSidePanel(task, occurrenceDate) {
  if (task !== sidePanelTask || occurrenceDate !== sidePanelOccurrenceDate) sidePanelEditMode = false;
  sidePanelTask = task;
  sidePanelOccurrenceDate = occurrenceDate;
  // A task being selected already shows the panel on its own -- reset so
  // deselecting it later closes the panel back up instead of falling back
  // to a drawer left open from before this selection.
  agendaDrawerOpenNarrow = false;
  renderSidePanel();
  refreshSelectedHighlight();
}

// Clicking the already-selected row again, or pressing Escape, clears the
// side panel back to its empty state -- see row.onclick (buildTodoItemRow)
// and the document-level Escape listener below.
function deselectSidePanelTask() {
  sidePanelTask = null;
  sidePanelOccurrenceDate = null;
  sidePanelEditMode = false;
  renderSidePanel();
  refreshSelectedHighlight();
}

function openAgendaDrawer() {
  agendaDrawerOpenNarrow = true;
  renderSidePanel();
}

function closeAgendaDrawer() {
  agendaDrawerOpenNarrow = false;
  renderSidePanel();
}

agendaToggleBtn.onclick = openAgendaDrawer;
agendaCloseBtn.onclick = closeAgendaDrawer;
sidePanelCloseBtn.onclick = deselectSidePanelTask;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidePanelTask) deselectSidePanelTask();
});

// Retags which rendered .todo-item row(s) carry the .selected accent
// without rebuilding the list (renderTodo() does that too, as a side effect
// of recomputing each row's className from scratch, but a full rebuild on
// every plain click broke double-click-to-edit -- see row.onclick in
// buildTodoItemRow). Relies on each row's own __task back-reference.
function refreshSelectedHighlight() {
  document.querySelectorAll('.todo-item.selected').forEach((el) => el.classList.remove('selected'));
  if (!sidePanelTask) return;
  document.querySelectorAll('.todo-item').forEach((el) => {
    if (el.__task === sidePanelTask && el.__occurrenceDate === sidePanelOccurrenceDate) el.classList.add('selected');
  });
}

function sidePanelRecords() {
  if (!sidePanelTask) return [];
  if (sidePanelScope === 'series') return tasksInSeries(sidePanelTask.seriesId);
  if (sidePanelScope === 'task') return tasks.filter((t) => t.taskId === sidePanelTask.taskId);
  return [sidePanelTask];
}

// The one Occurrence row 'occurrence' scope shows notes/log for -- found (not
// created) so merely *viewing* the panel never materializes a row for a
// still-untouched occurrence; find-or-create only happens when the user
// actually adds a note/log entry against it (see the comment-add handler).
function sidePanelOccurrence() {
  if (!sidePanelTask || sidePanelOccurrenceDate == null) return null;
  return findOccurrence(sidePanelTask, sidePanelOccurrenceDate);
}

// Direct-management actions for the one selected Occurrence -- only ever
// shown in 'occurrence' scope, and only once a row is actually recorded
// (nothing to manage about a still-pending, never-touched date). "Edit this
// occurrence" reuses the general-info form's own 'instance' scope (or plain
// openTaskForm for a 'once' task) -- no new form logic needed. Reschedule/
// delete are further gated by Occurrence.canManageOccurrenceDirectly, see
// its own comment for why a recurUntilCompleted task's still-pending
// occurrence is excluded.
function renderSidePanelOccurrenceActions(task, occurrenceDate, occurrence) {
  sidePanelOccurrenceActionsEl.innerHTML = '';
  const show = occurrence && !isProtectedTask(task);
  sidePanelOccurrenceActionsEl.classList.toggle('hidden', !show);
  if (!show) return;

  const editBtn = document.createElement('button');
  editBtn.className = 'menu-btn-small';
  editBtn.textContent = t('occurrencePanel.editThisOccurrence');
  editBtn.onclick = () =>
    task.frequency.type === 'once' ? openTaskForm(task) : openTaskGeneralInfoForm(task, { occurrenceDate, scope: 'instance' });
  sidePanelOccurrenceActionsEl.appendChild(editBtn);

  const manageable = Occurrence.canManageOccurrenceDirectly(task, occurrence);
  const rescheduleBtn = document.createElement('button');
  rescheduleBtn.className = 'menu-btn-small';
  rescheduleBtn.textContent = t('occurrencePanel.reschedule');
  rescheduleBtn.disabled = !manageable;
  rescheduleBtn.title = manageable ? '' : t('occurrencePanel.blockedRecurUntilCompleted');
  rescheduleBtn.onclick = () => rescheduleOccurrencePrompt(task, occurrence);
  sidePanelOccurrenceActionsEl.appendChild(rescheduleBtn);

  if (manageable) appendDeleteButton(sidePanelOccurrenceActionsEl, () => deleteOccurrenceRecord(task, occurrenceDate));
}

async function rescheduleOccurrencePrompt(task, occurrence) {
  if (isProtectedTask(task) || !Occurrence.canManageOccurrenceDirectly(task, occurrence)) return;
  const result = await showFormModal(t('occurrencePanel.rescheduleTitle'), [
    { name: 'newDate', label: t('occurrencePanel.rescheduleDateLabel'), type: 'date', value: occurrence.occurrenceDate },
  ]);
  if (!result || result.newDate === occurrence.occurrenceDate) return;

  // Client-side pre-check against the already-loaded `occurrences` array --
  // avoids a round trip, and matters here specifically because saveTasks()
  // is fire-and-forget (errors only console.error'd), so a server-side
  // collision error would otherwise never surface to the user at all.
  if (findOccurrence(task, result.newDate)) {
    showInfoModal(t('occurrencePanel.rescheduleCollision'));
    return;
  }

  logOccurrenceEvent(task, occurrence.occurrenceDate, `Rescheduled to ${result.newDate}`);
  if (sidePanelOccurrenceDate === occurrence.occurrenceDate) sidePanelOccurrenceDate = result.newDate;
  // Recorded BEFORE moving occurrenceDate, so occursOnDate/Occurrence.isDateExcluded
  // can tell a vacated date apart from one that's simply never been touched
  // -- otherwise a still-matching pattern date (e.g. tomorrow, on a daily
  // task) would regenerate a phantom fresh occurrence right there the moment
  // this one moves off it.
  //
  // Moving forward past one or more of the task's own future occurrences
  // means skipping that whole in-between sequence, not just this single
  // occurrence's original date -- every pattern date the task would
  // otherwise still produce between the old date and the new one is excluded
  // too, so e.g. moving a daily task's today out to next week skips every
  // day in between instead of leaving them to resurface as fresh, unclaimed
  // occurrences right alongside the moved one. Recurrence continues from the
  // new date on regardless, since nothing about the underlying pattern
  // itself changes here -- only which of its dates are excluded (see
  // nextOccurrenceAfterDate/previousOccurrenceBeforeDate, which already skip
  // excluded dates the same way occursOnDate does). Moving BACKWARD doesn't
  // skip anything by the same logic -- there's no "future sequence" between
  // the new (earlier) date and the old one to speak of, just this one
  // occurrence relocating.
  if (!occurrence.pendingReschedules) occurrence.pendingReschedules = [];
  if (result.newDate > occurrence.occurrenceDate) {
    let cursor = occurrence.occurrenceDate;
    for (let i = 0; i < 3660 && cursor && cursor < result.newDate; i++) {
      occurrence.pendingReschedules.push(cursor);
      cursor = Recurrence.nextOccurrenceAfter(task, cursor);
    }
  } else {
    occurrence.pendingReschedules.push(occurrence.occurrenceDate);
  }
  occurrence.occurrenceDate = result.newDate;
  saveTasks();
  renderTodo();
  renderSidePanel();
}

function deleteOccurrenceRecord(task, occurrenceDate) {
  if (isProtectedTask(task)) return;
  const occurrence = findOccurrence(task, occurrenceDate);
  if (!occurrence || !Occurrence.canManageOccurrenceDirectly(task, occurrence)) return;
  occurrences.splice(occurrences.indexOf(occurrence), 1);
  logTaskEvent(task, 'Occurrence record deleted', occurrenceDate);
  saveTasks();
  renderTodo();
  renderSidePanel();
}

// ---------------------------------------------------------------------------
// Month-grid date picker -- a real calendar rather than a plain
// <input type="date">, whose own popup is native UI (and on Linux Chromium
// not even a calendar, see showFormModal's own comment on native dialogs).
// Resolves the picked 'YYYY-MM-DD', or null if cancelled. minISO/maxISO are
// inclusive (maxISO null = unbounded); rangeStartISO, if given, tints every
// date from it up to (not including) the one being picked, previewing the
// span the choice covers; summary(dateISO) is the line shown under the grid
// once a date is picked.
// ---------------------------------------------------------------------------

const datePickerOverlay = document.getElementById('date-picker-overlay');
const datePickerTitleEl = document.getElementById('date-picker-title');
const datePickerHintEl = document.getElementById('date-picker-hint');
const datePickerMonthEl = document.getElementById('date-picker-month');
const datePickerGridEl = document.getElementById('date-picker-grid');
const datePickerSummaryEl = document.getElementById('date-picker-summary');
const datePickerPrevBtn = document.getElementById('date-picker-prev');
const datePickerNextBtn = document.getElementById('date-picker-next');
const datePickerOkBtn = document.getElementById('date-picker-ok');
const datePickerCancelBtn = document.getElementById('date-picker-cancel');

function showDatePickerModal({ title, hint, minISO, maxISO = null, initialISO = null, rangeStartISO = null, summary }) {
  return new Promise((resolve) => {
    let selected = initialISO;
    let monthKey = monthKeyOf(initialISO || minISO);
    // Monday-first for Croatian, Sunday-first for English -- each locale's own
    // usual convention.
    const weekStart = currentUserLanguage === 'hr' ? 1 : 0;

    function render() {
      datePickerMonthEl.textContent = formatMonthLabel(monthKey);
      datePickerPrevBtn.disabled = monthKey <= monthKeyOf(minISO);
      datePickerNextBtn.disabled = !!maxISO && monthKey >= monthKeyOf(maxISO);
      datePickerGridEl.innerHTML = '';
      for (let i = 0; i < 7; i++) {
        const head = document.createElement('div');
        head.className = 'date-picker-weekday';
        // 2023-01-01 was a Sunday -- any known Sunday works as the base.
        head.textContent = new Date(2023, 0, 1 + ((weekStart + i) % 7)).toLocaleDateString(currentLocaleTag(), { weekday: 'short' });
        datePickerGridEl.appendChild(head);
      }
      const [y, m] = monthKey.split('-').map(Number);
      const leading = (new Date(y, m - 1, 1).getDay() - weekStart + 7) % 7;
      for (let i = 0; i < leading; i++) datePickerGridEl.appendChild(document.createElement('div'));
      const todayISO = Recurrence.dateToISO(new Date());
      for (let d = 1; d <= Recurrence.daysInMonth(y, m - 1); d++) {
        const iso = `${monthKey}-${String(d).padStart(2, '0')}`;
        const btn = document.createElement('button');
        btn.className =
          'date-picker-day' +
          (iso === todayISO ? ' today' : '') +
          (iso === selected ? ' selected' : '') +
          (rangeStartISO && selected && iso >= rangeStartISO && iso < selected ? ' in-range' : '');
        btn.textContent = String(d);
        btn.disabled = iso < minISO || (!!maxISO && iso > maxISO);
        btn.onclick = () => {
          selected = iso;
          render();
        };
        btn.ondblclick = () => finish(iso);
        datePickerGridEl.appendChild(btn);
      }
      datePickerOkBtn.disabled = !selected;
      datePickerSummaryEl.textContent = selected && summary ? summary(selected) : '';
    }

    function finish(value) {
      datePickerOverlay.classList.add('hidden');
      document.removeEventListener('keydown', onKey);
      resolve(value);
    }
    function onKey(e) {
      if (e.key === 'Escape') finish(null);
      else if (e.key === 'Enter' && selected) finish(selected);
    }

    datePickerTitleEl.textContent = title;
    datePickerHintEl.textContent = hint || '';
    datePickerPrevBtn.onclick = () => {
      monthKey = addMonthsToKey(monthKey, -1);
      render();
    };
    datePickerNextBtn.onclick = () => {
      monthKey = addMonthsToKey(monthKey, 1);
      render();
    };
    datePickerOkBtn.onclick = () => selected && finish(selected);
    datePickerCancelBtn.onclick = () => finish(null);
    document.addEventListener('keydown', onKey);
    render();
    datePickerOverlay.classList.remove('hidden');
  });
}

function formatShortDate(dateISO) {
  return new Date(dateISO + 'T00:00:00').toLocaleDateString(currentLocaleTag(), { day: 'numeric', month: 'short', year: 'numeric' });
}

// ---------------------------------------------------------------------------
// Pausing recurrence -- hides every occurrence from a right-clicked one
// (inclusive) up to a picked date, resuming on exactly that date (even one
// the pattern itself wouldn't land on) and continuing per the pattern from
// there. Earlier occurrences are untouched. Nothing is deleted: Occurrence
// rows inside the paused window stay in the data, just no longer belonging
// to any fragment's range (see Occurrence.occurrenceBelongsToFragment), so
// they simply stop showing.
//
// A plain recurring task is re-cut using the same fragment mechanics as a
// "this and following" split, rather than by moving its pattern's start to
// the picked date: several patterns are anchored on dueDate itself (every
// N days counts from it, monthly-by-day takes its day of month from it, ...),
// so re-anchoring there would quietly change the pattern. Instead:
//  - the fragment owning the right-clicked occurrence is truncated to end
//    right before it (or dropped, if it has no earlier occurrence left);
//  - a one-off 'once' fragment (same idea as promptManualOccurrence's)
//    covers the picked date, unless the pattern lands there anyway;
//  - the pattern carries on unchanged from its own first date on/after the
//    picked one (its phase preserved, since that's a date it already lands
//    on -- same reasoning applySplitEdit's own fragments rely on).
// Any later fragment of the same task starting inside the paused window
// (from a "this and following" edit on a future occurrence, or a manual
// occurrence) is dropped or moved up the same way, so nothing of it leaks
// into the pause either; whichever fragment is in effect on the picked date
// is the pattern that resumes.
//
// A recurUntilCompleted task has no pattern dates to cut -- just its one
// live pending Occurrence (see findOccurrence), which simply moves to the
// picked date, its carried-over chain cleared.
// ---------------------------------------------------------------------------

function canPauseRecurrence(item) {
  const { task, occurrenceDate } = item;
  if (isProtectedTask(task)) return false;
  if (task.recurUntilCompleted) {
    const occurrence = findOccurrence(task, occurrenceDate);
    return !!occurrence && occurrence.status === 'pending';
  }
  return task.frequency.type !== 'once' && !item.completed && !item.failed;
}

// The latest date the task can still occur on at all, across every
// recurring fragment of it -- null if any of them is open-ended.
function lastPossibleOccurrenceDate(task) {
  let last = '';
  for (const f of tasks) {
    if (f.taskId !== task.taskId || f.frequency.type === 'once') continue;
    if (!f.endDate) return null;
    if (f.endDate > last) last = f.endDate;
  }
  return last || task.endDate || null;
}

async function promptPauseRecurrence(task, occurrenceDate) {
  if (isProtectedTask(task)) return;
  const minISO = Recurrence.dateToISO(Recurrence.addDays(new Date(occurrenceDate + 'T00:00:00'), 1));
  const maxISO = task.recurUntilCompleted ? task.endDate || null : lastPossibleOccurrenceDate(task);
  if (maxISO && maxISO < minISO) {
    showInfoModal(t('pause.nothingAfter'));
    return;
  }
  const resumeISO = await showDatePickerModal({
    title: t('pause.title', { name: task.name }),
    hint: t('pause.hint', { date: formatShortDate(occurrenceDate) }),
    minISO,
    maxISO,
    rangeStartISO: occurrenceDate,
    summary: (d) =>
      t('pause.summary', {
        from: formatShortDate(occurrenceDate),
        to: formatShortDate(Recurrence.dateToISO(Recurrence.addDays(new Date(d + 'T00:00:00'), -1))),
        resume: formatShortDate(d),
      }),
  });
  if (!resumeISO) return;

  const applied = task.recurUntilCompleted
    ? pauseRecurUntilCompletedOccurrence(task, occurrenceDate, resumeISO)
    : pausePlainRecurrence(task, occurrenceDate, resumeISO);
  if (!applied) return;
  saveTasks();
  renderTodo();
  renderSidePanel();
  refreshTodoManageModal();
}

// Drops any focus/selection sitting on a date that's about to stop existing
// (inside the paused window) -- the active task's timer is checkpointed on
// the way out, same as any other unfocus.
function releaseOccurrenceDatesForPause(taskId, fromISO, beforeISO) {
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  if (activeTask && activeTask.taskId === taskId && activeOccurrenceDate >= fromISO && activeOccurrenceDate < beforeISO) {
    setActiveTaskId(null);
  }
  if (sidePanelTask && sidePanelTask.taskId === taskId && sidePanelOccurrenceDate >= fromISO && sidePanelOccurrenceDate < beforeISO) {
    deselectSidePanelTask();
  }
}

function pauseRecurUntilCompletedOccurrence(task, occurrenceDate, resumeISO) {
  const occurrence = findOccurrence(task, occurrenceDate);
  if (!occurrence || occurrence.status !== 'pending') return false;
  const collision = occurrences.find((o) => o !== occurrence && o.taskId === task.taskId && o.occurrenceDate === resumeISO);
  if (collision) {
    showInfoModal(t('occurrencePanel.rescheduleCollision'));
    return false;
  }
  releaseOccurrenceDatesForPause(task.taskId, occurrence.occurrenceDate, resumeISO);
  occurrence.log.push({ message: `Recurrence paused until ${resumeISO}`, timestamp: Date.now() });
  occurrence.occurrenceDate = resumeISO;
  occurrence.pendingReschedules = [];
  occurrence.dismissed = false;
  return true;
}

function pausePlainRecurrence(owner, pauseFromISO, resumeISO) {
  const fragments = tasks.filter((f) => f.taskId === owner.taskId);
  if (fragments.some((f) => f.recurUntilCompleted)) {
    // A task that's been recurUntilCompleted for part of its history and not
    // for another -- rare enough, and ambiguous enough about what "resume"
    // should mean, not to guess at.
    showInfoModal(t('pause.unsupportedMixed'));
    return false;
  }
  const covers = (f, d) => f.dueDate <= d && (!f.endDate || f.endDate >= d);
  // The pattern in effect on the resume date: the owner itself, or a later
  // recurring fragment starting inside the window. Fragments never overlap,
  // so there's at most one.
  const governing = fragments.find((f) => f.frequency.type !== 'once' && covers(f, resumeISO) && (f === owner || f.dueDate > pauseFromISO));
  if (!governing) {
    showInfoModal(t('pause.nothingAfter'));
    return false;
  }

  releaseOccurrenceDatesForPause(owner.taskId, pauseFromISO, resumeISO);

  // Computed before anything below changes the fragments they depend on.
  const ownerPrev = previousOccurrenceBeforeDate(owner, pauseFromISO);
  const governingEndDate = governing.endDate || null;
  const resumeIsPatternDate = occursOnDate(governing, resumeISO);
  const continueFrom = resumeIsPatternDate ? resumeISO : nextOccurrenceAfterDate(governing, resumeISO);

  // Every Task-level note/log entry of a fragment that's dropped here is
  // carried over onto whichever record survives (see `heir` below), not lost
  // along with it.
  const dropped = [];
  const drop = (f) => {
    if (!dropped.includes(f)) dropped.push(f);
  };
  // Anything else starting inside the window -- a later fragment wholly
  // paused, or a manual one-off occurrence there -- goes entirely.
  for (const f of fragments) {
    if (f !== owner && f !== governing && f.dueDate >= pauseFromISO && f.dueDate < resumeISO) drop(f);
  }

  let continuation = null;
  if (governing === owner) {
    if (continueFrom) {
      continuation = { ...owner, id: uid(), dueDate: continueFrom, endDate: governingEndDate, log: [], comments: [] };
    }
  } else if (continueFrom) {
    governing.dueDate = continueFrom; // starts inside the window -- moved up to where it resumes
    continuation = governing;
  } else {
    drop(governing);
  }
  if (ownerPrev) owner.endDate = ownerPrev;
  else drop(owner); // nothing of it left before the pause

  // A manual one-off already sitting on the resume date covers it just the
  // same (it's outside the window, so the loop above left it alone).
  const resumeAlreadyCovered = resumeIsPatternDate || fragments.some((f) => f.frequency.type === 'once' && f.dueDate === resumeISO);
  const resumeFragment = resumeAlreadyCovered
    ? null
    : { ...governing, id: uid(), dueDate: resumeISO, endDate: null, frequency: { type: 'once', interval: 1 }, log: [], comments: [] };

  const heir = continuation || resumeFragment || (ownerPrev ? owner : null);
  for (const f of dropped) {
    if (heir && f !== heir) {
      heir.log = [...(heir.log || []), ...(f.log || [])];
      heir.comments = [...(heir.comments || []), ...(f.comments || [])];
    }
  }
  tasks = tasks.filter((f) => !dropped.includes(f));
  if (resumeFragment) tasks.push(resumeFragment);
  if (continuation && continuation !== governing) tasks.push(continuation);
  if (heir) logTaskEvent(heir, `Recurrence paused until ${resumeISO}`, pauseFromISO);
  return true;
}

function buildSidePanelEmptyRow(text) {
  const empty = document.createElement('div');
  empty.className = 'todo-manage-empty';
  empty.textContent = text;
  return empty;
}

// ---------------------------------------------------------------------------
// Today's agenda -- shown in the side panel in place of the notes/history
// view (see renderSidePanel) whenever nothing is selected, since that space
// would otherwise just sit empty. A simple day timeline: passive tasks as
// semi-transparent bands from midnight to their due time, all-day tasks
// (passive ones included) as pills above it, everything else as a block
// positioned/sized around its own due time (see agendaBlockRange below).
// ---------------------------------------------------------------------------

const AGENDA_HOUR_HEIGHT = 44; // px per hour of the rendered timeline
const AGENDA_DEFAULT_LEAD_MINUTES = 30;

// Same colors, and the same override order, as .todo-item-name's own CSS
// cascade (style.css) -- completed/failed/all-day/appointment/passive rules
// there all target .todo-item-name at equal specificity, so whichever is
// declared LAST in the stylesheet wins for an item tagged with more than one
// (e.g. a completed all-day task). Reproduced here as sequential overwrites
// in that same order so an occurrence's agenda color always matches its own
// title color in the to-do list, whatever combination of flags it has.
function resolveAgendaColor(task, completed, failed) {
  let color = '#e8eaed';
  if (completed) color = '#fff';
  if (failed) color = '#f28b82';
  if (task.allDay) color = '#8ab4f8';
  if (task.appointment && !failed) color = '#81c995';
  if (task.passive && !failed) color = '#bcaaa4';
  return color;
}

function agendaHexToRgba(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function agendaTimeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// Average (focused + timer) minutes per occurrence, counting only
// occurrences that were both completed and actually had some measured focus
// time logged against them -- an occurrence that was never focused on, or
// never finished, says nothing about how long this task actually takes, so
// both are excluded rather than dragging the average toward zero. null
// (rather than 0) signals "no measurements at all", so callers can fall back
// to a plain default instead of showing a zero-length block. Scoped to this
// one task (its taskId, i.e. every fragment of it), never its whole series:
// a series groups otherwise unrelated tasks, whose durations say nothing
// about this one's.
function averageFocusedMinutesForCompletedOccurrences(task) {
  let totalSeconds = 0;
  let qualifyingCount = 0;
  for (const occurrence of occurrences) {
    if (occurrence.taskId !== task.taskId || occurrence.status !== 'completed') continue;
    const seconds = (occurrence.focusedSeconds || 0) + (occurrence.timerSeconds || 0);
    if (seconds <= 0) continue;
    totalSeconds += seconds;
    qualifyingCount++;
  }
  return qualifyingCount === 0 ? null : totalSeconds / qualifyingCount / 60;
}

function agendaDurationMinutes(task) {
  const avg = averageFocusedMinutesForCompletedOccurrences(task);
  return avg === null ? AGENDA_DEFAULT_LEAD_MINUTES : avg;
}

// One entry per task occurring today, in whatever state it's currently in
// (done, failed, neither) -- same derivation computeAllTasksItems uses, just
// for today alone rather than a whole viewed month.
//
// effectiveTask (Occurrence.applyOverrides, same as buildTodoItemRow's own
// rowOccurrence handling) is what every display/positioning decision below
// is based on -- a "this occurrence only" edit (or drag-reschedule, see
// rescheduleAgendaItem) stores its override on today's own Occurrence row,
// not on the task, so the agenda has to look there too or it'd keep showing
// the task's un-overridden due time. `task` itself stays the real record,
// for identity (drag-reschedule needs it to know what to edit).
//
// draggable mirrors buildTodoItemRow's isLockedByLimit gate for its own Edit
// action (same context-menu item drag-reschedule is a shortcut for) -- a
// protected task (the subscription nag) or one beyond a lapsed
// subscription's grandfathered set can't be edited there either, so it isn't
// here.
function buildTodayAgendaItems() {
  const now = new Date();
  const todayISO = Recurrence.dateToISO(now);
  const items = [];
  for (const task of tasks) {
    if (!occursOnDate(task, todayISO)) continue;
    const occurrence = findOccurrence(task, todayISO);
    const effectiveTask = Occurrence.applyOverrides(task, occurrence);
    const completed = !!(occurrence && occurrence.status === 'completed');
    const { failed } = completed ? { failed: false } : pastDueStatus(effectiveTask, todayISO, completed, now);
    const isResolved = effectiveTask.passive ? failed : completed;
    const isLockedByLimit = !isResolved && !isProtectedTask(task) && !canCompleteOrNoteTask(task);
    items.push({
      task,
      occurrenceDate: todayISO,
      effectiveTask,
      completed,
      failed,
      color: resolveAgendaColor(effectiveTask, completed, failed),
      draggable: !isProtectedTask(task) && !isLockedByLimit,
      isLockedByLimit,
      // Same "Work on this now" eligibility as buildTodoItemRow's own -- the
      // agenda only ever shows today, so the kind check there is implied.
      canWorkOnNow: !effectiveTask.passive && !completed && !failed && !isLockedByLimit,
    });
  }
  return items;
}

// Right-click on anything on the agenda opens the very same menu as the
// to-do row for that occurrence (showTodoContextMenu). Unlike a row, it
// doesn't also select the task: selecting swaps the agenda out for the
// task's notes (see renderSidePanel), which would yank away what was just
// right-clicked.
function attachAgendaContextMenu(el, item) {
  el.oncontextmenu = (e) => {
    e.preventDefault();
    const menuItem = {
      task: item.task,
      occurrenceDate: item.occurrenceDate,
      completed: item.completed,
      failed: item.failed,
      dismissed: false,
      kind: 'today',
    };
    showTodoContextMenu(e, menuItem, item.canWorkOnNow, item.isLockedByLimit);
  };
}

function buildAgendaAllDayPill(item) {
  const pill = document.createElement('div');
  pill.className = 'agenda-all-day-pill' + (item.completed ? ' completed' : '');
  pill.style.background = agendaHexToRgba(item.color, 0.85);
  pill.textContent = item.effectiveTask.name;
  pill.title = item.effectiveTask.name;
  attachAgendaContextMenu(pill, item);
  return pill;
}

function buildAgendaHourLine(hour) {
  const row = document.createElement('div');
  row.className = 'agenda-hour-line';
  row.style.top = `${hour * AGENDA_HOUR_HEIGHT}px`;
  const label = document.createElement('span');
  label.className = 'agenda-hour-label';
  label.textContent = formatTimeOfDay(`${String(hour).padStart(2, '0')}:00`);
  row.appendChild(label);
  return row;
}

// Semi-transparent cover from the start of the day to the task's own due
// time -- deliberately not a same-height-as-the-hour-grid opaque block like
// .agenda-block below, since a passive task doesn't occupy a specific span
// of time the way a real block does, it's just "not done yet, sometime
// before this".
function buildAgendaPassiveBand(item) {
  const band = document.createElement('div');
  band.className = 'agenda-passive-band';
  const dueMinutes = agendaTimeToMinutes(item.effectiveTask.dueTime);
  band.style.height = `${(dueMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
  band.style.background = agendaHexToRgba(item.color, 0.16);
  const label = document.createElement('span');
  label.className = 'agenda-passive-band-label';
  label.style.color = item.color;
  label.textContent = item.effectiveTask.name;
  attachAgendaContextMenu(label, item); // the band itself is click-through, see style.css
  band.appendChild(label);
  band.title = `${item.effectiveTask.name} · ${t('todo.due', { time: formatTimeOfDay(item.effectiveTask.dueTime) })}`;
  return band;
}

// Greedily assigns each block the first column whose last-placed block ends
// at or before this one's own start, opening a new column otherwise --
// standard interval-graph column packing, so two same-day blocks never
// render on top of each other. Not scoped to just the specific cluster of
// blocks that actually overlap (every block on the day shares the same
// column count) -- simpler, at the cost of occasionally splitting a block
// into a narrower column than it strictly needs when unrelated blocks
// elsewhere in the day happen to need more columns.
function assignAgendaColumns(blocks) {
  const sorted = blocks.slice().sort((a, b) => a.startMinutes - b.startMinutes);
  const columnEnds = [];
  for (const block of sorted) {
    let column = columnEnds.findIndex((end) => end <= block.startMinutes);
    if (column === -1) {
      column = columnEnds.length;
      columnEnds.push(block.endMinutes);
    } else {
      columnEnds[column] = block.endMinutes;
    }
    block.column = column;
  }
  const totalColumns = columnEnds.length || 1;
  for (const block of blocks) block.totalColumns = totalColumns;
}

// An ordinary task's block ends at its due time and starts agendaDuration-
// Minutes before it (working *toward* the deadline); an appointment's block
// instead starts at its due time and runs that same duration *past* it (the
// due time is when it begins, not a deadline). Clamped to the visible day
// (a very early due time with a long lead could otherwise start before
// midnight) -- the block just starts at the top of the timeline instead.
// Split out from agendaBlockRange so attachAgendaBlockDrag can recompute the
// same start/end shape live, from a candidate due time that isn't saved
// (i.e. doesn't exist as a task/occurrence yet) while a drag is in progress.
function agendaRangeForDueMinutes(dueMinutes, durationMinutes, appointment) {
  if (appointment) return { startMinutes: dueMinutes, endMinutes: dueMinutes + durationMinutes };
  return { startMinutes: Math.max(0, dueMinutes - durationMinutes), endMinutes: dueMinutes };
}

function agendaBlockRange(task) {
  return agendaRangeForDueMinutes(agendaTimeToMinutes(task.dueTime), agendaDurationMinutes(task), task.appointment);
}

// Inverse of agendaTimeToMinutes -- clamped to a single day, since a drag can
// otherwise walk the candidate due time past midnight in either direction.
function agendaMinutesToTime(totalMinutes) {
  const clamped = Math.max(0, Math.min(24 * 60 - 1, Math.round(totalMinutes)));
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const AGENDA_DRAG_SNAP_MINUTES = 15;

// Drag-to-reschedule for a timed block -- vertical mouse movement changes
// the candidate due time, snapped to the nearest 15 minutes by default or to
// the exact minute while Ctrl is held. Read live off each mousemove/mouseup
// event's own ctrlKey rather than a separate keydown/keyup pair, so it
// reflects whatever's actually held at each point of the drag regardless of
// which element (if any) has keyboard focus.
//
// Only top/height/the time label move live, for feedback -- left/width
// (column packing) and every other block on the day stay put until the drop
// actually resolves; renderTodo() (called by rescheduleAgendaItem either
// way, committed or cancelled) throws this whole DOM subtree away and
// rebuilds it from the real, saved state, discarding these inline styles
// along with it, so there's nothing to reset by hand on cancel.
function attachAgendaBlockDrag(el, item) {
  const durationMinutes = agendaDurationMinutes(item.effectiveTask);
  const originalDueMinutes = agendaTimeToMinutes(item.effectiveTask.dueTime);
  const timeEl = el.querySelector('.agenda-block-time');

  el.addEventListener('mousedown', (downEvent) => {
    if (downEvent.button !== 0) return;
    downEvent.preventDefault();
    const startClientY = downEvent.clientY;
    let latestDueMinutes = originalDueMinutes;
    el.classList.add('dragging');

    function onMouseMove(moveEvent) {
      const deltaMinutes = ((moveEvent.clientY - startClientY) / AGENDA_HOUR_HEIGHT) * 60;
      const step = moveEvent.ctrlKey ? 1 : AGENDA_DRAG_SNAP_MINUTES;
      const rawMinutes = originalDueMinutes + deltaMinutes;
      latestDueMinutes = Math.max(0, Math.min(24 * 60 - 1, Math.round(rawMinutes / step) * step));
      const range = agendaRangeForDueMinutes(latestDueMinutes, durationMinutes, item.effectiveTask.appointment);
      el.style.top = `${(range.startMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
      el.style.height = `${((range.endMinutes - range.startMinutes) / 60) * AGENDA_HOUR_HEIGHT}px`;
      if (timeEl) timeEl.textContent = formatTimeOfDay(agendaMinutesToTime(latestDueMinutes));
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      el.classList.remove('dragging');
      rescheduleAgendaItem(item.task, item.occurrenceDate, agendaMinutesToTime(latestDueMinutes));
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

// Applies a drag-reschedule's dropped due time -- same "which occurrence(s)"
// choice (showEditScopeChoice) and the same underlying apply functions
// (applyGeneralInfoInPlace/applySplitEdit) as a manual edit through
// openTaskGeneralInfoForm, just with only dueTime actually changing and
// everything else carried through from the occurrence's current effective
// fields untouched -- so a drag produces exactly the same kind of record
// (and the same activity-log entries) a form edit would. A 'once' task skips
// the scope choice entirely, same shortcut editTaskOccurrence uses, since
// there's nothing to split.
//
// Called unconditionally on drop (whatever the outcome) so renderTodo()
// always runs -- see attachAgendaBlockDrag's own comment on why that's what
// discards the live-drag inline styles, dropped-back-to-the-same-time and
// cancelled-scope-choice alike.
async function rescheduleAgendaItem(task, occurrenceDate, newDueTime) {
  const effective = Occurrence.applyOverrides(task, findOccurrence(task, occurrenceDate));
  let changed = false;
  if (effective.dueTime !== newDueTime) {
    const fields = {
      name: effective.name,
      description: effective.description,
      details: effective.details,
      dueTime: newDueTime,
      allDay: effective.allDay,
      appointment: effective.appointment,
      passive: effective.passive,
    };
    if (task.frequency.type === 'once') {
      applyGeneralInfoInPlace(task, fields);
      changed = true;
    } else {
      const scope = await showEditScopeChoice();
      if (scope === 'all') {
        applyGeneralInfoInPlace(task, fields);
        changed = true;
      } else if (scope) {
        applySplitEdit(task, { originalOccurrenceDate: occurrenceDate, newOccurrenceDate: occurrenceDate, scope }, fields);
        changed = true;
      }
    }
  }
  if (changed) saveTasks();
  renderTodo();
}

function buildAgendaBlock(block) {
  const el = document.createElement('div');
  el.className = 'agenda-block' + (block.item.completed ? ' completed' : '') + (block.item.draggable ? ' draggable' : '');
  el.style.top = `${(block.startMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
  el.style.height = `${((block.endMinutes - block.startMinutes) / 60) * AGENDA_HOUR_HEIGHT}px`;
  const widthPercent = 100 / block.totalColumns;
  el.style.left = `${widthPercent * block.column}%`;
  el.style.width = `calc(${widthPercent}% - 4px)`;
  el.style.background = agendaHexToRgba(block.item.color, 0.5);

  const name = document.createElement('div');
  name.className = 'agenda-block-name';
  name.textContent = block.item.effectiveTask.name;
  el.appendChild(name);

  const time = document.createElement('div');
  time.className = 'agenda-block-time';
  time.textContent = formatTimeOfDay(block.item.effectiveTask.dueTime);
  el.appendChild(time);

  el.title = block.item.effectiveTask.name;
  if (block.item.draggable) attachAgendaBlockDrag(el, block.item);
  attachAgendaContextMenu(el, block.item);
  return el;
}

function renderTodayAgenda() {
  const items = buildTodayAgendaItems();

  agendaAllDayEl.innerHTML = '';
  for (const item of items.filter((i) => i.effectiveTask.allDay)) {
    agendaAllDayEl.appendChild(buildAgendaAllDayPill(item));
  }

  // Hour lines/labels are direct children of .agenda-timeline (they span its
  // full width, gutter included); .agenda-tracks is the one static child
  // that must survive this clear -- everything actually representing a task
  // goes in there instead (see .agenda-tracks, style.css).
  agendaTimelineEl.querySelectorAll('.agenda-hour-line').forEach((el) => el.remove());
  for (let h = 0; h < 24; h++) agendaTimelineEl.appendChild(buildAgendaHourLine(h));

  agendaTracksEl.innerHTML = '';
  const timedItems = items.filter((i) => !i.effectiveTask.allDay);
  for (const item of timedItems.filter((i) => i.effectiveTask.passive)) {
    agendaTracksEl.appendChild(buildAgendaPassiveBand(item));
  }

  const blocks = timedItems
    .filter((i) => !i.effectiveTask.passive)
    .map((item) => ({ item, ...agendaBlockRange(item.effectiveTask) }));
  assignAgendaColumns(blocks);
  for (const block of blocks) agendaTracksEl.appendChild(buildAgendaBlock(block));

  agendaEmptyEl.classList.toggle('hidden', items.length > 0);
}

async function editCommentPrompt(comment) {
  const result = await showFormModal(t('sidePanel.editNote'), [{ name: 'text', label: t('sidePanel.noteLabel'), type: 'textarea', value: comment.text }]);
  if (!result) return;
  comment.text = result.text;
  saveTasks();
  renderSidePanel();
}

// `task` is the specific record `comment` actually lives on -- not
// necessarily sidePanelTask, since the comments list here can be merged
// across a whole series (see sidePanelRecords) -- needed so a delete can
// splice it out of the right record's own `comments` array. `showTaskInfo`
// mirrors buildSidePanelLogRow's own parameter: only worth naming the task
// when the panel is merging multiple records together (series scope) --
// in single-task scope every note already obviously belongs to the one
// task on screen.
function buildSidePanelCommentRow(owner, comment, label) {
  const item = document.createElement('div');
  item.className = 'side-panel-comment-item';

  const topRow = document.createElement('div');
  topRow.className = 'side-panel-comment-top-row';
  const time = document.createElement('div');
  time.className = 'side-panel-comment-time';
  time.textContent = label ? `${label} · ${formatDateTime(comment.timestamp)}` : formatDateTime(comment.timestamp);
  topRow.appendChild(time);

  if (sidePanelEditMode) {
    const actions = document.createElement('div');
    actions.className = 'side-panel-comment-actions';

    const editBtn = document.createElement('button');
    editBtn.title = t('sidePanel.editNote');
    editBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
    editBtn.onclick = () => editCommentPrompt(comment);
    actions.appendChild(editBtn);

    appendDeleteButton(actions, () => {
      owner.comments.splice(owner.comments.indexOf(comment), 1);
      saveTasks();
      renderSidePanel();
    });

    topRow.appendChild(actions);
  }

  item.appendChild(topRow);
  const text = document.createElement('div');
  text.className = 'side-panel-comment-text';
  text.textContent = comment.text;
  item.appendChild(text);
  return item;
}

// `label` (name + the occurrence it was actually about, precomputed by the
// caller -- see renderSidePanel) is shown inline only when the panel is
// merging multiple records together ('task'/'series' scope): in 'occurrence'
// scope every entry already obviously belongs to the one occurrence on
// screen, so naming it again on every row would just be noise. Description
// isn't repeated here even in series scope -- it's already shown once per
// task in the task-summaries block at the top of the panel (see
// buildSidePanelTaskSummary).
function buildSidePanelLogRow(entry, label) {
  const item = document.createElement('div');
  item.className = 'side-panel-log-item';

  const topRow = document.createElement('div');
  topRow.className = 'side-panel-log-top-row';
  const msg = document.createElement('span');
  msg.className = 'side-panel-log-message';
  msg.textContent = label ? `${label} -- ${entry.message}` : entry.message;
  const time = document.createElement('span');
  time.className = 'side-panel-log-time';
  time.textContent = formatDateTime(entry.timestamp);
  topRow.appendChild(msg);
  topRow.appendChild(time);
  item.appendChild(topRow);

  return item;
}

// Any surviving fragment sharing taskId will do -- purely a display label
// for an Occurrence-level comment/log entry in 'task'/'series' scope; a
// name difference across split fragments isn't worth chasing down here.
function taskNameForId(taskId) {
  const match = tasks.find((t) => t.taskId === taskId);
  return match ? match.name : '';
}

// One block per task record -- its own name/description/details, since
// fragments of a split recurring task or members of a merged series can
// differ on any of those.
function buildSidePanelTaskSummary(task) {
  const item = document.createElement('div');
  item.className = 'side-panel-task-summary';

  const name = document.createElement('div');
  name.className = 'side-panel-task-summary-name';
  name.textContent = task.name;
  item.appendChild(name);

  if (task.description) {
    const description = document.createElement('div');
    description.className = 'side-panel-task-summary-desc';
    description.textContent = task.description;
    item.appendChild(description);
  }

  if (task.details) {
    const details = document.createElement('div');
    details.className = 'side-panel-task-summary-details';
    details.textContent = task.details;
    item.appendChild(details);
  }

  return item;
}

function renderSidePanel() {
  // The selected record can vanish out from under the panel (deleted, or
  // merged away -- tasksInSeries/taskId lookups above would just silently
  // return nothing for it), so this doubles as the panel's own cleanup.
  if (!sidePanelTask || !tasks.includes(sidePanelTask)) {
    sidePanelTask = null;
    sidePanelOccurrenceDate = null;
  }

  // Narrow screens only (see style.css) -- irrelevant at normal widths,
  // where .side-panel is always visible via its own permanent column and
  // neither class has a rule to match against there. The panel is a
  // full-screen drawer at that width (see the max-width: 1000px query), so
  // whatever's underneath it (app-main's own narrow-overlay-open rule hides
  // .todo-column entirely) would otherwise still be sitting there for
  // keyboard/screen-reader focus to land on, or just visually cluttering
  // things up through the panel's own translucent background.
  const narrowPanelVisible = !!sidePanelTask || agendaDrawerOpenNarrow;
  sidePanelEl.classList.toggle('side-panel-narrow-visible', narrowPanelVisible);
  appMainEl.classList.toggle('narrow-overlay-open', narrowPanelVisible);

  if (!sidePanelTask) {
    sidePanelEmptyEl.classList.remove('hidden');
    sidePanelContentEl.classList.add('hidden');
    renderTodayAgenda();
    return;
  }

  sidePanelEmptyEl.classList.add('hidden');
  sidePanelContentEl.classList.remove('hidden');
  // Only a mixed series (see isMixedSeries) has a series name worth
  // showing above the individual task summaries below; a single task or
  // same-taskId recurring fragments have nothing to add there.
  const mixedSeries = isMixedSeries(sidePanelTask.seriesId);
  sidePanelTitleEl.textContent = mixedSeries ? getSeriesName(sidePanelTask.seriesId) : '';
  sidePanelTitleEl.classList.toggle('hidden', !mixedSeries);
  const scopeIndex = SIDE_PANEL_SCOPES.indexOf(sidePanelScope);
  sidePanelScopeOpts.forEach((btn, i) => btn.classList.toggle('active', i === scopeIndex));
  updateSidePanelScopeThumb(scopeIndex);
  sidePanelEditToggleBtn.textContent = sidePanelEditMode ? t('sidePanel.done') : t('common.edit');
  sidePanelEditToggleBtn.title = sidePanelEditMode ? t('sidePanel.stopEditing') : t('sidePanel.editOrDelete');
  sidePanelEditToggleBtn.classList.toggle('active', sidePanelEditMode);

  // Prefixes the same padlock used in the to-do list/Manage Tasks modal onto
  // the label -- managed here (not via data-i18n on the button itself, see
  // index.html) since the label alone can't express the lock, and
  // applyStaticTranslations' plain `textContent = t(...)` would wipe out an
  // icon child on every language change anyway.
  const commentAddLocked = !isProtectedTask(sidePanelTask) && !canCompleteOrNoteTask(sidePanelTask);
  sidePanelCommentAddBtn.innerHTML = (commentAddLocked ? LOCK_ICON : '') + t('sidePanel.addNote');
  sidePanelCommentAddBtn.classList.toggle('locked', commentAddLocked);

  const records = sidePanelRecords();
  // Only single-record ('occurrence') scope has just the one selected
  // record's own name/description/details to show -- 'task' and 'series'
  // both merge multiple records, whose fragments/members can differ on any
  // of those, so every one of them gets its own summary block.
  const showTaskInfo = sidePanelScope !== 'occurrence';

  sidePanelSummariesEl.innerHTML = '';
  if (showTaskInfo) {
    const sortedRecords = records.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    for (const t of sortedRecords) sidePanelSummariesEl.appendChild(buildSidePanelTaskSummary(t));
  } else {
    sidePanelSummariesEl.appendChild(buildSidePanelTaskSummary(sidePanelTask));
  }

  // 'occurrence' scope shows only the one selected Occurrence's own
  // comments/log; 'task'/'series' scope unions every in-scope record's
  // Task-level comments/log (general, not tied to one date) with every
  // Occurrence row's for their taskIds (per-date) -- see occurrence.js's own
  // module comment on why these are two separate buckets. Paired with the
  // owning record (not just the comment itself) so edits/deletes -- only
  // offered once sidePanelEditMode is on -- can mutate the right record's
  // own `comments` array.
  const commentEntries = [];
  const logEntries = [];
  if (sidePanelScope === 'occurrence') {
    const occurrence = sidePanelOccurrence();
    renderSidePanelOccurrenceActions(sidePanelTask, sidePanelOccurrenceDate, occurrence);
    if (occurrence) {
      for (const comment of occurrence.comments) commentEntries.push({ owner: occurrence, comment, label: null });
      for (const entry of occurrence.log) logEntries.push({ entry, label: null });
    }
  } else {
    renderSidePanelOccurrenceActions(sidePanelTask, sidePanelOccurrenceDate, null);
    for (const rec of records) {
      for (const comment of rec.comments || []) commentEntries.push({ owner: rec, comment, label: rec.name });
      for (const entry of rec.log || []) logEntries.push({ entry, label: `${rec.name}, ${entry.occurrenceDate || rec.dueDate}` });
    }
    const taskIds = new Set(records.map((rec) => rec.taskId));
    for (const occurrence of occurrences) {
      if (!taskIds.has(occurrence.taskId)) continue;
      const label = `${taskNameForId(occurrence.taskId)}, ${occurrence.occurrenceDate}`;
      for (const comment of occurrence.comments) commentEntries.push({ owner: occurrence, comment, label });
      for (const entry of occurrence.log) logEntries.push({ entry, label });
    }
  }
  commentEntries.sort((a, b) => b.comment.timestamp - a.comment.timestamp);
  logEntries.sort((a, b) => b.entry.timestamp - a.entry.timestamp);

  sidePanelCommentsEl.innerHTML = '';
  if (commentEntries.length === 0) {
    sidePanelCommentsEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noNotes')));
  } else {
    for (const { owner, comment, label } of commentEntries) {
      sidePanelCommentsEl.appendChild(buildSidePanelCommentRow(owner, comment, label));
    }
  }

  sidePanelLogEl.innerHTML = '';
  if (logEntries.length === 0) {
    sidePanelLogEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noActivity')));
  } else {
    for (const { entry, label } of logEntries) {
      sidePanelLogEl.appendChild(buildSidePanelLogRow(entry, label));
    }
  }
}

sidePanelScopeOpts.forEach((btn) => {
  btn.onclick = () => {
    if (sidePanelScope === btn.dataset.scope) return;
    sidePanelScope = btn.dataset.scope;
    renderSidePanel();
  };
});

sidePanelEditToggleBtn.onclick = () => {
  sidePanelEditMode = !sidePanelEditMode;
  renderSidePanel();
};

sidePanelCommentAddBtn.onclick = async () => {
  if (!sidePanelTask || isProtectedTask(sidePanelTask)) return;
  const text = sidePanelCommentInput.value.trim();
  if (!text) return;
  if (!canAddNoteToTask(sidePanelTask)) {
    const reason = canCompleteOrNoteTask(sidePanelTask) ? t('subscribe.reasonCreateLimit') : t('subscribe.reasonTaskLimit');
    const accepted = await offerSubscriptionUpgrade(reason);
    if (!accepted) return;
  }
  if (sidePanelScope === 'occurrence' && sidePanelOccurrenceDate != null) {
    addOccurrenceComment(sidePanelTask, sidePanelOccurrenceDate, text);
  } else {
    addTaskComment(sidePanelTask, text);
  }
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
const seriesEditSaveConfirmEl = document.getElementById('series-edit-save-confirm');
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
  deleteBtn.title = t('common.delete');
  deleteBtn.innerHTML = trashIcon;
  let deleteArmed = false;
  deleteBtn.onclick = () => {
    if (!deleteArmed) {
      deleteArmed = true;
      deleteBtn.innerHTML = confirmIcon;
      deleteBtn.title = t('common.clickAgainToDelete');
      deleteBtn.classList.add('confirm');
    } else {
      onConfirm();
    }
  };
  row.addEventListener('mouseleave', () => {
    if (!deleteArmed) return;
    deleteArmed = false;
    deleteBtn.innerHTML = trashIcon;
    deleteBtn.title = t('common.delete');
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
  return new Date(y, m - 1, 1).toLocaleDateString(currentLocaleTag(), { month: 'long', year: 'numeric' });
}

// Whether `task` lands on any date within monthKey, without enumerating
// every day in it -- the first occurrence on/after the month's first day
// either falls inside the month or it doesn't. recurUntilCompleted is the
// exception: "the first occurrence on/after the month start" only ever
// reflects the current pending chain (see occurrenceScanShape's own
// comment), which would miss a month that only has an already-resolved
// occurrence in it -- checked directly against every recorded Occurrence
// instead (see allRecurUntilCompletedDatesInRange).
function taskOccursInMonth(task, monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  const startISO = `${monthKey}-01`;
  if (task.recurUntilCompleted) {
    const endExclusiveISO = Recurrence.dateToISO(Recurrence.addDays(new Date(year, month - 1, 1), Recurrence.daysInMonth(year, month - 1)));
    let found = false;
    allRecurUntilCompletedDatesInRange(task, startISO, endExclusiveISO, () => {
      found = true;
    });
    return found;
  }
  const endISO = `${monthKey}-${String(Recurrence.daysInMonth(year, month - 1)).padStart(2, '0')}`;
  if (occursOnDate(task, startISO)) return true;
  const dayBeforeStart = Recurrence.dateToISO(Recurrence.addDays(new Date(startISO + 'T00:00:00'), -1));
  const occ = nextOccurrenceAfterDate(task, dayBeforeStart);
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
    if (isProtectedTask(task)) continue; // nothing to manage -- can't be edited/deleted/moved, see openTaskForm's own guard
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
    empty.textContent = t('manage.noTasksYet');
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
      .map((seriesId) => ({ seriesId, members: tasksInSeries(seriesId), name: getSeriesName(seriesId) }))
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const { seriesId, members, name } of seriesInMonth) {
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
      row.textContent = name;
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

// Gives `sourceTask` one extra occurrence on a date the user picks -- e.g.
// resuming a task whose recurrence has already ended (its own
// frequency/endDate is left untouched; this doesn't "un-end" it, it just
// adds one more record after the fact), or giving a one-off task a second
// occurrence. Shares sourceTask's taskId (still "the same logical task",
// same idea as a split-off fragment -- see applySplitEdit) and seriesId,
// copying sourceTask's name/description/details/appointment/passive as a
// starting point since the form here only asks for the date/time.
//
// If sourceTask is itself recurring (necessarily with an end date already
// reached -- see buildSeriesMemberRow's disabling of the button otherwise),
// the new record keeps that same frequency and picks up a fresh end date the
// same length past the new due date as the original was past its own due
// date, so the series effectively resumes for another run of the same span
// instead of collapsing to a single occurrence. A one-off source just gets
// another independent 'once' record, as before.
async function promptManualOccurrence(sourceTask) {
  if (isProtectedTask(sourceTask)) return;
  const isRecurring = sourceTask.frequency.type !== 'once';
  const hasEndDate = !!sourceTask.endDate;

  // A recurring task with no end date is still generating its own
  // occurrences forever -- there's nothing for a manual one to add on top of
  // that. Defensive backstop; the button itself is disabled for this case.
  if (isRecurring && !hasEndDate) return;

  const result = await showFormModal(t('manualOccurrence.title'), [
    {
      name: 'dueDate',
      label: t('taskForm.dueDate'),
      type: 'date',
      value: Recurrence.dateToISO(new Date()),
      min: hasEndDate ? sourceTask.endDate : undefined,
    },
    {
      name: 'allDay',
      label: '',
      type: 'checkboxes',
      value: sourceTask.allDay ? ['allDay'] : [],
      options: [{ value: 'allDay', label: t('taskForm.allDay') }],
      required: false,
    },
    {
      name: 'dueTime',
      label: t('taskForm.dueTime'),
      type: 'time',
      value: sourceTask.dueTime || '18:00',
      showIf: (v) => v.allDay.length === 0,
    },
  ]);
  if (!result) return;

  // `min` above is only a hint to the native date picker -- a typed-in date
  // isn't rejected by it, so this is the real guard against resuming the
  // series before it actually stopped.
  if (hasEndDate && result.dueDate < sourceTask.endDate) {
    showInfoModal(t('manualOccurrence.endDateTooEarly'));
    return;
  }

  const allDay = result.allDay.length > 0;
  const endDate = isRecurring
    ? Recurrence.dateToISO(
        Recurrence.addDays(new Date(result.dueDate + 'T00:00:00'), Recurrence.daysBetween(sourceTask.dueDate, sourceTask.endDate))
      )
    : null;
  const frequency = isRecurring ? sourceTask.frequency : { type: 'once', interval: 1 };

  const manualFragment = {
    id: uid(),
    taskId: sourceTask.taskId,
    seriesId: sourceTask.seriesId,
    seriesName: sourceTask.seriesName,
    name: sourceTask.name,
    description: sourceTask.description,
    details: sourceTask.details,
    dueDate: result.dueDate,
    dueTime: allDay ? null : result.dueTime,
    allDay,
    appointment: sourceTask.appointment,
    passive: sourceTask.passive,
    recurUntilCompleted: sourceTask.recurUntilCompleted,
    endDate,
    frequency,
    createdAt: sourceTask.createdAt,
    log: [],
    comments: [],
  };
  tasks.push(manualFragment);
  logTaskEvent(manualFragment, 'Manual occurrence added', manualFragment.dueDate);
  if (manualFragment.recurUntilCompleted) ensureOccurrence(manualFragment, manualFragment.dueDate);
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
}

function buildSeriesMemberRow(task) {
  const row = document.createElement('div');
  row.className = 'todo-manage-item';

  const info = document.createElement('div');
  info.className = 'todo-manage-item-info';
  const name = document.createElement('div');
  name.className = 'todo-manage-item-name';
  name.textContent = task.name;
  // Same padlock as the to-do list/side panel (see LOCK_ICON) for a task
  // beyond a lapsed subscription's grandfathered set -- this modal never
  // sees the nag task itself (excluded in computeSeriesMonthGroups), so no
  // isProtectedTask check is needed here.
  if (!canCompleteOrNoteTask(task)) {
    const lock = document.createElement('span');
    lock.className = 'todo-manage-item-lock';
    lock.title = t('subscribe.reasonTaskLimit');
    lock.innerHTML = LOCK_ICON;
    name.appendChild(lock);
  }
  info.appendChild(name);
  const meta = document.createElement('div');
  meta.className = 'todo-manage-item-meta';
  meta.textContent = describeTaskSchedule(task);
  info.appendChild(meta);
  row.appendChild(info);

  // Adds one more occurrence of this task on a date the user picks -- works
  // the same whether this task is a plain one-off or its recurrence/end date
  // has already passed (see promptManualOccurrence). Disabled for a task
  // that's still actively recurring with no end date: it's already
  // generating its own occurrences forever, so there's nothing for a manual
  // one to add.
  const stillOpenEndedRecurring = task.frequency.type !== 'once' && !task.endDate;
  const addOccurrenceBtn = document.createElement('button');
  addOccurrenceBtn.title = stillOpenEndedRecurring ? t('manualOccurrence.cantAdd') : t('manualOccurrence.add');
  addOccurrenceBtn.disabled = stillOpenEndedRecurring;
  addOccurrenceBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm-8-8h2v2h2v2h-2v2h-2v-2H9v-2h2z"/></svg>';
  addOccurrenceBtn.onclick = () => promptManualOccurrence(task);
  row.appendChild(addOccurrenceBtn);

  // Overwrites just this one record's own name with the series' saved
  // name (see the "Save" button below) -- useful after "Save" has changed
  // the series name and this particular member's name has drifted from it
  // (e.g. it was renamed individually, or predates the series name).
  const resetNameBtn = document.createElement('button');
  resetNameBtn.title = t('manage.resetName');
  resetNameBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
  resetNameBtn.onclick = () => {
    task.name = getSeriesName(task.seriesId);
    saveTasks();
    renderTodo();
    refreshTodoManageModal();
  };
  row.appendChild(resetNameBtn);

  const editBtn = document.createElement('button');
  editBtn.title = t('common.edit');
  editBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
  // This row edits one Task record directly (no specific occurrence
  // context) -- for a 'once' task that's still just openTaskForm, but a
  // recurring record needs the same general-vs-pattern split as everywhere
  // else. 'all' scope here mirrors editTaskOccurrence's own 'all' branch:
  // an in-place general-info edit of this one record.
  editBtn.onclick = () =>
    task.frequency.type === 'once' ? openTaskForm(task) : openTaskGeneralInfoForm(task, { occurrenceDate: task.dueDate, scope: 'all' });
  row.appendChild(editBtn);

  if (task.frequency.type !== 'once') {
    const editPatternBtn = document.createElement('button');
    editPatternBtn.title = t('menu.editPattern');
    editPatternBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v5z"/></svg>';
    // No specific occurrence context here either -- editTaskPattern only
    // uses occurrenceDate as the fork point when a fork is actually needed,
    // so this record's own dueDate is the right stand-in.
    editPatternBtn.onclick = () => editTaskPattern(task, task.dueDate);
    row.appendChild(editPatternBtn);
  }

  // Leaving the series is nothing but getting a fresh seriesId -- the task
  // itself, and everything else about it, is untouched. Also drops the old
  // series' name -- it's now a series of one, so isMixedSeries never
  // consults it again, but leaving a stale value around would be
  // misleading if this task is later merged into another series.
  const removeBtn = document.createElement('button');
  removeBtn.title = t('manage.removeFromSeries');
  removeBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M5 11v2h9v-2H5zm11-4-1.41 1.41L17.17 11H10v2h7.17l-2.58 2.59L16 17l5-5-5-5z"/></svg>';
  removeBtn.onclick = () => {
    task.seriesId = uid();
    delete task.seriesName;
    saveTasks();
    renderTodo();
    refreshTodoManageModal();
  };
  row.appendChild(removeBtn);

  appendDeleteButton(row, () => deleteTask(task.id)); // deleteTask itself calls refreshTodoManageModal

  return row;
}

function renderSeriesEditorPane() {
  clearTimeout(seriesEditSaveConfirmTimer);
  seriesEditSaveConfirmEl.classList.remove('visible');
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
  seriesEditNameInput.value = getSeriesName(manageSelectedSeriesId);
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

// Saves the series' own name (see getSeriesName), kept in sync across
// every member record -- unlike the old "Rename all", this never touches
// any individual task's own name (see buildSeriesMemberRow's "reset name"
// button for pulling a member back in line with it after this changes).
// A saved name only ever appears elsewhere in the UI for a mixed series
// (see isMixedSeries) -- for a single-task or same-taskId series there's
// nowhere else it shows up, so the "Saved" cue below is the only feedback
// the user gets that the click actually did something.
let seriesEditSaveConfirmTimer = null;
document.getElementById('series-edit-save-btn').onclick = () => {
  if (!manageSelectedSeriesId) return;
  const newName = seriesEditNameInput.value.trim();
  if (!newName) return;
  for (const task of tasksInSeries(manageSelectedSeriesId)) task.seriesName = newName;
  saveTasks();
  renderTodo();
  refreshTodoManageModal();

  clearTimeout(seriesEditSaveConfirmTimer);
  seriesEditSaveConfirmEl.classList.add('visible');
  seriesEditSaveConfirmTimer = setTimeout(() => seriesEditSaveConfirmEl.classList.remove('visible'), 1500);
};

document.getElementById('series-edit-add-new-btn').onclick = async () => {
  if (!manageSelectedSeriesId) return;
  const nameDefault = seriesEditNameInput.value.trim();
  await openTaskForm(null, null, { forcedSeriesId: manageSelectedSeriesId, nameDefault });
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
  // Drop the dragged series' own name (if any) along with its old seriesId --
  // it's joining manageSelectedSeriesId's series now, so its name (or lack
  // of one) should come from there, not leak the source series' stale name
  // into a getSeriesName lookup on the merged series.
  for (const task of sourceMembers) {
    task.seriesId = manageSelectedSeriesId;
    delete task.seriesName;
  }
  saveTasks();
  renderTodo();
  refreshTodoManageModal();
});

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

// A "mixed" series -- multiple records spanning more than one distinct
// taskId, i.e. genuinely separate tasks merged together via the
// manage-tasks modal's drag & drop (see renderTodoManageMonths' green
// series-row-mixed) -- as opposed to a single task or a recurring task
// split into same-taskId fragments (see tasksInSeries). Only a mixed
// series has a "series name" worth showing next to a task's own name.
function isMixedSeries(seriesId) {
  const members = tasksInSeries(seriesId);
  return new Set(members.map((t) => t.taskId)).size > 1;
}

// The series' saved name (see the "Save" button in the manage-tasks
// modal's series editor), kept in sync across every member record
// whenever it's set -- read back from whichever member happens to carry
// it. Falls back to the earliest (by due date) member's own name if the
// series has never been explicitly named, so a freshly-merged series
// still shows something sensible.
function getSeriesName(seriesId) {
  const members = tasksInSeries(seriesId);
  const named = members.find((t) => t.seriesName);
  if (named) return named.seriesName;
  const sorted = members.slice().sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  return sorted.length ? sorted[0].name : '';
}

// A series counts as recurring if any fragment still has a repeating
// frequency, or if it's already been split into more than one record --
// even an entirely-split series of individually-'once' fragments is still a
// recurring task's history, not a plain one-off.
function isRecurringSeries(seriesTasks) {
  return seriesTasks.length > 1 || seriesTasks.some((t) => t.frequency.type !== 'once');
}

// Merges every fragment's (by taskId) Occurrence focus stats into one
// per-occurrence-date map plus running totals. Fragments' date ranges never
// overlap (each split truncates the historical portion's endDate right
// before the next fragment starts), and Occurrence rows are keyed by taskId
// rather than which fragment currently owns the pattern, so this never
// double-counts a date across fragments. Each date's bucket also keeps the
// Occurrence row(s) it came from, so a bad measurement can be deleted from
// the stats modal (see clearOccurrenceFocusTime).
function aggregateFocusLog(taskFragments) {
  const taskIds = new Set(taskFragments.map((t) => t.taskId));
  const byDate = new Map();
  let totalFocusedSeconds = 0;
  let totalTimerSeconds = 0;
  for (const occurrence of occurrences) {
    if (!taskIds.has(occurrence.taskId)) continue;
    const focusedSeconds = occurrence.focusedSeconds || 0;
    const timerSeconds = occurrence.timerSeconds || 0;
    if (focusedSeconds === 0 && timerSeconds === 0) continue;
    const bucket = byDate.get(occurrence.occurrenceDate) || { focusedSeconds: 0, timerSeconds: 0, occurrences: [] };
    bucket.focusedSeconds += focusedSeconds;
    bucket.timerSeconds += timerSeconds;
    bucket.occurrences.push(occurrence);
    byDate.set(occurrence.occurrenceDate, bucket);
    totalFocusedSeconds += focusedSeconds;
    totalTimerSeconds += timerSeconds;
  }
  return { byDate, totalFocusedSeconds, totalTimerSeconds };
}

function countSeriesCompletions(seriesTasks) {
  const taskIds = new Set(seriesTasks.map((t) => t.taskId));
  let count = 0;
  for (const occurrence of occurrences) {
    if (taskIds.has(occurrence.taskId) && occurrence.status === 'completed') count++;
  }
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

// Deletes an occurrence's measured focus/timer time -- for a measurement
// that's plainly wrong (e.g. a task accidentally left focused for hours),
// which would otherwise skew this task's stats and its agenda block length
// (averageFocusedMinutesForCompletedOccurrences) for good. If that
// occurrence is being focused/timed right now, the still-unflushed part of
// the current session is discarded too, by restarting its clock from now
// -- otherwise it would be added straight back on the next flush.
function clearOccurrenceFocusTime(occurrence) {
  occurrence.focusedSeconds = 0;
  occurrence.timerSeconds = 0;
  const activeTask = tasks.find((t) => t.id === activeTaskId);
  if (activeTask && findOccurrence(activeTask, activeOccurrenceDate) === occurrence) {
    if (occurrence.timer && occurrence.timer.runningSince != null) occurrence.timer.runningSince = Date.now();
    if (activeFocusOnlySince != null) activeFocusOnlySince = Date.now();
  }
  occurrence.log.push({ message: 'Measured focus time deleted', timestamp: Date.now() });
}

// Stats for this one task -- every fragment sharing its taskId (a recurring
// task split by "this and following" edits), never its whole series, which
// groups otherwise unrelated tasks together.
function showTaskStatsModal(task) {
  taskStatsTitleEl.textContent = t('taskStats.title', { name: task.name });
  taskStatsBodyEl.innerHTML = '';

  const taskFragments = tasks.filter((t) => t.taskId === task.taskId);
  const recurring = isRecurringSeries(taskFragments);
  const { byDate, totalFocusedSeconds, totalTimerSeconds } = aggregateFocusLog(taskFragments);

  const totalsSection = buildStatsSection(recurring ? t('taskStats.totalFocusedAllRecurrences') : t('taskStats.totalFocused'));
  totalsSection.appendChild(buildStatRow(t('taskStats.total'), formatStatsDuration(totalFocusedSeconds + totalTimerSeconds)));
  totalsSection.appendChild(buildStatRow(t('taskStats.justFocused'), formatStatsDuration(totalFocusedSeconds)));
  totalsSection.appendChild(buildStatRow(t('taskStats.focusedWithTimer'), formatStatsDuration(totalTimerSeconds)));
  taskStatsBodyEl.appendChild(totalsSection);

  if (!recurring) {
    taskStatsOverlay.classList.remove('hidden');
    return;
  }

  const todayISO = Recurrence.dateToISO(new Date());
  const completed = countSeriesCompletions(taskFragments);
  const occurrences = countSeriesOccurrencesToDate(taskFragments, todayISO);
  const percent = occurrences > 0 ? Math.round((completed / occurrences) * 100) : 0;

  const completionSection = buildStatsSection(t('taskStats.completion'));
  completionSection.appendChild(buildStatRow(t('taskStats.completed'), String(completed)));
  completionSection.appendChild(buildStatRow(t('taskStats.recurrencesToDate'), String(occurrences)));
  completionSection.appendChild(buildStatRow(t('taskStats.completionRate'), `${percent}%`));
  taskStatsBodyEl.appendChild(completionSection);

  const perRecurrenceSection = buildStatsSection(t('taskStats.timePerRecurrence'));
  const dates = [...byDate.keys()].sort().reverse();
  if (dates.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'task-stats-empty';
    empty.textContent = t('taskStats.noFocusedTime');
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
      timeEl.textContent = t('taskStats.focusedAndTimer', {
        focused: formatStatsDuration(entry.focusedSeconds),
        timer: formatStatsDuration(entry.timerSeconds),
      });
      item.appendChild(dateEl);
      item.appendChild(timeEl);
      appendDeleteButton(item, () => {
        for (const occurrence of entry.occurrences) clearOccurrenceFocusTime(occurrence);
        saveTasks();
        showTaskStatsModal(task);
        renderSidePanel(); // the agenda's block lengths come from these measurements
      });
      list.appendChild(item);
    }
    perRecurrenceSection.appendChild(list);
  }
  taskStatsBodyEl.appendChild(perRecurrenceSection);

  taskStatsOverlay.classList.remove('hidden');
}

document.getElementById('task-stats-close').onclick = () => taskStatsOverlay.classList.add('hidden');

// ---------------------------------------------------------------------------
// User avatar menu -- the header's Manage tasks/Settings/Log out button
// trio is folded into a single avatar button + dropdown here, so the header
// itself only ever shows the avatar.
// ---------------------------------------------------------------------------

const userAvatarBtn = document.getElementById('user-avatar-btn');
const userAvatarImg = document.getElementById('user-avatar-img');
const userAvatarInitials = document.getElementById('user-avatar-initials');
const userMenuDropdown = document.getElementById('user-menu-dropdown');
const appHeaderSubscribeBtn = document.getElementById('app-header-subscribe-btn');

// Shown for a free (never subscribed) or trial (active or lapsed) account --
// hidden once there's an actual Pro subscription, since there's nothing left
// to upsell. Links straight to landing.html's pricing section rather than
// opening the in-app trial paywall -- choosing monthly/yearly billing now
// happens there (see checkout.html).
function renderSubscribeHeaderButton() {
  appHeaderSubscribeBtn.classList.toggle('hidden', describeSubscription(currentUserSubscription).plan === 'pro');
}

// Up to the first two words' initials (e.g. "Nikola Novak" -> "NN", "Nikola"
// -> "N"), or the placeholder "JD" (as in "John Doe") when there's no
// nickname at all to derive anything from -- the fallback avatar content
// whenever no custom image has been uploaded.
function initialsFor(nickname) {
  const words = (nickname || '').trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'JD';
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function renderUserAvatar() {
  const hasImage = !!currentUserAvatar;
  userAvatarImg.src = currentUserAvatar || '';
  userAvatarImg.classList.toggle('hidden', !hasImage);
  userAvatarInitials.textContent = initialsFor(currentUserNickname);
  userAvatarInitials.classList.toggle('hidden', hasImage);
}

function closeUserMenu() {
  userMenuDropdown.classList.add('hidden');
}

// stopPropagation so the toggle below doesn't immediately re-close it via
// the document-level listener the same click bubbles up to.
userAvatarBtn.onclick = (e) => {
  e.stopPropagation();
  userMenuDropdown.classList.toggle('hidden');
};
document.addEventListener('click', closeUserMenu);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeUserMenu();
});

document.getElementById('user-menu-manage-tasks').onclick = (e) => {
  e.stopPropagation();
  closeUserMenu();
  refreshTodoManageModal();
  todoManageOverlay.classList.remove('hidden');
};
document.getElementById('user-menu-settings').onclick = (e) => {
  e.stopPropagation();
  closeUserMenu();
  openSettingsModal();
};
document.getElementById('user-menu-logout').onclick = (e) => {
  e.stopPropagation();
  closeUserMenu();
  // Clears the saved token and reloads -- the easiest way back to the login
  // screen for testing it, and simpler/more robust than manually resetting
  // every piece of in-memory state (tasks, activeTaskId, sidePanelTask, ...)
  // by hand.
  localStorage.removeItem(AUTH_TOKEN_KEY);
  location.reload();
};

// ---------------------------------------------------------------------------
// Settings modal -- nickname + avatar, the only editable profile fields.
// Not built on the generic showFormModal: the avatar picker needs a live
// image preview and a separate "Remove" action that plain form fields don't
// support.
// ---------------------------------------------------------------------------

const settingsOverlay = document.getElementById('settings-overlay');
const settingsNicknameInput = document.getElementById('settings-nickname-input');
const settingsTimeFormatSelect = document.getElementById('settings-time-format-select');
const settingsLanguageSelect = document.getElementById('settings-language-select');
const settingsThemeSelect = document.getElementById('settings-theme-select');
const settingsAvatarPreviewImg = document.getElementById('settings-avatar-preview-img');
const settingsAvatarPreviewInitials = document.getElementById('settings-avatar-preview-initials');
const settingsAvatarFileInput = document.getElementById('settings-avatar-file-input');
const settingsSubscriptionStatusEl = document.getElementById('settings-subscription-status');
const settingsSubscribeBtn = document.getElementById('settings-subscribe-btn');
const settingsCancelSubscriptionBtn = document.getElementById('settings-cancel-subscription-btn');
const settingsScheduledDeletionNoticeEl = document.getElementById('settings-scheduled-deletion-notice');
const settingsCancelScheduledDeletionBtn = document.getElementById('settings-cancel-scheduled-deletion-btn');

const AVATAR_SIZE = 128; // px, square

// Square-crops and downscales any uploaded image before it's ever stored --
// an avatar is only ever shown at a few dozen pixels, so keeping a
// multi-megapixel photo's full data URL around would bloat localStorage
// (shared with every task/comment) for no visible benefit.
function readAvatarFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not read image'));
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = AVATAR_SIZE;
        canvas.height = AVATAR_SIZE;
        canvas
          .getContext('2d')
          .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// undefined = unchanged from currentUserAvatar, null = removed, string = a
// freshly uploaded image -- staged here until Save, so Cancel can discard it
// without having touched currentUserAvatar/storage at all.
let settingsPendingAvatar;

function renderSettingsAvatarPreview() {
  const avatar = settingsPendingAvatar === undefined ? currentUserAvatar : settingsPendingAvatar;
  const hasImage = !!avatar;
  settingsAvatarPreviewImg.src = avatar || '';
  settingsAvatarPreviewImg.classList.toggle('hidden', !hasImage);
  settingsAvatarPreviewInitials.textContent = initialsFor(settingsNicknameInput.value);
  settingsAvatarPreviewInitials.classList.toggle('hidden', hasImage);
}

// Free/Trial (ends at: ...)/Pro (billed monthly|annually, next billing at:
// ... -- or "cancels at" once cancelAtPeriodEnd, see
// cancelCurrentUserSubscription) -- see describeSubscription. The Subscribe
// button doubles as the only way to start a trial outside the paywall modal
// (see startTrialSubscription) -- hidden once a subscription is already
// active, there being nothing more to start that way. Cancel is offered only
// for an active, not-yet-cancelled Pro plan -- a trial has no recurring
// billing to cancel, it just ends on its own at expiresAt.
function renderSettingsSubscriptionSection() {
  const { plan, active, subscription } = describeSubscription(currentUserSubscription);
  if (plan === 'free') {
    settingsSubscriptionStatusEl.textContent = t('settings.subscriptionFree');
  } else if (plan === 'trial') {
    settingsSubscriptionStatusEl.textContent = active
      ? t('settings.subscriptionTrial', { date: formatDateTime(subscription.expiresAt) })
      : t('settings.subscriptionTrialExpired', { date: formatDateTime(subscription.expiresAt) });
  } else {
    const intervalLabel = subscription.billingInterval === 'annual' ? t('settings.billingAnnual') : t('settings.billingMonthly');
    settingsSubscriptionStatusEl.textContent = !active
      ? t('settings.subscriptionProExpired', { date: formatDateTime(subscription.expiresAt) })
      : subscription.cancelAtPeriodEnd
        ? t('settings.subscriptionProCancelling', { interval: intervalLabel, date: formatDateTime(subscription.expiresAt) })
        : t('settings.subscriptionPro', { interval: intervalLabel, date: formatDateTime(subscription.expiresAt) });
  }
  settingsSubscribeBtn.classList.toggle('hidden', active);
  settingsCancelSubscriptionBtn.classList.toggle('hidden', !(plan === 'pro' && active && !subscription.cancelAtPeriodEnd));
  // See scheduleAccountDeletion in auth.js -- only meaningful while the
  // subscription it's tied to is still active (once it lapses, getMe()
  // deletes the account for real on the next login, so there's nothing left
  // here to show by then).
  settingsScheduledDeletionNoticeEl.classList.toggle('hidden', !(active && subscription.scheduledDeletion));
}

function openSettingsModal() {
  settingsNicknameInput.value = currentUserNickname || '';
  settingsTimeFormatSelect.value = currentUserTimeFormat;
  settingsLanguageSelect.value = currentUserLanguage;
  settingsThemeSelect.value = currentUserTheme;
  settingsPendingAvatar = undefined;
  renderSettingsAvatarPreview();
  renderSettingsBackgroundPreview();
  renderSettingsSubscriptionSection();
  settingsOverlay.classList.remove('hidden');
}

function closeSettingsModal() {
  settingsOverlay.classList.add('hidden');
}

settingsNicknameInput.oninput = renderSettingsAvatarPreview;

document.getElementById('settings-avatar-upload-btn').onclick = () => settingsAvatarFileInput.click();
settingsAvatarFileInput.onchange = async () => {
  const file = settingsAvatarFileInput.files[0];
  settingsAvatarFileInput.value = ''; // so re-selecting the same file still fires onchange next time
  if (!file) return;
  settingsPendingAvatar = await readAvatarFile(file);
  renderSettingsAvatarPreview();
};
document.getElementById('settings-avatar-remove-btn').onclick = () => {
  settingsPendingAvatar = null;
  renderSettingsAvatarPreview();
};

document.getElementById('settings-cancel').onclick = closeSettingsModal;
document.getElementById('settings-close').onclick = closeSettingsModal;
document.getElementById('settings-save').onclick = () => {
  const nickname = settingsNicknameInput.value.trim();
  const avatar = settingsPendingAvatar === undefined ? currentUserAvatar : settingsPendingAvatar;
  const timeFormat = settingsTimeFormatSelect.value;
  const language = settingsLanguageSelect.value;
  const theme = settingsThemeSelect.value;
  currentUserNickname = nickname;
  currentUserAvatar = avatar;
  currentUserTimeFormat = timeFormat;
  saveUserProfile({ ...currentUserProfileSnapshot(), language, theme });
  renderUserAvatar();
  // applyLanguage saves currentUserLanguage and re-renders everything
  // renderAppTitle/renderTodo/renderSidePanel below would have anyway (every
  // currently-rendered due time/comment-and-log timestamp was drawn with the
  // old timeFormat/language baked into its text), so it's called instead of
  // them, not alongside them.
  applyLanguage(language);
  applyTheme(theme);
  closeSettingsModal();
};

settingsSubscribeBtn.onclick = () => subscribeCurrentUserToTrial();
settingsCancelSubscriptionBtn.onclick = () => cancelCurrentUserSubscription();
settingsCancelScheduledDeletionBtn.onclick = () => cancelCurrentUserScheduledDeletion();

// ---------------------------------------------------------------------------
// Subscription paywall modal -- shown when a free/lapsed account hits one of
// the free-tier limits above (a 6th recurring task, 11th non-recurring task,
// or 6th note on one task), and reused as the actual mechanism behind the
// Settings section's own "Start free trial" button. Same
// resolve-on-button-click promise shape as showFormModal, but a dedicated
// bit of markup rather than that generic field-list engine -- this needs a
// benefits list and a reason line, not a form.
// ---------------------------------------------------------------------------

const subscribeOverlay = document.getElementById('subscribe-overlay');
const subscribeReasonEl = document.getElementById('subscribe-reason');
let subscribeModalResolve = null;

function showSubscribeModal(reasonText) {
  return new Promise((resolve) => {
    subscribeModalResolve = resolve;
    subscribeReasonEl.textContent = reasonText;
    subscribeOverlay.classList.remove('hidden');
  });
}

function closeSubscribeModal(accepted) {
  subscribeOverlay.classList.add('hidden');
  if (subscribeModalResolve) {
    subscribeModalResolve(accepted);
    subscribeModalResolve = null;
  }
}

document.getElementById('subscribe-close').onclick = () => closeSubscribeModal(false);
document.getElementById('subscribe-cancel').onclick = () => closeSubscribeModal(false);
document.getElementById('subscribe-start-trial').onclick = async () => {
  await subscribeCurrentUserToTrial();
  closeSubscribeModal(true);
};

// Shows the paywall with `reasonText` explaining why, and starts a trial if
// the user accepts -- the single entry point every limit check above calls
// (ensureCanCreateTaskOfKind, attemptResolveTaskOccurrence, the note-add
// handler), so there's one place deciding what "offering a subscription"
// actually does.
async function offerSubscriptionUpgrade(reasonText) {
  return showSubscribeModal(reasonText);
}

// ---------------------------------------------------------------------------
// Settings modal -- data export/import. Bundles everything this app stores
// per-user (tasks, profile, active-task/timer state, view mode) into one
// JSON file, and can load that same file back in wholesale as a manual
// backup/account-migration path, on top of (not instead of) this account's
// normal server-side storage -- imported tasks are saved via the same
// PUT /tasks every other task edit uses (awaited here, unlike saveTasks()'s
// usual fire-and-forget callers, so a failed save can be surfaced -- see the
// import handler below), subject to the same free-tier limits a free/lapsed
// account would hit creating them one at a time (see
// applyFreeTierLimitsToImportedTasks below).
// ---------------------------------------------------------------------------

const settingsDownloadDataBtn = document.getElementById('settings-download-data-btn');
const settingsImportDataBtn = document.getElementById('settings-import-data-btn');
const settingsImportDataFileInput = document.getElementById('settings-import-data-file-input');

const USER_DATA_EXPORT_VERSION = 1;

function collectUserDataExport() {
  return {
    version: USER_DATA_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    tasks,
    occurrences,
    userProfile: currentUserProfileSnapshot(),
    activeTaskId,
    activeOccurrenceDate,
    todoViewMode,
  };
}

// Shared by the plain Settings button and the delete-account modal's own
// "Download my data" offer (see below) -- same file either way.
function downloadUserDataExport() {
  const blob = new Blob([JSON.stringify(collectUserDataExport(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `advanced-todo-backup-${Recurrence.dateToISO(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

settingsDownloadDataBtn.onclick = downloadUserDataExport;

settingsImportDataBtn.onclick = () => settingsImportDataFileInput.click();

// Wholesale-replaces every piece of this app's stored state with whatever's
// in the imported file -- there's no merge story, since two independent task
// lists (this device's vs. the imported one's) have no principled way to be
// reconciled automatically.
settingsImportDataFileInput.onchange = async () => {
  const file = settingsImportDataFileInput.files[0];
  settingsImportDataFileInput.value = ''; // so re-selecting the same file still fires onchange next time
  if (!file) return;

  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    showInfoModal(t('data.notJson'));
    return;
  }
  if (!data || typeof data !== 'object' || !Array.isArray(data.tasks)) {
    showInfoModal(t('data.notExport'));
    return;
  }
  if (!confirm(t('data.importConfirm'))) return;

  const normalizedTasks = normalizeLoadedTasks(data.tasks);
  const importedOccurrences = Array.isArray(data.occurrences) ? data.occurrences : [];
  const totalNotesBefore = [...normalizedTasks, ...importedOccurrences].reduce((sum, r) => sum + (r.comments ? r.comments.length : 0), 0);
  const limited = applyFreeTierLimitsToImportedTasks(normalizedTasks, importedOccurrences);
  tasks = limited.tasks;
  occurrences = limited.occurrences;
  const totalNotesAfter = [...tasks, ...occurrences].reduce((sum, r) => sum + (r.comments ? r.comments.length : 0), 0);
  if (tasks.length < normalizedTasks.length || totalNotesAfter < totalNotesBefore) showInfoModal(t('data.importLimitedByFreePlan'));

  ensureSubscriptionPromptTask(); // re-derive from the current account's subscription, not whatever the imported file happened to contain

  // Unlike saveTasks()'s usual fire-and-forget callers, this one has to
  // actually know whether the save landed: a failed import silently leaves
  // the account's server-side tasks untouched while the screen shows the
  // imported ones as if they'd been saved (a real incident once did exactly
  // this, caused by a backend bug since fixed) -- awaited here so a failure
  // can be surfaced instead of just console.error'd.
  try {
    await apiFetch('/tasks', { method: 'PUT', body: { tasks, occurrences } });
  } catch (err) {
    console.error('Failed to save imported tasks:', err);
    showInfoModal(t('data.importSaveFailed', { message: err.message }));
  }

  const profile = { ...DEFAULT_USER_PROFILE, ...(data.userProfile || {}) };
  saveUserProfile(profile);
  currentUserNickname = profile.nickname;
  currentUserAvatar = profile.avatar;
  currentUserTimeFormat = profile.timeFormat;
  currentUserBackground = profile.background;
  currentUserLanguage = profile.language || 'en';
  currentUserTheme = profile.theme || 'dark';

  activeTaskId = data.activeTaskId || null;
  activeOccurrenceDate = activeTaskId ? data.activeOccurrenceDate || null : null;
  saveActiveTaskId();

  todoViewMode = TODO_VIEW_MODES.includes(data.todoViewMode) ? data.todoViewMode : 'pending';
  saveTodoViewMode();

  applyStaticTranslations();
  openSettingsModal(); // re-seed the form fields (nickname/time format/avatar/background/language/theme preview) from the just-imported profile
  renderAppTitle();
  renderUserAvatar();
  applyBackground(currentUserBackground);
  applyTheme(currentUserTheme);
  renderTodo();
  renderSidePanel();
  refreshTodoManageModal();
};

// ---------------------------------------------------------------------------
// Change password -- Settings' "Change password..." opens its own small
// modal (current/new/confirm, same shape as the register form) rather than
// inline fields in Settings itself, since this needs its own validation/
// error state and doesn't save as part of Settings' own "Save" -- see
// api-spec.yaml's POST /users/me/change-password for why the current
// password is required at all (a bearer token alone isn't proof enough).
// ---------------------------------------------------------------------------

const settingsChangePasswordBtn = document.getElementById('settings-change-password-btn');
const changePasswordOverlay = document.getElementById('change-password-overlay');
const changePasswordFormEl = document.getElementById('change-password-form');
const changePasswordMessageEl = document.getElementById('change-password-message');
const changePasswordCurrentInput = document.getElementById('change-password-current');
const changePasswordNewInput = document.getElementById('change-password-new');
const changePasswordConfirmInput = document.getElementById('change-password-confirm');

function openChangePasswordModal() {
  changePasswordFormEl.reset();
  clearAuthMessage(changePasswordMessageEl);
  changePasswordOverlay.classList.remove('hidden');
}
function closeChangePasswordModal() {
  changePasswordOverlay.classList.add('hidden');
}

settingsChangePasswordBtn.onclick = openChangePasswordModal;
document.getElementById('change-password-close').onclick = closeChangePasswordModal;
document.getElementById('change-password-cancel').onclick = closeChangePasswordModal;

changePasswordFormEl.onsubmit = async (e) => {
  e.preventDefault();
  clearAuthMessage(changePasswordMessageEl);
  const currentPassword = changePasswordCurrentInput.value;
  const newPassword = changePasswordNewInput.value;
  const confirmPassword = changePasswordConfirmInput.value;
  if (newPassword.length < 8) {
    showAuthMessage(changePasswordMessageEl, 'error', t('changePassword.tooShort'));
    return;
  }
  if (newPassword !== confirmPassword) {
    showAuthMessage(changePasswordMessageEl, 'error', t('changePassword.mismatch'));
    return;
  }
  try {
    // Only `token` comes back (see api-spec.yaml) -- none of the account's
    // own User fields change, so there's nothing else here to re-apply the
    // way subscribeCurrentUserToTrial etc. re-apply a returned `user`.
    const { token } = await changePassword(currentPassword, newPassword);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (err) {
    showAuthMessage(
      changePasswordMessageEl,
      'error',
      err.code === 'INVALID_CREDENTIALS' ? t('changePassword.wrongCurrent') : t('changePassword.genericError')
    );
    return;
  }
  closeChangePasswordModal();
  showInfoModal(t('changePassword.success'), 'success');
};

// ---------------------------------------------------------------------------
// Account deletion -- Settings' "Delete account" opens a dedicated
// confirmation modal (warning + a chance to download data first) rather than
// a plain confirm(), since there's more than a yes/no here. The modal itself
// is the confirmation step, so unlike appendDeleteButton's list-row pattern
// there's no separate arm/click-again dance on top of it.
// ---------------------------------------------------------------------------

const settingsDeleteAccountBtn = document.getElementById('settings-delete-account-btn');
const deleteAccountOverlay = document.getElementById('delete-account-overlay');
const deleteAccountSubscriberNoticeEl = document.getElementById('delete-account-subscriber-notice');
const deleteAccountDownloadBtn = document.getElementById('delete-account-download-btn');
const deleteAccountScheduleBtn = document.getElementById('delete-account-schedule');
const deleteAccountConfirmBtn = document.getElementById('delete-account-confirm');

// A paying (active Pro) subscriber gets a choice the modal's plain single
// button doesn't cover: deleting right now forfeits the rest of what they
// already paid for with no refund, so offer scheduling deletion for
// whenever the subscription would end instead (see scheduleAccountDeletion
// in auth.js) -- everyone else (free, trial, or a lapsed subscription) has
// nothing to lose either way, so they only ever see the one option.
function openDeleteAccountModal() {
  const { plan, active, subscription } = describeSubscription(currentUserSubscription);
  const isPayingSubscriber = plan === 'pro' && active;
  deleteAccountSubscriberNoticeEl.classList.toggle('hidden', !isPayingSubscriber);
  deleteAccountScheduleBtn.classList.toggle('hidden', !isPayingSubscriber);
  deleteAccountConfirmBtn.textContent = t(isPayingSubscriber ? 'deleteAccount.confirmImmediate' : 'deleteAccount.confirm');
  if (isPayingSubscriber) deleteAccountScheduleBtn.textContent = t('deleteAccount.schedule', { date: formatDateTime(subscription.expiresAt) });
  deleteAccountOverlay.classList.remove('hidden');
}
function closeDeleteAccountModal() {
  deleteAccountOverlay.classList.add('hidden');
}

settingsDeleteAccountBtn.onclick = openDeleteAccountModal;
document.getElementById('delete-account-close').onclick = closeDeleteAccountModal;
document.getElementById('delete-account-cancel').onclick = closeDeleteAccountModal;
deleteAccountDownloadBtn.onclick = downloadUserDataExport;

// DELETE /users/me -- the account and every task/note/preference tied to
// it are gone server-side the instant this resolves (see api-spec.yaml).
// Only the local token needs clearing here; there's no other local data to
// clean up now that tasks/profile/etc. all live server-side, not in
// localStorage. Deliberately doesn't touch loadUnsplashAccessKey's
// per-device key (see collectUserDataExport's own comment) -- that's a
// device credential, not this account's data, same distinction the data
// export already draws. Reloads afterward -- simplest way to guarantee
// every one of this file's many in-memory globals (tasks, currentUser*,
// activeTaskId, todoViewMode, ...) resets cleanly, same as a real fresh
// visit; boot() then finds no token and shows the login screen.
async function deleteCurrentUserAccount() {
  await apiFetch('/users/me', { method: 'DELETE' }).catch((err) => {
    console.error('Failed to delete account:', err);
  });
  discardUnsavedTaskChanges();
  localStorage.removeItem(AUTH_TOKEN_KEY);
  location.reload();
}

deleteAccountConfirmBtn.onclick = deleteCurrentUserAccount;

// The other choice offered to a paying subscriber (see openDeleteAccountModal
// above) -- keeps everything working normally until the subscription's
// current period ends, at which point getMe() actually deletes it (see
// scheduleAccountDeletion's own comment in auth.js). No reload needed: the
// account isn't gone yet, so just refresh the bits of chrome that show
// subscription/deletion status.
async function scheduleCurrentUserAccountDeletion() {
  const { token, user } = await scheduleAccountDeletion();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  closeDeleteAccountModal();
  renderSettingsSubscriptionSection();
  renderSubscribeHeaderButton();
}

deleteAccountScheduleBtn.onclick = scheduleCurrentUserAccountDeletion;

// ---------------------------------------------------------------------------
// Background picker (Unsplash) -- opened via Settings' "Change background"
// button. No uploads: every image comes from Unsplash's free-tier API, both
// to sidestep the copyright issues user-uploaded images could bring and
// because Unsplash requires attribution wherever a photo is shown (see
// applyBackground's #background-credit) and a ping to its "download"
// endpoint whenever a photo is actually put to use (see selectBackgroundPhoto)
// -- obligations that only make sense for their own catalog, not arbitrary
// uploads.
//
// Picking a photo takes effect (and saves) immediately -- there's no
// separate "Save" step the way nickname/avatar/time-format have, since this
// is its own modal opened from within Settings rather than a field staged
// inside Settings' own form.
// ---------------------------------------------------------------------------

// The Unsplash Access Key is a per-device API credential, not user data: kept
// in its own storage key, deliberately left out of the user profile (see
// DEFAULT_USER_PROFILE) and the data export/import.
const UNSPLASH_ACCESS_KEY_STORAGE_KEY = 'advanced-todo-unsplash-access-key';
const UNSPLASH_API_BASE = 'https://api.unsplash.com';

// An app-wide key an admin provides via config.js (see config.example.js and
// CLAUDE.md's "Configuration" section) -- generated at container start from
// the UNSPLASH_ACCESS_KEY env var in the Docker image, or a real config.js
// file for local dev. Takes priority over any per-device key below, so once
// one's configured, users never see the "paste a key" step at all.
// window.APP_CONFIG is simply undefined if config.js 404s (nothing sets it),
// which is the normal case for local dev without one -- not an error.
function configuredUnsplashAccessKey() {
  return (window.APP_CONFIG && window.APP_CONFIG.unsplashAccessKey) || '';
}

// Falls back to a key the user pastes in themselves (see backgroundKeySetupEl)
// when there's no app-wide one -- keeps the picker usable for local dev/a
// single user without requiring config.js at all.
function loadUnsplashAccessKey() {
  return configuredUnsplashAccessKey() || localStorage.getItem(UNSPLASH_ACCESS_KEY_STORAGE_KEY) || '';
}
function saveUnsplashAccessKey(key) {
  localStorage.setItem(UNSPLASH_ACCESS_KEY_STORAGE_KEY, key);
}

const settingsBackgroundPreviewEl = document.getElementById('settings-background-preview');
const settingsChangeBackgroundBtn = document.getElementById('settings-change-background-btn');
const settingsRemoveBackgroundBtn = document.getElementById('settings-remove-background-btn');

function renderSettingsBackgroundPreview() {
  settingsBackgroundPreviewEl.style.backgroundImage = currentUserBackground ? `url("${currentUserBackground.thumbUrl}")` : '';
  settingsRemoveBackgroundBtn.disabled = !currentUserBackground;
}

const backgroundCreditEl = document.getElementById('background-credit');
const backgroundCreditPhotographerEl = document.getElementById('background-credit-photographer');

// The one place that actually paints the chosen photo -- covers the full
// viewport (body, behind every panel's own translucent glass background) with
// no tiling, per style.css's background-size/position/repeat rules on body.
// Also the one place that shows/hides the required Unsplash attribution, so
// the two can never end up out of sync. The `has-background` class is the
// one CSS-visible hook for "a photo is present" -- style.css's `.todo-item`
// rules key off it to switch between backdrop-filter brightness (an image
// to actually blur) and a plain background-color (nothing to blur).
function applyBackground(background) {
  document.body.style.backgroundImage = background ? `url("${background.regularUrl}")` : '';
  document.body.classList.toggle('has-background', !!background);
  backgroundCreditEl.classList.toggle('hidden', !background);
  if (background) {
    backgroundCreditPhotographerEl.href = background.photographerUrl;
    backgroundCreditPhotographerEl.textContent = background.photographerName;
  }
}

settingsRemoveBackgroundBtn.onclick = () => {
  currentUserBackground = null;
  saveUserProfile(currentUserProfileSnapshot());
  applyBackground(null);
  renderSettingsBackgroundPreview();
};

const backgroundOverlay = document.getElementById('background-overlay');
const backgroundKeySetupEl = document.getElementById('background-key-setup');
const backgroundKeyInput = document.getElementById('background-key-input');
const backgroundBrowserEl = document.getElementById('background-browser');
const backgroundSearchInput = document.getElementById('background-search-input');
const backgroundPickerStatusEl = document.getElementById('background-picker-status');
const backgroundPickerGridEl = document.getElementById('background-picker-grid');

// query === '' fetches a batch of random photos to browse (the picker's
// default, no-search-yet view); a non-empty query hits the search endpoint
// instead. Unsplash's two endpoints don't share a response shape -- /photos/
// random resolves an array directly, /search/photos wraps it in `.results`
// (alongside pagination totals this app has no UI for) -- normalized here so
// every caller just gets an array of photos either way.
async function fetchUnsplashPhotos(query) {
  const endpoint = query
    ? `${UNSPLASH_API_BASE}/search/photos?per_page=30&query=${encodeURIComponent(query)}`
    : `${UNSPLASH_API_BASE}/photos/random?count=30`;
  const res = await fetch(endpoint, { headers: { Authorization: `Client-ID ${loadUnsplashAccessKey()}` } });
  if (!res.ok) {
    if (res.status === 401) throw new Error(t('background.keyRejected'));
    if (res.status === 403) throw new Error(t('background.rateLimited'));
    throw new Error(t('background.requestFailed', { status: res.status }));
  }
  const data = await res.json();
  return query ? data.results : data;
}

function renderBackgroundPickerGrid(photos) {
  backgroundPickerGridEl.innerHTML = '';
  for (const photo of photos) {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'background-picker-thumb';
    thumb.title = t('background.usePhoto', { name: photo.user.name });

    const img = document.createElement('img');
    img.src = photo.urls.small;
    img.alt = photo.alt_description || '';
    thumb.appendChild(img);

    const credit = document.createElement('span');
    credit.className = 'background-picker-thumb-credit';
    credit.textContent = photo.user.name;
    thumb.appendChild(credit);

    thumb.onclick = () => selectBackgroundPhoto(photo);
    backgroundPickerGridEl.appendChild(thumb);
  }
}

async function loadBackgroundPhotos(query) {
  backgroundPickerStatusEl.textContent = t('background.loading');
  backgroundPickerGridEl.innerHTML = '';
  try {
    const photos = await fetchUnsplashPhotos(query);
    backgroundPickerStatusEl.textContent = photos.length ? '' : t('background.noResults');
    renderBackgroundPickerGrid(photos);
  } catch (err) {
    backgroundPickerStatusEl.textContent = err.message;
  }
}

// utm params on both links per Unsplash's attribution guidelines
// (https://help.unsplash.com/en/articles/2511315), which every photo shown
// anywhere in the app (see applyBackground) has to carry, not just the ones
// in this picker.
function unsplashAttributionUrl(url) {
  return `${url}?utm_source=advanced-todo&utm_medium=referral`;
}

// photo.urls.regular is a fixed 1080px-wide preset -- fine for a laptop
// screen, but on a larger/high-DPI display body's background-size:cover (see
// style.css) has to blow it up past its native resolution, which looks
// stretched/blurry despite never distorting the aspect ratio. Unsplash's
// images are served by imgix, which accepts w/h/fit params on any of its
// photo URLs (https://unsplash.com/documentation#dynamically-resizable-images),
// so request a size matching this screen instead: fit=crop cuts off any
// excess rather than skewing the image to match, the same trade-off
// background-size:cover already makes.
function unsplashBackgroundUrl(photo) {
  const dpr = window.devicePixelRatio || 1;
  // Capped well above common displays but short of Unsplash's raw originals,
  // so a 4K/5K screen doesn't pull down an unnecessarily huge file.
  const width = Math.min(Math.round(window.screen.width * dpr), 2560);
  const height = Math.min(Math.round(window.screen.height * dpr), 1600);
  // urls.raw always carries its own query string (ixid/ixlib) in practice,
  // but build with URL/URLSearchParams rather than string-concatenating a
  // "&" onto it -- that would silently produce an invalid, non-loading URL
  // for any raw URL that didn't already have one.
  const url = new URL(photo.urls.raw);
  url.searchParams.set('w', width);
  url.searchParams.set('h', height);
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('q', '80');
  return url.toString();
}

function selectBackgroundPhoto(photo) {
  // Unsplash's API guidelines require pinging a photo's download_location
  // whenever it's actually put to use (as opposed to just shown as a search
  // thumbnail) -- fire-and-forget, since a failed ping shouldn't block the
  // user from getting their background.
  fetch(photo.links.download_location, { headers: { Authorization: `Client-ID ${loadUnsplashAccessKey()}` } }).catch(() => {});

  currentUserBackground = {
    regularUrl: unsplashBackgroundUrl(photo),
    thumbUrl: photo.urls.thumb,
    photographerName: photo.user.name,
    photographerUrl: unsplashAttributionUrl(photo.user.links.html),
    photoLink: unsplashAttributionUrl(photo.links.html),
  };
  saveUserProfile(currentUserProfileSnapshot());
  applyBackground(currentUserBackground);
  renderSettingsBackgroundPreview();
  closeBackgroundModal();
}

function openBackgroundModal() {
  const hasKey = !!loadUnsplashAccessKey();
  backgroundKeySetupEl.classList.toggle('hidden', hasKey);
  backgroundBrowserEl.classList.toggle('hidden', !hasKey);
  backgroundKeyInput.value = '';
  backgroundSearchInput.value = '';
  backgroundPickerStatusEl.textContent = '';
  backgroundPickerGridEl.innerHTML = '';
  backgroundOverlay.classList.remove('hidden');
  if (hasKey) loadBackgroundPhotos('');
}

function closeBackgroundModal() {
  backgroundOverlay.classList.add('hidden');
}

settingsChangeBackgroundBtn.onclick = openBackgroundModal;
document.getElementById('background-close').onclick = closeBackgroundModal;

document.getElementById('background-key-save-btn').onclick = () => {
  const key = backgroundKeyInput.value.trim();
  if (!key) return;
  saveUnsplashAccessKey(key);
  backgroundKeySetupEl.classList.add('hidden');
  backgroundBrowserEl.classList.remove('hidden');
  loadBackgroundPhotos('');
};

document.getElementById('background-search-btn').onclick = () => loadBackgroundPhotos(backgroundSearchInput.value.trim());
backgroundSearchInput.onkeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    loadBackgroundPhotos(backgroundSearchInput.value.trim());
  }
};

// ---------------------------------------------------------------------------
// Boot -- gates the app behind the (fake, see login()/getMe() above) login
// screen. Everything above this point is safe to run unconditionally at
// script-load time (it's all function/event-listener setup, nothing reads
// `tasks` yet); only actually loading data and rendering waits for a user.
// ---------------------------------------------------------------------------

const loginScreenEl = document.getElementById('login-screen');
const loginMessageEl = document.getElementById('login-message');
const registerScreenEl = document.getElementById('register-screen');
const registerMessageEl = document.getElementById('register-message');
const registerFormEl = document.getElementById('register-form');
const registerSuccessEl = document.getElementById('register-success');
const registerSuccessMessageEl = document.getElementById('register-success-message');
const appMainEl = document.getElementById('app-main');
const appTitleEl = document.getElementById('app-title');

// Shared by the login and register screens' own feedback area -- kind is
// 'error' | 'success', styling .modal-message accordingly (see style.css).
function showAuthMessage(el, kind, text) {
  el.textContent = text;
  el.className = `modal-message ${kind}`;
}
function clearAuthMessage(el) {
  el.textContent = '';
  el.className = 'modal-message hidden';
}

// Populates every currentUser*/session global from a User object (see
// api-spec.yaml) -- shared by boot()'s stored-token path and the login
// form's submit handler below, since both need to do exactly this before
// calling startApp().
function applyUserSession(user) {
  currentUserId = user.id;
  currentUserNickname = user.nickname;
  currentUserAvatar = user.avatar;
  currentUserTimeFormat = user.timeFormat;
  currentUserBackground = user.background;
  currentUserLanguage = user.language || 'en';
  currentUserTheme = user.theme || 'dark';
  currentUserSubscription = user.subscription;
  activeTaskId = user.activeTaskId;
  activeOccurrenceDate = user.activeTaskId ? user.activeOccurrenceDate : null;
  todoViewMode = TODO_VIEW_MODES.includes(user.todoViewMode) ? user.todoViewMode : 'pending';
}

// Falls back to the generic title if a user's nickname isn't known yet (e.g.
// briefly, before getMe() resolves) -- see startApp().
function renderAppTitle() {
  appTitleEl.textContent = currentUserNickname ? t('app.titleWithName', { name: currentUserNickname }) : t('app.titleGeneric');
}

// The one-time "we now know who's logged in" entry point, run either right
// after boot() finds an existing token or right after the login form
// resolves a fresh one -- loads that user's tasks (the one genuinely
// awaited network read in this flow; every other User field the caller
// needs, like activeTaskId/todoViewMode, already came along for free on the
// getMe()/login response) and renders for the first time.
// `needsLanguageDetection` is true only the very first time this profile is
// ever loaded (see DEFAULT_USER_PROFILE.language) -- kicks off the one-time
// IP-based language/time-format guess (detectLanguageAndTimeFormatFromLocation)
// in the background, applying and saving it whenever it resolves.
async function startApp(needsLanguageDetection) {
  ({ tasks, occurrences } = await loadTasks());
  ensureSubscriptionPromptTask();
  applyStaticTranslations();
  renderAppTitle();
  renderUserAvatar();
  renderSubscribeHeaderButton();
  applyBackground(currentUserBackground);
  applyTheme(currentUserTheme);
  renderTodo();
  if (needsLanguageDetection) {
    detectLanguageAndTimeFormatFromLocation().then(({ language, timeFormat }) => {
      currentUserTimeFormat = timeFormat;
      applyLanguage(language);
      saveUserProfile(currentUserProfileSnapshot());
    });
  }
}

// Handles a `?verify=<token>` URL (the link the backend emails on
// registration, see POST /auth/register in api-spec.yaml) if one's present
// -- shows the result on the login screen and strips the token back out of
// the URL either way (via replaceState, no reload/history entry) so
// refreshing the page afterward doesn't try to re-consume the same
// already-used token. Runs before any token check in boot() below: this can
// land on a browser that's never logged in at all (a brand new account) or
// one that's currently logged in elsewhere/already logged out -- either way
// it's independent of whatever boot() does next. Async now that
// verifyEmailToken is a real API call -- boot() below deliberately doesn't
// await this, since it only ever affects the login screen's own message,
// nothing boot() itself goes on to do.
async function handleEmailVerificationLink() {
  const params = new URLSearchParams(location.search);
  const token = params.get('verify');
  if (!token) return;
  params.delete('verify');
  const newSearch = params.toString();
  history.replaceState(null, '', location.pathname + (newSearch ? `?${newSearch}` : '') + location.hash);

  const result = await verifyEmailToken(token);
  loginScreenEl.classList.remove('hidden');
  if (result.ok) {
    showAuthMessage(loginMessageEl, 'success', t('login.verifiedSuccess', { email: result.email }));
    document.getElementById('login-email').value = result.email;
  } else {
    showAuthMessage(
      loginMessageEl,
      'error',
      result.code === 'EXPIRED' ? t('login.verifyExpired') : t('login.verifyInvalid')
    );
  }
}

function boot() {
  // No account to read a saved language preference from yet at this point
  // (there's no token, or it hasn't been checked yet) -- resolved in
  // priority order, same idea (and same reasoning) as site-i18n.js's own
  // resolveInitialSiteLanguage for the separate marketing flow:
  //   1. A `?lang=en|hr` handoff from that marketing/legal flow (see
  //      site-i18n.js/landing.html etc.) -- lets clicking through to
  //      "Log in" from one of those pages show the login/register screen in
  //      the language the visitor was just reading, without touching any
  //      saved profile.
  //   2. Whatever was last explicitly chosen on this screen before (the
  //      EN/HR toggle below, or a previous handoff) -- PRE_LOGIN_LANG_STORAGE_KEY.
  //   3. IP-based geolocation (detectLanguageAndTimeFormatFromLocation),
  //      same as a first-ever login's own one-time guess -- async, so it's
  //      kicked off in the background below and only applied if the visitor
  //      hasn't logged in or made an explicit choice by the time it resolves.
  // Purely a pre-login display default either way: the moment a real login
  // succeeds, the account's own saved language (if any, else a first-run
  // detectLanguageAndTimeFormatFromLocation of its own) takes back over.
  currentUserLanguage = 'en';
  let preLoginLangExplicit = false;
  const bootUrlParams = new URLSearchParams(location.search);
  const langHandoff = bootUrlParams.get('lang');
  if (langHandoff === 'en' || langHandoff === 'hr') {
    currentUserLanguage = langHandoff;
    preLoginLangExplicit = true;
    localStorage.setItem(PRE_LOGIN_LANG_STORAGE_KEY, langHandoff);
    // Consumed once -- stripped so it doesn't linger in the address bar or
    // get treated as still-pending on a later reload, same idea as
    // handleEmailVerificationLink's own `verify` token below. `next`/`plan`
    // (if present, see the login form's own submit handler) are left alone.
    bootUrlParams.delete('lang');
    const strippedSearch = bootUrlParams.toString();
    history.replaceState(null, '', location.pathname + (strippedSearch ? `?${strippedSearch}` : '') + location.hash);
  } else {
    const storedPreLoginLang = localStorage.getItem(PRE_LOGIN_LANG_STORAGE_KEY);
    if (storedPreLoginLang === 'en' || storedPreLoginLang === 'hr') {
      currentUserLanguage = storedPreLoginLang;
      preLoginLangExplicit = true;
    }
  }
  applyStaticTranslations();
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentUserLanguage);
    btn.onclick = () => {
      preLoginLangExplicit = true;
      applyPreLoginLanguage(btn.dataset.lang);
    };
  });
  handleEmailVerificationLink();
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) {
    loginScreenEl.classList.remove('hidden');
    if (!preLoginLangExplicit) {
      detectLanguageAndTimeFormatFromLocation().then(({ language }) => {
        // Don't clobber a real login (the account's own language now
        // applies) or a manual toggle click that happened while this was
        // still in flight.
        if (preLoginLangExplicit || localStorage.getItem(AUTH_TOKEN_KEY)) return;
        applyPreLoginLanguage(language);
      });
    }
    return;
  }
  appMainEl.classList.remove('hidden');
  getMe(token)
    .then(async (user) => {
      // A direct/bookmarked visit to this URL while already logged in --
      // see the same check in the login form's submit handler below for the
      // logged-out case (landing.js normally sends an already-logged-in
      // visitor straight to checkout.html itself, never through here).
      // Deliberately checked only after getMe() resolves, not before -- an
      // expired/deleted account (see getMe's own comment) should land back
      // on the login screen, not get waved through to checkout.
      const bootParams = new URLSearchParams(location.search);
      if (bootParams.get('next') === 'checkout') {
        location.href = `checkout.html?plan=${encodeURIComponent(bootParams.get('plan') || 'monthly')}`;
        return;
      }
      applyUserSession(user);
      await startApp(user.language == null);
    })
    .catch((err) => {
      // The account itself (if it still existed) was already deleted
      // server-side for ACCOUNT_EXPIRED_INACTIVITY/ACCOUNT_DELETED_SCHEDULED
      // as part of handling this request (see GET /auth/me in api-spec.yaml)
      // -- this local token just needs clearing either way, including for
      // ACCOUNT_NOT_FOUND, where it was pointing at an already-gone account.
      localStorage.removeItem(AUTH_TOKEN_KEY);
      appMainEl.classList.add('hidden');
      loginScreenEl.classList.remove('hidden');
      if (err.code === 'ACCOUNT_EXPIRED_INACTIVITY' || err.code === 'ACCOUNT_DELETED_SCHEDULED') {
        showAuthMessage(loginMessageEl, 'error', describeAuthError(err));
      }
    });
}

document.getElementById('login-form').onsubmit = async (e) => {
  e.preventDefault();
  clearAuthMessage(loginMessageEl);
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  let token, user;
  try {
    ({ token } = await login(email, password));
    // Always resolved right after login() -- see getMe's own comment on why
    // the inactivity/existence check lives there instead of in login()
    // itself, and why that's safe to rely on here.
    user = await getMe(token);
  } catch (err) {
    showAuthMessage(loginMessageEl, 'error', describeAuthError(err));
    return;
  }
  localStorage.setItem(AUTH_TOKEN_KEY, token);

  // Arrived here via landing.html's pricing buttons while logged out (see
  // landing.js) -- now that login succeeded, continue straight on to the
  // checkout it was interrupted for, instead of opening the app.
  const params = new URLSearchParams(location.search);
  if (params.get('next') === 'checkout') {
    location.href = `checkout.html?plan=${encodeURIComponent(params.get('plan') || 'monthly')}`;
    return;
  }

  applyUserSession(user);
  loginScreenEl.classList.add('hidden');
  appMainEl.classList.remove('hidden');
  await startApp(user.language == null);
};

document.getElementById('show-register-link').onclick = (e) => {
  e.preventDefault();
  clearAuthMessage(loginMessageEl);
  loginScreenEl.classList.add('hidden');
  registerScreenEl.classList.remove('hidden');
};
document.getElementById('show-login-link').onclick = (e) => {
  e.preventDefault();
  clearAuthMessage(registerMessageEl);
  registerScreenEl.classList.add('hidden');
  loginScreenEl.classList.remove('hidden');
};
document.getElementById('register-success-back-btn').onclick = () => {
  registerSuccessEl.classList.add('hidden');
  registerFormEl.classList.remove('hidden');
  registerFormEl.reset();
  registerScreenEl.classList.add('hidden');
  loginScreenEl.classList.remove('hidden');
};

registerFormEl.onsubmit = async (e) => {
  e.preventDefault();
  clearAuthMessage(registerMessageEl);
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-password-confirm').value;
  if (password.length < 8) {
    showAuthMessage(registerMessageEl, 'error', t('register.passwordTooShort'));
    return;
  }
  if (password !== confirmPassword) {
    showAuthMessage(registerMessageEl, 'error', t('register.passwordMismatch'));
    return;
  }
  try {
    await registerUser(email, password);
  } catch (err) {
    showAuthMessage(
      registerMessageEl,
      'error',
      err.code === 'INVALID_EMAIL' ? t('register.invalidEmail') : err.code === 'EMAIL_TAKEN' ? t('register.emailTaken') : t('register.genericError')
    );
    return;
  }
  registerSuccessMessageEl.textContent = t('register.checkEmail', { email });
  registerFormEl.classList.add('hidden');
  registerSuccessEl.classList.remove('hidden');
};

boot();
