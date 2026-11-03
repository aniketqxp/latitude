// Bread from Air: Fritz Haber. Two tones in one book: wheat gold and chlorine green, the same
// chemistry and the same man. The book refuses to average him into a verdict. The darkest
// facts are stated once, plainly, without pictures of harm (see EDITORIAL §2, "Occasionally dark").
import { book, svg, rng } from '../book.js';

export const curtain = {
  real: [
    'Air is about 78% nitrogen, as N₂, two atoms held by a triple bond that plants and animals cannot break. Before industrial fixation, farms depended on manure, legumes, Chilean saltpetre and guano.',
    'In 1898 William Crookes, in his presidential address to the British Association, warned that the world’s wheat supply would fall short without new sources of fixed nitrogen.',
    'In 1909 at Karlsruhe, Fritz Haber and Robert Le Rossignol demonstrated a bench-top apparatus producing liquid ammonia from nitrogen and hydrogen, roughly 100–125 ml per hour.',
    'Carl Bosch scaled the process at BASF. The Oppau plant began production in 1913.',
    'Erisman et al. (2008) estimated that by 2008 nitrogen fertiliser from the Haber–Bosch process supported about 48% of the world’s population.',
    'Haber directed Germany’s chemical weapons programme in the First World War and was present at the first large chlorine attack, at Ypres on 22 April 1915. Casualty figures are disputed.',
    'Clara Immerwahr, a chemist and the first woman to receive a doctorate from the University of Breslau (1900), shot herself with Haber’s service pistol on 2 May 1915. Their son Hermann found her. Haber left for the Eastern Front shortly afterwards.',
    'Haber received the 1918 Nobel Prize in Chemistry, awarded in 1919, “for the synthesis of ammonia from its elements”.',
    'In the 1920s research associated with his institute and the firm Degesch produced cyanide pesticides, including Zyklon A. Zyklon B was later used by the Nazis to murder people in the gas chambers, after Haber’s death. Members of his extended family were among those killed in the Holocaust.',
    'Haber, born Jewish, had converted to Christianity in 1892. In 1933 he was ordered to dismiss Jewish staff. He resigned instead. He died in Basel on 29 January 1934.'
  ],
  invented: [
    'All pictures are reconstructions. The figure grid on page 7 rounds the 48% estimate to 48 of 100 figures.',
    'No thoughts or words are put into Haber’s or Immerwahr’s mouths.'
  ],
  open: [
    'Why Clara Immerwahr died is contested. Accounts point to her opposition to gas warfare, to the marriage, to depression, or to all three. Her surviving letters do not settle it, and some later portrayals overstate her as a pacifist activist.',
    'Haber is widely quoted as saying a scientist belongs to the world in peace and to his country in war. We have not found a primary source, so the book does not use it.',
    'Estimates of how many people Haber–Bosch nitrogen feeds vary with the method. The book uses one careful estimate and says so.'
  ],
  sources: [
    'Smil, V. (2001). *Enriching the Earth: Fritz Haber, Carl Bosch, and the Transformation of World Food Production*. MIT Press.',
    'Erisman, J. W. et al. (2008). How a century of ammonia synthesis changed the world. *Nature Geoscience*, 1, 636–639.',
    'Stoltzenberg, D. (2004). *Fritz Haber: Chemist, Nobel Laureate, German, Jew*. Chemical Heritage Press.',
    'Charles, D. (2005). *Master Mind: The Rise and Fall of Fritz Haber*. Ecco.',
    'Friedrich, B. & Hoffmann, D. (2017). Clara Immerwahr: A Life in the Shadow of Fritz Haber. In *One Hundred Years of Chemical Warfare*. Springer (open access).',
    'Nobel Prize in Chemistry 1918, nobelprize.org.'
  ]
};

