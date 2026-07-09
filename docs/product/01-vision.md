# 01 — Tầm nhìn & Mục tiêu

## Vấn đề

Người học ngoại ngữ / kiến thức cần ghi nhớ lâu dài thường gặp ba vấn đề:

1. **Học dồn rồi quên** — ôn tập không có lịch khoa học, kiến thức rơi rụng nhanh.
2. **Tổ chức rối** — số thẻ nhiều nhưng không nhóm được theo chủ đề/độ sâu, khó tìm khó quản lý.
3. **Ôn tập đơn điệu** — chỉ lật thẻ mãi một kiểu, dễ chán, và không rèn được nhiều mức độ nhớ
   (nhận ra ≠ nhớ lại chủ động ≠ viết ra được).

## Giải pháp

MemoX là app flashcard local-first giải quyết cả ba:

- **Nhớ lâu**: thuật toán **SRS 8-box (Leitner)** giãn dần khoảng ôn — thẻ nhớ chắc thì ôn thưa,
  thẻ hay quên thì ôn dày.
- **Tổ chức rõ**: **deck lồng nhau** theo cây, ôn được cả một chủ đề lớn (đệ quy) hoặc từng nhánh nhỏ.
- **Nhiều mức độ**: **5 chế độ học** từ nhận diện đến viết ra, rèn trí nhớ ở nhiều tầng.

## Mục tiêu (Goals)

- G1. Vòng học hoàn chỉnh, chạy được **offline**, dữ liệu bền vững trên máy.
- G2. Engine SRS 8-box **đúng, tất định (deterministic), có test**, tách rời khỏi UI và I/O.
- G3. Deck tree quản lý mượt: tạo/sửa/xóa/di chuyển, ôn theo phạm vi tùy chọn.
- G4. 5 chế độ học, trong đó 4 chế độ nuôi cùng một trạng thái SRS.
- G5. Giao diện **đa ngôn ngữ** (i18n), dễ thêm ngôn ngữ mới.
- G6. Schema **sync-ready** để sau này bật đồng bộ đám mây mà không phải đập đi làm lại.

## Không làm (Non-Goals — ở giai đoạn hiện tại)

- N1. **Không** đồng bộ đám mây / đăng nhập trong Phase 1–3 (chỉ chuẩn bị schema).
- N2. **Không** làm marketplace / chia sẻ deck công khai.
- N3. **Không** dùng thuật toán SRS phức tạp (SM-2, FSRS…) — đã chốt **8-box** cho đơn giản, dễ hiểu.
- N4. **Không** đa ngôn ngữ hóa *nội dung thẻ* bằng metadata ngôn ngữ nguồn/đích (thẻ chỉ là
  unicode tự do); phần đa ngôn ngữ chỉ áp dụng cho **giao diện**.
- N5. **Không** làm AI sinh thẻ tự động / OCR / import hàng loạt trong phạm vi đầu.
- N6. **Không** TTS/phát âm trong Phase 1 (có thể cân nhắc sau, ngoài phạm vi các docs này).

## Personas

- **P1 — Người tự học ngoại ngữ.** Có vài trăm tới vài nghìn thẻ. Cần lịch ôn tự động và
  phân loại theo chủ đề (Từ vựng → Chủ đề → Bài).
- **P2 — Sinh viên ôn thi.** Gom kiến thức theo môn → chương → mục. Cần ôn cả môn (đệ quy)
  trước kỳ thi và luyện nhiều kiểu để nhớ chắc.
- **P3 — Người dùng thích tối giản.** Chỉ cần tạo thẻ nhanh, mở app là biết hôm nay ôn gì,
  không muốn cấu hình phức tạp (nên default phải hợp lý ngay).

## Tiêu chí thành công

- Mở app → thấy ngay **"hôm nay cần ôn bao nhiêu thẻ"** cho phạm vi đã chọn.
- Hoàn thành một phiên Typing → trạng thái box của các thẻ cập nhật đúng theo spec 8-box.
- Đóng app, mở lại → dữ liệu và tiến độ SRS còn nguyên (bền vững local).
- Đổi ngôn ngữ giao diện → toàn bộ nhãn/nút/thông báo đổi theo, không sót chuỗi hard-code.
- Chạy `npm run check` (typecheck + biome + test + boundaries) → xanh.
