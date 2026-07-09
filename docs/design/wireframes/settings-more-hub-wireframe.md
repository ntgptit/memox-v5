# Settings / More Hub Wireframe

## Source docs

- [screens/settings-more-hub.md](../screens/settings-more-hub.md)
- [settings-more-hub-decision-table.md](../../decision-tables/settings-more-hub-decision-table.md)
- [navigation.md](../navigation.md)

Source status: **ready** (several functions Future per docs).

## Purpose

Trung tâm **chức năng hệ thống**. **Drawer không bắt buộc** — drawer mock chỉ là **nguồn chức năng**;
app hiện đại có thể dùng Settings/More Hub screen. Các chức năng vẫn truy cập được kể cả khi không có drawer.

## Entry points

- From app chrome (tab/more/settings) — route concept, not a raw route.

## Exit points

- Each group opens its target screen/flow (below).

## Data dependencies

- Activity summary: today's learning time + today's card/word count (read model).
- Otherwise navigational; targets own their data.

## Mutation boundaries

- **Opening the hub: read-only.** Mutations happen inside the target screens/flows.
- High-risk items (delete language, restore, cloud sync) require confirmation/policy in their flows.

## Primary layout

```
+------------------------------------------------------+
| SMH-HEADER: Settings / More                          |
+------------------------------------------------------+
| SMH-ACTIVITY:  today time  ·  today cards            |  (summary, read-only)
+------------------------------------------------------+
| SMH-GROUP-LANGUAGE   (add / delete)                  |
| SMH-GROUP-IMPORT-EXPORT                               |
| SMH-GROUP-STATISTICS  →                               |
| SMH-GROUP-APPEARANCE  →  (Chủ đề)                     |
| SMH-GROUP-APP-SETTINGS →  (Cài đặt)                   |
| SMH-GROUP-SUPPORT (FAQ / email / Telegram)           |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Target | Read-only / mutating | Notes |
|----|------|--------|----------------------|-------|
| `SMH-ACTIVITY` | Activity summary | inline | read-only | today learning time + today card/word count; **not** long-term Statistics; formula not defined |
| `SMH-GROUP-LANGUAGE` | Language management | add/delete language flows | mutating | **Delete = destructive**, needs confirmation/policy; "learning language" workspace **not** in data model → **Future** (see drift) |
| `SMH-GROUP-IMPORT-EXPORT` | Import/Export | import/export flows | mutating (import) / read-only (export) | Import **validates before commit**; Export **no data mutation**; file format not decided → **Future** |
| `SMH-GROUP-STATISTICS` | Statistics entry | [Statistics](statistics-wireframe.md) | read-only | long-term stats |
| `SMH-GROUP-APPEARANCE` | Appearance/Theme | [Appearance Settings](appearance-theme-settings-wireframe.md) | preference-mutating | Chủ đề |
| `SMH-GROUP-APP-SETTINGS` | App Settings | [App Settings](app-settings-wireframe.md) | preference/data ops | Cài đặt |
| `SMH-GROUP-SUPPORT` | Help & Support | FAQ / email / Telegram | read-only | provider/link **not hardcoded** if not configured; no account required |

## States

- `loading` / `loaded` / `error`.
- Activity summary: shows today's data if present; otherwise a neutral empty state.
- Any function whose platform feature is unavailable → its target shows an unavailable state.

## Interactions

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Open hub | Show groups + activity summary | **read-only** | this screen |
| Tap Statistics | Open long-term stats | read-only | Statistics |
| Tap Chủ đề | Open Appearance Settings | preference-mutating (inside) | Appearance |
| Tap Cài đặt | Open App Settings | preference/data ops (inside) | App Settings |
| Tap Add language | Start add-language flow | mutating (Future) | flow |
| Tap Delete language | Destructive → confirm + policy | mutating (Future) | flow |
| Tap Import | Validate before commit | mutating (Future) | flow |
| Tap Export | Export without mutating | read-only (Future) | flow |
| Tap FAQ / Email / Telegram | Open help/support | read-only | external/help |

## Accessibility / content notes

- Group items have text labels; no icon-only critical action.
- Activity summary reads as "today", clearly distinct from long-term Statistics.

## Open questions

- **Learning-language workspace** is not in the data model (distinct from UI i18n) → needs a data-model + destructive-policy task (Future).
- Import/export file format; Telegram/email links — not decided.
- Activity summary formula — read model.

## Out of scope

- Pixel/token, routes, animation.
- Drawer as a required UI (it is not).

## Acceptance criteria

- Functions remain accessible from the hub **without a drawer**.
- Activity summary is a **today** view, separate from Statistics.
- Delete language is **destructive** (confirm/policy); Import validates; Export never mutates.
- Cloud/backup-related high-risk operations are policy-gated (see App Settings).
