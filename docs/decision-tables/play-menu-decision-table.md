# Play Menu Decision Table

Quick-reference rules for the Deck/Subdeck **Play Menu**, **New Learning Flow** (SRS activation), and
**SRS Repeat Flow**. Authoritative concept specs:
[deck-management → Play Menu](../design/screens/deck-management.md#play-menu),
[07-study-modes → New Learning Flow](../design/07-study-modes.md#new-learning-flow) /
[SRS Repeat Flow](../design/07-study-modes.md#srs-repeat-flow),
[06-srs-8box → Kích hoạt SRS](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1).

## Variables

- `newCount` — new cards (Box 0 / not activated, `due_at IS NULL`) in scope.
- `reviewDueCount` — SRS-active cards (Box 1+) **due now** (local-day, DT-1) in scope.
- `progress` — scope learning progress (formula not decided); `> 0%` ⇔ at least one SRS-active card.

## Play Menu display

| Condition | Result |
|-----------|--------|
| `progress = 0%`, `newCount > 0` | show **Học**, **hide Lặp lại** |
| `progress = 0%`, `newCount = 0`, scope has cards | **hide Lặp lại**, allow **Xem lại các từ** |
| `progress > 0%`, `reviewDueCount > 0` | show **Lặp lại** with count |
| `progress > 0%`, `reviewDueCount = 0` | show **Lặp lại** with **zero / no-due state**; do **not** create empty session |

## Learning → SRS activation

| Condition | Result |
|-----------|--------|
| card completes **review + match + guess + recall + fill** | move to **Box 1**, enable SRS |
| card **not** completed all five modes | remains **Box 0 / not SRS-active** (not in Lặp lại) |

## User actions

| Action | Result |
|--------|--------|
| taps **Học** | start **New Learning Flow** with `reviewMode` first (review→match→guess→recall→fill) |
| taps **Lặp lại** | open **Repeat Mode Menu** (do **not** start a default session) |
| opens **Play Menu** | **no learning-data mutation** (menu only) |
| taps **Xem lại các từ** | open **browse/review content** mode (not a mandatory study session) |

## Repeat Mode Menu (after tapping Lặp lại)

| Action | Result |
|--------|--------|
| Repeat Mode Menu opens | show **Ghép đôi / Đoán / Nhớ lại / Điền** (no `reviewMode`) for **Box 1+ due** cards |
| user selects a repeat mode, `reviewDueCount > 0` | start **SRS Repeat Flow** in that mode (match/guess/recall/fill) |
| user selects a repeat mode, `reviewDueCount = 0` | show **no-due** state; **no empty session**; **no** SRS mutation; **no** fake-complete |
| any repeat mode result | **SRS review** of Box 1+ due cards; **does not** activate new cards into Box 1 |

## Notes

- `reviewDueCount` is **not** total learned cards, **not** progress %, **not** total cards in deck.
- Game (**Một trò chơi**) and player (**Trình phát**) are concept/**Future** if not in Phase 1.
- Box 0 and the 5-mode activation are **concept-level** here; schema/migration is **not** finalized in
  the docs — see the drift notes in
  [06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1) and
  [07-study-modes](../design/07-study-modes.md#new-learning-flow).
