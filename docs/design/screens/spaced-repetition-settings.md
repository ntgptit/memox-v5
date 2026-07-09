# Màn hình — Spaced Repetition Settings / Lặp lại giãn cách

Concept ở **mức sản phẩm** cho **cấu hình preference SRS**, child flow của [App Settings](app-settings.md).
Spec concept — **phải tuân thủ** [SRS 8-box](../06-srs-8box.md) và **không** ghi đè docs đã chốt.

> **Không** phải product module riêng; đi chung PR với App Settings.

## Screen name

**Spaced Repetition Settings / Lặp lại giãn cách.**

## Purpose

Cho user xem/cấu hình một số **preference liên quan SRS**. Thay đổi **chỉ** ảnh hưởng rule/preference SRS
**trong tương lai** theo docs; **mở màn không mutate** deck/card/session, **không** tự đổi due date hiện
có, **không** đổi SRS box model đã chốt.

## Entry point from App Settings

Bấm **Lặp lại giãn cách** trong [App Settings](app-settings.md#spaced-repetition-settings-lặp-lại-giãn-cách)
→ mở màn này. Mock hiển thị: `Ô`, `Thứ tự hộp khi lặp lại`, `Thông báo`, `Nếu quý vị không nhớ từ trong
khi lặp lại/kiểm tra`, `Lựa chọn từ trong chế độ "Một trò chơi"`.

## Relationship with SRS 8-box docs

- MemoX dùng **8-box SRS** — nguồn sự thật là [06-srs-8box](../06-srs-8box.md). Màn này **không** được
  làm lệch model.
- Bất kỳ setting nào ảnh hưởng **box/due hiện có** phải có **policy/migration riêng** trước implementation.

## Box setting / "Ô: 7" open question

Mock hiển thị `Ô` với giá trị `Ô: 7`.

> **DRIFT DETECTED**
> ```
> File code: (none — chưa có code)
> File doc:  docs/design/06-srs-8box.md (MemoX chốt SRS 8-box: box 1..8)
> Mismatch:  Mock App Settings hiển thị "Ô: 7". Không rõ 7 nghĩa là gì và có thể bị hiểu nhầm thành
>            "7-box SRS", mâu thuẫn với 8-box đã chốt.
> Suggested fix: KHÔNG đổi 8-box → 7-box chỉ vì mock. Coi "Ô: 7" là OPEN QUESTION cần product decision
>            trước implementation. Các khả năng: current selected box / max visible box / active interval
>            box / legacy value từ app tham chiếu / user-configurable max box count. Không migration
>            schema 8-box → 7-box trong task docs này.
> ```

**Rule bắt buộc:**

- **Không** implement ambiguous "Ô: 7" khi chưa có product decision.
- **Không** làm lệch SRS 8-box source of truth.
- **Không** migration 8-box → 7-box trong task docs này.

## Repeat box ordering (Thứ tự hộp khi lặp lại)

- Mock: `Tăng`. Quyết định **thứ tự lấy/hiển thị** card khi **SRS Repeat**.
- `Tăng` = ưu tiên duyệt theo **box tăng dần** nếu implementation hỗ trợ.
- **Chỉ ảnh hưởng ordering** của SRS Repeat Flow; **không** đổi box hiện tại, **không** đổi due date,
  **không** đổi kết quả đúng/sai.
- Giá trị tương lai **có thể** gồm: `Tăng` · `Giảm` · `Ngẫu nhiên` — nhưng **chỉ `Tăng`** được xác nhận
  từ mock. **Không** chốt toàn bộ enum.

## SRS notification toggle (Thông báo)

- Mock: `Chỉ thông báo khi quý vị cần lặp lại các từ`. Toggle thông báo cho **SRS due cards**.
- Bật → app có thể gửi notification **khi có từ cần lặp lại** (theo **local due calculation**,
  [DT-1 local-day](../../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day)).
- Notification **không** tự bắt đầu session, **không** đổi box/due. Bấm notification có thể mở study/
  repeat entry theo navigation docs sau.
- Permission chưa cấp → **permission state**; platform không hỗ trợ → **unavailable state**.
- **Không** chốt exact notification API.

## Forgotten / lapse behavior (Nếu không nhớ khi lặp lại/kiểm tra)

- Mock: `Di chuyển vào ô trước đó`. Đây là **lapse policy** cho **SRS Repeat Flow**.
- `Di chuyển vào ô trước đó` = card bị **giảm về box liền trước** nếu đang ở **Box 2+** (khớp
  `lapseRule: 'stepDown'` trong [06-srs-8box](../06-srs-8box.md#cấu-hình-từ-settings--xem-09-settings)).
- Card đang **Box 1** mà không nhớ → **không** giảm xuống dưới Box 1 (SRS-active lifecycle không có Box 0).
- **Chỉ** áp dụng cho **SRS-active cards** trong Repeat Flow. **Không** áp dụng:
  - **New Learning Flow pre-SRS** (không nhớ ở đây **không** phải SRS lapse);
  - **Review Words / browse mode**.
- Card **chưa** Box 1 **không** đi qua lapse policy. Mở Settings **không** tự mutate data.

> Nếu docs có rule reset/lapse riêng (`lapseRule: 'reset'`), **drift-check** và **không** ghi đè — hai
> giá trị `reset`/`stepDown` đã tồn tại ở [06-srs-8box](../06-srs-8box.md); mock chỉ xác nhận `stepDown`.

## Game word selection source (Lựa chọn từ trong "Một trò chơi")

- Mock: `Chế độ lặp lại giãn cách`. Quyết định **nguồn card** cho game mode.
- `Chế độ lặp lại giãn cách` = game ưu tiên lấy card từ **SRS Repeat pool** nếu implementation hỗ trợ.
- Nếu dùng SRS pool → **chỉ card Box 1+ và due** thuộc pool. Nếu cần trộn từ mới + due → **rule riêng**
  trong game docs.
- Setting này **không** tạo SRS session, **không** đổi due/box, **không** activate card mới vào SRS.
- **Không** chốt exact game selection algorithm.

## Persistence concept

- Spaced Repetition Settings **persist** trong **local settings storage** (dự kiến `app_meta`,
  [09-settings](../09-settings.md)); thay đổi SRS preference **phải được lưu bền vững**.
- **Save fail** → **giữ preference ổn định trước đó** + báo lỗi.
- SRS settings **không** được mâu thuẫn với [06-srs-8box](../06-srs-8box.md).

## Data mutation rules

- Mở màn / đổi preference **không** mutate deck/card/session/box/due (trừ khi có policy/migration riêng
  đã chốt cho setting ảnh hưởng box/due hiện có).

## Empty / error / unavailable states

| State | Ý nghĩa |
|-------|---------|
| `loading SRS settings` | Đang tải. |
| `loaded SRS settings` | Đã tải. |
| `failed to save SRS settings` | Lỗi lưu — giữ preference cũ. |
| `ambiguous SRS setting blocked by docs/product decision` | Ví dụ "Ô: 7" chưa được quyết định → chặn implement. |
| `notification permission missing` | Chưa cấp quyền notification. |
| `platform notification unavailable` | Nền tảng không hỗ trợ notification. |

## Open questions / cố ý không chốt

- "Ô: 7" nghĩa gì (xem [drift ở trên](#box-setting--ô-7-open-question)).
- exact route name / UI layout / **enum đầy đủ** cho ordering / **notification API** / **SRS interval
  algorithm** / **migration/schema** / **game selection algorithm** — **không** chốt.

Xem WBS: `F1.SETTINGS.SRS.1`, `F1.SETTINGS.SRS.2`, `F1.SETTINGS.SRS.3`.
