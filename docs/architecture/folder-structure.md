# Folder Structure

**Source root is `src/`.** Everything app-specific lives under it. This page says where each kind of
file goes and why.

## Current tree (foundation)

Reflects what exists today; feature folders are added as features are built.

```
memox-v5/
├── src/
│   ├── app/                  # Expo Router routes (THE app directory — not root ./app)
│   │   ├── _layout.tsx       # root layout
│   │   ├── index.tsx         # home route
│   │   └── explore.tsx       # (starter reference screen)
│   ├── components/           # Expo starter template UI — kept until replaced (DT-3)
│   ├── constants/            # Expo starter template — kept until replaced (theme.ts, DT-3)
│   ├── hooks/                # Expo starter template — kept until replaced (DT-3)
│   ├── features/             # feature modules (see below); currently a placeholder
│   ├── shared/               # cross-cutting code (see below)
│   │   ├── lib/
│   │   ├── ui/
│   │   └── utils/
│   └── global.css            # NativeWind entry
├── docs/                     # project documentation (this folder)
├── scripts/
│   └── check-boundaries.mjs  # enforces the import rules
├── app.json                  # Expo config
├── package.json              # scripts incl. `check`
└── ...config (biome.json, tsconfig.json, metro.config.js, babel.config.js, tailwind.config.js)
```

> The `src/components`, `src/constants`, `src/hooks`, and `src/app/explore.tsx` files are **Expo
> starter template code**. They are **kept until explicitly replaced/promoted** (decision
> [DT-3](../decision-tables/phase-1-contracts.md#dt-3--expo-starter-template-handling)); see
> [Expo starter template](#expo-starter-template) below for the rule and current drift.

## `src/app` — routes only

- This is the **Expo Router app directory**. Expo Router uses `src/app` because there is **no** root
  `app/` directory.
- Route files are **thin**: compose UI, read stores, delegate. **No business logic here.**
- Add screens as route files/folders (e.g. `src/app/deck/[id].tsx`) when the corresponding feature
  is built.

## `src/features/<feature>` — one feature, self-contained

Each feature is a vertical slice that owns its own UI, state, and data access. Suggested internal
layout (create only the folders a feature needs):

```
src/features/<feature>/
├── ui/        # components specific to this feature
├── model/     # zustand store(s), use-cases / orchestration
├── data/      # repositories (return Result), storage mapping
└── index.ts   # the feature's PUBLIC API (import from here, not deep paths)
```

Rule: a feature **must not import another feature**. If two features need the same thing, that thing
belongs in `src/shared`.

## `src/shared` — cross-cutting, no feature dependencies

Anything used by **more than one** feature, or that is genuinely generic:

```
src/shared/
├── ui/      # reusable presentational components (Button, TextField, ...)
├── lib/     # pure utilities (ids, dates, result helpers)
├── utils/   # (existing) misc utilities + tests
├── types/   # shared domain types
└── ...      # domain engines, db helpers, i18n init, etc. as needed
```

Rule: `src/shared` **must not import from `src/features`** (it sits below features in the layering).

## Naming conventions

| Kind | Convention | Example |
|------|------------|---------|
| Feature folder | kebab-case | `src/features/deck-tree/` |
| React component file | kebab-case `.tsx` | `tree-row.tsx` |
| TypeScript type / domain model | PascalCase | `Deck`, `Card` |
| Store / hook | `use-*` | `use-deck-tree.ts` |
| Test | `__tests__/*.test.ts(x)` | `src/shared/utils/__tests__/smoke.test.ts` |

## Path alias

`@/*` maps to `./src/*` (see `tsconfig.json`), and `@/assets/*` maps to `./assets/*`. Prefer the
alias over long relative paths. The boundary checker understands both `@/` and relative imports.

## Where new MemoX code will land

As features are built (see [WBS](../project-management/wbs.md)), expect folders such as:

- `src/shared/srs/` — pure 8-box SRS engine (used by multiple study modes → shared, not a feature).
- `src/shared/db/` — persistence + migrations helpers.
- `src/shared/i18n/` — i18n init + locale files.
- `src/features/deck-tree/`, `src/features/card/`, `src/features/study-session/`,
  `src/features/settings/` — feature slices.

These are planned locations documented in [`docs/design/`](../design/); they do not exist as code yet.

## Expo starter template

**Decision (DT-3): keep starter files until explicitly replaced/promoted.** They are not deleted
pre-emptively, and they are not merely "temporary reference" — the app shell currently depends on some
of them (see the drift log below).

Scope of starter files: `src/components/**`, `src/constants/theme.ts`, `src/hooks/**`,
`src/app/explore.tsx`.

Rules:

- **Feature implementation must not depend on starter demo screens/components** unless those pieces are
  **explicitly promoted** into shared MemoX components (e.g. moved/rewritten under `src/shared/ui`).
- When a MemoX screen needs something a starter component provides, **promote** it (make it a proper
  shared component with its own place and, where it carries logic, tests) rather than importing the
  demo file directly.
- A starter file may be deleted once nothing depends on it. Until then it stays — removing it while the
  app shell imports it would break the build.

Full decision table:
[DT-3](../decision-tables/phase-1-contracts.md#dt-3--expo-starter-template-handling).

## Drift log

When docs and source disagree, record it here (and stop rather than silently guessing), using this
format:

```
DRIFT DETECTED
File code:
File doc:
Mismatch:
Suggested fix:
```

### DRIFT-001 — app shell depends on starter components

```
DRIFT DETECTED
File code: src/app/_layout.tsx (imports @/components/app-tabs, @/components/animated-icon)
File doc:  docs/decision-tables/phase-1-contracts.md DT-3 + this file (rule: feature/app code must
           not depend on starter demo components unless promoted to shared MemoX components)
Mismatch:  The live root layout (not a demo screen) renders via starter components AppTabs and
           AnimatedSplashOverlay, so the current app shell already depends on starter code that the
           DT-3 rule says non-promoted app code should not depend on.
Suggested fix: During Phase 1 FE work (WBS P1-FE-*), promote the shell's navigation/splash into
           shared MemoX components (e.g. src/shared/ui) or MemoX-owned route files, then drop the
           starter imports from src/app/_layout.tsx. Until then, DT-3 governs: starter files stay,
           and no NEW feature code may depend on them.
```

> Note: `src/app/index.tsx` is clean (imports only `react-native` primitives). Only `_layout.tsx` is
> currently affected. This drift is documentation-only to record here; **no source is changed in the
> docs-hardening task.**
