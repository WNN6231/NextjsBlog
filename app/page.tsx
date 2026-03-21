'use client';

import { motion } from 'framer-motion';
import MapCard from './components/MapCard';
import { TextEffect } from './components/core/text-effect';
import { TextScramble } from './components/core/text-scramble';
import { TextShimmer } from './components/core/text-shimmer';
import { AnimatedGroup } from './components/core/animated-group';
import { AnimatedCardBackgroundHover } from './components/AnimatedCardBackgroundHover';
import { TextLoop } from './components/core/text-loop';
import { Clock } from './components/Clock';
import { SocialLinks } from './components/SocialLinks';
import { JourenyItem } from './components/JourenyItem';
import { TiltCard, CARDS } from './components/TiltCard';
import Sakana from './components/Sakana';

export default function HomePage() {
  return (
    /* 关键修复 1: 增加 overflow-x-hidden 确保页面不会产生横向滚动条 */
    <div className='min-h-screen font-sans selection:bg-zinc-800 transition-colors duration-500 overflow-x-hidden'>
      <main className='max-w-6xl mx-auto px-6 md:px-8 pt-12 pb-24 md:pb-32'>
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='space-y-6 md:space-y-8'
        >
          <TextScramble className='font-sans text-xl md:text-4xl uppercase tracking-wider'>
            Wm1NlkN
          </TextScramble>

          <div className='flex flex-col md:flex-row items-start md:items-baseline justify-between w-full gap-4 md:gap-0'>
            {/* 关键修复 2: 调小移动端字号，text-3xl 更加稳妥，防止长句子撑开屏幕 */}
            <TextShimmer
              duration={1.2}
              className='text-3xl sm:text-5xl md:text-6xl font-medium [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)] leading-tight'
            >
              Welcome to My World.
            </TextShimmer>
            
            {/* 关键修复 3: 优化时钟大小。移动端 text-2xl 或 3xl 比较合适 */}
            <div className='text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter opacity-80'>
              <Clock />
            </div>
          </div>

          <div className='text-zinc-600 dark:text-zinc-400 space-y-3 md:space-y-2 leading-relaxed text-sm md:text-base max-w-full'>
            <div className='break-words'>
              <TextEffect per='char' preset='fade'>
                你好，我是Wm1NlkN，一个学生 & 一瓶牛奶。
              </TextEffect>
            </div>
            <div className='break-words'>
              <TextEffect per='char' preset='fade' delay={0.5}>
                平时喜欢记录一些日常，深度沉迷互联网又想在信息汪洋中有个锚点，于是便有了这个博客。
              </TextEffect>
            </div>
            <div className='pt-2 md:pt-0 italic opacity-80'>
              <TextLoop>
                <span>'当时只道是寻常。'</span>
                <span>「月が綺麗ですね」</span>
                <span>'This is the way the world ends...'</span>
                <span>'Я научилась просто, мудро жить...'</span>
              </TextLoop>
            </div>
          </div>

          {/* 关键修复 4: 确保 SocialLinks 内部是 flex-wrap 的 */}
          <div className='pt-4 max-w-full overflow-hidden'>
             <SocialLinks />
          </div>
        </motion.section>

        {/* 摄影墙区域 */}
        <div className='mt-16 md:mt-20'>
          <AnimatedGroup
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
            preset='scale'
          >
            <div className='overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
              <img src='flower.webp' alt='Photo' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer' />
            </div>
            <div className='overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
              <img src='9E209C348D2C5F40FEFFBCBF32CBF59A.webp' alt='Photo' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer' />
            </div>
            <div className='overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900'>
              <img src='clay-banks-Q3DaZ8vmBAA-unsplash.webp' alt='Photo' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer' />
            </div>
          </AnimatedGroup>
        </div>

        {/* 其余部分保持一致，但确保容器都有 max-w-full */}
        <div className='mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-full'>
          <section className='space-y-8'>
            <h2 className='text-lg font-medium opacity-50'>我的旅程</h2>
            <div className='space-y-8'>
              <JourenyItem year='2024 - 现在' title='杭州电子科技大学' subtitle='网络空间安全' location='杭州' />
              <JourenyItem year='2023 - 2024' title='杭州电子科技大学' subtitle='工业设计' location='杭州' />
              <JourenyItem year='2020 - 2023' title='浙江省萧山中学' location='杭州' />
            </div>
          </section>

          <aside className='w-full overflow-hidden'>
            <h2 className='text-lg font-medium opacity-50 mb-6'>居住地</h2>
            <MapCard />
          </aside>
        </div>

        <div className='my-16 md:my-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {CARDS.map((card) => (
            <TiltCard key={card.id} imageSrc={card.image} title={card.title} author={card.author} />
          ))}
        </div>

        <div className='mb-12'>
          <h2 className='text-lg font-medium opacity-50 mb-6'>技术栈</h2>
          <AnimatedCardBackgroundHover />
        </div>

        <div className='hidden xl:block fixed bottom-4 right-4 z-50'>
          <Sakana />
        </div>
      </main>
    </div>
  );
}