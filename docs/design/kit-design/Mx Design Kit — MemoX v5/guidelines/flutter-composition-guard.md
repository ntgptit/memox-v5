# 17 — Mx Flutter Composition Guard Rules

Design guidance for implementation agents; maps to a code-verification guard later. MemoX is a **Flutter**
project — these rules constrain feature-screen code so it stays composition-correct.

## Forbidden in feature screens
- Raw `Color(0x…)` / `Colors.*` → use `MxColorTokens`.
- Raw `TextStyle(…)` → use `MxTextTokens`.
- Arbitrary `EdgeInsets` / `SizedBox` sizes outside `MxSpacing`.
- Raw `BorderRadius` outside `MxRadius`.
- Raw `Divider` styles outside `MxDivider` tokens.
- Custom button styles outside `MxActionButton`; custom cards outside `MxCard`.
- Custom settings rows outside `MxSettingsRow`; custom study progress outside `MxStudyProgressBar`.
- `Theme.of(context).brightness` / brightness checks **inside** feature screens.
- Screen-specific theme overrides not documented in the Mx kit.

## Allowed
- Screen-specific **layout composition** using an approved recipe.
- A screen-specific component **only** if it isn't reusable (and it stays **unprefixed**, no `Mx`).
- A **promotion proposal** to the Mx kit when reuse appears.

## Guard flags (examples a lint rule should catch)
- `Color(0x…)`  → raw color
- `EdgeInsets.all(13)` / `EdgeInsets.symmetric(horizontal: 13)` → non-token spacing
- `SizedBox(height: 17)` → non-token size
- `TextStyle(fontSize: 19)` → raw typography
- `BorderRadius.circular(11)` → non-token radius
- `Card(` in a feature screen → should be `MxCard`
- `ElevatedButton(` / `TextButton(` in a feature screen → should be `MxActionButton`
- brightness-based raw color branching in a screen → theme must resolve via one `MxThemeResolver`

Resolution: one shared `MxThemeResolver`; widgets consume Mx semantic tokens; no duplicated dark/light
logic per screen.
