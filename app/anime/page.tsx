import { TiltCard } from '@/app/components/TiltCard';
import { CARDS } from '@/app/components/TiltCardData';

export default function AnimePage() {
  return (
    <div className='mx-auto my-16 w-full max-w-7xl px-4 md:my-32'>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-6'>
        {CARDS.map((card) => (
          <TiltCard key={card.id} imageSrc={card.image} title={card.title} author={card.author} />
        ))}
      </div>
    </div>
  )
}