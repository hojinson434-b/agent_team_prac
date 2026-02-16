// 상품 비교 페이지 — 최대 4개 상품 비교
// 용도: 사용자가 선택한 상품들을 나란히 비교
// URL: /compare

'use client'

import { useCompare } from '@/contexts/CompareContext'
import { products } from '@/lib/products'
import { vendors } from '@/lib/vendors'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()

  // compareItems의 id로 실제 상품 데이터 가져오기
  const compareProducts = compareItems
    .map(item => products.find(p => p.id === item.id))
    .filter(Boolean)

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-heading-1 font-display text-chestnut">
            상품 비교
          </h1>

          {/* 전체 비우기 버튼 */}
          {compareProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-caption text-caramel hover:text-redbean transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-redbean rounded-button px-3 py-1"
            >
              전체 비우기
            </button>
          )}
        </div>

        {/* 비교 목록이 비어있을 때 */}
        {compareProducts.length === 0 ? (
          <div className="bg-white rounded-card p-12 shadow-warm-sm text-center">
            <svg
              className="w-24 h-24 mx-auto mb-6 text-injeolmi"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>

            <h2 className="text-heading-3 font-display text-chestnut mb-3">
              비교할 상품이 없습니다
            </h2>

            <p className="text-body text-sesame mb-6">
              상품 페이지에서 비교 버튼을 클릭하여<br />
              최대 4개까지 비교할 수 있습니다.
            </p>

            <Link href="/products">
              <Button variant="primary" size="lg">
                상품 둘러보기
              </Button>
            </Link>
          </div>
        ) : (
          /* 비교 목록이 있을 때 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {compareProducts.map(product => {
              const vendor = vendors.find(v => v.id === product.vendorId)

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-card shadow-warm-sm overflow-hidden flex flex-col"
                >
                  {/* 상품 이미지 */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* 상품 정보 */}
                  <div className="p-4 flex-grow flex flex-col">
                    {/* 상품명 */}
                    <h3 className="text-body-lg font-body font-semibold text-chestnut mb-2">
                      {product.name}
                    </h3>

                    {/* 비교 항목들 */}
                    <div className="space-y-3 flex-grow">
                      {/* 가격 */}
                      <div>
                        <p className="text-caption text-sesame mb-1">가격</p>
                        <p className="text-body-lg font-body font-bold text-honey">
                          {formatPrice(product.price)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-caption text-caramel line-through">
                            {formatPrice(product.originalPrice)}
                          </p>
                        )}
                      </div>

                      {/* 업체 */}
                      <div>
                        <p className="text-caption text-sesame mb-1">업체</p>
                        <p className="text-body font-body text-chestnut">
                          {vendor?.name || '-'}
                        </p>
                      </div>

                      {/* 중량 */}
                      <div>
                        <p className="text-caption text-sesame mb-1">중량</p>
                        <p className="text-body font-body text-chestnut">
                          {product.weight}
                        </p>
                      </div>

                      {/* 평점 */}
                      <div>
                        <p className="text-caption text-sesame mb-1">평점</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {/* 별 표시 */}
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-honey fill-honey'
                                    : 'text-injeolmi'
                                }`}
                                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="text-caption text-sesame">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      {/* 카테고리 */}
                      <div>
                        <p className="text-caption text-sesame mb-1">카테고리</p>
                        <p className="text-body font-body text-chestnut">
                          {product.category === 'traditional' && '전통떡'}
                          {product.category === 'seasonal' && '계절떡'}
                          {product.category === 'premium' && '프리미엄'}
                          {product.category === 'rice-cake' && '떡케이크'}
                          {product.category === 'gift' && '선물세트'}
                        </p>
                      </div>

                      {/* 태그 */}
                      {product.tags && product.tags.length > 0 && (
                        <div>
                          <p className="text-caption text-sesame mb-1">태그</p>
                          <div className="flex flex-wrap gap-1">
                            {product.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-rice text-caption text-caramel rounded-button"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 버튼 */}
                    <div className="mt-4 space-y-2">
                      <Link href={`/products/${product.id}`} className="block">
                        <Button variant="primary" size="md" className="w-full">
                          상세보기
                        </Button>
                      </Link>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => removeFromCompare(product.id)}
                        className="w-full"
                      >
                        비교에서 제거
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
