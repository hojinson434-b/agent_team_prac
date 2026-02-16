// 비교 카드 — 상품 비교 페이지에서 사용

import Image from 'next/image'
import { useState } from 'react'
import { vendors } from '@/lib/vendors'
import { categories } from '@/lib/categories'
import { formatPrice } from '@/lib/utils'

export default function CompareCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const vendor = vendors.find(v => v.id === product.vendorId)
  const category = categories.find(c => c.id === product.category)

  // 별점 표시
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(product.rating)

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-honey">★</span>
        )
      } else {
        stars.push(
          <span key={i} className="text-injeolmi">★</span>
        )
      }
    }
    return stars
  }

  return (
    <div className="bg-white rounded-card shadow-warm-sm p-4">
      {/* 이미지 */}
      <div className="relative aspect-square bg-cream rounded-lg overflow-hidden mb-4">
        <Image
          src={imageError ? 'https://placehold.co/400x400/FDF6EC/8B4513?text=떡' : product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          unoptimized
          onError={() => setImageError(true)}
        />
      </div>

      {/* 상품 정보 */}
      <div className="space-y-3">
        {/* 상품명 */}
        <h3 className="font-body font-bold text-body text-chestnut line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>

        {/* 가격 */}
        <div className="flex items-baseline gap-2">
          <span className="text-body-lg font-bold text-redbean">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-caption text-caramel line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* 정보 테이블 */}
        <div className="border-t border-injeolmi pt-3 space-y-2">
          {/* 업체명 */}
          <div className="flex justify-between text-small">
            <span className="text-caramel">업체</span>
            <span className="text-chestnut font-medium">
              {vendor ? vendor.name : '-'}
            </span>
          </div>

          {/* 중량 */}
          <div className="flex justify-between text-small">
            <span className="text-caramel">중량</span>
            <span className="text-chestnut font-medium">{product.weight}</span>
          </div>

          {/* 평점 */}
          <div className="flex justify-between text-small">
            <span className="text-caramel">평점</span>
            <span className="flex items-center gap-1">
              <span className="flex text-small">{renderStars()}</span>
              <span className="text-chestnut font-medium">
                {product.rating.toFixed(1)}
              </span>
            </span>
          </div>

          {/* 카테고리 */}
          <div className="flex justify-between text-small">
            <span className="text-caramel">카테고리</span>
            <span className="text-chestnut font-medium">
              {category ? category.name : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
