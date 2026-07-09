# Statistics Decision Table

Quick-reference rules for the long-term **Statistics** screen. Authoritative spec:
[`../design/screens/statistics.md`](../design/screens/statistics.md).

## Entry & tabs

| Action | Result |
|--------|--------|
| user taps **Thống kê** (in Settings / More Hub) | open **Statistics** screen |
| default scope is **Tất cả** | aggregate **all local learning data** in scope |
| user selects tab **Từ** | show **word/card** metrics and chart |
| user selects tab **Thời gian** | show **learning/repeat time** metrics and chart |
| user selects tab **Chất lượng** | show **correct/wrong** and **quality** metrics |
| **no data** for selected scope | show **empty state** (no fake/placeholder numbers) |

## Data & boundaries

| Condition | Result |
|-----------|--------|
| Statistics screen opened | **no learning-data mutation** (read finalized history only) |
| Session Result completed | may **contribute finalized data** to Statistics |
| **Review Words / browse only** | does **not** create learning/repeat metrics |
| `reviewMode` (no evaluation) | **not** counted as a correct answer |
| SRS quality metrics | use only **Box 1+ reviewed** cards from Repeat Flow |
| aggregation formula **not defined** | leave metric as a **documented concept**; **do not invent** |

## Boundaries vs. other screens

- **Statistics** = long-term (many sessions/days). **Session Result** = just-finished session.
  **Activity summary** = quick today view. Dashboard/Home may show part of it but does not replace it.
- Statistics never schedules SRS, changes box, or changes due date (see
  [06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1)).

## Notes

- Drawer is **not** required; Statistics is reachable from Settings / More Hub (or a Progress tab / modern entry).
- Chart library, route name, color token, date-range picker, exact aggregation SQL/schema, export, and
  cloud analytics are **not** decided here.
