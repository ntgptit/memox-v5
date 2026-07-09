# New Learning Flow Wireframe

## Source docs

- [07-study-modes.md](../07-study-modes.md) (New Learning Flow + mode subsections)
- [06-srs-8box.md](../06-srs-8box.md) (Box 0 / activation)
- [new-learning-flow-decision-table.md](../../decision-tables/new-learning-flow-decision-table.md)

Source status: **ready**.

## Purpose

Học **thẻ mới** (pre-SRS). Card mới ở **Box 0 / not activated**. Flow bắt buộc theo thứ tự
**review → match → guess → recall → fill**. **fill** đúng (khi 4 mode trước đã xong) **activate** card
lên **Box 1**. Không mode nào trước fill tự activate SRS.

## Entry points

- **Play Menu → Học** (`PM-LEARN`) → start New Learning Flow for the deck scope.

## Exit points

- On successful finalize → **Session Result** (New Learning Result).
- On finalize failure → `finalize failed` state (not a completed Result).
- On early exit → unfinished cards remain **Box 0 / not SRS-active**.

## Data dependencies

- New/pre-SRS cards (Box 0) in scope, within new-cards-per-day limit; `term`/`meaning`/`note`.
- Distractors for guess (from other cards in scope).
- Per-card 5-mode progress persisted via `study_session_items` (not volatile UI state).

## Mutation boundaries

- **Pre-SRS learning feedback (review/match/guess/recall/fill) does NOT mutate box/due.**
- The **only** SRS-state mutation is `fill` correct after the prior four modes → **Box 0 → Box 1** (activation), once.
- Per-mode item progress is persisted (session items); attempts logged. Opening a mode is not a no-op mutation of learning state beyond recording session progress.

## Primary layout (shared session shell)

```
+------------------------------------------------------+
| NLF-HEADER: [back/exit]  <mode title>  [text?][audio?][⋯]|
+------------------------------------------------------+
| NLF-PROGRESS: [=========>            ]  (flow %)     |
+------------------------------------------------------+
| NLF-BODY: <mode-specific region>                     |
+------------------------------------------------------+
```

### 1. Shared session shell — `NLF-SHELL`

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `NLF-HEADER` | Header | back/exit; **mode title** (review/match/guess/recall/fill); optional text/display; optional audio; overflow | active | exit (protected if docs require) |
| `NLF-PROGRESS` | Progress | New-Learning-Flow progress (or current-mode progress) — **not** SRS box progress; may start 0% | active | — |
| `NLF-BODY` | Body | Mode-specific region (below) | per mode | per mode |

- **Protected exit concept:** exiting mid-flow keeps unfinished cards Box 0 / not SRS-active (confirm if docs require). No raw route — navigate by screen/flow concept.

### 2. reviewMode — `NLF-REVIEW`

```
| NLF-REVIEW-CARD:  <prompt/front>  +  <answer/meaning>  [audio?][edit?] |
| NLF-REVIEW-NEXT:  [tiếp tục]                                           |
```

- First exposure: shows **both** prompt/front and answer/meaning to get familiar. Not a memory test.
- Completion of all review items → transition to `matchMode`. **No SRS activation by itself.**

### 3. matchMode — `NLF-MATCH`

```
| NLF-MATCH-GRID:  [prompt cards]      [answer/meaning cards]  (shuffled) |
```

- Pick one prompt + one answer.
- **Correct pair:** correct/green feedback state; pair complete (may remove/lock/mark).
- **Wrong pair:** incorrect/red feedback state; pair incomplete → retry.
- Evaluate **only when 2 items selected**.
- All pairs complete → transition to `guessMode`. **Pre-SRS feedback only; no box/due mutation.**

### 4. guessMode — `NLF-GUESS`

```
| NLF-GUESS-PROMPT: <prompt/front>                                       |
| NLF-GUESS-OPTIONS: [opt1] [opt2] [opt3] [opt4]  (1 correct + distractors)|
```

