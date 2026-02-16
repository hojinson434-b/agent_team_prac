'use client'

// 장바구니 Context — 떡담 플랫폼
// 장바구니 상태 관리 및 localStorage 연동

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const CartContext = createContext()

const CART_KEY = 'tteokdam_cart'

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage에서 장바구니 데이터 가져오기
  useEffect(() => {
    const savedCart = getLocalStorage(CART_KEY, [])
    setCartItems(savedCart)
    setIsLoaded(true)
  }, [])

  // 장바구니 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      setLocalStorage(CART_KEY, cartItems)
    }
  }, [cartItems, isLoaded])

  /**
   * 장바구니에 상품 추가
   * @param {Object} product - 추가할 상품
   * @param {number} quantity - 수량
   */
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)

      if (existingItem) {
        // 이미 있는 상품이면 수량 증가
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // 새로운 상품 추가
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  /**
   * 장바구니에서 상품 제거
   * @param {number} productId - 제거할 상품 ID
   */
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  /**
   * 상품 수량 업데이트
   * @param {number} productId - 상품 ID
   * @param {number} quantity - 새로운 수량
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  /**
   * 장바구니 전체 비우기
   */
  const clearCart = () => {
    setCartItems([])
  }

  /**
   * 장바구니 총 금액 계산
   * @returns {number} - 총 금액
   */
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  /**
   * 장바구니 상품 총 개수 (수량 포함)
   * @returns {number} - 총 개수
   */
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }

  /**
   * 상품이 장바구니에 있는지 확인
   * @param {number} productId - 상품 ID
   * @returns {boolean}
   */
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * 장바구니 Context Hook
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart는 CartProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
