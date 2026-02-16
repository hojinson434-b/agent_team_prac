'use client'

// 인증 Context — 떡담 플랫폼
// localStorage 기반 사용자 등록/로그인/로그아웃
// tteokdam_users: 등록된 사용자 목록 (이메일, 비밀번호, 이름, 가입일)
// tteokdam_user: 현재 로그인된 사용자 세션

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const AuthContext = createContext()

const USER_KEY = 'tteokdam_user'
const USERS_DB_KEY = 'tteokdam_users'

/**
 * 간단한 비밀번호 인코딩 (Base64, 데모용)
 * 실제 서비스에서는 서버 측 bcrypt 등 사용 필요
 */
function encodePassword(password) {
  if (typeof window === 'undefined') return password
  return btoa(encodeURIComponent(password))
}

function verifyPassword(password, encoded) {
  return encodePassword(password) === encoded
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage에서 사용자 세션 가져오기
  useEffect(() => {
    const savedUser = getLocalStorage(USER_KEY, null)
    setUser(savedUser)
    setIsLoaded(true)
  }, [])

  // 사용자 세션 변경 시 localStorage에 저장
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
   * 등록된 사용자 목록 가져오기
   */
  const getUsers = () => {
    return getLocalStorage(USERS_DB_KEY, [])
  }

  /**
   * 등록된 사용자 목록 저장하기
   */
  const saveUsers = (users) => {
    setLocalStorage(USERS_DB_KEY, users)
  }

  /**
   * 로그인 — 등록된 사용자 검증
   * @param {string} email - 이메일
   * @param {string} password - 비밀번호
   * @returns {{ success: boolean, error: string|null }}
   */
  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, error: '이메일과 비밀번호를 입력해주세요.' }
    }

    const users = getUsers()
    const foundUser = users.find(u => u.email === email)

    if (!foundUser) {
      return { success: false, error: '등록되지 않은 이메일입니다. 회원가입을 먼저 해주세요.' }
    }

    if (!verifyPassword(password, foundUser.password)) {
      return { success: false, error: '비밀번호가 올바르지 않습니다.' }
    }

    // 로그인 성공 — 세션에 비밀번호는 저장하지 않음
    const sessionData = {
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name,
      createdAt: foundUser.createdAt,
    }
    setUser(sessionData)
    return { success: true, error: null }
  }

  /**
   * 회원가입 — 사용자 등록 후 자동 로그인
   * @param {Object} userData - { email, password, name }
   * @returns {{ success: boolean, error: string|null }}
   */
  const register = ({ email, password, name }) => {
    if (!email || !password || !name) {
      return { success: false, error: '모든 항목을 입력해주세요.' }
    }

    const users = getUsers()

    // 이메일 중복 검사
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return { success: false, error: '이미 가입된 이메일입니다. 로그인해주세요.' }
    }

    // 새 사용자 생성
    const newUser = {
      id: Date.now(),
      email,
      password: encodePassword(password),
      name,
      createdAt: new Date().toISOString(),
    }

    // 사용자 목록에 추가
    users.push(newUser)
    saveUsers(users)

    // 자동 로그인 (세션에 비밀번호 미포함)
    const sessionData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
    }
    setUser(sessionData)
    return { success: true, error: null }
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
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)

      // 사용자 DB에도 반영 (비밀번호 제외 정보)
      const users = getUsers()
      const index = users.findIndex(u => u.id === user.id)
      if (index !== -1) {
        users[index] = { ...users[index], ...updates }
        saveUsers(users)
      }
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
