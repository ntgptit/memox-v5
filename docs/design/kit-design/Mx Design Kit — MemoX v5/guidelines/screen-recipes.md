# 13 — Mx Screen Recipes

Each screen archetype has ONE recipe. A future screen **picks a recipe** and follows its anatomy, spacing,
action hierarchy, and required states. Recipes compose Mx components + tokens per the
[Composition Grammar](composition-grammar.md); they never invent new spacing or styles.

Legend: blocks are top→bottom. Spacing values are `mx.space.*`.

---

## 1. MxListScreenRecipe
**For:** Deck Management, Flashcard List, Language list, generic content lists.
**Template:** MxAppShell + MxTopBar.
**Anatomy:** TopBar → optional status/filter strip → list section → optional sticky bottom action →
empty/error state.
**Spacing:** screen padding 16 · topbar→content 16 · filter→list 16 · item gap 12 · section gap 24.
**Components:** MxTopBar, MxListRow **or** MxCard rows, MxBadge (due/new), MxIconButton (play), MxBottomNav
(if top-level), MxEmptyState/MxErrorState.
**Actions:** one primary (Add / Start); sort/filter are ghost and **read-only** unless docs say otherwise.
**Scroll:** vertical; sticky bottom stays out of the scroll. **Safe area:** bottom action respects inset.
**States:** loading, loaded, empty (no decks), search-empty, error, no-due (if surfaced).
**Dark/light:** rows must separate from bg by surface + border in both.
**Common mistakes:** mixed row styles in one list; row height that clips long deck names; two primaries.
**React Native:** `FlatList` of `MxListRow`/`MxCard`; never a raw hand-rolled row style.

## 2. MxDetailScreenRecipe
**For:** card detail, deck detail, future detail pages.
**Anatomy:** MxTopBar (back + low-risk action) → primary info block (cover/title) → secondary metadata
(meta stats) → related actions (mode list) → destructive actions in a **separate** bottom section.
**Rules:** one primary content area; metadata never dominates; destructive visually separated.
**Spacing:** section gap 24; meta tiles gap 12. **States:** loaded, loading, error, unavailable.
**Common mistakes:** metadata competing with the title; delete mixed into normal actions.
**React Native:** one primary CTA (`MxActionButton` primary); destructive is its own section.

## 3. MxStudyScreenRecipe
**For:** New Learning modes, SRS Repeat modes, Review Words variant.
**Template:** MxStudyShell.
**Anatomy:** MxTopBar (study variant, protected exit) → MxStudyProgressBar → main study content
(MxStudyCard) → answer/options/input area → bottom action.
**Spacing:** topbar→progress 12 · progress→content 16–24 · content→answer 16 · answer items 12 · bottom
action top 16.
**Components:** MxStudyShell, MxTopBar, MxStudyProgressBar, MxStudyCard, MxAnswerOption / MxMatchTile /
MxRecallPanel / MxFillInputPanel, MxActionButton.
**Rules:** active content is the focus; progress ≠ SRS mastery; Review Words **signals read-only**; pre-SRS
feedback must **not** look like SRS grading; exit is a protected/clear action.
**Keyboard:** fillMode keeps input + actions above the keyboard.
**States:** loaded, correct, wrong, selected, revealed, retry, finalize-failed (preserve data).
**Common mistakes:** progress bar read as mastery; two primaries; cramped answer area.
**React Native:** progress always via `MxStudyProgressBar`; never a custom progress bar.

## 4. MxFormScreenRecipe
**For:** settings forms, reminder settings, import/restore configuration.
**Anatomy:** MxTopBar → sectioned form groups → helper/warning callout → bottom save/confirm (if needed).
**Rules:** explicit labels; validation errors near the field; keyboard-safe bottom; high-risk action
separated from a normal save.
**States:** idle, invalid (inline), saving, save-failed, high-risk confirm.
**React Native:** fields grouped in `MxSettingsSection`; high-risk save uses destructive + `MxConfirmDialog`.

## 5. MxSettingsScreenRecipe
**For:** Settings / More Hub, App Settings, Appearance Settings, Spaced Repetition Settings.
**Anatomy:** MxTopBar → optional summary/hero → grouped `MxSettingsSection` → `MxSettingsRow` list →
high-risk section **separated**.
**Spacing:** section gap 24; rows use divider with **0** gap **or** card rows with 8/12 gap — **never both**.
**Rules:** opening settings **does not mutate**; high-risk rows use warning/destructive grammar;
future/unavailable rows are visibly unavailable ("Soon"), not broken.
**States:** loaded, switch on/off, unavailable, destructive confirm.
**Common mistakes:** heavy divider **and** big gaps; restore styled like a normal row.

## 6. MxModalSheetRecipe
**For:** Play Menu, Repeat Mode Menu, Sort Menu, reminder modal.
**Anatomy:** grab handle → title → optional context → action rows → optional footer action → close/cancel.
**Rules:** task-focused; no nested modal unless unavoidable; rows large enough to tap; destructive option
separated; unavailable future option visible but disabled with explanation.
**States:** open, scrolled, destructive-confirm variant.
**React Native:** `MxModalSheet` (RN `Modal`); option rows are `MxListRow`.

## 7. MxResultScreenRecipe
**For:** Session Result, future import/export result.
**Anatomy:** summary hero → key metrics → detailed breakdown → next actions → secondary navigation.
**Rules:** result **is not statistics**; primary result metric first; **one** primary next action; avoid
overwhelming charts here.
**Components:** MxSessionResultSummary, MxMetricCard, MxActionButton.
**States:** newLearning result, srsRepeat result, finalize-failed (retry, data preserved).

## 8. MxStatisticsScreenRecipe
**For:** Statistics.
**Anatomy:** MxTopBar → scope filter → tab control (`MxTabs` underline) → chart area → metric summary →
empty/read-model-needed states.
**Rules:** charts **never** use fake data; selected tab clear; axis/grid readable in both modes; don't
overload with metrics.
**Components:** MxTabs, MxMetricCard, MxStatsChartPanel.
**States:** loaded, empty (no data / read-model-needed), loading.
**Note:** Statistics is **long-term analytics**, never a Session Result.

## 9. MxEmptyErrorScreenRecipe
**For:** empty decks, no-due, search-empty, load-failed, save-failed, finalize-failed, unavailable/future.
**Anatomy:** centered icon → title → message → recovery action.
**Rules:** message explains what happened; recovery action is clear; **no-due is positive/neutral, not an
error**; finalize-failed **preserves data** and offers retry.
**Components:** MxEmptyState (neutral/positive/unavailable), MxErrorState (retry).
