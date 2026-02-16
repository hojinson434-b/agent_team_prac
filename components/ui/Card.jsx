// 공통 카드 컴포넌트 — 기본, 호버 효과, 플랫 변형 지원
// 용도: 상품 카드, 정보 박스, 콘텐츠 컨테이너 등
// variant로 스타일 변경 (default, hover, flat)

export default function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  // variant별 스타일 — 다크모드 대응 포함
  const variants = {
    // 기본 카드 - 그림자 있음
    default: 'bg-white dark:bg-dark-card rounded-card shadow-warm-sm overflow-hidden',

    // 호버 효과 카드 - 마우스 올리면 살짝 떠오름 (상품 카드용)
    hover: 'bg-white dark:bg-dark-card rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300',

    // 플랫 카드 - 테두리만 있음 (정보 박스용)
    flat: 'bg-white dark:bg-dark-card rounded-card border border-injeolmi dark:border-chestnut-light overflow-hidden'
  }

  return (
    <div
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
