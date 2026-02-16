/** @type {import('tailwindcss').Config} */

// 떡담 (Tteokdam) - 韓모던 디자인 시스템
// 전통 한국의 따뜻함 + 현대적 미니멀리즘

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      // 커스텀 색상 - 한국 전통 식재료 색상 팔레트
      colors: {
        // 주요 배경색
        cream: '#FFF8F0',          // 미색 - 메인 배경
        rice: '#F5EDE0',           // 쌀색 - 보조 배경

        // 텍스트 색상
        chestnut: '#5C3A1E',       // 밤색 - 주요 텍스트
        'chestnut-light': '#8B6242', // 밤색 밝은 - 보조 텍스트
        sesame: '#2C2C2C',         // 참깨색 - 다크 텍스트

        // 포인트 색상
        redbean: '#8B3A3A',        // 팥색 - 주요 포인트
        mugwort: '#4A7C59',        // 쑥색 - 자연/신선 강조
        honey: '#D4A847',          // 꿀색 - CTA 버튼, 강조
        gold: '#D4A847',           // 금색 (honey 별칭)

        // 보조 색상
        injeolmi: '#E8D5B7',       // 인절미색 - 카드 배경
        songpyeon: '#7BA784',      // 송편색 - 보조 강조
        caramel: '#C4956A',        // 카라멜 - 테두리, 호버
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

      // 커스텀 그림자 - 따뜻한 느낌
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(92, 58, 30, 0.08)',
        'warm-md': '0 4px 12px rgba(92, 58, 30, 0.12)',
        'warm-lg': '0 8px 24px rgba(92, 58, 30, 0.16)',
        'warm-hover': '0 8px 30px rgba(92, 58, 30, 0.2)',
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
