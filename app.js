// AUTH_TOKEN_KEY/codeError/apiFetch/decodeToken/describeSubscription/
// startTrialSubscription/createCheckoutSession/getCheckoutSessionStatus/
// createBillingPortalSession/cancelSubscription/scheduleAccountDeletion/
// cancelScheduledAccountDeletion
// all live in auth.js now (loaded before this file -- see index.html)
// since landing.html/checkout.html need them too and can't load this whole
// SPA script just for them.

// ---------------------------------------------------------------------------
// i18n -- English + Croatian. Deliberately NOT covering everything in the
// app: activity-log entries (task.log messages, written server-side) are
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
    'login.forgotLink': 'Forgot password?',
    'todo.backToToday': 'Today',
    'forgotPassword.title': 'Reset your password',
    'forgotPassword.hint': "Your account's email -- we'll send it a link to set a new password (valid for 30 minutes)",
    'forgotPassword.submit': 'Send link',
    'forgotPassword.sent': "If {email} has an account, a link to set a new password is on its way. It's valid for 30 minutes.",
    'forgotPassword.invalidEmail': 'Enter a valid email address.',
    'forgotPassword.failed': "Couldn't send the link. Please try again.",
    'resetPassword.title': 'Set a new password',
    'resetPassword.intro': 'Choose a new password for your account. Every other session gets signed out.',
    'resetPassword.submit': 'Set new password',
    'resetPassword.done': "Your new password is set, and you're logged in.",
    'resetPassword.invalid': 'That password reset link is invalid, has expired, or has already been used. You can ask for a new one with "Forgot password?".',
    'login.invalidCredentials': 'Incorrect email or password.',
    'login.networkError': 'Could not reach the server. Check your connection and try again.',
    'login.notVerified': "That email hasn't been verified yet – check your inbox for the verification link.",
    'login.accountExpired': 'This account was automatically deleted after 12 months of inactivity, along with all its data. Log in again to reopen it, empty.',
    'login.accountDeletedScheduled': 'This account was deleted, as scheduled, once its subscription ended, along with all its data. Log in again to reopen it, empty.',
    'login.accountRestored': 'Welcome back! This account had been deleted, so it has been reopened empty – its earlier tasks, notes and settings are gone for good.',
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
    'register.emailTaken': 'An account with that email already exists. Would you like to <a href="#" class="js-taken-login">log in</a>?',
    'register.genericError': 'Something went wrong – please try again.',
    'register.checkEmail': "We've sent a verification link to {email}. Click it within 6 hours to activate your account.",
    'register.checkEmailCheckout': "We've sent a verification link to {email}. Click it within 6 hours – it'll log you in and take you straight on to payment.",

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
    'menu.faq': 'FAQ',
    'menu.support': 'Contact support',
    'menu.logout': 'Log out',
    'menu.logoutTitle': 'Log out (for testing the login screen)',

    'app.titleGeneric': 'To-Do List',
    'title.pending': 'Pending and overdue tasks for',
    'title.next-recurrence': 'Upcoming tasks for',
    'title.all': 'All tasks for',
    'title.pendingNoDay': 'Pending and overdue tasks',
    'title.next-recurrenceNoDay': 'Upcoming tasks',
    'title.allNoDay': 'All tasks',

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
    'menu.autoTimer': 'Auto timer ({time})',
    'menu.pauseTimer': 'Pause timer',
    'menu.cancelTimer': 'Cancel timer',
    'menu.resumeTimer': 'Resume timer',
    'menu.markDone': 'Mark as done',
    'menu.markFailed': 'Mark as failed',
    'menu.focus': 'Focus',
    'menu.unfocus': 'Unfocus',
    'menu.show': 'Show',
    'menu.hide': 'Hide',
    'menu.pauseRecurrence': 'Pause recurrence until…',
    'menu.resumeRecurrence': 'Resume recurrence now',
    'pause.title': 'Pause "{name}"',
    'pause.hint': 'From {date}, until the date you pick -- recurrence starts again on that exact date.',
    'pause.summary': 'Paused {from} – {to}, resumes {resume}.',
    'pause.nothingAfter': "This task's recurrence ends before there's anything left to resume.",
    'datePicker.prevMonth': 'Previous month',
    'datePicker.nextMonth': 'Next month',
    'menu.taskStats': 'Task stats',
    'menu.deleteMeasurement': 'Delete this measurement',
    'agenda.measuredFocus': 'Focused {from}–{to}',
    'agenda.measuredTimer': 'Timed {from}–{to}',

    'sidePanel.agendaHeading': "Today's agenda",
    'sidePanel.agendaEmpty': 'No tasks today.',
    'sidePanel.occurrence': 'Occurrence',
    'sidePanel.occurrenceTitle': 'Just this occurrence',
    'sidePanel.task': 'Task',
    'sidePanel.taskTitle': 'This task, every occurrence',
    'sidePanel.series': 'Series',
    'sidePanel.seriesTitle': 'Every task in this series',
    'sidePanel.commentPlaceholder': 'Add a note about this task…',
    'sidePanel.addNote': 'Add note',
    'sidePanel.notes': 'Notes',
    'sidePanel.occurrenceDetails': 'This occurrence ({date})',
    'sidePanel.activity': 'Activity',
    'sidePanel.noNotes': 'No notes yet.',
    'sidePanel.noActivity': 'No activity yet.',
    'sidePanel.editNote': 'Edit note',
    'sidePanel.noteLabel': 'Note',
    'sidePanel.editNotes': 'Edit notes',
    'sidePanel.stopEditingNotes': 'Stop editing notes',

    'timer.setTitle': 'Set a timer',
    'timer.countUp': 'Count up (no fixed duration – stops automatically after 6 hours)',
    'timer.minutesLabel': 'Minutes to work on this task',
    'timer.continuePastZero': 'Continue counting down past zero instead of stopping',
    'timer.start': 'Start',
    'timer.set': 'Set',
    'taskForm.editTask': 'Edit task',
    'taskEditor.title': 'Edit task – {name}',
    'taskEditor.tabDetails': 'Details',
    'taskEditor.tabPattern': 'Recurrence',
    'taskEditor.tabOccurrences': 'Occurrences',
    'taskEditor.detailsHint': 'Changes here apply to every occurrence of this task, past and future.',
    'taskEditor.patternHint': 'Changes here apply from today on -- past occurrences stay as they were.',
    'taskEditor.occurrencesHint': 'Changes here are saved right away.',
    'taskEditor.deleteTask': 'Delete task',
    'taskEditor.next': 'next',
    'taskEditor.findOccurrence': 'Find occurrence…',
    'taskEditor.findOccurrenceTitle': 'Find an upcoming occurrence',
    'taskEditor.findOccurrenceHint': 'Only the dates this task recurs on can be picked.',
    'taskEditor.noUpcomingOccurrences': 'This task has no upcoming occurrences.',
    'taskEditor.occurrenceDetails': 'Details',
    'taskEditor.occurrenceDetailsPlaceholder': 'Anything specific to this occurrence…',
    'taskEditor.noOccurrences': 'No occurrences yet.',
    'taskEditor.statusDone': 'Done',
    'taskEditor.statusFailed': 'Failed',
    'taskEditor.statusMissed': 'Not done',
    'taskEditor.statusPending': 'Due today',
    'taskEditor.statusUpcoming': 'Upcoming',
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
      "Passive – a plain reminder, not an actionable task: can't be focused on or timed, and its checkbox marks it failed instead of done. With a due time, it counts as done once that time has passed (you can still mark it failed); an all-day one stays visible until you mark it failed or, once it's no longer due today, dismiss it.",
    'taskForm.recurUntilCompletedDesc':
      "Recur until completed – never marked overdue or failed: if not done by its due time, it's rescheduled to the next day instead (same time), and the missed occurrence stays visible alongside the new one until either is checked off. A recurring task's next occurrence is then counted from whenever it's actually completed, not the original schedule.",
    'taskForm.endDateBeforeDue': "End date can't be before the due date.",

    'manualOccurrence.title': 'Add an occurrence',
    'manualOccurrence.add': 'Add occurrence…',
    'manualOccurrence.exists': 'This task already has an occurrence on that date.',

    'manage.title': 'To-do list',
    'manage.selectSeries': 'Select a series on the left to edit it.',
    'manage.backToList': '‹ Back',
    'manage.addNewTask': '+ Add new task',
    'manage.seriesNamePlaceholder': 'Series name',
    'manage.saved': 'Saved',
    'manage.noTasksYet': 'No tasks yet.',
    'manage.resetName': 'Reset name to match series name',
    'manage.removeFromSeries': 'Remove from series',

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
    'taskStats.allTitle': 'Stats: all tasks',
    'taskStats.seriesTitle': 'Stats: series "{name}"',
    'taskStats.overview': 'Overview',
    'taskStats.taskCount': 'Tasks',
    'taskStats.occurrencesToDate': 'Occurrences to date',
    'taskStats.timePerDay': 'Time per day',
    'taskStats.since': 'Since the reset on {date}',
    'taskStats.reset': 'Reset stats…',
    'taskStats.resetConfirm': 'Click again to reset',
    'manage.allStats': 'Stats (all tasks)',
    'manage.seriesStats': 'Series stats',

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
    'settings.weekStart': 'First day of the week',
    'settings.weekStartMonday': 'Monday',
    'settings.weekStartSunday': 'Sunday',
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
    'settings.resumeSubscription': 'Resume subscription',
    'settings.resumeSubscriptionFailed': "Your subscription couldn't be resumed. Please try again.",
    'settings.manageBilling': 'Manage billing…',
    'settings.manageBillingUnavailable': 'Billing management is temporarily unavailable. Please try again later.',
    'settings.manageBillingFailed': "Couldn't open billing management. Please try again.",
    'settings.scheduledDeletionNotice': 'This account will be deleted upon subscription expiration.',
    'settings.cancelScheduledDeletion': 'Cancel scheduled deletion',
    'settings.password': 'Password',
    'settings.changePassword': 'Change password…',
    'settings.email': 'Login email',
    'settings.changeEmail': 'Change email…',
    'settings.pendingEmail': 'Waiting for you to confirm {email} -- check that inbox for the link.',
    'changeEmail.title': 'Change login email',
    'changeEmail.new': 'New email',
    'changeEmail.submit': 'Send confirmation link',
    'changeEmail.sent': "We sent a confirmation link to {email} (valid for 6 hours). Until you open it, keep logging in with {current}. {current} also got a notice with a link to undo the change, in case it wasn't you.",
    'changeEmail.invalid': 'Enter a valid email address.',
    'changeEmail.same': 'That is already your login email.',
    'changeEmail.taken': 'An account with that email already exists.',
    'changeEmail.genericError': "Couldn't start the email change. Please try again.",
    'verifyEmailChange.success': 'Your login email is now {email}.',
    'verifyEmailChange.expired': 'That confirmation link has expired. Request the email change again from Settings.',
    'verifyEmailChange.invalid': 'That confirmation link is invalid or has already been used.',
    'verifyEmailChange.taken': 'That address has been taken by another account in the meantime, so the change was cancelled.',
    'undoEmailChange.title': 'Email change undone -- set a new password',
    'undoEmailChange.intro': 'Your login email is {email} again, and every session has been signed out. Whoever changed it may know your password, so choose a new one now.',
    'undoEmailChange.submit': 'Set new password',
    'undoEmailChange.done': 'Your login email is {email} again, and your new password is set.',
    'undoEmailChange.skipped': "Your login email is {email} again, and every session has been signed out. You can still log in with your current password -- change it in Settings as soon as you can.",
    'undoEmailChange.invalid': 'That undo link is invalid, has expired, or has already been used.',
    'undoEmailChange.taken': "Your previous address now belongs to another account, so it couldn't be restored. Please contact support.",
    'undoEmailChange.resetExpired': 'That password reset has expired. Log in with your current password and change it in Settings.',
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
      "This permanently deletes every task, note, and setting in your account – immediately, with no way to get them back. Download a copy first if you want to keep it. Only your email, password and whether you've had a free trial are kept, for 12 months: logging in again during that time reopens the account, empty.",
    'deleteAccount.subscriberNotice':
      "You have an active Pro subscription. Deleting immediately forfeits the rest of your paid period with no refund, and cuts off access right away. You can instead schedule deletion for when your subscription ends – it'll be cancelled now, but you'll keep full access until then.",
    'deleteAccount.confirm': 'Delete my account permanently',
    'deleteAccount.confirmImmediate': 'Delete immediately',
    'deleteAccount.schedule': 'Schedule deletion for {date}',

    'subscribe.title': 'Upgrade to A-To-Do Pro',
    'subscribe.cta': 'Start free trial…',
    'subscribe.ctaPaid': 'Subscribe…',
    'subscribe.priceHintPaid': 'Just <span data-price-plan="monthly"></span>/month <span data-anchor-plan="monthly"></span>, or <span data-price-plan="annual"></span>/year <span data-anchor-plan="annual"></span>.',
    'subscribe.headerCta': 'Subscribe',
    'subscribe.maybeLater': 'Maybe later',
    'subscribe.benefitTasks': 'Unlimited tasks, recurring or not',
    'subscribe.benefitNotes': 'Unlimited notes on every task',
    'subscribe.benefitAds': 'No more subscription reminders cluttering your list',
    'subscribe.priceHint': 'Just <span data-price-plan="monthly"></span>/month <span data-anchor-plan="monthly"></span> afterwards – start with a free 14-day trial, no payment required now.',
    'subscribe.reasonCreateLimit': "You've hit a limit of what we can do for you for free. Subscribe today and keep adding to your To-Do list indefinitely!",
    'subscribe.reasonTaskLimit': "This task is beyond your free plan's limit, so it can't be completed or noted on.",
    'subscribe.taskName': 'Subscribe to A-To-Do',
    'subscribe.taskDescription': 'Unlock unlimited tasks and notes',
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
    'saveStatus.maintenance': "A-To-Do is being updated -- your latest changes will be saved as soon as it's back, in a few minutes. Keep this tab open until this message goes away.",
    'login.maintenance': 'A-To-Do is being updated. Please try again in a few minutes -- this page will keep trying.',
    'siteStatus.announcement': 'A-To-Do will be briefly unavailable for an update on {date} (about {minutes} min). Your tasks are safe -- changes made meanwhile are saved once it’s back.',
    'siteStatus.newVersion': 'A new version of A-To-Do is available.',
    'siteStatus.reload': 'Reload',
    'saveStatus.retrying': 'Retrying…',
    'data.importSaveFailed':
      "The import didn't go through, so your tasks are as they were: {message} Try again in a bit, and if it keeps happening, please contact support and attach the file you tried to import so we can look into it.",
    'data.importTitle': 'Importing data',
    'data.importSize': 'The file is {size}.',
    'data.importMetered': 'You seem to be on a metered or data-saving connection -- the upload will use about {size} of data.',
    'data.importProgress': 'Uploading… {done} of {total}',
    'data.importCommitting': 'Saving…',
    'data.importTooLarge': 'That file is too large to import.',
    'taskForm.timeZone': 'Time zone',
    'taskForm.timeZoneFluid': 'Fluid -- local time wherever you are',
    'todo.showTimerTask': 'Show this task',
    'todo.zoneTime': '{time} {city}',
  },
  hr: {
    'login.title': 'Prijava',
    'login.email': 'E-mail',
    'login.password': 'Lozinka',
    'login.submit': 'Prijava',
    'login.noAccount': 'Nemate račun?',
    'login.registerLink': 'Napravite ga',
    'login.forgotLink': 'Zaboravili ste lozinku?',
    'todo.backToToday': 'Danas',
    'forgotPassword.title': 'Resetiranje lozinke',
    'forgotPassword.hint': 'E-mail vašeg računa -- na njega ćemo poslati poveznicu za postavljanje nove lozinke (vrijedi 30 minuta)',
    'forgotPassword.submit': 'Pošalji poveznicu',
    'forgotPassword.sent': 'Ako za {email} postoji račun, poveznica za postavljanje nove lozinke je na putu. Vrijedi 30 minuta.',
    'forgotPassword.invalidEmail': 'Upišite valjanu e-mail adresu.',
    'forgotPassword.failed': 'Poveznicu nije bilo moguće poslati. Pokušajte ponovno.',
    'resetPassword.title': 'Postavite novu lozinku',
    'resetPassword.intro': 'Odaberite novu lozinku za svoj račun. Sve ostale sesije bit će odjavljene.',
    'resetPassword.submit': 'Postavi novu lozinku',
    'resetPassword.done': 'Nova lozinka je postavljena i prijavljeni ste.',
    'resetPassword.invalid': 'Ta poveznica za resetiranje lozinke nije valjana, istekla je ili je već iskorištena. Novu možete zatražiti putem "Zaboravili ste lozinku?".',
    'login.invalidCredentials': 'Netočan e-mail ili lozinka.',
    'login.networkError': 'Nije moguće spojiti se na poslužitelj. Provjerite vezu i pokušajte ponovno.',
    'login.notVerified': 'Taj e-mail još nije potvrđen – provjerite poštanski sandučić za poveznicu za potvrdu.',
    'login.accountExpired': 'Ovaj račun je automatski izbrisan nakon 12 mjeseci neaktivnosti, zajedno sa svim podacima. Prijavite se ponovno kako biste ga ponovno otvorili, prazan.',
    'login.accountDeletedScheduled': 'Ovaj račun je izbrisan, kako je zakazano, po isteku pretplate, zajedno sa svim podacima. Prijavite se ponovno kako biste ga ponovno otvorili, prazan.',
    'login.accountRestored': 'Dobro došli natrag! Ovaj račun bio je izbrisan pa je ponovno otvoren prazan – njegovi raniji zadaci, bilješke i postavke nepovratno su izbrisani.',
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
    'register.emailTaken': 'Račun s tom e-mail adresom već postoji. Želite li se <a href="#" class="js-taken-login">prijaviti</a>?',
    'register.genericError': 'Nešto je pošlo po zlu – pokušajte ponovno.',
    'register.checkEmail': 'Poslali smo poveznicu za potvrdu na {email}. Kliknite je unutar 6 sati kako biste aktivirali račun.',
    'register.checkEmailCheckout': 'Poslali smo poveznicu za potvrdu na {email}. Kliknite je unutar 6 sati – prijavit će vas i odvesti ravno na plaćanje.',

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
    'menu.faq': 'Česta pitanja',
    'menu.support': 'Kontakt podrške',
    'menu.logout': 'Odjava',
    'menu.logoutTitle': 'Odjava (za testiranje zaslona za prijavu)',

    'app.titleGeneric': 'Popis obveza',
    'title.pending': 'Zadaci na čekanju i zakašnjeli za',
    'title.next-recurrence': 'Nadolazeći zadaci za',
    'title.all': 'Svi zadaci za',
    'title.pendingNoDay': 'Zadaci na čekanju i zakašnjeli',
    'title.next-recurrenceNoDay': 'Nadolazeći zadaci',
    'title.allNoDay': 'Svi zadaci',

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
    'menu.autoTimer': 'Automatski mjerač ({time})',
    'menu.pauseTimer': 'Pauziraj mjerač vremena',
    'menu.cancelTimer': 'Odustani od mjerača vremena',
    'menu.resumeTimer': 'Nastavi mjerač vremena',
    'menu.markDone': 'Označi kao obavljeno',
    'menu.markFailed': 'Označi kao neuspješno',
    'menu.focus': 'Fokusiraj',
    'menu.unfocus': 'Ukloni fokus',
    'menu.show': 'Prikaži',
    'menu.hide': 'Sakrij',
    'menu.pauseRecurrence': 'Pauziraj ponavljanje do…',
    'menu.resumeRecurrence': 'Nastavi ponavljanje odmah',
    'pause.title': 'Pauziraj "{name}"',
    'pause.hint': 'Od {date} do datuma koji odaberete -- ponavljanje se nastavlja točno na taj datum.',
    'pause.summary': 'Pauzirano {from} – {to}, nastavlja se {resume}', // no trailing period: Croatian dates already end in one
    'pause.nothingAfter': 'Ponavljanje ovog zadatka završava prije nego što bi se imalo što nastaviti.',
    'datePicker.prevMonth': 'Prethodni mjesec',
    'datePicker.nextMonth': 'Sljedeći mjesec',
    'menu.taskStats': 'Statistika zadatka',
    'menu.deleteMeasurement': 'Izbriši ovo mjerenje',
    'agenda.measuredFocus': 'Fokus {from}–{to}',
    'agenda.measuredTimer': 'Mjereno {from}–{to}',

    'sidePanel.agendaHeading': 'Današnji raspored',
    'sidePanel.agendaEmpty': 'Danas nema zadataka.',
    'sidePanel.occurrence': 'Pojava',
    'sidePanel.occurrenceTitle': 'Samo ova pojava',
    'sidePanel.task': 'Zadatak',
    'sidePanel.taskTitle': 'Ovaj zadatak, sve pojave',
    'sidePanel.series': 'Niz',
    'sidePanel.seriesTitle': 'Svaki zadatak u ovom nizu',
    'sidePanel.commentPlaceholder': 'Dodajte bilješku o ovom zadatku…',
    'sidePanel.addNote': 'Dodaj bilješku',
    'sidePanel.notes': 'Bilješke',
    'sidePanel.occurrenceDetails': 'Ova pojava ({date})',
    'sidePanel.activity': 'Aktivnost',
    'sidePanel.noNotes': 'Još nema bilješki.',
    'sidePanel.noActivity': 'Još nema aktivnosti.',
    'sidePanel.editNote': 'Uredi bilješku',
    'sidePanel.noteLabel': 'Bilješka',
    'sidePanel.editNotes': 'Uredi bilješke',
    'sidePanel.stopEditingNotes': 'Prestani uređivati bilješke',

    'timer.setTitle': 'Postavi mjerač vremena',
    'timer.countUp': 'Broji unaprijed (bez fiksnog trajanja – automatski se zaustavlja nakon 6 sati)',
    'timer.minutesLabel': 'Minute rada na ovom zadatku',
    'timer.continuePastZero': 'Nastavi odbrojavati ispod nule umjesto zaustavljanja',
    'timer.start': 'Pokreni',
    'timer.set': 'Postavi',
    'taskForm.editTask': 'Uredi zadatak',
    'taskEditor.title': 'Uredi zadatak – {name}',
    'taskEditor.tabDetails': 'Podaci',
    'taskEditor.tabPattern': 'Ponavljanje',
    'taskEditor.tabOccurrences': 'Pojave',
    'taskEditor.detailsHint': 'Promjene ovdje vrijede za sve pojave ovog zadatka, prošle i buduće.',
    'taskEditor.patternHint': 'Promjene ovdje vrijede od danas nadalje -- prošle pojave ostaju kakve jesu.',
    'taskEditor.occurrencesHint': 'Promjene ovdje spremaju se odmah.',
    'taskEditor.deleteTask': 'Izbriši zadatak',
    'taskEditor.next': 'sljedeća',
    'taskEditor.findOccurrence': 'Pronađi pojavu…',
    'taskEditor.findOccurrenceTitle': 'Pronađi nadolazeću pojavu',
    'taskEditor.findOccurrenceHint': 'Mogu se odabrati samo datumi na koje se ovaj zadatak ponavlja.',
    'taskEditor.noUpcomingOccurrences': 'Ovaj zadatak nema nadolazećih pojava.',
    'taskEditor.occurrenceDetails': 'Pojedinosti',
    'taskEditor.occurrenceDetailsPlaceholder': 'Nešto specifično za ovu pojavu…',
    'taskEditor.noOccurrences': 'Još nema pojava.',
    'taskEditor.statusDone': 'Obavljeno',
    'taskEditor.statusFailed': 'Neuspjelo',
    'taskEditor.statusMissed': 'Nije obavljeno',
    'taskEditor.statusPending': 'Danas',
    'taskEditor.statusUpcoming': 'Nadolazeće',
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
      "Pasivno – običan podsjetnik, a ne izvediv zadatak: ne može se fokusirati niti mjeriti vrijeme, a njegova kvačica označava neuspjeh umjesto dovršenosti. S rokom u određeno vrijeme smatra se obavljenim čim to vrijeme prođe (i dalje ga možete označiti neuspješnim); cjelodnevno ostaje vidljivo dok ga ne označite neuspješnim ili, kad više nije na redu za danas, ga uklonite.",
    'taskForm.recurUntilCompletedDesc':
      "Ponavljaj do dovršetka – nikad se ne označava kao zakašnjelo ili neuspješno: ako nije obavljeno do roka, premješta se na sljedeći dan (isto vrijeme), a propušteni rok ostaje vidljiv uz novi sve dok jedan od njih ne označite obavljenim. Sljedeća pojava ponavljajućeg zadatka tada se računa od trenutka kad je stvarno dovršen, a ne prema izvornom rasporedu.",
    'taskForm.endDateBeforeDue': 'Datum završetka ne može biti prije datuma dospijeća.',

    'manualOccurrence.title': 'Dodaj pojavu',
    'manualOccurrence.add': 'Dodaj pojavu…',
    'manualOccurrence.exists': 'Ovaj zadatak već ima pojavu na taj datum.',

    'manage.title': 'Popis zadataka',
    'manage.selectSeries': 'Odaberite niz slijeva za njegovo uređivanje.',
    'manage.backToList': '‹ Natrag',
    'manage.addNewTask': '+ Dodaj novi zadatak',
    'manage.seriesNamePlaceholder': 'Naziv niza',
    'manage.saved': 'Spremljeno',
    'manage.noTasksYet': 'Još nema zadataka.',
    'manage.resetName': 'Vrati naziv na naziv niza',
    'manage.removeFromSeries': 'Ukloni iz niza',

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
    'taskStats.allTitle': 'Statistika: svi zadaci',
    'taskStats.seriesTitle': 'Statistika: serija "{name}"',
    'taskStats.overview': 'Pregled',
    'taskStats.taskCount': 'Zadaci',
    'taskStats.occurrencesToDate': 'Pojavljivanja do danas',
    'taskStats.timePerDay': 'Vrijeme po danu',
    'taskStats.since': 'Od resetiranja {date}',
    'taskStats.reset': 'Resetiraj statistiku…',
    'taskStats.resetConfirm': 'Klikni ponovno za resetiranje',
    'manage.allStats': 'Statistika (svi zadaci)',
    'manage.seriesStats': 'Statistika serije',

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
    'settings.weekStart': 'Prvi dan u tjednu',
    'settings.weekStartMonday': 'Ponedjeljak',
    'settings.weekStartSunday': 'Nedjelja',
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
    'settings.resumeSubscription': 'Nastavi pretplatu',
    'settings.resumeSubscriptionFailed': 'Pretplatu nije bilo moguće nastaviti. Pokušajte ponovno.',
    'settings.manageBilling': 'Upravljaj plaćanjem…',
    'settings.manageBillingUnavailable': 'Upravljanje plaćanjem trenutno nije dostupno. Pokušajte ponovno kasnije.',
    'settings.manageBillingFailed': 'Upravljanje plaćanjem nije se moglo otvoriti. Pokušajte ponovno.',
    'settings.scheduledDeletionNotice': 'Ovaj račun će biti izbrisan po isteku pretplate.',
    'settings.cancelScheduledDeletion': 'Otkaži zakazano brisanje',
    'settings.password': 'Lozinka',
    'settings.changePassword': 'Promijeni lozinku…',
    'settings.email': 'E-pošta za prijavu',
    'settings.changeEmail': 'Promijeni e-poštu…',
    'settings.pendingEmail': 'Čeka se potvrda adrese {email} -- poveznicu potražite u tom sandučiću.',
    'changeEmail.title': 'Promijeni e-poštu za prijavu',
    'changeEmail.new': 'Nova e-pošta',
    'changeEmail.submit': 'Pošalji poveznicu za potvrdu',
    'changeEmail.sent': 'Poveznicu za potvrdu poslali smo na {email} (vrijedi 6 sati). Dok je ne otvorite, i dalje se prijavljujte s {current}. Na {current} stigla je i obavijest s poveznicom za poništavanje promjene, za slučaj da to niste bili vi.',
    'changeEmail.invalid': 'Unesite ispravnu adresu e-pošte.',
    'changeEmail.same': 'To je već vaša e-pošta za prijavu.',
    'changeEmail.taken': 'Račun s tom adresom e-pošte već postoji.',
    'changeEmail.genericError': 'Promjenu e-pošte nije bilo moguće pokrenuti. Pokušajte ponovno.',
    'verifyEmailChange.success': 'Vaša e-pošta za prijavu sada je {email}.',
    'verifyEmailChange.expired': 'Poveznica za potvrdu je istekla. Ponovno zatražite promjenu e-pošte u Postavkama.',
    'verifyEmailChange.invalid': 'Poveznica za potvrdu nije ispravna ili je već iskorištena.',
    'verifyEmailChange.taken': 'Tu je adresu u međuvremenu preuzeo drugi račun, pa je promjena otkazana.',
    'undoEmailChange.title': 'Promjena e-pošte poništena -- postavite novu lozinku',
    'undoEmailChange.intro': 'Vaša e-pošta za prijavu ponovno je {email}, a sve su sesije odjavljene. Tko god ju je promijenio možda zna vašu lozinku, pa odmah odaberite novu.',
    'undoEmailChange.submit': 'Postavi novu lozinku',
    'undoEmailChange.done': 'Vaša e-pošta za prijavu ponovno je {email}, a nova lozinka je postavljena.',
    'undoEmailChange.skipped': 'Vaša e-pošta za prijavu ponovno je {email}, a sve su sesije odjavljene. I dalje se možete prijaviti trenutnom lozinkom -- promijenite je u Postavkama čim prije.',
    'undoEmailChange.invalid': 'Poveznica za poništavanje nije ispravna, istekla je ili je već iskorištena.',
    'undoEmailChange.taken': 'Vaša prethodna adresa sada pripada drugom računu, pa je nije bilo moguće vratiti. Obratite se podršci.',
    'undoEmailChange.resetExpired': 'Postavljanje lozinke je isteklo. Prijavite se trenutnom lozinkom i promijenite je u Postavkama.',
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
      'Ovime se trajno briše svaki zadatak, bilješka i postavka na vašem računu – odmah, bez mogućnosti vraćanja. Preuzmite kopiju prije brisanja ako je želite zadržati. Čuvaju se samo vaša e-mail adresa, lozinka i podatak jeste li već imali besplatno probno razdoblje, 12 mjeseci: ponovna prijava u tom razdoblju ponovno otvara račun, prazan.',
    'deleteAccount.subscriberNotice':
      'Imate aktivnu Pro pretplatu. Trenutačno brisanje znači gubitak preostalog plaćenog razdoblja bez povrata novca, te odmah gubite pristup. Umjesto toga možete zakazati brisanje za trenutak isteka pretplate – pretplata će se odmah otkazati, ali pristup ćete imati do tada.',
    'deleteAccount.confirm': 'Trajno izbriši moj račun',
    'deleteAccount.confirmImmediate': 'Izbriši odmah',
    'deleteAccount.schedule': 'Zakaži brisanje za {date}',

    'subscribe.title': 'Nadogradite na A-To-Do Pro',
    'subscribe.cta': 'Isprobajte besplatno…',
    'subscribe.ctaPaid': 'Pretplati se…',
    'subscribe.priceHintPaid': 'Samo <span data-price-plan="monthly"></span> mjesečno <span data-anchor-plan="monthly"></span> ili <span data-price-plan="annual"></span> godišnje <span data-anchor-plan="annual"></span>.',
    'subscribe.headerCta': 'Pretplati se',
    'subscribe.maybeLater': 'Možda kasnije',
    'subscribe.benefitTasks': 'Neograničen broj zadataka, ponavljajućih ili ne',
    'subscribe.benefitNotes': 'Neograničen broj bilješki na svakom zadatku',
    'subscribe.benefitAds': 'Bez podsjetnika za pretplatu koji zatrpavaju popis',
    'subscribe.priceHint': 'Nakon toga samo <span data-price-plan="monthly"></span> mjesečno <span data-anchor-plan="monthly"></span> – započnite s besplatnim probnim razdobljem od 14 dana, bez plaćanja sada.',
    'subscribe.reasonCreateLimit': 'Dosegli ste granicu onoga što možemo ponuditi besplatno. Pretplatite se danas i nastavite neograničeno dodavati zadatke na svoj popis obveza!',
    'subscribe.reasonTaskLimit': 'Ovaj zadatak je izvan ograničenja besplatnog plana, pa se ne može završiti ni komentirati.',
    'subscribe.taskName': 'Pretplatite se na A-To-Do',
    'subscribe.taskDescription': 'Otključajte neograničen broj zadataka i bilješki',
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
    'saveStatus.maintenance': 'A-To-Do se ažurira -- vaše posljednje promjene spremit će se čim ponovno proradi, za nekoliko minuta. Ne zatvarajte ovu karticu dok ova poruka ne nestane.',
    'login.maintenance': 'A-To-Do se ažurira. Pokušajte ponovno za nekoliko minuta -- ova stranica će pokušavati sama.',
    'siteStatus.announcement': 'A-To-Do će {date} nakratko biti nedostupan zbog ažuriranja (oko {minutes} min). Vaši zadaci su sigurni -- promjene napravljene u međuvremenu spremit će se čim ponovno proradi.',
    'siteStatus.newVersion': 'Dostupna je nova verzija A-To-Do-a.',
    'siteStatus.reload': 'Učitaj ponovno',
    'saveStatus.retrying': 'Ponovni pokušaj…',
    'data.importSaveFailed':
      'Uvoz nije uspio, pa su vaši zadaci ostali kakvi su bili: {message} Pokušajte ponovno za koji trenutak, a ako se problem nastavi, javite se podršci i priložite datoteku koju ste pokušali uvesti kako bismo to mogli istražiti.',
    'data.importTitle': 'Uvoz podataka',
    'data.importSize': 'Datoteka ima {size}.',
    'data.importMetered': 'Čini se da koristite ograničenu vezu ili uštedu podataka -- prijenos će potrošiti oko {size} podataka.',
    'data.importProgress': 'Prijenos… {done} od {total}',
    'data.importCommitting': 'Spremanje…',
    'data.importTooLarge': 'Ta je datoteka prevelika za uvoz.',
    'taskForm.timeZone': 'Vremenska zona',
    'taskForm.timeZoneFluid': 'Promjenjiva -- lokalno vrijeme gdje god bili',
    'todo.showTimerTask': 'Prikaži ovaj zadatak',
    'todo.zoneTime': '{time} {city}',
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
  // Anchor-price badges inside the text just swapped in (anchor-prices.js).
  fillAnchorPrices(document, currentUserLanguage);
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
//
// opts.tabs ([{ key, label, render? }]) splits the form into tabs: each
// field (or a grouped row's first field) names its tab with `tab` (default:
// the first one), and a tab with `render(pane)` gets custom content drawn
// into its pane instead -- e.g. openTaskEditor's occurrence list, whose own
// actions apply immediately rather than on OK. opts.initialTab picks which
// tab opens first.
function showFormModal(title, fields, opts = {}) {
  return new Promise((resolve) => {
    modalTitle.textContent = title;
    modalFields.innerHTML = '';

    let tabPanes = null;
    let activeTabKey = null;
    const tabButtons = new Map();
    function activateTab(key) {
      activeTabKey = key;
      for (const [k, pane] of tabPanes) pane.classList.toggle('hidden', k !== key);
      for (const [k, btn] of tabButtons) btn.classList.toggle('active', k === key);
    }
    if (opts.tabs) {
      tabPanes = new Map();
      const bar = document.createElement('div');
      bar.className = 'modal-tabs';
      for (const tab of opts.tabs) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'modal-tab';
        btn.textContent = tab.label;
        btn.onclick = () => activateTab(tab.key);
        bar.appendChild(btn);
        tabButtons.set(tab.key, btn);
      }
      modalFields.appendChild(bar);
      for (const tab of opts.tabs) {
        const pane = document.createElement('div');
        pane.className = 'modal-tab-pane';
        modalFields.appendChild(pane);
        tabPanes.set(tab.key, pane);
      }
    }
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
          // Passwords are taken exactly as typed -- trimming would quietly
          // change one that starts/ends with a space.
          getValue = () => (field.type === 'password' ? input.value : input.value.trim());
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

      const tabKey = (Array.isArray(entry) ? entry[0].tab : entry.tab) || (opts.tabs && opts.tabs[0].key);
      (tabPanes ? tabPanes.get(tabKey) : modalFields).appendChild(wrap);
    }
    if (opts.tabs) {
      for (const tab of opts.tabs) if (tab.render) tab.render(tabPanes.get(tab.key));
      activateTab(opts.initialTab || opts.tabs[0].key);
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
    // select-all-on-focus (except textareas) is handled generically by sharedInputBehavior.js
    const firstFocusable = tabPanes ? interactiveEls.find((el) => tabPanes.get(activeTabKey).contains(el)) : interactiveEls[0];
    if (firstFocusable) firstFocusable.focus();
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
        if (visible && enabled && f.required && (f.isArray ? value.length === 0 : !value)) {
          // Don't fail silently on a tab that isn't showing.
          const pane = tabPanes && f.wrap.closest('.modal-tab-pane');
          if (pane) activateTab([...tabPanes].find(([, p]) => p === pane)[0]);
          return;
        }
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
// checkoutPlan: the plan a visitor from the landing page's pricing buttons
// chose (see checkoutPlanFromUrl) -- the emailed link then logs them in
// and continues to checkout for it.
async function registerUser(email, password, checkoutPlan = null) {
  const normalizedEmail = email.trim().toLowerCase();
  if (!isValidEmail(normalizedEmail)) throw codeError('INVALID_EMAIL');
  const body = { email: normalizedEmail, password };
  if (checkoutPlan) body.checkoutPlan = checkoutPlan;
  await apiFetch('/auth/register', { method: 'POST', body });
}

// POST /auth/verify-email -- resolves a verification link's token. Returns
// { ok: true, email, token?, user? } (token/user: verifying also logged the
// new account in) or { ok: false, code } rather than throwing, since
// handleEmailVerificationLink (below) shows a specific message for an
// already-used/expired link rather than treating it as an unexpected error.
async function verifyEmailToken(token) {
  try {
    const { email, token: sessionToken, user } = await apiFetch('/auth/verify-email', { method: 'POST', body: { token } });
    return { ok: true, email, token: sessionToken || null, user: user || null };
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
const DEFAULT_USER_PROFILE = { nickname: '', avatar: null, timeFormat: '24', background: null, language: null, theme: 'dark', weekStart: null };

// PATCH /users/me -- fire-and-forget: nothing here awaits the request
// finishing, and a failure is just logged rather than surfaced. An
// acceptable gap for now (the next save attempt will just try again with
// whatever's current by then), not a data-loss risk the way losing a task
// change would be (see runAction).
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
  if (err.code === 'MAINTENANCE') return t('login.maintenance');
  return t('login.invalidCredentials');
}

// Set once boot()/the login form resolves a user (see applyUserSession).
// Not passed explicitly to apiFetch -- every request is scoped server-side
// by the bearer token in localStorage instead (see auth.js's apiFetch), so
// this is read-only bookkeeping for the UI, not something request bodies
// need to carry.
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
// 0 (Sunday) .. 6, or null if never chosen -- see effectiveWeekStart.
let currentUserWeekStart = null;
// The login email, and one a change is waiting to have verified (null if
// none) -- shown in Settings, see renderSettingsEmailSection.
let currentUserEmail = null;
let currentUserPendingEmail = null;

// The first day of the week calendars and weekday lists start on: the
// user's own choice (Settings), else each language's usual convention --
// Monday for Croatian, Sunday for English.
function effectiveWeekStart() {
  if (currentUserWeekStart != null) return currentUserWeekStart;
  return currentUserLanguage === 'hr' ? 1 : 0;
}
// Same shape as getMe()'s subscription field (null | { id, plan, ... }) --
// see describeSubscription. Refreshed after boot()/
// login resolve a token and again after subscribeCurrentUserToTrial() mints
// a fresh one, same as the profile fields above.
let currentUserSubscription = null;
// Whether this account may still start a free trial (the User's own
// trialAvailable, decided server-side: never had a plan, and not
// re-registered within a year of deleting an account that had one -- see
// api-spec.yaml's POST /subscriptions/trial). Anyone else is offered
// "Subscribe…" instead, leading to landing.html's pricing (goToPricing).
// Refreshed alongside currentUserSubscription.
let currentUserTrialAvailable = false;

// Applies a (possibly new) language everywhere it matters -- called on
// startup and whenever Settings' Save button changes it. No page reload
// needed: every dynamic string call t() fresh at render time (see the i18n
// section up top), so re-running the renders below is enough to pick up the
// change immediately, the same as any other Settings field.
function applyLanguage(language) {
  currentUserLanguage = language;
  applyStaticTranslations();
  renderAppTitle();
  renderTodo();
  renderSidePanel();
  refreshTodoManageModal();
  renderSaveStatus();
  renderSiteStatus();
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
    weekStart: currentUserWeekStart,
  };
}

// ---------------------------------------------------------------------------
// To-do list.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Actions -- every change is a request to the server, which applies the
// task rules itself (male-niti-api's lib/atodo/domain/) and answers with
// what changed. Actions run one at a time, in order. One that fails for a
// reason that will pass (no connection, an update in progress) stays
// queued: a banner says so (renderSaveStatus), it's retried automatically
// (ACTION_RETRY_DELAYS_MS, or right away from the banner), and leaving the
// page asks first. One the server refuses (a rule, a limit) is reported to
// whoever started it, and dropped.
// ---------------------------------------------------------------------------

const ACTION_RETRY_DELAYS_MS = [5000, 15000, 30000, 60000];
let actionChain = Promise.resolve();
let pendingActions = 0;
let stalledAction = null; // { run, error, resolve, reject } -- waiting to be retried
let actionRetryTimer = null;
let actionRetryCount = 0;

const isTransientError = (err) => err && (err.code === 'MAINTENANCE' || err.code === 'NETWORK_ERROR');

// Runs request() (an apiFetch call) after every earlier action, then
// applies its result (see applyActionResult). Resolves with the response;
// rejects with the server's error for the caller to report. opts.linger:
// keep the list as it is for a moment before re-fetching it (a checked-off
// item stays visible, crossed out, before it goes).
function runAction(request, opts = {}) {
  pendingActions++;
  const attempt = () =>
    new Promise((resolve, reject) => {
      const run = async () => {
        try {
          const result = await request();
          stalledAction = null;
          actionRetryCount = 0;
          renderSaveStatus();
          applyActionResult(result, opts);
          resolve(result);
        } catch (err) {
          if (isTransientError(err)) {
            stalledAction = { run, error: err };
            const delay = ACTION_RETRY_DELAYS_MS[Math.min(actionRetryCount, ACTION_RETRY_DELAYS_MS.length - 1)];
            actionRetryCount++;
            clearTimeout(actionRetryTimer);
            actionRetryTimer = setTimeout(retryStalledAction, delay);
            renderSaveStatus();
            return;
          }
          reject(err);
        }
      };
      run();
    });
  const result = actionChain.then(attempt);
  actionChain = result.catch(() => {}).finally(() => {
    pendingActions--;
  });
  return result;
}

function retryStalledAction() {
  clearTimeout(actionRetryTimer);
  if (stalledAction) stalledAction.run();
}

function hasUnsavedTaskChanges() {
  return pendingActions > 0;
}

// For a deliberate exit where unsent changes no longer matter (the account
// is being deleted) -- skips the "leave site?" prompt.
function discardUnsavedTaskChanges() {
  clearTimeout(actionRetryTimer);
  stalledAction = null;
  pendingActions = 0;
}

const saveStatusBannerEl = document.getElementById('save-status-banner');
const saveStatusMessageEl = document.getElementById('save-status-message');
const saveStatusRetryBtn = document.getElementById('save-status-retry');

function renderSaveStatus() {
  const failure = stalledAction && stalledAction.error;
  saveStatusBannerEl.classList.toggle('hidden', !failure);
  if (!failure) return;
  // An update in progress isn't an error on the user's side -- same queue
  // and retries, calmer wording (and styling, see .save-status-banner.maintenance).
  const maintenance = failure.code === 'MAINTENANCE';
  saveStatusBannerEl.classList.toggle('maintenance', maintenance);
  saveStatusMessageEl.textContent = maintenance ? t('saveStatus.maintenance') : t('saveStatus.failed', { message: failure.message });
  saveStatusRetryBtn.disabled = false;
  saveStatusRetryBtn.textContent = t('saveStatus.retryNow');
}

saveStatusRetryBtn.onclick = retryStalledAction;

// What an action's response tells the rest of the page: a timer that ran
// out (the chime), and what to re-fetch.
let lingerRefreshTimer = null;
function applyActionResult(result, opts = {}) {
  if (!result || typeof result !== 'object') return;
  if (result.expiredTimers && result.expiredTimers.length) playTimerChime();
  clearTimeout(lingerRefreshTimer);
  if (opts.linger) {
    lingerRefreshTimer = setTimeout(() => refreshEverything(), 5000);
  } else if (opts.refresh !== false) {
    refreshEverything();
  }
}

// After a change: the list's visible days, the side panel and the agenda,
// and Manage Tasks if it's open.
function refreshEverything() {
  refreshTodoList();
  refreshSidePanel();
  if (!todoManageOverlay.classList.contains('hidden')) refreshTodoManageModal();
}

// Focusing (or unfocusing) an occurrence: the server checkpoints the
// previously focused one's timer or focus time, and starts this one's.
function focusOccurrence(taskId, occurrenceDate) {
  return runAction(() => apiFetch('/focus', { method: 'PUT', body: { taskId, occurrenceDate } }));
}

function unfocusOccurrence() {
  return runAction(() => apiFetch('/focus', { method: 'DELETE' }));
}

// ---------------------------------------------------------------------------
// The to-do list's data -- one local day at a time, as the server computes
// it for the current view (GET /days): loaded from today (or the 1st of
// another month) and then as the list scrolls, in either direction, within
// the viewed month (next-recurrence isn't month-bound). Each day is a list
// of items, each carrying what its row shows and which actions it allows.
//
// Every day loaded is kept until the view or month changes (resetTodoList),
// so the list never shrinks under the reader. A kept day is still fetched
// again when it's on screen and its copy is older than TODO_DAY_FRESH_MS
// (or an action may have changed it, see refreshTodoList) -- changes made on
// another device show up as the list is read.
// ---------------------------------------------------------------------------

const TODO_DAY_FRESH_MS = 30 * 1000;
let todoDays = new Map(); // dateISO -> items
let todoDayOrder = []; // loaded dates, ascending
// When each loaded day was last fetched (0: may be out of date).
let todoFetchedAt = new Map();
// The nearest days with items just outside what's loaded (null: none).
let todoEdges = { before: null, after: null };
// Bumped whenever the list starts over (view or month changed), so answers
// to an earlier list's requests are ignored.
let todoGeneration = 0;
let todoLoading = false;
// The focused occurrence as the server last named it (with every day and the
// agenda, see GET /days' `focused`) -- wherever it is, loaded or not: the
// only one whose timer can be running (see updateTodoTimerChip).
let focusedTodoItem = null;
// While the list is opening (resetTodoList until its first fill is done),
// each render puts today back at the reading point -- the first day alone
// can't scroll that far, and days loaded above it would push it down --
// unless the reader has started scrolling themselves.
let todoOpening = false;

const todoInViewedRange = (date) => !!date && (todoViewMode === 'next-recurrence' || date.slice(0, 7) === viewedMonthKey);

async function fetchTodoDay(date, direction = 'after') {
  const day = await apiFetch(`/days?view=${encodeURIComponent(todoViewMode)}&date=${date}&direction=${direction}`);
  if ('focused' in day) focusedTodoItem = day.focused;
  // Every read first brings timers up to date server-side -- one that ran
  // out since is announced here.
  if (day.expiredTimers && day.expiredTimers.length) playTimerChime();
  return day;
}

function insertTodoDay(date, items) {
  if (!todoDays.has(date)) {
    todoDayOrder.push(date);
    todoDayOrder.sort();
  }
  todoDays.set(date, items);
  todoFetchedAt.set(date, Date.now());
}

function removeTodoDay(date) {
  todoDays.delete(date);
  todoDayOrder = todoDayOrder.filter((d) => d !== date);
  todoFetchedAt.delete(date);
}

// Starts the list over: the first day to show, then as many more as fill
// the view (fillTodoList), positioned on today.
async function resetTodoList() {
  const generation = ++todoGeneration;
  todoDays = new Map();
  todoDayOrder = [];
  todoFetchedAt = new Map();
  todoEdges = { before: null, after: null };
  todoScrollToTodayOnRender = true;
  todoOpening = true;
  const todayISO = Dates.todayISO();
  const start = todoViewMode === 'next-recurrence' || viewedMonthKey === todayISO.slice(0, 7) ? todayISO : `${viewedMonthKey}-01`;
  let day;
  try {
    day = await fetchTodoDay(start, 'after');
    // Nothing from `start` on in this month -- the month's last days, then.
    if (generation === todoGeneration && !todoInViewedRange(day.date)) day = await fetchTodoDay(start, 'before');
  } catch (err) {
    console.error('Failed to load the list:', err);
    if (generation === todoGeneration) {
      todoOpening = false;
      renderTodoLoadError(err);
    }
    return;
  }
  if (generation !== todoGeneration) return;
  if (day.date && todoInViewedRange(day.date)) {
    insertTodoDay(day.date, day.items);
    todoEdges = { before: day.previousDate, after: day.nextDate };
  }
  renderTodo();
  await fillTodoList(generation);
  if (generation === todoGeneration) todoOpening = false;
}

// Loads more days while the list doesn't fill its view plus a margin -- after
// the last loaded day, and before the first (so there's something to scroll
// up to). Called again as the list scrolls (see the scroll handler). Adding
// days above keeps what's on screen in place (see renderTodo's anchoring).
async function fillTodoList(generation = todoGeneration) {
  if (todoLoading) return;
  todoLoading = true;
  try {
    for (let guard = 0; guard < 62; guard++) {
      if (generation !== todoGeneration) return;
      const viewport = todoViewportEl.clientHeight || 600;
      const below = todoViewportEl.scrollHeight - (todoViewportEl.scrollTop + viewport);
      const above = todoViewportEl.scrollTop;
      if (todoInViewedRange(todoEdges.after) && below < 2 * viewport) {
        const day = await fetchTodoDay(todoEdges.after, 'after');
        if (generation !== todoGeneration) return;
        if (day.date && todoInViewedRange(day.date)) insertTodoDay(day.date, day.items);
        todoEdges.after = day.date && todoInViewedRange(day.date) ? day.nextDate : null;
        renderTodo();
      } else if (todoInViewedRange(todoEdges.before) && above < viewport) {
        const day = await fetchTodoDay(todoEdges.before, 'before');
        if (generation !== todoGeneration) return;
        if (day.date && todoInViewedRange(day.date)) insertTodoDay(day.date, day.items);
        todoEdges.before = day.date && todoInViewedRange(day.date) ? day.previousDate : null;
        renderTodo();
      } else {
        break;
      }
    }
  } catch (err) {
    console.error('Failed to load more of the list:', err);
  } finally {
    todoLoading = false;
  }
}

// After a change: every loaded day may be out of date. The ones on screen
// are fetched again right away, the rest once they're scrolled back into
// view (refreshVisibleTodoDays).
function refreshTodoList() {
  if (!todoDayOrder.length) {
    resetTodoList();
    return;
  }
  for (const date of todoDayOrder) todoFetchedAt.set(date, 0);
  refreshVisibleTodoDays();
}

// Fetches the on-screen days again whose copies are out of date, as one
// walk from the first through the last (see walkTodoSpan). One walk at a
// time: asked again meanwhile, it looks again once the walk is done.
let todoWalkBusy = false;
let todoWalkPending = false;
function refreshVisibleTodoDays() {
  if (todoWalkBusy) {
    todoWalkPending = true;
    return;
  }
  const now = Date.now();
  const due = visibleTodoDates().filter((date) => now - (todoFetchedAt.get(date) || 0) > TODO_DAY_FRESH_MS);
  if (due.length) walkTodoSpan(due[0], due[due.length - 1]);
}

// Re-fetches the loaded days from `first` through `last` day by day ('after'
// answers with the next day that has items), so a day that has become
// empty drops out and one that has gained items appears in between.
async function walkTodoSpan(first, last) {
  todoWalkBusy = true;
  const generation = todoGeneration;
  try {
    const seen = new Set();
    let date = first;
    for (let guard = 0; guard < 62 && date && date <= last; guard++) {
      const day = await fetchTodoDay(date, 'after');
      if (generation !== todoGeneration) return;
      const lastLoaded = todoDayOrder[todoDayOrder.length - 1];
      if (!day.date || !todoInViewedRange(day.date) || day.date > last) {
        // Nothing more in the span; past the last loaded day, that's where
        // loading resumes.
        if (last >= lastLoaded) todoEdges.after = day.date && todoInViewedRange(day.date) ? day.date : null;
        break;
      }
      if (day.date <= todoDayOrder[0]) todoEdges.before = day.previousDate;
      insertTodoDay(day.date, day.items);
      seen.add(day.date);
      if (day.date >= todoDayOrder[todoDayOrder.length - 1]) todoEdges.after = day.nextDate;
      date = day.nextDate;
    }
    for (const d of todoDayOrder.slice()) if (d >= first && d <= last && !seen.has(d)) removeTodoDay(d);
  } catch (err) {
    console.error('Failed to refresh the list:', err);
  } finally {
    todoWalkBusy = false;
  }
  if (generation !== todoGeneration) return;
  if (!todoDayOrder.length) {
    resetTodoList();
    return;
  }
  renderTodo();
  fillTodoList(generation);
  if (todoWalkPending) {
    todoWalkPending = false;
    refreshVisibleTodoDays();
  }
}

function renderTodoLoadError(err) {
  todoListEl.innerHTML = '';
  todoDayRefs = [];
  const message = document.createElement('div');
  message.className = 'empty-state';
  message.textContent = describeActionError(err);
  const retry = document.createElement('button');
  retry.className = 'accent-btn';
  retry.textContent = t('saveStatus.retryNow');
  retry.onclick = () => resetTodoList();
  todoListEl.appendChild(message);
  todoListEl.appendChild(retry);
}

// The platform's status file (written by the deploy script, served by
// nginx even during maintenance): an announced maintenance window, and the
// client version that's live -- so a tab still running older code (the
// app's own version is window.APP_VERSION, see version.js) offers a reload
// rather than keep talking to a newer API. Polled, and re-read whenever the
// tab comes back into view. Missing (local dev) or unreadable = nothing to show.
const SITE_STATUS_URL = '_status.json';
const SITE_STATUS_POLL_MS = 5 * 60 * 1000;
const siteStatusBannerEl = document.getElementById('site-status-banner');
const siteStatusMessageEl = document.getElementById('site-status-message');
const siteStatusReloadBtn = document.getElementById('site-status-reload');
let siteStatus = null;
let siteStatusTimer = null;

async function refreshSiteStatus() {
  try {
    const res = await fetch(SITE_STATUS_URL, { cache: 'no-store' });
    siteStatus = res.ok ? await res.json() : null;
  } catch {
    siteStatus = null;
  }
  renderSiteStatus();
}

function renderSiteStatus() {
  const ownVersion = window.APP_VERSION;
  const liveVersion = siteStatus && siteStatus.clientVersion;
  const newVersion = !!(ownVersion && liveVersion && ownVersion !== 'dev' && liveVersion !== ownVersion);
  const announcement = siteStatus && siteStatus.announcement;
  const start = announcement && Date.parse(announcement.start);
  const upcoming = !!start && Date.now() < start + (announcement.minutes || 0) * 60 * 1000;
  siteStatusBannerEl.classList.toggle('hidden', !newVersion && !upcoming);
  siteStatusReloadBtn.classList.toggle('hidden', !newVersion);
  if (newVersion) siteStatusMessageEl.textContent = t('siteStatus.newVersion');
  else if (upcoming) siteStatusMessageEl.textContent = t('siteStatus.announcement', { date: formatDateTime(start), minutes: announcement.minutes });
}

function startSiteStatusPolling() {
  if (siteStatusTimer) return;
  refreshSiteStatus();
  siteStatusTimer = setInterval(refreshSiteStatus, SITE_STATUS_POLL_MS);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') refreshSiteStatus();
  });
}

siteStatusReloadBtn.onclick = () => location.reload();

window.addEventListener('beforeunload', (e) => {
  if (!hasUnsavedTaskChanges()) return;
  e.preventDefault();
  e.returnValue = ''; // older Chromium only shows the prompt with this set
});

// Hard ceiling on how long any single timer -- counting down, counting up,
// or counting down and past zero into overtime -- is allowed to run before
// it's automatically stopped (server-side, see timerTick). A plain countdown
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
// MAX_TIMER_MINUTES) and either starts it, focusing the occurrence, or
// ("Set") just attaches it, paused, to start on its next focus. "Count up"
// swaps it for an open-ended stopwatch (the duration field is disabled
// then, still there for context); "Continue counting down past zero" (on by
// default) keeps a countdown running as overtime. Both open-ended cases are
// still stopped at MAX_TIMER_MINUTES, server-side.
async function startTaskTimerPrompt(item) {
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
  const minutes = Math.min(MAX_TIMER_MINUTES, Math.max(1, Math.round(Number(result.minutes)) || 0));
  if (!countUp && !minutes) return;
  occurrenceAction(item, 'timer', {
    method: 'POST',
    body: { countUp, minutes, continuePastZero: result.continuePastZero.length > 0, start: !result[MODAL_SECONDARY_RESULT] },
  });
}

// Cancelling credits whatever the timer's current run had accumulated; a
// focused occurrence stays focused, without a timer.
function cancelTaskTimer(item) {
  occurrenceAction(item, 'timer', { method: 'DELETE' });
}

const occurrencePath = (taskId, occurrenceDate) => `/tasks/${encodeURIComponent(taskId)}/occurrences/${occurrenceDate}`;

// An action on one occurrence (POST .../:date/<action> by default).
function occurrenceAction(item, action, { method = 'POST', body, linger } = {}) {
  const path = action ? `${occurrencePath(item.taskId, item.occurrenceDate)}/${action}` : occurrencePath(item.taskId, item.occurrenceDate);
  return runAction(() => apiFetch(path, { method, body }), { linger }).catch(reportActionError);
}

// An action on a whole task (path relative to /tasks/:taskId).
function taskAction(taskId, path, { method = 'POST', body } = {}) {
  return runAction(() => apiFetch(`/tasks/${encodeURIComponent(taskId)}${path}`, { method, body })).catch(reportActionError);
}

function describeActionError(err) {
  if (err.code === 'NETWORK_ERROR' || err.code === 'MAINTENANCE') return describeAuthError(err);
  return err.message || String(err);
}

// The server's codes this client words itself; anything else shows the
// server's own message.
const ACTION_ERROR_KEYS = {
  REOPEN_BLOCKED: 'todo.reopenBlockedRecurUntilCompleted',
  OCCURRENCE_EXISTS: 'manualOccurrence.exists',
  DATE_TAKEN: 'occurrencePanel.rescheduleCollision',
  NOTHING_AFTER: 'pause.nothingAfter',
};

// A refused action: a free-plan limit offers a subscription, anything else
// is explained. Resolves to undefined (the action didn't happen), so callers
// awaiting an action can tell.
function reportActionError(err) {
  if (!err) return undefined;
  if (err.code === 'TASK_LIMIT') offerSubscriptionUpgrade(t('subscribe.reasonCreateLimit'));
  else if (err.code === 'TASK_LOCKED' || err.code === 'NOTE_LIMIT') offerSubscriptionUpgrade(t('subscribe.reasonTaskLimit'));
  else if (ACTION_ERROR_KEYS[err.code]) showInfoModal(t(ACTION_ERROR_KEYS[err.code]));
  else showInfoModal(describeActionError(err));
  refreshEverything();
  return undefined;
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

// Touch screens: a long press opens a row's (or an agenda item's) context
// menu, as a right-click does. Android browsers fire contextmenu on a long
// press by themselves; iOS WebKit (Safari, and Firefox there too) never does
// -- so attachLongPress times one, a little longer than Android's, and stands
// down when the browser's own contextmenu arrives first. The tap a long
// press can end in is swallowed, so it neither closes the menu just opened
// nor selects the task.
const LONG_PRESS_MS = 600;
const LONG_PRESS_SLOP_PX = 10;
let lastTouchAt = 0;
let lastContextMenuAt = 0;
let swallowClicksUntil = 0;
document.addEventListener('touchstart', () => {
  lastTouchAt = Date.now();
}, { capture: true, passive: true });
document.addEventListener('contextmenu', () => {
  lastContextMenuAt = Date.now();
  // A long press's own contextmenu (Android): its touch may still end in a tap.
  if (Date.now() - lastTouchAt < 1500) swallowClicksUntil = Date.now() + 800;
}, true);
// Clicks are caught before they reach what's under them: the tap a long
// press ends in is swallowed (the menu it opened stays), and while a menu is
// open, a click (or tap) anywhere outside it only closes it -- it doesn't
// also select a row, which on a narrow screen opened the side panel over the
// list.
document.addEventListener('click', (e) => {
  const swallow = Date.now() < swallowClicksUntil;
  if (swallow) swallowClicksUntil = 0;
  else if (activeTodoContextMenu && !activeTodoContextMenu.contains(e.target)) closeTodoContextMenu();
  else return;
  e.stopPropagation();
  e.preventDefault();
}, true);

function attachLongPress(el, onLongPress) {
  let timer = null;
  let startX = 0;
  let startY = 0;
  const cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  el.addEventListener('touchstart', (e) => {
    cancel();
    if (e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    const startedAt = Date.now();
    timer = setTimeout(() => {
      timer = null;
      if (lastContextMenuAt >= startedAt) return; // the browser opened it already
      swallowClicksUntil = Date.now() + 800;
      onLongPress({ clientX: startX, clientY: startY, preventDefault() {} });
    }, LONG_PRESS_MS);
  }, { passive: true });
  el.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t && Math.hypot(t.clientX - startX, t.clientY - startY) > LONG_PRESS_SLOP_PX) cancel();
  }, { passive: true });
  el.addEventListener('touchend', cancel);
  el.addEventListener('touchcancel', cancel);
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeTodoContextMenu();
});

