# MemoX App — UI Kit (mockups)

High-fidelity, click-through **mockups** of the MemoX v5 mobile app. Every screen is assembled
**only** from the `Mx*` component family (from the generated `_ds_bundle.js`) + `var(--mx-*)`
tokens — no screen invents style outside the kit. These are usage frames for design review, **not**
production React Native code.

## Folder structure

The layout mirrors the app's own `src/shared` vs `src/features` boundary (see repo `AGENTS.md` §3):
reusable pieces are separated from screens, and specs/tooling live in their own folders.

```
ui_kits/memox-app/
├── index.html          Gallery — links every screen, with a light/dark toggle. Start here.
├── README.md           This file (folder router + conventions).
├── _shared/            Reusable, NON-generated partials shared across screens.
│   ├── phone.css         384×824 phone frame (Galaxy S23 Ultra, 19.3:9) + scroll/bottom slots.
│   ├── deck-card-list.js Deck list building blocks → window.MxDeckList (Ring/StatusChip/DeckRow/…).
│   └── README.md         What each partial exports and how to consume it.
├── screens/            One *.card.html per screen; all states × dark + light in one file.
├── specs/              SCREENS-WBS.md (state registry) + <screen>.contract.md build records.
├── shots/              Verification screenshots (optional; kept out of screen folders).
└── tools/
    └── check-screen-tokens.mjs  Token/spacing guard (no raw hex, on-scale gap) over screens + _shared.
```

**Rule of thumb:** anything used by more than one screen goes in `_shared/`; a screen never imports
another screen. Contracts and the WBS registry are docs — they live in `specs/`, never beside the HTML.

## How a screen loads (path depth matters)

Each `screens/*.card.html` is a self-contained page. Relative paths are **three** levels up to the
kit root for the bundle, and `../_shared/` for partials:

```html
<link rel="stylesheet" href="../../../styles.css" />   <!-- token @import manifest -->
<script src="../../../_ds_bundle.js"></script>          <!-- Mx* components → window.MxDesignKitMemoXV5_9f1387 -->
<script type="text/babel" src="../_shared/kit-helpers.js"></script>     <!-- shared atoms → window.MxKit (Ic/Skel/fmt) -->
<script type="text/babel" src="../_shared/deck-card-list.js"></script>  <!-- optional deck composite → window.MxDeckList -->
<link rel="stylesheet" href="../_shared/phone.css" />
```

Screens then mount via `const { … } = window.MxDesignKitMemoXV5_9f1387` and pull shared atoms with
`const { Ic, Skel } = window.MxKit` — no screen re-declares the icon wrapper or skeleton block. Icons use Lucide 0.454.0
via CDN. Theming is **dark-first** (`:root`); light parity is rendered under `data-theme="light"`.

## Adding a screen

1. Create `screens/<name>.card.html` from an existing screen (copy the load block above).
2. Reuse `_shared/` partials rather than re-implementing shared UI. Promote genuinely shared UI into
   `_shared/` (a `.js` partial exposing a `window.Mx*` global) — never copy-paste between screens.
3. Add a row to `specs/SCREENS-WBS.md` and a card entry in `index.html`.
4. Run the guard: `node "tools/check-screen-tokens.mjs"` — must pass (no raw hex, on-scale `gap:`).

> The `Mx*` primitives live in the **generated** `_ds_bundle.js` at the kit root, which is not
> hand-editable here. Screen-level shared UI therefore lives as `_shared/*.js` partials; promoting a
> partial into a real `Mx*` component is a separate DesignSync/kit-source task.

## Business rules honored

- Pre-SRS feedback (fillMode) is learning feedback, not SRS grading; only Check-correct activates Box 1.
- Play Menu adapts to scope state (e.g. hides **Repeat** when progress = 0%).
- Opening Settings/Statistics never mutates data; restore/reset is a `tone="destructive"` confirm.
- Due badges (amber) are visually distinct from wrong/destructive (red).
