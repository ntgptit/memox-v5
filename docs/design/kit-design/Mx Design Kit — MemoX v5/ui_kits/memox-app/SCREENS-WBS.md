# MemoX Product Screens — Design Kit WBS & Build Loop

Build the necessary MemoX product screens as **design-kit mockups** — HTML kit screens, not React Native app code — using the existing Mx kit: `mx` tokens, dark/light themes, and shared `Mx` components.

These files are the visual golden screens that future React Native implementation maps to.

## Current decision

Use **compose-over-existing kit**.

- Do not create a second kit.
- Do not rebuild tokens/components independently.
- Do not inline CSS into every HTML page.
- Do not open these screens with `file://` or raw single-file preview.
- Preview through a local static server so `../../styles.css`, `phone.css`, and `../../_ds_bundle.js` load correctly.
- React Native is the implementation target.
- Existing Flutter handoff docs are legacy/drift unless explicitly replaced in a dedicated follow-up.

## Scope

Allowed:

- `docs/design/kit-design/Mx Design Kit — MemoX v5/ui_kits/memox-app/**`
- relevant non-generated kit source docs/cards/guidelines under `docs/design/kit-design/Mx Design Kit — MemoX v5/**`
- this WBS file

Forbidden:

- `src/**`
- React Native product implementation code
- generated DesignSync files edited by hand:
  - `_ds_manifest.json`
  - `_ds_bundle.js`
- standalone duplicate artifact outside the kit
- inline token/theme CSS into every screen
- app business behavior changes
- broad rewrite of the existing base kit

## Autonomy boundary

The user pre-approves small kit improvements only when needed to complete a screen beautifully and correctly.

Allowed autonomy:

- add a missing component variant to the Mx kit source
- add a missing state variant to an existing Mx component
- add a missing token only if it has a semantic purpose
- add a short drift note if product docs and kit differ
- keep building after recording the change

Not allowed without stopping:

- changing product behavior
- changing app source
- deleting/replacinging existing base kit layers
- manually editing generated DesignSync output
- adding a second token/component system
- turning HTML mockups into React Native implementation
- silently treating Flutter handoff as current implementation truth

## Preview rule

These kit screens require a static server.

Run:

```bash
python -m http.server 8099 --directory "docs/design/kit-design/Mx Design Kit — MemoX v5"
```

Open:

```text
http://localhost:8099/ui_kits/memox-app/index.html
```

Troubleshooting:

- White screen usually means CSS did not load.
- Check that `../../styles.css`, `phone.css`, and `../../_ds_bundle.js` return `200`.
- Do not fix white screen by inlining CSS.
- Do not rename `Mx Design Kit — MemoX v5`.
- Restart preview before visual verification to avoid cache.

## Build rules — every screen

### 1. File pattern

Copy the golden `ui_kits/memox-app/index.html` skeleton exactly unless the current kit convention says otherwise:

- `@dsCard`
- `@startingPoint`
- link `../../styles.css`
- link `phone.css`
- React / ReactDOM / Babel / Lucide CDN if the golden skeleton uses them
- link `../../_ds_bundle.js`
- `<body class="mx-desk">`
- `type="text/babel"`
- `const K = window.MxDesignKitMemoXV5_9f1387;`

### 2. Only tokens + Mx components

Every reusable UI surface/row/button/card/modal/state must use shared `Mx*` components.

Preferred shared components:

- `MxTopBar`
- `MxCard`
- `MxListRow`
- `MxActionButton`
- `MxIconButton`
- `MxSegmentedControl`
- `MxModalSheet`
- `MxConfirmDialog`
- `MxBadge`
- `MxSettingsRow`
- `MxStudyCard`
- `MxStudyProgressBar`
- `MxAnswerOption`
- `MxMatchTile`
- `MxRecallPanel`
- `MxFillInputPanel`
- `MxMetricCard`
- `MxStatsChartPanel`
- `MxSessionResultSummary`
- `MxBottomNav`
- `MxSectionHeader`
- `MxEmptyState`
- `MxErrorState`
- `MxCallout`
- `MxSnackbar`

Rules:

- no hand-rolled button/card/list-row/modal equivalent
- no generic reusable component names
- common/reusable = `Mx...`
- token = `mx...`
- screen-specific helper may exist only if not reused and must not use `Mx` prefix

### 3. Style rule

Use `var(--mx-*)` for color, spacing, radius, typography, surface, state, and feedback styling.

Forbidden:

- raw hex colors
- arbitrary spacing values
- arbitrary typography
- one-off card/button/list styles
- dark/light duplicated component implementation

Allowed structural exceptions:

- `@dsCard viewport` metadata
- existing golden skeleton requirements
- externally hosted script URLs
- CSS needed only for phone-frame layout when already present in `phone.css`
- existing kit desk background convention if already defined by the base kit

### 4. Dark + light parity

Every screen renders two phone frames side by side:

- default dark
- `data-theme="light"`

The component tree must be the same. Theme changes only through attribute/token resolution.

### 5. State coverage

Every screen must show all applicable states in both dark and light.

Baseline states apply unless explicitly marked N/A with evidence:

- loading
- loaded
- empty
- error

Add screen-specific states listed in the backlog.

### 6. Composition grammar

Follow:

- `guidelines/screen-recipes.md`
- `composition-grammar.md`
- matching `guidelines/golden-*.card.html`

Required grammar:

- one dominant task
- maximum one primary action per region
- section gap = 24
- item gap = 12
- screen gutter = 16
- no card-in-card
- no divider + gap overuse
- due color is not wrong/error color
- selected is not correct
- no-due is positive/neutral, not error

### 7. Content

Use English demo strings and KO→EN study direction.

Rules:

- plausible counts only
- do not present fake data as real data
- error copy says data is safe
- no-due copy is calm and positive
- long Korean/Vietnamese/English content must wrap or scroll

### 8. Accessibility

- 44px minimum touch target
- color is never the only signal
- pair state colors with glyph/label
- icon-only actions need accessible label
- long content must not clip

### 9. No product feature code

These are design mockups in the kit only. Do not touch app implementation.

