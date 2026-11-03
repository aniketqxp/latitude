# Latitude

A corridor of doors, and behind each one a small world. Some are simulations, some are fables, and some are illustrated books about real people who lived forwards, with no idea which of their afternoons would matter. You meet each idea inside its world rather than being told about it.

**Live:** https://aniketqxp.github.io/latitude/

## The collections

- **I · Rooms.** Three small machines for trying things: a party you can simulate, a ship that is also you, and a department that issues permission.
- **II · Worthy of Notice.** Five picture books:
  - *It Is Worthy of Notice*: Henrietta Leavitt and the ruler for the universe.
  - *His Imperial Majesty*: Emperor Norton and the city that played along.
  - *Bread from Air*: Fritz Haber, both halves.
  - *Tuesday, with Notes*: a fiction about the scholars who come after an ordinary day.
  - *The Same Face*: the Kuleshov effect, done to you.

Every story has a curtain. Behind it are what's real, what's made up, what's still open, and the sources.

## How it's made

- **[docs/EDITORIAL.md](docs/EDITORIAL.md):** the sensibility. What Latitude tells, how, and what it never does.
- **[docs/WORKFLOW.md](docs/WORKFLOW.md):** the pipeline from a lead to a door: research, select, author, illustrate, implement, verify, publish. It also documents the book engine's API.
- **[docs/LONGLIST.md](docs/LONGLIST.md):** leads that were chosen, held in reserve, declined, or not yet verified.

## The code

- **The registry.** `js/encounters/index.js` holds the whole registry: collections, plus encounters grouped into them.
  - An encounter is any module that exports `mount(stage, api) → cleanup` and a `curtain`.
  - Most stories are built on `js/book.js`, a picture-book engine that handles page turns, beats, notes, lenses and choices. A story can also skip it entirely.
- **Doors and routes.**
  - Doors are drawn in `js/doors.js`.
  - The corridor and the index of first lines (`#/index`) are in `js/world.js`.
- **The Reading Room.** The first Latitude, a library of 53 essays, lives on at `archive/`, behind the hatch at the end of the corridor.
- **No build step.** Vanilla ES modules, hash routing and inline SVG. It works offline after the first visit. Nothing about you leaves your device; the only thing remembered is which doors you've opened, for this visit.

To run it locally:

```bash
npx http-server . -p 5173 -c-1
```

To check encounters, books, the precache list and the archive:

```bash
node tools/check.mjs
```
