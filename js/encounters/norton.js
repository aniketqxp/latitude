// His Imperial Majesty: Joshua Norton, San Francisco, 1859–1880. A picture book about a city
// that co-wrote a fiction for twenty years. Glosses carry the small print. The legend and the
// record are kept visibly apart.
import { book, svg, rng } from '../book.js';

export const curtain = {
  real: [
    'Joshua Abraham Norton (c. 1818–1880) arrived in San Francisco in 1849 with money from his father’s estate and did well in trade and property.',
    'In 1852 he tried to corner the rice market. The arrival of more rice ships collapsed the price. Years of litigation followed, and he lost his fortune.',
    'On 17 September 1859 the *San Francisco Daily Evening Bulletin* printed his proclamation declaring himself “Emperor of these U. S.”. The quotation on page 6 is from it, shortened.',
    'In October 1859 he decreed Congress abolished. He later ordered the army to clear the Capitol, and added the title “Protector of Mexico”.',
    'He issued his own scrip, in denominations from about 50 cents to 10 dollars, which some local businesses accepted.',
    'In 1867 a policeman, Armand Barbier, arrested him to be committed for lunacy. Public and press outrage followed. Police Chief Patrick Crowley released him, and Norton granted the officer an imperial pardon. A newspaper wrote that he had “shed no blood; robbed no one; and despoiled no country”.',
    'In 1872 he issued proclamations ordering a bridge (and a tunnel) between Oakland and San Francisco.',
    'He collapsed and died on 8 January 1880 at the corner of California and Dupont (now Grant) streets, on his way to a lecture at the California Academy of Sciences.',
    'His effects included a few dollars in coin, a French franc of 1828, walking sticks, a sabre, letters, and shares in a worthless gold mining company.',
    'The *San Francisco Chronicle* estimated around 10,000 mourners; later accounts give up to 30,000. The San Francisco–Oakland Bay Bridge opened in November 1936.'
  ],
  invented: [
    'All the pictures are reconstructions: the fog, the lamp, the editor’s desk, the banknote design. Real Norton notes survive and look different in detail.',
    'Norton’s inner life is not narrated, because it is not known. The book shows only what he did and what the city did.'
  ],
  open: [
    'Whether Norton believed in his empire, and in what sense, is unknown. Contemporaries disagreed.',
    'Many proclamations attributed to him were written by newspaper editors as jokes. Scholars (and the Emperor Norton Trust) still argue about which are genuine.',
    'The dogs Bummer and Lazarus were famous San Francisco strays of the same years. The legend that they were Norton’s is largely the work of cartoonists and later writers.',
    'Sources differ on the exact year of his bankruptcy and on the size of his fortune.'
  ],
  sources: [
    'Drury, W. (1986). *Norton I, Emperor of the United States*. Dodd, Mead.',
    'Cowan, R. E. (1923). Norton I, Emperor of the United States and Protector of Mexico. *Quarterly of the California Historical Society*, 2(3).',
    'Lane, A. S. (1939). *Emperor Norton: Mad Monarch of America*. Caxton.',
    '*San Francisco Daily Evening Bulletin*, 17 September 1859.',
    'The Emperor Norton Trust, research archive (emperornortontrust.org).'
  ]
};

/* ---------- Drawings ---------- */
const fogBands = (seed, n, y0, y1) => {
  const r = rng(seed);
  return Array.from({ length: n }, () => {
    const y = y0 + r() * (y1 - y0), x = -60 + r() * 300, w = 160 + r() * 260;
    return `<rect class="nt-fog" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${(10 + r() * 18).toFixed(0)}" rx="12"/>`;
  }).join('');
};
const emperor = (x, y, s = 1, flip = false) => `
  <g class="nt-emperor" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <path d="M-26 0l6-96c-6-24 0-38 20-42 20 4 26 18 20 42l6 96z"/>
    <path class="nt-ep" d="M-24-128h12v-6h-12zM12-128h12v-6H12z"/>
    <circle cx="0" cy="-156" r="15"/>
    <path d="M-24-166c6-22 42-22 48 0l-4 6h-40z"/>
    <path class="nt-plume" d="M8-178c10-18 26-16 30-6-10-2-18 2-24 10z"/>
    <path class="nt-sabre" d="M18-60l26 58"/>
    <path class="nt-stick" d="M-30-80l-10 80"/>
  </g>`;
