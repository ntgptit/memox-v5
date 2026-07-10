# Deck Management — Mobile UI Construction Contract record

Pilot record proving `deck-management.card.html` against the 9-step Mobile UI Construction Contract.
Screen = the subdeck list inside a parent deck (`Korean TOPIK I`). Medium = design-kit HTML mockup
in the fixed `phone.css` frame; runtime items (§7 widths / font-scale / keyboard / safe-area) are
simulated per note below and are truly validated in the React Native implementation.

## §1 Screen plan

- **Primary objective:** let the user find a subdeck and start studying it (or drill deeper).
- **Primary CTA (exactly one):** **Add card** (sticky, filled primary, bottom-right).
- **Secondary actions shown (≤2):** *New subdeck* (bottom secondary) and per-row *Start studying* (surface icon button). Search + sort are controls, not CTAs.
- **Content roles:** primary = deck rows (name + progress); secondary = due/new workload badges; metadata = word count, direction (`KO → EN`), sort order, header count.

## §2 Archetype

**List** (scrollable collection of peer items with a control area + sticky bottom actions). No bespoke layout — the List archetype covers it.

## §3 Composition map

1. **Top context** — `MxTopBar`: back + deck name + count subtitle.
2. **Primary content** — deck rows (`MxCard` interactive: progress ring, name, workload badge, start button).
3. **Supporting content** — control area: search field + direction badge + sort trigger.
4. **Secondary sections** — none (flat list); row-state / delete variants are separate fixtures.
5. **Primary action** — sticky bottom bar: New subdeck (secondary) + Add card (primary).
6. **Feedback area** — result count line (search), empty/error centered states, delete confirm dialog.

Every section is justified; no decorative card/divider/icon/colour added.

## §4 Component map (Mx* only + token-only local helpers)

| Section | Component |
|---|---|
| Top bar | `MxTopBar`, `MxIconButton` |
| Search field | local `SearchField` (token-only; no Mx text-input exists) |
| Direction / workload | `MxBadge` |
| Sort trigger | `MxActionButton` (ghost, small) |
| Deck row | `MxCard` (interactive/disabled) + `MxIconButton` (start) + local `Ring`, `DueBadge` |
| Empty / error | `MxEmptyState`, `MxErrorState` |
| Delete confirm | `MxConfirmDialog` (highRisk) |
| Bottom actions | `MxActionButton` (secondary + primary) |

## §4/§5 Layout & hierarchy compliance

- Screen gutter **16**; section rhythm **24**; item gap **12**; all spacing ∈ {4,8,12,16,24,32,48} — enforced by `check-screen-tokens.mjs`.
- **1 primary CTA** (Add card); everything else secondary/ghost/surface.
- Surface nesting ≤ 3 (screen → row card → badge); **no card-in-card**.
- Touch targets ≥ 44 (`MxIconButton`/`MxActionButton` ≥44; `SearchField` `minHeight:44`).
- No hard-coded colour/radius/typography/spacing outside tokens (guard-verified: 0 raw hex).
- One top-level heading (deck name in top bar); typography roles used ≤5 (title, body-large, body-small, label, caption).
- Primary content (deck name, body-large 700) outweighs metadata (body-small tertiary); primary CTA (filled) > secondary (outline); no primary colour used as decoration; grouping via surface/border contrast, no shadow.

## §6 State matrix (each dark + light)

| State | Fixture |
|---|---|
| Loading | `LoadingPhone` (skeleton, `aria-busy`) |
| Loaded — normal | `LoadedPhone` (5 decks) |
| Loaded — minimum data | `MinDataPhone` (1 deck, 0 due) |
| Loaded — dense data | `DenseDataPhone` (12 decks, scrolls) |
| Empty | `EmptyPhone` |
| Recoverable error | `ErrorPhone` (data-safe copy + Retry) |
| Search active / empty | `SearchActivePhone` / `SearchEmptyPhone` |
| Row states | `RowStatesPhone` (default/pressed/due/no-due/disabled) |
| Delete confirm (high-risk) | `DeleteConfirmPhone` |
| Dark | every fixture renders `data-theme` dark + light |

Not a Form → form sub-states N/A.

## §7 Edge-data checklist

| Edge case | Fixture | Result |
|---|---|---|
| 3-line / very long title | `LongTextPhone` | Row name clamps to **2 lines** (see D-01); full name is the hero on Deck Detail. No layout break. |
| VN / EN / KO text | `VNPhone` (VN chrome + `KO → VI`), EN default, KO on study screens | Renders + wraps; no clip |
| Number 0 and very large | `MinDataPhone` (0 due) + `LongTextPhone` (9,999 words / 1,234 due) | Comma-formatted, badges fit |
| Long badge/label | `LongTextPhone` (`1,234 due`) | Fits row, wraps to meta line |
| 1-item vs many-item | `MinDataPhone` (1) / `DenseDataPhone` (12) | Both hold |
| Font scale 1.3 & 1.5 | `FontScalePhone` (token `--mx-text-*-size` ×1.3 / ×1.5) | Rows reflow/clamp; single CTA holds; measured overflow 0px |
| Widths 320/360/390/430 | `WidthPhone` (frame width override) | Rendered at exactly 320/360/390/430; content reflows; metadata wraps not clips (D-03); overflow 0px |
| Keyboard open | `KeyboardSearchPhone` | Single CTA yields to keyboard; focused search + results stay visible (active control reachable) |
| Safe-area notch / gesture | `.mx-status` (top), `.mx-bottom`/keyboard use `env(safe-area-inset-bottom)` | Respected via phone.css + inset padding |
| No/broken image | N/A — screen has no imagery (avatars are token glyph rings) | — |