## Definition of Done — per screen

A row can be marked `done` only when all are true:

- [ ] File follows the golden skeleton.
- [ ] Page loads through static server with no console error.
- [ ] Dark and light frames render correctly after fresh preview restart.
- [ ] All required states are present.
- [ ] Baseline states are present or explicitly marked N/A with reason.
- [ ] Token-lint clean: no raw hex / non-structural px in `style=` or `<style>`.
- [ ] Reusable UI uses `Mx*` components.
- [ ] No hand-rolled reusable button/card/row/modal.
- [ ] Screen matches the matching product spec.
- [ ] No invented business behavior.
- [ ] Drift is recorded instead of guessed.
- [ ] `@dsCard` annotation is set with group `Sample Screens`.
- [ ] Row below updated to `done` with evidence.
- [ ] If merged, evidence includes PR number and squash commit.

Sources:

- [`../../guidelines/ui-definition-of-done.md`](../guidelines/ui-definition-of-done.md)
- [`visual-review-checklist.md`](../guidelines/visual-review-checklist.md)
- [`screen-recipes.md`](../guidelines/screen-recipes.md)

## Screen backlog

Status:

- `todo`
- `in-progress`
- `done`
- `blocked`

Files live in:

`ui_kits/memox-app/`

## Backlog rule

Each screen is split into smaller state-level rows.

Parent rows like `MX-01`, `MX-02`, etc. are grouping rows only.

A parent screen is complete only when all child rows under that parent are `done`.

Do not mark a parent row `done` manually unless every child row is already `done`.

Example:

- `MX-01` = Home / Dashboard group
- `MX-01.1` = Loaded dashboard
- `MX-01.2` = Loading skeleton
- `MX-01.3` = Empty first-run
- `MX-01.4` = Load error
- `MX-01.5` = Deck tile states

One PR may complete one child row or multiple child rows under the same parent screen.

Do not mix unrelated parent screens in one PR.

Every completed child row must have its own evidence note.

## State-coverage rule

Every child row must render both:

- dark frame
- light frame

unless the row explicitly says otherwise.

Never fake data for empty/no-data states.

Never let no-due read as error.

Destructive and high-risk states must look visually distinct.

Use the semantic state vocabulary from the State Gallery:

- [`../../guidelines/state-gallery-dark.card.html`](../guidelines/state-gallery-dark.card.html)
- [`state-gallery-light.card.html`](../guidelines/state-gallery-light.card.html)

