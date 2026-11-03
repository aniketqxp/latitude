// Interactive figures, looked up by name from `viz` blocks.
// Each takes a container and returns nothing; all state is local to the figure.
import { store } from './store.js';

const $ = (el, s) => el.querySelector(s);
const $$ = (el, s) => [...el.querySelectorAll(s)];

function seg(options, current = 0, label = '') {
  return `<div class="seg" role="group" aria-label="${label}">${options.map((o, i) => `<button type="button" data-k="${i}" aria-pressed="${i === current}">${o}</button>`).join('')}</div>`;
}
function onSeg(el, fn) {
  $$(el, '.seg').forEach(g => $$(g, 'button').forEach(b => b.addEventListener('click', () => {
    $$(g, 'button').forEach(x => x.setAttribute('aria-pressed', x === b));
    fn(+b.dataset.k, g);
  })));
}
function slider(id, label, min, max, val, step = 1) {
  return `<div class="slider-row"><div class="lab"><span>${label}</span><span data-out="${id}"></span></div><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}" aria-label="${label}"></div>`;
}
function bindSlider(el, id, fmt, fn) {
  const inp = $(el, '#' + id), out = $(el, `[data-out="${id}"]`);
  const upd = () => {
    const v = +inp.value; inp.style.setProperty('--p', ((v - inp.min) / (inp.max - inp.min)) * 100 + '%');
    out.textContent = fmt(v); fn && fn(v);
  };
  inp.addEventListener('input', upd); upd(); return inp;
}
const uid = (() => { let n = 0; return p => p + (++n); })();
function tapzones(el, fn) {
  $$(el, '.tapzone').forEach(z => {
    z.setAttribute('tabindex', '0'); z.setAttribute('role', 'button');
    const go = () => { $$(el, '.tapzone').forEach(o => o.classList.toggle('on', o === z)); fn(z.dataset.k, z); };
    z.addEventListener('click', go);
    z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
}
function person(x, y, s, cls = '') {
  return `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-7" r="4.4"/><path d="M-7 9c0-6 3-10 7-10s7 4 7 10z"/></g>`;
}

const V = {};

/* ---------------- Latitude ---------------- */
V.walls = el => {
  const info = [
    ['Psychological', 'A prediction of disaster that has never been tested — “I couldn’t”, “they’d laugh”. These walls are made of untested forecasts. Run the experiment and they often simply are not there.', 'psy'],
    ['Cultural', 'A norm: what people like you do or don’t do. Real in the sense that others enforce it — but often far thinner than it looks, because everyone overestimates how many others believe in it.', 'cul'],
    ['External', 'Law, money, physics, other people’s genuine decisions. Solid. These are not dissolved by courage — they are worked around with strategy, time and allies.', 'ext']
  ];
  el.innerHTML = `<div class="fig-title"><span>Three kinds of wall</span><span>tap a wall</span></div>
  <svg viewBox="0 0 320 210" role="img" aria-label="A figure in a room bounded by three different walls">
    <g class="tapzone" data-k="0"><rect x="20" y="20" width="30" height="170" fill="transparent"/><path class="w0" d="M35 30V180" stroke="var(--r)" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/></g>
    <g class="tapzone" data-k="1"><rect x="40" y="5" width="240" height="30" fill="transparent"/><path class="w1" d="M45 20H275" stroke="var(--ink)" stroke-width="4" stroke-dasharray="16 8" stroke-linecap="round"/></g>
    <g class="tapzone" data-k="2"><rect x="270" y="20" width="30" height="170" fill="transparent"/><path class="w2" d="M285 30V180" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/></g>
    <path d="M30 190H290" stroke="var(--rule)" stroke-width="2"/>
    <g fill="var(--ink)" class="who" style="transition:transform .9s var(--ease)">${person(160, 165, 2.2)}</g>
    <text x="35" y="204" text-anchor="middle" class="svg-t">mind</text><text x="160" y="50" text-anchor="middle" class="svg-t">custom</text><text x="285" y="204" text-anchor="middle" class="svg-t">world</text>
  </svg><div class="ctrl">${seg(['Psychological', 'Cultural', 'External'], -1, 'Wall type')}<button class="btn ghost" data-test style="min-height:40px;padding:.5rem .9rem">Test it</button></div><div class="out">Choose a wall, then test it.</div>`;
  let k = -1;
  const pick = i => { k = +i; $$(el, '.seg button').forEach((b, j) => b.setAttribute('aria-pressed', j === k)); $(el, '.out').innerHTML = `<b>${info[k][0]}.</b> ${info[k][1]}`; };
  tapzones(el, pick); onSeg(el, pick);
  $(el, '[data-test]').addEventListener('click', () => {
    if (k < 0) return pick(0);
    const w = $(el, '.w' + k), who = $(el, '.who');
    if (k === 0) { w.style.transition = 'opacity 1.2s'; w.style.opacity = '0'; who.style.transform = 'translateX(-120px)'; $(el, '.out').innerHTML = `<b>Tested — gone.</b> The disaster didn’t arrive. What remains is information you could not have got by thinking.`; }
    if (k === 1) { w.style.transition = 'stroke-width 1.2s, opacity 1.2s'; w.style.strokeWidth = '1'; w.style.opacity = '.45'; who.style.transform = 'translateY(-70px) scale(.9)'; $(el, '.out').innerHTML = `<b>Examined — thinner than it looked.</b> Some people do enforce it. Fewer than you guessed believe in it.`; }
    if (k === 2) { who.style.transform = 'translateX(80px)'; setTimeout(() => who.style.transform = 'translateX(40px)', 600); $(el, '.out').innerHTML = `<b>Solid.</b> Pushing harder doesn’t help. This one calls for a route, a resource, a collaborator, or patience.`; }
    setTimeout(() => { $(el, '.w' + k).removeAttribute('style'); who.style.transform = ''; }, 3800);
  });
};

V.norms = el => {
  const N = 40, priv = Array.from({ length: N }, (_, i) => (i * 37) % 100 < 68);
  el.innerHTML = `<div class="fig-title"><span>A room that agrees</span><span>illustrative</span></div>
  <svg viewBox="0 0 320 180" role="img" aria-label="A grid of people, each with a public stance and a private view">${priv.map((p, i) => {
    const x = 20 + (i % 10) * 31, y = 26 + Math.floor(i / 10) * 40;
    return `<g class="pp" data-p="${p ? 1 : 0}"><circle cx="${x}" cy="${y}" r="12" fill="none" stroke="var(--ink)" stroke-opacity=".5"/><circle class="inn" cx="${x}" cy="${y}" r="5" fill="var(--ink)" style="transition:fill .6s ${i * 18}ms, r .6s ${i * 18}ms"/></g>`;
  }).join('')}</svg><div class="ctrl">${seg(['What they say', 'What they think'], 0, 'View')}</div><div class="out"></div>`;
  const show = k => {
    $$(el, '.pp').forEach(g => { const c = $(g, '.inn'); const doubt = k === 1 && g.dataset.p === '1'; c.setAttribute('fill', doubt ? 'var(--r)' : 'var(--ink)'); c.setAttribute('r', doubt ? 7 : 5); });
    $(el, '.out').innerHTML = k === 0 ? 'Publicly, everyone goes along. Each person reads the room and concludes they are the odd one out.' : `<b>Privately, most have doubts.</b> Each assumed the others meant it. This is pluralistic ignorance: a norm sustained by people who don’t believe in it.`;
  };
  onSeg(el, show); show(0);
};

/* ---------------- Inner weather ---------------- */
V.spotlight = el => {
  const N = 40, ACTUAL = 23;
  el.innerHTML = `<div class="fig-title"><span>The embarrassing T-shirt</span><span>Gilovich et al., 2000</span></div>
  <p style="margin:0 0 .6rem;font-size:.95em">You walk into a room of 40 strangers wearing a shirt you find mortifying. What share of them will notice it?</p>
  <svg viewBox="0 0 320 150" role="img" aria-label="Forty people; those who noticed are highlighted">${Array.from({ length: N }, (_, i) => `<g class="pp" fill="var(--ink)" fill-opacity=".22" style="transition:fill .5s ${i * 15}ms, fill-opacity .5s ${i * 15}ms">${person(18 + (i % 10) * 32, 30 + Math.floor(i / 10) * 34, 1.25)}</g>`).join('')}</svg>
  ${slider(uid('sp'), 'Your guess', 0, 100, 50)}<div class="ctrl"><button class="btn" data-go>Reveal</button></div><div class="out"></div>`;
  const inp = $(el, 'input'); let guess = 50;
  const paint = (pct, col) => $$(el, '.pp').forEach((g, i) => { const on = i < Math.round(N * pct / 100); g.setAttribute('fill', on ? col : 'var(--ink)'); g.setAttribute('fill-opacity', on ? '1' : '.22'); });
  bindSlider(el, inp.id, v => v + '%', v => { guess = v; paint(v, 'var(--ink)'); });
  $(el, '[data-go]').addEventListener('click', () => {
    paint(ACTUAL, 'var(--r)');
    $(el, '.out').innerHTML = `You guessed <b>${guess}%</b>. The shirt-wearers in the study guessed about <b>50%</b>. Roughly <b>a quarter</b> actually noticed. ${guess > 35 ? 'The spotlight you feel is about twice as bright as the one that exists.' : 'Your estimate was closer than most — the typical person roughly doubles it.'}`;
  });
};

V.arousal = el => {
  el.innerHTML = `<div class="fig-title"><span>Same body, different story</span><span>Brooks, 2014 · Jamieson et al., 2010</span></div>
  <svg viewBox="0 0 320 110" role="img" aria-label="A racing heartbeat line"><path class="ecg" d="M0 60 ${Array.from({ length: 8 }, (_, i) => { const x = i * 40; return `L${x + 14} 60 L${x + 18} 50 L${x + 22} 66 L${x + 25} 14 L${x + 29} 96 L${x + 33} 54 L${x + 40} 60`; }).join(' ')}" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" style="transition:stroke .5s"/>
  <text x="0" y="12" class="svg-t">heart rate ↑ · breath ↑ · adrenaline ↑</text></svg>
  <div class="ctrl">${seg(['“I am anxious”', '“I am excited”'], -1, 'Label')}</div><div class="out">The physiology before a speech and before a first date is nearly identical. Choose a label.</div>`;
  onSeg(el, k => {
    $(el, '.ecg').setAttribute('stroke', k ? 'var(--r)' : 'var(--ink)');
    $(el, '.out').innerHTML = k ? '<b>Excitement</b> keeps the arousal but points it at opportunity. In Brooks’s experiments, people who said “I am excited” before singing, speaking or doing maths performed better than those told to calm down.' : '<b>Anxiety</b> reads the same signal as threat. Attention narrows to what could go wrong — and trying to calm down from a high-arousal state is hard, because it asks the body to do a U-turn.';
  });
};

/* ---------------- Self ---------------- */
V.efficacy = el => {
  const S = [
    ['Mastery', 'Having actually done it. Bandura’s strongest source: success that you can attribute to your own effort, ideally against some difficulty.', 62, 70, 72],
    ['Vicarious', 'Watching someone similar to you succeed. The more they resemble you, the more their success becomes evidence about your own.', 44, 220, 62],
    ['Persuasion', 'Being told you can. Weaker on its own — words are cheap — but it can get you to try, which creates mastery.', 32, 92, 160],
    ['State', 'How you read your body. A pounding heart can be read as “I’m not ready” or “I’m switched on”.', 28, 220, 160]
  ];
  el.innerHTML = `<div class="fig-title"><span>Where belief in capability comes from</span><span>Bandura, 1977</span></div>
  <svg viewBox="0 0 320 210" role="img" aria-label="Four sources of self-efficacy sized by influence">${S.map((s, i) => `<g class="tapzone" data-k="${i}"><circle cx="${s[3]}" cy="${s[4]}" r="${s[2]}" fill="var(--r)" fill-opacity="${.85 - i * .17}" stroke="var(--paper)" stroke-width="2"/><text x="${s[3]}" y="${s[4] + 4}" text-anchor="middle" class="svg-d" style="font-size:${10 + s[2] / 6}px;fill:var(--paper)">${s[0]}</text></g>`).join('')}</svg><div class="out">Tap a source. Size suggests relative strength.</div>`;
  tapzones(el, k => $(el, '.out').innerHTML = `<b>${S[k][0]}.</b> ${S[k][1]}`);
};

V.kegan = el => {
  const S = [
    ['Socialized mind', 'Your values are held by your relationships and institutions. You are your roles; conflict between people you respect feels like conflict inside you.'],
    ['Self-authoring mind', 'You hold an internal compass that can evaluate the expectations of others. You can say “I see why you want that, and I’m choosing otherwise.”'],
    ['Self-transforming mind', 'You hold even your own framework lightly — able to see its limits, and to be changed by contradictions rather than defending against them.']
  ];
  el.innerHTML = `<div class="fig-title"><span>Three adult minds</span><span>Kegan, 1994 · a framework</span></div>
  <svg viewBox="0 0 320 170" role="img" aria-label="Three ascending steps">${S.map((s, i) => `<g class="tapzone" data-k="${i}"><rect x="${20 + i * 96}" y="${120 - i * 45}" width="92" height="${40 + i * 45}" rx="6" fill="var(--r)" fill-opacity="${.25 + i * .3}"/><text x="${66 + i * 96}" y="${145 - i * 45}" text-anchor="middle" class="svg-t" style="fill:var(--ink)">${['socialized', 'self-authoring', 'transforming'][i]}</text></g>`).join('')}</svg><div class="out">Tap a step. Each one doesn’t discard the previous — it makes it something you <i>have</i> rather than something you <i>are</i>.</div>`;
  tapzones(el, k => $(el, '.out').innerHTML = `<b>${S[k][0]}.</b> ${S[k][1]}`);
};

/* ---------------- Between people ---------------- */
V.likinggap = el => {
  el.innerHTML = `<div class="fig-title"><span>After a first conversation</span><span>Boothby et al., 2018 · schematic</span></div>
  <svg viewBox="0 0 320 130" role="img" aria-label="Two bars: how much you think they liked you versus how much they did">
    <text x="0" y="30" class="svg-t">you think they liked you</text><rect x="0" y="38" height="22" rx="4" width="0" fill="var(--ink)" fill-opacity=".35" class="b1" style="transition:width 1.2s var(--ease)"/>
    <text x="0" y="92" class="svg-t">they actually liked you</text><rect x="0" y="100" height="22" rx="4" width="0" fill="var(--r)" class="b2" style="transition:width 1.4s .3s var(--ease)"/>
    <path class="gap" d="M190 49 V111" stroke="var(--r)" stroke-dasharray="3 4" opacity="0" style="transition:opacity .5s 1.6s"/>
  </svg><div class="ctrl"><button class="btn ghost" data-go>Run the conversation</button></div><div class="out"></div>`;
  $(el, '[data-go]').addEventListener('click', () => {
    $(el, '.b1').setAttribute('width', 190); $(el, '.b2').setAttribute('width', 270); $(el, '.gap').setAttribute('opacity', 1);
    $(el, '.out').innerHTML = 'Across labs, dorms and workshops, people consistently underestimated how much their conversation partner liked them and enjoyed their company. <b>The gap persisted for months</b> among new roommates.';
  });
};

V.warmth = el => {
  const Q = [
    ['Warm · competent', 'Admiration', 'People want to help and associate with them. The aim of most social presentation — though no one gets to sit here by declaring it.'],
    ['Warm · less competent', 'Pity', 'Liked but not taken seriously. Treated kindly, then passed over.'],
    ['Cold · competent', 'Envy', 'Respected but distrusted. Cooperated with when useful, resented when they stumble.'],
    ['Cold · less competent', 'Contempt', 'Ignored or excluded. The quadrant people fear most.']
  ];
  const pos = [[165, 15], [15, 15], [165, 115], [15, 115]];
  el.innerHTML = `<div class="fig-title"><span>Two questions we ask of everyone</span><span>Fiske et al., 2002/2007</span></div>
  <svg viewBox="0 0 330 240" role="img" aria-label="Two by two grid of warmth and competence">${Q.map((q, i) => `<g class="tapzone" data-k="${i}"><rect x="${pos[i][0]}" y="${pos[i][1]}" width="146" height="96" rx="10" fill="var(--r)" fill-opacity="${[.85, .35, .35, .12][i]}"/><text x="${pos[i][0] + 73}" y="${pos[i][1] + 54}" text-anchor="middle" class="svg-d" style="font-size:19px;${i === 0 ? 'fill:var(--paper)' : ''}">${q[1]}</text></g>`).join('')}
  <text x="160" y="232" text-anchor="middle" class="svg-t">competence →</text><text x="8" y="125" class="svg-t" transform="rotate(-90 8 125)" text-anchor="middle">warmth →</text></svg><div class="out">Tap a quadrant. Intent (warmth) tends to be judged first: friend or foe, before able or unable.</div>`;
  tapzones(el, k => $(el, '.out').innerHTML = `<b>${Q[k][0]} → ${Q[k][1]}.</b> ${Q[k][2]}`);
};

V.friendship = el => {
  const M = [[50, 'Acquaintance → casual friend'], [90, 'Casual friend → friend'], [200, 'Close friend']];
  el.innerHTML = `<div class="fig-title"><span>The hours a friendship takes</span><span>Hall, 2019 · estimates</span></div>
  <svg viewBox="0 0 320 90" role="img" aria-label="Timeline of hours to friendship"><path d="M10 50H310" stroke="var(--rule)" stroke-width="6" stroke-linecap="round"/><path class="fill" d="M10 50H10" stroke="var(--r)" stroke-width="6" stroke-linecap="round"/>${M.map(([h, l], i) => `<circle cx="${10 + h * 1.4}" cy="50" r="7" fill="var(--paper)" stroke="var(--r)" stroke-width="2.5"/><text x="${10 + h * 1.4}" y="${i % 2 ? 82 : 28}" text-anchor="middle" class="svg-t">${h}h</text>`).join('')}</svg>
  ${slider(uid('fr'), 'Hours together per week', 1, 15, 3)}<div class="out"></div>`;
  bindSlider(el, $(el, 'input').id, v => v + ' h/wk', v => {
    $(el, '.fill').setAttribute('d', `M10 50H${10 + Math.min(200, v * 12) * 1.4}`);
    $(el, '.out').innerHTML = M.map(([h, l]) => `${l}: <b>~${Math.ceil(h / v)} weeks</b>`).join('<br>') + '<br><span style="color:var(--muted);font-size:.9em">The kind of time matters: joking, catching up and real conversation counted for more than working side by side.</span>';
  });
};

V.benign = el => {
  el.innerHTML = `<div class="fig-title"><span>Where laughter lives</span><span>McGraw &amp; Warren, 2010 · a theory</span></div>
  <svg viewBox="0 0 320 200" role="img" aria-label="Violation versus benignness plane with a humour zone"><rect x="40" y="10" width="270" height="160" rx="8" fill="var(--paper)"/><ellipse cx="220" cy="55" rx="70" ry="38" fill="var(--r)" fill-opacity=".22"/><text x="220" y="59" text-anchor="middle" class="svg-t" style="fill:var(--r)">funny</text><text x="90" y="40" class="svg-t">bland</text><text x="250" y="160" class="svg-t" text-anchor="middle">offensive</text><text x="80" y="160" class="svg-t">nothing</text><circle class="dot" r="9" fill="var(--ink)" style="transition:all .25s var(--ease)"/><text x="175" y="192" class="svg-t" text-anchor="middle">violation →</text><text x="28" y="90" class="svg-t" transform="rotate(-90 28 90)" text-anchor="middle">benign →</text></svg>
  ${slider(uid('bv'), 'How much it violates expectation', 0, 100, 30)}${slider(uid('bb'), 'How safe it feels', 0, 100, 70)}<div class="out"></div>`;
  const [a, b] = $$(el, 'input'); let v = 30, s = 70;
  const upd = () => {
    $(el, '.dot').setAttribute('cx', 40 + v * 2.7); $(el, '.dot').setAttribute('cy', 170 - s * 1.6);
    const funny = v > 45 && s > 50, msg = funny ? '<b>Humour zone.</b> Something is wrong — and it’s fine. Both at once.' : v <= 45 && s > 50 ? 'Safe but unsurprising: <b>a polite smile</b>.' : v > 45 ? '<b>Too threatening.</b> The violation lands; the “it’s okay” doesn’t. This is where jokes offend.' : 'Neither wrong nor notable.';
    $(el, '.out').innerHTML = msg;
  };
  bindSlider(el, a.id, x => x, x => { v = x; upd(); }); bindSlider(el, b.id, x => x, x => { s = x; upd(); });
};

/* ---------------- Voice ---------------- */
V.mehrabian = el => {
  el.innerHTML = `<div class="fig-title"><span>“93% of communication is nonverbal”</span><span>Mehrabian, 1967</span></div>
  <svg viewBox="0 0 320 170" role="img" aria-label="A pie chart of 7, 38, 55 percent"><g transform="translate(90 85)"><circle r="62" fill="none" stroke="var(--r)" stroke-width="40" stroke-dasharray="${2 * Math.PI * 62 * .55} 999" transform="rotate(-90)" class="s1" style="transition:all .8s var(--ease)"/><circle r="62" fill="none" stroke="var(--ink)" stroke-opacity=".5" stroke-width="40" stroke-dasharray="${2 * Math.PI * 62 * .38} 999" transform="rotate(108)" class="s2" style="transition:all .8s var(--ease)"/><circle r="62" fill="none" stroke="var(--ink)" stroke-width="40" stroke-dasharray="${2 * Math.PI * 62 * .07} 999" transform="rotate(244.8)" class="s3" style="transition:all .8s var(--ease)"/></g>
  <g class="svg-t"><text x="180" y="60">55% face</text><text x="180" y="88">38% tone</text><text x="180" y="116">7% words</text></g></svg>
  <div class="ctrl">${seg(['The poster', 'The actual study'], 0, 'View')}</div><div class="out"></div>`;
  onSeg(el, k => {
    $$(el, 'circle').forEach(c => c.style.opacity = k ? .15 : 1);
    $(el, '.out').innerHTML = k ? 'Participants heard <b>single words</b> (like “dear” or “brute”) spoken in a tone that <b>contradicted</b> them, sometimes paired with a photo of a face, and judged the speaker’s <b>feelings</b>. When cues conflict about emotion, tone and face win. That is all. Mehrabian himself has said the ratios don’t apply to communication in general — otherwise you could understand a lecture in a language you don’t speak.' : 'The figure on a thousand training slides. Taken literally, it means you could follow 93% of a conversation in a foreign language.';
  });
  $(el, '.out').innerHTML = 'The figure on a thousand training slides. Taken literally, it means you could follow 93% of a conversation in a foreign language.';
};

V.arcs = el => {
  const A = [
    ['Rags to riches', 'M0 70 C40 65 80 40 120 10', 'A steady rise.'],
    ['Tragedy', 'M0 10 C40 15 80 40 120 70', 'A steady fall.'],
    ['Man in a hole', 'M0 25 C30 30 40 70 60 70 S100 20 120 15', 'Fall, then rise. The most reliable shape for a told story: trouble, then the climb out.'],
    ['Icarus', 'M0 65 C30 60 40 15 60 15 S100 60 120 70', 'Rise, then fall.'],
    ['Cinderella', 'M0 60 C20 30 40 25 55 50 S90 70 120 10', 'Rise, fall, rise.'],
    ['Oedipus', 'M0 15 C20 50 40 60 60 35 S90 20 120 70', 'Fall, rise, fall.']
  ];
  el.innerHTML = `<div class="fig-title"><span>Six shapes of story</span><span>Reagan et al., 2016</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem">${A.map((a, i) => `<button class="tapzone opt" data-k="${i}" style="flex-direction:column;align-items:stretch;padding:.6rem;gap:.3rem"><svg viewBox="-4 0 128 80" aria-hidden="true"><path d="${a[1]}" fill="none" stroke="var(--r)" stroke-width="3" stroke-linecap="round"/></svg><span style="font:500 .62rem/1.2 var(--f-mono);letter-spacing:.06em;text-transform:uppercase">${a[0]}</span></button>`).join('')}</div><div class="out">Computational analysis of ~1,700 novels found most emotional trajectories cluster into six shapes. Tap one.</div>`;
  tapzones(el, k => $(el, '.out').innerHTML = `<b>${A[k][0]}.</b> ${A[k][2]}`);
};

V.rhetoric = el => {
  const P = [
    ['Ethos', 'Why should they trust you? Character, competence, goodwill — earned before you speak and during it.', 160, 22],
    ['Pathos', 'What should they feel? Not manipulation: the emotional stakes that make a reason matter.', 40, 190],
    ['Logos', 'What is the argument? The reasons and evidence that would survive a sceptic.', 280, 190],
    ['Kairos', 'The right moment. The same words land or die depending on when they are said, and to whom.', 160, 132]
  ];
  el.innerHTML = `<div class="fig-title"><span>The rhetorical triangle</span><span>Aristotle, Rhetoric</span></div>
  <svg viewBox="0 0 320 215" role="img" aria-label="Triangle of ethos, pathos, logos with kairos at the centre"><path d="M160 22L40 190H280Z" fill="var(--r)" fill-opacity=".08" stroke="var(--r)" stroke-width="1.5"/>${P.map((p, i) => `<g class="tapzone" data-k="${i}"><circle cx="${p[2]}" cy="${p[3]}" r="${i === 3 ? 26 : 20}" fill="${i === 3 ? 'var(--paper)' : 'var(--r)'}" stroke="var(--r)" stroke-width="2"/><text x="${p[2]}" y="${p[3] + 4}" text-anchor="middle" class="svg-t" style="fill:${i === 3 ? 'var(--r)' : 'var(--paper)'};font-size:9px">${p[0]}</text></g>`).join('')}</svg><div class="out">Tap a point.</div>`;
  tapzones(el, k => $(el, '.out').innerHTML = `<b>${P[k][0]}.</b> ${P[k][1]}`);
};

/* ---------------- Mind ---------------- */
V.calibrate = el => {
  const Q = [
    ['Height of Mount Everest, in metres', 8849],
    ['Year the Magna Carta was sealed', 1215],
    ['Number of bones in an adult human body', 206],
    ['Average distance from Earth to the Moon, in km', 384400],
    ['Speed of sound in air at 20 °C, in metres per second', 343]
  ];
  el.innerHTML = `<div class="fig-title"><span>Five questions, 80% sure</span><span>calibration test</span></div>
  <p style="margin:0 0 .5rem;font-size:.95em">For each, give a range you are <b>80% confident</b> contains the true answer. Don’t look anything up. A well-calibrated person should capture about four of five.</p>
  ${Q.map((q, i) => `<div class="cal-q" data-i="${i}"><div class="qq">${q[0]}</div><div class="rng"><input inputmode="decimal" aria-label="Low estimate" placeholder="low"> to <input inputmode="decimal" aria-label="High estimate" placeholder="high"></div><div class="res"></div></div>`).join('')}
  <div class="ctrl"><button class="btn" data-go>Score my ranges</button></div><div class="out"></div>`;
  $(el, '[data-go]').addEventListener('click', () => {
    let hits = 0, done = 0;
    $$(el, '.cal-q').forEach((row, i) => {
      const [lo, hi] = $$(row, 'input').map(x => parseFloat(x.value.replace(/[, ]/g, '')));
      row.classList.remove('hit', 'miss');
      if (isNaN(lo) || isNaN(hi)) { $(row, '.res').textContent = ''; return; }
      done++; const a = Q[i][1], hit = a >= Math.min(lo, hi) && a <= Math.max(lo, hi); hits += hit;
      row.classList.add(hit ? 'hit' : 'miss'); $(row, '.res').textContent = `${hit ? '✓ captured' : '✗ missed'} — answer: ${a.toLocaleString()}`;
    });
    if (!done) { $(el, '.out').textContent = 'Fill in at least one range.'; return; }
    const exp = Math.round(done * .8);
    $(el, '.out').innerHTML = `You captured <b>${hits} of ${done}</b>; perfect calibration would capture about ${exp}. ${hits < exp ? 'Your ranges were <b>too narrow</b> — the most common result. Overprecision is the most robust form of overconfidence.' : 'Your ranges were <b>about right or wide</b>. Rarer than you might think.'}`;
  });
};

V.asch = el => {
  el.innerHTML = `<div class="fig-title"><span>Which line matches?</span><span>Asch, 1951/1956</span></div>
  <svg viewBox="0 0 320 150" role="img" aria-label="A reference line and three comparison lines labelled A, B, C"><path d="M40 20V120" stroke="var(--ink)" stroke-width="5"/><text x="40" y="140" text-anchor="middle" class="svg-t">ref</text>
  ${[['A', 75], ['B', 100], ['C', 125]].map(([l, h], i) => `<path d="M${170 + i * 55} ${120 - h}V120" stroke="var(--ink)" stroke-width="5"/><text x="${170 + i * 55}" y="140" text-anchor="middle" class="svg-t">${l}</text>`).join('')}</svg>
  <div class="crowd" style="display:flex;gap:.35rem;flex-wrap:wrap;margin:.4rem 0 .6rem"></div>
  <div class="ctrl">${seg(['A', 'B', 'C'], -1, 'Your answer')}<span style="flex:1"></span>${seg(['Unanimous', 'One ally'], 0, 'Condition')}</div><div class="out">Six people before you answer aloud. Then it’s your turn.</div>`;
  let ally = 0;
  const crowd = () => $(el, '.crowd').innerHTML = Array.from({ length: 6 }, (_, i) => `<span class="chip" style="${ally && i === 3 ? 'border-color:var(--r);color:var(--r)' : ''}">P${i + 1}: “${ally && i === 3 ? 'B' : 'A'}”</span>`).join('');
  crowd();
  const [ans, cond] = $$(el, '.seg');
  $$(ans, 'button').forEach((b, k) => b.addEventListener('click', () => {
    $$(ans, 'button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $(el, '.out').innerHTML = (k === 1 ? 'You held to what you saw. ' : 'You went with the room. ') + (ally ? 'With a single ally answering honestly, conformity in Asch’s variations fell to around <b>1 in 20</b> answers.' : 'With a unanimous majority, about <b>a third</b> of answers on critical trials conformed, and most participants conformed at least once — though a quarter never did.') + ' The obvious answer is B.';
  }));
  $$(cond, 'button').forEach((b, k) => b.addEventListener('click', () => { $$(cond, 'button').forEach(x => x.setAttribute('aria-pressed', x === b)); ally = k; crowd(); }));
};

V.curiosity = el => {
  el.innerHTML = `<div class="fig-title"><span>The information gap</span><span>Loewenstein, 1994 · Kang et al., 2009</span></div>
  <svg viewBox="0 0 320 160" role="img" aria-label="Inverted U curve of curiosity against what you already know"><path d="M20 140 C90 140 110 25 160 25 S230 140 300 140" fill="none" stroke="var(--r)" stroke-width="3"/><path d="M20 140H300" stroke="var(--rule)"/><circle class="dot" r="9" fill="var(--ink)"/><text x="20" y="156" class="svg-t">know nothing</text><text x="300" y="156" text-anchor="end" class="svg-t">know it all</text></svg>
  ${slider(uid('cu'), 'How much you already know', 0, 100, 15)}<div class="out"></div>`;
  const curve = t => { const x = 20 + t * 2.8; const y = 140 - 115 * Math.exp(-((t - 50) ** 2) / (2 * 22 ** 2)); return [x, y]; };
  bindSlider(el, $(el, 'input').id, v => v + '%', v => {
    const [x, y] = curve(v); $(el, '.dot').setAttribute('cx', x); $(el, '.dot').setAttribute('cy', y);
    $(el, '.out').innerHTML = v < 25 ? 'Too little to know what you’re missing. <b>No itch.</b> Learning a little — a single surprising fact — is how to start one.' : v > 75 ? 'Nothing left to resolve. <b>The itch is gone</b> unless you find the next question.' : '<b>Peak curiosity:</b> you know enough to see the shape of the gap. This is why a good teaser, a half-told story, or a partial explanation is so gripping.';
  });
};

/* ---------------- Craft ---------------- */
V.practice = el => {
  const C = [['Naive repetition', 'M10 150 C60 70 110 60 310 58', 'Rapid early gains, then a plateau. Performance becomes automatic — and automatic means it stops improving. Years of experience can coexist with stagnant skill.'],
    ['Deliberate practice', 'M10 150 C60 90 100 80 140 70 S220 40 310 15', 'Practice aimed at specific weaknesses, just beyond current ability, with immediate feedback. It keeps the skill out of autopilot. Slower and more effortful — and often less fun.'],
    ['Arrested development', 'M10 150 C60 70 110 55 180 58 S260 72 310 80', 'Without challenge, some skills drift backwards. Studies of physicians, for example, have found that accuracy on some tasks declines with years since training.']];
  el.innerHTML = `<div class="fig-title"><span>Three ways to spend ten thousand hours</span><span>after Ericsson · conceptual</span></div>
  <svg viewBox="0 0 320 170" role="img" aria-label="Performance curves for three kinds of practice"><path d="M10 160H310M10 160V10" stroke="var(--rule)"/>${C.map((c, i) => `<path class="cv" data-i="${i}" d="${c[1]}" fill="none" stroke="var(--ink)" stroke-opacity=".2" stroke-width="2.5" style="transition:all .5s"/>`).join('')}<text x="310" y="155" text-anchor="end" class="svg-t">time</text><text x="16" y="20" class="svg-t">skill</text></svg>
  <div class="ctrl">${seg(C.map(c => c[0]), 1, 'Curve')}</div><div class="out"></div>`;
  const show = k => { $$(el, '.cv').forEach((p, i) => { p.setAttribute('stroke', i === k ? 'var(--r)' : 'var(--ink)'); p.setAttribute('stroke-opacity', i === k ? 1 : .18); p.setAttribute('stroke-width', i === k ? 3.5 : 2); }); $(el, '.out').innerHTML = `<b>${C[k][0]}.</b> ${C[k][2]}`; };
  onSeg(el, show); show(1);
};

V.habit = el => {
  el.innerHTML = `<div class="fig-title"><span>How long until it’s automatic?</span><span>Lally et al., 2010</span></div>
  <svg viewBox="0 0 320 160" role="img" aria-label="Automaticity curve rising and levelling over days"><path d="M20 140H305" stroke="var(--rule)"/><path class="cv" fill="none" stroke="var(--r)" stroke-width="3"/>${[18, 66, 254].map(d => `<path d="M${20 + d * 1.1} 140V20" stroke="var(--ink)" stroke-opacity=".2" stroke-dasharray="3 4"/><text x="${20 + d * 1.1}" y="155" text-anchor="middle" class="svg-t">${d}d</text>`).join('')}<circle class="dot" r="7" fill="var(--ink)"/></svg>
  ${slider(uid('hb'), 'Habit difficulty', 1, 3, 2)}${slider(uid('hd'), 'Day', 0, 260, 30)}<div class="out"></div>`;
  let k = 2, d = 30;
  const ks = { 1: 6, 2: 22, 3: 85 };
  const y = t => 140 - 110 * (1 - Math.exp(-t / ks[k]));
  const draw = () => {
    let p = 'M20 140'; for (let t = 0; t <= 260; t += 4) p += `L${20 + t * 1.1} ${y(t)}`;
    $(el, '.cv').setAttribute('d', p); $(el, '.dot').setAttribute('cx', 20 + d * 1.1); $(el, '.dot').setAttribute('cy', y(d));
    const pct = Math.round((1 - Math.exp(-d / ks[k])) * 100);
    $(el, '.out').innerHTML = `Day ${d}: about <b>${pct}%</b> of its eventual automaticity. In the study, the median habit took <b>66 days</b> to reach 95% of its plateau — but the range ran from <b>18 to 254</b>. Simple habits (a glass of water) settle fast; demanding ones (fifty sit-ups) take much longer. Missing a single day made little difference.`;
  };
  const [a, b] = $$(el, 'input');
  bindSlider(el, a.id, v => ['', 'simple', 'moderate', 'demanding'][v], v => { k = v; draw(); });
  bindSlider(el, b.id, v => 'day ' + v, v => { d = v; draw(); });
};

V.ladder = el => {
  const KEY = 'ladder';
  el.innerHTML = `<div class="fig-title"><span>Build your own ladder</span><span>saved on this device</span></div>
  <p style="margin:0;font-size:.95em">List situations you avoid, from mild to hard. Rate how uncomfortable each would be (0–10). The ladder sorts itself — start low, and treat each rung as an experiment.</p>
  <div class="ladder-in"><input type="text" placeholder="e.g. ask a stranger for directions" aria-label="Situation" maxlength="120"><button class="btn" data-add style="min-height:44px">Add</button></div>
  ${slider(uid('ld'), 'Predicted discomfort', 0, 10, 4)}<ul class="rungs"></ul>`;
  let items = store.get(KEY, []);
  const inp = $(el, 'input[type=text]'), sl = $(el, 'input[type=range]');
  bindSlider(el, sl.id, v => v + '/10');
  const draw = () => {
    items.sort((a, b) => a.s - b.s);
    $(el, '.rungs').innerHTML = items.length ? items.map((it, i) => `<li style="--s:${it.s}"><span class="s">${it.s}</span><span></span><button aria-label="Remove" data-rm="${i}">×</button></li>`).join('') : '<li style="--s:0;grid-template-columns:1fr"><span style="color:var(--muted);font-style:italic">Your rungs will appear here.</span></li>';
    $$(el, '.rungs li').forEach((li, i) => { if (items[i]) li.children[1].textContent = items[i].t; });
    $$(el, '[data-rm]').forEach(b => b.addEventListener('click', () => { items.splice(+b.dataset.rm, 1); store.set(KEY, items); draw(); }));
  };
  const add = () => { const t = inp.value.trim(); if (!t) return inp.focus(); items.push({ t, s: +sl.value }); store.set(KEY, items); inp.value = ''; draw(); };
  $(el, '[data-add]').addEventListener('click', add);
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
  draw();
};

/* ---------------- Influence ---------------- */
V.assert = el => {
  el.innerHTML = `<div class="fig-title"><span>The assertiveness curve</span><span>Ames &amp; Flynn, 2007</span></div>
  <svg viewBox="0 0 320 160" role="img" aria-label="Inverted U: effectiveness against assertiveness"><path d="M20 140 C80 140 110 30 160 30 S240 140 300 140" fill="none" stroke="var(--r)" stroke-width="3"/><path d="M20 140H300" stroke="var(--rule)"/><circle class="dot" r="9" fill="var(--ink)"/><text x="20" y="156" class="svg-t">yielding</text><text x="300" y="156" text-anchor="end" class="svg-t">domineering</text></svg>
  ${slider(uid('as'), 'Assertiveness', 0, 100, 25)}<div class="out"></div>`;
  bindSlider(el, $(el, 'input').id, v => v, v => {
    const x = 20 + v * 2.8, y = 140 - 110 * Math.exp(-((v - 50) ** 2) / (2 * 20 ** 2));
    $(el, '.dot').setAttribute('cx', x); $(el, '.dot').setAttribute('cy', y);
    $(el, '.out').innerHTML = v < 30 ? '<b>Too little:</b> colleagues rated low-assertive people as poor at getting results — their goals quietly lost to others’.' : v > 70 ? '<b>Too much:</b> results come at the cost of relationships. In Ames and Flynn’s data, this was the most common complaint about leaders.' : '<b>The middle:</b> instrumental results without social damage. And note: people in this range often <i>feel</i> they have overstepped when others saw nothing of the kind.';
  });
};

V.zopa = el => {
  el.innerHTML = `<div class="fig-title"><span>Is there a deal at all?</span><span>BATNA · ZOPA</span></div>
  <svg viewBox="0 0 320 110" role="img" aria-label="Bar showing the zone of possible agreement"><path d="M10 55H310" stroke="var(--rule)" stroke-width="10" stroke-linecap="round"/><rect class="zone" y="45" height="20" rx="4" fill="var(--r)" fill-opacity=".85"/><g class="m1"><path d="M0 30V80" stroke="var(--ink)" stroke-width="2.5"/><text y="22" text-anchor="middle" class="svg-t" style="fill:var(--ink)">your floor</text></g><g class="m2"><path d="M0 30V80" stroke="var(--ink)" stroke-width="2.5" stroke-dasharray="4 3"/><text y="100" text-anchor="middle" class="svg-t" style="fill:var(--ink)">their ceiling</text></g></svg>
  ${slider(uid('z1'), 'Lowest salary you’d accept', 40, 120, 70)}${slider(uid('z2'), 'Highest they’d pay (unknown to you)', 40, 120, 90)}<div class="out"></div>`;
  let a = 70, b = 90; const X = v => 10 + (v - 40) * 3.75;
  const upd = () => {
    $(el, '.m1').setAttribute('transform', `translate(${X(a)} 0)`); $(el, '.m2').setAttribute('transform', `translate(${X(b)} 0)`);
    const z = $(el, '.zone'); if (b >= a) { z.setAttribute('x', X(a)); z.setAttribute('width', X(b) - X(a)); } else z.setAttribute('width', 0);
    $(el, '.out').innerHTML = b >= a ? `<b>A zone of ${b - a}k exists.</b> Where in it you land depends on information, anchors and nerve. Your floor is set by your best alternative — improve that, and the whole negotiation moves.` : `<b>No zone.</b> No technique can produce a deal here — and walking away is the correct outcome, not a failure. Knowing this early is a skill.`;
  };
  const [i1, i2] = $$(el, 'input');
  bindSlider(el, i1.id, v => v + 'k', v => { a = v; upd(); }); bindSlider(el, i2.id, v => v + 'k', v => { b = v; upd(); });
};

/* ---------------- Visions ---------------- */
V.control = el => {
  const I = [
    ['How hard I prepare for the interview', 0, 'Fully yours. Epictetus would put all your attention here.'],
    ['Whether I get the job', 1, 'Partly. You influence it, you don’t decide it. The modern Stoic move: make your goal “perform as well as I can”, not “get it”.'],
    ['The weather on the day', 2, 'Not yours. Planning an umbrella is wise; resenting the rain is wasted effort.'],
    ['My first flash of anger when criticised', 1, 'Partly. Seneca distinguished first movements — involuntary jolts — from the assent that follows. The jolt isn’t yours; what you make of it is.'],
    ['What I conclude a rejection means about me', 0, 'Yours. The Stoics placed judgments squarely within your power, and modern cognitive therapy agrees enough to be built on it.'],
    ['What other people think of me', 1, 'Partly at best. You can act well. Their verdict happens in their head.']
  ];
  el.innerHTML = `<div class="fig-title"><span>Sort what’s yours</span><span>Epictetus, Enchiridion 1</span></div>${I.map((it, i) => `<div class="sorter-item"><div>${it[0]}</div>${seg(['Up to me', 'Partly', 'Not up to me'], -1, it[0])}<div class="res" style="font-size:.9em;color:var(--ink-2)"></div></div>`).join('')}`;
  $$(el, '.sorter-item').forEach((row, i) => $$(row, 'button').forEach((b, k) => b.addEventListener('click', () => {
    $$(row, 'button').forEach(x => x.setAttribute('aria-pressed', x === b));
    $(row, '.res').innerHTML = `${k === I[i][1] ? '<b style="color:var(--good)">Agreed.</b>' : '<b style="color:var(--r)">Consider:</b>'} ${I[i][2]}`;
  })));
};

V.mean = el => {
  const M = [['Courage', 'Cowardice', 'Rashness'], ['Generosity', 'Stinginess', 'Prodigality'], ['Truthfulness about oneself', 'False modesty', 'Boastfulness'], ['Wit', 'Boorishness', 'Buffoonery'], ['Friendliness', 'Quarrelsomeness', 'Flattery']];
  el.innerHTML = `<div class="fig-title"><span>The mean between two failures</span><span>Nicomachean Ethics II</span></div>
  <div class="ctrl" style="margin-top:0">${seg(M.map(m => m[0].split(' ')[0]), 0, 'Virtue')}</div>
  <svg viewBox="0 0 320 90" role="img" aria-label="A spectrum from deficiency through virtue to excess"><defs><linearGradient id="mg" x1="0" x2="1"><stop offset="0" stop-color="var(--ink)" stop-opacity=".15"/><stop offset=".5" stop-color="var(--r)"/><stop offset="1" stop-color="var(--ink)" stop-opacity=".15"/></linearGradient></defs><rect x="10" y="38" width="300" height="12" rx="6" fill="url(#mg)"/><text x="10" y="74" class="svg-t t0"></text><text x="160" y="74" text-anchor="middle" class="svg-t t1" style="fill:var(--r)"></text><text x="310" y="74" text-anchor="end" class="svg-t t2"></text><circle class="dot" cy="44" r="10" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/></svg>
  ${slider(uid('mn'), 'Where this act falls', 0, 100, 50)}<div class="out"></div>`;
  let k = 0, v = 50;
  const upd = () => {
    const m = M[k]; $(el, '.t0').textContent = m[1]; $(el, '.t1').textContent = m[0]; $(el, '.t2').textContent = m[2];
    $(el, '.dot').setAttribute('cx', 10 + v * 3);
    $(el, '.out').innerHTML = v < 35 ? `Leaning to <b>${m[1].toLowerCase()}</b>.` : v > 65 ? `Leaning to <b>${m[2].toLowerCase()}</b>.` : `Near <b>${m[0].toLowerCase()}</b>. But the mean is “relative to us” — not the arithmetic middle. Finding it in a particular situation is what Aristotle called <i>phronesis</i>, practical wisdom.`;
  };
  onSeg(el, i => { k = i; upd(); });
  bindSlider(el, $(el, 'input').id, x => x, x => { v = x; upd(); });
};

V.compass = (el, ctx) => {
  const AX = [['Accept what is', 'Strive to exceed'], ['Belong to others', 'Stand apart'], ['Govern by reason', 'Trust passion'], ['Discover your nature', 'Create yourself'], ['Inner character', 'Outer works']];
  const T = [
    ['Aristotle', 'arete', [.7, .4, .3, .3, .4]], ['The Stoics', 'stoa', [.3, .35, .1, .3, .15]], ['Confucius', 'junzi', [.65, .1, .35, .35, .35]],
    ['Nietzsche', 'overcoming', [.95, .95, .8, .9, .75]], ['Buddhism', 'anatta', [.15, .3, .3, .2, .1]], ['Existentialism', 'self-authorship', [.7, .75, .55, 1, .6]],
    ['Emerson', 'independence', [.6, .9, .75, .4, .45]], ['The Gita', null, [.7, .3, .35, .2, .2]]
  ];
  let me = store.get('compass', [.5, .5, .5, .5, .5]);
  el.innerHTML = `<div class="fig-title"><span>Your position among the traditions</span><span>saved on this device</span></div>
  <svg viewBox="-150 -125 300 250" role="img" aria-label="Radar chart of your answers against philosophical traditions"><g class="grid"></g><path class="near" fill="var(--ink)" fill-opacity=".06" stroke="var(--ink)" stroke-opacity=".35" stroke-dasharray="3 3"/><path class="mine" fill="var(--r)" fill-opacity=".22" stroke="var(--r)" stroke-width="2.5" style="transition:d .3s"/></svg>
  ${AX.map((a, i) => slider('cx' + i, `${a[0]} ↔ ${a[1]}`, 0, 100, Math.round(me[i] * 100))).join('')}
  <div class="compass-out"></div>`;
  const R = 95, pt = (i, v) => { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; return [Math.cos(a) * R * (0.12 + .88 * v), Math.sin(a) * R * (0.12 + .88 * v)]; };
  const poly = vals => 'M' + vals.map((v, i) => pt(i, v).map(n => n.toFixed(1)).join(' ')).join('L') + 'Z';
  $(el, '.grid').innerHTML = [.33, .66, 1].map(s => `<path d="${poly([s, s, s, s, s])}" fill="none" stroke="var(--rule)"/>`).join('') + AX.map((a, i) => { const [x, y] = pt(i, 1.18); return `<text x="${x}" y="${y + 3}" text-anchor="middle" class="svg-t" style="font-size:8px">${a[1].split(' ').pop()}</text>`; }).join('');
  const upd = () => {
    $(el, '.mine').setAttribute('d', poly(me));
    const scored = T.map(t => [t, 1 - Math.sqrt(t[2].reduce((s, v, i) => s + (v - me[i]) ** 2, 0) / 5)]).sort((a, b) => b[1] - a[1]);
    $(el, '.near').setAttribute('d', poly(scored[0][0][2]));
    $(el, '.compass-out').innerHTML = scored.map(([t, s]) => `<div class="row">${t[1] ? `<a class="xl" href="#/c/${t[1]}" data-peek="${t[1]}">${t[0]}</a>` : `<span>${t[0]}</span>`}<div class="bar"><i style="width:${Math.max(4, s * 100)}%"></i></div><span class="pct">${Math.round(s * 100)}</span></div>`).join('');
    ctx.bindPeeks && ctx.bindPeeks(el);
    store.set('compass', me);
  };
  AX.forEach((_, i) => bindSlider(el, 'cx' + i, v => '', v => { me[i] = v / 100; upd(); }));
};

export function mountViz(name, el, ctx) {
  const fn = V[name];
  if (!fn) { el.innerHTML = `<p class="empty">Figure unavailable.</p>`; return; }
  try { fn(el, ctx); } catch (e) { console.error('viz', name, e); el.innerHTML = `<p class="empty">This figure failed to load.</p>`; }
}
