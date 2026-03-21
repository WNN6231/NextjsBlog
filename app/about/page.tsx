'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { TextShimmer } from '@/app/components/core/text-shimmer';
import { InView } from '@/app/components/core/in-view'; 
import { Cursor } from '@/app/components/core/cursor';
import { SpinningTextCustomTransition } from '../components/SpinningTextCustomTransition';
// 假设你使用 next-themes 处理主题，如果没有安装，可以使用原生的 classList 切换
import { useTheme } from 'next-themes'; 

export default function AboutPage() {
  const { theme, setTheme } = useTheme();

  return (
    // 修改点：移除硬编码的 bg-zinc-950，改用响应式类名，并添加 transition 动画
    <motion.main 
      initial={false}
      animate={{ backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff' }}
      className="transition-colors duration-500 text-zinc-900 dark:text-zinc-50 min-h-screen"
    >
      

      {/* Hero Section */}
      <section className='relative flex h-[90vh] md:h-screen w-full flex-col items-center justify-center snap-start overflow-hidden'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className='relative flex h-64 w-full items-center justify-center'
        >
          {/* 装饰方块：适配边框颜色 */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.2, 0.5, 0.2],
              rotate: 45 
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-32 w-32 md:h-48 md:w-48 border border-zinc-300 dark:border-zinc-700 bg-transparent shadow-sm dark:shadow-[0_0_15px_rgba(113,113,122,0.1)]"
          />

          <TextShimmer
            className='z-10 text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400'
            duration={1.5}
          >
            Scroll down
          </TextShimmer>
        </motion.div>
      </section>

      <InView
        variants={{
          hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
          visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
        }}
        viewOptions={{ margin: '0px 0px -100px 0px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* 诗歌区域 */}
        <div className='flex flex-col items-center justify-center px-6 text-center pb-20'>
          <div className="flex flex-col items-center gap-6 md:gap-10 mt-10 md:mt-20"> 
            <h2 className='text-xl md:text-2xl tracking-[0.3em] font-sans text-zinc-500 dark:text-zinc-400 uppercase'>
              The Silent Shadow
            </h2>

            <div className='max-w-2xl text-lg md:text-3xl leading-[2.2] md:leading-loose text-zinc-600 dark:text-zinc-400 font-light px-2 italic'>
              "Between the desire and the spasm,<br className="hidden md:block" />
              Between the potency and the existence,<br className="hidden md:block" />
              Between the essence and the descent,<br />
              
              <span className='relative inline-block px-1 md:px-2 group'>
                <Cursor
                  attachToParent
                  variants={{
                    initial: { scale: 0.3, opacity: 0 },
                    animate: { scale: 1, opacity: 1 },
                    exit: { scale: 0.3, opacity: 0 },
                  }}
                  className='overflow-hidden -translate-y-20 md:-translate-y-30 hidden md:block'
                >
                  <img
                    src='shadow.webp'
                    alt='Shadow'
                    className='h-64 md:h-[400px] w-auto grayscale contrast-125 dark:invert'
                  />
                </Cursor>
                <span className='font-normal text-zinc-950 dark:text-zinc-100 transition-colors'>
                  Falls the Shadow."
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 个人介绍/核心诗词区块 */}
        <div className="flex w-full flex-col items-center justify-center px-6 md:px-20 lg:px-46 py-20 md:py-40 text-center">
          <div className="max-w-2xl w-full">
            <p className="text-base md:text-xl leading-relaxed font-light text-zinc-300 space-y-4">
              飞光飞光，劝尔一杯酒。<br /><br />
              吾不识青天高，黄地厚。<br /><br />
              唯见月寒日暖，来煎人寿。<br /><br />
              食熊则肥，食蛙则瘦。<br /><br />
              天东有若木，下置衔烛龙。<br /><br />
              吾将斩龙足，嚼龙肉，使之朝不得回，夜不得伏。<br /><br />
              自然老者不死，少者不哭。<br /><br />
              何为服黄金、吞白玉？<br /><br />
              谁似任公子，云中骑碧驴？<br /><br />
              刘彻茂陵多滞骨，嬴政梓棺费鲍鱼。<br /><br />
            </p>
          </div>
        </div>

        {/* 底部组件 */}
        <div className="w-full overflow-hidden pb-32">
          <div className="max-w-screen-xl mx-auto px-4 opacity-80 hover:opacity-100 transition-opacity">
            <SpinningTextCustomTransition />
          </div>
        </div>
      </InView>
    </motion.main>
  );
}