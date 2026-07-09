# Verification

MemoX has **one verification command** that gates all changes. Run it before every commit and PR.

```bash
npm run check
```

Do not claim a change is complete unless `npm run check` passes. If it fails or you had to skip a
step, say which step and why.

## What it runs

`check` is a composite script (see `package.json`). It runs these in order and stops at the first
failure:

| Step | Command | Purpose |
|------|---------|---------|
| 1. Types | `tsc --noEmit` | TypeScript type check (`strict`, `noUncheckedIndexedAccess`) |
| 2. Lint/format | `npx biome check .` | Biome formatting + lint rules |
| 3. Tests | `jest --passWithNoTests` | Unit tests (passes cleanly when none exist yet) |
| 4. Boundaries | `node scripts/check-boundaries.mjs` | Enforces feature/shared import rules |

A green run ends with `Boundary check passed.`.

## Running steps individually

Useful while iterating:

```bash
npm run typecheck                 # step 1
npx biome check .                 # step 2  (add --write to auto-fix formatting)
npm test                          # step 3
node scripts/check-boundaries.mjs # step 4
```

## Step details

### 1. TypeScript (`npm run typecheck`)
Type errors fail the gate. The project is `strict` with `noUncheckedIndexedAccess`, so indexed access
can be `undefined` — handle it (guards, non-null only when provably safe).

### 2. Biome (`npx biome check .`)
Formatting and lint. To auto-apply safe fixes: `npx biome check --write .`. Config in `biome.json`
(2-space indent, single quotes, organize-imports). Note: `docs/design`, `node_modules`, `.expo`,
`coverage`, and `assets` are excluded from Biome.

### 3. Jest (`npm test`)
Runs with `jest-expo`. `--passWithNoTests` means an empty/absent suite still passes — expected during
the foundation phase. Co-locate tests in `__tests__/` next to the code they cover. **Pure domain logic
(e.g. the SRS engine) must be unit-tested** when it lands.

### 4. Boundary check (`scripts/check-boundaries.mjs`)
Fails if:

- a file in `src/shared` imports from `src/features`, or
- a file in `src/features/<A>` imports from a different `src/features/<B>`.

See [`architecture/dependency-boundaries.md`](architecture/dependency-boundaries.md) for the full
rules and how the checker resolves imports.

## When adding features later

- Add unit tests for pure logic; add component tests where they add value.
- Keep new UI strings behind i18n (no hard-coded UI text) once the i18n layer exists.
- Re-run `npm run check` and ensure it is green before marking any [WBS](project-management/wbs.md)
  row `Done`.

## CI

`npm run check` is the single source of truth for "is this change safe". Any CI pipeline should run
exactly this command so local and CI results match.
