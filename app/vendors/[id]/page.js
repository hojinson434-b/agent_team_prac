'use client'

// 업체 상세 페이지 — 특정 업체의 정보 및 판매 상품 표시
// 용도: 업체의 상세 정보와 해당 업체가 판매하는 모든 떡 상품을 보여줌

import { vendors } from '@/lib/vendors'
import { products } from '@/lib/products'
import ProductGrid from '@/components/product/ProductGrid'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function VendorDetailPage() {
  const params = useParams()
  const vendorId = parseInt(params.id)

  // 업체 찾기
  const vendor = vendors.find((v) => v.id === vendorId)

  // 해당 업체의 상품 필터링
  const vendorProducts = products.filter((p) => p.vendorId === vendorId)

  // 업체를 찾지 못한 경우
  if (!vendor) {
    return (
      <main className="bg-cream min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <h1 className="font-display text-heading-2 text-chestnut mb-4">
              업체를 찾을 수 없습니다
            </h1>
            <p className="text-body text-caramel mb-8">
              존재하지 않거나 삭제된 업체입니다.
            </p>
            <a
              href="/vendors"
              className="inline-block bg-honey text-white px-6 py-3 rounded-button font-body font-medium hover:scale-[1.02] hover:shadow-warm-md transition-all duration-300"
            >
              업체 목록으로 돌아가기
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 업체 정보 섹션 */}
        <div className="bg-white rounded-card shadow-warm-sm p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* 업체 이미지 */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-card overflow-hidden flex-shrink-0 bg-rice mx-auto md:mx-0">
              <Image
                src={vendor.image}
                alt={vendor.name}
                width={160}
                height={160}
                unoptimized
                className="object-cover"
              />
            </div>

            {/* 업체 정보 */}
            <div className="flex-1">
              {/* 업체명 + 인증 배지 */}
              <div className="flex items-center gap-3 mb-3">
                <h1 className="font-display text-heading-2 text-chestnut">
                  {vendor.name}
                </h1>
                {vendor.isVerified && (
                  <Badge variant="success">인증 업체</Badge>
                )}
              </div>

              {/* 위치 + 설립년도 */}
              <p className="text-body text-caramel mb-4">
                {vendor.location} · {vendor.established}년 설립
              </p>

              {/* 업체 설명 */}
              <p className="text-body text-sesame mb-6 leading-relaxed">
                {vendor.description}
              </p>

              {/* 평점 */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-honey text-heading-4">★</span>
                <span className="font-display text-heading-4 text-chestnut">
                  {vendor.rating.toFixed(1)}
                </span>
                <span className="text-body text-caramel">
                  ({vendor.reviewCount.toLocaleString()}개 리뷰)
                </span>
              </div>

              {/* 대표 상품 */}
              <div>
                <h3 className="text-body font-body font-semibold text-chestnut mb-3">
                  대표 상품
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-injeolmi text-chestnut text-body font-body rounded-full px-4 py-2"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 업체 상품 섹션 */}
        <div>
          <h2 className="font-display text-heading-3 text-chestnut mb-6">
            {vendor.name}의 상품 ({vendorProducts.length})
          </h2>

          {vendorProducts.length > 0 ? (
            <ProductGrid products={vendorProducts} />
          ) : (
            <div className="text-center py-16 bg-white rounded-card shadow-warm-sm">
              <p className="text-body text-caramel">
                아직 등록된 상품이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
