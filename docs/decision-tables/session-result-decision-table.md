# Session Result Decision Table

Quick-reference rules for the **Session Result** screen after New Learning Flow / SRS Repeat Flow.
Authoritative spec: [`../design/screens/session-result.md`](../design/screens/session-result.md).
Related: [07-study-modes → Session Result](../design/07-study-modes.md#session-result-cuối-phiên),
[06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1),
[DT-2 session persistence](phase-1-contracts.md#dt-2--study-session-persistence-persisted).

## When to show / not show

| Condition | Result |
|-----------|--------|
| **New Learning Flow** finalized successfully | show **New Learning Result** |
| **SRS Repeat Flow** finalized successfully | show **SRS Repeat Result** |
| session **finalize failed** | do **not** show completed Result |
| session has **zero valid items** | do **not** create a successful Result |
| browse **"Xem lại các từ"** completed | do **not** show a study Result (unless docs define a browse result) |
| user exits **without finalize** | do **not** show completed Result |

## Counting rules

| Condition | Result |
|-----------|--------|
| card completed **all five** learning modes | count as **activated into Box 1** |
| card **not** completed all five learning modes | count as **not activated** |
| SRS Repeat reviewed a **Box 1+ due** card | include in **repeat result** metrics |
| card is **not** Box 1+ / not due | **not** an SRS Repeat metric |

## Result behavior

| Action | Result |
|--------|--------|
| Result opened | **do not mutate** learning data — read the **finalized** summary only |
| Result shown | **do not** activate cards or schedule SRS beyond what the flow already finalized |

## Notes

- Session Result reflects **only the just-finished session**; it does **not** replace
  **Dashboard/Progress** (long-term).
- New Learning **activation** happens in the flow (fillMode gate), **not** on the Result screen.
- SRS box **promotion/demotion/reset** must be **finalized before** the Result is shown.
- Aggregate **score formula**, exact metrics UI, route name, and the official CTA list are **not**
  decided here (see the spec's [Open questions](../design/screens/session-result.md#open-questions--cố-ý-không-chốt)).
