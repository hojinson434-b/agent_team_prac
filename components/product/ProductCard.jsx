// 상품 카드 — 목록에서 개별 상품 표시
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCompare } from '@/contexts/CompareContext'
import { vendors } from '@/lib/vendors'
import { formatPrice, getDiscountRate } from '@/lib/utils'

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { toggleCompare, isInCompare, isCompareFull } = useCompare()

  const vendor = vendors.find(v => v.id === product.vendorId)
  const isWishlisted = isInWishlist(product.id)
  const isInCompareList = isInCompare(product.id)
  const discountRate = product.originalPrice ? getDiscountRate(product.originalPrice, product.price) : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    toggleWishlist(product)
  }

  const handleToggleCompare = (e) => {
    e.preventDefault()
    if (!isInCompareList && isCompareFull()) {
      alert('최대 3개 상품까지 비교할 수 있습니다.')
      return
    }
    toggleCompare(product)
  }

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
    <div className="bg-white rounded-card shadow-warm-sm overflow-hidden hover:shadow-warm-hover hover:-translate-y-1 transition-all duration-300">
      <Link href={`/products/${product.id}`}>
        {/* 이미지 영역 */}
        <div className="relative aspect-[4/3] bg-cream">
          <Image
            src={imageError ? 'https://placehold.co/600x450/FDF6EC/8B4513?text=떡' : product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
            onError={() => setImageError(true)}
          />

          {/* 배지 오버레이 */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge variant="new">NEW</Badge>}
            {product.isBest && <Badge variant="best">BEST</Badge>}
            {discountRate > 0 && (
              <Badge variant="discount">{discountRate}%</Badge>
            )}
          </div>

          {/* 찜 하트 아이콘 */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            aria-label={isWishlisted ? '찜 취소' : '찜하기'}
          >
            <svg
              className={`w-5 h-5 transition-colors ${
                isWishlisted ? 'fill-redbean text-redbean' : 'fill-none text-chestnut'
              }`}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </Link>

      {/* 정보 영역 */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          {/* 업체명 */}
          {vendor && (
            <p className="text-caption text-caramel mb-1">{vendor.name}</p>
          )}

          {/* 상품명 */}
          <h3 className="text-body font-medium text-chestnut mb-2 line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>

          {/* 가격 */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-body-lg font-bold text-redbean">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-caption text-caramel line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* 평점 */}
          <div className="flex items-center gap-1 mb-4">
            <span className="flex">{renderStars()}</span>
            <span className="text-caption text-chestnut">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>
        </Link>

        {/* 버튼 영역 */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            장바구니
          </Button>
          <Button
            variant={isInCompareList ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleToggleCompare}
            className="px-3"
          >
            비교
          </Button>
        </div>
      </div>
    </div>
  )
}
