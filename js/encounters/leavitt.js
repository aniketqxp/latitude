// It Is Worthy of Notice: Henrietta Swan Leavitt. An illustrated book about a sentence with
// no exclamation mark in it. The one interaction is the job itself: blinking two nights of
// glass to find the star that changed.
import { book, svg, rng } from '../book.js';

export const curtain = {
  real: [
    'Henrietta Swan Leavitt (1868–1921) worked at the Harvard College Observatory as one of the “computers”, measuring and cataloguing stars on photographic plates. She was eventually paid 30 cents an hour. She grew progressively deaf after an illness in her youth.',
    'The plates for the Magellanic Clouds were taken at Harvard’s southern station at Arequipa, Peru, and shipped to Cambridge. On the plates (photographic negatives) stars appear as dark specks.',
    'Her 1908 paper, “1777 Variables in the Magellanic Clouds” (*Annals of the Harvard College Observatory*, vol. 60), contains the sentence: “It is worthy of notice that in Table VI the brighter variables have the longer periods.”',
    'Harvard College Observatory Circular 173 (1912), “Periods of 25 Variable Stars in the Small Magellanic Cloud”, is signed by the director, Edward Pickering, and opens by saying the statement “has been prepared by Miss Leavitt”. It notes that “a straight line can be readily drawn” through the points.',
    'This period–luminosity relation made Cepheid variable stars into “standard candles”: a way to measure cosmic distances.',
    'In October 1923, at Mount Wilson, Edwin Hubble found a star in the Andromeda “nebula” on plate H335H. He marked it “N” (nova), then crossed that out and wrote “VAR!”. It was a Cepheid, and its distance showed Andromeda to be a separate galaxy.',
    'Leavitt died of cancer on 12 December 1921, aged 53.',
    'The Swedish mathematician Gösta Mittag-Leffler wrote in the mid-1920s intending to nominate her for the Nobel Prize in Physics, and learned from Harlow Shapley that she had died. Nobel Prizes are not awarded posthumously.',
    'The lunar crater Leavitt is on the far side of the Moon. Asteroid 5383 Leavitt is also named for her.'
  ],
  invented: [
    'All the drawings are reconstructions. The woman at the window is seen from behind because we do not know how she sat; the desk, crate, envelope and lettering are imagined.',
    'The plates you blink are made up: a random sky drawn for this page, with one invented variable. Leavitt’s real method compared a positive and a negative plate laid over each other, which is close in spirit but not the same as blinking.',
    'The lighthouse is our metaphor, not hers.'
  ],
  open: [
    'Sources disagree about the year of Mittag-Leffler’s letter (1924, 1925 or 1926) and about whether it went to Leavitt herself or to Shapley.',
    'How much of the 1912 relation was “hers” versus the observatory’s is partly a question about how science gave credit then. The Circular is explicit that she prepared it.'
  ],
  sources: [
    'Leavitt, H. S. (1908). 1777 Variables in the Magellanic Clouds. *Annals of the Harvard College Observatory*, 60, 87–108.',
    'Leavitt, H. S. & Pickering, E. C. (1912). Periods of 25 Variable Stars in the Small Magellanic Cloud. *Harvard College Observatory Circular*, 173.',
    'Johnson, G. (2005). *Miss Leavitt’s Stars*. W. W. Norton.',
    'Sobel, D. (2016). *The Glass Universe*. Viking.',
    'Hubble, E. (1925). Cepheids in spiral nebulae. *Publications of the American Astronomical Society*, 5, 261.',
    'Carnegie Science, “VAR!”: the Hubble plate H335H.',
    'IAU Gazetteer of Planetary Nomenclature: Leavitt (lunar crater).'
  ]
};