// What each of an item's actions (as the server lists them, see
// views.actionsFor) does from a row or the agenda: [menu group, label key
// (or a function of the item, for a label naming something of it),
// handler]. Groups render in order, separated by dividers -- timer
// controls, state changes, editing, stats.
const TODO_ITEM_ACTIONS = {
  timer: [0, 'menu.timer', (item) => startTaskTimerPrompt(item)],
  // A countdown of the task's average measured time, started at once (the
  // server works it out, see autoTimerSeconds there) -- named with that time.
  autoTimer: [
    0,
    (item) => t('menu.autoTimer', { time: formatStatsDuration(item.autoTimerSeconds) }),
    (item) => occurrenceAction(item, 'timer', { body: { auto: true } }),
  ],
  pauseTimer: [0, 'menu.pauseTimer', () => unfocusOccurrence().catch(reportActionError)],
  resumeTimer: [0, 'menu.resumeTimer', (item) => focusOccurrence(item.taskId, item.occurrenceDate).catch(reportActionError)],
  cancelTimer: [0, 'menu.cancelTimer', (item) => cancelTaskTimer(item)],
  complete: [1, 'menu.markDone', (item) => resolveItem(item)],
  fail: [1, 'menu.markFailed', (item) => resolveItem(item)],
  focus: [1, 'menu.focus', (item) => focusOccurrence(item.taskId, item.occurrenceDate).catch(reportActionError)],
  unfocus: [1, 'menu.unfocus', () => unfocusOccurrence().catch(reportActionError)],
  dismiss: [1, 'menu.hide', (item) => occurrenceAction(item, 'dismiss')],
  restore: [1, 'menu.show', (item) => occurrenceAction(item, 'restore')],
  edit: [2, 'common.edit', (item) => editTaskOccurrence(item.taskId, item.occurrenceDate)],
  pause: [2, 'menu.pauseRecurrence', (item) => promptPauseRecurrence(item)],
  resume: [2, 'menu.resumeRecurrence', (item) => resumeRecurrenceNow(item)],
  stats: [3, 'menu.taskStats', (item) => showTaskStatsModal(item.taskId)],
  // A measured frame on the agenda (see buildAgendaSessionBlock).
  deleteMeasurement: [2, 'menu.deleteMeasurement', (item) =>
    runAction(() => apiFetch(`/focus-sessions/${encodeURIComponent(item.sessionId)}`, { method: 'DELETE' })).catch(reportActionError)],
};

