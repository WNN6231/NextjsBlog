import { getPostBySlug } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const {
    title = '无标题',
    category = 'THINKING',
    description = '',
    author = 'Wm1NlkN',
    date = '3 MAR 2026',
    readtime = '34 MIN READ',
  } = post.meta;

  return (
    <div className="min-h-screen bg-background text-foreground ">
      <main className="max-w-4xl mx-auto px-6 py-10">
        <header className="mb-10">
          <p className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
            {category}
          </p>
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8 italic">
            {description}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
              <Image 
                src="/avatar.jpg"
                alt={author}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <p className="text-foreground text-sm font-medium">{author}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{date} · {readtime}</p>
            </div>
          </div>
        </header>

        <hr className="border-gray-200 dark:border-gray-800 mb-10" />

        <article className="prose-custom">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <span className="block w-full flex justify-center my-8">
                  <img
                    {...props}
                    alt={props.alt || "Blog Image"}
                    className="rounded-lg max-h-[600px] object-contain bg-gray-100 dark:bg-gray-800/50"
                    loading="lazy"
                  />
                </span>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}