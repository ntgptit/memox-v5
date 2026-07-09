# 11 — Lộ trình (Phasing)

Mỗi phase là một lát cắt **chạy được**, có spec → plan → build → verify riêng. Không nhồi tất cả vào
một lần. Thứ tự tối ưu cho việc "ra vòng học sớm rồi mở rộng".

## Phase 1 — Nền tảng + vòng học hoàn chỉnh (Typing)

**Mục tiêu:** một vòng học end-to-end, offline, bền vững.

Phạm vi:
- **Hạ tầng dữ liệu**: `expo-sqlite`, kết nối, migration v1 (`decks`, `cards`, `card_reviews`,
  `app_meta`), `PRAGMA foreign_keys`. (→ [05-data-model](../design/05-data-model.md))
- **Engine SRS 8-box** thuần + unit test đầy đủ. (→ [06-srs-8box](../design/06-srs-8box.md))
- **Deck tree**: CRUD, lồng nhau, hiển thị cây, di chuyển (chặn vòng), xóa đệ quy (soft-delete).
- **Card**: CRUD (`term`/`meaning`/`note`), di chuyển deck.
- **i18n**: hạ tầng + `vi`/`en`, đổi ngôn ngữ, test không sót khóa. (→ [08-i18n](../design/08-i18n.md))
- **Settings**: interval/luật sai/thẻ mới/ngôn ngữ + validate. (→ [09-settings](../design/09-settings.md))
- **Phiên học Typing**: chọn phạm vi (công tắc "gồm deck con"), dựng danh sách (due + thẻ mới trong
  hạn mức), chấm exact, cập nhật SRS, tóm tắt.
- Màn: HOME, DECK DETAIL, STUDY (Typing), SETTINGS. (→ [10-navigation-ux](../design/10-navigation-ux.md))

Yêu cầu liên quan: FR-D1..7, FR-C1..6, FR-S1..8, FR-M1, FR-M6..7, FR-I1..4, FR-SET1..5, NFR-1..10.

**Định nghĩa hoàn thành (DoD):**
- Tạo deck lồng nhau + thẻ, học Typing, đóng/mở lại app → tiến độ còn nguyên.
- Đổi interval/luật sai trong Settings → lần chấm kế áp đúng.
- Đổi ngôn ngữ → toàn UI đổi, không chuỗi hard-code.
- `npm run check` xanh (typecheck + biome + test + boundaries); engine phủ test các nhánh.

## Phase 2 — Thêm chế độ học (Review, Recall, Guess)

**Mục tiêu:** đa dạng cách ôn trên cùng engine đã có.

Phạm vi:
- **Review**, **Recall**, **Guess** (sinh distractor trong phạm vi). (→ [07-study-modes](../design/07-study-modes.md))
- Bộ chọn chế độ trong STUDY; `SessionShell` dùng chung.
- Tóm tắt cuối phiên đầy đủ (FR-M8).

Yêu cầu: FR-M2, FR-M3, FR-M4, FR-M8.

**DoD:** cả 4 mode SRS cho ra cùng cập nhật box với cùng grade; chuyển mode không đổi dữ liệu lõi.

## Phase 3 — Match game + Thống kê

**Mục tiêu:** giữ chân + nhìn thấy tiến bộ.

Phạm vi:
- **Match** (nối cặp, tính giờ, **không** đụng SRS). (FR-M5)
- **Thống kê**: dùng `card_reviews` — số ôn/ngày, phân bố box, streak, heatmap đơn giản.

**DoD:** Match không tạo `card_reviews`/không đổi box; thống kê khớp dữ liệu thực.

## Phase 4 — Đồng bộ đám mây (Sync)

**Mục tiêu:** nhiều thiết bị, không mất dữ liệu.

Phạm vi:
- Chọn backend (ví dụ **Supabase**), auth.
- **Migration cộng dồn** thêm cột sync (`dirty`, `synced_at`, `remote_id`, `user_id`) trên schema
  sync-ready đã có — **không** phá vỡ dữ liệu Phase 1–3.
- Đồng bộ hai chiều + resolve xung đột (last-write-wins theo `updated_at`); tôn trọng soft-delete.
- Xem lại quy ước **"ngày"** cho đa thiết bị/timezone (ghi chú ở [06-srs-8box](../design/06-srs-8box.md)).

**DoD:** cài trên 2 thiết bị, sửa ở A → thấy ở B; xóa/khôi phục nhất quán; offline vẫn chạy rồi sync khi có mạng.

## Nguyên tắc xuyên suốt

- **Mỗi phase tự chứa**: ra được bản chạy demo, không để dở dang giữa các phase.
- **Không hồi tố phá vỡ**: thay đổi lịch/schema theo hướng cộng dồn.
- **Test theo phase**: engine (P1), điều phối mode (P2), thống kê (P3), sync (P4).
- **Tôn trọng ranh giới**: mọi thứ dùng chung xuyên feature nằm ở `src/shared`; feature không import chéo.

## Bảng phase ↔ tài liệu

| Phase | Tài liệu chính |
|-------|----------------|
| 1 | 04-architecture, 05-data-model, 06-srs-8box, 07 (Typing), 08-i18n, 09-settings, 10-navigation-ux |
| 2 | 07-study-modes (Review/Recall/Guess) |
| 3 | 07-study-modes (Match) + (thống kê — chi tiết sẽ bổ sung khi tới) |
| 4 | 05-data-model (mục sync-ready) + tài liệu sync mới (khi tới) |
