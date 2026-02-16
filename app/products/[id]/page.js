// 상품 상세 페이지
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { products } from '@/lib/products'
import { vendors } from '@/lib/vendors'
import { formatPrice, getDiscountRate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProductCard from '@/components/product/ProductCard'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useCompare } from '@/contexts/CompareContext'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id

  const [imageError, setImageError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { toggleCompare, isInCompare, isCompareFull } = useCompare()

  // 상품 찾기
  const product = products.find(p => p.id === productId)

  // 상품을 찾지 못한 경우
  if (!product) {
    return (
      <main className="bg-cream min-h-screen">
        <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-16">
          <div className="text-center">
            <svg
              className="w-20 h-20 mx-auto mb-4 text-injeolmi"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="font-display text-heading-2 text-chestnut mb-2">
              상품을 찾을 수 없습니다
            </h1>
            <p className="text-body text-chestnut-light mb-8">
              요청하신 상품이 존재하지 않거나 삭제되었습니다
            </p>
            <Link href="/products">
              <Button variant="primary">전체 상품 보기</Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const vendor = vendors.find(v => v.id === product.vendorId)
  const isWishlisted = isInWishlist(product.id)
  const isInCompareList = isInCompare(product.id)
  const discountRate = product.originalPrice ? getDiscountRate(product.originalPrice, product.price) : 0

  // 같은 카테고리 추천 상품 (최대 4개)
  const recommendedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // 수량 변경
  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity)
    }
  }

  // 장바구니 담기
  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  // 찜하기
  const handleToggleWishlist = () => {
    toggleWishlist(product)
  }

  // 비교하기
  const handleToggleCompare = () => {
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
    const hasHalfStar = product.rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-honey">★</span>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-honey">☆</span>
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
    <main className="bg-cream min-h-screen">
      {/* 상품 상세 섹션 */}
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* 좌: 이미지 */}
          <div className="relative aspect-square bg-white rounded-card shadow-warm-sm overflow-hidden">
            <Image
              src={imageError ? 'https://placehold.co/800x800/FDF6EC/8B4513?text=떡' : product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
              onError={() => setImageError(true)}
            />

            {/* 배지 */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge variant="new">NEW</Badge>}
              {product.isBest && <Badge variant="best">BEST</Badge>}
              {discountRate > 0 && (
                <Badge variant="discount">{discountRate}%</Badge>
              )}
            </div>
          </div>

          {/* 우: 정보 */}
          <div>
            {/* 업체명 */}
            {vendor && (
              <Link
                href={`/vendors/${vendor.id}`}
                className="inline-block text-body text-honey hover:text-gold font-medium mb-2 transition-colors"
              >
                {vendor.name}
              </Link>
            )}

            {/* 상품명 */}
            <h1 className="font-display text-heading-2 md:text-heading-1 text-chestnut mb-2">
              {product.name}
            </h1>

            {/* 영문명 */}
            <p className="font-accent text-body text-chestnut-light mb-4">
              {product.nameEn}
            </p>

            {/* 평점 */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-injeolmi">
              <span className="flex text-body-lg">{renderStars()}</span>
              <span className="text-body text-chestnut font-medium">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-body text-caramel">
                ({product.reviewCount}개 리뷰)
              </span>
            </div>

            {/* 가격 */}
            <div className="mb-6">
              {product.originalPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-body text-caramel line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-body-lg font-bold text-redbean">
                    {discountRate}% 할인
                  </span>
                </div>
              )}
              <div className="text-heading-2 font-bold text-chestnut">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* 설명 */}
            <div className="mb-6 pb-6 border-b border-injeolmi">
              <p className="text-body text-chestnut-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* 중량 */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-body text-caramel font-medium">중량</span>
                <span className="text-body text-chestnut font-bold">
                  {product.weight}
                </span>
              </div>
            </div>

            {/* 태그 */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cream text-caramel text-caption rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 수량 선택 */}
            <div className="mb-6">
              <label className="block text-body text-chestnut font-medium mb-2">
                수량
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center border border-injeolmi rounded-lg hover:border-honey hover:text-honey transition-colors"
                  aria-label="수량 감소"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-body-lg font-bold text-chestnut min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center border border-injeolmi rounded-lg hover:border-honey hover:text-honey transition-colors"
                  aria-label="수량 증가"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleAddToCart}
              >
                장바구니 담기
              </Button>
              <Button
                variant={isWishlisted ? 'primary' : 'secondary'}
                onClick={handleToggleWishlist}
                className="sm:w-auto px-6"
              >
                {isWishlisted ? '찜 취소' : '찜하기'}
              </Button>
              <Button
                variant={isInCompareList ? 'primary' : 'secondary'}
                onClick={handleToggleCompare}
                className="sm:w-auto px-6"
              >
                {isInCompareList ? '비교 취소' : '비교하기'}
              </Button>
            </div>
          </div>
        </div>

        {/* 추천 상품 섹션 */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-heading-3 text-chestnut mb-6">
              같은 카테고리 상품
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
