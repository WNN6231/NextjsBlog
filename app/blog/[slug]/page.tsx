import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GlowEffectButton } from '@/app/components/GlowEffectButton';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 关键：必须 await params
  const { slug } = await params;
  
  const fullPath = path.join(process.cwd(), 'content/posts', `${slug}.md`);

  if (!fs.existsSync(fullPath)) return notFound();

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return (
    <article className="max-w-3xl mx-auto py-20 px-6 min-h-screen text-gray-100 bg-black">
      
      <nav className="mb-12">
        <GlowEffectButton />
      </nav>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          {data.title}
        </h1>
        <p className="text-gray-500 font-mono mb-8 italic">Published on {data.date?.toString()}</p>
        {data.cover && (
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src={data.cover} alt={data.title} className="w-full h-auto object-cover" />
          </div>
        )}
      </header>

      {/* 使用 prose-invert 渲染深色模式 Markdown */}
      <div className="prose prose-invert prose-lg max-w-none">
        <MDXRemote source={content} />
      </div>

    </article>
  );
}