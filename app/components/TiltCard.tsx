'use client';

import { Tilt } from '@/app/components/core/tilt';
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
                        loading='lazy'
                        decoding='async'
                        className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
                    />
                </div>
                <div className='p-4'>
                    <h2 className='font-sans leading-snug text-lg text-zinc-950 dark:text-zinc-50'>
                        {title}
                    </h2>
                    <p className='text-base text-zinc-700 dark:text-zinc-400'>{author}</p>
                </div>
            </div>
        </Tilt>
    )
}
