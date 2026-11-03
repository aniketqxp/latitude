// Latitude: a corridor of doors. The shell owns only the corridor, the threshold, the exit
// and the curtain; each encounter owns everything inside its own room.
import { ENCOUNTERS, COLLECTIONS, byId, inCollection } from './encounters/index.js';
import { DOORS } from './doors.js';

// Links from the first edition (#/c/…, #/map, …) now live in the reading room.
if (/^#\/(c|r|t|map|find|trail|method)(\/|$)/.test(location.hash)) location.replace('archive/' + location.hash);

const main = document.getElementById('main');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = s => esc(s).replace(/\*([^*]+)\*/g, '<i>$1</i>');
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const session = {
  get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ---------- Theme ---------- */
const themeBtn = document.getElementById('themeBtn');
const themes = ['auto', 'light', 'dark'];
let theme = 'auto';
try { theme = localStorage.getItem('lat:theme') || 'auto'; } catch {}
if (!themes.includes(theme)) theme = 'auto';
function applyTheme() {
  if (theme === 'auto') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark' || (theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll('meta[name=theme-color]').forEach(m => m.setAttribute('content', dark ? '#0E0D0C' : '#EEE8DC'));
  themeBtn.setAttribute('aria-label', `Theme: ${theme}. Change theme`);
}
applyTheme();
themeBtn.addEventListener('click', () => {
  theme = themes[(themes.indexOf(theme) + 1) % 3];
  try { theme === 'auto' ? localStorage.removeItem('lat:theme') : localStorage.setItem('lat:theme', theme); } catch {}
  document.startViewTransition && !reduced() ? document.startViewTransition(applyTheme) : applyTheme();
  toast(theme === 'auto' ? 'Lights follow your device' : theme === 'light' ? 'Lights on' : 'Lights off');
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

const toastEl = document.getElementById('toast'); let toastT;
function toast(msg) { toastEl.textContent = msg; toastEl.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('on'), 2400); }

/* ---------- Curtain: the discreet layer where sources and caveats live ---------- */
const curtain = document.getElementById('curtain');
const curtainBtn = document.getElementById('curtainBtn');
let curtainData = null;
function openCurtain() {
  if (!curtainData) return;
  const { real = [], invented = [], open = [], sources = [] } = curtainData;
  const list = (h, items) => items.length ? `<section><h3>${h}</h3><ul>${items.map(i => `<li>${md(i)}</li>`).join('')}</ul></section>` : '';
  curtain.innerHTML = `<div class="drape" aria-hidden="true"></div>
    <header><p class="cap">Behind the curtain</p><h2 id="curtainTitle">${esc(curtainData.title)}</h2>
    <button class="ibtn round close" aria-label="Close" data-close><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></header>
    ${list('What’s real', real)}${list('What’s made up', invented)}${list('Still open', open)}
    ${sources.length ? `<section class="src"><h3>Sources</h3><ol>${sources.map(s => `<li>${md(s)}</li>`).join('')}</ol></section>` : ''}`;
  curtain.querySelector('[data-close]').addEventListener('click', () => curtain.close());
  curtain.showModal();
}
curtainBtn.addEventListener('click', openCurtain);
curtain.addEventListener('click', e => { if (e.target === curtain) curtain.close(); }); // backdrop click

/* ---------- Router ---------- */
let cleanup = null;
function route() {
  if (curtain.open) curtain.close();
  // Read the hash when the update actually runs: a view transition defers it, and a quick
  // second navigation can skip the first transition while its callback still fires.
  const go = () => {
    if (cleanup) { try { cleanup(); } catch (e) { console.error(e); } cleanup = null; }
    const m = location.hash.match(/^#\/e\/([a-z-]+)$/);
    if (m && byId[m[1]]) return encounter(byId[m[1]]);
    return location.hash === '#/index' ? index() : corridor();
  };
  document.startViewTransition && !reduced() && main.childElementCount ? document.startViewTransition(go) : go();
}
addEventListener('hashchange', route);

/* ---------- Corridor ---------- */
// A collection's doors, in order. Shuffled wings are shuffled once per visit (the rooms
// shouldn't be learnable); authored wings keep the order the registry gives them.
function doorOrder(c) {
  const ids = inCollection(c.id).map(e => e.id);
  if (c.order !== 'shuffle') return ids;
  let o = session.get('lat:order:' + c.id);
  if (!Array.isArray(o) || o.length !== ids.length || !ids.every(id => o.includes(id))) {
    o = ids.slice();
    for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
    session.set('lat:order:' + c.id, o);
  }
  return o;
}
const chev = d => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d ? 'M9 5l7 7-7 7' : 'M15 5l-7 7 7 7'}"/></svg>`;

function corridor() {
  document.body.dataset.world = 'corridor';
  document.title = 'Latitude';
  curtainBtn.hidden = true; curtainData = null;
  const seen = session.get('lat:seen') || [];
  const slides = [
    `<article class="slide intro" data-i="0">
      <p class="cap">la·ti·tude <span>noun</span></p>
      <h1 class="def"><span class="n">1</span> Distance from the equator. <span class="n">2</span> <em>Room to move.</em></h1>
      <p class="sub">This is a corridor. Behind each door is a small, strange thing about being a person. None of them is a lesson.</p>
      <button class="walk-on" data-walk="1">Walk ${chev(1)}</button>
      <a class="to-index" href="#/index">or see every door, listed</a>
    </article>`,
    ...COLLECTIONS.flatMap(c => [
      // A placard at the head of each wing.
      `<article class="slide placard" data-collection="${c.id}">
        <div class="plaque">
          <p class="plaque-n" aria-hidden="true">${c.numeral}</p>
          <h2 class="plaque-t">${esc(c.title)}</h2>
          <p class="plaque-note">${esc(c.note)}</p>
        </div>
      </article>`,
      ...doorOrder(c).map(id => {
        const e = byId[id];
        return `<article class="slide door-slide" data-door="${e.door}">
          <a class="door-link" href="#/e/${e.id}" aria-label="Open the door: ${esc(e.title)}. ${esc(e.line)}">${DOORS[e.door]()}</a>
          <p class="inscription">${esc(e.line)}</p>
          <p class="medium">${esc(e.medium)}${seen.includes(e.id) ? ' · <span class="been">you’ve been in</span>' : ''}</p>
        </article>`;
      })
    ]),
    `<article class="slide door-slide" data-door="building">
      <button class="door-link" id="unbuilt" aria-label="A door still being built">${DOORS.building()}</button>
      <p class="inscription" id="unbuiltLine">This one isn’t finished.</p>
      <p class="medium">something is hammering</p>
    </article>`,
    `<article class="slide door-slide" data-door="hatch">
      <a class="door-link" href="archive/" aria-label="Enter the reading room">${DOORS.hatch()}</a>
      <p class="inscription">The old library. Long, footnoted, perfectly quiet.</p>
      <p class="medium">fifty-three essays from the first edition</p>
    </article>`
  ];
  main.innerHTML = `<section class="corridor" aria-label="The corridor">
    <div class="track" id="track" tabindex="0" aria-label="Doors. Scroll sideways or use the arrows.">${slides.join('')}</div>
    <button class="walk prev" aria-label="Previous door">${chev(0)}</button>
    <button class="walk next" aria-label="Next door">${chev(1)}</button>
    <div class="wall" aria-hidden="true"></div>
  </section>`;

  const track = main.querySelector('#track');
  const all = [...track.children];
  const at = () => Math.round(track.scrollLeft / all[0].offsetWidth);
  const walk = i => all[Math.max(0, Math.min(all.length - 1, i))].scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  main.querySelector('.prev').onclick = () => walk(at() - 1);
  main.querySelector('.next').onclick = () => walk(at() + 1);
  main.querySelector('[data-walk]').onclick = () => walk(1);

  // Depth: each slide knows how far it is from the centre, and the CSS leans on that.
  let raf = 0;
  const depth = () => {
    raf = 0;
    const mid = track.scrollLeft + track.clientWidth / 2;
    for (const s of all) {
      const d = Math.max(-1.5, Math.min(1.5, (s.offsetLeft + s.offsetWidth / 2 - mid) / s.offsetWidth));
      s.style.setProperty('--d', d.toFixed(3)); s.style.setProperty('--ad', Math.abs(d).toFixed(3));
    }
    const i = at();
    main.querySelector('.prev').disabled = i <= 0;
    main.querySelector('.next').disabled = i >= all.length - 1;
    session.set('lat:pos', i);
  };
  track.addEventListener('scroll', () => { raf ||= requestAnimationFrame(depth); }, { passive: true });
  addEventListener('resize', depth);
  const pos = session.get('lat:pos');
  if (pos) track.scrollLeft = pos * all[0].offsetWidth;
  depth();
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); walk(at() + (e.key === 'ArrowRight' ? 1 : -1)); }
  });

  // Opening: the panel swings on its hinge and light comes through before the room arrives.
  track.querySelectorAll('a.door-link').forEach(a => a.addEventListener('click', e => {
    if (reduced() || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    a.closest('.slide').classList.add('opening');
    navigator.vibrate?.(12);
    setTimeout(() => { a.getAttribute('href').startsWith('#') ? (location.hash = a.getAttribute('href')) : (location.href = a.href); }, 620);
  }));
  const lines = ['This one isn’t finished.', 'Still not finished.', 'Someone inside says “nearly.”', 'They have been saying “nearly” for a while.', 'You could knock again. It won’t help.'];
  let knocks = 0;
  track.querySelector('#unbuilt').onclick = e => {
    const b = e.currentTarget; b.classList.remove('rattle'); void b.offsetWidth; b.classList.add('rattle');
    navigator.vibrate?.([8, 40, 8]);
    track.querySelector('#unbuiltLine').textContent = lines[Math.min(++knocks, lines.length - 1)];
  };
  cleanup = () => removeEventListener('resize', depth);
}

