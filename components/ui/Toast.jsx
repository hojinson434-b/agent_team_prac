// 토스트 알림 컴포넌트 — 성공, 에러, 정보 알림 표시
// 용도: 장바구니 추가, 찜 추가, 에러 메시지 등 사용자 피드백
// ToastProvider로 감싸고, useToast 훅으로 사용
// 여러 토스트 동시 표시 가능, 자동 사라짐

'use client'

import { useState, useEffect, createContext, useContext } from 'react'

// Toast Context 생성
const ToastContext = createContext()

// Toast Provider 컴포넌트
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // 토스트 추가
  const toast = ({ message, type = 'info', duration = 3000 }) => {
    const id = Date.now()

    setToasts((prev) => [...prev, { id, message, type, duration }])

    // duration 후 자동 제거
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  // 토스트 제거
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* 토스트 컨테이너 */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            {...t}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// useToast 훅
export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}

// 개별 Toast 아이템 컴포넌트
function ToastItem({ id, message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  // 마운트 시 애니메이션
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  // type별 스타일 — 다크모드에서도 동일 (강한 색상 유지)
  const types = {
    success: 'bg-mugwort text-white border-l-4 border-songpyeon',
    error: 'bg-redbean text-white',
    info: 'bg-chestnut dark:bg-dark-surface text-white'
  }

  // type별 아이콘
  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }

  return (
    <div
      className={`
        ${types[type]}
        rounded-button shadow-warm-lg px-4 py-3 min-w-[280px] max-w-md
        flex items-center gap-3 pointer-events-auto
        transition-all duration-300
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      {/* 아이콘 */}
      <div className="flex-shrink-0">
        {icons[type]}
      </div>

      {/* 메시지 */}
      <p className="flex-1 text-body font-body">
        {message}
      </p>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="flex-shrink-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1"
        aria-label="알림 닫기"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

// 기본 export (Provider와 훅 모두 export)
export default ToastProvider
