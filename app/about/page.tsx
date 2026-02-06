'use client';

import React from 'react';
import { motion } from 'motion/react'; // 如果报错，请改为 'framer-motion'
import { TextShimmer } from '@/app/components/core/text-shimmer';
import { InView } from '@/app/components/core/in-view'; // 假设你已按同样方式下载了 InView
import { Cursor } from '@/app/components/core/cursor';
import { SpinningTextCustomTransition } from '../components/SpinningTextCustomTransition';
import { ImageComparisonSpring } from "../components/ImageComparisonSpring"

export default function AboutPage() {
  return (
    <main className="text-white">

      {/* 第一部分：全屏的滚动引导 */}
      <section className='relative flex h-screen w-full flex-col items-center justify-center snap-start'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='z-10 w-full max-w-2xl px-6'
        >
          {/* 这里可以放你的标题 */}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='relative flex h-64 w-full items-center justify-center -mt-60'
        >
          {/* 1. 背景动画菱形 */}
          <motion.div
            initial={{ rotate: 45 }}
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.2, 0.6, 0.2],
              rotate: 45 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute h-48 w-48 border border-zinc-500 bg-transparent shadow-[0_0_15px_rgba(113,113,122,0.1)]"
          />

          {/* 2. 前景文字层 (Scramble 效果) */}
          <TextShimmer
            className='z-10 text-sm font-medium uppercase tracking-[0.4em] '
            duration={1.2}
          >
            Scroll down
          </TextShimmer>
        </motion.div>
      </section>

      {/* 第二部分：内容展示 */}
      <InView
        variants={{
          hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -200px 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className='flex min-h-[50vh] flex-col items-center justify-center px-6 text-center pb-100'>
          <div className="flex flex-col items-center gap-10"> 
              
              {/* 标题部分 */}
              <h2 className='text-3xl tracking-[0.2em] font-sans text-zinc-400 dark:text-zinc-100 uppercase'>
              The Silent Shadow
              </h2>

              {/* 诗歌部分 */}
              <div className='max-w-2xl text-3xl leading-loose text-zinc-400  font-light'>
              "Between the desire and the spasm,<br />
              Between the potency and the existence,<br />
              Between the essence and the descent,<br />
              
                <span className='relative inline-block px-2'>
                  <Cursor
                    attachToParent
                    variants={{
                      initial: { height: 0, opacity: 0, scale: 0.3 },
                      animate: { height: 'auto', opacity: 1, scale: 1 },
                      exit: { height: 0, opacity: 0, scale: 0.3 },
                    }}
                    transition={{
                      type: 'spring',
                      duration: 0.3,
                      bounce: 0.1,
                    }}
                    className='overflow-hidden -translate-y-30'
                    springConfig={{
                      bounce: 0.01,
                    }}
                  >
                    <img
                      src='shadow.webp'
                      alt='Christian Church, Eastern Europe'
                      className='h-173 w-110.8'
                    />
                  </Cursor>
                  <span className='font-medium text-zinc-900 dark:text-zinc-100 transition-colors cursor-default'>
                    Falls the Shadow."
                  </span>
                </span>
              </div>
          </div>
        </div>

        <div className="w-full max-w-none px-0 lg:max-w-8xl lg:mx-auto">
          <SpinningTextCustomTransition />
          <ImageComparisonSpring />
        </div>
      </InView>
      
    </main>
  );
}