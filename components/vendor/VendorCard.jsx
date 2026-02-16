// 업체 카드 컴포넌트 — 업체 목록에서 사용
// 용도: 입점 업체 정보를 카드 형태로 표시
// 업체명, 인증 배지, 설명, 위치, 평점, 대표 상품 태그 포함

import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'

export default function VendorCard({ vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="block bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-6 hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* 상단: 이미지 + 업체명 + 인증 배지 */}
      <div className="flex items-start gap-4 mb-4">
        {/* 업체 이미지 */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-rice dark:bg-dark-surface">
          <Image
            src={vendor.image}
            alt={vendor.name}
            width={80}
            height={80}
            unoptimized
            className="object-cover"
          />
        </div>

        {/* 업체명 + 인증 배지 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-display text-heading-4 text-chestnut dark:text-cream truncate">
              {vendor.name}
            </h3>
            {vendor.isVerified && (
              <Badge variant="success" size="sm">인증</Badge>
            )}
          </div>

          {/* 위치 + 설립년도 */}
          <p className="text-caption text-caramel">
            {vendor.location} · {vendor.established}년 설립
          </p>
        </div>
      </div>

      {/* 설명 (2줄 말줄임) */}
      <p className="text-body text-sesame dark:text-injeolmi mb-4 line-clamp-2">
        {vendor.description}
      </p>

      {/* 평점 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-honey text-body">★</span>
        <span className="font-body font-medium text-chestnut dark:text-cream">
          {vendor.rating.toFixed(1)}
        </span>
        <span className="text-caption text-caramel">
          ({vendor.reviewCount.toLocaleString()}개 리뷰)
        </span>
      </div>

      {/* 대표 상품 태그 (최대 3개) */}
      <div className="flex flex-wrap gap-2">
        {vendor.specialties.slice(0, 3).map((specialty, index) => (
          <span
            key={index}
            className="bg-injeolmi dark:bg-dark-surface text-chestnut dark:text-cream text-caption font-body rounded-full px-3 py-1"
          >
            {specialty}
          </span>
        ))}
      </div>
    </Link>
  )
}
