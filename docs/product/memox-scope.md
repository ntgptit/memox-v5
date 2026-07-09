# MemoX — Product Scope

This page defines **what MemoX is and is not**, at a level agents/contributors can rely on. It is a
summary; the detailed, authoritative specs live alongside it in [`docs/product/`](.) and
[`docs/design/`](../design/). **Do not implement business behavior that is not documented here or in
those specs. On any docs-code mismatch, stop and flag it.**

## In scope

MemoX is a **local-first flashcard app** with spaced-repetition review.

- **Decks, nested.** Cards are grouped into decks; decks can contain sub-decks to arbitrary depth
  (a tree). CRUD on decks and cards.
- **Deck Management screen (incl. Subdeck List variant).** Manage the **hierarchical deck/section
  structure**: browse the direct **child decks/sections** in the current deck, see each one's **content
  count**, **overall learning-progress indicator**, and (if any) **due/review workload indicator**,
  **start studying** a deck/section, **add a child deck/section**, **add a card/word**, and
  **search / filter / sort** the list (view-only; does not change learning data). Sorting can order
  deck/section rows by **name**, **created date**, or **most-recently-studied** (each with two
  directions); it only changes display order, never the learning data. **Subdeck List** is a
  **variant/state** of this screen (when the current scope has child sections/subdecks), **not** a
  separate product module. Concept spec:
  [`../design/screens/deck-management.md`](../design/screens/deck-management.md) (see the
  [Subdeck List variant](../design/screens/deck-management.md#subdeck-list-variant)). The screen shows
  the current study direction (e.g. `KO → VI`); choosing the reverse direction stays out of scope (it
  ties to the bidirectional extension). Speaker/edit/hidden-suspended behaviors and any
  progress/mastery formula are **not** decided here.
  - **Play Menu.** Tapping Play on a deck/subdeck row opens a **Play Menu** whose options adapt to the
    scope's learning state: **Học** (new cards, shown when `newCount > 0`), **Lặp lại** (due review,
    shown **only** when `reviewCount > 0`), **Xem lại các từ** (browse — no forced session), **Một trò
    chơi** (game — Future if not in Phase 1), and **Trình phát** (player/listening — Future; audio not
    yet in scope). First-time or no-review-due scopes do **not** show **Lặp lại**; when both counts are
    zero no study session starts (no empty session). Concept spec:
    [`../design/screens/deck-management.md`](../design/screens/deck-management.md#play-menu).
- **Cards.** A card has a `term` and a `meaning` (both required) and an optional `note`. Content is
  free-form Unicode.
- **Flashcard List screen.** Browse and manage the flashcards inside a deck/section: quickly read each
  card's **front** and **back/meaning** in the current study direction, **search / filter / sort** the
  list (view-only; does not change learning data), **open a card to view or edit**, and **add a new
  card** into the current scope. Concept spec:
  [`../design/screens/flashcard-list.md`](../design/screens/flashcard-list.md). Shows the current study
  direction (e.g. `KO → VI`) as a read-only indicator. TTS/audio, advanced edit (delete/reorder/
  suspend), hidden/suspended, and any progress/mastery formula are **not** decided here.
- **Spaced repetition — 8-box (Leitner).** Each card sits in a box (1–8); correct answers promote it,
  wrong answers demote it; each box maps to a review interval that determines when the card is due.
  Algorithm details: [`../design/06-srs-8box.md`](../design/06-srs-8box.md).
- **Study modes.** Multiple ways to study the same cards. Some modes update SRS state; one is
  practice-only. Details: [`../design/07-study-modes.md`](../design/07-study-modes.md).
- **Persisted study sessions.** Study sessions are **durable**: Phase 1 includes `study_sessions` and
  `study_session_items` in the storage contract so a session can be **resumed** after close/crash. This
  requires a migration/backend task (`P1-BE-05`) **before** the Study UI. Learning progress lives in
  `cards` + `card_reviews`; session progress in the session tables.
  ([DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted))
- **Due by local-day.** A card is due when its due local-day is on or before today's local-day
  (a card due later today still counts as due today).
  ([DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day))
- **Settings.** User-configurable SRS intervals, lapse behavior, new-cards-per-day limit, and UI
  language. Details: [`../design/09-settings.md`](../design/09-settings.md).
- **Internationalized UI (i18n).** The interface is translatable (starting with `vi` and `en`).
  Details: [`../design/08-i18n.md`](../design/08-i18n.md).
- **Local-first persistence.** Works fully offline; the **local SQLite DB is the source of truth** for
  deck/card/study-session/review/settings. UI/state is only a projection of the DB; multi-table writes
  are transactional. The schema is sync-ready.
  Details: [`../design/05-data-model.md`](../design/05-data-model.md#hợp-đồng-lưu-trữ-local-first).
- **Platforms.** iOS, Android, and Web via Expo.

## Out of scope (current phase)

- Cloud sync / accounts / login (schema is *prepared* for it; sync itself is a later phase).
- Public deck sharing / marketplace.
- Advanced SRS algorithms (SM-2, FSRS) — the chosen algorithm is 8-box Leitner.
- Localizing **card content** with source/target language metadata (only the **UI** is
  internationalized; card content is free Unicode).
- AI card generation, OCR, bulk import.
- **Import / export / backup-restore** — a later task (`FUT-01`), not Phase 1. When built it must not
  break the local-first contract (DB is source of truth, via repository + transactions).
- Text-to-speech / pronunciation.

These reflect the documented product decisions; see [`01-vision.md`](01-vision.md) (goals & non-goals)
and [`02-requirements.md`](02-requirements.md) (requirements with IDs) for the full record.

## Phasing (foundation-first)

Work is sequenced so a usable learning loop ships early, then expands. See the
[roadmap](../roadmap/11-phasing.md) and [WBS](../project-management/wbs.md). No product feature code
has been implemented yet — the repository is in the foundation/documentation phase.

## Boundary reminder

Product features are built as feature slices under `src/features/`, with anything cross-cutting in
`src/shared/`, following the enforced [dependency boundaries](../architecture/dependency-boundaries.md).

## Starter template

Expo starter demo code is **not** part of MemoX and must **not** be on the production path. It is
removed/replaced in foundation cleanup `F0.1` before real MemoX screens, and **no feature may depend on
it** ([DT-3](../decision-tables/phase-1-contracts.md#dt-3--expo-starter-template-handling-not-on-production-path)).
