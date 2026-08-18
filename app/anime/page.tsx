import Link from 'next/link';
import type { Metadata } from 'next';
import { TiltCard } from '@/app/components/TiltCard';
import { CARDS } from '@/app/components/TiltCardData';
import { TextScramble } from '@/app/components/core/text-scramble';
import { AnimatedGroup } from '@/app/components/core/animated-group';

export const metadata: Metadata = {
  title: 'Anime | Wm1NlkN',
  description: '一些打动我的动画作品，与写给它们的观后感。',
};

export default function AnimePage() {
  return (
    <div className='mx-auto my-16 w-full max-w-7xl px-4 md:my-32'>
      <header className='mb-10 md:mb-14'>
        <TextScramble
          as='h1'
          className='font-sans text-xl md:text-3xl uppercase tracking-wider'
        >
          动画，片刻，凝视。
        </TextScramble>
        <p className='mt-3 text-sm text-zinc-500 dark:text-zinc-400'>
          一些打动我的作品，以及写给它们的字。
        </p>
      </header>

      <AnimatedGroup
        className='grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6'
        preset='fade'
        variants={{
          container: { visible: { transition: { staggerChildren: 0.05 } } },
        }}
      >
        {CARDS.map((card) => (
          <Link
            key={card.id}
            href={`/anime/${card.slug}`}
            className='block'
          >
            <TiltCard
              imageSrc={card.image}
              imageAlt={card.plainTitle}
              title={card.title}
              author={card.author}
            />
          </Link>
        ))}
      </AnimatedGroup>
    </div>
  );
}
