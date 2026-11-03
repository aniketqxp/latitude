// Integrity check. The world: every encounter registers cleanly, exports mount + curtain,
// and has its stylesheet; every precached file exists. Books (stories built on js/book.js):
// pages resolve under every lens, art has alt text, note markers have notes, links land,
// and no single beat is longer than a picture-book page can carry. The archive: links,
// related ids, viz names, thread stops, block types.
import { ENCOUNTERS, COLLECTIONS } from '../js/encounters/index.js';
import { plain } from '../js/book.js';
import { DOORS } from '../js/doors.js';
import { CONCEPTS } from '../js/content/index.js';
import { REGIONS, THREADS } from '../js/content/regions.js';
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const exists = p => fs.existsSync(new URL(p, root));
const errs = [], warns = [];

// --- the world
const eids = new Set();
for (const e of ENCOUNTERS) {
  if (eids.has(e.id)) errs.push(`encounter: dup id ${e.id}`); eids.add(e.id);
  for (const k of ['title', 'line', 'medium', 'door', 'collection']) if (!e[k]) errs.push(`${e.id}: missing ${k}`);
  if (e.collection && !COLLECTIONS.some(c => c.id === e.collection)) errs.push(`${e.id}: unknown collection ${e.collection}`);
  if (!DOORS[e.door]) errs.push(`${e.id}: unknown door ${e.door}`);
  if (!exists(`css/encounters/${e.id}.css`)) errs.push(`${e.id}: no css/encounters/${e.id}.css`);
  try {
    const mod = await e.load();
    if (typeof mod.mount !== 'function') errs.push(`${e.id}: no mount()`);
    const c = mod.curtain;
    if (!c) errs.push(`${e.id}: no curtain`);
    else for (const k of ['real', 'invented', 'open', 'sources']) if (!Array.isArray(c[k])) errs.push(`${e.id}: curtain.${k} not a list`);
    if (c && !c.invented?.length) errs.push(`${e.id}: curtain must say what is invented`);
    if (mod.story) checkBook(e.id, mod.story);
  } catch (err) { errs.push(`${e.id}: failed to load (${err.message})`); }
}
// --- books
function checkBook(id, story) {
  const P = story.pages || [];
  const err = m => errs.push(`${id}: ${m}`), warn = m => warns.push(`${id}: ${m}`);
  if (story.id !== id) err(`story.id is ${story.id}`);
  if (!P.length) return err('book has no pages');
  const pids = new Set(P.map(p => p.id).filter(Boolean));
  const lenses = story.lens ? story.lens.options.map(o => o.id) : [null];
  const layouts = ['cover', 'under', 'over', 'full', 'text', 'card'];
  const lands = to => to == null || (typeof to === 'number' ? to >= 0 && to < P.length : pids.has(to));
  for (const lens of lenses) P.forEach((p, i) => {
    const at = `page ${i + 1}${p.id ? ` (${p.id})` : ''}${lens ? ` [${lens}]` : ''}`;
    const c = { story, page: p, index: i, total: P.length, lens, state: {}, beat: 0, api: {}, next() {}, go() {} };
    const val = v => {
      if (typeof v === 'function') { try { return v(c); } catch (x) { err(`${at}: function threw (${x.message})`); return null; } }
      if (v && story.lens && typeof v === 'object' && !Array.isArray(v)) {
        const keys = Object.keys(v);
        if (keys.length && keys.every(k => lenses.includes(k))) return v[lens];
      }
      return v;
    };
    if (!layouts.includes(p.layout || 'under')) err(`${at}: layout ${p.layout}`); // book.js defaults to 'under'
    if (p.art && !val(p.alt)) err(`${at}: art without alt`);
    const text = [].concat(val(p.text) ?? []);
    if (!text.length && !p.art && !p.title) err(`${at}: empty page`);
    if (text.some(t => typeof t === 'function')) err(`${at}: a function inside a text array is never resolved; make text itself a function`);
    const notes = val(p.notes) || {};
    for (const t of text.filter(t => typeof t === 'string')) {
      for (const [, n] of t.matchAll(/\[\^(\w+)\]/g)) if (!(n in notes)) err(`${at}: marker [^${n}] has no note`);
      const w = plain(t).split(/\s+/).filter(Boolean).length;
      if (w > 60) err(`${at}: a beat of ${w} words`); else if (w > 42) warn(`${at}: a beat of ${w} words`);
    }
    for (const ch of p.choices || []) if (!lands(ch.to)) err(`${at}: choice goes to ${ch.to}`);
    if (p.choices && !p.key) warn(`${at}: choices without a key are not remembered`);
    if (!lands(p.next)) err(`${at}: next goes to ${p.next}`);
  });
  if (story.lens && !lands(story.lens.from)) err(`lens.from ${story.lens.from} is not a page`);
}

const sw = fs.readFileSync(new URL('sw.js', root), 'utf8');
const shell = JSON.parse(sw.match(/const SHELL = (\[[\s\S]*?\]);/)[1].replace(/\/\/.*$/gm, '').replace(/'/g, '"').replace(/,\s*\]/, ']'));
for (const p of shell) if (p !== './' && !exists(p)) errs.push(`sw.js precaches missing ${p}`);
for (const p of ['js/book.js', 'css/book.css']) if (!shell.includes(p)) errs.push(`sw.js does not precache ${p}`);
for (const e of ENCOUNTERS) for (const p of [`js/encounters/${e.id}.js`, `css/encounters/${e.id}.css`]) if (!shell.includes(p)) errs.push(`sw.js does not precache ${p}`);

// --- the archive
const viz = fs.readFileSync(new URL('js/viz.js', root), 'utf8');
const ids = new Set(CONCEPTS.map(c => c.id));
const regions = new Set(REGIONS.map(r => r.id));
const known = ['lede','p','h','pull','evidence','compare','steps','voices','myths','lives','viz','predict','scenario','thought','field','reflect'];
const levels = ['robust','supported','mixed','myth','framework','interpretive'];
const seen = new Set();
for (const c of CONCEPTS) {
  if (seen.has(c.id)) errs.push(`dup id ${c.id}`); seen.add(c.id);
  if (!regions.has(c.region)) errs.push(`${c.id}: bad region ${c.region}`);
  if (!levels.includes(c.level)) errs.push(`${c.id}: bad level ${c.level}`);
  for (const [r] of c.related || []) if (!ids.has(r)) errs.push(`${c.id}: related -> ${r}`);
  const s = JSON.stringify(c);
  for (const m of s.matchAll(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g)) if (!ids.has(m[1])) errs.push(`${c.id}: link -> ${m[1]}`);
  for (const b of c.blocks) {
    if (!known.includes(b.t)) errs.push(`${c.id}: block ${b.t}`);
    if (b.t === 'evidence' && !levels.includes(b.level)) errs.push(`${c.id}: evidence level ${b.level}`);
    if (b.t === 'viz' && !new RegExp(`^V\\.${b.name} =`, 'm').test(viz)) errs.push(`${c.id}: viz ${b.name}`);
  }
}
for (const t of THREADS) for (const s of t.stops) if (!ids.has(s)) errs.push(`thread ${t.id}: stop ${s}`);
for (const r of REGIONS) if (!CONCEPTS.some(c => c.region === r.id)) errs.push(`empty region ${r.id}`);
console.log(`${ENCOUNTERS.length} encounters, ${shell.length} precached files · archive: ${CONCEPTS.length} concepts, ${THREADS.length} threads`);
if (warns.length) console.log('warnings:\n  ' + warns.join('\n  '));
console.log(errs.length ? errs.join('\n') : 'OK');
process.exit(errs.length ? 1 : 0);
