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
| F2.8 | Phase 1 hardening (local-day due, persisted sessions, starter-off-path, local-first, boundaries) | In progress | PR `docs/phase-1-hardening` (this branch) |

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
| F1.DM.1 | Deck Management and Subdeck List concept spec | Docs | In progress → `Done` after merge | [`../design/screens/deck-management.md`](../design/screens/deck-management.md) | `npm run check` / `git diff --check` | PR `docs/subdeck-list-concept` (squash commit after merge) |
| F1.DM.2 | Deck/Subdeck list read model (child decks/sections, counts, progress/workload indicators) | BE | Not started | [deck-management.md](../design/screens/deck-management.md), [05-data-model.md](../design/05-data-model.md), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.DM.3 | Deck/Subdeck list UI skeleton (header, control area, deck/subdeck rows, bottom actions) | FE | Not started | [deck-management.md](../design/screens/deck-management.md) | TBD | TBD |
| F1.DM.4 | Deck/Subdeck list states (loading / loaded / empty / search-empty / error / no-studyable / creating) | FE | Not started | [deck-management.md states](../design/screens/deck-management.md#các-state-chính) | TBD | TBD |
| F1.DM.5 | Add deck/section/card entry actions (create child deck/section, add card) | FE/BE | Not started | [deck-management.md actions](../design/screens/deck-management.md#các-action-chính) | TBD | TBD |
| F1.DM.6 | Start study from deck/subdeck row (honors study rules + local-day due; disabled when no studyable content) | FE/BE | Not started | [deck-management.md](../design/screens/deck-management.md), [07-study-modes.md](../design/07-study-modes.md) | TBD | TBD |
| F1.DM.SORT.1 | Deck/Subdeck Sort Menu concept spec | Docs | In progress → `Done` after merge | [deck-management.md → Sort Menu](../design/screens/deck-management.md#sort-menu) | `npm run check` / `git diff --check` | PR `docs/deck-sort-menu-concept` (squash commit after merge) |
| F1.DM.SORT.2 | Deck/Subdeck sort behavior implementation (name / created / recently-studied; presentation-only; never-studied ordering; stable tie-break) | FE/BE | Not started | [deck-management.md → Sort Menu](../design/screens/deck-management.md#sort-menu) | TBD | TBD |
| F1.DM.PLAY.1 | Deck/Subdeck Play Menu concept spec (incl. Học/Lặp lại, New Learning + SRS Repeat flows) | Docs | In progress → `Done` after merge | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [07-study-modes.md](../design/07-study-modes.md#new-learning-flow); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [play-menu-decision-table.md](../decision-tables/play-menu-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/play-menu-learning-srs-flow` (squash commit after merge) |
| F1.DM.PLAY.2 | Play Menu workload read model (`newCount` = Box 0/new; `reviewDueCount` = Box 1+ due; `progress`; per scope, local-day due) | BE | Not started | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.DM.PLAY.3 | Play Menu UI behavior (variant A/B by progress; Học/Lặp lại/Xem lại/Một trò chơi/Trình phát; no empty session) | FE | Not started | [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu) | TBD | TBD |
| F1.STUDY.NEW.1 | New Learning Flow (review → match → guess → recall → fill; activate Box 0 → Box 1) | BE/FE | Not started | [07-study-modes.md → New Learning Flow](../design/07-study-modes.md#new-learning-flow), [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) | TBD | TBD |
| F1.STUDY.SRS.1 | SRS Repeat Flow from Play Menu (Box 1+ due only; no empty session on 0 due) | BE/FE | Not started | [07-study-modes.md → SRS Repeat Flow](../design/07-study-modes.md#srs-repeat-flow), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) | TBD | TBD |
| F1.STUDY.NEW.REVIEW.1 | reviewMode concept for New Learning Flow | Docs | In progress → `Done` after merge | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên); [06-srs-8box.md](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1); [deck-management.md → Play Menu](../design/screens/deck-management.md#play-menu); [new-learning-flow-decision-table.md](../decision-tables/new-learning-flow-decision-table.md) | `npm run check` / `git diff --check` | PR `docs/review-mode-concept` (squash commit after merge) |
| F1.STUDY.NEW.REVIEW.2 | reviewMode read model and flow state (Box 0 card; step-1 completion; not SRS-active) | BE | Not started | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên) | TBD | TBD |
| F1.STUDY.NEW.REVIEW.3 | reviewMode UI screen (header / progress / card review area; optional audio & edit) | FE | Not started | [07-study-modes.md → reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên) | TBD | TBD |

> `F1.DM.1`, `F1.DM.SORT.1`, `F1.DM.PLAY.1`, and `F1.STUDY.NEW.REVIEW.1` are docs rows: they flip to `Done` once this PR is
> **merged** (evidence = squash commit), per the [evidence policy](#done-criteria--evidence-policy). The
> **Sort Menu** and **Play Menu** are parts of the Deck Management / Subdeck List spec — not separate
> features. Subdeck List is a **variant** of Deck Management, not a separate screen — no separate
> `F1.SD.*` rows are created. **Game** (Match) and **player/listening** modes are **Future** relative to
> Phase 1 — no implementation rows are added for them here. **Box 0 / 5-mode activation** is documented
> at **concept level**; the supporting **schema/migration is not finalized** here (see the drift notes
> in [06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) and
> [07-study-modes](../design/07-study-modes.md#new-learning-flow)) and needs its own task. No TTS /
> advanced-edit / hidden-suspended rows are added — those are not decided.

---

## Flashcard List (F1.FL)

Concept/business spec + its future implementation rows. Spec:
[`../design/screens/flashcard-list.md`](../design/screens/flashcard-list.md).

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| F1.FL.1 | Flashcard List concept and business spec | Docs | In progress → `Done` after merge | [`../design/screens/flashcard-list.md`](../design/screens/flashcard-list.md) | `npm run check` / `git diff --check` | PR `docs/flashcard-list-concept` (squash commit after merge) |
| F1.FL.2 | Flashcard List read model (cards in scope, front/back per direction) | BE | Not started | [flashcard-list.md](../design/screens/flashcard-list.md), [05-data-model.md](../design/05-data-model.md) | TBD | TBD |
| F1.FL.3 | Flashcard List UI skeleton (header, control area, card rows, bottom actions) | FE | Not started | [flashcard-list.md](../design/screens/flashcard-list.md) | TBD | TBD |
| F1.FL.4 | Flashcard List states (loading / loaded / empty / search-empty / error / unavailable / creating) | FE | Not started | [flashcard-list.md states](../design/screens/flashcard-list.md#các-state-chính) | TBD | TBD |
| F1.FL.5 | Add card entry action (create card in current scope, even under active search/filter) | FE/BE | Not started | [flashcard-list.md actions](../design/screens/flashcard-list.md#các-action-chính) | TBD | TBD |
| F1.FL.6 | Open card detail/edit entry | FE | Not started | [flashcard-list.md actions](../design/screens/flashcard-list.md#các-action-chính) | TBD | TBD |

> `F1.FL.1` is a docs row: it flips to `Done` once this PR is **merged** (evidence = squash commit),
> per the [evidence policy](#done-criteria--evidence-policy). No TTS/audio / progress-indicator /
> advanced-edit rows are added — those are not decided (see the spec's
> [Open questions](../design/screens/flashcard-list.md#open-questions--cố-ý-không-chốt)).

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
