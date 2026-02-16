'use client'

// 찜 목록 Context — 떡담 플랫폼
// 찜 목록 상태 관리 및 localStorage 연동

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const WishlistContext = createContext()

const WISHLIST_KEY = 'tteokdam_wishlist'

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage에서 찜 목록 데이터 가져오기
  useEffect(() => {
    const savedWishlist = getLocalStorage(WISHLIST_KEY, [])
    setWishlistItems(savedWishlist)
    setIsLoaded(true)
  }, [])

  // 찜 목록 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      setLocalStorage(WISHLIST_KEY, wishlistItems)
    }
  }, [wishlistItems, isLoaded])

  /**
   * 찜 목록에 상품 추가
   * @param {Object} product - 추가할 상품
   */
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const isAlreadyInWishlist = prevItems.some(item => item.id === product.id)
      if (isAlreadyInWishlist) {
        return prevItems // 이미 있으면 추가하지 않음
      }
      return [...prevItems, product]
    })
  }

  /**
   * 찜 목록에서 상품 제거
   * @param {number} productId - 제거할 상품 ID
   */
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  /**
   * 찜 목록 토글 (있으면 제거, 없으면 추가)
   * @param {Object} product - 상품
   */
  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  /**
   * 상품이 찜 목록에 있는지 확인
   * @param {number} productId - 상품 ID
   * @returns {boolean}
   */
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  /**
   * 찜 목록 전체 비우기
   */
  const clearWishlist = () => {
    setWishlistItems([])
  }

  /**
   * 찜 목록 상품 개수
   * @returns {number}
   */
  const getWishlistCount = () => {
    return wishlistItems.length
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

/**
 * 찜 목록 Context Hook
 */
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist는 WishlistProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