/* ---------- Drawings ---------- */
// A sky on glass: dark specks on a pale plate, scattered the same way every time.
function sky(seed, n, x, y, w, h, big = 3.2) {
  const r = rng(seed);
  let out = '';
  for (let k = 0; k < n; k++) {
    const s = Math.pow(r(), 3.2) * big + .55;
    out += `<circle cx="${(x + r() * w).toFixed(1)}" cy="${(y + r() * h).toFixed(1)}" r="${s.toFixed(2)}"/>`;
  }
  return out;
}
const plate = (x, y, w, h, seed, n, extra = '', rot = 0) => `
  <g transform="rotate(${rot} ${x + w / 2} ${y + h / 2})">
    <rect class="lv-shadow" x="${x + 6}" y="${y + 8}" width="${w}" height="${h}" rx="3"/>
    <rect class="lv-glass" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>
    <g class="lv-stars">${sky(seed, n, x + 8, y + 8, w - 16, h - 16)}</g>
    <path class="lv-edge" d="M${x + 4} ${y + 4}h${w - 8}v${h - 8}h-${w - 8}z"/>
    ${extra}
  </g>`;

const window_ = `
  <rect class="lv-wall" x="0" y="0" width="400" height="400"/>
  <rect class="lv-light" x="232" y="34" width="132" height="220"/>
  <path class="lv-mullion" d="M298 34v220M232 144h132"/>
  <rect class="lv-sill" x="222" y="252" width="152" height="10"/>`;
const desk = figure => `
  ${window_}
  <rect class="lv-desk" x="0" y="318" width="400" height="82"/>
  <g transform="rotate(-14 284 250)">
    <rect class="lv-frame" x="236" y="186" width="96" height="120" rx="2"/>
    <rect class="lv-glass lit" x="244" y="194" width="80" height="104"/>
    <g class="lv-stars">${sky(7, 26, 248, 198, 72, 96, 2.2)}</g>
  </g>
  <path class="lv-leg" d="M262 318l-10-40M306 318l10-40"/>
  ${figure ? `<g class="lv-figure">
    <path d="M96 400c0-70 22-118 72-124 50 6 72 54 72 124z"/>
    <circle cx="168" cy="236" r="30"/>
    <circle cx="170" cy="204" r="15"/>
  </g>
  <path class="lv-loupe" d="M226 300l18-14"/><circle class="lv-loupe-rim" cx="252" cy="280" r="9"/>` : `
  <g class="lv-chair"><path d="M120 400V270h70v130M120 300h70"/></g>
  <path class="lv-loupe" d="M60 318l22-6"/><circle class="lv-loupe-rim" cx="90" cy="310" r="9"/>`}`;

const crate = `
  <rect class="lv-wall" width="400" height="400"/>
  <g class="lv-plates">${[0, 1, 2, 3, 4, 5].map(k => `<rect x="${92 + k * 36}" y="${92 - (k % 3) * 9}" width="22" height="110" rx="1.5"/>`).join('')}</g>
  <rect class="lv-crate" x="62" y="160" width="276" height="178" rx="3"/>
  <path class="lv-slat" d="M62 218h276M62 278h276M92 160v178M308 160v178"/>
  <g transform="rotate(-3 200 252)">
    <rect class="lv-label" x="124" y="222" width="152" height="62" rx="2"/>
    <path class="lv-andes" d="M132 272l18-22 10 12 16-26 16 22 12-12 18 26 14-10 12 10z"/>
    <text class="lv-type" x="200" y="240" text-anchor="middle">GLASS · WITH CARE</text>
    <text class="lv-type sm" x="200" y="280" text-anchor="middle">AREQUIPA, PERÚ → CAMBRIDGE, MASS.</text>
  </g>
  <rect class="lv-floor" y="338" width="400" height="62"/>`;

const negative = `
  <rect class="lv-wall" width="400" height="400"/>
  ${plate(70, 40, 260, 320, 31, 220, '', 2)}`;