/* ---------- Drawings ---------- */
const N2 = (x, y, s = 1, cls = '') => `<g class="hb-n2 ${cls}" transform="translate(${x} ${y}) scale(${s})"><circle cx="-11" cy="0" r="10"/><circle cx="11" cy="0" r="10"/><path class="hb-bond" d="M-4-4h8M-4 0h8M-4 4h8"/></g>`;
const air = (seed, n) => {
  const r = rng(seed);
  return Array.from({ length: n }, () => N2(r() * 400, r() * 380, .5 + r() * .5, r() > .78 ? 'o2' : '')).join('');
};
const stalk = (x, h, lean) => `<g class="hb-wheat"><path class="hb-stem" d="M${x} 400q${lean} ${-h / 2} ${lean * 1.6} ${-h}"/>${Array.from({ length: 7 }, (_, k) => {
  const yy = 400 - h + k * 9, xx = x + lean * 1.6 - k * lean * .05;
  return `<ellipse cx="${xx - 4}" cy="${yy}" rx="3.2" ry="7" transform="rotate(-24 ${xx - 4} ${yy})"/><ellipse cx="${xx + 4}" cy="${yy}" rx="3.2" ry="7" transform="rotate(24 ${xx + 4} ${yy})"/>`;
}).join('')}</g>`;
const field = (seed, n) => { const r = rng(seed); return Array.from({ length: n }, (_, k) => stalk(10 + k * (380 / n) + r() * 10, 130 + r() * 90, (r() - .5) * 18)).join(''); };

const cover = `<rect class="hb-bg" width="400" height="700"/>
  <g class="hb-air">${air(1, 26).replace(/translate\((\S+) (\S+)\)/g, (_, a, b) => `translate(${a} ${(+b * .9).toFixed(0)})`)}</g>
  <g transform="translate(0 300)">${field(2, 22)}</g>`;

const breathe = `<rect class="hb-bg" width="400" height="400"/><g class="hb-air drifting">${air(3, 34)}</g>`;

const bond = `<rect class="hb-bg" width="400" height="400"/>
  <g transform="translate(200 190) scale(5)" class="hb-n2 big"><circle cx="-11" cy="0" r="10"/><circle cx="11" cy="0" r="10"/><path class="hb-bond" d="M-4-4h8M-4 0h8M-4 4h8"/></g>
  <text class="hb-type" x="200" y="330" text-anchor="middle">N ≡ N</text>`;

