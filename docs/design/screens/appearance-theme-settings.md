# Màn hình — Appearance / Theme Settings (Chủ đề)

Concept và nghiệp vụ ở **mức sản phẩm** cho màn **cấu hình giao diện**, suy ra từ mock Chủ đề. Đây là
**spec concept**, không phải spec kỹ thuật: không chốt schema mới, không chốt implementation, không biến
chi tiết UI/native chưa chắc thành requirement.

> Nguồn nền tảng: [Settings / More Hub](settings-more-hub.md), [09-settings](../09-settings.md),
> [local-first (05-data-model)](../05-data-model.md#hợp-đồng-lưu-trữ-local-first),
> [navigation](../navigation.md). **Appearance settings KHÔNG ảnh hưởng dữ liệu học.**

## Screen name

**Appearance / Theme Settings** — Chủ đề.

## Purpose

Giúp user **cá nhân hóa giao diện** MemoX (chế độ đêm tự động, theme ngày/tối, biểu tượng ứng dụng) mà
**không ảnh hưởng dữ liệu học** (deck / card / SRS / session).

## Entry point

- Bấm **Chủ đề** trong [Settings / More Hub](settings-more-hub.md) → mở **Appearance / Theme Settings**.
- Mở màn **không** thay đổi dữ liệu học; **chỉ** thay đổi **preference giao diện** khi user chọn và
  lưu/cập nhật option.
- **Drawer KHÔNG** phải UI bắt buộc — Chủ đề có thể nằm trong Settings / More Hub hoặc Appearance settings
  screen hiện đại (xem [navigation](../navigation.md)). **Không** chốt route name.

## Auto dark mode (Chế độ đêm tự động)

- **Bật** → app dùng chế độ sáng/tối **theo hệ thống** (text phụ có thể hiển thị **"Theo hệ thống"**).
  - Hệ thống ở **light** → áp **theme ban ngày**; hệ thống ở **dark** → áp **theme buổi tối**.
- **Tắt** → app có thể dùng theme user chọn **thủ công** theo docs settings sau này.
- **Không** chốt exact OS API / implementation ở task này.

## Day theme presets (Chủ đề ban ngày)

- User chọn **một theme** cho chế độ **ngày / light mode**. Mỗi option là một **visual theme preset**.
- Theme được chọn có **selected state rõ ràng**.
- Đổi theme ban ngày **không** đổi theme buổi tối.
- **Chỉ ảnh hưởng appearance**, **không** ảnh hưởng dữ liệu học.
- **Không** chốt tên theme cụ thể nếu design system chưa có — document là **preset A/B/C** / light theme
  variants.

## Night theme presets (Chủ đề buổi tối)

- User chọn **một theme** cho chế độ **đêm / dark mode**. Mỗi option là một **visual theme preset**.
- Theme được chọn có **selected state rõ ràng**.
- Đổi theme buổi tối **không** đổi theme ban ngày.
- **Chỉ ảnh hưởng appearance**, **không** ảnh hưởng dữ liệu học.
- **Không** chốt token màu cụ thể nếu design system chưa có.

## App icon variants (Biểu tượng ứng dụng)

- User có thể chọn **app icon variant** **nếu** nền tảng và implementation cho phép.
- Icon được chọn có **selected state rõ ràng**.
- Đổi icon **không** ảnh hưởng dữ liệu học.
- Nếu nền tảng **hạn chế**, app **phải xử lý rõ ràng** (unavailable/error state).

> ⚠️ **Warning (từ mock):** *Sau khi thay đổi biểu tượng, các lối tắt của ứng dụng trên Màn hình chính
> có thể biến mất.* → Phải hiển thị cảnh báo này trước/khi đổi icon.

- **Không** chốt dynamic app icon implementation ở task này. Vì Expo/native support **chưa được verify**
  trong docs/code, **app icon switching** được mark **Future / requires platform spike before
  implementation** (WBS `F1.APPEARANCE.5`).

## Persistence concept

- Theme preferences **phải được lưu bền vững** khi user thay đổi.
- **Local settings là source of truth** cho appearance preferences (local-first).
- Preference **không** được chỉ nằm trong **volatile UI state**.
- Nếu app **chưa có** settings storage contract cho appearance, **WBS phải có task riêng**
  (`F1.APPEARANCE.2`).
- **Appearance settings KHÔNG mutate learning data.**
- **Không** thêm schema chi tiết ở task này (theme preference dự kiến đi qua `app_meta` settings — xem
  [09-settings](../09-settings.md); chốt ở task storage).

## Data mutation rules

- Mở màn Chủ đề / preview / apply theme **không** đổi **deck / card / SRS / session**.
- Chỉ **appearance preference** thay đổi (và được persist) khi user chọn/lưu.

## Preview / apply behavior (concept)

- Khi user chọn theme, app **có thể preview ngay hoặc apply ngay** tùy implementation.
- **Selected theme phải được thể hiện rõ.**
- Nếu có **Save/Cancel** behavior sau này, docs UI task phải chốt riêng.
- **Không** tự bịa exact interaction nếu mock chưa thể hiện rõ.

## Empty / error / unavailable states

| State | Ý nghĩa |
|-------|---------|
| `loading settings` | Đang tải appearance settings. |
| `loaded settings` | Đã tải, hiển thị lựa chọn + selected state. |
| `failed to load settings` | Lỗi khi tải — hiển thị lỗi, giữ preference ổn định trước đó. |
| `failed to save settings` | Lỗi khi lưu — hiển thị lỗi, **giữ preference ổn định trước đó**. |
| `app icon change unavailable` | Nền tảng hiện tại **không hỗ trợ** đổi icon — hiển thị unavailable/error, **không** làm hỏng settings. |
| `app icon requires restart / launcher refresh` | Nếu nền tảng yêu cầu, thông báo cần khởi động lại / refresh launcher. |

**Không** chốt platform behavior chi tiết nếu chưa có implementation research.

## Platform notes for app icon

- Dynamic app icon phụ thuộc **native/Expo support** — **chưa verify** trong repo → cần **platform
  spike** trước khi implement (`F1.APPEARANCE.5`).
- Trên một số nền tảng, đổi icon có thể **làm mất shortcut** trên Home Screen (xem warning ở trên) và/hoặc
  cần restart/launcher refresh. **Không** chốt native API cụ thể.

## Open questions / cố ý không chốt

- exact route name / bottom-sheet vs screen / animation / save timing — **không** chốt.
- exact **theme token values** / **icon asset names** / **dynamic app icon native API** — **không** chốt.
- exact **persistence schema** — chưa chốt (settings storage task).
- exact **platform support matrix** cho app icon — cần spike.
- Rule khi **auto dark mode tắt** (dùng theme thủ công nào) — chốt ở docs settings sau.

## Liên kết WBS

- Docs spec: `F1.APPEARANCE.1`.
- Storage: `F1.APPEARANCE.2`. Theme UI: `F1.APPEARANCE.3`. Runtime apply: `F1.APPEARANCE.4`.
- App icon spike: `F1.APPEARANCE.5`.

Xem [WBS](../../project-management/wbs.md#appearance--theme-settings-f1appearance).