// The blink: two nights of the same patch of sky. One speck is bigger on night B.
const VX = 226, VY = 178;
const blink = `
  <rect class="lv-wall" width="400" height="400"/>
  <g class="lv-blink" data-nonav role="button" tabindex="0" aria-label="Glass plate. Activate to switch between two nights.">
    ${plate(60, 30, 280, 340, 77, 120)}
    <circle class="lv-var a" cx="${VX}" cy="${VY}" r="1.4"/>
    <circle class="lv-var b" cx="${VX}" cy="${VY}" r="3.6"/>
    <circle class="lv-hit" cx="${VX}" cy="${VY}" r="22" data-var/>
    <path class="lv-ring" pathLength="1" d="M${VX - 16} ${VY + 2}c0-12 10-18 18-17 10 1 15 9 13 17-2 9-11 13-19 12-8-1-12-6-12-13"/>
    <text class="lv-night" x="80" y="60">NIGHT <tspan class="a">A</tspan><tspan class="b">B</tspan></text>
  </g>`;

function ledger() {
  const r = rng(11);
  const rows = Array.from({ length: 13 }, (_, k) => {
    const y = 88 + k * 22;
    const n = 1765 + k;
    return `<text x="70" y="${y}">${n}</text><text x="128" y="${y}">0 ${(20 + r() * 39).toFixed(0)} ${(r() * 59).toFixed(0).padStart(2, '0')}</text><text x="214" y="${y}">−7${(1 + r() * 4).toFixed(0)} ${(r() * 59).toFixed(0).padStart(2, '0')}</text><text x="294" y="${y}">${(14 + r() * 3).toFixed(1)}</text><text x="334" y="${y}">${(15.5 + r() * 2).toFixed(1)}</text>`;
  }).join('');
  return `<rect class="lv-wall" width="400" height="400"/>
    <rect class="lv-paper" x="40" y="26" width="324" height="374"/>
    <path class="lv-rule" d="${Array.from({ length: 15 }, (_, k) => `M40 ${70 + k * 22}h324`).join('')}M118 40v360M204 40v360M284 40v360"/>
    <g class="lv-hand">${rows}</g>
    <text class="lv-head" x="70" y="56">No.</text><text class="lv-head" x="128" y="56">R.A.</text><text class="lv-head" x="214" y="56">Dec.</text><text class="lv-head" x="294" y="56">Max. Min.</text>
    <text class="lv-hand hi" x="70" y="396">1777</text>`;
}

// 1912: the two straight lines through twenty-five stars.
function graph() {
  const r = rng(25);
  const pts = Array.from({ length: 25 }, () => r());
  const X = t => 70 + t * 290, Ymax = t => 300 - t * 200, Ymin = t => 340 - t * 200;
  const dots = pts.map(t => `<circle cx="${X(t).toFixed(1)}" cy="${(Ymax(t) + (r() - .5) * 16).toFixed(1)}" r="3.6"/><circle class="o" cx="${X(t).toFixed(1)}" cy="${(Ymin(t) + (r() - .5) * 16).toFixed(1)}" r="3.6"/>`).join('');
  return `<rect class="lv-paper" width="400" height="400"/>
    <path class="lv-axis" d="M60 40v320h310"/>
    <text class="lv-type sm" x="64" y="34">BRIGHTER ↑</text>
    <text class="lv-type sm" x="366" y="380" text-anchor="end">LONGER PERIOD →</text>
    <g class="lv-dots">${dots}</g>
    <path class="lv-line" pathLength="1" d="M${X(0)} ${Ymax(0)}L${X(1)} ${Ymax(1)}"/>
    <path class="lv-line l2" pathLength="1" d="M${X(0)} ${Ymin(0)}L${X(1)} ${Ymin(1)}"/>`;
}

