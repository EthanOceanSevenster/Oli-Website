/* ============================================================
   BOOT — runs before app.js
   Hands the prototype its asset URLs, and seeds the localStorage
   store from the server when a signed-in learner has newer state.
   ============================================================ */
(function () {
  'use strict';

  var KEY = 'pathway.proto.v1';

  function readJSON(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback;
    try { return JSON.parse(el.textContent); } catch (e) { return fallback; }
  }

  /* app.js reads these four at load time. */
  window.PATHWAY_ASSETS = readJSON('pathway-assets', {});

  /* Demo learners are enabled by the server, never by the browser. */
  window.PATHWAY_DEMO = readJSON('pathway-demo', false) === true;

  var server = readJSON('pathway-bootstrap', null);
  if (!server || !server.data) return;

  /* The server blob wins only when it is newer than what this browser holds,
     so work done offline in this browser is never silently thrown away. */
  var local = null;
  try { local = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { local = null; }

  var serverTime = Date.parse(server.updatedAt) || 0;
  var localTime = (local && local.syncedAt) || 0;

  if (local && localTime >= serverTime) return;

  try {
    var next = server.data && typeof server.data === 'object' ? server.data : {};
    next.syncedAt = serverTime;
    next.session = next.session || server.email;
    if (local && local.theme && !next.theme) next.theme = local.theme;
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch (e) {
    /* Private browsing or a full quota: the prototype still runs on its own. */
  }
})();
