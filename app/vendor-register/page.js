// 업체 입점 신청 페이지 — 새로운 떡집이 떡담에 입점 신청하는 페이지
// 용도: 업체 등록 양식을 제공하고 입점 절차 안내

import VendorRegisterForm from '@/components/vendor/VendorRegisterForm'

export const metadata = {
  title: '업체 입점 신청 - 떡담',
  description: '떡담에 입점하여 전국의 고객에게 당신의 떡을 소개하세요.',
}

export default function VendorRegisterPage() {
  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 헤더 */}
        <div className="text-center mb-12">
          <h1 className="font-display text-heading-1 text-chestnut mb-4">
            업체 입점 신청
          </h1>
          <p className="text-body-lg text-sesame dark:text-injeolmi mb-6 max-w-content-sm mx-auto leading-relaxed">
            떡담에 입점하여 전국의 고객에게 당신의 떡을 소개하세요.
            <br />
            전통의 맛을 현대적으로 연결하는 떡담과 함께 성장하세요.
          </p>
        </div>

        {/* 입점 혜택 안내 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-6 text-center">
            <div className="text-heading-2 text-honey mb-3">📱</div>
            <h3 className="font-display text-heading-4 text-chestnut mb-2">
              온라인 판로 확대
            </h3>
            <p className="text-body text-sesame dark:text-injeolmi">
              전국 고객에게 당신의 떡을 소개하고 판매하세요
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-6 text-center">
            <div className="text-heading-2 text-honey mb-3">🎯</div>
            <h3 className="font-display text-heading-4 text-chestnut mb-2">
              타겟 마케팅 지원
            </h3>
            <p className="text-body text-sesame dark:text-injeolmi">
              떡담의 마케팅 시스템으로 효과적인 홍보가 가능합니다
            </p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-6 text-center">
            <div className="text-heading-2 text-honey mb-3">💼</div>
            <h3 className="font-display text-heading-4 text-chestnut mb-2">
              간편한 주문 관리
            </h3>
            <p className="text-body text-sesame dark:text-injeolmi">
              주문부터 결제까지 통합 관리 시스템을 제공합니다
            </p>
          </div>
        </div>

        {/* 입점 절차 안내 */}
        <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm p-6 md:p-8 mb-8">
          <h2 className="font-display text-heading-3 text-chestnut mb-6">
            입점 절차
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-honey text-white rounded-full flex items-center justify-center font-body font-bold">
                1
              </div>
              <div>
                <h4 className="font-body font-semibold text-chestnut mb-1">
                  입점 신청서 작성
                </h4>
                <p className="text-body text-sesame dark:text-injeolmi">
                  아래 양식을 작성하여 입점 신청을 진행합니다
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-honey text-white rounded-full flex items-center justify-center font-body font-bold">
                2
              </div>
              <div>
                <h4 className="font-body font-semibold text-chestnut mb-1">
                  서류 검토 및 심사
                </h4>
                <p className="text-body text-sesame dark:text-injeolmi">
                  담당자가 제출된 서류를 검토합니다 (영업일 기준 3~5일 소요)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-honey text-white rounded-full flex items-center justify-center font-body font-bold">
                3
              </div>
              <div>
                <h4 className="font-body font-semibold text-chestnut mb-1">
                  계약 및 입점 완료
                </h4>
                <p className="text-body text-sesame dark:text-injeolmi">
                  심사 승인 후 계약을 진행하고 상품을 등록합니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 입점 신청 폼 */}
        <div>
          <h2 className="font-display text-heading-3 text-chestnut mb-6">
            입점 신청서
          </h2>
          <VendorRegisterForm />
        </div>

        {/* 문의 안내 */}
        <div className="mt-12 text-center">
          <p className="text-body text-caramel">
            입점 관련 문의사항이 있으시면{' '}
            <a
              href="mailto:vendor@tteokdam.com"
              className="text-honey underline hover:text-caramel transition-colors"
            >
              vendor@tteokdam.com
            </a>
            으로 연락주세요.
          </p>
        </div>
      </div>
    </main>
  )
}
