# Latitude

A corridor of doors. Behind each one is a small world built around a single idea about being human. Some are simulations, some are fables, some are bureaucracies. You meet the idea inside it rather than being told about it.

- **Encounters:** `js/encounters/index.js` is the whole registry. An encounter is any module that exports `mount(stage, api) → cleanup` and a `curtain` (what's real, what's invented, what's still open, sources). Its stylesheet is `css/encounters/<id>.css` and its door is drawn in `js/doors.js`. No medium is assumed.
- **The curtain:** research stays behind it, one tap away inside every encounter. Fiction is labelled as fiction there, and speculation as speculation.
- **The Reading Room:** the first Latitude, a library of 53 essays, lives on at `archive/`. It is reached by the hatch at the end of the corridor.
- **No build step:** vanilla ES modules, hash routing and SVG. Works offline after the first visit. Nothing about you leaves your device, and almost nothing is stored at all.

```bash
npx http-server . -p 5173 -c-1   # run locally
node tools/check.mjs             # check encounters, precache list and the archive's links
```
