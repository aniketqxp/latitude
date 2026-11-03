// The registry of doors. An encounter is anything that can mount itself into a stage:
// js/encounters/<id>.js exports mount(stage, api) -> cleanup, plus `curtain` (what's real,
// what's invented, what's still open, what to read). Its stylesheet lives at
// css/encounters/<id>.css. Most stories are built on js/book.js; nothing here requires it.
//
// Encounters belong to collections. A collection is a wing of the corridor with a placard;
// `order: 'shuffle'` rearranges its doors each visit, `'authored'` keeps them as listed.
// See docs/WORKFLOW.md for how a story gets from a lead to a door.
export const COLLECTIONS = [
  { id: 'rooms', numeral: 'I', title: 'Rooms', note: 'Three small machines for trying things.', order: 'shuffle' },
  { id: 'notice', numeral: 'II', title: 'Worthy of Notice', note: 'Five picture books. Four of them happened, more or less.', order: 'authored' }
];

export const ENCOUNTERS = [
  {
    id: 'dancefloor', collection: 'rooms',
    title: 'The Empty Dance Floor',
    line: 'Someone has to dance first.',
    medium: 'a party, simulated',
    door: 'arch',
    load: () => import('./dancefloor.js')
  },
  {
    id: 'ship', collection: 'rooms',
    title: 'The Ship of You',
    line: 'Most of you has been replaced. Please remain calm.',
    medium: 'a fable with moving parts',
    door: 'porthole',
    load: () => import('./ship.js')
  },
  {
    id: 'permits', collection: 'rooms',
    title: 'Department of Permissions',
    line: 'Permits are issued on the fourth floor.',
    medium: 'a small bureaucracy',
    door: 'office',
    load: () => import('./permits.js')
  },
  {
    id: 'leavitt', collection: 'notice',
    title: 'It Is Worthy of Notice',
    line: 'It is worthy of notice.',
    medium: 'an illustrated book',
    door: 'dome',
    load: () => import('./leavitt.js')
  },
  {
    id: 'norton', collection: 'notice',
    title: 'His Imperial Majesty',
    line: 'Congress continued.',
    medium: 'a picture book',
    door: 'crown',
    load: () => import('./norton.js')
  },
  {
    id: 'haber', collection: 'notice',
    title: 'Bread from Air',
    line: 'Breathe in.',
    medium: 'an illustrated book, in two colours',
    door: 'lab',
    load: () => import('./haber.js')
  },
  {
    id: 'tuesday', collection: 'notice',
    title: 'Tuesday, with Notes',
    line: 'The notes to this page have not been written.',
    medium: 'fiction, annotated',
    door: 'front',
    load: () => import('./tuesday.js')
  },
  {
    id: 'sameface', collection: 'notice',
    title: 'The Same Face',
    line: 'What is he feeling?',
    medium: 'a silent film',
    door: 'cinema',
    load: () => import('./sameface.js')
  }
];

export const byId = Object.fromEntries(ENCOUNTERS.map(e => [e.id, e]));
export const inCollection = id => ENCOUNTERS.filter(e => e.collection === id);
