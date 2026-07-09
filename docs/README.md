# MemoX — Tài liệu dự án

MemoX là ứng dụng học **flashcard** với ôn tập **SRS 8-box (Leitner)**, deck **lồng nhau**, và
**5 chế độ học**. App chạy đa nền tảng (iOS / Android / Web) bằng **Expo SDK 57**, hoạt động
**local-first** (không cần mạng) và có schema **chuẩn bị sẵn cho đồng bộ đám mây**.

> Trạng thái: **Docs-first**. Toàn bộ tài liệu dưới đây mô tả thiết kế *trước khi* viết code.
> Chưa có mã nguồn tính năng nào được viết.

## Cách đọc bộ tài liệu

Đọc theo thứ tự đánh số. Product trả lời *"xây cái gì và tại sao"*, Design trả lời *"xây như thế nào"*,
Roadmap trả lời *"xây theo thứ tự nào"*.

**Tài liệu nền tảng (foundation — tiếng Anh):**

| # | File | Nội dung |
|---|------|----------|
| — | [product/memox-scope.md](product/memox-scope.md) | Phạm vi sản phẩm (what MemoX is / is not) |
| — | [architecture/overview.md](architecture/overview.md) | Tổng quan kiến trúc, layer, data flow |
| — | [architecture/folder-structure.md](architecture/folder-structure.md) | Vị trí đặt code (`src/`, `src/app`, features, shared) |
| — | [architecture/dependency-boundaries.md](architecture/dependency-boundaries.md) | Luật import (được enforce) |
| — | [decision-tables/phase-1-contracts.md](decision-tables/phase-1-contracts.md) | Quyết định Phase 1: due (local-day), session persistence, starter template |
| — | [decision-tables/study-srs-decision-table.md](decision-tables/study-srs-decision-table.md) | Bảng tra nhanh: due eligibility + SRS box + session |
| — | [decision-tables/play-menu-decision-table.md](decision-tables/play-menu-decision-table.md) | Play Menu: Học vs Lặp lại, activation 5 mode, SRS Repeat |
| — | [decision-tables/new-learning-flow-decision-table.md](decision-tables/new-learning-flow-decision-table.md) | New Learning Flow + reviewMode; activation vs browse/Repeat |
| — | [decision-tables/session-result-decision-table.md](decision-tables/session-result-decision-table.md) | Session Result: khi nào hiện, counting, không mutate |
| — | [decision-tables/settings-more-hub-decision-table.md](decision-tables/settings-more-hub-decision-table.md) | Settings / More Hub: chức năng hệ thống, destructive, import/export |
| — | [decision-tables/statistics-decision-table.md](decision-tables/statistics-decision-table.md) | Statistics: tabs, scope, no-mutation, không bịa formula |
| — | [decision-tables/appearance-theme-settings-decision-table.md](decision-tables/appearance-theme-settings-decision-table.md) | Chủ đề: auto dark, day/night theme, app icon, no-mutation |
| — | [decision-tables/app-settings-decision-table.md](decision-tables/app-settings-decision-table.md) | App Settings + native language / reminder / SRS settings |
| — | [project-management/wbs.md](project-management/wbs.md) | Work breakdown (foundation-first) |
| — | [verification.md](verification.md) | Cách verify (`npm run check`) |

**Đặc tả thiết kế chi tiết (deep design specs — tiếng Việt):**

