import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CARDS } from '@/app/components/TiltCardData';

// 仅允许 generateStaticParams 预渲染的 slug，未知 slug 直接 404
export const dynamicParams = false;

export function generateStaticParams() {
  return CARDS.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = CARDS.find((c) => c.slug === slug);
  if (!card) {
    return { title: 'Not Found | Wm1NlkN' };
  }
  return {
    title: `${card.plainTitle} · 观后感 | Wm1NlkN`,
    description: `${card.plainTitle} —— ${card.author}`,
  };
}

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = CARDS.find((c) => c.slug === slug);
  if (!card) {
    notFound();
  }

  return (
    <div className='mx-auto my-12 w-full max-w-4xl px-4 md:my-20'>
      <Link
        href='/anime'
        className='text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100'
      >
        ← 返回 Anime
      </Link>

      <div className='mt-6 overflow-hidden rounded-xl border border-zinc-950/10 bg-zinc-100 dark:border-zinc-50/10 dark:bg-zinc-900'>
        <div className='aspect-[16/9] w-full overflow-hidden'>
          <img
            src={card.image}
            alt={card.plainTitle}
            className='h-full w-full object-cover'
          />
        </div>
      </div>

      <div className='mt-6'>
        <h1 className='font-sans text-2xl leading-snug text-zinc-950 dark:text-zinc-50 md:text-3xl'>
          {card.title}
        </h1>
        <p className='mt-2 text-base text-zinc-700 dark:text-zinc-400'>
          {card.author}
        </p>
      </div>

      <section className='mt-12 border-t border-zinc-950/10 pt-8 dark:border-zinc-50/10'>
        <h2 className='text-lg font-medium text-zinc-500'>观后感</h2>
        <p className='mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>
          （待补充 —— 我会在这里写下对这部作品的感受。）
        </p>
      </section>
    </div>
  );
}
