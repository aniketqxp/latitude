// Tuesday, with Notes: a fiction. One ordinary diary entry and two later editions that
// annotate it, a reverent centenary edition (2127) and a revisionist one (2191). The lens
// switches between them. This is the founding brief's hundred-years-on image made into a
// mechanism: significance is something later readers build, and argue over.
import { book, svg } from '../book.js';

export const curtain = {
  real: [
    'Nothing. Ines Morrow, the Morrow Lines, both editions and every person in this story are invented.',
    'Pollinator corridors are a real idea: linked strips of wildflower habitat through farmland and cities. Several countries and cities have begun planting them.'
  ],
  invented: [
    'Everything else: the diary, the bus, the man at the stop, Fenn Road, Mr K, the bee book, Aunt Rosa, the canal, Lock 9, the interview, and the scholars of 2127 and 2191.',
    '*Bees of Field and Hedgerow* (1998) is not a real book.'
  ],
  open: [
    'The story deliberately does not decide which edition is right. Both are partly wrong, in different directions.',
    'Rule broken, on purpose (see EDITORIAL §11): this story has a lens, a control most stories don’t need. Here the switch is the argument, because the same line reads differently depending on who is annotating it.'
  ],
  sources: [
    'None for the story. Its form owes something to annotated editions in general, and to Nabokov’s *Pale Fire* in particular, where the notes take over the poem.'
  ]
};

/* ---------- Drawings ---------- */
const notebook = `
  <rect class="tu-desk" width="400" height="700"/>
  <g transform="rotate(-5 200 360)">
    <rect class="tu-shadow" x="76" y="150" width="262" height="380" rx="8"/>
    <rect class="tu-cover" x="68" y="140" width="262" height="380" rx="8"/>
    <rect class="tu-band" x="292" y="140" width="14" height="380"/>
    <rect class="tu-label" x="110" y="210" width="150" height="70" rx="3"/>
    <text class="tu-hand" x="185" y="246" text-anchor="middle">2027</text>
    <text class="tu-hand sm" x="185" y="268" text-anchor="middle">I. M.</text>
  </g>
  <path class="tu-pencil" d="M262 600l110-46"/>`;

// Today's date, as the diary would write it.
const today = () => new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

/* ---------- The book ---------- */
const E = (line, n, c, r) => ({ layout: 'text', cls: 'tu-diary', size: 'm', inlineNotes: true, turn: 'fade', eyebrow: n === 1 ? 'Tuesday, 9 March 2027' : null,
  text: [line], notes: { [n]: { c, r } } });

export const story = {
  id: 'tuesday',
  title: 'Tuesday, with Notes',
  turn: 'leaf',
  lens: { label: 'Edition', options: [{ id: 'c', label: '2127' }, { id: 'r', label: '2191' }], default: 'c', from: 'intro' },
  pages: [
    { layout: 'cover', art: svg('0 0 400 700', notebook), alt: 'A worn notebook on a desk, labelled 2027 and initialled I. M., with a pencil beside it.',
      eyebrow: 'A fiction', text: 'An ordinary day, and the scholars who came after it' },
    { id: 'intro', layout: 'text', size: 's',
      text: ['Ines Morrow is remembered for the Morrow Lines: wildflower corridors running through four hundred cities.',
        'This is one entry from her diary, written on an ordinary Tuesday, years before any of it.',
        'Two later editions annotate it. Choose one at the top of the page. You can switch whenever you like.'] },
    E('Tues. Rain. Missed the 14 by about four seconds[^1] so walked.', 1,
      'The most famous missed bus in history. Had she caught it, she would never have walked down Fenn Street, and none of what followed would have happened.',
      'The 2027 timetable shows the 14 ran four minutes late that morning. She did not miss it by four seconds. She gave up and walked off before it came.'),
    E('Argued with a man at the stop about whether it had been four seconds.[^2]', 2,
      'The stranger was never identified. Scholars agree the exchange sharpened her famous resolve.',
      'His diary surfaced in 2188: “Woman at the stop argued with me about the 14. She was right.” It was the only time that year anyone wrote that she was right. She never read it.'),
    E('Bread from the place on Fenn St. They had the seeded one.[^3]', 3,
      'A plaque now marks the bakery at 22 Fenn Street. Pilgrims buy the seeded loaf.',
      'There was no Fenn Street. It was Fenn Road. The plaque is on the wrong building, in the wrong street, and the bakery that sells the loaf opened in 2104.'),
    E('Work. Nothing. Mr K says the reorganisation is ‘soon’.[^4]', 4,
      'Within the month the reorganisation cost her the job, and freed her to begin her true work.',
      'Personnel files released in 2183 suggest she asked to be included in the redundancies. Whether to begin anything, the files do not say.'),
    E('Library. Took out a book about bees for no reason. Read 11 pages.[^5]', 5,
      '*Bees of Field and Hedgerow* (1998). Every Morrow Line begins here, with “no reason”: the most famous understatement of the century.',
      'Returned eleven days overdue and, by the evidence of the library’s condition notes, never opened past page 11. The Lines began elsewhere. See note 6.'),
    E('Didn’t ring Aunt Rosa. Will ring her Thurs.[^6]', 6,
      'Rosa Morrow died on the Saturday. The call was never made. Biographers call it the first of her great regrets.',
      'Rosa died on the Saturday. She left Ines four beehives, in a garden Ines had to clear within the month. Ines spent the summer finding out what to do with them. That is where the Lines began.'),
    E('Sat on the wall by the canal for a bit. It stopped raining.[^7]', 7,
      'Here, on the wall at Lock 9, she resolved to change the world.',
      'Earlier editions say “resolved”. The diary says “sat”. The wall at Lock 9 is now the first mile of the first Morrow Line. That is true either way.'),
    { layout: 'text', size: 's', eyebrow: { c: 'Afterword, centenary edition, 2127', r: 'Afterword, revised edition, 2191' },
      text: {
        c: ['Every great life has a day like this one, when nothing seems to happen.', 'Read it again. The bus, the argument, the bees, the wall. Everything is already here.'],
        r: ['Nothing in this entry caused anything. It was a Tuesday.', 'Four hives arrived the following week, by accident. She did something with them, and kept doing it for sixty years.', 'We have stopped pretending to know how one became the other.']
      } },
    { layout: 'text', size: 'm', turn: 'fade',
      text: ['In her last interview, at ninety-one, she was asked what she remembered of 9 March 2027.', '“Nothing,” she said. “Was it a Tuesday?”'] },
    { layout: 'text', cls: 'tu-diary tu-today', size: 'm', turn: 'drift',
      eyebrow: () => today(),
      text: () => [`${['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'][new Date().getDay()]}.`, 'The notes to this page have not been written.'] }
  ]
};

export const mount = (stage, api) => book(stage, story, api);
