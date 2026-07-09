# 06 — Đặc tả SRS 8-box (Leitner)

Đây là **nguồn sự thật** cho engine ôn tập. Engine là **domain thuần**: hàm nhận trạng thái + kết quả
chấm + `now` + cấu hình, trả về trạng thái mới. **Không** đọc đồng hồ, **không** chạm DB → tất định,
test được (FR-S8). Vị trí code: `src/shared/srs/engine/`.

## Mô hình

- Có **8 box**, đánh số **1 → 8**.
  - Box **1** = thẻ mới hoặc hay quên (ôn dày).
  - Box **8** = nhớ rất chắc (ôn thưa nhất).
- Mỗi box gắn một **interval** = số **ngày** chờ trước lần ôn kế.
- Thẻ mới bắt đầu ở **box 1** (FR-S2).

## Cấu hình (từ Settings — xem 09-settings)

```ts
interface SrsConfig {
  intervals: [number, number, number, number, number, number, number, number]; // ngày cho box 1..8
  lapseRule: 'reset' | 'stepDown';   // sai → về box 1 | lùi 1 box
}
```

**Mặc định:**
```ts
intervals: [1, 2, 4, 8, 16, 32, 64, 128]   // nhân đôi
lapseRule: 'reset'                          // sai → về box 1 (Leitner cổ điển)
```

Ràng buộc hợp lệ của `intervals` (validate ở Settings, FR-SET1): đúng **8** phần tử, mỗi phần tử là
**số nguyên > 0**, và **tăng dần nghiêm ngặt** (`intervals[i] < intervals[i+1]`).

## Quy về đúng/sai

Mọi chế độ cập nhật SRS (Review, Recall, Guess, Typing) đều quy kết quả một lần trả lời về **`grade`**:

| Chế độ | `correct` khi | `wrong` khi |
|--------|---------------|-------------|
| Typing | Chuỗi gõ **khớp chặt tuyệt đối** với `meaning` | Ngược lại |
| Guess  | Chọn đúng đáp án | Chọn sai (hoặc hết giờ nếu có) |
| Recall | Người dùng tự bấm "Nhớ" | Tự bấm "Quên" |
| Review | Người dùng tự bấm "Nhớ" | Tự bấm "Quên" |

> Engine **chỉ** nhận `grade: 'correct' | 'wrong'`. Việc suy ra grade là của từng mode
> (xem [07-study-modes](07-study-modes.md)). Engine không biết mode nào — giữ nó thuần và tái dùng được.

## Luật cập nhật box

```
correct → box' = min(box + 1, 8)
wrong   → lapseRule === 'reset'    ? box' = 1
        : lapseRule === 'stepDown' ? box' = max(box - 1, 1)
```

Biên:
- Ở **box 8** trả lời **đúng** → giữ **box 8** (không có box 9).
- Ở **box 1** trả lời **sai** → giữ **box 1** (cả hai luật đều không xuống dưới 1).

## Xếp lịch (tính `due_at`)

Sau khi có `box'`, đặt:

```
last_reviewed_at' = now
due_at'           = now + intervals[box' - 1] * MS_PER_DAY
```

với `MS_PER_DAY = 86_400_000`. (Interval index 0-based: box `b` dùng `intervals[b-1]`.)

**Thẻ mới lần đầu được học:** trước lần chấm đầu tiên `due_at = NULL`, `box = 1`. Ngay khi đưa vào
phiên học lần đầu, đặt `new_seen_on = ngày local hôm nay` (để đếm hạn mức thẻ mới). Sau lần chấm đầu,
`due_at` được tính như trên.

> **Quyết định thiết kế — mili-giây tuyệt đối:** interval cộng theo mili-giây tuyệt đối
> (đơn giản, tránh lệ thuộc lịch). Việc xác định **đến hạn (due)** dùng mốc `now` tuyệt đối, **không**
> dùng cửa sổ ngày lịch (xem "Ngữ nghĩa Due" ngay dưới). **Ngày địa phương** của thiết bị **chỉ** dùng
> cho một việc duy nhất: đếm **hạn mức thẻ mới/ngày** (`new_seen_on`). Đây là đánh đổi có chủ đích: né
> ca biên DST/timezone. Khi bật sync đa thiết bị (Phase 4) sẽ xem lại quy ước "ngày".

## Ngữ nghĩa "đến hạn" (Due) — Option A

