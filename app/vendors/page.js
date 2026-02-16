// 입점 업체 목록 페이지 — 떡담에 입점한 전체 업체 표시
// 용도: 사용자가 다양한 떡집을 탐색하고 선택할 수 있도록 함

import { vendors } from '@/lib/vendors'
import VendorGrid from '@/components/vendor/VendorGrid'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata = {
  title: '입점 업체 - 떡담',
  description: '떡담에 입점한 전국의 맛집 떡집들을 만나보세요.',
}

export default function VendorsPage() {
  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 헤더: 제목 + 입점 신청 버튼 */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-heading-2 md:text-heading-1 text-chestnut mb-2">
              입점 업체
            </h1>
            <p className="text-body text-caramel">
              전국의 맛집 떡집 {vendors.length}곳과 함께합니다
            </p>
          </div>
          <Link href="/vendor-register">
            <Button variant="primary" size="md">
              입점 신청
            </Button>
          </Link>
        </div>

        {/* 업체 그리드 */}
        <VendorGrid vendors={vendors} />
      </div>
    </main>
  )
}
