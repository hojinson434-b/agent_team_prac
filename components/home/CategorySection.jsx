// 카테고리 섹션 — 배경 이미지가 있는 카드 형태로 카테고리 표시
// 호버 시 오버레이가 밝아지고 스케일업 효과 적용
// 사용자가 원하는 카테고리의 상품을 빠르게 탐색할 수 있도록 지원

import { categories } from '@/lib/categories'
import Link from 'next/link'
import Image from 'next/image'

export default function CategorySection() {
  // 'all' 카테고리는 제외하고 나머지만 표시
  const displayCategories = categories.filter(cat => cat.id !== 'all')

  return (
    <div>
      {/* 섹션 타이틀 */}
      <h2 className="text-heading-2 font-display text-chestnut dark:text-cream mb-8 text-center">
        카테고리별 떡 찾기
      </h2>

      {/* 카테고리 그리드 — 이미지 카드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayCategories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="relative rounded-card overflow-hidden group h-40 md:h-48 lg:h-52"
          >
            {/* 배경 이미지 */}
            <Image
              src={category.image}
              alt={`${category.name} 카테고리`}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* 반투명 오버레이 — 호버 시 밝아짐 */}
            <div className="absolute inset-0 bg-chestnut/50 dark:bg-sesame/60 group-hover:bg-chestnut/30 dark:group-hover:bg-sesame/40 transition-all duration-300" />

            {/* 카테고리 정보 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              {/* 카테고리 아이콘 */}
              <span className="text-4xl mb-2 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>

              {/* 카테고리 이름 */}
              <h3 className="text-body-lg font-bold text-cream drop-shadow-lg">
                {category.name}
              </h3>

              {/* 카테고리 설명 — 데스크톱에서만 표시 */}
              <p className="hidden md:block text-caption text-injeolmi/90 mt-1 drop-shadow-lg">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