Runtime note: fixed 384px `phone.css` frame — widths/font-scale/keyboard/safe-area are simulated here (width & token overrides, faux keyboard); real dynamic-type/responsive/keyboard/safe-area verification belongs to the React Native build.

## §8 Visual defect report

| ID | Defect | Gate | Fix | Re-verify |
|---|---|---|---|---|
| **D-01** | Deck-row name used 1-line `nowrap` + ellipsis → long/KO/VN names hidden | "important content not hidden by ellipsis" | 2-line `-webkit-line-clamp` clamp; full name on Deck Detail | `LongTextPhone` shows 2 lines, no break |
| **D-02** | Bottom bar (New subdeck + Add card) overflowed → **Add card clipped** at width-320 and font-1.5 | "no overflow" / "primary action reachable" | **New subdeck moved to the app bar (folder+ icon)** → a single full-width primary CTA that cannot overflow | Measured overflow 0px at 320 & 1.5×; screenshot confirms |
| **D-03** | On the metadata line, the status badge was **clipped** at width-320 (forced single line) | "no overflow / no important content clipped" | Metadata `flex-wrap` (consistent across all rows) → badge drops below the word count only when tight; single line at ≥360 | Worst badge overflow re-measured 0px at 320; single line at 384 |

All other visual gates passed: no off-scale spacing (guard), no hard-coded style (guard), touch ≥44, one primary CTA, consistent 16px alignment, clear hierarchy, empty/loading/error share the composition, long text bounded, primary action reachable with keyboard open.

## Composition revision (design-critique pass — P0/P1/P2)

Applied after review feedback ("right components, wrong composition"):

- **P0 header height** — app-bar → 12 → search **48px** (elevated surface) → 12 → filter chips **40px** → 16 → list. Header ≈ **181px** above the list (excl. status bar), within the 180–200 target.
- **P0 New subdeck** — moved from a competing bottom button to an app-bar `folder+` action; bottom now holds a **single** primary `+ Add card` (resolves D-02).
- **P0 play button** — kept at 44px `MxIconButton` surface; the **progress ring is now lower visual weight** (3px muted track, `--mx-color-srs-preSrs`/`secondary` text) so it reads as info, not a second button. Ring is non-interactive (no ripple), `aria-label="{p}% mastered"`.
- **P0 metadata/status** — one consistent line `{words} words  {status badge}`; standardized badges Due=amber+clock / New=neutral+sparkle / Completed=success+check, 24px, icon 14.
- **P0 progress %** — ring shows `66%` / `100%` / `0%` (0% = neutral track, no accent).
- **P1 filters** — both are now one control system: 40px capsule chips, radius 999. `KO → EN` selected (tonal surface); `A → Z` outline. (Direction has **no ▼ picker** — read-only in Phase 1 per the deck-management spec drift note.)
- **P1 title** — deck name `body-large` **semibold (600)** (was 700), 2-line clamp, name-first hierarchy.
- **P1 surface** — 3 levels: screen bg (0) / deck card (1) / search+elevated control (2, `surface-elevated`); sticky footer keeps its `phone.css` top divider.
- **P1 contrast** — word count raised to `text-secondary`.
- **§10 hierarchy** — name + due are the first-read elements; rings de-emphasized; a single create action.
- **P2** — verified 2-line title, font scale 1.3/1.5, 3-digit due (`127 due` in dense fixture, `1,234 due` in long fixture), plus loading/empty/search-empty/error states.

## §9 Definition of Done

- [x] Screen plan (§1) · [x] Archetype (§2) · [x] Composition map (§3) · [x] Component map (§4)
- [x] State matrix (§6, dark+light) · [x] Fixture data (min/dense/long/VN/0/huge in-file)
- [x] Responsive verification (widths 320–430, font 1.3/1.5) · [x] Accessibility (44px targets, colour+glyph pairing, `aria-busy`, icon-button labels)
- [x] Screenshots (long / font-1.5 / width-320 before+after) · [x] Visual defect report (D-01, D-02) · [x] Defect-fix results (re-verified)
- [x] Guard/test: `check-screen-tokens.mjs` (raw-hex + off-scale-gap lint) — passes on all 20 screens

Conclusion cites specific gates/fixtures above — no "looks good" self-assessment.
