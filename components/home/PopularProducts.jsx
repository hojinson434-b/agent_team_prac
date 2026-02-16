// 인기 상품 섹션 — isBest인 상품 4~6개 표시
// 사용자에게 베스트셀러 상품을 빠르게 노출

'use client'

import { products } from '@/lib/products'
import { formatPrice, getDiscountRate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { useState } from 'react'

export default function PopularProducts() {
  // isBest 상품만 필터링하여 최대 4개
  const bestProducts = products.filter(product => product.isBest).slice(0, 4)

  return (
    <div>
      {/* 섹션 타이틀과 전체보기 링크 */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-heading-2 font-display text-chestnut">
          인기 떡 상품
        </h2>
        <Link
          href="/products"
          className="text-body text-chestnut-light hover:text-chestnut transition-colors"
        >
          전체보기 →
        </Link>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// 상품 카드 컴포넌트
function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const discountRate = getDiscountRate(product.originalPrice, product.price)

  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* 상품 이미지 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={imageError ? 'https://placehold.co/600x450/FDF6EC/9C6644?text=떡' : product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
          onError={() => setImageError(true)}
        />

        {/* 배지 */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isNew && (
            <Badge variant="success">NEW</Badge>
          )}
          {product.isBest && (
            <Badge variant="warning">BEST</Badge>
          )}
        </div>

        {/* 할인율 */}
        {discountRate && (
          <div className="absolute top-3 right-3 bg-redbean text-white text-small font-bold px-2 py-1 rounded">
            {discountRate}
          </div>
        )}
      </div>

      {/* 상품 정보 */}
      <div className="p-4">
        {/* 상품명 */}
        <h3 className="text-body font-medium text-chestnut mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* 가격 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-body-lg font-bold text-chestnut">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-small text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* 평점 */}
        <div className="flex items-center gap-1 text-small text-neutral-600">
          <span className="text-honey">★</span>
          <span className="font-medium">{product.rating}</span>
          <span className="text-neutral-400">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  )
}
