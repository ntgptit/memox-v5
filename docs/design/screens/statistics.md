# Màn hình — Statistics / Thống kê

Concept và nghiệp vụ ở **mức sản phẩm** cho màn **thống kê dài hạn**, suy ra từ mock Thống kê. Đây là
**spec concept**, không phải spec kỹ thuật: không chốt schema mới, không chốt implementation, không biến
chi tiết UI chưa chắc thành requirement. **Công thức chưa rõ → không bịa** (để read-model task chốt).

> Nguồn nền tảng: [Settings / More Hub](settings-more-hub.md), [Session Result](session-result.md),
> [study modes](../07-study-modes.md), [SRS](../06-srs-8box.md),
> [session persistence (DT-2)](../../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted),
> [local-first](../05-data-model.md#hợp-đồng-lưu-trữ-local-first).

## Screen name

**Statistics / Thống kê** — thống kê học **dài hạn**.

## Purpose

Giúp người dùng **theo dõi tiến độ học dài hạn** theo **số lượng từ**, **thời gian học**, và **chất
lượng trả lời**; xem **xu hướng theo ngày/khoảng thời gian**. Tổng hợp dữ liệu từ **nhiều phiên, nhiều
ngày** — **không** chỉ phiên vừa kết thúc.

## Entry point

- Bấm **Thống kê** trong [Settings / More Hub](settings-more-hub.md) → mở **Statistics screen**.
- Mặc định có thể dùng scope **Tất cả**.
- **Không** chốt Drawer là UI bắt buộc — Statistics có thể nằm trong Settings / More Hub, Progress tab,
  hoặc entry hiện đại khác (xem [navigation](../navigation.md)). **Không** chốt route name.

## Scope filter

- Nút scope (mock: **`<Tất cả>`**) cho phép xem thống kê theo **phạm vi**.
- **Mặc định: Tất cả** = tổng hợp **toàn bộ dữ liệu học local** hiện có trong app.
- **Future scope** có thể gồm language / deck / section / **time range** nếu docs sau chốt.
- **Không** chốt exact dropdown UI.

## Difference from Session Result

- **[Session Result](session-result.md)**: chỉ thống kê **một phiên vừa hoàn thành**.
- **Statistics**: tổng hợp **nhiều phiên, nhiều ngày** (learning/review **history đã finalize**).
- Session Result **có thể link** tới Statistics nhưng **không thay thế** Statistics.

## Difference from Activity summary

- **Activity summary** ([Settings / More Hub → Group A](settings-more-hub.md#group-a--activity-summary-hoạt-động-hôm-nay)):
  **tóm tắt nhanh hôm nay**.
- **Statistics**: thống kê **dài hạn**, nhiều ngày.

## Tab Từ (word/card counts)

Thống kê **số lượng từ/card** theo trạng thái học. Nhóm concept:

| Nhóm (VI) | Ý nghĩa concept |
|-----------|-----------------|
| **Đang học** | Card đang trong New Learning Flow / **chưa** hoàn tất activation vào SRS (Box 0). **Không** đồng nghĩa với "SRS due". |
| **Đã học** | Card đã hoàn thành học mới theo rule sản phẩm; theo SRS docs, là card đã vào **Box 1+** (SRS-active). |
| **Đã lặp lại** | Card **đã từng** tham gia **SRS Repeat Flow**. **Không** đồng nghĩa toàn bộ card đã học. |
| **Tổng số từ** | Tổng card/từ trong scope hiện tại. |
| **Tổng số danh mục** | Tổng category/deck/section trong scope (nếu product có concept "danh mục" ≈ deck). |

> Formula chi tiết (ví dụ "Đang học" đếm theo trạng thái nào) **cần read-model spec** ở implementation
> task (`F1.STATS.4`) — **không** chốt ở đây.

## Tab Thời gian (time)

Thống kê **thời lượng học**. Nhóm concept:

| Nhóm (VI) | Ý nghĩa concept |
|-----------|-----------------|
| **Thời gian học** | Tổng thời gian trong **New Learning Flow** / learning sessions. |
| **Thời gian lặp lại** | Tổng thời gian trong **SRS Repeat Flow**. |
| **Tổng thời gian** | Tổng thời gian học ghi nhận trong scope + khoảng thời gian đang xem (có thể gồm học + lặp lại + mode khác nếu docs sau cho phép). |

**Bắt buộc:**

- Time metrics **phải dựa trên** session/attempt/activity **đã ghi nhận** (DT-2 `study_sessions`…).
- **Mở Statistics KHÔNG làm tăng** thời gian học.
- **Browse mode** như [Xem lại các từ](flashcard-list.md) **không** được tính là thời gian học nếu docs
  chưa chốt.
- **Không** chốt công thức cộng nếu mock có số chưa khớp; **không** tự bịa dữ liệu.

## Tab Chất lượng (quality)

Thống kê **chất lượng trả lời**. Nhóm concept:

| Nhóm (VI) | Ý nghĩa concept |
|-----------|-----------------|
| **Câu trả lời đúng** | Tổng **correct evaluations** trong scope/time range. |
| **Câu trả lời sai** | Tổng **incorrect evaluations** trong scope/time range. |
| **Chất lượng học tập** | Tỷ lệ chất lượng của **New Learning Flow** — có thể dựa trên correct/attempted ở các mode **có evaluation** (match, guess, recall, fill). |
| **Chất lượng lặp lại** | Tỷ lệ chất lượng của **SRS Repeat Flow** — có thể dựa trên remembered/correct vs forgotten/incorrect trong repeat attempts. |

**Bắt buộc:**

- **Chỉ mode có evaluation** mới đóng góp correct/wrong. `reviewMode` (làm quen, **không** evaluation)
  **không** được tính là correct answer.
- **Không** chốt exact formula nếu docs study mode chưa đủ (→ `F1.STATS.6`).

## Chart concept

Mỗi tab có **chart theo thời gian**:

- **Trục ngang = ngày**; điểm dữ liệu = metric của tab đang chọn; xu hướng theo khoảng thời gian hiện tại.
- **Legend/series theo tab:**
  - **Từ**: Đang học · Đã học · Đã lặp lại
  - **Thời gian**: Học tập · Lặp lại · Tổng cộng
  - **Chất lượng**: Câu trả lời đúng · Câu trả lời sai
- Chart **đọc** dữ liệu thống kê đã ghi nhận; **không mutate** learning data.
- **Không** chốt: chart library, interpolation, color token, date range, aggregation formula (chưa có
  progress docs).

## Empty / error states

| State | Ý nghĩa |
|-------|---------|
| `loading` | Đang tải thống kê. |
| `loaded` | Có dữ liệu để hiển thị. |
| `no data` | Chưa có dữ liệu — hiển thị **empty state thân thiện** (**không** số giả / placeholder). |
| `selected scope has no data` | Scope đang chọn không có dữ liệu. |
| `selected time range has no data` | Khoảng thời gian không có dữ liệu (nếu time range được hỗ trợ sau). |
| `error` | Lỗi khi tải thống kê. |

## Data mutation rules

- **Mở Statistics KHÔNG mutate** learning data — chỉ **đọc** dữ liệu đã finalize.
- Statistics **không** schedule SRS, **không** đổi box, **không** đổi due date.
- Nguồn dữ liệu là **learning/review history đã finalize** (local-first — DT-2 + `card_reviews`).

## Relationship với các màn khác

- **Session Result** = phiên vừa hoàn thành. **Statistics** = dài hạn. **Activity summary** = nhanh, hôm nay.
- **Dashboard/Home** có thể hiển thị **một phần** thống kê nhưng **không thay thế** Statistics.
- **Review Words / browse** (chỉ xem card) **không** tự tạo thống kê học.

## Open questions / cố ý không chốt

- exact route name / chart library / UI layout / color token / date-range picker — **không** chốt.
- **exact aggregation formula / SQL / database schema** — chưa chốt (read-model task); công thức chưa rõ
  → **giữ metric là concept**, **không** bịa.
- **export statistics**, **cloud sync / account analytics** — ngoài scope hiện tại.
- Định nghĩa chính xác "Đang học / Đã học / Đã lặp lại" theo trạng thái card + "danh mục" — chốt ở
  read-model (`F1.STATS.4`).

## Liên kết WBS

- Docs spec: `F1.STATS.1`. Read model: `F1.STATS.2`. UI shell/tabs: `F1.STATS.3`.
- Aggregations: `F1.STATS.4` (Từ), `F1.STATS.5` (Thời gian), `F1.STATS.6` (Chất lượng).

Xem [WBS](../../project-management/wbs.md#statistics-f1stats).
