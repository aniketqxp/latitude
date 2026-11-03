// The Empty Dance Floor — Granovetter's threshold model, staged as a party.
// Every guest dances once at least `t` others are dancing. The room's fate depends
// on the shape of those numbers, not their average.
const N = 24;
const NS = 'http://www.w3.org/2000/svg';
const HUES = ['#FF5FA2', '#FFD166', '#4CD7F0', '#A98BFF', '#7CF0A6', '#FF8A5B'];

export const curtain = {
  real: [
    'The model is Mark Granovetter’s (1978). He imagined a hundred people in a square, each with a “threshold” — how many others must already be rioting before they join. Thresholds of 0, 1, 2 … 99 produce a full riot. Change the person with threshold 1 to 2, and the instigator riots alone.',
    'His point was that two crowds with almost identical members can behave completely differently, so you can’t read people’s preferences off what a crowd ends up doing.',
    'Related, and better studied: *pluralistic ignorance* — when most people privately want something but each assumes the others don’t, because nobody is visibly doing it (Prentice & Miller, 1993, on drinking norms at Princeton).'
  ],
  invented: [
    'The guests, the party and the music. Real people don’t carry a single fixed number around; thresholds shift with mood, friends, songs and drinks.',
    'The random crowds in the last part are drawn from a made-up distribution chosen to make tipping points visible, not from data about dancing.'
  ],
  open: [
    'How far threshold models explain real cascades — protests, fashions, standing ovations — is debated. They are a way of seeing, not a measurement.'
  ],
  sources: [
    'Granovetter, M. (1978). Threshold models of collective behavior. *American Journal of Sociology*, 83(6), 1420–1443.',
    'Schelling, T. C. (1978). *Micromotives and Macrobehavior*. Norton.',
    'Prentice, D. A. & Miller, D. T. (1993). Pluralistic ignorance and alcohol use on campus. *Journal of Personality and Social Psychology*, 64(2).'
  ]
};

