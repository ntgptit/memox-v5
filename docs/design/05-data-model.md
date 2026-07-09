# 05 — Mô hình dữ liệu

Local-first bằng **`expo-sqlite`** (SDK 57, async API). Schema thiết kế **sync-ready** ngay từ đầu
để Phase 4 bật đồng bộ không phải migrate phá vỡ.

## Nguyên tắc sync-ready

Mọi bảng dữ liệu người dùng đều có:

- **`id TEXT PRIMARY KEY`** — định danh **ổn định, sinh phía client** (UUID/ULID), **không** dùng
  auto-increment (số tự tăng đụng nhau khi merge nhiều thiết bị).
- **`created_at` / `updated_at`** — epoch **milliseconds (INTEGER)**, giờ UTC. `updated_at` phục vụ
  resolve xung đột kiểu last-write-wins sau này.
- **`deleted_at`** — soft-delete. `NULL` = còn sống. UI **luôn** lọc `deleted_at IS NULL`.

Các cột phục vụ sync (`dirty`, `synced_at`, `remote_id`, `user_id`) **chưa** tạo ở Phase 1 để tránh
phức tạp sớm, nhưng schema và code viết sao cho **thêm cột về sau không phá vỡ** (dùng migration cộng dồn).

## Sơ đồ quan hệ (ER)

```
┌────────────┐        ┌────────────┐        ┌──────────────┐
│   decks    │        │   cards    │        │ card_reviews │
├────────────┤        ├────────────┤        ├──────────────┤
│ id (PK)    │◄───┐   │ id (PK)    │◄───┐   │ id (PK)      │
│ parent_id ─┼──┐ │   │ deck_id ───┼────┘   │ card_id ─────┼──► cards.id
│ name       │  │ │   │ term       │        │ mode         │
│ description│  │ └───┤ (deck_id → │        │ grade        │  (correct|wrong)
│ position   │  │     │  decks.id) │        │ box_before   │
│ created_at │  │     │ meaning    │        │ box_after    │
│ updated_at │  │     │ note       │        │ reviewed_at  │
│ deleted_at │  │     │ box        │        │ created_at   │
└────────────┘  │     │ due_at     │        └──────────────┘
     ▲          │     │ last_reviewed_at │
     └──────────┘     │ new_seen_on  │   (self-parent: decks.parent_id → decks.id)
   parent_id →        │ created_at   │
   decks.id           │ updated_at   │        ┌──────────────┐
   (NULL = gốc)       │ deleted_at   │        │  app_meta    │  (key/value: settings, schema_version…)
                      └────────────┘        └──────────────┘
```

Quan hệ:

- `decks.parent_id → decks.id` (tự tham chiếu). `NULL` = deck gốc.
- `cards.deck_id → decks.id`. Mỗi thẻ thuộc đúng một deck.
- `card_reviews.card_id → cards.id`. Nhật ký mỗi lần chấm (bất biến), phục vụ thống kê (Phase 3) và
  audit/sync. **Trạng thái SRS "hiện tại" nằm ngay trên `cards`** (`box`, `due_at`, `last_reviewed_at`)
  để truy vấn "due" nhanh; `card_reviews` là lịch sử.

## Định nghĩa bảng (DDL)

> DDL minh họa để chốt hình dạng dữ liệu; câu lệnh chạy thật đặt trong migration (mục dưới).

