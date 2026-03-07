import { GlowEffect } from '../components/core/glow-effect';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function GlowEffectButton() {
  return (
    <div className='relative inline-block group'>
      <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <GlowEffect
          colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
          mode='colorShift'
          blur='medium'
          duration={4}
          scale={0.9}
        />
      </div>
      
      <Link href="/blog" className='relative inline-flex items-center gap-2 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-1 outline-[#fff2f21f]'>
        <ArrowLeft className='h4 w-4transition-transform group-hover:-translate-x-1' />
        Back to Blog 
      </Link>
    </div>
  );
}
