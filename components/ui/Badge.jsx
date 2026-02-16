// 배지 컴포넌트 — NEW, BEST, 할인율, 품절 등 상태 표시
// 용도: 상품 카드의 태그, 상태 라벨 등
// variant로 색상 변경, size로 크기 조절

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) {
  // 기본 스타일
  const baseStyles = 'rounded-full font-body font-medium inline-flex items-center justify-center'

  // variant별 스타일 — 다크모드 대응 포함
  const variants = {
    default: 'bg-injeolmi dark:bg-dark-surface text-chestnut dark:text-cream',
    new: 'bg-mugwort text-white',
    best: 'bg-honey text-white',
    discount: 'bg-redbean text-white',
    'sold-out': 'bg-sesame/60 text-white',
    success: 'bg-mugwort text-white'
  }

  // size별 스타일
  const sizes = {
    sm: 'px-2 py-0.5 text-small',
    md: 'px-3 py-1 text-caption'
  }

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  )
}
