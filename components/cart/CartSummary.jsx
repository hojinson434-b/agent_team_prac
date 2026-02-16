// 장바구니 요약 — 총 금액, 배송비, 결제 버튼
// 용도: 장바구니 페이지에서 사용되는 주문 요약 컴포넌트
// sticky로 스크롤 시 상단 고정

'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartSummary() {
  const { cartItems, getCartTotal } = useCart()

  // 상품 금액
  const productTotal = getCartTotal()

  // 배송비 계산 (50,000원 이상 무료)
  const SHIPPING_FEE = 3000
  const FREE_SHIPPING_THRESHOLD = 50000
  const shippingFee = productTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE

  // 총 결제 금액
  const finalTotal = productTotal + shippingFee

  // 무료배송까지 남은 금액
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - productTotal

  return (
    <div className="bg-white dark:bg-dark-card rounded-card p-6 shadow-warm-sm sticky top-24">
      {/* 타이틀 */}
      <h2 className="text-heading-3 font-display text-chestnut dark:text-cream mb-6">
        주문 요약
      </h2>

      {/* 금액 정보 */}
      <div className="space-y-3 mb-6">
        {/* 상품 금액 */}
        <div className="flex items-center justify-between text-body font-body text-sesame dark:text-injeolmi">
          <span>상품 금액</span>
          <span>{formatPrice(productTotal)}</span>
        </div>

        {/* 배송비 */}
        <div className="flex items-center justify-between text-body font-body text-sesame dark:text-injeolmi">
          <span>배송비</span>
          <span className={shippingFee === 0 ? 'text-honey font-semibold' : ''}>
            {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
          </span>
        </div>

        {/* 무료배송 안내 */}
        {shippingFee > 0 && remainingForFreeShipping > 0 && (
          <div className="text-caption text-caramel bg-rice dark:bg-dark-surface p-3 rounded-button">
            {formatPrice(remainingForFreeShipping)} 더 구매하시면 무료배송!
          </div>
        )}

        {/* 구분선 */}
        <div className="border-t border-injeolmi dark:border-chestnut-light my-4"></div>

        {/* 총 결제 금액 */}
        <div className="flex items-center justify-between text-body-lg font-body font-bold text-chestnut dark:text-cream">
          <span>총 결제 금액</span>
          <span className="text-honey">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3">
        {/* 주문하기 버튼 */}
        <Link href="/checkout" className="block">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
          >
            주문하기
          </Button>
        </Link>

        {/* 계속 쇼핑하기 링크 */}
        <Link
          href="/products"
          className="block text-center text-body font-body text-caramel hover:text-chestnut transition-colors duration-200"
        >
          계속 쇼핑하기
        </Link>
      </div>

      {/* 안내 사항 */}
      <div className="mt-6 p-4 bg-cream dark:bg-dark-surface rounded-button">
        <p className="text-caption text-sesame dark:text-injeolmi leading-relaxed">
          • 신선한 떡 배송을 위해 주문 후 2~3일 소요됩니다.<br />
          • 명절 기간에는 배송이 지연될 수 있습니다.
        </p>
      </div>
    </div>
  )
}
