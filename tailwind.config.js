/** @type {import('tailwindcss').Config} */

// 떡담 (Tteokdam) - 봄 꽃떡 디자인 시스템
// 화사한 봄꽃 + 로맨틱 모던

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      // 커스텀 색상 - 봄 꽃떡 팔레트
      colors: {
        // 주요 배경색
        cream: '#FFF5F5',          // 연분홍 - 메인 배경 (꽃잎)
        rice: '#FFF0F3',           // 밝은 로즈 - 보조 배경

        // 텍스트 색상
        chestnut: '#4A2040',       // 자주 - 주요 텍스트 (진달래)
        'chestnut-light': '#7A5075', // 연자주 - 보조 텍스트
        sesame: '#2D1F2D',         // 다크 플럼 - 다크 텍스트

        // 포인트 색상
        redbean: '#C04B6D',        // 딥로즈 - 주요 포인트 (동백)
        mugwort: '#9B7DB8',        // 라벤더 - 보조 강조 (도라지꽃)
        honey: '#E8788A',          // 복숭아 - CTA 버튼 (복사꽃)
        gold: '#E8788A',           // (honey 별칭)

        // 보조 색상
        injeolmi: '#F5DDE0',       // 연꽃잎 - 카드 배경/보더
        songpyeon: '#B8A9D4',      // 연보라 - 보조 강조 (라일락)
        caramel: '#D4A0B0',        // 모란 - 테두리, 호버
      },

      // 폰트 패밀리 - 시스템 폰트 사용
      fontFamily: {
        display: ['serif'],       // 제목/강조
        body: ['sans-serif'],      // 본문/UI
        accent: ['sans-serif'],    // 영문/숫자 보조
      },

      // 커스텀 폰트 크기
      fontSize: {
        'heading-1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],    // 40px
        'heading-2': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],      // 32px
        'heading-3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],    // 24px
        'heading-4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],   // 20px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],           // 16px
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],    // 18px
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],    // 14px
        'small': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],       // 12px
      },

      // 커스텀 그림자 - 부드러운 로즈 톤
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(192, 75, 109, 0.08)',
        'warm-md': '0 4px 12px rgba(192, 75, 109, 0.12)',
        'warm-lg': '0 8px 24px rgba(192, 75, 109, 0.15)',
        'warm-hover': '0 8px 30px rgba(192, 75, 109, 0.2)',
      },

      // 커스텀 Border Radius
      borderRadius: {
        'card': '1rem',      // 16px - 카드
        'button': '0.75rem', // 12px - 버튼
      },

      // 커스텀 Max Width
      maxWidth: {
        'wide': '1280px',    // 넓은 레이아웃
        'content': '960px',  // 콘텐츠 영역
      },

      // 커스텀 Spacing (필요 시 확장)
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
      },

      // 애니메이션 속도
      transitionDuration: {
        '400': '400ms',
      },

      // 커스텀 애니메이션
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