```sql
-- decks: cây bộ thẻ
CREATE TABLE decks (
  id          TEXT PRIMARY KEY,
  parent_id   TEXT REFERENCES decks(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  position    INTEGER NOT NULL DEFAULT 0,   -- thứ tự hiển thị trong cùng cha
  created_at  INTEGER NOT NULL,
  updated_at  INTEGER NOT NULL,
  deleted_at  INTEGER                        -- NULL = còn sống
);
CREATE INDEX idx_decks_parent  ON decks(parent_id) WHERE deleted_at IS NULL;

-- cards: thẻ + trạng thái SRS hiện tại
CREATE TABLE cards (
  id               TEXT PRIMARY KEY,
  deck_id          TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  term             TEXT NOT NULL,
  meaning          TEXT NOT NULL,
  note             TEXT,                     -- tùy chọn
  box              INTEGER NOT NULL DEFAULT 1 CHECK (box BETWEEN 1 AND 8),
  due_at           INTEGER,                  -- NULL = thẻ mới, chưa xếp lịch
  last_reviewed_at INTEGER,                  -- NULL = chưa ôn lần nào
  new_seen_on      TEXT,                     -- 'YYYY-MM-DD' (giờ địa phương) — ngày đầu đưa vào học, để tính hạn mức thẻ mới
  created_at       INTEGER NOT NULL,
  updated_at       INTEGER NOT NULL,
  deleted_at       INTEGER
);
CREATE INDEX idx_cards_deck ON cards(deck_id)          WHERE deleted_at IS NULL;
CREATE INDEX idx_cards_due  ON cards(due_at)           WHERE deleted_at IS NULL;

-- card_reviews: nhật ký mỗi lần chấm (bất biến)
CREATE TABLE card_reviews (
  id          TEXT PRIMARY KEY,
  card_id     TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  mode        TEXT NOT NULL,                 -- 'review'|'recall'|'guess'|'typing'
  grade       TEXT NOT NULL CHECK (grade IN ('correct','wrong')),
  box_before  INTEGER NOT NULL,
  box_after   INTEGER NOT NULL,
  reviewed_at INTEGER NOT NULL,
  created_at  INTEGER NOT NULL
);
CREATE INDEX idx_reviews_card ON card_reviews(card_id);

-- app_meta: key/value cho settings + schema_version
CREATE TABLE app_meta (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,                  -- JSON hoặc chuỗi thô
  updated_at INTEGER NOT NULL
);
```

Ghi chú thiết kế:

- **`box` + `due_at` nằm trên `cards`**: truy vấn "thẻ đến hạn" chỉ cần `WHERE due_at <= now`
  (có index) — không phải join lịch sử. `due_at` tính lại mỗi lần chấm =
  `last_reviewed_at + interval(box) * 1 ngày`.
- **`new_seen_on`** giúp áp **hạn mức thẻ mới/ngày** (FR-S7) mà không cần bảng riêng: đếm số thẻ có
  `new_seen_on = hôm nay`.
- **`ON DELETE CASCADE`** ở FK là cho **hard-delete** (ví dụ dọn rác). Trong luồng thường ta dùng
  **soft-delete** (đặt `deleted_at`) và cascade soft-delete ở tầng repository.
- **Settings** lưu trong `app_meta` dạng JSON (một dòng `key='settings'`). Đơn giản, đủ cho cấu hình
  đơn người dùng; xem [09-settings](09-settings.md).
