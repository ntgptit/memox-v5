# Review Words (Xem lại các từ) Wireframe

## Source docs

- `screens/review-words.md` — **NOT PRESENT** (no dedicated screen spec).
- Browse behavior derived from: [07-study-modes.md](../07-study-modes.md#reviewmode-vs-xem-lại-các-từ-browse),
  [screens/deck-management.md](../screens/deck-management.md) (Play Menu → "Xem lại các từ"),
  [screens/flashcard-list.md](../screens/flashcard-list.md),
  decision tables ([play-menu](../../decision-tables/play-menu-decision-table.md),
  [new-learning-flow](../../decision-tables/new-learning-flow-decision-table.md),
  [session-result](../../decision-tables/session-result-decision-table.md),
  [statistics](../../decision-tables/statistics-decision-table.md)).

Source status: **partial** — no dedicated `review-words.md`; wireframe uses only the **documented
browse-mode behavior**. Header sub-controls (display/text/audio/menu) below are marked as **derived from
mock-style browse and may need a dedicated spec** — not invented business, only layout hints.

## Purpose

Duyệt/xem lại nội dung card trong scope hiện tại — **read-only**. **Không** phải New Learning Flow,
**không** phải SRS Repeat. **Không** mutate progress/box/due/session.

## Entry points

- From **Play Menu → Xem lại các từ** (when scope has cards).
- Conceptually equivalent to browsing [Flashcard List](flashcard-list-wireframe.md) content.

## Exit points

- Close/back → returns to Deck Management / Play Menu. **No Session Result** is shown on close.

## Data dependencies

- Cards in the current scope: `meaning`/answer + `term`/prompt (per current study direction) + optional `note`.
- Optional per-card **box/status** indicator (display-only) — only if a docs indicator exists.

## Mutation boundaries

- **Entire screen is read-only.** Browsing does **not** activate any card into SRS, does **not** create
  a session, and does **not** change box/due/progress or write `card_reviews`.
- Edit (if an explicit edit action exists) is a separate mutating flow, not part of browsing.

## Primary layout

```
+------------------------------------------------------+
| RW-HEADER: [back]  Xem lại  [text?] [audio?] [⋯?]    |
+------------------------------------------------------+
| RW-STATUS: <index>/<total>   [browse progress]  [box?]|
+------------------------------------------------------+
| RW-CARD-AREA                                         |
|    <meaning / answer>                                |
|    <prompt / front>                                  |
|    [audio?]   [edit?]                                |
+------------------------------------------------------+
| RW-NAV: [prev]                     [next]  (swipe)   |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `RW-HEADER` | Header | Back; title **Xem lại**; optional display/text control, audio, overflow (**derived — may need spec**) | loaded | back; (optional controls) |
| `RW-STATUS` | Top status | current index / total; browse progress; optional box/status (read-only) | loaded | — |
| `RW-CARD-AREA` | Card | meaning/answer + prompt/front; optional audio; optional explicit edit | loaded | audio (read); edit (separate mutating flow, if explicit) |
| `RW-NAV` | Navigation | previous / next / swipe | loaded / at-start / at-end | prev; next; swipe |

## States

- `loading` — loading cards.
- `loaded` — showing a card with index/total.
- `empty` — scope has no cards (Play Menu would not offer this; if reached, show empty state).
- `error` — failed to load.

(No `no-due` and **no** `finalize failed` — Review Words is not a session and has no finalize.)

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| prev / next / swipe | Move browse index | **read-only** | stay |
| audio | Play pronunciation (if supported) | read-only | stay |
| edit (if explicit) | Open card edit | mutating (separate flow) | edit flow |
| close / back | Leave browse | read-only | back; **no Session Result** |

## Accessibility / content notes

- Header controls (audio/text/menu) need labels — no icon-only critical action.
- Long content wraps/truncates with full value accessible.
- "Xem lại" (browse) is distinct from `reviewMode` (New Learning step 1) — labels look similar but are different flows.

## Open questions

- No dedicated `review-words.md` spec — header sub-controls, exact browse-progress semantics, and whether
  an explicit edit action appears here are **not decided**. `DRIFT / gap`: a dedicated Review Words spec
  would remove ambiguity (see [Open questions in phase-1-wireframes](phase-1-wireframes.md#open-questions)).

## Out of scope

- Pixel/token, routes, animation.
- Any SRS/session behavior (there is none).

## Acceptance criteria

- The screen is **read-only**; browsing never mutates progress/box/due/session or creates a session.
- Closing it does **not** show a Session Result.
- It is clearly **not** New Learning Flow and **not** SRS Repeat.
