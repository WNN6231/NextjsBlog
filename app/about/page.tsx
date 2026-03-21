'use client';

import React from 'react';
import { motion } from 'framer-motion'; // 建议统一使用 framer-motion 
import { TextShimmer } from '@/app/components/core/text-shimmer';
import { InView } from '@/app/components/core/in-view'; 
import { Cursor } from '@/app/components/core/cursor';
import { SpinningTextCustomTransition } from '../components/SpinningTextCustomTransition';

export default function AboutPage() {
  return (
    <main className="text-white bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className='relative flex h-[90vh] md:h-screen w-full flex-col items-center justify-center snap-start overflow-hidden'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className='z-10 w-full max-w-2xl px-6'
        />

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='relative flex h-64 w-full items-center justify-center'
        >
          {/* 装饰方块：移动端缩小尺寸 */}
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
            className="absolute h-32 w-32 md:h-48 md:w-48 border border-zinc-500 bg-transparent shadow-[0_0_15px_rgba(113,113,122,0.1)]"
          />

          <TextShimmer
            className='z-10 text-xs md:text-sm font-medium uppercase tracking-[0.4em]'
            duration={1.2}
          >
            Scroll down
          </TextShimmer>
        </motion.div>
      </section>

      <InView
        variants={{
          hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* 诗歌/引言区域 */}
        <div className='flex flex-col items-center justify-center px-6 text-center pb-20'>
          <div className="flex flex-col items-center gap-6 md:gap-10 mt-10 md:mt-20"> 
            <h2 className='text-xl md:text-3xl tracking-[0.2em] font-sans text-zinc-400 dark:text-zinc-100 uppercase'>
              The Silent Shadow
            </h2>

            {/* 调整移动端字号和行高，防止文字堆叠 */}
            <div className='max-w-2xl text-lg md:text-3xl leading-[2.2] md:leading-loose text-zinc-400 font-light px-2'>
              "Between the desire and the spasm,<br className="hidden md:block" />
              Between the potency and the existence,<br className="hidden md:block" />
              Between the essence and the descent,<br />
              
              <span className='relative inline-block px-1 md:px-2 group'>
                <Cursor
                  attachToParent
                  variants={{
                    initial: { height: 0, opacity: 0, scale: 0.3 },
                    animate: { height: 'auto', opacity: 1, scale: 1 },
                    exit: { height: 0, opacity: 0, scale: 0.3 },
                  }}
                  transition={{ type: 'spring', duration: 0.3, bounce: 0.1 }}
                  // 移动端隐藏或缩小这个浮动图片，防止挡住文字
                  className='overflow-hidden -translate-y-20 md:-translate-y-30 hidden md:block'
                  springConfig={{ bounce: 0.01 }}
                >
                  <img
                    src='shadow.webp'
                    alt='Shadow'
                    className='h-80 md:h-[173px] w-auto'
                  />
                </Cursor>
                <span className='font-medium text-zinc-200 dark:text-zinc-100 transition-colors cursor-default'>
                  Falls the Shadow."
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 个人介绍区块：核心修复点 */}
        <div className="flex w-full flex-col items-center justify-center px-6 md:px-20 lg:px-46 py-20 md:py-40 text-center">
          <div className="max-w-2xl w-full">
            <h3 className="mb-6 md:mb-8 text-xs md:text-sm font-medium uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-500">
              Something Else
            </h3>
            {/* 移动端字号降级，行高保持呼吸感 */}
            <p className="text-base md:text-xl leading-relaxed font-light text-zinc-300 space-y-4">
              其实很早以前就想着写一个这样的博客。<br /><br />
              但是总是被各种事情搁置。<br /><br />
              现在他终于面世了，<br /><br />
              万分感慨写博客期间发生的各种事情，<br /><br />
              我大概一辈子忘不掉日夜开发博客的时光了。<br /><br />
              我是WNN，欢迎你踏入我的世界，<br /><br />
              谢谢你看我的博客。
            </p>
          </div>
        </div>

        {/* 底部组件适配 */}
        <div className="w-full overflow-hidden pb-20">
          <div className="max-w-screen-xl mx-auto px-4">
            <SpinningTextCustomTransition />
          </div>
        </div>
      </InView>
    </main>
  );
}