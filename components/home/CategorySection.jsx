// 카테고리 섹션 — 떡 카테고리 6개를 카드 형태로 표시
// 사용자가 원하는 카테고리의 상품을 빠르게 탐색할 수 있도록 지원

import { categories } from '@/lib/categories'
import Link from 'next/link'

export default function CategorySection() {
  // 'all' 카테고리는 제외하고 나머지 6개만 표시
  const displayCategories = categories.filter(cat => cat.id !== 'all')

  return (
    <div>
      {/* 섹션 타이틀 */}
      <h2 className="text-heading-2 font-display text-chestnut mb-8 text-center">
        카테고리별 떡 찾기
      </h2>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="bg-white rounded-card p-6 text-center hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* 카테고리 아이콘 */}
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>

            {/* 카테고리 이름 */}
            <h3 className="text-body font-medium text-chestnut">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
