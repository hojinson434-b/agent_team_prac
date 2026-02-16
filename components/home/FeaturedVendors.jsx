// 추천 업체 섹션 — 인기 업체 3~4개 표시
// 떡담 플랫폼에 입점한 우수 업체를 홍보

import { vendors } from '@/lib/vendors'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'

export default function FeaturedVendors() {
  // 최대 3개 업체만 표시
  const featuredVendors = vendors.slice(0, 3)

  return (
    <div>
      {/* 섹션 타이틀과 전체보기 링크 */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-heading-2 font-display text-chestnut">
          입점 업체
        </h2>
        <Link
          href="/vendors"
          className="text-body text-chestnut-light hover:text-chestnut transition-colors"
        >
          전체보기 →
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

// 업체 카드 컴포넌트
function VendorCard({ vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="bg-white rounded-card shadow-warm-sm p-6 hover:shadow-warm-hover transition-all duration-300 group"
    >
      <div className="flex items-start gap-4">
        {/* 업체 이미지 (원형) */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-cream flex-shrink-0">
          <Image
            src={vendor.image}
            alt={vendor.name}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* 업체 정보 */}
        <div className="flex-1 min-w-0">
          {/* 업체명과 인증 배지 */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-body-lg font-bold text-chestnut group-hover:text-honey transition-colors">
              {vendor.name}
            </h3>
            {vendor.isVerified && (
              <Badge variant="info" size="sm">인증</Badge>
            )}
          </div>

          {/* 업체 설명 */}
          <p className="text-body text-neutral-600 mb-3 line-clamp-2">
            {vendor.description}
          </p>

          {/* 위치와 평점 */}
          <div className="flex items-center gap-4 text-small text-neutral-500 mb-3">
            <span>📍 {vendor.location}</span>
            <span className="flex items-center gap-1">
              <span className="text-honey">★</span>
              <span className="font-medium text-neutral-700">{vendor.rating}</span>
              <span>({vendor.reviewCount})</span>
            </span>
          </div>

          {/* 대표 상품 태그 */}
          <div className="flex flex-wrap gap-2">
            {vendor.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="text-caption bg-cream text-chestnut-light px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