| # | File | Nội dung |
|---|------|----------|
| — | [product/01-vision.md](product/01-vision.md) | Vấn đề, mục tiêu, non-goals, personas |
| — | [product/02-requirements.md](product/02-requirements.md) | Yêu cầu chức năng + phi chức năng + acceptance criteria |
| — | [product/03-glossary.md](product/03-glossary.md) | Định nghĩa thuật ngữ dùng thống nhất toàn dự án |
| — | [design/04-architecture.md](design/04-architecture.md) | Tech stack, layer, cấu trúc thư mục, ranh giới |
| — | [design/05-data-model.md](design/05-data-model.md) | Schema SQLite, ER, thiết kế sync-ready, migrations |
| — | [design/06-srs-8box.md](design/06-srs-8box.md) | Đặc tả thuật toán SRS 8-box (nguồn sự thật của engine) |
| — | [design/07-study-modes.md](design/07-study-modes.md) | 5 chế độ học: UX + tương tác với SRS |
| — | [design/08-i18n.md](design/08-i18n.md) | Đa ngôn ngữ giao diện (i18n) |
| — | [design/09-settings.md](design/09-settings.md) | Mọi tùy chọn cấu hình + giá trị mặc định + validation |
| — | [design/10-navigation-ux.md](design/10-navigation-ux.md) | Màn hình, cấu trúc expo-router, luồng người dùng |
| — | [design/screens/deck-management.md](design/screens/deck-management.md) | Concept & nghiệp vụ màn Deck Management (gồm Subdeck List variant) |
| — | [design/screens/flashcard-list.md](design/screens/flashcard-list.md) | Concept & nghiệp vụ màn Flashcard List |
| — | [design/screens/session-result.md](design/screens/session-result.md) | Concept & nghiệp vụ màn Session Result (kết quả phiên) |
| — | [design/screens/settings-more-hub.md](design/screens/settings-more-hub.md) | Chức năng hệ thống: Settings / More Hub (từ drawer mock) |
| — | [design/screens/statistics.md](design/screens/statistics.md) | Concept & nghiệp vụ màn Statistics (Từ / Thời gian / Chất lượng) |
| — | [design/screens/appearance-theme-settings.md](design/screens/appearance-theme-settings.md) | Concept & nghiệp vụ màn Chủ đề (theme, auto dark, app icon) |
| — | [design/screens/app-settings.md](design/screens/app-settings.md) | Concept & nghiệp vụ màn Cài đặt (App Settings) |
| — | [design/screens/native-language-picker.md](design/screens/native-language-picker.md) | Chọn tiếng mẹ đẻ (child của App Settings) |
| — | [design/screens/reminder-settings.md](design/screens/reminder-settings.md) | Lời nhắc (child của App Settings) |
| — | [design/screens/spaced-repetition-settings.md](design/screens/spaced-repetition-settings.md) | Lặp lại giãn cách (child của App Settings) |
| — | [design/navigation.md](design/navigation.md) | Concept điều hướng: Settings/More Hub, drawer không bắt buộc |
| — | [roadmap/11-phasing.md](roadmap/11-phasing.md) | Lộ trình Phase 1–4 |

## Tóm tắt quyết định thiết kế (một chỗ)

Bảng này là bản rút gọn để tra nhanh; chi tiết nằm trong từng file.

| Chủ đề | Quyết định |
|--------|------------|
| Nền tảng | Expo SDK 57 — iOS / Android / Web |
| Lưu trữ | Local-first, `expo-sqlite`; schema **sync-ready** (đồng bộ ở Phase 4) |
| Đa ngôn ngữ | **i18n giao diện** (vi/en…); nội dung thẻ là unicode tự do |
| Deck | Lồng nhau tùy độ sâu (cây), CRUD đầy đủ |
| Card | `term` + `meaning` (bắt buộc) + `note` (tùy chọn) |
| Thuật toán | **8-box Leitner**, 8 khoảng ôn **cấu hình được** (mặc định nhân đôi 1·2·4·8·16·32·64·128 ngày) |
| Chấm đúng/sai | Đúng → lên 1 box; Sai → **cấu hình** (về box 1 *hoặc* lùi 1 box) |
| Đến hạn | **local-day**: `localDay(due_at) ≤ localDay(today)` (due muộn hơn hôm nay vẫn tính; xem DT-1) |
| Chế độ học | Review, Recall, Guess, Typing, Match (5) |
| Mode ↔ SRS | Review, Recall, Guess, Typing **cập nhật** SRS; Match **không** (chỉ luyện tập) |
| Typing | Hiện term → gõ meaning; so khớp **chặt tuyệt đối** |
| Phạm vi deck cha | Đệ quy gồm deck con, có **công tắc** bật/tắt "gồm deck con" |
| Giới hạn học | Có giới hạn **số thẻ mới / ngày** (cấu hình trong Settings) |
| Phiên học | **Persist** (`study_sessions` + `study_session_items`), resume được; học lưu ở `cards`/`card_reviews` (DT-2) |
| Starter template | Expo starter **off production path**; xóa/thay ở `F0.1`; feature không import (DT-3) |

## Kiến trúc ở mức cao

```
UI (expo-router screens, nativewind)
        │
State (zustand stores)  ── i18n (expo-localization + i18n lib)
        │
Domain (SRS 8-box engine — thuần, không phụ thuộc I/O)
        │
Data (repositories → expo-sqlite; kết quả bọc bằng neverthrow Result)
        │
SQLite (local; schema sync-ready)
```

Mọi thứ theo **feature-based architecture** đã có sẵn trong repo: mỗi tính năng nằm gọn trong
`src/features/<feature>`, dùng chung qua `src/shared`, và **không** import chéo giữa các feature
(kiểm bằng `scripts/check-boundaries.mjs`).