| ID      | Parent | Work item                         | File                                   | Recipe        | Required output                                                                 | Status | Evidence                                                |
| ------- | ------ | --------------------------------- | -------------------------------------- | ------------- | ------------------------------------------------------------------------------- | ------ | ------------------------------------------------------- |
| MX-01   | —      | Home / Dashboard group            | `index.html`                           | List          | Complete only when MX-01.1 to MX-01.5 are done                                  | done   | All children MX-01.1–.5 done: loaded, loading, empty, error + tile states, dark+light |
| MX-01.1 | MX-01  | Loaded dashboard                  | `index.html`                           | List          | loaded dashboard in dark + light; deck tiles; KO→EN direction; plausible counts | done   | Partial shipped in PR #27: loaded dark/light foundation |
| MX-01.2 | MX-01  | Loading skeleton                  | `index.html`                           | List          | loading/skeleton dashboard in dark + light                                      | done   | 4 phones render (loaded+loading, dark+light); skeleton = `--mx-color-state-loadingSurface`; 0 console errors; token-lint clean |
| MX-01.3 | MX-01  | Empty first-run                   | `index.html`                           | List          | no decks / first-run empty state in dark + light; clear create/import action    | done   | `MxEmptyState` (neutral): "No decks yet" + Create-deck CTA, dark+light; verified in 8-frame render |
| MX-01.4 | MX-01  | Load error                        | `index.html`                           | List          | load failed state in dark + light; copy says data is safe; retry action         | done   | `MxErrorState`: "data is safe" copy + Retry, dark+light; verified |
| MX-01.5 | MX-01  | Deck tile states                  | `index.html`                           | List          | tile variants: due-badge / no-due / pre-SRS in dark + light                     | done   | due-badge / no-due (Done) / pre-SRS tiles shown across the loaded dashboard frames (dark+light) |
| MX-02   | —      | Deck Management group             | `deck-management.card.html`            | List          | Complete only when MX-02.1 to MX-02.8 are done                                  | done   | All children MX-02.1–.8 done: 16 frames (8 states × dark+light), 0 render errors, token-lint clean; added semantic token `--mx-color-state-pressedSurface` to kit source |
| MX-02.1 | MX-02  | Loaded deck list                  | `deck-management.card.html`            | List          | loaded deck/subdeck list in dark + light                                        | done   | Subdeck rows (MxCard interactive + Ring + MxBadge + MxIconButton play), search/sort/direction control area, bottom actions; dark+light verified |
| MX-02.2 | MX-02  | Loading                           | `deck-management.card.html`            | List          | loading state in dark + light                                                   | done   | Skeleton control area + 4 row skeletons using `--mx-color-state-loadingSurface`, aria-busy; dark+light verified |
| MX-02.3 | MX-02  | Empty no decks                    | `deck-management.card.html`            | List          | empty no decks in dark + light                                                  | done   | `MxEmptyState` (neutral): "No subdecks yet" + Add-first-card CTA; dark+light verified |
| MX-02.4 | MX-02  | Search active                     | `deck-management.card.html`            | List          | active search/filter UI in dark + light                                         | done   | Search field with query "verbs" + clear button, "2 results" caption, filtered rows; dark+light verified |
| MX-02.5 | MX-02  | Search empty                      | `deck-management.card.html`            | List          | search-empty state in dark + light                                              | done   | `MxEmptyState` (neutral, not error): "No decks match 'kanji'" + Clear-search; dark+light verified |
| MX-02.6 | MX-02  | Error                             | `deck-management.card.html`            | List          | load failed in dark + light; retry; data-safe copy                              | done   | `MxErrorState`: "data … safe on this device" copy + Retry; dark+light verified |
| MX-02.7 | MX-02  | Row states                        | `deck-management.card.html`            | List          | row default / pressed / due-badge / no-due / disabled in dark + light           | done   | Gallery: default / pressed (`--mx-color-state-pressedSurface`, ≠ selected) / due (amber+clock) / no-due (green+check) / disabled (empty, play off); dark+light verified |
| MX-02.8 | MX-02  | Delete confirm                    | `deck-management.card.html`            | List          | delete high-risk confirm in dark + light                                        | done   | `MxConfirmDialog` variant="highRisk": red shield + destructive Delete, amber "other data stays safe" warning, scrim scoped to phone; dark+light verified |
| MX-03   | —      | Deck Detail group                 | `deck-detail.card.html`                | Detail        | Complete only when MX-03.1 to MX-03.6 are done                                  | done   | All children MX-03.1–.6 done: 12 frames (6 states × dark+light), 0 render errors, token-lint clean; existing single-light card rebuilt to full dark+light state coverage |
| MX-03.1 | MX-03  | Audit existing loaded             | `deck-detail.card.html`                | Detail        | existing loaded state audited to DoD; dark + light parity                       | done   | Existing loaded (cover / meta stats / study modes / sticky actions) kept + rebuilt for dark+light parity, tokens only; verified |
| MX-03.2 | MX-03  | Loading                           | `deck-detail.card.html`                | Detail        | loading state in dark + light                                                   | done   | Skeleton cover + title + meta + modes on `--mx-color-state-loadingSurface`; dark+light verified |
| MX-03.3 | MX-03  | Empty deck                        | `deck-detail.card.html`                | Detail        | empty deck / no words in dark + light                                           | done   | Cover + 0/0/0 meta + `MxEmptyState` "No words in this deck yet" + Add-first-card CTA; dark+light verified |
| MX-03.4 | MX-03  | Error                             | `deck-detail.card.html`                | Detail        | load failed in dark + light                                                     | done   | `MxErrorState`: "safe on this device" copy + Retry; dark+light verified |
| MX-03.5 | MX-03  | Study modes availability          | `deck-detail.card.html`                | Detail        | modes available + unavailable/soon variants in dark + light                     | done   | Available set (Learn/Repeat-due/Review/game-Soon) + constrained set (Learn disabled 0-new, Repeat no-due "Up to date", Review, game/player Soon, CTA disabled "All caught up"); dark+light verified |
| MX-03.6 | MX-03  | Delete deck confirm               | `deck-detail.card.html`                | Detail        | destructive delete-deck confirm in dark + light                                 | done   | `MxConfirmDialog` variant="highRisk": whole-deck delete (120 words + subdecks), red shield + destructive Delete, "other decks stay safe" warning; dark+light verified |
| MX-04   | —      | Review Words group                | `review-words.card.html`               | List          | Complete only when MX-04.1 to MX-04.8 are done                                  | done   | All children MX-04.1–.8 done: 18 frames (9 states × dark+light), 0 render errors, token-lint clean; read-only browse per Flashcard List spec |
| MX-04.1 | MX-04  | Loaded browse                     | `review-words.card.html`               | List          | loaded read-only browse in dark + light                                         | done   | Flashcard rows (term/reading/meaning/note per KO→EN) as non-interactive `MxCard`, search/direction/count control area, Read-only top-bar badge; dark+light verified |
| MX-04.2 | MX-04  | Loading                           | `review-words.card.html`               | List          | loading in dark + light                                                         | done   | Skeleton control area + 4 card skeletons on `--mx-color-state-loadingSurface`; dark+light verified |
| MX-04.3 | MX-04  | Empty no words                    | `review-words.card.html`               | List          | empty no words in dark + light                                                  | done   | `MxEmptyState` (neutral): "No words to review" + Add-cards entry; dark+light verified |
| MX-04.4 | MX-04  | Search active                     | `review-words.card.html`               | List          | search active in dark + light                                                   | done   | Query "to" → 3 results caption + filtered flashcards; dark+light verified |
| MX-04.5 | MX-04  | Search empty                      | `review-words.card.html`               | List          | search-empty in dark + light                                                    | done   | `MxEmptyState` (not error): "No words match 'pizza'" + Clear search; dark+light verified |
| MX-04.6 | MX-04  | Read-only affordance              | `review-words.card.html`               | List          | no edit affordance / read-only visual treatment                                 | done   | No edit controls (audio-only); `MxCallout` info "Review mode — read-only" + persistent Read-only badge; dark+light verified |
| MX-04.7 | MX-04  | Long content wrapping             | `review-words.card.html`               | List          | long KO/EN content wraps or scrolls, no clipping                                | done   | Long KO prompt + romaji + EN meaning + note all wrap (`overflowWrap:anywhere`), no clipping; verified in screenshot; dark+light |
| MX-04.8 | MX-04  | Error/audio unavailable           | `review-words.card.html`               | List          | error + audio unavailable variants in dark + light                              | done   | Two variants: `MxErrorState` "cards are safe" + Retry; audio-unavailable `MxCallout` (unavailable tone) + volume-x + "Audio soon" badges; dark+light verified |
| MX-05   | —      | Play Menu group                   | `play-menu.card.html`                  | ModalSheet    | Complete only when MX-05.1 to MX-05.6 are done                                  | done   | All children MX-05.1–.6 done: 12 frames (6 variants × dark+light), 0 render errors, token-lint clean; `MxModalSheet` over dimmed deck context, options per deck-management Play Menu spec |
| MX-05.1 | MX-05  | Normal all modes                  | `play-menu.card.html`                  | ModalSheet    | all modes available in dark + light                                             | done   | Learn (12 new) · Repeat (83 due → "choose a mode") · Review (browse 120) · game/player Soon; dark+light verified |
| MX-05.2 | MX-05  | New-only                          | `play-menu.card.html`                  | ModalSheet    | new cards only; repeat unavailable/no due                                       | done   | Variant A (progress 0%): Learn (120 new), **no Repeat row**, info callout "Nothing to repeat yet"; dark+light verified |
| MX-05.3 | MX-05  | Due-only                          | `play-menu.card.html`                  | ModalSheet    | due cards only; learn unavailable if no new cards                               | done   | Learn disabled ("No new words", 0 new) + Repeat (83 due); dark+light verified |
| MX-05.4 | MX-05  | Partial modes                     | `play-menu.card.html`                  | ModalSheet    | some modes unavailable with explanation                                         | done   | Learn (12 new) + Repeat no-due ("Up to date") + noDue callout explanation; dark+light verified |
| MX-05.5 | MX-05  | No due / all mastered             | `play-menu.card.html`                  | ModalSheet    | Repeat disabled; Nothing due; all-mastered positive state                       | done   | Learn disabled + Repeat no-due + positive "All caught up" noDue callout (not error); dark+light verified |
| MX-05.6 | MX-05  | Future actions                    | `play-menu.card.html`                  | ModalSheet    | game/player unavailable/soon state                                              | done   | game + player disabled with Soon badges + "Coming soon" unavailable callout; dark+light verified |
| MX-06   | —      | New Learning — Review group       | `new-learning-review.card.html`        | Study         | Complete only when MX-06.1 to MX-06.6 are done                                  | done   | All children MX-06.1–.6 done: 18 frames (dark+light), 0 render errors, token-lint clean; reviewMode (flip+advance, no grading) via MxStudyCard/MxStudyProgressBar |
| MX-06.1 | MX-06  | Prompt/front                      | `new-learning-review.card.html`        | Study         | prompt/front state in dark + light                                              | done   | `MxStudyCard` variant="prompt" (KO front hidden meaning) + "Show meaning" CTA + study progress bar; dark+light verified |
| MX-06.2 | MX-06  | Revealed meaning                  | `new-learning-review.card.html`        | Study         | revealed answer/meaning state in dark + light                                   | done   | `MxStudyCard` variant="both" (prompt+meaning+note) + "Next word" CTA; dark+light verified |
| MX-06.3 | MX-06  | Audio playing                     | `new-learning-review.card.html`        | Study         | audio playing state with label/glyph                                            | done   | Active audio top-bar button + info `MxBadge` "Playing audio…" (glyph+label, color not sole signal); dark+light verified |
| MX-06.4 | MX-06  | Progress variants                 | `new-learning-review.card.html`        | Study         | progress start / mid / last card                                                | done   | Three progress states start 1/12 (8%) · mid 6/12 (50%) · last 12/12 (100%, "last word" CTA); each dark+light verified |
| MX-06.5 | MX-06  | Protected exit                    | `new-learning-review.card.html`        | Study         | exit confirm in dark + light                                                    | done   | `MxConfirmDialog` variant="normal" (persisted/resumable per DT-2): "progress is saved automatically" — reassuring, not destructive; dark+light verified |
| MX-06.6 | MX-06  | Loading/error                     | `new-learning-review.card.html`        | Study         | loading + error state in dark + light                                           | done   | Loading skeleton "Preparing your review…" + `MxErrorState` "words and progress are safe" + Retry; dark+light verified |
| MX-07   | —      | New Learning — Match group        | `new-learning-match.card.html`         | Study         | Complete only when MX-07.1 to MX-07.6 are done                                  | done   | All children MX-07.1–.6 done: 14 frames (dark+light), 0 render errors, token-lint clean; matchMode board via MxMatchTile (prompt↔meaning) |
| MX-07.1 | MX-07  | Default tiles                     | `new-learning-match.card.html`         | Study         | unmatched tile grid in dark + light                                             | done   | 2-col board: 4 KO prompt tiles + 4 EN meaning tiles all state="default"; dark+light verified |
| MX-07.2 | MX-07  | Selected                          | `new-learning-match.card.html`         | Study         | selected tile state, not correct                                                | done   | One prompt tile state="selected" (purple, **not** green correct) + "pick its meaning" hint; dark+light verified |
| MX-07.3 | MX-07  | Correct pair                      | `new-learning-match.card.html`         | Study         | correct pair with color + glyph/label                                           | done   | Matched pair state="correct" (green + check glyph, not colour-alone) + "Matched!" callout + 1/4 progress; dark+light verified |
| MX-07.4 | MX-07  | Wrong pair                        | `new-learning-match.card.html`         | Study         | wrong pair with color + glyph/label                                             | done   | Mismatched pair state="wrong" (red + x glyph), progress stays 0/4, "Not a match — try again"; red ≠ green ≠ amber; dark+light verified |
| MX-07.5 | MX-07  | Completed/disabled                | `new-learning-match.card.html`         | Study         | all matched + disabled tile states                                              | done   | All 8 tiles state="completed" (non-interactive) + 4/4 (100%) + positive "All matched" + Continue CTA; dark+light verified |
| MX-07.6 | MX-07  | Loading/error                     | `new-learning-match.card.html`         | Study         | loading + error state in dark + light                                           | done   | Loading skeleton board "Shuffling tiles…" + `MxErrorState` "words and progress are safe" + Retry; dark+light verified |
| MX-08   | —      | New Learning — Guess group        | `new-learning-guess.card.html`         | Study         | Complete only when MX-08.1 to MX-08.6 are done                                  | done   | All children MX-08.1–.6 done: 14 frames (dark+light), 0 render errors, token-lint clean; guessMode multiple-choice via MxAnswerOption |
| MX-08.1 | MX-08  | Options default                   | `new-learning-guess.card.html`         | Study         | default options in dark + light                                                 | done   | Prompt (MxStudyCard) + 4 MxAnswerOption state="default" + disabled Check CTA; dark+light verified |
| MX-08.2 | MX-08  | Selected                          | `new-learning-guess.card.html`         | Study         | selected option, not correct                                                    | done   | One option state="selected" (purple, **not** green correct) + enabled "Check answer"; dark+light verified |
| MX-08.3 | MX-08  | Correct                           | `new-learning-guess.card.html`         | Study         | correct answer state                                                            | done   | Chosen option state="correct" (green + check glyph), others disabled, "Correct!" callout + Next word; dark+light verified |
| MX-08.4 | MX-08  | Wrong                             | `new-learning-guess.card.html`         | Study         | wrong answer state                                                              | done   | Chosen option state="wrong" (red + x glyph), "Not quite" callout, others disabled; red ≠ green ≠ amber; dark+light verified |
| MX-08.5 | MX-08  | Disabled/reveal-correct           | `new-learning-guess.card.html`         | Study         | disabled post-answer + reveal correct answer                                    | done   | Wrong choice red + correct answer revealed green + remaining options disabled + "Correct answer" callout + Next word; dark+light verified |
| MX-08.6 | MX-08  | Loading/error                     | `new-learning-guess.card.html`         | Study         | loading + error state                                                           | done   | Loading skeleton "Loading question…" + `MxErrorState` "words and progress are safe" + Retry; dark+light verified |
| MX-09   | —      | New Learning — Recall group       | `new-learning-recall.card.html`        | Study         | Complete only when MX-09.1 to MX-09.6 are done                                  | done   | All children MX-09.1–.6 done: 16 frames (dark+light), 0 render errors, token-lint clean; recallMode via MxRecallPanel (hidden→reveal→self-grade) |
| MX-09.1 | MX-09  | Hidden recall prompt              | `new-learning-recall.card.html`        | Study         | hidden-answer prompt in dark + light                                            | done   | `MxStudyCard` prompt (KO) + `MxRecallPanel` phase="hidden" seconds=20 (answer hidden, Reveal button); dark+light verified |
| MX-09.2 | MX-09  | Countdown                         | `new-learning-recall.card.html`        | Study         | 20s countdown visual state                                                      | done   | `MxRecallPanel` seconds=5 (near-timeout) + warning callout "reveal before the timer runs out"; dark+light verified |
| MX-09.3 | MX-09  | Revealed                          | `new-learning-recall.card.html`        | Study         | revealed answer state                                                           | done   | `MxRecallPanel` phase="revealed" (meaning shown) + Forgot/Remembered self-grade buttons; dark+light verified |
| MX-09.4 | MX-09  | Timeout/forgotten                 | `new-learning-recall.card.html`        | Study         | timeout counts as forgotten                                                     | done   | seconds=0 auto-reveal + warning "Time's up → marked forgotten, you'll see it again" (normal outcome, not harsh error) + Next word; dark+light verified |
| MX-09.5 | MX-09  | Forgot/remembered actions         | `new-learning-recall.card.html`        | Study         | forgot + remembered action states                                               | done   | Two graded outcomes — Remembered (noDue/green callout) and Forgot (info callout, reassuring "that's fine"); Remembered=green, Forgot=warm, distinct; dark+light verified |
| MX-09.6 | MX-09  | Loading/error                     | `new-learning-recall.card.html`        | Study         | loading + error state                                                           | done   | Loading skeleton "Preparing recall…" + `MxErrorState` "words and progress are safe" + Retry; dark+light verified |
| MX-10   | —      | New Learning — Fill group         | `study-session.card.html`              | Study         | Complete only when MX-10.1 to MX-10.7 are done                                  | done   | All children MX-10.1–.7 done: 14 frames (dark+light), 0 render errors, token-lint clean; fillMode (SRS activation gate) via MxFillInputPanel; single-light card rebuilt to full dark+light coverage |
| MX-10.1 | MX-10  | Audit existing fill               | `study-session.card.html`              | Study         | existing fill loaded audited to DoD                                             | done   | Existing single-light fill rebuilt: MxStudyCard variant="answer" (meaning→type prompt) + MxFillInputPanel idle, tokens only, dark+light parity; verified |
| MX-10.2 | MX-10  | Empty input                       | `study-session.card.html`              | Study         | empty input in dark + light                                                     | done   | `MxFillInputPanel` state="idle" value="" (empty, ready); dark+light verified |
| MX-10.3 | MX-10  | Typing                            | `study-session.card.html`              | Study         | typed input + keyboard-safe layout                                              | done   | Partial value "결제" + faux Korean keyboard (safe-area inset) keeping input above the keyboard; dark+light verified |
| MX-10.4 | MX-10  | Hint/checking                     | `study-session.card.html`              | Study         | hint + checking state                                                           | done   | Info `MxCallout` hint ("starts with 결, 4 syllables") + loading "Checking…" CTA; dark+light verified |
| MX-10.5 | MX-10  | Correct                           | `study-session.card.html`              | Study         | correct fill state                                                              | done   | `MxFillInputPanel` state="correct" (green) + positive "Learned! joins Box 1" callout (activation gate); dark+light verified |
| MX-10.6 | MX-10  | Wrong                             | `study-session.card.html`              | Study         | wrong + correct shown + retry                                                   | done   | state="wrong" (red) + expected="결제하다" shown + Retry + "Not quite" callout (결재 vs 결제); red+glyph; dark+light verified |
| MX-10.7 | MX-10  | Finalize failed                   | `study-session.card.html`              | Study         | finalize-failed, data safe + retry                                              | done   | Correct answer + destructive `MxCallout` "Couldn't save… answer is correct and safe on this device" + Retry saving; dark+light verified |
| MX-11   | —      | Repeat Mode Menu group            | `repeat-mode-menu.card.html`           | ModalSheet    | Complete only when MX-11.1 to MX-11.4 are done                                  | done   | All children MX-11.1–.4 done: 6 frames (3 states × dark+light), 0 render errors, token-lint clean; `MxModalSheet` mode picker per deck-management Repeat Mode Menu spec |
| MX-11.1 | MX-11  | Modes without reviewMode          | `repeat-mode-menu.card.html`           | ModalSheet    | match/guess/recall/fill only                                                    | done   | Four modes Match/Guess/Recall/Fill (Box 1+ due) with due badges; **no reviewMode** (review is New-Learning-only); dark+light verified |
| MX-11.2 | MX-11  | No due                            | `repeat-mode-menu.card.html`           | ModalSheet    | Nothing due state, positive/neutral                                             | done   | reviewDueCount=0 → positive noDue callout "All caught up" + modes disabled with "0 due" (no empty session); green, not error; dark+light verified |
| MX-11.3 | MX-11  | Unavailable/soon                  | `repeat-mode-menu.card.html`           | ModalSheet    | disabled mode with explanation                                                  | done   | Match disabled with availability explanation "needs 4+ due words · 3 due" + unavailable callout; other modes available; dark+light verified |
| MX-11.4 | MX-11  | Dark/light modal parity           | `repeat-mode-menu.card.html`           | ModalSheet    | same component tree in both themes                                              | done   | Every state renders the identical `MxModalSheet` component tree in dark + light; theme resolves only via `data-theme` attribute; verified across all 6 frames |
| MX-12   | —      | SRS Repeat — Session group        | `srs-repeat.card.html`                 | Study         | Complete only when MX-12.1 to MX-12.6 are done                                  | done   | All children MX-12.1–.6 done: 14 frames (dark+light), 0 render errors, token-lint clean; SRS Repeat with box-lifecycle framing (Box 1+ due) |
| MX-12.1 | MX-12  | Due card                          | `srs-repeat.card.html`                 | Study         | due SRS card, not pre-SRS                                                       | done   | Box 3 (active) + "Due today" (amber) badges + `MxStudyCard` prompt + Reveal; SRS card, not pre-SRS; dark+light verified |
| MX-12.2 | MX-12  | Correct box up                    | `srs-repeat.card.html`                 | Study         | correct state + box-up framing                                                  | done   | Box 3 →(green ↑)→ Box 4 (mastered) transition + green "moved up to Box 4" callout + next-review timing; dark+light verified |
| MX-12.3 | MX-12  | Wrong/lapse                       | `srs-repeat.card.html`                 | Study         | wrong box down/lapse, never below Box 1                                         | done   | Box 3 →(coral ↓)→ Box 1 (lapse) transition + "Lapsed — back to Box 1, never lower" warning; box-down ≠ box-up; dark+light verified |
| MX-12.4 | MX-12  | No due empty session              | `srs-repeat.card.html`                 | Study         | no empty session; show no-due state                                             | done   | Positive `MxEmptyState` "Nothing due to repeat — no empty session started"; green, not error; dark+light verified |
| MX-12.5 | MX-12  | Completed                         | `srs-repeat.card.html`                 | Study         | completed repeat flow                                                           | done   | Trophy + "Repeat complete" + count badges (24 reviewed / 19 up / 5 lapsed) + See summary; dark+light verified |
| MX-12.6 | MX-12  | Loading/finalize failed           | `srs-repeat.card.html`                 | Study         | loading + finalize failed, data safe + retry                                    | done   | Loading skeleton "Loading due words…" + `MxErrorState` "box changes are safe on this device" + Retry saving; dark+light verified |
| MX-13   | —      | Session Result group              | `session-result.card.html`             | Result        | Complete only when MX-13.1 to MX-13.5 are done                                  | done   | All children MX-13.1–.5 done: 10 frames (dark+light), 0 render errors, token-lint clean; MxSessionResultSummary keeps New Learning ≠ SRS Repeat |
| MX-13.1 | MX-13  | Finalizing                        | `session-result.card.html`             | Result        | finalizing/loading state                                                        | done   | Skeleton hero + stat tiles + "Saving your session…" (not shown as complete until finalized); dark+light verified |
| MX-13.2 | MX-13  | New Learning success              | `session-result.card.html`             | Result        | new learning result summary                                                     | done   | `MxSessionResultSummary` type="newLearning": learned 12 (active) / Activated to Box 1 12 (correct) / match+fill misses (wrong) + Time/Accuracy metrics + Study more; dark+light verified |
| MX-13.3 | MX-13  | SRS Repeat success                | `session-result.card.html`             | Result        | SRS repeat result summary                                                       | done   | `MxSessionResultSummary` type="srsRepeat": reviewed 24 / remembered 19 / forgot 5 / moved up 19 (no activation, box up/down); Repeat more; distinct from New Learning; dark+light verified |
| MX-13.4 | MX-13  | Finalize failed                   | `session-result.card.html`             | Result        | retry + data safe copy                                                          | done   | `MxErrorState` "answers … safe on this device" + Retry saving (not shown as completed on failure); dark+light verified |
| MX-13.5 | MX-13  | Empty invalid                     | `session-result.card.html`             | Result        | empty nothing studied state                                                     | done   | `MxEmptyState` "Nothing to summarize — no completed items" + Back to deck (no fake success result); dark+light verified |
| MX-14   | —      | Statistics group                  | `statistics.card.html`                 | Statistics    | Complete only when MX-14.1 to MX-14.7 are done                                  | done   | All children MX-14.1–.7 done: 16 frames (dark+light), 0 render errors, token-lint clean; single-light card rebuilt to full coverage; no fake data in no-data states |
| MX-14.1 | MX-14  | Audit existing loaded             | `statistics.card.html`                 | Statistics    | existing loaded state audited to DoD                                            | done   | Existing Quality-tab loaded (hero, tabs, Correct/Wrong metrics + deltas, `MxStatsChartPanel` line chart) rebuilt to dark+light parity; verified |
| MX-14.2 | MX-14  | Loading                           | `statistics.card.html`                 | Statistics    | loading state in dark + light                                                   | done   | Skeleton hero + tabs + metric tiles + chart on `--mx-color-state-loadingSurface`; dark+light verified |
| MX-14.3 | MX-14  | Empty no history                  | `statistics.card.html`                 | Statistics    | empty no history state                                                          | done   | `MxEmptyState` "No study history yet" (no charts fabricated); dark+light verified |
| MX-14.4 | MX-14  | No data per metric                | `statistics.card.html`                 | Statistics    | no-data state for selected metric                                               | done   | Time tab: metrics "—" + `MxStatsChartPanel empty` + info callout "No time was recorded"; dark+light verified |
| MX-14.5 | MX-14  | Chart read-model needed           | `statistics.card.html`                 | Statistics    | read-model-needed, not fake chart data                                          | done   | Metrics "—" + `MxStatsChartPanel empty` ("No statistics data yet") + unavailable callout "Chart data not ready … no numbers shown so nothing is guessed" — **no fabricated data**; dark+light verified |
| MX-14.6 | MX-14  | Tab switch                        | `statistics.card.html`                 | Statistics    | Words / Time / Quality tab switch states                                        | done   | Words tab (word-tone chart + Learned/New) and Time tab (time-tone chart + Study time/Avg) rendered alongside Quality (14.1); dark+light verified |
| MX-14.7 | MX-14  | Error                             | `statistics.card.html`                 | Statistics    | load failed state                                                               | done   | `MxErrorState` "study history is safe on this device" + Retry; dark+light verified |
| MX-15   | —      | Settings / More Hub group         | `settings.card.html`                   | Settings      | Complete only when MX-15.1 to MX-15.6 are done                                  | done   | All children MX-15.1–.6 done: 14 frames (dark+light), 0 render errors, token-lint clean; single-light card rebuilt to full state coverage |
| MX-15.1 | MX-15  | Audit existing loaded             | `settings.card.html`                   | Settings      | existing loaded state audited to DoD                                            | done   | Existing hub rebuilt: activity summary (Streak/Due/Learned metrics) + Learning / Reminders / Data `MxSettingsSection`s; dark+light parity; verified |
| MX-15.2 | MX-15  | Activity empty                    | `settings.card.html`                   | Settings      | no activity summary state                                                       | done   | Info callout "No activity yet — finish a session to start your streak" replacing the summary; dark+light verified |
| MX-15.3 | MX-15  | Switch on/off                     | `settings.card.html`                   | Settings      | switch variants                                                                 | done   | `MxSwitch` on (purple) / off / disabled variants across rows (on ≠ off); dark+light verified |
| MX-15.4 | MX-15  | High-risk section                 | `settings.card.html`                   | Settings      | high-risk row grouping                                                          | done   | "High-risk zone" warning callout + Data section grouping destructive rows (Restore / Delete all, tone="destructive") apart; dark+light verified |
| MX-15.5 | MX-15  | Unavailable/soon row              | `settings.card.html`                   | Settings      | future/unavailable row                                                          | done   | "Coming soon" section with `MxSettingsRow unavailable` (Cloud sync / Export / Widget — Soon, tap blocked); dark+light verified |
| MX-15.6 | MX-15  | Destructive confirm/error         | `settings.card.html`                   | Settings      | destructive confirm + error                                                     | done   | `MxConfirmDialog` highRisk "Delete all data?" (red shield + destructive, honest "can't be undone, no cloud backup") + `MxErrorState` "settings and data are safe on this device" + Retry; dark+light verified |
| MX-16   | —      | Appearance / Theme Settings group | `appearance-theme-settings.card.html`  | Settings      | Complete only when MX-16.1 to MX-16.5 are done                                  | todo   | Parent only                                             |
| MX-16.1 | MX-16  | Presets default                   | `appearance-theme-settings.card.html`  | Settings      | system/dark/light presets default                                               | todo   | —                                                       |
| MX-16.2 | MX-16  | Selected theme                    | `appearance-theme-settings.card.html`  | Settings      | selected system/dark/light states                                               | todo   | —                                                       |
| MX-16.3 | MX-16  | App icon states                   | `appearance-theme-settings.card.html`  | Settings      | selected + unavailable app icon states                                          | todo   | —                                                       |
| MX-16.4 | MX-16  | Live preview                      | `appearance-theme-settings.card.html`  | Settings      | live theme preview dark + light                                                 | todo   | —                                                       |
| MX-16.5 | MX-16  | Save failed                       | `appearance-theme-settings.card.html`  | Settings      | save failed state                                                               | todo   | —                                                       |
| MX-17   | —      | App Settings group                | `app-settings.card.html`               | Settings      | Complete only when MX-17.1 to MX-17.6 are done                                  | todo   | Parent only                                             |
| MX-17.1 | MX-17  | Loaded                            | `app-settings.card.html`               | Settings      | loaded App Settings in dark + light                                             | todo   | —                                                       |
| MX-17.2 | MX-17  | Backup states                     | `app-settings.card.html`               | Settings      | backup idle/in-progress/success/failed                                          | todo   | —                                                       |
| MX-17.3 | MX-17  | Restore confirm                   | `app-settings.card.html`               | Settings      | high-risk overwrite warning confirm                                             | todo   | —                                                       |
| MX-17.4 | MX-17  | Restore failed                    | `app-settings.card.html`               | Settings      | restore failed + data-safe/retry copy                                           | todo   | —                                                       |
| MX-17.5 | MX-17  | Cloud sync                        | `app-settings.card.html`               | Settings      | cloud-sync soon/blocked state                                                   | todo   | —                                                       |
| MX-17.6 | MX-17  | Save failed                       | `app-settings.card.html`               | Settings      | save failed state                                                               | todo   | —                                                       |
| MX-18   | —      | Native Language Picker group      | `native-language-picker.card.html`     | List/Form     | Complete only when MX-18.1 to MX-18.6 are done                                  | todo   | Parent only                                             |
| MX-18.1 | MX-18  | Loaded list                       | `native-language-picker.card.html`     | List/Form     | language list in dark + light                                                   | todo   | —                                                       |
| MX-18.2 | MX-18  | Loading                           | `native-language-picker.card.html`     | List/Form     | loading state                                                                   | todo   | —                                                       |
| MX-18.3 | MX-18  | Selected current                  | `native-language-picker.card.html`     | List/Form     | selected current language                                                       | todo   | —                                                       |
| MX-18.4 | MX-18  | Search active                     | `native-language-picker.card.html`     | List/Form     | search active                                                                   | todo   | —                                                       |
| MX-18.5 | MX-18  | Search empty / long scroll        | `native-language-picker.card.html`     | List/Form     | search-empty + long-list scroll                                                 | todo   | —                                                       |
| MX-18.6 | MX-18  | Save failed/error                 | `native-language-picker.card.html`     | List/Form     | save failed + load error                                                        | todo   | —                                                       |
| MX-19   | —      | Reminder Settings group           | `reminder-settings.card.html`          | Form          | Complete only when MX-19.1 to MX-19.7 are done                                  | todo   | Parent only                                             |
| MX-19.1 | MX-19  | Enabled/disabled                  | `reminder-settings.card.html`          | Form          | reminder enabled/disabled states                                                | todo   | —                                                       |
| MX-19.2 | MX-19  | Weekday chips                     | `reminder-settings.card.html`          | Form          | selected/unselected chips                                                       | todo   | —                                                       |
| MX-19.3 | MX-19  | Time picker                       | `reminder-settings.card.html`          | Form          | time picker state                                                               | todo   | —                                                       |
| MX-19.4 | MX-19  | Add reminder                      | `reminder-settings.card.html`          | Form          | add reminder state                                                              | todo   | —                                                       |
| MX-19.5 | MX-19  | Keyboard-safe input               | `reminder-settings.card.html`          | Form          | keyboard-safe form layout                                                       | todo   | —                                                       |
| MX-19.6 | MX-19  | Permission needed/blocked         | `reminder-settings.card.html`          | Form          | permission-needed + blocked state                                               | todo   | —                                                       |
| MX-19.7 | MX-19  | Save failed/delete confirm        | `reminder-settings.card.html`          | Form          | save failed + delete confirm                                                    | todo   | —                                                       |
| MX-20   | —      | Spaced Repetition Settings group  | `spaced-repetition-settings.card.html` | Settings/Form | Complete only when MX-20.1 to MX-20.6 are done                                  | todo   | Parent only                                             |
| MX-20.1 | MX-20  | Loaded                            | `spaced-repetition-settings.card.html` | Settings/Form | loaded settings in dark + light                                                 | todo   | —                                                       |
| MX-20.2 | MX-20  | Box-count open question           | `spaced-repetition-settings.card.html` | Settings/Form | "Ô: 7" shown as OPEN question, not final 7-box rule                             | todo   | —                                                       |
| MX-20.3 | MX-20  | Interval rows                     | `spaced-repetition-settings.card.html` | Settings/Form | interval row states                                                             | todo   | —                                                       |
| MX-20.4 | MX-20  | Warning                           | `spaced-repetition-settings.card.html` | Settings/Form | SRS warning/callout state                                                       | todo   | —                                                       |
| MX-20.5 | MX-20  | Reset confirm                     | `spaced-repetition-settings.card.html` | Settings/Form | reset-to-default destructive confirm                                            | todo   | —                                                       |
| MX-20.6 | MX-20  | Unavailable/save failed           | `spaced-repetition-settings.card.html` | Settings/Form | unavailable/future + save failed                                                | todo   | —                                                       |

