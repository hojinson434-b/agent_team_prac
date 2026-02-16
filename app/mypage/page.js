'use client'

// 마이페이지 — 떡담 플랫폼
// 회원정보, 찜 목록, 주문 내역 탭으로 구성
// 비로그인 시 로그인 안내 표시

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { products } from '@/lib/products'
import { formatPrice, getLocalStorage } from '@/lib/utils'

export default function MyPage() {
  const router = useRouter()
  const { user, logout, isLoggedIn } = useAuth()
  const { wishlistItems, toggleWishlist } = useWishlist()

  // 활성 탭: 'info', 'wishlist', 'orders'
  const [activeTab, setActiveTab] = useState('info')

  // 주문 내역 (localStorage에서 읽기)
  const [orders, setOrders] = useState([])

  // 주문 내역 로드
  useEffect(() => {
    if (isLoggedIn()) {
      const savedOrders = getLocalStorage('tteokdam_orders', [])
      setOrders(savedOrders)
    }
  }, [isLoggedIn])

  // 로그아웃 핸들러
  const handleLogout = () => {
    if (confirm('로그아웃하시겠습니까?')) {
      logout()
      router.push('/')
    }
  }

  // 찜한 상품 데이터 가져오기
  const wishlistProducts = wishlistItems
    .map(item => products.find(p => p.id === item.id))
    .filter(Boolean) // null/undefined 제거

  // 비로그인 시 안내 화면
  if (!isLoggedIn()) {
    return (
      <main className="bg-cream min-h-screen py-12 px-4">
        <div className="max-w-content mx-auto text-center">
          <div className="bg-white rounded-card shadow-warm-md p-12">
            <h1 className="font-display text-heading-2 text-chestnut mb-4">
              로그인이 필요합니다
            </h1>
            <p className="text-body text-chestnut-light mb-8">
              마이페이지를 이용하려면 로그인해주세요.
            </p>
            <Link href="/auth">
              <Button variant="primary" size="lg">
                로그인하기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-cream min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <h1 className="font-display text-heading-2 md:text-heading-1 text-chestnut mb-8">
          마이페이지
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 사이드바 (데스크톱) / 탭 (모바일) */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white rounded-card shadow-warm-sm p-4">
              <button
                onClick={() => setActiveTab('info')}
                className={`w-full text-left px-4 py-3 rounded-button text-body font-medium transition-all duration-300 mb-2 ${
                  activeTab === 'info'
                    ? 'bg-honey text-white'
                    : 'text-chestnut hover:bg-rice'
                }`}
              >
                회원정보
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full text-left px-4 py-3 rounded-button text-body font-medium transition-all duration-300 mb-2 ${
                  activeTab === 'wishlist'
                    ? 'bg-honey text-white'
                    : 'text-chestnut hover:bg-rice'
                }`}
              >
                찜 목록
                {wishlistProducts.length > 0 && (
                  <Badge variant="best" size="sm" className="ml-2">
                    {wishlistProducts.length}
                  </Badge>
                )}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-3 rounded-button text-body font-medium transition-all duration-300 ${
                  activeTab === 'orders'
                    ? 'bg-honey text-white'
                    : 'text-chestnut hover:bg-rice'
                }`}
              >
                주문 내역
                {orders.length > 0 && (
                  <Badge variant="default" size="sm" className="ml-2">
                    {orders.length}
                  </Badge>
                )}
              </button>
            </nav>
          </aside>

          {/* 콘텐츠 영역 */}
          <div className="flex-1">
            {/* 회원정보 탭 */}
            {activeTab === 'info' && (
              <div className="bg-white rounded-card shadow-warm-sm p-8">
                <h2 className="font-display text-heading-3 text-chestnut mb-6">
                  회원정보
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-caption text-caramel mb-1">
                      이름
                    </label>
                    <p className="text-body text-sesame font-medium">
                      {user?.name || '이름 없음'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-caption text-caramel mb-1">
                      이메일
                    </label>
                    <p className="text-body text-sesame font-medium">
                      {user?.email || '이메일 없음'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-caption text-caramel mb-1">
                      가입일
                    </label>
                    <p className="text-body text-sesame">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('ko-KR')
                        : '-'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-injeolmi">
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </div>
              </div>
            )}

            {/* 찜 목록 탭 */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-card shadow-warm-sm p-8">
                <h2 className="font-display text-heading-3 text-chestnut mb-6">
                  찜 목록
                </h2>

                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-body text-chestnut-light mb-4">
                      찜한 상품이 없습니다
                    </p>
                    <Link href="/products">
                      <Button variant="secondary">
                        상품 둘러보기
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map(product => (
                      <div
                        key={product.id}
                        className="bg-rice rounded-card overflow-hidden shadow-warm-sm hover:shadow-warm-hover transition-all duration-300"
                      >
                        {/* 상품 이미지 */}
                        <Link href={`/products/${product.id}`}>
                          <div className="relative aspect-[4/3] bg-injeolmi">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        </Link>

                        {/* 상품 정보 */}
                        <div className="p-4">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-body font-medium text-body text-chestnut mb-1 hover:text-honey transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-caption text-caramel mb-3">
                            {product.weight}
                          </p>
                          <p className="text-body-lg font-bold text-sesame mb-4">
                            {formatPrice(product.price)}
                          </p>

                          {/* 찜 해제 버튼 */}
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            onClick={() => toggleWishlist(product)}
                          >
                            찜 해제
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 주문 내역 탭 */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-card shadow-warm-sm p-8">
                <h2 className="font-display text-heading-3 text-chestnut mb-6">
                  주문 내역
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-body text-chestnut-light mb-4">
                      주문 내역이 없습니다
                    </p>
                    <Link href="/products">
                      <Button variant="secondary">
                        상품 둘러보기
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div
                        key={order.id || index}
                        className="border border-injeolmi rounded-card p-6 hover:border-caramel transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-caption text-caramel mb-1">
                              주문일: {order.date || '-'}
                            </p>
                            <p className="text-body font-medium text-sesame">
                              주문번호: {order.orderNumber || '-'}
                            </p>
                          </div>
                          <Badge
                            variant={
                              order.status === '배송완료'
                                ? 'success'
                                : order.status === '배송중'
                                ? 'best'
                                : 'default'
                            }
                          >
                            {order.status || '주문완료'}
                          </Badge>
                        </div>

                        {/* 주문 상품 목록 */}
                        <div className="border-t border-injeolmi pt-4 space-y-2">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-body text-chestnut">
                                {item.name} x {item.quantity}
                              </span>
                              <span className="text-body text-sesame font-medium">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* 총 금액 */}
                        <div className="border-t border-injeolmi mt-4 pt-4 flex justify-between items-center">
                          <span className="text-body-lg font-bold text-chestnut">
                            총 금액
                          </span>
                          <span className="text-body-lg font-bold text-honey">
                            {formatPrice(order.totalAmount || 0)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
