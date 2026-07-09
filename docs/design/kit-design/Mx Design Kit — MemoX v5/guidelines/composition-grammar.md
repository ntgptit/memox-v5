# 12 — Mx Composition Grammar

The Mx Base Kit is the **vocabulary** (tokens + components). This grammar is **how to compose** that
vocabulary into screens. Every rule here is concrete and checkable by a designer, an agent, or a lint
guard — no vague words ("clean", "modern", "simple"). A screen can be **token-correct but
composition-wrong**; this document exists to make that impossible.

Source-of-truth order: product docs (behavior) → Mx Base Kit (vocabulary) → **this grammar (composition)**
→ screen specs → React Native implementation.

---

## 1. Spacing rhythm

All spacing is an `mx.space.*` token. One rhythm, applied everywhere:

| Context | Token | px |
|---|---|---|
| Screen horizontal padding | `mx.space.16` | 16 |
| Section vertical gap | `mx.space.24` | 24 |
| Item gap inside a section | `mx.space.12` | 12 |
| Compact row internal gap | `mx.space.8` | 8 |
| Icon ↔ text gap | `mx.space.8` | 8 |
| Title ↔ subtitle gap | `mx.space.4` | 4 |
| Bottom action area top gap | `mx.space.16` | 16 |
| Modal / sheet content padding | `mx.space.16`–`mx.space.24` | 16–24 (by density) |

**Allowed:** 4, 8, 12, 16, 24, 32.
**Rare (needs a reason):** `mx.space.2` (micro alignment only); `mx.space.40` / `mx.space.48` (large empty
states / hero only); `mx.space.64` (special empty/landing only).
**Forbidden:** any non-token value; different gaps between items in the *same* list; using **both** a
divider **and** a large gap between every item unless the recipe requires it. Dense list rows may shrink
internal vertical padding but must preserve the 44px touch target.

## 2. Typography hierarchy

Role-based, from the `mx.text.*` scale. Per screen:
- **At most one** main title style (`mx.text.title.large`).
- **One** section-header style, used consistently.
- **One** primary body style.
- Caption style (`mx.text.caption`) is for metadata/helper text **only**.
- **≤ 2 font weights** per screen unless a component *state* requires a third.
- Korean prompt = `mx.text.study.korean`; meaning/explanation = `mx.text.study.explanation`; numbers/stats
  = `mx.text.stat.number`.
- Long content **wraps** before shrinking below a readable size.

**Forbidden:** random sizes; bold everywhere; title style on a list-item body; caption style on critical
content; aggressive shrink-to-fit.

## 3. Visual hierarchy

Four levels — every element maps to exactly one:

| Level | What lives here | Style anchor |
|---|---|---|
| **1** | screen title · active study prompt · primary result metric | title.large / study.korean / stat.number |
| **2** | section header · card title · selected tab · key action label | title.medium / label.large |
| **3** | body content · list-row title · answer/meaning text | body.large / study.explanation |
| **4** | metadata · helper text · counts · timestamps | body.small / caption |

Rules: the screen's main task is **visually dominant**; **one** primary focal area per screen; L4 never
competes with L1–L2; cards group **related** content only; **no card-in-card**; avoid many bordered
containers on one screen; group with spacing **or** a divider, not both.

## 4. Action hierarchy

- **≤ 1 primary action** visible per screen region.
- Destructive actions are **never** styled as a normal primary action.
- Secondary actions → `secondary` or `ghost`.
- Icon-only actions → low-risk only, and always carry a semantic label.
- Destructive action requires **confirmation** when it deletes / restores / overwrites / loses progress.
- High-risk action shows a **warning callout**.

| Priority | Style | Examples |
|---|---|---|
| Primary | `MxActionButton` primary | Continue, Start, Check, safe Confirm |
| Secondary | secondary / back | Cancel, Back, View detail, Edit |
| Ghost | ghost / `MxIconButton` | audio, more, filter, auxiliary |
| Destructive | destructive token + confirm | Delete, Restore-overwrite, Remove language, Discard |
| Disabled / unavailable | disabled / "Soon" | future or blocked action |

## 5. Density & visual weight

- **Study** screens: spacious, focus-driven.
- **List** screens: denser, but readable.
- **Settings** screens: grouped rows, clear section rhythm.
- **Statistics** screens: fewer cards, stronger hierarchy.
- **Result** screens: summary first, detail second.
- **Modal menus**: compact rows, clear touch targets.

**Forbidden:** too many large cards on one screen; heavy borders around every small item; mixing dense +
spacious without reason; decorative surfaces that don't group anything.

## 6. Color usage grammar

- `feedback.correct` → correct/success learning feedback **only**.
- `feedback.wrong` → wrong/incorrect learning feedback **only**.
- `destructive.*` → destructive / high-risk data actions **only**.
- `srs.due` → due/repeat status **only**; `srs.preSrs` → new/Box 0 status **only**.
- `state.selected` → selection, **never** correctness.
- warning → caution only, not normal emphasis.
- chart colors → inside chart/stat components only.

**Forbidden:** error/destructive color as an accent; correct color for generic selection; due color for a
destructive action; more than ~2 semantic colors in one card.

## 7. State composition grammar

Every screen declares which of these apply and designs each: **loading · loaded · empty · error ·
unavailable** (if platform/feature dependent) · **no-due** (if SRS due cards involved) ·
**finalize-failed** (if a session finalizes) · **destructive-confirm** (if delete/restore/discard exists).

Rules: empty ≠ error; no-due ≠ error; unavailable ≠ disabled; finalize-failed **preserves user data**;
loading never shows fake content as real; a disabled action that blocks progress must explain why.

## 8. Dark / light composition grammar

- Dark and light frames use the **same** component structure — no dark-only or light-only layout.
- Surface contrast visible in both; correct/wrong/selected/disabled distinguishable in both.
- Charts readable in both; destructive stays visually separated in both.
- Long Korean/Vietnamese content readable in both.
