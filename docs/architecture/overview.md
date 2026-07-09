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

## Status

The repository is in the **foundation / documentation phase**. The starter dependencies are present,
`src/app` contains the initial router setup, and the verification gate (`npm run check`) is green.
**No product feature code (decks, cards, SRS, study modes) has been implemented yet** — see the
[work breakdown](../project-management/wbs.md).
