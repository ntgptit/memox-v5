# Study & SRS Decision Table

Focused, quick-reference decision table for study eligibility and SRS due semantics. The full binding
decisions (with rationale and required behaviors) live in
[`phase-1-contracts.md`](phase-1-contracts.md).

## Due eligibility (local-day)

| Condition | Result | Applies to |
|-----------|--------|-----------|
| `due local day <= today local day` | card is **due** | today session, dashboard due count, study eligibility, progress due count |
| `due local day == today` but timestamp later today | card is **due today** | same as above |
| `due local day > today` (e.g. tomorrow) | **not** due today | same as above |
| `due local day < today` (yesterday or earlier) | **due** (overdue) | same as above |
| `due_at IS NULL` (new card) | **not** due; enters via new-cards-per-day allowance | today session intake |

Notes:

- Eligibility normalizes `due_at` to **local-day** before comparing — never a raw `due_at <= now`.
- The clock ("today") is **injected / test-controlled**; no hidden `Date.now()` in business logic.
- Storage may pre-filter by timestamp for performance, but the **local-day rule is the source of
  truth** and is re-applied in the domain/use-case.

See [DT-1](phase-1-contracts.md#dt-1--due-date-semantics-local-day).

## SRS box update (8-box Leitner)

| Grade | Box change |
|-------|-----------|
| `correct` | `box' = min(box + 1, 8)` |
| `wrong` + `lapseRule = reset` | `box' = 1` |
| `wrong` + `lapseRule = stepDown` | `box' = max(box - 1, 1)` |

After update: `last_reviewed_at = now`, `due_at = now + intervals[box'-1] * 1 day`. See
[`../design/06-srs-8box.md`](../design/06-srs-8box.md).

## Session persistence (persisted)

| Aspect | Rule |
|--------|------|
| Session tables | `study_sessions` + `study_session_items` (Phase 1 storage contract) |
| Durable learning progress | `cards` + `card_reviews` |
| Durable session progress | `study_sessions` + `study_session_items` |
| Lifecycle | `active` → `completed` / `cancelled` / `expired` (`failed_to_finalize` if needed) |

See [DT-2](phase-1-contracts.md#dt-2--study-session-persistence-persisted).
