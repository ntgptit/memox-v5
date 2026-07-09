# Work Breakdown Structure (WBS)

Tracks MemoX v5 work.

**Status is honest about the repo:** only repository scaffolding and documentation exist. **No product
feature has been implemented** — every implementation row is `Not started`.

Status legend: `Done` · `In progress` · `Not started` · `Blocked`.

## Done-criteria & evidence policy

A row may be marked `Done` **only** when all hold:

- The deliverable exists in the repo.
- **`npm run check` passes** (see [`../verification.md`](../verification.md)).
- **Related tests exist and pass.** A feature/BE row **cannot** be `Done` without a related test.
- Evidence is filled in: **Source evidence** (spec it implements), **Test evidence** (test file(s)),
  **Commit/PR evidence** (commit SHA or PR).

If a test is intentionally skipped, the row **must** record the reason and its status **must not** be
`Done` (use `In progress` or `Blocked` with a note). Silent skips are not allowed.

`—` in an evidence column means "not applicable yet" (nothing implemented).

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

| ID | Deliverable | Status | Notes |
|----|-------------|--------|-------|
| F2.1 | README rewritten for MemoX v5 (not starter; references `src/app`) | Done | `README.md` |
| F2.2 | `AGENTS.md` implementation rules | Done | `AGENTS.md` |
| F2.3 | Architecture docs (overview, folder structure, boundaries) | Done | `docs/architecture/` |
| F2.4 | Product scope doc | Done | `docs/product/memox-scope.md` |
| F2.5 | Verification doc | Done | `docs/verification.md` |
| F2.6 | Deep design specs (data model, SRS, study modes, i18n, settings, phasing) | Done | `docs/design/`, `docs/product/`, `docs/roadmap/` |
| F2.7 | Phase 1 decision tables (due semantics, session persistence, starter template) | Done | `docs/decision-tables/phase-1-contracts.md` |

---

## 3. Phase 1 — implementable backlog

Small, verifiable units for Phase 1. **All `Not started`** — none implemented yet. Type: `BE`
(backend/domain/data), `FE` (screens), `Test`, `Docs`.

### 3.1 Backend / domain / data

| ID | Title | Type | Status | Source evidence | Test evidence (required before Done) | Commit / PR evidence |
|----|-------|------|--------|-----------------|--------------------------------------|----------------------|
| P1-BE-01 | SQLite local database v1 (schema + migrations, `PRAGMA foreign_keys`) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md) | `src/shared/db/__tests__` — migrate on `:memory:`, assert tables/indexes | — |
| P1-BE-02 | SRS 8-box engine (`schedule`, `isDue`, pure) | BE | Not started | [`06-srs-8box.md`](../design/06-srs-8box.md) | `src/shared/srs/engine/__tests__` — branch coverage (see P1-TEST-01) | — |
| P1-BE-03 | Deck repository (CRUD, nested tree, move + cycle guard, soft-delete) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md), FR-D1..7 | `src/features/deck-tree/data/__tests__` on `:memory:` | — |
| P1-BE-04 | Card repository (CRUD, move deck) | BE | Not started | [`05-data-model.md`](../design/05-data-model.md), FR-C1..6 | `src/features/card/data/__tests__` on `:memory:` | — |
| P1-BE-05 | Study eligibility query (due predicate + new-card allowance, scope toggle) | BE | Not started | [`06-srs-8box.md`](../design/06-srs-8box.md), [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics) | query test on `:memory:` (see P1-TEST-02) | — |
| P1-BE-06 | Settings store/repository (`app_meta` JSON, Zod validation) | BE | Not started | [`09-settings.md`](../design/09-settings.md) | `src/features/settings/__tests__` — validation + defaults merge | — |
| P1-BE-07 | Typing study-session backend (build list → grade → persist in one txn) | BE | Not started | [`07-study-modes.md`](../design/07-study-modes.md), [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence) | orchestration test — per-answer persistence to `cards` + `card_reviews` | — |
| P1-BE-08 | i18n init + `vi`/`en` locales + change-language | BE | Not started | [`08-i18n.md`](../design/08-i18n.md) | `src/shared/i18n/__tests__/keys.test.ts` — key parity | — |

### 3.2 Frontend / screens (skeletons)

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| P1-FE-01 | Home screen skeleton (deck tree + due count) | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md) | render/smoke test where valuable | — |
| P1-FE-02 | Deck list/detail screen skeleton | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md) | render/smoke test where valuable | — |
| P1-FE-03 | Study screen skeleton (Typing) | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md), [`07-study-modes.md`](../design/07-study-modes.md) | render/smoke test where valuable | — |
| P1-FE-04 | Settings screen skeleton | FE | Not started | [`10-navigation-ux.md`](../design/10-navigation-ux.md), [`09-settings.md`](../design/09-settings.md) | render/smoke test where valuable | — |

### 3.3 Tests (dedicated)

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| P1-TEST-01 | SRS engine unit tests (promote/lapse/boundary/`isDue`/determinism) | Test | Not started | [`06-srs-8box.md` test table](../design/06-srs-8box.md#kiểm-thử-engine-bắt-buộc--nfr-6) | is itself the test evidence for P1-BE-02 | — |
| P1-TEST-02 | Eligibility query tests (Option A due predicate, new-card cap) | Test | Not started | [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics) | test evidence for P1-BE-05 | — |

### 3.4 Docs

| ID | Title | Type | Status | Source evidence | Test evidence | Commit / PR evidence |
|----|-------|------|--------|-----------------|---------------|----------------------|
| P1-DOC-01 | Import/export — **placeholder, NOT in Phase 1** | Docs | Not started | Out of Phase 1 scope ([memox-scope.md](../product/memox-scope.md)) | n/a (docs) | — |

---

## 4. Later phases (NOT started)

High-level only; scoped per the [roadmap](../roadmap/11-phasing.md). Do not start until Phase 1 lands.

| ID | Deliverable | Status |
|----|-------------|--------|
| P2.1 | Study modes: Review, Recall, Guess | Not started |
| P3.1 | Match game (no SRS write) | Not started |
| P3.2 | Statistics / progress | Not started |
| P4.1 | Cloud sync (accounts, two-way sync on the sync-ready schema) | Not started |

---

**Reminder:** a row moves to `Done` only when its deliverable exists, related tests pass, and
`npm run check` is green. Do not mark feature/BE rows complete before their code and tests exist.
