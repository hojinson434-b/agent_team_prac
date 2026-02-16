'use client'

// 로그인/회원가입 페이지 — 떡담 플랫폼
// 탭으로 로그인과 회원가입 전환
// 기능: 로그인, 회원가입, 폼 검증, 에러 메시지 표시

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function AuthPage() {
  const router = useRouter()
  const { login, register, isLoggedIn } = useAuth()

  // 탭 상태: 'login' 또는 'signup'
  const [activeTab, setActiveTab] = useState('login')

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })

  // 회원가입 폼 상태
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // 에러 메시지
  const [errors, setErrors] = useState({})

  // 이미 로그인된 경우 마이페이지로 리다이렉트
  useEffect(() => {
    if (isLoggedIn()) {
      router.push('/mypage')
    }
  }, [isLoggedIn, router])

  // 로그인 폼 입력 핸들러
  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginForm(prev => ({ ...prev, [name]: value }))
    // 입력 시 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // 회원가입 폼 입력 핸들러
  const handleSignupChange = (e) => {
    const { name, value } = e.target
    setSignupForm(prev => ({ ...prev, [name]: value }))
    // 입력 시 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // 로그인 폼 검증
  const validateLoginForm = () => {
    const newErrors = {}

    if (!loginForm.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!loginForm.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 회원가입 폼 검증
  const validateSignupForm = () => {
    const newErrors = {}

    if (!signupForm.name.trim()) {
      newErrors.name = '이름을 입력해주세요'
    }

    if (!signupForm.email.trim()) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!signupForm.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (signupForm.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
    }

    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
    } else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 로그인 제출
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (!validateLoginForm()) {
      return
    }

    const success = login(loginForm.email, loginForm.password)

    if (success) {
      // 로그인 성공 시 메인 페이지로 이동
      router.push('/')
    } else {
      setErrors({ general: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' })
    }
  }

  // 회원가입 제출
  const handleSignupSubmit = (e) => {
    e.preventDefault()

    if (!validateSignupForm()) {
      return
    }

    const success = register({
      email: signupForm.email,
      password: signupForm.password,
      name: signupForm.name,
    })

    if (success) {
      // 회원가입 성공 시 로그인 탭으로 전환 (또는 바로 메인으로 이동)
      // 여기서는 바로 메인으로 이동 (register 함수가 자동으로 로그인까지 처리)
      router.push('/')
    } else {
      setErrors({ general: '회원가입에 실패했습니다. 다시 시도해주세요.' })
    }
  }

  return (
    <main className="bg-cream dark:bg-dark-bg min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="font-display text-heading-2 text-chestnut dark:text-cream hover:text-honey transition-colors duration-300"
          >
            떡담
          </Link>
          <p className="text-body text-chestnut-light dark:text-caramel mt-2">
            떡을 담다
          </p>
        </div>

        {/* 인증 카드 */}
        <div className="bg-white dark:bg-dark-card rounded-card shadow-warm-md overflow-hidden">
          {/* 탭 */}
          <div className="flex">
            <button
              onClick={() => {
                setActiveTab('login')
                setErrors({})
              }}
              className={`flex-1 py-4 text-body font-medium transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-honey text-white'
                  : 'bg-rice dark:bg-dark-surface text-chestnut dark:text-injeolmi hover:bg-injeolmi dark:hover:bg-chestnut-light'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => {
                setActiveTab('signup')
                setErrors({})
              }}
              className={`flex-1 py-4 text-body font-medium transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'bg-honey text-white'
                  : 'bg-rice dark:bg-dark-surface text-chestnut dark:text-injeolmi hover:bg-injeolmi dark:hover:bg-chestnut-light'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 폼 영역 */}
          <div className="p-8">
            {/* 공통 에러 메시지 */}
            {errors.general && (
              <div
                className="mb-6 p-4 bg-redbean/10 dark:bg-redbean/20 border border-redbean rounded-button text-redbean text-body"
                role="alert"
              >
                {errors.general}
              </div>
            )}

            {/* 로그인 폼 */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <Input
                  id="login-email"
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="example@tteokdam.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  error={errors.email}
                />

                <Input
                  id="login-password"
                  label="비밀번호"
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  error={errors.password}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                >
                  로그인
                </Button>
              </form>
            )}

            {/* 회원가입 폼 */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <Input
                  id="signup-name"
                  label="이름"
                  type="text"
                  name="name"
                  placeholder="홍길동"
                  value={signupForm.name}
                  onChange={handleSignupChange}
                  error={errors.name}
                />

                <Input
                  id="signup-email"
                  label="이메일"
                  type="email"
                  name="email"
                  placeholder="example@tteokdam.com"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  error={errors.email}
                />

                <Input
                  id="signup-password"
                  label="비밀번호"
                  type="password"
                  name="password"
                  placeholder="6자 이상 입력하세요"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                  error={errors.password}
                />

                <Input
                  id="signup-confirm-password"
                  label="비밀번호 확인"
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={signupForm.confirmPassword}
                  onChange={handleSignupChange}
                  error={errors.confirmPassword}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                >
                  회원가입
                </Button>
              </form>
            )}

            {/* 안내 문구 */}
            <div className="mt-6 text-center">
              {activeTab === 'login' ? (
                <p className="text-caption text-chestnut-light dark:text-caramel">
                  계정이 없으신가요?{' '}
                  <button
                    onClick={() => {
                      setActiveTab('signup')
                      setErrors({})
                    }}
                    className="text-honey font-medium hover:underline"
                  >
                    회원가입하기
                  </button>
                </p>
              ) : (
                <p className="text-caption text-chestnut-light dark:text-caramel">
                  이미 계정이 있으신가요?{' '}
                  <button
                    onClick={() => {
                      setActiveTab('login')
                      setErrors({})
                    }}
                    className="text-honey font-medium hover:underline"
                  >
                    로그인하기
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
