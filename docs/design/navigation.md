# Navigation (concept)

Concept điều hướng ở **mức sản phẩm**. Cấu trúc route cụ thể (expo-router) sẽ được chốt khi làm FE — xem
[10-navigation-ux](10-navigation-ux.md) cho cây route dự kiến. **Không** chốt raw route string ở đây.

## Settings / More Hub

- **Settings / More Hub** là **entry** cho các **chức năng hệ thống** (activity, ngôn ngữ, nhập/xuất,
  thống kê, giao diện, cài đặt, trợ giúp) — xem [settings-more-hub](screens/settings-more-hub.md).
- **Drawer KHÔNG phải requirement bắt buộc.** Drawer trong mock chỉ dùng để **xác định chức năng**.
- App **có thể** dùng **tab / stack / settings screen / more screen** hoặc navigation hiện đại khác. Các
  chức năng hệ thống **vẫn phải truy cập được** từ Settings / More Hub kể cả khi không có drawer.

## Nguyên tắc

- **Route implementation** (tên route, cấu trúc stack/tab) được **chốt khi làm FE**; docs concept không
  khóa cứng.
- Các màn đã có concept spec: [Deck Management](screens/deck-management.md) (+ Subdeck List variant),
  [Flashcard List](screens/flashcard-list.md), [Session Result](screens/session-result.md),
  [Settings / More Hub](screens/settings-more-hub.md).
- Screen chưa có concept (ví dụ Progress/Statistics, Help/FAQ) là **Future** cho tới khi có spec riêng.

## Liên quan

- Cây route dự kiến (expo-router): [10-navigation-ux](10-navigation-ux.md).
- App settings: [09-settings](09-settings.md). i18n UI: [08-i18n](08-i18n.md).
