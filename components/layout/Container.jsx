// 콘텐츠 컨테이너 — 반복되는 래퍼 컴포넌트
// 페이지 콘텐츠의 최대 너비와 수평 패딩을 일관되게 적용

export default function Container({ children, size = 'wide', className = '' }) {
  // size별 스타일 정의
  const sizes = {
    wide: 'max-w-wide mx-auto px-4 md:px-6 lg:px-8',      // 1280px (기본)
    content: 'max-w-content mx-auto px-4 md:px-6 lg:px-8', // 960px
    narrow: 'max-w-2xl mx-auto px-4 md:px-6'               // 42rem (672px)
  }

  return (
    <div className={`${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