> **Quyết định (DT-1):** một thẻ **đến hạn** khi `due_at <= now`.
> Xem bảng quyết định: [decision-tables/phase-1-contracts.md#dt-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics).

- `now` là **mốc thời gian tuyệt đối** (epoch ms). "Due" được đánh giá **tại thời điểm truy vấn**,
  **không** theo cửa sổ ngày lịch.
- **Vị ngữ due chuẩn:** `deleted_at IS NULL AND due_at IS NOT NULL AND due_at <= now`.
- **Thẻ mới** (`due_at IS NULL`) **không** tính là due — chúng là "new", gating bằng hạn mức/ngày
  (qua `new_seen_on`, theo ngày địa phương). Đây là **chỗ duy nhất** dùng ngày địa phương.
- Cùng một vị ngữ này dùng thống nhất cho: **Today session**, **Dashboard due count**, **Study
  eligibility query**, và **Progress/statistics due count** — nên các nơi này không bao giờ lệch nhau.
  Chi tiết tác động: [DT-1](../decision-tables/phase-1-contracts.md#impact--every-surface-uses-the-same-predicate).

## Hợp đồng hàm engine

```ts
// src/shared/srs/engine/grade.ts
export type Grade = 'correct' | 'wrong';

export interface ScheduleInput {
  state: SrsState;      // { box, lastReviewedAt }
  grade: Grade;
  now: number;          // epoch ms — TRUYỀN VÀO, không đọc Date.now() bên trong
  config: SrsConfig;
}

export interface ScheduleResult {
  box: Box;             // box mới
  lastReviewedAt: number;
  dueAt: number;        // now + interval(box mới)
}

export function schedule(input: ScheduleInput): ScheduleResult;

// Kiểm tra đến hạn (thuần)
export function isDue(card: { dueAt: number | null }, now: number): boolean;
//   thẻ mới (dueAt === null) KHÔNG tính là "due" — nó là "new", xử lý qua hạn mức riêng.
```

## Ví dụ (dùng interval mặc định `[1,2,4,8,16,32,64,128]`)

| Trạng thái trước | grade | lapseRule | box sau | due sau (ngày kể từ now) |
|------------------|-------|-----------|---------|--------------------------|
| box 1            | correct | —        | 2       | +2  |
| box 3            | correct | —        | 4       | +8  |
| box 8            | correct | —        | 8       | +128 |
| box 5            | wrong | reset      | 1       | +1  |
| box 5            | wrong | stepDown   | 4       | +8  |
| box 1            | wrong | stepDown   | 1       | +1  |
| box 1            | wrong | reset      | 1       | +1  |

## Chọn thẻ cho một phiên học

Engine chỉ lo **một thẻ một lần chấm**. Việc **chọn tập thẻ** cho phiên là của `study-session`
(xem [07-study-modes](07-study-modes.md)), theo thứ tự:

1. Xác định **phạm vi deck** (một deck, hoặc đệ quy nếu công tắc "gồm deck con" bật).
2. Lấy **thẻ đến hạn**: `due_at IS NOT NULL AND due_at <= now`, sắp theo `due_at` tăng dần.
3. Bổ sung **thẻ mới** tới khi đạt hạn mức còn lại của ngày:
   `còn lại = max(0, newPerDay - đã_học_thẻ_mới_hôm_nay)`.
4. (Tùy chọn) trộn ngẫu nhiên thứ tự trong phiên để tránh học vẹt theo thứ tự thẻ.

## Ca biên & quy tắc

- **Đổi interval trong Settings** khi đã có thẻ đang xếp lịch: `due_at` cũ **giữ nguyên** cho tới lần
  chấm kế; lần chấm kế mới áp interval mới. (Không hồi tố hàng loạt — đơn giản, không gây "sốc lịch".)
- **Đổi `lapseRule`**: chỉ ảnh hưởng các lần chấm **sau đó**.
- **Thẻ quá hạn lâu** (due_at rất cũ): vẫn chỉ là "due", không phạt thêm; xử lý như một thẻ đến hạn.
- **Match mode**: không gọi engine, không ghi `card_reviews`, không đổi `box`/`due_at`.
- **Ghi nhật ký**: mỗi lần chấm (trừ Match) ghi một dòng `card_reviews` với `box_before`/`box_after`.

## Kiểm thử engine (bắt buộc — NFR-6)

Bảng ca test tối thiểu:

- correct: `box 1→2`, `7→8`, `8→8` (không vượt trần).
- wrong + reset: `5→1`, `1→1`.
- wrong + stepDown: `5→4`, `1→1` (không dưới sàn).
- `dueAt` = `now + intervals[box-1]*MS_PER_DAY` cho vài box đại diện.
- `isDue`: đúng hạn (bằng), quá hạn, chưa hạn, và **thẻ mới `dueAt=null` → false**.
- Tính tất định: cùng input → cùng output, không phụ thuộc thời điểm chạy test.
- Interval tùy biến (ví dụ Fibonacci) cho ra due khác nhau đúng như cấu hình.

## Hướng mở rộng (ngoài phạm vi hiện tại)

- **Ôn hai chiều** (term→meaning và meaning→term) như hai `SrsState` độc lập trên cùng thẻ.
  Schema hiện tại giữ một trạng thái/thẻ; nếu làm, tách bảng trạng thái SRS riêng theo `(card_id, direction)`.
- Thuật toán nâng cao (SM-2/FSRS) — **non-goal** hiện tại (xem [01-vision](../product/01-vision.md)).
