# Màn hình — Deck Management (Quản lý deck)

Concept và nghiệp vụ ở **mức sản phẩm** cho màn quản lý deck/subdeck, suy ra từ mock quản lý deck.
Đây là **spec concept**, không phải spec kỹ thuật: không chốt schema mới, không chốt implementation,
không biến các chi tiết UI chưa chắc thành requirement bắt buộc.

> Nguồn nền tảng: [nested decks](../05-data-model.md), [study flow](../07-study-modes.md),
> [due local-day (DT-1)](../../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day),
> [product scope](../../product/memox-scope.md). Những gì các docs đó **chưa** định nghĩa thì màn này
> **không** tự định nghĩa — xem [Open questions](#open-questions--cố-ý-không-chốt).

## Tên màn hình

**Deck Management** — Quản lý deck.

## Mục đích màn hình

Giúp người dùng **quản lý nội dung học bên trong một deck/folder cha**: quan sát quy mô nội dung, tiến
độ học và khối lượng cần học/ôn của các deck con, rồi chọn một deck để **bắt đầu học** hoặc đi sâu
xuống quản lý tiếp.

## Người dùng dùng màn này để làm gì

- Xem danh sách **deck con** trực tiếp của deck/folder hiện tại.
- Với mỗi deck con, nắm nhanh: **tên**, **số lượng từ/card**, **chỉ báo tiến độ học**, và **chỉ báo
  khối lượng cần học/ôn** (nếu có).
- **Bắt đầu học** một deck ngay từ dòng (row) của nó.
- **Tạo deck/folder con** trong deck hiện tại.
- **Thêm card/từ mới** vào deck hiện tại.
- **Tìm kiếm / lọc / sắp xếp** danh sách deck để dễ điều hướng.
- **Thấy hướng học hiện tại** (ví dụ `KO → VI`).

## Concept chính

- Deck có **cấu trúc phân cấp** (deck lồng deck con — xem [05-data-model](../05-data-model.md)).
- Deck Management luôn đứng ở **một deck/folder cha** và hiển thị các **deck con trực tiếp** của nó.
- Mỗi deck con là một **scope học** tiềm năng: người dùng có thể mở nó (đi sâu xuống) hoặc bắt đầu học
  scope đó.
- Màn này là nơi **điều hướng + quản lý cấu trúc + khởi động học**; nó **không** trực tiếp thay đổi
  trạng thái SRS của card (việc đó thuộc màn Study).

## Các thành phần nghiệp vụ

Mô tả theo vai trò nghiệp vụ; **không** diễn giải sâu các icon chưa rõ.

### Header

- **Quay lại** màn/cấp trước.
- **Tên deck/folder hiện tại** (ngữ cảnh người dùng đang đứng).

### Control area (khu điều khiển danh sách)

- **Tìm kiếm / lọc** danh sách deck.
- **Sort/filter menu** để đổi cách sắp xếp/hiển thị.
- **Chỉ báo hướng học hiện tại** (ví dụ `KO → VI`) — thể hiện hướng hỏi → trả lời đang áp dụng.

### Deck row (mỗi dòng deck con)

- **Tên deck**.
- **Số lượng từ/card** trong deck (quy mô nội dung).
- **Chỉ báo tiến độ học** (learning progress indicator).
- **Chỉ báo khối lượng cần học/ôn** (learning workload / due-review indicator) — **nếu có**.
- **Action bắt đầu học** deck (play/start).

### Bottom actions (hành động dưới màn)

- **Tạo deck/folder con** trong deck hiện tại.
- **Thêm card/từ mới** vào deck hiện tại.

## Các action chính

| Action | Hành vi nghiệp vụ |
|--------|-------------------|
| Mở deck row | Mở deck đó — đi sâu xuống màn quản lý cấp dưới, hoặc mở deck đó. |
| Bắt đầu học (play/start) | Bắt đầu học deck theo **rule study hiện có** (xem [07-study-modes](../07-study-modes.md)). Nếu **không có nội dung học phù hợp**, action phải ở trạng thái **không khả dụng** hoặc hiển thị thông báo phù hợp. |
| Tạo deck/folder con | Tạo một nhóm/deck con **trong deck hiện tại**. |
| Thêm card/từ | Tạo nội dung học mới **trong deck hiện tại**. |
| Tìm kiếm / lọc / sắp xếp | **Chỉ thay đổi cách hiển thị** danh sách; **không** thay đổi dữ liệu học hay trạng thái SRS. |
| Xem hướng học | Hiển thị hướng hỏi → trả lời hiện tại (ví dụ `KO → VI`). Việc **đổi/chọn** hướng: xem Open questions. |

Ghi chú nghiệp vụ:

- Deck con có thể tự chứa deck con nữa (phân cấp tùy độ sâu).
- "Bắt đầu học" từ màn này dùng **đúng** cơ chế chọn thẻ và study flow đã định nghĩa ở
  [07-study-modes](../07-study-modes.md) và điều kiện due **local-day** ở
  [DT-1](../../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day); màn này
  **không** định nghĩa lại các rule đó.

## Các state chính

Ở mức concept (không yêu cầu implement UI trong task này):

| State | Ý nghĩa |
|-------|---------|
| `loading` | Đang tải danh sách deck con. |
| `loaded` | Có danh sách deck rows để hiển thị. |
| `empty` | Deck/folder hiện tại **chưa có** deck con (và/hoặc nội dung) — hiển thị hướng dẫn tạo mới. |
| `search/filter empty` | Có dữ liệu nhưng **không khớp** bộ lọc/tìm kiếm hiện tại. |
| `error` | Lỗi khi tải danh sách. |
| `no studyable content` | Không có nội dung học phù hợp để bắt đầu — action học **không khả dụng** / thông báo phù hợp. |
| `creating new deck/card entry point` | Người dùng đang bắt đầu tạo deck con hoặc card mới (điểm vào tạo mới). |

## Open questions / cố ý không chốt

Các điểm **chưa** được chốt trong screen spec này (tránh biến chi tiết UI chưa chắc thành requirement):

- **Speaker icon**: hành vi chưa chốt trong spec này (không khẳng định là TTS/audio setting).
- **Edit icon**: hành vi chưa chốt (không khẳng định gồm delete/reorder/suspend).
- **Eye-slash / count indicator**: chưa chốt, vì docs hiện **chưa** có nghiệp vụ hidden/suspended.
- **Công thức mastery / % tiến độ**: phụ thuộc SRS/progress docs; hiện **chưa** có công thức được định
  nghĩa (xem [06-srs-8box](../06-srs-8box.md) — không có mastery formula).
- **Semantics của badge cần học/ôn**: là **learning workload / due-review indicator** cần được định
  nghĩa bởi SRS local-day docs ([DT-1](../../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day));
  **không** chốt đây là "due count tuyệt đối".
- **Chọn/đổi hướng học** (ví dụ đổi `KO → VI` sang `VI → KO`): màn này chỉ chốt **hiển thị** hướng hiện
  tại. Việc **chọn** hướng ngược là **hướng mở rộng "ôn hai chiều"**, hiện **ngoài phạm vi** theo
  [07-study-modes](../07-study-modes.md#hướng-direction-hiện--hỏi). Xem [Drift note](#drift-note).
- **Persistence/session implementation** của màn này **không** thuộc task này (session flow đã có ở
  [DT-2](../../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted)).
- **Schema dữ liệu chi tiết mới**: không chốt ở đây; đọc read model từ [05-data-model](../05-data-model.md).

## Drift note

```
DRIFT DETECTED
File code: (none — chưa có code màn Deck Management)
File doc:  docs/design/07-study-modes.md ("Hướng (direction)") vs. mock màn Deck Management
Mismatch:  Mock gợi ý người dùng có thể "thấy HOẶC CHỌN" hướng học (ví dụ KO > VI). Docs hiện tại chốt
           hướng mặc định term→meaning và coi việc đổi chiều (bidirectional) là hướng mở rộng NGOÀI
           phạm vi hiện tại. => "hiển thị hướng" thì nhất quán; "chọn/đổi hướng" thì mâu thuẫn.
Suggested fix: Trong Phase 1, coi chỉ báo hướng học ở màn này là READ-ONLY (chỉ hiển thị hướng mặc
           định). Nếu muốn cho phép ĐỔI hướng, mở một task/decision riêng gắn với "ôn hai chiều" trong
           06-srs-8box (mở rộng), rồi mới cập nhật screen spec này. Không tự chốt direction picker là
           requirement Phase 1.
```

## Liên kết WBS

- Docs spec: `F1.DM.1` — Deck Management concept and business spec.
- Read model: `F1.DM.2` (BE, Not started).
- UI skeleton: `F1.DM.3` (FE, Not started).
- States: `F1.DM.4` (FE, Not started).
- Add deck/card entry actions: `F1.DM.5` (FE/BE, Not started).
- Start study from deck row: `F1.DM.6` (FE/BE, Not started).

Xem [WBS](../../project-management/wbs.md#deck-management-f1dm).
