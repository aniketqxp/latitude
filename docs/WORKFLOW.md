# From a lead to a door

*How a story gets made. [EDITORIAL.md](EDITORIAL.md) says what to make and why. This file says how, step by step, so that the five-hundredth story is made the same careful way as the fifth.*

Each stage has an output and a gate. Don't start a stage until the one before it has passed its gate. Most leads should die at stage 2, and that's healthy.

| Stage | Output | Gate |
|---|---|---|
| 1. Research | a lead in `docs/LONGLIST.md` | at least two independent sources for anything stated as fact |
| 2. Select | the lead moves to *Chosen* with a one-line reason | the range test (EDITORIAL §4); the canon blacklist (§2) |
| 3. Author | the text of every page, in the story file | the review in EDITORIAL §10, read aloud, on a phone |
| 4. Illustrate | inline SVG drawings in the same file | every picture does a job the words don't |
| 5. Implement | registry entry, door, stylesheet, precache | `node tools/check.mjs` passes |
| 6. Verify | a full read-through on a 375px screen | the test checklist below |
| 7. Publish | a push to `main` | the live site serves the new service-worker version |

---

## 1. Research

Start from primary or near-primary material: letters, court records, lab notebooks, contemporary newspapers, the person's own published words. Popular retellings are where you find leads, not where you check them. They are also where the anecdote canon comes from.

Write the lead into `LONGLIST.md` with:

- the incident in one sentence
- the strange detail that makes it worth telling
- sources, and what each one actually supports
- what is disputed

Quotes need a source you have seen. If you can't trace a quote, it doesn't go in the story, however good it is. You can keep it under *unverified* so nobody wastes time on it again.

## 2. Select

Apply the range test against the collection the story would join, and against the whole corridor. Move the lead to *Chosen*, *Reserve* or *Declined*, with a reason. Declined leads are worth keeping, because they record taste.

A collection is about five stories, sequenced like an album (EDITORIAL §9). Choose the five together. Five individually good stories that are all the same shape make a worse collection than five uneven ones.

## 3. Author

Write the pages before drawing anything. Then look for the image at the centre: the single picture the story is built around.

- **The beat is the unit.** A page shows one or more beats, one tap each. If a beat runs past about 40 words, it is a paragraph pretending to be a page. The checker warns at 42 words and fails at 60.
- **The page turn is suspense.** Put the reveal on the next page, never at the bottom of this one.
- **Decide the ending's direction.** It should face outward, toward the reader's world, without telling the reader anything about themselves.
- **Fill in the curtain as you go.** List what's real, what's invented, what's still open, and the sources. Anything reconstructed or interpreted gets a line saying so.

## 4. Illustrate

Drawings are inline SVG strings in the story file. There are no image files, so a story is one request and works offline.

- **Palette.** Each story declares `--bg --fg --soft --hair --hi` (plus `--night` and `--night-ink`) on `body[data-world="<id>"]`, in both light and dark through `light-dark()`. Use one accent colour, two at most.
- **Classes.** Use a short prefix per story (`lv-`, `nt-`, `hb-`…) so stylesheets can never collide.
- **Composition.** The engine crops art to fill (`svg(viewBox, body)` uses `slice`). Keep anything that matters inside the middle 60% of the viewBox. For a full-bleed page on a phone, use a portrait viewBox such as `0 0 400 700`.
- **Repetition.** Shared elements (a desk, a sky, a figure) become small functions inside the story file. Use `rng(seed)` for scatter, so a drawing comes out identical every time.
- **Motion.** Motion is CSS, keyed to `.pg.done` or `[data-beat="n"]`. Every animation needs a `prefers-reduced-motion` fallback that shows the end state.
- **Alt text.** Every piece of art needs `alt`. Describe what the picture shows, not what it means.

## 5. Implement

A story built on the book engine is a single module. In outline:

```js
import { book, svg, rng } from '../book.js';
export const curtain = { real: [], invented: [], open: [], sources: [] };
export const story = { id, title, turn?, lens?, pages: [ /* page objects */ ] };
export const mount = (stage, api) => book(stage, story, api);
```

### Page fields

