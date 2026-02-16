// 메인 푸터 — 브랜드 소개, 링크, 연락처
// 정적 콘텐츠이므로 'use client' 불필요

import Link from 'next/link'

export default function Footer() {
  // 현재 연도
  const currentYear = new Date().getFullYear()

  // 서비스 링크
  const serviceLinks = [
    { href: '/products', label: '상품' },
    { href: '/vendors', label: '입점 업체' },
    { href: '/compare', label: '상품비교' },
    { href: '/notices', label: '공지사항' },
  ]

  // 고객지원 링크
  const supportLinks = [
    { href: '/faq', label: '자주 묻는 질문' },
    { href: '/shipping', label: '배송 안내' },
    { href: '/returns', label: '반품/교환' },
    { href: '/terms', label: '이용약관' },
  ]

  // 입점안내 링크
  const vendorLinks = [
    { href: '/vendor/apply', label: '입점 신청' },
    { href: '/vendor/fees', label: '수수료 안내' },
    { href: '/vendor/guide', label: '판매자 가이드' },
  ]

  return (
    <footer className="bg-chestnut text-cream">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* 메인 콘텐츠 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="space-y-4">
            <h2 className="font-display text-heading-3 text-cream">떡담</h2>
            <p className="font-body text-body text-injeolmi leading-relaxed">
              여러 업체의 떡을 한곳에서<br />
              비교하고 구매할 수 있는<br />
              떡 중개 판매 플랫폼
            </p>
          </div>

          {/* 서비스 섹션 */}
          <div>
            <h3 className="font-body font-bold text-body-lg text-cream mb-4">
              서비스
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body text-injeolmi hover:text-honey transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객지원 섹션 */}
          <div>
            <h3 className="font-body font-bold text-body-lg text-cream mb-4">
              고객지원
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body text-injeolmi hover:text-honey transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 입점안내 섹션 */}
          <div>
            <h3 className="font-body font-bold text-body-lg text-cream mb-4">
              입점안내
            </h3>
            <ul className="space-y-2">
              {vendorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body text-injeolmi hover:text-honey transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-chestnut-light my-8" />

        {/* 하단 카피라이트 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-caption text-injeolmi text-center md:text-left">
            © {currentYear} 떡담. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-body text-caption text-injeolmi hover:text-honey transition-colors"
            >
              개인정보처리방침
            </Link>
            <span className="text-injeolmi">·</span>
            <Link
              href="/contact"
              className="font-body text-caption text-injeolmi hover:text-honey transition-colors"
            >
              문의하기
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
