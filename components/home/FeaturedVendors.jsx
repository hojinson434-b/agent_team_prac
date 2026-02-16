// 추천 업체 섹션 — 인기 업체 3개 표시
// 업체 카드에 이미지 영역 확대 + 대표 상품 미리보기
// 다크모드 대응 완료

import { vendors } from '@/lib/vendors'
import { products } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'

export default function FeaturedVendors() {
  // 최대 3개 업체만 표시
  const featuredVendors = vendors.slice(0, 3)

  return (
    <div>
      {/* 섹션 타이틀과 전체보기 링크 */}
      <div className="flex justify-between items-end mb-8">
        <div>
          {/* 장식 라인 */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-mugwort" />
            <span className="text-caption text-mugwort font-body font-medium tracking-wider uppercase">
              VENDORS
            </span>
            <div className="w-8 h-0.5 bg-mugwort" />
          </div>

          <h2 className="text-heading-2 font-display text-chestnut dark:text-cream">
            입점 업체
          </h2>
          <p className="text-body text-chestnut-light dark:text-caramel mt-1">
            떡담이 엄선한 믿을 수 있는 업체
          </p>
        </div>

        {/* 모든 업체 보기 링크 */}
        <Link
          href="/vendors"
          className="text-body text-chestnut-light dark:text-caramel hover:text-mugwort dark:hover:text-mugwort transition-colors font-medium flex items-center gap-1 h-12"
        >
          모든 업체 보기
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* 업체 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </div>
  )
}

// 업체 카드 컴포넌트 — 이미지 확대 + 대표 상품 미리보기
function VendorCard({ vendor }) {
  // 해당 업체의 대표 상품 2개 가져오기
  const vendorProducts = products
    .filter(p => p.vendorId === vendor.id)
    .slice(0, 2)

  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="bg-white dark:bg-chestnut/20 rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover transition-all duration-300 group"
    >
      {/* 업체 대표 이미지 — 확대된 영역 */}
      <div className="relative h-40 overflow-hidden bg-cream dark:bg-sesame/30">
        <Image
          src={vendor.image}
          alt={`${vendor.name} 대표 이미지`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {/* 이미지 위 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-chestnut/40 to-transparent" />

        {/* 인증 배지 — 이미지 위 */}
        {vendor.isVerified && (
          <div className="absolute top-3 right-3">
            <Badge variant="info" size="sm">인증</Badge>
          </div>
        )}
      </div>

      {/* 업체 정보 */}
      <div className="p-5">
        {/* 업체명 */}
        <h3 className="text-body-lg font-bold text-chestnut dark:text-cream group-hover:text-honey transition-colors mb-2">
          {vendor.name}
        </h3>

        {/* 업체 설명 */}
        <p className="text-caption text-chestnut-light dark:text-caramel mb-3 line-clamp-2">
          {vendor.description}
        </p>

        {/* 위치와 평점 */}
        <div className="flex items-center gap-4 text-small text-chestnut-light dark:text-caramel mb-4">
          <span>📍 {vendor.location}</span>
          <span className="flex items-center gap-1">
            <span className="text-honey">★</span>
            <span className="font-medium text-chestnut dark:text-cream">{vendor.rating}</span>
            <span>({vendor.reviewCount})</span>
          </span>
        </div>

        {/* 대표 상품 미리보기 — 작은 원형 이미지 */}
        {vendorProducts.length > 0 && (
          <div className="flex items-center gap-3 pt-3 border-t border-injeolmi/50 dark:border-chestnut-light/30">
            <span className="text-small text-chestnut-light dark:text-caramel">대표 상품</span>
            <div className="flex -space-x-2">
              {vendorProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-chestnut/40"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <span className="text-small text-chestnut-light dark:text-caramel">
              {vendorProducts.map(p => p.name).join(', ')}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