// A right-clicked item's own menu -- exactly the actions the server allows
// on it, built fresh per click, closed on the next click anywhere or Escape.
function showTodoContextMenu(event, item) {
  closeTodoContextMenu();
  const menu = document.createElement('div');
  menu.className = 'todo-context-menu';
  const groups = [[], [], [], []];
  for (const action of item.actions || []) {
    const entry = TODO_ITEM_ACTIONS[action];
    if (entry) groups[entry[0]].push({ label: typeof entry[1] === 'function' ? entry[1](item) : t(entry[1]), onClick: () => entry[2](item) });
  }

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
// Subscriptions -- the free plan's limits (how many tasks, how many notes
// per task, which tasks a lapsed account can still complete) are the
// server's: it refuses a create, a note or a completion past them (402
// TASK_LIMIT/NOTE_LIMIT/TASK_LOCKED, see reportActionError), marks a task it
// won't let be completed `locked`, and adds the subscription reminder to
// today's list for a free account (an item with virtual
// 'subscription-prompt', see buildTodoItemRow).
// ---------------------------------------------------------------------------

// Mints and stores a fresh trial subscription for the current account (see
// startTrialSubscription), then refreshes every bit of state that snapshot
// touches -- the stored bearer token, the in-memory subscription, the nag
// task, and the render. startTrialSubscription's response already carries
// the updated user, so no separate getMe() round trip is needed.
async function subscribeCurrentUserToTrial() {
  let result;
  try {
    result = await startTrialSubscription();
  } catch (err) {
    // This page's idea of the account was stale (e.g. a trial started in
    // another tab) -- a paid subscription is what's left to offer.
    if (err.code === 'TRIAL_UNAVAILABLE') {
      goToPricing();
      return;
    }
    throw err;
  }
  const { token, user } = result;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  currentUserTrialAvailable = !!user.trialAvailable;
  refreshEverything();
  renderSettingsSubscriptionSection();
  renderSubscribeHeaderButton();
}

// Marks the current account's subscription to not renew (see
// cancelSubscription) -- access/limits are untouched until it actually
// expires, so nothing here needs to touch tasks
// or re-render the to-do list itself, just the bits of chrome that show
// subscription status.
async function cancelCurrentUserSubscription() {
  const { token, user } = await cancelSubscription();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  currentUserTrialAvailable = !!user.trialAvailable;
  renderSettingsSubscriptionSection();
  renderSubscribeHeaderButton();
}

// Undoes a cancellation while the paid period still runs (see
// resumeSubscription in auth.js): renews again at its end, nothing charged
// now -- the only way back for a cancelled subscriber, since checkout
// refuses a second subscription over time already paid for.
async function resumeCurrentUserSubscription() {
  const { token, user } = await resumeSubscription();
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  currentUserSubscription = user.subscription;
  currentUserTrialAvailable = !!user.trialAvailable;
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
  currentUserTrialAvailable = !!user.trialAvailable;
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

// Starting from the user's first day of the week (see effectiveWeekStart).
function orderedByWeekStart(options) {
  const start = effectiveWeekStart();
  return options.slice().sort((a, b) => ((Number(a.value) - start + 7) % 7) - ((Number(b.value) - start + 7) % 7));
}

function getWeekdayCheckboxOptions() {
  return orderedByWeekStart([
    { value: '1', label: t('taskForm.weekdayMon') },
    { value: '2', label: t('taskForm.weekdayTue') },
    { value: '3', label: t('taskForm.weekdayWed') },
    { value: '4', label: t('taskForm.weekdayThu') },
    { value: '5', label: t('taskForm.weekdayFri') },
    { value: '6', label: t('taskForm.weekdaySat') },
    { value: '0', label: t('taskForm.weekdaySun') },
  ]);
}

function getWeekdaySelectOptions() {
  return orderedByWeekStart([
    { value: '0', label: t('taskForm.sunday') },
    { value: '1', label: t('taskForm.monday') },
    { value: '2', label: t('taskForm.tuesday') },
    { value: '3', label: t('taskForm.wednesday') },
    { value: '4', label: t('taskForm.thursday') },
    { value: '5', label: t('taskForm.friday') },
    { value: '6', label: t('taskForm.saturday') },
  ]);
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

// `initialDueDate` is used by each to-do day header's own "+" button so the
// add form opens pre-filled with that day's date instead of always
// defaulting to today.
// The recurrence-pattern fields shared by openTaskForm (a new task) and
// openTaskEditor's Recurrence tab -- `task` supplies the initial values (a
// never-saved default shape for a new task), dueDateValue the due date field's.
// Returned as three pieces since the add form interleaves them with its other
// fields; see decodePatternResult for reading them back.
function patternFieldSpecs(task, dueDateValue) {
  const dueDate = {
    name: 'dueDate',
    label: t('taskForm.dueDate'),
    type: 'date',
    value: dueDateValue,
  };
  const repeat = [
    [
      {
        name: 'repeats',
        type: 'checkboxes',
        value: task.frequency.type !== 'once' ? ['repeats'] : [],
        options: [{ value: 'repeats', label: t('taskForm.repeatsEvery') }],
        required: false,
      },
      {
        name: 'interval',
        type: 'number',
        value: String(task.frequency.interval || 1),
        min: 1,
        required: false,
        inlineWidth: '64px',
        disableIf: (v) => v.repeats.length === 0,
      },
      {
        name: 'frequencyType',
        type: 'select',
        value: task.frequency.type !== 'once' ? task.frequency.type : 'days',
        options: getFrequencyOptions(),
        inlineWidth: '100px',
        disableIf: (v) => v.repeats.length === 0,
      },
    ],
    {
      name: 'weekdays',
      label: t('taskForm.alsoRecurOn'),
      type: 'checkboxes',
      value: task.frequency.weekdays ? task.frequency.weekdays.map(String) : [],
      options: getWeekdayCheckboxOptions(),
      gridColumns: 4,
      required: false,
      showIf: (v) => isWeeklyFrequencyType(v),
    },
    {
      name: 'monthlyMode',
      label: t('taskForm.monthlyPattern'),
      type: 'select',
      value: task.frequency.dayMode || 'day',
      options: getMonthlyModeOptions(),
      showIf: (v) => isMonthlyFrequencyType(v),
    },
    {
      name: 'monthlyOffset',
      label: t('taskForm.monthlyOffsetLabel'),
      value: task.frequency.offset != null ? String(task.frequency.offset) : '0',
      required: false,
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'before-last',
    },
    {
      name: 'monthlyWeekday',
      label: t('taskForm.dayOfWeek'),
      type: 'select',
      value: task.frequency.weekday != null ? String(task.frequency.weekday) : '1',
      options: getWeekdaySelectOptions(),
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
    },
    {
      name: 'monthlyOrdinal',
      label: t('taskForm.whichOccurrence'),
      type: 'select',
      value: task.frequency.ordinal != null ? String(task.frequency.ordinal) : '1',
      options: getOrdinalOptions(),
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'weekday',
    },
    {
      name: 'multiWeekdayDays',
      label: t('taskForm.selectedDays'),
      type: 'checkboxes',
      value:
        task.frequency.weekdays && isMultiWeekdayMonthlyMode(task.frequency.dayMode)
          ? task.frequency.weekdays.map(String)
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
          task.frequency.offsetDays != null && task.frequency.dayMode === 'multi-weekday-offset'
            ? String(task.frequency.offsetDays)
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
          task.frequency.offsetDirection && task.frequency.dayMode === 'multi-weekday-offset'
            ? task.frequency.offsetDirection
            : 'before',
        options: getBeforeAfterOptions(),
        inlineWidth: '90px',
        showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-weekday-offset',
      },
      {
        name: 'multiWeekdayOrdinal',
        type: 'number',
        value:
          task.frequency.ordinal != null && isMultiWeekdayMonthlyMode(task.frequency.dayMode)
            ? String(task.frequency.ordinal)
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
      value: task.frequency.days && task.frequency.dayMode === 'multi-day' ? task.frequency.days.map(String) : [],
      options: MONTH_DAY_CHECKBOX_OPTIONS,
      showIf: (v) => isMonthlyFrequencyType(v) && v.monthlyMode === 'multi-day',
    },
    {
      name: 'endDate',
      label: t('taskForm.endDate'),
      type: 'date',
      value: task.endDate || '',
      required: false,
      showIf: (v) => v.repeats.length > 0,
    },
  ];
  const recurUntilCompleted = {
    name: 'recurUntilCompleted',
    label: '',
    type: 'checkboxes',
    value: task.recurUntilCompleted ? ['recurUntilCompleted'] : [],
    options: [{ value: 'recurUntilCompleted', label: t('taskForm.recurUntilCompletedDesc') }],
    required: false,
    // A passive task is never completed, so it can't recur until it is (see
    // the passive field's own disableIf). Only while the other is ticked and
    // this isn't -- older data with both ticked can still untick either.
    disableIf: (v) => !!v.passive && v.passive.length > 0 && v.recurUntilCompleted.length === 0,
  };
  return { dueDate, repeat, recurUntilCompleted };
}

// Reads patternFieldSpecs' fields back out of a showFormModal result --
// null (after telling the user why) if the end date comes before the due
// date.
function decodePatternResult(result) {
  const endDate = result.endDate || null;
  if (endDate && endDate < result.dueDate) {
    showInfoModal(t('taskForm.endDateBeforeDue'));
    return null;
  }
  const frequency = result.repeats.length > 0 ? decodeFrequency(result.frequencyType, result.interval, result) : { type: 'once', interval: 1 };
  return { dueDate: result.dueDate, frequency, endDate, recurUntilCompleted: result.recurUntilCompleted.length > 0 };
}

// The "add task" form. Editing an existing task is openTaskEditor's job.
async function openTaskForm(_unused, initialDueDate, seriesOptions = {}) {
  const pattern = patternFieldSpecs(
    { frequency: { type: 'once', interval: 1 }, endDate: null, recurUntilCompleted: false },
    initialDueDate || Dates.dateToISO(new Date())
  );
  const result = await showFormModal(
    t('taskForm.addTask'),
    [
      { name: 'name', label: t('taskForm.name'), value: seriesOptions.nameDefault || '' },
      // Single-line like Name, not a textarea like Details -- the to-do list
      // shows this truncated to one line too (see .todo-item-desc), so a
      // multi-line value could never be seen in full there anyway.
      { name: 'description', label: t('taskForm.description'), value: '', required: false },
      { name: 'details', label: t('taskForm.details'), type: 'textarea', value: '', required: false },
      pattern.dueDate,
      {
        name: 'allDay',
        label: '',
        type: 'checkboxes',
        value: [],
        options: [{ value: 'allDay', label: t('taskForm.allDay') }],
        required: false,
      },
      { name: 'dueTime', label: t('taskForm.dueTime'), type: 'time', value: '18:00', showIf: (v) => v.allDay.length === 0 },
      timeZoneFieldSpec(null),
      ...pattern.repeat,
      {
        name: 'appointment',
        label: '',
        type: 'checkboxes',
        value: [],
        options: [{ value: 'appointment', label: t('taskForm.appointmentDesc') }],
        required: false,
      },
      {
        name: 'passive',
        label: '',
        type: 'checkboxes',
        value: [],
        options: [{ value: 'passive', label: t('taskForm.passiveDesc') }],
        required: false,
        disableIf: (v) => !!v.recurUntilCompleted && v.recurUntilCompleted.length > 0 && v.passive.length === 0,
      },
      pattern.recurUntilCompleted,
    ],
    { okLabel: t('common.add') }
  );
  if (!result) return;
  const decoded = decodePatternResult(result);
  if (!decoded) return;
  const { frequency, endDate, recurUntilCompleted } = decoded;
  const allDay = result.allDay.length > 0;

  const created = await runAction(() =>
    apiFetch('/tasks', {
      method: 'POST',
      body: {
        name: result.name,
        description: result.description,
        details: result.details,
        dueDate: decoded.dueDate,
        dueTime: allDay ? null : result.dueTime,
        allDay,
        timeZone: allDay ? null : result.timeZone || null,
        appointment: result.appointment.length > 0,
        passive: result.passive.length > 0,
        recurUntilCompleted,
        endDate,
        frequency,
        seriesId: seriesOptions.forcedSeriesId || null,
      },
    })
  ).catch(reportActionError);
  return created ? created.taskId : null;
}

// A timed task's time zone: "Fluid" (null -- its due time is local time
// wherever the user is) or a fixed zone its due time stays in (shown in
// local time too, see buildTodoItemRow). All-day tasks have none.
function timeZoneFieldSpec(value) {
  let zones = [];
  try {
    zones = Intl.supportedValuesOf('timeZone');
  } catch (e) {
    zones = [];
  }
  if (value && !zones.includes(value)) zones = [value, ...zones];
  return {
    name: 'timeZone',
    label: t('taskForm.timeZone'),
    type: 'select',
    value: value || '',
    required: false,
    options: [{ value: '', label: t('taskForm.timeZoneFluid') }, ...zones.map((zone) => ({ value: zone, label: zone.replace(/_/g, ' ') }))],
    showIf: (v) => v.allDay.length === 0,
  };
}

// "New York" for America/New_York -- the city a fixed-zone task's own time is
// labelled with.
function timeZoneCity(zone) {
  return String(zone || '').split('/').pop().replace(/_/g, ' ');
}

// ---------------------------------------------------------------------------
// Editing a task -- one modal, three tabs, no "which occurrences?" choice:
//  - Details: name/description/details/time/zone/flags. The task is one
//    record, so these apply to every occurrence, past and future alike
//    (PATCH /tasks/:taskId).
//  - Recurrence: the pattern, applied from today on only; everything before
//    stays as it was (PUT /tasks/:taskId/pattern).
//  - Occurrences: every past occurrence plus the next one (and the one
//    after it, if the next is already done) -- select one to see and edit
//    its notes (its activity is read-only), or delete it. These apply
//    immediately, not on Save.
// Details and Recurrence are saved together by the modal's own Save button;
// Delete removes the whole task.
// ---------------------------------------------------------------------------

// Everything about one task (GET /tasks/:taskId): its fields, notes and
// activity, its occurrences' list, and every recorded occurrence's own.
// extraDates: upcoming pattern dates to list too (see "Find occurrence…").
function fetchTaskDetail(taskId, extraDates = []) {
  const query = extraDates.map((d) => `extraDate=${d}`).join('&');
  return apiFetch(`/tasks/${encodeURIComponent(taskId)}${query ? `?${query}` : ''}`);
}

async function openTaskEditor(taskId, { tab = 'details', occurrenceDate = null } = {}) {
  let detail;
  try {
    detail = await fetchTaskDetail(taskId);
  } catch (err) {
    reportActionError(err);
    return;
  }
  const task = detail.task;
  const pattern = patternFieldSpecs(task, task.dueDate);
  const withTab = (entry, tabKey) => {
    (Array.isArray(entry) ? entry[0] : entry).tab = tabKey;
    return entry;
  };
  const fields = [
    withTab({ name: 'name', label: t('taskForm.name'), value: task.name }, 'details'),
    withTab({ name: 'description', label: t('taskForm.description'), value: task.description, required: false }, 'details'),
    withTab({ name: 'details', label: t('taskForm.details'), type: 'textarea', value: task.details, required: false }, 'details'),
    withTab(
      {
        name: 'allDay',
        label: '',
        type: 'checkboxes',
        value: task.allDay ? ['allDay'] : [],
        options: [{ value: 'allDay', label: t('taskForm.allDay') }],
        required: false,
      },
      'details'
    ),
    withTab({ name: 'dueTime', label: t('taskForm.dueTime'), type: 'time', value: task.dueTime || '18:00', showIf: (v) => v.allDay.length === 0 }, 'details'),
    withTab(timeZoneFieldSpec(task.timeZone), 'details'),
    withTab(
      {
        name: 'appointment',
        label: '',
        type: 'checkboxes',
        value: task.appointment ? ['appointment'] : [],
        options: [{ value: 'appointment', label: t('taskForm.appointmentDesc') }],
        required: false,
      },
      'details'
    ),
    withTab(
      {
        name: 'passive',
        label: '',
        type: 'checkboxes',
        value: task.passive ? ['passive'] : [],
        options: [{ value: 'passive', label: t('taskForm.passiveDesc') }],
        required: false,
        disableIf: (v) => !!v.recurUntilCompleted && v.recurUntilCompleted.length > 0 && v.passive.length === 0,
      },
      'details'
    ),
    withTab(pattern.dueDate, 'pattern'),
    ...pattern.repeat.map((entry) => withTab(entry, 'pattern')),
    withTab(pattern.recurUntilCompleted, 'pattern'),
  ];

  const result = await showFormModal(t('taskEditor.title', { name: task.label }), fields, {
    okLabel: t('common.save'),
    deleteLabel: t('taskEditor.deleteTask'),
    initialTab: tab,
    tabs: [
      { key: 'details', label: t('taskEditor.tabDetails'), render: (pane) => prependEditorHint(pane, 'taskEditor.detailsHint') },
      { key: 'pattern', label: t('taskEditor.tabPattern'), render: (pane) => prependEditorHint(pane, 'taskEditor.patternHint') },
      { key: 'occurrences', label: t('taskEditor.tabOccurrences'), render: (pane) => renderOccurrencesTab(pane, detail, occurrenceDate) },
    ],
  });

  if (result === MODAL_DELETE_RESULT) {
    deleteTask(taskId);
    return;
  }
  if (!result) return;
  const decoded = decodePatternResult(result);
  if (!decoded) return;

  // Both are no-ops server-side when nothing in them changed. The pattern
  // goes first: refused (making a one-off recurring past the free plan's
  // limit, say -- reportActionError offers a subscription), nothing of the
  // edit is saved. Except when the edit turns "passive" off and "recur until
  // completed" on: the server only takes the latter once the task isn't
  // passive any more, so the details go first then.
  const allDay = result.allDay.length > 0;
  const details = {
    name: result.name,
    description: result.description,
    details: result.details,
    dueTime: allDay ? null : result.dueTime,
    allDay,
    timeZone: allDay ? null : result.timeZone || null,
    appointment: result.appointment.length > 0,
    passive: result.passive.length > 0,
  };
  const saveDetails = () => taskAction(taskId, '', { method: 'PATCH', body: details });
  const savePattern = () => taskAction(taskId, '/pattern', { method: 'PUT', body: decoded });
  if (task.passive && !details.passive && decoded.recurUntilCompleted && !task.recurUntilCompleted) {
    if (await saveDetails()) savePattern();
  } else if (await savePattern()) {
    saveDetails();
  }
}

function prependEditorHint(pane, key) {
  const el = document.createElement('div');
  el.className = 'task-editor-hint';
  el.textContent = t(key);
  pane.prepend(el);
}

const OCCURRENCE_STATUS_KEYS = {
  completed: 'taskEditor.statusDone',
  failed: 'taskEditor.statusFailed',
  missed: 'taskEditor.statusMissed',
  pending: 'taskEditor.statusPending',
  upcoming: 'taskEditor.statusUpcoming',
};

// The editor's Occurrences tab, on `detail` (fetchTaskDetail's answer) --
// re-fetched after every change made here, which apply right away rather
// than on the modal's Save.
function renderOccurrencesTab(pane, detail, initialDate) {
  const taskId = detail.task.taskId;
  let selectedDate = initialDate;
  let editingTimestamp = null;
  // Upcoming pattern dates picked with "Find occurrence…" -- listed for as
  // long as the editor stays open, without saving anything: a row only gets
  // created once something is actually recorded on one (a note, details).
  const foundDates = [];

  async function reload() {
    try {
      detail = await fetchTaskDetail(taskId, foundDates);
    } catch (err) {
      console.error('Failed to reload the task:', err);
    }
    render();
  }

  // An action from this tab: applied, then the tab re-fetched.
  async function act(path, opts) {
    await taskAction(taskId, path, opts);
    await reload();
  }

  function render() {
    pane.innerHTML = '';
    prependEditorHint(pane, 'taskEditor.occurrencesHint');
    const entries = detail.occurrenceList;
    if (!entries.some((e) => e.date === selectedDate)) selectedDate = entries.length ? (entries.find((e) => e.next) || entries[0]).date : null;

    const list = document.createElement('div');
    list.className = 'task-occ-list';
    if (!entries.length) {
      const empty = document.createElement('div');
      empty.className = 'task-stats-empty';
      empty.textContent = t('taskEditor.noOccurrences');
      list.appendChild(empty);
    }
    for (const entry of entries) {
      const row = document.createElement('div');
      row.className = 'task-occ-item' + (entry.date === selectedDate ? ' selected' : '') + (entry.next ? ' next' : '');
      const dateEl = document.createElement('span');
      dateEl.className = 'task-occ-date';
      dateEl.textContent = formatShortDate(entry.date) + (entry.next ? ` · ${t('taskEditor.next')}` : '');
      const statusEl = document.createElement('span');
      statusEl.className = 'task-occ-status';
      statusEl.textContent = t(OCCURRENCE_STATUS_KEYS[entry.status] || 'taskEditor.statusPending') + (entry.noteCount ? ` · ✎${entry.noteCount}` : '');
      row.appendChild(dateEl);
      row.appendChild(statusEl);
      row.onclick = () => {
        selectedDate = entry.date;
        editingTimestamp = null;
        render();
      };
      if (entry.deletable) {
        appendDeleteButton(row, () => act(`/occurrences/${entry.date}`, { method: 'DELETE' }));
        // The row's own click selects it -- the delete button's clicks
        // shouldn't also do that (and re-render away its armed state).
        row.lastChild.addEventListener('click', (e) => e.stopPropagation());
      }
      list.appendChild(row);
    }
    pane.appendChild(list);

    const addOccurrenceBtn = document.createElement('button');
    addOccurrenceBtn.type = 'button';
    addOccurrenceBtn.className = 'menu-btn-small task-occ-add-occurrence';
    addOccurrenceBtn.textContent = t('manualOccurrence.add');
    addOccurrenceBtn.onclick = async () => {
      const added = await promptManualOccurrence(detail.task);
      if (!added) return;
      selectedDate = added;
      editingTimestamp = null;
      await reload();
    };
    pane.appendChild(addOccurrenceBtn);
    // Plain recurring tasks only: a recurUntilCompleted task's future cycles
    // don't exist until the current one is done, and a one-off has no
    // pattern to find dates in.
    if (!detail.task.recurUntilCompleted && detail.task.frequency.type !== 'once') {
      const findOccurrenceBtn = document.createElement('button');
      findOccurrenceBtn.type = 'button';
      findOccurrenceBtn.className = 'menu-btn-small task-occ-add-occurrence';
      findOccurrenceBtn.textContent = t('taskEditor.findOccurrence');
      findOccurrenceBtn.onclick = async () => {
        const found = await promptFindOccurrence(detail.task);
        if (!found) return;
        if (!foundDates.includes(found)) foundDates.push(found);
        selectedDate = found;
        editingTimestamp = null;
        await reload();
      };
      const buttons = document.createElement('div');
      buttons.className = 'task-occ-buttons';
      addOccurrenceBtn.replaceWith(buttons);
      buttons.appendChild(addOccurrenceBtn);
      buttons.appendChild(findOccurrenceBtn);
    }

    if (selectedDate) pane.appendChild(buildOccurrenceDetail());
    const selectedEl = list.querySelector('.task-occ-item.selected');
    if (selectedEl) selectedEl.scrollIntoView({ block: 'nearest' });
  }

  function buildOccurrenceDetail() {
    const el = document.createElement('div');
    el.className = 'task-occ-detail';
    const row = detail.occurrences.find((o) => o.occurrenceDate === selectedDate) || null;
    const base = `/occurrences/${selectedDate}`;

    // This occurrence's own details (the task's apply to all of them) --
    // saved when the field loses focus.
    const detailsHeading = document.createElement('div');
    detailsHeading.className = 'task-stats-heading';
    detailsHeading.textContent = `${t('taskEditor.occurrenceDetails')} · ${formatShortDate(selectedDate)}`;
    el.appendChild(detailsHeading);
    const detailsInput = document.createElement('textarea');
    detailsInput.className = 'modal-input task-occ-details-input';
    detailsInput.placeholder = t('taskEditor.occurrenceDetailsPlaceholder');
    detailsInput.value = (row && row.details) || '';
    detailsInput.onchange = () => {
      const value = detailsInput.value.trim() || null;
      if (((row && row.details) || null) === value) return;
      act(`${base}/details`, { method: 'PUT', body: { details: value } });
    };
    el.appendChild(detailsInput);

    const notesHeading = document.createElement('div');
    notesHeading.className = 'task-stats-heading';
    notesHeading.textContent = t('sidePanel.notes');
    el.appendChild(notesHeading);

    const comments = row ? row.comments || [] : [];
    if (!comments.length) {
      const empty = document.createElement('div');
      empty.className = 'task-stats-empty';
      empty.textContent = t('sidePanel.noNotes');
      el.appendChild(empty);
    }
    for (const comment of comments) {
      const item = document.createElement('div');
      item.className = 'task-occ-note';
      if (editingTimestamp === comment.timestamp) {
        const input = document.createElement('textarea');
        input.className = 'modal-input task-occ-note-input';
        input.value = comment.text;
        const save = document.createElement('button');
        save.className = 'menu-btn-small';
        save.textContent = t('common.save');
        save.onclick = () => {
          const text = input.value.trim();
          editingTimestamp = null;
          if (text && text !== comment.text) act(`${base}/notes/${comment.timestamp}`, { method: 'PATCH', body: { text } });
          else render();
        };
        item.appendChild(input);
        item.appendChild(save);
        setTimeout(() => input.focus(), 0);
      } else {
        const text = document.createElement('div');
        text.className = 'task-occ-note-text';
        text.textContent = comment.text;
        const time = document.createElement('div');
        time.className = 'task-occ-note-time';
        time.textContent = formatDateTime(comment.timestamp);
        const body = document.createElement('div');
        body.className = 'task-occ-note-body';
        body.appendChild(time);
        body.appendChild(text);
        item.appendChild(body);
        const edit = document.createElement('button');
        edit.className = 'task-occ-icon-btn';
        edit.title = t('sidePanel.editNote');
        edit.innerHTML =
          '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
        edit.onclick = () => {
          editingTimestamp = comment.timestamp;
          render();
        };
        item.appendChild(edit);
        appendDeleteButton(item, () => act(`${base}/notes/${comment.timestamp}`, { method: 'DELETE' }));
      }
      el.appendChild(item);
    }

    const addRow = document.createElement('div');
    addRow.className = 'task-occ-add-note';
    const input = document.createElement('input');
    input.className = 'modal-input';
    input.placeholder = t('sidePanel.commentPlaceholder');
    const limitMsg = document.createElement('div');
    limitMsg.className = 'task-occ-limit hidden';
    const add = document.createElement('button');
    add.className = 'menu-btn-small';
    add.textContent = t('sidePanel.addNote');
    const submitNote = () => {
      const text = input.value.trim();
      if (!text) return;
      if (!detail.task.canAddNote) {
        limitMsg.textContent = detail.task.locked ? t('subscribe.reasonTaskLimit') : t('subscribe.reasonCreateLimit');
        limitMsg.classList.remove('hidden');
        return;
      }
      act(`${base}/notes`, { body: { text } });
    };
    add.onclick = submitNote;
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitNote();
      }
    };
    addRow.appendChild(input);
    addRow.appendChild(add);
    el.appendChild(addRow);
    el.appendChild(limitMsg);

    const activityHeading = document.createElement('div');
    activityHeading.className = 'task-stats-heading';
    activityHeading.textContent = t('sidePanel.activity');
    el.appendChild(activityHeading);
    const log = row ? (row.log || []).slice().reverse() : [];
    if (!log.length) {
      const empty = document.createElement('div');
      empty.className = 'task-stats-empty';
      empty.textContent = t('sidePanel.noActivity');
      el.appendChild(empty);
    }
    const logList = document.createElement('div');
    logList.className = 'task-occ-log';
    for (const entry of log) logList.appendChild(buildSidePanelLogRow(entry));
    el.appendChild(logList);
    return el;
  }

  render();
}

// A row's double-click and its context menu's "Edit" item -- the task
// editor's Details tab, with this occurrence preselected in its Occurrences
// tab.
function editTaskOccurrence(taskId, occurrenceDate) {
  openTaskEditor(taskId, { tab: 'details', occurrenceDate });
}

function deleteTask(taskId) {
  if (sidePanelTaskId === taskId) deselectSidePanelTask();
  taskAction(taskId, '', { method: 'DELETE' });
}

// The checkbox (and the context menu's "Mark done"/"Mark failed"): resolves
// the occurrence, or takes that back. Shown checked right away; once
// resolved, the list keeps it a moment longer (crossed out) before
// re-fetching, which may drop it.
function resolveItem(item) {
  const resolvedKey = item.passive ? 'failed' : 'completed';
  const undo = item[resolvedKey];
  const action = item.passive ? (undo ? 'unfail' : 'fail') : undo ? 'reopen' : 'complete';
  item[resolvedKey] = !undo;
  // Checking off a failed appointment (or an overdue task) shows it done at
  // once -- the check mark, not the red X -- and it leaves the list only
  // when it's fetched again a moment later.
  if (!item.passive && !undo) {
    item.failed = false;
    item.overdue = false;
  }
  // What the row offers changes with it right away, as the server will
  // have it -- so it can be taken back at once, before the list is fetched
  // again (which waits a moment after a completion, see `linger`).
  const opposite = { complete: 'reopen', reopen: 'complete', fail: 'unfail', unfail: 'fail' };
  item.actions = (item.actions || []).map((a) => (a === action ? opposite[action] : a));
  if (!undo) {
    item.timer = null;
    item.active = false;
    item.actions = item.actions.filter((a) => !['timer', 'pauseTimer', 'resumeTimer', 'cancelTimer', 'focus', 'unfocus'].includes(a));
  }
  renderTodo();
  if (!isNarrowLayout()) selectTaskForSidePanel(item.taskId, item.occurrenceDate);
  occurrenceAction(item, action, { linger: !undo });
}

// The list's three views, computed server-side (GET /days?view=...) --
// "pending/overdue", "next recurrence" and "all tasks". Persisted per
// account.
const TODO_VIEW_MODES = ['pending', 'next-recurrence', 'all'];

// Populated from the getMe()/login response once startApp() runs -- see
// boot()/the login submit handler.
let todoViewMode = 'pending';

// PATCH /users/me -- fire-and-forget.
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

// { dateISO, sentinel, header, columns } per visible day, in display order
// -- rebuilt on every renderTodo(). See updateTodoDayHighlight.
let todoDayRefs = [];
// Which day is highlighted right now (see updateTodoDayHighlight) -- the
// day being read (readingTodoDate), or one the mouse is over.
let highlightedTodoDate = null;
// The day the reading point is in, by the scroll position alone (with its
// hysteresis) -- what's highlighted whenever no hovered day takes over.
let readingTodoDate = null;
// Where the mouse is over the list (client coordinates), or null when it's
// elsewhere -- see hoveredTodoDayRef.
let todoPointer = null;
// Set whenever the list should open positioned on today -- the first
// render, and switching view or month -- rather than keep its scroll.
let todoScrollToTodayOnRender = true;

// Which day is highlighted (today's undimmed look; every other day, today
// included, gets the dimmed .not-today one) follows the reader through the
// list -- "progress through the day, with hysteresis":
//  - The preferred band is where the gaze naturally rests: 20-35 % of the
//    way down the visible list. Its middle is the
//    reading point. (Lower, 30-45 %, kept a tall day scrolling up out of
//    view highlighted for too long.)
//  - Progress through the highlighted day (0-1) is how far the reading
//    point has moved through that day's section.
//  - Moving on to the next day takes progress past a height-dependent
//    threshold -- 65 % for a short day, down to 45 % for one at least as
//    tall as the visible list (switchThreshold) -- AND the next day's top
//    already inside the band, or close below it (BAND_NEAR).
//  - Moving back to the previous day happens once the highlighted day's top
//    has dropped below the band -- past its bottom plus the "near" margin
//    and a further BACK_GAP (the hysteresis), so the highlight doesn't
//    flicker back and forth around the switch point. A position, mirroring
//    the way forward, rather than the previous day's progress: with that, a
//    tall previous day only took over once its top was near the top of the
//    viewport -- the day below, highlighted, almost scrolled out of view.
// Applied repeatedly on each update, so a fast scroll or a jump settles in
// one go.
//
// The mouse can take the highlight over: a day under it that's well in view
// (all its tasks visible, or its first in the upper half -- see
// hoveredTodoDayRef) is highlighted instead, and once the mouse leaves the
// list (or that day scrolls out of reach) the day being read is again.
//
// The highlighted day is named by the page title (see renderAppTitle). The
// closer any other day is to the reading point, the more opaque its tasks
// (MIN_OPACITY far away, fully opaque at FADE_DISTANCE and closer).

const BAND_TOP = 0.2;
const BAND_BOTTOM = 0.35;
const BAND_NEAR = 0.05; // "near the band": this much of the visible height below it
const THRESHOLD_SHORT = 0.65; // a day at most SHORT_DAY of the visible height
const THRESHOLD_TALL = 0.45; // a day at least as tall as the visible list
const SHORT_DAY = 0.25;
const BACK_GAP = 0.05; // hysteresis: this much further below the band before moving back
const MIN_OPACITY = 0.3; // a non-highlighted day's tasks, far from the reading point
const FADE_DISTANCE = 0.6; // ...becoming fully opaque this close to it, in visible heights

// The visible part of the list, in viewport coordinates, and the band in it.
// Near the very top of the list the band rides higher, starting at the top
// edge at scrollTop 0 and settling into place once the list has scrolled
// as far as the reading point is from the top -- so the first day is the
// highlighted one at the top without empty space above it to scroll it
// down into the band, and the highlight walks through the first days as
// the list scrolls.
function todoReadingGeometry() {
  const viewportTop = todoViewportEl.getBoundingClientRect().top;
  const top = viewportTop;
  const height = Math.max(1, viewportTop + todoViewportEl.clientHeight - top);
  const readingOffset = ((BAND_TOP + BAND_BOTTOM) / 2) * height;
  const settle = Math.min(1, todoViewportEl.scrollTop / readingOffset);
  return {
    height,
    readingOffset,
    bandTop: top + settle * BAND_TOP * height,
    bandBottom: top + settle * BAND_BOTTOM * height,
    reading: top + settle * readingOffset,
  };
}

// A day's section: from its sentinel to the next day's (or its columns' end).
function todoDayExtent(index) {
  const top = todoDayRefs[index].sentinel.getBoundingClientRect().top;
  const next = todoDayRefs[index + 1];
  const bottom = next ? next.sentinel.getBoundingClientRect().top : todoDayRefs[index].columns.getBoundingClientRect().bottom;
  return { top, bottom: Math.max(bottom, top + 1) };
}

function dayProgress(index, reading) {
  const { top, bottom } = todoDayExtent(index);
  return Math.min(1, Math.max(0, (reading - top) / (bottom - top)));
}

function switchThreshold(index, visibleHeight) {
  const { top, bottom } = todoDayExtent(index);
  const relative = (bottom - top) / visibleHeight;
  const t = Math.min(1, Math.max(0, (relative - SHORT_DAY) / (1 - SHORT_DAY)));
  return THRESHOLD_SHORT + (THRESHOLD_TALL - THRESHOLD_SHORT) * t;
}

// So every day can be scrolled into the band, even a short last one: room
// below the last day to bring its top up to the band's top. (The top of the
// list needs none -- the band rides up to meet it, see todoReadingGeometry.)
function sizeTodoListSpacers() {
  const visible = todoViewportEl.clientHeight;
  const bottom = todoListEl.lastElementChild;
  if (bottom && bottom.classList.contains('todo-list-spacer')) bottom.style.height = `${Math.ceil(visible * (1 - BAND_TOP))}px`;
}

function updateTodoDayHighlight() {
  if (todoDayRefs.length === 0) {
    highlightedTodoDate = null;
    readingTodoDate = null;
    renderAppTitle();
    return;
  }
  const { height, bandBottom, reading } = todoReadingGeometry();

  // Start from the day being read so far (still listed after a render?),
  // or else from whichever day the reading point is in.
  // Jumped to a day (see scrollTodoToDay): it's the one being read until
  // the scroll ends.
  const pinned = todoPinnedDate ? todoDayRefs.findIndex((ref) => ref.dateISO === todoPinnedDate) : -1;
  let index = pinned >= 0 ? pinned : todoDayRefs.findIndex((ref) => ref.dateISO === readingTodoDate);
  if (index < 0) {
    index = 0;
    for (let i = 0; i < todoDayRefs.length; i++) if (todoDayExtent(i).top <= reading) index = i;
  }
  for (let guard = 0; pinned < 0 && guard < todoDayRefs.length * 2; guard++) {
    const next = index + 1;
    if (next < todoDayRefs.length && dayProgress(index, reading) >= switchThreshold(index, height) && todoDayExtent(next).top <= bandBottom + BAND_NEAR * height) {
      index = next;
      continue;
    }
    const previous = index - 1;
    if (previous >= 0 && todoDayExtent(index).top > bandBottom + (BAND_NEAR + BACK_GAP) * height) {
      index = previous;
      continue;
    }
    break;
  }

  readingTodoDate = todoDayRefs[index].dateISO;
  // A day the mouse is over takes the highlight while it's well in view.
  const current = hoveredTodoDayRef() || todoDayRefs[index];
  // renderTodo builds every day in the current highlight state already
  // (see there), so the classes only change when the day does -- or when
  // nothing was highlighted yet (the first drawing dims all but today).
  if (current.dateISO !== highlightedTodoDate || !current.group.classList.contains('highlighted')) {
    highlightedTodoDate = current.dateISO;
    for (const ref of todoDayRefs) {
      const dimmed = ref !== current;
      ref.group.classList.toggle('highlighted', !dimmed);
      for (const row of ref.columns.querySelectorAll('.todo-item')) row.classList.toggle('not-today', dimmed);
    }
  }
  renderAppTitle();

  // Every other day: opacity by closeness to the reading point.
  todoDayRefs.forEach((ref, i) => {
    if (ref === current) {
      ref.columns.style.opacity = '';
      return;
    }
    const { top, bottom } = todoDayExtent(i);
    const distance = reading < top ? top - reading : reading > bottom ? reading - bottom : 0;
    const closeness = 1 - Math.min(1, distance / (FADE_DISTANCE * height));
    ref.columns.style.opacity = (MIN_OPACITY + (1 - MIN_OPACITY) * closeness).toFixed(3);
  });
}

// Today's day -- or, with nothing listed today, the first day after it.
function todayTargetDayRef() {
  const todayISO = Dates.dateToISO(new Date());
  return todoDayRefs.find((ref) => ref.dateISO >= todayISO) || null;
}

// Puts today's top right at the reading point -- progress 0, so it's the
// highlighted day there however short it is (a day's top higher up could
// already be past its threshold, highlighting the next one instead).
// Nothing from today on = the top of the list.
//
// From the "Today" button (canStartOver): if today, in the viewed range,
// isn't among the loaded days yet, the list starts over on it. Never from
// renderTodo's own opening scroll -- starting over there would render and
// land right back here. (Days outside the viewed range don't count: the
// server names the nearest day either side even across months.)
function scrollTodoToToday(behavior = 'smooth', { canStartOver = false } = {}) {
  const ref = todayTargetDayRef();
  const todayISO = Dates.todayISO();
  const unloadedAfter = !ref && todoInViewedRange(todoEdges.after);
  const unloadedBefore = !!ref && ref.dateISO > todayISO && todoInViewedRange(todoEdges.before) && todoEdges.before >= todayISO;
  if (canStartOver && todoInViewedRange(todayISO) && (unloadedAfter || unloadedBefore)) {
    resetTodoList();
    return;
  }
  if (!ref) {
    todoViewportEl.scrollTo({ top: 0, behavior });
    return;
  }
  scrollTodoToDay(ref, behavior);
}

// Puts a day's top at the reading point, so it becomes the highlighted one.
// The day is highlighted right away and stays so while the scroll runs
// (todoPinnedDate) -- otherwise the highlight would follow the reading point
// through every day passed on the way and, with its hysteresis, could stop
// short of this one (a short day's next day sits too close below it to
// hand the highlight back).
let todoPinnedDate = null;
let todoPinTimer = null;
function scrollTodoToDay(ref, behavior = 'smooth') {
  todoPinnedDate = ref.dateISO;
  readingTodoDate = ref.dateISO;
  clearTimeout(todoPinTimer);
  todoPinTimer = setTimeout(unpinTodoDay, behavior === 'smooth' ? 1500 : 100);
  todoViewportEl.scrollTo({ top: todoDayScrollTarget(ref), behavior });
  updateTodoDayHighlight();
}
function unpinTodoDay() {
  clearTimeout(todoPinTimer);
  if (!todoPinnedDate) return;
  readingTodoDate = todoPinnedDate;
  todoPinnedDate = null;
  updateTodoDayHighlight();
}
todoViewportEl.addEventListener('scrollend', () => {
  if (todoPinnedDate) unpinTodoDay();
});

// Where a day's top is with the list at scrollTop 0.
function todoDayTop(ref) {
  return ref.sentinel.getBoundingClientRect().top - todoViewportEl.getBoundingClientRect().top + todoViewportEl.scrollTop;
}

function clampTodoScrollTop(top) {
  return Math.min(Math.max(0, Math.round(top)), todoViewportEl.scrollHeight - todoViewportEl.clientHeight);
}

function todoDayScrollTarget(ref) {
  const { readingOffset } = todoReadingGeometry();
  const dayTop = todoDayTop(ref);
  // Near the top the reading point rides up with the scroll (it's at
  // scrollTop itself there), so the day meets it halfway.
  const target = dayTop <= 2 * readingOffset ? dayTop / 2 : dayTop - readingOffset;
  return clampTodoScrollTop(target + 1);
}

// Page Down/Space and Page Up/Shift+Space step the list a whole day at a
// time instead of a screenful. Steps count from the day a step still in
// flight is heading to (todoKeyStepIndex), not the highlighted one -- a
// smooth scroll takes a moment to move the highlight, and pressing again
// meanwhile should go one day further, not repeat the same step. Page Up
// first goes back to the current day's own top if that's scrolled past.
let todoKeyStepIndex = null;
todoViewportEl.addEventListener('scrollend', () => { todoKeyStepIndex = null; });
document.addEventListener('keydown', (e) => {
  const forward = e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey);
  const back = e.key === 'PageUp' || (e.key === ' ' && e.shiftKey);
  if (!forward && !back) return;
  if (e.defaultPrevented || e.ctrlKey || e.altKey || e.metaKey) return;
  const target = e.target;
  if (target instanceof Element && target.closest('input, textarea, select, button, [contenteditable]')) return;
  if (document.querySelector('.modal-overlay:not(.hidden)') || !todoViewportEl.offsetParent || !todoDayRefs.length) return;
  e.preventDefault();
  let index = todoKeyStepIndex ?? todoDayRefs.findIndex((ref) => ref.dateISO === readingTodoDate);
  if (index < 0) index = 0;
  if (forward) {
    index = Math.min(index + 1, todoDayRefs.length - 1);
  } else if (todoKeyStepIndex !== null || todoDayScrollTarget(todoDayRefs[index]) >= todoViewportEl.scrollTop - 2) {
    index = Math.max(index - 1, 0);
  }
  todoKeyStepIndex = index;
  let top = todoDayScrollTarget(todoDayRefs[index]);
  // Stepping back, the reading point on the day's top isn't enough by
  // itself: the highlight only moves back once the following day's top is
  // a gap below the band (see updateTodoDayHighlight) -- but not so far
  // that this day's own top is too, or it'd move back past it. The band
  // shrinks near the top of the list, so the first scroll position (going
  // up from the reading-point one) where exactly that holds is searched for.
  const following = todoDayRefs[index + 1];
  if (back && following) {
    const { height, readingOffset } = todoReadingGeometry();
    const movesBack = (dayTop, scrollTop) =>
      dayTop - scrollTop > Math.min(1, scrollTop / readingOffset) * BAND_BOTTOM * height + (BAND_NEAR + BACK_GAP) * height;
    const dayTop = todoDayTop(todoDayRefs[index]);
    const followingTop = todoDayTop(following);
    for (let candidate = top; candidate >= 0; candidate--) {
      if (movesBack(followingTop, candidate) && (index === 0 || !movesBack(dayTop, candidate))) {
        top = candidate;
        break;
      }
    }
  }
  todoViewportEl.scrollTo({ top, behavior: 'smooth' });
});


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
        resetTodoList();
  };
});