const lamp = (x, y) => `
  <g class="nt-lamp"><path d="M${x} ${y}v-260"/><path d="M${x - 14} ${y - 262}h28l-6-26h-16z"/><circle class="nt-flame" cx="${x}" cy="${y - 274}" r="8"/></g>
  <circle class="nt-halo" cx="${x}" cy="${y - 274}" r="70"/>`;
const city = seed => {
  const r = rng(seed);
  let x = -10, d = '';
  while (x < 420) { const w = 26 + r() * 40, h = 40 + r() * 120; d += `M${x.toFixed(0)} 400V${(400 - h).toFixed(0)}h${w.toFixed(0)}V400z`; x += w + 2; }
  return `<path class="nt-city" d="${d}"/>`;
};

const cover = `
  <rect class="nt-sky" width="400" height="700"/>
  ${fogBands(3, 14, 120, 600)}
  ${lamp(276, 620)}
  ${emperor(160, 620, 1.9)}
  <rect class="nt-street" y="618" width="400" height="82"/>
  ${fogBands(9, 5, 560, 680)}`;

const ship = `
  <rect class="nt-sky" width="400" height="400"/>
  <rect class="nt-water" y="270" width="400" height="130"/>
  <g class="nt-shipg"><path d="M70 268h220l-24 34H96z"/><path class="nt-mast" d="M140 268V96M220 268V110"/>
  <path class="nt-sail" d="M144 104l66 22v120l-66 6zM224 118l50 20v100l-50 4z"/></g>
  <g class="nt-sacks">${[0, 1, 2, 3, 4].map(k => `<ellipse cx="${300 + (k % 3) * 28}" cy="${360 - Math.floor(k / 3) * 22}" rx="16" ry="12"/>`).join('')}</g>
  <text class="nt-type" x="330" y="390" text-anchor="middle">RICE</text>`;

const chart = `
  <rect class="nt-paper" width="400" height="400"/>
  <path class="nt-grid" d="${Array.from({ length: 8 }, (_, k) => `M40 ${60 + k * 40}h330`).join('')}"/>
  <path class="nt-price" pathLength="1" d="M40 300L90 250 130 180 170 90 196 70 214 300 260 330 370 340"/>
  <text class="nt-type" x="44" y="40">PRICE OF RICE, SAN FRANCISCO, 1852–53</text>
  <circle class="nt-dot" cx="196" cy="70" r="5"/>`;

const papers = `
  <rect class="nt-paper" width="400" height="400"/>
  ${[0, 1, 2, 3, 4].map(k => `<g transform="rotate(${-8 + k * 4} 200 220)"><rect class="nt-doc" x="${70 + k * 10}" y="${80 + k * 18}" width="240" height="260"/><path class="nt-lines" d="${Array.from({ length: 8 }, (_, j) => `M${94 + k * 10} ${120 + k * 18 + j * 22}h${150 + (j % 3) * 20}`).join('')}"/></g>`).join('')}
  <text class="nt-stamp" x="200" y="300" text-anchor="middle" transform="rotate(-12 200 300)">JUDGMENT FOR DEFENDANT</text>`;

const office = `
  <rect class="nt-wall" width="400" height="400"/>
  <rect class="nt-window" x="40" y="40" width="120" height="170"/>
  ${fogBands(4, 4, 60, 200)}
  <rect class="nt-desk" y="290" width="400" height="110"/>
  <g class="nt-editor"><circle cx="300" cy="196" r="22"/><path d="M262 292c0-50 14-70 38-72 24 2 38 22 38 72z"/></g>
  <g transform="rotate(-6 150 292)"><rect class="nt-doc" x="110" y="262" width="96" height="40"/><path class="nt-lines" d="M118 274h70M118 284h60M118 294h76"/></g>
  <text class="nt-type sm" x="200" y="350" text-anchor="middle">DAILY EVENING BULLETIN</text>`;

const capitol = (crossed) => `
  <rect class="nt-paper" width="400" height="400"/>
  <g class="nt-dome"><path d="M90 300h220v-60H90z"/><path d="M130 240c0-60 140-60 140 0z"/><path d="M196 180v-40h8v40z"/><path d="M70 300h260v18H70z"/>
  ${[0, 1, 2, 3, 4, 5, 6].map(k => `<path class="nt-col" d="M${104 + k * 32} 246v52"/>`).join('')}</g>
  ${crossed ? `<path class="nt-x" pathLength="1" d="M80 110L320 330M320 110L80 330"/>` : ''}`;