## Loop protocol

### 1. Start from clean `main`

Run:

    git checkout main
    git pull origin main
    git status
    git rev-parse HEAD
    git ls-remote origin main

Stop if `git status` is not clean or local `main` differs from `origin/main`.

### 2. Pick next child row

Open this WBS and pick the first `todo` child row top-down.

Do not pick parent screen-group rows such as `MX-01`, `MX-02`, etc.

Parent rows are progress containers only.

### 3. Mark child row in progress

Set the selected child row to `in-progress`.

If this is the first active child row under a parent, keep the parent as `todo` or set it to `in-progress` according to the current WBS convention.

### 4. Read matching sources

Read:

- matching spec in `docs/design/screens/`
- matching wireframe in `docs/design/wireframes/`, if present
- matching `guidelines/golden-*`
- `guidelines/screen-recipes.md`
- `composition-grammar.md`
- relevant state gallery

### 5. Handle drift

If spec and kit conflict, record drift and follow product spec.

Do not guess behavior.

### 6. Build the child state

Build the selected child state into the target screen file:

- dark + light frame for that state
- token + Mx only
- no product feature code
- keep existing completed states intact
- do not regress sibling states already marked done

### 7. Add missing Mx variant only if required

If a needed Mx variant is missing:

- add it to kit source only
- document the reason
- do not manually edit generated DesignSync files
- if regeneration is required and no documented command exists, stop and report

