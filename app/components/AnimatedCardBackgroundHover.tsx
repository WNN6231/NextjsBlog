import { AnimatedBackground } from './core/animated-background';

export function AnimatedCardBackgroundHover() {
  const ITEMS = [
    {
      id: 1,
      title: 'Next.js',
      description: '框架',
    },
    {
      id: 2,
      title: 'Tailwind',
      description: '样式',
    },
    {
      id: 3,
      title: 'shadcn/ui',
      description: '组件',
    },
    {
      id: 4,
      title: 'Motion-primitives',
      description: '动效',
    },
    {
      id: 5,
      title: 'Supabase',
      description: '后端',
    },
    {
      id: 6,
      title: 'Vercel',
      description: '部署',
    },
  ];

  return (
    <div className='grid grid-cols-2 p-10 md:grid-cols-3'>
      <AnimatedBackground
        className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {ITEMS.map((item, index) => (
          <div key={index} data-id={`card-${index}`}>
            <div className='flex select-none flex-col space-y-1 p-4'>
              <h3 className='text-base font-medium text-zinc-800 dark:text-zinc-50'>
                {item.title}
              </h3>
              <p className='text-base text-zinc-600 dark:text-zinc-400'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  );
}
