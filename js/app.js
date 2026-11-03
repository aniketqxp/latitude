import { REGIONS, regionById, THREADS } from './content/regions.js';
import { CONCEPTS } from './content/index.js';
import { art, rng } from './art.js';
import { store } from './store.js';
import { renderBlocks, hydrate, inline, lvl, LEVELS, bindPeeks, setPeekHandler } from './render.js';

const main = document.getElementById('main');
const byId = Object.fromEntries(CONCEPTS.map(c => [c.id, c]));
const ctx = { byId, bindPeeks };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const inRegion = id => CONCEPTS.filter(c => c.region === id);

/* ---------- Theme ---------- */
// Region colours become CSS custom properties so any element can borrow another region's hue.
const rootStyle = document.createElement('style');
rootStyle.textContent = ':root{' + REGIONS.map(r => `--rc-${r.id}:light-dark(${r.color[0]},${r.color[1]});`).join('') + '}' +
  THREADS.map(t => `[data-thread="${t.id}"]{--tc:light-dark(${t.color[0]},${t.color[1]})}`).join('');
document.head.appendChild(rootStyle);

const themeBtn = document.getElementById('themeBtn');
const themes = ['auto', 'light', 'dark'];
function applyTheme(t) {
  if (t === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t;
  const dark = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll('meta[name=theme-color]').forEach(m => m.setAttribute('content', dark ? '#111214' : '#F2EDE3'));
  themeBtn.setAttribute('aria-label', `Theme: ${t}. Change theme`);
}
// Stored raw (not JSON) so the inline script in index.html can apply it before first paint.
let theme = 'auto';
try { theme = localStorage.getItem('lat:theme') || 'auto'; } catch {}
if (!themes.includes(theme)) theme = 'auto';
applyTheme(theme);
themeBtn.addEventListener('click', () => {
  theme = themes[(themes.indexOf(theme) + 1) % 3];
  try { theme === 'auto' ? localStorage.removeItem('lat:theme') : localStorage.setItem('lat:theme', theme); } catch {}
  const go = () => applyTheme(theme);
  document.startViewTransition ? document.startViewTransition(go) : go();
  toast(theme === 'auto' ? 'Theme follows your device' : `${theme[0].toUpperCase() + theme.slice(1)} theme`);
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => applyTheme(theme));

/* ---------- Toast ---------- */
const toastEl = document.getElementById('toast'); let toastT;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2200); }

/* ---------- Peek sheet ---------- */
const sheet = document.getElementById('sheet'), scrim = document.getElementById('scrim');
let lastFocus = null;
function openPeek(id) {
  const c = byId[id]; if (!c) return;
  const r = regionById[c.region];
  lastFocus = document.activeElement;
  sheet.style.setProperty('--rc', `var(--rc-${r.id})`);
  sheet.innerHTML = `<div class="grab" aria-hidden="true"></div><div class="h">${art(r.art, c.id, { w: 120, h: 120 })}<div><div class="kicker"><b>${esc(r.name)}</b></div><h2 id="sheetTitle">${esc(c.title)}</h2></div></div>
    <p>${inline(c.kicker, ctx)}</p><div class="row"><a class="btn" href="#/c/${c.id}" data-close>Read <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a><button class="btn ghost" data-close>Stay here</button></div>`;
  sheet.hidden = false; scrim.hidden = false;
  sheet.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closePeek));
  sheet.querySelector('.btn').focus({ preventScroll: true });
  // drag-to-dismiss on touch
  let y0 = null, dy = 0;
  sheet.ontouchstart = e => { if (sheet.scrollTop <= 0) y0 = e.touches[0].clientY; };
  sheet.ontouchmove = e => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); sheet.style.transform = `translateY(${dy}px)`; };
  sheet.ontouchend = () => { if (y0 == null) return; sheet.style.transform = ''; if (dy > 90) closePeek(); y0 = null; dy = 0; };
}
function closePeek() {
  if (sheet.hidden) return;
  sheet.hidden = true; scrim.hidden = true; sheet.style.transform = '';
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}
scrim.addEventListener('click', closePeek);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePeek(); });
setPeekHandler(openPeek);

