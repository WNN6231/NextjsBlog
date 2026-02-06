import { Tilt } from '@/app/components/core/tilt';

export function TiltCard5() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[400px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <img
          src='mygo.webp'
          alt='Ghost in the shell - Kôkaku kidôtai'
          className='h-60 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-sans leading-snug text-zinc-950 dark:text-zinc-50'>
            『MyGO!!!!!』<br />
            这是属于，我们的歌啊😭
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'>BanG Dream!</p>
        </div>
      </div>
    </Tilt>
  );
}
