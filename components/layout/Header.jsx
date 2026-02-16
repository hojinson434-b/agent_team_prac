// 메인 헤더 — 로고, 네비게이션, 장바구니, 로그인, 테마 전환
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/contexts/ThemeContext'
import MobileMenu from './MobileMenu'

export default function Header() {
  const { user } = useAuth()
  const { getCartCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 네비게이션 링크
  const navLinks = [
    { href: '/', label: '홈' },
    { href: '/products', label: '상품' },
    { href: '/vendors', label: '입점 업체' },
    { href: '/about', label: '소개' },
  ]

  const cartCount = getCartCount()

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 border-b border-injeolmi dark:border-chestnut-light ${
        isScrolled ? 'bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-warm-sm' : 'bg-cream dark:bg-dark-bg'
      }`}
    >
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Link
            href="/"
            className="font-display text-heading-3 text-chestnut dark:text-cream hover:text-redbean transition-colors"
          >
            떡담
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-body text-sesame dark:text-injeolmi hover:text-chestnut dark:hover:text-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* 테마 전환 버튼 (데스크톱만) */}
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-injeolmi dark:hover:bg-dark-surface transition-colors"
              aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}
            >
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

            {/* 장바구니 버튼 */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-injeolmi dark:hover:bg-dark-surface transition-colors"
              aria-label={`장바구니 ${cartCount}개 상품`}
            >
              <svg
                className="w-6 h-6 text-sesame dark:text-cream"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-redbean text-white text-small font-bold rounded-full"
                  aria-hidden="true"
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* 로그인/마이페이지 버튼 (데스크톱만) */}
            <Link
              href={user ? '/mypage' : '/auth'}
              className="hidden md:flex items-center gap-2 h-10 px-4 rounded-button font-body text-caption font-medium bg-redbean text-white hover:bg-honey transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {user ? user.name : '로그인'}
            </Link>

            {/* 햄버거 메뉴 버튼 (모바일/태블릿) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-injeolmi dark:hover:bg-dark-surface transition-colors"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6 text-sesame dark:text-cream"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}
