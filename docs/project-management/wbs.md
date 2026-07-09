# Work Breakdown Structure (WBS)

Tracks MemoX v5 work.

**Status is honest about the repo:** only repository scaffolding and documentation exist. **No product
feature has been implemented** — every implementation row is `Not started`.

Status legend: `Done` · `In progress` · `Not started` · `Blocked`.

## Done-criteria & evidence policy

A row may be marked `Done` **only** when all hold:

- The deliverable exists in the repo.
- **`npm run check` passes** (see [`../verification.md`](../verification.md)).
- Evidence is filled in for the row's type (below).

Evidence rules (traceability):

- **Every `Done` row needs PR or commit evidence.** Never invent a commit hash.
- **Foundation / docs rows** may be `Done` when the docs are **merged** and `npm run check` +
  `git diff --check` pass. Evidence = the merge/squash commit or PR.
- **Feature / BE / FE rows** require **all three**: Source evidence (spec implemented) + Test evidence
  (test file that exists and passes) + PR/commit evidence.
- **A feature/BE row cannot be `Done` without a related, passing test.** If a test is intentionally
  skipped, record the reason here and keep the row **not** `Done` (`In progress`/`Blocked`).
- On squash-merge, use the **squash commit hash after merge**. If not yet merged, PR evidence is the
  **PR URL** and the row stays not-`Done` unless a repo rule explicitly allows otherwise.

`TBD` = to be filled when the work is done. `—` = not applicable.

---

## 1. Foundation — repository scaffolding

| ID | Deliverable | Status | Notes |
|----|-------------|--------|-------|
| F1.1 | Expo SDK 57 app scaffold (React Native, TypeScript `strict`) | Done | Present in repo |
| F1.2 | Expo Router configured with app dir at `src/app` | Done | No root `app/`; routes are starter-level |
| F1.3 | Foundation deps installed (Expo Router, NativeWind, Zustand, Zod, neverthrow, react-hook-form) | Done | See `package.json` |
| F1.4 | Path alias `@/*` → `src/*` | Done | `tsconfig.json` |
| F1.5 | Biome (format + lint) config | Done | `biome.json` |
| F1.6 | Jest test runner (jest-expo) + smoke test | Done | `src/shared/utils/__tests__/smoke.test.ts` |
| F1.7 | Boundary check script | Done | `scripts/check-boundaries.mjs` |
| F1.8 | Composite verification gate `npm run check` | Done | typecheck → Biome → Jest → boundaries |

## 2. Foundation — documentation

| ID | Deliverable | Status | Evidence |
|----|-------------|--------|----------|
| F2.1 | README rewritten for MemoX v5 (not starter; references `src/app`) | Done | PR #1 squash commit `0b0ed2c` |
| F2.2 | `AGENTS.md` implementation rules | Done | PR #1 `0b0ed2c` |
| F2.3 | Architecture docs (overview, folder structure, boundaries) | Done | PR #1 `0b0ed2c` |
| F2.4 | Product scope doc | Done | PR #1 `0b0ed2c` |
| F2.5 | Verification doc | Done | PR #1 `0b0ed2c` |
| F2.6 | Deep design specs (data model, SRS, study modes, i18n, settings, phasing) | Done | PR #1 `0b0ed2c` |
| F2.7 | Phase 1 decision tables | Done | PR #1 `0b0ed2c` |
| F2.8 | Phase 1 hardening (local-day due, persisted sessions, starter-off-path, local-first, boundaries) | Done | PR #2 `9f1a4f2` |
| F2.9 | Screen/flow concept docs (deck management, flashcard/subdeck list, play/repeat menus, 5-mode New Learning Flow, session result, statistics, settings hub, appearance, app settings) | Done | PRs #3–#20 — see [Traceability log](#traceability-log) |
| F2.10 | Docs hygiene + SRS/study drift resolution + WBS traceability | Done | PR #21 `10bb959` — docs: fix hygiene wbs and study drift |

## Traceability log

Merged documentation work (newest first). Hashes are the actual squash commits on `main`.

- 2026-07-09 — `10bb959` — PR #21 — docs: fix hygiene, WBS, and study drift (Markdown hygiene verified,
  07 rewrite removing pre-SRS/SRS contradiction, Box 0 aligned across 05/02/scope, DRIFT resolved, WBS
  traceability).
- 2026-07-09 — `c78120f` — PR #20 — App Settings, Native Language Picker, Reminder Settings, Spaced
  Repetition Settings docs.
