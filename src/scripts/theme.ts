/**
 * Hristo K Portfolio — theme.ts
 *
 * The only JavaScript the site ships. Vanilla, no dependencies, and every
 * feature is progressive: with JS switched off the site is fully readable,
 * navigable and filterable.
 *
 * Reads from the markup:
 *   header[data-hk-header]                    sticky header, optional data-autohide="1"
 *   button[data-hk-theme-toggle]              colour-scheme button
 *   [data-hk-reveal]                          scroll-reveal targets
 *   [data-hk-filter-group]                    wrapper for the archive filters
 *     a[data-hk-filter="<slug|all>"]          filter chips (real links without JS)
 *     [data-hk-filter-count]                  aria-live results count
 *     [data-hk-item][data-cats="a b c"]       filterable cards
 *   [data-hk-nav-toggle] / [data-hk-nav-drawer]
 *   a[data-hk-lightbox] wrapping an <img>     case-study gallery
 */

type Scheme = 'light' | 'dark';

(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Colour scheme -------------------------------------- */

  const toggle = document.querySelector<HTMLButtonElement>('[data-hk-theme-toggle]');

  function currentScheme(): Scheme {
    const forced = document.documentElement.getAttribute('data-theme');
    if (forced === 'dark' || forced === 'light') return forced;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyScheme(scheme: Scheme): void {
    document.documentElement.setAttribute('data-theme', scheme);
    try {
      localStorage.setItem('hk-theme', scheme);
    } catch {
      /* private browsing — the choice just won't persist */
    }
    if (toggle) {
      toggle.setAttribute('aria-pressed', scheme === 'dark' ? 'true' : 'false');
      toggle.setAttribute(
        'aria-label',
        scheme === 'dark'
          ? (toggle.dataset.labelLight ?? 'Switch to light appearance')
          : (toggle.dataset.labelDark ?? 'Switch to dark appearance')
      );
    }
  }

  if (toggle) {
    applyScheme(currentScheme());
    toggle.addEventListener('click', () => {
      applyScheme(currentScheme() === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---------- 2. Header: blur on scroll + auto-hide ------------------ */

  const header = document.querySelector<HTMLElement>('[data-hk-header]');
  if (header) {
    const autoHide = header.getAttribute('data-autohide') === '1';
    let lastY = window.scrollY;
    let hideTimer: number | null = null;
    let ticking = false;

    const onHeaderScroll = (): void => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      if (autoHide && !reduced) {
        if (y > lastY && y > 140) {
          if (hideTimer === null) {
            hideTimer = window.setTimeout(() => {
              header.classList.add('is-hidden');
              hideTimer = null;
            }, 180);
          }
        } else if (y < lastY) {
          if (hideTimer !== null) {
            clearTimeout(hideTimer);
            hideTimer = null;
          }
          header.classList.remove('is-hidden');
        }
      }
      lastY = y;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(onHeaderScroll);
        }
      },
      { passive: true }
    );

    // Never leave the header hidden while a keyboard user is tabbing into it.
    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

    onHeaderScroll();
  }

  /* ---------- 3. Scroll reveal -------------------------------------- */

  const revealables = document.querySelectorAll<HTMLElement>('[data-hk-reveal]');
  if (revealables.length && !reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    revealables.forEach((el) => {
      el.classList.add('hk-reveal');
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('is-armed');
        io.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    });
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 4. Archive filters ------------------------------------ */
  /*
   * The chips are real links to real pages (/archive/c/<slug>), so the filter
   * works with JS off. With JS on we filter in place instead of navigating,
   * keep the URL truthful with pushState, and announce the new count.
   */

  const group = document.querySelector<HTMLElement>('[data-hk-filter-group]');
  if (group) {
    const chips = Array.from(group.querySelectorAll<HTMLAnchorElement>('a[data-hk-filter]'));
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-hk-item]'));
    const countEl = document.querySelector<HTMLElement>('[data-hk-filter-count]');
    const singular = countEl?.dataset.singular ?? '1 project';
    const plural = countEl?.dataset.plural ?? '{n} projects';

    const filterTo = (slug: string, push: boolean): void => {
      let shown = 0;
      items.forEach((item) => {
        const cats = (item.getAttribute('data-cats') || '').split(/\s+/);
        const match = slug === 'all' || cats.indexOf(slug) !== -1;
        item.hidden = !match;
        if (match) shown += 1;
      });

      chips.forEach((chip) => {
        const isActive = chip.getAttribute('data-hk-filter') === slug;
        if (isActive) chip.setAttribute('aria-current', 'true');
        else chip.removeAttribute('aria-current');
      });

      if (countEl) {
        countEl.textContent = shown === 1 ? singular : plural.replace('{n}', String(shown));
      }

      if (push && window.history.pushState) {
        const target = chips.find((chip) => chip.getAttribute('data-hk-filter') === slug);
        if (target) window.history.pushState({ hkFilter: slug }, '', target.href);
      }
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', (event) => {
        // Let modified clicks (new tab, download, middle click) behave normally.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        filterTo(chip.getAttribute('data-hk-filter') || 'all', true);
      });
    });

    window.addEventListener('popstate', () => {
      const slug = group.getAttribute('data-hk-active') || 'all';
      const fromPath = chips.find((chip) => chip.pathname === window.location.pathname);
      filterTo(fromPath?.getAttribute('data-hk-filter') || slug, false);
    });

    filterTo(group.getAttribute('data-hk-active') || 'all', false);
  }

  /* ---------- 5. Mobile nav drawer ---------------------------------- */

  const navToggle = document.querySelector<HTMLButtonElement>('[data-hk-nav-toggle]');
  const drawer = document.querySelector<HTMLElement>('[data-hk-nav-drawer]');
  if (navToggle && drawer) {
    const focusables =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let opener: HTMLElement | null = null;

    const onNavKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        closeNav();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = drawer.querySelectorAll<HTMLElement>(focusables);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    function openNav(): void {
      opener = document.activeElement as HTMLElement | null;
      drawer!.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      navToggle!.setAttribute('aria-expanded', 'true');
      drawer!.querySelector<HTMLElement>(focusables)?.focus();
      document.addEventListener('keydown', onNavKey);
    }

    function closeNav(): void {
      drawer!.hidden = true;
      document.documentElement.style.overflow = '';
      navToggle!.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onNavKey);
      opener?.focus();
    }

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
      if (drawer.hidden) openNav();
      else closeNav();
    });
    drawer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-hk-nav-close]') || target.closest('a[href]')) closeNav();
    });
  }

  /* ---------- 6. Case-study gallery lightbox ------------------------ */

  const galleryLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[data-hk-lightbox]')
  );
  if (galleryLinks.length) {
    const sources = galleryLinks.map((a) => ({
      href: a.getAttribute('href') || '',
      alt: a.querySelector('img')?.alt || '',
    }));

    let box: HTMLElement | null = null;
    let boxImg: HTMLImageElement | null = null;
    let boxOpener: HTMLElement | null = null;
    let index = 0;

    const show = (i: number): void => {
      if (!boxImg) return;
      index = (i + sources.length) % sources.length;
      const source = sources[index];
      if (!source) return;
      boxImg.src = source.href;
      boxImg.alt = source.alt;
    };

    const onBoxKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'Tab' && box) {
        const nodes = box.querySelectorAll<HTMLElement>('button');
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    function buildBox(): void {
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
      box.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target === box || target.hasAttribute('data-close')) closeBox();
        if (target.hasAttribute('data-prev')) show(index - 1);
        if (target.hasAttribute('data-next')) show(index + 1);
      });
    }

    function openBox(i: number): void {
      if (!box) buildBox();
      if (!box) return;
      boxOpener = document.activeElement as HTMLElement | null;
      box.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      show(i);
      box.querySelector<HTMLElement>('[data-close]')?.focus();
      document.addEventListener('keydown', onBoxKey);
    }

    function closeBox(): void {
      if (!box) return;
      box.hidden = true;
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', onBoxKey);
      boxOpener?.focus();
    }

    galleryLinks.forEach((a, i) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openBox(i);
      });
    });
  }
})();
