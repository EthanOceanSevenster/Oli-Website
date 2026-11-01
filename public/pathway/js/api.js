/* ============================================================
   API — the server side of accounts.

   Loaded before app.js. The prototype keeps its own store for
   everything a learner does; identity lives here instead, so an
   account works on any device rather than only in the browser
   that created it.

   Every call returns { ok, status, data, offline } and never
   throws, so a caller can fall back to local behaviour when the
   network is gone without wrapping each call in try/catch.
   ============================================================ */
(function () {
  'use strict';

  function request(path, options) {
    options = options || {};
    var init = {
      method: options.method || 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    };
    if (options.body !== undefined) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(options.body);
    }

    return fetch(path, init).then(function (res) {
      return res.json().catch(function () { return null; }).then(function (data) {
        return { ok: res.ok, status: res.status, data: data, offline: false };
      });
    }).catch(function () {
      /* Network down, or the server is not there. Callers decide what to do. */
      return { ok: false, status: 0, data: null, offline: true };
    });
  }

  /* Whether a server session is live right now.
     Starts from what the page was rendered with, then follows sign-in and
     sign-out as they happen, because the prototype never reloads the page.
     sync.js reads this to decide whether a save is worth sending. */
  function bootstrapped() {
    var el = document.getElementById('pathway-bootstrap');
    return !!el && el.textContent !== 'null';
  }

  window.PathwayAPI = {
    signedIn: bootstrapped(),

    register: function (details) {
      var self = this;
      return request('/api/auth/register', { method: 'POST', body: details }).then(function (res) {
        if (res.ok) self.signedIn = true;
        return res;
      });
    },

    login: function (email, password) {
      var self = this;
      return request('/api/auth/login', {
        method: 'POST', body: { email: email, password: password }
      }).then(function (res) {
        if (res.ok) self.signedIn = true;
        return res;
      });
    },

    logout: function () {
      var self = this;
      self.signedIn = false;
      return request('/api/auth/logout', { method: 'POST' });
    },

    me: function () {
      return request('/api/auth/me');
    },

    /** The learner's whole prototype blob, as last saved from any device. */
    progress: function () {
      return request('/api/progress');
    },

    /** Records the chosen plan. Used by the simulated checkout only. */
    subscribe: function (plan) {
      return request('/api/subscription', { method: 'POST', body: { plan: plan } });
    },

    /**
     * Opens a Payfast checkout and returns the signed form to POST there.
     * 503 means Payfast is not set up, and the caller falls back.
     */
    payfastCheckout: function (plan) {
      return request('/api/payfast/checkout', { method: 'POST', body: { plan: plan } });
    },

    /** Where a payment got to. Payfast confirms out of band, so this polls. */
    paymentStatus: function (id) {
      return request('/api/payfast/status?id=' + encodeURIComponent(id));
    },

    /** The message to show when the server could not be reached. */
    offlineMessage: 'We could not reach PATHWAY just now. Check your connection and try again.'
  };
})();
