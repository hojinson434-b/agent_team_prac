'use client'

// 업체 입점 신청 폼 — 새로운 떡집 입점 신청 양식
// 용도: 업체 등록에 필요한 정보를 입력받고 유효성 검사 수행
// 필수 필드: 업체명, 대표자명, 연락처, 이메일, 사업자등록번호

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function VendorRegisterForm() {
  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    vendorName: '',
    ownerName: '',
    phone: '',
    email: '',
    businessNumber: '',
    location: '',
    specialties: '',
    description: '',
  })

  // 에러 상태
  const [errors, setErrors] = useState({})

  // 제출 중 상태
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 입력 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // 입력 시 해당 필드 에러 제거
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  // 유효성 검사
  const validate = () => {
    const newErrors = {}

    if (!formData.vendorName.trim()) {
      newErrors.vendorName = '업체명을 입력해주세요.'
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = '대표자명을 입력해주세요.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해주세요.'
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다.'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    if (!formData.businessNumber.trim()) {
      newErrors.businessNumber = '사업자등록번호를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault()

    // 유효성 검사
    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    // 실제 서버 연동 시 API 호출
    // 현재는 시뮬레이션
    setTimeout(() => {
      alert('입점 신청이 완료되었습니다! 담당자 검토 후 연락드리겠습니다.')

      // 폼 초기화
      setFormData({
        vendorName: '',
        ownerName: '',
        phone: '',
        email: '',
        businessNumber: '',
        location: '',
        specialties: '',
        description: '',
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-warm-sm p-6 md:p-8">
      {/* 2컬럼 그리드 (모바일은 1컬럼) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 업체명 */}
        <Input
          label="업체명"
          id="vendorName"
          name="vendorName"
          value={formData.vendorName}
          onChange={handleChange}
          placeholder="예: 할매네 떡방"
          error={errors.vendorName}
          required
        />

        {/* 대표자명 */}
        <Input
          label="대표자명"
          id="ownerName"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
          placeholder="예: 홍길동"
          error={errors.ownerName}
          required
        />

        {/* 연락처 */}
        <Input
          label="연락처"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="예: 010-1234-5678"
          error={errors.phone}
          required
        />

        {/* 이메일 */}
        <Input
          label="이메일"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="예: vendor@example.com"
          error={errors.email}
          required
        />

        {/* 사업자등록번호 */}
        <Input
          label="사업자등록번호"
          id="businessNumber"
          name="businessNumber"
          value={formData.businessNumber}
          onChange={handleChange}
          placeholder="예: 123-45-67890"
          error={errors.businessNumber}
          required
        />

        {/* 소재지 */}
        <Input
          label="소재지"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="예: 서울 종로구"
        />
      </div>

      {/* 대표 상품 (전체 너비) */}
      <div className="mb-6">
        <label
          htmlFor="specialties"
          className="block text-body font-body font-medium text-chestnut mb-2"
        >
          대표 상품
        </label>
        <textarea
          id="specialties"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          placeholder="예: 송편, 인절미, 백설기 등 (쉼표로 구분)"
          rows="3"
          className="w-full px-4 py-3 border border-injeolmi rounded-button font-body text-body text-sesame bg-white focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 transition-all duration-200 placeholder:text-caramel/50"
        />
      </div>

      {/* 업체 소개 (전체 너비) */}
      <div className="mb-8">
        <label
          htmlFor="description"
          className="block text-body font-body font-medium text-chestnut mb-2"
        >
          업체 소개
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="업체의 특징, 강점, 전통 등을 자유롭게 작성해주세요."
          rows="5"
          className="w-full px-4 py-3 border border-injeolmi rounded-button font-body text-body text-sesame bg-white focus:outline-none focus:border-caramel focus:ring-2 focus:ring-caramel/20 transition-all duration-200 placeholder:text-caramel/50"
        />
      </div>

      {/* 제출 버튼 */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            if (confirm('작성 중인 내용이 삭제됩니다. 취소하시겠습니까?')) {
              setFormData({
                vendorName: '',
                ownerName: '',
                phone: '',
                email: '',
                businessNumber: '',
                location: '',
                specialties: '',
                description: '',
              })
              setErrors({})
            }
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? '제출 중...' : '입점 신청하기'}
        </Button>
      </div>
    </form>
  )
}
