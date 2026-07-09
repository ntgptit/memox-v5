# Màn hình — Flashcard List (Danh sách flashcard)

Concept và nghiệp vụ ở **mức sản phẩm** cho màn danh sách flashcard trong một scope (deck), suy ra từ
mock danh sách flashcard. Đây là **spec concept**, không phải spec kỹ thuật: không chốt schema mới,
không chốt implementation, không biến các chi tiết UI chưa chắc thành requirement bắt buộc.

> Nguồn nền tảng: [card model](../05-data-model.md) (card = `term` + `meaning` + `note` tùy chọn),
> [study flow & direction](../07-study-modes.md), [product scope](../../product/memox-scope.md),
> và màn liên quan [Deck Management](deck-management.md). Những gì các docs đó **chưa** định nghĩa thì
> màn này **không** tự định nghĩa — xem [Open questions](#open-questions--cố-ý-không-chốt).

## Tên màn hình

**Flashcard List** — Danh sách flashcard.

## Mục đích màn hình

Giúp người dùng **duyệt và quản lý các flashcard trong một deck/section hiện tại**: xem nhanh nội dung
mặt trước và mặt sau của từng card theo hướng học hiện tại, tìm/lọc/sắp xếp, mở card để xem hoặc sửa,
và thêm card mới. Đây là màn **quản lý nội dung**, **không** phải màn study session.

## Người dùng dùng màn này để làm gì

- Xem các **card thuộc scope hiện tại** (deck/section/folder đang đứng).
- Với mỗi card, đọc nhanh **mặt trước** và **mặt sau / nghĩa / giải thích** theo **hướng học hiện tại**.
- **Tìm kiếm / lọc / sắp xếp** danh sách card.
- **Mở** một card để xem hoặc **chỉnh sửa**.
- **Thêm card mới** vào scope hiện tại.
- **Thấy hướng học hiện tại** (ví dụ `KO → VI`).

## Concept chính

- Card thuộc **đúng một** scope nội dung (một deck — xem [05-data-model](../05-data-model.md)); màn này
  hiển thị các card của **scope hiện tại**.
- **Scope** có thể là deck/section/folder theo cấu trúc phân cấp mà docs sản phẩm hiện có mô tả (MemoX
  dùng mô hình **deck lồng nhau**); màn này đứng ở **một scope** và liệt kê card trong scope đó.
- Mỗi card row phải hiển thị **đủ để người dùng nhận biết nội dung học** (mặt trước + mặt sau/nghĩa).
- **Hướng học** quyết định mặt nào là **prompt** và mặt nào là **answer/meaning** khi hiển thị.
- Đây là màn **quản lý/nội dung**: nó **không** chấm điểm hay đổi trạng thái SRS (việc đó thuộc màn
  Study — [07-study-modes](../07-study-modes.md)).

## Các thành phần nghiệp vụ

Mô tả theo vai trò nghiệp vụ; **không** diễn giải sâu các icon chưa rõ.

### Header

- **Quay lại** màn/cấp trước.
- **Tên deck/section hiện tại** (có thể bị **rút gọn** nếu quá dài).
- Các **icon phụ** (nếu có) — **không** chốt nghiệp vụ khi chưa có docs nền.

### Control area (khu điều khiển danh sách)

- **Search/filter input** để tìm/lọc card.
- **Số lượng kết quả / tổng card đang hiển thị** (nếu có).
- **Chỉ báo hướng học hiện tại** (ví dụ `KO → VI`) — thể hiện hướng prompt → answer đang áp dụng.
- **Sort/filter menu** để đổi cách sắp xếp/hiển thị.

### Flashcard row (mỗi dòng card)

- **Mặt trước** của card.
- **Mặt sau / nghĩa / phần giải thích** của card.
- **Optional secondary indicators** — **chỉ** khi docs hiện tại đã định nghĩa nghiệp vụ tương ứng
  (hiện chưa; xem [Open questions](#open-questions--cố-ý-không-chốt)).
- **Action mở chi tiết hoặc chỉnh sửa** card.

### Bottom actions (hành động dưới màn)

- **Thêm card mới** vào scope hiện tại.
- Nếu có action **folder/section**: chỉ ghi là **entry point quản lý nhóm con**, và chỉ khi phù hợp
  với [Deck Management](deck-management.md) — **không** mở rộng thêm nghiệp vụ ở đây.

## Các action chính

| Action | Hành vi nghiệp vụ |
|--------|-------------------|
| Tap vào card row | Mở **card detail** hoặc **edit entry** theo navigation docs hiện có. |
| Thêm card mới | Tạo card mới **trong scope hiện tại**. Nếu danh sách đang bị **filter/search**, card vẫn được tạo vào **scope hiện tại**, **không** tạo vào "kết quả search ảo". |
| Tìm kiếm / lọc / sắp xếp | **Chỉ thay đổi cách hiển thị** danh sách; **không** thay đổi dữ liệu học hay trạng thái SRS. |
| Xem hướng học | Hiển thị hướng prompt → answer hiện tại (ví dụ `KO → VI`). Việc **đổi/chọn** hướng: xem Open questions. |

Ghi chú nghiệp vụ:

- Card row hiển thị theo **hướng học hiện tại**: hướng quyết định mặt nào là prompt, mặt nào là
  answer/meaning.
- Màn này **không** định nghĩa lại study rule; khởi động học thuộc [Deck Management](deck-management.md)
  / [07-study-modes](../07-study-modes.md).

## Các state chính

Ở mức concept (không yêu cầu implement UI trong task này):

| State | Ý nghĩa |
|-------|---------|
| `loading` | Đang tải danh sách card. |
| `loaded` | Có card rows để hiển thị. |
| `empty scope` | Scope hiện tại **chưa có** card — hiển thị **empty state** + **CTA thêm card**. |
| `search/filter empty` | Có card nhưng **không khớp** bộ lọc/tìm kiếm hiện tại. |
| `error` | Lỗi khi tải danh sách. |
| `card list unavailable` | Không thể hiển thị danh sách (ví dụ scope không hợp lệ). |
| `creating new card entry point` | Người dùng đang bắt đầu tạo card mới (điểm vào tạo mới). |

## Open questions / cố ý không chốt

Các điểm **chưa** được chốt trong screen spec này (tránh biến chi tiết UI chưa chắc thành requirement):

- **Speaker icon**: hành vi chưa chốt (không khẳng định là TTS/audio; phụ thuộc settings/audio docs).
- **Edit icon**: hành vi chưa chốt (không khẳng định gồm delete/reorder/suspend).
- **Số nhỏ bên trái / thanh dọc bên trái card**: chưa chốt là box/level/mastery hay SRS progress — docs
  hiện **chưa** định nghĩa nghiệp vụ này.
- **Công thức mastery / % tiến độ**: phụ thuộc SRS/progress docs; hiện **chưa** có công thức được định
  nghĩa (xem [06-srs-8box](../06-srs-8box.md) — không có mastery formula).
- **Audio/TTS behavior**: phụ thuộc settings/audio docs (chưa có).
- **Chọn/đổi hướng học** (ví dụ đổi `KO → VI` sang `VI → KO`): màn này chỉ chốt **hiển thị** hướng hiện
  tại. Việc **chọn** hướng ngược là **hướng mở rộng "ôn hai chiều"**, hiện **ngoài phạm vi** theo
  [07-study-modes](../07-study-modes.md#hướng-direction-hiện--hỏi); drift này đã được ghi ở
  [Deck Management](deck-management.md#drift-note). Xem [Drift note](#drift-note) dưới đây.
- **Persistence/session implementation**: **không** thuộc task này.
- **Schema dữ liệu chi tiết mới**: không chốt ở đây; đọc read model từ [05-data-model](../05-data-model.md).

## Drift note

```
DRIFT DETECTED
File code: (none — chưa có code màn Flashcard List)
File doc:  docs/design/07-study-modes.md ("Hướng (direction)") vs. mock màn Flashcard List
Mismatch:  Mock hiển thị hướng học (ví dụ KO > VI) trên control area. Hiển thị hướng thì nhất quán với
           docs (mặc định term→meaning). Nếu về sau cho phép CHỌN/đổi hướng ngay ở màn này thì mâu
           thuẫn với docs (đổi chiều/bidirectional hiện ngoài phạm vi).
Suggested fix: Trong Phase 1, coi chỉ báo hướng học ở màn này là READ-ONLY. Đây là cùng một drift đã
           được ghi ở docs/design/screens/deck-management.md#drift-note; không mở direction picker
           thành requirement Phase 1 cho tới khi có decision riêng cho "ôn hai chiều".
```

## Liên kết WBS

- Docs spec: `F1.FL.1` — Flashcard List concept and business spec.
- Read model: `F1.FL.2` (BE, Not started).
- UI skeleton: `F1.FL.3` (FE, Not started).
- States: `F1.FL.4` (FE, Not started).
- Add card entry action: `F1.FL.5` (FE/BE, Not started).
- Open card detail/edit entry: `F1.FL.6` (FE, Not started).

Xem [WBS](../../project-management/wbs.md#flashcard-list-f1fl).