const sea = `
  <rect class="lv-night-sky" width="400" height="400"/>
  <g class="lv-faint">${sky(5, 40, 0, 0, 400, 200, 1.4)}</g>
  <rect class="lv-sea" y="236" width="400" height="164"/>
  <circle class="lv-glow" cx="236" cy="226" r="34"/>
  <circle class="lv-lamp" cx="236" cy="226" r="3.5"/>
  <path class="lv-shimmer" d="M226 250h20M222 264h28M230 280h12M218 300h36"/>
  <g class="lv-maybe near"><path d="M190 246q46 14 92 0l-10 16h-72z"/><path d="M236 246v-18"/><text class="lv-type sm" x="236" y="290" text-anchor="middle">A LAMP, NEAR?</text></g>
  <g class="lv-maybe far"><path d="M232 226l2-24h4l2 24z"/><text class="lv-type sm" x="236" y="190" text-anchor="middle">A LIGHTHOUSE, FAR?</text></g>`;

const ruler = `
  <rect class="lv-night-sky" width="400" height="400"/>
  <g class="lv-faint">${sky(9, 60, 0, 0, 400, 400, 1.6)}</g>
  <path class="lv-tape" d="M0 380L170 210h60L400 380z"/>
  <path class="lv-ticks" d="${Array.from({ length: 9 }, (_, k) => { const t = Math.pow(k / 9, 1.7); const y = 380 - t * 170; const half = 200 - t * 170; return `M${200 - half * .98} ${y}h${half * 1.96}`; }).join('')}"/>
  <g class="lv-pulse"><circle class="lv-glow" cx="200" cy="150" r="46"/><circle class="lv-lamp" cx="200" cy="150" r="9"/></g>`;

// Hubble's plate: the smudge of Andromeda, a speck, and his pencil.
const hubble = crossed => `
  <rect class="lv-wall" width="400" height="400"/>
  <g transform="rotate(-2 200 200)">
    <rect class="lv-shadow" x="56" y="44" width="300" height="330" rx="3"/>
    <rect class="lv-glass" x="50" y="36" width="300" height="330" rx="3"/>
    <g class="lv-stars">${sky(41, 90, 60, 46, 280, 310, 2.4)}</g>
    <ellipse class="lv-smudge" cx="200" cy="200" rx="150" ry="46" transform="rotate(-32 200 200)"/>
    <ellipse class="lv-smudge core" cx="200" cy="200" rx="34" ry="14" transform="rotate(-32 200 200)"/>
    <circle class="lv-star-v" cx="262" cy="150" r="2.6"/>
    <path class="lv-pencil" d="M268 146l14-12"/>
    <text class="lv-pen" x="286" y="134">N</text>
    ${crossed ? `<path class="lv-strike" d="M282 136l18-20"/><text class="lv-pen hi" x="276" y="102">VAR!</text>` : ''}
  </g>`;

function galaxy() {
  const r = rng(3);
  let d = '';
  for (let k = 0; k < 520; k++) {
    const arm = k % 2, t = r() * 4.2, a = t + arm * Math.PI + (r() - .5) * .5;
    const rad = 12 + t * 34 + (r() - .5) * 14;
    const x = 200 + Math.cos(a) * rad, y = 200 + Math.sin(a) * rad * .46;
    d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r() * 1.3 + .4).toFixed(2)}"/>`;
  }
  return `<rect class="lv-night-sky" width="400" height="400"/>
    <g class="lv-faint">${sky(13, 50, 0, 0, 400, 400, 1.2)}</g>
    <g transform="rotate(-24 200 200)"><ellipse class="lv-glow wide" cx="200" cy="200" rx="150" ry="60"/><g class="lv-galaxy">${d}</g><ellipse class="lv-core" cx="200" cy="200" rx="22" ry="12"/></g>`;
}

