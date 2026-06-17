# 데이터베이스 스키마

> Supabase PostgreSQL 기준. 마이그레이션명: `create_initial_schema`

---

## ERD

```mermaid
erDiagram
  AUTH_USERS ||--|| PROFILES : "1:1"
  AUTH_USERS ||--o{ POSTS : "1:N"
  AUTH_USERS ||--o{ INQUIRIES : "1:N"
  PRODUCTS ||--o{ PRODUCT_IMAGES : "1:N"
  PRODUCTS ||--o{ PRODUCT_FEATURES : "1:N"

  AUTH_USERS {
    uuid id PK
    text email
    timestamptz created_at
  }

  PROFILES {
    uuid id PK_FK
    text email
    text name
    text phone
    text role
    timestamptz created_at
    timestamptz updated_at
  }

  PRODUCTS {
    uuid id PK
    text title
    text summary
    text description
    text thumbnail_url
    boolean is_published
    integer sort_order
    timestamptz created_at
    timestamptz updated_at
  }

  PRODUCT_IMAGES {
    uuid id PK
    uuid product_id FK
    text image_url
    text alt_text
    integer sort_order
    timestamptz created_at
  }

  PRODUCT_FEATURES {
    uuid id PK
    uuid product_id FK
    text title
    text description
    integer sort_order
    timestamptz created_at
  }

  INQUIRIES {
    uuid id PK
    uuid user_id FK
    text name
    text email
    text phone
    text type
    text title
    text content
    text status
    timestamptz created_at
    timestamptz updated_at
  }

  POSTS {
    uuid id PK
    uuid user_id FK
    text category
    text title
    text content
    integer view_count
    boolean is_published
    timestamptz created_at
    timestamptz updated_at
  }
```

---

## 테이블 상세

### `profiles`

Supabase `auth.users`의 1:1 확장 테이블. 회원가입 시 트리거로 자동 생성된다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK, FK → auth.users | — | auth.users.id와 동일 |
| `email` | text | NOT NULL | — | 이메일 |
| `name` | text | — | — | 이름 |
| `phone` | text | — | — | 연락처 |
| `role` | text | NOT NULL, CHECK | `'user'` | `'admin'` 또는 `'user'` |
| `created_at` | timestamptz | — | `now()` | 생성일 |
| `updated_at` | timestamptz | — | `now()` | 수정일 (트리거 자동 갱신) |

**삭제 정책:** `auth.users` 삭제 시 `CASCADE`

---

### `products`

제품 소개 데이터. 관리자가 CRUD하며, `is_published = true`인 항목만 일반 사용자에게 노출된다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK | `gen_random_uuid()` | 제품 ID |
| `title` | text | NOT NULL | — | 제품명 |
| `summary` | text | — | — | 한 줄 요약 |
| `description` | text | — | — | 상세 설명 |
| `thumbnail_url` | text | — | — | 썸네일 이미지 URL |
| `is_published` | boolean | — | `true` | 공개 여부 |
| `sort_order` | integer | — | `0` | 목록 정렬 순서 |
| `created_at` | timestamptz | — | `now()` | 생성일 |
| `updated_at` | timestamptz | — | `now()` | 수정일 (트리거 자동 갱신) |

---

### `product_images`

제품별 상세 이미지. `product_id`로 `products`와 연결된다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK | `gen_random_uuid()` | 이미지 ID |
| `product_id` | uuid | FK → products | — | 연결된 제품 |
| `image_url` | text | NOT NULL | — | 이미지 URL |
| `alt_text` | text | — | — | 이미지 대체 텍스트 |
| `sort_order` | integer | — | `0` | 이미지 정렬 순서 |
| `created_at` | timestamptz | — | `now()` | 생성일 |

**삭제 정책:** `products` 삭제 시 `CASCADE`

---

### `product_features`

제품별 주요 기능 목록. `product_id`로 `products`와 연결된다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK | `gen_random_uuid()` | 기능 ID |
| `product_id` | uuid | FK → products | — | 연결된 제품 |
| `title` | text | NOT NULL | — | 기능 제목 |
| `description` | text | — | — | 기능 설명 |
| `sort_order` | integer | — | `0` | 정렬 순서 |
| `created_at` | timestamptz | — | `now()` | 생성일 |

**삭제 정책:** `products` 삭제 시 `CASCADE`

---

### `inquiries`

온라인 문의. 비회원도 작성 가능하며, 회원이 작성한 경우 `user_id`를 저장한다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK | `gen_random_uuid()` | 문의 ID |
| `user_id` | uuid | FK → auth.users, NULLABLE | — | 작성 회원 (비회원이면 NULL) |
| `name` | text | NOT NULL | — | 작성자 이름 |
| `email` | text | NOT NULL | — | 연락 이메일 |
| `phone` | text | — | — | 연락처 |
| `type` | text | — | — | 문의 유형 (일반/제품/기타) |
| `title` | text | NOT NULL | — | 문의 제목 |
| `content` | text | NOT NULL | — | 문의 내용 |
| `status` | text | NOT NULL, CHECK | `'pending'` | `'pending'` / `'in_progress'` / `'completed'` |
| `created_at` | timestamptz | — | `now()` | 생성일 |
| `updated_at` | timestamptz | — | `now()` | 수정일 (트리거 자동 갱신) |

