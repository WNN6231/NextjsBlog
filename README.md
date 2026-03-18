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
| **app** | 博客页面路由与逻辑。|  
| **public** | 静态资源（图片、字体等）。|  
| **public/optimized** | 经过 compress.js 处理后的优化图片。|  
| **lib** | 公用工具函数与库配置。  |
| **compress.js** | 自定义图片压缩工具。|

## 目录结构说明

| 文件夹/文件 | 内容描述 |
| :--- | :--- |
| **📁 2025** | **归档**：2025 年度所有文章的静态资源与索引 |
| **📁 about** | **关于我**：个人简历、技能树及联系方式页面 |
| **📁 photo** | **摄影**：存放生活照片及摄影作品集的静态页面 |
| **📁 categories / tags** | **分类索引**：全站文章的逻辑分类与关键词映射 |
| **📁 js / css** | **前端资源**：博客主题的自定义样式表与交互逻辑 |
| **📁 img** | **媒体库**：文章插图、封面图及相关视觉素材 |
| **📁 links** | **友链**：记录志同道合的小伙伴们的数字空间 |
| **📄 index.html** | **首页**：博客的入口展示页面 |
| **📄 local-search.xml** | **搜索索引**：支持全站内容即时检索的核心数据 |
| **📄 404.html** | **错误页**：当访问路径不存在时的引导页面 |
---
Made with ❤️ by WNN
