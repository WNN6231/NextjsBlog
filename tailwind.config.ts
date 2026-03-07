import type { Config } from "tailwindcss";

const config: Config = {
  // 确保这里的路径覆盖了你所有的组件和页面
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 如果有 src 目录
  ],
  theme: {
    extend: {
      // 你可以这里自定义文章页面的配色
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // 限制文章最大宽度，提升阅读感
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 这一行最关键
  ],
};

export default config;