// Which calendar month "pending/overdue" and "all tasks" currently display
// (the list loads only its days, see todoInViewedRange) -- not persisted.
// "Next recurrence" ignores this entirely: it's one upcoming occurrence per
// task, not a month range, so there's nothing for it to page through (see
// updateTodoMonthNav).
let viewedMonthKey = monthKeyOf(Dates.dateToISO(new Date()));

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
  const isCurrentMonth = viewedMonthKey === monthKeyOf(Dates.dateToISO(new Date()));
  todoMonthLabelEl.title = isCurrentMonth ? '' : t('month.jumpToCurrent');
}

todoMonthPrevBtn.onclick = () => {
  viewedMonthKey = addMonthsToKey(viewedMonthKey, -1);
    resetTodoList();
};
todoMonthNextBtn.onclick = () => {
  viewedMonthKey = addMonthsToKey(viewedMonthKey, 1);
    resetTodoList();
};
// Whether the list shows a month other than the current one -- then every
// day's "Today" button (see updateTodoDayHighlight) leads back to it.
function isBrowsingOtherTodoMonth() {
  return todoViewMode !== 'next-recurrence' && viewedMonthKey !== monthKeyOf(Dates.dateToISO(new Date()));
}

// Back to the current month, opened on today (see todoScrollToTodayOnRender).
function jumpTodoToCurrentMonth() {
  const currentMonthKey = monthKeyOf(Dates.dateToISO(new Date()));
  if (viewedMonthKey === currentMonthKey) return;
  viewedMonthKey = currentMonthKey;
    resetTodoList();
}
todoMonthLabelEl.onclick = jumpTodoToCurrentMonth;

