/**
 * Hristo K Portfolio — theme.js
 * Vanilla, no dependencies. Enqueue with defer. Every feature is progressive:
 * with JS off the site is fully readable and navigable.
 *
 * Expects (from the Astro templates):
 *   header[data-hk-header]                  sticky header, optional data-autohide="1"
 *   button[data-hk-theme-toggle]            colour-scheme button
 *   [data-hk-reveal]                        scroll-reveal targets
 *   [data-hk-filter-group]                  wrapper for the archive filters
 *     button[data-hk-filter="<slug|all>"]   filter chips
 *     [data-hk-filter-count]                aria-live results count
 *     [data-hk-item][data-cats="a b c"]     filterable cards
 *   [data-hk-nav-toggle] / [data-hk-nav-drawer]
 *   a[data-hk-lightbox] wrapping an <img>   case-study gallery
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Colour scheme --------------------------------------
     Light is the default for every visitor with no saved preference —
     the system/OS colour-scheme setting is never consulted. The inline
     head script already restored a *saved* choice (if any) before this
     ran, so on load we only need to sync the toggle button to whatever
     data-theme currently is. Storage is written only on an explicit
     click, never implicitly on page load. */
  var toggle = document.querySelector('[data-hk-theme-toggle]');
  function currentScheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function reflectToggle(scheme) {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', scheme === 'dark' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      scheme === 'dark'
        ? (toggle.getAttribute('data-label-light') || 'Switch to light appearance')
        : (toggle.getAttribute('data-label-dark') || 'Switch to dark appearance')
    );
  }
  if (toggle) {
    reflectToggle(currentScheme());
    toggle.addEventListener('click', function () {
      var next = currentScheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('hk-theme', next); } catch (e) {}
      reflectToggle(next);
    });
  }

  /* ---------- 2. Header: blur on scroll + auto-hide ------------------ */
  var header = document.querySelector('[data-hk-header]');
  if (header) {
    var autoHide = header.getAttribute('data-autohide') === '1';
    var lastY = window.scrollY, hideTimer = null, ticking = false;

    function onHeaderScroll() {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      if (autoHide && !reduced) {
        if (y > lastY && y > 140) {
          if (!hideTimer) hideTimer = setTimeout(function () {
            header.classList.add('is-hidden'); hideTimer = null;
          }, 180);
        } else if (y < lastY) {
          if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
          header.classList.remove('is-hidden');
        }
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onHeaderScroll); }
    }, { passive: true });
    onHeaderScroll();
  }

  /* ---------- 3. Scroll reveal -------------------------------------- */
  var revealables = document.querySelectorAll('[data-hk-reveal]');
  if (revealables.length && !reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('hk-reveal');
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('is-armed');
        io.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Archive filters ------------------------------------ */
  var group = document.querySelector('[data-hk-filter-group]');
  if (group) {
    var chips = group.querySelectorAll('[data-hk-filter]');
    var items = document.querySelectorAll('[data-hk-item]');
    var countEl = document.querySelector('[data-hk-filter-count]');

    function filterTo(slug) {
      var shown = 0;
      Array.prototype.forEach.call(items, function (item) {
        var cats = (item.getAttribute('data-cats') || '').split(/\s+/);
        var match = slug === 'all' || cats.indexOf(slug) !== -1;
        item.hidden = !match;
        if (match) shown++;
      });
      Array.prototype.forEach.call(chips, function (chip) {
        chip.setAttribute('aria-pressed', chip.getAttribute('data-hk-filter') === slug ? 'true' : 'false');
      });
      if (countEl) {
        countEl.textContent = shown === 1 ? '1 project' : shown + ' projects';
      }
      if (history.replaceState) {
        history.replaceState(null, '', slug === 'all' ? location.pathname : '#' + slug);
      }
    }

    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () { filterTo(chip.getAttribute('data-hk-filter')); });
    });

    var initial = (location.hash || '').replace('#', '');
    filterTo(initial && group.querySelector('[data-hk-filter="' + initial + '"]') ? initial : 'all');
  }

  /* ---------- 5. Mobile nav drawer ---------------------------------- */
  var navToggle = document.querySelector('[data-hk-nav-toggle]');
  var drawer = document.querySelector('[data-hk-nav-drawer]');
  if (navToggle && drawer) {
    var opener = null;
    var focusables = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

    function openNav() {
      opener = document.activeElement;
      drawer.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      navToggle.setAttribute('aria-expanded', 'true');
      var first = drawer.querySelector(focusables);
      if (first) first.focus();
      document.addEventListener('keydown', onNavKey);
    }
    function closeNav() {
      drawer.hidden = true;
      document.documentElement.style.overflow = '';
      navToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onNavKey);
      if (opener && opener.focus) opener.focus();
    }
    function onNavKey(e) {
      if (e.key === 'Escape') { closeNav(); return; }
      if (e.key !== 'Tab') return;
      var nodes = drawer.querySelectorAll(focusables);
      if (!nodes.length) return;
      var first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', function () {
      drawer.hidden ? openNav() : closeNav();
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.matches('[data-hk-nav-close], a[href]')) closeNav();
    });
  }

  /* ---------- 6. Case-study gallery lightbox ------------------------ */
  var galleryLinks = document.querySelectorAll('a[data-hk-lightbox]');
  if (galleryLinks.length) {
    var box = null, boxImg = null, boxOpener = null, index = 0;
    var sources = Array.prototype.map.call(galleryLinks, function (a) {
      return { href: a.getAttribute('href'), alt: (a.querySelector('img') || {}).alt || '' };
    });

    function buildBox() {
      box = document.createElement('div');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Image viewer');
      box.className = 'hk-lightbox';
      box.hidden = true;
      box.innerHTML =
        '<button type="button" data-close aria-label="Close viewer">&times;</button>' +
        '<button type="button" data-prev aria-label="Previous image">&#8249;</button>' +
        '<img alt="">' +
        '<button type="button" data-next aria-label="Next image">&#8250;</button>';
      document.body.appendChild(box);
      boxImg = box.querySelector('img');
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.hasAttribute('data-close')) closeBox();
        if (e.target.hasAttribute('data-prev')) show(index - 1);
        if (e.target.hasAttribute('data-next')) show(index + 1);
      });
    }
    function show(i) {
      index = (i + sources.length) % sources.length;
      boxImg.src = sources[index].href;
      boxImg.alt = sources[index].alt;
    }
    function openBox(i) {
      if (!box) buildBox();
      boxOpener = document.activeElement;
      box.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      show(i);
      box.querySelector('[data-close]').focus();
      document.addEventListener('keydown', onBoxKey);
    }
    function closeBox() {
      box.hidden = true;
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onBoxKey);
      if (boxOpener && boxOpener.focus) boxOpener.focus();
    }
    function onBoxKey(e) {
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    }

    Array.prototype.forEach.call(galleryLinks, function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); openBox(i); });
    });
  }
})();