**삭제 정책:** `auth.users` 삭제 시 `SET NULL`

---

### `posts`

커뮤니티 게시글. 로그인 사용자만 작성 가능하며, 공지(`notice`)는 관리자만 작성 가능하다.

| 컬럼 | 타입 | 제약 | 기본값 | 설명 |
|---|---|---|---|---|
| `id` | uuid | PK | `gen_random_uuid()` | 게시글 ID |
| `user_id` | uuid | FK → auth.users, NOT NULL | — | 작성자 |
| `category` | text | NOT NULL, CHECK | `'free'` | `'notice'` / `'free'` / `'qna'` |
| `title` | text | NOT NULL | — | 제목 |
| `content` | text | NOT NULL | — | 본문 |
| `view_count` | integer | — | `0` | 조회수 |
| `is_published` | boolean | — | `true` | 공개 여부 |
| `created_at` | timestamptz | — | `now()` | 생성일 |
| `updated_at` | timestamptz | — | `now()` | 수정일 (트리거 자동 갱신) |

**삭제 정책:** `auth.users` 삭제 시 `CASCADE`

---

## 함수 및 트리거

### `update_updated_at()` — 트리거 함수

`updated_at` 컬럼을 현재 시각으로 자동 갱신한다.

```sql
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
```

적용 테이블: `profiles`, `products`, `inquiries`, `posts`

---

### `handle_new_user()` — 신규 회원 트리거 함수

`auth.users`에 새 행이 삽입될 때(회원가입) `profiles` 테이블에 자동으로 행을 생성한다.

```sql
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', '')
  );
  return new;
end;
$$ language plpgsql security definer;
```

트리거: `trg_on_auth_user_created` — `after insert on auth.users`

---

## RLS 정책 요약

### `profiles`

| 정책 | 대상 | 조건 |
|---|---|---|
| 사용자는 본인 프로필 조회 가능 | SELECT | `auth.uid() = id` |
| 사용자는 본인 프로필 수정 가능 | UPDATE | `auth.uid() = id` |
| 관리자는 전체 프로필 조회 가능 | SELECT | `profiles.role = 'admin'` |

### `products`

| 정책 | 대상 | 조건 |
|---|---|---|
| 누구나 공개 제품 조회 가능 | SELECT | `is_published = true` |
| 관리자는 전체 제품 조회 가능 | SELECT | `role = 'admin'` |
| 관리자만 제품 등록 가능 | INSERT | `role = 'admin'` |
| 관리자만 제품 수정 가능 | UPDATE | `role = 'admin'` |
| 관리자만 제품 삭제 가능 | DELETE | `role = 'admin'` |

### `product_images` / `product_features`

| 정책 | 대상 | 조건 |
|---|---|---|
| 누구나 공개 제품의 이미지/기능 조회 가능 | SELECT | 연결된 product의 `is_published = true` |
| 관리자는 전체 조회 가능 | SELECT | `role = 'admin'` |
| 관리자만 등록 / 수정 / 삭제 가능 | INSERT, UPDATE, DELETE | `role = 'admin'` |

### `inquiries`

| 정책 | 대상 | 조건 |
|---|---|---|
| 누구나 문의 작성 가능 | INSERT | `true` |
| 회원은 본인 문의 조회 가능 | SELECT | `auth.uid() = user_id` |
| 관리자는 전체 문의 조회 가능 | SELECT | `role = 'admin'` |
| 관리자만 문의 상태 수정 가능 | UPDATE | `role = 'admin'` |

### `posts`

| 정책 | 대상 | 조건 |
|---|---|---|
| 누구나 공개 게시글 조회 가능 | SELECT | `is_published = true` |
| 로그인 사용자 게시글 작성 가능 (공지는 관리자만) | INSERT | `auth.uid() IS NOT NULL` + category 조건 |
| 작성자는 본인 글 수정 가능 | UPDATE | `auth.uid() = user_id` |
| 작성자는 본인 글 삭제 가능 | DELETE | `auth.uid() = user_id` |
| 관리자는 전체 글 수정 가능 | UPDATE | `role = 'admin'` |
| 관리자는 전체 글 삭제 가능 | DELETE | `role = 'admin'` |

---

## 관계 구조 요약

```
auth.users
  └── profiles          (1:1, CASCADE)

auth.users
  ├── posts             (1:N, CASCADE)
  └── inquiries         (1:N, SET NULL)

products
  ├── product_images    (1:N, CASCADE)
  └── product_features  (1:N, CASCADE)
```
