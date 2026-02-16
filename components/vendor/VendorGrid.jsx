// 업체 그리드 컴포넌트 — VendorCard를 그리드 형태로 배치
// 용도: 업체 목록을 반응형 그리드로 표시

import VendorCard from './VendorCard'

export default function VendorGrid({ vendors }) {
  // 빈 배열 처리
  if (!vendors || vendors.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-body text-caramel dark:text-injeolmi">등록된 업체가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  )
}
