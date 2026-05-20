/* ══════════════════════════════════════════════════
   Egypt Amaru — Portfolio Shared JS
   Accordion toggle + URL parameter handling
   ══════════════════════════════════════════════════ */

function toggleDecision(trigger) {
  const item = trigger.closest('.decision-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.decision-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ── PAGE REGISTRY ──
   Canonical slug, display name, and URL path for each case study.
   Update here when adding new case studies — no HTML footer nav changes needed. */
const pages = [
  { slug: 'ecommerce',       name: 'Ecommerce Behavior Analytics',                         path: '../ecommerce-behavior-analytics/index.html' },
  { slug: 'chain',           name: 'CHaiN',                                                path: '../chain/index.html' },
  { slug: 'ml-benchmarking', name: 'ML Platform Benchmarking at Google',                   path: '../ml-benchmarking/index.html' },
  { slug: 'redesign',        name: 'Redesigning an Unmoderated Testing Program at YouTube', path: '../redesign-unmoderated-testing/index.html' },
  { slug: 'audio-needs',     name: 'Prioritizing Audio Needs for Smart Glasses',            path: '../prioritizing-audio-needs/index.html' },
];

/* ── CARD ORDER PER VIEW ──
   Default order (no parameter) follows DOM order in about-index.html. */
const cardOrders = {
  ae:   ['ecommerce', 'chain', 'redesign', 'ml-benchmarking', 'audio-needs'],
  da:   ['ml-benchmarking', 'ecommerce', 'audio-needs', 'chain', 'redesign'],
  quxr: ['audio-needs', 'ml-benchmarking', 'chain', 'redesign', 'ecommerce'],
  fdh:  ['ml-benchmarking', 'chain', 'redesign', 'audio-needs', 'ecommerce'],
};

/* ── ROLE TITLES PER VIEW ── */
const roleTitles = {
  ae:   'Analytics Engineer, Behavioral Data',
  da:   'Data Analyst | Behavioral Data',
  quxr: 'Quantitative UX Researcher',
  fdh:  'Analytics Engineer, Behavioral Data',
};

function applyParams() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const validViews = ['ae', 'da', 'quxr', 'fdh'];

  if (view && validViews.includes(view)) {
    document.body.classList.add('track-' + view);

    /* Sort decision log entries by track relevance (case study pages) */
    const list = document.getElementById('decision-list');
    if (list) {
      const trackKey = view === 'quxr' ? 'uxr' : view;
      const items = Array.from(list.querySelectorAll('.decision-item'));
      const relevant   = items.filter(i => (i.dataset.tracks || '').split(',').includes(trackKey));
      const irrelevant = items.filter(i => !(i.dataset.tracks || '').split(',').includes(trackKey));
      [...relevant, ...irrelevant].forEach((item, idx) => {
        list.appendChild(item);
        item.querySelector('.decision-number').textContent = String(idx + 1).padStart(2, '0');
      });
    }

    /* Reorder cards on the About Me page */
    const order = cardOrders[view];
    if (order) {
      const featuredWrap = document.querySelector('.case-study-featured');
      const grid = document.querySelector('.case-study-grid');
      if (featuredWrap && grid) {
        const featuredCard = featuredWrap.querySelector('.case-study-card');
        const gridCards    = Array.from(grid.querySelectorAll('.case-study-card'));
        const allCards     = featuredCard ? [featuredCard, ...gridCards] : gridCards;
        const cardMap      = {};
        allCards.forEach(card => { if (card.dataset.slug) cardMap[card.dataset.slug] = card; });
        const sorted = order.map(slug => cardMap[slug]).filter(Boolean);
        if (sorted.length) {
          const newFeatured = sorted[0];
          newFeatured.classList.add('featured');
          featuredWrap.innerHTML = '';
          featuredWrap.appendChild(newFeatured);
          grid.innerHTML = '';
          sorted.slice(1).forEach(card => {
            card.classList.remove('featured');
            grid.appendChild(card);
          });
        }
      }
    }

    /* Update role title on About Me page */
    const roleEl = document.querySelector('.intro-role');
    if (roleEl && roleTitles[view]) {
      roleEl.textContent = roleTitles[view];
    }
  }

  /* Dynamic footer nav on case study pages */
  const currentSlug = document.body.dataset.slug;
  if (currentSlug) {
    const activeOrder = (view && cardOrders[view]) ? cardOrders[view] : pages.map(p => p.slug);
    const currentIdx  = activeOrder.indexOf(currentSlug);
    const prevNav     = document.querySelector('.footer-nav .prev-project');
    const nextNav     = document.querySelector('.footer-nav .next-project');

    if (prevNav) {
      if (currentIdx > 0) {
        const prevSlug = activeOrder[currentIdx - 1];
        const prevPage = pages.find(p => p.slug === prevSlug);
        if (prevPage) {
          prevNav.textContent = prevPage.name;
          prevNav.href = prevPage.path + (view ? '?view=' + view : '');
          prevNav.style.display = '';
        }
      } else {
        prevNav.style.display = 'none';
      }
    }

    if (nextNav) {
      if (currentIdx < activeOrder.length - 1) {
        const nextSlug = activeOrder[currentIdx + 1];
        const nextPage = pages.find(p => p.slug === nextSlug);
        if (nextPage) {
          nextNav.textContent = nextPage.name;
          nextNav.href = nextPage.path + (view ? '?view=' + view : '');
          nextNav.style.display = '';
        }
      } else {
        nextNav.style.display = 'none';
      }
    }
  }

  if (params.get('tags') === 'show') {
    document.body.classList.add('show-tags');
  }

  /* Propagate view + tags parameters to all internal links */
  if (view || params.get('tags') === 'show') {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
        const url = new URL(href, window.location.origin);
        if (view) url.searchParams.set('view', view);
        if (params.get('tags') === 'show') url.searchParams.set('tags', 'show');
        link.setAttribute('href', url.pathname + (url.search || ''));
      }
    });
  }
}

applyParams();
