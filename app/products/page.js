// 상품 목록 페이지
'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { products } from '@/lib/products'
import { filterProducts, sortProducts } from '@/lib/utils'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'

function ProductsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // URL에서 현재 필터 값 읽기 (useState 복제 금지!)
  const currentCategory = searchParams.get('category') || 'all'
  const currentSort = searchParams.get('sort') || 'popular'
  const currentSearch = searchParams.get('search') || ''

  // 필터 변경 핸들러
  const handleFilterChange = ({ category, sort, search }) => {
    const params = new URLSearchParams(searchParams)

    // 파라미터 업데이트
    if (category !== undefined) {
      if (category === 'all') {
        params.delete('category')
      } else {
        params.set('category', category)
      }
    }

    if (sort !== undefined) {
      if (sort === 'popular') {
        params.delete('sort')
      } else {
        params.set('sort', sort)
      }
    }

    if (search !== undefined) {
      if (search === '') {
        params.delete('search')
      } else {
        params.set('search', search)
      }
    }

    // URL 업데이트
    const queryString = params.toString()
    router.push(`/products${queryString ? `?${queryString}` : ''}`)
  }

  // 상품 필터링 및 정렬
  let filteredProducts = filterProducts(products, {
    category: currentCategory,
    search: currentSearch
  })

  filteredProducts = sortProducts(filteredProducts, currentSort)

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <div className="mb-8">
          <h1 className="font-display text-heading-2 md:text-heading-1 text-chestnut mb-2">
            전체 상품
          </h1>
          <p className="text-body text-chestnut-light">
            전국 각지의 맛있는 떡을 만나보세요
          </p>
        </div>

        {/* 필터 */}
        <ProductFilter
          onFilterChange={handleFilterChange}
          currentCategory={currentCategory}
          currentSort={currentSort}
          currentSearch={currentSearch}
        />

        {/* 상품 개수 표시 */}
        <div className="mb-4 text-body text-chestnut-light">
          총 <span className="font-bold text-chestnut">{filteredProducts.length}</span>개 상품
        </div>

        {/* 상품 그리드 */}
        <ProductGrid products={filteredProducts} />
      </div>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="bg-cream min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-honey border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-body text-chestnut-light">상품을 불러오는 중...</p>
            </div>
          </div>
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  )
}
