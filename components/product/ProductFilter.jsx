// 상품 필터 — 카테고리, 정렬, 검색
'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import { categories } from '@/lib/categories'

export default function ProductFilter({
  onFilterChange,
  currentCategory = 'all',
  currentSort = 'popular',
  currentSearch = ''
}) {
  const [searchValue, setSearchValue] = useState(currentSearch)

  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onFilterChange({ search: value })
  }

  // 카테고리 변경 처리
  const handleCategoryChange = (categoryId) => {
    onFilterChange({ category: categoryId })
  }

  // 정렬 변경 처리
  const handleSortChange = (e) => {
    onFilterChange({ sort: e.target.value })
  }

  return (
    <div className="mb-8 space-y-4">
      {/* 검색바 */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-caramel pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Input
          type="text"
          placeholder="떡 이름으로 검색..."
          value={searchValue}
          onChange={handleSearchChange}
          className="pl-12"
        />
      </div>

      {/* 카테고리 필터 & 정렬 */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* 카테고리 버튼 그룹 */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-body font-medium text-body transition-all duration-300
                ${
                  currentCategory === category.id
                    ? 'bg-honey text-white shadow-warm-sm'
                    : 'bg-white text-chestnut border border-injeolmi hover:border-honey hover:text-honey'
                }
              `}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 정렬 드롭다운 */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-body text-chestnut font-medium whitespace-nowrap">
            정렬:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={handleSortChange}
            className="
              h-12 px-4 pr-10 border border-injeolmi rounded-xl font-body text-body text-chestnut
              bg-white cursor-pointer
              focus:border-honey focus:ring-2 focus:ring-honey/20 outline-none
              transition-all
            "
          >
            <option value="popular">인기순</option>
            <option value="price-low">가격 낮은순</option>
            <option value="price-high">가격 높은순</option>
            <option value="newest">최신순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
      </div>
    </div>
  )
}
