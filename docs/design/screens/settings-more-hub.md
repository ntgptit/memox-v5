# Màn hình — Settings / More Hub

Concept và nghiệp vụ ở **mức sản phẩm** cho các **chức năng hệ thống** của MemoX v5, suy ra từ **mock
drawer**. Đây là **spec concept**, không phải spec kỹ thuật: không chốt schema mới, không chốt
implementation, không biến chi tiết UI chưa chắc thành requirement.

> **Drawer mock chỉ là nguồn tham khảo chức năng.** Xem [Why Drawer is not mandatory](#why-drawer-is-not-mandatory).
> Nguồn nền tảng: [product scope](../../product/memox-scope.md), [settings](../09-settings.md),
> [i18n](../08-i18n.md), [data model](../05-data-model.md), [navigation](../navigation.md).

## Screen name

**Settings / More Hub** — trung tâm chức năng hệ thống.

## Purpose

Gom các **chức năng hệ thống** (activity, ngôn ngữ, nhập/xuất, thống kê, giao diện, cài đặt, trợ giúp)
vào **một entry** dễ tìm, để người dùng cấu hình app và truy cập tính năng ngoài luồng học chính.

## Why Drawer is not mandatory

- **Drawer trong mock chỉ dùng để xác định chức năng**, **không** phải navigation bắt buộc.
- Implementation có thể dùng **Settings tab / More screen / profile-settings screen** hoặc navigation
  hiện đại khác. **Không** ép app phải có drawer nếu UX hiện đại không cần.
- Ràng buộc bắt buộc: các chức năng dưới đây **vẫn phải truy cập được** từ Settings / More Hub kể cả khi
  **không có drawer**.

## User goals

- Xem nhanh **hoạt động hôm nay**.
- Quản lý **ngôn ngữ học** (thêm/xóa).
- **Nhập / xuất** dữ liệu học.
- Mở **thống kê** dài hạn, **giao diện**, **cài đặt** app.
- Tìm **trợ giúp / liên hệ hỗ trợ**.

## Navigation concept

Settings / More Hub là **entry** cho chức năng hệ thống; mỗi nhóm mở một **screen/sub-screen** tương
ứng (một số là Future). Chi tiết ở [navigation.md](../navigation.md). **Không** chốt raw route string ở
đây.

## Function groups

### Group A — Activity summary (Hoạt động hôm nay)

- Hiển thị **tóm tắt hoạt động học trong ngày**: **thời lượng học hôm nay** (ví dụ `14:08`) và **số
  từ/card đã xử lý hôm nay** (ví dụ `5 từ`).
- Là **summary ngắn**, **không** thay thế Statistics/Progress đầy đủ (Group D).
- Có thể đặt ở Home, Progress, hoặc Settings / More Hub.
- **Không** chốt công thức nếu Progress docs chưa định nghĩa.

### Group B — Language management (Thêm / Xóa ngôn ngữ)

- User quản lý **language workspace / ngôn ngữ học**.
- **Thêm ngôn ngữ** tạo một **language scope mới** cho deck/card.
- **Xóa ngôn ngữ** là **destructive action** → **phải có confirm**.
- Nếu ngôn ngữ có deck/card, **docs phải chốt rule trước khi implement** — một trong:
  **block delete** / **delete cascade** / **require export/backup trước**. **Không** tự xóa dữ liệu học
  khi chưa có destructive policy.
- **Lưu ý drift:** MemoX hiện **chưa có** thực thể "language/workspace" trong data model — xem
  [Drift note](#drift-note). "Thêm/Xóa ngôn ngữ" là **concept** cần một task data-model/policy riêng.

### Group C — Import / Export (Nhập / Xuất)

- **Nhập**: đưa dữ liệu học từ **file / nguồn ngoài** vào **local database**; **phải có validation**
  trước khi commit.
- **Xuất**: xuất dữ liệu học ra **file** để backup/chia sẻ/migrate; **không** được làm thay đổi dữ liệu học.
- Phải **tôn trọng local-first** (xem [05-data-model → local-first](../05-data-model.md#hợp-đồng-lưu-trữ-local-first)).
- **Không** chốt **file format** nếu docs chưa có → **Future/Not started**, **không** bịa format.

### Group D — Statistics (Thống kê)

- Mở **[Statistics screen](statistics.md)**: thống kê học **dài hạn** (3 tab: Từ / Thời gian / Chất
  lượng, có chart theo ngày).
- **Khác** [Session Result](session-result.md) (chỉ thống kê **phiên vừa học**) và **khác** Activity
  summary (chỉ **tóm tắt nhanh** trong ngày).
- Drawer **không** phải UI bắt buộc — Statistics vẫn truy cập được từ Settings / More Hub.

### Group E — Appearance / Theme (Chủ đề)

- Bấm **Chủ đề** → mở **[Appearance / Theme Settings](appearance-theme-settings.md)**: chế độ đêm tự
  động, theme ban ngày, theme buổi tối, biểu tượng ứng dụng.
- **Chủ đề KHÔNG ảnh hưởng dữ liệu học.** Drawer **không** phải UI bắt buộc.
- **Không** chốt token/UI implementation nếu design system chưa có.
- Preference nếu **persist** thì theo **settings storage** ([09-settings](../09-settings.md)).

### Group F — App settings (Cài đặt)

- Mở **Settings chính** ([09-settings](../09-settings.md)): cấu hình app, learning preferences (SRS
  intervals, lapse rule, thẻ mới/ngày), **ngôn ngữ UI** ([08-i18n](../08-i18n.md)), data settings nếu đã
  có docs.
- **Không** gom mọi thứ vào một màn quá lớn — có thể chia **sub-screen**.

### Group G — Help & Support (Trợ giúp)

- **Câu hỏi thường gặp (FAQ)**: mở màn/tài liệu trợ giúp.
- **Gửi email cho chúng tôi**: mở mail client hoặc support form.
- **Nhắn tin trong Telegram**: mở link/channel/chat **nếu product scope cho phép**.
- **Không** chốt provider/link cụ thể nếu chưa có. **Không** yêu cầu account/login cho support nếu chưa
  có scope.

## Function list (tóm tắt)

| Chức năng (VI) | Nhóm | Hành vi | Trạng thái |
|----------------|------|---------|-----------|
| Hoạt động hôm nay | A | Tóm tắt học trong ngày | concept |
| Thêm ngôn ngữ | B | Tạo language scope mới | Future (cần data-model) |
| Xóa ngôn ngữ | B | Destructive + confirm + policy | Future (cần policy) |
| Nhập | C | Import + validate | Future (format chưa chốt) |
| Xuất | C | Export, no-mutation | Future (format chưa chốt) |
| Thống kê | D | Mở Progress/Statistics | Future (screen riêng) |
| Chủ đề | E | Theme/dark/light/system | Future/Settings |
| Cài đặt | F | Mở Settings ([09-settings](../09-settings.md)) | có docs nền |
| Câu hỏi thường gặp | G | Mở FAQ/help | Future |
| Gửi email cho chúng tôi | G | Mở email/support | Future |
| Nhắn tin Telegram | G | Mở link Telegram (nếu có) | Future |

## Out-of-scope / intentionally not specified

- **Drawer** là navigation bắt buộc — **không**.
- exact UI layout / icon / component / animation / route name — **không** chốt.
- exact storage schema; language/workspace schema; settings/theme storage — **không** chốt (task riêng).
- exact **import/export file format** — chưa chốt.
- exact **Telegram/email** provider/link — chưa chốt.
- **account / cloud sync** — ngoài scope hiện tại (xem [memox-scope](../../product/memox-scope.md)).
- Công thức **activity/progress %** — phụ thuộc Progress docs (chưa có).

## Drift note

```
DRIFT DETECTED
File code: (none — chưa có code)
File doc:  docs/design/05-data-model.md (decks + cards + card_reviews + app_meta; KHÔNG có thực thể
           "language/workspace"), docs/product/memox-scope.md (non-goal: chỉ i18n UI; card content là
           free unicode, không có source/target language metadata)
Mismatch:  Drawer mock có "Thêm ngôn ngữ / Xóa ngôn ngữ" (language workspace cho deck/card). Docs hiện
           tại KHÔNG mô hình hóa "ngôn ngữ học" như một scope/entity; i18n chỉ là ngôn ngữ GIAO DIỆN.
Suggested fix: Coi "language workspace" là CONCEPT cần một task data-model/policy riêng trước khi
           implement (thêm entity/scope ngôn ngữ + destructive-delete policy). Task docs này KHÔNG chốt
           schema. Phân biệt rõ: "ngôn ngữ UI (i18n)" ≠ "ngôn ngữ học (workspace)".
```

## Liên kết WBS

- Docs spec: `F1.SETTINGS.HUB.1`.
- UI shell: `F1.SETTINGS.HUB.2` (FE).
- Activity summary: `F1.ACTIVITY.1`.
- Language: `F1.LANGUAGE.1` (add), `F1.LANGUAGE.2` (delete policy).
- Import/Export: `F1.DATA.IMPORT.1`, `F1.DATA.EXPORT.1`.
- Statistics: `F1.STATS.1`. Appearance: `F1.APPEARANCE.1`. Support: `F1.SUPPORT.1`.

Xem [WBS](../../project-management/wbs.md#settings--more-hub-f1settings).