/* ---------- Router ---------- */
const routes = [
  [/^\/?$/, atlas, 'atlas'],
  [/^\/r\/([a-z-]+)$/, region, 'atlas'],
  [/^\/c\/([a-z0-9-]+)$/, concept, 'atlas'],
  [/^\/map$/, mapView, 'map'],
  [/^\/find$/, find, 'find'],
  [/^\/trail$/, trail, 'trail'],
  [/^\/method$/, method, 'atlas'],
  [/^\/t\/([a-z-]+)$/, threadView, 'atlas']
];
const scrollMemo = new Map();
let currentPath = null;

function route() {
  const path = decodeURIComponent(location.hash.slice(1) || '/');
  if (currentPath !== null) scrollMemo.set(currentPath, scrollY);
  closePeek();
  let hit = routes.find(([re]) => re.test(path));
  const render = () => {
    try {
      if (!hit) throw new Error('nf');
      const m = path.match(hit[0]);
      const ok = hit[1](...m.slice(1));
      if (ok === false) throw new Error('nf');
    } catch (e) {
      if (e.message !== 'nf') console.error(e);
      notFound();
    }
    document.querySelectorAll('[data-nav]').forEach(a => { if (a.dataset.nav === (hit && hit[2])) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    bindPeeks(main);
    observeReveals();
    const back = scrollMemo.get(path);
    window.scrollTo(0, navType === 'pop' && back ? back : 0);
    navType = 'pop';
    currentPath = path;
    if (!path.startsWith('/map')) main.focus({ preventScroll: true });
    updateProgress();
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce && currentPath !== null) document.startViewTransition(render); else render();
}
let navType = 'pop';
document.addEventListener('click', e => { const a = e.target.closest('a[href^="#/"]'); if (a) navType = 'push'; });
addEventListener('hashchange', route);

/* ---------- Views ---------- */
function setTitle(t) { document.title = t ? `${t} — Latitude` : 'The Reading Room — Latitude'; }
const arrow = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';

function doorHTML(c) {
  const r = regionById[c.region];
  return `<div class="door-swap" style="--r:var(--rc-${r.id})"><div class="kicker">A door into <b>${esc(r.name)}</b></div>
    <h1 class="door-q">${inline(c.q, ctx)}</h1>
    <div class="door-row"><a class="btn" href="#/c/${c.id}">${esc(c.title)} ${arrow}</a><button class="btn ghost" id="shuffle" aria-label="Show another question">Another door ↻</button></div></div>`;
}

function atlas() {
  setTitle('');
  const visited = store.visited();
  const pool = CONCEPTS.filter(c => c.q);
  const day = Math.floor(Date.now() / 864e5);
  let di = day % pool.length;
  main.innerHTML = `<div class="page wrap">
    <section class="door" aria-live="polite"><div id="door">${doorHTML(pool[di])}</div></section>
    <div class="section-head"><span class="kicker">The regions</span><span class="kicker" style="color:var(--muted)">${CONCEPTS.length} places · ${Object.keys(visited).filter(k => byId[k]).length} visited</span></div>
    <ol class="index-list">${REGIONS.map((r, i) => `<li class="index-row" style="--rc:var(--rc-${r.id})"><a href="#/r/${r.id}"><span class="index-num">${String(i + 1).padStart(2, '0')}</span><span class="index-name">${esc(r.name)}</span>${art(r.art, r.id, { w: 120, h: 120, cls: 'index-glyph', sw: 1.6 })}<span class="index-q">${esc(r.q)}</span></a></li>`).join('')}</ol>
    <div class="section-head"><span class="kicker">Threads</span><span class="kicker" style="color:var(--muted)">journeys across regions</span></div>
    <div class="threads">${THREADS.map(threadCard).join('')}</div>
    <section class="method-band"><div class="kicker">How claims are marked</div><p>Every finding carries a grade — from well replicated, to contested, to overturned, to philosophical. Popular claims that fail scrutiny are labelled as such.</p><div class="legend">${Object.keys(LEVELS).map(lvl).join('')}</div><div><a class="btn ghost" href="#/method">Read the method ${arrow}</a></div></section>
    <footer class="footer">Latitude · an atlas of human possibility · <a href="#/method">method &amp; sources</a></footer></div>`;
  const doorEl = document.getElementById('door');
  const bindShuffle = () => document.getElementById('shuffle').addEventListener('click', () => {
    di = (di + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length;
    doorEl.innerHTML = doorHTML(pool[di]); bindPeeks(doorEl); bindShuffle();
  });
  bindShuffle();
}

function threadCard(t) {
  const v = store.visited();
  return `<article class="thread" data-thread="${t.id}"><div class="kicker">${t.stops.length} stops</div><h3>${esc(t.name)}</h3><p>${esc(t.blurb)}</p>
    <ol class="line">${t.stops.filter(s => byId[s]).map(s => `<li class="${v[s] ? 'seen' : ''}"><a href="#/c/${s}?t=${t.id}"><span class="stop"></span><span>${esc(byId[s].title)}</span><small>${esc(regionById[byId[s].region].name)}</small></a></li>`).join('')}</ol></article>`;
}

function threadView(id) {
  const t = THREADS.find(x => x.id === id); if (!t) return false;
  setTitle(t.name);
  main.innerHTML = `<div class="page wrap" style="padding-top:2rem"><div class="threads" style="grid-template-columns:1fr">${threadCard(t)}</div></div>`;
}

function region(id) {
  const r = regionById[id]; if (!r) return false;
  setTitle(r.name);
  const v = store.visited();
  const cs = inRegion(id);
  main.innerHTML = `<div class="page" style="--rc:var(--rc-${r.id})"><div class="wrap region-hero">
    <div class="region-art float">${art(r.art, r.id + ':hero', { w: 400, h: 250, sw: 1.3, cls: 'draw', label: '' })}</div>
    <div class="kicker"><a class="crumb" href="#/">Atlas</a> · Region ${String(REGIONS.indexOf(r) + 1).padStart(2, '0')}</div>
    <h1 class="display region-title">${esc(r.name)}</h1><p class="region-q">${esc(r.q)}</p><p class="lead" style="max-width:36rem">${esc(r.intro)}</p></div>
    <div class="wrap"><ol class="concept-list" style="--r:var(--rc-${r.id})">${cs.map(c => `<li class="${v[c.id] ? 'seen' : ''}"><a href="#/c/${c.id}"><span class="t">${esc(c.title)}</span><span class="k">${inline(c.kicker, { byId: {} })}</span><span class="meta">${lvl(c.level)}<span class="kicker">${c.mins} min</span></span>${art(r.art, c.id, { w: 120, h: 120, cls: 'g' })}</a></li>`).join('')}</ol>
    ${neighbours(r)}</div></div>`;
}

function neighbours(r) {
  const i = REGIONS.indexOf(r), next = REGIONS[(i + 1) % REGIONS.length];
  return `<a class="btn ghost" href="#/r/${next.id}" style="margin-bottom:3rem">Next region: ${esc(next.name)} ${arrow}</a>`;
}

const LAYOUTS = ['', 'l-right', 'l-band'];
function concept(id) {
  const c = byId[id.split('?')[0]] || byId[id]; if (!c) return false;
  const r = regionById[c.region];
  setTitle(c.title);
  store.visit(c.id);
  const layout = c.layout || LAYOUTS[Math.floor(rng(c.id)() * 3)];
  const kept = store.kept().includes(c.id);
  const threadId = new URLSearchParams(location.hash.split('?')[1] || '').get('t');
  const thread = THREADS.find(t => t.id === threadId);
  main.innerHTML = `<article class="page" style="--rc:var(--rc-${r.id})">
    <header class="wrap c-hero ${layout}"><div class="c-art">${art(r.art, c.id + ':hero', { w: layout === 'l-right' ? 300 : layout === 'l-band' ? 640 : 520, h: layout === 'l-right' ? 250 : 200, sw: 1.3, cls: 'draw' })}</div>
      <div class="kicker"><a class="crumb" href="#/r/${r.id}"><b>${esc(r.name)}</b></a>${thread ? ` · thread: ${esc(thread.name)}` : ''}</div>
      <h1 class="display c-title">${esc(c.title)}</h1><p class="c-kick">${inline(c.kicker, ctx)}</p>
      <div class="c-meta">${lvl(c.level)}<span class="chip">${c.mins} min read</span></div></header>
    <div class="read c-body">${renderBlocks(c.blocks, { ...ctx, id: c.id })}
      <div class="keep-row"><button class="btn ghost keep ${kept ? 'on' : ''}" id="keepBtn" aria-pressed="${kept}">${kept ? 'Kept in your trail' : 'Keep this'}</button>${navigator.share ? '<button class="btn ghost" id="shareBtn">Share</button>' : ''}</div>
      ${threadNext(thread, c)}
      <section class="onward"><div class="kicker">Paths onward</div><ul class="paths">${(c.related || []).filter(([rid]) => byId[rid]).map(([rid, why]) => { const o = byId[rid], orr = regionById[o.region]; return `<li style="--r:var(--rc-${orr.id})"><a href="#/c/${o.id}">${art(orr.art, o.id, { w: 100, h: 100, cls: 'g' })}<span><span class="t">${esc(o.title)}</span><span class="why">${inline(why, { byId: {} })}</span></span><span class="arrow">→</span></a></li>`; }).join('')}</ul>
      ${c.sources?.length ? `<details class="sources"><summary>Sources &amp; further reading (${c.sources.length})</summary><ol>${c.sources.map(s => `<li>${inline(s, { byId: {} })}</li>`).join('')}</ol></details>` : ''}</section>
    </div></article>`;
  hydrate(main, c, ctx);
  document.getElementById('keepBtn').addEventListener('click', e => {
    const on = store.toggleKeep(c.id); e.currentTarget.classList.toggle('on', on); e.currentTarget.setAttribute('aria-pressed', on);
    e.currentTarget.textContent = on ? 'Kept in your trail' : 'Keep this'; toast(on ? 'Kept — find it in your Trail' : 'Removed from your Trail');
  });
  document.getElementById('shareBtn')?.addEventListener('click', () => navigator.share({ title: c.title + ' — Latitude', text: c.kicker.replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, '$1'), url: location.href }).catch(() => {}));
}

function threadNext(t, c) {
  if (!t) return '';
  const i = t.stops.indexOf(c.id); const n = t.stops[i + 1];
  if (!n || !byId[n]) return `<div class="inter" data-thread="${t.id}" style="margin-top:2rem"><div class="tag">End of thread</div><div class="q">You’ve walked “${esc(t.name)}”.</div><a class="btn ghost" href="#/">Back to the atlas</a></div>`;
  return `<div class="inter" data-thread="${t.id}" style="margin-top:2rem"><div class="tag">Thread · stop ${i + 2} of ${t.stops.length}</div><div class="q">Next on “${esc(t.name)}”: ${esc(byId[n].title)}</div><a class="btn" href="#/c/${n}?t=${t.id}">Continue ${arrow}</a></div>`;
}

/* ---------- Map ---------- */
let layoutCache = null;
function computeLayout() {
  if (layoutCache) return layoutCache;
  const nodes = [], R0 = 330, W = 1000;
  REGIONS.forEach((r, i) => {
    const a = -Math.PI / 2 + (i / REGIONS.length) * Math.PI * 2;
    const cx = W / 2 + Math.cos(a) * R0, cy = W / 2 + Math.sin(a) * R0;
    const cs = inRegion(r.id);
    cs.forEach((c, j) => {
      const b = a + Math.PI + (j / cs.length) * Math.PI * 2, rr = 52 + (j % 2) * 34;
      nodes.push({ c, r, x: cx + Math.cos(b) * rr, y: cy + Math.sin(b) * rr, rx: cx, ry: cy, deg: (c.related || []).length });
    });
  });
  // a few relaxation passes to separate overlapping nodes
  for (let k = 0; k < 60; k++) for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const A = nodes[i], B = nodes[j], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1;
    if (d < 58) { const m = (58 - d) / 2 / d; A.x -= dx * m; A.y -= dy * m; B.x += dx * m; B.y += dy * m; }
  }
  const idx = Object.fromEntries(nodes.map(n => [n.c.id, n]));
  const edges = [], seen = new Set();
  nodes.forEach(n => (n.c.related || []).forEach(([rid]) => {
    const m = idx[rid]; if (!m) return; const k = [n.c.id, rid].sort().join('|'); if (seen.has(k)) return; seen.add(k); edges.push([n, m]);
  }));
  return (layoutCache = { nodes, edges, idx, W });
}

function mapView() {
  setTitle('Map');
  const { nodes, edges, W } = computeLayout();
  const v = store.visited();
  main.innerHTML = `<div class="map-page page"><svg class="map" id="mapSvg" viewBox="0 0 ${W} ${W}" role="img" aria-label="Map of all concepts and their connections">
    <g id="mapG">${REGIONS.map((r, i) => { const a = -Math.PI / 2 + (i / REGIONS.length) * Math.PI * 2; const x = W / 2 + Math.cos(a) * 470, y = W / 2 + Math.sin(a) * 470; return `<text class="rlabel" x="${x}" y="${y}" text-anchor="middle" fill="var(--rc-${r.id})">${esc(r.name)}</text>`; }).join('')}
    ${edges.map(([a, b]) => { const mx = (a.x + b.x) / 2 + (W / 2 - (a.x + b.x) / 2) * .35, my = (a.y + b.y) / 2 + (W / 2 - (a.y + b.y) / 2) * .35; return `<path class="edge" data-a="${a.c.id}" data-b="${b.c.id}" d="M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}"/>`; }).join('')}
    ${nodes.map(n => `<g class="node" data-id="${n.c.id}" tabindex="0" role="button" aria-label="${esc(n.c.title)}" transform="translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})" style="cursor:pointer"><circle r="22" fill="transparent"/><circle class="dot" r="${6 + Math.min(5, n.deg)}" fill="${v[n.c.id] ? `var(--rc-${n.r.id})` : 'var(--paper)'}" stroke="var(--rc-${n.r.id})" stroke-width="2.4"/><text y="${-14 - Math.min(5, n.deg)}" text-anchor="middle">${esc(n.c.title)}</text></g>`).join('')}</g></svg>
    <div class="map-ui"><div class="note">Every place, every connection. Filled dots are places you’ve been. Tap a dot to see its links; tap again to open.</div><div class="zoom"><button data-z="1.3" aria-label="Zoom in">+</button><button data-z="0.77" aria-label="Zoom out">−</button><button data-z="0" aria-label="Reset view" style="font-size:.8rem">⟲</button></div></div></div>`;
  const svg = document.getElementById('mapSvg');
  let vb = [0, 0, W, W];
  const fit = () => {
    const rct = svg.getBoundingClientRect(), asp = rct.width / rct.height;
    // Whole map visible on load, on any aspect; pinch and wheel take you closer.
    const pad = 40, side = W + pad * 2;
    vb = asp < 1 ? [-pad, W / 2 - side / asp / 2, side, side / asp] : [W / 2 - side * asp / 2, -pad, side * asp, side];
    set();
  };
  const set = () => svg.setAttribute('viewBox', vb.map(n => n.toFixed(1)).join(' '));
  const zoom = (f, cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2) => { const nw = Math.min(W * 2, Math.max(160, vb[2] / f)), k = nw / vb[2]; vb = [cx - (cx - vb[0]) * k, cy - (cy - vb[1]) * k, nw, vb[3] * k]; set(); };
  fit();
  main.querySelectorAll('[data-z]').forEach(b => b.addEventListener('click', () => +b.dataset.z ? zoom(+b.dataset.z) : fit()));
  const toSvg = (x, y) => { const r = svg.getBoundingClientRect(); return [vb[0] + (x - r.left) / r.width * vb[2], vb[1] + (y - r.top) / r.height * vb[3]]; };
  svg.addEventListener('wheel', e => { e.preventDefault(); const [x, y] = toSvg(e.clientX, e.clientY); zoom(e.deltaY < 0 ? 1.15 : 0.87, x, y); }, { passive: false });
  const pts = new Map(); let moved = 0, pinch0 = null;
  svg.addEventListener('pointerdown', e => { svg.setPointerCapture(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]); moved = 0; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); } });
  svg.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    const prev = pts.get(e.pointerId); pts.set(e.pointerId, [e.clientX, e.clientY]);
    if (pts.size === 1) {
      const r = svg.getBoundingClientRect(), dx = (e.clientX - prev[0]) / r.width * vb[2], dy = (e.clientY - prev[1]) / r.height * vb[3];
      moved += Math.abs(e.clientX - prev[0]) + Math.abs(e.clientY - prev[1]); vb[0] -= dx; vb[1] -= dy; set();
    } else if (pts.size === 2 && pinch0) {
      const [a, b] = [...pts.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); moved = 99;
      const [cx, cy] = toSvg((a[0] + b[0]) / 2, (a[1] + b[1]) / 2); zoom(d / pinch0, cx, cy); pinch0 = d;
    }
  });
  const end = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = null; };
  svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  let focused = null;
  const select = id => {
    if (focused === id) { location.hash = '#/c/' + id; return; }
    focused = id;
    const linked = new Set([id]);
    svg.querySelectorAll('.edge').forEach(p => { const hot = p.dataset.a === id || p.dataset.b === id; p.classList.toggle('hot', hot); if (hot) { linked.add(p.dataset.a); linked.add(p.dataset.b); } });
    svg.querySelectorAll('.node').forEach(n => n.classList.toggle('dim', !linked.has(n.dataset.id)));
    const c = byId[id]; main.querySelector('.map-ui .note').innerHTML = `<b style="font-family:var(--f-display);font-size:1.15rem">${esc(c.title)}</b><br>${inline(c.kicker, { byId: {} })}<br><a class="xl" href="#/c/${id}" style="--r:var(--rc-${c.region})">Open</a>`;
  };
  svg.querySelectorAll('.node').forEach(n => {
    n.addEventListener('click', () => { if (moved < 8) select(n.dataset.id); });
    n.addEventListener('keydown', e => { if (e.key === 'Enter') select(n.dataset.id); });
  });
}

