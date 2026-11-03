// Local-only persistence. Everything stays on the device; every access is guarded
// because storage can be unavailable (private mode, blocked site data).
const P = 'lat:';
function read(key, fallback) {
  try { const v = localStorage.getItem(P + key); return v == null ? fallback : JSON.parse(v); } catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(P + key, JSON.stringify(value)); return true; } catch { return false; }
}

export const store = {
  visited: () => read('visited', {}),
  visit(id) { const v = read('visited', {}); if (!v[id]) { v[id] = Date.now(); write('visited', v); } },
  kept: () => read('kept', []),
  toggleKeep(id) {
    const k = read('kept', []); const i = k.indexOf(id);
    i >= 0 ? k.splice(i, 1) : k.unshift(id); write('kept', k); return i < 0;
  },
  notes: () => read('notes', {}),
  note(key) { return read('notes', {})[key]?.text || ''; },
  setNote(key, text, meta = {}) {
    const n = read('notes', {});
    if (text.trim()) n[key] = { text, at: Date.now(), ...meta }; else delete n[key];
    return write('notes', n);
  },
  get: read,
  set: write,
  clear() {
    try { Object.keys(localStorage).filter(k => k.startsWith(P) && k !== P + 'theme').forEach(k => localStorage.removeItem(k)); } catch {}
  }
};