| field | what it does |
|---|---|
| `layout` | `cover` · `under` (art above words, the default) · `over` (words on the art) · `full` (art only, words at the foot) · `text` · `card` |
| `art`, `alt` | an `svg(...)` string and its description |
| `eyebrow`, `title`, `text` | `text` is a string, or an array where each item is one beat |
| `notes`, `inlineNotes` | footnotes keyed by the `[^n]` marker; inline notes print under the beats |
| `choices`, `key`, `ask` | buttons that store `state[key]` and hold the page until one is picked; `to` jumps |
| `hold`, `next` | `hold` keeps the page until the story calls `ctx.next()`; `next` jumps to a page id |
| `turn` | `leaf` · `fade` · `cut` · `rise` · `drift` |
| `tone`, `size`, `at`, `cls` | dark/accent/light, text size (xl/m/s), word placement, extra classes |
| `on(el, ctx)`, `onBeat` | hooks for a page that needs to behave: return a cleanup function |

Any of `art`, `alt`, `eyebrow`, `title`, `text` and `notes` can instead be a **function of ctx** (`ctx.state`, `ctx.lens`, `ctx.beat`…), or an **object keyed by lens id**. One trap: a function *inside* a `text` array is never called. Make the whole `text` a function. The checker catches this.

### Inline markup

`*italic*` · `**bold**` · `{word|gloss}` (tap to reveal) · `[^n]` (a note marker) · `==mark==` · `\n`

### Interaction

Interaction is optional and modest. Anything tappable inside a page must carry `data-nonav`, or tapping it will also turn the page. Handle Enter and Space on custom controls, and call `preventDefault()` so the book's own key handling stays out of the way.

### A story that isn't a book

A story that isn't a book exports `mount(stage, api) → cleanup` and does whatever it likes. Dancefloor, Ship and Permits work this way. The `api` it receives is `{ reduced, haptic(pattern), toast(msg) }`.

### Wiring it in

1. **Registry.** Add an entry to `js/encounters/index.js`: `id`, `collection`, `title`, `line` (the inscription over the door, usually the story's last or truest line), `medium`, `door`, `load`.
2. **Door.** Add a door to `js/doors.js`. It goes in a 200×320 box standing on y=312, and needs a `.panel` group that swings and a `.beyond` behind it. Clip-path and gradient ids must be unique across all doors. Set its `--panel` colour, plus any small details, in `css/world.css` under `[data-door="<name>"]`. Several stories may share a door.
3. **Stylesheet.** Create `css/encounters/<id>.css`.
4. **Precache.** Add the `.js` and `.css` to `SHELL` in `sw.js`, and bump `VERSION`.
5. **New collection.** Add a `COLLECTIONS` entry with numeral, title, a one-line note, and `order` (`authored` for a sequenced album, `shuffle` for a wing of rooms).

### At scale

The corridor is for wandering. The index (`#/index`) is how a large collection stays findable. With hundreds of stories, the corridor should show a few wings at a time and the index should carry the rest. The registry already has what that needs (`collection`, `line`, `medium`), so the change belongs in `world.js` and none of the stories need touching.

## 6. Verify

```bash
npx http-server . -p 5173 -c-1
```

```bash
node tools/check.mjs
```

On a 375×812 viewport:

- [ ] Read the story through, every page. No horizontal scroll, no text clipped behind art.
- [ ] Light, dark and auto themes; the art reads in all three.
- [ ] Reduced motion: nothing moves that matters, and every end state is visible.
- [ ] Keyboard only: arrows and space turn pages; every control is reachable and visibly focused.
- [ ] Screen reader spot check: the cover's alt, one choice page, one note.
- [ ] Every interactive page works by tapping *and* by keyboard.
- [ ] The curtain opens and says what's real.
- [ ] Back to the corridor; the door says *you've been in*.
- [ ] The older encounters still open.
- [ ] The console is clean.

## 7. Publish

Push to `main`. GitHub Pages builds from the root.

```bash
gh api repos/aniketqxp/latitude/pages/builds/latest --jq .status
```

When that returns `built`, fetch the live `sw.js` and confirm the new `VERSION` is being served, then open the new door on a phone. A deploy counts as done only once the live site has been checked.