const letter = `
  <rect class="lv-wall" width="400" height="400"/>
  <g transform="rotate(4 200 210)">
    <rect class="lv-shadow" x="56" y="116" width="300" height="190"/>
    <rect class="lv-paper env" x="50" y="108" width="300" height="190"/>
    <path class="lv-rule" d="M50 108l150 96 150-96"/>
    <rect class="lv-stamp" x="282" y="122" width="48" height="56"/>
    <text class="lv-type sm inv" x="306" y="168" text-anchor="middle">SVERIGE</text>
    <circle class="lv-post" cx="268" cy="164" r="24"/><text class="lv-type sm" x="268" y="166" text-anchor="middle">STOCKHOLM</text>
    <text class="lv-hand" x="96" y="236">Miss Henrietta S. Leavitt</text>
    <text class="lv-hand" x="96" y="256">Harvard College Observatory</text>
    <text class="lv-hand" x="96" y="276">Cambridge, Mass., U.S.A.</text>
  </g>`;

const moon = `
  <rect class="lv-night-sky" width="400" height="400"/>
  <g class="lv-faint">${sky(21, 70, 0, 0, 400, 400, 1.5)}</g>
  <circle class="lv-moon" cx="200" cy="200" r="120"/>
  <path class="lv-moon-lit" d="M200 80a120 120 0 0 1 0 240a52 120 0 0 0 0-240z"/>
  <circle class="lv-crater" cx="160" cy="236" r="13"/>
  <text class="lv-type sm faint" x="160" y="266" text-anchor="middle">LEAVITT</text>`;

const cover = `
  <rect class="lv-wall" width="400" height="700"/>
  ${plate(58, 70, 284, 360, 101, 170, `<path class="lv-ring" pathLength="1" d="M232 214c-2-13 10-20 19-18 11 2 15 11 12 19-3 9-12 12-20 10-7-2-11-6-11-11"/>`, -4)}`;

