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
| **new card created** | **Box 0 / not SRS-active** (pre-SRS; no due) |
| user taps **Học** | start **`reviewMode`** (first mode) |
| card enters **`reviewMode`** | card remains **not SRS-active** (Box 0) |
| any **pre-SRS mode feedback** (review/match/guess/recall/fill before activation) | **no SRS box/due mutation** |
| **`reviewMode` completed** | **transition to `matchMode`** |
| **`matchMode`** shows prompt/front items and answer/meaning items | user **selects one pair** (evaluate only when 2 items selected) |
| **`matchMode` correct pair** selected | show **correct** feedback (green-style); mark pair **complete** in `matchMode` |
| **`matchMode` wrong pair** selected | show **incorrect** feedback (red-style); keep pair **incomplete** |
| **`matchMode` wrong pair** selected | **allow retry** |
| **`matchMode` pair complete** | may **remove / lock / mark as completed** per UI implementation |
| **all `matchMode` pairs complete** | **transition to `guessMode`** |
| **`guessMode`** shows prompt + answer options | user **selects one option** |
| **`guessMode` correct** option selected | show **correct** feedback; mark item **complete** in `guessMode` |
| **`guessMode` wrong** option selected | show **incorrect** feedback; keep item **incomplete** (or retry per docs) |
| **`guessMode` item complete** | may move to **next item** |
| **all `guessMode` items complete** | **transition to `recallMode`** |
| **`recallMode`** shows prompt/front with **hidden** answer | **start 20s timer** |
| user taps **Hiển thị** before timeout | **reveal** answer/meaning and **stop** timer |
| user does **not** tap Hiển thị within 20s | mark **Đã quên** (failure) and **move next** |
| user remembers mentally but does **not** tap Hiển thị before timeout | mark **Đã quên** (failure) |
| after reveal, user taps **Nhớ được** | mark **recall success** |
| after reveal, user taps **Đã quên** | mark **recall failure** |
| **recall success** | item **complete** in `recallMode`, **not SRS-active** yet |
| **recall failure** | **not** recall-success; **not SRS-active** |
| all required **recall items** processed | **transition to `fillMode`** |
| **`fillMode`** shows meaning/answer | user **fills prompt/front** |
| user taps **Trợ giúp** | show **hint**; item remains **incomplete** |
| user taps **Kiểm tra** with **empty** input | show **validation/incorrect** state; item **incomplete** |
| user taps **Kiểm tra** with **correct** input | show **correct** feedback; mark item **complete** in `fillMode` |
| user taps **Kiểm tra** with **incorrect** input | show **incorrect** feedback; keep item **incomplete** |
| **`fillMode` incorrect** | **allow Thử lại** |
| **`fillMode` correct** after review + match + guess + recall completed | move card to **Box 1** and **enable SRS** |
| **`fillMode` incomplete** | card remains **not SRS-active** |
| **manual accept** ("Đúng") after incorrect answer | **not specified** unless future docs define it |
| card completed **review only** | **not SRS-active** |
| card completed **review + match only** | **not SRS-active** |
| card completed **review + match + guess only** | **not SRS-active** |
| card completed **review + match + guess + recall only** | **not SRS-active** |
| card completes **review + match + guess + recall + fill** | move to **Box 1** and **enable SRS** |
| card has **not** completed all five modes | do **not** show in **SRS Repeat**; do **not** schedule SRS due |
| user **exits during `matchMode`** | card remains **not SRS-active** unless all five modes already completed |
| user **exits during `guessMode`** | unfinished cards remain **not SRS-active** |
| user **exits during `recallMode`** | unfinished cards remain **not SRS-active** |
| user **exits during `fillMode`** | unfinished cards remain **not SRS-active** |

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
