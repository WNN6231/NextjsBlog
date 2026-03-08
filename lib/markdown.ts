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