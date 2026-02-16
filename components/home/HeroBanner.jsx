// 히어로 배너 — 메인 페이지 상단 대형 배너
// 떡담 플랫폼의 메인 메시지와 CTA 버튼을 표시

import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-chestnut to-chestnut-light min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28 lg:py-32 w-full">
        <div className="max-w-content">
          {/* 서브 타이틀 */}
          <p className="text-injeolmi text-body-lg font-body mb-4">
            전통의 맛을 현대의 감각으로
          </p>

          {/* 메인 타이틀 */}
          <h1 className="text-cream text-heading-1 font-display mb-6 whitespace-pre-line">
            여러 업체의 떡을{'\n'}한곳에서 만나보세요
          </h1>

          {/* 설명 */}
          <p className="text-injeolmi/80 text-body-lg mb-8 max-w-[600px]">
            떡담은 전국 최고의 떡 장인들의 상품을 한자리에 모았습니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="bg-honey text-white rounded-button px-8 py-3 font-body font-medium text-center hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300"
            >
              상품 둘러보기
            </Link>
            <Link
              href="/vendors"
              className="bg-transparent border-2 border-injeolmi text-injeolmi rounded-button px-8 py-3 font-body font-medium text-center hover:bg-injeolmi hover:text-chestnut transition-all duration-300"
            >
              입점 업체
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
