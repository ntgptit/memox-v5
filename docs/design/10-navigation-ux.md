# 10 — Điều hướng & UX

Điều hướng bằng **expo-router** (file-based, typed routes đã bật trong `app.json`). Màn hình đặt trong
`src/app`; **màn hình chỉ khai báo route và ghép UI**, logic nằm ở feature/store (xem
[04-architecture](04-architecture.md)).

## Cây route

```
src/app/
├── _layout.tsx                 # root: SQLiteProvider, i18n init, theme, safe-area
├── index.tsx                   # HOME — cây deck + "due hôm nay" + nút tạo
├── deck/
│   ├── [id].tsx                # DECK DETAIL — deck con + thẻ + nút Học
│   └── [id]/
│       ├── edit.tsx            # sửa deck (modal/form)
│       └── new-card.tsx        # tạo thẻ (modal/form)
├── deck/new.tsx                # tạo deck (chọn cha)
├── study/
│   └── [deckId].tsx            # STUDY — chọn phạm vi + chế độ → chạy phiên
└── settings.tsx                # SETTINGS
```

> Chi tiết cú pháp route động/nhóm route: đọc tài liệu expo-router SDK 57
> (https://docs.expo.dev/versions/v57.0.0/) trước khi code — API có thể khác trí nhớ.

## Màn hình chính (HOME — `index.tsx`)

**Mục tiêu:** mở app là biết ngay **hôm nay ôn gì**.

- Tiêu đề + tổng **"X thẻ đến hạn hôm nay"** (toàn bộ, đệ quy từ gốc).
- **Cây deck** mở/thu gọn: mỗi dòng hiển thị tên, **badge số thẻ đến hạn**, tổng số thẻ.
- Chạm dòng deck → **DECK DETAIL**. Nút **+** → tạo deck (gốc) hoặc tạo thẻ nhanh.
- Trạng thái rỗng: hướng dẫn tạo deck đầu tiên (chuỗi i18n).

## Chi tiết deck (DECK DETAIL — `deck/[id].tsx`)

- Breadcrumb đường dẫn cây (Gốc › Cha › Deck).
- Danh sách **deck con** (nếu có) + danh sách **thẻ trực tiếp**.
- Header đếm: **đến hạn / tổng** (theo công tắc phạm vi hiện tại).
- Hành động: **Học** (→ STUDY), **+ Thẻ**, **+ Deck con**, **Sửa**, **Xóa** (xác nhận, cảnh báo xóa đệ quy),
  **Di chuyển** (chọn cha mới; chặn tạo vòng — FR-D6).

## Phiên học (STUDY — `study/[deckId].tsx`)

Hai bước trong cùng route:

1. **Cấu hình phiên**
   - Công tắc **"Gồm bộ thẻ con"** (mặc định theo `includeSubdecksDefault`).
   - Chọn **chế độ**: Typing (Phase 1); Review/Recall/Guess (Phase 2); Match (Phase 3).
   - Hiển thị trước **số thẻ** sẽ học (due + thẻ mới trong hạn mức).
   - Nút **Bắt đầu**.
2. **Chạy phiên** (`SessionShell` dùng chung — xem [07-study-modes](07-study-modes.md))
   - Thanh tiến độ + đếm còn lại + nút thoát (xác nhận nếu đang giữa chừng).
   - Render component theo chế độ; mỗi thẻ (trừ Match) → `onGrade` → engine → lưu.
   - Hết thẻ → **màn hình tóm tắt** (đúng/sai, lên/xuống box, thời lượng) → về DECK DETAIL/HOME.

## Cài đặt (SETTINGS — `settings.tsx`)

Bố cục nhóm như [09-settings](09-settings.md): Ôn tập / Học / Giao diện / Khác. Validate tại chỗ,
áp dụng ngay khi lưu.

## Luồng người dùng chính

```
[Lần đầu] HOME(rỗng) → Tạo deck → DECK DETAIL → + Thẻ (vài thẻ) → Học → chọn Typing → phiên → tóm tắt

[Hằng ngày] HOME → thấy "X đến hạn" → chạm deck → Học → Bắt đầu → ôn → tóm tắt → HOME

[Tổ chức lại] DECK DETAIL → Di chuyển deck/thẻ → cập nhật cây

[Tùy chỉnh] HOME → SETTINGS → sửa interval/luật sai/thẻ mới/ngôn ngữ → lưu
```

## Nguyên tắc UX

- **Default hợp lý**: người dùng tối giản (P3) không cần vào Settings vẫn học được ngay.
- **Rõ phạm vi**: luôn thấy đang học "deck này" hay "deck này + con" trước khi bắt đầu.
- **Xác nhận cho hành động phá hủy**: xóa deck (đệ quy), khôi phục mặc định, thoát giữa phiên.
- **Phản hồi tức thì**: chấm đúng/sai hiện ngay; đổi ngôn ngữ đổi ngay.
- **i18n toàn bộ**: mọi chuỗi qua `useT()` (NFR-9).
- **An toàn dữ liệu**: thao tác ghi bọc transaction; lỗi hiện thông báo, không mất dữ liệu ngầm.

## Thành phần UI dùng chung (`src/shared/ui`)

- `TreeRow` — một dòng deck trong cây (tên, badge due, nút mở/thu).
- `Button`, `TextField`, `Stepper`, `Toggle`, `ConfirmDialog`.
- `CardFace` — hiển thị term/meaning/note thống nhất giữa các mode.
- `ProgressBar`, `SessionShell` (khung phiên), `EmptyState`.

Các component này **không** chứa nghiệp vụ; nhận props + callback, để feature/store điều phối.
