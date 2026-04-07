import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        cinematic: {
          bg: 'var(--bg-primary)',
          bgSecondary: 'var(--bg-secondary)',
          bgTertiary: 'var(--bg-tertiary)',
          surface: 'var(--surface)',
          text: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          gold: 'var(--gold-accent)',
          bronze: 'var(--bronze-accent)',
          bronzeDeep: 'var(--bronze-deep)',
        },
      },
      boxShadow: {
        cinematic: '0 16px 48px rgba(8, 6, 4, 0.52)',
        goldGlow: '0 0 26px rgba(196, 139, 83, 0.24)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
