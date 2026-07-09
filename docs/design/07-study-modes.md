# 07 — Study Modes and Learning Flows

## Purpose

Định nghĩa **các mode học** và **hai luồng học** của MemoX, đồng nhất với mô hình
**Box 0 / pre-SRS → Box 1..8 / SRS-active** ở [06-srs-8box](06-srs-8box.md).

## Flow overview

Cùng bộ mode-mechanic (**review, match, guess, recall, fill**) xuất hiện trong **hai luồng khác nhau về
lifecycle và card eligibility** — **không được nhầm lẫn**:

- **[New Learning Flow](#new-learning-flow)** — cho **card mới / Box 0 / not activated (pre-SRS)**. Thứ
  tự **bắt buộc** `review → match → guess → recall → fill`. Hoàn thành `fill` (khi 4 mode trước xong)
  **activate** card vào **Box 1**. **Không** có SRS scheduling trước khi activate; feedback đúng/sai ở
  đây là **pre-SRS learning**, **không** phải SRS grading.
- **[SRS Repeat Flow](#srs-repeat-flow)** — **chỉ** cho card **Box 1+ đã due**. Bắt đầu từ
  [Repeat Mode Menu](#repeat-mode-menu); user chọn **match / guess / recall / fill**. **SRS grading và
  cập nhật box/due chỉ xảy ra ở luồng này** theo [06-srs-8box](06-srs-8box.md). **`reviewMode` KHÔNG**
  phải repeat mode.

> **Typing = fillMode (implementation-style).** Trong New Learning, `fillMode` là **cổng activate**
> (pre-SRS). Trong SRS Repeat, fill/typing có thể **grade** card **Box 1+ đã due**. Không có "Typing
> Phase 1" tách biệt — nó là hình thức nhập liệu của `fill`.

## Luồng chung một phiên học

```
Chọn deck → chọn phạm vi (công tắc "gồm deck con") → chọn flow/mode
      → study-session dựng danh sách thẻ
      → lặp qua thẻ theo mode → ghi nhận kết quả từng item → lưu → tóm tắt cuối phiên
```

- **Dựng danh sách thẻ**:
  - **New Learning Flow**: thẻ **mới (Box 0)** trong hạn mức thẻ mới/ngày.
  - **SRS Repeat Flow**: thẻ **Box 1+ đã due** (điều kiện due theo **local-day** —
    [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day)).
- **SRS grading chỉ ở SRS Repeat Flow**: chỉ trong Repeat, mỗi attempt mới `engine.schedule()` để cập
  nhật `cards.box/due_at/last_reviewed_at`. **New Learning Flow KHÔNG** đổi box/due cho tới khi `fill`
  activate card lên **Box 1** (một lần, không phải mỗi mode).
- **Lưu sau mỗi lần chấm** (trong **một** transaction): chèn `card_reviews` + cập nhật
  `study_session_items`; **SRS Repeat** thêm cập nhật `cards` (box/due). Thẻ mới lần đầu: đặt
  `new_seen_on = hôm nay`.
- **Tóm tắt cuối phiên** (FR-M8): số đúng/sai, số thẻ lên/xuống box (Repeat), thời lượng.

## Persist phiên học — persisted (DT-2)

> **Quyết định (DT-2):** phiên học **phải được persist**. Phase 1 storage contract có
> **`study_sessions`** và **`study_session_items`**. Tiến độ **học** bền vững qua `cards`/`card_reviews`;
> tiến độ **phiên** bền vững qua `study_sessions`/`study_session_items`. Xem
> [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted) và
> [05-data-model](05-data-model.md#study_sessions--study_session_items-persisted-session).

Hợp đồng hành vi (bắt buộc):

| Sự kiện | Hành vi |
|---------|---------|
| Start session | Tạo `study_sessions` + các `study_session_items` trong **một** transaction. Fail → **không** để lại session/items nửa vời. |
| Items | `study_session_items` lưu danh sách thẻ, **thứ tự học ổn định**, và trạng thái item đủ để **resume đúng vị trí**. |
| Chấm một thẻ | Persist bền vững **trong một transaction**: `card_reviews` (+ SRS trên `cards`) **và** cập nhật item tương ứng. |
| Không tạo trùng | Nếu đã có session `active` cùng **scope**, **không** âm thầm tạo session active thứ hai cùng scope. |
| Resume | Sau khi đóng app/crash, **session active gần nhất** (chưa expired/cancelled/completed) có thể resume đúng vị trí. |
| Read-only | Dashboard / màn hình resume-summary **không** được mutate session. |
| Finish | Chuyển session sang `completed`/finalized theo lifecycle. Finalize fail → **không** đánh dấu `completed` sai. |
| Dữ liệu durable | Học: `cards` + `card_reviews`. Phiên: `study_sessions` + `study_session_items`. |

Lifecycle status tối thiểu: `active`, `completed`, `cancelled`, `expired` (thêm `failed_to_finalize`
nếu cần). Bảng chi tiết: [05-data-model](05-data-model.md#study_sessions--study_session_items-persisted-session).

> **Foundation trước UI:** vì cần schema mới, phần **persistence phiên** là một task BE/migration
> riêng (`P1-BE-05`) **phải xong trước** khi làm Study UI (`P1-FE-03`). Xem
> [WBS](../project-management/wbs.md).

## Cơ chế 5 mode (dùng chung cho 2 flow)

Năm mode có **cùng cơ chế tương tác** dù ở New Learning hay SRS Repeat; **khác nhau ở lifecycle**
(pre-SRS activation vs. SRS grading). Chi tiết đầy đủ ở phần
[New Learning modes](#new-learning-flow) và [SRS Repeat modes](#srs-repeat-flow).

- **review** — làm quen thẻ (xem prompt + answer). **Chỉ** ở New Learning Flow (mode đầu).
- **match** — ghép prompt/front ↔ answer/meaning; đúng = xanh, sai = đỏ + retry.
- **guess** — chọn 1 answer/meaning đúng trong nhiều lựa chọn; đúng = xanh, sai = đỏ.
- **recall** — hiện prompt, ẩn answer; nút **Hiển thị** có timer 20s; sau reveal tự chấm Đã quên/Nhớ được.
- **fill** — hiện meaning/answer, gõ lại prompt/front (**Trợ giúp** + **Kiểm tra**). Tương đương
  **Typing** về nhập liệu.

## Bảng đối chiếu mode

Cùng một mode-mechanic, khác vai trò theo flow:

| Mode | Cơ chế tương tác | New Learning Flow (pre-SRS) | SRS Repeat Flow (Box 1+ due) |
|------|------------------|-----------------------------|------------------------------|
| review | làm quen (prompt + answer) | mode **1/5** (bắt buộc) | **không** dùng |
| match | ghép cặp | mode **2/5**, feedback = **learning** | có thể chọn; feedback = **SRS grading** |
| guess | trắc nghiệm | mode **3/5**, feedback = **learning** | có thể chọn; feedback = **SRS grading** |
| recall | Hiển thị + 20s | mode **4/5**, self-grade = **learning** | có thể chọn; self-grade = **SRS grading** |
| fill (Typing) | gõ đáp án | mode **5/5** = **cổng activate Box 1** | có thể chọn; grade = **SRS grading** |

- **SRS grading (đổi box/due) CHỈ ở SRS Repeat Flow** cho card **Box 1+ đã due**.
- **New Learning Flow là pre-SRS**: đúng/sai chỉ để hoàn thành mode; **không** đổi box/due; chỉ `fill`
  hoàn tất mới **activate** Box 0 → Box 1.

## Hướng (direction) hiện & hỏi

- Mặc định **term → (hỏi) meaning** cho tất cả mode (theo quyết định thiết kế).
- Đổi chiều (meaning → term) là **hướng mở rộng**, gắn với "ôn hai chiều" trong
  [06-srs-8box](06-srs-8box.md#hướng-mở-rộng-ngoài-phạm-vi-hiện-tại). Không thuộc phạm vi hiện tại.

## Giao diện dùng chung giữa các mode

Để tránh trùng lặp và giữ ranh giới sạch:

- **Khung phiên** (`SessionShell`): thanh tiến độ, đếm còn lại, nút thoát, xử lý tóm tắt cuối phiên —
  đặt ở `study-session`, dùng chung cho mọi mode.
- **`onResult(cardId, result)`**: giao diện chung nối mode → `study-session`. **SRS engine chỉ được gọi
  ở SRS Repeat Flow** (card Box 1+); ở New Learning Flow, kết quả mode chỉ đánh dấu tiến độ mode và (ở
  `fill`) kích hoạt Box 0 → Box 1 **một lần**.
- Mode **không** tự truy vấn DB; nhận thẻ và trả kết quả. `study-session` lo I/O + engine (khi Repeat).

## New Learning Flow

**Học** (từ [Play Menu](screens/deck-management.md#play-menu)) là **New Learning Flow** — luồng học
**thẻ/từ mới**, **không** phải SRS review.

- Học **bắt đầu bằng `reviewMode`**.
- Một thẻ mới phải đi qua đủ **5 mode** theo thứ tự mặc định:

  **1. review → 2. match → 3. guess → 4. recall → 5. fill**

  (`fill` = gõ đáp án, tương ứng mode **Typing** trong [Bảng đối chiếu mode](#bảng-đối-chiếu-mode).)
- **Chuyển tiếp giữa các mode:** hoàn thành **`reviewMode`** → tự chuyển sang **`matchMode`**; hoàn
  thành **`matchMode`** → sang **`guessMode`**; rồi **`recallMode`**; cuối cùng **`fillMode`**. **Không**
  quay lại Play Menu, **không** vào SRS Repeat giữa chừng.
- **Không mode nào trước `fill` được tự activate card vào SRS.** Hoàn thành review, hoặc review+match,
  … đều **chưa** đủ.
- **Chỉ khi hoàn thành đủ 5 mode**, card mới được đưa từ **Box 0 / not-activated** lên **Box 1** và
  **SRS được enable** cho card đó (xem [06-srs-8box → Kích hoạt SRS](06-srs-8box.md#kích-hoạt-srs-box-0--box-1)).
- **SRS chỉ enable từ Box 1 trở đi.** Card **chưa** vào Box 1 **không** được tính vào **Lặp lại** (SRS
  Repeat), **không** có `due`.
- Card chưa hoàn thành đủ 5 mode → vẫn Box 0 / not SRS-active (tiến độ có thể phản ánh partial learning
  nếu docs progress cho phép; **không** phải SRS review).

> **DRIFT DETECTED — vai trò mode & phasing**
> ```
> File code: (none — chưa có code)
> File doc:  docs/design/07-study-modes.md (bảng phase: Typing=P1; Review/Recall/Guess=P2; Match=P3 &
>            "Match KHÔNG cập nhật SRS"), FR-M* trong docs/product/02-requirements.md
> Mismatch:  Nghiệp vụ mới yêu cầu MỌI thẻ mới đi qua review+match+guess+recall+fill để activate SRS,
>            tức 5 mode cùng thuộc New Learning Flow (Phase 1). Docs cũ phân các mode vào Phase 1/2/3 và
>            coi Match là game không đụng SRS. => vai trò/giai đoạn của mode và ý nghĩa "cập nhật SRS"
>            cần được diễn giải lại cho pha học-mới (pre-SRS).
> Suggested fix: Trong New Learning Flow (pre-SRS), 5 mode là các BƯỚC HỌC để activate card (không có
>            SRS update vì SRS chưa bật). Việc "cập nhật SRS" (bảng đối chiếu mode) chỉ áp dụng cho card
>            đã activate ở luồng Lặp lại. Cần một task riêng cập nhật bảng phase/roles cho khớp; task
>            docs này ghi nhận drift, không tự chốt lại toàn bộ phasing.
> ```

### reviewMode (mode đầu tiên)

**Purpose.** `reviewMode` là **guided review mode** cho **thẻ mới**: bước **làm quen** nội dung card,
**không** phải bài kiểm tra trí nhớ, **không** phải SRS Repeat.

**When it appears.** Ngay khi người dùng bấm **Học** trong [Play Menu](screens/deck-management.md#play-menu)
→ New Learning Flow mở, **mode đầu tiên luôn là `reviewMode`**. Không nhảy thẳng vào match/guess/recall/
fill, không nhảy vào SRS Repeat.

**What user sees.** Người học nhìn thấy **cả prompt (front/term) và answer (back/meaning/definition)**
cùng lúc để làm quen. Ví dụ theo hướng `KO → VI`:

- front/prompt: `기자`
- back/meaning: `Reporter / Nhà báo …`

**Actions (concept-level, optional / product-dependent).** Chỉ ghi ở mức concept, **không** chốt
implementation:

- Nghe **phát âm** (audio) — **nếu** product scope hỗ trợ audio (chưa chốt TTS/audio).
- **Edit card** — **nếu** edit flow được docs khác hỗ trợ.
- Điều khiển **hiển thị/text** và **more menu** — nếu product scope cho phép.
- (Layout: Header có Back + title "Xem lại"/label tương ứng; Progress area có progress bar/% — có thể
  bắt đầu 0%; Card review area hiển thị answer + prompt.)

**Completion rule.** Người học **chưa cần** nhập đáp án hay chấm đúng/sai ở `reviewMode` (nếu docs study
mode chưa quy định scoring). Hoàn thành `reviewMode` **chỉ** đánh dấu card đã **qua bước review** trong
New Learning Flow, rồi flow tiếp tục sang **match → guess → recall → fill**.

**What it must NOT do.**

- **Không** đưa card vào **Box 1** chỉ vì đã mở/hoàn thành `reviewMode`.
- **Không** làm card thành **SRS-active**; card vẫn ở **Box 0 / not-activated**.
- **Không** áp **SRS due scheduling** cho card chưa vào Box 1.
- **Không** ảnh hưởng **Repeat count** (mở reviewMode không đổi số card due của Lặp lại).

### reviewMode vs. "Xem lại các từ" (browse)

Hai khái niệm **khác nghiệp vụ**, dù label tiếng Việt gần giống nhau:

| | reviewMode | Xem lại các từ (Play Menu) |
|--|-----------|----------------------------|
| Thuộc | **New Learning Flow** (bước 1/5) | **Browse/review content mode** |
| Mục đích | Làm quen thẻ **mới** để tiến tới activate | Duyệt/xem lại nội dung ([Flashcard List](screens/flashcard-list.md)) |
| Tạo flow học | Có (mở chuỗi review→match→guess→recall→fill) | **Không** bắt buộc study session |
| Activate SRS | Chỉ khi hoàn thành **đủ 5 mode** | **Không bao giờ** tự activate card vào SRS |

> **Browse mode không được tự động activate card vào SRS.** Chỉ New Learning Flow hoàn thành đủ 5 mode
> mới đưa card lên Box 1.

### matchMode (mode thứ 2)

**Purpose.** `matchMode` là **mode ghép đôi** trong New Learning Flow — bước củng cố thẻ **mới** bằng
cách nhận diện đúng cặp prompt ↔ meaning. Vẫn là **pha trước SRS**.

**When it appears.** Ngay **sau khi `reviewMode` hoàn thành**, flow **tự chuyển** sang `matchMode` (mode
thứ 2/5). Không quay lại Play Menu, không vào SRS Repeat.

**What user sees.** Hai bên/cột: một bên hiển thị **prompt** (ví dụ tiếng Hàn), bên kia hiển thị
**meaning/answer/giải thích**. Ví dụ hướng `KO → VI`: một bên `기자`, bên kia `Nhà báo / Reporter`. Thứ
tự item **có thể được xáo trộn** để người dùng phải nhận diện cặp đúng. `matchMode` dùng **cùng learning
batch** với `reviewMode` (trừ khi docs quy định khác).

**Selection behavior (concept).**

- Người dùng chọn **1 item ở mỗi phía** (một prompt/front và một answer/meaning).
- Hệ thống **chỉ đánh giá cặp khi đủ 2 item** được chọn; **không** đánh giá khi mới chọn **một** item.
- Sau khi feedback được xử lý: **cặp đúng** được đánh dấu hoàn thành, hoặc **selection được reset** để
  chọn lại.
- **Không** chốt: chọn bên trái hay bên phải trước, animation chọn card, exact layout (2 cột / grid),
  color token, thời gian hiển thị xanh/đỏ.

**Correct match (ghép đúng).** Nếu hai item thuộc **cùng một card** → **match đúng**:

- **Cả hai** card được chọn hiển thị trạng thái **correct**; UI **nên** dùng **màu xanh** (hoặc style
  correct tương đương).
- Cặp đó được tính **hoàn thành** trong `matchMode`; có thể **biến mất / bị khóa / đánh dấu đã hoàn
  thành** tùy UI implementation.
- Ghép đúng **chưa** đưa card vào **Box 1**, **chưa** tạo SRS due schedule, **chưa** làm card xuất hiện
  trong **Lặp lại**.

**Wrong match (ghép sai).** Nếu hai item **không** thuộc cùng một card → **match sai**:

- **Cả hai** card được chọn hiển thị trạng thái **incorrect**; UI **nên** dùng **màu đỏ** (hoặc style
  incorrect tương đương). Hệ thống **phải** cho user biết lựa chọn đó sai.
- Cặp đó **chưa** hoàn thành; sau feedback sai, người dùng **phải có cơ hội thử lại**.
- Ghép sai **không** activate SRS, **không** đưa card vào Box 1, và **không** được làm **mất** item khỏi
  learning flow khi item chưa hoàn thành.

**Retry (future / implementation detail — không chốt timing).** Ví dụ: retry ngay; reset selection sau
một khoảng ngắn; cho chọn lại ngay; đưa item về trạng thái chưa chọn. **Rule bắt buộc:** cặp sai **chưa
hoàn thành**, **không** SRS-active, **không** Box 1.

**Completion rule.** `matchMode` kết thúc khi **mọi cặp trong batch** được ghép đúng; khi đó flow **tự
chuyển** sang `guessMode` (mode thứ 3).

**What it must NOT do.**

- Match **sai** **không** activate card vào SRS.
- Match **đúng riêng lẻ** (một cặp) cũng **chưa** đủ để card vào **Box 1**.
- Hoàn thành **cả** `matchMode` **vẫn chưa** đủ — card **chỉ** SRS-active sau khi hoàn thành **đủ 5
  mode** (review → match → guess → recall → fill).
- **Không** áp SRS due scheduling cho card chưa vào Box 1.

**Progress (concept).** Progress bar trong `matchMode` thể hiện tiến độ trong **New Learning Flow** (hoặc
trong mode hiện tại) theo rule UI docs; progress **có thể tăng** khi chuyển từ review sang match. Progress
này **không** phải **SRS box progress**, và **không** có nghĩa card đã vào SRS — SRS activation **chỉ**
xảy ra sau khi `fillMode` hoàn thành.

**Thoát giữa chừng (concept).** Nếu người dùng thoát giữa `matchMode` mà card **chưa** hoàn thành đủ 5
mode → card **vẫn** not SRS-active, **không** tự vào Box 1, **không** tạo SRS due schedule. Chi tiết
resume do docs session/flow-state quyết định (ngoài phạm vi task này; xem
[DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted)).

> `matchMode` (bước học, pre-SRS) dùng cùng cơ chế ghép đôi như mode **Match** trong
> [Bảng đối chiếu mode](#bảng-đối-chiếu-mode); vai trò/giai đoạn của các mode đang được ghi nhận drift ở
> [New Learning Flow](#new-learning-flow) (Match từng được xếp Phase 3 / practice-only).

### guessMode (mode thứ 3)

**Purpose.** `guessMode` là **mode chọn đáp án** (multiple-choice) trong New Learning Flow — nhận diện
answer/meaning đúng cho một prompt. Vẫn là **pha trước SRS**.

**When it appears.** Ngay **sau khi `matchMode` hoàn thành**, flow **tự chuyển** sang `guessMode` (mode
thứ 3/5). Hoàn thành `guessMode` → chuyển sang `recallMode`.

**What user sees.** Một **prompt/front** chính + **nhiều option** answer/meaning. **Chỉ một** option
đúng cho prompt hiện tại; các option sai là **distractor** từ card khác / pool phù hợp (thuật toán chọn
distractor **không** chốt ở đây). Ví dụ hướng `KO → VI`:

- prompt/front: `결제하다`
- option đúng: `To pay / Thanh toán`
- option sai (distractor): `Reporter / Nhà báo`, `Busy life / Cuộc sống bận rộn`, …

**Expected user action.** Người dùng **chọn một option** để trả lời.

**Correct feedback (chọn đúng).**

- Option đúng hiển thị trạng thái **correct** (UI có thể dùng màu xanh / style correct tương đương).
- Item được tính **hoàn thành** trong `guessMode`; có thể chuyển sang **item tiếp theo** (hoặc kết thúc
  mode nếu batch đã xong).
- Chọn đúng **không** đưa card vào **Box 1**, **không** tạo SRS due schedule.

**Incorrect feedback (chọn sai).**

- Option sai hiển thị trạng thái **incorrect** (UI có thể dùng màu đỏ / style incorrect tương đương);
  hệ thống **phải** cho user biết lựa chọn đó sai.
- Item **chưa** được tính hoàn thành; item được **xử lý để người dùng còn cơ hội học/trả lời lại** theo
  rule của docs (timing retry **không** chốt ở đây — xem dưới).
- Chọn sai **không** activate SRS, **không** đưa card vào **Box 1**, và **không** được làm **mất** item
  khỏi learning flow khi item chưa hoàn thành.

**Retry (future / implementation detail — không chốt timing).** Ví dụ cách retry có thể là: retry ngay
trên cùng prompt; retry sau vài item; hoặc đưa item về cuối batch. **Rule bắt buộc:** item sai **chưa
hoàn thành**, **không** SRS-active, **không** Box 1.

**Completion rule.** `guessMode` kết thúc khi **mọi item trong batch** đã đúng/hoàn thành; khi đó flow
**tự chuyển** sang **`recallMode`** (mode thứ 4).

**What it must NOT do.**

- Chọn đúng **một** item **không** đủ để card vào Box 1.
- Hoàn thành **cả** `guessMode` **vẫn chưa** đủ — card **chỉ** SRS-active sau khi hoàn thành **đủ 5
  mode** (review → match → guess → recall → fill).
- **Không** coi feedback đúng/sai ở `guessMode` là **SRS review grading**.

**Progress (concept).** Progress trong `guessMode` phản ánh tiến độ **New Learning Flow** (hoặc mode
hiện tại) theo rule UI docs; **có thể tăng** khi một item đúng hoàn thành. Progress này **không** phải
SRS box progress và **không** phải bằng chứng card đã SRS-active. **Không** chốt % cụ thể (ví dụ 40%/44%).

**Thoát giữa chừng (concept).** Nếu thoát khi đang ở `guessMode`, các item **chưa** hoàn thành đủ 5 mode
**vẫn** not SRS-active; **không** tự vào Box 1; **không** tạo SRS due schedule.

> `guessMode` (bước học, pre-SRS) dùng cùng cơ chế trắc nghiệm như mode **Guess** trong
> [Bảng đối chiếu mode](#bảng-đối-chiếu-mode); vai trò/giai đoạn đang được ghi nhận drift ở
> [New Learning Flow](#new-learning-flow).

### recallMode (mode thứ 4)

**Purpose.** `recallMode` là **bước nhớ lại chủ động** (active recall) trong New Learning Flow: người
học phải **tự nhớ** answer/meaning từ prompt/front **trước khi** xem đáp án, và chủ động **bấm Hiển
thị** trong thời gian cho phép để chứng minh đã nhớ ra. Vẫn là **pha trước SRS**.

**When it appears.** Ngay **sau khi `guessMode` hoàn thành**, flow **tự chuyển** sang `recallMode` (mode
thứ 4/5). Hoàn thành `recallMode` → chuyển sang `fillMode`.

`recallMode` **không** phải multiple-choice, **không** phải match, **không** phải SRS Repeat.

**What user sees before reveal.** Chỉ **prompt/front** của card; **answer/meaning bị ẩn**. Người dùng
**tự nhớ** answer/meaning trong đầu. Ví dụ hướng `KO → VI`:

- prompt/front: `바쁜 생활`
- answer/meaning **bị ẩn** lúc đầu (nghĩa đúng: `Busy life / Cuộc sống bận rộn`)

**Nút Hiển thị + bộ đếm 20 giây.**

- Mỗi recall item có **giới hạn 20 giây** (default). Timer **bắt đầu** khi item được hiển thị.
- Nút **Hiển thị** thể hiện **countdown 20 giây** (hoặc trạng thái countdown tương đương).
- Nếu đã nhớ ra, người dùng **phải bấm Hiển thị trước khi hết giờ**.

**Timeout behavior (hết 20 giây).**

- Nếu **không** bấm Hiển thị trong 20 giây → item tính là **Đã quên** (recall **failure**).
- Nếu người dùng **nhớ ra trong đầu nhưng không bấm Hiển thị** trước timeout → **vẫn** tính **Đã quên**.
- Timeout **tự** chuyển sang màn/ item tiếp theo theo flow (không chốt animation/transition).
- Timeout **không** tính là **Nhớ được**, **không** activate SRS, **không** đưa card vào Box 1.

**What user sees after reveal (bấm Hiển thị trước timeout).**

- Timer **dừng lại**; **answer/meaning được hiện ra**.
- UI hiển thị lựa chọn **tự đánh giá**: **Đã quên** / **Nhớ được**.

**Đã quên / Nhớ được.**

- Bấm **Nhớ được** → item = **recall success**.
- Bấm **Đã quên** → item = **recall failure**.
- **Nhớ được chỉ hợp lệ** khi user **đã bấm Hiển thị trước timeout**; nếu chưa bấm Hiển thị thì **không**
  được chọn Nhớ được.

**Recall success / failure.**

- **Success** = bấm Hiển thị trước timeout **và** chọn Nhớ được → item hoàn thành thành công ở `recallMode`.
- **Failure** = hết 20 giây chưa bấm Hiển thị, **hoặc** bấm Hiển thị rồi chọn Đã quên. Failure **không**
  tính là success, **không** Box 1, **không** SRS-active. (Retry: **chưa chốt** — có thể là implementation
  detail / future rule; **không** tự bịa. Rule bắt buộc: failure ≠ success, không Box 1, không SRS-active.)

**Completion rule.** `recallMode` kết thúc khi **các recall item** được xử lý theo rule trên; khi đó
flow **tự chuyển** sang **`fillMode`** (mode thứ 5).

**What it must NOT do.**

- **Recall success chưa** đủ để bật SRS; card **chỉ** vào Box 1 sau khi hoàn thành tiếp **`fillMode`**
  (đủ 5 mode).
- **Không** coi recall success/failure là **SRS review grading**.
- **Không** áp SRS due scheduling cho card chưa vào Box 1.

**Progress (concept).** Progress trong `recallMode` phản ánh tiến độ **New Learning Flow** (hoặc mode
hiện tại); **có thể tăng** khi một recall item được xử lý. **Không** phải SRS box progress, **không**
phải bằng chứng card đã SRS-active. **Không** chốt % cụ thể (ví dụ 60%/64%).

**Thoát giữa chừng (concept).** Nếu thoát khi đang ở `recallMode`, các item **chưa** hoàn thành đủ 5
mode **vẫn** not SRS-active; **không** tự vào Box 1; **không** tạo SRS due schedule. Chi tiết resume do
docs session/flow-state quyết định (ngoài phạm vi task này).

> `recallMode` (bước học, pre-SRS) tương ứng cơ chế tự-đánh-giá của mode **Recall** trong
> [Bảng đối chiếu mode](#bảng-đối-chiếu-mode), **thêm** ràng buộc **Hiển thị + 20s timer**; vai
> trò/giai đoạn đang được ghi nhận drift ở [New Learning Flow](#new-learning-flow).

### fillMode (mode thứ 5 — cổng activate SRS)

**Purpose.** `fillMode` là **bước điền đáp án chủ động** — bước **kiểm tra mạnh nhất** trong New Learning
Flow: người học phải **tự tạo lại** đáp án (nhập/điền) thay vì chỉ nhận diện / ghép đôi / đoán / tự đánh
giá nhớ. Đây là **mode cuối** trước khi card được activate vào SRS. Vẫn là **pha trước SRS** cho tới khi
hoàn thành.

**When it appears.** Ngay **sau khi `recallMode` hoàn thành**, flow **tự chuyển** sang `fillMode` (mode
thứ 5/5).

`fillMode` **không** phải multiple-choice, **không** phải match, **không** phải recall self-grade,
**không** phải SRS Repeat. (Về cơ chế nhập liệu, `fillMode` tương ứng mode **Typing** — `fill` = gõ đáp
án — trong [Bảng đối chiếu mode](#bảng-đối-chiếu-mode).)

**What user sees / must input.** Hiển thị **meaning/answer side** của card; người dùng **tự nhập/điền lại
prompt/front** tương ứng. Ví dụ hướng `KO → VI`:

- meaning/answer shown: `To pay / Thanh toán`
- expected prompt/front: `결제하다` → user phải nhập đúng `결제하다`

**UI concept (không chốt pixel/implementation).**

- **Header:** Back; title "Điền"/label tương ứng; text/display control và speaker/audio (nếu product
  scope cho phép); More menu.
- **Progress area:** progress bar (khoảng cuối flow — mock có thể ~80%; **không** chốt công thức %).
- **Prompt area:** hiển thị meaning/answer để user dựa vào đó điền prompt/front.
- **Fill/input area:** vùng nhập prompt/front (có thể hỗ trợ audio nếu product scope cho phép).
- **Actions:** **Trợ giúp**, **Kiểm tra**, **Thử lại** (sau khi sai / cần nhập lại). **Không** chốt
  layout, keyboard, input component, animation.

**Trợ giúp.**

- Là action **hỗ trợ**: có thể gợi ý một phần đáp án (ký tự đầu, số ký tự, hint tương đương).
- **Không** tự hoàn thành item, **không** tự đưa card vào Box 1, **không** tự bật SRS.
- Dùng Trợ giúp **vẫn phải** qua **Kiểm tra** / completion rule rõ ràng — **không** coi là fill success
  chỉ vì đã bấm Trợ giúp.
- Penalty của việc dùng Trợ giúp: **chưa chốt** (docs chưa có scoring/penalty).

**Kiểm tra.** Khi user bấm **Kiểm tra**, hệ thống so sánh input với **expected prompt/front**:

- input **đúng** → **correct feedback**.
- input **sai** → **incorrect feedback**.
- input **trống** → validation/incorrect state hoặc yêu cầu nhập; **không** được tính là đúng.

> **Cần rule normalize (chưa chốt, để task sau).** So khớp input cần một quy tắc chuẩn hóa cho:
> khoảng trắng; hoa/thường (nếu ngôn ngữ áp dụng); dấu câu; các **variant đáp án hợp lệ**; spacing tiếng
> Hàn nếu cần. Task này **không** tự bịa normalization chi tiết.

**Correct feedback (Kiểm tra đúng).**

- Item hiển thị trạng thái **correct** (UI có thể dùng **màu xanh** / style correct tương đương).
- Item được tính **hoàn thành `fillMode`**.
- Nếu đây là item cuối cần học và card đã hoàn thành 4 mode trước → card **đủ điều kiện hoàn thành New
  Learning Flow** → card được đưa vào **Box 1** và **SRS được enable** từ Box 1 trở đi.

**Incorrect feedback (Kiểm tra sai).**

- Item hiển thị trạng thái **incorrect** (UI có thể dùng **màu đỏ** / style incorrect tương đương); có
  thể hiện input sai + expected answer để user thấy khác biệt.
- Item **chưa** hoàn thành; user **phải** có cơ hội **Thử lại**.
- Fill sai **không** đưa card vào Box 1, **không** bật SRS, **không** tạo SRS due schedule.

**Retry (future / implementation detail — không chốt timing).** Ví dụ: retry ngay trên cùng item; retry
sau khi xem đáp án; đưa item về cuối batch; yêu cầu nhập lại. **Rule bắt buộc:** fill sai **chưa hoàn
thành** item, **không** SRS-active, **không** Box 1.

**Manual accept / nút "Đúng" (open question).** Nếu UI có nút "Đúng" sau khi Kiểm tra sai/gần đúng:
manual accept **chưa** được chốt là requirement (docs chưa có nghiệp vụ này) → là **open question /
implementation detail**. Nếu sau này cho phép, **phải** có rule riêng để tránh user tự cho qua mọi lỗi;
**không** ngầm hiểu nút "Đúng" luôn hợp lệ khi chưa có docs chính thức.

**Completion rule & SRS activation.**

- Card **chỉ** được activate vào SRS sau khi hoàn thành **đủ 5 mode**: review, match, guess, recall,
  fill. `fillMode` là bước cuối.
- Hoàn thành `fillMode` khi card đã hoàn thành 4 mode trước → card chuyển vào **Box 1** (điểm bắt đầu
  SRS; xem [06-srs-8box → Kích hoạt SRS](06-srs-8box.md#kích-hoạt-srs-box-0--box-1)).
- Card **chưa** hoàn thành `fillMode` → **vẫn pre-SRS**, **không** xuất hiện trong **Lặp lại**.

**What it must NOT do.**

- **Không** coi feedback đúng/sai ở `fillMode` là **SRS review grading**.
- **Không** đưa card vào Box 1 khi chưa Kiểm tra đúng (kể cả khi đã dùng Trợ giúp).
- **Không** áp SRS due scheduling cho card chưa vào Box 1.

**Progress (concept).** Progress trong `fillMode` phản ánh **đoạn cuối** New Learning Flow; mock có thể
hiển thị ~80% nhưng **không** chốt % (chưa có progress formula). Progress **không** phải SRS box progress;
**chỉ Box 1** là mốc SRS activation.

**Thoát giữa chừng (concept).** Nếu thoát khi đang ở `fillMode`, card **chưa** hoàn thành đủ 5 mode
**vẫn** not SRS-active; **không** tự vào Box 1; **không** tạo SRS due schedule. Chi tiết resume do docs
session/flow-state quyết định (ngoài phạm vi task này).

## SRS Repeat Flow

**Lặp lại** (từ Play Menu) là **review SRS**.

- Chỉ lấy card **SRS-active** (Box 1+) và **đến hạn** (`due`) tại **thời điểm hiện tại** (quy tắc
  **local-day**, [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day) —
  **không** thay đổi trong task này).
- Deck/subdeck có **progress > 0%** thì **có** Repeat mode.
- **Repeat count có thể bằng 0** nếu chưa có card nào đến hạn — progress > 0% **không** đồng nghĩa mọi
  learned card đều cần lặp lại ngay.
- Repeat count là **số due SRS cards tại thời điểm mở menu**, **không** phải tổng card đã học, **không**
  phải progress %, **không** phải tổng card trong deck.
- Nếu Repeat count = 0: **không** tạo review session **rỗng**; hiển thị trạng thái **không có từ đến
  hạn** / thông báo phù hợp (có thể điều hướng tới review overview nếu docs cho phép).

### Repeat Mode Menu

Bấm **Lặp lại** (từ [Play Menu](screens/deck-management.md#play-menu)) **không** vào thẳng một review
session mặc định — hệ thống **mở Repeat Mode Menu** để user **chọn cách ôn**. **Chỉ sau khi user chọn
một mode** thì SRS Repeat Flow tương ứng mới bắt đầu.

Menu gồm **4 repeat mode** (dùng cho card **SRS-active (Box 1+) đã due**):

| Option (VI) | Repeat mode | Cơ chế |
|-------------|-------------|--------|
| **Ghép đôi** | match-style | ghép prompt/front ↔ answer/meaning |
| **Đoán** | guess-style | chọn answer/meaning đúng trong nhiều lựa chọn |
| **Nhớ lại** | recall-style | nhìn prompt/front, tự nhớ; có thể reveal/self-grade theo recall docs |
| **Điền** | fill-style | nhìn meaning/answer, nhập lại prompt/front |

- **`reviewMode` KHÔNG** thuộc Repeat Mode Menu — nó **chỉ** là mode đầu của New Learning Flow (khi bấm
  **Học**).
- Điều kiện mở menu: deck/subdeck có **`progress > 0%`** / có card SRS-active.
- Nếu `reviewDueCount = 0` khi chọn một mode → **no-due state**, **không** tạo session rỗng, **không**
  mutate SRS data, **không** mark session completed giả.
- Kết quả repeat → [Session Result](screens/session-result.md) (SRS Repeat Result); **không** activate
  card mới vào Box 1, **chỉ** xử lý card đã SRS-active. Kết quả ảnh hưởng SRS theo rule ở
  [06-srs-8box](06-srs-8box.md) (promotion khi correct / demotion·reset theo `lapseRule`).

### New Learning modes vs. Repeat modes — không nhầm lẫn

**match / guess / recall / fill** xuất hiện ở **hai flow khác nhau**; cùng **cơ chế tương tác** nhưng
khác **lifecycle** và **card eligibility**:

| | New Learning Flow (Học) | SRS Repeat Flow (Lặp lại) |
|--|-------------------------|---------------------------|
| Card eligibility | card **mới**, **Box 0 / not SRS-active** | card **Box 1+ đã due** |
| Vào flow qua | bấm **Học** → luôn bắt đầu `reviewMode` | bấm **Lặp lại** → **Repeat Mode Menu** (chọn 1 mode) |
| Thứ tự mode | **bắt buộc** review → match → guess → recall → fill | user **tự chọn** 1 trong: match / guess / recall / fill |
| `reviewMode` | có (mode 1) | **không** có |
| Ý nghĩa SRS | **pre-SRS learning**; đủ 5 mode → activate Box 1 | **SRS review**; ảnh hưởng box theo SRS rule |

> **Không được nhầm hai flow.** New Learning `match/guess/recall/fill` là **pre-SRS** (không đổi box/due);
> Repeat `match/guess/recall/fill` là **SRS review** cho Box 1+ due cards.

## Session Result (cuối phiên)

Khi một phiên **finalize thành công**, hệ thống hiển thị **[Session Result](screens/session-result.md)** —
màn thống kê **phiên vừa hoàn thành** (chi tiết metrics/actions ở screen spec).

- **New Learning Flow** kết thúc bằng Session Result **sau khi `fillMode` hoàn thành** và session
  **finalize thành công**. Result thống kê new-cards-learned, số card **activated vào Box 1**, số card
  chưa hoàn thành, và per-mode failure (match/guess/recall/fill) nếu có.
- **SRS Repeat Flow** kết thúc bằng Session Result **sau khi due review session finalize thành công**.
  Result thống kê reviewed / remembered / forgotten và promotion/demotion nếu SRS rule có.
- **Result KHÔNG bật SRS thay cho `fillMode`.** Activation **chỉ** xảy ra theo rule New Learning Flow
  (hoàn thành đủ 5 mode). Result chỉ **đọc** summary đã finalize, **không** mutate learning data.
- **Result KHÔNG thay thế Progress/Dashboard** dài hạn; chỉ phản ánh **phiên vừa rồi**.
- Nếu **finalize thất bại** / session **rỗng** / user **thoát chưa finalize** → **không** hiển thị
  Result như đã hoàn thành. Xem [Session Result → Empty/failure](screens/session-result.md#empty--failure-states).

### Đóng góp vào Statistics (dài hạn)

- **New Learning Flow** và **SRS Repeat Flow** tạo dữ liệu (session/attempt) **có thể được tổng hợp**
  trong [Statistics](screens/statistics.md) **sau khi finalize**. Statistics chỉ **đọc** history đã
  finalize, **không** mutate learning data.
- **Chỉ mode có evaluation** mới đóng góp vào **correct/wrong quality metrics** (match, guess, recall,
  fill). **`reviewMode`** (làm quen, **không** evaluation) **không** được tự tính là correct answer.
- **Review Words / browse mode** (chỉ xem card — [Flashcard List](screens/flashcard-list.md)) **không**
  được tính là learning/repeat attempt.

## Play Menu entry points mapping

Màn [Deck Management / Subdeck List](screens/deck-management.md#play-menu) mở **Play Menu** khi bấm
Play trên một deck/subdeck row. Các option của Play Menu là **điểm vào (entry point)** ở mức sản phẩm,
map về mode/flow như sau (mức concept, **không** chốt UI implementation):

| Play Menu option (VI) | Ánh xạ | Ghi chú |
|-----------------------|--------|---------|
| **Học** | **[New Learning Flow](#new-learning-flow)** (new-card, pre-SRS) | Thẻ mới (`newCount`, Box 0 / `due_at IS NULL`) đi qua **review→match→guess→recall→fill**; hoàn thành đủ 5 mode → activate lên **Box 1**. |
| **Lặp lại** | **[SRS Repeat Flow](#srs-repeat-flow)** (review/due) | Chỉ card **Box 1+** đã **đến hạn** (`reviewDueCount`, due local-day — [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day)). Count có thể = 0. |
| **Xem lại các từ** | **browse / review content mode** | Duyệt nội dung ([Flashcard List](screens/flashcard-list.md)); **không** bắt buộc tạo study session. |
| **Một trò chơi** | **game mode** | = **Match** ([Bảng đối chiếu mode](#bảng-đối-chiếu-mode)), hiện **Phase 3** → **Future** so với Phase 1. |
| **Trình phát** | **player / listening mode** | **Chưa** có trong docs (audio là non-goal hiện tại) → **Future** nếu chưa thuộc Phase 1. |

Quan hệ với cơ chế chung: **Học** đi qua New Learning Flow (pre-SRS, chưa có due); **Lặp lại** chỉ dùng
card đã activate (Box 1+) và due. Cơ chế chọn thẻ + local-day ở
[06-srs-8box](06-srs-8box.md#chọn-thẻ-cho-một-phiên-học) vẫn là nền tảng cho luồng **Lặp lại**.

## Ảnh hưởng của App Settings tới study (concept)

Các cài đặt ở [App Settings](screens/app-settings.md) chỉ điều chỉnh **preference/defaults**, **không**
thay đổi rule học lõi:

- **Game settings** (batch size / random selection) ảnh hưởng **defaults của game mode**; **không** đổi
  **New Learning Flow 5-mode rule** và **không** đổi **SRS Repeat eligibility** (vẫn Box 1+ due).
- **Native language preference** **không** tự đổi **study direction** (ví dụ `KO -> VI`) — xem
  [native-language-picker](screens/native-language-picker.md#difference-from-study-direction).
- **Reminder notification** **không** tự bắt đầu study session.
- **Spaced Repetition Settings** **không** đổi New Learning Flow 5-mode rule; **forgotten/lapse** chỉ áp
  dụng cho **SRS Repeat Flow** (không cho pre-SRS New Learning); **game word selection source** có thể
  đổi **game pool** nhưng **không** đổi SRS eligibility.
