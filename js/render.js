// Block renderer: turns a concept's typed blocks into markup.
// Interactive blocks render static HTML here and are wired up in `hydrate()`.
import { store } from './store.js';
import { mountViz } from './viz.js';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Inline mini-markup: [[id|label]] cross-links, **bold**, *italic*. Content is authored, not user input. */
// Bare [[id]] links read as the word itself in running prose; a few ids need their spaces back.
const WORD = { 'body-language': 'body language', 'liking-gap': 'liking gap' };

export function inline(s, ctx) {
  return esc(s)
    .replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, id, label) => {
      const c = ctx.byId[id];
      if (!c) { console.warn('Missing link target', id); return label || id; }
      return `<a class="xl" href="#/c/${id}" data-peek="${id}" style="--r:var(--rc-${c.region})">${label || WORD[id] || id}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export const LEVELS = {
  robust: ['Well replicated', 'Large or repeatedly confirmed findings across labs and methods.'],
  supported: ['Supported', 'Good evidence, though with fewer replications, smaller samples, or narrower conditions.'],
  mixed: ['Mixed evidence', 'Some support and some failures; effects may be smaller or more conditional than first reported.'],
  myth: ['Overturned', 'Popular claims that did not survive scrutiny, or that distort what the original research showed.'],
  framework: ['Useful framework', 'A theory or model that organises evidence well, but is a lens rather than a measured fact.'],
  interpretive: ['Philosophical', 'Arguments and traditions about how to live. Not testable in a lab; judged by coherence and by living them.']
};
export const lvl = l => `<span class="lvl lvl-${l}">${LEVELS[l][0]}</span>`;

const B = {
  lede: (b, x) => `<p class="lede">${inline(b.text, x)}</p>`,
  p: (b, x) => `<p>${inline(b.text, x)}</p>`,
  h: b => `<h2>${esc(b.text)}</h2>`,
  pull: (b, x) => `<blockquote class="pull rv">${inline(b.text, x)}${b.cite ? `<cite>${esc(b.cite)}</cite>` : ''}</blockquote>`,
  evidence: (b, x) => `<aside class="evidence rv">${lvl(b.level)}<div class="claim">${inline(b.claim, x)}</div><div class="note">${inline(b.note, x)}</div></aside>`,
  compare: (b, x) => `<div class="compare rv">${[b.a, b.b].map(s => `<div><h4>${s.over ? `<small>${esc(s.over)}</small>` : ''}${esc(s.title)}</h4><ul>${s.points.map(p => `<li>${inline(p, x)}</li>`).join('')}</ul></div>`).join('')}</div>`,
  steps: (b, x) => `<ol class="steps rv">${b.items.map(([t, d]) => `<li><b>${esc(t)}</b><span>${inline(d, x)}</span></li>`).join('')}</ol>`,
  voices: (b, x) => `<div class="voices rv">${b.items.map(v => `<div class="voice"><small>${esc(v.who)}</small><b>${esc(v.view)}</b><p>${inline(v.text, x)}</p></div>`).join('')}</div>`,
  myths: (b, x) => `<div class="myths rv">${b.items.map(([m, r]) => `<div class="myth"><div class="said">${inline(m, x)}</div><div class="real">${inline(r, x)}</div></div>`).join('')}</div>`,
  lives: (b, x) => `<div class="lives rv">${b.items.map(l => `<div class="life"><div class="mono" aria-hidden="true">${esc(l.name.split(' ').map(w => w[0]).slice(0, 2).join(''))}</div><div><b>${esc(l.name)}</b><small>${esc(l.when)}</small><p>${inline(l.text, x)}</p></div></div>`).join('')}</div>`,
  viz: (b, x, i) => `<figure class="figure rv" style="--r:var(--rc)"><div class="viz" data-viz="${b.name}" data-i="${i}"></div>${b.caption ? `<figcaption>${b.label ? `<b>${esc(b.label)}</b>` : ''}${inline(b.caption, x)}</figcaption>` : ''}</figure>`,
  predict: (b, x, i) => `<div class="inter rv" data-predict="${i}"><div class="tag">Predict first</div><div class="q">${inline(b.q, x)}</div><div class="opts">${b.options.map((o, j) => `<button class="opt" data-j="${j}"><span class="mk">${String.fromCharCode(65 + j)}</span><span>${inline(o, x)}</span></button>`).join('')}</div><div class="slot"></div></div>`,
  scenario: (b, x, i) => `<div class="inter rv" data-scenario="${i}"><div class="tag">Scenario</div><div class="q">${inline(b.setup, x)}</div><div class="opts">${b.options.map((o, j) => `<button class="opt" data-j="${j}"><span class="mk">${String.fromCharCode(65 + j)}</span><span>${inline(o.text, x)}<span class="opt-slot"></span></span></button>`).join('')}</div>${b.after ? `<div class="slot"></div>` : ''}</div>`,
  thought: (b, x) => `<div class="inter rv"><div class="tag">Thought experiment</div><div class="q">${inline(b.q, x)}</div>${b.text ? `<p style="margin:0;color:var(--ink-2);font-size:.95em">${inline(b.text, x)}</p>` : ''}</div>`,
  field: (b, x, i) => `<div class="field rv" data-field="${i}"><div class="kicker"><b>Field experiment</b> · optional</div><div class="q">${inline(b.title, x)}</div><ol>${b.steps.map(s => `<li>${inline(s, x)}</li>`).join('')}</ol>${b.hypothesis ? `<p class="hyp"><b>What to watch for</b> — ${inline(b.hypothesis, x)}</p>` : ''}<textarea class="note" data-note="${x.id}:field:${i}" placeholder="If you try it: what did you predict, and what happened?" aria-label="Field notes"></textarea><div class="saved" aria-live="polite"></div></div>`,
  reflect: (b, x, i) => `<div class="reflect rv"><div class="kicker"><b>Reflect</b> · private, stays on this device</div><div class="q">${inline(b.q, x)}</div><textarea class="note" data-note="${x.id}:reflect:${i}" data-q="${esc(b.q)}" placeholder="Write as much or as little as you like…" aria-label="Your reflection"></textarea><div class="saved" aria-live="polite"></div></div>`
};

export function renderBlocks(blocks, ctx) {
  return blocks.map((b, i) => {
    const fn = B[b.t];
    if (!fn) { console.warn('Unknown block', b.t); return ''; }
    try { return fn(b, ctx, i); } catch (e) { console.error(e); return ''; }
  }).join('\n');
}

/** Wire up interactivity after the HTML is in the DOM. */
export function hydrate(root, concept, ctx) {
  const blocks = concept.blocks;
  root.querySelectorAll('[data-predict]').forEach(el => {
    const b = blocks[+el.dataset.predict];
    el.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
      const j = +btn.dataset.j;
      el.querySelectorAll('.opt').forEach(o => { o.classList.remove('picked', 'right'); o.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('picked'); btn.setAttribute('aria-pressed', 'true');
      el.querySelectorAll('.opt')[b.answer].classList.add('right');
      const hit = j === b.answer;
      el.querySelector('.slot').innerHTML = `<div class="reveal"><span class="verdict">${hit ? 'Your prediction matches the research' : 'The research says otherwise'}</span>${inline(b.explain, ctx)}</div>`;
      bindPeeks(el.querySelector('.slot'));
    }));
  });
  root.querySelectorAll('[data-scenario]').forEach(el => {
    const b = blocks[+el.dataset.scenario];
    el.querySelectorAll('.opt').forEach(btn => btn.addEventListener('click', () => {
      const j = +btn.dataset.j, slot = btn.querySelector('.opt-slot');
      btn.classList.add('picked');
      if (!slot.innerHTML) slot.innerHTML = `<span class="opt-note">${inline(b.options[j].note, ctx)}</span>`;
      const after = el.querySelector('.slot');
      if (after && !after.innerHTML) after.innerHTML = `<div class="reveal"><span class="verdict">The underlying principle</span>${inline(b.after, ctx)}</div>`;
      bindPeeks(el);
    }));
  });
  root.querySelectorAll('textarea[data-note]').forEach(ta => {
    ta.value = store.note(ta.dataset.note);
    const status = ta.nextElementSibling; let t;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const ok = store.setNote(ta.dataset.note, ta.value, { concept: concept.id, q: ta.dataset.q || concept.blocks[+ta.dataset.note.split(':')[2]]?.title || '' });
        status.textContent = ok ? (ta.value.trim() ? 'Saved on this device' : '') : 'Could not save — storage unavailable';
      }, 450);
    });
  });
  root.querySelectorAll('[data-viz]').forEach(el => mountViz(el.dataset.viz, el, ctx));
}

let peekHandler = null;
export function setPeekHandler(fn) { peekHandler = fn; }
export function bindPeeks(root) {
  root.querySelectorAll('a[data-peek]:not([data-bound])').forEach(a => {
    a.dataset.bound = '1';
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || !peekHandler) return;
      e.preventDefault(); peekHandler(a.dataset.peek);
    });
  });
}
