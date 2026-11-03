// Integrity check. The world: every encounter registers cleanly, exports mount + curtain,
// and has its stylesheet; every precached file exists. The archive: links, related ids,
// viz names, thread stops, block types.
import { ENCOUNTERS } from '../js/encounters/index.js';
import { DOORS } from '../js/doors.js';
import { CONCEPTS } from '../js/content/index.js';
import { REGIONS, THREADS } from '../js/content/regions.js';
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const exists = p => fs.existsSync(new URL(p, root));
const errs = [];

// --- the world
const eids = new Set();
for (const e of ENCOUNTERS) {
  if (eids.has(e.id)) errs.push(`encounter: dup id ${e.id}`); eids.add(e.id);
  for (const k of ['title', 'line', 'medium', 'door']) if (!e[k]) errs.push(`${e.id}: missing ${k}`);
  if (!DOORS[e.door]) errs.push(`${e.id}: unknown door ${e.door}`);
  if (!exists(`css/encounters/${e.id}.css`)) errs.push(`${e.id}: no css/encounters/${e.id}.css`);
  try {
    const mod = await e.load();
    if (typeof mod.mount !== 'function') errs.push(`${e.id}: no mount()`);
    const c = mod.curtain;
    if (!c) errs.push(`${e.id}: no curtain`);
    else for (const k of ['real', 'invented', 'open', 'sources']) if (!Array.isArray(c[k])) errs.push(`${e.id}: curtain.${k} not a list`);
    if (c && !c.invented?.length) errs.push(`${e.id}: curtain must say what is invented`);
  } catch (err) { errs.push(`${e.id}: failed to load (${err.message})`); }
}
const sw = fs.readFileSync(new URL('sw.js', root), 'utf8');
const shell = JSON.parse(sw.match(/const SHELL = (\[[\s\S]*?\]);/)[1].replace(/\/\/.*$/gm, '').replace(/'/g, '"').replace(/,\s*\]/, ']'));
for (const p of shell) if (p !== './' && !exists(p)) errs.push(`sw.js precaches missing ${p}`);
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
console.log(errs.length ? errs.join('\n') : 'OK');
process.exit(errs.length ? 1 : 0);
