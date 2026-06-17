# Design System

> Linear 마케팅 캔버스 기반 다크 테마 디자인 시스템.
> 이 프로젝트의 UI는 아래 토큰과 원칙을 따른다.

---

## Overview

Linear의 마케팅 캔버스를 레퍼런스로 삼는 **딥 다크 디자인 시스템**이다. 배경(`colors.canvas`)은 #010102 — 순수 블랙에 미세한 블루 틴트가 섞인 색이다. 네 단계 서피스 래더(`surface-1` ~ `surface-4`)가 카드, 패널, 타일의 계층을 형성하며, 헤어라인 보더(`hairline` ~ `hairline-tertiary`)가 구분선 역할을 한다.

단일 크로매틱 액센트는 **라벤더 블루** (`colors.primary` #5e6ad2) — 브랜드 마크, 포커스 링, 프라이머리 CTA 버튼에만 사용한다. 포화된 그린, 오렌지, 레드는 마케팅 캔버스에서 사용하지 않는다. 유일한 시맨틱 컬러는 `colors.semantic-success` (#27a644) — 상태 필 등 성공 지시자에만 허용된다.

---

## Colors

### Brand & Accent

| 토큰 | 헥스 | 용도 |
|---|---|---|
| `colors.primary` | #5e6ad2 | 브랜드 마크, 프라이머리 CTA, 링크 강조 |
| `colors.primary-hover` | #828fff | 프라이머리 CTA 호버 상태 |
| `colors.primary-focus` | #5e69d1 | 포커스 링, 포커스 상태 인풋/버튼 |
| `colors.brand-secure` | #7a7fad | 보안 관련 서피스 (뮤트 라벤더-그레이) |

### Surface

| 토큰 | 설명 | 용도 |
|---|---|---|
| `colors.canvas` | #010102 — 최심층 배경 | 페이지 기본 배경 |
| `colors.surface-1` | 캔버스 위 1단계 | 피처 카드, 프라이싱 카드, 제품 스크린샷 패널 |
| `colors.surface-2` | 2단계 | 추천 프라이싱 카드, 호버 카드 |
| `colors.surface-3` | 3단계 | 라인 배경, 서브 내비 |
| `colors.surface-4` | 4단계 — 최상위 리프트 서피스 | bg-level-3 |
| `colors.hairline` | #23252a | 카드 / 구분선 1px 보더 |
| `colors.hairline-strong` | hairline보다 강한 1px | 인풋 포커스 링 |
| `colors.hairline-tertiary` | 3차 보더 | 중첩 서피스 구분 |
| `colors.inverse-canvas` | 순백 | 인버스 필 CTA 서피스 |
| `colors.inverse-surface-1` | 인버스 캔버스 1단계 위 | — |
| `colors.inverse-surface-2` | 인버스 캔버스 2단계 위 | — |

### Text

| 토큰 | 헥스 | 용도 |
|---|---|---|
| `colors.ink` | #f7f8f8 | 헤드라인, 강조 본문 |
| `colors.ink-muted` | #d0d6e0 | 2차 텍스트, 히어로 패널 메타 |
| `colors.ink-subtle` | #8a8f98 | 3차 텍스트, 비선택 탭, 푸터 |
| `colors.ink-tertiary` | #62666d | 4차 텍스트, 비활성, 각주 |

### Semantic

| 토큰 | 헥스 | 용도 |
|---|---|---|
| `colors.semantic-success` | #27a644 | 상태 필, 성공 지시자 (마케팅 캔버스 유일 시맨틱 컬러) |
| `colors.semantic-overlay` | #000000 | 모달 오버레이 스크림 |

---

## Typography

### Font Family

| 역할 | 패밀리 | 폴백 | 용도 |
|---|---|---|---|
| Display | Linear Display | `SF Pro Display, -apple-system, system-ui, Segoe UI, Roboto` | display-xl ~ subhead |
| Text | Linear Text | 동일 | body, button, caption |
| Mono | Linear Mono | `ui-monospace, SF Mono, Menlo` | 코드 스니펫, ID 토큰 |

> **오픈소스 대체:** Display/Text → **Inter** 500/600/700. Mono → **JetBrains Mono** 또는 **Geist Mono** 400.

### Scale

| 토큰 | 크기 | 굵기 | 행간 | 자간 | 용도 |
|---|---|---|---|---|---|
| `typography.display-xl` | 80px | 600 | 1.05 | -3.0px | 히어로 최대 헤드라인 |
| `typography.display-lg` | 56px | 600 | 1.10 | -1.8px | 섹션 오프너 헤드라인 |
| `typography.display-md` | 40px | 600 | 1.15 | -1.0px | 서브섹션 헤드라인 |
| `typography.headline` | 28px | 600 | 1.20 | -0.6px | 프라이싱 타이틀, CTA 배너 제목 |
| `typography.card-title` | 22px | 500 | 1.25 | -0.4px | 피처 카드 제목 |
| `typography.subhead` | 20px | 400 | 1.40 | -0.2px | 리드 본문, 인트로 단락 |
| `typography.body-lg` | 18px | 400 | 1.50 | -0.1px | 히어로 서브헤드, 리드 단락 |
| `typography.body` | 16px | 400 | 1.50 | -0.05px | 기본 본문 |
| `typography.body-sm` | 14px | 400 | 1.50 | 0 | 카드 본문, 푸터 컬럼 |
| `typography.caption` | 12px | 400 | 1.40 | 0 | 캡션, 메타, 상태 |
| `typography.button` | 14px | 500 | 1.20 | 0 | 모든 버튼 레이블 |
| `typography.eyebrow` | 13px | 500 | 1.30 | +0.4px | 섹션 아이브로우 (양수 자간) |
| `typography.mono` | 13px | 400 | 1.50 | 0 | 제품 스크린샷 내 코드 |

### 원칙

- Display에서 자간을 공격적으로 음수 적용 (-3.0px at 80px ≈ 크기의 4%).
- Display-xl 600 → body 400 — 같은 패밀리, 굵기만 내려간다.
- Eyebrow는 +0.4px 양수 자간 — 음수 자간의 display와 대비되어 분류 역할을 한다.
- Mono는 코드 컨텍스트에서만 사용한다. 마케팅 크롬에는 사용하지 않는다.

---

## Layout

### Spacing

| 토큰 | 값 |
|---|---|
| `spacing.xxs` | 4px |
| `spacing.xs` | 8px |
| `spacing.sm` | 12px |
| `spacing.md` | 16px |
| `spacing.lg` | 24px |
| `spacing.xl` | 32px |
| `spacing.xxl` | 48px |
| `spacing.section` | 96px |

**사용 기준:**
- 피처 / 프라이싱 카드 내부 패딩: `spacing.lg` 24px
- 테스티모니얼 카드 내부 패딩: `spacing.xl` 32px
- CTA 배너 패딩: `spacing.xxl` 48px
- 버튼 패딩: 8px 수직 · 14px 수평
- 인풋 패딩: 8px 수직 · 12px 수평
- 섹션 간격: `spacing.section` 96px

### Grid & Container

- 최대 콘텐츠 너비: **1280px**
- 카드 그리드: 데스크톱 3-up → 태블릿 2-up → 모바일 1-up
- 프라이싱 그리드: 3-up
- 제품 스크린샷 패널: 콘텐츠 전체 너비

### 화이트스페이스 철학

다크 캔버스 자체가 여백이다. 섹션 구분은 흰 여백이 아니라 surface-1 패널로의 리프트로 표현한다.

---

## Elevation & Depth

| 레벨 | 처리 방식 | 용도 |
|---|---|---|
| 0 (flat) | 섀도 없음, 보더 없음 | 본문, 히어로 텍스트, 푸터 |
| 1 | `surface-1` 배경 + 1px `hairline` | 기본 카드, 제품 패널 |
| 2 | `surface-2` 배경 + 1px `hairline-strong` | 추천 프라이싱 카드, 호버 카드 |
| 3 | `surface-3` 배경 | 서브 내비, 드롭다운 메뉴 |
| 4 (포커스) | 2px `primary-focus` 아웃라인 50% 불투명도 | 포커스 인풋, 포커스 버튼 |

> 다크 서피스에서 드롭 섀도는 거의 사용하지 않는다. 계층은 서피스 래더 + 헤어라인 보더로만 표현한다.

---

## Shapes

### Border Radius

| 토큰 | 값 | 용도 |
|---|---|---|
| `rounded.xs` | 4px | 스몰 칩, 상태 배지 |
| `rounded.sm` | 6px | 인라인 태그 |
| `rounded.md` | 8px | 모든 버튼, 폼 인풋 |
| `rounded.lg` | 12px | 프라이싱 카드, 피처 카드, 테스티모니얼 카드 |
| `rounded.xl` | 16px | 제품 스크린샷 패널 |
| `rounded.xxl` | 24px | 오버사이즈 CTA 배너 (드물게 사용) |
| `rounded.pill` | 9999px | 프라이싱 탭 토글, 상태 필 |
| `rounded.full` | 9999px | 아바타 원형 |

---

## Components

### Buttons

**`button-primary`** — 라벤더 CTA.
- bg: `colors.primary`, text: `colors.on-primary`, type: `typography.button`, padding: 8px 14px, radius: `rounded.md`
- Hover: bg → `colors.primary-hover`
- Pressed: bg → `colors.primary-focus`

**`button-secondary`** — 차콜 버튼.
- bg: `colors.surface-1`, text: `colors.ink`, border: 1px `colors.hairline`, type: `typography.button`, padding: 8px 14px, radius: `rounded.md`

**`button-tertiary`** — 플레인 텍스트 버튼.
- bg: `colors.canvas`, text: `colors.ink`, type: `typography.button`, padding: 8px 14px, radius: `rounded.md`

**`button-inverse`** — 화이트 온 다크 인버스 CTA.
- bg: `colors.inverse-canvas`, text: `colors.inverse-ink`, type: `typography.button`, radius: `rounded.md`, padding: 8px 14px

### Cards & Containers

**`feature-card`** — 피처 하이라이트 타일.
- bg: `colors.surface-1`, border: 1px `colors.hairline`, radius: `rounded.lg`, padding: 24px

**`pricing-card`** — 플랜 티어 카드.
- bg: `colors.surface-1`, border: 1px `colors.hairline`, radius: `rounded.lg`, padding: 24px

**`pricing-card-featured`** — 추천 플랜.
- bg: `colors.surface-2`, 나머지 동일

**`product-screenshot-card`** — 제품 스크린샷 패널 (섹션 주인공).
- bg: `colors.surface-1`, border: 1px `colors.hairline`, radius: `rounded.xl`, padding: 24px

**`testimonial-card`** — 고객 인용 카드.
- bg: `colors.surface-1`, border: 1px `colors.hairline`, radius: `rounded.lg`, padding: 32px, type: `typography.body-lg`

**`cta-banner`** — 페이지 하단 CTA 패널.
- bg: `colors.surface-1`, radius: `rounded.lg`, padding: 48px, type: `typography.headline`

### Pricing Tabs

**`pricing-tab-default`**
- bg: `colors.canvas`, text: `colors.ink-subtle`, radius: `rounded.pill`, padding: 6px 14px

**`pricing-tab-selected`**
- bg: `colors.surface-2`, text: `colors.ink`, radius: `rounded.pill`, padding: 6px 14px

### Inputs & Forms

**`text-input`**
- bg: `colors.surface-1`, text: `colors.ink`, type: `typography.body`, radius: `rounded.md`, padding: 8px 12px

**`text-input-focused`**
- 동일 서피스 유지 + 2px `colors.primary-focus` 아웃라인 50% 불투명도

### Status & Badges

**`status-badge`**
- bg: `colors.surface-2`, text: `colors.ink-muted`, type: `typography.caption`, radius: `rounded.pill`, padding: 2px 8px

**`changelog-row`**
- bg: `colors.canvas`, text: `colors.ink`, type: `typography.body`, radius: `rounded.xs`, padding: 24px 0, border-bottom: 1px `colors.hairline`

### Navigation

**`top-nav`**
- bg: `colors.canvas`, text: `colors.ink`, type: `typography.body-sm`, height: 56px
- 좌: 로고 / 중앙: 네비 링크 / 우: `button-secondary` + `button-primary`

### Footer

**`footer`**
- bg: `colors.canvas`, text: `colors.ink-subtle`, type: `typography.caption`, padding: 64px 32px

---

## Responsive Behavior

### Breakpoints

| 이름 | 너비 | 주요 변경 |
|---|---|---|
| Desktop-XL | 1440px | 기본 데스크톱 레이아웃 |
| Desktop | 1280px | 카드 그리드 3-up 유지 |
| Tablet | 1024px | 카드 그리드 3-up → 2-up |
| Mobile-Lg | 768px | 프라이싱 아코디언 / 햄버거 내비 |
| Mobile | 480px | 단일 컬럼 / display-xl 80px → ~36px |

### 축소 전략

- **내비:** 768px 미만에서 햄버거 메뉴로 전환
- **카드 그리드:** 3-up → 2-up (1024px) → 1-up (768px 미만)
- **프라이싱:** 768px 미만에서 티어별 아코디언
- **Display 타입:** `display-xl` 80px → `display-md` 40px 스케일 다운

### 터치 타깃

- CTA 버튼: 최소 40px 탭 높이
- 프라이싱 탭 필: 최소 36px (터치 환경 44px)
- 폼 인풋: 최소 44px 탭 타깃

---

## Do's and Don'ts

### Do

- `colors.canvas` (#010102)를 시스템의 앵커 서피스로 유지한다. 미세 블루 틴트는 의도된 것이다.
- `colors.primary` 라벤더는 브랜드 마크, 프라이머리 CTA, 포커스 링, 링크 강조에만 사용한다.
- 네 단계 서피스 래더로 계층을 표현한다. 단계를 건너뛰지 않는다.
- Display 굵기는 600, body는 400을 기본으로 한다. 700 이상은 사용하지 않는다.
- Display에서 자간을 공격적으로 음수 적용한다.
- 섹션마다 제품 UI 스크린샷을 주인공으로 배치한다.
- CTA 버튼에는 `rounded.md` 8px 코너를 적용한다.

### Don't

- 라이트 모드 페이지를 만들지 않는다.
- 라벤더를 섹션 배경이나 카드 필로 사용하지 않는다.
- 두 번째 크로매틱 액센트(오렌지, 핑크, 그린 등)를 추가하지 않는다.
- 대기 그라디언트나 스포트라이트 카드를 추가하지 않는다.
- CTA를 필 형태(pill-round)로 만들지 않는다.
- 캔버스로 `#000000` 순수 블랙을 사용하지 않는다.
- 제품 스크린샷 모크업에 복수의 밝은 액센트를 조합하지 않는다.

---

## Tailwind CSS 구현

이 디자인 시스템의 모든 토큰은 `tailwind.config.ts`의 theme extension으로 등록한다.
컴포넌트 코드에서는 Tailwind 유틸리티 클래스를 직접 사용하며, 임의의 하드코딩된 색상값(`#5e6ad2` 등)을 클래스명 안에 직접 쓰지 않는다.

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand & Accent
        primary: {
          DEFAULT: '#5e6ad2',   // colors.primary
          hover:   '#828fff',   // colors.primary-hover
          focus:   '#5e69d1',   // colors.primary-focus
          on:      '#ffffff',   // colors.on-primary (프라이머리 버튼 텍스트)
        },
        'brand-secure': '#7a7fad', // colors.brand-secure

        // Surface
        // surface-1~4 헥스값은 Linear CSS 변수에서 추출한 근사치.
        // 실제 값 확정 시 이 파일에서 일괄 수정할 것.
        canvas: '#010102',
        surface: {
          1: '#0e0f11',
          2: '#1a1b1e',
          3: '#232428',
          4: '#2c2e33',
        },
        hairline: {
          DEFAULT:  '#23252a', // colors.hairline (원본 스펙 확인값)
          strong:   '#333640', // colors.hairline-strong (근사치)
          tertiary: '#3a3d44', // colors.hairline-tertiary (근사치)
        },
        'inverse-canvas': '#ffffff',
        'inverse-surface': {
          1: '#f5f5f5',
          2: '#ebebeb',
        },

        // Text
        ink: {
          DEFAULT:  '#f7f8f8', // colors.ink
          muted:    '#d0d6e0', // colors.ink-muted
          subtle:   '#8a8f98', // colors.ink-subtle
          tertiary: '#62666d', // colors.ink-tertiary
        },
        'inverse-ink': '#0e0f11',

        // Semantic — 원본 토큰명(semantic-success → bg-semantic-success) 유지
        semantic: {
          success: '#27a644', // colors.semantic-success
          overlay: '#000000', // colors.semantic-overlay
        },
      },

      fontFamily: {
        display: [
          'Inter',
          'SF Pro Display',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        sans: [
          'Inter',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SF Mono',
          'Menlo',
          'monospace',
        ],
      },

      fontSize: {
        // display-xl: 80px / lh 1.05 / ls -3px
        'display-xl': ['80px', { lineHeight: '1.05', letterSpacing: '-3px' }],
        // display-lg: 56px / lh 1.10 / ls -1.8px
        'display-lg': ['56px', { lineHeight: '1.10', letterSpacing: '-1.8px' }],
        // display-md: 40px / lh 1.15 / ls -1px
        'display-md': ['40px', { lineHeight: '1.15', letterSpacing: '-1px' }],
        // headline: 28px / lh 1.20 / ls -0.6px
        headline: ['28px', { lineHeight: '1.20', letterSpacing: '-0.6px' }],
        // card-title: 22px / lh 1.25 / ls -0.4px
        'card-title': ['22px', { lineHeight: '1.25', letterSpacing: '-0.4px' }],
        // subhead: 20px / lh 1.40 / ls -0.2px
        subhead: ['20px', { lineHeight: '1.40', letterSpacing: '-0.2px' }],
        // body-lg: 18px / lh 1.50 / ls -0.1px
        'body-lg': ['18px', { lineHeight: '1.50', letterSpacing: '-0.1px' }],
        // body: 16px / lh 1.50 / ls -0.05px
        body: ['16px', { lineHeight: '1.50', letterSpacing: '-0.05px' }],
        // body-sm: 14px / lh 1.50
        'body-sm': ['14px', { lineHeight: '1.50', letterSpacing: '0' }],
        // caption: 12px / lh 1.40
        caption: ['12px', { lineHeight: '1.40', letterSpacing: '0' }],
        // button: 14px / lh 1.20 / weight 500
        button: ['14px', { lineHeight: '1.20', letterSpacing: '0' }],
        // eyebrow: 13px / lh 1.30 / ls +0.4px
        eyebrow: ['13px', { lineHeight: '1.30', letterSpacing: '0.4px' }],
        // mono: 13px / lh 1.50
        mono: ['13px', { lineHeight: '1.50', letterSpacing: '0' }],
      },

      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },

      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        pill: '9999px',
        full: '9999px',
      },

      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

