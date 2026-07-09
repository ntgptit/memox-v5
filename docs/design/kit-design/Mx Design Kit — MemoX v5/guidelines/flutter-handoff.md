# Mx Flutter Handoff

MemoX v5 is Expo / React Native, but the design kit names are chosen so a Flutter (or RN) implementation
maps **1:1**. Whenever possible, the design component name **is** the shared widget name.

## Token classes

| Design tokens (CSS) | Flutter class |
|---|---|
| `--mx-color-*` | `MxColorTokens` |
| `--mx-text-*`, `--mx-font-*`, `--mx-weight-*` | `MxTextTokens` |
| `--mx-space-*`, `--mx-size-*`, `--mx-layout-*` | `MxSpacing` |
| `--mx-radius-*` | `MxRadius` |
| `--mx-border-*` | `MxBorderTokens` |
| `--mx-motion-*`, `--mx-ease-*` | `MxMotionTokens` |
| component-level composed tokens | `MxComponentTokens` |

## Theme classes

- `MxTheme` — resolved theme object (colours + text + shape) for the active mode.
- `MxThemeMode` — `MxThemeMode.system | MxThemeMode.dark | MxThemeMode.light`.
- `MxDarkDefault` / `MxLightDefault` — the two token value sets (`:root` / `[data-theme="light"]`).
- `MxThemeResolver` — the **single** place that resolves mode → tokens. Component rendering and any
  debug/spec output use the **same** resolver. No per-screen brightness logic.

## Shared widgets (design name → Flutter widget)

`MxScaffold` (app shell) · `MxTopBar` · `MxContentShell` · `MxCard` · `MxListRow` · `MxActionButton` ·
`MxIconButton` · `MxSegmentedControl` · `MxModalSheet` · `MxConfirmDialog` · `MxStudyShell` ·
`MxStudyCard` · `MxStudyProgressBar` · `MxMatchTile` · `MxAnswerOption` · `MxRecallPanel` ·
`MxFillInputPanel` · `MxSettingsRow` · `MxEmptyState` · `MxErrorState` · `MxBadge` · `MxMetricCard` ·
`MxStatsChartPanel` · `MxSessionResultSummary`.

> If Flutter already has a shared widget with the same role, align the design name to the existing `Mx`
> name rather than inventing a new generic one.

## Rules for implementation agents

- **No** raw colours / raw spacing / screen-specific typography / one-off button or card styles.
- **No** icon-only critical action without a semantic label.
- **No** destructive action without the destructive token **and** a confirm pattern.
- **No** study-screen progress without `MxStudyProgressBar`.
- **No** settings row outside the `MxSettingsRow` pattern.
- **No** chart style outside `MxStatsChartPanel` / chart tokens.
- **No** widget checks brightness and picks raw colours — widgets consume `Mx` semantic tokens.
- Theme resolution happens in **one** `MxThemeResolver`; no duplicate dark/light logic per screen.
- No screen-specific theme override unless documented in this kit.

## Mapping example

```
Deck Management row
  screen element : deck row
  Mx component   : MxListRow  (leading=progress, trailing=MxBadge tone="due" + MxIconButton play)
  mx tokens      : --mx-color-surface-card, --mx-size-list-row-height-two-line,
                   --mx-color-srs-due, --mx-radius-md, --mx-space-12
  Flutter widget : MxListRow(leading: MxDeckProgress(...), trailing: [MxBadge.due(83), MxIconButton.play])
```

## Notes carried from the app

- Fonts: Plus Jakarta Sans (display + body), Noto Sans KR (Korean prompt), JetBrains Mono (numbers).
  Loaded via Google Fonts here; **self-host** the binaries (e.g. `PlusJakartaSans.ttf`) for the local-first app.
- Icons: this kit substitutes **Lucide** for the app's declared **SF Symbols** (`expo-symbols`). Confirm
  the production icon strategy at implementation.