- **Không có bảng phiên học (session).** Phase 1 chỉ có 4 bảng trên. Phiên học là **state tạm**; tiến
  độ bền vững chỉ nằm trong `cards` + `card_reviews` (Option B — xem
  [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence) và
  [07-study-modes](07-study-modes.md#persist-phiên-học--option-b-phiên-là-state-tạm)). **Không** tạo
  `study_sessions` / `study_session_items` ở Phase 1.

## Kiểu domain (TypeScript)

Đặt tại `src/shared/types`. Ánh xạ hàng SQL ↔ domain qua mapper trong repository; validate ranh giới bằng Zod.

```ts
export type ID = string;                     // ULID/UUID sinh client
export type Box = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Deck {
  id: ID;
  parentId: ID | null;
  name: string;
  description?: string;
  position: number;
  createdAt: number;    // epoch ms
  updatedAt: number;
}

export interface Card {
  id: ID;
  deckId: ID;
  term: string;
  meaning: string;
  note?: string;
  box: Box;
  dueAt: number | null;          // null = thẻ mới
  lastReviewedAt: number | null;
  newSeenOn: string | null;      // 'YYYY-MM-DD' local
  createdAt: number;
  updatedAt: number;
}

// Trạng thái SRS rút gọn mà engine thao tác (domain thuần, xem 06-srs-8box)
export interface SrsState {
  box: Box;
  lastReviewedAt: number | null;
}
```

## Truy vấn chủ đạo

### Con trực tiếp của một deck (dựng cây)
```sql
SELECT * FROM decks
WHERE deleted_at IS NULL AND parent_id IS ?      -- ? = parentId hoặc NULL cho gốc
ORDER BY position, name;
```

### Toàn bộ deck con cháu (phạm vi đệ quy) — Recursive CTE
```sql
WITH RECURSIVE subtree(id) AS (
  SELECT id FROM decks WHERE id = ? AND deleted_at IS NULL
  UNION ALL
  SELECT d.id FROM decks d
  JOIN subtree s ON d.parent_id = s.id
  WHERE d.deleted_at IS NULL
)
SELECT id FROM subtree;
```
Dùng khi công tắc **"gồm deck con"** bật (FR-M6). Khi tắt: chỉ lấy `deck_id = ?`.

### Thẻ đến hạn trong phạm vi
```sql
SELECT * FROM cards
WHERE deleted_at IS NULL
  AND deck_id IN (/* danh sách id từ subtree hoặc chỉ 1 deck */)
  AND due_at IS NOT NULL
  AND due_at <= ?           -- ? = now (epoch ms) — Option A, xem DT-1
ORDER BY due_at ASC;
```

> **Ngữ nghĩa Due (Option A):** đây là **vị ngữ due chuẩn** dùng thống nhất cho Today session,
> Dashboard due count, Study eligibility query, và Progress/statistics. Xem
> [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics). Ngày địa phương **chỉ** dùng
> cho hạn mức thẻ mới (`new_seen_on`), **không** dùng cho due.

### Thẻ mới trong phạm vi (áp hạn mức/ngày)
```sql
SELECT * FROM cards
WHERE deleted_at IS NULL
  AND deck_id IN (/* phạm vi */)
  AND due_at IS NULL                    -- chưa xếp lịch = thẻ mới
ORDER BY created_at ASC
LIMIT ?;                                -- ? = max(0, hạn mức - số thẻ mới đã học hôm nay)
```

### Số thẻ mới đã đưa vào học hôm nay (cho hạn mức)
```sql
SELECT COUNT(*) FROM cards
WHERE deleted_at IS NULL AND new_seen_on = ?;   -- ? = 'YYYY-MM-DD' local hôm nay
```

## Migrations

Dùng **`PRAGMA user_version`** để theo dõi phiên bản schema, chạy tuần tự các bước còn thiếu khi
khởi động (qua `SQLiteProvider` `onInit` hoặc hàm `migrate(db)` gọi sau `openDatabaseAsync`).

```ts
// Bộ khung (đặt ở src/shared/db/migrations.ts)
const MIGRATIONS: Array<(db: SQLiteDatabase) => Promise<void>> = [
  async (db) => { /* v1: tạo decks, cards, card_reviews, app_meta + index */ },
  // v2, v3... cộng dồn; KHÔNG sửa migration cũ đã phát hành
];

export async function migrate(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let version = row?.user_version ?? 0;
  for (let i = version; i < MIGRATIONS.length; i++) {
    await db.withTransactionAsync(async () => {
      await MIGRATIONS[i]!(db);
    });
    version = i + 1;
    await db.execAsync(`PRAGMA user_version = ${version}`);
  }
}
```

Quy tắc migration:

- **Chỉ cộng dồn**: không sửa/xóa migration đã phát hành; thêm bước mới cho thay đổi mới.
- **Bọc transaction** mỗi bước; lỗi thì rollback và chặn khởi động (không chạy với schema nửa vời).
- Bật **`PRAGMA foreign_keys = ON`** sau khi mở DB (SQLite tắt mặc định).
- Cột thêm cho sync (Phase 4) là **migration cộng dồn** trên schema này.

## API expo-sqlite dùng (SDK 57)

Tham chiếu chính thức: https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/

- Mở DB: `openDatabaseAsync(name)` hoặc bọc app bằng `SQLiteProvider` + `useSQLiteContext()`.
- Ghi: `runAsync(sql, params)`. Đọc nhiều: `getAllAsync`. Đọc một: `getFirstAsync`.
- Nhiều câu lệnh: `execAsync`. Transaction: `withTransactionAsync`.
- Câu lệnh chuẩn bị sẵn: `prepareAsync` → `executeAsync` → `finalizeAsync` (dùng cho vòng lặp ghi nhiều).

Repository (ở `src/features/*/data` hoặc `src/shared/db`) bọc các lời gọi này và trả
`Result<T, DbError>` bằng neverthrow — không ném exception ra ngoài tầng data.
