// The registry of doors. An encounter is anything that can mount itself into a stage:
// js/encounters/<id>.js exports mount(stage, api) -> cleanup, plus `curtain` (what's real,
// what's invented, what to read). Its stylesheet lives at css/encounters/<id>.css.
// Nothing here constrains the medium — that is the point.
export const ENCOUNTERS = [
  {
    id: 'dancefloor',
    title: 'The Empty Dance Floor',
    line: 'Someone has to dance first.',
    medium: 'a party, simulated',
    door: 'arch',
    load: () => import('./dancefloor.js')
  },
  {
    id: 'ship',
    title: 'The Ship of You',
    line: 'Most of you has been replaced. Please remain calm.',
    medium: 'a fable with moving parts',
    door: 'porthole',
    load: () => import('./ship.js')
  },
  {
    id: 'permits',
    title: 'Department of Permissions',
    line: 'Permits are issued on the fourth floor.',
    medium: 'a small bureaucracy',
    door: 'office',
    load: () => import('./permits.js')
  }
];

export const byId = Object.fromEntries(ENCOUNTERS.map(e => [e.id, e]));
