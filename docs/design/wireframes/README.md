# MemoX v5 — Wireframes

## What these are

Text/ASCII **wireframe docs** that turn the existing screen/flow **business specs** into concrete
UI-flow documentation an implementation agent can build FE/BE from **without guessing business rules**.

Each wireframe describes: layout, UI regions (with **stable IDs**), states, primary/secondary actions,
navigation (by screen/flow concept), **data dependencies**, and **mutation boundaries** (what may
mutate data vs. what is strictly read-only).

## What these are NOT

- **Not** pixel-perfect design — no exact colors, fonts, sizes, or tokens.
- **Not** a source of business truth — the design/product docs are authoritative. **When a mock
  screenshot conflicts with a doc, the docs win.**
- **Not** routing specs — navigation is by screen/flow concept, never raw route strings.
- **Not** requirements for sample/placeholder numbers (e.g. mock values like `646`, `83`) — those are
  samples only; real values come from the read model.

## Source docs (authoritative)

- Product: [memox-scope](../../product/memox-scope.md), [02-requirements](../../product/02-requirements.md)
- Design: [05-data-model](../05-data-model.md), [06-srs-8box](../06-srs-8box.md), [07-study-modes](../07-study-modes.md), [navigation](../navigation.md)
- Screens: [deck-management](../screens/deck-management.md), [flashcard-list](../screens/flashcard-list.md),
  [session-result](../screens/session-result.md), [statistics](../screens/statistics.md),
  [settings-more-hub](../screens/settings-more-hub.md), [appearance-theme-settings](../screens/appearance-theme-settings.md),
  [app-settings](../screens/app-settings.md), [native-language-picker](../screens/native-language-picker.md),
  [reminder-settings](../screens/reminder-settings.md), [spaced-repetition-settings](../screens/spaced-repetition-settings.md)
- Decision tables: [../../decision-tables/](../../decision-tables/)
- **Missing source docs:** `screens/review-words.md` (not present) and `screens/subdeck-list.md` (not
  present — Subdeck List is a Deck Management variant). Wireframes for these are marked **partial**.

## Screen list

| Wireframe | Screen / flow |
|-----------|---------------|
| [deck-management-wireframe](deck-management-wireframe.md) | Deck / Subdeck management |
| [flashcard-list-wireframe](flashcard-list-wireframe.md) | Flashcard List + Subdeck List variant |
| [play-menu-wireframe](play-menu-wireframe.md) | Play Menu (Học / Lặp lại / Xem lại / game / player) |
| [review-words-wireframe](review-words-wireframe.md) | Xem lại các từ (read-only browse) — **partial source** |
| [new-learning-flow-wireframe](new-learning-flow-wireframe.md) | New Learning Flow (review→match→guess→recall→fill) |
| [srs-repeat-flow-wireframe](srs-repeat-flow-wireframe.md) | SRS Repeat Flow + Repeat Mode Menu |
| [session-result-wireframe](session-result-wireframe.md) | Session Result |
| [statistics-wireframe](statistics-wireframe.md) | Statistics (long-term) |
| [settings-more-hub-wireframe](settings-more-hub-wireframe.md) | Settings / More Hub |
| [appearance-theme-settings-wireframe](appearance-theme-settings-wireframe.md) | Appearance / Theme Settings |
| [app-settings-wireframe](app-settings-wireframe.md) | App Settings + Native Language Picker + Reminder Settings + Spaced Repetition Settings |
| [phase-1-wireframes](phase-1-wireframes.md) | End-to-end map + data/mutation matrices + readiness |

## Phase 1 scope

Usable learning loop: manage decks/subdecks/cards → learn new via 5 modes → activate SRS on completion →
SRS repeat by due → read-only review → session result → long-term statistics → settings & data safety.

## Mutation boundary principle

- **Opening/browsing a screen is read-only** unless a doc explicitly defines a mutating action.
- **New Learning** mutates SRS state **only** at the fill-activation gate (Box 0 → Box 1).
- **SRS Repeat** mutates box/due **only** for **Box 1+ due** cards on graded attempts.
- **Settings/Statistics/Result/Review Words** never mutate learning data by being opened.
- **Restore / Cloud sync** are **high-risk** data operations (confirm/validate/policy).
