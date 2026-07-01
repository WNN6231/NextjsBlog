import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// --- 配置项 ---
// 草稿库(预撰写 Obsidian 仓库)的绝对路径。换电脑时只需改这一处。
// 也可通过环境变量覆盖：DRAFT_VAULT_PATH=/xxx node scripts/publish.mjs <file>
const DRAFT_VAULT_PATH = process.env.DRAFT_VAULT_PATH || '/Users/wnn/Documents/obsidian/Obsidian_Sync';
const ATTACHMENTS_DIR = 'PictureSave';

// 发布目标路径根据本脚本位置自动推算(scripts/ 的上一级即项目根),换机/改文件夹名都无需再动。
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PROD_CONTENT_PATH = path.join(PROJECT_ROOT, 'content/posts');
const PROD_PUBLIC_PATH = path.join(PROJECT_ROOT, 'public/PostImages');
const IMAGE_URL_PREFIX = '/PostImages';
const AUTHOR_NAME = 'Wm1NlkN';

const filePath = process.argv[2];

if (!filePath) {
  console.error("❌ 请提供要迁移的文件路径");
  process.exit(1);
}

/**
 * 规范化图片文件名：小写 + 空格转连字符
 */
function normalizeImageName(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * 处理并生成 Front Matter
 */
function processFrontMatter(content, fileName) {
  if (content.trim().startsWith('---')) {
    return content;
  }

  const title = path.parse(fileName).name;
  const date = new Date().toISOString().split('T')[0];

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
   * 1. 处理图片：转换Obsidian语法 + 规范化文件名 + 复制图片
   */
  const obsidianImageRegex = /!\[\[([^|\]\n]+)(?:\|([^\]\n]*))?\]\]/g;
  let newContent = content;
  let match;

  while ((match = obsidianImageRegex.exec(content)) !== null) {
    const originalTag = match[0];
    const imageName = match[1].trim();
    const imageRemark = match[2] || '';
    const altText = imageRemark.split('|').pop() || imageName;

    // 规范化文件名：小写 + 空格转连字符
    const normalizedName = normalizeImageName(imageName);

    const srcImgPath = path.join(DRAFT_VAULT_PATH, ATTACHMENTS_DIR, imageName);
    const destImgPath = path.join(PROD_PUBLIC_PATH, normalizedName);

    if (await fs.pathExists(srcImgPath)) {
      await fs.ensureDir(PROD_PUBLIC_PATH);
      await fs.copy(srcImgPath, destImgPath, { overwrite: true });
      console.log(`✅ 已搬运图片: ${imageName} → ${normalizedName}`);
      
      // 直接拼接路径，不用encodeURI（文件名已无空格）
      const webPath = `${IMAGE_URL_PREFIX}/${normalizedName}`;
      newContent = newContent.replace(originalTag, `![${altText}](${webPath})`);
    } else {
      console.warn(`⚠️ 资源不存在，跳过: ${imageName}`);
    }
  }

  /**
   * 2. 处理 Front Matter
   */
  newContent = processFrontMatter(newContent, fileName);

  /**
   * 3. 写入博客目录
   */
  await fs.ensureDir(PROD_CONTENT_PATH);
  await fs.writeFile(path.join(PROD_CONTENT_PATH, fileName), newContent);
  
  console.log(`🚀 博文 "${fileName}" 发布完成！`);
}

publish().catch(err => {
  console.error('❌ 发布失败:', err);
  process.exit(1);
});