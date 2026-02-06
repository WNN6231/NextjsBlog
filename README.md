# 🚀 我的个人博客 (Next.js Blog)

这是一个基于 **Next.js** 构建的个人博客项目。项目旨在记录WNN的日常及总结记录。
## 🌟 项目亮点

 **框架**: 使用 Next.js 14/15 (App Router) 构建，支持服务器组件 (RSC)。  
 **样式**: 集成了 Tailwind CSS (基于 `postcss.config.mjs`)。  
 **性能**: 静态页面生成 (SSG) 确保极速加载。  
 **自定义图像压缩脚本**: 通过 `compress.js` 利用 `Sharp` 库自动将图片转换为 WebP 格式，大幅减少首屏带宽。  
 **类型安全**: 全面使用 TypeScript 编写。

## 🛠️ 技术栈

- **Core**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, PostCSS, Motion-primitives
- **Tools**: ESLint, Sharp (图像处理)

## 📦 快速开始

### 1. 克隆并安装依赖
```bash
git clone [https://github.com/WNN6231/NextjsBlog.git](https://github.com/WNN6231/NextjsBlog.git)
cd blog
npm install
```

### 2. 运行图片优化脚本
在部署或上传新图片后，运行此脚本将 public 目录下的 JPG/PNG 自动转换为高效的 WebP 格式：
```bash
node compress.js
```

### 3.启动开发服务器
```bash
npm run dev
```
点击终端显示的http://localhost:3000查看博客内容。

## 📁 目录结构
/app: 博客页面路由与逻辑。  
/public: 静态资源（图片、字体等）。  
/public/optimized: 经过 compress.js 处理后的优化图片。  
/lib: 公用工具函数与库配置。  
compress.js: 自定义图片压缩工具。

---
Made with ❤️ by WNN