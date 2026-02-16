// 주문서 페이지 — 배송 정보 입력 및 주문 확인
// 용도: 장바구니에서 주문하기 클릭 시 배송 정보 입력
// URL: /checkout

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { vendors } from '@/lib/vendors'
import { formatPrice } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, getCartTotal, clearCart } = useCart()

  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    memo: 'door',
  })

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 상품 금액
  const productTotal = getCartTotal()

  // 배송비 계산 (50,000원 이상 무료)
  const SHIPPING_FEE = 3000
  const FREE_SHIPPING_THRESHOLD = 50000
  const shippingFee = productTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE

  // 총 결제 금액
  const finalTotal = productTotal + shippingFee

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 결제하기 버튼 클릭
  const handleSubmit = (e) => {
    e.preventDefault()

    // 간단한 유효성 검사
    if (!formData.name || !formData.phone || !formData.address) {
      alert('필수 정보를 모두 입력해주세요.')
      return
    }

    // 모달 열기
    setIsModalOpen(true)
  }

  // 모달 확인 버튼 클릭 (주문 완료)
  const handleConfirmOrder = () => {
    // 장바구니 비우기
    clearCart()
    // 모달 닫기
    setIsModalOpen(false)
    // 홈으로 이동
    router.push('/')
  }

  // 장바구니가 비어있으면
  if (cartItems.length === 0) {
    return (
      <main className="bg-cream dark:bg-dark-bg min-h-screen">
        <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="bg-white dark:bg-dark-card rounded-card p-12 shadow-warm-sm text-center">
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
              주문할 상품이 없습니다
            </h2>

            <p className="text-body text-sesame mb-6">
              장바구니에 상품을 담아주세요.
            </p>

            <Link href="/products">
              <Button variant="primary" size="lg">
                쇼핑하러 가기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <h1 className="text-heading-1 font-display text-chestnut mb-8">
          주문서
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 좌측: 배송 정보 폼 */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-card p-6 shadow-warm-sm">
              <h2 className="text-heading-3 font-display text-chestnut mb-6">
                배송 정보
              </h2>

              <div className="space-y-4">
                {/* 수령인 이름 */}
                <Input
                  label="수령인 이름"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                {/* 연락처 */}
                <Input
                  label="연락처"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                {/* 우편번호 */}
                <Input
                  label="우편번호"
                  id="zipcode"
                  name="zipcode"
                  type="text"
                  placeholder="12345"
                  value={formData.zipcode}
                  onChange={handleChange}
                />

                {/* 주소 */}
                <Input
                  label="주소"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="서울시 강남구 테헤란로 123"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                {/* 상세주소 */}
                <Input
                  label="상세주소"
                  id="addressDetail"
                  name="addressDetail"
                  type="text"
                  placeholder="아파트 동호수, 건물명 등"
                  value={formData.addressDetail}
                  onChange={handleChange}
                />

                {/* 배송 메모 */}
                <div>
                  <label
                    htmlFor="memo"
                    className="block text-body font-body font-medium text-chestnut dark:text-cream mb-2"
                  >
                    배송 메모
                  </label>
                  <select
                    id="memo"
                    name="memo"
                    value={formData.memo}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-injeolmi dark:border-chestnut-light rounded-button font-body text-body text-sesame dark:text-cream bg-white dark:bg-dark-card focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 transition-all duration-200"
                  >
                    <option value="door">문 앞에 놔주세요</option>
                    <option value="security">경비실에 맡겨주세요</option>
                    <option value="direct">직접 받을게요</option>
                    <option value="call">배송 전 연락주세요</option>
                  </select>
                </div>
              </div>

              {/* 결제하기 버튼 (모바일에서만 표시) */}
              <div className="mt-6 lg:hidden">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  결제하기
                </Button>
              </div>
            </form>
          </div>

          {/* 우측: 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-card rounded-card p-6 shadow-warm-sm sticky top-24">
              <h2 className="text-heading-3 font-display text-chestnut mb-6">
                주문 상품
              </h2>

              {/* 상품 목록 */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map(item => {
                  const vendor = vendors.find(v => v.id === item.vendorId)
                  return (
                    <div key={item.id} className="flex items-start gap-3 pb-3 border-b border-injeolmi dark:border-chestnut-light last:border-0">
                      <div className="flex-grow">
                        <p className="text-body font-body font-medium text-chestnut">
                          {item.name}
                        </p>
                        <p className="text-caption text-sesame">
                          {vendor?.name} • {item.weight}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-caption text-sesame">
                          {item.quantity}개
                        </p>
                        <p className="text-body font-body font-semibold text-honey">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 금액 정보 */}
              <div className="space-y-3 mb-6">
                {/* 상품 금액 */}
                <div className="flex items-center justify-between text-body font-body text-sesame">
                  <span>상품 금액</span>
                  <span>{formatPrice(productTotal)}</span>
                </div>

                {/* 배송비 */}
                <div className="flex items-center justify-between text-body font-body text-sesame">
                  <span>배송비</span>
                  <span className={shippingFee === 0 ? 'text-honey font-semibold' : ''}>
                    {shippingFee === 0 ? '무료' : formatPrice(shippingFee)}
                  </span>
                </div>

                {/* 구분선 */}
                <div className="border-t border-injeolmi dark:border-chestnut-light my-4"></div>

                {/* 총 결제 금액 */}
                <div className="flex items-center justify-between text-body-lg font-body font-bold text-chestnut dark:text-cream">
                  <span>총 결제 금액</span>
                  <span className="text-honey">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* 결제하기 버튼 (데스크톱에서만 표시) */}
              <div className="hidden lg:block">
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  결제하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 결제 안내 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="결제 안내"
        size="md"
      >
        <div className="text-center">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-honey"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <p className="text-body font-body text-sesame mb-6 leading-relaxed">
            결제 기능은 개발 중입니다.<br />
            빠른 시일 내 서비스하겠습니다.
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={handleConfirmOrder}
            className="w-full"
          >
            확인
          </Button>
        </div>
      </Modal>
    </main>
  )
}
