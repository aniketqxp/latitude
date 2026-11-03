// Department of Permissions — a very small bureaucracy. You queue, you fill in a form,
// the Registry compares your fear with what was measured, and nobody comes to stamp it.
export const curtain = {
  real: [
    'The *spotlight effect*: people overestimate how much others notice their appearance and actions. In the original study, students sent into a room in an embarrassing T-shirt guessed about half the room would notice; about a quarter did (Gilovich, Medvec & Savitsky, 2000).',
    'The *illusion of transparency*: speakers believe their nervousness is far more visible than it is to the audience (Savitsky & Gilovich, 2003).',
    'People expect others to judge their public blunders more harshly than those others actually do (Savitsky, Epley & Gilovich, 2001).',
    'Commuters expected talking to a stranger to be unpleasant; those asked to do it reported a more pleasant journey (Epley & Schroeder, 2014). After a first conversation, people underestimate how much the other person liked them — the *liking gap* (Boothby et al., 2018).'
  ],
  invented: [
    'The Department, the fourth floor, M. Ortolan and the Registry are fiction. The Registry only shows what the studies support: a rough number for the hat, and a direction for the rest. It never invents a precise figure.',
    'The studies were mostly done with American university students in particular situations. Your hat, your meeting and your stranger may differ.'
  ],
  open: [
    'Forms 88-C and 0 have no Registry entry on purpose. Whether changing your mind in public costs you, or quietly earns respect, is not well measured.',
    'Effect sizes in this area vary between studies, and some later replications of the spotlight effect found smaller gaps. The direction has held up better than the exact size.'
  ],
  sources: [
    'Gilovich, T., Medvec, V. H. & Savitsky, K. (2000). The spotlight effect in social judgment. *Journal of Personality and Social Psychology*, 78(2), 211–222.',
    'Savitsky, K. & Gilovich, T. (2003). The illusion of transparency and the alleviation of speech anxiety. *Journal of Experimental Social Psychology*, 39(6).',
    'Savitsky, K., Epley, N. & Gilovich, T. (2001). Do others judge us as harshly as we think? *Journal of Personality and Social Psychology*, 81(1).',
    'Epley, N. & Schroeder, J. (2014). Mistakenly seeking solitude. *Journal of Experimental Psychology: General*, 143(5).',
    'Boothby, E. J., Cooney, G., Sandstrom, G. M. & Clark, M. S. (2018). The liking gap in conversations. *Psychological Science*, 29(11).'
  ]
};

const FORMS = [
  { no: '12-B', want: 'wear the hat', ask: 'Out of a hundred people in the room, how many will notice the hat?', lo: 'nobody', hi: 'all of them',
    reg: { band: [20, 28], said: 'In 2000, students sent into a room in an embarrassing T-shirt guessed about half the room would notice. About a quarter did.' } },
  { no: '31', want: 'speak first in the meeting', ask: 'How nervous will you look?', lo: 'serene', hi: 'visibly vibrating',
    reg: { dir: 'less', said: 'Speakers rate their own visible nerves well above what the audience reports seeing. Most of the trembling happens on the inside, where it is private.' } },
  { no: '7', want: 'be bad at something new, in public', ask: 'How harshly will the people watching judge you?', lo: 'kindly', hi: 'mercilessly',
    reg: { dir: 'less', said: 'People who fumbled in front of others predicted harsher judgment than the observers actually gave. Observers mostly thought about the situation, not the person.' } },
  { no: '2', want: 'ask the stranger about their book', ask: 'How much will they enjoy being asked?', lo: 'not at all', hi: 'enormously',
    reg: { dir: 'more', said: 'Commuters expected conversations with strangers to go badly. They went well. And afterwards, people underestimate how much the other person liked them.' } },
  { no: '88-C', want: 'change my mind', reg: null },
  { no: '0', want: 'not have an opinion', reg: null }
];
const OTHERS = /\b(stop|ban|forbid|prevent|revoke|not let|make (him|her|them)|(my|the) (boss|neighbou?r|wife|husband|partner|mother|father|sister|brother|kids?|son|daughter|friends?|colleague|landlord)|(him|her|them|people|everyone|someone) (from|to))\b/i;

