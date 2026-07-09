# MemoX — Product Scope

This page defines **what MemoX is and is not**, at a level agents/contributors can rely on. It is a
summary; the detailed, authoritative specs live alongside it in [`docs/product/`](.) and
[`docs/design/`](../design/). **Do not implement business behavior that is not documented here or in
those specs. On any docs-code mismatch, stop and flag it.**

## In scope

MemoX is a **local-first flashcard app** with spaced-repetition review.

- **Decks, nested.** Cards are grouped into decks; decks can contain sub-decks to arbitrary depth
  (a tree). CRUD on decks and cards.
- **Cards.** A card has a `term` and a `meaning` (both required) and an optional `note`. Content is
  free-form Unicode.
- **Spaced repetition — 8-box (Leitner).** Each card sits in a box (1–8); correct answers promote it,
  wrong answers demote it; each box maps to a review interval that determines when the card is due.
  Algorithm details: [`../design/06-srs-8box.md`](../design/06-srs-8box.md).
- **Study modes.** Multiple ways to study the same cards. Some modes update SRS state; one is
  practice-only. Details: [`../design/07-study-modes.md`](../design/07-study-modes.md).
- **Settings.** User-configurable SRS intervals, lapse behavior, new-cards-per-day limit, and UI
  language. Details: [`../design/09-settings.md`](../design/09-settings.md).
- **Internationalized UI (i18n).** The interface is translatable (starting with `vi` and `en`).
  Details: [`../design/08-i18n.md`](../design/08-i18n.md).
- **Local-first persistence.** Works fully offline; data persists on-device. The data schema is
  designed to be sync-ready. Details: [`../design/05-data-model.md`](../design/05-data-model.md).
- **Platforms.** iOS, Android, and Web via Expo.

## Out of scope (current phase)

- Cloud sync / accounts / login (schema is *prepared* for it; sync itself is a later phase).
- Public deck sharing / marketplace.
- Advanced SRS algorithms (SM-2, FSRS) — the chosen algorithm is 8-box Leitner.
- Localizing **card content** with source/target language metadata (only the **UI** is
  internationalized; card content is free Unicode).
- AI card generation, OCR, bulk import.
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
