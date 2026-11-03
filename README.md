# Latitude

An atlas of human excellence, presented as an offline-capable PWA. It covers confidence, presence, social intelligence, intellectual character, influence, craft and philosophical ideals. It also covers the invisible walls (psychological, cultural and external) that limit how people live.

- **No build step:** vanilla ES modules, hash routing and hand-drawn SVG visualisations.
- **Content:** each region is one file in `js/content/`. Concepts cross-link with `[[id|label]]`, and every empirical claim carries an evidence grade.
- **Privacy:** reading history, kept pages and reflections stay in `localStorage` on your device.

```bash
npx http-server . -p 5173 -c-1   # run locally
node tools/check.mjs             # verify links, figures and thread stops
```