todoViewportEl.addEventListener('scroll', updateTodoDayHighlight);

// The day under the mouse, if it's well in view -- all of its tasks inside
// the list's visible part, or its first task in the upper half of it -- and
// so highlighted in place of the day being read (updateTodoDayHighlight).
// Looked up from the pointer's last position each time, so a day scrolling
// under a still mouse counts too. By position, not by the element under the
// pointer: a day reaches down to the next day's top, so the gap between them
// (the next header's margin) doesn't hand the highlight back on its way.
function hoveredTodoDayRef() {
  if (!todoPointer) return null;
  // Not through something covering the list (a menu, a modal).
  const el = document.elementFromPoint(todoPointer.x, todoPointer.y);
  if (!el || !todoViewportEl.contains(el)) return null;
  const y = todoPointer.y;
  const ref = todoDayRefs.find((r, i) => {
    const top = r.group.getBoundingClientRect().top;
    const next = todoDayRefs[i + 1];
    const end = next ? next.group.getBoundingClientRect().top : r.group.getBoundingClientRect().bottom;
    return y >= top && y < end;
  });
  if (!ref) return null;
  const view = todoViewportEl.getBoundingClientRect();
  const rows = ref.columns.getBoundingClientRect();
  const allVisible = rows.top >= view.top && rows.bottom <= view.bottom;
  const startsInUpperHalf = rows.top >= view.top && rows.top < view.top + view.height / 2;
  return allVisible || startsInUpperHalf ? ref : null;
}

// Mouse only: a touch has no hover.
todoViewportEl.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse') return;
  const hadPointer = !!todoPointer;
  const before = hadPointer ? hoveredTodoDayRef() : null;
  todoPointer = { x: e.clientX, y: e.clientY };
  if (!hadPointer || hoveredTodoDayRef() !== before) updateTodoDayHighlight();
});
todoViewportEl.addEventListener('pointerleave', () => {
  if (!todoPointer) return;
  todoPointer = null;
  updateTodoDayHighlight();
});
window.addEventListener('resize', () => {
  sizeTodoListSpacers();
  updateTodoDayHighlight();
});

function renderTodoEmptyState() {
  todoListEl.innerHTML = '';
  todoDayRefs = [];
  updateTodoDayHighlight(); // hides the day bar

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
  if (dateISO === Dates.dateToISO(Dates.addDays(new Date(todayISO + 'T00:00:00'), -1))) {
    return `${t('todo.yesterday')}, ${dateStr}`;
  }
  if (dateISO === Dates.dateToISO(Dates.addDays(new Date(todayISO + 'T00:00:00'), 1))) {
    return `${t('todo.tomorrow')}, ${dateStr}`;
  }
  return dateStr;
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
// is beyond a free/lapsed account's limits (`locked`, decided
// server-side). width/height set per call site, not baked in here, since
// the three spots use different sizes.
const LOCK_ICON =
  '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z"/></svg>';

// The subscription reminder a free account gets on today's list -- an item
// the server adds (virtual 'subscription-prompt', no task behind it, no
// actions); its words are this client's, in the current language.
const SUBSCRIPTION_PROMPT_ID = 'subscription-prompt';
const isSubscriptionPromptItem = (item) => item.virtual === SUBSCRIPTION_PROMPT_ID;
const itemTaskId = (item) => (isSubscriptionPromptItem(item) ? SUBSCRIPTION_PROMPT_ID : item.taskId);

// "15:00", or for a task fixed to another zone "15:00 · 09:00 New York" --
// local time first, then the task's own.
function formatItemDueTime(item) {
  const local = formatTimeOfDay(item.dueTime);
  return item.zoneDueTime ? `${local} · ${t('todo.zoneTime', { time: formatTimeOfDay(item.zoneDueTime), city: timeZoneCity(item.timeZone) })}` : local;
}

// The row's meta line: the due time (or overdue/failed since), or while a
// timer is attached, the timer -- "X of Y" for a countdown, elapsed time for
// a count-up timer or a countdown run past zero into overtime.
function todoItemMetaText(item) {
  if (item.timer) {
    const timer = item.timer;
    const remaining = currentTimerRemaining(timer);
    if (timer.mode === 'countup') return t('todo.timerElapsed', { elapsed: formatElapsedDuration(timerElapsedSeconds(timer)) });
    if (remaining < 0) {
      return t('todo.timerElapsedPlanned', {
        elapsed: formatElapsedDuration(timerElapsedSeconds(timer)),
        planned: formatElapsedDuration(timer.totalSeconds),
      });
    }
    return t('todo.timerRemainingOfTotal', {
      remaining: formatTimerDuration(Math.max(0, remaining)),
      total: formatTimerDuration(timer.totalSeconds),
    });
  }
  if (item.allDay) {
    if (item.kind === 'tomorrow') return t('todo.tomorrowAllDay');
    if (item.failed) return t('todo.failedWasDue', { date: item.occurrenceDate });
    if (item.overdue && !item.completed) return t('todo.overdueSince', { date: item.occurrenceDate });
    return t('todo.allDay');
  }
  if (item.kind === 'tomorrow') return t('todo.tomorrowAt', { time: formatItemDueTime(item) });
  if (item.failed) return t('todo.failedWasDueAt', { date: item.occurrenceDate, time: formatItemDueTime(item) });
  if (item.overdue && !item.completed) return t('todo.overdueSinceAt', { date: item.occurrenceDate, time: formatItemDueTime(item) });
  return t('todo.due', { time: formatItemDueTime(item) });
}

const todoTimerBarWidth = (item) => `${Math.max(0, Math.min(100, timerProgressPercent(item.timer)))}%`;

// Builds a single to-do row from one of the server's items (see
// views.toItem: what it shows, and which actions it allows) -- appended
// into either of a day's two columns. `dimmed`: every day but the
// highlighted one (see updateTodoDayHighlight) -- built that way from the
// start, since switching it on a fresh row would play its transition.
function buildTodoItemRow(item, dimmed) {
  const has = (action) => (item.actions || []).includes(action);
  const virtual = isSubscriptionPromptItem(item);
  const label = virtual ? t('subscribe.taskName') : item.label;
  const description = virtual ? t('subscribe.taskDescription') : item.description;
  const selected = itemTaskId(item) === sidePanelTaskId && item.occurrenceDate === sidePanelOccurrenceDate;
  const row = document.createElement('div');
  row.__taskId = itemTaskId(item); // for refreshSelectedHighlight's cheap re-tag, see there
  row.__occurrenceDate = item.occurrenceDate;
  row.__item = item; // for the timer's in-place ticks, see timerTick
  row.className =
    'todo-item' +
    (item.completed ? ' completed' : '') +
    (item.failed ? ' failed' : '') +
    (item.active ? ' focused' : '') +
    (item.allDay ? ' all-day' : '') +
    // An appointment and a passive task keep their own tint through
    // .completed and .failed alike: still crossed out, but green / the
    // passive color rather than white or red (see the source order of
    // .todo-item.appointment/.passive .todo-item-name in style.css).
    (item.appointment ? ' appointment' : '') +
    (item.passive ? ' passive' : '') +
    // The "pending/overdue" and "all tasks" views show a dismissed
    // occurrence alongside the rest -- this tells them apart. "Next
    // recurrence" never shows one.
    (item.dismissed ? ' dismissed' : '') +
    (selected ? ' selected' : '') +
    (dimmed ? ' not-today' : '');

  // A reverse progress bar behind the row's own content -- full at the
  // start, empties out to nothing as the timer counts down to zero.
  // Appended first and left in normal flow stacking (position: absolute,
  // z-index: auto) so it paints underneath the row's actual (position:
  // relative) content regardless of DOM order.
  if (item.timer) {
    const bar = document.createElement('div');
    bar.className = 'todo-timer-bar';
    bar.style.width = todoTimerBarWidth(item);
    row.appendChild(bar);
  }

  // A task beyond a free/lapsed account's limits shows a padlock instead of
  // a checkbox, so "this needs a subscription" reads differently from "not
  // due yet".
  if (item.locked) {
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
    // A passive task's box means "marked failed" (it has no "done").
    checkbox.checked = item.passive ? item.failed : item.completed;
    // A red "X" instead of the usual check, purely to read as "failed".
    if (item.failed) checkbox.classList.add('todo-checkbox-failed');
    const resolveAction = item.passive ? (item.failed ? 'unfail' : 'fail') : item.completed ? 'reopen' : 'complete';
    checkbox.disabled = !has(resolveAction);
    checkbox.onclick = (e) => {
      e.stopPropagation();
      if (has(resolveAction)) resolveItem(item);
    };
    row.appendChild(checkbox);
  }

  const text = document.createElement('div');
  text.className = 'todo-item-text';

  const name = document.createElement('div');
  name.className = 'todo-item-name';
  // "[series name]: [task name]" for a task in a mixed series (the server's
  // label), its own name otherwise.
  name.textContent = label;
  text.appendChild(name);

  if (description) {
    const desc = document.createElement('div');
    desc.className = 'todo-item-desc';
    desc.textContent = description;
    text.appendChild(desc);
  }

  const meta = document.createElement('div');
  meta.className = 'todo-item-meta' + (item.overdue && !item.completed ? ' overdue' : '') + (item.failed ? ' failed' : '');
  meta.textContent = todoItemMetaText(item);
  text.appendChild(meta);

  // An empty description line after the meta when there's none, so every
  // row is the same height (see .todo-item-desc).
  if (!description) {
    const desc = document.createElement('div');
    desc.className = 'todo-item-desc';
    text.appendChild(desc);
  }

  row.appendChild(text);

  // "Work on this now" -- focusing is only ever the user's own doing: this
  // button, or the context menu's Focus/timer items.
  if (has('focus') || has('unfocus')) {
    const workOnBtn = document.createElement('button');
    workOnBtn.className = 'todo-work-on-btn' + (item.active ? ' active' : '');
    workOnBtn.innerHTML = item.active ? WORKING_ON_ICON : WORK_ON_ICON;
    workOnBtn.title = item.active ? t('todo.stopWorking') : t('todo.workOnNow');
    workOnBtn.onclick = (e) => {
      e.stopPropagation();
      (item.active ? unfocusOccurrence() : focusOccurrence(item.taskId, item.occurrenceDate)).catch(reportActionError);
      // Focusing is a plain list action on narrow screens, not a request to
      // see details.
      if (!isNarrowLayout()) selectTaskForSidePanel(item.taskId, item.occurrenceDate);
    };
    row.appendChild(workOnBtn);
  } else {
    // An invisible stand-in, so a row that can't be focused (done, failed,
    // not due yet, ...) is as tall as one with the eye -- every row the same
    // height.
    const placeholder = document.createElement('span');
    placeholder.className = 'todo-work-on-btn todo-work-on-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.innerHTML = WORK_ON_ICON;
    row.appendChild(placeholder);
  }

  // A carried-over occurrence can be cleared without resolving it (and,
  // once cleared, shown again -- the views that still list it).
  if (has('dismiss') || has('restore')) {
    const isDismissed = has('restore');
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'todo-focus-btn';
    dismissBtn.innerHTML = isDismissed ? SHOW_ICON : DISMISS_ICON;
    dismissBtn.title = isDismissed ? t('todo.showUndo') : t('todo.hideRemove');
    dismissBtn.onclick = (e) => {
      e.stopPropagation();
      selectTaskForSidePanel(item.taskId, item.occurrenceDate);
      occurrenceAction(item, isDismissed ? 'restore' : 'dismiss');
    };
    row.appendChild(dismissBtn);
  }

  row.oncontextmenu = (e) => {
    e.preventDefault();
    if (virtual) return;
    // On a narrow screen selecting would open the side panel over the list
    // (it's a full-screen drawer there) -- the menu alone, then.
    if (!isNarrowLayout()) selectTaskForSidePanel(item.taskId, item.occurrenceDate);
    showTodoContextMenu(e, item);
  };
  attachLongPress(row, row.oncontextmenu);

  // Plain click selects the task for the side panel (again: deselects).
  // Doesn't re-render the list itself (see refreshSelectedHighlight) --
  // replacing this row's DOM node mid-gesture would break double-click
  // detection below.
  row.onclick = () => {
    if (itemTaskId(item) === sidePanelTaskId && item.occurrenceDate === sidePanelOccurrenceDate) deselectSidePanelTask();
    else selectTaskForSidePanel(itemTaskId(item), item.occurrenceDate);
  };

  row.ondblclick = () => {
    if (virtual) goToPricing();
    else if (item.locked) offerSubscriptionUpgrade(t('subscribe.reasonTaskLimit'));
    else editTaskOccurrence(item.taskId, item.occurrenceDate);
  };

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

// Draws the loaded days (see resetTodoList/fillTodoList) -- a group per
// day, its items in two columns. A redraw keeps the first day on screen
// where it was (days added or changed above it would otherwise shift
// everything), unless the list is about to open on today anyway.
function renderTodo() {
  updateTodoViewToggleButton();
  updateTodoMonthNav();
  todoSectionEl.classList.remove('hidden');

  if (!todoDayOrder.length) {
    // Still loading the first day: keep what's there.
    if (todoLoading || todoEdges.before || todoEdges.after) return;
    renderTodoEmptyState();
    return;
  }

  if (todoOpening) todoScrollToTodayOnRender = true;
  const anchor = todoScrollToTodayOnRender ? null : todoScrollAnchor();
  // Each day is drawn as it looked before -- highlighted or dimmed, with
  // its fade (see updateTodoDayHighlight) --
  // rather than from a default that's corrected right after: every row has
  // a transition, so a correction would play as a flicker on each redraw.
  const previousRefs = new Map(todoDayRefs.map((ref) => [ref.dateISO, ref]));
  todoListEl.innerHTML = '';
  const todayISO = Dates.todayISO();
  todoDayRefs = []; // highlightedTodoDate stays: the highlight carries on from it (see updateTodoDayHighlight)

  for (const dateISO of todoDayOrder) {
    const isToday = dateISO === todayISO;
    const dimmed = highlightedTodoDate ? dateISO !== highlightedTodoDate : !isToday;
    const previous = previousRefs.get(dateISO);
    const dayItems = todoDays.get(dateISO);

    // One group per day, holding all of it. The highlighted day's name is
    // the page title's (see renderAppTitle); days are just divided by a
    // line.
    const group = document.createElement('div');
    group.className = 'todo-day' + (dimmed ? '' : ' highlighted');
    todoListEl.appendChild(group);

    // Zero-height marker where this day's section starts --
    // updateTodoDayHighlight reads its position on scroll to tell which
    // day crosses the highlight line.
    const sentinel = document.createElement('div');
    sentinel.className = 'todo-day-sentinel';
    group.appendChild(sentinel);

    const divider = document.createElement('div');
    divider.className = 'todo-day-divider';
    group.appendChild(divider);

    // Two columns, filled in display order (the server's: all-day first,
    // then by due time, then by name) -- the first gets the earlier half,
    // and the extra item when the count is odd.
    const columns = document.createElement('div');
    const firstColumnCount = Math.ceil(dayItems.length / 2);
    const columnItemLists = [dayItems.slice(0, firstColumnCount), dayItems.slice(firstColumnCount)];
    // The between-columns separator only when there's a second column.
    columns.className = 'todo-day-columns' + (columnItemLists[1].length > 0 ? ' todo-day-columns-separated' : '');
    for (const columnItems of columnItemLists) {
      const column = document.createElement('div');
      column.className = 'todo-day-column';
      for (const item of columnItems) column.appendChild(buildTodoItemRow(item, dimmed));
      columns.appendChild(column);
    }
    if (previous) columns.style.opacity = previous.columns.style.opacity;
    group.appendChild(columns);
    todoDayRefs.push({ dateISO, group, sentinel, columns });
  }

  const bottomSpacer = document.createElement('div');
  bottomSpacer.className = 'todo-list-spacer';
  todoListEl.appendChild(bottomSpacer);

  sizeTodoListSpacers();
  // Only once the list is actually laid out (it isn't while still hidden).
  if (todoScrollToTodayOnRender && todoViewportEl.clientHeight > 0) {
    todoScrollToTodayOnRender = false;
    scrollTodoToToday('auto');
  } else if (anchor) {
    restoreTodoScrollAnchor(anchor);
  }
  updateTodoDayHighlight();
  ensureTimerTicking();
  updateTodoTimerChip();
}

// The first day at least partly on screen, and how far its top is from the
// top of the view -- restored after a redraw (restoreTodoScrollAnchor).
function todoScrollAnchor() {
  const viewTop = todoViewportEl.getBoundingClientRect().top;
  for (const ref of todoDayRefs) {
    const rect = ref.group.getBoundingClientRect();
    if (rect.bottom > viewTop) return { dateISO: ref.dateISO, offset: rect.top - viewTop };
  }
  return null;
}

// The same day back where it was -- or, if it's gone, the next one.
function restoreTodoScrollAnchor(anchor) {
  const ref = todoDayRefs.find((r) => r.dateISO >= anchor.dateISO);
  if (!ref) return;
  const viewTop = todoViewportEl.getBoundingClientRect().top;
  const shift = ref.group.getBoundingClientRect().top - viewTop - anchor.offset;
  if (Math.abs(shift) >= 1) todoViewportEl.scrollTop += shift;
}

// The loaded days on screen (or just about to be) -- what's fetched again
// when out of date (see refreshVisibleTodoDays).
function visibleTodoDates() {
  const viewport = todoViewportEl.clientHeight;
  if (!viewport) return todoDayOrder.slice();
  const viewTop = todoViewportEl.getBoundingClientRect().top;
  return todoDayRefs
    .filter((ref) => {
      const rect = ref.group.getBoundingClientRect();
      return rect.bottom - viewTop > -viewport / 2 && rect.top - viewTop < 1.5 * viewport;
    })
    .map((ref) => ref.dateISO);
}

// Back in a tab that's been in the background: whatever was on screen may
// have changed meanwhile (on another device, say).
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && currentUserId && todoDayOrder.length) refreshVisibleTodoDays();
});