/* ---------- The book ---------- */
const S = (b, fit) => svg('0 0 400 400', b, fit);
export const story = {
  id: 'leavitt',
  title: 'It Is Worthy of Notice',
  pages: [
    { layout: 'cover', art: svg('0 0 400 700', cover), alt: 'A glass photographic plate scattered with dark specks of stars. One speck is circled in amber ink.',
      eyebrow: 'Cambridge, Massachusetts · 1904–1912', text: 'Henrietta Swan Leavitt, and a sentence about the size of everything' },
    { art: S(desk(true)), alt: 'A woman, seen from behind, sits at a wooden frame holding a glass plate up against a bright window.',
      text: ['Her job was to look at the sky', 'without ever looking up.'] },
    { art: S(crate), alt: 'A wooden crate packed upright with glass plates. Its label shows mountains and reads Arequipa, Perú, to Cambridge, Mass.',
      eyebrow: 'Harvard College Observatory', text: ['The sky came to her by post, on glass,', 'photographed from a mountain station above Arequipa, in Peru.'] },
    { art: S(negative), alt: 'A whole plate, pale grey, covered in hundreds of black specks.',
      text: ['On glass, the stars are black.', 'She was paid, eventually, thirty cents an hour to find the ones that changed.'] },
    { id: 'blink', art: S(blink, 'xMidYMid meet'), cls: 'lv-blinkpage', size: 'm',
      alt: 'A plate of dark specks that can be switched between two nights. One speck changes size.',
      text: ['Tap the glass to switch between two nights. Most specks stay put. Find the one that doesn’t.', 'There. A star that swells and fades, again and again.'],
      on: blinkPlate },
    { art: S(ledger()), alt: 'A ruled ledger page, columns of handwritten numbers. The last number, in amber, is 1777.',
      text: ['She found them by the hundred.', 'In 1908 she published a list of 1,777 of them, in two small clouds of stars in the southern sky.'] },
    { layout: 'text', text: ['Partway through, there is this:'], turn: 'fade' },
    { layout: 'text', cls: 'lv-typeset', turn: 'drift', eyebrow: 'Annals of the Harvard College Observatory, vol. 60',
      text: ['It is worthy of notice that in Table VI the brighter variables have the longer {periods|A period is the time a star takes to brighten, dim and brighten again. For these stars: days, or weeks.}.'] },
    { layout: 'text', size: 'xl', text: ['No exclamation mark.', 'Just the fact, set down plainly. And the work went on.'] },
    { art: S(graph(), 'xMidYMid meet'), cls: 'lv-graphpage', eyebrow: 'Circular 173 · 1912',
      alt: 'A graph of twenty-five stars: two straight lines rise through the points, brighter to longer period.',
      text: ['Four years later she had twenty-five of these stars, and a graph.', '“A straight line can be readily drawn,” the paper says.', 'It went out over the director’s name. Its first line says it was prepared by Miss Leavitt.'] },
    { art: S(sea), tone: 'dark', turn: 'fade', alt: 'Night at sea. A single light sits on the horizon. Faint outlines suggest it could be a small boat close by or a lighthouse far away.',
      text: ['At sea, at night, a light.', 'A small lamp nearby, or a lighthouse far away?', 'If you knew how bright it really was, you would know how far.'] },
    { art: S(ruler), tone: 'dark', alt: 'A star pulses above a measuring tape that runs away into the dark.',
      text: ['Her stars give their real brightness away by the rhythm of their blinking.', 'Time the blink. Know the brightness. Know the distance.', 'A ruler, for places nobody can go.'] },
    { art: S(desk(false)), turn: 'fade', alt: 'The same window and plate frame. The chair is empty.',
      text: ['She died of cancer in December 1921. She was fifty-three.'] },
    { art: S(hubble(false)), eyebrow: 'Mount Wilson, California · October 1923', alt: 'A glass plate showing the long smudge of the Andromeda nebula. A pencil mark labels one speck N.',
      text: ['Two years later, a man with a bigger telescope photographed a smudge called Andromeda.', 'He marked one speck *N*, for nova.'] },
    { art: S(hubble(true)), turn: 'cut', alt: 'The same plate. The N is crossed out. Above it, in red: VAR!',
      text: ['Then he crossed it out.', 'It was one of her stars, the blinking kind. He could time it. He could measure the distance.'] },
    { art: S(galaxy()), tone: 'dark', turn: 'drift', alt: 'A spiral galaxy of thousands of points of light.',
      text: ['Andromeda was not a cloud inside our galaxy.', 'It was another galaxy. The universe got very much larger.'] },
    { art: S(letter), eyebrow: 'Stockholm · mid-1920s', alt: 'An envelope with a Swedish stamp, addressed by hand to Miss Henrietta S. Leavitt, Harvard College Observatory.',
      text: ['A Swedish mathematician wrote to Harvard. He wanted to put her name forward for a Nobel Prize.', 'Harvard told him she had been dead for some years.', 'The prize is not given to the dead.'] },
    { art: S(moon), tone: 'dark', turn: 'drift', alt: 'The Moon, mostly in shadow. On the dark side, a small crater labelled Leavitt.',
      text: ['There is a crater on the Moon named Leavitt.', 'It is on the far side: the side we never see.'] }
  ]
};

// The one moving page: switch nights by tapping the glass; tap the changing speck to mark it.
function blinkPlate(el, ctx) {
  const g = el.querySelector('.lv-blink');
  const flip = () => { g.classList.toggle('night-b'); ctx.api.haptic?.(4); };
  const found = () => {
    if (g.classList.contains('found')) return flip();
    g.classList.add('found');
    ctx.api.haptic?.([10, 40, 10]);
    if (ctx.beat < 1) ctx.next();
  };
  const onClick = e => { e.stopPropagation(); e.target.closest('[data-var]') && g.classList.contains('seen') ? found() : (flip(), g.classList.add('seen')); };
  const onKey = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); flip(); g.classList.add('seen'); } };
  g.addEventListener('click', onClick);
  g.addEventListener('keydown', onKey);
  return () => { g.removeEventListener('click', onClick); g.removeEventListener('keydown', onKey); };
}

export const mount = (stage, api) => book(stage, story, api);
