/**
 * Hristo K Portfolio — contact form.
 * Mirrors the prototype's client logic: honeypot anti-spam field, inline
 * validation, 15s-timeout POST to /api/contact. Never shows a success state
 * unless the backend actually acknowledges the message — there is currently
 * no backend wired up, so submissions will show the error state honestly.
 */
(function () {
  'use strict';
  var form = document.getElementById('cf-form');
  if (!form) return;

  var endpoint = form.getAttribute('data-endpoint') || '/api/contact';
  var fields = {
    name: document.getElementById('cf-name'),
    email: document.getElementById('cf-email'),
    message: document.getElementById('cf-message'),
    company: document.getElementById('cf-company'),
  };
  var errorEls = {
    name: document.getElementById('cf-name-err'),
    email: document.getElementById('cf-email-err'),
    message: document.getElementById('cf-message-err'),
  };
  var statusEl = document.getElementById('cf-status');
  var submitBtn = document.getElementById('cf-submit');
  var sending = false;

  function setError(key, msg) {
    fields[key].setAttribute('aria-invalid', msg ? 'true' : 'false');
    errorEls[key].textContent = msg || '';
  }

  function validate() {
    var ok = true;
    if (!fields.name.value.trim()) { setError('name', 'Please add your name.'); ok = false; } else setError('name', '');
    if (!fields.email.value.trim()) { setError('email', 'Please add your email address.'); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim())) { setError('email', 'That email doesn’t look quite right — please check it.'); ok = false; }
    else setError('email', '');
    if (!fields.message.value.trim()) { setError('message', 'Please write a short message.'); ok = false; } else setError('message', '');
    return ok;
  }

  ['name', 'email', 'message'].forEach(function (key) {
    fields[key].addEventListener('input', function () { setError(key, ''); });
  });

  function renderStatus(state) {
    statusEl.innerHTML = '';
    if (state === 'success') {
      statusEl.innerHTML = '<p class="cf-status-ok"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00757F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg><span>Message sent! Thanks for reaching out — I’ll get back to you as soon as I can.</span></p>';
    } else if (state === 'error') {
      statusEl.innerHTML = '<p class="cf-status-err" role="alert">Something went wrong and your message wasn’t sent. Please try again or email me directly.</p>';
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sending) return;
    if (!validate()) {
      var firstInvalid = ['name', 'email', 'message'].find(function (k) { return fields[k].getAttribute('aria-invalid') === 'true'; });
      if (firstInvalid) fields[firstInvalid].focus();
      return;
    }
    if (fields.company.value) {
      form.reset();
      renderStatus('success');
      return;
    }

    sending = true;
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.textContent = 'Sending...';
    renderStatus(null);

    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, 15000);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: fields.name.value.trim(),
        email: fields.email.value.trim(),
        message: fields.message.value.trim(),
        company: fields.company.value,
      }),
      signal: ctrl.signal,
    }).then(function (res) {
      clearTimeout(timer);
      return res.json().catch(function () { return null; }).then(function (data) {
        if (res.ok && data && data.ok === true) {
          form.reset();
          renderStatus('success');
        } else {
          renderStatus('error');
        }
      });
    }).catch(function () {
      clearTimeout(timer);
      renderStatus('error');
    }).finally(function () {
      sending = false;
      submitBtn.disabled = false;
      submitBtn.setAttribute('aria-disabled', 'false');
      submitBtn.textContent = 'Send Message →';
    });
  });
})();
