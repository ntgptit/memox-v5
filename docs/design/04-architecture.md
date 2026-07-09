# 04 — Kiến trúc

## Tech stack (đã có trong repo)

| Lớp | Công nghệ | Ghi chú |
|-----|-----------|---------|
| Runtime | **Expo SDK 57**, React Native 0.86, React 19 | iOS / Android / Web |
| Điều hướng | **expo-router** (typed routes) | File-based routing trong `src/app` |
| Styling | **NativeWind 4** (Tailwind) | `global.css`, `tailwind.config.js` |
| State | **Zustand 5** | Store theo feature |
| Validation | **Zod 4** | Schema cho form + ranh giới dữ liệu |
| Form | **react-hook-form** + `@hookform/resolvers` | Form tạo/sửa deck & card |
| Kết quả/lỗi | **neverthrow** (`Result`) | Repository trả `Result`, không ném lỗi ẩn |
| Lưu trữ | **expo-sqlite** *(sẽ thêm)* | Async API; xem [05-data-model](05-data-model.md) |
| i18n | **expo-localization** + thư viện i18n *(sẽ thêm)* | Xem [08-i18n](08-i18n.md) |
| Chất lượng | **Biome**, **TypeScript strict**, Jest, boundary check | `npm run check` |

> Ràng buộc dự án: **đọc tài liệu Expo SDK 57 đúng phiên bản**
> (https://docs.expo.dev/versions/v57.0.0/) trước khi viết code chạm tới API Expo.

## Nguyên tắc phân lớp

Luồng phụ thuộc **một chiều**, từ UI xuống dữ liệu. Lớp dưới **không** biết lớp trên.

```
┌─────────────────────────────────────────────┐
│ UI            expo-router screens + components │  React, NativeWind
├─────────────────────────────────────────────┤
│ State         zustand stores + hooks           │  điều phối use-case
├─────────────────────────────────────────────┤
│ Domain        SRS engine, luật nghiệp vụ       │  THUẦN, không I/O
├─────────────────────────────────────────────┤
│ Data          repositories (Result)            │  ánh xạ SQL ↔ domain
├─────────────────────────────────────────────┤
│ Infra         expo-sqlite, i18n, localization  │  chi tiết nền tảng
└─────────────────────────────────────────────┘
```

Nguyên tắc then chốt:

- **Domain thuần**: engine SRS 8-box là hàm thuần — nhận trạng thái + kết quả chấm + `now`,
  trả trạng thái mới. Không đọc đồng hồ, không chạm DB. → test dễ, tất định (FR-S8).
- **Không nghiệp vụ trong UI**: màn hình chỉ gọi store; store gọi domain + repository.
- **Repository trả `Result`**: lỗi I/O là giá trị (`neverthrow`), không phải exception ngầm.
- **Fail fast, early return, không `else` thừa** (theo contract chung của repo).

## Cấu trúc thư mục

Bám sát bố cục hiện có và **quy tắc ranh giới** trong `scripts/check-boundaries.mjs`:

> a) `src/features/<A>` **không** import từ `src/features/<B>`.
> b) `src/shared` **không** import từ `src/features`.

```
src/
├── app/                         # expo-router (chỉ khai báo route + ghép UI)
│   ├── _layout.tsx
│   ├── index.tsx                # màn hình chính: cây deck + "due hôm nay"
│   ├── deck/[id].tsx            # chi tiết deck
│   ├── study/[deckId].tsx       # phiên học
│   └── settings.tsx
│
├── features/                    # mỗi feature tự chứa, không import chéo
│   ├── deck-tree/               # cây deck: CRUD, di chuyển, đệ quy
│   │   ├── ui/                  #   component riêng của feature
│   │   ├── model/               #   zustand store, use-case
│   │   ├── data/                #   deck.repository.ts
│   │   └── index.ts             #   public API của feature
│   ├── card/                    # CRUD thẻ
│   ├── study-session/           # điều phối phiên học + 5 chế độ
│   │   ├── modes/               #   typing/, review/, recall/, guess/, match/
│   │   ├── data/                #   review.repository.ts (ghi card_reviews)
│   │   ├── model/               #   dựng danh sách thẻ, gọi engine, lưu kết quả
│   │   └── index.ts
│   └── settings/                # đọc/ghi cấu hình
│
└── shared/                      # dùng chung, KHÔNG phụ thuộc feature
    ├── srs/                     # engine 8-box (DOMAIN THUẦN, không I/O)
    │   └── engine/              #   grade.ts, schedule.ts, box.ts + __tests__
    ├── db/                      # kết nối SQLite, migrations, helper truy vấn
    ├── i18n/                    # khởi tạo i18n, hook useT, locale files
    ├── ui/                      # component tái dùng (Button, CardFace, TreeRow…)
    ├── lib/                     # tiện ích thuần (id, date, result helpers)
    └── types/                   # type domain dùng chung (Deck, Card, SrsState)
```

### Vì sao SRS engine nằm ở `src/shared/srs`, không ở một feature?

- Engine là **domain thuần**, không thuộc riêng chế độ hay feature nào. Cả 4 chế độ
  (Review/Recall/Guess/Typing) trong `study-session` đều gọi **cùng một** engine.
- Ràng buộc boundary: *feature không import feature khác*. Nếu để engine trong một feature thì các
  feature khác không được import — vi phạm. Vì vậy mọi thứ **dùng chung xuyên feature** (engine 8-box,
  type `Deck`/`Card`/`SrsState`, DB/i18n helper) đặt ở **`src/shared`**.

> **Quy ước bắt buộc để không vi phạm boundary:** thứ dùng ở **nhiều** feature → `src/shared`.
> `src/features/*` chỉ chứa logic riêng của đúng feature đó, và import phần dùng chung từ `src/shared`.

`study-session` là nơi điều phối: đọc thẻ (repository) → gọi `shared/srs` (engine thuần) → lưu kết quả
(cập nhật `cards` + ghi `card_reviews`). Engine không biết gì về DB hay mode.

## Quản lý phụ thuộc theo lớp (tóm tắt kiểm được)

| Từ ↓ / Được import → | shared | feature khác | app |
|----------------------|:------:|:------------:|:---:|
| `src/app`            |  ✅   |     ✅      |  —  |
| `src/features/X`     |  ✅   |     ❌      | ❌ |
| `src/shared`         |  ✅   |     ❌      | ❌ |

`❌` được `scripts/check-boundaries.mjs` chặn ở CI/`npm run check`.

## Xử lý lỗi (tổng quát)

- **Tầng data**: trả `Result<T, DbError>` (neverthrow). Không nuốt lỗi.
- **Tầng state**: map lỗi thành trạng thái UI (toast/thông báo qua khóa i18n).
- **Domain**: validate đầu vào bằng type + Zod ở ranh giới; giả định dữ liệu đã hợp lệ bên trong.
- **Migration lỗi**: chặn khởi động, hiển thị màn hình lỗi rõ ràng thay vì chạy tiếp với schema sai.

## Kiểm thử (tổng quát — chi tiết trong từng doc)

- **Engine 8-box**: unit test thuần, phủ mọi nhánh lên/xuống box, biên (box 1 & 8), tính due.
- **Repository**: test với SQLite in-memory (`:memory:`) cho CRUD + truy vấn due.
- **Store/use-case**: test điều phối (chọn thẻ đúng phạm vi, áp hạn mức thẻ mới).
- **i18n**: test không sót khóa; snapshot vài màn hình ở 2 locale.
