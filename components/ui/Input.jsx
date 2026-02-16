// 공통 입력 필드 컴포넌트 — 텍스트, 이메일, 패스워드, 검색 등 지원
// 용도: 폼 입력, 검색창 등 전체 사이트에서 사용되는 입력 필드
// label, error 메시지, 다양한 input type 지원

export default function Input({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  className = '',
  ...props
}) {
  // 입력 필드 기본 스타일 — 다크모드 대응 포함
  const inputStyles = `
    w-full h-12 px-4 border rounded-button font-body text-body text-sesame dark:text-cream bg-white dark:bg-dark-card
    focus:outline-none transition-all duration-200
    placeholder:text-caramel/50
    ${error
      ? 'border-redbean focus:border-redbean focus:ring-2 focus:ring-redbean/20'
      : 'border-injeolmi dark:border-chestnut-light focus:border-caramel focus:ring-2 focus:ring-caramel/20'
    }
  `

  return (
    <div className={`w-full ${className}`}>
      {/* label이 있으면 렌더링 */}
      {label && (
        <label
          htmlFor={id}
          className="block text-body font-body font-medium text-chestnut dark:text-cream mb-2"
        >
          {label}
        </label>
      )}

      {/* 입력 필드 */}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputStyles}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {/* 에러 메시지 */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-caption text-redbean"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
