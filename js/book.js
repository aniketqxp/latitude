// The book: a reusable illustrated-page engine. A story is data (pages of art and a few large
// lines), plus optional hooks for the pages that need to move. The engine owns turning,
// beats, glosses, notes, lenses, choices and accessibility; the story owns everything you
// see. Stories can ignore any of it, and a room can skip the book entirely. See docs/WORKFLOW.md.

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Seeded randomness, so a drawing of scattered stars is the same drawing every time.
export function rng(a = 1) {
  return () => {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// An illustration. Pages vary in shape, so art is cropped to fill (slice) unless told to fit.
export const svg = (vb, body, fit = 'xMidYMid slice') => `<svg viewBox="${vb}" preserveAspectRatio="${fit}" aria-hidden="true" focusable="false">${body}</svg>`;

// Text markup: *italic*, **bold**, {word|gloss}, [^n] note marker, ==mark==, \n line break.
// Glosses are collected into `bag` and referenced by index, so their text never meets the regexes.
export function ink(s, bag = []) {
  return esc(s)
    .replace(/\{([^|}]+)\|([^}]+)\}/g, (_, w, g) => `<button type="button" class="gl" data-gloss="${bag.push(g) - 1}" aria-expanded="false">${w}</button>`)
    .replace(/\[\^(\w+)\]/g, (_, n) => `<button type="button" class="fn" data-note="${n}" aria-expanded="false" aria-label="Note ${n}">${n}</button>`)
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\*([^*]+)\*/g, '<i>$1</i>')
    .replace(/==([^=]+)==/g, '<mark>$1</mark>')
    .replace(/\n/g, '<br>');
}
// Plain text, for counting words and for the live region.
export const plain = s => String(s).replace(/\{([^|}]+)\|[^}]+\}/g, '$1').replace(/\[\^\w+\]/g, '').replace(/[*=]/g, '');

const TURNS = { leaf: 640, fade: 380, cut: 0, rise: 560, drift: 1000 };
const chev = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d > 0 ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}"/></svg>`;

/**
 * book(stage, story, api) -> cleanup
 * story: { id, title, turn?, lens?: { label, options: [{id,label}], default, from? }, pages: [page] }
 * page:  { id?, layout: cover|under|over|full|text|card, art?, alt?, eyebrow?, title?, text?, notes?,
 *          inlineNotes?, choices?, key?, hold?, next?, turn?, tone?, size?, at?, cls?, on?, onBeat? }
 * Any of art/alt/eyebrow/title/text/notes may be a value, a function of ctx, or (with a lens)
 * an object keyed by lens id.
 */