const uniform = `
  <rect class="nt-wall" width="400" height="400"/>
  <g class="nt-coat"><path d="M120 400l14-200c4-40 30-56 66-60 36 4 62 20 66 60l14 200z"/>
  <path class="nt-gold" d="M118 200c18-14 40-18 58-12l-6 14c-18-4-36 0-50 8zM282 200c-18-14-40-18-58-12l6 14c18-4 36 0 50 8z"/>
  ${[0, 1, 2, 3, 4].map(k => `<circle class="nt-gold" cx="200" cy="${220 + k * 34}" r="5"/>`).join('')}</g>
  <g class="nt-hat"><path d="M140 108c20-50 100-50 120 0l-10 10H150z"/><path class="nt-plume" d="M210 64c20-40 60-36 70-14-24-6-42 0-56 20z"/><circle class="nt-gold" cx="200" cy="96" r="7"/></g>
  <path class="nt-sabre" d="M300 250l46 140"/>`;

const note = `
  <rect class="nt-wall" width="400" height="400"/>
  <g transform="rotate(-4 200 200)">
    <rect class="nt-shadow" x="44" y="118" width="320" height="170" rx="4"/>
    <rect class="nt-note" x="38" y="110" width="320" height="170" rx="4"/>
    <rect class="nt-note-b" x="48" y="120" width="300" height="150" rx="2"/>
    <text class="nt-type" x="198" y="150" text-anchor="middle">THE IMPERIAL GOVERNMENT OF</text>
    <text class="nt-type" x="198" y="166" text-anchor="middle">NORTON I</text>
    <text class="nt-big" x="198" y="226" text-anchor="middle">Fifty Cents</text>
    <text class="nt-type sm" x="198" y="250" text-anchor="middle">PAYABLE IN 1880 WITH INTEREST AT 5 PER CENT</text>
    <circle class="nt-seal" cx="88" cy="226" r="22"/><circle class="nt-seal" cx="308" cy="226" r="22"/>
  </g>`;

const arrest = `
  <rect class="nt-sky" width="400" height="400"/>
  ${fogBands(14, 6, 60, 300)}
  ${emperor(150, 360, 1.25)}
  <g class="nt-cop"><path d="M236 360l6-110c-4-22 2-34 20-36 18 2 24 14 20 36l6 110z"/><circle cx="262" cy="196" r="14"/><path d="M244 186h36l-4-14h-28z"/></g>
  <path class="nt-arm" d="M244 270l-56 6"/>
  <rect class="nt-street" y="358" width="400" height="42"/>`;

const salute = `
  <rect class="nt-sky" width="400" height="400"/>
  ${fogBands(15, 6, 60, 300)}
  ${emperor(130, 360, 1.25)}
  <g class="nt-cop"><path d="M246 360l6-110c-4-22 2-34 20-36 18 2 24 14 20 36l6 110z"/><circle cx="272" cy="196" r="14"/><path d="M254 186h36l-4-14h-28z"/></g>
  <path class="nt-arm" d="M262 240l-8-38 10-12"/>
  <rect class="nt-street" y="358" width="400" height="42"/>`;

const question = `
  <rect class="nt-sky" width="400" height="400"/>
  ${fogBands(21, 18, 40, 380)}
  ${emperor(200, 380, 1.4)}
  ${fogBands(22, 9, 200, 400)}`;

const forgeries = `
  <rect class="nt-paper" width="400" height="400"/>
  ${[0, 1, 2, 3, 4, 5].map(k => { const x = 40 + (k % 3) * 112, y = 60 + Math.floor(k / 3) * 160; return `<g transform="rotate(${(k * 7) % 9 - 4} ${x + 48} ${y + 64})"><rect class="nt-doc" x="${x}" y="${y}" width="96" height="128"/><text class="nt-type sm" x="${x + 48}" y="${y + 22}" text-anchor="middle">PROCLAMATION</text><path class="nt-lines" d="M${x + 12} ${y + 40}h72M${x + 12} ${y + 54}h64M${x + 12} ${y + 68}h70M${x + 12} ${y + 82}h50"/><text class="nt-type sm" x="${x + 48}" y="${y + 112}" text-anchor="middle">NORTON I</text>${k % 2 ? `<text class="nt-q" x="${x + 76}" y="${y + 120}">?</text>` : ''}</g>`; }).join('')}`;