- 2026-07-09 — `be8f426` — PR #19 — Appearance / Theme Settings docs.
- 2026-07-09 — `ebce1e3` — PR #18 — Statistics screen docs.
- 2026-07-09 — `ccebfd9` — PR #17 — Settings / More Hub functions docs.
- 2026-07-09 — `1fe1917` — PR #16 — Repeat Mode Menu docs.
- 2026-07-09 — `874ae04` — PR #15 — Session Result screen docs.
- 2026-07-09 — `3ef768f` — PR #14 — fillMode learning flow docs.
- 2026-07-09 — `cc814f4` — PR #13 — recallMode 20s timer docs.
- 2026-07-09 — `969658f` — PR #12 — matchMode feedback docs.
- 2026-07-09 — `bff09ca` — PR #11 — guessMode feedback docs.
- 2026-07-09 — `1b25ed5` — PR #10 — review → match transition docs.
- 2026-07-09 — `78a32ab` — PR #9 — reviewMode learning flow docs.
- 2026-07-09 — `2362943` — PR #8 — Play Menu learning and repeat flows docs.
- 2026-07-09 — `0b61492` — PR #7 — Deck Play Menu concept docs.
- 2026-07-09 — `53a0f0c` — PR #6 — Deck Sort Menu concept docs.
- 2026-07-09 — `d8e8f00` — PR #5 — Subdeck List concept docs.
- 2026-07-09 — `ce444e4` — PR #4 — Flashcard List concept docs.
- 2026-07-09 — `5792912` — PR #3 — Deck Management concept docs.
- 2026-07-09 — `9f1a4f2` — PR #2 — Phase 1 hardening docs.
- 2026-07-09 — `0b0ed2c` — PR #1 — Phase 1 hardening docs (initial).
- 2026-07-09 — `1a264e9` — (foundation) — MemoX v5 documentation foundation.

---

## 3. Foundation cleanup (before Phase 1 feature work)

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F0.1 | Remove or replace Expo starter demo path | FE / Foundation | Not started | [DT-3](../decision-tables/phase-1-contracts.md#dt-3--expo-starter-template-handling-not-on-production-path), [folder-structure DRIFT-001](../architecture/folder-structure.md#drift-001--app-shell-depends-on-starter-components) | TBD | TBD |

`F0.1` removes/replaces starter demo routes/components on the production path (`src/app/_layout.tsx`
imports of `app-tabs`/`animated-icon`, starter `src/app` demo routes) so no MemoX feature depends on
starter code. Must land **before** `P1-FE-*`.

## 4. Phase 1 — implementable backlog

All `Not started`. Type: `BE`, `FE`, `Test`, `Docs`, `Foundation`.

### 4.1 Backend / domain / data

| ID | Title | Type | Status | Source evidence | Test evidence (required before Done) | Commit / PR evidence |
|----|-------|------|--------|-----------------|--------------------------------------|----------------------|
| P1-BE-01 | SQLite local database v1 (schema + migrations, `PRAGMA foreign_keys`) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md) | `src/shared/db/__tests__` — migrate on `:memory:`, assert tables/indexes | TBD |
| P1-BE-02 | SRS 8-box engine (`schedule`, `isDue` local-day, pure) | BE | Not started | [`06-srs-8box.md`](../design/06-srs-8box.md), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | `src/shared/srs/engine/__tests__` (see P1-TEST-01) | TBD |
| P1-BE-03 | Deck repository (CRUD, nested tree, move + cycle guard, soft-delete) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md), FR-D1..7 | `src/features/deck-tree/data/__tests__` on `:memory:` | TBD |
| P1-BE-04 | Card repository (CRUD, move deck) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md), FR-C1..6 | `src/features/card/data/__tests__` on `:memory:` | TBD |
| P1-BE-05 | Study session persistence schema (`study_sessions` + `study_session_items` + migration) | BE | Not started | [`05-data-model.md` session tables](../design/05-data-model.md#study_sessions--study_session_items-persisted-session), [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) | migration + constraint tests on `:memory:` (unique active-session, cascade) | TBD |
| P1-BE-06 | Study eligibility query (local-day due + new-card allowance, scope toggle) | BE | Not started | [`06-srs-8box.md`](../design/06-srs-8box.md), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | query test on `:memory:` (see P1-TEST-02) | TBD |
| P1-BE-07 | Typing study-session backend (build items → grade → persist in one txn; resume; no dup active) | BE | Not started | [`07-study-modes.md`](../design/07-study-modes.md#persist-phiên-học--persisted-dt-2), [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) | orchestration test — persistence + resume + finalize (see P1-TEST-03) | TBD |
| P1-BE-08 | Settings store/repository (`app_meta` JSON, Zod validation) | BE | Not started | [`09-settings.md`](../design/09-settings.md) | `src/features/settings/__tests__` — validation + defaults merge | TBD |
| P1-BE-09 | i18n init + `vi`/`en` locales + change-language | BE | Not started | [`08-i18n.md`](../design/08-i18n.md) | `src/shared/i18n/__tests__/keys.test.ts` — key parity | TBD |

### 4.2 Frontend / screens (skeletons)

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| P1-FE-01 | Home screen skeleton (deck tree + due count) | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md) | render/smoke test where valuable | TBD |
| P1-FE-02 | Deck list/detail screen skeleton | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md) | render/smoke test where valuable | TBD |
| P1-FE-03 | Study screen skeleton (Typing) | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md), [`07-study-modes.md`](../design/07-study-modes.md) | render/smoke test where valuable | TBD |
| P1-FE-04 | Settings screen skeleton | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md), [`09-settings.md`](../design/09-settings.md) | render/smoke test where valuable | TBD |

