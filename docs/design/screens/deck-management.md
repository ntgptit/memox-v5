# Màn hình — Deck Management (Quản lý deck)

Concept và nghiệp vụ ở **mức sản phẩm** cho màn quản lý deck/subdeck, suy ra từ mock quản lý deck.
Đây là **spec concept**, không phải spec kỹ thuật: không chốt schema mới, không chốt implementation,
không biến các chi tiết UI chưa chắc thành requirement bắt buộc.

> **Bao gồm variant [Subdeck List](#subdeck-list-variant)** — trạng thái của Deck Management khi scope
> hiện tại có các section/subdeck con. **Không** phải màn hình tách biệt.

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

## Sort Menu

Menu để **thay đổi thứ tự hiển thị** của deck/subdeck rows trong scope hiện tại. Mở từ **icon
sort/filter** ở [Control area](#các-thành-phần-nghiệp-vụ). Sort Menu là **một phần của Deck Management /
Subdeck List**, không phải feature độc lập; hiện chỉ áp dụng cho **Deck/Subdeck List** (không mặc định
áp cho mọi màn khác khi docs chưa nói).

### Sort options

Product meaning dùng **label rõ**, **không** chỉ dựa vào mũi tên ↑/↓ (UI có thể hiển thị ↑/↓ kèm theo,
nhưng ý nghĩa sản phẩm phải rõ bằng label).

| # | Option (EN) | Label đề xuất (VI) | Thứ tự |
|---|-------------|--------------------|--------|
| 1 | Alphabetical A to Z | Bảng chữ cái A → Z | Theo **title tăng dần** |
| 2 | Alphabetical Z to A | Bảng chữ cái Z → A | Theo **title giảm dần** |
| 3 | Created newest first | Ngày tạo mới nhất | Theo **ngày tạo giảm dần** |
| 4 | Created oldest first | Ngày tạo cũ nhất | Theo **ngày tạo tăng dần** |
| 5 | Recently studied first | Học gần đây | Theo **lần học gần nhất giảm dần** |
| 6 | Least recently studied first | Lâu chưa học | Theo **lần học gần nhất tăng dần** |

Ba **sort key** (title, ngày tạo, lần học gần nhất), mỗi key có **2 chiều**.

### Rule cho item chưa từng học

"Lần học gần nhất" của một deck/section là giá trị **dẫn xuất** (derived) từ nội dung bên trong; deck
có thể **chưa từng được học** (không có last-studied). Quy tắc hiển thị bắt buộc:

- **Học gần đây (Recently studied first):** item **chưa từng học** nằm **cuối** danh sách.
- **Lâu chưa học (Least recently studied first):** item **chưa từng học** nằm **đầu** danh sách (vì đây
  là nội dung chưa được học).

### Stable fallback (tie-break)

Nếu nhiều item có **cùng sort value**, dùng **fallback ổn định** theo **title** (hoặc ngày tạo) để danh
sách **không nhảy lung tung** giữa các lần render.

### Behavior (nghiệp vụ)

- Sort **chỉ áp dụng cho list hiện tại** (presentation order).
- Sort **không** thay đổi **dữ liệu gốc**.
- Sort **không** thay đổi **study eligibility**.
- Sort **không** thay đổi **due/workload count**.
- Sort **không** thay đổi **progress percent**.
- Nếu **search/filter đang active**, sort áp dụng trên **kết quả hiện tại**.
- Khi **clear search/filter**, sort hiện tại **vẫn** được dùng cho list đầy đủ nếu màn còn mở.
- **Persistence** của lựa chọn sort **chưa chốt** trong task này (trừ khi docs settings đã có rule).

## Play Menu

Xuất hiện khi người dùng bấm nút **Play/Start** trên một deck/subdeck row. Menu hiển thị các **cách học
hoặc xem lại** nội dung trong **scope hiện tại**. Play Menu là **một phần của Deck Management / Subdeck
List**, không phải feature độc lập.

**Học vs. Lặp lại** là hai luồng khác nhau:

- **Học = [New Learning Flow](../07-study-modes.md#new-learning-flow)** — học **thẻ mới** (pre-SRS).
  Thẻ mới đi qua **review → match → guess → recall → fill**; hoàn thành đủ 5 mode thì card mới được
  **activate** từ **Box 0** lên **Box 1** và SRS mới bật. **Học không phải SRS review.**
- **Lặp lại = [SRS Repeat Flow](../07-study-modes.md#srs-repeat-flow)** — review SRS, **chỉ** cho card
  đã **activate** (Box 1+) và **đến hạn**.

Nội dung menu **phụ thuộc trạng thái học của scope**, dựa trên các biến nghiệp vụ:

- **`newCount`** — số card/từ **mới** (Box 0 / chưa activate, `due_at IS NULL`) có thể học trong scope.
- **`reviewDueCount`** — số card **SRS-active (Box 1+)** đã **đến hạn** (`due`, local-day —
  [DT-1](../../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day)) tại **thời điểm
  mở menu**. **Không** phải tổng card đã học, **không** phải progress %, **không** phải tổng card trong deck.
- **`progress`** — tiến độ học của scope (theo progress docs; công thức chưa chốt). `progress > 0%` ⇔
  scope **đã có** ít nhất một card activate vào SRS / lịch sử học hợp lệ.

Các count **lấy theo scope hiện tại**. **Search/filter của list không làm thay đổi count của Play
Menu**, trừ khi người dùng đang chọn một **filtered scope rõ ràng**.

### Ý nghĩa các option

| Option (VI) | Ý nghĩa | Label phụ | Điều kiện hiển thị |
|-------------|---------|-----------|--------------------|
| **Học** | New Learning Flow cho card/từ **mới** (activate vào SRS). | Số từ mới, ví dụ `120 từ mới`. | `newCount > 0`. |
| **Lặp lại** | SRS Repeat Flow cho card **Box 1+ đã đến hạn**. | Số cần lặp lại, ví dụ `Lặp lại 83 từ`; **`0`/no-due** nếu chưa đến hạn. | **Khi `progress > 0%`** (có card SRS-active). Count **có thể = 0**. |
| **Xem lại các từ** | Mở chế độ **browse/xem lại** danh sách từ trong scope ([Flashcard List](flashcard-list.md)). **Không** nhất thiết tạo study session. | — | Khi scope **có card** (không phụ thuộc count/due). |
| **Một trò chơi** | Mở **game mode** nếu game nằm trong product scope. | Phản ánh workload hiện có (xem dưới). | Khi scope có nội dung phù hợp; **Future** nếu game chưa thuộc Phase 1. |
| **Trình phát** | Mở **player/listening mode** nếu product scope cho phép. | — | Chỉ khi product scope cho phép player; **Future** nếu audio/player chưa thuộc Phase 1. |

**Label phụ của "Một trò chơi"** phản ánh workload khả dụng (new / review / cả hai):

- Chỉ có từ mới: `120 từ mới`.
- Chỉ có lặp lại: `Lặp lại 83 từ`.
- Có cả hai: `Lặp lại 83 từ, 563 từ mới`.

### Menu variants

**Variant A — Deck chưa học / progress = 0%.** Điều kiện: `progress = 0%`, **chưa** có card nào
SRS-active, `reviewDueCount = 0`.

- Hiển thị: **Học** (nếu `newCount > 0`), **Xem lại các từ** (nếu scope có card), **Một trò chơi** (nếu
  game trong product scope), **Trình phát** (nếu player trong product scope).
- **Không** hiển thị: **Lặp lại**.

**Variant B — Deck đã có progress > 0%.** Điều kiện: `progress > 0%` (có ≥ 1 card đã activate vào SRS
hoặc có lịch sử học hợp lệ).

- Hiển thị: **Học** (nếu vẫn còn `newCount > 0`), **Lặp lại**, **Xem lại các từ**, **Một trò chơi**,
  **Trình phát** (nếu product scope cho phép).
- **Lặp lại count** = `reviewDueCount` tại thời điểm mở menu — có thể là `83`, `5`, hoặc **`0`** nếu
  chưa đến hạn. `progress > 0%` **không** đồng nghĩa mọi learned card đều cần lặp lại ngay.

### Count display

- **Học** hiển thị **số từ mới** (`newCount`).
- **Lặp lại** hiển thị **`reviewDueCount`** (số card Box 1+ đến hạn); nếu `= 0` → trạng thái **no-due**.
- **Một trò chơi** hiển thị **workload khả dụng** (new / review / cả hai).
- Count **lấy theo scope hiện tại**; search/filter của list không đổi count (xem trên).

### Behavior (nghiệp vụ)

- Bấm **Học** → mở **New Learning Flow** theo thứ tự **review → match → guess → recall → fill**: bắt đầu
  ở `reviewMode`, hoàn thành → `matchMode`, rồi **`guessMode`** (mode thứ 3), `recallMode`, `fillMode`
  ([07-study-modes → matchMode](../07-study-modes.md#matchmode-mode-thứ-2),
  [guessMode](../07-study-modes.md#guessmode-mode-thứ-3),
  [recallMode](../07-study-modes.md#recallmode-mode-thứ-4),
  [fillMode](../07-study-modes.md#fillmode-mode-thứ-5--cổng-activate-srs)). `matchMode` và `guessMode`
  có **feedback đúng/sai** (correct/incorrect): correct dùng **trạng thái xanh**, incorrect dùng
  **trạng thái đỏ**. `recallMode` (mode thứ 4) có **nút Hiển thị kèm timer 20 giây**: hết 20s mà chưa
  bấm Hiển thị thì tính là **Đã quên**. `fillMode` (mode thứ 5, **cuối**) yêu cầu **điền lại
  prompt/front** với nút **Trợ giúp** và **Kiểm tra**; **chỉ sau khi `fillMode` completed** (Kiểm tra
  đúng, khi 4 mode trước đã xong) thì card **mới** có thể vào **Box 1**. Mọi feedback trên là **learning
  feedback**, **không** phải **SRS review grading**. Đây là một phần của **New Learning Flow**, **không**
  phải SRS Repeat; bấm Học **không** activate ngay card vào **Box 1** — card chỉ vào Box 1 sau khi hoàn
  thành **đủ 5 mode**.
- Bấm **Lặp lại** khi `reviewDueCount > 0` → bắt đầu **SRS Repeat Flow** (card Box 1+ đến hạn, local-day).
- Bấm **Lặp lại** khi `reviewDueCount = 0` → **không** tạo **session rỗng**; hiển thị trạng thái **không
  có từ đến hạn** / thông báo phù hợp (có thể điều hướng tới review overview nếu docs cho phép).
- Khi `newCount = 0` **và** `reviewDueCount = 0` → **không** bắt đầu study session trực tiếp; chỉ cho
  **Xem lại các từ** nếu scope có card. **Không** tạo session rỗng.
- Bấm **Xem lại các từ** → mở **browse/xem lại** card trong scope (không bắt buộc tạo study session).
- Bấm **Một trò chơi** → **game mode** nếu được hỗ trợ (Future nếu chưa thuộc Phase 1).
- Bấm **Trình phát** → **player mode** nếu được hỗ trợ (Future nếu chưa thuộc Phase 1).
- **Mở menu không tự thay đổi dữ liệu học.** Chỉ khi người dùng **chọn một mode** thì flow tương ứng mới
  bắt đầu.
- Mode nào **chưa** thuộc Phase 1 thì **mark Future**, **không** implement trong docs này.

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

Các state liên quan **Sort Menu** (xem [Sort Menu](#sort-menu)):

| State | Ý nghĩa |
|-------|---------|
| `sort menu closed` | Sort Menu đang đóng (mặc định). |
| `sort menu open` | Sort Menu đang mở để chọn cách sắp xếp. |
| `selected sort option` | Một option sort đang được chọn/áp dụng cho list. |
| `search/filter active with sort` | Đang có search/filter, sort áp trên kết quả hiện tại. |
| `empty result after search/filter/sort` | Không có item nào khớp sau khi search/filter (sort không tạo/bớt item). |
| `unavailable sort field` | Trường sort chưa đủ dữ liệu (ví dụ chưa có last-studied date) — áp dụng rule "item chưa từng học". |

Các state liên quan **Play Menu** (xem [Play Menu](#play-menu)):

| State | Ý nghĩa |
|-------|---------|
| `play menu closed` | Play Menu đang đóng (mặc định). |
| `play menu open — variant A` | `progress = 0%` (chưa có card SRS-active): **không** có **Lặp lại**. |
| `play menu open — variant B` | `progress > 0%`: **có** **Lặp lại** (count = `reviewDueCount`, **có thể = 0**). |
| `repeat no-due` | Bấm **Lặp lại** khi `reviewDueCount = 0`: hiển thị no-due, **không** tạo session rỗng. |
| `no studyable content in scope` | `newCount = 0` và `reviewDueCount = 0` — không bắt đầu session; chỉ cho **Xem lại các từ** nếu scope có card. |
| `mode unavailable (future)` | Option map tới mode chưa thuộc Phase 1 (game/player) — hiển thị **Future** / không khả dụng. |

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
- **Persistence của lựa chọn Sort** (nhớ sort giữa các lần mở màn/phiên): **chưa chốt** trong task này
  (chỉ chốt nếu docs settings đã có rule). Xem [Sort Menu → Behavior](#sort-menu).
- **Dẫn xuất "lần học gần nhất" ở cấp deck/section** (deck không có last-studied trực tiếp; là aggregate
  từ nội dung bên trong): là việc của **read model** (`F1.DM.2`), **không** chốt schema/query ở spec này.
- **Schema dữ liệu chi tiết mới**: không chốt ở đây; đọc read model từ [05-data-model](../05-data-model.md).
- **Play Menu — "Một trò chơi" (game)**: loại game cụ thể và implementation **không** chốt; game =
  Match hiện thuộc [07-study-modes](../07-study-modes.md) Phase 3 → hiển thị **Future** so với Phase 1.
- **Play Menu — "Trình phát" (player/listening)**: audio/TTS/player **không** chốt; audio chưa nằm
  trong Phase 1 → **Future** (xem non-goal audio ở [product scope](../../product/memox-scope.md)).
- **Điều kiện "progress = 0%"** dùng cho Variant A: phụ thuộc **progress docs** (chưa có công thức);
  hiện suy từ `reviewCount = 0` / scope chưa từng học, **không** chốt công thức %.
- **Modal/animation & component UI của Play Menu**, và **query/schema** tính `newCount`/`reviewCount`:
  **không** chốt; workload là việc của read model (`F1.DM.PLAY.2`).

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

## Subdeck List variant

**Subdeck List không phải màn hình riêng — nó là một variant/state của Deck Management.**

### Tên variant

**Subdeck List** — danh sách section/subdeck con.

### Mục đích

Giúp người dùng **nhìn nhanh cấu trúc nội dung bên trong một deck cha**: xem các section/subdeck con
trực tiếp, quy mô từng section, tiến độ tổng quan, rồi **mở** một section hoặc **bắt đầu học** section
đó.

### Khi nào xuất hiện

Khi người dùng đang đứng trong **một deck/folder cha** và scope hiện tại **có các section/subdeck con
trực tiếp**. Đây là cùng một màn Deck Management, ở trạng thái đang liệt kê **deck/section con**.

### Người dùng dùng variant này để làm gì

- Xem các **section/subdeck con trực tiếp** của scope hiện tại.
- Với mỗi section/subdeck, nắm nhanh **tên**, **số lượng từ/card**, **tiến độ tổng quan** và **workload
  cần học/ôn** (nếu có).
- **Mở** một section để xem nội dung bên trong, hoặc **bắt đầu học** section đó.
- **Tạo section/subdeck con** hoặc **thêm card/từ mới** vào scope hiện tại.
- **Tìm kiếm / lọc / sắp xếp** danh sách; **thấy hướng học hiện tại** (ví dụ `KO → VI`).

### Thành phần nghiệp vụ chính

Giống các [thành phần nghiệp vụ](#các-thành-phần-nghiệp-vụ) của Deck Management, đọc theo lăng kính
"section/subdeck":

- **Header:** quay lại; **tên deck/folder hiện tại** (rút gọn nếu quá dài).
- **Control area:** search/filter input; **chỉ báo hướng học** (ví dụ `KO → VI`); sort/filter menu.
- **Subdeck row:** tên section/subdeck; số lượng từ/card; **chỉ báo tiến độ học tổng quan** (nếu có);
  **chỉ báo workload/cần học/ôn** (nếu có); **action bắt đầu học** section/subdeck.
- **Bottom actions:** tạo **section/subdeck con**; **thêm card/từ mới** vào scope hiện tại.

### Action chính

| Action | Hành vi nghiệp vụ |
|--------|-------------------|
| Mở subdeck row | Mở section/subdeck đó để xem nội dung bên trong (đi sâu xuống). |
| Bắt đầu học (start/play) | Bắt đầu học section/subdeck theo **rule study hiện có** ([07-study-modes](../07-study-modes.md)) — **nếu** study docs cho phép học theo deck/section. Nếu **không có nội dung học phù hợp**, action **không khả dụng** / thông báo phù hợp. |
| Tạo section/subdeck con | Tạo nhóm nội dung con **trong scope hiện tại**. |
| Thêm card/từ | Tạo nội dung học mới **trong scope hiện tại**. |
| Tìm kiếm / lọc / sắp xếp | **Chỉ thay đổi cách hiển thị**; **không** đổi dữ liệu học hay trạng thái SRS. |
| Xem hướng học | Hiển thị hướng hỏi → trả lời hiện tại (ví dụ `KO → VI`); việc **chọn/đổi** hướng — xem [Open questions](#open-questions--cố-ý-không-chốt) và [Drift note](#drift-note). |

Ghi chú: deck có **cấu trúc phân cấp**; mỗi section/subdeck có thể là một **study scope** nếu study docs
cho phép học theo deck/section. Variant này **không** định nghĩa lại study rule hay SRS.

### State chính

| State | Ý nghĩa |
|-------|---------|
| `loading` | Đang tải danh sách section/subdeck. |
| `loaded` | Có subdeck rows để hiển thị. |
| `empty` | Scope hiện tại **chưa có** section/subdeck con — hiển thị hướng dẫn tạo mới. |
| `search/filter empty` | Có dữ liệu nhưng **không khớp** bộ lọc/tìm kiếm. |
| `error` | Lỗi khi tải danh sách. |
| `no studyable content` | Không có nội dung học phù hợp — action học **không khả dụng** / thông báo. |
| `creating new section/subdeck entry point` | Đang bắt đầu tạo section/subdeck con. |
| `creating new card entry point` | Đang bắt đầu tạo card mới. |

### Những điểm cố ý không chốt (variant)

Áp dụng đúng [Open questions](#open-questions--cố-ý-không-chốt) chung của Deck Management, gồm: speaker
icon, edit icon, eye-slash/count indicator (chưa có nghiệp vụ hidden/suspended), công thức
progress/mastery, semantics badge workload/due, audio/TTS, persistence/session — **không** chốt ở
variant này.

## Liên kết WBS

- Docs spec: `F1.DM.1` — Deck Management and Subdeck List concept spec.
- Read model: `F1.DM.2` (BE, Not started).
- UI skeleton: `F1.DM.3` (FE, Not started).
- States: `F1.DM.4` (FE, Not started).
- Add deck/card entry actions: `F1.DM.5` (FE/BE, Not started).
- Start study from deck row: `F1.DM.6` (FE/BE, Not started).

Xem [WBS](../../project-management/wbs.md#deck-management-f1dm).
