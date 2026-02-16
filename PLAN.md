# 퀄리티 업그레이드 계획 — 서브에이전트 병렬 작업

## 현재 상태 진단

기능은 대부분 구현되어 있음 (13페이지, 23컴포넌트, 5Context 모두 완성).
**문제는 비주얼 퀄리티가 낮다는 것:**

1. **다크모드** — ThemeContext에서 `dark` 클래스는 추가하지만, 컴포넌트에 `dark:` Tailwind 클래스가 없어서 화면 변화 없음
2. **히어로 배너** — 단색 그라데이션 + 텍스트만 있어서 밋밋함
3. **카테고리 섹션** — 이모지 + 텍스트 카드가 전부라 단조로움
4. **봄 꽃떡 톤 부조화** — 색상만 바꿨지만 히어로 배너 등 일부 컴포넌트가 기존 톤 기준으로 설계되어 어색할 수 있음
5. **전체적으로 장식 요소 부족** — 배경 패턴, 구분선, 섹션 간 비주얼 전환 없음

---

## 서브에이전트 병렬 작업 계획 (3개 에이전트)

### 에이전트 A: 다크모드 실제 작동시키기

**작업 범위:**
- `tailwind.config.js`에 `darkMode: 'class'` 설정 추가
- `globals.css`에 다크모드 base 스타일 추가 (body 배경, 텍스트)
- 주요 컴포넌트에 `dark:` 클래스 추가:
  - Header (`dark:bg-sesame`, `dark:text-cream` 등)
  - Footer
  - ProductCard (카드 배경, 텍스트)
  - HeroBanner
  - CategorySection
  - Button (variant별 다크 스타일)
  - Input
  - Modal
  - auth 페이지, cart 페이지, mypage 등

**수정 파일:**
- `tailwind.config.js` (1줄 추가)
- `app/globals.css` (다크모드 base layer)
- `components/layout/Header.jsx`
- `components/layout/Footer.jsx`
- `components/layout/MobileMenu.jsx`
- `components/ui/Button.jsx`
- `components/ui/Input.jsx`
- `components/ui/Card.jsx`
- `components/ui/Modal.jsx`
- `components/ui/Badge.jsx`
- `components/product/ProductCard.jsx`
- `components/product/ProductFilter.jsx`
- `components/home/HeroBanner.jsx`
- `components/home/CategorySection.jsx`
- `components/home/PopularProducts.jsx`
- `components/home/FeaturedVendors.jsx`
- `components/vendor/VendorCard.jsx`
- `components/cart/CartItem.jsx`
- `components/cart/CartSummary.jsx`
- `app/page.js` (bg-cream → dark 대응)
- 각 page 파일들 (bg-cream 사용하는 곳에 dark: 추가)

---

### 에이전트 B: 히어로 배너 + 카테고리 섹션 비주얼 업그레이드

**작업 범위:**

1. **HeroBanner 고급화:**
   - 배경을 Unsplash 떡/디저트 이미지로 교체
   - 반투명 오버레이 (`bg-black/40`) + 텍스트
   - 하단에 통계 바 추가 (상품 수, 업체 수, 평점 등)
   - 봄 꽃떡 톤에 맞게 오버레이 색상 조정

2. **CategorySection 비주얼 강화:**
   - 각 카테고리에 Unsplash 배경 이미지 적용
   - 원형 또는 둥근 카드에 이미지 오버레이 + 텍스트
   - 호버 시 스케일업 + 색상 전환 효과 강화

3. **FeaturedVendors 개선:**
   - 업체 카드에 이미지 영역 확대
   - 대표 상품 미리보기 추가

**수정 파일:**
- `components/home/HeroBanner.jsx` (전면 리디자인)
- `components/home/CategorySection.jsx` (이미지 카드로 변경)
- `components/home/FeaturedVendors.jsx` (비주얼 강화)
- `lib/categories.js` (카테고리별 이미지 URL 추가)

---

### 에이전트 C: 전체 페이지 비주얼 다듬기 + 장식 요소

**작업 범위:**

1. **섹션 간 구분 강화:**
   - 섹션 사이에 물결/곡선 SVG divider 추가
   - 배경색 교차 배치 (cream → white → rice 패턴)

2. **상품 카드 개선:**
   - 호버 시 이미지 위에 "바로보기" 오버레이
   - 할인가 표시 강화 (배경 하이라이트)

3. **About 페이지 비주얼 강화:**
   - 텍스트 중심 → 이미지 + 텍스트 교차 배치

4. **Footer 개선:**
   - SNS 아이콘 추가
   - 뉴스레터 구독 UI 추가

**수정 파일:**
- `app/page.js` (섹션 divider 추가)
- `components/product/ProductCard.jsx` (호버 오버레이)
- `components/layout/Footer.jsx` (SNS + 뉴스레터)
- `app/about/page.js` (비주얼 강화)

---

## 실행 순서

```
[동시 시작]
에이전트 A (다크모드)  ─────────────────→ 완료
에이전트 B (히어로+카테고리) ─────────────→ 완료
에이전트 C (전체 비주얼) ────────────────→ 완료
                                          ↓
                                    [메인] 빌드 검증
                                          ↓
                                    [메인] 충돌 해결
                                          ↓
                                    [메인] 최종 커밋 + 푸시
```

## 주의사항
- 에이전트 A와 B가 HeroBanner.jsx를 동시에 수정할 수 있음 → B가 리디자인하므로 A는 HeroBanner 다크모드를 B 완료 후 적용
- 봄 꽃떡 톤 색상 이름(cream, chestnut, honey 등)은 모든 에이전트가 그대로 사용
- `dark:` 접두사 색상 선택: 배경 `dark:bg-sesame`, 텍스트 `dark:text-cream`, 카드 `dark:bg-chestnut/90` 등
