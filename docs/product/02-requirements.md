# 02 — Yêu cầu

Mỗi yêu cầu có ID để tham chiếu chéo trong plan và test. `MUST` = bắt buộc, `SHOULD` = nên có,
`MAY` = tùy chọn. Cột "Phase" cho biết yêu cầu thuộc giai đoạn nào (xem
[roadmap/11-phasing.md](../roadmap/11-phasing.md)).

## 1. Yêu cầu chức năng

### 1.1 Deck (bộ thẻ) — lồng nhau

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-D1 | MUST | 1 | Tạo deck với tên (bắt buộc) và mô tả (tùy chọn). |
| FR-D2 | MUST | 1 | Deck có thể là **con** của một deck khác, lồng **tùy độ sâu**. |
| FR-D3 | MUST | 1 | Sửa tên/mô tả deck. |
| FR-D4 | MUST | 1 | Xóa deck; xóa **đệ quy** cả deck con và thẻ bên trong (có xác nhận). |
| FR-D5 | MUST | 1 | Hiển thị deck dạng **cây** có thể mở/thu gọn. |
| FR-D6 | SHOULD | 1 | **Di chuyển** deck sang cha khác; cấm tạo vòng (không cho làm con của chính con cháu nó). |
| FR-D7 | MUST | 1 | Mỗi deck hiển thị **số thẻ đến hạn hôm nay** và **tổng số thẻ** (theo phạm vi đã chọn). |

### 1.2 Card (thẻ)

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-C1 | MUST | 1 | Tạo thẻ với `term` (bắt buộc) và `meaning` (bắt buộc). |
| FR-C2 | MUST | 1 | Thẻ có `note` **tùy chọn** (ví dụ/ghi chú). |
| FR-C3 | MUST | 1 | Thẻ luôn thuộc đúng **một** deck. |
| FR-C4 | MUST | 1 | Sửa/xóa thẻ. |
| FR-C5 | SHOULD | 1 | Di chuyển thẻ sang deck khác. |
| FR-C6 | MUST | 1 | Nội dung thẻ nhận **unicode** đầy đủ (dấu tiếng Việt, CJK, emoji…). |

### 1.3 SRS 8-box

Chi tiết thuật toán ở [design/06-srs-8box.md](../design/06-srs-8box.md). Yêu cầu mức sản phẩm:

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-S1 | MUST | 1 | Mỗi thẻ có trạng thái SRS: **box hiện tại (0–8)** (0 = **not activated / pre-SRS**; 1–8 = **SRS-active**) và **thời điểm ôn gần nhất**. |
| FR-S2 | MUST | 1 | Thẻ mới bắt đầu ở **Box 0 / not activated (pre-SRS)**. Card **chỉ** vào **Box 1** sau khi hoàn thành đủ **New Learning Flow** (`review → match → guess → recall → fill`). Box 1 là điểm bắt đầu SRS. |
| FR-S3 | MUST | 1 | (SRS Repeat, card Box 1+) Trả lời **đúng** → **lên 1 box** (tối đa box 8, ở box 8 giữ nguyên box 8). |
| FR-S4 | MUST | 1 | (SRS Repeat, card Box 1+) Trả lời **sai** → theo cấu hình **lapse**: **về box 1** *hoặc* **lùi 1 box** (tối thiểu box 1). Lapse **không** áp dụng cho New Learning Flow pre-SRS. |
| FR-S5 | MUST | 1 | Thẻ (Box 1+) **đến hạn** theo **local-day**: `localDay(due_at) ≤ localDay(today)` (DT-1). Box 0 **không** có due. |
| FR-S6 | MUST | 1 | 8 khoảng ôn (interval) **cấu hình được** trong Settings; mặc định nhân đôi. |
| FR-S7 | MUST | 1 | Giới hạn **số thẻ mới mỗi ngày** (cấu hình); thẻ mới vượt giới hạn chưa được đưa vào phiên học. |
| FR-S8 | SHOULD | 1 | Engine tính toán **tất định** theo `now` truyền vào (không đọc đồng hồ ẩn) để test được. |

### 1.4 Chế độ học

