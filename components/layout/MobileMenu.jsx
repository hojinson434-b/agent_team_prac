// 모바일 메뉴 — 햄버거 메뉴 클릭 시 우측에서 슬라이드 인
'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/contexts/ThemeContext'

export default function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth()
  const { getCartCount } = useCart()
  const { theme, toggleTheme } = useTheme()

  // 메뉴 항목 정의
  const menuItems = [
    { href: '/', label: '홈' },
    { href: '/products', label: '상품' },
    { href: '/vendors', label: '입점 업체' },
    { href: '/about', label: '소개' },
    { href: '/cart', label: `장바구니 (${getCartCount()})` },
  ]

  // 오버레이 클릭 시 메뉴 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // 링크 클릭 시 메뉴 닫기
  const handleLinkClick = () => {
    onClose()
  }

  // 로그아웃 처리
  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-sesame/50 z-50 transition-opacity"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* 메뉴 패널 */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-cream shadow-warm-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-injeolmi">
          <span className="font-display text-heading-3 text-chestnut">떡담</span>

          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-injeolmi rounded-lg transition-colors"
            aria-label="메뉴 닫기"
          >
            <svg
              className="w-6 h-6 text-sesame"
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

        {/* 메뉴 항목들 */}
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="block px-4 py-3 font-body text-body text-sesame hover:bg-injeolmi hover:text-chestnut rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* 구분선 */}
          <div className="border-t border-injeolmi my-4" />

          {/* 사용자 메뉴 */}
          {user ? (
            <>
              <Link
                href="/mypage"
                onClick={handleLinkClick}
                className="block px-4 py-3 font-body text-body text-sesame hover:bg-injeolmi hover:text-chestnut rounded-lg transition-colors"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 font-body text-body text-sesame hover:bg-injeolmi hover:text-chestnut rounded-lg transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="block px-4 py-3 font-body text-body text-sesame hover:bg-injeolmi hover:text-chestnut rounded-lg transition-colors"
            >
              로그인
            </Link>
          )}
        </nav>

        {/* 하단 테마 전환 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-injeolmi">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-injeolmi transition-colors"
            aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}
          >
            <span className="font-body text-body text-sesame">테마 전환</span>
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-honey" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
