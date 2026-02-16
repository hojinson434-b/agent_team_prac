// 공통 버튼 컴포넌트 — Primary, Secondary, Ghost, Danger 변형 지원
// 용도: 전체 사이트에서 사용되는 재사용 가능한 버튼 컴포넌트
// variant로 스타일 변경, size로 크기 조절, disabled 상태 지원

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  // 기본 스타일
  const baseStyles = 'font-body font-medium transition-all duration-300 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

  // variant별 스타일 — 다크모드 대응 포함
  const variants = {
    primary: 'bg-honey text-white rounded-button hover:scale-[1.02] hover:shadow-warm-md focus:ring-honey',
    secondary: 'border border-caramel dark:border-chestnut-light text-chestnut-light dark:text-injeolmi rounded-button hover:bg-caramel hover:text-white dark:hover:bg-chestnut-light dark:hover:text-cream focus:ring-caramel',
    ghost: 'text-chestnut-light dark:text-injeolmi hover:bg-rice dark:hover:bg-dark-surface rounded-button focus:ring-rice',
    danger: 'bg-redbean text-white rounded-button hover:opacity-90 focus:ring-redbean'
  }

  // size별 스타일 (터치 영역 확보)
  const sizes = {
    sm: 'px-4 py-2 text-caption h-10',
    md: 'px-6 py-3 text-body h-12',
    lg: 'px-8 py-4 text-body-lg h-14'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
