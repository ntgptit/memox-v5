# 09 — Cài đặt (Settings)

Toàn bộ cấu hình lưu trong bảng `app_meta` (một dòng `key = 'settings'`, `value` = JSON). Đọc một lần
khi khởi động vào một **zustand store** (`src/features/settings`), ghi lại khi đổi.

## Hình dạng cấu hình

```ts
interface AppSettings {
  // SRS
  intervals: [number, number, number, number, number, number, number, number]; // ngày, box 1..8
  lapseRule: 'reset' | 'stepDown';   // sai → về box 1 | lùi 1 box
  newPerDay: number;                  // số thẻ mới tối đa/ngày

  // Giao diện
  language: 'vi' | 'en';

  // Học (tùy chọn, có default)
  shuffleSession: boolean;            // trộn thứ tự thẻ trong phiên
  includeSubdecksDefault: boolean;    // trạng thái mặc định của công tắc "gồm deck con"
}
```

## Giá trị mặc định

```ts
const DEFAULT_SETTINGS: AppSettings = {
  intervals: [1, 2, 4, 8, 16, 32, 64, 128],  // nhân đôi
  lapseRule: 'reset',                          // Leitner cổ điển
  newPerDay: 20,
  language: /* ngôn ngữ thiết bị nếu ∈ {vi,en}, else */ 'en',
  shuffleSession: true,
  includeSubdecksDefault: true,
};
```

## Bảng chi tiết + validation

| Khóa | Kiểu | Mặc định | Ràng buộc (Zod) | Yêu cầu |
|------|------|----------|-----------------|---------|
| `intervals` | `number[8]` | `[1,2,4,8,16,32,64,128]` | đúng 8 phần tử; mỗi phần tử **số nguyên > 0**; **tăng dần nghiêm ngặt** | FR-SET1 |
| `lapseRule` | enum | `'reset'` | `'reset'` \| `'stepDown'` | FR-SET2 |
| `newPerDay` | number | `20` | số nguyên **0–999** (`0` = không nạp thẻ mới) | FR-SET3 |
| `language` | enum | thiết bị→fallback `en` | `'vi'` \| `'en'` | FR-SET4 |
| `shuffleSession` | boolean | `true` | boolean | — |
| `includeSubdecksDefault` | boolean | `true` | boolean | FR-M6 |

### Schema Zod (ranh giới đọc/ghi)

```ts
const IntervalsSchema = z
  .array(z.number().int().positive())
  .length(8)
  .refine((a) => a.every((v, i) => i === 0 || a[i - 1]! < v), {
    message: 'intervals phải tăng dần nghiêm ngặt',
  });

const SettingsSchema = z.object({
  intervals: IntervalsSchema,
  lapseRule: z.enum(['reset', 'stepDown']),
  newPerDay: z.number().int().min(0).max(999),
  language: z.enum(['vi', 'en']),
  shuffleSession: z.boolean(),
  includeSubdecksDefault: z.boolean(),
});
```

- **Đọc**: parse JSON từ `app_meta`; nếu thiếu khóa/hỏng → **merge với `DEFAULT_SETTINGS`** rồi
  validate. Không bao giờ để app chạy với settings không hợp lệ.
- **Ghi**: validate trước khi ghi; ghi thất bại → giữ giá trị cũ + báo lỗi (khóa i18n).

## Màn hình Settings (UI)

Nhóm hiển thị:

1. **Ôn tập (SRS)**
   - 8 ô nhập **interval** (box 1→8), kèm nhắc "phải tăng dần". Lỗi validate hiện tại chỗ.
   - Chọn **luật khi sai**: `Về hộp 1` / `Lùi 1 hộp`.
   - **Thẻ mới mỗi ngày** (stepper/nhập số).
2. **Học**
   - Bật/tắt **trộn thứ tự phiên**.
   - Mặc định **"gồm deck con"**.
3. **Giao diện**
   - Chọn **ngôn ngữ** (áp dụng tức thì — xem [08-i18n](08-i18n.md)).
4. **Khác**
   - **Khôi phục mặc định** (FR-SET5) — có xác nhận.

## Tác động khi đổi settings (nhắc lại từ 06-srs-8box)

- Đổi **`intervals`**: **không hồi tố**. `due_at` hiện có giữ nguyên tới lần chấm kế; lần chấm kế áp
  interval mới.
- Đổi **`lapseRule`**: chỉ ảnh hưởng các lần chấm sau.
- Đổi **`newPerDay`**: áp cho phần còn lại của ngày hiện tại (đếm theo `new_seen_on = hôm nay`).
- Đổi **`language`**: cập nhật ngay toàn UI.

## Ghi chú sync (Phase 4)

Khi bật đồng bộ, `settings` là dữ liệu per-user; thêm `updated_at` cho dòng `app_meta` (đã có) để
resolve xung đột. Không thay đổi hình dạng `AppSettings` là mục tiêu để tránh migrate phá vỡ.
