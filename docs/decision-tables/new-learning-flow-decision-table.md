# New Learning Flow Decision Table

Quick-reference rules for **Học → New Learning Flow**, its first mode **`reviewMode`**, and the
boundary with **SRS Repeat** and **browse**. Authoritative specs:
[07-study-modes → New Learning Flow](../design/07-study-modes.md#new-learning-flow) /
[reviewMode](../design/07-study-modes.md#reviewmode-mode-đầu-tiên),
[06-srs-8box → Kích hoạt SRS](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1),
[deck-management → Play Menu](../design/screens/deck-management.md#play-menu).

## Flow & activation

| Condition / action | Result |
|--------------------|--------|
| user taps **Học** | start **`reviewMode`** (first mode) |
| card enters **`reviewMode`** | card remains **not SRS-active** (Box 0) |
| **`reviewMode` completed** | **transition to `matchMode`** |
| **`matchMode` correct pair** | mark pair **complete** in `matchMode` |
| **`matchMode` wrong pair** | show **incorrect** feedback; keep pair **incomplete** (retry) |
| **`matchMode` completed** | **transition to `guessMode`** |
| card completed **review only** | **not SRS-active** |
| card completed **review + match only** | **not SRS-active** |
| card completes **review + match + guess + recall + fill** | move to **Box 1** and **enable SRS** |
| card has **not** completed all five modes | do **not** show in **SRS Repeat**; do **not** schedule SRS due |
| user **exits during `matchMode`** | card remains **not SRS-active** unless all five modes already completed |

## Repeat vs. browse boundaries

| Action | Result |
|--------|--------|
| user taps **Lặp lại** | use **only Box 1+ due** cards — **not** reviewMode / Box 0 cards |
| user opens browse **"Xem lại các từ"** | browse/review content mode — do **not** activate any card into SRS |
| user opens **Play Menu** | no learning-data mutation (menu only) |

## Notes

- **`reviewMode` ≠ Lặp lại (SRS Repeat).** reviewMode is for **new** (Box 0) cards; Lặp lại is for
  activated (Box 1+) due cards.
- **`reviewMode` ≠ "Xem lại các từ" (browse)** even though the Vietnamese labels look similar — see the
  [comparison table](../design/07-study-modes.md#reviewmode-vs-xem-lại-các-từ-browse).
- Opening/finishing `reviewMode` does **not** change SRS state, due scheduling, or the Repeat count.
- Box 0 and the 5-mode activation are **concept-level**; schema/migration is **not** finalized here
  (see the drift note in [06-srs-8box](../design/06-srs-8box.md#kích-hoạt-srs-box-0--box-1)).
