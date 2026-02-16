'use client'

// 테마 Context — 떡담 플랫폼
// 라이트/다크 모드 전환 및 localStorage 연동

import { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/utils'

const ThemeContext = createContext()

const THEME_KEY = 'tteokdam_theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light') // 'light' | 'dark'
  const [isLoaded, setIsLoaded] = useState(false)

  // 초기 로드: localStorage 또는 시스템 설정에서 테마 가져오기
  useEffect(() => {
    const savedTheme = getLocalStorage(THEME_KEY, null)

    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // localStorage에 저장된 값이 없으면 시스템 설정 확인
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }

    setIsLoaded(true)
  }, [])

  // 테마 변경 시 localStorage 및 document 클래스 업데이트
  useEffect(() => {
    if (isLoaded) {
      setLocalStorage(THEME_KEY, theme)

      // document에 dark 클래스 추가/제거
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme, isLoaded])

  /**
   * 테마 토글 (라이트 ↔ 다크)
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  /**
   * 특정 테마로 설정
   * @param {string} newTheme - 'light' | 'dark'
   */
  const setThemeMode = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setTheme(newTheme)
    }
  }

  /**
   * 다크 모드 여부 확인
   * @returns {boolean}
   */
  const isDarkMode = () => {
    return theme === 'dark'
  }

  const value = {
    theme,
    toggleTheme,
    setTheme: setThemeMode,
    isDarkMode,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * 테마 Context Hook
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme은 ThemeProvider 내부에서만 사용 가능합니다.')
  }
  return context
}
