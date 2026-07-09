# Deck Management Wireframe

## Source docs

- [screens/deck-management.md](../screens/deck-management.md) (incl. Sort Menu, Play Menu, Repeat Mode Menu, Subdeck List variant)
- [07-study-modes.md](../07-study-modes.md)
- [06-srs-8box.md](../06-srs-8box.md)
- Decision tables: [play-menu](../../decision-tables/play-menu-decision-table.md), [repeat-mode-menu](../../decision-tables/repeat-mode-menu-decision-table.md)

Source status: **ready** (business fully documented).

## Purpose

Quản lý nội dung học trong một deck/folder cha: xem các deck/section con, quy mô, tiến độ, khối lượng
cần học/ôn; rồi mở deck để đi sâu hoặc bắt đầu học. Đây là màn **điều hướng + quản lý + khởi động học**,
**không** trực tiếp đổi trạng thái SRS.

## Entry points

- From Home / deck tree → open Deck Management for a deck/folder scope.
- From a parent Deck Management row → drill down to a child deck (recursive).
- From Settings / More Hub is **not** a path here (that opens system functions).

## Exit points

- Open a deck/subdeck row → Deck Management for the child scope.
- `DM-PLAY-BUTTON` on a row → **Play Menu** (scoped to that deck/subdeck).
- Add deck/section, Add card → their respective create flows.
- Open a card / Flashcard List → **Flashcard List** for the scope.

## Data dependencies

- Direct child decks/sections of the current scope (name, content count).
- Per-row **learning-progress indicator** (display-only; formula not defined → read model).
- Per-row **due/review workload indicator** (local-day due count, DT-1) — display-only.
- Current **study direction** display (e.g. `KO → VI`) — read-only (default term→meaning).
- Counts are per current scope; the list's search/filter does not change Play Menu counts.

## Mutation boundaries

- **Opening the screen: read-only.** No deck/card/SRS/session mutation.
- **Sort / search / filter: read-only** — changes display order/visibility only, never learning data.
- `DM-PLAY-BUTTON`: opens Play Menu (no mutation until a mode is chosen).
- **Add / edit / delete deck/section/card**: separate explicit flows (mutating), not triggered by browsing.

## Primary layout

```
+------------------------------------------------------+
| DM-HEADER: [back]  <current deck/folder name>  [⋯]   |
+------------------------------------------------------+
| DM-CONTROL-BAR: [search/filter]  dir: KO→VI  [sort]  |
+------------------------------------------------------+
| DM-DECK-LIST                                         |
|  DM-ROW: <name>  <count>  [progress]  [due?] [▶play] |
|  DM-ROW: ...                                         |
+------------------------------------------------------+
| DM-BOTTOM: [+ Deck/Section]        [+ Card]          |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `DM-HEADER` | Header | Back/nav context; current deck/folder title (truncate if long); optional overflow menu (`⋯`) for scope-level actions if product scope has them | loaded | back; open overflow |
| `DM-CONTROL-BAR` | Control area | Search/filter input; **study-direction display** (`KO → VI`, read-only); sort action | loaded / filtering | search; open `DM-SORT-MENU` |
| `DM-DECK-LIST` | List | Rows of direct child decks/sections | loading / loaded / empty / search-empty / error | scroll; open row |
| `DM-ROW` | Deck/subdeck row | name; word/card **count**; **progress %** (display-only); **due/workload** indicator if any; `DM-PLAY-BUTTON` | — | open row (drill down); `DM-PLAY-BUTTON` |
| `DM-PLAY-BUTTON` | Row action | Play/start | enabled / disabled (no studyable content) | open **Play Menu** |
| `DM-SORT-MENU` | Sort menu | 6 options (below) | closed / open | select option |
| `DM-BOTTOM` | Bottom actions | Add deck/section; Add card | — | create-deck flow; create-card flow |

### `DM-SORT-MENU` options

| Option | Order |
|--------|-------|
| Bảng chữ cái A → Z | title asc |
| Bảng chữ cái Z → A | title desc |
| Ngày tạo mới nhất | created desc |
| Ngày tạo cũ nhất | created asc |
| Học gần đây | most-recently-studied desc (never-studied last) |
| Lâu chưa học | most-recently-studied asc (never-studied first) |

Sorting **changes display order only** — never learning data. Ties break stably by title/created date.

## States

- `loading` — deck list loading.
- `loaded` — child decks/sections shown.
- `empty` — scope has no child decks/sections → guidance to create.
- `search/filter empty` — data exists but none match.
- `error` — failed to load list.
- `no due (read-only)` — a scope with `reviewDueCount = 0` still shows rows + progress; Play Menu handles no-due.
- `no studyable content` — a row's `DM-PLAY-BUTTON` disabled / notified.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Open a `DM-ROW` | Drill into child scope | read-only | Deck Management (child scope) |
| Tap `DM-PLAY-BUTTON` | Open Play Menu for that scope | read-only (until a mode chosen) | Play Menu |
| Change sort/search/filter | Re-order/filter list | read-only | stay |
| Tap Add deck/section | Start create-deck/section flow | mutating (in that flow) | create flow |
| Tap Add card | Start create-card flow | mutating (in that flow) | create flow |

## Accessibility / content notes

- `DM-PLAY-BUTTON` must have an accessible label (not icon-only without semantics).
- Long deck/folder names truncate with full value available (tooltip/expand).
- Progress % and due indicators are **display-only** numbers; never editable here.

## Open questions

- Exact **progress %** formula — not defined (read model; do not invent).
- Due/workload badge semantics defer to SRS local-day docs (DT-1) — display only.
- Speaker/edit/hidden-suspended row icons — not decided (see deck-management Open questions).

## Out of scope

- Pixel/token values, exact route strings, animation.
- Add/edit/delete/move implementation details (separate flows).
- Direction picker (direction display is read-only; switching is out of scope).

## Acceptance criteria

- Opening the screen and sort/search/filter are **read-only**.
- Each row shows name, count, display-only progress, and a Play action; play opens **Play Menu**.
- Counts/indicators are per current scope and unaffected by list search/filter.
- No placeholder numbers presented as requirements.
