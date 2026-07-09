# Work Breakdown Structure (WBS)

Tracks MemoX v5 work. **Status is honest about the repo:** only repository scaffolding and
documentation exist. **No product feature has been implemented** — feature rows are `Not started`.

Status legend: `Done` · `In progress` · `Not started`.

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
| F2.1 | README rewritten for MemoX v5 (not starter; references `src/app`) | Done | This task |
| F2.2 | `AGENTS.md` implementation rules | Done | This task |
| F2.3 | Architecture docs (overview, folder structure, boundaries) | Done | `docs/architecture/` |
| F2.4 | Product scope doc | Done | `docs/product/memox-scope.md` |
| F2.5 | Verification doc | Done | `docs/verification.md` |
| F2.6 | This WBS | Done | `docs/project-management/wbs.md` |
| F2.7 | Deep design specs (data model, SRS, study modes, i18n, settings, phasing) | In progress | `docs/design/`, `docs/product/`, `docs/roadmap/` |

## 3. Foundation — implementation prerequisites (NOT started)

Shared building blocks that features will depend on. To be built before feature slices.

| ID | Deliverable | Status | Depends on |
|----|-------------|--------|-----------|
| F3.1 | Persistence + migrations helpers in `src/shared/db` | Not started | F1.* , data-model spec |
| F3.2 | Shared domain types in `src/shared/types` | Not started | data-model spec |
| F3.3 | Pure 8-box SRS engine in `src/shared/srs` (+ unit tests) | Not started | SRS spec |
| F3.4 | i18n init + locale files in `src/shared/i18n` | Not started | i18n spec |
| F3.5 | Shared UI primitives in `src/shared/ui` | Not started | — |

## 4. Feature slices (NOT started)

High-level only; scoped per the [roadmap](../roadmap/11-phasing.md). Do not start until foundation
prerequisites land.

| ID | Deliverable | Status |
|----|-------------|--------|
| W4.1 | `deck-tree` feature (nested decks CRUD, tree view) | Not started |
| W4.2 | `card` feature (card CRUD) | Not started |
| W4.3 | `settings` feature | Not started |
| W4.4 | `study-session` feature + first study mode | Not started |
| W4.5 | Additional study modes | Not started |

## 5. Later phases (NOT started)

| ID | Deliverable | Status |
|----|-------------|--------|
| W5.1 | Statistics | Not started |
| W5.2 | Cloud sync (accounts, two-way sync on the sync-ready schema) | Not started |

---

**Rule:** a row moves to `Done` only when its deliverable exists in the repo **and** `npm run check`
passes. Do not mark feature rows complete before their code exists.