/* ---------- Find ---------- */
function find() {
  setTitle('Find');
  // Offer only the tags that connect several places, most-shared first; full-text search covers the rest.
  const freq = {}; CONCEPTS.forEach(c => (c.tags || []).forEach(t => freq[t] = (freq[t] || 0) + 1));
  const tags = Object.keys(freq).filter(t => freq[t] > 1).sort((a, b) => freq[b] - freq[a] || a.localeCompare(b)).slice(0, 18);
  main.innerHTML = `<div class="page read"><div class="find-box"><label class="vh" for="q">Search the atlas</label><input id="q" type="search" placeholder="Search ideas, fears, skills…" autocomplete="off" enterkeyhint="search"></div>
    <div class="tags">${tags.map(t => `<button class="chip" data-tag="${esc(t)}">${esc(t)}</button>`).join('')}</div><ul class="hits" id="hits"></ul></div>`;
  const q = document.getElementById('q'), hits = document.getElementById('hits');
  const text = c => [c.title, c.kicker, c.q || '', (c.tags || []).join(' '), regionById[c.region].name].join(' ').toLowerCase().replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, '$1');
  const index = CONCEPTS.map(c => [c, text(c)]);
  const mark = (s, terms) => terms.reduce((a, t) => t ? a.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'), '<mark>$1</mark>') : a, esc(s));
  const run = () => {
    const terms = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const res = terms.length ? index.map(([c, t]) => [c, terms.reduce((s, w) => s + (t.includes(w) ? (c.title.toLowerCase().includes(w) ? 3 : 1) : -99), 0)]).filter(([, s]) => s > 0).sort((a, b) => b[1] - a[1]).map(([c]) => c) : CONCEPTS;
    hits.innerHTML = res.length ? res.map(c => `<li style="--rc:var(--rc-${c.region})"><a href="#/c/${c.id}"><span class="t">${mark(c.title, terms)}</span><span class="k">${mark(c.kicker.replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, '$1'), terms)}</span></a></li>`).join('') : `<li class="empty">Nothing yet for “${esc(q.value)}”. Try a feeling (fear, shame), a skill (listening, negotiation) or a thinker (Aristotle).</li>`;
  };
  q.addEventListener('input', run);
  main.querySelectorAll('[data-tag]').forEach(b => b.addEventListener('click', () => { q.value = b.dataset.tag; run(); }));
  run();
  if (matchMedia('(min-width: 900px)').matches) q.focus();
}

