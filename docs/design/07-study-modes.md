# 07 — Chế độ học

5 chế độ. Bốn chế độ (**Review, Recall, Guess, Typing**) quy kết quả về `grade` rồi gọi **cùng một**
engine 8-box ([06-srs-8box](06-srs-8box.md)). **Match** là game luyện tập, **không** đụng SRS.

Vị trí code: `src/features/study-session/modes/<mode>/`. Mỗi mode là một component nhận **cùng một**
danh sách thẻ của phiên và một callback `onGrade(cardId, grade)` (trừ Match).

## Luồng chung một phiên học

```
Chọn deck → chọn phạm vi (công tắc "gồm deck con") → chọn chế độ
      → study-session dựng danh sách thẻ (due + thẻ mới trong hạn mức)
      → lặp qua thẻ theo chế độ → mỗi thẻ (trừ Match) sinh grade → engine.schedule() → lưu
      → màn hình tóm tắt cuối phiên
```

- **Dựng danh sách thẻ**: theo mục "Chọn thẻ cho một phiên học" trong [06-srs-8box](06-srs-8box.md).
- **Lưu sau mỗi lần chấm**: cập nhật `cards.box/due_at/last_reviewed_at` + chèn `card_reviews`
  (một transaction). Thẻ mới lần đầu: đặt `new_seen_on = hôm nay`.
- **Tóm tắt cuối phiên** (FR-M8): số đúng/sai, số thẻ lên/xuống box, thời lượng.

## 1. Typing — Phase 1 (mode nền tảng)

**Mục tiêu:** recall chủ động cao nhất — phải viết ra được.

- Hiện **`term`**. Ô nhập cho người dùng gõ **`meaning`**.
- Chấm bằng **so khớp chặt tuyệt đối** (exact): so sánh **từng ký tự**, **phân biệt hoa/thường và dấu**,
  **không** chuẩn hóa khoảng trắng/dấu câu. `grade = (input === card.meaning) ? 'correct' : 'wrong'`.
- Sau khi gửi: hiện đáp án đúng + `note` (nếu có); nếu sai, hiển thị đối chiếu input vs đáp án.
- `onGrade(cardId, grade)` → engine.

> Vì so khớp **chặt**, UI nên: không tự sửa chính tả, không viết hoa đầu câu, không auto-trim ẩn.
> (Có thể trim khoảng trắng **đầu/cuối** ở mức nhập liệu là hợp lý, nhưng mặc định spec là **chặt** —
> nếu về sau muốn nới, đưa thành tùy chọn trong Settings; hiện tại **không** nới.)

## 2. Review — Phase 2

**Mục tiêu:** ôn nhanh, tự đánh giá.

- Hiện **`term`**. Nút "Lật" → hiện `meaning` (+ `note`).
- Hai nút: **"Nhớ"** (`correct`) / **"Quên"** (`wrong`) → engine.
- Khác Recall ở nhịp: Review thiên về **duyệt nhanh** (có thể vuốt), Recall nhấn mạnh **tự kiểm tra
  trước khi lật**. Về mặt dữ liệu cả hai đều sinh `grade` như nhau.

## 3. Recall — Phase 2

**Mục tiêu:** tự kiểm tra trí nhớ trước khi thấy đáp án.

- Hiện **`term`** + nhắc "Nhớ lại nghĩa trong đầu…".
- Nút "Hiện đáp án" → lộ `meaning`.
- Người dùng tự chấm **"Đúng"** (`correct`) / **"Sai"** (`wrong`) → engine.

## 4. Guess — Phase 2

**Mục tiêu:** nhận diện trong nhiễu (recognition).

- Hiện **`term`** + **N lựa chọn** `meaning` (mặc định **4**, gồm 1 đúng + 3 nhiễu).
- **Nhiễu (distractors)** lấy từ `meaning` của thẻ khác **cùng phạm vi** (ưu tiên cùng deck/độ dài
  tương tự để nhiễu "thật"); nếu phạm vi có < 4 thẻ, giảm số lựa chọn cho phù hợp.
- Chọn đúng → `correct`; chọn sai → `wrong` → engine. Sau khi chọn, tô đúng/sai rồi sang thẻ kế.

## 5. Match — Phase 3 (KHÔNG cập nhật SRS)

**Mục tiêu:** khởi động/giải trí, củng cố liên kết term↔meaning.

- Lưới các ô: một nửa là `term`, nửa kia là `meaning` (mặc định **6 cặp** mỗi màn, xáo trộn).
- Người dùng **nối** term với meaning đúng; cặp đúng biến mất, cặp sai nháy đỏ.
- **Tính giờ**; xong hiển thị thời gian (và có thể best-time cục bộ). **Không** ghi `card_reviews`,
  **không** đổi `box`/`due_at`.
- Chọn thẻ cho Match: lấy trong phạm vi (không cần "due"); ưu tiên thẻ đang học để củng cố.

## Bảng đối chiếu mode

| Mode | Hiện | Hành động người dùng | Suy ra grade | Cập nhật SRS | Phase |
|------|------|----------------------|--------------|:------------:|:-----:|
| Typing | term | Gõ meaning | exact match | ✅ | 1 |
| Review | term → lật | Bấm Nhớ/Quên | tự đánh giá | ✅ | 2 |
| Recall | term → hiện | Bấm Đúng/Sai | tự đánh giá | ✅ | 2 |
| Guess  | term + 4 lựa chọn | Chọn đáp án | đúng/sai lựa chọn | ✅ | 2 |
| Match  | lưới cặp | Nối cặp | — | ❌ | 3 |

## Hướng (direction) hiện & hỏi

- Mặc định **term → (hỏi) meaning** cho tất cả mode (theo quyết định thiết kế).
- Đổi chiều (meaning → term) là **hướng mở rộng**, gắn với "ôn hai chiều" trong
  [06-srs-8box](06-srs-8box.md#hướng-mở-rộng-ngoài-phạm-vi-hiện-tại). Không thuộc phạm vi hiện tại.

## Giao diện dùng chung giữa các mode

Để tránh trùng lặp và giữ ranh giới sạch:

- **Khung phiên** (`SessionShell`): thanh tiến độ, đếm còn lại, nút thoát, xử lý tóm tắt cuối phiên —
  đặt ở `study-session`, dùng chung cho mọi mode.
- **`onGrade(cardId, grade)`**: giao diện chung nối mode → `study-session` → engine → repository.
- Mode **không** tự truy vấn DB; nhận thẻ và trả grade. `study-session` lo I/O + engine.
