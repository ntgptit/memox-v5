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
  - **Play Menu (Học vs. Lặp lại).** Tapping Play on a deck/subdeck row opens a **Play Menu** whose
    options adapt to the scope's learning state:
    - **Học** = **New Learning Flow** — learn **new** cards and **activate** them into SRS. It **starts
      with `reviewMode`**, a guided step where the learner sees the new card's content (prompt + answer)
      to get familiar — not a memory test and not SRS review. **Completing `reviewMode` transitions to
      `matchMode`** (the 2nd mode), a **pairing** step matching prompt ↔ meaning with **correct/incorrect
      feedback** (correct = green-style, incorrect = red-style); **SRS is still not enabled at
      `matchMode`**. The 3rd mode, **`guessMode`**, has the
      learner pick the correct answer/meaning for a prompt with **correct/incorrect feedback** — this
      serves New Learning Flow **before** SRS and is **not** SRS review grading. The 4th mode,
      **`recallMode`**, is active recall: the answer is hidden and the learner must tap **Hiển thị**
      within **20 seconds** to prove they recalled it — **not tapping in time counts as "Đã quên"
      (forgotten)**; after revealing, the learner self-grades **Đã quên** or **Nhớ được**. This also
      serves New Learning Flow before SRS. The 5th and **final** mode, **`fillMode`**, is active
      production: the answer/meaning is shown and the learner must **type/fill the prompt/front**, with
      **Trợ giúp** (hint) and **Kiểm tra** (check) actions — correct check completes the item, incorrect
      lets them retry, and Trợ giúp never auto-completes. `fillMode` is the **gate to SRS activation**. A
      new card must complete all five modes (**review → match → guess → recall → fill**) to move from
      **Box 0** to **Box 1**; only then is SRS enabled for it. Finishing `reviewMode`, `matchMode`,
      `guessMode`, `recallMode`, or `fillMode` alone does
      **not** activate the card.
    - **Lặp lại** = **SRS review** for cards already learned (**Box 1+**). Shown when scope
      **progress > 0%**, but its count depends on what is **due now** and **may be 0** (progress > 0%
      does not mean everything is due). Tapping **Lặp lại** does **not** jump into a default session — it
      opens a **Repeat Mode Menu** where the user picks how to review: **Ghép đôi** (match), **Đoán**
      (guess), **Nhớ lại** (recall), or **Điền** (fill); `reviewMode` is **not** in this menu (it belongs
      to New Learning Flow). These repeat modes apply only to SRS-active due cards, and choosing one with
      0 due starts **no empty session**. A first-time / 0% scope does **not** show **Lặp lại**.
    - **Xem lại các từ** = browse/review content mode (no forced session). **Một trò chơi** = game mode
      (may use new and/or review workload). **Trình phát** = player/listening concept — **Future** if
      not yet in scope (audio not decided).

    Concept spec:
    [`../design/screens/deck-management.md`](../design/screens/deck-management.md#play-menu);
    decision table:
    [`../decision-tables/play-menu-decision-table.md`](../decision-tables/play-menu-decision-table.md).
- **Session Result screen.** After a completed learning or SRS-review session, MemoX shows a **Session
  Result** summarizing **only that session** — for New Learning Flow (new cards learned, cards activated
  into Box 1 / not activated, per-mode failures) or SRS Repeat Flow (reviewed, remembered/forgotten,
  box promotion/demotion). It appears only when the session **finalizes successfully**, helps the user
  understand how the session went, and is **separate** from the long-term **Dashboard/Progress** (which
  it does not replace). Concept spec:
  [`../design/screens/session-result.md`](../design/screens/session-result.md).
- **Settings / More Hub.** The system functions from the drawer mock are **kept** (today-activity
  summary, add/delete learning language, import/export, statistics, theme, app settings, help/support),
  but their **UI location may be a Settings tab / More screen** — a **drawer is not required**. The goal
  is to fully develop these functions, not to copy the drawer UI. Concept spec:
  [`../design/screens/settings-more-hub.md`](../design/screens/settings-more-hub.md). Note: **add/delete
  learning language** is a **language-workspace** concept not yet in the data model (distinct from UI
  i18n); import/export/theme file formats and storage are **not** decided here.
- **Appearance / Theme Settings.** Opened from Settings / More Hub (**Chủ đề**): configure **auto dark
  mode** (follow system light/dark), a **day theme** preset, a **night theme** preset (day/night chosen
  independently), and — where the platform supports it — an **app icon** variant. Changing appearance
  **never** touches learning data; preferences must **persist** in local settings. **App icon switching
  is a separate capability** that needs verified **platform support** before implementation (and can make
  Home-screen shortcuts disappear). Concept spec:
  [`../design/screens/appearance-theme-settings.md`](../design/screens/appearance-theme-settings.md).
- **Statistics screen.** A **long-term** statistics screen (opened from Settings / More Hub) with three
  tabs — **Từ** (word/card counts), **Thời gian** (learning/repeat time), **Chất lượng** (correct/wrong
  + learning/repeat quality) — plus a per-day chart and a scope filter (default **Tất cả**). It tracks
  progress across **many sessions and days** and is **distinct** from **Session Result** (just-finished
  session) and the **Activity summary** (quick today view). Opening it never mutates learning data;
  aggregation formulas are left to a read-model task. Concept spec:
  [`../design/screens/statistics.md`](../design/screens/statistics.md).
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