/* ---------- Trail ---------- */
function trail() {
  setTitle('Trail');
  const v = store.visited(), kept = store.kept().filter(id => byId[id]), notes = store.notes();
  const seen = Object.keys(v).filter(id => byId[id]).sort((a, b) => v[a] - v[b]);
  const noteList = Object.entries(notes).filter(([, n]) => byId[n.concept]).sort((a, b) => b[1].at - a[1].at);
  // A personal path through the regions you've touched — drawn, not scored.
  const W = 640, H = 260, pts = seen.slice(-40).map((id, i, arr) => { const R = rng(id); return [30 + (W - 60) * (arr.length < 2 ? .5 : i / (arr.length - 1)), 40 + R() * (H - 80), byId[id]]; });
  const path = pts.length ? 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') : '';
  main.innerHTML = `<div class="page wrap" style="padding-top:2rem;padding-bottom:3rem">
    <div class="kicker">Your trail · on this device only</div><h1 class="display" style="font-size:clamp(3rem,13vw,6rem);margin:.5rem 0 1rem">Where you’ve been</h1>
    <p class="lead" style="max-width:34rem">Not a score. A record of your wandering — the places you’ve read, what you kept, and anything you wrote along the way.</p>
    ${pts.length ? `<svg class="trail-art draw" viewBox="0 0 ${W} ${H}" aria-label="Your reading path"><path d="${path}" fill="none" stroke="var(--ink)" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="2 5" style="--len:3000"/>${pts.map(p => `<a href="#/c/${p[2].id}"><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="7" fill="var(--rc-${p[2].region})"><title>${esc(p[2].title)}</title></circle></a>`).join('')}</svg>` : ''}
    <div style="display:flex;gap:2.5rem;flex-wrap:wrap;margin:1rem 0 2rem"><div><div class="stat">${seen.length}</div><div class="kicker">of ${CONCEPTS.length} places read</div></div><div><div class="stat">${new Set(seen.map(id => byId[id].region)).size}</div><div class="kicker">of ${REGIONS.length} regions touched</div></div></div>
    <div class="section-head"><span class="kicker">Kept</span></div>
    ${kept.length ? `<ul class="paths">${kept.map(id => { const c = byId[id], r = regionById[c.region]; return `<li style="--r:var(--rc-${r.id})"><a href="#/c/${id}">${art(r.art, id, { w: 100, h: 100, cls: 'g' })}<span><span class="t">${esc(c.title)}</span><span class="why">${esc(r.name)}</span></span><span class="arrow">→</span></a></li>`; }).join('')}</ul>` : '<p class="empty">Nothing kept yet. Use “Keep this” at the end of any page.</p>'}
    <div class="section-head"><span class="kicker">Your notes</span>${noteList.length ? '<button class="chip" id="copyNotes" style="cursor:pointer;background:none">Copy all</button>' : ''}</div>
    ${noteList.length ? `<ul class="notes-list">${noteList.map(([k, n]) => `<li style="--rc:var(--rc-${byId[n.concept].region})"><a class="xl" href="#/c/${n.concept}" style="--r:var(--rc-${byId[n.concept].region})">${esc(byId[n.concept].title)}</a><div class="q">${esc(n.q || '')}</div><blockquote>${esc(n.text)}</blockquote></li>`).join('')}</ul>` : '<p class="empty">Reflections and field notes you write will gather here. They never leave your device.</p>'}
    <div style="margin-top:3rem"><button class="btn ghost" id="clearTrail">Clear trail and notes</button></div></div>`;
  document.getElementById('copyNotes')?.addEventListener('click', () => {
    const txt = noteList.map(([, n]) => `${byId[n.concept].title}\n${n.q ? n.q + '\n' : ''}${n.text}\n`).join('\n');
    navigator.clipboard?.writeText(txt).then(() => toast('Notes copied'), () => toast('Copy failed'));
  });
  document.getElementById('clearTrail').addEventListener('click', () => { if (confirm('Clear your reading trail, kept pages and all notes on this device?')) { store.clear(); trail(); toast('Trail cleared'); } });
  requestAnimationFrame(() => main.querySelector('.trail-art')?.classList.add('in'));
}

