// The Ship of You — a scroll-driven fable. The reader is the shipwright: scrolling replaces
// the planks, then rebuilds the old ones into a rival ship; then the ship turns out to be them.
const P = 20; // planks per hull: 4 strakes × 5

export const curtain = {
  real: [
    'Plutarch (*Life of Theseus*, 23) records that the Athenians preserved Theseus’s ship, replacing decayed timbers, and that philosophers used it as an example in the argument about growth and identity.',
    'Thomas Hobbes added the twist of the rebuilt ship in *De Corpore* (1655), part II, ch. 11.',
    'The cell ages are real orders of magnitude from carbon-14 dating and turnover studies: cortical neurons are as old as the person (Spalding et al. 2005; Bhardwaj et al. 2006); fat cells turn over about 10% a year (Spalding et al. 2008); heart muscle cells renew at about 1% a year at 25, falling to under 0.5% by 75 (Bergmann et al. 2009); the eye lens nucleus is formed before birth (Lynnerup et al. 2008).',
    'The “every seven years your body is replaced” claim is a myth. Turnover varies from days to never.',
    'Derek Parfit really did describe his view of identity as liberating, in *Reasons and Persons* (1984), with the image of a glass tunnel whose walls disappeared.'
  ],
  invented: [
    'The ship has twenty planks because twenty fits on a phone. The plank-pile is a liberty.',
    'The ages shown for your parts come from a deliberately simple model — a constant renewal rate per tissue, applied from birth. Real turnover changes with age, health and childhood growth. Treat the numbers as the right size, not the right value.'
  ],
  open: [
    'Which ship is Theseus’s, and whether you are the person who made a promise ten years ago, remain properly unresolved. Each position on the ship has serious defenders.'
  ],
  sources: [
    'Plutarch. *Life of Theseus*, 23.1.',
    'Hobbes, T. (1655). *De Corpore*, II.11.7.',
    'Spalding, K. L. et al. (2005). Retrospective birth dating of cells in humans. *Cell*, 122(1).',
    'Bhardwaj, R. D. et al. (2006). Neocortical neurogenesis in humans is restricted to development. *PNAS*, 103(33).',
    'Spalding, K. L. et al. (2008). Dynamics of fat cell turnover in humans. *Nature*, 453.',
    'Bergmann, O. et al. (2009). Evidence for cardiomyocyte renewal in humans. *Science*, 324(5923).',
    'Lynnerup, N. et al. (2008). Radiocarbon dating of the human eye lens crystallines reveal proteins without carbon turnover throughout life. *PLoS ONE*, 3(1).',
    'Parfit, D. (1984). *Reasons and Persons*. Oxford University Press, §95.'
  ]
};

// k: renewal per year. pre: months of existence before birth (for parts never replaced).
const PARTS = [
  { id: 'gut', name: 'Gut lining', k: 365 / 4, note: 'Rebuilt every few days. The lining you had on Monday is mostly gone by Friday.' },
  { id: 'skin', name: 'Outer skin', k: 365 / 40, note: 'The layer you touch the world with is about a month old. The older layers have already left, quietly.' },
  { id: 'blood', name: 'Red blood cells', k: 365 / 60, note: 'Each red cell lasts about four months before it is taken apart and recycled.' },
  { id: 'bone', name: 'Skeleton', k: 0.1, note: 'Bone is remodelled constantly — roughly a tenth of an adult skeleton each year. You are not as solid as you look.' },
  { id: 'fat', name: 'Fat cells', k: 0.1, note: 'About a tenth of fat cells are replaced every year, whatever the total amount is doing.' },
  { id: 'heart', name: 'Heart muscle', k: 0.008, note: 'Renewed slowly: around one percent a year when young, less later. Most of the cells beating now were beating when you were small.' },
  { id: 'brain', name: 'Cortex neurons', pre: 5, note: 'Almost all as old as you, made before you were born. These are the cells doing the remembering.' },
  { id: 'lens', name: 'Eye lens core', pre: 8, note: 'Built before birth and never replaced. You are reading this through the oldest part of you.' }
];
const ageOf = (p, A) => p.pre != null ? A + p.pre / 12 : (1 - Math.exp(-p.k * A)) / p.k;
function fmt(p, A, y) {
  if (p.pre != null) return `${A} ${A === 1 ? 'year' : 'years'} and ~${p.pre} months`;
  const d = y * 365.25;
  if (d < 45) return `${Math.round(d)} days`;
  if (y < 1.5) return `${Math.round(y * 12)} months`;
  return `${Math.round(y)} years`;
}
// fresh amber → red → old violet
const STOPS = [[247, 181, 56], [217, 83, 79], [124, 92, 196]];
function tint(r) {
  const x = Math.max(0, Math.min(1, r)) * 2, i = Math.min(1, Math.floor(x)), f = x - i;
  return 'rgb(' + STOPS[i].map((c, j) => Math.round(c + (STOPS[i + 1][j] - c) * f)).join(',') + ')';
}

