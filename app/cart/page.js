// 장바구니 페이지 — 장바구니 상품 목록 및 주문 요약
// 용도: 사용자가 담은 상품 확인 및 수량 조절, 주문 진행
// URL: /cart

'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { cartItems, clearCart } = useCart()

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <h1 className="text-heading-1 font-display text-chestnut mb-8">
          장바구니
        </h1>

        {/* 장바구니가 비어있을 때 */}
        {cartItems.length === 0 ? (
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            <h2 className="text-heading-3 font-display text-chestnut mb-3">
              장바구니가 비어있습니다
            </h2>

            <p className="text-body text-sesame mb-6">
              맛있는 떡을 담아보세요!
            </p>

            <Link href="/products">
              <Button variant="primary" size="lg">
                쇼핑하러 가기
              </Button>
            </Link>
          </div>
        ) : (
          /* 장바구니에 상품이 있을 때 */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 좌측: 장바구니 상품 목록 */}
            <div className="lg:col-span-2">
              {/* 전체 삭제 버튼 */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-body text-sesame">
                  총 <span className="font-semibold text-honey">{cartItems.length}</span>개 상품
                </p>
                <button
                  onClick={clearCart}
                  className="text-caption text-caramel hover:text-redbean transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-redbean rounded-button px-3 py-1"
                >
                  전체 삭제
                </button>
              </div>

              {/* 상품 목록 */}
              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* 우측: 주문 요약 */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