/* ---------- Method ---------- */
function method() {
  setTitle('Method');
  main.innerHTML = `<div class="page read about" style="padding-top:2rem;padding-bottom:3rem">
    <div class="kicker">About Latitude</div><h1 class="display" style="font-size:clamp(3rem,13vw,5.5rem);margin:.5rem 0 1.2rem">Method</h1>
    <p class="lead">Latitude is an atlas of what a person can become — intellectually, socially, emotionally, aesthetically. It is built on a simple discipline: say how much we actually know.</p>
    <h2>Grades of evidence</h2><p>Personal-development writing routinely presents a single striking study, or an attractive theory, as settled fact. Here, each major claim is tagged:</p>
    <div class="lvl-table">${Object.entries(LEVELS).map(([k, [, d]]) => `<div>${lvl(k)}<p>${d}</p></div>`).join('')}</div>
    <p>Grades are judgments, not certifications. Where the replication record changed a famous finding — power posing, ego depletion, the “93% nonverbal” statistic — the page tells that story, because the correction is itself instructive.</p>
    <h2>What this is not</h2><p>Not a course, not a programme, not a diagnosis. There are no streaks, scores or badges, and nothing here assumes what you lack. It is meant to widen the sense of what is possible and to sharpen the judgment to choose among possibilities.</p>
    <h2>Interactions</h2><p><b>Predict first</b> blocks ask you to commit to a guess before seeing a result — predictions make surprises memorable. <b>Scenarios</b> have no single right answer, only reasoning. <b>Field experiments</b> are optional: small, safe tests of a forecast you hold about the world. <b>Reflections</b> are private and stay on your device.</p>
    <h2>Offline</h2><p>Install Latitude to your home screen from your browser’s menu. Every page and figure is available without a connection once loaded.</p>
    <h2>A caution</h2><p>Nothing here is clinical advice. If fear, low mood or shame are seriously limiting your life, evidence-based therapies (such as CBT and ACT, both referenced throughout) delivered by a qualified professional are far more powerful than reading.</p></div>`;
}

