import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title?: string;
  category?: string;
  author?: string;
  date?: string;
  readtime?: string;
  cover?: string;
  description?: string;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`未找到文件: ${fullPath}`);
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const meta = data as PostMeta;
  

  const processedContent = content.replace(
    /!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
    (match, filename, altText) => {
      const alt = altText || filename;
      return `![${alt}](/PostImages/${filename})`;
    }
  );

  const serializedMeta: PostMeta = {
    ...data,
    date: data.date instanceof Date
      ? data.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
      : String(data.date || ''),
  };
  
  return { 
    slug: realSlug, 
    meta: serializedMeta, 
    content: processedContent
  };
}

export interface AnimeNote {
  slug: string;
  content: string;
  meta: { title?: string; date?: string };
}

const animeDirectory = path.join(process.cwd(), 'content/anime');

// 读取某张 anime 卡片对应的观后感正文（content/anime/<slug>.md）。
// 文件缺失或正文为空时返回 null，详情页回退到“待补充”占位。
export function getAnimeBySlug(slug: string): AnimeNote | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(animeDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!content.trim()) {
    return null;
  }

  // 与文章一致：把遗留的 Obsidian ![[x]] 嵌入改写成标准 markdown
  const processedContent = content.replace(
    /!\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g,
    (match, filename, altText) => {
      const alt = altText || filename;
      return `![${alt}](/PostImages/${filename})`;
    }
  );

  const date = data.date instanceof Date
    ? data.date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
    : data.date
      ? String(data.date)
      : undefined;

  return {
    slug: realSlug,
    content: processedContent,
    meta: {
      // 正文标题：写在 front matter 的 title 里，缺失时详情页回退到“观后感”
      title: data.title ? String(data.title) : undefined,
      date,
    },
  };
}