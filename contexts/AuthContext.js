'use client'

// 인증 Context — 떡담 플랫폼
// 사용자 인증 상태 관리 및 localStorage 연동

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const AuthContext = createContext()

const USER_KEY = 'tteokdam_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage에서 사용자 정보 가져오기
  useEffect(() => {
    const savedUser = getLocalStorage(USER_KEY, null)
    setUser(savedUser)
    setIsLoaded(true)
  }, [])

  // 사용자 정보 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        setLocalStorage(USER_KEY, user)
      } else {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(USER_KEY)
        }
      }
    }
  }, [user, isLoaded])

  /**
   * 로그인
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {boolean} - 성공 여부
   */
  const login = (email, password) => {
    // 실제 서버 연동 시에는 API 호출
    // 현재는 간단한 Mock 로그인
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split('@')[0], // 이메일 앞부분을 이름으로 사용
        createdAt: new Date().toISOString(),
      }
      setUser(userData)
      return true
    }
    return false
  }

  /**
   * 회원가입
   * @param {Object} userData - 회원 정보 { email, password, name }
   * @returns {boolean} - 성공 여부
   */
  const register = ({ email, password, name }) => {
    // 실제 서버 연동 시에는 API 호출
    // 현재는 간단한 Mock 회원가입
    if (email && password && name) {
      const newUser = {
        id: Date.now(),
        email,
        name,
        createdAt: new Date().toISOString(),
      }
      setUser(newUser)
      return true
    }
    return false
  }

  /**
   * 로그아웃
   */
  const logout = () => {
    setUser(null)
  }

  /**
   * 사용자 정보 업데이트
   * @param {Object} updates - 업데이트할 정보
   */
  const updateUser = (updates) => {
    if (user) {
      setUser({ ...user, ...updates })
    }
  }

  /**
   * 로그인 여부 확인
   * @returns {boolean}
   */
  const isLoggedIn = () => {
    return !!user
  }

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    isLoggedIn,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * 인증 Context Hook
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
