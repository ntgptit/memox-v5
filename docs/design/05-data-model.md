# 05 — Mô hình dữ liệu

Local-first bằng **`expo-sqlite`** (SDK 57, async API). Schema thiết kế **sync-ready** ngay từ đầu
để Phase 4 bật đồng bộ không phải migrate phá vỡ.

## Hợp đồng lưu trữ local-first

Ràng buộc bắt buộc cho toàn bộ tầng dữ liệu:

- **MemoX v5 là local-first.** **SQLite (local DB) là nguồn sự thật (source of truth)** cho
  deck / card / study session / review / settings.
- **UI / provider / state library (zustand) KHÔNG** được là nơi lưu bền vững **duy nhất**. State chỉ
  là bản chiếu (projection) của DB; đóng app không được mất dữ liệu đã ghi.
- **Ghi nhiều bảng phải nằm trong một transaction** (ví dụ: chấm một thẻ ghi `cards` + `card_reviews`
  + `study_session_items`; tạo session ghi `study_sessions` + items).
- **Repository trả `Result`** (neverthrow) hoặc error-object theo convention hiện có — không ném lỗi
  ẩn qua tầng data.
- **Domain logic không đọc trực tiếp** storage, UI, route, `Date.now()`, hay network. Thời gian và I/O
  được **truyền vào** (inject) để test được.
- **Import / export / backup-restore** là task sau nếu chưa nằm trong Phase 1, nhưng **không được phá
  vỡ** hợp đồng local-first (vẫn qua repository + transaction + DB là nguồn sự thật). Xem
  [memox-scope](../product/memox-scope.md) và [overview](../architecture/overview.md).

## Chức năng hệ thống (concept-level — chưa chốt schema)

Các chức năng ở [Settings / More Hub](screens/settings-more-hub.md) cần cân nhắc storage, nhưng **task
đó không chốt schema**; ghi lại ở đây như **dependency** cần một task riêng:

