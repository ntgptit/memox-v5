# MemoX v5

MemoX is a **flashcard app with spaced-repetition review (8-box Leitner)**, **nested decks**, and
multiple study modes. It is **local-first** (works offline) and runs on **iOS, Android, and Web**.

- **Stack:** Expo (SDK 57) · React Native · TypeScript
- **Source root:** [`src/`](src/)
- **App routes (Expo Router):** [`src/app/`](src/app/) — there is **no** root `app/` directory;
  Expo Router uses `src/app`.
- **Status:** Foundation / documentation phase. No product feature code has been implemented yet.

> ⚠️ Expo has changed across versions. Before writing any code that touches Expo APIs, read the
> **exact versioned docs** at <https://docs.expo.dev/versions/v57.0.0/>. See [`AGENTS.md`](AGENTS.md).

## Getting started

```bash
npm install
npm start          # Expo dev server (press w / a / i for web / Android / iOS)
```

Platform shortcuts: `npm run web`, `npm run android`, `npm run ios`.

## Verification

One command gates everything. Run it before every commit/PR:

```bash
npm run check
```

It runs, in order: **TypeScript** (`tsc --noEmit`) → **Biome** (format + lint) → **Jest** →
**architecture boundary check** (`scripts/check-boundaries.mjs`). Details in
[`docs/verification.md`](docs/verification.md).

## Foundation dependencies

The starting toolset for building features (nothing app-specific has been built on top yet):

| Concern | Library |
|---------|---------|
| Routing | **Expo Router** (file-based, in `src/app`) |
| Styling | **NativeWind** (Tailwind for React Native) |
| State | **Zustand** |
| Validation / schemas | **Zod** |
| Error handling | **neverthrow** (`Result`, no hidden throws) |
| Forms | **react-hook-form** |

## Architecture rules (must-follow)

- Everything lives under `src/`. Screens/routes are thin and live in `src/app`.
- Feature isolation: **`src/features/<A>` must not import `src/features/<B>`.**
- **`src/shared` must not import `src/features`.** Cross-feature code goes in `src/shared`.
- These rules are enforced by `scripts/check-boundaries.mjs` (part of `npm run check`).

Read the full rules in [`docs/architecture/dependency-boundaries.md`](docs/architecture/dependency-boundaries.md)
and folder layout in [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md).

## Documentation

| Doc | Purpose |
|-----|---------|
| [`AGENTS.md`](AGENTS.md) | Actionable implementation rules for contributors & AI agents |
| [`docs/product/memox-scope.md`](docs/product/memox-scope.md) | What MemoX is / is not (scope) |
| [`docs/architecture/overview.md`](docs/architecture/overview.md) | Layers, data flow, tech stack |
| [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md) | Where code goes |
| [`docs/architecture/dependency-boundaries.md`](docs/architecture/dependency-boundaries.md) | Import rules (enforced) |
| [`docs/project-management/wbs.md`](docs/project-management/wbs.md) | Work breakdown (foundation-first) |
| [`docs/verification.md`](docs/verification.md) | How to verify changes |

Deeper design specs (data model, SRS algorithm, study modes, i18n, settings, phasing) live under
[`docs/design/`](docs/design/), [`docs/product/`](docs/product/), and [`docs/roadmap/`](docs/roadmap/) —
see [`docs/README.md`](docs/README.md) for the full index.