const sources = `<rect class="hb-bg" width="400" height="400"/>
  <path class="hb-desert" d="M0 260q60-30 120-6t130-14 150 10V400H0z"/>
  <path class="hb-island" d="M210 330q40-50 90-40t70 40z"/>
  <g class="hb-birds">${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${240 + k * 22} ${200 + (k % 3) * 14}q6-6 12 0q6-6 12 0"/>`).join('')}</g>
  <g transform="translate(0 40)">${field(5, 9).replace(/class="hb-wheat"/g, 'class="hb-wheat thin"')}</g>
  <text class="hb-type sm" x="60" y="250">CHILE</text><text class="hb-type sm" x="270" y="320">GUANO</text>`;

const apparatus = `<rect class="hb-bg" width="400" height="400"/>
  <g class="hb-lab"><rect x="120" y="40" width="40" height="190" rx="18"/><path d="M160 90h70v40h40"/><path d="M270 130v60"/><path d="M60 300h280"/><path d="M110 230h60v70h-60z"/></g>
  <g class="hb-flask"><path d="M250 260h40l18 60h-76z"/><path class="hb-liquid" d="M236 306h68l4 14h-76z"/></g>
  <circle class="hb-drop" cx="270" cy="196" r="5"/>
  <text class="hb-type sm" x="140" y="34" text-anchor="middle">200 ATM · 500 °C</text>`;

const factory = `<rect class="hb-bg" width="400" height="400"/>
  <path class="hb-plant" d="M20 400V250h60v-40h40v40h50V180h30v70h60v-60l40 30v-30l40 30v-30l40 30V400z"/>
  <path class="hb-plant" d="M70 210v-120h14v120zM230 190V60h16v130z"/>
  <g class="hb-steam">${[0, 1, 2].map(k => `<circle cx="${77 + k * 6}" cy="${80 - k * 22}" r="${10 + k * 6}"/><circle cx="${238 + k * 7}" cy="${48 - k * 20}" r="${12 + k * 6}"/>`).join('')}</g>
  <g transform="translate(0 140)">${field(7, 16)}</g>`;

function people() {
  let g = '';
  for (let k = 0; k < 100; k++) {
    const x = 32 + (k % 10) * 37, y = 46 + Math.floor(k / 10) * 34;
    g += `<g class="${k < 48 ? 'fed' : ''}" transform="translate(${x} ${y})"><circle cx="0" cy="0" r="5"/><path d="M-7 18c0-9 3-12 7-12s7 3 7 12z"/></g>`;
  }
  return `<rect class="hb-bg" width="400" height="400"/><g class="hb-people">${g}</g>`;
}

const uniform = `<rect class="hb-bg" width="400" height="400"/>
  <g class="hb-figure"><path d="M130 400l12-170c4-30 26-44 58-46 32 2 54 16 58 46l12 170z"/><circle cx="200" cy="150" r="30"/><path d="M168 132c4-20 60-20 64 0l-2 6h-60z"/><path class="hb-spike" d="M196 112l4-22 4 22z"/></g>
  <path class="hb-pince" d="M186 152h10M204 152h10M196 152h8"/>`;

const cloud = `<rect class="hb-bg" width="400" height="400"/>
  <path class="hb-trench" d="M0 330h400v70H0z"/><path class="hb-wire" d="M0 312l20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12 20-12 20 12"/>
  <g class="hb-gas">${[0, 1, 2, 3, 4, 5, 6, 7].map(k => `<ellipse cx="${-20 + k * 60}" cy="${300 - (k % 3) * 8}" rx="80" ry="${34 + (k % 2) * 10}"/>`).join('')}</g>`;

const coat = `<rect class="hb-bg" width="400" height="400"/>
  <path class="hb-hook" d="M110 60v20"/>
  <path class="hb-coat" d="M80 80h60l18 290H62zM110 80l-6 120"/>
  <g transform="rotate(2 280 170)"><rect class="hb-diploma" x="200" y="100" width="150" height="110"/><rect class="hb-diploma-b" x="210" y="110" width="130" height="90"/>
  <text class="hb-type sm dk" x="275" y="140" text-anchor="middle">DOCTOR</text><text class="hb-type sm dk" x="275" y="156" text-anchor="middle">PHILOSOPHIAE</text><text class="hb-type sm dk" x="275" y="184" text-anchor="middle">BRESLAU 1900</text></g>`;

const medal = `<rect class="hb-bg" width="400" height="400"/>
  <circle class="hb-medal" cx="200" cy="200" r="96"/><circle class="hb-medal-r" cx="200" cy="200" r="84"/>
  <g transform="translate(0 -136)">${stalk(198, 120, -2)}</g>
  <text class="hb-type sm dk" x="200" y="270" text-anchor="middle">MCMXVIII</text>`;

const resign = `<rect class="hb-bg" width="400" height="400"/>
  <g transform="rotate(-3 200 200)"><rect class="hb-paper" x="90" y="50" width="220" height="300"/>
  <path class="hb-lines" d="${Array.from({ length: 9 }, (_, k) => `M114 ${110 + k * 20}h${140 + (k % 3) * 16}`).join('')}"/>
  <text class="hb-type sm dk" x="114" y="86">BERLIN-DAHLEM · 30.IV.1933</text>
  <path class="hb-sig" d="M200 320q14-24 24-2t20-8 24 4"/></g>`;

const basel = `<rect class="hb-bg" width="400" height="400"/>
  <rect class="hb-window" x="120" y="60" width="160" height="230"/><path class="hb-frame" d="M120 60h160v230H120zM200 60v230M120 170h160"/>
  <path class="hb-roofs" d="M120 260l20-20 20 20 30-30 30 30 20-16 20 16 20-24v54H120z"/>
  <rect class="hb-sill" x="104" y="290" width="192" height="12"/>
  <text class="hb-type sm" x="200" y="340" text-anchor="middle">BASEL · JANUARY 1934</text>`;

const both = `<rect class="hb-bg" width="400" height="400"/>
  <g transform="translate(-100 0)">${field(9, 8)}</g>
  <g class="hb-gas half"><ellipse cx="320" cy="320" rx="110" ry="40"/><ellipse cx="380" cy="300" rx="90" ry="36"/></g>
  <g class="hb-air">${air(10, 10)}</g>`;

/* ---------- The book ---------- */
const S = b => svg('0 0 400 400', b);
export const story = {
  id: 'haber',
  title: 'Bread from Air',
  pages: [
    { layout: 'cover', art: svg('0 0 400 700', cover), alt: 'Wheat stalks rising into a sky full of paired nitrogen atoms.',
      eyebrow: 'Karlsruhe · Ypres · Berlin · 1909–1934', text: 'Fritz Haber, and the same air' },
    { art: S(breathe), layout: 'over', at: 'top', size: 'xl', alt: 'Pairs of atoms drifting across an empty page.',
      text: ['Breathe in.', 'Nearly four fifths of that was nitrogen.'] },
    { art: S(bond), alt: 'Two nitrogen atoms locked together by three bonds.',
      text: ['Every living thing needs nitrogen. The nitrogen in air is no use to them.', 'It comes in pairs, held by a triple bond. Plants can’t break it. Neither can you.'] },
    { art: S(sources), eyebrow: '1898', alt: 'A desert, a rocky island under seabirds, and thin wheat.',
      text: ['Farms fed their soil with manure, and with nitrate dug from Chilean deserts and bird droppings shipped from Pacific islands.', 'In 1898 a British chemist warned that the world’s wheat would soon fall short.'] },
    { art: S(apparatus), cls: 'hb-drippage', eyebrow: 'Karlsruhe · 1909', alt: 'A bench apparatus of steel tube and pipes. A drop falls into a flask.',
      text: ['In 1909, in a laboratory at Karlsruhe, Fritz Haber and Robert Le Rossignol squeezed nitrogen and hydrogen together, hot, under huge pressure.', 'Ammonia came out, drop by drop. About half a cup an hour.'] },
    { art: S(factory), alt: 'A chemical works with tall chimneys, and a field of wheat in front.',
      text: ['Carl Bosch, at the chemical company BASF, made it work on the scale of a factory. By 1913, it did.', '“Bread from air,” people called it.'] },
    { art: S(people()), cls: 'hb-peoplepage', alt: 'A grid of one hundred small figures. Forty-eight are tinted gold.',
      text: ['By one careful estimate, nearly half of the people alive today are fed by it.', 'Some of the nitrogen in your body almost certainly passed through it.'] },
    { art: S(uniform), tone: 'dark', turn: 'fade', eyebrow: '1914', alt: 'A man in a German army uniform and spiked helmet, with pince-nez.',
      text: ['When war came, Haber was a patriot.', 'He put his institute at the army’s service.'] },
    { art: S(cloud), tone: 'dark', eyebrow: 'Ypres · 22 April 1915', alt: 'A low, yellow-green cloud rolling over barbed wire toward a trench.',
      text: ['He proposed releasing chlorine from cylinders and letting the wind carry it.', 'At Ypres, on 22 April 1915, he was there to watch.', 'The number of dead is disputed. It was not small.'] },
    { art: S(coat), tone: 'dark', turn: 'fade', alt: 'A laboratory coat hanging on a hook beside a doctoral diploma from Breslau, 1900.',
      text: ['His wife, Clara Immerwahr, was a chemist: the first woman to earn a doctorate at the University of Breslau.', 'Ten days after Ypres, she shot herself in their garden, with his service pistol.', 'Their son Hermann, who was twelve, found her.'] },
    { layout: 'text', tone: 'dark', size: 'm',
      text: ['Why she did it is still argued over: the gas, the marriage, illness, or all three.', 'What she left behind doesn’t settle it.', 'Within days, he left for the Eastern Front.'] },
    { art: S(medal), turn: 'fade', eyebrow: 'Stockholm · 1919', alt: 'A gold medal engraved with a single stalk of wheat.',
      text: ['In 1919 he received the Nobel Prize in Chemistry, for making ammonia from its elements.', 'The prize was for the bread.'] },
    { layout: 'text', size: 'm',
      text: ['In the 1920s his institute worked on pesticides: cyanide gases for killing insects in grain stores and ships.', 'One was called Zyklon A.'] },
    { layout: 'text', tone: 'dark', size: 'm', turn: 'fade',
      text: ['A later version, Zyklon B, was used in the gas chambers, after his death.', 'Members of his own extended family were murdered in the camps.'] },
    { art: S(resign), eyebrow: '1933', alt: 'A typed letter dated Berlin-Dahlem, 30 April 1933, with a signature.',
      text: ['Haber was born Jewish, and had converted.', 'In 1933 the new government ordered him to dismiss his Jewish staff.', 'He resigned instead.'] },
    { art: S(basel), alt: 'A hotel window looking out over the roofs of Basel in winter.',
      text: ['He left Germany. He died in a hotel in Basel in January 1934.', 'He had been considering an offer of work in Palestine.'] },
    { art: S(both), size: 'xl', turn: 'fade', alt: 'Wheat on one side, a low green cloud on the other, and atoms drifting above both.',
      text: ['The same man.', 'The same years.', 'The same air.'] },
    { layout: 'text', size: 'xl', turn: 'drift', text: ['Breathe in.'] }
  ]
};

export const mount = (stage, api) => book(stage, story, api);
