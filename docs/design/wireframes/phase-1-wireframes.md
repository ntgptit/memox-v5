# Phase 1 Wireframes — Overview, Matrices, Readiness

Companion to the [wireframes index](README.md). Docs are the source of truth over mock screenshots.

## End-to-end navigation map

```
                         ┌──────────────────────────┐
                         │  Settings / More Hub      │
                         │  (system functions)       │
                         └───┬───────────┬───────────┘
                             │           │
        ┌────────────────────┘           └───────────────┐
        ▼                    ▼            ▼               ▼
   App Settings        Appearance/Theme  Statistics   Help/Support
   ├ Native Lang Picker                  (long-term,  (read-only)
   ├ Reminder Settings                    read-only)
   └ Spaced Repetition Settings

   Home / Deck tree
        │
        ▼
   Deck Management ──(row ▶)──► Play Menu ──┬─► Học  ─► New Learning Flow ─► Session Result
        │  ▲                                │        (review→match→guess→recall→fill; fill⇒Box1)
        │  └─ drill into subdeck            ├─► Lặp lại ─► Repeat Mode Menu ─► SRS Repeat Flow ─► Session Result
        ▼                                   │            (Box 1+ due only; match/guess/recall/fill)
   Flashcard List                          ├─► Xem lại các từ ─► Review Words (read-only browse; no Result)
   (browse/manage cards)                    ├─► Một trò chơi (Future)
                                            └─► Trình phát (Future)

   Statistics = long-term (separate from Session Result which is per-session).
```

## Screen-to-data matrix

| Screen / flow | Reads | Writes |
|---------------|-------|--------|
| Deck Management | child decks/sections, counts, progress, due indicators, direction | — (browsing) |
| Flashcard List | cards (front/back/note), optional status | — (browsing; add/edit are separate flows) |
| Play Menu | `newCount`, `reviewDueCount`, `progress` | — |
| Review Words | cards in scope | — (read-only) |
| New Learning Flow | Box 0 cards, distractors, session items | `card_reviews`, session items; **Box 0→Box 1 on fill activation** |
| SRS Repeat Flow | Box 1+ due cards | `card_reviews`, session items; **box/due on graded attempts (min Box 1)** |
| Session Result | finalized session/attempt summary | — (read-only) |
| Statistics | finalized history (sessions + reviews), by scope/tab | — (read-only) |
| Settings / More Hub | activity summary (today) | — (targets own their data) |
| Appearance / Theme | appearance prefs | appearance prefs (local settings) |
| App Settings | app prefs, backup meta | app prefs (local); **restore = destructive**; cloud sync = Future |
| Native Language Picker | language list | native-language preference |
| Reminder Settings | reminders | reminder prefs (local) |
| Spaced Repetition Settings | SRS prefs | SRS prefs (local; must obey 8-box) |

## Screen-to-mutation matrix

| Category | Screens / actions |
|----------|-------------------|
| **Read-only screens** | Deck Management, Flashcard List (browse), Play Menu (open), Review Words, Session Result, Statistics, Settings/More Hub (open), and any settings screen on open |
| **Mutating actions (learning data)** | New Learning **fill activation** (Box 0→1); SRS Repeat **graded attempts** (box/due, min Box 1) |
| **Mutating actions (preferences)** | Appearance select/save; App Settings preference changes; Native language select; Reminder add/edit/delete; SRS setting changes |
| **High-risk (data ops)** | **Restore** (destructive overwrite — confirm/validate/rollback-safe); **Cloud sync** (provider/conflict policy; Future); (Delete language — destructive, Future) |
| **Never mutate learning data** | Opening any screen; sort/search/filter; browse; Review Words; Statistics; Session Result; Backup (copy only) |

## Open questions

- Progress/mastery **%** formulas; Statistics **aggregation formulas** — read model / Future; not invented.
- **"Ô: 7"** vs documented 8-box — **open question**; do not implement 7-box.
- `screens/review-words.md` is **absent** — Review Words wireframe is **partial** (header sub-controls / browse-progress semantics need a dedicated spec).
- `screens/subdeck-list.md` is **absent** — Subdeck List covered as a Deck Management variant.
- Learning-language workspace (add/delete language) not in the data model — Future (needs data-model + destructive policy).
- Import/export file format; cloud provider/conflict policy; notification API/permission; game pool algorithm; app-icon dynamic switching — not decided.
- Answer-normalization for fill `Kiểm tra` — separate task.

## Implementation readiness

| Wireframe | Readiness |
|-----------|-----------|
| Deck Management | **Ready for FE docs**; needs BE read model (counts/progress/due) |
| Flashcard List / Subdeck variant | **Ready for FE docs**; needs BE read model |
| Play Menu | **Ready for FE docs**; needs BE read model (`newCount`/`reviewDueCount`/`progress`) |
| Review Words | **Partial** (no dedicated source doc) — read-only browse is clear; header sub-controls need a spec |
| New Learning Flow | **Ready for FE docs**; needs BE (session items, activation gate) + answer-normalization decision |
| SRS Repeat Flow | **Ready for FE docs**; needs BE (SRS engine, due query, lapse) |
| Session Result | **Ready for FE docs**; needs BE read model (finalized summary) |
| Statistics | **Needs BE read model** (aggregation formulas undefined) |
| Settings / More Hub | **Ready for FE docs**; several targets Future |
| Appearance / Theme | **Ready for FE docs**; app-icon switching **Future/spike** |
| App Settings (+ children) | **Ready for FE docs**; **"Ô: 7" blocked** on product decision; cloud sync/backup need policy; learning-language workspace **Future** |

## Drift

- **DRIFT — "Ô: 7" vs 8-box.** File code: N/A — docs-only. File doc: mock App Settings ("Ô: 7") vs
  [06-srs-8box](../06-srs-8box.md) (8-box). Mismatch: mock value could imply 7-box. Suggested fix: keep as
  open question; do not implement 7-box; product decision required. (Already recorded in
  [spaced-repetition-settings.md](../screens/spaced-repetition-settings.md#box-setting--ô-7-open-question).)
- **Gap (not a business contradiction):** `screens/review-words.md` and `screens/subdeck-list.md` are
  absent; wireframes for them are marked partial and do not invent business.
