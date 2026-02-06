"use client";

import { motion } from "framer-motion";
import MapCard from "./components/MapCard";
import { TextEffect } from './components/core/text-effect';
import { TextScramble } from './components/core/text-scramble';
import { TextShimmer } from './components/core/text-shimmer';
import { AnimatedGroup } from './components/core/animated-group';
import { AnimatedCardBackgroundHover } from './components/AnimatedCardBackgroundHover';
import { TextLoop } from './components/core/text-loop';
import { Clock } from './components/Clock';
import { SocialLinks } from "./components/SocialLinks";
import { JourenyItem } from "./components/JourenyItem";
import { TiltCard1 } from "./components/TiltCard1";
import { TiltCard2 } from "./components/TiltCard2";
import { TiltCard3 } from "./components/TiltCard3";
import { TiltCard4 } from "./components/TiltCard4";
import { TiltCard5 } from "./components/TiltCard5";
import { TiltCard6 } from "./components/TiltCard6";

export default function HomePage() {
  return (

      <div className="min-h-screen  font-sans selection:bg-zinc-800 transition-colors duration-500">

        <main className="max-w-6xl mx-auto px-1 pt-5 pb-32">

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, margin:"-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <TextScramble className='font-sans text-4xl uppercase'>
              Wm1NlkN
            </TextScramble>

            <div className="flex items-baseline justify-between w-full">
              <TextShimmer
                duration={1.2}
                className='text-6xl font-medium [--base-color:var(--color-blue-600)] [--base-gradient-color:var(--color-blue-200)] dark:[--base-color:var(--color-blue-700)] dark:[--base-gradient-color:var(--color-blue-400)]'
              >
                Welcome to My World.
              </TextShimmer>
              <div className="text-6xl font-bold tracking-tighter opacity-80">
                <Clock />
              </div>
            </div>

            <div className="text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
              <div>
                <TextEffect per="char" preset="fade">
                  你好，我是Wm1NlkN，一个学生 & 一瓶牛奶。
                </TextEffect>
              </div>
              <div>
                <TextEffect per="char" preset="fade" delay={0.5}>
                  平时喜欢记录一些日常，深度沉迷互联网又想在信息汪洋中有个锚点，于是便有了这个博客。
                </TextEffect>
              </div>
              <div>
                 <TextLoop>
                  <span>"当时只道是寻常。"</span>
                  <span>「月が綺麗ですね」</span>
                  <span>"This is the way the world ends / Not with a bang but a whimper."</span>
                  <span>"Я научилась просто, мудро жить..."</span>
                </TextLoop>
              </div>
            </div>

            {/* 社媒链接 */}
            < SocialLinks />
            

          </motion.section>

          <AnimatedGroup
            className='grid grid-cols-2 gap-4 p-8 md:grid-cols-3 lg:grid-cols-3'
            preset='scale'
          >
            <img
              src='flower.webp'
              alt='impressionist painting, uploaded to Cosmos'
              className='h-auto w-full rounded-[4px] transition-transform duration-300 hover:scale-110 cursor-pointer'
            />
            <img
              src='9E209C348D2C5F40FEFFBCBF32CBF59A.webp'
              alt='impressionist painting, uploaded to Cosmos'
              className='h-auto w-full rounded-[4px] transition-transform duration-300 hover:scale-110 cursor-pointer'
            />
            <img
              src='clay-banks-Q3DaZ8vmBAA-unsplash.webp'
              alt='impressionist painting, uploaded to Cosmos'
              className='h-auto w-full rounded-[4px] transition-transform duration-300 hover:scale-110 cursor-pointer'
            />
          </AnimatedGroup>
          <AnimatedGroup
            className='grid grid-cols-2 gap-4 p-8 md:grid-cols-3 lg:grid-cols-2'>
            <img
              src='gavin-wilson-vqUElZs3AeA-unsplash.webp'
              alt='impressionist painting, uploaded to Cosmos'
              className='h-auto w-full rounded-[4px] transition-transform duration-300 hover:scale-110 cursor-pointer'
            />
            <img
              src='charles-postiaux-DdTuylT4IkA-unsplash.webp'
              alt='impressionist painting, uploaded to Cosmos'
              className='h-auto w-full rounded-[4px] transition-transform duration-300 hover:scale-110 cursor-pointer'
            />
          </AnimatedGroup>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-start">
            {/* 旅程区 */}
            <section className="space-y-12">
              <h2 className="text-lg font-medium">我的旅程</h2>

              <div className="space-y-10">
                <JourenyItem
                  year="2024 - 现在"
                  title="杭州电子科技大学"
                  subtitle="网络空间安全，网络空间安全学院"
                  location="杭州"
                />
                <JourenyItem
                  year="2023 - 2024"
                  title="杭州电子科技大学"
                  subtitle="工业设计，人文艺术与数字媒体、法学院"
                  location="杭州"
                />
                <JourenyItem
                  year="2020 - 2023"
                  title="浙江省萧山中学"
                  location="杭州"
                />
              </div>
            </section>

            <aside className="space-y-8">
              {/* 地图组件 */}
              <div className=" max-w-xl">
                <h2 className="text-lg font-medium">居住地</h2>
                <MapCard />
              </div>
            </aside>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto my-30">
            <TiltCard1 />
            <TiltCard2 />
            <TiltCard3 />
            <TiltCard4 />
            <TiltCard5 />
            <TiltCard6 />
          </div>

          <div>
            <h2 className="text-lg font-medium">技术栈</h2>
            <AnimatedCardBackgroundHover />
          </div>

          
          
        </main>
      </div>
  );
}