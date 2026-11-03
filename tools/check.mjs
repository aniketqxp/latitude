// Content integrity check: links, related ids, viz names, thread stops, block types.
import { CONCEPTS } from '../js/content/index.js';
import { REGIONS, THREADS } from '../js/content/regions.js';
import fs from 'node:fs';
const viz = fs.readFileSync(new URL('../js/viz.js', import.meta.url), 'utf8');
const ids = new Set(CONCEPTS.map(c => c.id));
const regions = new Set(REGIONS.map(r => r.id));
const known = ['lede','p','h','pull','evidence','compare','steps','voices','myths','lives','viz','predict','scenario','thought','field','reflect'];
const levels = ['robust','supported','mixed','myth','framework','interpretive'];
const errs = [];
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
console.log(`${CONCEPTS.length} concepts, ${THREADS.length} threads`);
console.log(errs.length ? errs.join('\n') : 'OK');
process.exit(errs.length ? 1 : 0);
