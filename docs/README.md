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
| Đến hạn | `due` khi `now ≥ last_reviewed_at + interval(box)` |
| Chế độ học | Review, Recall, Guess, Typing, Match (5) |
| Mode ↔ SRS | Review, Recall, Guess, Typing **cập nhật** SRS; Match **không** (chỉ luyện tập) |
| Typing | Hiện term → gõ meaning; so khớp **chặt tuyệt đối** |
| Phạm vi deck cha | Đệ quy gồm deck con, có **công tắc** bật/tắt "gồm deck con" |
| Giới hạn học | Có giới hạn **số thẻ mới / ngày** (cấu hình trong Settings) |

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