/* ---------- The index: every door as a line of type ---------- */
// The corridor is for wandering; past a few dozen doors, nobody wanders. The index is how
// a large collection stays findable without becoming a menu.
function index() {
  document.body.dataset.world = 'corridor';
  document.title = 'Index of first lines — Latitude';
  curtainBtn.hidden = true; curtainData = null;
  const seen = session.get('lat:seen') || [];
  main.innerHTML = `<section class="index">
    <p class="cap">Index of first lines</p>
    <h1 class="index-t">Every door</h1>
    ${COLLECTIONS.map(c => `<section class="ix-wing" aria-labelledby="ix-${c.id}">
      <h2 id="ix-${c.id}"><span class="ix-n">${c.numeral}</span> ${esc(c.title)}</h2>
      <p class="ix-note">${esc(c.note)}</p>
      <ol>${inCollection(c.id).map(e => `<li><a href="#/e/${e.id}">
        <span class="ix-line">${esc(e.line)}</span>
        <span class="ix-meta">${esc(e.title)} · ${esc(e.medium)}${seen.includes(e.id) ? ' · <span class="been">you’ve been in</span>' : ''}</span></a></li>`).join('')}</ol>
    </section>`).join('')}
    <a class="exit-back" href="#/">Back to the corridor</a>
  </section>`;
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

/* ---------- An encounter ---------- */
const loadedCSS = new Map();
function css(id) {
  if (!loadedCSS.has(id)) loadedCSS.set(id, new Promise(res => {
    const l = Object.assign(document.createElement('link'), { rel: 'stylesheet', href: `css/encounters/${id}.css` });
    l.onload = l.onerror = res;
    document.head.appendChild(l);
  }));
  return loadedCSS.get(id);
}

async function encounter(e) {
  document.body.dataset.world = e.id;
  document.title = `${e.title} — Latitude`;
  curtainBtn.hidden = true;
  // Authored wings read like a book: the exit offers the next one. Elsewhere, any other door.
  const wing = inCollection(e.collection);
  const others = ENCOUNTERS.filter(x => x.id !== e.id);
  const authored = COLLECTIONS.find(c => c.id === e.collection)?.order === 'authored';
  const next = (authored && wing[wing.indexOf(e) + 1]) || others[Math.floor(Math.random() * others.length)];
  main.innerHTML = `<div class="room" id="stage" aria-busy="true"><p class="arriving">…</p></div>
    <nav class="exit" aria-label="Leave">
      <a class="exit-next" href="#/e/${next.id}"><span class="cap">Another door</span><span class="exit-line">${esc(next.line)}</span></a>
      <a class="exit-back" href="#/">Back to the corridor</a>
    </nav>`;
  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
  const stage = main.querySelector('#stage');
  const token = location.hash;
  try {
    const [mod] = await Promise.all([e.load(), css(e.id)]);
    if (location.hash !== token || !stage.isConnected) return; // walked away, or a newer render took over
    stage.innerHTML = '';
    stage.removeAttribute('aria-busy');
    cleanup = mod.mount(stage, { reduced: reduced(), haptic: p => navigator.userActivation?.hasBeenActive !== false && navigator.vibrate?.(p), toast }) || null;
    curtainData = { title: e.title, ...mod.curtain };
    curtainBtn.hidden = false;
    const seen = session.get('lat:seen') || [];
    if (!seen.includes(e.id)) session.set('lat:seen', [...seen, e.id]);
  } catch (err) {
    console.error(err);
    stage.innerHTML = `<p class="arriving">This door is stuck. <a href="#/">Back to the corridor</a>.</p>`;
  }
}

route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(e => console.warn('SW registration failed', e)));
}
