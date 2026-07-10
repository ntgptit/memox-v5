# `_shared/` — reusable partials

Pieces used by **more than one** screen. Everything here is **non-generated** (hand-authored) and
depends only on `window.React` (UMD) + the kit bundle `window.MxDesignKitMemoXV5_9f1387`. A screen in
`../screens/` never imports another screen — shared UI is promoted here instead.

| File | Kind | Exposes | Consume from a screen |
|------|------|---------|-----------------------|
| `phone.css` | CSS | `.mx-desk` / `.mx-phone` / `.mx-status` / `.mx-scroll` / `.mx-bottom` — the 384×824 Galaxy S23 Ultra frame | `<link rel="stylesheet" href="../_shared/phone.css" />` |
| `kit-helpers.js` | Babel/JSX partial | `window.MxKit` = `{ Ic, Skel, fmt }` — the small atoms every screen used to re-declare (icon wrapper, skeleton block, number format). Analogous to V4's `kit-helpers.jsx`. | `<script type="text/babel" src="../_shared/kit-helpers.js"></script>` then `const { Ic, Skel } = window.MxKit` |
| `deck-card-list.js` | Babel/JSX partial | `window.MxDeckList` = `{ L, EN, VI, Ic, fmt, Ring, STATUS, StatusChip, DueBadge, DeckRow, Chip, SearchField, ControlArea, DeckList }` (self-contained deck composite) | `<script type="text/babel" src="../_shared/deck-card-list.js"></script>` then `const { DeckList, ControlArea } = window.MxDeckList` |

> **Atoms vs composites.** `kit-helpers.js` holds cross-screen **atoms** — load it in every screen so
> nothing re-declares `Ic`/`Skel`. `deck-card-list.js` is a self-contained **composite** (a full
> deck list), loaded only by screens that show one; it keeps its own private `Ic`/`fmt` by design.
> Load order when both are present: `_ds_bundle.js` → `kit-helpers.js` → `deck-card-list.js` → the
> screen's inline script.

## Rules

- **Tokens only** — `var(--mx-*)`; no raw hex. Spacing on the `{4,8,12,16,24,32,48}` scale.
- **No screen-specific data** — partials take content via props (e.g. pass `EN`/`VI` and a `decks`
  array); they must render for any screen.
- **`.js` partials are Babel/JSX** — load them with `type="text/babel"` **after** `_ds_bundle.js` and
  **before** the screen's own inline `type="text/babel"` script (Babel runs inline + `src=` scripts in
  document order).
- The token guard (`../tools/check-screen-tokens.mjs`) lints every `.js` here.

Promoting a partial into a real `Mx*` component would mean editing the generated `_ds_bundle.js` (not
hand-editable here) — that's a separate DesignSync/kit-source task.
