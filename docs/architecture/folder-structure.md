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
│   ├── components/           # starter template UI — reference only
│   ├── constants/            # starter template — reference only (theme.ts)
│   ├── hooks/                # starter template — reference only
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

> The `src/components`, `src/constants`, `src/hooks`, and `src/app/explore.tsx` files are **starter
> template code kept as a screen-code reference**. Treat them as reference, not as MemoX feature code.

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
