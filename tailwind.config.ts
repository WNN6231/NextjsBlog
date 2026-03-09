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
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',       // 苹果设备中文首选
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',   // Windows 设备中文首选
          '"Noto Sans SC"',
          'sans-serif',
        ],
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