# Appearance / Theme Settings Wireframe

## Source docs

- [screens/appearance-theme-settings.md](../screens/appearance-theme-settings.md)
- [appearance-theme-settings-decision-table.md](../../decision-tables/appearance-theme-settings-decision-table.md)

Source status: **ready** (app-icon switching is Future/spike).

## Purpose

Cá nhân hóa giao diện (chế độ đêm tự động, theme ngày/tối, biểu tượng ứng dụng) mà **không** ảnh hưởng
dữ liệu học.

## Entry points

- **Settings / More Hub → Chủ đề**.

## Exit points

- Back → Settings / More Hub.

## Data dependencies

- Appearance preferences from local settings (auto-dark, day theme, night theme, app icon).

## Mutation boundaries

- **Only appearance preferences** change (and persist locally) when the user selects/saves.
- **Never mutates learning data** (deck/card/SRS/session).

## Primary layout

```
+------------------------------------------------------+
| APP-THEME-HEADER: [back]  Chủ đề                     |
+------------------------------------------------------+
| APP-THEME-AUTODARK: [ Chế độ đêm tự động ]  (Theo hệ thống) |
+------------------------------------------------------+
| APP-THEME-DAY:   [presetA][presetB][presetC]  (select)|
| APP-THEME-NIGHT: [presetA][presetB][presetC]  (select)|
+------------------------------------------------------+
| APP-THEME-ICON:  [iconA][iconB][iconC]  (select)      |
|   ⚠ shortcuts may disappear after icon change         |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `APP-THEME-AUTODARK` | Auto dark toggle | on → **follow system** (light→day theme, dark→night theme); off → manual (rule deferred) | on / off | toggle |
| `APP-THEME-DAY` | Day theme presets | light-mode presets (names not fixed → preset A/B/C) with **selected state** | loaded | select day preset (day only) |
| `APP-THEME-NIGHT` | Night theme presets | dark-mode presets with **selected state** | loaded | select night preset (night only) |
| `APP-THEME-ICON` | App icon variants | icon options with selected state; **warning: Home-screen shortcuts may disappear after change** | supported / unsupported | select icon (**Future / platform spike**) |

## States

- `loading settings` / `loaded settings` / `failed to load settings` (keep prior stable pref) /
  `failed to save settings` (keep prior stable pref) /
  `app icon change unavailable` (unsupported platform) / `app icon requires restart / launcher refresh`.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Toggle auto dark | Follow system / manual | preference only | stay |
| Select day theme | Update **day** preference only | preference only | stay |
| Select night theme | Update **night** preference only | preference only | stay |
| Select app icon | Change icon **if platform supports**; else unavailable/error | preference only | stay |
| Save fails | Show error; keep previous stable preference | none | stay |

## Accessibility / content notes

- Selected state visible (not color-only).
- The app-icon **warning** must be shown before/at change.
- Theme option labels/semantics present.

## Open questions

- Manual-theme rule when auto-dark is off — deferred to settings docs.
- Exact theme presets / tokens / icon assets — design system (not decided).
- App-icon dynamic switching feasibility — **platform spike** required.

## Out of scope

- Pixel/token values, native app-icon API, routes, animation.

## Acceptance criteria

- Auto dark **follows system**; day and night themes are chosen **independently**.
- App-icon variants documented at concept level with the **shortcut-disappear warning**; switching is **Future/spike**.
- Preferences **persist locally** and **never mutate learning data**.
