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

function applyParams() {
  const params = new URLSearchParams(window.location.search);
  const track = params.get('track');
  const validTracks = ['ae', 'da', 'uxr', 'fdh'];
  if (track && validTracks.includes(track)) {
    document.body.classList.add('track-' + track);

    /* Sort decision log entries by track relevance */
    const list = document.getElementById('decision-list');
    if (list) {
      const items = Array.from(list.querySelectorAll('.decision-item'));
      const relevant = items.filter(i => (i.dataset.tracks || '').split(',').includes(track));
      const irrelevant = items.filter(i => !(i.dataset.tracks || '').split(',').includes(track));
      [...relevant, ...irrelevant].forEach((item, idx) => {
        list.appendChild(item);
        item.querySelector('.decision-number').textContent = String(idx + 1).padStart(2, '0');
      });
    }

    /* Propagate track parameter to all internal links */
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', href + separator + 'track=' + track);
      }
    });
  }
  if (params.get('tags') === 'show') {
    document.body.classList.add('show-tags');

    /* Propagate tags parameter to all internal links */
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', href + separator + 'tags=show');
      }
    });
  }
}

applyParams();
