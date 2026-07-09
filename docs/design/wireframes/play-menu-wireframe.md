# Play Menu Wireframe

## Source docs

- [screens/deck-management.md](../screens/deck-management.md) (Play Menu)
- [07-study-modes.md](../07-study-modes.md)
- [06-srs-8box.md](../06-srs-8box.md)
- Decision table: [play-menu](../../decision-tables/play-menu-decision-table.md)

Source status: **ready** (game/player modes are Future per docs).

## Purpose

Sau khi bấm Play/Start trên một deck/subdeck row, mở Play Menu để user **chọn cách học** trong scope
hiện tại. Nội dung menu **phụ thuộc trạng thái học** (new vs. due vs. progress).

## Entry points

- `DM-PLAY-BUTTON` (Deck Management row) or `FL-SUB-ROW ▶` (Subdeck List) → Play Menu (scoped).

## Exit points

- **Học** → New Learning Flow (see [new-learning-flow wireframe](new-learning-flow-wireframe.md)).
- **Lặp lại** → **Repeat Mode Menu** (see [srs-repeat-flow wireframe](srs-repeat-flow-wireframe.md)).
- **Xem lại các từ** → Review Words browse (see [review-words wireframe](review-words-wireframe.md)).
- **Một trò chơi** → game mode (**Future**). **Trình phát** → player/listening (**Future**).

## Data dependencies

- `newCount` — new/pre-SRS eligible cards (Box 0 / `due_at` null) in scope.
- `reviewDueCount` — SRS-active (Box 1+) cards **due now** (local-day, DT-1) in scope.
- `progress` — scope learning progress (`> 0%` ⇔ ≥1 SRS-active card); formula not defined.
- Counts are per current scope; the deck list's search/filter does **not** change them.

## Mutation boundaries

- **Opening the menu: read-only.** No learning-data mutation.
- A flow starts (and may mutate) **only after** the user selects a mode.
- Numbers shown are counts from the read model — not editable here.

## Primary layout

```
+---------------------------- Play Menu ---------------+
| PM-LEARN     Học            <newCount> từ mới        |
| PM-REPEAT    Lặp lại        Lặp lại <reviewDueCount> |   (Variant B only)
| PM-REVIEW    Xem lại các từ                          |
| PM-GAME      Một trò chơi   <workload>      (Future) |
| PM-PLAYER    Trình phát                     (Future) |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | Shown when | Action |
|----|------|---------|-----------|--------|
| `PM-LEARN` | New Learning entry | label + `newCount` (e.g. `120 từ mới` — sample only) | `newCount > 0` | start **New Learning Flow** |
| `PM-REPEAT` | SRS Repeat entry | label + `reviewDueCount` (or `0`/no-due state) | `progress > 0%` | open **Repeat Mode Menu** |
| `PM-REVIEW` | Browse entry | label | scope has cards | open **Review Words** (browse, read-only) |
| `PM-GAME` | Game entry | label + available workload | scope has content; **Future** | open game mode (Future) |
| `PM-PLAYER` | Player entry | label | product allows; **Future** | open player mode (Future) |
| `PM-BOTTOM` | Below-modal actions | refresh/reload and/or destructive action **only if docs define** | — | (not defined → omit) |

- `PM-GAME` label reflects available workload: `120 từ mới` / `Lặp lại 83 từ` / `Lặp lại 83 từ, 563 từ mới`
  (samples only; actual from read model).

## States

- `variant A` — `progress = 0%` (no SRS-active) → show `PM-LEARN` (if `newCount>0`), `PM-REVIEW`,
  `PM-GAME`/`PM-PLAYER` (if in scope); **hide `PM-REPEAT`**.
- `variant B` — `progress > 0%` → show `PM-REPEAT` (count may be `0`).
- `deck has new + due` — both `PM-LEARN` and `PM-REPEAT` shown.
- `deck has new only` — `PM-REPEAT` hidden (variant A) or shown with 0 due depending on progress.
- `deck has due only` — `PM-LEARN` hidden (`newCount=0`), `PM-REPEAT` shown.
- `no eligible cards` (`newCount=0` & `reviewDueCount=0`) — no direct session; only `PM-REVIEW` if scope has cards; **no empty session**.
- `selected action unavailable` — Future mode (game/player) → disabled/Future indicator.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Tap `PM-LEARN` | Start New Learning Flow (pre-SRS, new cards) | starts session (mutation only on fill activation) | New Learning Flow |
| Tap `PM-REPEAT` | Open Repeat Mode Menu | read-only until a repeat mode chosen | Repeat Mode Menu |
| Tap `PM-REPEAT` when `reviewDueCount = 0` | Show no-due; **no empty session**, no SRS mutation | read-only | stay / no-due state |
| Tap `PM-REVIEW` | Open browse (read-only) | read-only | Review Words |
| Tap `PM-GAME` / `PM-PLAYER` | Open if supported | — | Future |
| Open menu | Show options for scope | **read-only** | stay |

## Accessibility / content notes

- Each entry has a clear text label (not icon-only).
- Counts are contextual and must read as "available now", not totals.

## Open questions

- Below-modal refresh/delete actions — only if docs define; currently **not** defined → omitted.
- Game/player pool composition — game docs (Future).

## Out of scope

- Pixel/token, routes, animation; game/player implementation.

## Acceptance criteria

- **Học** starts New Learning Flow (new/pre-SRS); **Lặp lại** opens Repeat Mode Menu (never a default session).
- `PM-REPEAT` shown when `progress > 0%`; count may be `0`; 0-due start = **no empty session**.
- **Xem lại các từ** opens a read-only browse; game/player are **Future**.
- Opening the menu never mutates learning data.