### 컴포넌트별 Tailwind 클래스 매핑

#### Buttons

```tsx
// button-primary
<button className="bg-primary text-primary-on text-button font-medium px-[14px] py-2 rounded-md hover:bg-primary-hover active:bg-primary-focus transition-colors">
  Get started
</button>

// button-secondary
<button className="bg-surface-1 text-ink text-button font-medium px-[14px] py-2 rounded-md border border-hairline hover:bg-surface-2 transition-colors">
  Sign in
</button>

// button-tertiary
<button className="bg-canvas text-ink text-button font-medium px-[14px] py-2 rounded-md hover:bg-surface-1 transition-colors">
  Learn more
</button>
```

#### Cards

```tsx
// feature-card
<div className="bg-surface-1 border border-hairline rounded-lg p-lg">
  ...
</div>

// product-screenshot-card
<div className="bg-surface-1 border border-hairline rounded-xl p-lg">
  ...
</div>

// pricing-card
<div className="bg-surface-1 border border-hairline rounded-lg p-lg">
  ...
</div>

// pricing-card-featured
<div className="bg-surface-2 border border-hairline-strong rounded-lg p-lg">
  ...
</div>

// cta-banner
<div className="bg-surface-1 border border-hairline rounded-lg p-xxl">
  ...
</div>
```

