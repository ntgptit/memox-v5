# 06 — Đặc tả SRS 8-box (Leitner)

Đây là **nguồn sự thật** cho engine ôn tập. Engine là **domain thuần**: hàm nhận trạng thái + kết quả
chấm + `now` + cấu hình, trả về trạng thái mới. **Không** đọc đồng hồ, **không** chạm DB → tất định,
test được (FR-S8). Vị trí code: `src/shared/srs/engine/`.

## Mô hình

- **Box 0 / chưa activate** = trạng thái **trước SRS**: thẻ mới **chưa** được đưa vào lịch SRS.
- Có **8 box SRS**, đánh số **1 → 8**.
  - Box **1** = **điểm bắt đầu SRS** (thẻ vừa được activate vào SRS).
  - Box **8** = nhớ rất chắc (ôn thưa nhất).
- Mỗi box (1–8) gắn một **interval** = số **ngày** chờ trước lần ôn kế.
- **Thẻ mới bắt đầu ở Box 0 / chưa activate**, **không** ở Box 1. Thẻ chỉ vào **Box 1** sau khi hoàn
  thành **New Learning Flow** (xem [Kích hoạt SRS](#kích-hoạt-srs-box-0--box-1) và
  [07-study-modes → New Learning Flow](07-study-modes.md#new-learning-flow)).

## Kích hoạt SRS (Box 0 → Box 1)

- Thẻ mới ở **Box 0 / not activated** — **chưa** thuộc SRS, **không** có `due`, **không** xuất hiện
  trong luồng **Lặp lại** (SRS Repeat).
- Thẻ chỉ được **activate** (Box 0 → **Box 1**) sau khi hoàn thành đủ **5 mode** của New Learning Flow
  theo thứ tự: **review → match → guess → recall → fill** (xem
  [07-study-modes → New Learning Flow](07-study-modes.md#new-learning-flow)).
- **`reviewMode`** (mode 1), **`matchMode`** (mode 2) và **`guessMode`** (mode 3) đều **thuộc pha trước
  SRS**. Hoàn thành **riêng** `reviewMode`, hoặc **review + match**, hoặc **review + match + guess**,
  đều **không** đủ để bật SRS: card **vẫn Box 0 / not SRS-active** cho tới khi hoàn thành **đủ cả 5
  mode** (review → match → guess → recall → fill). Feedback **đúng/sai** trong `guessMode` là **pre-SRS
  learning**, **không** phải SRS review grading; guess-correct không đủ để bật SRS, guess-incorrect
  không đưa card vào Box 1. Card đang ở `reviewMode`/`matchMode`/`guessMode` vẫn là **pre-SRS card**.
- **SRS interval/due scheduling chỉ áp dụng từ Box 1 trở đi.** Card ở Box 0 không được xếp lịch SRS.
- **Repeat mode (Lặp lại)** chỉ dùng card **Box 1+** đã **đến hạn**; new card chưa activate (kể cả đang
  ở `reviewMode`) **không** được đưa vào Repeat.
- Card chưa hoàn thành đủ 5 mode → **vẫn Box 0 / not SRS-active** (tiến độ có thể phản ánh partial
  learning nếu docs progress cho phép, nhưng **không** phải SRS review).

> **DRIFT DETECTED — mô hình activation vs. docs hiện có**
> ```
> File code: (none — chưa có code)
> File doc:  docs/design/05-data-model.md (cards.box DEFAULT 1, CHECK (box BETWEEN 1 AND 8); Box = 1..8),
>            docs/product/02-requirements.md (FR-S2 "Thẻ mới bắt đầu ở box 1")
> Mismatch:  Docs cũ cho thẻ mới bắt đầu ngay ở Box 1 và box chỉ nhận 1..8. Nghiệp vụ mới yêu cầu thẻ
>            mới ở Box 0 / not-activated và chỉ vào Box 1 sau New Learning Flow (5 mode). => cần Box 0
>            (hoặc cờ activated) mà schema/enum hiện tại chưa có.
> Suggested fix: Ở task docs này KHÔNG chốt schema/migration. Cần một task riêng cập nhật data model:
>            thêm trạng thái not-activated (ví dụ box 0 hoặc cột activated_at / learning_progress),
>            nới CHECK box (0..8) hoặc tách cột, và sửa FR-S2. Cho tới khi đó, Box 0 là khái niệm
>            nghiệp vụ (concept) trong docs SRS/study, chưa phải schema đã chốt.
> ```

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

**Thẻ mới (Box 0 / chưa activate):** `due_at = NULL`, **chưa** thuộc SRS, không được `schedule()`. Thẻ
đi qua **New Learning Flow** (5 mode) — đây **không** phải SRS review. Khi đưa vào học lần đầu, đặt
`new_seen_on = ngày local hôm nay` (để đếm hạn mức thẻ mới). **Khi hoàn thành đủ 5 mode**, card được
**activate**: chuyển sang **Box 1** và **lần đầu** được `schedule()` để có `due_at` (xem
[Kích hoạt SRS](#kích-hoạt-srs-box-0--box-1)). Từ Box 1 trở đi, mỗi lần chấm dùng công thức trên.

> Lưu ý: hàm `schedule()`/`isDue()` dưới đây thao tác trên card **đã activate (Box 1–8)**. Việc chuyển
> Box 0 → Box 1 là do **New Learning Flow** quyết định (hoàn thành 5 mode), **không** phải một lần
> `schedule()` thông thường.

> **Quyết định thiết kế — lưu trữ vs. eligibility:** `due_at` được **lưu** dưới dạng mốc tuyệt đối
> (epoch ms; interval cộng theo mili-giây). Nhưng việc **xác định đến hạn (due)** thì **normalize về
> ngày địa phương** trước khi so sánh (xem "Ngữ nghĩa Due (local-day)" ngay dưới) — **không** so trực
> tiếp `due_at <= now`. Khi bật sync đa thiết bị (Phase 4) sẽ xem lại quy ước "ngày".

## Ngữ nghĩa "đến hạn" (Due) — local-day

> **Quyết định (DT-1):** một thẻ **đến hạn** khi **ngày-địa-phương của `due_at` ≤ ngày-địa-phương của
> hôm nay** trên thiết bị. Xem
> [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) và
> [study-srs-decision-table](../decision-tables/study-srs-decision-table.md).

- **Quy tắc nguồn sự thật:** `localDay(due_at) <= localDay(today)`.
- Thẻ đến hạn **muộn hơn trong hôm nay** vẫn tính là **due hôm nay** (không bị ẩn tới đúng mốc giờ).
- Thẻ đến hạn **ngày mai** → **không** due hôm nay. Thẻ **hôm qua trở về trước** → luôn due.
- **Thẻ mới** (`due_at IS NULL`) **không** tính là due — vào phiên qua hạn mức thẻ mới/ngày.
- **Không** dùng trực tiếp `due_at <= now` cho query học/ngày nếu điều đó làm ẩn thẻ due-muộn-hôm-nay.
- **Clock được inject / test-controlled**; **không** giấu `Date.now()` trong business logic khó test.
  "Hôm nay" được **truyền vào** domain/use-case.
- Storage **có thể** pre-filter bằng timestamp cho hiệu năng (ví dụ `due_at < đầu_ngày_mai`), nhưng
  **quy tắc local-day ở domain/use-case là nguồn sự thật** và phải được áp lại.
- Cùng quy tắc này dùng thống nhất cho: **Today session**, **Dashboard due count**, **Study
  eligibility query**, **Progress/statistics due count**, và **mọi review-queue query sau này** — nên
  các nơi này không bao giờ lệch nhau.

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

// Kiểm tra đến hạn (thuần) — theo local-day (DT-1), KHÔNG so trực tiếp dueAt <= now.
// `today` là ngày-địa-phương được TRUYỀN VÀO (test-controlled), không đọc Date.now() bên trong.
export function isDue(card: { dueAt: number | null }, today: LocalDay): boolean;
//   dueAt === null (thẻ mới) → false (vào phiên qua hạn mức thẻ mới, không qua "due").
//   ngược lại: localDay(dueAt) <= today.
//   LocalDay: kiểu ngày-địa-phương đã chuẩn hóa (ví dụ 'YYYY-MM-DD' hoặc số ngày kể từ epoch-local).
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
2. Lấy **thẻ đến hạn** theo **local-day** (DT-1): `localDay(due_at) <= localDay(today)`, sắp theo
   `due_at` tăng dần. (Storage có thể pre-filter `due_at < đầu_ngày_mai` cho hiệu năng, nhưng quy tắc
   local-day ở use-case là nguồn sự thật.)
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
- `isDue` (local-day, DT-1): due **muộn hơn trong hôm nay → true**; due **ngày mai → false**; due
  **hôm qua → true**; **thẻ mới `dueAt=null` → false**. Truyền `today` vào (clock test-controlled).
- Ca biên timezone: cùng `due_at` tuyệt đối nhưng `today` khác ngày-địa-phương cho kết quả `isDue`
  khác nhau đúng như quy tắc local-day.
- Tính tất định: cùng input → cùng output, không phụ thuộc thời điểm chạy test.
- Interval tùy biến (ví dụ Fibonacci) cho ra due khác nhau đúng như cấu hình.

## Hướng mở rộng (ngoài phạm vi hiện tại)

- **Ôn hai chiều** (term→meaning và meaning→term) như hai `SrsState` độc lập trên cùng thẻ.
  Schema hiện tại giữ một trạng thái/thẻ; nếu làm, tách bảng trạng thái SRS riêng theo `(card_id, direction)`.
- Thuật toán nâng cao (SM-2/FSRS) — **non-goal** hiện tại (xem [01-vision](../product/01-vision.md)).
