// 장바구니 아이템 — 장바구니에서 개별 상품 표시
// 용도: 장바구니 페이지, 주문서 페이지에서 사용
// 이미지, 상품 정보, 수량 조절, 삭제 기능 포함

'use client'

import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { vendors } from '@/lib/vendors'
import { formatPrice } from '@/lib/utils'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  // 업체 정보 찾기
  const vendor = vendors.find(v => v.id === item.vendorId)

  // 수량 증가
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  // 수량 감소
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  // 삭제
  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-card p-4 shadow-warm-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* 상품 이미지 */}
      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={96}
          unoptimized
          className="w-full h-full object-cover rounded-button"
        />
      </div>

      {/* 상품 정보 */}
      <div className="flex-grow">
        <h3 className="text-body-lg font-body font-semibold text-chestnut dark:text-cream mb-1">
          {item.name}
        </h3>
        <p className="text-caption text-sesame dark:text-injeolmi mb-1">
          {item.weight}
        </p>
        {vendor && (
          <p className="text-caption text-caramel">
            {vendor.name}
          </p>
        )}
      </div>

      {/* 수량 조절 */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center border border-caramel dark:border-chestnut-light text-chestnut-light dark:text-injeolmi rounded-button hover:bg-caramel hover:text-white dark:hover:bg-chestnut-light dark:hover:text-cream transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-caramel"
          aria-label="수량 감소"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <span className="text-body font-body font-medium text-chestnut dark:text-cream min-w-[2rem] text-center">
          {item.quantity}
        </span>

        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center border border-caramel dark:border-chestnut-light text-chestnut-light dark:text-injeolmi rounded-button hover:bg-caramel hover:text-white dark:hover:bg-chestnut-light dark:hover:text-cream transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-caramel"
          aria-label="수량 증가"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* 가격 */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        <p className="text-body-lg font-body font-bold text-honey">
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* 삭제 버튼 */}
        <button
          onClick={handleRemove}
          className="text-sesame dark:text-injeolmi hover:text-redbean transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-redbean rounded-button p-1"
          aria-label="상품 삭제"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