const sea = (y, a) => `M-40 ${y}` + Array.from({ length: 14 }, (_, i) => i ? ' t40 0' : `q20-${a} 40 0`).join('') + 'V300H-40z';

function hull(id) {
  const planks = [];
  for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) {
    // odd strakes are staggered half a plank, like real planking
    planks.push(`<rect class="pl old" data-k="${row * 5 + col}" x="${-100 + col * 40 - (row % 2 ? 20 : 0)}" y="${row * 11}" width="${col === 4 && row % 2 ? 60 : 40}" height="11"/>`);
  }
  return `<g class="ship" id="${id}">
    <clipPath id="${id}-c"><path d="M-100 0H100C96 18 80 38 62 44H-62C-80 38-96 18-100 0z"/></clipPath>
    <path class="mast" d="M0 0V-118M-48 -106H48"/>
    <path class="sail" d="M-46 -104Q0-96 46-104L40-38Q0-30-40-38z"/>
    <path class="flag" d="M0-118l18 5-18 5"/>
    <g clip-path="url(#${id}-c)">${planks.join('')}</g>
    <path class="hull-line" d="M-100 0H100C96 18 80 38 62 44H-62C-80 38-96 18-100 0z"/>
    <circle class="eye" cx="84" cy="10" r="3"/>
  </g>`;
}

