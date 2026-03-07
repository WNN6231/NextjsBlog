import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogListPage() {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  
  // 检查目录是否存在
  if (!fs.existsSync(postsDirectory)) return <div className="text-white p-10">请创建 content/posts 文件夹</div>;

  const fileNames = fs.readdirSync(postsDirectory);

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
        date: data.date || '2026-01-01',
        description: data.description || '这是文章的简短摘要内容...',
        cover: data.cover || '/api/placeholder/400/300', // 默认图
        category: data.category || 'React',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="max-w-4xl mx-auto py-16 px-6 min-h-screen bg-black">
      <h1 className="text-5xl font-bold text-white mb-12 tracking-tight">Blog</h1>
      
      <div className="flex flex-col gap-8">
        {allPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            {/* iOS 风格横向卡片容器 */}
            <div className="flex flex-col md:flex-row items-stretch gap-6 p-4 bg-[#1c1c1e]/60 border border-white/5 rounded-[2rem] transition-all duration-500 hover:bg-white/10 hover:border-white/20 active:scale-[0.98] backdrop-blur-xl">
              
              {/* 左侧封面图 */}
              <div className="w-full md:w-80 h-48 md:h-auto overflow-hidden rounded-[1.5rem] shrink-0">
                <img 
                  src={post.cover} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* 右侧文字区 */}
              <div className="flex flex-col justify-center py-2 pr-4 space-y-3">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 text-sm font-mono text-gray-500">
                  <span>{post.date}</span>
                  <span className="text-gray-700">|</span>
                  <span className="text-gray-400 uppercase tracking-widest text-[10px]">{post.category}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}