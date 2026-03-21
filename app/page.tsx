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
    <div className='min-h-screen font-sans selection:bg-zinc-800 transition-colors duration-500'>
      {/* 调整了基础 padding，移动端 px-5，桌面端留白更大 */}
      <main className='max-w-6xl mx-auto px-5 md:px-8 pt-12 pb-24 md:pb-32'>
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='space-y-6 md:space-y-8'
        >
          <TextScramble className='font-sans text-2xl md:text-4xl uppercase tracking-wider'>
            Wm1NlkN
          </TextScramble>

          {/* 移动端改为纵向排列，桌面端保持横向两端对齐；优化了字体大小的响应式 */}
          <div className='flex flex-col md:flex-row items-start md:items-baseline justify-between w-full gap-2 md:gap-0'>
            <TextShimmer
              duration={1.2}
              className='text-4xl sm:text-5xl md:text-6xl font-medium [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]'
            >
              Welcome to My World.
            </TextShimmer>
            <div className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter opacity-80'>
              <Clock />
            </div>
          </div>

          <div className='text-zinc-600 dark:text-zinc-400 space-y-3 md:space-y-2 leading-relaxed text-sm md:text-base'>
            <div>
              <TextEffect per='char' preset='fade'>
                你好，我是Wm1NlkN，一个学生 & 一瓶牛奶。
              </TextEffect>
            </div>
            <div>
              <TextEffect per='char' preset='fade' delay={0.5}>
                平时喜欢记录一些日常，深度沉迷互联网又想在信息汪洋中有个锚点，于是便有了这个博客。
              </TextEffect>
            </div>
            <div className='pt-2 md:pt-0'>
              <TextLoop>
                <span>'当时只道是寻常。'</span>
                <span>「月が綺麗ですね」</span>
                <span>'This is the way the world ends / Not with a bang but a whimper.'</span>
                <span>'Я научилась просто, мудро жить...'</span>
              </TextLoop>
            </div>
          </div>

          <div className='pt-4'>
            <SocialLinks />
          </div>
        </motion.section>

        {/* 摄影墙区域：移动端调整了间距和 padding，避免与边界贴太紧 */}
        <div className='mt-16 md:mt-20'>
          <AnimatedGroup
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
            preset='scale'
          >
            {/* 建议在 img 外层包裹 overflow-hidden 避免 hover 溢出 */}
            <div className='overflow-hidden rounded-lg'>
              <img src='flower.webp' alt='Impressionist painting' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer' />
            </div>
            <div className='overflow-hidden rounded-lg'>
              <img src='9E209C348D2C5F40FEFFBCBF32CBF59A.webp' alt='Impressionist painting' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer' />
            </div>
            <div className='overflow-hidden rounded-lg'>
              <img src='clay-banks-Q3DaZ8vmBAA-unsplash.webp' alt='Impressionist painting' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer' />
            </div>
          </AnimatedGroup>
          
          <AnimatedGroup className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6'>
            <div className='overflow-hidden rounded-lg'>
              <img src='gavin-wilson-vqUElZs3AeA-unsplash.webp' alt='Impressionist painting' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer' />
            </div>
            <div className='overflow-hidden rounded-lg'>
              <img src='charles-postiaux-DdTuylT4IkA-unsplash.webp' alt='Impressionist painting' className='h-auto w-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer' />
            </div>
          </AnimatedGroup>
        </div>

        {/* 旅程与地图区域：移动端缩短顶部间距，确保平滑过渡 */}
        <div className='mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start'>
          <section className='space-y-8 md:space-y-12'>
            <h2 className='text-xl md:text-lg font-medium border-b border-zinc-200 dark:border-zinc-800 pb-2 inline-block'>我的旅程</h2>
            <div className='space-y-8 md:space-y-10'>
              <JourenyItem year='2024 - 现在' title='杭州电子科技大学' subtitle='网络空间安全，网络空间安全学院' location='杭州' />
              <JourenyItem year='2023 - 2024' title='杭州电子科技大学' subtitle='工业设计，人文艺术与数字媒体、法学院' location='杭州' />
              <JourenyItem year='2020 - 2023' title='浙江省萧山中学' location='杭州' />
            </div>
          </section>

          <aside className='space-y-6 md:space-y-8 w-full'>
            <div className='max-w-xl mx-auto lg:mx-0 w-full'>
              <h2 className='text-xl md:text-lg font-medium border-b border-zinc-200 dark:border-zinc-800 pb-2 inline-block mb-6 md:mb-8'>居住地</h2>
              <MapCard />
            </div>
          </aside>
        </div>

        {/* 动漫卡片区域：修正了 my-30 的非法类名，采用响应式间距 */}
        <div className='my-16 md:my-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {CARDS.map((card) => (
            <TiltCard key={card.id} imageSrc={card.image} title={card.title} author={card.author} />
          ))}
        </div>

        {/* 技术栈区域 */}
        <div className='mb-12 md:mb-0'>
          <h2 className='text-xl md:text-lg font-medium border-b border-zinc-200 dark:border-zinc-800 pb-2 inline-block mb-6'>技术栈</h2>
          <AnimatedCardBackgroundHover />
        </div>

        {/* 保持桌面端显示的 Sakana 组件 */}
        <div className='hidden xl:block fixed bottom-4 right-4 z-50'>
          <Sakana />
        </div>
        
      </main>
    </div>
  );
}