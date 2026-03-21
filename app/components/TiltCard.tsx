'use client';

import { Tilt } from '@/app/components/core/tilt';
import { title } from 'process';
import React from 'react';

interface TiltCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string | React.ReactNode;
  author: string;
  rotationFactor?: number;
  isRevese?: boolean;
  className?: string;
}

export function TiltCard({
    imageSrc,
    imageAlt = 'Cover Image',
    title,
    author,
    rotationFactor = 8,
    isRevese = true,
    className = '',
}: TiltCardProps) {
    return (
        <Tilt
            rotationFactor={rotationFactor}
            isRevese={isRevese}
            className={`w-full ${className}`}
        >
            <div
                style={{borderRadius: '12px'}}
                className = 'flex w-full h-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
            >
                <div className='aspect-[16/9] w-full overflow-hidden'>
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                    />
                </div>
                <div className='p-4'>
                    <h1 className='font-sans leading-snug text-lg text-zinc-950 dark:text-zinc-50'>
                        {title}
                    </h1>
                    <p className='text-base text-zinc-700 dark:text-zinc-400'>{author}</p>
                </div>
            </div>
        </Tilt>
    )
}


export const CARDS = [
  {
    id: '1',
    image: '9e0047d8d587ab8029ba040d5ef43073395143382.webp',
    title: <>『超かぐや姫！』<br />跨越8000年的爱恋</>,
    author: '山下清悟',
  },
  {
    id: '2',
    image: '20260220_022429.webp',
    title: <>『リズと青い鸟』<br />我在人声鼎沸中望向你</>,
    author: '山田尚子',
  },
  {
    id: '3',
    image: '79bfe369a2fb7fc1d8e59df199f73bb9f90d1796.webp',
    title: <> 『やはり俺の青春ラブコメはまちがっている』<br />我也想要真物</>,
    author: '渡航',
  },
  {
    id: '4',
    image: 'guduyaogun.webp',
    title: <>『ぼっち・ざ・ろっく！』<br />吉他与孤独与蓝色星球🎸</>,
    author: 'はまじあき',
  },
  {
    id: '5',
    image: 'mygo.webp',
    title: <>『MyGO!!!!!』<br />这是属于，我们的歌啊😭</>,
    author: 'BanG Dream!',
  },
  {
    id: '6',
    image: 'GBC2.webp',
    title: <>『GIRLS BAND CRY』<br />一起对生活竖起中指吧！👌</>,
    author: 'TOEI ANIMATION',
  },
];