export function mount(stage, api) {
  stage.innerHTML = `<div class="pm">
    <svg width="0" height="0" aria-hidden="true" style="position:absolute"><filter id="pmInk"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.5"/><feComponentTransfer><feFuncA type="discrete" tableValues="0 1 1 1 .7 1"/></feComponentTransfer></filter></svg>
    <header class="pm-sign">
      <p>Municipal Office · Room 4</p>
      <h1>Department of Permissions</h1>
      <div class="pm-board" aria-live="polite"><span>Now serving</span><b id="pmNow">0046</b></div>
    </header>
    <div class="pm-desk">
      <div class="pm-clerk">
        <p class="pm-who">M. Ortolan, <i>Acting Clerk</i></p>
        <p class="pm-say" id="pmSay" aria-live="polite"></p>
      </div>
      <div class="pm-work" id="pmWork"></div>
    </div>
  </div>`;

  const $ = s => stage.querySelector(s);
  const sayEl = $('#pmSay'), work = $('#pmWork'), now = $('#pmNow');
  let alive = true, ticket = 47;
  const timers = new Set();
  const wait = ms => new Promise(r => { const t = setTimeout(() => { timers.delete(t); r(); }, api.reduced ? 0 : ms); timers.add(t); });
  const num = n => String(n).padStart(4, '0');

  // Clerk speaks at typewriter pace; each new line replaces the last.
  async function say(text) {
    const run = Symbol(); say.run = run;
    sayEl.textContent = '';
    sayEl.setAttribute('aria-label', text);
    if (api.reduced) { sayEl.textContent = text; return; }
    for (let i = 1; i <= text.length; i++) {
      if (!alive || say.run !== run) return;
      sayEl.textContent = text.slice(0, i);
      await wait(/[.,?!—]/.test(text[i - 1]) ? 140 : 24);
    }
  }
  const btn = (label, fn, cls = '') => { const b = document.createElement('button'); b.className = 'pm-btn ' + cls; b.textContent = label; b.onclick = fn; return b; };
  const show = (...nodes) => { work.textContent = ''; nodes.forEach(n => work.append(n)); work.classList.remove('in'); void work.offsetWidth; work.classList.add('in'); };
  const html = s => { const d = document.createElement('div'); d.innerHTML = s; return d.firstElementChild; };

  function lobby() {
    sayEl.textContent = '';
    const disp = html(`<div class="pm-dispenser"><div class="pm-slot"><div class="pm-ticket" id="pmTicket"><small>Please wait</small><b>${num(ticket)}</b></div></div><p class="pm-hint">Queue system in operation</p></div>`);
    show(disp, btn('Take a number', async e => {
      e.target.disabled = true; api.haptic?.(10);
      disp.classList.add('printed');
      await wait(1300);
      now.textContent = num(ticket); now.parentElement.classList.add('ding'); api.haptic?.([8, 60, 8]);
      await wait(600);
      counter();
    }));
  }

  async function counter() {
    show();
    await say(`Number ${ticket}. Yes. What would you like permission for?`);
    if (!alive) return;
    const list = html(`<div class="pm-forms" role="list"></div>`);
    for (const f of FORMS) {
      const b = btn('', () => form(f), 'pm-slip');
      b.setAttribute('role', 'listitem');
      b.innerHTML = `<small>Form ${f.no}</small><span>Permission to ${f.want}</span>`;
      list.append(b);
    }
    const write = html(`<form class="pm-write"><label for="pmIn">Not listed? Write it in.</label><div><span>Permission to</span><input id="pmIn" maxlength="80" autocomplete="off" placeholder="…"><button class="pm-btn">Submit</button></div></form>`);
    write.onsubmit = e => { e.preventDefault(); const v = write.querySelector('input').value.trim(); if (v) writeIn(v); };
    show(list, write);
  }

  async function writeIn(text) {
    const t = text.replace(/^(permission )?to /i, '').replace(/[.!?]+$/, '');
    show();
    if (OTHERS.test(t)) {
      await say('Ah. Permission for other people is handled in a different building.');
      await wait(400);
      await say('It’s on fire. It has always been on fire. You’re welcome to try a form for yourself.');
      show(btn('Back to the forms', counter));
      return;
    }
    await say('Not on our list. Write-ins are approved by default, in theory. Nobody has ever checked.');
    await wait(500);
    stampDesk({ no: 'W', want: t });
  }

  async function form(f) {
    show();
    if (!f.reg) {
      await say(`Form ${f.no}. Let me check the Registry.`);
      await wait(700);
      await say('No entry. Nobody has measured what this costs. The form is mostly a formality.');
      await wait(500);
      return stampDesk(f);
    }
    await say(`Form ${f.no}. Before anything is stamped, the Department requires your estimate.`);
    if (!alive) return;
    const q = html(`<form class="pm-q"><p class="pm-ask">${f.ask}</p><input type="range" min="0" max="100" value="50" aria-label="${f.ask}"><div class="pm-ends"><span>${f.lo}</span><span>${f.hi}</span></div><button class="pm-btn">File estimate</button></form>`);
    q.onsubmit = e => { e.preventDefault(); registry(f, +q.querySelector('input').value); };
    show(q);
  }

  async function registry(f, guess) {
    const r = f.reg;
    const mark = r.band ? `<i class="band" style="left:${r.band[0]}%;width:${r.band[1] - r.band[0]}%"></i>`
      : `<i class="arrow ${r.dir}" style="${r.dir === 'less' ? `right:${100 - guess}%;width:${Math.min(guess, 34)}%` : `left:${guess}%;width:${Math.min(100 - guess, 34)}%`}"></i>`;
    const led = html(`<div class="pm-ledger">
      <p class="pm-rh">The Registry <small>· vol. ${f.no}</small></p>
      <div class="pm-scale"><i class="you" style="left:${guess}%"><b>you</b></i>${mark}</div>
      <div class="pm-ends"><span>${f.lo}</span><span>${f.hi}</span></div>
      <p class="pm-rv">${r.band ? `Measured: about ${r.band[0]}–${r.band[1]} in a hundred.` : r.dir === 'less' ? 'Measured: lower than people expect.' : 'Measured: higher than people expect.'}</p>
      <p class="pm-rs">${r.said}</p></div>`);
    show(led);
    await say(r.band && guess <= r.band[1] ? 'Hm. You guessed better than most. The fear is usually bigger.' : 'The Registry tends to disagree with applicants. In the same direction, every time.');
    if (!alive) return;
    work.append(btn('Proceed to stamping', () => stampDesk(f)));
  }

  async function stampDesk(f) {
    show();
    await say('Stamping is on the fourth floor. One moment.');
    await wait(900);
    await say('…Nobody is on the fourth floor. Nobody has been for some time. You’ll have to stamp it yourself.');
    if (!alive) return;
    const doc = html(`<div class="pm-stampdesk">
      <article class="pm-permit" aria-label="Permit">
        <header><span>Permit</span><span>№ ${num(ticket)}</span></header>
        <p class="pm-pf">${f.no === 'W' ? 'Written in' : 'Form ' + f.no}</p>
        <p class="pm-grant">The bearer may <em></em>.</p>
        <dl><dt>Issuing authority</dt><dd>The bearer</dd><dt>Valid</dt><dd>Until further notice</dd></dl>
        <div class="pm-mark" aria-hidden="true"><span>Granted</span></div>
      </article>
      <button class="pm-stamp" aria-label="Hold to stamp the permit"><i class="ring"></i><span class="handle"></span><span class="base">Hold to stamp</span></button>
    </div>`);
    doc.querySelector('em').textContent = f.want;
    show(doc);
    const st = doc.querySelector('.pm-stamp'), permit = doc.querySelector('.pm-permit');
    let hold = 0, done = false;
    const land = () => {
      if (done) return; done = true;
      clearTimeout(hold); st.classList.remove('press');
      st.classList.add('thunk');
      permit.classList.add('stamped');
      permit.querySelector('.pm-mark').style.setProperty('--r', (Math.random() * 14 - 9).toFixed(1) + 'deg');
      permit.setAttribute('aria-label', 'Permit, stamped Granted');
      api.haptic?.([25, 40, 60]);
      after();
    };
    st.addEventListener('pointerdown', e => { if (done) return; try { st.setPointerCapture(e.pointerId); } catch {} st.classList.add('press'); hold = setTimeout(land, api.reduced ? 0 : 650); });
    const cancel = () => { if (!done) { clearTimeout(hold); st.classList.remove('press'); } };
    st.addEventListener('pointerup', cancel); st.addEventListener('pointercancel', cancel);
    st.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); land(); } });
    st.addEventListener('click', e => { if (e.detail === 0) land(); }); // keyboard/assistive activation
  }

  async function after() {
    await wait(900);
    await say('There. Valid as anything they issue downstairs.');
    await wait(700);
    await say('Between us, I think they like the stamp more than the permission.');
    if (!alive) return;
    work.append(html('<div class="pm-after"></div>'));
    work.lastChild.append(
      btn(`Apply again (ticket ${num(ticket + 1)})`, () => { ticket++; lobby(); }),
      btn('Leave the building', () => { location.hash = '#/'; }, 'ghost'));
  }

  lobby();
  return () => { alive = false; timers.forEach(clearTimeout); };
}
