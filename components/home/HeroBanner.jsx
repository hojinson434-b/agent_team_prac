// 히어로 배너 — 메인 페이지 상단 대형 배너
// 배경 이미지 + 반투명 오버레이 + 통계 바 구조
// 떡담 플랫폼의 메인 메시지와 CTA 버튼을 표시

import Link from 'next/link'
import Image from 'next/image'

export default function HeroBanner() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&h=800&fit=crop"
          alt="떡담 히어로 배경 - 아름다운 한국 전통 떡"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        {/* 반투명 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-chestnut/80 to-redbean/60 dark:from-sesame/90 dark:to-chestnut/80" />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative z-10 flex-1 flex items-center">
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
              정성이 담긴 전통 떡을 지금 만나보세요.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-honey text-white rounded-button px-8 py-3 font-body font-medium text-center hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300 h-12 flex items-center justify-center"
              >
                상품 둘러보기
              </Link>
              <Link
                href="/vendors"
                className="bg-transparent border-2 border-injeolmi text-injeolmi rounded-button px-8 py-3 font-body font-medium text-center hover:bg-injeolmi hover:text-chestnut transition-all duration-300 h-12 flex items-center justify-center"
              >
                입점 업체
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 통계 바 */}
      <div className="relative z-10">
        <div className="bg-chestnut/40 dark:bg-sesame/60 backdrop-blur-sm border-t border-injeolmi/20">
          <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12">
              {/* 상품 수 */}
              <div className="flex items-center gap-2 text-cream">
                <span className="text-body-lg font-bold">15+</span>
                <span className="text-caption text-injeolmi/80">상품</span>
              </div>

              {/* 구분선 */}
              <div className="hidden md:block w-px h-6 bg-injeolmi/30" />

              {/* 입점 업체 */}
              <div className="flex items-center gap-2 text-cream">
                <span className="text-body-lg font-bold">6+</span>
                <span className="text-caption text-injeolmi/80">입점 업체</span>
              </div>

              {/* 구분선 */}
              <div className="hidden md:block w-px h-6 bg-injeolmi/30" />

              {/* 평균 평점 */}
              <div className="flex items-center gap-2 text-cream">
                <span className="text-honey">★</span>
                <span className="text-body-lg font-bold">4.8</span>
                <span className="text-caption text-injeolmi/80">평균 평점</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