const bridge = solid => `
  <rect class="nt-sky" width="400" height="400"/>
  <rect class="nt-water" y="250" width="400" height="150"/>
  <path class="nt-land" d="M0 250h70l20 20H0zM400 250h-60l-20 20h80z"/>
  <path class="nt-dotted" d="M70 250Q200 170 340 250M70 250h270"/>
  ${solid ? `<g class="nt-bridge"><path d="M60 246h290v8H60z"/><path d="M140 246V140h10v106zM260 246V140h10v106z"/><path class="nt-cable" d="M60 246Q100 160 145 142Q205 230 265 142Q310 160 350 246"/>${Array.from({ length: 13 }, (_, k) => `<path class="nt-cable" d="M${80 + k * 20} 246V${180 + Math.abs(k - 6) * 6}"/>`).join('')}</g>` : ''}
  ${fogBands(30, 6, 180, 330)}`;

const corner = `
  <rect class="nt-sky night" width="400" height="400"/>
  ${lamp(250, 380)}
  <rect class="nt-street" y="378" width="400" height="22"/>
  <g class="nt-sign"><path d="M110 380V150"/><rect x="40" y="150" width="140" height="22"/><rect x="100" y="178" width="120" height="22"/>
  <text class="nt-type inv" x="110" y="165" text-anchor="middle">CALIFORNIA</text><text class="nt-type inv" x="160" y="193" text-anchor="middle">DUPONT</text></g>
  ${fogBands(31, 8, 80, 380)}`;

const effects = `
  <rect class="nt-wall" width="400" height="400"/>
  <rect class="nt-desk" y="250" width="400" height="150"/>
  <path class="nt-stick" d="M40 250l40-200M64 250l28-190M90 250l14-196"/>
  <path class="nt-sabre" d="M300 248l60-200"/>
  <circle class="nt-coin" cx="170" cy="290" r="14"/><circle class="nt-coin" cx="200" cy="300" r="10"/><circle class="nt-coin" cx="224" cy="286" r="12"/>
  <text class="nt-type sm" x="170" y="293" text-anchor="middle">1828</text>
  <g transform="rotate(5 160 340)"><rect class="nt-doc" x="110" y="320" width="110" height="60"/><text class="nt-type sm" x="165" y="344" text-anchor="middle">GOLD MINING CO.</text><text class="nt-type sm" x="165" y="360" text-anchor="middle">98 SHARES</text></g>
  <g transform="rotate(-8 300 330)"><rect class="nt-doc" x="250" y="300" width="100" height="70"/><text class="nt-type sm" x="300" y="324" text-anchor="middle">TO H.M.</text><text class="nt-type sm" x="300" y="338" text-anchor="middle">QUEEN VICTORIA</text></g>`;

function crowd() {
  const r = rng(40);
  let heads = '';
  for (let row = 0; row < 7; row++) for (let k = 0; k < 18; k++) {
    const x = k * 24 - 6 + (row % 2) * 12 + r() * 6, y = 180 + row * 30 + r() * 6, s = .7 + row * .07;
    heads += `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"><circle cx="0" cy="0" r="9"/><path d="M-13 30c0-20 6-28 13-28s13 8 13 28z"/>${r() > .6 ? '<path d="M-12-4h24v-4h-6v-10h-12v10h-6z"/>' : ''}</g>`;
  }
  return `<rect class="nt-sky" width="400" height="400"/>${fogBands(41, 5, 40, 180)}<g class="nt-crowd">${heads}</g>`;
}

