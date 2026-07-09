# Flashcard List / Subdeck List Wireframe

## Source docs

- [screens/flashcard-list.md](../screens/flashcard-list.md)
- [screens/deck-management.md](../screens/deck-management.md) (Subdeck List variant; `screens/subdeck-list.md` is **not present** — Subdeck List is documented as a variant of Deck Management)
- Review Words / browse references: [07-study-modes.md](../07-study-modes.md), [deck-management.md](../screens/deck-management.md)

Source status: **ready** for Flashcard List; **partial** for a standalone Subdeck List (covered as a Deck Management variant — no separate `subdeck-list.md`).

## Purpose

Duyệt và quản lý các flashcard trong một deck/section (Flashcard List), và duyệt các section/subdeck con
(Subdeck List variant). Xem nhanh front/back theo hướng học hiện tại; tìm/lọc/sắp xếp; mở card để
xem/sửa; thêm card. Đây là màn **quản lý nội dung**, **không** phải study session.

## Entry points

- From Deck Management → open Flashcard List for a deck/section scope.
- From Play Menu → **Xem lại các từ** opens browse (see [Review Words wireframe](review-words-wireframe.md)).

## Exit points

- Tap a card row → card detail / edit entry.
- Add card → create-card flow.
- Subdeck List variant: `FL-SUB-ROW` `▶` → **Play Menu** scoped to that subdeck.

## Data dependencies

- Flashcard List: cards in the current scope — `term` (front) + `meaning` (back) + optional `note`, in
  the current study direction; optional per-card box/status **display-only** if docs define an indicator.
- Subdeck List variant: child sections/subdecks — name, card count, **due count badge** (local-day),
  **progress %** (display-only).

## Mutation boundaries

- **List browsing: read-only.** Does **not** activate SRS, does **not** create a session.
- Edit / add / delete card: separate explicit (mutating) actions, not triggered by browsing.
- Subdeck `▶` opens Play Menu (no mutation until a mode is chosen).

## Primary layout

Flashcard List:
```
+------------------------------------------------------+
| FL-HEADER: [back]  <deck/section name>          [⋯]  |
+------------------------------------------------------+
| FL-CONTROL: [search/filter]  count?  dir: KO→VI [sort]|
+------------------------------------------------------+
| FL-CARD-LIST                                         |
|  FL-CARD-ROW: <front>  |  <back/meaning>  [status?]  |
|  ...                                                 |
+------------------------------------------------------+
| FL-BOTTOM: [+ Card]                                  |
+------------------------------------------------------+
```

Subdeck List variant:
```
| FL-SUBDECK-LIST                                      |
|  FL-SUB-ROW: <section name>  <count>  [due] [prog] ▶ |
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `FL-HEADER` | Header | Back; deck/section name (truncate); optional overflow | loaded | back |
| `FL-CONTROL` | Control | Search/filter; result/total count (sample only — from read model); study-direction display; sort | loaded / filtering | search; sort |
| `FL-CARD-LIST` | List | Card rows | loading / loaded / empty / search-empty / error | scroll; open row |
| `FL-CARD-ROW` | Card row | front; back/meaning; optional per-card **status/box** (display-only); optional audio if supported | — | open detail/edit |
| `FL-SUBDECK-LIST` | Subdeck variant list | section/subdeck rows | loading / loaded / empty / error | scroll; open row |
| `FL-SUB-ROW` | Subdeck row | name; card count; **due badge**; **progress %** (display-only); `▶` | — | open (drill down); `▶` → Play Menu |
| `FL-BOTTOM` | Bottom | Add card | — | create-card flow |

## States

- `loading`, `loaded`, `empty scope` (+ CTA to add card), `search/filter empty`, `error`,
  `card list unavailable` (invalid scope), `creating new card entry point`.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Tap `FL-CARD-ROW` | Open card detail/edit | read-only (edit is a separate action) | Card detail/edit |
| Add card | Create card **in current scope** (even under active search/filter) | mutating (in flow) | create-card flow |
| Search / filter / sort | Change display only | read-only | stay |
| Tap `FL-SUB-ROW` `▶` | Open Play Menu scoped to subdeck | read-only | Play Menu |

## Accessibility / content notes

- Card rows must show enough (front + back) to identify content; long content wraps/truncates with full value accessible.
- Audio / status icons need labels (no icon-only critical action).
- Optional per-card box/status is **display-only**, never editable in the list.

## Open questions

- Whether a per-card **box/status indicator** is shown, and its meaning — not decided (flashcard-list Open questions).
- A dedicated `subdeck-list.md` spec does not exist; Subdeck List is a Deck Management variant.

## Out of scope

- Pixel/token, routes, animation.
- Card detail/edit UI internals; add/delete implementation.
- Direction picker (display only).

## Acceptance criteria

- Browsing the list is **read-only**; never activates SRS or creates a session.
- Add card creates into the **current scope**, not a virtual search result.
- Subdeck `▶` opens Play Menu; drilling opens the child scope.
