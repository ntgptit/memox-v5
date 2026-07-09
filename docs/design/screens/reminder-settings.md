# Màn hình — Reminder Settings / Lời nhắc

Concept ở **mức sản phẩm** cho **cấu hình lời nhắc học**, child flow của [App Settings](app-settings.md).
Spec concept — không chốt notification API / permission flow / slider / route.

> **Không** phải product module riêng; đi chung PR với App Settings.

## Screen name

**Reminder Settings / Lời nhắc.**

## Purpose

Giúp user **duy trì thói quen học** bằng các lời nhắc theo **giờ** và **ngày trong tuần**. Reminder
**chỉ là nhắc học** — **không** tự bắt đầu session, **không** mutate learning data.

## Entry point from App Settings

Bấm **Lời nhắc** trong [App Settings](app-settings.md#reminders-lời-nhắc) → mở **Reminder Settings**
(modal hoặc screen). Mock: `13:00 [T.2, T.3, T.4, T.5, T.6, T.7, CN]`.

## Reminder item contract

| Thành phần | Ghi chú |
|-----------|---------|
| **stable id** | định danh reminder |
| **time** | giờ hợp lệ, ví dụ `13:00` / `12:00` |
| **selected weekdays** | ví dụ `T.2, T.3, T.4, T.5, T.6, T.7, CN` |
| **delete action** | xóa reminder |
| **enabled/disabled** | nếu product scope cần sau này |

## Multiple reminders behavior

- User có thể có **nhiều reminder**.
- Mỗi reminder phải có **giờ hợp lệ** và **nên có ≥ 1 ngày** trong tuần.
- Nếu user bỏ chọn **toàn bộ ngày** → hiển thị **invalid state** hoặc tự **disable** reminder theo rule
  implementation sau.

## Time selection behavior

- Mỗi reminder có **time control** (mock dùng slider, nhưng **không chốt** slider là bắt buộc).
- **Không** chốt default time / save timing (save ngay hay khi đóng modal).

## Weekday selection behavior

- Weekday chips cho phép chọn các ngày (`T.2…CN`); cập nhật **reminder weekdays** preference.

## Add reminder behavior

- Nút **+** tạo một **reminder draft/default** mới.

## Delete reminder behavior

- **Delete icon** xóa reminder khỏi settings — sau confirm nếu cần, hoặc xóa trực tiếp nếu không phải
  high-risk data.

## Permission / unavailable states

- Notification permission **chưa cấp** → **permission state** (yêu cầu quyền).
- Platform **không hỗ trợ** notification → **unavailable state**.
- Notification khi được bấm có thể mở app / study entry theo navigation docs sau; **không** tự bắt đầu
  session.

## Persistence concept

- Reminder settings **persist** trong **local settings storage** (không chỉ volatile UI state);
  **restore được** sau app restart.
- OS schedule (nếu có) phải **đồng bộ** với local settings theo implementation task sau; **local
  settings vẫn là source of truth**.

## Data mutation rules

- Thay đổi reminder **chỉ** update notification/settings preference — **không** mutate deck/card/SRS/
  session, **không** tạo study session.

## Empty / error states

| State | Ý nghĩa |
|-------|---------|
| `loading reminders` | Đang tải reminders. |
| `loaded reminders` | Đã tải. |
| `no reminders` | Chưa có reminder — empty state. |
| `invalid reminder` | Reminder không hợp lệ (ví dụ bỏ hết ngày). |
| `failed to save reminder` | Lỗi lưu — **giữ reminder settings ổn định trước đó**. |
| `notification permission missing` | Chưa cấp quyền notification. |
| `platform notification unavailable` | Nền tảng không hỗ trợ notification. |
| `OS schedule sync failed` | Đồng bộ lịch OS thất bại — giữ local settings ổn định. |

## Open questions / cố ý không chốt

- exact **notification API** / **Android/iOS permission flow** / **slider implementation** / **save
  timing** / **default reminder time** / **max number of reminders** / **duplicate reminder policy** /
  **route/modal implementation** — **không** chốt.

Xem WBS: `F1.SETTINGS.REMINDER.1`, `F1.SETTINGS.REMINDER.2`.
