# MemoX Product Screens — Design Kit WBS & Build Loop

Build the necessary MemoX product screens as **design-kit mockups** (HTML, not RN code) using the
existing Mx kit — tokens, themes, and shared `Mx` components — to modern, best-practice standards. These
are the visual golden screens future RN implementation maps to.

> **Autonomy:** the user has pre-approved acting on any step needed to make a beautiful, best-practice
> kit (adding a token/component variant, fixing kit drift, etc.). Do it, record it here, keep going.

## Build rules (every screen)

1. **File pattern** — copy the golden `ui_kits/memox-app/index.html` skeleton exactly: `@dsCard` +
   `@startingPoint` header; link `../../styles.css`, React/ReactDOM/Babel/Lucide CDN, `../../_ds_bundle.js`,
   `phone.css`; `<body class="mx-desk">`; `type="text/babel"`; `const K = window.MxDesignKitMemoXV5_9f1387;`.
2. **Only tokens + Mx components** — every colour/space/radius/type via `var(--mx-*)`; every surface/row/
   button/etc. via a shared `Mx*` component (MxTopBar, MxCard, MxListRow, MxActionButton, MxIconButton,
   MxSegmentedControl, MxModalSheet, MxConfirmDialog, MxBadge, MxSettingsRow, MxStudyCard,
   MxStudyProgressBar, MxAnswerOption, MxMatchTile, MxRecallPanel, MxFillInputPanel, MxMetricCard,
   MxStatsChartPanel, MxSessionResultSummary, MxBottomNav, MxSectionHeader, MxEmptyState, MxErrorState,
   MxCallout, MxSnackbar). No raw hex/px in styles; no hand-rolled buttons/cards/rows.
3. **Dark + light parity** — render the screen in **two phone frames side by side**: one default (dark),
   one `data-theme="light"`. Same component tree, theme via attribute only.
4. **States** — cover every applicable non-happy state listed for the screen (loading / empty / error /
   no-due / unavailable / finalize-failed / high-risk confirm). Show them as extra frames or an inline
   variant so they're documented, never hidden.
5. **Composition grammar** — follow `guidelines/screen-recipes.md`, `composition-grammar.md`, and the
   matching `guidelines/golden-*.card.html`: one dominant task, ≤1 primary action per region, section gap
   24, item gap 12, screen gutter 16, no card-in-card, no divider+gap overuse, correct semantic colours
   (due=amber≠wrong=red, selected≠correct, no-due=positive).
6. **Content** — English demo strings, KO→EN study direction, real/plausible counts, calm reassuring copy
   (never fabricated data; error copy states data is safe; no-due framed positively).
7. **Accessibility** — 44px touch targets, colour never the only signal (pair with glyph/label), long
   KO/VI content wraps in a scrollable area, icon-only actions carry a label.
8. **No product feature code** — these are design mockups in the kit only. Do not touch `src/`.

## Definition of Done (per screen) — gate before marking `done`

- [ ] File built to the golden skeleton; loads with no console error.
- [ ] Dark **and** light frames render correctly (verified in the preview after a fresh restart to dodge cache).
- [ ] All listed states present.
- [ ] Token-lint clean: no raw hex / non-structural px in `style=`/`<style>`.
- [ ] Only `Mx*` components for reusable UI (no hand-rolled equivalents).
- [ ] Matches its screen spec's behaviour (no invented business rules; flag drift, don't guess).
- [ ] `@dsCard` annotation set (group `Sample Screens`) so DesignSync ingests it on re-sync.
- [ ] Row below updated to `done` with an evidence note (what was verified).

Sources: [`../../guidelines/ui-definition-of-done.md`](../guidelines/ui-definition-of-done.md) ·
[`visual-review-checklist.md`](../guidelines/visual-review-checklist.md) ·
[`screen-recipes.md`](../guidelines/screen-recipes.md).

## Screen backlog

Status: `todo` · `in-progress` · `done` · `blocked`. Files live in `ui_kits/memox-app/`.

