import { Tilt } from '@/app/components/core/tilt';

export function TiltCard3() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[400px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <img
          src='79bfe369a2fb7fc1d8e59df199f73bb9f90d1796.webp'
          alt='Ghost in the shell - Kôkaku kidôtai'
          className='h-60 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-sans leading-snug text-zinc-950 dark:text-zinc-50'>
            『やはり俺の青春ラブコメはまちがっている』<br />
            我也想要真物
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'>渡航</p>
        </div>
      </div>
    </Tilt>
  );
}
