// The Same Face: Kuleshov's experiment, performed on the reader, then honestly unpicked.
// Silent-film grammar: intertitle cards, hard cuts, one face. Choices are the only
// interaction, and they are the experiment. Nothing is scored. The reveal just shows
// your words back to you.
import { book, svg, rng } from '../book.js';

export const curtain = {
  real: [
    'Lev Kuleshov (1899–1970) began making films as a teenager and taught at the Moscow film school after the Revolution. Around 1918–1921 he cut together experiments with existing footage, which became known as the Kuleshov effect.',
    'The most famous version intercuts a neutral close-up of the actor Ivan Mozzhukhin with other shots. Vsevolod Pudovkin’s account says audiences praised the acting, and that they “raved about the acting of the artist”.',
    'No print of the experiment survives. Kuleshov and Pudovkin described it differently: soup, a coffin and a woman on a divan in one telling; a dead woman and a child playing in another.',
    'Prince and Hensley (1992) attempted a close replication and found no effect. Later studies, for example Mobbs et al. (2006) and Barratt et al. (2016), found that context does shift how faces are read, more modestly than the legend suggests.',
    'Mozzhukhin (1889–1939) emigrated after the Revolution, via Crimea and Constantinople, and became a star of French silent cinema as Ivan Mosjoukine. His career faded with the arrival of sound, and he died near Paris in 1939, aged forty-nine.'
  ],
  invented: [
    'Every frame is a drawing. The face is a generic face, not Mozzhukhin’s.',
    'The order of shots and the question “What is he feeling?” are ours. We do not know exactly what the original audiences were asked, if anything.'
  ],
  open: [
    'Whether the experiment happened as described, how large any effect was, and how much the story grew in the retelling.',
    'The book shows you your own answers once, then forgets them. Nothing is stored.'
  ],
  sources: [
    'Pudovkin, V. I. (1929/1958). *Film Technique and Film Acting*, trans. I. Montagu. Vision Press.',
    'Kuleshov, L. (1974). *Kuleshov on Film*, ed. and trans. R. Levaco. University of California Press.',
    'Prince, S. & Hensley, W. E. (1992). The Kuleshov effect: Recreating the classic experiment. *Cinema Journal*, 31(2), 59–75.',
    'Mobbs, D. et al. (2006). The Kuleshov Effect: the influence of contextual framing on emotional attributions. *Social Cognitive and Affective Neuroscience*, 1(2), 95–106.',
    'Barratt, D. et al. (2016). Does the Kuleshov effect really exist? *i-Perception*, 7(4).'
  ]
};

/* ---------- Drawings: frames of film ---------- */
const sprockets = `<g class="sf-sprockets">${Array.from({ length: 12 }, (_, k) => `<rect x="6" y="${k * 36 + 10}" width="14" height="18" rx="3"/><rect x="380" y="${k * 36 + 10}" width="14" height="18" rx="3"/>`).join('')}</g>`;
const frame = body => `<rect class="sf-black" width="400" height="430"/>${sprockets}<g class="sf-shot"><rect class="sf-bg" x="30" y="20" width="340" height="390"/>${body}</g><rect class="sf-vignette" x="30" y="20" width="340" height="390"/>`;
const F = body => svg('0 0 400 430', frame(body));

// The face: a man looking slightly past the camera, giving nothing away.
const face = (dx = 0, dy = 0, s = 1) => `<g transform="translate(${200 + dx} ${215 + dy}) scale(${s})">
  <path class="sf-dark" d="M-150 200c10-80 50-110 150-114 100 4 140 34 150 114z"/>
  <path class="sf-collar" d="M-40 92l40 40 40-40-20-6-20 26-20-26z"/>
  <path class="sf-skin" d="M-34 70h68l-6 32h-56z"/>
  <ellipse class="sf-skin" cx="0" cy="-6" rx="78" ry="98"/>
  <path class="sf-dark" d="M-80-30c-6-70 26-104 80-106 56 2 88 36 80 106-8-36-24-58-38-64-30 14-74 12-102-4-12 16-18 40-20 68z"/>
  <path class="sf-brow" d="M-50-24q18-8 34-2M16-26q18-6 34 2"/>
  <ellipse class="sf-eye" cx="-31" cy="-4" rx="13" ry="6"/><ellipse class="sf-eye" cx="33" cy="-4" rx="13" ry="6"/>
  <circle class="sf-iris" cx="-26" cy="-4" r="5"/><circle class="sf-iris" cx="38" cy="-4" r="5"/>
  <path class="sf-line" d="M2 4q-6 26-10 34 6 6 16 2"/>
  <path class="sf-line" d="M-22 62q22 4 44 0"/>
</g>`;
const soup = `<g transform="translate(200 250)"><path class="sf-light" d="M-150 30h300v130h-300z"/>
  <ellipse class="sf-mid" cx="0" cy="20" rx="120" ry="40"/><ellipse class="sf-dark" cx="0" cy="12" rx="104" ry="30"/><ellipse class="sf-mid soup" cx="0" cy="14" rx="94" ry="24"/>
  <path class="sf-steam" d="M-30-20q-14-30 0-60t0-60M10-20q-14-30 0-60t0-60M48-24q-12-26 0-52"/>
  <path class="sf-mid" d="M130-10l20 6-6 40-20-4z"/></g>`;
