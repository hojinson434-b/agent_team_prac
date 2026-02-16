// 떡담 소개 페이지
// 히어로 이미지 + 이미지-텍스트 교차 배치 + 숫자 통계 + 입점 안내
// 서버 컴포넌트 ('use client' 불필요 — 상태/이벤트 없음)

import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen">

      {/* 히어로 섹션 — 배경 이미지 + 반투명 오버레이 */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1200&h=400&fit=crop"
          alt="떡담 소개 히어로 이미지"
          fill
          className="object-cover"
          unoptimized
          priority
        />
        {/* 반투명 오버레이 */}
        <div className="absolute inset-0 bg-chestnut/60" />
        {/* 타이틀 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-heading-1 text-white mb-4">
            떡담 소개
          </h1>
          <p className="text-body-lg text-injeolmi max-w-2xl mx-auto">
            여러 업체의 떡을 한곳에서 비교하고 구매할 수 있는 떡 중개 플랫폼
          </p>
        </div>
      </section>

      {/* 섹션 1: 좌측 이미지 + 우측 텍스트 (떡담이란?) */}
      <section className="py-16 md:py-20">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 좌측 이미지 */}
            <div className="relative aspect-[3/2] rounded-card overflow-hidden shadow-warm-md">
              <Image
                src="https://placehold.co/600x400/FFF5F5/C04B6D?text=떡담"
                alt="떡담이란 - 전통 떡 이미지"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* 우측 텍스트 */}
            <div>
              <h2 className="font-display text-heading-2 text-chestnut dark:text-cream mb-6">
                떡담이란?
              </h2>
              <div className="space-y-4 text-body text-chestnut-light dark:text-caramel">
                <p>
                  떡은 우리의 소중한 전통 음식입니다. 하지만 현대 사회에서 떡을 구매하기는 생각보다 쉽지 않습니다.
                  동네 떡집을 찾기 어렵고, 온라인에서도 여러 업체를 비교하기 번거롭습니다.
                </p>
                <p>
                  <strong className="text-sesame dark:text-cream font-bold">떡담</strong>은 이러한 불편함을 해결하기 위해 탄생했습니다.
                  소비자는 한곳에서 다양한 떡 업체의 상품을 비교하고 구매할 수 있고,
                  소규모 떡 업체는 더 많은 고객을 만날 수 있는 기회를 얻습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 2: 좌측 텍스트 + 우측 이미지 (우리의 약속) */}
      <section className="py-16 md:py-20 bg-rice dark:bg-dark-card">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 좌측 텍스트 (모바일에서는 이미지 아래로) */}
            <div className="order-2 md:order-1">
              <h2 className="font-display text-heading-2 text-chestnut dark:text-cream mb-6">
                우리의 약속
              </h2>
              <div className="space-y-4 text-body text-chestnut-light dark:text-caramel">
                <p>
                  전통 떡의 가치를 지키면서도 현대적인 소비 방식을 접목하여,
                  떡 문화가 더욱 활성화되는 데 기여하고자 합니다.
                </p>
                <p>
                  까다로운 검증 절차를 통과한 업체만 입점시켜 품질을 보장하며,
                  공정한 가격과 투명한 거래를 약속합니다.
                </p>
                <p>
                  여러 업체의 상품을 나란히 비교하고, 가격과 품질을 한눈에 확인할 수 있어
                  소비자가 현명한 선택을 할 수 있도록 돕겠습니다.
                </p>
              </div>
            </div>

            {/* 우측 이미지 */}
            <div className="relative aspect-[3/2] rounded-card overflow-hidden shadow-warm-md order-1 md:order-2">
              <Image
                src="https://placehold.co/600x400/FFF0F3/9B7DB8?text=우리의+약속"
                alt="우리의 약속 - 품질 보장 이미지"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 소개 카드 섹션 */}
      <section className="py-16 md:py-20">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-heading-2 text-chestnut dark:text-cream text-center mb-12">
            떡담의 서비스
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 서비스 카드 1 */}
            <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-honey" aria-hidden="true">
                  🏪
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut dark:text-cream mb-3">
                다양한 떡 업체
              </h3>
              <p className="text-body text-chestnut-light dark:text-caramel">
                전국 각지의 검증된 떡 업체를 한곳에 모았습니다. 전통 떡부터 현대적인 퓨전 떡까지 다양하게 만나보세요.
              </p>
            </div>

            {/* 서비스 카드 2 */}
            <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-mugwort/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-mugwort" aria-hidden="true">
                  ⚖️
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut dark:text-cream mb-3">
                쉬운 비교
              </h3>
              <p className="text-body text-chestnut-light dark:text-caramel">
                여러 업체의 상품을 나란히 비교하고, 가격과 품질을 한눈에 확인할 수 있습니다.
              </p>
            </div>

            {/* 서비스 카드 3 */}
            <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-redbean/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-redbean" aria-hidden="true">
                  ✅
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut dark:text-cream mb-3">
                안전한 거래
              </h3>
              <p className="text-body text-chestnut-light dark:text-caramel">
                까다로운 검증 절차를 통과한 업체만 입점합니다. 안심하고 구매하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 숫자 통계 섹션 */}
      <section className="py-16 md:py-20 bg-rice dark:bg-dark-card">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-heading-2 text-chestnut dark:text-cream text-center mb-12">
            떡담의 성과
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* 수치 카드 1 */}
            <div className="bg-white dark:bg-dark-surface rounded-card shadow-warm-sm p-6 text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                15+
              </p>
              <p className="text-body text-chestnut-light dark:text-caramel">
                등록 상품
              </p>
            </div>

            {/* 수치 카드 2 */}
            <div className="bg-white dark:bg-dark-surface rounded-card shadow-warm-sm p-6 text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                6+
              </p>
              <p className="text-body text-chestnut-light dark:text-caramel">
                입점 업체
              </p>
            </div>

            {/* 수치 카드 3 */}
            <div className="bg-white dark:bg-dark-surface rounded-card shadow-warm-sm p-6 text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                100+
              </p>
              <p className="text-body text-chestnut-light dark:text-caramel">
                고객 리뷰
              </p>
            </div>

            {/* 수치 카드 4 */}
            <div className="bg-white dark:bg-dark-surface rounded-card shadow-warm-sm p-6 text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                4.8
              </p>
              <p className="text-body text-chestnut-light dark:text-caramel">
                평균 평점
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 3: 좌측 이미지 + 우측 텍스트 (입점 안내) */}
      <section className="py-16 md:py-20">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 좌측 이미지 */}
            <div className="relative aspect-[3/2] rounded-card overflow-hidden shadow-warm-md">
              <Image
                src="https://placehold.co/600x400/F5DDE0/4A2040?text=입점+안내"
                alt="입점 안내 - 함께하는 떡 업체"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* 우측 텍스트 + CTA 버튼 */}
            <div>
              <h2 className="font-display text-heading-2 text-chestnut dark:text-cream mb-6">
                떡 업체시라면, 함께해요!
              </h2>
              <div className="space-y-4 text-body text-chestnut-light dark:text-caramel mb-8">
                <p>
                  떡담은 전국의 우수한 떡 업체를 모시고 있습니다.
                  입점을 원하시는 업체는 간단한 절차를 통해 신청하실 수 있습니다.
                </p>
                <p>
                  함께 떡 문화를 발전시켜 나가요.
                  소규모 업체도 환영합니다.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vendor-register">
                  <Button variant="primary" size="lg">
                    입점 신청하기
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button variant="secondary" size="lg">
                    입점 업체 보기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
