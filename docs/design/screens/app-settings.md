# Màn hình — App Settings / Cài đặt

Concept và nghiệp vụ ở **mức sản phẩm** cho **màn cấu hình chính** của app, suy ra từ mock Cài đặt. Đây
là **spec concept**: không chốt schema mới, không chốt implementation, không tự đoán platform/native
ngoài nghiệp vụ hợp lý từ mock. **Không dùng mock để ghi đè docs đã chốt.**

> Nguồn nền tảng: [Settings / More Hub](settings-more-hub.md),
> [Appearance / Theme Settings](appearance-theme-settings.md), [09-settings](../09-settings.md),
> [i18n](../08-i18n.md), [SRS 8-box](../06-srs-8box.md), [study modes](../07-study-modes.md),
> [local-first (05-data-model)](../05-data-model.md#hợp-đồng-lưu-trữ-local-first).

## Screen name

**App Settings / Cài đặt** — cấu hình chính của app.

## Purpose

Quản lý **preference** và **data operations** của MemoX: ngôn ngữ mẹ đẻ, lời nhắc, hình thức hiển thị
từ, cài đặt SRS, cài đặt trò chơi, sao lưu/khôi phục, đồng bộ đám mây. Phục vụ **learning flow**,
**local-first data integrity**, backup/restore, notification, SRS preference, và cá nhân hóa.

## Entry point

- Bấm **Cài đặt** trong [Settings / More Hub](settings-more-hub.md) → mở **App Settings**.
- **Mở màn KHÔNG** thay đổi dữ liệu học. Thay đổi preference **phải persist** khi user cập nhật.
- Thao tác **destructive** (restore/overwrite) phải có **confirm/policy rõ**.
- **Cài đặt KHÔNG phải Drawer** — là screen/section trong Settings / More Hub hiện đại. Không chốt route.

## Difference from Appearance / Theme Settings

- **[Appearance / Theme Settings](appearance-theme-settings.md)** (Chủ đề) là **screen riêng** cho
  giao diện (theme/dark/light/icon) — **không** phải toàn bộ App Settings.
- **App Settings** quản lý **preference + data operations** (ngôn ngữ, nhắc, SRS, game, backup, sync).

## Native language (Tiếng mẹ đẻ)

- **Tiếng mẹ đẻ** là **user preference** (ví dụ `Tiếng Việt`) — ưu tiên ngôn ngữ **meaning/explanation**
  / nội dung hỗ trợ học nếu card có dữ liệu; nếu không có, **fallback** theo content-display docs sau.
- Đổi tiếng mẹ đẻ **không** xóa card/deck, **không** tự dịch dữ liệu, **không** reset SRS, **không** đổi
  **study direction** (như `KO → VI`), **không** đổi front/back của card.
- Bấm **Tiếng mẹ đẻ** → mở **[Native Language Picker](native-language-picker.md)** (child screen).

## Reminders (Lời nhắc)

- Mock: `Lời nhắc` — `13:00 [T.2…CN]`.
- Bấm **Lời nhắc** → mở **[Reminder Settings](reminder-settings.md)** (child flow): nhiều reminder,
  giờ + ngày trong tuần, thêm/xóa. Reminder **không** tự bắt đầu session, **không** mutate learning data.

## Word form / display settings (Hình thức từ ngữ)

Nhóm cài đặt **cách hiển thị** nội dung từ/card (concept — không chốt thuật toán):

- **Hiển thị các trường cho tiếng mẹ đẻ**: bật → hiện field liên quan tiếng mẹ đẻ nếu card có dữ liệu;
  tắt → có thể ẩn field phụ. **Không xóa** dữ liệu card.
- **Vẽ từ theo màu của giới tính**: cho ngôn ngữ có noun gender; bật → tô màu theo gender nếu card có
  dữ liệu gender; nếu không có → không tác dụng / ẩn-disabled theo docs UI sau.
- **Đánh dấu ký tự Cyrillic trong trường Latinh**: phát hiện/đánh dấu ký tự Cyrillic lẫn trong field
  Latin; **không** tự sửa nội dung khi user chưa xác nhận.

## Spaced repetition settings (Lặp lại giãn cách)

- Mock: `Lặp lại giãn cách` — `Ô: 7`, `Thông báo: bật`.
- Bấm **Lặp lại giãn cách** → mở **[Spaced Repetition Settings](spaced-repetition-settings.md)** (child
  flow): box setting/"Ô: 7" (open question), repeat ordering, SRS notification, forgotten/lapse, game
  word source. **Phải tuân thủ** [SRS 8-box](../06-srs-8box.md) — **không** đổi model.

## Game settings (Cài đặt trò chơi)

- Mock: `Số từ trong các trò chơi: 5 từ`, `Chọn các từ ngẫu nhiên: bật`, `Bàn phím: Bàn phím Android`.
- **Số từ trong trò chơi** = **batch size** mặc định cho game mode.
- **Chọn từ ngẫu nhiên** = random selection vs ordering ổn định.
- **Bàn phím** = input method cho game/fill nếu platform hỗ trợ.
- Game settings **không** đổi card content, **không** đổi SRS box/due. Game hiện là **Future** so với
  Phase 1 (xem [07-study-modes](../07-study-modes.md)) → implementation rows Future/Not started.

## Backup / Restore (Sao lưu / Khôi phục)

- Mock: `path backup`, `Lần cuối: 1 phút trước`, `Tự động sao lưu: bật`.
- **Backup** tạo bản sao dữ liệu học local; **không** mutate learning data. **Auto backup** theo
  lịch/event nếu docs sau chốt. Hiển thị **last backup time** + **backup path** nếu platform cho phép.
- **Restore** là **destructive/high-risk** nếu ghi đè DB hiện tại → **phải confirm**, **validate backup
  trước khi apply**; **restore fail không được làm hỏng DB hiện tại**; nên có **pre-restore backup /
  rollback**. **Không** chốt file format nếu docs backup chưa có.

## Cloud sync (Đồng bộ đám mây)

- Capability đồng bộ/backup qua tài khoản/cloud. **Không** chốt provider/OAuth/API nếu docs chưa có;
  **không** đưa email cá nhân từ screenshot vào docs.
- Phải **tôn trọng local-first**: **local DB là source of truth khi offline**; sync **fail không được
  mất dữ liệu local**; cần **conflict policy** trước khi implement. Nếu chưa thuộc Phase 1 → **Future**.

## Persistence concept

- App settings **phải persist** — **settings storage là source of truth** cho preference (dự kiến
  `app_meta`, xem [09-settings](../09-settings.md)); **không** chỉ lưu volatile UI state.
- Settings **không** mutate deck/card/SRS/session **trừ** explicit data operation (restore) đã có
  confirmation/policy.
- Multi-step/high-risk (restore/sync) **phải có failure handling**.

## Destructive / high-risk operation rules

- **Restore, cloud overwrite** → confirm + validate + rollback-safe.
- **Delete language** (nếu có) → destructive policy (xem [Settings / More Hub](settings-more-hub.md#group-b--language-management-thêm--xóa-ngôn-ngữ)).
- **Không** silently ghi đè / xóa dữ liệu học.

## Empty / error / unavailable states

| State | Ý nghĩa |
|-------|---------|
| `loading settings` | Đang tải cài đặt. |
| `loaded settings` | Đã tải. |
| `failed to load settings` | Lỗi tải — giữ trạng thái an toàn. |
| `failed to save settings` | Lỗi lưu — **giữ preference ổn định trước đó** + báo lỗi. |
| `unavailable platform feature` | Tính năng không hỗ trợ trên nền tảng hiện tại. |
| `high-risk action requires confirmation` | Thao tác phá hủy cần xác nhận. |

## Relationship với các màn khác

- **Chủ đề / Appearance**, **Statistics**, **Session Result** là **screen riêng**, **không** phải App
  Settings.
- **Import/Export** có thể có flow riêng; App Settings có thể chứa entry/summary nếu product chốt.
  **Backup/Restore** (data backup) **khác** Import/Export (content) nếu docs phân biệt.
- **Native Language Picker / Reminder Settings / Spaced Repetition Settings** là **child screen/flow của
  App Settings**, **không** phải product module riêng.

## Open questions / cố ý không chốt

- exact route/nested navigation / UI layout / animation / storage schema — **không** chốt.
- exact notification API / permission flow / cloud provider / backup file format / restore conflict
  algorithm / keyboard implementation / SRS interval algorithm — **không** chốt.
- "Ô: 7" — xem [Spaced Repetition Settings → box open question](spaced-repetition-settings.md#box-setting--ô-7-open-question).

## Liên kết WBS

- Docs: `F1.SETTINGS.APP.1`. UI shell: `F1.SETTINGS.APP.2`. Storage: `F1.SETTINGS.STORAGE.1`.
- Language: `F1.SETTINGS.LANGUAGE.1/.2`. Reminder: `F1.SETTINGS.REMINDER.1/.2`. Word form:
  `F1.SETTINGS.WORDFORM.1`. SRS: `F1.SETTINGS.SRS.1/.2/.3`. Game: `F1.SETTINGS.GAME.1`.
  Backup: `F1.BACKUP.1`. Sync: `F1.SYNC.1`.

Xem [WBS](../../project-management/wbs.md#app-settings-f1settingsapp).
