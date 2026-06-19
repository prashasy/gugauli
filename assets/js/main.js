/* main.js — mobile nav, current-page marker, contact form, footer year */

// ── Footer year ───────────────────────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Mobile nav toggle ─────────────────────────────────────────────────────────
const toggle = document.querySelector('.nav-toggle');
const nav    = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      toggle.focus();
    }
  });

  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }
  });
}

// ── Mark current page in nav ──────────────────────────────────────────────────
// The HTML already has aria-current="page" on the correct link per page,
// so JS just syncs it with the live URL (handles edge cases like trailing slash).
(function markCurrentPage() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.site-nav__list a').forEach((link) => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path || href + '.html' === path || href === path + '.html') {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
})();

// ── Contact form (Web3Forms) ──────────────────────────────────────────────────
const form   = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form && result) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn  = form.querySelector('[type="submit"]');
    const origLabel  = submitBtn.textContent;
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';
    result.style.display  = 'none';
    result.className      = '';

    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body:   new FormData(form),
      });
      const json = await res.json();

      if (json.success) {
        result.textContent   = 'Thanks — we will get back to you shortly.';
        result.className     = 'success';
        result.style.display = 'block';
        form.reset();
      } else {
        throw new Error(json.message || 'Submission failed');
      }
    } catch {
      result.textContent   = 'Something went wrong. Please call or WhatsApp us directly.';
      result.className     = 'error';
      result.style.display = 'block';
    } finally {
      submitBtn.disabled    = false;
      submitBtn.textContent = origLabel;
    }
  });
}
