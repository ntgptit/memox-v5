# Appearance / Theme Settings Decision Table

Quick-reference rules for the **Appearance / Theme Settings** screen (Chủ đề). Authoritative spec:
[`../design/screens/appearance-theme-settings.md`](../design/screens/appearance-theme-settings.md).

## Entry & options

| Action | Result |
|--------|--------|
| user taps **Chủ đề** (in Settings / More Hub) | open **Appearance / Theme Settings** |
| **auto dark mode enabled** | follow **system light/dark** (light → day theme, dark → night theme) |
| **auto dark mode disabled** | use the **user-selected** appearance rule from settings docs (later) |
| user selects a **day theme** | update **day theme** preference **only** |
| user selects a **night theme** | update **night theme** preference **only** |
| user selects an **app icon** | change icon **only if platform support is available** |
| **app icon change unsupported** | show **unavailable/error** state; **do not corrupt** settings |

## Data & failure

| Condition | Result |
|-----------|--------|
| any appearance setting changed | **no learning-data mutation** (deck/card/SRS/session unchanged) |
| settings **save failed** | show **error**; keep the **previous stable preference** |
| settings **load failed** | show error; keep previous stable preference |

## Notes

- **Drawer** is **not** required; Appearance is reachable from Settings / More Hub or a modern appearance screen.
- Appearance preferences must **persist** in **local settings** (not volatile UI state); source of truth is local.
- **App icon switching** needs verified **platform support** first (spike) and may **remove Home-screen
  shortcuts** / require restart — see the spec's
  [Platform notes](../design/screens/appearance-theme-settings.md#platform-notes-for-app-icon).
- Theme token values, icon asset names, dynamic-app-icon native API, persistence schema, route name, and
  the platform support matrix are **not** decided here.