- Select one option. **Correct:** green/correct; item complete. **Wrong:** red/incorrect; incomplete or retry.
- All items complete → transition to `recallMode`. **Pre-SRS only.**

### 5. recallMode — `NLF-RECALL`

```
| NLF-RECALL-PROMPT: <prompt/front>   (answer hidden)                    |
| NLF-RECALL-REVEAL: [Hiển thị  ⏱ 20s]                                   |
|   after reveal → NLF-RECALL-GRADE: [Đã quên] [Nhớ được]                |
```

- `NLF-RECALL-REVEAL` = **Hiển thị** button with a **20s countdown**.
- **No tap within 20s → Đã quên** (recall failure).
- **Remembered mentally but did not tap Hiển thị before timeout → still Đã quên.**
- After reveal (tapped before timeout) → answer shows; user self-grades **Đã quên** / **Nhớ được**.
- Completion → transition to `fillMode`. **Pre-SRS only.**

### 6. fillMode — `NLF-FILL`

```
| NLF-FILL-PROMPT: <meaning/answer>                                      |
| NLF-FILL-INPUT:  [__________ user types prompt/front __________]       |
| NLF-FILL-ACTIONS: [Trợ giúp]                 [Kiểm tra]                 |
|   after wrong → [Thử lại]                                              |
```

- User inputs prompt/front from the meaning/answer.
- **Trợ giúp** (hint) does **not** complete the item and does not activate SRS.
- **Kiểm tra correct** → item complete (green). **Kiểm tra incorrect** → incomplete/red → **Thử lại**.
- **fill correct after the previous four modes complete → activate Box 0 → Box 1** (final gate).
- Empty input → validation/incorrect, never "correct". (Answer-normalization rule is a separate task.)

### 7. finalize — `NLF-FINALIZE`

| Outcome | Result |
|---------|--------|
| Session finalize **succeeds** | show **Session Result** (New Learning Result) |
| Session finalize **fails** | `finalize failed` state — **not** a completed Result |
| User **exits early** | unfinished cards remain **Box 0 / not SRS-active**; no fake activation |

## States

- `loading` (build item list) / `active` (in a mode) / `finalizing` / `finalized → Result` / `finalize failed` / `exited early`.
- Per-mode: `pending` / `item complete` / `retry` / `timeout (recall)`.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Complete review batch | → matchMode | session-item progress only | matchMode |
| Correct/wrong in match/guess | feedback + item state | **no box/due** | stay/advance |
| Recall timeout / self-grade | mark Đã quên / Nhớ được | **no box/due** | advance |
| Fill correct (after prior 4) | **activate Box 1** | **mutates box (activation)** | advance/finalize |
| Fill incorrect | retry | no activation | stay |
| Finalize success | show Result | persists finalized session | Session Result |
| Exit early | keep Box 0 | no activation | back |

## Accessibility / content notes

- Feedback must not rely on color alone (correct/incorrect also conveyed by state/label).
- `Hiển thị` countdown must be perceivable; timeout outcome announced.
- Input, `Trợ giúp`, `Kiểm tra`, `Thử lại` have text labels.

## Open questions

- Exact **progress %** formula (mock ~80% at fill) — read model; do not invent.
- **Answer normalization** for `Kiểm tra` — separate task, not decided here.
- Retry timing/placement (match/guess/fill) — implementation detail.
- Protected-exit confirmation specifics — if docs require.

## Out of scope

- Pixel/token, routes, animation, scoring/penalty, shuffle/distractor algorithm.

## Acceptance criteria

- Flow order is **review → match → guess → recall → fill**; each auto-advances.
- Everything before `fill` activation is **pre-SRS / Box 0** (no box/due mutation).
- **fill correct after the prior four** activates **Box 1**; incomplete → stays Box 0.
- Success → Session Result; failure → finalize-failed (not a completed Result); early exit → not SRS-active.