const coffin = `<g transform="translate(200 230)"><path class="sf-mid" d="M-60-170h120l40 70-30 270h-140l-30-270z"/>
  <path class="sf-light" d="M-48-156h96l32 58-26 252h-108l-26-252z"/>
  <ellipse class="sf-skin" cx="0" cy="-104" rx="26" ry="32"/><path class="sf-dark" d="M-28-110c0-30 56-30 56 0-10-12-46-12-56 0z"/>
  <path class="sf-mid" d="M-14 -40h28M-10-20q10 6 20 0"/><path class="sf-line" d="M-6-92h12"/>
  <g class="sf-flowers">${[-40, -20, 0, 20, 40].map((x, k) => `<circle cx="${x}" cy="${-30 + (k % 2) * 8}" r="7"/>`).join('')}</g></g>`;
const divan = `<g><path class="sf-mid" d="M40 280h320v70H40z"/><path class="sf-dark" d="M40 240c0-40 20-50 40-50v90H40zM360 240c0-40-20-50-40-50v90h40z"/>
  <path class="sf-light" d="M80 276c40-30 100-40 160-36s80 10 90 20l-6 16z"/>
  <ellipse class="sf-skin" cx="292" cy="236" rx="22" ry="26"/><path class="sf-dark" d="M268 230c-10-40 50-46 50-6 6 30-20 50-40 54 14-14 6-30-10-48z"/>
  <path class="sf-skin" d="M120 274q40-14 80-10l-4 10q-40 0-76 6z"/><path class="sf-line" d="M286 236h8M298 236h8M290 250q4 2 8 0"/></g>`;
const three = `<rect class="sf-black" width="400" height="430"/>${[0, 1, 2].map(k => `<svg x="30" y="${6 + k * 143}" width="340" height="131" viewBox="30 70 340 260" preserveAspectRatio="xMidYMid slice"><rect class="sf-bg" x="0" y="0" width="400" height="430"/>${face()}</svg>`).join('')}`;
const projector = `<rect class="sf-black" width="400" height="430"/>
  <path class="sf-beam" d="M120 200L400 60v300z"/>
  <g class="sf-proj"><rect x="40" y="170" width="100" height="70" rx="8"/><circle cx="60" cy="140" r="34"/><circle cx="130" cy="140" r="34"/><path d="M140 205h-14v-10h14z"/><path d="M60 240v80M120 240v80M40 330h100"/></g>
  <circle class="sf-reelhub" cx="60" cy="140" r="8"/><circle class="sf-reelhub" cx="130" cy="140" r="8"/>`;
const tins = `<rect class="sf-black" width="400" height="430"/>
  ${[0, 1, 2, 3].map(k => `<g transform="translate(${80 + (k % 2) * 140} ${110 + Math.floor(k / 2) * 150}) rotate(${(k * 13) % 20 - 10})"><circle class="sf-tin" r="60"/><circle class="sf-tin-r" r="48"/><circle class="sf-tin-r" r="8"/></g>`).join('')}
  <path class="sf-strip" d="M30 380q120-60 200-20t140-10"/>`;
function grain() { const r = rng(4); return Array.from({ length: 30 }, () => `<circle cx="${(30 + r() * 340).toFixed(0)}" cy="${(20 + r() * 390).toFixed(0)}" r="${(r() * 1.4 + .3).toFixed(1)}"/>`).join(''); }
const dust = `<g class="sf-dust">${grain()}</g>`;

