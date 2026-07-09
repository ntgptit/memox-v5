# Session Result Wireframe

## Source docs

- [screens/session-result.md](../screens/session-result.md)
- [session-result-decision-table.md](../../decision-tables/session-result-decision-table.md)
- [07-study-modes.md](../07-study-modes.md#session-result-cuối-phiên), [06-srs-8box.md](../06-srs-8box.md)

Source status: **ready**.

## Purpose

Thống kê **phiên vừa hoàn thành** (New Learning hoặc SRS Repeat). **Không** thay thế Statistics dài hạn.
Chỉ hiển thị khi session **finalize thành công**.

## Entry points

- After a **finalized** New Learning session → New Learning Result.
- After a **finalized** SRS Repeat session → SRS Repeat Result.

## Exit points

- **Done** → back to deck / previous scope.
- **Study more** → New Learning Flow (if new cards remain).
- **Repeat more** → Repeat Mode Menu (if due cards remain).
- **Go to Statistics** → Statistics (if docs allow) — CTA, does not replace it.

## Data dependencies

- **Finalized** session/attempt summary (DT-2 `study_sessions`/`study_session_items` + `card_reviews`).
- New Learning metrics or SRS Repeat metrics per `session type`. **No placeholder data**; from read model.

## Mutation boundaries

- **Read-only.** Opening/reading the summary does **not** mutate learning data.
- **Does not** activate cards (activation happens in the flow's fill gate).
- SRS box/due changes must be **finalized before** this screen shows them.

## Primary layout

```
+------------------------------------------------------+
| SR-HEADER:  Kết thúc phiên   ( New Learning | SRS )  |
+------------------------------------------------------+
| SR-METRICS: <session-type-specific metrics>          |
| SR-CHART?:  (optional per docs)                       |
+------------------------------------------------------+
| SR-ACTIONS: [Done] [Study more?] [Repeat more?] [Stats?]|
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `SR-HEADER` | Header | title + session type (New Learning / SRS Repeat) | loaded | — |
| `SR-METRICS-NL` | New Learning metrics | new cards learned; completed all 5 modes; **activated into Box 1**; not-activated (if any); per-mode failure counts (match/guess/recall/fill) if available; duration | loaded | — |
| `SR-METRICS-SRS` | SRS Repeat metrics | reviewed; remembered/correct; forgotten/wrong; promoted/demoted/lapsed (if docs define); remaining due (if batch-limited); duration | loaded | — |
| `SR-ACTIONS` | Actions | Done; Study more (if new remain); Repeat more (if due remain); Go to Statistics (if allowed) | loaded | navigate |
| `SR-FINALIZE-FAILED` | Failure | not a completed Result | on finalize error | retry/back |

## States

- `loaded` — finalized summary shown.
- `finalize failed` — do **not** show a completed Result.
- `empty/invalid session` — a zero-valid-item session must **not** show a successful Result.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Open (after finalize) | Show summary | **read-only** | this screen |
| Done | Leave | read-only | back to deck/scope |
| Study more | Start New Learning | starts session | New Learning Flow |
| Repeat more | Open Repeat Mode Menu | read-only until mode chosen | Repeat Mode Menu |
| Go to Statistics | Open long-term stats | read-only | Statistics |

## Accessibility / content notes

- Metrics labeled clearly; New Learning vs SRS Repeat visibly distinguished.
- Numbers are from the read model — not editable.

## Open questions

- Whether a `SR-CHART` is shown — session-result spec leaves it optional.
- Exact promoted/demoted labeling — depends on SRS docs finalization detail.

## Out of scope

- Pixel/token, routes, animation, aggregate score formula.
- Long-term history (that is Statistics).

## Acceptance criteria

- Appears **only** after a finalized session; **not** on finalize failure or empty/invalid session.
- New Learning Result shows **activated / not-activated Box 1** concepts; SRS Repeat Result shows
  **reviewed / remembered / forgotten**.
- **Separate from Statistics**; may CTA to it but does not replace it.
- Read-only — never mutates learning data.
