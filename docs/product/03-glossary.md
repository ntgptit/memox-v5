# 03 — Bảng thuật ngữ

Dùng các thuật ngữ này **thống nhất** trong toàn bộ docs, code, và UI (qua khóa i18n).

| Thuật ngữ | Tiếng Anh (khóa) | Định nghĩa |
|-----------|------------------|------------|
| **Thẻ** | Card | Đơn vị học nhỏ nhất: `term` + `meaning` (+ `note` tùy chọn). |
| **Mặt trước** | Term | Nội dung hiển thị trước / câu hỏi. Mặc định là phía "được hỏi". |
| **Mặt sau** | Meaning | Nội dung đáp án / nghĩa. Mặc định là phía "phải trả lời". |
| **Ghi chú** | Note | Trường tùy chọn của thẻ: ví dụ, gợi ý, ngữ cảnh. Không tham gia chấm điểm. |
| **Bộ thẻ** | Deck | Nhóm chứa thẻ và/hoặc deck con. Có thể lồng nhau tùy độ sâu. |
| **Deck cha / con** | Parent / Child deck | Quan hệ lồng nhau. Deck gốc (root) có `parent = null`. |
| **Cây deck** | Deck tree | Toàn bộ cấu trúc phân cấp của các deck. |
| **Đệ quy** | Recursive scope | Phạm vi gồm một deck **và tất cả** deck con cháu của nó. |
| **Phạm vi học** | Study scope | Tập thẻ đưa vào phiên học: một deck, có/không "gồm deck con". |
| **SRS** | Spaced Repetition System | Hệ thống ôn tập giãn cách — ôn lại đúng lúc sắp quên. |
| **8-box / Leitner** | Leitner boxes | Mô hình SRS gồm 8 hộp; đúng thì lên hộp, sai thì tụt. |
| **Box** | Box | Bậc trí nhớ của thẻ, từ **1** (mới/hay quên) đến **8** (nhớ chắc). |
| **Interval** | Interval | Số **ngày** chờ trước lần ôn kế của một box. |
| **Đến hạn** | Due | Thẻ tới lúc cần ôn: `now ≥ last_reviewed_at + interval(box)`. |
| **Thẻ mới** | New card | Thẻ chưa từng được ôn (chưa có `last_reviewed_at`), đang ở box 1. |
| **Hạn mức thẻ mới** | New-cards-per-day limit | Số thẻ mới tối đa được đưa vào học trong một ngày. |
| **Luật khi sai** | Lapse rule | Cách hạ box khi trả lời sai: `về box 1` hoặc `lùi 1 box`. |
| **Phiên học** | Study session | Một lượt học/ôn: chọn phạm vi + chế độ → duyệt qua các thẻ. |
| **Chế độ học** | Study mode | Một trong: Review, Recall, Guess, Typing, Match. |
| **Review** | Review | Lật thẻ, tự đánh giá nhớ/không. Cập nhật SRS. |
| **Recall** | Recall | Tự nhớ trong đầu rồi lật xem để tự chấm. Cập nhật SRS. |
| **Guess** | Guess | Trắc nghiệm chọn 1 trong nhiều đáp án. Cập nhật SRS. |
| **Typing** | Typing | Gõ đáp án, so khớp **chặt tuyệt đối**. Cập nhật SRS. |
| **Match** | Match | Game nối term ↔ meaning tính giờ. **Không** cập nhật SRS. |
| **So khớp chặt** | Exact match | So sánh từng ký tự, phân biệt hoa/thường và dấu; không chuẩn hóa. |
| **Chấm điểm** | Grade | Kết quả một lần trả lời, quy về **đúng/sai** để engine cập nhật box. |
| **Soft-delete** | Soft delete | Đánh dấu `deleted_at` thay vì xóa hẳn — phục vụ đồng bộ sau này. |
| **Sync-ready** | Sync-ready | Schema đủ metadata (`id`, `updated_at`, soft-delete) để bật đồng bộ về sau. |
| **i18n** | Internationalization | Đa ngôn ngữ hóa **giao diện** app. |
| **Locale** | Locale | Định danh ngôn ngữ/vùng, ví dụ `vi`, `en`. |

## Quy ước đặt tên (code)

- **Bảng SQLite**: số nhiều, snake_case — `decks`, `cards`, `card_reviews`, `settings`.
- **Cột**: snake_case — `parent_id`, `last_reviewed_at`, `deleted_at`.
- **Type/Domain TS**: PascalCase — `Deck`, `Card`, `SrsState`, `StudyMode`.
- **Khóa i18n**: chấm phân cấp — `deck.create.title`, `study.typing.placeholder`.
- **Feature folder**: kebab-case dưới `src/features/` — `deck-tree`, `study-session`, `srs`.
