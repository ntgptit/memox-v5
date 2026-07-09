# 14 — Mx Golden Screens

Three exemplar screens future work must **mimic**. They are composition references, not full product
specs. Each is a live screen in `ui_kits/memox-app/` (light-first, Bazar language) plus the annotations
below. Dark parity is proven in the State Gallery / Themes cards.

---

## 1. Golden Deck Management / Home — `ui_kits/memox-app/index.html`
**Recipe:** MxListScreenRecipe. **Mimic when building:** any list/detail-entry screen (deck, subdeck,
flashcard list, language list).

**Component mapping**
| Region | Mx component |
|---|---|
| Header (search / title / bell) | MxTopBar + MxIconButton |
| Daily-goal promo | MxCard-like banner on `state.selectedSurface` + MxActionButton (pill) |
| "Continue studying" + See all | MxSectionHeader (actionLabel) |
| Deck tiles (carousel) | tinted cover + MxBadge (due/Done) |
| "Your decks" rows | MxCard interactive + progress ring + MxBadge + play circle |
| Bottom tabs | MxBottomNav |
| Play menu | MxModalSheet + MxListRow |

**Spacing:** screen padding 16 · promo→section 24 · section header→carousel 12 · carousel item gap 14
(hero exception) · card gap 10–12. **Typography:** L1 none (home), L2 section headers (title.medium),
L3 deck names (body.large bold), L4 counts (body.small). **Actions:** one primary ("Study now" pill);
play circles are per-item CTAs; search/bell/See-all are ghost. **States:** loaded shown; carousel tile
badges cover due / Done / New; empty + error via MxEmptyState/MxErrorState; Play menu hides **Repeat** at
0% progress.

## 2. Golden Study Session — `ui_kits/memox-app/study-session.card.html`
**Recipe:** MxStudyScreenRecipe. **Mimic when building:** reviewMode, matchMode, guessMode, recallMode,
fillMode, and all SRS Repeat modes.

**Component mapping**
| Region | Mx component |
|---|---|
| Top bar (exit / mode / audio) | MxTopBar study variant + MxIconButton |
| Progress | MxStudyProgressBar (mode label + step) |
| Prompt/meaning surface | MxStudyCard |
| Answer / input | MxAnswerOption · MxMatchTile · MxRecallPanel · MxFillInputPanel |
| Bottom action | MxActionButton |

**Spacing:** topbar→progress 12 · progress→card 24 · card→answer 22 (≈16–24 band). **Typography:** L1 study
prompt (study.korean), L3 meaning (study.explanation), progress label L4. **Actions:** one primary (Check
/ Continue); Hint is secondary; exit is protected. **States shown:** fillMode `wrong→retry`; also design
loaded, correct, revealed, finalize-failed. **Business:** progress bar ≠ mastery; pre-SRS feedback ≠ SRS
grading; only Check-correct (after 5 modes) activates Box 1.

## 3. Golden Settings — `ui_kits/memox-app/settings.card.html`
**Recipe:** MxSettingsScreenRecipe. **Mimic when building:** Settings/More Hub, App Settings, Appearance,
Reminder, SRS Settings.

**Component mapping**
| Region | Mx component |
|---|---|
| Top bar | MxTopBar settings variant |
| Hero intro | MxSectionHeader size="hero" |
| Groups | MxSettingsSection |
| Rows | MxSettingsRow (value / switch / unavailable / destructive) |
| Toggle | MxSwitch |
| Bottom tabs | MxBottomNav |

**Spacing:** section gap 24; rows use divider inside the group (0 gap) — not divider + gap. **Typography:**
hero L1→L2 (eyebrow + heading), group titles L4 uppercase, row titles L3. **Actions:** no primary CTA
(navigational); "Restore data" is the only destructive, in the separated **Data** group + confirm.
**States shown:** loaded, switch on/off, Cloud sync **unavailable** ("Soon"), destructive restore row.
**Business:** opening never mutates; theme row = visual preference only.

---

Every golden screen ships: light loaded + one non-happy state, and the mapping/spacing/typography/action/
state annotations above. Build a new screen by choosing its recipe, then mimicking the matching golden
screen's structure — do not invent a new composition.
