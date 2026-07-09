# Phase 1 Decision Tables

Small, authoritative decision tables that remove ambiguity before Phase 1 implementation.

Each decision is **binding**: implementation must follow the chosen rule, and other docs point here.
If code and these tables disagree, treat it as drift — stop and flag it using the
[drift format](../architecture/folder-structure.md#drift-log). Do not keep ambiguity.

> **Revision note (supersedes prior decisions).**
> An earlier revision chose the opposite on all three points below (absolute-instant due, ephemeral
> sessions, "keep starter until replaced"). Those are **superseded** by the decisions here, which are
> the best defaults for a local-first SRS app. Each table records what it replaced. See also
> [`study-srs-decision-table.md`](study-srs-decision-table.md).

---

## DT-1 — Due-date semantics (local-day)

**Decision: a card is due when its due local-day is on or before today's local-day on the device.**

| Rule | Value |
|------|-------|
| Chosen model | **Local-day** eligibility |
| Superseded | Absolute-instant `due_at <= now` |
| Due predicate (source of truth) | `localDay(due_at) <= localDay(today)` on the device |
| Card due later **today** | **Is** due today (not hidden until its exact timestamp) |
| Card due **tomorrow** | **Not** due today |
| Card due **yesterday or earlier** | Always due |
| New cards (`due_at IS NULL`) | Not counted as due — separate "new" bucket, gated by new-cards-per-day |

### Rules that implementation must follow

- `due_at` may be stored as **epoch milliseconds or ISO timestamp**, but eligibility must
  **normalize to local-day** before comparing. The stored instant is not compared directly.
- Do **not** use a raw `due_at <= now` comparison for study/day queries if that would hide a card
  whose `due_at` is later **today** — such a card must still appear as due today.
- The clock must be **injected or test-controlled** in domain / use-case / query logic.
- Do **not** hide `Date.now()` inside hard-to-test business logic. "Today" is passed in.
- A storage query **may** pre-filter by timestamp for performance (e.g. `due_at < startOfTomorrow`),
  but the **domain/use-case local-day rule is the source of truth** and must be re-applied.

### Decision table row

| Condition | Result | Applies to |
|-----------|--------|-----------|
| `due local day <= today local day` | card is **due** | today session, dashboard due count, study eligibility, progress due count |

### Applies uniformly to

- Today session
- Dashboard due count
- Study eligibility query
- Progress / statistics due count
- Any future review-queue query

These surfaces must all use the **same** local-day rule so their counts never disagree.

---

## DT-2 — Study session persistence (persisted)

**Decision: study sessions are persisted. Phase 1's storage contract includes `study_sessions` and
`study_session_items`.**

| Rule | Value |
|------|-------|
| Chosen model | **Persisted** session (`study_sessions` + `study_session_items`) |
| Superseded | Ephemeral session (no session tables) |
| Durable learning progress | `cards` + `card_reviews` |
| Durable session progress | `study_sessions` + `study_session_items` |
| Session lifecycle status | `active`, `completed`, `cancelled`, `expired` (add `failed_to_finalize` if needed) |

### Required behavior

- **Start:** create the `study_sessions` row **and** its `study_session_items` rows in **one
  transaction**. If the transaction fails, leave **no** partial session/items.
- **Items:** `study_session_items` stores the card list for the session, a **stable study order**, and
  enough per-item state to **resume at the correct position**.
- **Answer / grade:** each attempt persists durably — the review to `card_reviews` (+ current SRS state
  on `cards`) and the item's progress on `study_session_items`.
- **Resume:** a session can be resumed after the app is closed or crashes; the most recent **active**
  session (not expired/cancelled/completed) is resumable.
- **Finish:** finishing moves the session to `completed`/finalized per this lifecycle. If finalize
  fails, the session must **not** be wrongly marked `completed`.
- **No duplicate active session:** if an active session exists for the same scope, do not silently
  create a second active session for that scope.
- **Read-only views:** dashboard / resume summary reads must **not** mutate the session.

### Why persisted

A local-first SRS app benefits from durable, resumable sessions (crash-safe resume, stable ordering,
session-level history). This requires a dedicated storage/migration task **before** the Study UI — see
WBS `P1-BE-05` (session persistence schema). This is a Phase 1 backend requirement, not optional.

---

## DT-3 — Expo starter template handling (not on production path)

**Decision: Expo starter demo files must not be on the MemoX production path. They are removed or
replaced in a foundation-cleanup task before real MemoX screens are implemented.**

| Rule | Value |
|------|-------|
| Chosen policy | Starter demo code **off** the production path |
| Superseded | "Keep starter until replaced" (allowed shell to depend on it) |
| Scope of starter files | `src/components/**`, `src/constants/theme.ts`, `src/hooks/**`, `src/app/explore.tsx`, starter `src/app` demo routes |
| Hard rule | **No feature** may import starter demo screens/components |
| Shared components | Must be **intentionally created** under the documented shared structure (`src/shared/ui`, …), never implicit promotion of starter UI |
| Temporary tolerance | Starter files may remain **temporarily** pre-Phase-1, but must be **marked temporary and blocked from feature dependency**, and removed/replaced in the cleanup task |

### Cleanup requirement

- `src/app` starter demo routes must be **removed or replaced** before real MemoX screen work.
- `src/components` starter UI must **not** be implicitly promoted into MemoX shared components.
- Tracked as WBS `F0.1` (Remove or replace Expo starter demo path) — a foundation row that lands
  **before** Phase 1 feature rows.

### Current drift (must be resolved by F0.1)

The live app shell `src/app/_layout.tsx` imports starter components (`app-tabs`, `animated-icon`),
so the current production path **does** depend on starter code — a violation of this rule to be fixed
by `F0.1`. Recorded as [DRIFT-001](../architecture/folder-structure.md#drift-001--app-shell-depends-on-starter-components).
Source is not changed in the docs-only hardening task.
