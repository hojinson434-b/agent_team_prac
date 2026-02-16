// 유틸리티 함수 모음 — 떡담 플랫폼

/**
 * 가격 포매팅
 * @param {number} price - 가격
 * @returns {string} - 포매팅된 가격 (예: "15,000원")
 */
export function formatPrice(price) {
  if (typeof price !== 'number') return '0원'
  return price.toLocaleString('ko-KR') + '원'
}

/**
 * 할인율 계산
 * @param {number} originalPrice - 원가
 * @param {number} price - 할인가
 * @returns {string} - 할인율 (예: "17%")
 */
export function getDiscountRate(originalPrice, price) {
  if (!originalPrice || !price || originalPrice <= price) return null
  const rate = Math.round(((originalPrice - price) / originalPrice) * 100)
  return `${rate}%`
}

/**
 * 별점 표시용 배열 생성
 * @param {number} rating - 별점 (0~5)
 * @returns {number[]} - 별 배열 (예: 4.5 → [1,1,1,1,0.5])
 */
export function getStarArray(rating) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < fullStars; i++) {
    stars.push(1)
  }

  if (hasHalfStar && fullStars < 5) {
    stars.push(0.5)
  }

  while (stars.length < 5) {
    stars.push(0)
  }

  return stars
}

/**
 * 상품 필터링
 * @param {Array} products - 전체 상품 배열
 * @param {Object} filters - 필터 옵션 { category, vendorId, search }
 * @returns {Array} - 필터링된 상품 배열
 */
export function filterProducts(products, { category = 'all', vendorId = null, search = '' }) {
  let filtered = [...products]

  // 카테고리 필터
  if (category && category !== 'all') {
    filtered = filtered.filter(product => product.category === category)
  }

  // 업체 필터
  if (vendorId) {
    filtered = filtered.filter(product => product.vendorId === Number(vendorId))
  }

  // 검색 필터 (이름, 설명, 태그에서 검색)
  if (search) {
    const searchLower = search.toLowerCase()
    filtered = filtered.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchLower)
      const nameEnMatch = product.nameEn?.toLowerCase().includes(searchLower)
      const descMatch = product.description.toLowerCase().includes(searchLower)
      const tagsMatch = product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      return nameMatch || nameEnMatch || descMatch || tagsMatch
    })
  }

  return filtered
}

/**
 * 상품 정렬
 * @param {Array} products - 정렬할 상품 배열
 * @param {string} sortBy - 정렬 기준 ('popular', 'price-low', 'price-high', 'newest', 'rating')
 * @returns {Array} - 정렬된 상품 배열
 */
export function sortProducts(products, sortBy = 'popular') {
  const sorted = [...products]

  switch (sortBy) {
    case 'popular':
      // 베스트 상품 우선, 그 다음 리뷰 개수 많은 순
      return sorted.sort((a, b) => {
        if (a.isBest && !b.isBest) return -1
        if (!a.isBest && b.isBest) return 1
        return b.reviewCount - a.reviewCount
      })

    case 'price-low':
      // 낮은 가격순
      return sorted.sort((a, b) => a.price - b.price)

    case 'price-high':
      // 높은 가격순
      return sorted.sort((a, b) => b.price - a.price)

    case 'newest':
      // 신상품 우선, 그 다음 ID 역순
      return sorted.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return b.id - a.id
      })

    case 'rating':
      // 평점 높은 순
      return sorted.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating
        }
        // 평점이 같으면 리뷰 개수 많은 순
        return b.reviewCount - a.reviewCount
      })

    default:
      return sorted
  }
}

/**
 * localStorage에서 안전하게 데이터 읽기
 * @param {string} key - localStorage 키
 * @param {*} defaultValue - 기본값
 * @returns {*} - 읽어온 값 또는 기본값
 */
export function getLocalStorage(key, defaultValue = null) {
  if (typeof window === 'undefined') return defaultValue

  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`localStorage 읽기 오류 (${key}):`, error)
    return defaultValue
  }
}

/**
 * localStorage에 안전하게 데이터 저장
 * @param {string} key - localStorage 키
 * @param {*} value - 저장할 값
 */
export function setLocalStorage(key, value) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`localStorage 저장 오류 (${key}):`, error)
  }
}

/**
 * 랜덤 상품 가져오기
 * @param {Array} products - 전체 상품 배열
 * @param {number} count - 가져올 개수
 * @returns {Array} - 랜덤 상품 배열
 */
export function getRandomProducts(products, count = 4) {
  const shuffled = [...products].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * 상품 ID로 상품 찾기
 * @param {Array} products - 전체 상품 배열
 * @param {number} id - 상품 ID
 * @returns {Object|null} - 찾은 상품 또는 null
 */
export function findProductById(products, id) {
  return products.find(product => product.id === Number(id)) || null
}
