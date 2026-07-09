# Màn hình — Native Language Picker / Chọn tiếng mẹ đẻ

Concept ở **mức sản phẩm** cho màn chọn **tiếng mẹ đẻ**, child screen của
[App Settings](app-settings.md). Spec concept — không chốt schema/implementation.

> **Không** phải product module riêng; đi chung PR với App Settings.

## Screen name

**Native Language Picker / Chọn tiếng mẹ đẻ.**

## Purpose

Cho user **tìm và chọn** một **tiếng mẹ đẻ** làm preference (ưu tiên nội dung meaning/explanation phù
hợp). Chọn xong → **persist** và cập nhật summary ở [App Settings](app-settings.md).

## Entry point from App Settings

Bấm **Tiếng mẹ đẻ** trong [App Settings](app-settings.md#native-language-tiếng-mẹ-đẻ) → mở màn này.

## Native language concept

- Là **user preference** cho ngôn ngữ **meaning/explanation** / nội dung hỗ trợ học.
- Ví dụ chọn `Tiếng Việt` → app ưu tiên hiển thị nghĩa/giải thích tiếng Việt **nếu** card có dữ liệu;
  không có → **fallback** theo content-display docs sau.
- Đổi tiếng mẹ đẻ **không**: xóa card/deck; tự dịch dữ liệu; reset SRS; đổi study direction; đổi
  front/back card.

## UI concept

- **Header/search area:** Back; search input (hoặc search-like header); placeholder **"Chọn tiếng mẹ
  đẻ của quý vị"**.
- **Language row:** (xem [Language row contract](#language-row-contract)).
- **Không** chốt layout/animation/keyboard.

## Language row contract

| Thành phần | Bắt buộc? | Ghi chú |
|-----------|-----------|---------|
| icon/flag/avatar | tùy chọn | **chỉ là visual hint**, **không** phải identifier |
| **tên bản địa** | có | ví dụ `Bahasa Indonesia` |
| **tên phụ / mô tả script** | nên có | ví dụ `Indonesian, Malay (Roman script)` |
| selected state | có (khi đang chọn) | thể hiện rõ ngôn ngữ đang được chọn |

## Search / filter behavior

- Search **chỉ thay đổi danh sách hiển thị**; **không** đổi preference khi user chưa chọn.
- Không có kết quả → **empty state**. **Clear search** → trả lại danh sách đầy đủ.
- Nên hỗ trợ tìm theo **tên bản địa** và **tên phụ** nếu dữ liệu có.
- **Không** chốt search algorithm.

## Select behavior

- Chọn một ngôn ngữ → **persist native language preference** → cập nhật App Settings summary.
- **Save fail** → **giữ preference cũ** + hiển thị lỗi.

## Persistence concept

- Preference **persist** trong **local settings storage** (không chỉ volatile UI state); **restore
  được** sau app restart.

## Difference from Study Direction

- **Tiếng mẹ đẻ ≠ Study Direction.**
- **Study Direction** (ví dụ `KO → VI`) quyết định **hướng prompt/answer** khi học
  ([07-study-modes](../07-study-modes.md#hướng-direction-hiện--hỏi)).
- **Native language** là preference cho **nội dung giải thích/meaning** / UI hỗ trợ.
- Đổi native language **không** tự đổi study direction (trừ khi docs sau có rule rõ).

## Flag / icon rule

- Flag/icon **chỉ là visual hint**; **không** dùng làm định danh chính.
- Language định danh bằng **language code / internal id** (một ngôn ngữ dùng ở nhiều nước; một nước có
  nhiều ngôn ngữ). Không có icon phù hợp → **vẫn hiển thị bằng text**.
- **Không** chốt language code standard nếu docs chưa có.

## Data mutation rules

- Chọn/đổi native language **không** mutate deck/card/SRS/session; **không** auto-translate card.

## Empty / error states

| State | Ý nghĩa |
|-------|---------|
| `loading language list` | Đang tải danh sách ngôn ngữ. |
| `loaded language list` | Đã tải. |
| `search empty` | Không có kết quả khớp tìm kiếm. |
| `failed to load language list` | Lỗi tải danh sách. |
| `failed to save selected language` | Lỗi lưu — giữ preference cũ. |
| `no language selected yet` | Chưa chọn ngôn ngữ nào. |
| `selected language no longer available` | Ngôn ngữ đã chọn không còn khả dụng. |

## Open questions / cố ý không chốt

- exact language list **source** / **flag/icon asset** / **search algorithm** / **language code
  standard** / **fallback display rule** / **auto-translation** — **không** chốt.
- Quan hệ chính xác giữa **native language** ↔ **UI i18n** ([08-i18n](../08-i18n.md)) ↔
  **learning-language workspace** ([Settings/More Hub](settings-more-hub.md)) — cần content-display docs
  riêng.

Xem WBS: `F1.SETTINGS.LANGUAGE.1`, `F1.SETTINGS.LANGUAGE.2`.