export function mount(stage, api) {
  stage.innerHTML = `<div class="sh">
    <header class="sh-title">
      <p class="cap">A fable with moving parts</p>
      <h1>The Ship <i>of</i> You</h1>
      <p class="sh-hint">Scroll slowly. You’re the shipwright.</p>
    </header>
    <div class="sh-scrolly">
      <figure class="sh-stage" aria-hidden="true">
        <svg viewBox="0 0 460 270">
          <path class="sea back" d="${sea(196, 7)}"/>
          <g class="ship-b"><path class="ribs" d="M-90 4v20M-60 4v34M-30 4v40M0 4v40M30 4v40M60 4v34M90 4v20M-100 0H100"/>${hull('shipB')}</g>
          <g class="ship-a">${hull('shipA')}</g>
          <path class="sea front" d="${sea(208, 6)}"/>
          <g class="dock"><rect x="364" y="232" width="110" height="7"/><path d="M376 239v40M416 239v40M456 239v40"/><g class="pile"></g></g>
        </svg>
        <figcaption class="sh-tally"></figcaption>
      </figure>
      <div class="sh-steps">
        <section class="sh-step"><p>When Theseus came home from Crete, the Athenians kept his ship in the harbour, as a monument.</p></section>
        <section class="sh-step scrub"><p>Wood rots. When a plank went soft, they replaced it. Then another. <em>Keep scrolling — every plank is yours to replace.</em></p></section>
        <section class="sh-step"><p>Eventually not one original plank remained. Philosophers came down to the harbour to look at it, started arguing, and never really stopped.</p></section>
        <section class="sh-step scrub"><p>Then Thomas Hobbes made it worse. Suppose someone had kept every rotten plank, and quietly rebuilt them, in order, into a ship.</p></section>
        <section class="sh-step ask">
          <p>Two ships in the harbour. <em>Which one did Theseus sail?</em></p>
          <div class="sh-choices" role="group" aria-label="Choose an answer">
            <button data-a="0">The one in the harbour all along</button>
            <button data-a="1">The one from the old planks</button>
            <button data-a="2">Both</button>
            <button data-a="3">It’s a bad question</button>
          </div>
          <p class="sh-answer" aria-live="polite"></p>
        </section>
      </div>
    </div>

    <section class="sh-you">
      <h2>You are also a ship.</h2>
      <p class="sh-lede">You’re refitted faster than the Athenians could manage — just not evenly. Some of you was replaced this week. Some of you never will be.</p>
      <label class="sh-age"><span>Your age</span><output id="ageOut">30</output><input id="age" type="range" min="1" max="90" value="30" aria-describedby="ageHelp"></label>
      <p id="ageHelp" class="cap">Drag. Colour shows how old each part is: <b class="young">new</b> to <b class="old">as old as you</b>.</p>
      <div class="sh-body">
        <svg class="body" viewBox="0 0 200 380" aria-hidden="true">
          <g class="p-sil" data-p="fat">
            <circle cx="100" cy="50" r="30"/>
            <path d="M66 92h68q12 0 14 12l14 96q1 8-7 9t-9-7l-10-70v56l6 150q0 10-11 10t-12-10l-12-120-12 120q-1 10-12 10t-11-10l6-150v-56l-10 70q-1 8-9 7t-7-9l14-96q2-12 14-12z"/>
          </g>
          <path class="p-line" data-p="bone" d="M100 84v130M100 104c-14 0-22 6-24 10M100 104c14 0 22 6 24 10M100 120c-12 0-20 5-22 9M100 120c12 0 20 5 22 9M100 136c-10 0-17 4-19 8M100 136c10 0 17 4 19 8M78 214h44M86 216l-4 140M114 216l4 140M70 100l-10 98M130 100l10 98"/>
          <path class="p-line thin" data-p="blood" d="M95 92q-4 30 2 60t-6 60l-6 140M105 92q4 30-2 60t6 60l6 140M76 104q-6 40-12 92M124 104q6 40 12 92"/>
          <path class="p-line" data-p="gut" d="M86 168h28q6 0 6 6t-6 6H86q-6 0-6 6t6 6h28q6 0 6 6t-6 6h-20"/>
          <path class="p-fill" data-p="heart" d="M108 122c3-6 13-6 13 2 0 7-13 15-13 15s-13-8-13-15c0-8 10-8 13-2z"/>
          <path class="p-fill" data-p="brain" d="M78 42c0-14 10-22 22-22s22 8 22 22c0 6-4 9-8 9H86c-4 0-8-3-8-9z"/>
          <path class="p-gyri" d="M86 34q6-6 10 0t10 0 8 2M84 44q8-4 14 0t14-2"/>
          <g class="p-fill" data-p="lens"><circle cx="89" cy="60" r="4.2"/><circle cx="111" cy="60" r="4.2"/></g>
        </svg>
        <ul class="sh-parts">${PARTS.map(p => `<li><button data-p="${p.id}"><i class="sw"></i><span class="nm">${p.name}</span><span class="ag"></span></button></li>`).join('')}</ul>
      </div>
      <p class="sh-note" aria-live="polite"></p>
    </section>

    <section class="sh-end">
      <p>So it isn’t true that you’re replaced every seven years. Some of you is replaced by Thursday; some of you, never.</p>
      <p>The neurons that remember a promise you made at nineteen are, mostly, the cells that were there when you made it. Their molecules have been swapped out many times since. The promise is held in a pattern, kept in old wood, rebuilt by new materials.</p>
      <p class="big">So — who has to keep it?</p>
      <p>Derek Parfit spent years on questions like this and concluded that identity matters less than it feels like it does. He said the thought was a relief: as if the walls of a glass tunnel he’d been living in had disappeared.</p>
      <p>Not everyone finds it a relief. According to Plutarch, the Athenians kept patching the ship for centuries. Nobody records them deciding whose it was.</p>
    </section>
  </div>`;

  const $ = s => stage.querySelector(s);
  const steps = [...stage.querySelectorAll('.sh-step')];
  const plA = [...stage.querySelectorAll('#shipA .pl')];
  const plB = [...stage.querySelectorAll('#shipB .pl')];
  // a fixed, shuffled order in which planks rot
  const rot = Array.from({ length: P }, (_, i) => i).sort(() => Math.random() - .5);
  const svg = $('.sh-stage svg');
  const pile = $('.pile');
  const tally = $('.sh-tally');
  let last = '';

  function frame() {
    raf = 0;
    const vh = innerHeight, line = vh * .62;
    let active = 0;
    const prog = steps.map((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.top < line) active = i;
      return Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height - vh * .25)));
    });
    const replaced = active > 1 ? P : active === 1 ? Math.round(prog[1] * P) : 0;
    const built = active > 3 ? P : active === 3 ? Math.round(prog[3] * P) : 0;
    const key = `${active}|${replaced}|${built}`;
    if (key === last) return;
    last = key;
    rot.forEach((k, n) => plA[k].classList.toggle('old', n >= replaced));
    rot.forEach((k, n) => plB[k].classList.toggle('in', n < built));
    svg.classList.toggle('split', active >= 3);
    svg.classList.toggle('rigged', built === P);
    pile.innerHTML = Array.from({ length: replaced - built }, (_, i) => `<rect x="${384 + (i % 3) * 3}" y="${227 - i * 3.2}" width="${64 - (i % 2) * 6}" height="3" transform="rotate(${(i * 37 % 7) - 3} 416 ${227 - i * 3})"/>`).join('');
    tally.textContent = active >= 3
      ? `harbour ship: 0 original planks · rebuilt ship: ${built} of ${P}`
      : `original planks: ${P - replaced} of ${P}`;
    if (replaced !== +svg.dataset.r) { svg.dataset.r = replaced; api.haptic?.(3); }
  }
  let raf = 0;
  const onScroll = () => { raf ||= requestAnimationFrame(frame); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  frame();

  const answers = [
    'The continuity answer. It never stopped being a ship, never left the harbour, was cared for the whole time. A river is like this. So, arguably, is a reputation.',
    'The material answer. Theseus touched *these* planks. Museums tend to agree with you: they will display a rotten original over a perfect replica.',
    'The four-dimensional answer. Things are long in time the way roads are long in space; two ships can share a stretch of history the way two roads share a bridge.',
    'The deflationary answer. “Same ship” is a phrase built for ordinary days, not for Hobbes. Nothing is hidden. We just never had to decide.'
  ];
  stage.querySelectorAll('.sh-choices button').forEach(b => b.addEventListener('click', () => {
    stage.querySelectorAll('.sh-choices button').forEach(x => x.setAttribute('aria-pressed', x === b));
    const a = $('.sh-answer');
    a.innerHTML = answers[b.dataset.a].replace(/\*([^*]+)\*/g, '<em>$1</em>') + ' <span class="quiet">Every answer has its people. None has won.</span>';
    a.classList.remove('in'); void a.offsetWidth; a.classList.add('in');
  }));

  // The body: age slider recolours every part by how old it is relative to you.
  const age = $('#age'), out = $('#ageOut'), note = $('.sh-note'), bodyEl = $('.sh-body');
  let focus = null;
  function body() {
    const A = +age.value;
    out.textContent = A;
    for (const p of PARTS) {
      const y = ageOf(p, A), c = tint(y / (A + .75)), btn = stage.querySelector(`.sh-parts [data-p="${p.id}"]`);
      bodyEl.style.setProperty(`--c-${p.id}`, c);
      btn.style.setProperty('--c', c);
      btn.querySelector('.ag').textContent = fmt(p, A, y);
    }
  }
  function pick(id) {
    focus = focus === id ? null : id;
    bodyEl.dataset.focus = focus || '';
    stage.querySelectorAll('.sh-parts button').forEach(b => b.setAttribute('aria-pressed', b.dataset.p === focus));
    const p = PARTS.find(x => x.id === focus);
    note.textContent = p ? p.note : '';
  }
  age.addEventListener('input', body);
  stage.querySelectorAll('.sh-parts button').forEach(b => b.addEventListener('click', () => pick(b.dataset.p)));
  stage.querySelectorAll('svg.body [data-p]').forEach(el => el.addEventListener('click', () => pick(el.dataset.p)));
  body();

  return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
}