// The reader scrolling themselves ends the list's opening (see
// todoOpening): from then on it stays where they put it.
const stopTodoOpening = () => {
  todoOpening = false;
};
for (const type of ['wheel', 'touchmove', 'mousedown']) todoViewportEl.addEventListener(type, stopTodoOpening, { passive: true });
document.addEventListener('keydown', (e) => {
  if (['PageUp', 'PageDown', ' ', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) stopTodoOpening();
});

// While scrolling: load more as an end comes near, and fetch again what's
// come into view if its copy is out of date.
let todoScrollWorkTimer = null;
todoViewportEl.addEventListener('scroll', () => {
  clearTimeout(todoScrollWorkTimer);
  todoScrollWorkTimer = setTimeout(() => {
    fillTodoList();
    refreshVisibleTodoDays();
  }, 120);
});

// A running timer's display needs to tick every second -- its row's bar and
// meta line are updated in place (redrawing the list would restart every
// row's transitions), once a second, while (and only while) a loaded item's
// timer is actually running (a "Set" timer waiting for its focus has
// nothing to tick). A countdown reaching zero (without "continue past zero") or any
// timer reaching the MAX_TIMER_SECONDS cap is the server's to stop: the list
// is refreshed then, and the server's answer carries the chime (see
// applyActionResult/fetchTodoDay).
let timerTickIntervalId = null;
let timerExpiryRefreshed = false;
function runningTimerItem() {
  for (const items of todoDays.values()) {
    for (const item of items) if (item.timer && item.timer.runningSince != null) return item;
  }
  // Not among the loaded days (another month, say): the focused one's.
  return focusedTodoItem && focusedTodoItem.timer && focusedTodoItem.timer.runningSince != null ? focusedTodoItem : null;
}
function ensureTimerTicking() {
  const shouldTick = !!runningTimerItem();
  if (shouldTick && !timerTickIntervalId) {
    timerTickIntervalId = setInterval(timerTick, 1000);
  } else if (!shouldTick && timerTickIntervalId) {
    clearInterval(timerTickIntervalId);
    timerTickIntervalId = null;
  }
}
function timerTick() {
  const item = runningTimerItem();
  if (item) {
    const remaining = currentTimerRemaining(item.timer);
    const ranOut = (item.timer.mode === 'countdown' && !item.timer.continuePastZero && remaining <= 0) || timerElapsedSeconds(item.timer) >= MAX_TIMER_SECONDS;
    if (ranOut && !timerExpiryRefreshed) {
      timerExpiryRefreshed = true;
      refreshEverything();
    } else if (!ranOut) {
      timerExpiryRefreshed = false;
    }
  }
  // Just the timed rows' bar and meta line, in place -- not a redraw.
  for (const row of todoListEl.querySelectorAll('.todo-item')) {
    const rowItem = row.__item;
    if (!rowItem || !rowItem.timer) continue;
    const bar = row.querySelector('.todo-timer-bar');
    if (bar) bar.style.width = todoTimerBarWidth(rowItem);
    const meta = row.querySelector('.todo-item-meta');
    if (meta) meta.textContent = todoItemMetaText(rowItem);
  }
  updateTodoTimerChip();
}

// ---------------------------------------------------------------------------
// The running timer's chip (#todo-timer-chip, in the toolbar): while the
// row with a running timer isn't on screen -- scrolled away, or not loaded at
// all (another month, another view) -- its name and timer show there, as on
// the row, ticking with it (see timerTick). A click scrolls to the row,
// loading days (or switching to its month) on the way if need be.
// ---------------------------------------------------------------------------

const todoTimerChipEl = document.getElementById('todo-timer-chip');
const todoTimerChipBarEl = todoTimerChipEl.querySelector('.todo-timer-chip-bar');
const todoTimerChipNameEl = todoTimerChipEl.querySelector('.todo-timer-chip-name');
const todoTimerChipMetaEl = todoTimerChipEl.querySelector('.todo-timer-chip-meta');

function todoRowFor(item) {
  return [...todoListEl.querySelectorAll('.todo-item')].find((r) => r.__taskId === item.taskId && r.__occurrenceDate === item.occurrenceDate) || null;
}

function updateTodoTimerChip() {
  const item = runningTimerItem();
  let show = !!item;
  if (item) {
    const row = todoRowFor(item);
    if (row) {
      const rect = row.getBoundingClientRect();
      const view = todoViewportEl.getBoundingClientRect();
      show = rect.bottom <= view.top || rect.top >= view.bottom;
    }
  }
  todoTimerChipEl.classList.toggle('hidden', !show);
  if (!show) return;
  todoTimerChipEl.__item = item;
  todoTimerChipEl.title = t('todo.showTimerTask');
  todoTimerChipBarEl.style.width = todoTimerBarWidth(item);
  todoTimerChipNameEl.textContent = item.label;
  todoTimerChipMetaEl.textContent = todoItemMetaText(item);
}

todoViewportEl.addEventListener('scroll', updateTodoTimerChip);
window.addEventListener('resize', updateTodoTimerChip);
todoTimerChipEl.onclick = () => {
  if (todoTimerChipEl.__item) revealTodoItem(todoTimerChipEl.__item);
};

// Scrolls an item's row into view -- first switching to its month (unless
// the view isn't month-bound) and loading the days up to it, if it isn't
// loaded yet.
async function revealTodoItem(item) {
  let row = todoRowFor(item);
  if (!row) {
    const date = item.displayDate;
    if (!todoInViewedRange(date)) {
      viewedMonthKey = monthKeyOf(date);
      await resetTodoList();
    }
    await loadTodoDaysThrough(date);
    row = todoRowFor(item);
  }
  if (!row) return;
  todoOpening = false;
  row.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

// Loads days from the loaded ones' edge until `date` is loaded (or there's
// nothing more in that direction), then draws them.
async function loadTodoDaysThrough(date) {
  for (let wait = 0; wait < 100 && todoLoading; wait++) await new Promise((resolve) => setTimeout(resolve, 50));
  const generation = todoGeneration;
  todoLoading = true;
  try {
    for (let guard = 0; guard < 62 && !todoDays.has(date); guard++) {
      const first = todoDayOrder[0];
      const last = todoDayOrder[todoDayOrder.length - 1];
      if (last && date > last && todoInViewedRange(todoEdges.after) && todoEdges.after <= date) {
        const day = await fetchTodoDay(todoEdges.after, 'after');
        if (generation !== todoGeneration) return;
        if (day.date && todoInViewedRange(day.date)) insertTodoDay(day.date, day.items);
        todoEdges.after = day.date && todoInViewedRange(day.date) ? day.nextDate : null;
      } else if (first && date < first && todoInViewedRange(todoEdges.before) && todoEdges.before >= date) {
        const day = await fetchTodoDay(todoEdges.before, 'before');
        if (generation !== todoGeneration) return;
        if (day.date && todoInViewedRange(day.date)) insertTodoDay(day.date, day.items);
        todoEdges.before = day.date && todoInViewedRange(day.date) ? day.previousDate : null;
      } else {
        break;
      }
    }
  } catch (err) {
    console.error('Failed to load the list:', err);
  } finally {
    todoLoading = false;
  }
  if (generation === todoGeneration) renderTodo();
}

// ---------------------------------------------------------------------------
// Side panel -- notes and activity history for whichever task was last
// interacted with (see selectTaskForSidePanel, called from the to-do list's
// click/right-click/checkbox/focus/dismiss handlers). Scoped to just the one
// selected occurrence ('occurrence'), the task as a whole ('task' -- its own
// notes/activity plus every one of its occurrences'), or its whole series ('series' -- every record sharing its seriesId, which
// can span multiple distinct taskIds once tasks have been merged together in
// the manage-tasks modal) -- see sidePanelScope/refreshSidePanel.
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

let sidePanelTaskId = null; // the task last interacted with (its taskId)
// Which of its occurrences was actually clicked -- only 'occurrence'
// scope's own notes/log depend on it; 'task'/'series' scope don't care.
let sidePanelOccurrenceDate = null;
let sidePanelScope = 'task'; // 'occurrence' | 'task' | 'series'
// Whether notes show their edit/delete controls -- off by default, and reset
// whenever a different task is selected, so it's never silently left armed
// against whatever task happens to be clicked next.
let sidePanelEditMode = false;
// What the panel shows, as last fetched (see refreshSidePanel): the task
// (GET /tasks/:taskId) and, in series scope, its series with every member's
// notes (GET /series/:seriesId?notes=1). Keyed by what was selected, so a
// slower answer for an earlier selection is ignored.
let sidePanelData = null; // { key, detail, series }
let agendaItems = []; // today's agenda (GET /agenda), shown with nothing selected
// Its focus/timer sessions, where they ran (the running one's endMs: null).
let agendaSessions = [];

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

function selectTaskForSidePanel(taskId, occurrenceDate) {
  if (taskId !== sidePanelTaskId || occurrenceDate !== sidePanelOccurrenceDate) sidePanelEditMode = false;
  const sameTask = taskId === sidePanelTaskId;
  sidePanelTaskId = taskId;
  sidePanelOccurrenceDate = occurrenceDate;
  // A task being selected already shows the panel on its own -- reset so
  // deselecting it later closes the panel back up instead of falling back
  // to a drawer left open from before this selection.
  agendaDrawerOpenNarrow = false;
  if (!sameTask) sidePanelData = null;
  renderSidePanel();
  refreshSelectedHighlight();
  refreshSidePanel();
}

// Clicking the already-selected row again, or pressing Escape, clears the
// side panel back to its empty state (today's agenda).
function deselectSidePanelTask() {
  sidePanelTaskId = null;
  sidePanelOccurrenceDate = null;
  sidePanelEditMode = false;
  sidePanelData = null;
  renderSidePanel();
  refreshSelectedHighlight();
  refreshSidePanel();
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
  if (e.key === 'Escape' && sidePanelTaskId) deselectSidePanelTask();
});

// Retags which rendered .todo-item row(s) carry the .selected accent
// without rebuilding the list (a full rebuild on every plain click broke
// double-click-to-edit -- see row.onclick in buildTodoItemRow).
function refreshSelectedHighlight() {
  document.querySelectorAll('.todo-item.selected').forEach((el) => el.classList.remove('selected'));
  if (!sidePanelTaskId) return;
  document.querySelectorAll('.todo-item').forEach((el) => {
    if (el.__taskId === sidePanelTaskId && el.__occurrenceDate === sidePanelOccurrenceDate) el.classList.add('selected');
  });
}

const sidePanelKey = () => `${sidePanelTaskId}|${sidePanelScope}`;

// Re-fetches what the panel shows -- the selected task (and its series, in
// series scope), or today's agenda with nothing selected -- then redraws it.
// A task that's gone (deleted) deselects.
async function refreshSidePanel() {
  if (!currentUserId) return;
  if (!sidePanelTaskId) {
    try {
      const agendaAnswer = await apiFetch(`/agenda?date=${Dates.todayISO()}`);
      agendaItems = agendaAnswer.items;
      agendaSessions = agendaAnswer.sessions || [];
      if ('focused' in agendaAnswer) focusedTodoItem = agendaAnswer.focused;
    } catch (err) {
      console.error('Failed to load the agenda:', err);
    }
    if (!sidePanelTaskId) renderSidePanel();
    return;
  }
  if (sidePanelTaskId === SUBSCRIPTION_PROMPT_ID) {
    renderSidePanel();
    return;
  }
  const key = sidePanelKey();
  try {
    const detail = await fetchTaskDetail(sidePanelTaskId);
    const series = sidePanelScope === 'series' ? await apiFetch(`/series/${encodeURIComponent(detail.task.seriesId)}?notes=1`) : null;
    if (key !== sidePanelKey()) return;
    sidePanelData = { key, detail, series };
  } catch (err) {
    if (key !== sidePanelKey()) return;
    if (err.code === 'TASK_NOT_FOUND') {
      deselectSidePanelTask();
      return;
    }
    console.error('Failed to load the side panel:', err);
  }
  renderSidePanel();
}

// Direct-management actions for the one selected occurrence -- only in
// 'occurrence' scope, and only once something's recorded on it (nothing to
// manage about a still-untouched date): edit it in the task editor,
// reschedule it, delete it -- the last two as the server allows (a
// recurUntilCompleted task's live occurrence can't be moved by hand).
function renderSidePanelOccurrenceActions(detail, entry) {
  sidePanelOccurrenceActionsEl.innerHTML = '';
  const show = !!(detail && entry && entry.recorded);
  sidePanelOccurrenceActionsEl.classList.toggle('hidden', !show);
  if (!show) return;
  const taskId = detail.task.taskId;
  const occurrenceDate = entry.date;

  const editBtn = document.createElement('button');
  editBtn.className = 'menu-btn-small';
  editBtn.textContent = t('occurrencePanel.editThisOccurrence');
  editBtn.onclick = () => openTaskEditor(taskId, { tab: 'occurrences', occurrenceDate });
  sidePanelOccurrenceActionsEl.appendChild(editBtn);

  const rescheduleBtn = document.createElement('button');
  rescheduleBtn.className = 'menu-btn-small';
  rescheduleBtn.textContent = t('occurrencePanel.reschedule');
  rescheduleBtn.disabled = !entry.reschedulable;
  rescheduleBtn.title = entry.reschedulable ? '' : t('occurrencePanel.blockedRecurUntilCompleted');
  rescheduleBtn.onclick = () => rescheduleOccurrencePrompt(taskId, occurrenceDate);
  sidePanelOccurrenceActionsEl.appendChild(rescheduleBtn);

  if (entry.deletable) {
    appendDeleteButton(sidePanelOccurrenceActionsEl, () => taskAction(taskId, `/occurrences/${occurrenceDate}`, { method: 'DELETE' }));
  }
}

// Moves one recorded occurrence to another date. Moving it forward skips
// every pattern date in between, server-side.
async function rescheduleOccurrencePrompt(taskId, occurrenceDate) {
  const result = await showFormModal(t('occurrencePanel.rescheduleTitle'), [
    { name: 'newDate', label: t('occurrencePanel.rescheduleDateLabel'), type: 'date', value: occurrenceDate },
  ]);
  if (!result || result.newDate === occurrenceDate) return;
  const done = await taskAction(taskId, `/occurrences/${occurrenceDate}/reschedule`, { body: { date: result.newDate } });
  if (done && sidePanelTaskId === taskId && sidePanelOccurrenceDate === occurrenceDate) sidePanelOccurrenceDate = result.newDate;
}

// ---------------------------------------------------------------------------
// Month-grid date picker -- a real calendar rather than a plain
// <input type="date">, whose own popup is native UI (and on Linux Chromium
// not even a calendar, see showFormModal's own comment on native dialogs).
// Resolves the picked 'YYYY-MM-DD', or null if cancelled. minISO/maxISO are
// inclusive (maxISO null = unbounded); rangeStartISO, if given, tints every
// date from it up to (not including) the one being picked, previewing the
// span the choice covers; summary(dateISO) is the line shown under the grid
// once a date is picked. isSelectable(dateISO), if given, further limits which
// dates in range can be picked -- those that can are highlighted -- and
// startMonthISO picks which month the grid opens on (default: initialISO's,
// else minISO's).
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

function showDatePickerModal({ title, hint, minISO, maxISO = null, initialISO = null, rangeStartISO = null, summary, isSelectable = null, startMonthISO = null }) {
  return new Promise((resolve) => {
    let selected = initialISO;
    let monthKey = monthKeyOf(startMonthISO || initialISO || minISO);
    const weekStart = effectiveWeekStart();

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
      const todayISO = Dates.dateToISO(new Date());
      for (let d = 1; d <= Dates.daysInMonth(y, m - 1); d++) {
        const iso = `${monthKey}-${String(d).padStart(2, '0')}`;
        const btn = document.createElement('button');
        const inRange = iso >= minISO && (!maxISO || iso <= maxISO);
        const selectable = inRange && (!isSelectable || isSelectable(iso));
        btn.className =
          'date-picker-day' +
          (isSelectable && selectable ? ' selectable' : '') +
          (iso === todayISO ? ' today' : '') +
          (iso === selected ? ' selected' : '') +
          (rangeStartISO && selected && iso >= rangeStartISO && iso < selected ? ' in-range' : '');
        btn.textContent = String(d);
        btn.disabled = !selectable;
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
// there. Earlier occurrences are untouched. The server applies it (a plain
// task's pattern restarts on the picked date, a recurUntilCompleted task's
// live occurrence moves there) and records the span, so a task paused right
// now offers "Resume recurrence now" (the `resume` action).
// ---------------------------------------------------------------------------

const isoDayAfter = (iso) => Dates.shiftISO(iso, 1);

// The dates a task occurs on in [from, to] (at most about a year), and the
// last date it can ever occur on (null: no end) -- GET /tasks/:id/dates.
function fetchTaskDates(taskId, from, to) {
  return apiFetch(`/tasks/${encodeURIComponent(taskId)}/dates?from=${from}&to=${to}`);
}

async function promptPauseRecurrence(item) {
  const { taskId, occurrenceDate } = item;
  const minISO = isoDayAfter(occurrenceDate);
  let maxISO;
  try {
    maxISO = (await fetchTaskDates(taskId, minISO, minISO)).last;
  } catch (err) {
    reportActionError(err);
    return;
  }
  if (maxISO && maxISO < minISO) {
    showInfoModal(t('pause.nothingAfter'));
    return;
  }
  const resumeISO = await showDatePickerModal({
    title: t('pause.title', { name: item.name }),
    hint: t('pause.hint', { date: formatShortDate(occurrenceDate) }),
    minISO,
    maxISO,
    rangeStartISO: occurrenceDate,
    summary: (d) =>
      t('pause.summary', {
        from: formatShortDate(occurrenceDate),
        to: formatShortDate(Dates.shiftISO(d, -1)),
        resume: formatShortDate(d),
      }),
  });
  if (!resumeISO) return;
  taskAction(taskId, '/pause', { body: { from: occurrenceDate, until: resumeISO } });
}

// "Resume recurrence now": ends a current pause today instead of on its
// resume date, with an occurrence today even if the pattern doesn't land
// there.
function resumeRecurrenceNow(item) {
  taskAction(item.taskId, '/resume');
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
  if (task.allDay) color = '#8ab4f8';
  if (task.appointment) color = '#81c995';
  if (task.passive) color = '#bcaaa4';
  // Failed is red whatever else the task is (all-day included).
  if (failed) color = '#f28b82';
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

// Right-click on anything on the agenda opens the very same menu as the
// to-do row for that occurrence (showTodoContextMenu). Unlike a row, it
// doesn't also select the task: selecting swaps the agenda out for the
// task's notes (see renderSidePanel), which would yank away what was just
// right-clicked. Double-click is the deliberate way to do that: it selects
// the task, same as clicking its to-do row (whose row it also scrolls into
// view, if the current list view shows it), and the side panel's close
// button brings the agenda back.
function attachAgendaContextMenu(el, item) {
  el.ondblclick = (e) => {
    e.preventDefault();
    selectTaskForSidePanel(item.taskId, item.occurrenceDate);
    const row = [...document.querySelectorAll('.todo-item')].find((r) => r.__taskId === item.taskId && r.__occurrenceDate === item.occurrenceDate);
    if (row) row.scrollIntoView({ block: 'nearest' });
  };
  el.oncontextmenu = (e) => {
    e.preventDefault();
    showTodoContextMenu(e, item);
  };
  attachLongPress(el, el.oncontextmenu);
}

function buildAgendaAllDayPill(item) {
  const pill = document.createElement('div');
  pill.className = 'agenda-all-day-pill' + (item.completed ? ' completed' : '');
  pill.style.background = agendaHexToRgba(item.color, 0.85);
  pill.textContent = item.name;
  pill.title = item.name;
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
  const dueMinutes = agendaTimeToMinutes(item.dueTime);
  band.style.height = `${(dueMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
  band.style.background = agendaHexToRgba(item.color, 0.16);
  const label = document.createElement('span');
  label.className = 'agenda-passive-band-label';
  label.style.color = item.color;
  label.textContent = item.name;
  attachAgendaContextMenu(label, item); // the band itself is click-through, see style.css
  band.appendChild(label);
  band.title = `${item.name} · ${t('todo.due', { time: formatTimeOfDay(item.dueTime) })}`;
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

function agendaBlockRange(item) {
  return agendaRangeForDueMinutes(agendaTimeToMinutes(item.dueTime), item.durationMinutes, item.appointment);
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
// actually resolves; the redraw after rescheduleAgendaItem's action throws
// this whole DOM subtree away and rebuilds it from the server's state,
// discarding these inline styles along with it, so there's nothing to
// reset by hand.
function attachAgendaBlockDrag(el, item) {
  const durationMinutes = item.durationMinutes;
  const originalDueMinutes = agendaTimeToMinutes(item.dueTime);
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
      const range = agendaRangeForDueMinutes(latestDueMinutes, durationMinutes, item.appointment);
      el.style.top = `${(range.startMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
      el.style.height = `${((range.endMinutes - range.startMinutes) / 60) * AGENDA_HOUR_HEIGHT}px`;
      if (timeEl) timeEl.textContent = formatTimeOfDay(agendaMinutesToTime(latestDueMinutes));
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      el.classList.remove('dragging');
      // A press that never moved (e.g. half of a double-click, see
      // attachAgendaContextMenu) changed nothing and left no live-drag
      // styles behind -- skip the re-render, which would otherwise replace
      // this element between the two clicks and swallow the double-click.
      if (latestDueMinutes === originalDueMinutes) return;
      rescheduleAgendaItem(item, agendaMinutesToTime(latestDueMinutes));
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}

// Applies a drag-reschedule's dropped due time to the task itself -- every
// occurrence's due time. In the user's local time: a task fixed to another
// zone keeps its own, converted server-side. The agenda is redrawn from the
// server's state afterwards (refreshEverything), which is what discards the
// live-drag inline styles -- refused or not.
function rescheduleAgendaItem(item, newDueTime) {
  taskAction(item.taskId, '/due-time', { method: 'PUT', body: { dueTime: newDueTime, date: agendaDate() } });
}

const agendaDate = () => Dates.todayISO();

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
  name.textContent = block.item.name;
  el.appendChild(name);

  const time = document.createElement('div');
  time.className = 'agenda-block-time';
  time.textContent = formatTimeOfDay(block.item.dueTime);
  el.appendChild(time);

  el.title = block.item.name;
  if (block.item.draggable) attachAgendaBlockDrag(el, block.item);
  attachAgendaContextMenu(el, block.item);
  return el;
}

// The current time across the agenda (it always shows today), moved along
// every AGENDA_NOW_LINE_MS rather than only on a redraw.
const AGENDA_NOW_LINE_MS = 30 * 1000;
function positionAgendaNowLine() {
  // A session still running grows with the clock: the agenda is redrawn.
  if (!sidePanelTaskId && agendaSessions.some((s) => s.endMs == null) && !positionAgendaNowLine.redrawing) {
    positionAgendaNowLine.redrawing = true;
    try {
      renderTodayAgenda();
    } finally {
      positionAgendaNowLine.redrawing = false;
    }
    return;
  }
  const line = agendaTimelineEl.querySelector('.agenda-now-line');
  if (!line) return;
  const now = new Date();
  line.style.top = `${((now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60) / 60) * AGENDA_HOUR_HEIGHT}px`;
  line.title = formatTimeOfDay(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
}
setInterval(positionAgendaNowLine, AGENDA_NOW_LINE_MS);

// A focus/timer session drawn where it ran, from its task's due-time block's
// look but fixed in place: not draggable, its own menu (deleting the
// measurement, once it's stored), a clock icon if it was timed (allowed to
// stick out of a frame too short to hold it). The running one grows with the
// clock (see positionAgendaNowLine).
const CLOCK_ICON =
  '<svg viewBox="0 0 24 24" width="10" height="10"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';

function agendaSessionRange(session) {
  const dayStart = new Date(`${agendaDate()}T00:00:00`).getTime();
  const toMinutes = (ms) => Math.max(0, Math.min(24 * 60, (ms - dayStart) / 60000));
  return { startMinutes: toMinutes(session.startMs), endMinutes: toMinutes(session.endMs == null ? Date.now() : session.endMs) };
}

function buildAgendaSessionBlock(block) {
  const session = block.item;
  const el = document.createElement('div');
  el.className = 'agenda-block measured' + (session.endMs == null ? ' live' : '');
  el.style.top = `${(block.startMinutes / 60) * AGENDA_HOUR_HEIGHT}px`;
  el.style.height = `${Math.max(1, ((block.endMinutes - block.startMinutes) / 60) * AGENDA_HOUR_HEIGHT)}px`;
  const widthPercent = 100 / block.totalColumns;
  el.style.left = `${widthPercent * block.column}%`;
  el.style.width = `calc(${widthPercent}% - 4px)`;
  const color = resolveAgendaColor({ ...session, allDay: false }, false, false);
  el.style.background = agendaHexToRgba(color, 0.3);
  el.style.borderColor = agendaHexToRgba(color, 0.9);

  const name = document.createElement('div');
  name.className = 'agenda-block-name';
  name.textContent = session.label;
  el.appendChild(name);
  if (session.kind === 'timer') {
    const clock = document.createElement('span');
    clock.className = 'agenda-session-clock';
    clock.innerHTML = CLOCK_ICON;
    el.appendChild(clock);
  }

  const time = (ms) => formatTimeOfDay(`${String(new Date(ms).getHours()).padStart(2, '0')}:${String(new Date(ms).getMinutes()).padStart(2, '0')}`);
  el.title = `${session.label} · ${t(session.kind === 'timer' ? 'agenda.measuredTimer' : 'agenda.measuredFocus', {
    from: time(session.startMs),
    to: time(session.endMs == null ? Date.now() : session.endMs),
  })}`;

  // Only a stored session can be deleted (the running one isn't yet).
  if (session.id) {
    el.oncontextmenu = (e) => {
      e.preventDefault();
      showTodoContextMenu(e, { actions: ['deleteMeasurement'], sessionId: session.id });
    };
    attachLongPress(el, el.oncontextmenu);
  }
  return el;
}

function renderTodayAgenda() {
  const items = agendaItems.map((item) => ({ ...item, color: resolveAgendaColor(item, item.completed, item.failed) }));

  agendaAllDayEl.innerHTML = '';
  for (const item of items.filter((i) => i.allDay)) {
    agendaAllDayEl.appendChild(buildAgendaAllDayPill(item));
  }

  // Hour lines/labels are direct children of .agenda-timeline (they span its
  // full width, gutter included); .agenda-tracks is the one static child
  // that must survive this clear -- everything actually representing a task
  // goes in there instead (see .agenda-tracks, style.css).
  agendaTimelineEl.querySelectorAll('.agenda-hour-line, .agenda-now-line').forEach((el) => el.remove());
  for (let h = 0; h < 24; h++) agendaTimelineEl.appendChild(buildAgendaHourLine(h));
  const nowLine = document.createElement('div');
  nowLine.className = 'agenda-now-line';
  agendaTimelineEl.appendChild(nowLine);
  positionAgendaNowLine();

  agendaTracksEl.innerHTML = '';
  const timedItems = items.filter((i) => !i.allDay);
  for (const item of timedItems.filter((i) => i.passive)) {
    agendaTracksEl.appendChild(buildAgendaPassiveBand(item));
  }

  const blocks = timedItems
    .filter((i) => !i.passive)
    .map((item) => ({ item, ...agendaBlockRange(item) }));
  const sessionBlocks = agendaSessions.map((session) => ({ item: session, session: true, ...agendaSessionRange(session) }));
  assignAgendaColumns([...blocks, ...sessionBlocks]);
  for (const block of blocks) agendaTracksEl.appendChild(buildAgendaBlock(block));
  for (const block of sessionBlocks) agendaTracksEl.appendChild(buildAgendaSessionBlock(block));

  agendaEmptyEl.classList.toggle('hidden', items.length > 0 || agendaSessions.length > 0);
}

// A note's own address: a task-level note (occurrenceDate null) or one on an
// occurrence, by its timestamp.
function notePath(note) {
  const base = note.occurrenceDate ? occurrencePath(note.taskId, note.occurrenceDate) : `/tasks/${encodeURIComponent(note.taskId)}`;
  return `${base}/notes/${note.comment.timestamp}`;
}

async function editCommentPrompt(note) {
  const result = await showFormModal(t('sidePanel.editNote'), [{ name: 'text', label: t('sidePanel.noteLabel'), type: 'textarea', value: note.comment.text }]);
  if (!result || !result.text.trim() || result.text.trim() === note.comment.text) return;
  runAction(() => apiFetch(notePath(note), { method: 'PATCH', body: { text: result.text.trim() } })).catch(reportActionError);
}

// note: { taskId, occurrenceDate, comment, label }
function buildSidePanelCommentRow(note) {
  const { comment, label } = note;
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
    editBtn.onclick = () => editCommentPrompt(note);
    actions.appendChild(editBtn);

    appendDeleteButton(actions, () => runAction(() => apiFetch(notePath(note), { method: 'DELETE' })).catch(reportActionError));

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

// One block per task record -- its own name/description/details, since
// members of a merged series differ on any of those.
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
  const narrowPanelVisible = !!sidePanelTaskId || agendaDrawerOpenNarrow;
  sidePanelEl.classList.toggle('side-panel-narrow-visible', narrowPanelVisible);
  appMainEl.classList.toggle('narrow-overlay-open', narrowPanelVisible);

  if (!sidePanelTaskId) {
    sidePanelEmptyEl.classList.remove('hidden');
    sidePanelContentEl.classList.add('hidden');
    renderTodayAgenda();
    return;
  }

  sidePanelEmptyEl.classList.add('hidden');
  sidePanelContentEl.classList.remove('hidden');
  const virtual = sidePanelTaskId === SUBSCRIPTION_PROMPT_ID;
  const data = !virtual && sidePanelData && sidePanelData.key === sidePanelKey() ? sidePanelData : null;
  const detail = data ? data.detail : null;
  const mixedSeries = !!(detail && detail.series.mixed);
  sidePanelTitleEl.textContent = mixedSeries ? detail.series.name : '';
  sidePanelTitleEl.classList.toggle('hidden', !mixedSeries);
  const scopeIndex = SIDE_PANEL_SCOPES.indexOf(sidePanelScope);
  sidePanelScopeOpts.forEach((btn, i) => btn.classList.toggle('active', i === scopeIndex));
  updateSidePanelScopeThumb(scopeIndex);
  sidePanelEditToggleBtn.title = sidePanelEditMode ? t('sidePanel.stopEditingNotes') : t('sidePanel.editNotes');
  sidePanelEditToggleBtn.classList.toggle('active', sidePanelEditMode);

  // A task beyond the free plan's limits shows a padlock on "Add note"
  // (clicking it offers a subscription, see the add handler).
  const commentAddLocked = !!(detail && detail.task.locked);
  sidePanelCommentAddBtn.innerHTML = (commentAddLocked ? LOCK_ICON : '') + t('sidePanel.addNote');
  sidePanelCommentAddBtn.classList.toggle('locked', commentAddLocked);
  sidePanelCommentAddBtn.disabled = virtual;

  sidePanelSummariesEl.innerHTML = '';
  sidePanelCommentsEl.innerHTML = '';
  sidePanelLogEl.innerHTML = '';
  if (virtual) {
    sidePanelSummariesEl.appendChild(
      buildSidePanelTaskSummary({ name: t('subscribe.taskName'), description: t('subscribe.taskDescription'), details: t('subscribe.taskDetails') })
    );
    renderSidePanelOccurrenceActions(null, null);
    sidePanelCommentsEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noNotes')));
    sidePanelLogEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noActivity')));
    return;
  }
  if (!detail) {
    // Still loading (see refreshSidePanel).
    renderSidePanelOccurrenceActions(null, null);
    return;
  }

  // Task info: in series scope, a block per member (they differ on any of
  // it); otherwise the one task's.
  const seriesTasks = data.series ? data.series.tasks : null;
  if (sidePanelScope === 'series' && seriesTasks) {
    for (const member of seriesTasks) sidePanelSummariesEl.appendChild(buildSidePanelTaskSummary(member));
  } else {
    sidePanelSummariesEl.appendChild(buildSidePanelTaskSummary(detail.task));
  }
  const selectedRow = sidePanelOccurrenceDate != null ? detail.occurrences.find((o) => o.occurrenceDate === sidePanelOccurrenceDate) : null;
  if (selectedRow && selectedRow.details) {
    const occurrenceDetails = document.createElement('div');
    occurrenceDetails.className = 'side-panel-task-summary side-panel-occurrence-details';
    const label = document.createElement('div');
    label.className = 'side-panel-task-summary-name';
    label.textContent = t('sidePanel.occurrenceDetails', { date: formatShortDate(selectedRow.occurrenceDate) });
    const text = document.createElement('div');
    text.className = 'side-panel-task-summary-details';
    text.textContent = selectedRow.details;
    occurrenceDetails.appendChild(label);
    occurrenceDetails.appendChild(text);
    sidePanelSummariesEl.appendChild(occurrenceDetails);
  }

  // Notes and activity: the occurrence's own ('occurrence'), or every one in
  // scope -- the task's (or each series member's) own plus all their
  // occurrences', labelled with where each came from.
  const notes = [];
  const logEntries = [];
  if (sidePanelScope === 'occurrence') {
    const entry = detail.occurrenceList.find((e) => e.date === sidePanelOccurrenceDate) || (selectedRow ? { date: selectedRow.occurrenceDate, recorded: true } : null);
    renderSidePanelOccurrenceActions(detail, entry);
    if (selectedRow) {
      for (const comment of selectedRow.comments) notes.push({ taskId: detail.task.taskId, occurrenceDate: selectedRow.occurrenceDate, comment, label: null });
      for (const entry of selectedRow.log) logEntries.push({ entry, label: null });
    }
  } else {
    renderSidePanelOccurrenceActions(null, null);
    const scoped = sidePanelScope === 'series' && data.series
      ? data.series
      : {
          notes: [{ taskId: detail.task.taskId, name: detail.task.name, dueDate: detail.task.dueDate, comments: detail.task.comments, log: detail.task.log }],
          occurrences: detail.occurrences.map((o) => ({ ...o, taskId: detail.task.taskId })),
        };
    const nameOf = new Map(scoped.notes.map((rec) => [rec.taskId, rec.name]));
    for (const rec of scoped.notes) {
      for (const comment of rec.comments || []) notes.push({ taskId: rec.taskId, occurrenceDate: null, comment, label: rec.name });
      for (const entry of rec.log || []) logEntries.push({ entry, label: `${rec.name}, ${entry.occurrenceDate || rec.dueDate}` });
    }
    for (const occurrence of scoped.occurrences) {
      const label = `${nameOf.get(occurrence.taskId) || ''}, ${occurrence.occurrenceDate}`;
      for (const comment of occurrence.comments || []) notes.push({ taskId: occurrence.taskId, occurrenceDate: occurrence.occurrenceDate, comment, label });
      for (const entry of occurrence.log || []) logEntries.push({ entry, label });
    }
  }
  notes.sort((a, b) => b.comment.timestamp - a.comment.timestamp);
  logEntries.sort((a, b) => b.entry.timestamp - a.entry.timestamp);

  if (notes.length === 0) sidePanelCommentsEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noNotes')));
  for (const note of notes) sidePanelCommentsEl.appendChild(buildSidePanelCommentRow(note));

  if (logEntries.length === 0) sidePanelLogEl.appendChild(buildSidePanelEmptyRow(t('sidePanel.noActivity')));
  for (const { entry, label } of logEntries) sidePanelLogEl.appendChild(buildSidePanelLogRow(entry, label));
}

sidePanelScopeOpts.forEach((btn) => {
  btn.onclick = () => {
    if (sidePanelScope === btn.dataset.scope) return;
    sidePanelScope = btn.dataset.scope;
    renderSidePanel();
    refreshSidePanel();
  };
});

sidePanelEditToggleBtn.onclick = () => {
  sidePanelEditMode = !sidePanelEditMode;
  renderSidePanel();
};

// A note on the selected occurrence ('occurrence' scope) or on the task.
// Past the free plan's limits the server refuses it (NOTE_LIMIT/
// TASK_LOCKED), which offers a subscription (reportActionError).
sidePanelCommentAddBtn.onclick = async () => {
  if (!sidePanelTaskId || sidePanelTaskId === SUBSCRIPTION_PROMPT_ID) return;
  const text = sidePanelCommentInput.value.trim();
  if (!text) return;
  const path = sidePanelScope === 'occurrence' && sidePanelOccurrenceDate != null ? `/occurrences/${sidePanelOccurrenceDate}/notes` : '/notes';
  const done = await taskAction(sidePanelTaskId, path, { body: { text } });
  if (done) sidePanelCommentInput.value = '';
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

// Which series (if any) is open in the right-hand editor pane.
let manageSelectedSeriesId = null;
// As last fetched: which series have occurrences in which months (GET
// /manage), and the selected series with its tasks (GET /series/:id).
let manageMonthsData = null;
let manageSeriesData = null;

function selectSeriesInManage(seriesId) {
  manageSelectedSeriesId = seriesId;
  manageSeriesData = null;
  renderTodoManageMonths();
  renderSeriesEditorPane();
  refreshTodoManageModal();
}

// Narrow screens show one pane at a time (see .series-open, style.css): the
// series list, or the picked series in its place -- back to the list here.
document.getElementById('series-edit-back').onclick = () => {
  manageSelectedSeriesId = null;
  manageSeriesData = null;
  renderTodoManageMonths();
  renderSeriesEditorPane();
};

function renderTodoManageMonths() {
  todoManageMonthsEl.innerHTML = '';
  if (!manageMonthsData) return; // still loading

  if (manageMonthsData.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'todo-manage-empty';
    empty.textContent = t('manage.noTasksYet');
    todoManageMonthsEl.appendChild(empty);
    return;
  }

  for (const { month, series } of manageMonthsData) {
    const group = document.createElement('div');
    group.className = 'series-month-group';

    const header = document.createElement('div');
    header.className = 'series-month-header';
    header.textContent = formatMonthLabel(month);
    group.appendChild(header);

    for (const { seriesId, name, taskCount } of series) {
      // A single task's own row vs. a series of several.
      const colorClass = taskCount <= 1 ? 'series-row-single' : 'series-row-mixed';

      const row = document.createElement('div');
      row.className = 'series-row ' + colorClass;
      if (seriesId === manageSelectedSeriesId) row.classList.add('selected');
      row.textContent = name;
      row.onclick = () => selectSeriesInManage(seriesId);

      // A single task can be dragged into the selected series (the right
      // pane, see its drop handler).
      if (taskCount === 1) {
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

// "Find occurrence…": an upcoming date of a plain recurring task's pattern,
// to edit ahead of time -- the calendar only offers the dates the pattern
// lands on (GET /tasks/:id/dates, about a year ahead). Resolves the picked
// date, or null; nothing is saved by picking one.
async function promptFindOccurrence(task) {
  const minISO = isoDayAfter(Dates.todayISO());
  let found;
  try {
    found = await fetchTaskDates(task.taskId, minISO, Dates.shiftISO(minISO, 366));
  } catch (err) {
    reportActionError(err);
    return null;
  }
  if (!found.dates.length) {
    showInfoModal(t('taskEditor.noUpcomingOccurrences'));
    return null;
  }
  const dates = new Set(found.dates);
  const lastFetched = found.dates[found.dates.length - 1];
  return showDatePickerModal({
    title: t('taskEditor.findOccurrenceTitle'),
    hint: t('taskEditor.findOccurrenceHint'),
    minISO,
    maxISO: found.last && found.last < lastFetched ? found.last : lastFetched,
    startMonthISO: found.dates[0],
    isSelectable: (d) => dates.has(d),
  });
}

// An extra (manual) occurrence on any date the task doesn't already occur
// on. Resolves the added date, or null if nothing was added.
async function promptManualOccurrence(task) {
  const dateISO = await showDatePickerModal({
    title: t('manualOccurrence.title'),
    hint: task.name,
    minISO: '2000-01-01',
    initialISO: Dates.todayISO(),
  });
  if (!dateISO) return null;
  const done = await taskAction(task.taskId, '/occurrences', { body: { date: dateISO } });
  return done ? dateISO : null;
}

// One task of the selected series: its name (with a padlock past the free
// plan's limits), schedule, and buttons -- take the series' name, edit,
// leave the series, delete.
function buildSeriesMemberRow(task) {
  const row = document.createElement('div');
  row.className = 'todo-manage-item';

  const info = document.createElement('div');
  info.className = 'todo-manage-item-info';
  const name = document.createElement('div');
  name.className = 'todo-manage-item-name';
  name.textContent = task.name;
  if (task.locked) {
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

  const resetNameBtn = document.createElement('button');
  resetNameBtn.title = t('manage.resetName');
  resetNameBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';
  resetNameBtn.onclick = () => taskAction(task.taskId, '/reset-name');
  row.appendChild(resetNameBtn);

  const editBtn = document.createElement('button');
  editBtn.title = t('common.edit');
  editBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>';
  editBtn.onclick = () => openTaskEditor(task.taskId);
  row.appendChild(editBtn);

  const removeBtn = document.createElement('button');
  removeBtn.title = t('manage.removeFromSeries');
  removeBtn.innerHTML =
    '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M5 11v2h9v-2H5zm11-4-1.41 1.41L17.17 11H10v2h7.17l-2.58 2.59L16 17l5-5-5-5z"/></svg>';
  removeBtn.onclick = () => taskAction(task.taskId, '/leave-series');
  row.appendChild(removeBtn);

  appendDeleteButton(row, () => deleteTask(task.taskId));

  return row;
}

const todoManageModalEl = todoManageOverlay.querySelector('.todo-manage-modal');

function renderSeriesEditorPane() {
  // Which pane a narrow screen shows -- and, switching, from its top.
  const open = !!manageSelectedSeriesId;
  if (todoManageModalEl.classList.contains('series-open') !== open) todoManageModalEl.scrollTop = 0;
  todoManageModalEl.classList.toggle('series-open', open);
  clearTimeout(seriesEditSaveConfirmTimer);
  seriesEditSaveConfirmEl.classList.remove('visible');
  if (!manageSelectedSeriesId || !manageSeriesData) {
    seriesEditEmptyEl.classList.toggle('hidden', !!manageSelectedSeriesId);
    seriesEditPanelEl.classList.add('hidden');
    return;
  }

  seriesEditEmptyEl.classList.add('hidden');
  seriesEditPanelEl.classList.remove('hidden');
  seriesEditNameInput.value = manageSeriesData.name;
  seriesEditListEl.innerHTML = '';
  for (const task of manageSeriesData.tasks) seriesEditListEl.appendChild(buildSeriesMemberRow(task));
}

// Re-fetches Manage Tasks' months and selected series (when it's open) and
// redraws them. A series that's gone (its last task deleted or moved away)
// is deselected.
async function refreshTodoManageModal() {
  if (todoManageOverlay.classList.contains('hidden')) return;
  const seriesId = manageSelectedSeriesId;
  try {
    const [months, series] = await Promise.all([
      apiFetch('/manage'),
      seriesId ? apiFetch(`/series/${encodeURIComponent(seriesId)}`).catch((err) => (err.code === 'SERIES_NOT_FOUND' ? null : Promise.reject(err))) : null,
    ]);
    if (seriesId !== manageSelectedSeriesId) return;
    manageMonthsData = months.months;
    manageSeriesData = series;
    if (seriesId && !series) manageSelectedSeriesId = null;
  } catch (err) {
    console.error('Failed to load Manage Tasks:', err);
  }
  renderTodoManageMonths();
  renderSeriesEditorPane();
}

// Saves the series' own name -- never any task's own (see the "reset name"
// button for pulling a task back in line with it). A saved name only shows
// elsewhere for a mixed series, so the "Saved" cue is often the only sign
// the click did something.
let seriesEditSaveConfirmTimer = null;
document.getElementById('series-edit-save-btn').onclick = async () => {
  if (!manageSelectedSeriesId) return;
  const newName = seriesEditNameInput.value.trim();
  if (!newName) return;
  const done = await runAction(() => apiFetch(`/series/${encodeURIComponent(manageSelectedSeriesId)}`, { method: 'PATCH', body: { name: newName } })).catch(
    reportActionError
  );
  if (!done) return;
  clearTimeout(seriesEditSaveConfirmTimer);
  seriesEditSaveConfirmEl.classList.add('visible');
  seriesEditSaveConfirmTimer = setTimeout(() => seriesEditSaveConfirmEl.classList.remove('visible'), 1500);
};

document.getElementById('series-stats-btn').onclick = () => {
  if (manageSelectedSeriesId) showStatsModal({ kind: 'series', seriesId: manageSelectedSeriesId });
};
document.getElementById('todo-all-stats-btn').onclick = () => showStatsModal({ kind: 'all' });

document.getElementById('series-edit-add-new-btn').onclick = async () => {
  if (!manageSelectedSeriesId) return;
  const nameDefault = seriesEditNameInput.value.trim();
  await openTaskForm(null, null, { forcedSeriesId: manageSelectedSeriesId, nameDefault });
};

// Dropping a single task's row (see renderTodoManageMonths) on the right
// pane moves it into the selected series.
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
  runAction(() =>
    apiFetch(`/series/${encodeURIComponent(manageSelectedSeriesId)}/members`, { method: 'POST', body: { seriesId: sourceSeriesId } })
  ).catch(reportActionError);
});

document.getElementById('todo-manage-close').onclick = () => {
  todoManageOverlay.classList.add('hidden');
  manageSelectedSeriesId = null;
  manageSeriesData = null;
};
document.getElementById('todo-add-btn').onclick = () => openTaskForm(null);

// ---------------------------------------------------------------------------
// Task stats ("Task stats..." on the to-do context menu).
// ---------------------------------------------------------------------------

// Two clicks to reset (arm -> confirm), same idea as appendDeleteButton.
function buildResetStatsButton(onReset) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'menu-btn-small task-stats-reset';
  btn.textContent = t('taskStats.reset');
  let armed = false;
  btn.onclick = () => {
    if (!armed) {
      armed = true;
      btn.textContent = t('taskStats.resetConfirm');
      btn.classList.add('confirm');
      return;
    }
    onReset();
  };
  btn.addEventListener('mouseleave', () => {
    if (!armed) return;
    armed = false;
    btn.textContent = t('taskStats.reset');
    btn.classList.remove('confirm');
  });
  return btn;
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

function showTaskStatsModal(taskId) {
  showStatsModal({ kind: 'task', taskId });
}

// scope: { kind: 'task', taskId } | { kind: 'series', seriesId } | { kind: 'all' }
const statsScopeParam = (scope) => (scope.kind === 'task' ? `task:${scope.taskId}` : scope.kind === 'series' ? `series:${scope.seriesId}` : 'all');

// One modal for a task's, a series' or all tasks' stats (GET /stats),
// computed server-side. The series/all views add an overview and list time
// per day; a day's measured time can be deleted (a bad measurement), and
// "Reset stats…" starts the scope's stats over.
async function showStatsModal(scope) {
  const param = statsScopeParam(scope);
  let stats;
  try {
    stats = await apiFetch(`/stats?scope=${encodeURIComponent(param)}`);
  } catch (err) {
    reportActionError(err);
    return;
  }
  const aggregate = stats.aggregate;
  taskStatsTitleEl.textContent =
    scope.kind === 'task'
      ? t('taskStats.title', { name: stats.title })
      : scope.kind === 'series'
        ? t('taskStats.seriesTitle', { name: stats.title })
        : t('taskStats.allTitle');
  taskStatsBodyEl.innerHTML = '';

  // "Since the reset on ...", when every task in scope was reset together.
  if (stats.since) {
    const since = document.createElement('div');
    since.className = 'task-stats-since';
    since.textContent = t('taskStats.since', { date: formatDateTime(stats.since) });
    taskStatsBodyEl.appendChild(since);
  }

  if (aggregate) {
    const overview = buildStatsSection(t('taskStats.overview'));
    overview.appendChild(buildStatRow(t('taskStats.taskCount'), String(stats.taskCount)));
    overview.appendChild(buildStatRow(t('taskStats.occurrencesToDate'), String(stats.occurrencesToDate)));
    taskStatsBodyEl.appendChild(overview);
  }

  const totalsSection = buildStatsSection(!aggregate && stats.recurring ? t('taskStats.totalFocusedAllRecurrences') : t('taskStats.totalFocused'));
  totalsSection.appendChild(buildStatRow(t('taskStats.total'), formatStatsDuration(stats.totalFocusedSeconds + stats.totalTimerSeconds)));
  totalsSection.appendChild(buildStatRow(t('taskStats.justFocused'), formatStatsDuration(stats.totalFocusedSeconds)));
  totalsSection.appendChild(buildStatRow(t('taskStats.focusedWithTimer'), formatStatsDuration(stats.totalTimerSeconds)));
  taskStatsBodyEl.appendChild(totalsSection);

  if (stats.recurring) {
    const completionSection = buildStatsSection(t('taskStats.completion'));
    completionSection.appendChild(buildStatRow(t('taskStats.completed'), String(stats.completed)));
    if (!aggregate) completionSection.appendChild(buildStatRow(t('taskStats.recurrencesToDate'), String(stats.occurrencesToDate)));
    completionSection.appendChild(buildStatRow(t('taskStats.completionRate'), `${stats.completionRate}%`));
    taskStatsBodyEl.appendChild(completionSection);

    const perDateSection = buildStatsSection(aggregate ? t('taskStats.timePerDay') : t('taskStats.timePerRecurrence'));
    if (stats.perDate.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'task-stats-empty';
      empty.textContent = t('taskStats.noFocusedTime');
      perDateSection.appendChild(empty);
    } else {
      const list = document.createElement('div');
      list.className = 'task-stats-occurrence-list';
      for (const entry of stats.perDate) {
        const item = document.createElement('div');
        item.className = 'task-stats-occurrence-item';
        const dateEl = document.createElement('span');
        dateEl.className = 'task-stats-occurrence-date';
        dateEl.textContent = entry.date;
        const timeEl = document.createElement('span');
        timeEl.className = 'task-stats-occurrence-time';
        timeEl.textContent = t('taskStats.focusedAndTimer', {
          focused: formatStatsDuration(entry.focusedSeconds),
          timer: formatStatsDuration(entry.timerSeconds),
        });
        item.appendChild(dateEl);
        item.appendChild(timeEl);
        appendDeleteButton(item, async () => {
          await runAction(() => apiFetch(`/stats/focus-time?scope=${encodeURIComponent(param)}&date=${entry.date}`, { method: 'DELETE' })).catch(reportActionError);
          showStatsModal(scope);
        });
        list.appendChild(item);
      }
      perDateSection.appendChild(list);
    }
    taskStatsBodyEl.appendChild(perDateSection);
  }

  if (stats.taskCount) {
    const actions = document.createElement('div');
    actions.className = 'task-stats-actions';
    actions.appendChild(
      buildResetStatsButton(async () => {
        await runAction(() => apiFetch('/stats/reset', { method: 'POST', body: { scope: param } })).catch(reportActionError);
        showStatsModal(scope);
      })
    );
    taskStatsBodyEl.appendChild(actions);
  }

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

// Shown for every account without a live Pro subscription -- free, on a
// trial (active or lapsed), or whose Pro subscription has ended -- hidden
// while there is one, since there's nothing left to upsell. Links straight to landing.html's pricing section rather than
// opening the in-app trial paywall -- choosing monthly/yearly billing now
// happens there (see checkout.html).
function renderSubscribeHeaderButton() {
  const { plan, active } = describeSubscription(currentUserSubscription);
  appHeaderSubscribeBtn.classList.toggle('hidden', plan === 'pro' && active);
}

// landing.html's plans, in the app's current language -- where anyone who
// can't (or can no longer) start a free trial subscribes instead (see
// currentUserTrialAvailable).
function goToPricing() {
  location.href = `landing.html?lang=${encodeURIComponent(currentUserLanguage)}#pricing`;
}

// The "start a trial" buttons (Settings' and the paywall's) double as
// "Subscribe…" for an account that has already had a trial or a
// subscription -- only the label (and what a click does, see their
// handlers) changes. Swapping data-i18n rather than just the text keeps a
// later language change (applyStaticTranslations) on the right label.
function setI18nKey(el, key) {
  el.dataset.i18n = key;
  el.textContent = t(key);
}

// The same for a string holding markup -- the subscribe modal's price
// hints, with their anchor-price badges (see anchor-prices.js).
function setI18nHtmlKey(el, key) {
  delete el.dataset.i18n;
  el.dataset.i18nHtml = key;
  el.innerHTML = t(key);
  fillAnchorPrices(el, currentUserLanguage);
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
  manageMonthsData = null;
  manageSeriesData = null;
  renderTodoManageMonths();
  renderSeriesEditorPane();
  todoManageOverlay.classList.remove('hidden');
  refreshTodoManageModal();
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
  // every piece of in-memory state (loaded days, sidePanelTaskId, ...)
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
const settingsLanguageSelect = document.getElementById('settings-language-select');
const settingsAvatarPreviewImg = document.getElementById('settings-avatar-preview-img');
const settingsAvatarPreviewInitials = document.getElementById('settings-avatar-preview-initials');
const settingsAvatarFileInput = document.getElementById('settings-avatar-file-input');
const settingsSubscriptionStatusEl = document.getElementById('settings-subscription-status');
const settingsSubscribeBtn = document.getElementById('settings-subscribe-btn');
const settingsCancelSubscriptionBtn = document.getElementById('settings-cancel-subscription-btn');
const settingsResumeSubscriptionBtn = document.getElementById('settings-resume-subscription-btn');
const settingsManageBillingBtn = document.getElementById('settings-manage-billing-btn');
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
  setI18nKey(settingsSubscribeBtn, currentUserTrialAvailable ? 'subscribe.cta' : 'subscribe.ctaPaid');
  settingsCancelSubscriptionBtn.classList.toggle('hidden', !(plan === 'pro' && active && !subscription.cancelAtPeriodEnd));
  settingsResumeSubscriptionBtn.classList.toggle('hidden', !(plan === 'pro' && active && subscription.cancelAtPeriodEnd));
  // Stripe's portal (card, cancelling or un-cancelling) -- for any live Pro
  // plan, i.e. one paid through Stripe.
  settingsManageBillingBtn.classList.toggle('hidden', !(plan === 'pro' && active));
  // See scheduleAccountDeletion in auth.js -- only meaningful while the
  // subscription it's tied to is still active (once it lapses, getMe()
  // deletes the account for real on the next login, so there's nothing left
  // here to show by then).
  settingsScheduledDeletionNoticeEl.classList.toggle('hidden', !(active && subscription.scheduledDeletion));
}

// Settings' toggle buttons -- unlike the fields that wait for Save, each
// applies and saves the moment it's clicked, so the effect is visible right
// away (Cancel doesn't undo them). `current` reads the live value, `apply`
// sets it and re-renders whatever shows it.
const SETTINGS_TOGGLES = [
  {
    el: document.getElementById('settings-time-format-toggle'),
    current: () => currentUserTimeFormat,
    apply: (value) => {
      currentUserTimeFormat = value;
      renderTodo();
      renderSidePanel();
      renderSettingsSubscriptionSection(); // its expiry date/time, right here in the open modal
    },
  },
  {
    el: document.getElementById('settings-week-start-toggle'),
    current: () => String(effectiveWeekStart()),
    apply: (value) => {
      currentUserWeekStart = Number(value);
    },
  },
  {
    el: document.getElementById('settings-theme-toggle'),
    current: () => currentUserTheme,
    apply: (value) => applyTheme(value),
  },
];

function renderSettingsToggles() {
  for (const toggle of SETTINGS_TOGGLES) {
    const value = toggle.current();
    for (const btn of toggle.el.querySelectorAll('button')) btn.classList.toggle('active', btn.dataset.value === value);
  }
}

for (const toggle of SETTINGS_TOGGLES) {
  for (const btn of toggle.el.querySelectorAll('button')) {
    btn.onclick = () => {
      if (btn.dataset.value === toggle.current()) return;
      toggle.apply(btn.dataset.value);
      saveUserProfile(currentUserProfileSnapshot());
      renderSettingsToggles();
    };
  }
}

function openSettingsModal() {
  settingsNicknameInput.value = currentUserNickname || '';
  settingsLanguageSelect.value = currentUserLanguage;
  renderSettingsToggles();
  renderSettingsEmailSection();
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
  const language = settingsLanguageSelect.value;
  currentUserNickname = nickname;
  currentUserAvatar = avatar;
  saveUserProfile({ ...currentUserProfileSnapshot(), language });
  renderUserAvatar();
  // applyLanguage saves currentUserLanguage and re-renders everything
  // renderAppTitle/renderTodo/renderSidePanel below would have anyway (every
  // currently-rendered due time/comment-and-log timestamp was drawn with the
  // old language baked into its text), so it's called instead of them, not
  // alongside them. Time format, theme and first day of the week aren't
  // here: their toggles already applied and saved themselves (see
  // SETTINGS_TOGGLES).
  applyLanguage(language);
  closeSettingsModal();
};

settingsSubscribeBtn.onclick = () => (currentUserTrialAvailable ? subscribeCurrentUserToTrial() : goToPricing());
settingsCancelSubscriptionBtn.onclick = () => cancelCurrentUserSubscription();
settingsResumeSubscriptionBtn.onclick = () => resumeCurrentUserSubscription().catch((err) => {
  console.error('Resuming the subscription failed:', err);
  showInfoModal(t('settings.resumeSubscriptionFailed'), 'error');
});
settingsManageBillingBtn.onclick = () => openBillingPortal();

// Leaves for Stripe's hosted Customer Portal (see createBillingPortalSession
// in auth.js), which comes back to this page -- a fresh load, so whatever
// changed there (e.g. cancelling, mirrored onto the account by the backend's
// Stripe webhook) is picked up by boot()'s own getMe().
async function openBillingPortal() {
  settingsManageBillingBtn.disabled = true;
  try {
    const { url } = await createBillingPortalSession(new URL('index.html', location.href).href);
    location.href = url;
  } catch (err) {
    settingsManageBillingBtn.disabled = false;
    console.error('Opening the billing portal failed:', err);
    showInfoModal(t(err.code === 'PAYMENTS_UNAVAILABLE' ? 'settings.manageBillingUnavailable' : 'settings.manageBillingFailed'));
  }
}
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
const subscribePriceHintEl = document.getElementById('subscribe-price-hint');
const subscribeStartTrialBtn = document.getElementById('subscribe-start-trial');
let subscribeModalResolve = null;

function showSubscribeModal(reasonText) {
  return new Promise((resolve) => {
    subscribeModalResolve = resolve;
    subscribeReasonEl.textContent = reasonText;
    const trial = currentUserTrialAvailable;
    setI18nKey(subscribeStartTrialBtn, trial ? 'subscribe.cta' : 'subscribe.ctaPaid');
    setI18nHtmlKey(subscribePriceHintEl, trial ? 'subscribe.priceHint' : 'subscribe.priceHintPaid');
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
subscribeStartTrialBtn.onclick = async () => {
  if (!currentUserTrialAvailable) {
    closeSubscribeModal(false);
    goToPricing();
    return;
  }
  await subscribeCurrentUserToTrial();
  closeSubscribeModal(true);
};

// Shows the paywall with `reasonText` explaining why, and starts a trial if
// the user accepts -- the single entry point for every limit the server
// enforces (see reportActionError) and every padlock, so there's one place
// deciding what "offering a subscription" actually does.
async function offerSubscriptionUpgrade(reasonText) {
  return showSubscribeModal(reasonText);
}

// ---------------------------------------------------------------------------
// Settings modal -- data export/import: everything this app stores per
// user (tasks, occurrences, profile, view mode) as one JSON file, and that
// same file loaded back in wholesale -- a manual backup/account-migration
// path on top of the account's normal server-side storage. An import is
// subject to the same free-plan limits as creating the tasks one at a time.
// ---------------------------------------------------------------------------

const settingsDownloadDataBtn = document.getElementById('settings-download-data-btn');
const settingsImportDataBtn = document.getElementById('settings-import-data-btn');
const settingsImportDataFileInput = document.getElementById('settings-import-data-file-input');
const importProgressOverlay = document.getElementById('import-progress-overlay');
const importProgressMessageEl = document.getElementById('import-progress-message');
const importProgressBarEl = document.getElementById('import-progress-bar');
const importProgressCancelBtn = document.getElementById('import-progress-cancel');

// The server builds the file (GET /export: every task, occurrence and the
// profile, activity logs left out). Shared by the plain Settings button and
// the delete-account modal's own "Download my data" offer.
async function downloadUserDataExport() {
  let data;
  try {
    data = await apiFetch('/export');
  } catch (err) {
    showInfoModal(describeActionError(err));
    return;
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `advanced-todo-backup-${Dates.todayISO()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

settingsDownloadDataBtn.onclick = downloadUserDataExport;

settingsImportDataBtn.onclick = () => settingsImportDataFileInput.click();

// An import is uploaded in pieces (POST /imports, then .../chunks, then
// .../commit), so a large file needs neither one huge request nor holds up
// the server: whole tasks with their occurrences per piece, up to
// IMPORT_CHUNK_BYTES each, sent one at a time at least IMPORT_CHUNK_GAP_MS
// apart (the server refuses faster, 429 TOO_FAST -- then this waits and
// sends it again). Nothing about the account changes until the commit, which
// replaces every task in one go -- a cancelled or failed upload leaves it as
// it was.
const IMPORT_CHUNK_BYTES = 256 * 1024;
const IMPORT_CHUNK_GAP_MS = 250;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Whether the browser says data is costly here (Chromium's Network
// Information API: data saver on, or a cellular connection). Unknown
// elsewhere -- then the file's size, always shown, is the warning.
function isMeteredConnection() {
  const connection = navigator.connection;
  return !!connection && (connection.saveData || connection.type === 'cellular');
}

// Whole tasks (with their occurrences) per piece, each piece's JSON at most
// IMPORT_CHUNK_BYTES -- a single task larger than that goes alone.
function splitImportIntoChunks(tasks, occurrences) {
  const occurrencesByTaskId = new Map();
  for (const o of occurrences) {
    if (!o || typeof o !== 'object') continue;
    if (!occurrencesByTaskId.has(o.taskId)) occurrencesByTaskId.set(o.taskId, []);
    occurrencesByTaskId.get(o.taskId).push(o);
  }
  const chunks = [];
  let current = { tasks: [], occurrences: [] };
  let size = 0;
  const taken = new Set();
  for (const task of tasks) {
    const taskId = task && (task.taskId || task.id);
    // Old exports can hold several records per taskId -- their occurrences
    // go along with the first.
    const own = taken.has(taskId) ? [] : occurrencesByTaskId.get(taskId) || [];
    taken.add(taskId);
    const bytes = JSON.stringify(task).length + JSON.stringify(own).length;
    if (size && size + bytes > IMPORT_CHUNK_BYTES) {
      chunks.push(current);
      current = { tasks: [], occurrences: [] };
      size = 0;
    }
    current.tasks.push(task);
    current.occurrences.push(...own);
    size += bytes;
  }
  // Occurrences of no task in the file go with the last piece (the server
  // drops them).
  for (const [taskId, own] of occurrencesByTaskId) if (!taken.has(taskId)) current.occurrences.push(...own);
  if (current.tasks.length || current.occurrences.length) chunks.push(current);
  return chunks;
}

function renderImportProgress(done, total) {
  importProgressMessageEl.textContent = done < total ? t('data.importProgress', { done, total }) : t('data.importCommitting');
  importProgressBarEl.style.width = `${total ? Math.round((done / total) * 100) : 100}%`;
}

// Uploads and commits; resolves { taskCount, limited }, or null if
// cancelled. Rejects with the server's error.
async function importUserData(tasks, occurrences, isCancelled) {
  const chunks = splitImportIntoChunks(tasks, occurrences);
  const { importId, maxChunks } = await apiFetch('/imports', { method: 'POST' });
  const abandon = () => apiFetch(`/imports/${importId}`, { method: 'DELETE' }).catch(() => {});
  if (chunks.length > maxChunks) {
    abandon();
    throw Object.assign(new Error(t('data.importTooLarge')), { code: 'IMPORT_TOO_LARGE' });
  }
  try {
    renderImportProgress(0, chunks.length);
    let lastSentAt = 0;
    for (let seq = 0; seq < chunks.length; seq++) {
      for (;;) {
        if (isCancelled()) {
          abandon();
          return null;
        }
        await wait(Math.max(0, lastSentAt + IMPORT_CHUNK_GAP_MS - Date.now()));
        lastSentAt = Date.now();
        try {
          await apiFetch(`/imports/${importId}/chunks`, { method: 'POST', body: { seq, ...chunks[seq] } });
          break;
        } catch (err) {
          if (err.code !== 'TOO_FAST') throw err;
          await wait(1000);
        }
      }
      renderImportProgress(seq + 1, chunks.length);
    }
    if (isCancelled()) {
      abandon();
      return null;
    }
    return await apiFetch(`/imports/${importId}/commit`, { method: 'POST' });
  } catch (err) {
    abandon();
    throw err;
  }
}

// Replaces every task (and the profile and view) with what's in the file --
// there's no merge story, since two independent task lists have no
// principled way to be reconciled automatically. The server brings older
// formats up to date and trims a free account's import to its limits.
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
  const size = formatBytes(file.size);
  const sizeNote = isMeteredConnection() ? t('data.importMetered', { size }) : t('data.importSize', { size });
  if (!confirm(`${t('data.importConfirm')}\n\n${sizeNote}`)) return;

  let cancelled = false;
  importProgressCancelBtn.onclick = () => {
    cancelled = true;
  };
  renderImportProgress(0, 1);
  importProgressOverlay.classList.remove('hidden');
  let result;
  try {
    result = await importUserData(data.tasks, Array.isArray(data.occurrences) ? data.occurrences : [], () => cancelled);
  } catch (err) {
    console.error('Failed to import:', err);
    importProgressOverlay.classList.add('hidden');
    showInfoModal(err.code === 'IMPORT_TOO_LARGE' ? err.message : t('data.importSaveFailed', { message: describeActionError(err) }));
    return;
  }
  importProgressOverlay.classList.add('hidden');
  if (!result) return;
  if (result.limited) showInfoModal(t('data.importLimitedByFreePlan'));

  const profile = { ...DEFAULT_USER_PROFILE, ...(data.userProfile || {}) };
  saveUserProfile(profile);
  currentUserNickname = profile.nickname;
  currentUserAvatar = profile.avatar;
  currentUserTimeFormat = profile.timeFormat;
  currentUserBackground = profile.background;
  currentUserLanguage = profile.language || 'en';
  currentUserTheme = profile.theme || 'dark';
  currentUserWeekStart = profile.weekStart ?? null;

  todoViewMode = TODO_VIEW_MODES.includes(data.todoViewMode) ? data.todoViewMode : 'pending';
  saveTodoViewMode();

  applyStaticTranslations();
  openSettingsModal(); // re-seed the form fields (nickname/time format/avatar/background/language/theme preview) from the just-imported profile
  renderAppTitle();
  renderUserAvatar();
  applyBackground(currentUserBackground);
  applyTheme(currentUserTheme);
  deselectSidePanelTask();
  resetTodoList();
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

const settingsEmailEl = document.getElementById('settings-email');
const settingsPendingEmailEl = document.getElementById('settings-pending-email');

function renderSettingsEmailSection() {
  settingsEmailEl.textContent = currentUserEmail || '';
  settingsPendingEmailEl.classList.toggle('hidden', !currentUserPendingEmail);
  if (currentUserPendingEmail) settingsPendingEmailEl.textContent = t('settings.pendingEmail', { email: currentUserPendingEmail });
}

// POST /users/me/change-email (see api-spec.yaml) -- the login email itself
// doesn't change here: the new address gets a confirmation link, the current
// one a notice with an undo link. A failed attempt reopens the form with the
// reason in its title, keeping what was typed.
async function promptChangeEmail() {
  let title = t('changeEmail.title');
  let newEmail = '';
  for (;;) {
    const result = await showFormModal(
      title,
      [
        { name: 'newEmail', label: t('changeEmail.new'), type: 'email', value: newEmail },
        { name: 'currentPassword', label: t('changePassword.current'), type: 'password', value: '' },
      ],
      { okLabel: t('changeEmail.submit') }
    );
    if (!result) return;
    newEmail = result.newEmail;
    try {
      const user = await apiFetch('/users/me/change-email', {
        method: 'POST',
        body: { newEmail: result.newEmail, currentPassword: result.currentPassword },
      });
      currentUserPendingEmail = user.pendingEmail || null;
      renderSettingsEmailSection();
      showInfoModal(t('changeEmail.sent', { email: result.newEmail, current: currentUserEmail }), 'success');
      return;
    } catch (err) {
      const reason =
        {
          INVALID_EMAIL: 'changeEmail.invalid',
          SAME_EMAIL: 'changeEmail.same',
          EMAIL_TAKEN: 'changeEmail.taken',
          INVALID_CREDENTIALS: 'changePassword.wrongCurrent',
        }[err.code] || 'changeEmail.genericError';
      title = `${t('changeEmail.title')} -- ${t(reason)}`;
    }
  }
}

document.getElementById('settings-change-email-btn').onclick = () => promptChangeEmail();

// A notice to show once the next boot() has put up the login screen or the
// app -- for a flow that has to reload the page first (see
// handleUndoEmailChangeLink). sessionStorage: this tab only, and gone once
// shown.
const POST_BOOT_NOTICE_KEY = 'atodo.postBootNotice';

function reloadWithNotice(text, kind) {
  try {
    sessionStorage.setItem(POST_BOOT_NOTICE_KEY, JSON.stringify({ text, kind }));
  } catch {
    // Storage unavailable -- the reload still happens, just without the notice.
  }
  location.replace(location.pathname + location.search + location.hash);
}

function showPostBootNotice() {
  let notice = null;
  try {
    notice = JSON.parse(sessionStorage.getItem(POST_BOOT_NOTICE_KEY) || 'null');
    sessionStorage.removeItem(POST_BOOT_NOTICE_KEY);
  } catch {
    return;
  }
  if (notice) setTimeout(() => showInfoModal(notice.text, notice.kind), 0);
}

function takeUrlParam(name) {
  const params = new URLSearchParams(location.search);
  const value = params.get(name);
  if (value == null) return null;
  params.delete(name);
  const search = params.toString();
  history.replaceState(null, '', location.pathname + (search ? `?${search}` : '') + location.hash);
  return value;
}

// `?verifyEmailChange=<token>` -- the link emailed to the NEW address (POST
// /auth/verify-email-change). Works logged in or not; like
// handleEmailVerificationLink, boot() doesn't wait for it.
async function handleEmailChangeVerificationLink() {
  const token = takeUrlParam('verifyEmailChange');
  if (!token) return;
  try {
    const { email } = await apiFetch('/auth/verify-email-change', { method: 'POST', body: { token } });
    document.getElementById('login-email').value = email;
    if (currentUserId) {
      currentUserEmail = email;
      currentUserPendingEmail = null;
    }
    showInfoModal(t('verifyEmailChange.success', { email }), 'success');
  } catch (err) {
    showInfoModal(
      t({ EXPIRED: 'verifyEmailChange.expired', EMAIL_TAKEN: 'verifyEmailChange.taken' }[err.code] || 'verifyEmailChange.invalid')
    );
  }
}

// `?undoEmailChange=<token>` -- the link emailed to the OLD address (POST
// /auth/undo-email-change). Handled before boot() signs anything in: the
// undo ends every session, so this one's stored token is dropped too. Then
// straight to setting a new password (the change-password modal in reset
// mode, see openPasswordResetModal) -- whoever changed the email may know
// the current one. Every outcome reloads into a normal boot(), with a notice.
async function handleUndoEmailChangeLink() {
  const token = takeUrlParam('undoEmailChange');
  let result;
  try {
    result = await apiFetch('/auth/undo-email-change', { method: 'POST', body: { token } });
  } catch (err) {
    reloadWithNotice(t(err.code === 'EMAIL_TAKEN' ? 'undoEmailChange.taken' : 'undoEmailChange.invalid'), 'error');
    return;
  }
  localStorage.removeItem(AUTH_TOKEN_KEY);
  openPasswordResetModal({ resetToken: result.resetToken, email: result.email });
}

const settingsChangePasswordBtn = document.getElementById('settings-change-password-btn');
const changePasswordOverlay = document.getElementById('change-password-overlay');
const changePasswordFormEl = document.getElementById('change-password-form');
const changePasswordMessageEl = document.getElementById('change-password-message');
const changePasswordCurrentInput = document.getElementById('change-password-current');
const changePasswordNewInput = document.getElementById('change-password-new');
const changePasswordConfirmInput = document.getElementById('change-password-confirm');

const changePasswordTitleEl = changePasswordOverlay.querySelector('.modal-title');
const changePasswordCurrentField = changePasswordCurrentInput.closest('.modal-field');
const changePasswordSubmitBtn = changePasswordFormEl.querySelector('button[type="submit"]');
// Non-null while this modal is setting a new password with a reset token --
// after an email-change undo ({ resetToken, email }, see
// handleUndoEmailChangeLink) or from a "Forgot password?" link
// ({ kind: 'forgot', resetToken }, see handlePasswordResetLink): no current
// password (the reset token stands in for it), and POST /auth/reset-password
// instead of change-password.
let passwordResetContext = null;

function openChangePasswordModal() {
  passwordResetContext = null;
  changePasswordFormEl.reset();
  clearAuthMessage(changePasswordMessageEl);
  changePasswordTitleEl.textContent = t('changePassword.title');
  changePasswordSubmitBtn.textContent = t('changePassword.submit');
  changePasswordCurrentField.classList.remove('hidden');
  changePasswordOverlay.classList.remove('hidden');
}

function openPasswordResetModal(context) {
  passwordResetContext = context;
  const forgot = context.kind === 'forgot';
  changePasswordFormEl.reset();
  changePasswordTitleEl.textContent = t(forgot ? 'resetPassword.title' : 'undoEmailChange.title');
  changePasswordSubmitBtn.textContent = t(forgot ? 'resetPassword.submit' : 'undoEmailChange.submit');
  changePasswordCurrentField.classList.add('hidden');
  showAuthMessage(changePasswordMessageEl, 'success', forgot ? t('resetPassword.intro') : t('undoEmailChange.intro', { email: context.email }));
  changePasswordOverlay.classList.remove('hidden');
  changePasswordNewInput.focus();
}

function closeChangePasswordModal() {
  changePasswordOverlay.classList.add('hidden');
  // Skipping the new password after an undo still has to land somewhere --
  // signed out, on the login screen, told what happened. Closing a "Forgot
  // password?" reset just goes back to wherever this tab would otherwise be.
  if (passwordResetContext && passwordResetContext.kind === 'forgot') location.replace(location.pathname + location.search + location.hash);
  else if (passwordResetContext) reloadWithNotice(t('undoEmailChange.skipped', { email: passwordResetContext.email }), 'success');
}

settingsChangePasswordBtn.onclick = openChangePasswordModal;
document.getElementById('change-password-close').onclick = closeChangePasswordModal;
document.getElementById('change-password-cancel').onclick = closeChangePasswordModal;

changePasswordFormEl.onsubmit = async (e) => {
  e.preventDefault();
  clearAuthMessage(changePasswordMessageEl);
  if (passwordResetContext) {
    submitPasswordReset();
    return;
  }
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

async function submitPasswordReset() {
  const newPassword = changePasswordNewInput.value;
  if (newPassword.length < 8) {
    showAuthMessage(changePasswordMessageEl, 'error', t('changePassword.tooShort'));
    return;
  }
  if (newPassword !== changePasswordConfirmInput.value) {
    showAuthMessage(changePasswordMessageEl, 'error', t('changePassword.mismatch'));
    return;
  }
  const { resetToken, email, kind } = passwordResetContext;
  const forgot = kind === 'forgot';
  let restored = false;
  try {
    const result = await apiFetch('/auth/reset-password', { method: 'POST', body: { resetToken, newPassword } });
    localStorage.setItem(AUTH_TOKEN_KEY, result.token);
    restored = !!result.restored;
  } catch (err) {
    if (err.code === 'INVALID_PASSWORD') {
      showAuthMessage(changePasswordMessageEl, 'error', t('changePassword.tooShort'));
      return;
    }
    if (err.code === 'NETWORK_ERROR' || err.code === 'MAINTENANCE') {
      showAuthMessage(changePasswordMessageEl, 'error', describeAuthError(err)); // the link still works -- try again
      return;
    }
    passwordResetContext = null;
    if (err.code === 'ACCOUNT_EXPIRED_INACTIVITY' || err.code === 'ACCOUNT_DELETED_SCHEDULED') reloadWithNotice(describeAuthError(err), 'error');
    else reloadWithNotice(t(forgot ? 'resetPassword.invalid' : 'undoEmailChange.resetExpired'), 'error');
    return;
  }
  passwordResetContext = null;
  if (restored) reloadWithNotice(t('login.accountRestored'), 'success');
  else reloadWithNotice(forgot ? t('resetPassword.done') : t('undoEmailChange.done', { email }), 'success');
}

// `?resetPassword=<token>` -- a "Forgot password?" link (POST
// /auth/forgot-password): straight to setting a new password, before
// anything signs in. The session this tab may already have is left alone
// until the new password is actually set (which ends every other session
// and logs this one in); closing the modal just carries on as before.
function handlePasswordResetLink() {
  const resetToken = takeUrlParam('resetPassword');
  openPasswordResetModal({ kind: 'forgot', resetToken });
}

// "Forgot password?" on the login screen. The answer is the same whether or
// not the email has an account (see POST /auth/forgot-password).
document.getElementById('forgot-password-link').onclick = async (e) => {
  e.preventDefault();
  clearAuthMessage(loginMessageEl);
  const result = await showFormModal(
    t('forgotPassword.title'),
    [{ name: 'email', label: t('forgotPassword.hint'), value: document.getElementById('login-email').value.trim() }],
    { okLabel: t('forgotPassword.submit') }
  );
  if (!result) return;
  const email = result.email.trim();
  try {
    await apiFetch('/auth/forgot-password', { method: 'POST', body: { email } });
  } catch (err) {
    const message =
      err.code === 'INVALID_EMAIL'
        ? t('forgotPassword.invalidEmail')
        : err.code === 'NETWORK_ERROR' || err.code === 'MAINTENANCE'
          ? describeAuthError(err)
          : t('forgotPassword.failed');
    showAuthMessage(loginMessageEl, 'error', message);
    return;
  }
  showAuthMessage(loginMessageEl, 'success', t('forgotPassword.sent', { email }));
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
// per-device key -- that's a device credential, not this account's data,
// same distinction the data export draws. Reloads afterward -- simplest way
// to guarantee every one of this file's many in-memory globals (loaded days,
// currentUser*, todoViewMode, ...) resets cleanly, same as a real fresh
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
  currentUserTrialAvailable = !!user.trialAvailable;
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
  currentUserEmail = user.email;
  currentUserPendingEmail = user.pendingEmail || null;
  currentUserTimeFormat = user.timeFormat;
  currentUserBackground = user.background;
  currentUserLanguage = user.language || 'en';
  currentUserTheme = user.theme || 'dark';
  currentUserWeekStart = user.weekStart ?? null;
  currentUserSubscription = user.subscription;
  currentUserTrialAvailable = !!user.trialAvailable;
  todoViewMode = TODO_VIEW_MODES.includes(user.todoViewMode) ? user.todoViewMode : 'pending';
}

// The page title says what the list shows and for which day: the view
// ("Pending and overdue tasks for", "Upcoming tasks for", "All tasks for")
// and the highlighted day's name, as its own line on a narrow screen (see
// .app-title-date). Next to it, the "+" adds a task due that day and "Today"
// goes back to today when another day (or month) is being read. Kept up to
// date by updateTodoDayHighlight, on every scroll and redraw -- so it only
// writes what changed.
const appTitleViewEl = appTitleEl.querySelector('.app-title-view');
const appTitleDateEl = appTitleEl.querySelector('.app-title-date');
const appTitleAddBtn = document.getElementById('app-title-add');
const appTitleTodayBtn = document.getElementById('app-title-today');

// "today, Saturday, October 3" -- describeDayLabel's, with a leading
// Today/Yesterday/Tomorrow lowercased to follow the title's "for".
function describeDayForTitle(dateISO) {
  const label = describeDayLabel(dateISO, Dates.todayISO());
  const relative = ['todo.today', 'todo.yesterday', 'todo.tomorrow'].some((key) => label.startsWith(t(key)));
  return relative ? label.charAt(0).toLocaleLowerCase(currentLocaleTag()) + label.slice(1) : label;
}

function renderAppTitle() {
  const loggedIn = !!currentUserId;
  const day = loggedIn ? highlightedTodoDate : null;
  const view = loggedIn ? t(day ? `title.${todoViewMode}` : `title.${todoViewMode}NoDay`) : t('app.titleGeneric');
  const date = day ? describeDayForTitle(day) : '';
  if (appTitleViewEl.textContent !== view) appTitleViewEl.textContent = view;
  if (appTitleDateEl.textContent !== date) appTitleDateEl.textContent = date;
  appTitleAddBtn.classList.toggle('hidden', !loggedIn);
  appTitleAddBtn.title = t('todo.addTaskDue', { date: day || Dates.todayISO() });
  const showToday = !!day && (isBrowsingOtherTodoMonth() || (day !== Dates.todayISO() && !!todayTargetDayRef()));
  appTitleTodayBtn.classList.toggle('hidden', !showToday);
}

appTitleAddBtn.textContent = '+';
appTitleAddBtn.onclick = () => openTaskForm(null, highlightedTodoDate || Dates.todayISO());
appTitleTodayBtn.onclick = () => {
  if (isBrowsingOtherTodoMonth()) jumpTodoToCurrentMonth();
  else scrollTodoToToday('smooth', { canStartOver: true });
};

// The one-time "we now know who's logged in" entry point, run either right
// after boot() finds an existing token or right after the login form
// resolves a fresh one -- loads the list's first days (the one genuinely
// awaited network read in this flow; every User field the caller needs,
// like todoViewMode, already came along on the getMe()/login response) and
// renders for the first time.
// `needsLanguageDetection` is true only the very first time this profile is
// ever loaded (see DEFAULT_USER_PROFILE.language) -- kicks off the one-time
// IP-based language/time-format guess (detectLanguageAndTimeFormatFromLocation)
// in the background, applying and saving it whenever it resolves.
async function startApp(needsLanguageDetection) {
  startSiteStatusPolling();
  applyStaticTranslations();
  renderAppTitle();
  renderUserAvatar();
  renderSubscribeHeaderButton();
  applyBackground(currentUserBackground);
  applyTheme(currentUserTheme);
  renderSidePanel();
  refreshSidePanel();
  await resetTodoList();
  if (needsLanguageDetection) {
    detectLanguageAndTimeFormatFromLocation().then(({ language, timeFormat }) => {
      currentUserTimeFormat = timeFormat;
      applyLanguage(language);
      saveUserProfile(currentUserProfileSnapshot());
    });
  }
}

// The plan a visitor chose on the landing page's pricing buttons, carried
// along as `?next=checkout&plan=...` through registration (and its emailed
// verification link) and login -- null for an ordinary visit. Whoever logs
// in with it goes straight on to checkout instead of into the app.
function checkoutPlanFromUrl() {
  const params = new URLSearchParams(location.search);
  if (params.get('next') !== 'checkout') return null;
  return params.get('plan') === 'annual' ? 'annual' : 'monthly';
}

// A session just started (login, the register screen's "log in" link, or a
// verification link) -- either on to checkout, for a visitor who came to
// subscribe, or into the app.
async function enterSession(token, user, { restored = false } = {}) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const plan = checkoutPlanFromUrl();
  if (plan) {
    location.href = `checkout.html?plan=${encodeURIComponent(plan)}`;
    return;
  }
  applyUserSession(user);
  loginScreenEl.classList.add('hidden');
  registerScreenEl.classList.add('hidden');
  appMainEl.classList.remove('hidden');
  await startApp(user.language == null);
  // Logging in to a deleted (closed) account reopens it empty -- see
  // api-spec.yaml's POST /auth/login -- which would otherwise just look
  // like every task vanished.
  if (restored) showInfoModal(t('login.accountRestored'), 'success');
}

// Logs in with an email and password and enters the session; throws what
// login()/getMe() throw for the caller to report (or not).
async function logInWith(email, password) {
  const { token, restored } = await login(email, password);
  // Always resolved right after login() -- see getMe's own comment on why
  // the inactivity/existence check lives there instead of in login()
  // itself, and why that's safe to rely on here.
  const user = await getMe(token);
  await enterSession(token, user, { restored });
}

// Handles a `?verify=<token>` URL (the link the backend emails on
// registration, see POST /auth/register in api-spec.yaml) if one's present,
// stripping the token back out of the URL either way (via replaceState, no
// reload/history entry) so refreshing the page afterward doesn't try to
// re-consume the same already-used token. Verifying also logs the new
// account in (and on to checkout, if the link carries a plan -- see
// checkoutPlanFromUrl): resolves true when it did. Otherwise (an expired
// or used link) it shows why on the login screen and resolves false.
// boot() awaits this before anything else signs in, so a session the tab
// already had can't race the new one.
async function handleEmailVerificationLink() {
  const params = new URLSearchParams(location.search);
  const token = params.get('verify');
  if (!token) return false;
  params.delete('verify');
  const newSearch = params.toString();
  history.replaceState(null, '', location.pathname + (newSearch ? `?${newSearch}` : '') + location.hash);

  const result = await verifyEmailToken(token);
  if (result.ok && result.token) {
    try {
      await enterSession(result.token, await getMe(result.token));
      return true;
    } catch (err) {
      console.error('Failed to start the session after verifying:', err);
    }
  }
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
  if (new URLSearchParams(location.search).has('undoEmailChange')) {
    handleUndoEmailChangeLink(); // reloads into a fresh boot() once done
    return;
  }
  if (new URLSearchParams(location.search).has('resetPassword')) {
    handlePasswordResetLink(); // reloads into a fresh boot() once done (or closed)
    return;
  }
  showPostBootNotice();
  handleEmailChangeVerificationLink();
  const continueBoot = (afterVerificationLink = false) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      // A visitor who came to subscribe most likely has no account yet:
      // registration first (it has a link to log in instead) -- unless a
      // verification link's result is showing on the login screen.
      if (checkoutPlanFromUrl() && !afterVerificationLink) registerScreenEl.classList.remove('hidden');
      else loginScreenEl.classList.remove('hidden');
      detectPreLoginLanguage();
      return;
    }
    appMainEl.classList.remove('hidden');
    resumeStoredSession(token);
  };
  const detectPreLoginLanguage = () => {
    if (!preLoginLangExplicit) {
      detectLanguageAndTimeFormatFromLocation().then(({ language }) => {
        // Don't clobber a real login (the account's own language now
        // applies) or a manual toggle click that happened while this was
        // still in flight.
        if (preLoginLangExplicit || localStorage.getItem(AUTH_TOKEN_KEY)) return;
        applyPreLoginLanguage(language);
      });
    }
  };
  if (new URLSearchParams(location.search).has('verify')) {
    handleEmailVerificationLink().then((loggedIn) => {
      if (!loggedIn) continueBoot(true);
    });
    return;
  }
  continueBoot();
}

// boot()'s existing-token path. Only an answer about the account itself
// ends the session -- an update in progress (MAINTENANCE) or no connection
// at all says nothing about it, so the token is kept and this retries
// until the server answers.
const RESUME_RETRY_MS = 15000;
function resumeStoredSession(token) {
  getMe(token)
    .then(async (user) => {
      clearAuthMessage(loginMessageEl);
      loginScreenEl.classList.add('hidden');
      appMainEl.classList.remove('hidden');
      // A direct/bookmarked visit to this URL while already logged in --
      // see the same check in the login form's submit handler below for the
      // logged-out case (landing.js normally sends an already-logged-in
      // visitor straight to checkout.html itself, never through here).
      // Deliberately checked only after getMe() resolves, not before -- an
      // expired/deleted account (see getMe's own comment) should land back
      // on the login screen, not get waved through to checkout.
      const plan = checkoutPlanFromUrl();
      if (plan) {
        location.href = `checkout.html?plan=${encodeURIComponent(plan)}`;
        return;
      }
      applyUserSession(user);
      await startApp(user.language == null);
    })
    .catch((err) => {
      if (err.code === 'MAINTENANCE' || err.code === 'NETWORK_ERROR') {
        appMainEl.classList.add('hidden');
        loginScreenEl.classList.remove('hidden');
        showAuthMessage(loginMessageEl, 'error', describeAuthError(err));
        setTimeout(() => {
          // Unless the visitor logged in by hand meanwhile.
          if (localStorage.getItem(AUTH_TOKEN_KEY) === token && !loginScreenEl.classList.contains('hidden')) resumeStoredSession(token);
        }, RESUME_RETRY_MS);
        return;
      }
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
  // A visitor from landing.html's pricing buttons (see landing.js) goes on
  // to checkout once logged in -- see enterSession.
  try {
    await logInWith(email, password);
  } catch (err) {
    showAuthMessage(loginMessageEl, 'error', describeAuthError(err));
  }
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
// Registering with an email that's already an account: offers to log in
// instead -- a click tries the email and password just entered right away
// (on to checkout for a visitor who came to subscribe, see enterSession);
// if they don't log in, it quietly switches to the login screen with the
// email filled in. The same for every visitor, subscribing or not.
function showEmailTakenMessage(email, password) {
  showAuthMessage(registerMessageEl, 'error', '');
  registerMessageEl.innerHTML = t('register.emailTaken');
  registerMessageEl.querySelector('.js-taken-login').onclick = async (e) => {
    e.preventDefault();
    try {
      await logInWith(email, password);
    } catch {
      clearAuthMessage(registerMessageEl);
      registerScreenEl.classList.add('hidden');
      clearAuthMessage(loginMessageEl);
      loginScreenEl.classList.remove('hidden');
      document.getElementById('login-email').value = email;
      document.getElementById('login-password').value = '';
      document.getElementById('login-password').focus();
    }
  };
}

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
    await registerUser(email, password, checkoutPlanFromUrl());
  } catch (err) {
    if (err.code === 'EMAIL_TAKEN') {
      showEmailTakenMessage(email, password);
      return;
    }
    showAuthMessage(registerMessageEl, 'error', err.code === 'INVALID_EMAIL' ? t('register.invalidEmail') : t('register.genericError'));
    return;
  }
  registerSuccessMessageEl.textContent = t(checkoutPlanFromUrl() ? 'register.checkEmailCheckout' : 'register.checkEmail', { email });
  registerFormEl.classList.add('hidden');
  registerSuccessEl.classList.remove('hidden');
};

boot();
