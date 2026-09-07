// Unified focus/click/double-click/triple-click text-selection behavior for
// every text <input> and <textarea> on the page (task-form fields, etc.) --
// document-delegated so it applies uniformly regardless of whether an
// element exists yet when this script runs (many are created dynamically:
// modal form fields). Included via a plain <script> tag, same
// UMD-lite/no-module-system pattern as recurrence.js.
//
// Rules:
//  - Gaining focus (Tab, or a click that starts while unfocused) selects
//    everything, cursor at the end -- except a <textarea>'s very first
//    focus, which behaves like a plain click (cursor at click position,
//    nothing selected): specifically excluded per the spec this was
//    written for.
//  - A double-click whose FIRST click is what caused the focus collapses to
//    a single cursor position (not a word selection) -- most real
//    double-clicks like that are "get me into the field", not a deliberate
//    word-select gesture.
//  - A double-click on an ALREADY-focused field selects the double-clicked
//    word, cursor at the end of that selection.
//  - A single click on an already-focused field just moves the cursor
//    there, clearing any selection -- the browser's own default behavior,
//    left untouched here.
//  - Triple-click or Ctrl+A/Cmd+A selects everything, cursor at the end,
//    regardless of whatever was selected before.
(function () {
  function isTextField(el) {
    if (!el) return false;
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName === 'INPUT') {
      const type = (el.type || 'text').toLowerCase();
      return type === 'text' || type === 'search' || type === 'url' || type === 'email' || type === 'tel';
    }
    return false;
  }

  function selectAll(el) {
    el.setSelectionRange(0, el.value.length, 'forward');
  }

  // Whether the element about to be clicked is currently unfocused --
  // recorded on the first mousedown of a click/double/triple-click
  // sequence (event.detail resets to 1 once too long passes between
  // clicks, the same timing the browser itself uses to tell them apart),
  // so later clicks in the same sequence can still tell whether the whole
  // gesture started while unfocused.
  let unfocusedAtGestureStart = false;
  let gestureTarget = null;

  document.addEventListener(
    'mousedown',
    (e) => {
      if (!isTextField(e.target)) return;
      if (e.detail === 1) {
        unfocusedAtGestureStart = document.activeElement !== e.target;
        gestureTarget = e.target;
      }
    },
    true
  );

  // Invalidates a stale gestureTarget once the field actually blurs, so
  // tabbing back into it later is treated as a fresh (keyboard) focus
  // instead of being mistaken for still being mid mouse-click. Also
  // deselects -- a leftover selection has no purpose once the field isn't
  // even focused anymore.
  document.addEventListener(
    'focusout',
    (e) => {
      if (!isTextField(e.target)) return;
      if (e.target === gestureTarget) gestureTarget = null;
      e.target.setSelectionRange(e.target.selectionEnd, e.target.selectionEnd);
    },
    true
  );

  document.addEventListener(
    'focusin',
    (e) => {
      if (!isTextField(e.target)) return;
      // A mouse-driven focus is handled by the click/dblclick handlers
      // below instead -- whether it ends up selecting everything depends
      // on whether a double-click follows, which isn't known yet here.
      if (e.target === gestureTarget) return;
      if (e.target.tagName === 'TEXTAREA') return;
      selectAll(e.target);
    },
    true
  );

  document.addEventListener(
    'click',
    (e) => {
      if (!isTextField(e.target)) return;
      if (e.detail === 1) {
        if (e.target === gestureTarget && unfocusedAtGestureStart) selectAll(e.target);
      } else if (e.detail >= 3) {
        selectAll(e.target);
      }
    },
    true
  );

  document.addEventListener(
    'dblclick',
    (e) => {
      if (!isTextField(e.target)) return;
      const el = e.target;
      const startedUnfocused = e.target === gestureTarget && unfocusedAtGestureStart;
      // Deferred a tick so the browser's own default double-click action
      // (selecting the word under the cursor) has already applied --
      // preventDefault() here doesn't reliably suppress it, so instead this
      // either keeps that selection (just enforcing its direction) or
      // collapses it back to a single point, depending on which rule
      // applies.
      setTimeout(() => {
        if (startedUnfocused) el.setSelectionRange(el.selectionStart, el.selectionStart);
        else el.setSelectionRange(el.selectionStart, el.selectionEnd, 'forward');
      }, 0);
    },
    true
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (!isTextField(e.target)) return;
      if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        selectAll(e.target);
      }
    },
    true
  );
})();
