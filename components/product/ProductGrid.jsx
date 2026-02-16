// 상품 그리드 — 상품 카드 리스트 표시

import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  // 빈 배열 처리
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-injeolmi"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-body text-chestnut-light font-medium mb-2">
          상품이 없습니다
        </p>
        <p className="text-caption text-caramel">
          다른 조건으로 검색해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
