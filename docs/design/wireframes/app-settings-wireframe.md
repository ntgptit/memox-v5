# App Settings Wireframe (+ Native Language Picker, Reminder Settings, Spaced Repetition Settings)

## Source docs

- [screens/app-settings.md](../screens/app-settings.md)
- [screens/native-language-picker.md](../screens/native-language-picker.md)
- [screens/reminder-settings.md](../screens/reminder-settings.md)
- [screens/spaced-repetition-settings.md](../screens/spaced-repetition-settings.md)
- [06-srs-8box.md](../06-srs-8box.md)
- [app-settings-decision-table.md](../../decision-tables/app-settings-decision-table.md)

Source status: **ready** (cloud sync / app-icon-style items Future; "Ô: 7" open question).

## Purpose

Màn cấu hình chính: preference + data operations. **Khác** Appearance/Theme. Native Language Picker,
Reminder Settings, Spaced Repetition Settings là **child flow của App Settings** (không phải module riêng).

## Entry points

- **Settings / More Hub → Cài đặt**.

## Exit points

- Tiếng mẹ đẻ → **Native Language Picker**. Lời nhắc → **Reminder Settings**. Lặp lại giãn cách →
  **Spaced Repetition Settings**. Others open their sub-flows.

## Data dependencies

- Local app settings (native language, reminders, word-display, SRS prefs, game, backup meta).

## Mutation boundaries

- **Opening App Settings: read-only** — no learning-data mutation.
- Preference changes persist locally (settings = source of truth).
- Settings **do not** mutate deck/card/SRS/session **except** an explicit data op (**restore**) with confirmation/policy.
- **Backup** = no mutation. **Restore / Cloud sync** = **high-risk** (confirm/validate/policy).

## Primary layout

```
+------------------------------------------------------+
| AS-HEADER: [back]  Cài đặt                           |
+------------------------------------------------------+
| AS-NATIVE-LANG   Tiếng mẹ đẻ        <Tiếng Việt>  →  |
| AS-REMINDERS     Lời nhắc           <13:00 · days> → |
| AS-WORDFORM      Hình thức từ ngữ                  → |
| AS-SRS           Lặp lại giãn cách  <Ô, Thông báo> → |
| AS-GAME          Cài đặt trò chơi                  → |
| AS-BACKUP        Sao lưu / Khôi phục               → |
| AS-SYNC          Đồng bộ đám mây     (Future)      → |
+------------------------------------------------------+
```

## UI regions

| ID | Role | Target / content | Read-only / mutating | Notes |
|----|------|------------------|----------------------|-------|
| `AS-NATIVE-LANG` | Native language | opens Native Language Picker; shows current | preference | not study direction; no auto-translate |
| `AS-REMINDERS` | Reminders | opens Reminder Settings; shows summary | preference | never auto-starts study |
| `AS-WORDFORM` | Word display | toggles: show native fields; gender coloring; mark Cyrillic-in-Latin | preference | display only; no content change |
| `AS-SRS` | SRS settings | opens Spaced Repetition Settings | preference | must obey 8-box |
| `AS-GAME` | Game settings | game batch size; random selection; keyboard | preference | game is Future re: Phase 1 |
| `AS-BACKUP` | Backup/Restore | backup path; last backup; auto-backup; restore | **high-risk (restore)** | backup no mutation; restore confirm+validate+rollback-safe |
| `AS-SYNC` | Cloud sync | account/cloud sync | **high-risk / Future** | provider/conflict policy required; no data loss on fail |

## Child flow — Native Language Picker (`NLP-*`)

```
| NLP-HEADER: [back]  [search: "Chọn tiếng mẹ đẻ của quý vị"]           |
| NLP-LANG-LIST                                                        |
|   NLP-ROW: [flag?] Bahasa Indonesia   Indonesian, Malay (Roman)  ✓?  |
```

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `NLP-SEARCH` | Search | filter list; placeholder text | idle / filtering / empty | type to filter |
| `NLP-LANG-LIST` | Language list | rows | loading / loaded / search-empty / error | scroll; select |
| `NLP-ROW` | Language row | optional flag/icon (**visual only, not identifier**); **native name** + **secondary name/description**; selected state | — | select (persists preference) |

- Rules: search **only filters display**; selecting **persists native-language preference**; save fail →
  keep previous; **no deck/card/SRS/session mutation**; **no auto-translate**; **does not change study
  direction**; missing icon → text-only row; language identified by **code/id**, not flag.
- States: loading list / loaded / search empty / failed to load / failed to save (keep old) / none selected / selected-language-unavailable.

## Child flow — Reminder Settings (`SETTINGS-REMINDER-*`)

