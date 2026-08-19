import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Previously pointed at --font-space-grotesk / --font-jetbrains-mono, neither
        // of which is ever defined, so every `font-sans` / `font-mono` utility fell
        // silently through to the browser default instead of the loaded face.
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
