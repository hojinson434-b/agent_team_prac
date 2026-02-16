// 떡담 소개 페이지
// 서비스 소개, 브랜드 스토리, 입점 안내, 주요 수치
// 서버 컴포넌트로 작성 ('use client' 불필요)

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <main className="bg-cream min-h-screen">
      {/* 히어로 영역 */}
      <section className="bg-chestnut text-cream py-16 md:py-24">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-display text-heading-1 mb-4">
            떡담, 떡을 담다
          </h1>
          <p className="text-body-lg text-injeolmi max-w-2xl mx-auto">
            여러 업체의 떡을 한곳에서 비교하고 구매할 수 있는 떡 중개 플랫폼
          </p>
        </div>
      </section>

      {/* 서비스 소개 섹션 */}
      <section className="py-16 md:py-20">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-heading-2 text-chestnut text-center mb-12">
            떡담의 서비스
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 서비스 카드 1 */}
            <div className="bg-white rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-honey" aria-hidden="true">
                  🏪
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut mb-3">
                다양한 떡 업체
              </h3>
              <p className="text-body text-chestnut-light">
                전국 각지의 검증된 떡 업체를 한곳에 모았습니다. 전통 떡부터 현대적인 퓨전 떡까지 다양하게 만나보세요.
              </p>
            </div>

            {/* 서비스 카드 2 */}
            <div className="bg-white rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-mugwort/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-mugwort" aria-hidden="true">
                  ⚖️
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut mb-3">
                쉬운 비교
              </h3>
              <p className="text-body text-chestnut-light">
                여러 업체의 상품을 나란히 비교하고, 가격과 품질을 한눈에 확인할 수 있습니다.
              </p>
            </div>

            {/* 서비스 카드 3 */}
            <div className="bg-white rounded-card shadow-warm-sm p-8 text-center hover:shadow-warm-hover transition-all duration-300">
              <div className="w-16 h-16 bg-redbean/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-heading-2 text-redbean" aria-hidden="true">
                  ✅
                </span>
              </div>
              <h3 className="font-display text-heading-4 text-chestnut mb-3">
                안전한 거래
              </h3>
              <p className="text-body text-chestnut-light">
                까다로운 검증 절차를 통과한 업체만 입점합니다. 안심하고 구매하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 섹션 */}
      <section className="py-16 md:py-20 bg-rice">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-card shadow-warm-md p-8 md:p-12">
            <h2 className="font-display text-heading-3 text-chestnut mb-6">
              떡담은 왜 만들어졌나요?
            </h2>

            <div className="space-y-6 text-body text-chestnut-light">
              <p>
                떡은 우리의 소중한 전통 음식입니다. 하지만 현대 사회에서 떡을 구매하기는 생각보다 쉽지 않습니다.
                동네 떡집을 찾기 어렵고, 온라인에서도 여러 업체를 비교하기 번거롭습니다.
              </p>

              <p>
                <strong className="text-sesame font-bold">떡담</strong>은 이러한 불편함을 해결하기 위해 탄생했습니다.
                소비자는 한곳에서 다양한 떡 업체의 상품을 비교하고 구매할 수 있고,
                소규모 떡 업체는 더 많은 고객을 만날 수 있는 기회를 얻습니다.
              </p>

              <p>
                전통 떡의 가치를 지키면서도 현대적인 소비 방식을 접목하여,
                떡 문화가 더욱 활성화되는 데 기여하고자 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 수치 섹션 */}
      <section className="py-16 md:py-20">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="font-display text-heading-2 text-chestnut text-center mb-12">
            떡담의 성과
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* 수치 1 */}
            <div className="text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                15+
              </p>
              <p className="text-body text-chestnut-light">
                등록 상품
              </p>
            </div>

            {/* 수치 2 */}
            <div className="text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                6+
              </p>
              <p className="text-body text-chestnut-light">
                입점 업체
              </p>
            </div>

            {/* 수치 3 */}
            <div className="text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                4.8
              </p>
              <p className="text-body text-chestnut-light">
                평균 평점
              </p>
            </div>

            {/* 수치 4 */}
            <div className="text-center">
              <p className="font-display text-heading-1 text-honey mb-2">
                100%
              </p>
              <p className="text-body text-chestnut-light">
                만족 보장
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 입점 안내 섹션 */}
      <section className="py-16 md:py-20 bg-honey/10">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8">
          <div className="bg-white rounded-card shadow-warm-md p-8 md:p-12 text-center">
            <h2 className="font-display text-heading-3 text-chestnut mb-4">
              떡 업체시라면, 함께해요!
            </h2>
            <p className="text-body text-chestnut-light mb-8 max-w-2xl mx-auto">
              떡담은 전국의 우수한 떡 업체를 모시고 있습니다.
              입점을 원하시는 업체는 간단한 절차를 통해 신청하실 수 있습니다.
              함께 떡 문화를 발전시켜 나가요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>
    </main>
  )
}
