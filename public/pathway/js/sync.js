/* ============================================================
   SYNC — runs after app.js
   The prototype calls save() whenever learner state changes. We
   wrap it so the same blob is pushed to the API, debounced, and
   only while somebody is actually signed in on the server.

   Cross-site writes are blocked by the session cookie's SameSite
   setting plus an Origin check on the server, so there is no CSRF
   token to carry here.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'pathway.proto.v1';
  var ENDPOINT = '/api/progress';
  var DEBOUNCE_MS = 1200;

  /* Always wrap save(). Whether a save is actually sent is decided per call
     from PathwayAPI.signedIn, because a learner can sign up or sign in part
     way through a session and the prototype never reloads the page. */
  if (typeof window.save !== 'function' || !window.PathwayAPI) return;

  var timer = null;
  var inFlight = false;
  var pending = false;

  function blob() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }

  function push() {
    if (!window.PathwayAPI.signedIn) { pending = false; return; }
    if (inFlight) { pending = true; return; }
    var data = blob();
    if (!data) return;

    inFlight = true;
    fetch(ENDPOINT, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: data })
    }).then(function (res) {
      /* A 401 means the session expired; the prototype keeps working locally. */
      if (!res.ok) return;
      return res.json().then(function (out) {
        try {
          var current = blob() || {};
          current.syncedAt = Date.parse(out.updatedAt) || Date.now();
          localStorage.setItem(KEY, JSON.stringify(current));
        } catch (e) { /* storage unavailable */ }
      });
    }).catch(function () {
      /* Offline: the next save tries again. */
    }).then(function () {
      inFlight = false;
      if (pending) { pending = false; schedule(); }
    });
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(push, DEBOUNCE_MS);
  }

  var original = window.save;
  window.save = function () {
    var result = original.apply(this, arguments);
    schedule();
    return result;
  };

  /* Catch the last change when the tab goes away. */
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { clearTimeout(timer); push(); }
  });
})();
