import { Tilt } from '@/app/components/core/tilt';

export function TiltCard1() {
  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[400px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <img
          src='9e0047d8d587ab8029ba040d5ef43073395143382.webp'
          alt='Ghost in the shell - Kôkaku kidôtai'
          className='h-60 w-full object-cover'
        />
        <div className='p-2'>
          <h1 className='font-sans leading-snug text-zinc-950 dark:text-zinc-50'>
           『超かぐや姫！』<br />
            跨越8000年的爱恋
          </h1>
          <p className='text-zinc-700 dark:text-zinc-400'>山下清悟</p>
        </div>
      </div>
    </Tilt>
  );
}
