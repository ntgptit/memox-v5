# Mx Mobile Layout Templates

The named layout templates every MemoX screen is built from. Each is a **composition of Mx components +
tokens** — not a new component. Regions, spacing, and mobile behavior are fixed here so screens stay
consistent. Live samples are in `ui_kits/memox-app/` (each renders in dark **and** light).

## Screen scaffold (all templates share)

Reference device: **Samsung Galaxy S23 Ultra** — 19.3:9 aspect, CSS **384×824** (Android-first). All
sample screens render in this frame.

```
[ safe-area / status bar ]
[ MxTopBar ]                         sticky, layer=sticky
[ scroll body ]                      flex:1, overflow-y:auto, 16px gutters, 24px section gap
[ sticky bottom action area ]        optional, respects safe-area-inset-bottom
```

Tokens: `--mx-layout-screen-padding-x` (16), `--mx-layout-section-gap` (24),
`--mx-layout-bottom-action-inset` (12), `--mx-layout-content-max-width` (520 cap on tablet).

## Templates

| Template | Regions | Sample |
|----------|---------|--------|
| **MxListScreenTemplate** | TopBar · direction/summary strip · scrollable `MxListRow` list · bottom add actions | `ui_kits/memox-app/index.html` |
| **MxDetailListTemplate** | TopBar (parent name) · nested `MxListRow`s (Subdeck List variant) · bottom actions | Subdeck variant of the list screen |
| **MxStudySessionTemplate** | study TopBar (centred, close + audio) · `MxStudyProgressBar` · main mode area · bottom/inline actions | `ui_kits/memox-app/study-session.card.html` |
| **MxModalMenuTemplate** | scrim · `MxModalSheet` (grab handle, title, `MxListRow` options, optional action row) | Play Menu in `index.html` |
| **MxSettingsScreenTemplate** | settings TopBar · grouped `MxSettingsSection` + `MxSettingsRow` | `ui_kits/memox-app/settings.card.html` |
| **MxNestedSettingsScreenTemplate** | back TopBar · single-topic content (reminder rows / language rows / SRS rows) | Reminder & Native Language flows |
| **MxStatisticsScreenTemplate** | TopBar + scope · `MxSegmentedControl` tabs · `MxMetricCard` grid · `MxStatsChartPanel` | `ui_kits/memox-app/statistics-result.card.html` |
| **MxResultScreenTemplate** | study TopBar · `MxSessionResultSummary` · bottom CTAs (Done / Study more) | same file (Result pane) |
| **MxEmptyErrorScreenTemplate** | TopBar · centred `MxEmptyState` **or** `MxErrorState` (never confused) | State Gallery cards |

## Mobile responsiveness

- **Primary target:** compact + normal Android phones; **reference device Samsung Galaxy S23 Ultra**
  (19.3:9, CSS 384×824). Large phones widen gutters to 20px
  (`--mx-layout-screen-padding-x-wide`). Tablet/foldable: cap content at 520px, centred — future-compatible,
  not primary.
- Bottom actions respect the Android gesture / safe-area inset; modal width stays readable
  (`--mx-size-modal-width` 400 / min 300).
- Korean + Vietnamese mixed text must not overflow — long meanings **wrap or scroll**, never shrink below
  readable size. Long deck names truncate with ellipsis.
- Keyboard-aware: fill/input screens keep the input and its actions above the keyboard; sticky bottom
  actions never cover important content.
