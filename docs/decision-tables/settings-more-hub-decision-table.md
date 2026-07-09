# Settings / More Hub Decision Table

Quick-reference rules for the drawer-derived **system functions**, surfaced via a modern
**Settings / More Hub** (drawer not required). Authoritative spec:
[`../design/screens/settings-more-hub.md`](../design/screens/settings-more-hub.md).

## Entry & functions

| Action | Result |
|--------|--------|
| user opens **Settings / More Hub** | show **system functions** |
| user opens **Activity summary** (Hoạt động hôm nay) | show **today's learning summary** if data exists |
| user taps **Add language** (Thêm ngôn ngữ) | start **add language** flow (creates a language scope) |
| user taps **Delete language** (Xóa ngôn ngữ) | require **destructive confirmation** |
| selected language **has learning data** | deletion requires an **explicit policy** (block / cascade / export-first) **before implementation** |
| user taps **Import** (Nhập) | open import flow; **validate before commit** |
| user taps **Export** (Xuất) | create export **without mutating** learning data |
| user taps **Statistics** (Thống kê) | open **Progress / Statistics** screen |
| user taps **Theme** (Chủ đề) | open **Appearance / Theme** settings |
| user taps **FAQ** (Câu hỏi thường gặp) | open **help content** |
| user taps **Email support** (Gửi email) | open **email / support** flow |
| user taps **Telegram support** (Nhắn tin Telegram) | open **Telegram / support link** if configured |
| **drawer UI unavailable** | functions **remain accessible** from Settings / More Hub |

## Boundaries

- **Activity summary** ≠ **Statistics** (long-term) ≠ **Session Result** (just-finished session).
- **Add/Delete language** = **learning-language workspace**, distinct from **UI i18n** (08-i18n) — and
  **not yet in the data model** (see the spec's [drift note](../design/screens/settings-more-hub.md#drift-note)).
- **Import** must validate before commit; **Export** must not mutate learning data; both are local-first.
- **Delete language** is destructive — confirm + a **decided policy** before touching learning data.

## Notes

- **Drawer** is **not** a required UI; it only sourced the function list.
- File formats (import/export), theme storage, and Telegram/email links/providers are **not** decided
  here; several functions are **Future** until they get their own spec/task.
