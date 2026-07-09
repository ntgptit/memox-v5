---
name: memox-design
description: Use this skill to generate well-branded interfaces and assets for MemoX v5 (the Mx Base Mobile Design Kit), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colour/type/spacing tokens, dark+light themes, fonts, and the Mx UI-kit components for prototyping a local-first Korean→Vietnamese flashcard / SRS learning app.
user-invocable: true
---

Read the `readme.md` file within this skill first — it is the design guide and manifest (product
context, content + visual foundations, iconography, component index, themes, governance). Then explore
the other files:

- `styles.css` + `tokens/*.css` — the token system. Link `styles.css` to inherit every `--mx-*` token.
  Dark is `:root`; set `data-theme="light"` on any ancestor for light mode.
- `components/<group>/` — reusable `Mx` primitives (core, learning, settings, data, feedback). Each has a
  `.d.ts` contract and a `.prompt.md` with a usage snippet. Mount them from the compiled bundle.
- `guidelines/` — specimen cards, `governance.md` (the rules that prevent style drift), and
  `flutter-handoff.md` (1:1 token/widget mapping).
- `ui_kits/memox-app/` — sample screens (deck management, study session, settings, statistics/result)
  proving the kit composes into real MemoX views.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static
HTML for the user to view: link `styles.css`, load `_ds_bundle.js`, and mount components via
`const { MxCard, … } = window.<Namespace>` (run the design-system check to get the exact namespace). Icons
use Lucide via CDN. If working on production code, read the rules here and map screen → Mx component →
mx token; never introduce raw colours/spacing or unprefixed reusable components.

Honor the business constraints (they are design-relevant): Box 0 → Box 1 activation only after the full
`review → match → guess → recall → fill` flow; SRS Repeat uses only Box 1+ due cards; Review Words is
read-only; opening Settings/Statistics never mutates data; destructive/high-risk actions need a confirm
pattern; **due (amber) ≠ wrong/destructive (red)**; **no-due is not an error**; **progress ≠ SRS mastery**.

If the user invokes this skill without other guidance, ask what they want to build, ask a few focused
questions (which screen/flow, dark or light or both, real vs sample content), then act as an expert
MemoX designer who outputs HTML artifacts **or** production code depending on the need.
