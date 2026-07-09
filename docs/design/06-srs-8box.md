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
- **`reviewMode`** (mode 1), **`matchMode`** (mode 2), **`guessMode`** (mode 3), **`recallMode`**
  (mode 4) và **`fillMode`** (mode 5) đều **thuộc pha trước SRS**. Hoàn thành **riêng** review, hoặc
  review+match, hoặc review+match+guess, hoặc review+match+guess+recall, đều **không** đủ để bật SRS:
  card **vẫn Box 0 / not SRS-active** cho tới khi hoàn thành **đủ cả 5 mode** (review → match → guess →
  recall → fill). Feedback **đúng/sai** trong `matchMode` (ghép cặp) và `guessMode` (chọn đáp án),
  **recall success/failure** trong `recallMode` (bấm Hiển thị + 20s timer; timeout = Đã quên), và
  **Kiểm tra đúng/sai** trong `fillMode` (điền lại prompt/front) đều là **pre-SRS learning**, **không**
  phải SRS review grading. Card đang ở bất kỳ mode nào trong 5 mode vẫn là **pre-SRS card** và **không**
  xuất hiện trong **Lặp lại (SRS Repeat)**.
- **`fillMode` là cổng activate SRS.** **Fill-correct** (Kiểm tra đúng) — khi 4 mode trước đã hoàn thành
  — là **điều kiện cuối** đưa card vào **Box 1** và bật SRS. **Fill-incorrect** **không** đưa card vào
  Box 1. **Trợ giúp** (gợi ý) **không** tự bật SRS và **không** thay cho Kiểm tra đúng. Card **chưa**
  hoàn thành `fillMode` vẫn pre-SRS.
- **Session Result (cuối phiên SRS Repeat).** Màn [Session Result](screens/session-result.md) sau một
  phiên **Lặp lại** **chỉ** thống kê card **Box 1+ đã review** trong session đó. Mọi thay đổi box
  (**promotion** khi correct / **demotion / reset** theo `lapseRule`) **phải được finalize trước** khi
  Result hiển thị. Result **không** được **schedule SRS** cho card **chưa activate** (chưa vào Box 1), và
  **không** trộn New Learning activation với SRS Repeat metrics.
- **Đóng góp vào Statistics (dài hạn).** SRS Repeat attempts **có thể đóng góp** vào
  [Statistics](screens/statistics.md). **SRS quality metrics** (Chất lượng lặp lại) **chỉ** dùng card
  **Box 1+ đã review** trong Repeat Flow. Statistics **chỉ đọc** history đã finalize: **không** schedule
  SRS, **không** đổi box, **không** đổi due date.
- **SRS interval/due scheduling chỉ áp dụng cho Box 1..8.** Card ở Box 0 **không** được xếp lịch SRS;
  SRS engine phải **từ chối / bỏ qua** scheduling cho Box 0 **trừ** thao tác **activate tường minh**
  (Box 0 → Box 1). `due_at` là **null / bỏ qua** cho Box 0.
- **Lapse (stepDown/reset) không bao giờ xuống dưới Box 1** cho card SRS-active.
- **Repeat mode (Lặp lại)** chỉ dùng card **Box 1+** đã **đến hạn**; card **Box 0** (kể cả đang ở
  `reviewMode`) **không** đủ điều kiện vào Repeat.
- **Spaced Repetition Settings không được đổi mô hình 8-box** nếu chưa có **migration policy** tường
  minh ở tương lai (xem [Spaced Repetition Settings](screens/spaced-repetition-settings.md)).
- **SRS Repeat Flow bắt đầu từ Repeat Mode Menu.** Bấm **Lặp lại** mở
  [Repeat Mode Menu](07-study-modes.md#repeat-mode-menu); user **chọn 1 repeat mode** trong **match /
  guess / recall / fill** (đây là **SRS review** cho card **Box 1+ đã due**). **`reviewMode` KHÔNG** dùng
  cho SRS Repeat. Nếu **due count = 0**, **không** tạo SRS repeat session **rỗng**.
- Card chưa hoàn thành đủ 5 mode → **vẫn Box 0 / not SRS-active** (tiến độ có thể phản ánh partial
  learning nếu docs progress cho phép, nhưng **không** phải SRS review).

> **Box 0 drift — RESOLVED in docs.**
> Mô hình activation Box 0 đã được **đồng bộ** trong toàn bộ docs (không còn mâu thuẫn):
> - [05-data-model](05-data-model.md): `cards.box INTEGER NOT NULL DEFAULT 0 CHECK (box BETWEEN 0 AND 8)`;
>   `due_at` nullable cho Box 0; thêm `srs_activated_at` (recommended); `Box = 0 | 1..8`.
> - [02-requirements](../product/02-requirements.md): **FR-S1** box (0–8); **FR-S2** thẻ mới ở **Box 0**,
>   chỉ vào Box 1 sau New Learning Flow.
> - [memox-scope](../product/memox-scope.md): "new cards start at **Box 0** … only enter SRS after the
>   New Learning Flow".
>
> Đây là **docs concept**, **không** thêm migration/SQL thật (repo chưa có DB implementation). Nếu sau
> này phát hiện file doc nào còn ghi "box 1..8 / new card starts Box 1", cập nhật để khớp Box 0.

## Spaced Repetition Settings (từ App Settings)

Màn [Spaced Repetition Settings](screens/spaced-repetition-settings.md) (mở từ
[App Settings](screens/app-settings.md)) có thể hiển thị/cấu hình một số option. **Settings không được
mâu thuẫn với SRS box model.**

- **8-box, không đổi thành 7-box.** MemoX dùng **8-box**; **không** đổi thành 7-box chỉ vì mock hiển thị
  **"Ô: 7"**. **"Ô: 7"** cần được **giải thích trước implementation** (current box / max visible box /
  selected interval box / legacy value) — **không** implement ambiguous box setting khi chưa có product
  decision. Xem [drift ở screen spec](screens/spaced-repetition-settings.md#box-setting--ô-7-open-question).
- **Repeat box ordering** ("Thứ tự hộp khi lặp lại: Tăng") **chỉ** ảnh hưởng **thứ tự review**, **không**
  tự đổi box/due.
- **SRS notification** ("Thông báo") **chỉ** thông báo khi **có due cards** (local due, DT-1); **không**
  tự bắt đầu session; **không** tự đổi due date/box.
- **Forgotten/lapse** ("Di chuyển vào ô trước đó") = `lapseRule: 'stepDown'` — **chỉ** áp dụng cho
  **SRS-active cards trong Repeat Flow**; Box 1 không giảm dưới Box 1. **New Learning Flow pre-SRS
  KHÔNG** dùng lapse policy; browse mode cũng không. (Giá trị `reset` vẫn tồn tại — mock chỉ xác nhận
  `stepDown`; **không** ghi đè.)
- **Game word selection source** ("Chế độ lặp lại giãn cách") **chỉ** dùng card **Box 1+ và due** nếu
  game chọn SRS pool.
- Bất kỳ setting nào ảnh hưởng **box/due hiện có** phải có **policy/migration riêng** trước implement.

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