export function book(stage, story, api = {}) {
  const pages = story.pages, N = pages.length;
  const ids = Object.fromEntries(pages.map((p, k) => [p.id ?? k, k]));
  const idx = to => typeof to === 'number' ? to : ids[to];
  const reduced = () => api.reduced ?? matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = {};
  let lens = story.lens?.default ?? null;
  let i = 0, beat = 0, cur = null, pageOff = null, released = false, running = [];
  const hist = [];

  const root = document.createElement('div');
  root.className = 'book';
  root.dataset.story = story.id;
  root.setAttribute('role', 'region');
  root.setAttribute('aria-roledescription', 'book');
  root.setAttribute('aria-label', story.title);
  root.innerHTML = `
    <div class="bk-pages"></div>
    ${story.lens ? `<div class="bk-lens" role="radiogroup" aria-label="${esc(story.lens.label)}" hidden>
      <span class="cap" aria-hidden="true">${esc(story.lens.label)}</span>
      ${story.lens.options.map(o => `<button type="button" role="radio" data-lens="${o.id}">${esc(o.label)}</button>`).join('')}
    </div>` : ''}
    <div class="bk-slip" role="note" hidden></div>
    <nav class="bk-ctl" aria-label="Pages">
      <button type="button" class="bk-btn prev" aria-label="Previous page">${chev(-1)}</button>
      <span class="bk-count" aria-hidden="true"></span>
      <button type="button" class="bk-btn next" aria-label="Next">${chev(1)}</button>
    </nav>
    <p class="bk-live" aria-live="polite"></p>`;
  stage.appendChild(root);
  const host = root.querySelector('.bk-pages');
  const slipEl = root.querySelector('.bk-slip');
  const live = root.querySelector('.bk-live');
  const lensEl = root.querySelector('.bk-lens');
  const prevBtn = root.querySelector('.prev'), nextBtn = root.querySelector('.next');
  const count = root.querySelector('.bk-count');

  const ctx = () => ({ story, page: pages[i], index: i, total: N, lens, state, beat, api, book: root, el: cur,
    next, back, go: to => turn(idx(to), 1), release: () => { released = true; }, reduced: reduced() });
  const val = (v, c) => {
    if (typeof v === 'function') return v(c);
    if (v && story.lens && typeof v === 'object' && !Array.isArray(v) && lens in v) return v[lens];
    return v;
  };

  /* ---------- Drawing a page ---------- */
  function render(k, b) {
    i = k; released = false;
    const p = pages[k], c = ctx();
    const bag = [];
    const text = val(p.text, c);
    const beats = text == null ? [] : Array.isArray(text) ? text : [text];
    const notes = val(p.notes, c) || {};
    const art = val(p.art, c), alt = val(p.alt, c);
    const layout = p.layout || 'under';
    const blocks = beats.map(s => `<p class="beat">${ink(s, bag)}</p>`);
    if (p.inlineNotes && Object.keys(notes).length) {
      blocks.push(`<div class="beat pg-notes">${Object.entries(notes).map(([n, t]) =>
        `<p class="note"><span class="note-n">${esc(n)}</span> ${ink(val(t, c), bag)}</p>`).join('')}</div>`);
    }
    if (p.choices) {
      const html = `<div class="pg-choices" role="group" aria-label="${esc(p.ask || 'Choose')}">${p.choices.map((o, n) =>
        `<button type="button" data-choice="${n}" aria-pressed="false">${ink(o.label)}</button>`).join('')}</div>`;
      blocks.push(html); // not a beat of its own: it arrives with the last line (see .done in book.css)
    }
    const el = document.createElement('section');
    el.className = `pg pg-${layout}${p.tone ? ` tone-${p.tone}` : ''}${p.size ? ` size-${p.size}` : ''}${p.at ? ` at-${p.at}` : ''}${p.cls ? ` ${p.cls}` : ''}`;
    el.dataset.page = p.id ?? k;
    el.setAttribute('aria-roledescription', 'page');
    el.setAttribute('aria-label', `Page ${k + 1} of ${N}`);
    const eyebrow = val(p.eyebrow, c), title = val(p.title, c);
    el.innerHTML = `
      ${art ? `<div class="pg-art"${alt ? ` role="img" aria-label="${esc(alt)}"` : ' aria-hidden="true"'}>${art}</div>` : ''}
      <div class="pg-words">
        ${eyebrow ? `<p class="cap pg-eyebrow">${ink(eyebrow, bag)}</p>` : ''}
        ${layout === 'cover' || title ? `<h2 class="pg-title">${ink(title ?? story.title, bag)}</h2>` : ''}
        ${blocks.join('')}
      </div>
      <div class="pg-shade" aria-hidden="true"></div>`;
    el._bag = bag; el._notes = notes;
    el.querySelectorAll('[data-choice]').forEach(btn => btn.addEventListener('click', () => choose(p, +btn.dataset.choice, btn)));
    setBeat(el, b === 'all' ? Infinity : b);
    root.dataset.tone = p.tone || '';
    if (story.lens) lensEl.hidden = k < (idx(story.lens.from) ?? 0);
    prevBtn.disabled = !hist.length;
    nextBtn.setAttribute('aria-label', k === N - 1 ? 'Leave the book' : 'Next');
    nextBtn.classList.toggle('end', k === N - 1);
    count.textContent = `${k + 1} / ${N}`;
    return el;
  }
  function setBeat(el, b) {
    const all = el.querySelectorAll('.beat');
    beat = Math.max(0, Math.min(b, all.length - 1));
    el.dataset.beat = beat;
    el.dataset.beats = all.length;
    all.forEach((x, n) => x.classList.toggle('on', n <= beat));
    el.classList.toggle('done', beat >= all.length - 1);
  }
  function mountHooks() {
    const p = pages[i];
    pageOff = p.on ? p.on(cur, ctx()) || null : null;
    p.onBeat?.(cur, beat, ctx());
  }
  function unmountHooks() { if (pageOff) { try { pageOff(); } catch (e) { console.error(e); } pageOff = null; } }
  function announce(el) {
    const words = [...el.querySelectorAll('.pg-title, .beat.on')].map(x => x.textContent.trim()).join(' ');
    live.textContent = `Page ${i + 1} of ${N}. ${words}`;
  }

  /* ---------- Moving ---------- */
  function next() {
    closeSlip();
    const total = +cur.dataset.beats;
    if (beat < total - 1) {
      setBeat(cur, beat + 1);
      pages[i].onBeat?.(cur, beat, ctx());
      const last = cur.querySelectorAll('.beat')[beat];
      live.textContent = last.textContent.trim();
      return;
    }
    const p = pages[i];
    if ((p.hold || p.choices) && !released) return nudge();
    const to = p.next != null ? idx(val(p.next, ctx())) : i + 1;
    if (to >= N || to == null) return leave();
    turn(to, 1);
  }
  function back() {
    closeSlip();
    if (!hist.length) return;
    turn(hist.pop(), -1);
  }
  function turn(to, dir) {
    if (to == null || to < 0 || to >= N) return;
    finish();
    unmountHooks();
    const from = cur, fromI = i;
    if (dir > 0) hist.push(fromI);
    const kind = (dir > 0 ? pages[to].turn : pages[fromI].turn) || story.turn || 'leaf';
    cur = render(to, dir > 0 ? 0 : 'all');
    host.appendChild(cur);
    animate(from, cur, dir, kind);
    mountHooks();
    announce(cur);
  }
  function redraw() { // same page, new lens: keep the place, fade the ink
    finish(); unmountHooks();
    const from = cur, b = beat;
    cur = render(i, b);
    host.appendChild(cur);
    animate(from, cur, 1, 'fade');
    mountHooks();
    announce(cur);
  }
  function leave() {
    const exit = document.querySelector('.exit');
    if (!exit) return;
    exit.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    exit.querySelector('a')?.focus({ preventScroll: true });
  }
  function nudge() {
    const target = cur.querySelector('.pg-choices, [data-hold]');
    if (!target || reduced() || !target.animate) return;
    target.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 320 });
  }
  function choose(p, n, btn) {
    const o = p.choices[n];
    state[p.key ?? p.id ?? i] = o.value ?? o.label;
    cur.querySelectorAll('[data-choice]').forEach(x => x.setAttribute('aria-pressed', String(x === btn)));
    released = true;
    api.haptic?.(8);
    setTimeout(() => {
      if (!btn.isConnected) return;
      const to = o.to != null ? idx(o.to) : p.next != null ? idx(val(p.next, ctx())) : i + 1;
      to >= N ? leave() : turn(to, 1);
    }, reduced() ? 120 : 420);
  }

  /* ---------- Turning, animated ---------- */
  function animate(from, to, dir, kind) {
    if (!from) return;
    if (reduced()) kind = kind === 'cut' ? 'cut' : 'quiet';
    const D = kind === 'quiet' ? 160 : TURNS[kind] ?? 400;
    if (!D || !to.animate) { from.remove(); return; }
    const o = { duration: D, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'both' };
    const shade = (el, a, b) => el.querySelector('.pg-shade').animate([{ opacity: a }, { opacity: b }], o);
    const P = 'perspective(2000px) ';
    let a;
    if (kind === 'leaf' && dir > 0) {
      from.style.zIndex = 2;
      a = [from.animate([{ transform: P + 'rotateY(0deg)' }, { transform: P + 'rotateY(-104deg)' }], o), shade(from, 0, .6), shade(to, .45, 0)];
    } else if (kind === 'leaf') {
      to.style.zIndex = 2;
      a = [to.animate([{ transform: P + 'rotateY(-104deg)' }, { transform: P + 'rotateY(0deg)' }], o), shade(to, .6, 0), shade(from, 0, .45)];
    } else if (kind === 'rise') {
      a = [to.animate([{ opacity: 0, transform: `translateY(${dir > 0 ? 7 : -7}%)` }, { opacity: 1, transform: 'none' }], { ...o, easing: 'cubic-bezier(.2,.7,.1,1)' }),
        from.animate([{ opacity: 1 }, { opacity: 0 }], { ...o, duration: D * .6 })];
    } else if (kind === 'drift') {
      a = [to.animate([{ opacity: 0, transform: 'scale(1.035)' }, { opacity: 1, transform: 'none' }], { ...o, easing: 'ease-out' }),
        from.animate([{ opacity: 1 }, { opacity: 0 }], { ...o, duration: D * .7 })];
    } else {
      a = [to.animate([{ opacity: 0 }, { opacity: 1 }], o), from.animate([{ opacity: 1 }, { opacity: 0 }], o)];
    }
    running = a;
    Promise.all(a.map(x => x.finished)).catch(() => {}).then(() => {
      from.remove();
      to.style.zIndex = '';
      a.forEach(x => x.cancel());
      if (running === a) running = [];
    });
  }
  function finish() { running.forEach(x => { try { x.finish(); } catch {} }); }

  /* ---------- Glosses and notes: a slip of paper at the foot of the page ---------- */
  let slipBtn = null;
  function openSlip(btn, html) {
    if (slipBtn === btn) return closeSlip();
    closeSlip();
    slipEl.innerHTML = html;
    slipEl.hidden = false;
    slipBtn = btn;
    btn.setAttribute('aria-expanded', 'true');
    live.textContent = slipEl.textContent;
    if (!reduced() && slipEl.animate) slipEl.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
  }
  function closeSlip() {
    if (!slipBtn) return false;
    slipEl.hidden = true;
    slipBtn.setAttribute('aria-expanded', 'false');
    slipBtn = null;
    return true;
  }

  /* ---------- Input: tap zones, swipes, keys, controls ---------- */
  let down = null, swiped = false;
  const onDown = e => { if (e.isPrimary) down = { x: e.clientX, y: e.clientY, t: performance.now() }; swiped = false; };
  const onUp = e => {
    if (!down || !e.isPrimary) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y;
    down = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      swiped = true;
      if (e.target.closest('[data-nonav]')) return;
      dx < 0 ? next() : back();
    }
  };
  const onClick = e => {
    if (swiped) { swiped = false; return; }
    const g = e.target.closest('.gl, .fn');
    if (g) {
      const c = ctx();
      g.classList.contains('gl')
        ? openSlip(g, ink(cur._bag[+g.dataset.gloss] ?? ''))
        : openSlip(g, `<span class="note-n">${esc(g.dataset.note)}</span> ${ink(val(cur._notes[g.dataset.note], c) ?? '')}`);
      return;
    }
    if (e.target.closest('button, a, input, select, textarea, label, [data-nonav]')) return;
    if (closeSlip()) return;
    const r = host.getBoundingClientRect();
    (e.clientX - r.left) < r.width * .28 ? back() : next();
  };
  const onKey = e => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector('dialog[open]') || !root.isConnected) return;
    const t = e.target;
    if (t.closest?.('input, textarea, select, [contenteditable]')) return;
    const onControl = t.closest?.('button, a');
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !onControl)) { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); back(); }
    else if (e.key === 'Escape') closeSlip();
  };
  host.addEventListener('pointerdown', onDown);
  host.addEventListener('pointerup', onUp);
  host.addEventListener('pointercancel', () => { down = null; });
  host.addEventListener('click', onClick);
  slipEl.addEventListener('click', closeSlip);
  prevBtn.addEventListener('click', back);
  nextBtn.addEventListener('click', next);
  document.addEventListener('keydown', onKey);
  lensEl?.addEventListener('click', e => {
    const b = e.target.closest('[data-lens]');
    if (!b || b.dataset.lens === lens) return;
    setLens(b.dataset.lens);
    redraw();
    api.haptic?.(6);
  });
  function setLens(id) {
    lens = id;
    root.dataset.lens = id;
    lensEl?.querySelectorAll('[data-lens]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.lens === id)));
  }

  if (lens) setLens(lens);
  cur = render(0, 0);
  host.appendChild(cur);
  mountHooks();

  return () => {
    finish();
    unmountHooks();
    document.removeEventListener('keydown', onKey);
  };
}
