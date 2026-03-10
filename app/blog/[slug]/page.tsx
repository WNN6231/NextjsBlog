import React from 'react';
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
  const decodedSlug = decodeURIComponent(slug).normalize('NFC');
  

  const post = getPostBySlug(decodedSlug);

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
      <main className="max-w-4xl mx-auto px-6 py-20">
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

        <article className="font-family prose-custom">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
        
              p: ({ children }) => {
                const isImage = React.Children.toArray(children).some((child) => {
                  return React.isValidElement(child) && (
                    child.type === 'img' || 
                    (typeof child.type === 'function' && (child.type as any).name === 'img')
                  );
                });

                if (isImage) return <>{children}</>;
                return <p className="leading-7 mb-6">{children}</p>;
              },

              img: ({ node, ...props }) => {
                const altParts = props.alt?.split('|') || [];

                const descriptions = altParts.filter(part => {
                  const isNumber = /^\d+$/.test(part.trim());
                  return part.trim() !== '' && !isNumber;
                });

                const captionText = descriptions.length > 0 ? descriptions[0] : null;
                
                return (
                  <figure className="my-8 flex flex-col items-center w-full">
                    <img
                      {...props}
                      alt={captionText || "Blog Image"} 
                      className="rounded-lg max-h-[600px] object-contain bg-gray-100 dark:bg-gray-800/50"
                      loading="lazy"
                    />
                    {captionText && (
                      <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400 italic font-medium">
                        {captionText}
                      </figcaption>
                    )}
                  </figure>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}