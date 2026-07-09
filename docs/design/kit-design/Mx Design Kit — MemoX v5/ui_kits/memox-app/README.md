# MemoX App — Sample Screens (UI kit)

High-fidelity sample screens that prove the Mx Base Mobile Design Kit composes into real MemoX v5 views, in the **Bazar design language** (light-first, pill buttons, "See all" section headers, underline tabs, deck-tile carousels, bottom nav). These are **not** final product screens — they are usage frames built **only** from Mx components + tokens, per the governance rule (no screen may create custom style outside the kit).

## Screens

| File | Role | Shows |
|------|------|-------|
| `index.html` | Home | Bazar home — daily-goal promo + pill CTA, "Continue studying" **See all** carousel of deck tiles, "Your decks" ring cards, `MxBottomNav`. Also a **starting point**. |
| `deck-detail.card.html` | Deck Detail | Bazar detail — cover, title + favorite, meta stats, `MxSectionHeader` + study-mode `MxListRow`s, sticky pill actions. |
| `study-session.card.html` | Study Session | fillMode (mode 5/5, the SRS activation gate) — `MxStudyProgressBar` + `MxStudyCard` + `MxFillInputPanel` (wrong→retry). |
| `settings.card.html` | Settings / More Hub | Hero header + grouped `MxSettingsRow`s (switch, unavailable, destructive restore), `MxBottomNav`. |
| `statistics.card.html` | Statistics | Hero header + `MxTabs` (underline) + `MxMetricCard` grid + `MxStatsChartPanel`, `MxBottomNav`. |
| `appearance-reminders.card.html` | Appearance & Reminders | `MxThemePresetTile` + `MxReminderRow` — rendered as a dark + light parity pair. |

`phone.css` is a shared **384×824 phone frame (Samsung Galaxy S23 Ultra, 19.3:9)** with status bar, scroll body, and sticky bottom slot. Screens are **light-first** (`data-theme="light"`); dark parity is shown in the State Gallery / Themes cards and the appearance screen.

## How they load
Each file links `../../styles.css`, loads `../../_ds_bundle.js`, and mounts components via `const { … } = window.MxDesignKitMemoXV5_9f1387`. Icons use Lucide via CDN (SF-Symbols substitute — see root `readme.md` → Iconography).

## Business rules honored
- Pre-SRS feedback (fillMode) is learning feedback, not SRS grading; only Check-correct activates Box 1.
- Play Menu adapts to scope state (Variant A hides **Repeat** when progress = 0%).
- Opening Settings/Statistics never mutates data; restore is a `tone="destructive"` row (pair with `MxConfirmDialog`).
- Due badges (amber) are visually distinct from wrong/destructive (red).
