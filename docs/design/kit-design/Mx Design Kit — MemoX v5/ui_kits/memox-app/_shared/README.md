# `_shared/` — reusable partials

Pieces used by **more than one** screen. Everything here is **non-generated** (hand-authored) and
depends only on `window.React` (UMD) + the kit bundle `window.MxDesignKitMemoXV5_9f1387`. A screen in
`../screens/` never imports another screen — shared UI is promoted here instead.

| File | Kind | Exposes | Consume from a screen |
|------|------|---------|-----------------------|
| `phone.css` | CSS | `.mx-desk` / `.mx-phone` / `.mx-status` / `.mx-scroll` / `.mx-bottom` — the 384×824 Galaxy S23 Ultra frame | `<link rel="stylesheet" href="../_shared/phone.css" />` |
| `deck-card-list.js` | Babel/JSX partial | `window.MxDeckList` = `{ L, EN, VI, Ic, fmt, Ring, STATUS, StatusChip, DueBadge, DeckRow, Chip, SearchField, ControlArea, DeckList }` | `<script type="text/babel" src="../_shared/deck-card-list.js"></script>` then `const { DeckList, ControlArea } = window.MxDeckList` |

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
