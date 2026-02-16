// 메인 홈 페이지 — 히어로 배너, 카테고리, 인기 상품, 추천 업체
// 떡담 플랫폼의 첫 진입 페이지

import HeroBanner from '@/components/home/HeroBanner'
import CategorySection from '@/components/home/CategorySection'
import PopularProducts from '@/components/home/PopularProducts'
import FeaturedVendors from '@/components/home/FeaturedVendors'

export default function HomePage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* 히어로 배너 */}
      <HeroBanner />

      {/* 카테고리 섹션 */}
      <section className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-16">
        <CategorySection />
      </section>

      {/* 인기 상품 섹션 */}
      <section className="bg-rice py-16">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8">
          <PopularProducts />
        </div>
      </section>

      {/* 추천 업체 섹션 */}
      <section className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-16">
        <FeaturedVendors />
      </section>
    </div>
  )
}