| ID | Screen | File | Recipe | States / modes to cover | Status | Evidence |
|----|--------|------|--------|--------------------------|--------|----------|
| MX-01 | Home / Dashboard | `index.html` | List | loaded; (add dark frame) | done | dark+light phones render (bg #141220 / #f6f5fc), 0 console errors, token-lint clean (removed 2× raw `#fff` → `text-onAction`) |
| MX-02 | Deck Management (deck list) | `deck-management.card.html` | List | loaded, empty (no decks), search-empty, error | todo | — |
| MX-03 | Deck Detail | `deck-detail.card.html` | Detail | loaded, empty deck, delete confirm | todo | exists — audit to DoD + dark parity |
| MX-04 | Review Words (browse) | `review-words.card.html` | List | loaded, empty, read-only (no mutate) | todo | — |
| MX-05 | Play Menu (modal) | `play-menu.card.html` | ModalSheet | normal, no-due, unavailable/soon | todo | — |
| MX-06 | New Learning — Review | `new-learning-review.card.html` | Study | prompt, revealed, progress | todo | — |
| MX-07 | New Learning — Match | `new-learning-match.card.html` | Study | default, selected, correct, wrong, completed | todo | — |
| MX-08 | New Learning — Guess | `new-learning-guess.card.html` | Study | options: default/selected/correct/wrong/disabled | todo | — |
| MX-09 | New Learning — Recall | `new-learning-recall.card.html` | Study | hidden, revealed, forgot, remembered | todo | — |
| MX-10 | New Learning — Fill | `study-session.card.html` | Study | input, check, correct, wrong, finalize-failed | todo | exists (fill) — audit to DoD + states |
| MX-11 | Repeat Mode Menu (modal) | `repeat-mode-menu.card.html` | ModalSheet | modes (no review), no-due, unavailable | todo | — |
| MX-12 | SRS Repeat — session | `srs-repeat.card.html` | Study | due card, correct/wrong, SRS framing (not pre-SRS) | todo | — |
| MX-13 | Session Result | `session-result.card.html` | Result | success summary, finalize-failed + retry | todo | — |
| MX-14 | Statistics | `statistics.card.html` | Statistics | loaded, empty, chart read-model-needed | todo | exists — audit + empty/read-model states |
| MX-15 | Settings / More Hub | `settings.card.html` | Settings | loaded, high-risk section, unavailable row | todo | exists — audit to DoD + dark parity |
| MX-16 | Appearance / Theme Settings | `appearance-theme-settings.card.html` | Settings | theme presets, selected, app-icon unavailable | todo | split/upgrade from appearance-reminders |
| MX-17 | App Settings | `app-settings.card.html` | Settings | loaded, backup/restore high-risk, cloud-sync soon | todo | — |
| MX-18 | Native Language Picker | `native-language-picker.card.html` | List/Form | list, selected, search | todo | — |
| MX-19 | Reminder Settings | `reminder-settings.card.html` | Form | enabled/disabled, weekday chips, time, keyboard-safe | todo | split/upgrade from appearance-reminders |
| MX-20 | Spaced Repetition Settings | `spaced-repetition-settings.card.html` | Settings/Form | box-count as OPEN question ("Ô: 7"), not final | todo | — |

## Loop protocol (how each iteration runs)

1. Open this WBS; pick the **first `todo`** row (top-down). Set it `in-progress`.
2. Read the matching spec in `docs/design/screens/` + wireframe in `docs/design/wireframes/` +
   the matching `guidelines/golden-*` / `screen-recipes.md` recipe. Do **not** invent behaviour; if the
   spec and kit conflict, record a drift note and pick the spec.
3. Build the file to the golden skeleton (dark + light frames, all listed states, tokens + Mx only).
4. If the kit lacks a needed token/component variant, add it to the kit first (source + bundle + note),
   then use it — per the pre-approved autonomy rule.
5. Verify: **restart the preview** (fresh renderer to dodge cache), load the file, confirm dark + light
   render with no console error, run the token-lint grep, check the DoD list.
6. Mark the row `done` with a one-line evidence note.
7. **Ship the screen** (user-approved per-screen git flow): from `main`, create a branch
   `feat/screen-<id>` (e.g. `feat/screen-mx-02`), commit the screen + WBS update, push, open a PR with
   `gh pr create`, then merge to `main` with `gh pr merge --squash --delete-branch`. Pull `main` back.
   If a hook or branch protection blocks the merge, stop the loop and report — do not force or bypass hooks.
8. If any `todo` remains, continue to the next (cadence **~60s**); else stop and post a completion summary.

## Progress log

- 2026-07-10 — WBS created; 20 screens enqueued. Loop starting at MX-01.
