# SRS Repeat Flow Wireframe

## Source docs

- [07-study-modes.md](../07-study-modes.md) (SRS Repeat Flow, Repeat Mode Menu)
- [06-srs-8box.md](../06-srs-8box.md)
- [repeat-mode-menu-decision-table.md](../../decision-tables/repeat-mode-menu-decision-table.md)

Source status: **ready**.

## Purpose

Ôn lại **SRS-active cards (Box 1+) đã đến hạn (due)**. Bấm **Lặp lại** mở **Repeat Mode Menu**; user chọn
một trong **match / guess / recall / fill**. **reviewMode không** thuộc SRS Repeat. SRS grading (đổi
box/due) **chỉ** xảy ra ở luồng này.

## Entry points

- **Play Menu → Lặp lại** (`PM-REPEAT`) → **Repeat Mode Menu**.

## Exit points

- Choose a repeat mode with due cards → SRS Repeat session → **Session Result** (SRS Repeat Result) on finalize.
- Due = 0 → `no-due` state (no session).
- Finalize failure → `finalize failed` state.

## Data dependencies

- **Box 1+ cards that are due now** (local-day, DT-1) in scope. `reviewDueCount`.
- Repeat ordering preference (Tăng…) from [Spaced Repetition Settings](app-settings-wireframe.md) — ordering only.

## Mutation boundaries

- **Opening the Repeat Mode Menu: read-only.**
- SRS box/due mutation happens **only** on graded attempts in a repeat session for **Box 1+ due** cards
  (per SRS docs, after attempt/finalize). **Correct → promote** (`min(box+1, 8)`); **wrong → lapse**
  (`stepDown`/`reset`), **never below Box 1**.
- Repeat **never** activates new cards into Box 1 (that is New-Learning-only).

## Primary layout

### Repeat Mode Menu — `SRS-REPEAT-MODE-MENU`

```
+------------------------- Lặp lại ---------------------+
| SRS-RM-MATCH   Ghép đôi                               |
| SRS-RM-GUESS   Đoán                                   |
| SRS-RM-RECALL  Nhớ lại                                |
| SRS-RM-FILL    Điền                                   |
+------------------------------------------------------+
  (no reviewMode; for Box 1+ due cards only)
```

### Repeat session shell — reuses the mode mechanics

```
| SRS-HEADER: [back]  <repeat mode>  [audio?] [⋯]       |
| SRS-PROGRESS: [========>          ]                   |
| SRS-BODY: <match/guess/recall/fill mechanic>          |
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `SRS-REPEAT-MODE-MENU` | Menu | Ghép đôi / Đoán / Nhớ lại / Điền (no reviewMode) | closed / open | select a repeat mode |
| `SRS-RM-MATCH` / `-GUESS` / `-RECALL` / `-FILL` | Menu items | one repeat mode each | enabled if Box 1+ due exist | start SRS Repeat in that mode |
| `SRS-HEADER` / `SRS-PROGRESS` / `SRS-BODY` | Session shell | same mechanics as New Learning modes, but **SRS grading** | active | per mode |
| `SRS-NO-DUE` | No-due state | "no words due" message | when `reviewDueCount = 0` | back / (optional review overview) |
| `SRS-FINALIZE-FAILED` | Failure | finalize failed message | on finalize error | retry/back; not a completed Result |

- **SRS Match** (`SRS-BODY` match): pairing; correct/wrong grades SRS.
- **SRS Guess**: options; correct/wrong grades SRS.
- **SRS Recall**: Hiển thị + 20s; self-grade grades SRS.
- **SRS Fill**: type answer; Kiểm tra correct/incorrect grades SRS.

## States

- `menu open` (Box 1+ due available) / `no-due` (`reviewDueCount = 0` → **no empty session**) /
  `active` / `finalizing` / `finalized → SRS Repeat Result` / `finalize failed`.
- `reviewMode selected` → **invalid** (not offered; guarded).

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Tap Lặp lại | Open Repeat Mode Menu | read-only | Repeat Mode Menu |
| Select match/guess/recall/fill, due > 0 | Start SRS Repeat in that mode | SRS box/due on graded attempts | SRS Repeat session |
| Select mode, due = 0 | Show `SRS-NO-DUE` | **no session, no SRS mutation, no fake-complete** | stay |
| Correct attempt (Box 1+ due) | promote per 8-box | mutates box/due | advance |
| Wrong attempt (Box 1+ due) | lapse (min Box 1) | mutates box/due | advance |
| Finalize success | show SRS Repeat Result | persists finalized session | Session Result |
| Finalize fail | `SRS-FINALIZE-FAILED` | keep prior state safe | stay (no completed Result) |

## Accessibility / content notes

- Correct/incorrect not color-only.
- No-due state clearly explains "nothing due now".

## Open questions

- Full repeat-ordering enum (only `Tăng` confirmed); `Giảm`/`Ngẫu nhiên` are future.
- Exact promotion/lapse display in-session — SRS docs define the rule, UI display TBD.

## Out of scope

- Pixel/token, routes, animation.
- New-card activation (New-Learning-only).

## Acceptance criteria

- SRS Repeat uses **Box 1+ due cards only**; `reviewMode` is **not** a repeat mode.
- Due = 0 → no-due state, **no empty session**.
- Correct/wrong mutates SRS only for Box 1+ due cards; **lapse never below Box 1**.
- Finalize → SRS Repeat Result; failure → finalize-failed (not a completed Result).
