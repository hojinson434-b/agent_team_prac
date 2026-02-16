// 루트 레이아웃 — 전체 앱에 폰트, Provider, Header/Footer 적용

import { Noto_Serif_KR, Noto_Sans_KR, DM_Sans } from 'next/font/google'
import "./globals.css"

// Context Providers
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { CompareProvider } from '@/contexts/CompareContext'
import { ToastProvider } from '@/components/ui/Toast'

// Layout 컴포넌트
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Google Fonts 설정
const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-body',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-accent',
  display: 'swap',
})

// 메타데이터
export const metadata = {
  title: "떡담 - 떡 중개 판매 플랫폼",
  description: "여러 업체의 떡을 한곳에서 비교하고 구매할 수 있는 떡 중개 판매 플랫폼입니다.",
  keywords: "떡, 떡 구매, 떡 중개, 떡 판매, 한과, 전통 떡",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${notoSerifKR.variable} ${notoSansKR.variable} ${dmSans.variable}`}
    >
      <body className="font-body bg-cream text-sesame antialiased">
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <CompareProvider>
                  <ToastProvider>
                    <div className="flex flex-col min-h-screen">
                      <Header />
                      <main className="flex-1">
                        {children}
                      </main>
                      <Footer />
                    </div>
                  </ToastProvider>
                </CompareProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