#### Typography

```tsx
// 히어로 헤드라인
<h1 className="font-display text-display-xl font-semibold text-ink">
  Build for scale
</h1>

// 섹션 헤드라인
<h2 className="font-display text-display-lg font-semibold text-ink">
  Features
</h2>

// 아이브로우
<p className="text-eyebrow font-medium text-ink-subtle uppercase tracking-widest">
  Product
</p>

// 본문
<p className="text-body text-ink-muted">
  ...
</p>

// 캡션 / 메타
<span className="text-caption text-ink-subtle">
  ...
</span>
```

#### Form Inputs

```tsx
// text-input
<input
  className="
    bg-surface-1 text-ink text-body
    px-sm py-xs rounded-md
    border border-hairline
    focus:outline-none focus:ring-2 focus:ring-primary-focus/50
    placeholder:text-ink-subtle
    w-full
  "
/>
```

#### Status Badge

```tsx
<span className="bg-surface-2 text-ink-muted text-caption rounded-pill px-2 py-0.5">
  완료
</span>
```

#### Layout

```tsx
// 페이지 컨테이너
<div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">

// 섹션 간격
<section className="py-section">

// 카드 그리드 (3-up → 2-up → 1-up)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
```

---

### 전역 CSS (`src/index.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    background-color: #010102; /* colors.canvas */
    color: #f7f8f8;            /* colors.ink */
  }

  body {
    font-family: theme('fontFamily.sans');
    font-size: theme('fontSize.body[0]');
    line-height: 1.5;
  }

  /* 포커스 링 전역 초기화 — 개별 컴포넌트에서 명시 */
  *:focus-visible {
    outline: 2px solid rgb(94 105 209 / 0.5); /* primary-focus 50% */
    outline-offset: 2px;
  }
}
```

---

## Known Gaps

- 네 단계 서피스 래더 값은 Linear의 `--color-bg-level-3` 등 CSS 변수에서 추출. Linear의 정식 서피스 스펙이다.
- 인풋 에러 / 유효성 검사 스타일은 검토된 페이지에서 확인되지 않았다.
- 라이트 모드는 문서화하지 않는다 — 마케팅 사이트는 라이트 테마를 제공하지 않는다.
- Linear의 실제 제품 UI는 이슈 우선순위, 프로젝트 레이블용 컬러 태그(red, orange, yellow, green, blue, purple)를 사용하지만 이는 제품 인터페이스 내부에만 해당한다.
- 커스텀 Display / Text / Mono 패밀리는 비공개 배포. 오픈소스 대체 폰트 사용 가능.
