'use client'

// 공지사항 페이지 — 떡담 플랫폼
// 아코디언 방식으로 공지사항 펼침/접기
// 카테고리별 배지 표시

import { useState } from 'react'
import Badge from '@/components/ui/Badge'

// 공지사항 데이터 (하드코딩)
const notices = [
  {
    id: 1,
    title: '떡담 서비스 오픈 안내',
    date: '2026-02-15',
    category: '공지',
    content: `떡담 서비스가 정식 오픈되었습니다!

전국의 우수한 떡 업체들이 한곳에 모여, 고객 여러분께 최상의 떡을 제공합니다.

앞으로도 더 나은 서비스를 위해 노력하겠습니다. 많은 이용 부탁드립니다.`,
  },
  {
    id: 2,
    title: '설 명절 배송 일정 안내',
    date: '2026-02-10',
    category: '배송',
    content: `설 명절 기간 배송 일정을 안내드립니다.

• 2월 20일 ~ 2월 23일: 배송 지연 가능
• 2월 24일부터 정상 배송 재개

명절 기간에는 주문이 폭주하여 배송이 지연될 수 있습니다.
여유를 두고 주문해주시기 바랍니다.`,
  },
  {
    id: 3,
    title: '신규 입점 업체 소개',
    date: '2026-02-08',
    category: '업체',
    content: `새롭게 입점한 업체를 소개합니다.

• 한밭떡방: 대전 지역 전통 떡 전문점
• 송편마을: 송편 특화 제조 업체

두 업체 모두 엄격한 검증 절차를 거쳐 입점하였습니다.
신규 업체의 상품도 많은 관심 부탁드립니다.`,
  },
  {
    id: 4,
    title: '이벤트: 첫 주문 10% 할인',
    date: '2026-02-05',
    category: '이벤트',
    content: `떡담 오픈 기념 첫 주문 10% 할인 이벤트를 진행합니다.

• 기간: 2026년 2월 5일 ~ 2월 28일
• 대상: 떡담에서 첫 주문하는 신규 회원
• 할인: 전 상품 10% 할인 (최대 5,000원)

이벤트 기간 동안 회원가입 후 첫 주문 시 자동으로 할인이 적용됩니다.`,
  },
  {
    id: 5,
    title: '개인정보 처리방침 개정 안내',
    date: '2026-02-01',
    category: '공지',
    content: `개인정보 처리방침이 개정되었습니다.

주요 변경 사항:
• 개인정보 수집 항목 명확화
• 제3자 제공 내용 구체화
• 개인정보 보유 기간 명시

자세한 내용은 사이트 하단의 '개인정보 처리방침'을 확인해주세요.`,
  },
]

export default function NoticePage() {
  // 펼쳐진 공지사항 ID 관리 (여러 개 동시 펼침 가능)
  const [expandedIds, setExpandedIds] = useState([])

  // 아코디언 토글
  const toggleNotice = (id) => {
    setExpandedIds(prev => {
      if (prev.includes(id)) {
        // 이미 펼쳐져 있으면 닫기
        return prev.filter(noticeId => noticeId !== id)
      } else {
        // 닫혀 있으면 펼치기
        return [...prev, id]
      }
    })
  }

  // 카테고리별 배지 variant 매핑
  const getCategoryVariant = (category) => {
    switch (category) {
      case '이벤트':
        return 'best'
      case '배송':
        return 'new'
      case '업체':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen">
      <div className="max-w-content mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* 페이지 제목 */}
        <h1 className="font-display text-heading-2 md:text-heading-1 text-chestnut mb-8">
          공지사항
        </h1>

        {/* 공지사항 목록 */}
        <div className="space-y-4">
          {notices.map(notice => {
            const isExpanded = expandedIds.includes(notice.id)

            return (
              <article
                key={notice.id}
                className="bg-white dark:bg-dark-card rounded-card shadow-warm-sm overflow-hidden transition-all duration-300 hover:shadow-warm-hover"
              >
                {/* 공지사항 헤더 (클릭 영역) */}
                <button
                  onClick={() => toggleNotice(notice.id)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-honey focus:ring-inset"
                  aria-expanded={isExpanded}
                  aria-controls={`notice-content-${notice.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* 카테고리 배지 + 제목 */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={getCategoryVariant(notice.category)}
                          size="sm"
                        >
                          {notice.category}
                        </Badge>
                        <time className="text-caption text-caramel">
                          {notice.date}
                        </time>
                      </div>

                      <h2 className="text-body font-medium text-chestnut dark:text-cream">
                        {notice.title}
                      </h2>
                    </div>

                    {/* 펼침/접기 아이콘 */}
                    <div
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-chestnut-light transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* 공지사항 내용 (펼쳐졌을 때만 표시) */}
                {isExpanded && (
                  <div
                    id={`notice-content-${notice.id}`}
                    className="px-6 pb-6 pt-0 border-t border-injeolmi dark:border-chestnut-light"
                  >
                    <div className="mt-4 text-body text-chestnut-light dark:text-caramel whitespace-pre-line leading-relaxed">
                      {notice.content}
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>

        {/* 안내 문구 */}
        <div className="mt-8 text-center">
          <p className="text-caption text-caramel">
            문의사항이 있으시면 고객센터로 연락주세요.
          </p>
        </div>
      </div>
    </main>
  )
}
