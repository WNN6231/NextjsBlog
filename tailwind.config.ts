import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        article: [
          '"Source Han Serif"',
          '"Noto Serif CJK"',
          '"Songti SC"',
          'Georgia',
          'serif'
        ],
      },
      maxWidth: {
        'prose-narrow': '720px',
      },
      colors: {
        background: "#18181b",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;