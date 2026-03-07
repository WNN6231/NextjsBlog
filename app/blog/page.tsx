import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { TextScramble } from '../components/core/text-scramble';

export default function BlogListPage() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fileNames = fs.existsSync(postsDirectory) ? fs.readdirSync(postsDirectory) : [];

  const allPosts = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : (data.date || '2024-01-01'),
        description: data.description || 'No description provided...',
        cover: data.cover || '/api/placeholder/600/400',
        category: data.category || 'Default',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300 selection:bg-gray-700">
      <main className="max-w-[1000px] mx-auto px-6 py-20">
        
        <TextScramble className='font-sans text-3xl uppercase'>
            Blog
        </TextScramble>

        <div className="flex flex-col gap-6">
          {allPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
              <div className="flex flex-col md:flex-row p-4 gap-6 rounded-2xl border border-white/5 bg-white/[0.02] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                
                <div className="w-full md:w-[280px] shrink-0 aspect-[16/9] rounded-xl overflow-hidden bg-[#161b22] border border-white/5">
                  <img 
                    src={post.cover} 
                    alt={post.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div className="flex flex-col flex-1 py-1">
                  
                  <h2 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  
                  <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span className="text-gray-700">|</span>
                    <span className="uppercase tracking-wider">{post.category}</span>
                  </div>
                  
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}