```
| SETTINGS-REMINDER-HEADER:  Lời nhắc                       [close]     |
| SETTINGS-REMINDER-LIST                                               |
|   SETTINGS-REMINDER-ITEM: [del] 13:00  [T2 T3 T4 T5 T6 T7 CN]        |
| SETTINGS-REMINDER-ADD:  [ + ]                                        |
```

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `SETTINGS-REMINDER-LIST` | Reminder list | reminder items | loading / loaded / no-reminders | scroll |
| `SETTINGS-REMINDER-ITEM` | Reminder | delete; time; weekday chips; (optional enabled) | valid / invalid (no weekday) | edit time; toggle weekdays; delete |
| `SETTINGS-REMINDER-ADD` | Add | create default/draft reminder | — | add |

- Rules: multiple reminders; each has **time + weekdays**; unselect all weekdays → invalid/disable per
  rule; **reminder never auto-starts a session**; permission-missing / platform-unavailable / OS-sync-failed
  states; persist local (source of truth); save fail → keep previous. **No deck/card/SRS/session mutation.**
- Not fixed: notification API, permission flow, slider, save timing, default time, max count, duplicate policy.

## Child flow — Spaced Repetition Settings (`SRS-SET-*`)

```
| SRS-SET-HEADER: [back]  Lặp lại giãn cách                            |
| SRS-SET-BOX:        Ô: 7        (OPEN QUESTION — not 7-box)          |
| SRS-SET-ORDER:      Thứ tự hộp khi lặp lại   (Tăng)                  |
| SRS-SET-NOTIFY:     Thông báo (khi cần lặp lại)                      |
| SRS-SET-LAPSE:      Nếu không nhớ  → Di chuyển vào ô trước đó        |
| SRS-SET-GAME-SRC:   Lựa chọn từ trong "Một trò chơi"                 |
```

| ID | Role | Content | States | Actions |
|----|------|---------|--------|---------|
| `SRS-SET-BOX` | Box setting "Ô: 7" | **open question** — current/max/selected box or legacy value | — | **blocked until product decision** |
| `SRS-SET-ORDER` | Repeat ordering | Tăng (Giảm/Ngẫu nhiên future) — **ordering only** | — | select |
| `SRS-SET-NOTIFY` | SRS notification | notify **only when due cards exist**; **no auto-start session**; no box/due change | on / off / permission-missing / unavailable | toggle |
| `SRS-SET-LAPSE` | Lapse policy | "Di chuyển vào ô trước đó" = stepDown; **SRS Repeat only**; **never below Box 1**; not for pre-SRS/browse | — | select |
| `SRS-SET-GAME-SRC` | Game word source | "Chế độ lặp lại giãn cách" → Box 1+ due pool (concept) | — | select |

- Rules: **must not override the documented 8-box model**; box/due-affecting settings need a
  policy/migration task; opening/editing **does not** mutate deck/card/session; persist local; save fail → keep previous.
- **DRIFT / open question:** mock shows **"Ô: 7"** while docs use **8-box** → keep as open question; **do
  not implement 7-box**. (Recorded in
  [spaced-repetition-settings.md](../screens/spaced-repetition-settings.md#box-setting--ô-7-open-question).)

## States (App Settings top-level)

- `loading settings` / `loaded settings` / `failed to load settings` /
  `failed to save settings` (keep prior stable) / `unavailable platform feature` /
  `high-risk action requires confirmation`.

## Interactions (high-risk)

| Trigger | Behavior | Mutation | Navigation |
|---------|----------|----------|-----------|
| Backup | Create backup copy | **no learning-data mutation** | stay |
| Restore | Confirm → validate backup → apply; rollback-safe | **destructive (overwrites DB)** | stay |
| Restore fails | Keep current DB safe | none | stay |
| Cloud sync | Requires provider/conflict policy | **Future** | Future |
| Open any settings screen | Show settings | **read-only** | sub-screen |

## Accessibility / content notes

- Every row/action has a text label (no icon-only critical action).
- High-risk actions clearly labeled and confirmed.
- Native-language secondary name aids disambiguation; long names wrap/truncate.

## Open questions

- **"Ô: 7"** meaning (open question; not 7-box).
- Cloud sync provider/conflict policy; backup file format — not decided (Future).
- Learning-language workspace vs UI i18n vs native language — content-display docs (Future).
- Notification API/permission; game pool algorithm — not decided.

## Out of scope

- Pixel/token, routes, animation, keyboard/notification/native APIs, migration/schema.

## Acceptance criteria

- Opening App Settings and its sub-screens is **read-only** for learning data; preferences persist local.
- Native Language Picker: search filters display only; selecting persists; no auto-translate; not study direction; flag not identifier.
- Reminders: multiple, time + weekdays, add/delete, never auto-start a session; permission/unavailable states present.
- Spaced Repetition Settings: **"Ô: 7" stays an open question and does not override 8-box**; repeat ordering
  affects order only; SRS notification only when due; lapse only in SRS Repeat, never below Box 1.
- **Restore** and **Cloud sync** are **high-risk** (confirm/validate/policy); **Backup** no mutation.
