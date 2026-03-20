import fs from 'fs-extra';
import path from 'path';

// --- 配置项 (请确保路径正确) ---
const DRAFT_VAULT_PATH = 'D:/OBISIDIAN/M1LK'; 
const ATTACHMENTS_DIR = 'PictureSave'; 
const PROD_CONTENT_PATH = 'C:/Users/WNN/Desktop/blog/content/posts'; 
const PROD_PUBLIC_PATH = 'C:/Users/WNN/Desktop/blog/public/PostImages'; 
const IMAGE_URL_PREFIX = '/PostImages'; 

// 你的默认署名
const AUTHOR_NAME = 'Wm1NlkN';

const filePath = process.argv[2];

if (!filePath) {
  console.error("❌ 请提供要迁移的文件路径");
  process.exit(1);
}

/**
 * 辅助函数：处理并生成 Front Matter
 */
function processFrontMatter(content, fileName) {
  // 如果原文已经有 YAML 头了，直接返回，不做二次处理
  if (content.trim().startsWith('---')) {
    return content;
  }

  const title = path.parse(fileName).name; // 文件名作为标题
  const date = new Date().toISOString().split('T')[0]; // 获取当前日期: 2026-03-20

  // 尝试从已经转换过的正文中找第一张图片作为 cover
  // 匹配标准 Markdown 语法 ![alt](/PostImages/xxx.jpg)
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const coverPath = imageMatch ? imageMatch[1] : '/PostImages/0.webp';

  const frontMatter = `---
title: ${title}
category: Personal Thinking
description: "${title} 的发布记录（脚本自动生成）"
author: ${AUTHOR_NAME}
date: ${date}
cover: ${coverPath}
readtime: 5 min read
---

`;
  return frontMatter + content;
}

async function publish() {
  const fileName = path.basename(filePath);
  const fullSourcePath = path.resolve(filePath);
  
  let content = await fs.readFile(fullSourcePath, 'utf8');

  /**
   * 1. 增强版正则处理图片
   */
  const obsidianImageRegex = /!\[\[([^|\]\n]+)(?:\|([^\]\n]*))?\]\]/g;
  let newContent = content;
  let match;

  while ((match = obsidianImageRegex.exec(content)) !== null) {
    const originalTag = match[0];      // 完整标签 ![[...]]
    const imageName = match[1].trim(); // 文件名
    const imageRemark = match[2] || ""; // 备注内容

    const altText = imageRemark.split('|').pop() || imageName;

    const srcImgPath = path.join(DRAFT_VAULT_PATH, ATTACHMENTS_DIR, imageName);
    const destImgPath = path.join(PROD_PUBLIC_PATH, imageName);

    if (await fs.pathExists(srcImgPath)) {
      await fs.ensureDir(PROD_PUBLIC_PATH);
      await fs.copy(srcImgPath, destImgPath);
      console.log(`✅ 已搬运图片: ${imageName}`);
      
      const webPath = encodeURI(`${IMAGE_URL_PREFIX}/${imageName}`);
      newContent = newContent.replace(originalTag, `![${altText}](${webPath})`);
    } else {
      console.warn(`⚠️ 资源不存在，跳过替换: ${imageName}`);
    }
  }

  /**
   * 2. 处理 Front Matter
   */
  newContent = processFrontMatter(newContent, fileName);

  /**
   * 3. 写入发行仓库
   */
  await fs.ensureDir(PROD_CONTENT_PATH);
  await fs.writeFile(path.join(PROD_CONTENT_PATH, fileName), newContent);
  
  console.log(`🚀 博文 "${fileName}" 格式转换并注入 Front Matter 完成！`);
}

publish();