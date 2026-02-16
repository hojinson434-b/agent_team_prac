// 메인 홈 페이지 — 히어로 배너, 카테고리, 인기 상품, 추천 업체
// 섹션 간 그라데이션 구분선으로 시각적 흐름 개선
// 다크모드 대응 완료

import HeroBanner from '@/components/home/HeroBanner'
import CategorySection from '@/components/home/CategorySection'
import PopularProducts from '@/components/home/PopularProducts'
import FeaturedVendors from '@/components/home/FeaturedVendors'

export default function HomePage() {
  return (
    <div className="bg-cream dark:bg-sesame min-h-screen">
      {/* 히어로 배너 */}
      <HeroBanner />

      {/* 섹션 구분선 — 그라데이션 라인 */}
      <div className="h-px bg-gradient-to-r from-transparent via-caramel to-transparent" />

      {/* 카테고리 섹션 */}
      <section className="bg-cream dark:bg-sesame py-16">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <CategorySection />
        </div>
      </section>

      {/* 섹션 구분선 — 그라데이션 라인 */}
      <div className="h-px bg-gradient-to-r from-transparent via-caramel to-transparent" />

      {/* 인기 상품 섹션 */}
      <section className="bg-rice dark:bg-chestnut/10 py-16">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <PopularProducts />
        </div>
      </section>

      {/* 섹션 구분선 — 그라데이션 라인 */}
      <div className="h-px bg-gradient-to-r from-transparent via-caramel to-transparent" />

      {/* 추천 업체 섹션 */}
      <section className="bg-cream dark:bg-sesame py-16">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <FeaturedVendors />
        </div>
      </section>
    </div>
  )
}