export function mount(stage, api) {
  stage.innerHTML = `<div class="df">
    <div class="df-room">
      <svg class="df-svg" viewBox="0 0 400 380" role="group" aria-label="The party, seen from above the balcony">
        <defs>
          <radialGradient id="dfFloor" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3A2470"/><stop offset="1" stop-color="#1B1236"/></radialGradient>
          <filter id="dfBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
          <pattern id="dfTiles" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="scale(1 .62) rotate(45)"><rect width="26" height="26" fill="none" stroke="rgba(255,255,255,.06)"/></pattern>
        </defs>
        <ellipse cx="200" cy="200" rx="150" ry="98" fill="url(#dfFloor)"/>
        <ellipse cx="200" cy="200" rx="150" ry="98" fill="url(#dfTiles)"/>
        <g class="df-lights" filter="url(#dfBlur)">
          <circle class="l1" cx="150" cy="190" r="60" fill="#FF5FA2"/>
          <circle class="l2" cx="250" cy="210" r="60" fill="#4CD7F0"/>
          <circle class="l3" cx="200" cy="170" r="55" fill="#FFD166"/>
        </g>
        <g class="df-ball"><path d="M200 0v34" /><circle cx="200" cy="44" r="10"/></g>
        <g class="df-guests"></g>
      </svg>
      <p class="df-count" aria-live="polite"></p>
    </div>
    <div class="df-script">
      <p class="df-line" id="dfLine" aria-live="polite"></p>
      <div class="df-acts" id="dfActs"></div>
    </div>
  </div>`;

  const svg = stage.querySelector('.df-svg');
  const layer = svg.querySelector('.df-guests');
  const lineEl = stage.querySelector('#dfLine');
  const acts = stage.querySelector('#dfActs');
  const countEl = stage.querySelector('.df-count');
  const timers = new Set();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
  const speed = api.reduced ? 0 : 1;

  // Where people stand: a loose ring by the walls. Where they dance: scattered across the floor.
  const wall = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 + .13;
    return [200 + Math.cos(a) * 176, 206 + Math.sin(a) * 140];
  });
  const floorSpot = Array.from({ length: N }, (_, i) => {
    const r = Math.sqrt((i + .5) / N), a = i * 2.39996;
    return [200 + Math.cos(a) * r * 118, 200 + Math.sin(a) * r * 72];
  });

  let guests = [];
  let xray = false;
  let mode = 'idle'; // idle | await-you | await-any | free | running
  let onSettle = null;

  function build(thresholds, youIndex) {
    layer.textContent = '';
    const spots = floorSpot.slice().sort(() => Math.random() - .5);
    guests = thresholds.map((t, i) => {
      const g = document.createElementNS(NS, 'g');
      g.setAttribute('class', 'df-g' + (i === youIndex ? ' you' : ''));
      g.setAttribute('role', 'button');
      g.setAttribute('tabindex', '0');
      g.style.setProperty('--hue', HUES[i % HUES.length]);
      g.style.setProperty('--dl', (Math.random() * -1.2).toFixed(2) + 's');
      g.style.setProperty('--du', (.42 + Math.random() * .2).toFixed(2) + 's');
      g.innerHTML = `<circle class="hit" r="17" cy="-14"/><g class="bob"><ellipse class="sh" rx="9" ry="3"/><path class="body" d="M-7.5 0C-8.5-13-6-21 0-21S8.5-13 7.5 0z"/><circle class="head" cy="-27" r="6.2"/>${i === youIndex ? '<circle class="ring" cy="-14" r="16"/>' : ''}</g><text class="th" y="-40"></text>`;
      layer.appendChild(g);
      const guest = { t, d: false, g, i, you: i === youIndex, wall: wall[i], floor: spots[i] };
      g.addEventListener('click', () => tap(guest));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(guest); } });
      return guest;
    });
    // draw back-to-front so nearer guests overlap farther ones
    guests.slice().sort((a, b) => a.wall[1] - b.wall[1]).forEach(gs => layer.appendChild(gs.g));
    paint();
  }

  function label(gs) {
    const who = gs.you ? 'You' : `Guest ${gs.i + 1}`;
    if (gs.d) return `${who}, dancing`;
    return xray ? `${who}, will dance once ${gs.t} ${gs.t === 1 ? 'other is' : 'others are'} dancing` : `${who}, by the wall`;
  }
  function paint() {
    let n = 0;
    for (const gs of guests) {
      const [x, y] = gs.d ? gs.floor : gs.wall;
      gs.g.style.transform = `translate(${x}px, ${y}px)`;
      gs.g.classList.toggle('on', gs.d);
      gs.g.querySelector('.th').textContent = gs.d ? '' : gs.t;
      gs.g.setAttribute('aria-label', label(gs));
      n += gs.d;
    }
    svg.classList.toggle('xray', xray);
    svg.style.setProperty('--heat', (n / N).toFixed(3));
    countEl.textContent = n === 0 ? 'nobody dancing' : n === N ? 'everyone dancing' : `${n} dancing · ${N - n} by the wall`;
    return n;
  }

  // One round at a time: everyone whose threshold is met joins, then the room looks again.
  function cascade() {
    mode = 'running';
    const n = paint();
    const joiners = guests.filter(gs => !gs.d && gs.t <= n);
    if (!joiners.length) { later(() => { const cb = onSettle; onSettle = null; cb && cb(n); }, 500 * speed); return; }
    joiners.forEach((gs, k) => later(() => { gs.d = true; paint(); api.haptic?.(4); }, k * 90 * speed));
    const gap = Math.max(140, 520 - n * 18);
    later(cascade, (joiners.length * 90 + gap) * speed);
  }

  function tap(gs) {
    if (mode === 'running' || gs.d) return;
    if (mode === 'await-you' && !gs.you) { say('That’s someone else. You’re the one with the ring.'); return; }
    if (mode === 'idle') return;
    gs.t = 0; gs.d = true;
    api.haptic?.(14);
    cascade();
  }

  function say(text, buttons = []) {
    lineEl.classList.remove('in'); void lineEl.offsetWidth;
    lineEl.innerHTML = text;
    lineEl.classList.add('in');
    acts.textContent = '';
    for (const [label, fn, ghost] of buttons) {
      const b = document.createElement('button');
      b.className = 'df-btn' + (ghost ? ' ghost' : '');
      b.textContent = label;
      b.onclick = fn;
      acts.appendChild(b);
    }
  }

  // Room A: you are 0, everyone else is 1, 2, 3 … 23. Room B: the 1 becomes a 2.
  const order = Array.from({ length: N }, (_, i) => i).sort(() => Math.random() - .5);
  const youAt = order.indexOf(0);
  const roomA = () => order.map(k => k);
  const roomB = () => order.map(k => (k === 1 ? 2 : k));
  function randomRoom() {
    // a lumpy crowd: mostly nervous, a few eager, the odd immovable
    return Array.from({ length: N }, () => {
      const r = Math.random();
      const t = r < .08 ? 1 + Math.floor(Math.random() * 2) : r < .9 ? Math.round(3 + Math.abs(gauss()) * 5) : 16 + Math.floor(Math.random() * 8);
      return Math.min(N - 1, t);
    });
  }
  function gauss() { return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random()); }

  const beats = {
    start() {
      mode = 'idle'; xray = false; build(roomA(), youAt);
      say('A party. Twenty-four people, one of them you. The music is good. <em>Nobody is dancing.</em>', [['Go on', beats.numbers]]);
    },
    numbers() {
      say('Everyone here would dance — the moment enough other people are. Each has a number. Most don’t know their own.', [['Show me the numbers', () => { xray = true; paint(); beats.you(); }]]);
    },
    you() {
      mode = 'await-you';
      say('Yours is zero. You have no idea why tonight. <em>Tap yourself.</em>');
      onSettle = () => say('The person who needed one dancer got one. The person who needed two got two. The room went up like a row of matches.', [['Again', beats.roomB]]);
    },
    roomB() {
      mode = 'idle'; build(roomB(), youAt);
      say('Same party, a minute earlier. One small difference: the guest who needed one dancer now needs two.', [['Fine', () => {
        mode = 'await-you';
        say('Zero, as before. <em>Tap yourself.</em>');
        onSettle = () => say('You dance alone. Twenty-two people were one brave person away from joining. From outside, the two rooms looked identical: same faces, same music, nearly the same numbers. One was a party. The other was twenty-three people deciding it wasn’t.', [['Do something about it', beats.recruit]]);
      }]]);
    },
    recruit() {
      mode = 'await-any';
      say('You can’t rewire a room. You can talk to one person. <em>Tap any guest to persuade them.</em>');
      onSettle = n => say(n === N
        ? 'Whoever you picked, it caught. The twenty-third dancer was never the hard part. The second one was.'
        : 'Hm. Not this time.', [['Let me play', beats.free]]);
    },
    free() {
      mode = 'free'; xray = true; build(randomRoom(), -1);
      const loop = () => { mode = 'free'; onSettle = loop; };
      loop();
      say('New crowds. Nobody here is zero. Tap anyone to make them brave, and see what catches.', [
        ['Another crowd', () => { if (mode === 'running') return; build(randomRoom(), -1); loop(); }],
        ['Numbers', () => { xray = !xray; paint(); }, true],
        ['Start over', () => { if (mode !== 'running') beats.start(); }, true]
      ]);
    }
  };
  beats.start();

  return () => timers.forEach(clearTimeout);
}
