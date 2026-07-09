# Phase 1 Decision Tables

Small, authoritative decision tables that remove ambiguity before Phase 1 implementation.

Each decision is **binding**: implementation must follow the chosen rule, and other docs point here.
If code and these tables disagree, treat it as drift — stop and flag it (see
[`../architecture/folder-structure.md`](../architecture/folder-structure.md#drift-log)).

---

## DT-1 — Due-date semantics

**Decision: Option A — a card is due when `due_at <= now`.**

`now` is an absolute instant (epoch milliseconds). "Due" is evaluated at query time, not against a
calendar-day window.

| Rule | Value |
|------|-------|
| Chosen option | **A** (`due_at <= now`) |
| Rejected option | B (local-day window) |
| Due predicate | `deleted_at IS NULL AND due_at IS NOT NULL AND due_at <= now` |
| New cards (`due_at IS NULL`) | **Not** counted as due — separate "new" bucket |
| New-card gating | Per-day limit via `new_seen_on` (local calendar day) — the **only** place local-day is used |
| Local timezone role | Only for the new-card-per-day counter; **never** for the due predicate |

### Why Option A

The SRS engine already defines `isDue(card, now) = due_at != null && due_at <= now`, and the study
selection query already uses `due_at <= now` (see [`../design/06-srs-8box.md`](../design/06-srs-8box.md)).
Option A keeps a single, testable definition and avoids DST/timezone edge cases. Local-day logic is
confined to the new-card counter, which is a separate concept from "due".

### Impact — every surface uses the same predicate

| Surface | Definition |
|---------|-----------|
| Today session | Session intake = due cards (`due_at <= now`) **plus** up to the remaining new-card allowance for the local day. "Today" means "due as of now", not a calendar window. |
| Dashboard due count | `COUNT` of scoped cards where `due_at <= now`, evaluated at render time. Excludes new cards (may be shown separately as "new available"). |
| Study eligibility query | `WHERE deleted_at IS NULL AND deck_id IN (<scope>) AND due_at IS NOT NULL AND due_at <= now` ordered by `due_at ASC`. |
| Progress / statistics due count | Same `due_at <= now` predicate, so dashboard and statistics never disagree. Historical counts (reviews done) come from `card_reviews`, not from the due predicate. |

---

## DT-2 — Study session persistence

**Decision: Option B — a study session is ephemeral UI/domain state. Durable learning progress lives
only in `cards` and `card_reviews`.**

Phase 1 does **not** add `study_sessions` or `study_session_items` tables.

| Rule | Value |
|------|-------|
| Chosen option | **B** (ephemeral session) |
| Rejected option | A (persisted `study_sessions` + `study_session_items`) |
| Session state location | In-memory (Zustand store in `study-session` feature) |
| Durable data | `cards` (`box`, `due_at`, `last_reviewed_at`, `new_seen_on`) + `card_reviews` (one immutable row per graded answer) |
| Persistence granularity | **Per answered card**, committed immediately in one transaction |

### Behavior contract

| Event | Behavior |
|-------|----------|
| Answer a card | Immediately persist in one transaction: update `cards` (box/due_at/last_reviewed_at, and `new_seen_on` on first exposure) **and** insert a `card_reviews` row. |
| Finish session | Show end-of-session summary computed from the just-persisted results. No extra "session" record is written. |
| Resume | There is **no** cross-launch "resume the same session" feature in Phase 1. Reopening simply rebuilds a fresh eligible list (due + new allowance). Cards already answered are no longer due, so they naturally drop out. |
| Crash / force-quit mid-session | Every answer already committed is durable. Only the in-flight unanswered card and transient session UI (progress bar, ordering) are lost. No partial/corrupt state. |
| Answered attempts stored where | `card_reviews` (history) + the updated current SRS state on `cards`. |

### Why Option B

The Phase 1 data model has exactly four tables (`decks`, `cards`, `card_reviews`, `app_meta`) and no
session tables. Per-answer persistence already makes progress durable and crash-safe, so session
tables would add complexity with no Phase 1 benefit. Persisted sessions (resume an exact session,
session analytics) are a possible later enhancement, explicitly **out of scope** for Phase 1.

---

## DT-3 — Expo starter template handling

**Decision: keep starter template files until they are explicitly replaced/promoted.**

| Rule | Value |
|------|-------|
| Chosen option | **Kept until replaced** |
| Rejected options | "Delete before Phase 1"; "temporary reference only" (too weak — the app shell currently depends on them) |
| Scope of starter files | `src/components/**`, `src/constants/theme.ts`, `src/hooks/**`, `src/app/explore.tsx` |
| Hard rule | Feature implementation **must not** depend on starter demo screens/components **unless** they are explicitly promoted into shared MemoX components (`src/shared/ui`, etc.). |
| Current reality | The app shell (`src/app/_layout.tsx`) currently imports starter components (`app-tabs`, `animated-icon`). This is acknowledged drift — see [folder-structure drift log](../architecture/folder-structure.md#drift-log). |

Rationale and the promotion/replacement rule live in
[`../architecture/folder-structure.md`](../architecture/folder-structure.md#expo-starter-template).
