# Home Wireframe

## Source docs

- [10-navigation-ux.md](../10-navigation-ux.md) — §"Màn hình chính (HOME — `index.tsx`)" (authoritative)
- [navigation.md](../navigation.md)
- [memox-scope.md](../../product/memox-scope.md)
- Decision tables: [DT-1 due semantics (local-day)](../../decision-tables/phase-1-contracts.md)

Source status: **ready** (Home is documented in the navigation spec).

## Purpose

Điểm vào của app: mở lên là biết ngay **hôm nay ôn gì**. Home hiển thị tổng **số thẻ đến hạn hôm
nay** (đệ quy từ gốc) và một **cây deck** để đi sâu vào deck hoặc tạo nội dung mới. Đây là màn
**điều hướng + tổng quan**, **không** trực tiếp đổi trạng thái SRS.

## Entry points

- App launch / root route → Home.
- Return from a finished study session summary → Home.
- Return from Deck Detail / Settings via back.

## Exit points

- Tap a `HOME-DECK-ROW` → **Deck Detail** for that deck scope.
- `HOME-CREATE` (`+`) → create-deck (root) or quick create-card flow.
- (Global) Settings is reached as a pushed screen, per [10-navigation-ux.md](../10-navigation-ux.md);
  it is **not** a Home tab.

## Data dependencies

- **Recursive due total** for "X thẻ đến hạn hôm nay" — local-day due count (DT-1), aggregated from
  the root across all decks. Display-only.
- **Deck tree**: each row = name, **due badge** (local-day due count for that scope), **total card
  count**. Rows are expand/collapse nodes over the deck/folder hierarchy.
- Per-row **progress %** is **not defined by the Home spec** — if shown, it is display-only from the
  read model; **do not invent** a formula.
- Empty state depends only on "root has zero decks".

## Mutation boundaries

- **Opening the screen: read-only.** No deck/card/SRS/session mutation.
- **Expand/collapse a tree node: read-only** — UI state only, never learning data.
- `HOME-CREATE` (`+`): enters a **mutating** create flow (deck or card); no mutation until that flow
  commits.
- Tapping a deck row is **read-only navigation** to Deck Detail.

## Primary layout

```
+------------------------------------------------------+
| HOME-HEADER: MemoX                            [ + ]  |
+------------------------------------------------------+
| HOME-DUE-SUMMARY: "X thẻ đến hạn hôm nay" (recursive)|
+------------------------------------------------------+
| HOME-DECK-TREE                                       |
|  HOME-DECK-ROW: [▸] <name>   [N due]      <total>   |
|     HOME-DECK-ROW (child, indented) ...             |
|  HOME-DECK-ROW: [▾] <name>   [0 due]      <total>   |
+------------------------------------------------------+
| HOME-EMPTY (when no decks): guide to create first    |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `HOME-HEADER` | Header | App title; `HOME-CREATE` (`+`) affordance | loaded | open create |
| `HOME-CREATE` | Header action | Create deck (root) or quick-create card | enabled | open create-deck / create-card flow |
| `HOME-DUE-SUMMARY` | Summary | Total **"X thẻ đến hạn hôm nay"** (recursive from root, local-day DT-1) | loading / loaded / zero-due | — (display-only) |
| `HOME-DECK-TREE` | Tree list | Expand/collapse rows over deck/folder hierarchy | loading / loaded / empty / error | scroll; expand/collapse; open row |
| `HOME-DECK-ROW` | Deck node | name; **due badge**; **total card count**; optional display-only progress | collapsed / expanded / no-due | open row (→ Deck Detail); toggle expand |
| `HOME-EMPTY` | Empty state | Guidance to create the first deck (i18n string) | shown when root has no decks | open create-deck flow |

## States

- `loading` — due total / deck tree loading.
- `loaded` — due summary + deck tree shown.
- `zero-due` — recursive due total is 0; tree still renders (rows show `0 due`).
- `empty` — root has no decks → `HOME-EMPTY` guidance to create the first deck.
- `error` — failed to load due total or deck tree.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Open Home | Load due total + deck tree | read-only | stay |
| Toggle a tree node | Expand/collapse children | read-only (UI) | stay |
| Open a `HOME-DECK-ROW` | Drill into deck scope | read-only | Deck Detail |
| Tap `HOME-CREATE` (`+`) | Start create-deck (root) / quick card | mutating (in that flow) | create flow |
| Empty-state CTA | Start create-deck flow | mutating (in that flow) | create flow |

## Accessibility / content notes

- `HOME-CREATE` and expand/collapse controls must have accessible labels (not icon-only without
  semantics).
- Due badge and total count are **display-only** numbers; never editable here.
- Long deck names truncate with the full value available.

## Design mockup reference & deltas

An interactive design mockup for a Home screen exists in the design kit:
[`ui_kits/memox-app/index.html`](../kit-design/Mx%20Design%20Kit%20—%20MemoX%20v5/ui_kits/memox-app/index.html)
(open in a browser to render).

The mockup is a **visual reference only**. Where it conflicts with the docs, **the docs win** (see
[wireframes README](README.md)). Known deltas between the mockup and the authoritative HOME spec —
**not** adopted here, recorded for design review:

| # | Mockup shows | Authoritative spec | Resolution |
|---|--------------|--------------------|------------|
| 1 | Bottom tab nav (Home / Decks / Stats / More) | Stack routes (`index.tsx` → `deck/[id]` → `study/[deckId]`, `settings.tsx`); **no bottom tabs** | Follow spec IA; bottom-tab nav is a design proposal to be ratified in nav docs before use |
| 2 | Deck **carousel** ("Continue studying") + flat deck **list** ("Your decks") | Expand/collapse **deck tree** | Follow spec (tree) |
| 3 | Top bar has **search** + **notifications bell** | Home affordance is a **`+` create** button | Follow spec (`+` create); search/notifications not documented for Home |
| 4 | Promo banner "Daily goal · Study now" jumps straight into study | Home surfaces the **due total**; study starts from deck → Deck Detail/Study | Follow spec; a Home "Study now" shortcut is undocumented |
| 5 | Tapping a deck opens a Play/action sheet (Learn / Repeat / Review words / game) | Tap deck → **Deck Detail**; Play Menu is reached from Deck Management | Follow spec; Play Menu is not a Home surface |

These deltas are logged so a future decision can either update the design kit to match the spec or
raise a docs change — but until then, **implementation follows the spec**, not the mockup.

## Out of scope

- Pixel/token values, exact route strings, animation, and the mockup's specific visual styling.
- Bottom-tab navigation model (delta #1) — needs a navigation-doc decision first.
- Create/edit/delete deck/card implementation details (separate flows).

## Acceptance criteria

- Opening Home and expanding/collapsing the tree are **read-only**.
- Home shows the recursive **"X thẻ đến hạn hôm nay"** total (local-day, DT-1) and a deck tree with
  per-row due badge + total count.
- `+` opens a create flow; tapping a deck row navigates to **Deck Detail**.
- No placeholder/sample numbers presented as requirements.
- Mockup deltas above are treated as design proposals, not implemented behavior.
