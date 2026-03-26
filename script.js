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
  }
  if (params.get('tags') === 'show') {
    document.body.classList.add('show-tags');
  }
}

applyParams();
