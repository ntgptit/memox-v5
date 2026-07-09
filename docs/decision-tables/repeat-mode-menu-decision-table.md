# Repeat Mode Menu Decision Table

Quick-reference rules for the **SRS Repeat Flow** entered via the **Repeat Mode Menu** (tap **Lặp lại**).
Authoritative specs:
[07-study-modes → Repeat Mode Menu](../design/07-study-modes.md#repeat-mode-menu) /
[SRS Repeat Flow](../design/07-study-modes.md#srs-repeat-flow),
[06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1),
[deck-management → Repeat Mode Menu](../design/screens/deck-management.md#repeat-mode-menu).
See also the Play Menu rows in [play-menu-decision-table](play-menu-decision-table.md#repeat-mode-menu-after-tapping-lặp-lại).

## Menu & eligibility

| Action / condition | Result |
|--------------------|--------|
| user taps **Lặp lại** | open **Repeat Mode Menu** (do **not** start a default session) |
| Repeat Mode Menu opens | show **match / guess / recall / fill** for **Box 1+ due** cards |
| **`reviewMode` selected** from Repeat Menu | **invalid** — reviewMode is New-Learning-only, not a repeat mode |
| user selects **match/guess/recall/fill** | start **SRS Repeat** **only if Box 1+ due cards exist** |
| **due count = 0** | **no empty session** (show no-due state; no SRS mutation; no fake-complete) |

## SRS grading (Box 1+ only)

| Condition | Result |
|-----------|--------|
| **SRS Repeat correct** | schedule according to **8-box SRS** (promote, `min(box+1, 8)`) |
| **SRS Repeat wrong** | apply **lapse policy** (`stepDown`/`reset`), **never below Box 1** |
| card is **Box 0 / pre-SRS** | **not eligible** for Repeat; no SRS grading |
| repeat result | **does not** activate new cards into Box 1 (activation is New-Learning-only) |

## Notes

- SRS box/due mutation happens **only** in the SRS Repeat Flow for **Box 1+ due** cards.
- `reviewMode` is **not** in this menu; New Learning `match/guess/recall/fill` (pre-SRS) are a
  **different lifecycle** from the same-named repeat modes here (see
  [07-study-modes → New Learning vs Repeat](../design/07-study-modes.md#new-learning-modes-vs-repeat-modes--không-nhầm-lẫn)).
- Repeat ordering / SRS notification / lapse preferences come from
  [Spaced Repetition Settings](../design/screens/spaced-repetition-settings.md); ordering affects order
  only (no box/due change), and "Ô: 7" stays an open question (do **not** implement 7-box).