- **Language / workspace management** (Thêm/Xóa ngôn ngữ học): có thể cần một **storage contract riêng**
  (thực thể/scope "ngôn ngữ học"). Data model **hiện chưa có** entity này (chỉ có `decks`/`cards`) — xem
  [drift note](screens/settings-more-hub.md#drift-note). **Cần task data-model riêng** trước khi implement.
- **Settings / theme preference**: lưu theo **settings storage** hiện có (`app_meta`, xem
  [09-settings](09-settings.md)); theme preference nếu persist thì đi qua đó, **không** tạo store riêng.
- **Appearance preferences** ([Appearance / Theme Settings](screens/appearance-theme-settings.md)):
  auto-dark-mode, **theme ban ngày**, **theme buổi tối**, và **app icon** (nếu hỗ trợ) là **preference**
  → cần **local settings storage** (dự kiến `app_meta`; chốt ở task storage). **Không** liên quan
  deck/card/SRS/session; **không** mutate learning data. App icon switching cần **platform spike** trước.
- **Import / export**: phải dựa trên **local database** (nguồn sự thật); import **validate trước khi
  commit**, export **không mutate** dữ liệu học. File format **chưa chốt**.
- **Destructive delete (Xóa ngôn ngữ)**: là hành động phá hủy → **phải có policy** (block / cascade /
  require export trước) **được chốt trước khi implement**; **không** tự xóa dữ liệu học khi chưa có policy.
- **App settings** ([App Settings](screens/app-settings.md)): cần **local settings storage** (settings
  là source of truth cho preference; không chỉ volatile UI state). **Không** thêm migration/schema chi
  tiết ở đây.
  - **Native language preference** thuộc local settings. **Language option** nên có **stable id/code**,
    display name, native name, optional **script/region** metadata; **flag/icon KHÔNG** phải identifier.
  - **Reminders**: mỗi reminder cần **stable id, time, weekdays**, enabled state (nếu hỗ trợ) — persist
    schedule preference.
  - **Spaced Repetition Settings** thuộc local settings; persist: **repeat ordering**, **SRS notification
    enabled**, **forgotten/lapse behavior**, **game word selection source** (nếu hỗ trợ). Phải **tuân thủ
    8-box** ([06-srs-8box](06-srs-8box.md)); setting ảnh hưởng box/due hiện có cần **policy/migration
    riêng** trước implement.
  - **Word-display / game settings** cần persist (batch size, random selection, keyboard…).
  - **Backup / restore / cloud sync** là **data operations** cần **policy trước implementation**;
    **restore/sync fail KHÔNG được làm hỏng local DB**. File format / provider / conflict policy **chưa
    chốt**.
  - Đổi **native language** / **reminder** / mở **SRS settings** **KHÔNG** thay đổi deck/card/SRS/session.
    Nếu tích hợp **OS notification**, **local settings vẫn là source of truth**.

**Không** thêm schema chi tiết / migration trong task này.

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
  box              INTEGER NOT NULL DEFAULT 0 CHECK (box BETWEEN 0 AND 8),  -- 0 = not activated / pre-SRS; 1..8 = SRS-active
  due_at           INTEGER,                  -- NULL cho Box 0; set/ý nghĩa cho Box 1+ (SRS scheduling)
  last_reviewed_at INTEGER,                  -- NULL = chưa ôn lần nào
  srs_activated_at INTEGER,                  -- NULL tới khi Box 0 → Box 1 (hoàn thành New Learning Flow); recommended field
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

- **Box 0 / not activated (pre-SRS).** Thẻ mới **mặc định `box = 0`** (chưa activate vào SRS). `0` là
  trạng thái **trước SRS**; `1..8` là **SRS-active**. Card chỉ chuyển **Box 0 → Box 1** sau khi hoàn
  thành đủ **New Learning Flow** (`review → match → guess → recall → fill`) — xem
  [06-srs-8box → Kích hoạt SRS](06-srs-8box.md#kích-hoạt-srs-box-0--box-1) và
  [07-study-modes](07-study-modes.md#new-learning-flow). **Card Box 0 KHÔNG** đủ điều kiện vào **Repeat
  Mode Menu**. `srs_activated_at` (recommended) set khi activate. **SRS engine schedule chỉ áp dụng cho
  Box 1..8**; Box 0 **không** có `due_at`/scheduling (trừ thao tác activate tường minh).
- **Tiến độ 5-mode của New Learning Flow phải persist** qua `study_session_items` (hoặc bảng learning
  progress ở tương lai) — **không** dựa vào volatile UI state.
- **`box` + `due_at` nằm trên `cards`**: `due_at` (cho **Box 1+**) lưu **mốc tuyệt đối** (epoch ms),
  tính lại mỗi lần chấm = `last_reviewed_at + interval(box) * 1 ngày`. **Eligibility "đến hạn" theo
  local-day** (DT-1), **không** so trực tiếp `due_at <= now`; storage có thể pre-filter timestamp cho
  hiệu năng nhưng use-case áp local-day làm nguồn sự thật.
- **`new_seen_on`** giúp áp **hạn mức thẻ mới/ngày** (FR-S7) mà không cần bảng riêng: đếm số thẻ có
  `new_seen_on = hôm nay`.
- **`ON DELETE CASCADE`** ở FK là cho **hard-delete** (ví dụ dọn rác). Trong luồng thường ta dùng
  **soft-delete** (đặt `deleted_at`) và cascade soft-delete ở tầng repository.
- **Settings** lưu trong `app_meta` dạng JSON (một dòng `key='settings'`). Đơn giản, đủ cho cấu hình
  đơn người dùng; xem [09-settings](09-settings.md).
- **Phiên học được persist (DT-2).** Phase 1 storage contract **bắt buộc** có `study_sessions` +
  `study_session_items` (định nghĩa ngay dưới). Tiến độ **học** bền vững qua `cards`/`card_reviews`;
  tiến độ **phiên** bền vững qua `study_sessions`/`study_session_items`. Đây là **task
  BE/migration riêng** (`P1-BE-05`) phải xong trước Study UI.

## `study_sessions` / `study_session_items` (persisted session)

Persist phiên học (DT-2). Cùng nguyên tắc sync-ready (`id` client, `created_at`/`updated_at`,
`deleted_at`). Đây là **contract Phase 1**; cần **migration riêng** (`P1-BE-05`) trước Study UI.

```sql
-- study_sessions: một phiên học
CREATE TABLE study_sessions (
  id            TEXT PRIMARY KEY,
  scope_deck_id TEXT NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  include_subdecks INTEGER NOT NULL DEFAULT 1,     -- 0/1: có gồm deck con không
  mode          TEXT NOT NULL,                     -- 'typing' (Phase 1) | 'review'|'recall'|'guess'|'match'
  status        TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','completed','cancelled','expired','failed_to_finalize')),
  total_items   INTEGER NOT NULL DEFAULT 0,
  answered_count INTEGER NOT NULL DEFAULT 0,
  started_at    INTEGER NOT NULL,
  finished_at   INTEGER,                           -- set khi completed/cancelled/expired
  created_at    INTEGER NOT NULL,
  updated_at    INTEGER NOT NULL,
  deleted_at    INTEGER
);
-- Chặn 2 session 'active' cùng scope (deck + include_subdecks): partial unique index.
CREATE UNIQUE INDEX uidx_active_session_scope
  ON study_sessions(scope_deck_id, include_subdecks)
  WHERE status = 'active' AND deleted_at IS NULL;

-- study_session_items: các thẻ trong phiên, thứ tự ổn định + trạng thái để resume
CREATE TABLE study_session_items (
  id           TEXT PRIMARY KEY,
  session_id   TEXT NOT NULL REFERENCES study_sessions(id) ON DELETE CASCADE,
  card_id      TEXT NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  position     INTEGER NOT NULL,                   -- thứ tự học ổn định trong phiên
  item_status  TEXT NOT NULL DEFAULT 'pending'
               CHECK (item_status IN ('pending','answered','skipped')),
  grade        TEXT CHECK (grade IN ('correct','wrong')),  -- NULL tới khi answered
  answered_at  INTEGER,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);
CREATE UNIQUE INDEX uidx_session_item_pos ON study_session_items(session_id, position);
CREATE INDEX idx_session_items_session ON study_session_items(session_id);
```

Ghi chú:

- **Nguồn sự thật tiến độ học** vẫn là `cards` + `card_reviews`. `study_session_items` giữ **tiến độ
  phiên** (vị trí, item nào đã trả lời) để **resume**; nó **không** thay thế `card_reviews`.
- **Resume**: mở lại → tìm `study_sessions` `status='active'` gần nhất cho scope → tiếp tục từ item
  `position` nhỏ nhất còn `pending`.
- **Không trùng active**: `uidx_active_session_scope` đảm bảo mỗi scope chỉ một session `active`.
- **Atomic**: tạo session + toàn bộ items trong **một** transaction; lỗi → rollback (không partial).
  Chấm một thẻ: cập nhật `cards` + chèn `card_reviews` + cập nhật item — **một** transaction.
- **Finish**: đặt `status='completed'`, `finished_at=now`. Nếu finalize lỗi → giữ `active` hoặc
  `failed_to_finalize`, **không** đánh dấu `completed` sai.
- Hành vi đầy đủ: [07-study-modes](07-study-modes.md#persist-phiên-học--persisted-dt-2),
  [DT-2](../decision-tables/phase-1-contracts.md#dt-2--study-session-persistence-persisted).

## Kiểu domain (TypeScript)

Đặt tại `src/shared/types`. Ánh xạ hàng SQL ↔ domain qua mapper trong repository; validate ranh giới bằng Zod.

```ts
export type ID = string;                     // ULID/UUID sinh client
export type Box = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // 0 = not activated / pre-SRS; 1..8 = SRS-active
export type SrsBox = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;  // box hợp lệ khi SRS engine thao tác (Box 1+)

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
  box: Box;                      // 0 = not activated / pre-SRS; 1..8 = SRS-active
  dueAt: number | null;          // null cho Box 0; có ý nghĩa cho Box 1+
  lastReviewedAt: number | null;
  srsActivatedAt: number | null; // null tới khi Box 0 → Box 1 (recommended)
  newSeenOn: string | null;      // 'YYYY-MM-DD' local
  createdAt: number;
  updatedAt: number;
}

// Trạng thái SRS rút gọn mà engine thao tác (domain thuần, xem 06-srs-8box)
export interface SrsState {
  box: Box;
  lastReviewedAt: number | null;
}

export type StudyMode = 'typing' | 'review' | 'recall' | 'guess' | 'match';
export type SessionStatus =
  | 'active' | 'completed' | 'cancelled' | 'expired' | 'failed_to_finalize';
export type SessionItemStatus = 'pending' | 'answered' | 'skipped';

export interface StudySession {
  id: ID;
  scopeDeckId: ID;
  includeSubdecks: boolean;
  mode: StudyMode;
  status: SessionStatus;
  totalItems: number;
  answeredCount: number;
  startedAt: number;
  finishedAt: number | null;
  createdAt: number;
  updatedAt: number;
}

export interface StudySessionItem {
  id: ID;
  sessionId: ID;
  cardId: ID;
  position: number;                 // thứ tự học ổn định
  itemStatus: SessionItemStatus;
  grade: 'correct' | 'wrong' | null;
  answeredAt: number | null;
  createdAt: number;
  updatedAt: number;
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

### Thẻ đến hạn trong phạm vi (local-day, DT-1)
```sql
-- Pre-filter ở storage cho hiệu năng: lấy mọi thẻ có due_at TRƯỚC đầu ngày-mai-địa-phương.
-- ? = epoch ms của "đầu ngày mai theo giờ địa phương" (startOfTomorrowLocal).
SELECT * FROM cards
WHERE deleted_at IS NULL
  AND deck_id IN (/* danh sách id từ subtree hoặc chỉ 1 deck */)
  AND due_at IS NOT NULL
  AND due_at < ?            -- < đầu ngày mai (local) → gồm cả thẻ due muộn hơn HÔM NAY
ORDER BY due_at ASC;
```

> **Ngữ nghĩa Due (local-day — DT-1):** nguồn sự thật là `localDay(due_at) <= localDay(today)`. Câu
> SQL trên chỉ là **pre-filter hiệu năng** (dùng mốc "đầu ngày mai local" nên bao gồm thẻ due muộn hơn
> trong hôm nay); **use-case/domain vẫn áp lại quy tắc local-day**. **Không** dùng `due_at <= now` cho
> query học/ngày vì sẽ ẩn thẻ due-muộn-hôm-nay. Cùng quy tắc cho Today session, Dashboard due count,
> Study eligibility, Progress/statistics, và mọi review-queue sau này. Xem
> [DT-1](../decision-tables/phase-1-contracts.md#dt-1--due-date-semantics-local-day). "Hôm nay" là
> clock **inject/test-controlled**, không đọc `Date.now()` ẩn trong domain.

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
