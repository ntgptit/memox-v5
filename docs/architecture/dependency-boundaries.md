# Dependency Boundaries

These import rules keep features decoupled and the codebase navigable. They are **enforced
automatically** by [`scripts/check-boundaries.mjs`](../../scripts/check-boundaries.mjs), which runs as
part of `npm run check`. A violation fails the gate.

## The rules

1. **`src/features/<A>` must not import from `src/features/<B>`** (where A ≠ B).
   A feature is a self-contained vertical slice. Features do not depend on each other.

2. **`src/shared` must not import from `src/features`.**
   `src/shared` sits *below* features in the layering. Shared code cannot reach up into a feature.

There is no restriction on importing **from** `src/shared` — features and routes may (and should)
depend on shared code.

## Allowed-import matrix

| From ↓ \ May import → | `src/shared` | another `src/features/*` | `src/app` |
|-----------------------|:-----------:|:------------------------:|:---------:|
| `src/app`             | ✅ | ✅ (a feature's public API) | — |
| `src/features/X`      | ✅ | ❌ | ❌ |
| `src/shared`          | ✅ (within shared) | ❌ | ❌ |

`❌` combinations are reported and fail `npm run check`.

## Consequence: where cross-feature code goes

If something is needed by **more than one** feature — a domain engine, a shared type, a persistence or
i18n helper — it **must live in `src/shared`**, not inside a feature. Putting it in a feature would
force other features to violate rule 1 to reach it.

Example: the SRS 8-box engine is used by multiple study modes, so it belongs in `src/shared` (planned:
`src/shared/srs/`), not in a single feature. See [folder-structure.md](folder-structure.md).

## How the check works

`scripts/check-boundaries.mjs` scans `src/features` and `src/shared` for imports (static `import`,
`export ... from`, side-effect `import`, dynamic `import()`, and `require()`). It resolves both:

- the **`@/` alias** (mapped to `./src`), and
- **relative** specifiers.

Bare package imports (e.g. `react`, `zustand`) are ignored — the rules are only about intra-`src`
imports. For each resolved import it determines the target feature (if any) and flags:

- a `shared` file importing any feature, or
- a feature file importing a **different** feature.

Run it directly with:

```bash
node scripts/check-boundaries.mjs
```

On success it prints `Boundary check passed.`; on failure it lists each violating `file:line` and
exits non-zero.

## Practical guidance

- Import a feature only through its **public API** (`src/features/<feature>/index.ts`), never via deep
  internal paths.
- If you find yourself wanting feature A to import feature B, that's a signal the shared piece should
  move to `src/shared`, or the boundary between A and B is wrong. Reconsider the split rather than
  bypassing the rule.
- Routes in `src/app` may compose multiple features, but keep them thin — no business logic.

## Layering & dependency policy

Beyond the two enforced rules, these hold by convention and review:

- **`src/features/<A>` must not import another feature `<B>`** (enforced).
- **`src/shared` must not import `src/features`** (enforced).
- **App routes in `src/app` only compose** screens / feature entry points — **no heavy business logic**
  in routes.
- **Domain does not depend on UI, router, or storage implementation.** It is pure and takes inputs
  (state, `now`, config); it never reads storage/route/`Date.now()`/network directly.
- **Data layer does not depend on presentation.** Repositories map storage ↔ domain and return
  `Result`; they know nothing about screens or stores.
- **No starter demo dependency:** no feature may import Expo starter demo screens/components
  ([DT-3](../decision-tables/phase-1-contracts.md#dt-3--expo-starter-template-handling-not-on-production-path)).

## Adding dependencies

- **Do not add a new dependency unless a docs/WBS task approves it.** Prefer the existing foundation
  libraries (see [`../../AGENTS.md`](../../AGENTS.md) §4).
- A new **SQLite/storage** dependency (or any infra library) must have its **own WBS row/task**
  documented **before** code is written — it is not an ad-hoc import.
