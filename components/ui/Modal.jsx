// 모달 컴포넌트 — 팝업, 확인 다이얼로그, 상세 정보 표시
// 용도: 장바구니 추가 확인, 결제 안내, 상품 상세 등
// ESC 키, 오버레이 클릭으로 닫기 가능, body scroll 방지

'use client'

import { useEffect } from 'react'

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) {
  // 모달이 열리지 않았으면 렌더링하지 않음
  if (!isOpen) return null

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // body scroll 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // size별 너비
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  }

  // 오버레이 클릭 시 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    // 오버레이
    <div
      className="fixed inset-0 bg-sesame/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* 모달 본체 */}
      <div
        className={`bg-white rounded-card shadow-warm-lg mx-4 max-h-[90vh] overflow-y-auto w-full ${sizes[size]}`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-injeolmi">
          <h2
            id="modal-title"
            className="text-heading-3 font-display text-chestnut"
          >
            {title}
          </h2>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="text-sesame hover:text-chestnut transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-caramel rounded-button p-1"
            aria-label="모달 닫기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
