// Generative line art. Each region has a drawing style; each concept id seeds its own variation,
// so the identity stays consistent while no two pages share an illustration.

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function rng(seed) {
  let a = typeof seed === 'string' ? hash(seed) : seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const f = n => Math.round(n * 10) / 10;

const STYLES = {
  latitude(w, h, R, accent) {
    const cx = w * (0.5 + (R() - .5) * .2), cy = h / 2, r = Math.min(w, h) * 0.42;
    let s = `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/>`;
    const n = 4 + Math.floor(R() * 4), gapRow = 1 + Math.floor(R() * (n - 1));
    for (let i = 1; i <= n; i++) {
      const y = cy - r + (2 * r * i) / (n + 1), half = Math.sqrt(Math.max(0, r * r - (y - cy) ** 2));
      if (i === gapRow) {
        const gx = cx - half + 2 * half * (0.3 + R() * 0.4), g = r * 0.16;
        s += `<path d="M${f(cx - half)} ${f(y)}H${f(gx - g)}M${f(gx + g)} ${f(y)}H${f(cx + half)}"/>`;
        s += `<circle cx="${f(gx)}" cy="${f(y)}" r="${f(r * .07)}" fill="${accent}" stroke="none"/>`;
      } else s += `<path d="M${f(cx - half)} ${f(y)}H${f(cx + half)}"/>`;
    }
    const tilt = (R() - .5) * 50;
    s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r * (0.25 + R() * .4))}" ry="${f(r)}" transform="rotate(${f(tilt)} ${f(cx)} ${f(cy)})" stroke-opacity=".45"/>`;
    return s;
  },
  self(w, h, R, accent) {
    let s = '', cx = w / 2, cy = h / 2;
    const n = 5 + Math.floor(R() * 4), dx = (R() - .5) * 0.6, dy = (R() - .5) * 0.5, max = Math.min(w, h) * .46;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), r = max * (1 - t * .82);
      s += `<circle cx="${f(cx + dx * max * t)}" cy="${f(cy + dy * max * t)}" r="${f(r)}" stroke-opacity="${f(.35 + t * .65)}"/>`;
    }
    s += `<circle cx="${f(cx + dx * max)}" cy="${f(cy + dy * max)}" r="${f(max * .07)}" fill="${accent}" stroke="none"/>`;
    return s;
  },
  inner(w, h, R, accent) {
    let s = '';
    const n = 6 + Math.floor(R() * 4), hi = Math.floor(R() * n), freq = 1.5 + R() * 2.5, ph = R() * 6;
    for (let i = 0; i < n; i++) {
      const y0 = h * 0.12 + (h * 0.76 * i) / (n - 1), amp = h * 0.05 * (0.4 + Math.sin(i * .9 + ph) ** 2 * 1.6);
      let d = `M0 ${f(y0)}`;
      for (let x = 0; x <= w; x += w / 40) d += `L${f(x)} ${f(y0 + Math.sin((x / w) * Math.PI * 2 * freq + i * .7 + ph) * amp)}`;
      s += `<path d="${d}" ${i === hi ? `stroke="${accent}" stroke-width="2.4"` : `stroke-opacity="${f(.3 + .5 * (i / n))}"`}/>`;
    }
    return s;
  },
  between(w, h, R, accent) {
    const r = Math.min(w, h) * (0.24 + R() * .08), cy = h / 2, gap = r * (0.7 + R() * .5);
    const a = w / 2 - gap / 2, b = w / 2 + gap / 2;
    let s = `<circle cx="${f(a)}" cy="${f(cy)}" r="${f(r)}"/><circle cx="${f(b)}" cy="${f(cy)}" r="${f(r)}"/>`;
    const n = 4 + Math.floor(R() * 5);
    for (let i = 0; i < n; i++) {
      const y1 = cy - r * .8 + (1.6 * r * i) / (n - 1);
      s += `<path d="M${f(a)} ${f(cy)}Q${f(w / 2)} ${f(y1 + (R() - .5) * r * .6)} ${f(b)} ${f(cy)}" stroke-opacity="${f(.25 + R() * .5)}"/>`;
    }
    s += `<circle cx="${f(a)}" cy="${f(cy)}" r="${f(r * .1)}" fill="${accent}" stroke="none"/><circle cx="${f(b)}" cy="${f(cy)}" r="${f(r * .1)}" fill="currentColor" stroke="none"/>`;
    return s;
  },
  voice(w, h, R, accent) {
    const ox = w * (0.18 + R() * .15), oy = h * (0.5 + (R() - .5) * .3);
    let s = `<circle cx="${f(ox)}" cy="${f(oy)}" r="${f(h * .045)}" fill="${accent}" stroke="none"/>`;
    const n = 6 + Math.floor(R() * 5), spread = 0.5 + R() * 0.5;
    for (let i = 1; i <= n; i++) {
      const r = (w * 0.85 * i) / n, a = spread * (1 - i / (n * 1.6));
      const x1 = ox + r * Math.cos(-a), y1 = oy + r * Math.sin(-a), x2 = ox + r * Math.cos(a), y2 = oy + r * Math.sin(a);
      s += `<path d="M${f(x1)} ${f(y1)}A${f(r)} ${f(r)} 0 0 1 ${f(x2)} ${f(y2)}" stroke-opacity="${f(1 - i / (n + 2))}"/>`;
    }
    return s;
  },
  mind(w, h, R, accent) {
    const cols = 9, rows = Math.max(3, Math.round(cols * h / w)), pts = [];
    let s = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const px = (w * (x + .5)) / cols, py = (h * (y + .5)) / rows;
      pts.push([px, py]);
      s += `<circle cx="${f(px)}" cy="${f(py)}" r="1.6" fill="currentColor" stroke="none" opacity=".45"/>`;
    }
    let cur = Math.floor(R() * pts.length), d = `M${f(pts[cur][0])} ${f(pts[cur][1])}`;
    const steps = 6 + Math.floor(R() * 5);
    for (let i = 0; i < steps; i++) {
      const cx = cur % cols, cy = Math.floor(cur / cols);
      const nx = Math.min(cols - 1, Math.max(0, cx + Math.floor(R() * 5) - 2)), ny = Math.min(rows - 1, Math.max(0, cy + Math.floor(R() * 3) - 1));
      cur = ny * cols + nx; d += `L${f(pts[cur][0])} ${f(pts[cur][1])}`;
    }
    s += `<path d="${d}" stroke-width="1.8"/><circle cx="${f(pts[cur][0])}" cy="${f(pts[cur][1])}" r="${f(h * .05)}" fill="${accent}" stroke="none"/>`;
    return s;
  },
  craft(w, h, R, accent) {
    const n = 5 + Math.floor(R() * 5), sw = (w * .8) / n, x0 = w * .1;
    let d = `M${f(x0)} ${f(h * .9)}`, x = x0, y = h * .9;
    for (let i = 0; i < n; i++) {
      const rise = (h * .75 / n) * (0.5 + R() * 1.0) * (i < n * .4 ? 0.6 : 1.2);
      y = Math.max(h * .08, y - rise); d += `V${f(y)}`; x += sw; d += `H${f(x)}`;
    }
    let s = `<path d="${d}" stroke-width="1.8"/>`;
    s += `<path d="M${f(x0)} ${f(h * .9)}L${f(x)} ${f(y)}" stroke-dasharray="3 5" stroke-opacity=".5"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(h * .045)}" fill="${accent}" stroke="none"/>`;
    return s;
  },
  influence(w, h, R, accent) {
    const tx = w * (0.62 + R() * .25), ty = h * (0.3 + R() * .4);
    let s = '';
    const cols = 8, rows = Math.max(3, Math.round(cols * h / w));
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const px = (w * (x + .5)) / cols, py = (h * (y + .5)) / rows, ang = Math.atan2(ty - py, tx - px), L = Math.min(w, h) * .07;
      const dist = Math.hypot(tx - px, ty - py); if (dist < L * 1.5) continue;
      const ex = px + Math.cos(ang) * L, ey = py + Math.sin(ang) * L;
      s += `<path d="M${f(px)} ${f(py)}L${f(ex)} ${f(ey)}" stroke-opacity="${f(.25 + .6 * (1 - dist / w))}"/>`;
    }
    s += `<circle cx="${f(tx)}" cy="${f(ty)}" r="${f(h * .06)}" fill="${accent}" stroke="none"/><circle cx="${f(tx)}" cy="${f(ty)}" r="${f(h * .13)}"/>`;
    return s;
  },
  surface(w, h, R, accent) {
    let s = '';
    const n = 5 + Math.floor(R() * 4), cx = w / 2, cy = h / 2;
    for (let i = 0; i < n; i++) {
      const ww = w * (0.25 + .5 * (1 - i / n)), hh = h * (0.3 + .5 * (1 - i / n)), rot = (R() - .5) * 30 + i * 4;
      s += `<rect x="${f(cx - ww / 2)}" y="${f(cy - hh / 2)}" width="${f(ww)}" height="${f(hh)}" rx="${f(4 + R() * 10)}" transform="rotate(${f(rot)} ${f(cx)} ${f(cy)})" stroke-opacity="${f(.3 + .7 * i / n)}"/>`;
    }
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(h * .05)}" fill="${accent}" stroke="none"/>`;
    return s;
  },
  visions(w, h, R, accent) {
    const cx = w / 2, cy = h / 2, n = 12 + Math.floor(R() * 14), r1 = Math.min(w, h) * .08, rot = R() * Math.PI;
    let s = '';
    for (let i = 0; i < n; i++) {
      const a = rot + (i / n) * Math.PI * 2, len = Math.min(w, h) * (0.22 + R() * .26);
      s += `<path d="M${f(cx + Math.cos(a) * r1)} ${f(cy + Math.sin(a) * r1)}L${f(cx + Math.cos(a) * len)} ${f(cy + Math.sin(a) * len)}" stroke-opacity="${f(.3 + R() * .7)}"/>`;
    }
    const k = Math.floor(R() * n), a = rot + (k / n) * Math.PI * 2, L = Math.min(w, h) * .47;
    s += `<path d="M${f(cx)} ${f(cy)}L${f(cx + Math.cos(a) * L)} ${f(cy + Math.sin(a) * L)}" stroke="${accent}" stroke-width="2.4"/>`;
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r1)}"/>`;
    return s;
  }
};

/** Returns an inline SVG string. */
export function art(style, seed, { w = 200, h = 200, cls = '', label = '', sw = 1.4 } = {}) {
  const R = rng(seed + ':' + style);
  const body = (STYLES[style] || STYLES.visions)(w, h, R, 'var(--r, currentColor)');
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" ${a11y} fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
}