/* ---------- The book ---------- */
const OPTS = ['Hunger', 'Grief', 'Desire', 'Nothing'].map(l => ({ label: l, value: l.toLowerCase() }));
const shot = (art, alt) => ({ layout: 'full', cls: 'sf-film', tone: 'dark', turn: 'cut', art: F(art + dust), alt });
const ask = key => ({ ...shot(face(), 'A close-up of a man’s face. His expression is neutral. He looks just past the camera.'),
  id: key, key, ask: 'What is he feeling?', text: ['What is he feeling?'], choices: OPTS });

function verdict(c) {
  const a = [c.state.soup, c.state.coffin, c.state.divan];
  if (a.some(x => !x)) return ['It was the same shot. All three times.'];
  const said = `You said: ${a[0]}, ${a[1]}, ${a[2]}.`;
  const fooled = !(a[0] === a[1] && a[1] === a[2]) && !a.includes('nothing');
  return [said, 'It was the same shot. All three times.',
    fooled ? 'The audience in Moscow saw it too, by the account that made it famous: a great actor, with great range.'
      : 'You weren’t fooled. Some later audiences weren’t either.'];
}

export const story = {
  id: 'sameface',
  title: 'The Same Face',
  turn: 'cut',
  pages: [
    { layout: 'card', tone: 'dark', cls: 'sf-card', eyebrow: 'Moscow · about 1918', title: 'The Same Face', text: 'A silent film in nine cuts' },
    { art: F(face() + dust), alt: 'A frame of old film: a close-up of a man’s face, expressionless.', layout: 'under', tone: 'dark', cls: 'sf-film', turn: 'fade',
      text: ['In Moscow, around 1918, a nineteen-year-old film-maker named Lev Kuleshov had some old footage.', 'Among it, a close-up of a famous actor, Ivan Mozzhukhin, doing nothing in particular.'] },
    { layout: 'card', tone: 'dark', cls: 'sf-card', text: ['He made an experiment of it.', 'Let’s do it to you.'] },
    shot(soup, 'A bowl of soup on a table, steam rising.'),
    ask('soup'),
    shot(coffin, 'A woman lying in an open coffin, with flowers.'),
    ask('coffin'),
    shot(divan, 'A woman reclining on a divan.'),
    ask('divan'),
    { layout: 'under', tone: 'dark', cls: 'sf-film', art: svg('0 0 400 430', three + dust), turn: 'fade',
      alt: 'Three identical frames of the same face, stacked one above another.', text: c => verdict(c) },
    { layout: 'card', tone: 'dark', cls: 'sf-card', eyebrow: 'V. I. Pudovkin, his student',
      text: ['The audience “raved about the acting of the artist”.'] },
    { art: svg('0 0 400 430', tins), tone: 'dark', cls: 'sf-film', alt: 'Round film tins, stacked and empty, and a curl of film.',
      text: ['Now the less tidy part.', 'No print of the experiment survives. Kuleshov and Pudovkin remembered it differently: different shots, different numbers.'] },
    { layout: 'text', tone: 'dark', cls: 'sf-film-text',
      text: ['In 1992 two researchers rebuilt it carefully and found no effect at all.', 'Later studies found one, smaller than the legend.', 'Context does change a face. Not as much as the story says.'] },
    { art: svg('0 0 400 430', projector), tone: 'dark', cls: 'sf-film', turn: 'fade', alt: 'A film projector throwing a beam into the dark.',
      text: ['Mozzhukhin left Russia after the Revolution, by way of Crimea and Constantinople.', 'In Paris he became a star of French silent film.'] },
    { layout: 'text', tone: 'dark', cls: 'sf-film-text',
      text: ['Then sound arrived, and his career faded.', 'He died near Paris in 1939, aged forty-nine.'] },
    { layout: 'card', tone: 'dark', cls: 'sf-card', turn: 'fade',
      text: ['His films are mostly forgotten.', 'The experiment is taught in film schools, with other faces.'] },
    { art: F(''), alt: 'An empty frame of film.', tone: 'dark', cls: 'sf-film', layout: 'over', at: 'middle', turn: 'fade',
      text: ['Somewhere today, someone will look at your face just after looking at something else.'] }
  ]
};

export const mount = (stage, api) => book(stage, story, api);
