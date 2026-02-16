'use client'

// 상품 비교 Context — 떡담 플랫폼
// 상품 비교 상태 관리 및 localStorage 연동 (최대 4개 제한)

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const CompareContext = createContext()

const COMPARE_KEY = 'tteokdam_compare'
const MAX_COMPARE_ITEMS = 4

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage에서 비교 목록 데이터 가져오기
  useEffect(() => {
    const savedCompare = getLocalStorage(COMPARE_KEY, [])
    setCompareItems(savedCompare)
    setIsLoaded(true)
  }, [])

  // 비교 목록 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      setLocalStorage(COMPARE_KEY, compareItems)
    }
  }, [compareItems, isLoaded])

  /**
   * 비교 목록에 상품 추가
   * @param {Object} product - 추가할 상품
   * @returns {boolean} - 성공 여부
   */
  const addToCompare = (product) => {
    let success = false

    setCompareItems(prevItems => {
      // 이미 있는 상품인지 확인
      const isAlreadyInCompare = prevItems.some(item => item.id === product.id)
      if (isAlreadyInCompare) {
        return prevItems
      }

      // 최대 개수 확인
      if (prevItems.length >= MAX_COMPARE_ITEMS) {
        return prevItems
      }

      success = true
      return [...prevItems, product]
    })

    return success
  }

  /**
   * 비교 목록에서 상품 제거
   * @param {number} productId - 제거할 상품 ID
   */
  const removeFromCompare = (productId) => {
    setCompareItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  /**
   * 비교 목록 토글 (있으면 제거, 없으면 추가)
   * @param {Object} product - 상품
   * @returns {boolean} - 추가 성공 여부 (제거 시에는 true)
   */
  const toggleCompare = (product) => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id)
      return true
    } else {
      return addToCompare(product)
    }
  }

  /**
   * 상품이 비교 목록에 있는지 확인
   * @param {number} productId - 상품 ID
   * @returns {boolean}
   */
  const isInCompare = (productId) => {
    return compareItems.some(item => item.id === productId)
  }

  /**
   * 비교 목록 전체 비우기
   */
  const clearCompare = () => {
    setCompareItems([])
  }

  /**
   * 비교 목록 상품 개수
   * @returns {number}
   */
  const getCompareCount = () => {
    return compareItems.length
  }

  /**
   * 비교 목록이 가득 찼는지 확인
   * @returns {boolean}
   */
  const isCompareFull = () => {
    return compareItems.length >= MAX_COMPARE_ITEMS
  }

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    getCompareCount,
    isCompareFull,
    maxItems: MAX_COMPARE_ITEMS,
  }

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

/**
 * 비교 Context Hook
 */
export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare는 CompareProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