/* ---------- The book ---------- */
const S = b => svg('0 0 400 400', b);
export const story = {
  id: 'norton',
  title: 'His Imperial Majesty',
  pages: [
    { layout: 'cover', art: svg('0 0 400 700', cover), alt: 'A man in a military coat and plumed hat stands by a gas lamp in thick fog.',
      eyebrow: 'San Francisco · 1859–1880', text: 'Joshua Norton, Emperor of the United States, and the city that let him' },
    { art: S(ship), alt: 'A sailing ship at anchor, and sacks of rice stacked on the quay.',
      text: ['Joshua Norton came to San Francisco in 1849, with money, to make more money.', 'For a while, it worked.'] },
    { art: S(chart), cls: 'nt-chartpage', alt: 'A price chart: the line climbs steeply to a peak, then drops off a cliff.',
      text: ['In 1852 he tried to buy up all the rice in town.', 'Then more ships came in, full of rice.'] },
    { art: S(papers), alt: 'A heap of legal papers, the top one stamped Judgment for Defendant.',
      text: ['Years of lawsuits followed. He lost them, and everything else.'] },
    { art: S(office), eyebrow: '17 September 1859', alt: 'A newspaper editor at his desk, a handwritten sheet in front of him.',
      text: ['One day he walked into a newspaper office with a piece of paper.', 'The editor printed it. It seemed funny.'] },
    { layout: 'text', size: 'm', cls: 'nt-proclaim', turn: 'rise',
      text: ['“At the {peremptory|Peremptory: insistent, admitting no refusal. There is no record of anyone having requested it.} request and desire of a large majority of the citizens of these United States, I, Joshua Norton … declare and proclaim myself Emperor of these U. S.”'] },
    { art: S(capitol(false)), alt: 'The dome of the United States Capitol.',
      text: ['In October he abolished Congress.'] },
    { art: S(capitol(true)), turn: 'cut', alt: 'The same Capitol, crossed out in red ink. It is still standing.',
      text: ['Congress continued.', 'He ordered the army to clear the Capitol. The army did not reply.', 'He added a second title: Protector of Mexico.'] },
    { art: S(uniform), alt: 'A blue military coat with gold epaulettes and buttons, a beaver hat with a plume, and a sabre.',
      text: ['He wore a blue uniform with gold epaulettes, a beaver hat and a sabre.', 'The uniform was second-hand, from officers at the Presidio.'] },
    { art: S(note), eyebrow: 'Imperial treasury', alt: 'A banknote of the Imperial Government of Norton I, for fifty cents.',
      text: ['He printed his own money, from fifty cents to ten dollars.', 'Some restaurants and shops took it.'] },
    { art: S(arrest), eyebrow: '1867', alt: 'In fog, a young policeman takes the Emperor by the arm.',
      text: ['In 1867 a new policeman arrested him, to have him committed as a lunatic.', 'The city was furious.'] },
    { layout: 'text', size: 'm', cls: 'nt-proclaim', turn: 'fade', eyebrow: 'A San Francisco newspaper, 1867',
      text: ['He had “shed no blood; robbed no one; and despoiled no country”.'] },
    { art: S(salute), alt: 'In fog, the policeman stands back and salutes the Emperor.',
      text: ['The police chief released him and apologised.', 'The Emperor issued the policeman a pardon.', 'After that, officers saluted him in the street.'] },
    { art: S(question), tone: 'dark', turn: 'fade', alt: 'The Emperor, barely visible in deep fog.',
      text: ['Did he believe it?', 'The record doesn’t say. It shows something stranger: a city playing along, for twenty years.'] },
    { art: S(forgeries), alt: 'Six proclamations signed Norton I. Some are marked with a question mark.',
      text: ['Newspapers began writing proclamations for him, when they were short of copy.', 'Historians are still sorting the real ones from the jokes.'] },
    { art: S(bridge(false)), eyebrow: '1872', alt: 'A bay at dusk. A dotted line arcs from shore to shore where a bridge might go.',
      text: ['He ordered a bridge built across the bay, to Oakland.', 'More than once.', 'Nothing happened.'] },
    { art: S(corner), tone: 'dark', eyebrow: '8 January 1880', alt: 'A gas lamp at night by a street sign: California and Dupont.',
      text: ['One evening he fell at the corner of California and Dupont, on his way to a lecture at the Academy of Sciences.', 'He died there, in the street.'] },
    { art: S(effects), alt: 'On a table: walking sticks, a sabre, a few coins, a share certificate and a letter addressed to Queen Victoria.',
      text: ['In his pockets: a few dollars, and a French franc from 1828.', 'In his room: walking sticks, a sabre, letters to Queen Victoria, and ninety-eight shares in a {gold mine|The shares were worthless.}.'] },
    { art: S(crowd()), alt: 'A great crowd in fog, many in top hats.',
      text: ['A newspaper counted about ten thousand people at his funeral.', 'Later tellings made it thirty thousand, with a two-mile procession, and two famous dogs that were never his.'] },
    { art: S(bridge(true)), turn: 'drift', eyebrow: 'November 1936', alt: 'A real suspension bridge across the bay, laid over the old dotted line.',
      text: ['The Bay Bridge opened in 1936.', 'He was not the only one who had wanted a bridge.', 'He was the only one who had ordered it.'] }
  ]
};

export const mount = (stage, api) => book(stage, story, api);
