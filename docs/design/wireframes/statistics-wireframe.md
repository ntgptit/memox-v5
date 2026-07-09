# Statistics Wireframe

## Source docs

- [screens/statistics.md](../screens/statistics.md)
- [statistics-decision-table.md](../../decision-tables/statistics-decision-table.md)

Source status: **ready** (aggregation formulas deferred to read model per docs).

## Purpose

Thống kê học **dài hạn** (nhiều phiên, nhiều ngày). **Không** phải Session Result. Read-only.

## Entry points

- **Settings / More Hub → Thống kê**, or a Progress entry.

## Exit points

- Back → Settings / More Hub (or entry point).

## Data dependencies

- Finalized learning/review history (DT-2 sessions + `card_reviews`), aggregated by scope + tab.
- Scope filter (default **Tất cả**). **No placeholder data.**

## Mutation boundaries

- **Read-only.** Opening Statistics never mutates learning data; never schedules SRS / changes box/due.

## Primary layout

```
+------------------------------------------------------+
| ST-HEADER: [back]  Thống kê        [scope: Tất cả ▾] |
+------------------------------------------------------+
| ST-TABS:  [ Từ ] [ Thời gian ] [ Chất lượng ]        |
+------------------------------------------------------+
| ST-METRICS: <tab-specific metric groups>             |
| ST-CHART:   <trend by date for current tab>          |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `ST-HEADER` | Header | back; title; `ST-SCOPE` filter (default **Tất cả**; language/deck/section/time-range **future**) | loaded | change scope |
| `ST-TABS` | Tabs | Từ / Thời gian / Chất lượng | loaded | switch tab |
| `ST-TAB-WORDS` | Tab Từ | Đang học; Đã học; Đã lặp lại; Tổng số từ; Tổng số danh mục | loaded / no-data | — |
| `ST-TAB-TIME` | Tab Thời gian | Thời gian học; Thời gian lặp lại; Tổng thời gian | loaded / no-data | — |
| `ST-TAB-QUALITY` | Tab Chất lượng | Câu trả lời đúng; Câu trả lời sai; Chất lượng học tập; Chất lượng lặp lại | loaded / no-data | — |
| `ST-CHART` | Chart | trend by **date** (x-axis); series depend on tab (Từ: Đang học/Đã học/Đã lặp lại; Thời gian: Học/Lặp lại/Tổng; Chất lượng: Đúng/Sai) | loaded / no-data | — |

## States

- `loading` / `loaded` / `no data` (friendly empty state, **no fake numbers**) /
  `selected scope has no data` / `selected time range has no data` (future) / `error`.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Open Statistics | Show aggregated stats | **read-only** | this screen |
| Switch tab (Từ/Thời gian/Chất lượng) | Show that tab's metrics + chart | read-only | stay |
| Change scope | Re-aggregate for scope | read-only | stay |

## Accessibility / content notes

- Chart must have a non-visual equivalent (data labels/table) where feasible.
- Metric labels are the documented Vietnamese terms; no icon-only critical content.

## Open questions

- **Aggregation formulas** (Đang học / Đã học / Đã lặp lại / quality ratios / time sums) — **read
  model / future; do not invent.**
- "Tổng số danh mục" = deck/section count concept — read model.
- Chart library / date-range picker — not decided.

## Out of scope

- Pixel/token, routes, animation, chart library, export, cloud analytics.
- Session Result (short-term) and Activity summary (today) are separate.

## Acceptance criteria

- **Long-term** and **read-only**; distinct from Session Result and Activity summary.
- Three tabs: **Từ / Thời gian / Chất lượng**, each with the documented metric groups + a per-date chart.
- Default scope **Tất cả**; no placeholder data; undefined formulas left as read-model/future.
