# Màn hình — Session Result (Kết quả phiên)

Concept và nghiệp vụ ở **mức sản phẩm** cho màn thống kê **kết quả một phiên** sau khi hoàn thành New
Learning Flow hoặc SRS Repeat Flow. Đây là **spec concept**, không phải spec kỹ thuật: không chốt
schema mới, không chốt implementation, không biến chi tiết UI chưa chắc thành requirement.

> Nguồn nền tảng: [New Learning Flow & SRS Repeat Flow](../07-study-modes.md),
> [SRS engine](../06-srs-8box.md), [session persistence (DT-2)](../../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted),
> [Play Menu](deck-management.md#play-menu). Những gì các docs đó **chưa** định nghĩa thì màn này
> **không** tự định nghĩa — xem [Open questions](#open-questions--cố-ý-không-chốt).

## Screen name

**Session Result** — Kết quả phiên.

## Purpose

Giúp người dùng **biết phiên vừa học/ôn hiệu quả thế nào** và chọn **bước tiếp theo** phù hợp. Chỉ
thống kê **phiên vừa hoàn thành**, **không** thay thế Dashboard/Progress dài hạn.

## When it appears

Hiển thị khi user **hoàn thành một phiên học/ôn hợp lệ** và session được **finalize thành công**:

- **New Learning Flow** — sau khi hoàn thành **review → match → guess → recall → fill**.
- **SRS Repeat Flow** — sau khi review các card **SRS-active (Box 1+) đã đến hạn**.
- **Game mode** — chỉ khi game có **session kết thúc rõ ràng** (Future; game hiện chưa thuộc Phase 1).

**Không** hiển thị Result khi:

- user chỉ **mở Play Menu**.
- user chỉ **Xem lại các từ / browse content mode** ([Flashcard List](flashcard-list.md)).
- user **thoát giữa phiên** mà **không finalize**.
- session **rỗng** / không có item học hợp lệ.

## Supported session types

`session type` ∈ { **New Learning**, **SRS Repeat** } (Game = Future). Result **phân biệt rõ** loại
phiên; **không** trộn New Learning activation với SRS Repeat metrics.

## Metrics

Ở mức concept (không chốt UI/chart/score formula).

### Common metrics

- `total items in session`
- `completed items`
- `unfinished / skipped items` (nếu có)
- `correct count` / `wrong count` (nếu mode có evaluation)
- `duration` (nếu docs/session hỗ trợ)
- `session type`: New Learning | SRS Repeat

### Result for New Learning Flow

- Số **card/từ mới đã học** trong phiên.
- Số card **hoàn thành đủ 5 mode**.
- Số card được **activate vào SRS / Box 1**.
- Số card **chưa hoàn thành** (nếu có).
- **Per-mode failure counts** (nếu docs mode có dữ liệu): `match wrong`, `guess wrong`,
  `recall forgotten`, `fill wrong`.
- Thời lượng phiên (nếu hỗ trợ).

**Rule quan trọng:**

- Card **chỉ** tính là **activated** khi hoàn thành **đủ** review + match + guess + recall + fill.
- Card **chưa** đủ 5 mode **không** tính là SRS-active.
- Result **không** tự đưa card chưa đủ điều kiện vào **Box 1** (xem [What it must not do](#what-it-must-not-do)).

### Result for SRS Repeat Flow

- Số card **đã review** trong phiên.
- Số card **nhớ đúng / remembered**.
- Số card **quên / forgotten**.
- Số card **giữ nguyên / tăng box / giảm box (reset)** — **nếu** SRS docs có rule (promotion/lapse —
  xem [06-srs-8box](../06-srs-8box.md)).
- Số card **còn lại chưa review** nếu session bị giới hạn batch.
- Thời lượng phiên (nếu hỗ trợ).

**Rule quan trọng:**

- SRS Repeat **chỉ** áp dụng cho card **Box 1+ đã due**.
- Result của SRS Repeat **không** lẫn với New Learning activation.
- Result **chỉ finalize** các attempt **thực sự xảy ra** trong session.

> **Không chốt** công thức **điểm số tổng hợp** (score) nếu docs chưa có.

## Actions

Các action hợp lý (không bắt buộc implement hết ở Phase 1; nếu chưa có docs → mark Future/Not started):

- **Done / quay lại deck**.
- **Study more** — học tiếp nếu còn new cards.
- **Repeat more** — lặp lại tiếp nếu còn due cards.
- **Review mistakes** — nếu docs hỗ trợ.
- **Go to Progress / Statistics** — CTA tới [Statistics](statistics.md) (thống kê **dài hạn**), **không**
  thay thế nó. Session Result chỉ là **phiên vừa hoàn thành**.

## Empty / failure states

- Session **không có item hợp lệ** → **không** tạo Result thành công.
- **Finalize thất bại** → **không** hiển thị Result như đã hoàn thành.
- **Partial session chưa finalize** → Result phải thể hiện **chưa hoàn thành** hoặc **không được mở**.
- **Không** được **silently** mark session completed khi persist/finalize fail.

## Persistence / local-first notes

- Result phải dựa trên **dữ liệu session/attempt đã finalize** (theo
  [DT-2](../../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted):
  `study_sessions` + `study_session_items`, và `card_reviews` cho attempt SRS).
- Result **không** được chỉ dựa vào **volatile UI state** (app là **local-first** — xem
  [05-data-model → local-first](../05-data-model.md#hợp-đồng-lưu-trữ-local-first)).
- Nếu app crash **sau** finalize, Result / lịch sử session **vẫn** phục hồi được theo session
  persistence đã chốt (DT-2).
- **Dependency:** Session Result read model phụ thuộc **session finalize** đã chốt ở DT-2; nếu một phần
  finalize (ví dụ box promotion/demotion của SRS) chưa được persist thì phải chốt trước implementation.
- **Không** thêm schema chi tiết trong task này.

## What it must not do

- **Không** tự activate card vào **Box 1** (activation **chỉ** theo New Learning Flow, khi hoàn thành đủ
  5 mode — xem [07-study-modes → New Learning Flow](../07-study-modes.md#new-learning-flow)).
- **Không** schedule SRS due cho card **chưa** activate.
- **Không** mutate learning data khi chỉ **mở** Result — chỉ **đọc** summary đã finalize.
- **Không** thay thế **Dashboard/Progress** dài hạn; **không** hiển thị toàn bộ lịch sử học trừ khi docs
  Progress/History định nghĩa riêng. Thống kê dài hạn là màn **[Statistics](statistics.md)** riêng —
  Session Result **chỉ** thống kê **phiên vừa hoàn thành**, và có thể **link** tới Statistics nhưng
  **không thay thế** nó.

## Open questions / cố ý không chốt

- **Layout / chart type / color token / animation**: không chốt.
- **Công thức điểm số tổng hợp (score)** và **công thức % tiến độ**: phụ thuộc progress docs (chưa có).
- **Route name** của màn Result: phụ thuộc navigation docs (chưa chốt).
- **Danh sách CTA chính thức** cho Phase 1: chưa chốt (một số action là Future).
- **Review mistakes flow** và **Progress screen**: là màn/luồng riêng, chưa thuộc phạm vi task này.
- **Game session result**: Future (game chưa thuộc Phase 1).

## Liên kết WBS

- Docs spec: `F1.RESULT.1` — Session Result concept.
- Read model: `F1.RESULT.2` (BE, Not started).
- New Learning Result UI: `F1.RESULT.3` (FE, Not started).
- SRS Repeat Result UI: `F1.RESULT.4` (FE, Not started).

Xem [WBS](../../project-management/wbs.md#session-result-f1result).