Chi tiết ở [design/07-study-modes.md](../design/07-study-modes.md).

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-M1 | MUST | 1 | **Typing**: hiện `term` → người dùng gõ `meaning`; so khớp **chặt tuyệt đối**. |
| FR-M2 | MUST | 2 | **Review**: lật thẻ, tự đánh giá nhớ/không → cập nhật SRS. |
| FR-M3 | MUST | 2 | **Recall**: hiện một mặt, tự nhớ trong đầu rồi lật xem, tự chấm → cập nhật SRS. |
| FR-M4 | MUST | 2 | **Guess**: trắc nghiệm chọn 1 đáp án đúng trong nhiều lựa chọn → cập nhật SRS. |
| FR-M5 | MUST | 3 | **Match**: nối `term` ↔ `meaning` tính giờ; **không** cập nhật SRS (luyện tập). |
| FR-M6 | MUST | 1 | Trước khi vào học, chọn **phạm vi** deck: có **công tắc "gồm deck con"** (mặc định bật). |
| FR-M7 | MUST | 1 | Phiên học lấy các thẻ **đến hạn** trong phạm vi, cộng thêm thẻ mới trong hạn mức/ngày. |
| FR-M8 | SHOULD | 2 | Cuối phiên hiển thị **tóm tắt**: số đúng/sai, số thẻ lên/xuống box. |

### 1.5 Đa ngôn ngữ (i18n giao diện)

Chi tiết ở [design/08-i18n.md](../design/08-i18n.md).

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-I1 | MUST | 1 | Toàn bộ chuỗi giao diện lấy từ **file dịch**, không hard-code. |
| FR-I2 | MUST | 1 | Hỗ trợ tối thiểu **vi** và **en**; mặc định theo **ngôn ngữ thiết bị**, fallback `en`. |
| FR-I3 | MUST | 1 | Người dùng **đổi ngôn ngữ** trong Settings; lựa chọn được **lưu bền vững**. |
| FR-I4 | SHOULD | 1 | Định dạng **số/ngày** theo locale. |

### 1.6 Settings

Chi tiết + default ở [design/09-settings.md](../design/09-settings.md).

| ID | Mức | Phase | Mô tả |
|----|-----|-------|-------|
| FR-SET1 | MUST | 1 | Cấu hình **8 interval** (số ngày) cho box 1–8; validate là số nguyên **tăng dần, > 0**. |
| FR-SET2 | MUST | 1 | Cấu hình **luật khi sai**: `về box 1` \| `lùi 1 box`. |
| FR-SET3 | MUST | 1 | Cấu hình **số thẻ mới / ngày**. |
| FR-SET4 | MUST | 1 | Chọn **ngôn ngữ giao diện**. |
| FR-SET5 | SHOULD | 1 | Nút **khôi phục mặc định**. |

## 2. Yêu cầu phi chức năng

| ID | Mức | Mô tả |
|----|-----|-------|
| NFR-1 (Offline) | MUST | Mọi tính năng Phase 1–3 chạy **không cần mạng**. |
| NFR-2 (Bền vững) | MUST | Dữ liệu và tiến độ SRS còn nguyên sau khi tắt/mở lại app. |
| NFR-3 (Đa nền tảng) | MUST | Chạy trên iOS, Android, Web (Expo SDK 57). |
| NFR-4 (Hiệu năng) | SHOULD | Deck tree và phiên học mượt với **≥ 5.000 thẻ**; truy vấn "due" có index phù hợp. |
| NFR-5 (Sync-ready) | MUST | Schema chứa `id` ổn định, `created_at`/`updated_at`, cột **soft-delete**, để bật đồng bộ sau. |
| NFR-6 (Kiểm thử) | MUST | Engine SRS phủ test đơn vị các nhánh; `npm run check` xanh. |
| NFR-7 (Ranh giới) | MUST | Tôn trọng boundary: feature không import chéo, `shared` không import feature. |
| NFR-8 (Chất lượng mã) | MUST | Qua Biome (format + lint), TypeScript `strict`, `noUncheckedIndexedAccess`. |
| NFR-9 (i18n phủ) | MUST | Không còn chuỗi UI hard-code (kiểm khi review). |
| NFR-10 (A11y) | SHOULD | Nhãn chạm ≥ 44px, hỗ trợ screen reader ở các nút chính. |

## 3. Ràng buộc & giả định

- Không đăng nhập trong Phase 1–3 → toàn bộ dữ liệu gắn với thiết bị.
- Múi giờ: "ngày" tính theo **giờ địa phương của thiết bị** (ảnh hưởng "đến hạn hôm nay" và hạn mức thẻ mới/ngày).
- Xóa dùng **soft-delete** ở tầng dữ liệu để phục vụ sync; UI coi như đã xóa.
- Một thẻ có **một** trạng thái SRS (một chiều term→meaning). Ôn hai chiều **không** thuộc phạm vi các docs này
  (ghi nhận ở [design/06-srs-8box.md](../design/06-srs-8box.md) như hướng mở rộng).
