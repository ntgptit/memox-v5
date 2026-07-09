# AGENTS — MemoX v5 implementation rules

Actionable rules for anyone (human or AI agent) writing code in this repo. Read this before making
changes. For scope and design specifics, see [`docs/`](docs/README.md).

## 0. Expo HAS CHANGED — read the versioned docs first

Expo APIs differ significantly across SDK versions. **Before writing any code that touches an Expo
API, read the exact versioned docs at <https://docs.expo.dev/versions/v57.0.0/>.** Do not rely on
memory or older tutorials.

## 1. What this project is

- MemoX v5 is an **Expo (SDK 57) / React Native / TypeScript** app.
- **Local-first**, offline-capable; targets iOS, Android, Web.
- Product scope: [`docs/product/memox-scope.md`](docs/product/memox-scope.md). **Do not invent
  business behavior that is not documented.** If code and docs disagree, **stop and flag the
  mismatch** instead of guessing.

## 2. Where code goes

- **Source root is `src/`.** Nothing app-specific lives outside `src/` (config files aside).
- **Expo Router app directory is `src/app`.** There is no root `app/` directory. Route files are
  **thin**: they wire UI together and delegate to features/stores — no business logic in routes.
- Feature code: `src/features/<feature>/`. Cross-cutting code: `src/shared/`.
- Full layout: [`docs/architecture/folder-structure.md`](docs/architecture/folder-structure.md).

## 3. Dependency boundaries (enforced)

These are checked by `scripts/check-boundaries.mjs` and fail `npm run check`:

- **`src/features/<A>` must not import from `src/features/<B>`** (A ≠ B).
- **`src/shared` must not import from `src/features`.**

Consequence: anything needed by **more than one** feature (domain engine, shared types, DB/i18n
helpers) belongs in `src/shared`. Details + allowed-import matrix:
[`docs/architecture/dependency-boundaries.md`](docs/architecture/dependency-boundaries.md).

## 4. Use the foundation libraries already chosen

Do not add a competing library for a concern already covered. Current foundation:

- **Expo Router** — routing (file-based, `src/app`).
- **NativeWind** — styling (Tailwind classes).
- **Zustand** — state management (stores per feature).
- **Zod** — validation / schema parsing at boundaries.
- **neverthrow** — return `Result` from I/O; do not throw for expected failures.
- **react-hook-form** — forms.

New dependencies need a clear justification and should not duplicate the above.

## 5. Coding contract

- Minimal change first; **fail fast**, **early return**, avoid unnecessary `else`.
- **No business logic in routes/UI.** Layering: UI → state → domain → data (one direction).
- **No magic values** — name constants/tokens.
- Semantic naming; one responsibility per file/module.
- I/O returns `Result` (neverthrow); validate external/boundary data with Zod.
- TypeScript is `strict` with `noUncheckedIndexedAccess` — respect non-null/index safety.
- Follow existing patterns; do not introduce new layers/abstractions without need.

## 6. Verify before you claim done

- Run **`npm run check`** (typecheck → Biome → Jest → boundary check). It **must** pass — this is
  mandatory, not optional.
- **`--passWithNoTests` is a foundation-phase allowance only.** Do not use it to ship feature/domain
  code without tests.
- **A feature/BE row is not `Done` without a related, passing test.** If you deliberately skip a test,
  record the reason in the WBS and keep the row **not** `Done`. No silent skips.
- Do not claim completion if the gate was skipped or failed. Report which step failed and why.
- More detail: [`docs/verification.md`](docs/verification.md) and the
  [WBS evidence policy](docs/project-management/wbs.md#done-criteria--evidence-policy).

## 7. Binding Phase 1 contracts (decision tables)

These decisions are settled; implement to them, do not re-litigate. See
[`docs/decision-tables/phase-1-contracts.md`](docs/decision-tables/phase-1-contracts.md).

- **Due semantics (DT-1) — local-day:** a card is due when `localDay(due_at) <= localDay(today)`. A card
  due later **today** still counts as due today; a card due tomorrow does not. Eligibility **normalizes
  to local-day** — do **not** compare `due_at <= now` for study/day queries (it would hide
  due-later-today cards). The clock ("today") is **injected/test-controlled**; never hide `Date.now()`
  in business logic. Storage may pre-filter by timestamp, but the local-day rule is the source of truth.
- **Study session (DT-2) — persisted:** sessions are **persisted** via `study_sessions` +
  `study_session_items` (Phase 1 storage contract). Learning progress lives in `cards` + `card_reviews`;
  session progress in the session tables. Start/answer writes are transactional; sessions are resumable;
  lifecycle `active`/`completed`/`cancelled`/`expired`. This needs a migration task (`P1-BE-05`) before
  the Study UI.
- **Starter template (DT-3) — off production path:** see §9.

## 8. Dependency & layering policy

- **`src/features/<A>` must not import another feature `<B>`** (enforced by `check-boundaries.mjs`).
- **`src/shared` must not import `src/features`** (enforced).
- **App routes in `src/app` only compose** screens/feature entries — no heavy business logic.
- **Domain** does not depend on UI/router/storage; **data layer** does not depend on presentation.
- **No new dependency** unless approved by a docs/WBS task. A new **SQLite/storage** dependency needs
  its **own WBS row/task** before code. Details:
  [`docs/architecture/dependency-boundaries.md`](docs/architecture/dependency-boundaries.md).

## 9. Starter template rule (DT-3)

- Expo **starter demo code must not be on the MemoX production path.** It is **removed or replaced** in
  foundation cleanup `F0.1` before real MemoX screens. Scope: `src/components/**`,
  `src/constants/theme.ts`, `src/hooks/**`, `src/app/explore.tsx`, and starter `src/app` demo routes.
- **No feature may import starter demo screens/components.** Shared components are **intentionally
  created** under the documented shared structure (`src/shared/ui`, …), never implicit promotion of
  starter UI.
- If starter files remain temporarily before `F0.1`, they are **marked temporary and blocked from
  feature dependency**.
- Known current drift: `src/app/_layout.tsx` imports starter components — see
  [DRIFT-001](docs/architecture/folder-structure.md#drift-001--app-shell-depends-on-starter-components),
  to be fixed by `F0.1`.

## 10. Documentation-phase guardrails & drift rule

- **Do not implement product feature code** while the project is in the documentation phase.
- Keep docs accurate to the repo. **If docs and source conflict, stop. Do not guess behavior.**
- Report a conflict using this exact format:

  ```
  DRIFT DETECTED
  File code:
  File doc:
  Mismatch:
  Suggested fix:
  ```

- Only fix drift if the task scope allows it.
- **Do not mark a WBS row `Done` while docs / source / test do not match.**
- Record drifts in the
  [drift log](docs/architecture/folder-structure.md#drift-log).