function notFound() {
  setTitle('Uncharted');
  main.innerHTML = `<div class="page read" style="padding:3rem var(--gutter)"><div class="kicker">404 · uncharted</div><h1 class="display" style="font-size:4rem;margin:.5rem 0 1rem">Off the map.</h1><p>This place doesn’t exist yet. The atlas is still being drawn.</p><a class="btn" href="#/">Back to the atlas</a></div>`;
}

/* ---------- Scroll effects ---------- */
const topbar = document.getElementById('topbar'), progress = document.getElementById('progress');
function updateProgress() {
  topbar.classList.toggle('scrolled', scrollY > 8);
  const art = main.querySelector('article');
  if (!art) { progress.style.transform = 'scaleX(0)'; return; }
  const max = art.offsetHeight - innerHeight + art.offsetTop;
  progress.style.setProperty('--r', getComputedStyle(art).getPropertyValue('--rc'));
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, scrollY / Math.max(1, max)))})`;
}
addEventListener('scroll', () => requestAnimationFrame(updateProgress), { passive: true });

let io;
function observeReveals() {
  io?.disconnect();
  const els = main.querySelectorAll('.rv, .draw');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => io.observe(e));
}

/* ---------- Boot ---------- */
route();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => navigator.serviceWorker.register(new URL('../sw.js', import.meta.url)).catch(e => console.warn('SW registration failed', e)));
}