### 8. Verify with static server

Run:

    python -m http.server 8099 --directory "docs/design/kit-design/Mx Design Kit — MemoX v5"

Open the screen URL under:

    http://localhost:8099/ui_kits/memox-app/

Confirm:

- target child state is visible
- dark frame renders
- light frame renders
- no console error
- CSS loads
- `_ds_bundle.js` loads
- previously completed sibling states still render

### 9. Run token/style lint

Run token/style lint by grep or project script.

Required checks:

- no raw hex in new screen styles
- no arbitrary non-structural px
- no hand-rolled reusable buttons/cards/rows/modals
- no direct product implementation code changes

### 10. Mark child row done only after DoD passes

Mark the selected child row `done` only after all relevant DoD items pass.

Update evidence for that exact child row.

### 11. Update parent status

After updating a child row:

- if any child row under the same parent is still `todo`, `in-progress`, or `blocked`, keep parent as `todo` or `in-progress`
- if all child rows under the same parent are `done`, mark parent `done`
- parent evidence should summarize the child PRs / commits

### 12. Ship one child row or one cohesive state batch per PR

A PR may include:

- one child row, or
- multiple child rows under the same parent screen

Do not mix unrelated parent screens in one PR.

Branch naming:

    git checkout -b design/screen-<child-id>

Example:

    git checkout -b design/screen-mx-01-2

Commit:

    git add docs/design/kit-design/Mx\ Design\ Kit\ —\ MemoX\ v5/
    git commit -m "design: add <child-id> <state-name> kit state"

Push and merge:

    git push -u origin design/screen-<child-id>
    gh pr create --base main --head design/screen-<child-id>
    gh pr merge --squash --delete-branch
    git checkout main
    git pull origin main
    git status
    git rev-parse HEAD
    git ls-remote origin main

Stop if merge is blocked.

Do not force or bypass hooks.

### 13. Continue loop

If any child `todo` remains, continue to the next child row.

Otherwise stop and post completion summary.