### 4.3 Tests (dedicated)

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| P1-TEST-01 | SRS engine unit tests (promote/lapse/boundary, local-day `isDue`, determinism) | Test | Not started | [`06-srs-8box.md` test table](../design/06-srs-8box.md#kiểm-thử-engine-bắt-buộc--nfr-6) | is the test evidence for P1-BE-02 | TBD |
| P1-TEST-02 | Eligibility query tests (local-day: due-later-today true, tomorrow false, overdue true) | Test | Not started | [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | test evidence for P1-BE-06 | TBD |
| P1-TEST-03 | Session persistence tests (atomic start, resume, no-dup-active, finalize failure) | Test | Not started | [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) | test evidence for P1-BE-05 / P1-BE-07 | TBD |

### 4.4 Docs / future

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| FUT-01 | Import / export / backup-restore — **Future, NOT Phase 1** | Docs | Not started | Out of Phase 1 scope ([memox-scope.md](../product/memox-scope.md)); must not break local-first contract | n/a (docs) | — |

---

## Deck Management (F1.DM)

Concept/business spec (incl. the **Subdeck List variant**) + its future implementation rows. Spec:
[`../design/screens/deck-management.md`](../design/screens/deck-management.md)
([Subdeck List variant](../design/screens/deck-management.md#subdeck-list-variant)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.DM.1 | Deck Management and Subdeck List concept spec | Docs | Done | [`../design/screens/deck-management.md`](../design/screens/deck-management.md) | `npm run check` / `git diff --check` | PR `docs/subdeck-list-concept` (squash commit after merge) |
| F1.DM.2 | Deck/Subdeck list read model (child decks/sections, counts, progress/workload indicators) | BE | Not started | [deck-management.md](../design/screens/deck-management.md), [05-data-model.md](../design/05-data-model.md), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.DM.3 | Deck/Subdeck list UI skeleton (header, control area, deck/subdeck rows, bottom actions) | FE | Not started | [deck-management.md](../design/screens/deck-management.md) | TBD | TBD |
| F1.DM.4 | Deck/Subdeck list states (loading / loaded / empty / search-empty / error / no-studyable / creating) | FE | Not started | [deck-management.md states](../design/screens/deck-management.md#các-state-chính) | TBD | TBD |
| F1.DM.5 | Add deck/section/card entry actions (create child deck/section, add card) | FE/BE | Not started | [deck-management.md actions](../design/screens/deck-management.md#các-action-chính) | TBD | TBD |
| F1.DM.6 | Start study from deck/subdeck row (honors study rules + local-day due; disabled when no studyable content) | FE/BE | Not started | [deck-management.md](../design/screens/deck-management.md), [07-study-modes.md](../design/07-study-modes.md) | TBD | TBD |
| F1.DM.SORT.1 | Deck/Subdeck Sort Menu concept spec | Docs | Done | [deck-management.md → Sort Menu](../design/screens/deck-management.md#sort-menu) | `npm run check` / `git diff --check` | PR `docs/deck-sort-menu-concept` (squash commit after merge) |
| F1.DM.SORT.2 | Deck/Subdeck sort behavior implementation (name / created / recently-studied; presentation-only; never-studied ordering; stable tie-break) | FE/BE | Not started | [deck-management.md → Sort Menu](../design/screens/deck-management.md#sort-menu) | TBD | TBD |
| F1.DM.PLAY.1 | Deck/Subdeck Play Menu concept spec (incl. Học/Lặp lại, New Learning + SRS Repeat flows) | Docs | Done | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [07-study-modes.md](../design/07-study-modes.md#new-learning-flow); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [play-menu-decision-table.md](../decision-tables/play-menu-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/play-menu-learning-srs-flow` (squash commit after merge) |
| F1.DM.PLAY.2 | Play Menu workload read model (`newCount` = Box 0/new; `reviewDueCount` = Box 1+ due; `progress`; per scope, local-day due) | BE | Not started | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.DM.PLAY.3 | Play Menu UI behavior (variant A/B by progress; Học/Lặp lại/Xem lại/Một trò chơi/Trình phát; no empty session) | FE | Not started | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu) | TBD | TBD |
| F1.DM.REPEAT.1 | Repeat Mode Menu concept (Lặp lại → chọn Ghép đôi/Đoán/Nhớ lại/Điền; Box 1+ due only; no reviewMode) | Docs | Done | [deck-management.md → Repeat Mode Menu](../design/screens/deck-management.md#repeat-mode-menu); [07-study-modes.md → Repeat Mode Menu](../design/07-study-modes.md#repeat-mode-menu); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [play-menu-decision-table.md](../decision-tables/play-menu-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/repeat-mode-menu-concept` (squash commit after merge) |
| F1.DM.REPEAT.2 | Repeat Mode Menu read model + SRS repeat session start (Box 1+ due; selected mode; no empty session) | BE | Not started | [07-study-modes.md → Repeat Mode Menu](../design/07-study-modes.md#repeat-mode-menu), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.DM.REPEAT.3 | Repeat Mode Menu UI (Ghép đôi/Đoán/Nhớ lại/Điền; no-due state) | FE | Not started | [deck-management.md → Repeat Mode Menu](../design/screens/deck-management.md#repeat-mode-menu) | TBD | TBD |
| F1.STUDY.NEW.1 | New Learning Flow (review → match → guess → recall → fill; activate Box 0 → Box 1) | BE/FE | Not started | [07-study-modes.md → New Learning Flow](../design/07-study-modes.md#new-learning-flow), [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) | TBD | TBD |
| F1.STUDY.SRS.1 | SRS Repeat Flow from Play Menu (Box 1+ due only; no empty session on 0 due) | BE/FE | Not started | [07-study-modes.md → SRS Repeat Flow](../design/07-study-modes.md#srs-repeat-flow), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.STUDY.NEW.REVIEW.1 | reviewMode concept for New Learning Flow | Docs | Done | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/review-mode-concept` (squash commit after merge) |
| F1.STUDY.NEW.REVIEW.2 | reviewMode read model and flow state (Box 0 card; step-1 completion; not SRS-active) | BE | Not started | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên) | TBD | TBD |
| F1.STUDY.NEW.REVIEW.3 | reviewMode UI screen (header / progress / card review area; optional audio & edit) | FE | Not started | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên) | TBD | TBD |
| F1.STUDY.NEW.MATCH.1 | matchMode transition + feedback concept (review→match; correct/incorrect green/red; pre-SRS) | Docs | Done | [07-study-modes.md → matchMode](../design/07-study-modes.md#matchmode-mode-thứ-2); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/match-mode-feedback` (squash commit after merge) |
| F1.STUDY.NEW.MATCH.2 | matchMode pair evaluation (selection → evaluate on 2 items; correct/wrong; retry; batch completion → guessMode; pre-SRS) | BE | Not started | [07-study-modes.md → matchMode](../design/07-study-modes.md#matchmode-mode-thứ-2) | TBD | TBD |
| F1.STUDY.NEW.MATCH.3 | matchMode correct/incorrect UI states (two sides prompt ↔ meaning; shuffle; green correct / red incorrect) | FE | Not started | [07-study-modes.md → matchMode](../design/07-study-modes.md#matchmode-mode-thứ-2) | TBD | TBD |
| F1.STUDY.NEW.GUESS.1 | guessMode feedback concept | Docs | Done | [07-study-modes.md → guessMode](../design/07-study-modes.md#guessmode-mode-thứ-3); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/guess-mode-feedback` (squash commit after merge) |
| F1.STUDY.NEW.GUESS.2 | guessMode answer evaluation (single correct option, distractors, correct/wrong; batch complete → recallMode; pre-SRS) | BE | Not started | [07-study-modes.md → guessMode](../design/07-study-modes.md#guessmode-mode-thứ-3) | TBD | TBD |
| F1.STUDY.NEW.GUESS.3 | guessMode correct/incorrect UI states (prompt + options; feedback) | FE | Not started | [07-study-modes.md → guessMode](../design/07-study-modes.md#guessmode-mode-thứ-3) | TBD | TBD |
| F1.STUDY.NEW.RECALL.1 | recallMode 20s timer concept (Hiển thị + countdown; timeout = Đã quên; self-grade Đã quên/Nhớ được; pre-SRS) | Docs | Done | [07-study-modes.md → recallMode](../design/07-study-modes.md#recallmode-mode-thứ-4); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/recall-mode-timer` (squash commit after merge) |
| F1.STUDY.NEW.RECALL.2 | recallMode timer and self-grade logic (20s countdown, timeout=forgotten, reveal→Đã quên/Nhớ được; batch complete → fillMode; pre-SRS) | BE | Not started | [07-study-modes.md → recallMode](../design/07-study-modes.md#recallmode-mode-thứ-4) | TBD | TBD |
| F1.STUDY.NEW.RECALL.3 | recallMode UI states (hidden answer; Hiển thị countdown; reveal + self-grade) | FE | Not started | [07-study-modes.md → recallMode](../design/07-study-modes.md#recallmode-mode-thứ-4) | TBD | TBD |
| F1.STUDY.NEW.FILL.1 | fillMode concept and SRS activation gate (fill prompt/front; Trợ giúp + Kiểm tra; correct completes; fill = final Box 1 gate) | Docs | Done | [07-study-modes.md → fillMode](../design/07-study-modes.md#fillmode-mode-thứ-5--cổng-activate-srs); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/fill-mode-concept` (squash commit after merge) |
| F1.STUDY.NEW.FILL.2 | fillMode answer evaluation and activation gate (Kiểm tra vs expected; empty=invalid; correct→complete; activate Box 1 when all 5 done; needs normalization rule) | BE | Not started | [07-study-modes.md → fillMode](../design/07-study-modes.md#fillmode-mode-thứ-5--cổng-activate-srs) | TBD | TBD |
| F1.STUDY.NEW.FILL.3 | fillMode UI states (meaning prompt + input; Trợ giúp / Kiểm tra / Thử lại; correct green / incorrect red) | FE | Not started | [07-study-modes.md → fillMode](../design/07-study-modes.md#fillmode-mode-thứ-5--cổng-activate-srs) | TBD | TBD |

> `F1.DM.1`, `F1.DM.SORT.1`, `F1.DM.PLAY.1`, `F1.DM.REPEAT.1`, `F1.STUDY.NEW.REVIEW.1`, `F1.STUDY.NEW.MATCH.1`, `F1.STUDY.NEW.GUESS.1`, `F1.STUDY.NEW.RECALL.1`, and `F1.STUDY.NEW.FILL.1` are docs rows, now **`Done`** (merged; evidence in each row + [Traceability log](#traceability-log)),
> per the [evidence policy](#done-criteria--evidence-policy). The
> **Sort Menu** and **Play Menu** are parts of the Deck Management / Subdeck List spec — not separate
> features. Subdeck List is a **variant** of Deck Management, not a separate screen — no separate
> `F1.SD.*` rows are created. **Game** (Match) and **player/listening** modes are **Future** relative to
> Phase 1 — no implementation rows are added for them here. **Box 0 / 5-mode activation** is documented
> at **concept level**; the supporting **schema/migration is not finalized** here (see the drift notes
> in [06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) and
> [07-study-modes](../design/07-study-modes.md#new-learning-flow)) and needs its own task. No TTS /
> advanced-edit / hidden-suspended rows are added — those are not decided.

---

## Session Result (F1.RESULT)

Concept/business spec + its future implementation rows. Spec:
[`../design/screens/session-result.md`](../design/screens/session-result.md)
([decision table](../decision-tables/session-result-decision-table.md)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.RESULT.1 | Session Result concept for learning and SRS review | Docs | Done | [session-result.md](../design/screens/session-result.md); [07-study-modes.md → Session Result](../design/07-study-modes.md#session-result-cuối-phiên); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) | `npm run check` / `git diff --check` | PR `docs/session-result-concept` (squash commit after merge) |
| F1.RESULT.2 | Session Result read model (finalized session/attempt summary; New Learning vs SRS Repeat metrics) | BE | Not started | [session-result.md](../design/screens/session-result.md), [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) | TBD | TBD |
| F1.RESULT.3 | New Learning Result UI (learned / activated Box 1 / not activated / per-mode failures) | FE | Not started | [session-result.md](../design/screens/session-result.md) | TBD | TBD |
| F1.RESULT.4 | SRS Repeat Result UI (reviewed / remembered / forgotten / promotion·demotion) | FE | Not started | [session-result.md](../design/screens/session-result.md) | TBD | TBD |

> `F1.RESULT.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability log](#traceability-log)),
> per the [evidence policy](#done-criteria--evidence-policy). Session Result reflects **only the
> just-finished session** and does **not** replace Dashboard/Progress; activation happens in the flow,
> not on Result. Progress/Dashboard and Review-mistakes are separate screens, **not** created here. Game
> session result is **Future**.

---

## Flashcard List (F1.FL)

Concept/business spec + its future implementation rows. Spec:
[`../design/screens/flashcard-list.md`](../design/screens/flashcard-list.md).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.FL.1 | Flashcard List concept and business spec | Docs | Done | [`../design/screens/flashcard-list.md`](../design/screens/flashcard-list.md) | `npm run check` / `git diff --check` | PR `docs/flashcard-list-concept` (squash commit after merge) |
| F1.FL.2 | Flashcard List read model (cards in scope, front/back per direction) | BE | Not started | [flashcard-list.md](../design/screens/flashcard-list.md), [05-data-model.md](../design/05-data-model.md) | TBD | TBD |
| F1.FL.3 | Flashcard List UI skeleton (header, control area, card rows, bottom actions) | FE | Not started | [flashcard-list.md](../design/screens/flashcard-list.md) | TBD | TBD |
| F1.FL.4 | Flashcard List states (loading / loaded / empty / search-empty / error / unavailable / creating) | FE | Not started | [flashcard-list.md states](../design/screens/flashcard-list.md#các-state-chính) | TBD | TBD |
| F1.FL.5 | Add card entry action (create card in current scope, even under active search/filter) | FE/BE | Not started | [flashcard-list.md actions](../design/screens/flashcard-list.md#các-action-chính) | TBD | TBD |
| F1.FL.6 | Open card detail/edit entry | FE | Not started | [flashcard-list.md actions](../design/screens/flashcard-list.md#các-action-chính) | TBD | TBD |

> `F1.FL.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability log](#traceability-log)),
> per the [evidence policy](#done-criteria--evidence-policy). No TTS/audio / progress-indicator /
> advanced-edit rows are added — those are not decided (see the spec's
> [Open questions](../design/screens/flashcard-list.md#open-questions--cố-ý-không-chốt)).

---

## Settings / More Hub (F1.SETTINGS)

Drawer-derived system functions, surfaced via a modern Settings / More Hub (drawer not required). Spec:
[`../design/screens/settings-more-hub.md`](../design/screens/settings-more-hub.md)
([decision table](../decision-tables/settings-more-hub-decision-table.md)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.SETTINGS.HUB.1 | Settings / More Hub concept from drawer functions | Docs | Done | [settings-more-hub.md](../design/screens/settings-more-hub.md); [memox-scope.md](../product/memox-scope.md); [navigation.md](../design/navigation.md) | `npm run check` / `git diff --check` | PR `docs/settings-more-hub-concept` (squash commit after merge) |
| F1.SETTINGS.HUB.2 | Settings / More Hub UI shell | FE | Not started | [settings-more-hub.md](../design/screens/settings-more-hub.md) | TBD | TBD |
| F1.ACTIVITY.1 | Today activity summary (duration + cards processed today) | BE/FE | Not started | [settings-more-hub.md → Group A](../design/screens/settings-more-hub.md#group-a--activity-summary-hoạt-động-hôm-nay) | TBD | TBD |
| F1.LANGUAGE.1 | Add language flow (learning-language workspace) | BE/FE | Future | [settings-more-hub.md → Group B](../design/screens/settings-more-hub.md#group-b--language-management-thêm--xóa-ngôn-ngữ); needs data-model task | TBD | TBD |
| F1.LANGUAGE.2 | Delete language policy and flow (destructive; confirm + policy) | BE/FE | Future | [settings-more-hub.md → Group B](../design/screens/settings-more-hub.md#group-b--language-management-thêm--xóa-ngôn-ngữ) | TBD | TBD |
| F1.DATA.IMPORT.1 | Import flow (validate before commit; local-first) | BE/FE | Future | [settings-more-hub.md → Group C](../design/screens/settings-more-hub.md#group-c--import--export-nhập--xuất); format not decided | TBD | TBD |
| F1.DATA.EXPORT.1 | Export flow (no mutation; local-first) | BE/FE | Future | [settings-more-hub.md → Group C](../design/screens/settings-more-hub.md#group-c--import--export-nhập--xuất); format not decided | TBD | TBD |
| _(Statistics)_ | Statistics has its **own section** — see [Statistics (F1.STATS)](#statistics-f1stats) | — | — | [settings-more-hub.md → Group D](../design/screens/settings-more-hub.md#group-d--statistics-thống-kê) | — | — |
| _(Appearance)_ | Appearance / Theme has its **own section** — see [Appearance / Theme Settings (F1.APPEARANCE)](#appearance--theme-settings-f1appearance) | — | — | [settings-more-hub.md → Group E](../design/screens/settings-more-hub.md#group-e--appearance--theme-chủ-đề) | — | — |
| F1.SUPPORT.1 | FAQ and support contact entries (email / Telegram) | FE | Future | [settings-more-hub.md → Group G](../design/screens/settings-more-hub.md#group-g--help--support-trợ-giúp); links not decided | TBD | TBD |

> `F1.SETTINGS.HUB.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability
> log](#traceability-log)), per the [evidence policy](#done-criteria--evidence-policy). **Drawer is not a required UI** —
> it only sourced the function list. **Add/Delete language** (learning-language workspace) is **not** in
> the current data model and needs a **data-model + destructive-policy task** first — marked **Future**.
> Import/export file formats, theme storage, and support links are **not** decided here; those functions
> are **Future** until they get their own spec.

---

## Statistics (F1.STATS)

Long-term statistics screen (opened from Settings / More Hub). Spec:
[`../design/screens/statistics.md`](../design/screens/statistics.md)
([decision table](../decision-tables/statistics-decision-table.md)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.STATS.1 | Statistics screen concept | Docs | Done | [statistics.md](../design/screens/statistics.md); [memox-scope.md](../product/memox-scope.md) | `npm run check` / `git diff --check` | PR `docs/statistics-screen-concept` (squash commit after merge) |
| F1.STATS.2 | Statistics read model (finalized history; scope filter; no mutation) | BE | Not started | [statistics.md](../design/screens/statistics.md), [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) | TBD | TBD |
| F1.STATS.3 | Statistics UI shell and tabs (Từ / Thời gian / Chất lượng + chart + scope) | FE | Not started | [statistics.md](../design/screens/statistics.md) | TBD | TBD |
| F1.STATS.4 | Word metrics aggregation (Đang học / Đã học / Đã lặp lại / tổng từ / danh mục) | BE | Not started | [statistics.md → Tab Từ](../design/screens/statistics.md#tab-từ-wordcard-counts) | TBD | TBD |
| F1.STATS.5 | Time metrics aggregation (học / lặp lại / tổng; recorded sessions only) | BE | Not started | [statistics.md → Tab Thời gian](../design/screens/statistics.md#tab-thời-gian-time) | TBD | TBD |
| F1.STATS.6 | Quality metrics aggregation (correct/wrong; learning/repeat quality; evaluation modes only) | BE | Not started | [statistics.md → Tab Chất lượng](../design/screens/statistics.md#tab-chất-lượng-quality) | TBD | TBD |

> `F1.STATS.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability log](#traceability-log)),
> per the [evidence policy](#done-criteria--evidence-policy). Statistics is **long-term** and **distinct**
> from Session Result (just-finished session) and Activity summary (today). **Aggregation formulas are
> not decided** — the read-model rows (`F1.STATS.4/.5/.6`) must define them; docs **do not invent** them.
> Opening Statistics **never mutates** learning data.

---

## Appearance / Theme Settings (F1.APPEARANCE)

Theme/appearance configuration (opened from Settings / More Hub → Chủ đề). Spec:
[`../design/screens/appearance-theme-settings.md`](../design/screens/appearance-theme-settings.md)
([decision table](../decision-tables/appearance-theme-settings-decision-table.md)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.APPEARANCE.1 | Appearance / Theme Settings concept | Docs | Done | [appearance-theme-settings.md](../design/screens/appearance-theme-settings.md); [memox-scope.md](../product/memox-scope.md) | `npm run check` / `git diff --check` | PR `docs/appearance-theme-settings-concept` (squash commit after merge) |
| F1.APPEARANCE.2 | Appearance settings storage (persist theme/auto-dark/icon prefs; local settings) | BE/Settings | Not started | [appearance-theme-settings.md → Persistence](../design/screens/appearance-theme-settings.md#persistence-concept), [09-settings.md](../design/09-settings.md) | TBD | TBD |
| F1.APPEARANCE.3 | Theme settings UI (auto dark mode; day/night theme presets; app icon) | FE | Not started | [appearance-theme-settings.md](../design/screens/appearance-theme-settings.md) | TBD | TBD |
| F1.APPEARANCE.4 | Theme application runtime behavior (follow system / apply day-night themes) | FE | Not started | [appearance-theme-settings.md → Auto dark mode](../design/screens/appearance-theme-settings.md#auto-dark-mode-chế-độ-đêm-tự-động) | TBD | TBD |
| F1.APPEARANCE.5 | App icon switching platform spike | Research/Foundation | Future | [appearance-theme-settings.md → Platform notes](../design/screens/appearance-theme-settings.md#platform-notes-for-app-icon); Expo/native support not verified | TBD | TBD |

> `F1.APPEARANCE.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability
> log](#traceability-log)), per the [evidence policy](#done-criteria--evidence-policy). **Appearance settings never mutate
> learning data.** **App icon switching is Future** — it needs verified platform support (spike) and can
> remove Home-screen shortcuts. Theme token values, icon assets, dynamic-app-icon API, and persistence
> schema are **not** decided here.

---

## App Settings (F1.SETTINGS.APP)

Main app configuration (opened from Settings / More Hub → Cài đặt) + its child flows (Native Language
Picker, Reminder Settings, Spaced Repetition Settings). Specs:
[app-settings](../design/screens/app-settings.md),
[native-language-picker](../design/screens/native-language-picker.md),
[reminder-settings](../design/screens/reminder-settings.md),
[spaced-repetition-settings](../design/screens/spaced-repetition-settings.md)
([decision table](../decision-tables/app-settings-decision-table.md)).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.SETTINGS.APP.1 | App Settings, Native Language Picker, Reminder Settings, and Spaced Repetition Settings concept | Docs | Done | [app-settings.md](../design/screens/app-settings.md); [native-language-picker.md](../design/screens/native-language-picker.md); [reminder-settings.md](../design/screens/reminder-settings.md); [spaced-repetition-settings.md](../design/screens/spaced-repetition-settings.md); [memox-scope.md](../product/memox-scope.md) | `npm run check` / `git diff --check` | PR `docs/app-settings-screen-concept` (squash commit after merge) |
| F1.SETTINGS.APP.2 | App Settings UI shell | FE | Not started | [app-settings.md](../design/screens/app-settings.md) | TBD | TBD |
| F1.SETTINGS.STORAGE.1 | Local settings storage | BE/Settings | Not started | [05-data-model.md → app settings](../design/05-data-model.md#chức-năng-hệ-thống-concept-level--chưa-chốt-schema), [09-settings.md](../design/09-settings.md) | TBD | TBD |
| F1.SETTINGS.LANGUAGE.1 | Native language preference and picker | BE/FE | Not started | [native-language-picker.md](../design/screens/native-language-picker.md) | TBD | TBD |
| F1.SETTINGS.LANGUAGE.2 | Language list/search behavior | FE/BE | Not started | [native-language-picker.md](../design/screens/native-language-picker.md) | TBD | TBD |
| F1.SETTINGS.REMINDER.1 | Reminder settings and schedule preferences | BE/FE | Not started | [reminder-settings.md](../design/screens/reminder-settings.md) | TBD | TBD |
| F1.SETTINGS.REMINDER.2 | Notification permission and platform scheduling | FE/Platform | Not started | [reminder-settings.md](../design/screens/reminder-settings.md) | TBD | TBD |
| F1.SETTINGS.WORDFORM.1 | Word form/display settings | BE/FE | Not started | [app-settings.md → Word form](../design/screens/app-settings.md#word-form--display-settings-hình-thức-từ-ngữ) | TBD | TBD |
| F1.SETTINGS.SRS.1 | Spaced Repetition Settings policy | Docs/BE | Not started | [spaced-repetition-settings.md](../design/screens/spaced-repetition-settings.md); [06-srs-8box.md](../design/06-srs-8box.md) | TBD | TBD |
| F1.SETTINGS.SRS.2 | Spaced Repetition Settings UI | FE | Not started | [spaced-repetition-settings.md](../design/screens/spaced-repetition-settings.md) | TBD | TBD |
| F1.SETTINGS.SRS.3 | SRS notification preference and scheduling | BE/FE/Platform | Not started | [spaced-repetition-settings.md](../design/screens/spaced-repetition-settings.md) | TBD | TBD |
| F1.SETTINGS.GAME.1 | Game settings | BE/FE | Not started | [app-settings.md → Game settings](../design/screens/app-settings.md#game-settings-cài-đặt-trò-chơi) | TBD | TBD |
| F1.BACKUP.1 | Backup/Restore policy and flow | BE/FE | Not started | [app-settings.md → Backup / Restore](../design/screens/app-settings.md#backup--restore-sao-lưu--khôi-phục) | TBD | TBD |
| F1.SYNC.1 | Cloud sync policy | Docs/Research | Future | [app-settings.md → Cloud sync](../design/screens/app-settings.md#cloud-sync-đồng-bộ-đám-mây); provider/conflict policy not decided | TBD | TBD |

> `F1.SETTINGS.APP.1` is a docs row, now **`Done`** (merged; evidence in the row + [Traceability
> log](#traceability-log)), per the [evidence policy](#done-criteria--evidence-policy). Native Language Picker, Reminder
> Settings, and Spaced Repetition Settings are **child flows of App Settings**, not separate modules — all
> in **one** PR. Opening App Settings **never mutates** learning data. **"Ô: 7"** must not distort the
> documented **8-box** model — it is an **open question** (see the SRS settings drift). **Restore** is
> destructive (confirm + validate); **Cloud sync** is **Future** (needs provider/conflict policy). Game
> is Future relative to Phase 1. Notification API, permission flow, backup format, and schema are **not**
> decided here.

---

## 5. Later phases (NOT started)

| ID | Deliverable | Status |
|----|-------------|--------|
| P2.1 | Study modes: Review, Recall, Guess | Not started |
| P3.1 | Match game (no SRS write) | Not started |
| P3.2 | Statistics / progress | Not started |
| P4.1 | Cloud sync (accounts, two-way sync on the sync-ready schema) | Not started |

---

**Reminder:** a row moves to `Done` only when its deliverable exists, related tests pass, and
`npm run check` is green — with source + test + PR/commit evidence recorded. Do not mark feature/BE
rows complete before their code and tests exist, and never invent a commit hash.
