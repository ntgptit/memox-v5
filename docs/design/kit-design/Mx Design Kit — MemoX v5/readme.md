# Mx Base Mobile Design Kit — MemoX v5

The living design foundation (**Mx Base Mobile Design Kit**) for **MemoX v5**, a local-first mobile
flashcard / spaced-repetition (SRS) learning app. This kit is the **single source of truth** for design
tokens, dark/light themes, layout, typography, colour roles, component primitives, interaction states,
accessibility, React Native handoff, and governance. It is a **foundation**, not a set of finished product
screens — future screen designs must be built from these tokens and components.

> **Prefix contract.** Every reusable kit asset is prefixed **`Mx`** (components: `MxCard`) or
> **`mx`** (tokens: `--mx-color-surface-card`). Screen-specific components must **not** use the `Mx`
> prefix until promoted into this kit. See [Governance](#17--mx-kit-governance).

## Sources (read-only; stored for whoever has access)

- **GitHub repo:** https://github.com/ntgptit/memox-v5
- **Attached codebase:** `memox-v5/` (mounted, read-only) — Expo SDK 57 · React Native · TypeScript ·
  NativeWind (Tailwind) · Zustand · Zod · neverthrow. **Docs-first**: no product feature code exists yet.
- **Docs read to ground this kit:** `README.md`, `docs/README.md`, `docs/product/memox-scope.md`,
  `docs/design/06-srs-8box.md`, `docs/design/07-study-modes.md`, and the screen specs under
  `docs/design/screens/` (deck-management, session-result, statistics, settings-more-hub,
  appearance-theme-settings, app-settings, native-language-picker, reminder-settings). *Note: the task
  referenced `review-words.md`; the repo names it `flashcard-list.md` (browse / Review words).*
- **The docs define behavior. This kit defines how behavior is visually expressed** — visual ideas never
  change business rules (Box 0 activation, 5-mode flow, read-only Review Words, etc.).

## Product in one screen

MemoX teaches vocabulary (Korean → Vietnamese by default) via an **8-box Leitner** SRS. New cards start
in **Box 0 (pre-SRS)** and only enter **Box 1** after completing the **New Learning Flow**:
`review → match → guess → recall → fill` (all five modes). **SRS Repeat** reviews only Box 1+ due cards
via a Repeat Mode Menu (match / guess / recall / fill — no review). Study is one loop; the rest is deck
management, session results, long-term statistics, and a modern Settings / More Hub (no mandatory drawer).

---

## Content fundamentals

How MemoX writes copy (grounded in the repo's screen specs, whose UI strings are Vietnamese):

- **Language.** **The kit's demo strings and sample screens are in English.** In production the app UI
  is internationalized (vi/en) and card *content* is free Unicode (Korean prompts, meanings in the
  learner's language); the kit demos direction as **KO → EN**. Native language names in pickers stay
  written natively (e.g. "Tiếng Việt" alongside "Vietnamese").
- **Voice & person.** Neutral, calm, instructional. Addresses the user politely and sparingly ("You've
  reviewed everything today"). Not chatty, not gamified-hype. No exclamation spam.
- **Casing.** Sentence case for body and rows ("Add word"). Section labels are UPPERCASE with wide
  tracking ("LEARNING"). Never Title Case Every Word.
- **Tone.** Reassuring around risk and failure — error copy always states data is safe ("Your learning
  data is safe"). No-due is framed positively ("Nothing due"), never as a failure.
- **Precision over cleverness.** Labels name the real action: **Learn** (new cards), **Repeat** (SRS
  repeat), **Review words** (browse), **Check**, **Hint**, **Reveal**. Counts are explicit and real
  ("Due 83", "120 new words") — never fabricated.
- **Emoji.** Not used in product UI. Iconography carries meaning; text carries the rest.
- **Numbers.** Tabular (JetBrains Mono) for counts, percentages, times, timers ("14:08", "94%", "20s").

Examples: `Start studying` · `Due 83` · `Nothing due` · `Forgot` / `Remembered` ·
`Restore will overwrite your current data` · `KO → EN`.

---

## Visual foundations

The MemoX aesthetic is **calm, focused, low-noise** — a quiet reading surface that keeps attention on the
card. **Dark mode is the primary direction; light mode is complete and production-ready** (not an
inversion). Every visual decision below is expressed as a token so screens never hardcode it.

- **Colour vibe (Bazar purple).** Cool near-neutral greys with a faint purple cast. A single confident
  **royal purple `#4B3A8C`** is the brand + only action colour (lifted `#8A79E0` for active/links on
  dark). Light mode is clean and white-first (`#F6F5FC` bg, white cards); dark mode is a purple-tinted
  deep aubergine (`#141220` app bg, `#252338` cards) — never pure black. Secondary actions use a soft
  **lavender `#F1EFF9`** with purple text. Greens = correct, reds = wrong/destructive, **amber =
  due/warning** (kept distinct so "needs review" never reads as "danger"), violet = mastered, coral =
  lapse.
- **Type.** **Plus Jakarta Sans** for UI/display **and** body, **Noto Sans KR** for Korean prompts,
  **JetBrains Mono** for numbers. Study prompt is
  large + centred + high-contrast (34px); the meaning wraps comfortably at 18/28. Long deck names
  truncate; long meanings wrap (`text-wrap: pretty`) rather than shrink below readable size.
- **Spacing & layout.** 4px grid. 16px screen gutters, 24px between sections. **Mobile-first, Android-
  first**, single column. **Reference device: Samsung Galaxy S23 Ultra** — 19.3:9 aspect (CSS 384×824);
  all sample screens use this frame. ≤520px readable cap for tablets. Primary action sits near the bottom
  (sticky bottom bar), respecting Android gesture / safe-area insets. Content scrolls; it never overflows
  or shrinks to fit.
- **Corners & cards.** Cards are `radius-lg` (16px) with a 1px token border; the study card and modal
  sheets are `radius-xl` (22px). Chips/segmented/pills are fully rounded. Cards in **dark** are
  distinguished by **surface contrast + border** (shadows are near-invisible on dark); in **light** by a
  **soft, low-spread shadow + visible border**.
- **Borders & dividers.** Hairline `rgba` borders (white in dark, ink in light) at subtle/default/strong
  steps. Feedback outlines are 2px (`selected`, `correct`, `wrong`), destructive 1.5px.
- **Backgrounds.** Flat, solid surfaces — **no gradients, no textures, no illustrations, no full-bleed
  imagery**. The calm comes from restraint. (No brand imagery ships in the repo; see Iconography.)
- **Elevation.** Four steps (low/medium/high) plus modal + sheet. Dark leans on surface steps; light uses
  gentle neutral shadows.
- **Motion.** Short and quiet: 120ms taps, 200ms sheet/menu, 320ms screen. Standard ease
  `cubic-bezier(0.2,0,0,1)`. **No bounce** on content; decorative loops avoided. Honors
  `prefers-reduced-motion` (durations collapse to 0).
- **Hover / press.** Hover (where a pointer exists): a faint surface wash (`state.loadingSurface`).
  Press: a subtle `scale(0.98–0.99)` on buttons/cards, plus the pressed action token. No colour inversion.
- **Transparency & blur.** Used sparingly — scrims behind sheets/dialogs (`overlay.scrim`), tinted
  feedback surfaces (`…Surface` tokens at ~12–16% alpha). No glassmorphism.

See the **Design System tab** for live specimen cards (Colors, Type, Spacing, Brand).

---

## Iconography

- **App source:** MemoX declares **`expo-symbols`** (Apple **SF Symbols**) in `package.json` and ships
  no custom icon set. SF Symbols are iOS-only and not usable in cross-platform web mocks.
- **Kit substitution (flagged):** this kit uses **Lucide** (`lucide@0.454.0` via CDN) — a calm, 2px
  rounded-stroke set that closely matches the SF Symbols feel. **This is a substitution**; for React
  Native production, map to the platform SF Symbols / a Material equivalent with the same names. See
  [Open questions](#open-questions).
- **Rules (from the specs):** icons are **secondary to labels** for critical actions; every icon-only
  action needs a semantic label (enforced by `MxIconButton`'s required `label`). Destructive icons use the
  destructive token. Audio icons carry a label. **Flags/icons in the language picker are visual hints
  only, never identifiers** (`MxLanguageRow` always shows text). No emoji as icons.
- **No logo.** The repo contains only Expo starter art (`react-logo`, `expo-badge`, tutorial images) —
  **no MemoX brand mark**. Per policy this kit does **not** invent one: the wordmark specimen renders
  "MemoX" in Plus Jakarta Sans with a plain `M` tile. Supply a real logo to replace it.

---

## Components (the Mx kit, 33)

All are `window.MxDesignKitMemoXV5_9f1387.<Name>`. Each has a `.d.ts` contract, a `.prompt.md`, and a
group gallery card. Every component works in dark **and** light and documents its states.

**Core** (`components/core/`): **MxActionButton**, **MxIconButton**, **MxCard**, **MxBadge**,
**MxListRow**, **MxTopBar**, **MxSegmentedControl**, **MxModalSheet**, **MxEmptyState**, **MxErrorState**.

**Learning** (`components/learning/`): **MxStudyProgressBar**, **MxStudyCard**, **MxAnswerOption**,
**MxMatchTile**, **MxRecallPanel**, **MxFillInputPanel**, **MxSessionResultSummary**.

**Settings** (`components/settings/`): **MxSettingsSection**, **MxSettingsRow**, **MxSwitch**,
**MxWeekdayChip**, **MxLanguageRow**, **MxReminderRow**, **MxThemePresetTile**.

**Data** (`components/data/`): **MxMetricCard**, **MxStatsChartPanel**.

**Feedback** (`components/feedback/`): **MxCallout**, **MxSnackbar**, **MxConfirmDialog**.

**Navigation & layout** (`components/navigation/`): **MxSectionHeader**, **MxTabs**, **MxBottomNav**, **MxAvatar**.

### Intentional additions
Beyond the names listed in the brief, the kit adds a few primitives the specs imply but didn't name:
**MxBadge** (SRS/due status pills), **MxSegmentedControl** (Statistics tabs), **MxSwitch** (settings
toggles), **MxWeekdayChip** (reminder days), **MxSnackbar** & **MxCallout** (feedback), and
**MxSettingsSection** (grouping). Each maps 1:1 to a documented screen need.

---

## Themes — MxDarkDefault & MxLightDefault

Two first-class themes. Dark values live on `:root`; light overrides under `[data-theme="light"]`. **Every
semantic colour token defines both.** Toggle a theme by setting `data-theme="light"` on any ancestor (app
root or a subtree). Switching themes is a **visual preference only** — it never mutates learning data,
sessions, or SRS state. Optional future presets (`MxDayAccentTheme`, `MxNightAccentTheme`) can be added as
additional scopes without new components. There are **no** theme-specific duplicate components
(no `MxDarkCard`/`MxLightCard`) — one `MxCard` consumes theme tokens.

---

## Accessibility

- Minimum touch target **44px** (`--mx-size-touch-target`; enforced in buttons/rows/chips).
- Colour is **never the only signal**: correct/wrong pair colour with a check/x glyph; due/destructive
  differ in hue *and* context; states include text labels.
- Text scales with OS settings; long Korean/Vietnamese content wraps rather than shrinking below readable
  size (min body 13px, study prompt 34px).
- Icon-only critical actions require a semantic label (`MxIconButton.label` → aria-label).
- Destructive/high-risk actions are clearly labelled and gated by `MxConfirmDialog`.
- `prefers-reduced-motion` collapses transition durations to 0.
- Dark/light both target legible contrast for primary text on their surfaces.

---

## React Native handoff (summary)

The app target is **Expo SDK 57 · React Native · TypeScript · NativeWind**. Design names map **1:1** to
shared React Native components / token modules. Full mapping in the **React Native Handoff Gallery**
([`kit-screens/14-react-native-handoff-gallery.html`](kit-screens/14-react-native-handoff-gallery.html)).
Rules: no raw colours/spacing/type; one `MxThemeProvider` / `MxThemeResolver` (read via `useMxTheme()`);
components consume `Mx` semantic tokens; no per-screen `useColorScheme` branching; study progress always via
`MxStudyProgressBar`; settings rows via `MxSettingsRow`; charts via `MxStatsChartPanel`/chart tokens;
destructive actions via destructive token + confirm pattern.

---

## Governance (summary)

This kit is the living source of truth. New screen style requires **updating the kit first**; new reusable
components enter the kit **before** screen use; screen-specific components stay unprefixed until promoted.
Full rules + Do/Don't in [`guidelines/governance.md`](guidelines/governance.md).

---

## UI Composition Grammar

Tokens + components are the **vocabulary**; the **grammar** is how to compose them into screens so future
work can't be "token-correct but composition-wrong". Concrete, checkable rules + recipes + golden
references:

- [`guidelines/composition-grammar.md`](guidelines/composition-grammar.md) — spacing rhythm, typography
  hierarchy, 4 visual-hierarchy levels, action hierarchy, density, colour-usage, state + dark/light grammar.
- [`guidelines/screen-recipes.md`](guidelines/screen-recipes.md) — 9 screen recipes (List, Detail, Study,
  Form, Settings, ModalSheet, Result, Statistics, Empty/Error).
- [`guidelines/golden-screens.md`](guidelines/golden-screens.md) — 3 golden exemplars (Deck/Home, Study,
  Settings) with component-mapping + annotations; live in `ui_kits/memox-app/`.
- [`guidelines/ui-definition-of-done.md`](guidelines/ui-definition-of-done.md) — the per-screen DoD checklist.
- [`guidelines/visual-review-checklist.md`](guidelines/visual-review-checklist.md) — design-review agent checklist + bug format.
- [`kit-screens/14-react-native-handoff-gallery.html`](kit-screens/14-react-native-handoff-gallery.html) — React Native guard/lint rules.
- [`guidelines/screenshot-review-loop.md`](guidelines/screenshot-review-loop.md) — the visual-verification loop.
- [`guidelines/composition-governance.md`](guidelines/composition-governance.md) — how the layers fit + change flow.

Design-System-tab cards: **Composition** group (Spacing Rhythm, Hierarchy Levels, Action Hierarchy, State
Composition) and **Golden Screens** group (Deck/Home, Study, Settings).

---

## Repository index (manifest)

```
styles.css                 → global entry (@import manifest only) — consumers link THIS
tokens/
  fonts.css                → webfont @imports (Plus Jakarta Sans, Noto Sans KR, JetBrains Mono)
  colors.css               → primitives + semantic colour roles (dark :root / light [data-theme])
  typography.css           → font families, weights, text-role tokens
  spacing.css              → 4px space scale + sizing + layout tokens
  radius.css               → radius scale + border-width + composed border/divider tokens
  elevation.css            → theme-aware shadow/elevation tokens
  motion.css               → durations, easings, z-layers (+ reduced-motion)
  base.css                 → minimal resets, link defaults, .mx-korean / .mx-tabular helpers
components/
  core/                    → 10 primitives  (+ core.card.html gallery)
  learning/                → 7 primitives   (+ learning.card.html)
  settings/                → 7 primitives   (+ settings.card.html)
  data/                    → 2 primitives   (+ data.card.html)
  feedback/                → 3 primitives   (+ feedback.card.html)
  navigation/              → 4 primitives   (+ navigation.card.html)
guidelines/
  colors-*.card.html, type-*.card.html, spacing-*.card.html, brand-*.card.html  → specimen cards
  theme-matrix.card.html   → dark-vs-light token matrix
  icon-system.card.html    → icon roles → Lucide glyphs
  state-gallery-{dark,light}.card.html + state-gallery.jsx  → every state, both themes
  layout-templates.md      → the 9 named Mx layout templates + regions
  governance.md            → full governance rules + Do/Don't
  — UI Composition Grammar —
  composition-grammar.md · screen-recipes.md · golden-screens.md
  ui-definition-of-done.md · visual-review-checklist.md
  screenshot-review-loop.md · composition-governance.md
kit-screens/
  index.html + 01..15      → Mx Kit Screens (galleries + React Native handoff, page 14)
  grammar-*.card.html      → Composition cards (spacing, hierarchy, actions, states)
  golden-*.card.html       → Golden Screens cards (embed live screens)
ui_kits/memox-app/
  index.html               → Home (Bazar language, starting point) + phone.css
  deck-detail.card.html, study-session.card.html, settings.card.html,
  statistics.card.html, appearance-reminders.card.html
  README.md
SKILL.md                   → Agent-Skill wrapper (for Claude Code use)
readme.md                  → this file
```

Compiler-generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

## Open questions

- **Icon set:** Lucide is a substitute for the app's SF Symbols. Confirm the production icon strategy
  (SF Symbols on iOS + a Material/other set on Android, or a single cross-platform set).
- **Fonts:** Plus Jakarta Sans / Noto Sans KR / JetBrains Mono load from Google Fonts (no binaries in
  repo). If you have `PlusJakartaSans.ttf` (and Noto Sans KR) to self-host for offline/local-first, drop
  them in and I'll wire `@font-face`.
- **Logo:** no MemoX brand mark exists in the repo — supply one to replace the type-only wordmark.
- **Accent presets:** `MxDayAccentTheme` / `MxNightAccentTheme` are stubbed as future scopes; confirm the
  palettes when the Appearance screen is designed.
