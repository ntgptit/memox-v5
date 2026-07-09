# Architecture Overview

MemoX v5 is an **Expo (SDK 57) / React Native / TypeScript** app, **local-first** and offline-capable,
targeting iOS, Android, and Web.

This page is the concise foundation reference. Deeper design specs (data model, SRS algorithm, study
modes, i18n, settings) live in [`docs/design/`](../design/); see [`docs/README.md`](../README.md) for
the index.

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | Expo SDK 57, React Native, React 19 |
| Language | TypeScript (`strict`, `noUncheckedIndexedAccess`) |
| Routing | Expo Router (file-based, app dir = `src/app`) |
| Styling | NativeWind (Tailwind) |
| State | Zustand |
| Validation | Zod |
| Error handling | neverthrow (`Result`) |
| Forms | react-hook-form |
| Quality gate | Biome + TypeScript + Jest + boundary check via `npm run check` |

> Because Expo changes across versions, always consult
> <https://docs.expo.dev/versions/v57.0.0/> before writing Expo-facing code.

## Layers

Dependencies flow **one direction**, top to bottom. A lower layer never imports an upper layer.

```
┌───────────────────────────────────────────────┐
│ UI       Expo Router screens (src/app) +        │  React, NativeWind
│          reusable components (src/shared/ui)     │
├───────────────────────────────────────────────┤
│ State    Zustand stores + hooks (per feature)    │  orchestrates use-cases
├───────────────────────────────────────────────┤
│ Domain   pure business logic (e.g. SRS engine)   │  NO I/O, deterministic
├───────────────────────────────────────────────┤
│ Data     repositories → return Result            │  maps storage ↔ domain
├───────────────────────────────────────────────┤
│ Infra    persistence, i18n, device APIs          │  platform details
└───────────────────────────────────────────────┘
```

Principles:

- **Thin routes.** Files in `src/app` wire UI and delegate; they hold no business logic.
- **Pure domain.** Domain functions take inputs (state, arguments, `now`) and return outputs — no
  clock reads, no storage access — so they are testable and deterministic.
- **`Result` at the data edge.** Repositories return `neverthrow` `Result`; expected failures are
  values, not thrown exceptions.
- **Validate at boundaries.** Parse external/persisted/form data with Zod before trusting it.

## Data flow (typical write)

```
Route (src/app/*)                 → renders screen, reads a store
  → Store (src/features/*/model)  → calls a use-case
    → Domain (src/shared/*)       → pure computation (returns new state)
    → Repository (features/*/data)→ persists, returns Result
  → Store maps Result → UI state (success / error message via i18n)
```

## Feature isolation

Code is organized by **feature** under `src/features/`, with cross-cutting code in `src/shared/`.
Two import rules are **enforced** by `scripts/check-boundaries.mjs`:

1. `src/features/<A>` must not import `src/features/<B>`.
2. `src/shared` must not import `src/features`.

See [`dependency-boundaries.md`](dependency-boundaries.md) for the rationale and the allowed-import
matrix, and [`folder-structure.md`](folder-structure.md) for where each kind of file goes.

Dependency policy (also enforced/holds by convention):

- App routes in `src/app` only **compose** screens/feature entry points — **no heavy business logic**.
- **Domain** does not depend on UI / router / storage implementation; **data layer** does not depend on
  presentation.
- **No new dependency** is added unless approved by a docs/WBS task. A new SQLite/storage dependency
  needs its own WBS row/task before code.

## Local-first storage contract

- MemoX v5 is **local-first**; the **local SQLite DB is the source of truth** for
  deck / card / study-session / review / settings.
- UI / provider / state (zustand) must **not** be the only durable store — state is a projection of the
  DB.
- **Multi-table writes are transactional**; repositories return `Result`.
- **Domain logic never reads storage, UI, route, `Date.now()`, or network directly** — time and I/O are
  injected (testable).
- Import / export / backup-restore is a later task if not in Phase 1, and must not break this contract.

Full contract: [`../design/05-data-model.md`](../design/05-data-model.md#hợp-đồng-lưu-trữ-local-first).

## Binding Phase 1 contracts

Before implementation, three ambiguities are settled in
[`../decision-tables/phase-1-contracts.md`](../decision-tables/phase-1-contracts.md):

- **DT-1 Due semantics (local-day):** a card is due when `localDay(due_at) <= localDay(today)`. A card
  due later **today** still counts as due today; tomorrow does not. Eligibility normalizes to local-day
  (not a raw `due_at <= now`); the clock is injected/test-controlled.
- **DT-2 Study session (persisted):** sessions are persisted via `study_sessions` +
  `study_session_items`; learning progress in `cards` + `card_reviews`. Requires a migration task
  (`P1-BE-05`) before the Study UI.
- **DT-3 Starter template (off production path):** starter demo code must not be on the MemoX
  production path; it is removed/replaced in cleanup `F0.1`, and no feature may import it.

## Status

The repository is in the **foundation / documentation phase**. The starter dependencies are present,
`src/app` contains the initial router setup, and the verification gate (`npm run check`) is green.
**No product feature code (decks, cards, SRS, study modes) has been implemented yet** — see the
[work breakdown](../project-management/wbs.md).

Per DT-3, starter files must be off the production path. Recorded drift
([DRIFT-001](folder-structure.md#drift-001--app-shell-depends-on-starter-components)): the app shell
(`src/app/_layout.tsx`) currently imports starter components; this must be removed/replaced in
foundation cleanup `F0.1` before Phase 1 FE work. Source is not changed in the docs-only task.
