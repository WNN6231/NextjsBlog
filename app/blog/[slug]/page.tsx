import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

// 1. 获取所有文章的 slug 用于静态生成
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const files = fs.readdirSync(postsDirectory);
  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // 解析元数据和正文
  const { data, content } = matter(fileContents);

  return (
    <article className="max-w-3xl mx-auto p-6 lg:py-12">
      {/* iOS 风格大标题和封面 */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{data.title}</h1>
        <div className="flex items-center text-gray-500 text-sm mb-6">
          <span>{data.date}</span>
          <span className="mx-2">•</span>
          <span>{data.tags?.join(', ')}</span>
        </div>
        {data.cover && (
          <img 
            src={data.cover} 
            alt={data.title} 
            className="w-full rounded-3xl shadow-lg object-cover max-h-[400px]"
          />
        )}
      </header>

      {/* 文章正文渲染 */}
      <div className="prose prose-lg prose-slate max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}