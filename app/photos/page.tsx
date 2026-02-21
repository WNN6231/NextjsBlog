'use client';
import { InView } from '../components/core/in-view';
import { motion } from 'framer-motion'; // 建议统一使用 framer-motion 路径
import Image from 'next/image';

export default function InViewImagesGrid() {
  return (
    // 1. 移除 h-full，让内容自然延伸产生滚动条
    <div className='w-full '>
      
      <section className="flex h-screen w-full items-center justify-center">
        <div className='text-center -mt-60'>
          <p className='text-lg uppercase tracking-[0.3em] text-zinc-500 animate-pulse'>
            Friends, Myself & Photos
          </p>
          {/* 这里可以放你之前的瘦长菱形代码 */}
          <div className="mt-4 h-20 w-px bg-gradient-to-b from-zinc-500 to-transparent mx-auto" />
        </div>
      </section>

      {/* 3. 第二部分：图片网格 */}
      <div className='py-20'>
        <InView
          viewOptions={{ once: true, margin: '0px 0px -200px 0px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {/* 使用 columns 布局时，确保图片有 margin 撑开 */}
          <div className='columns-2 gap-4 px-4 sm:columns-3 lg:columns-4'>
            {[
              '0.webp',
              '1.webp',
              '2.webp',
              '3.webp',
              '4.webp',
              '5.webp',
              '6.webp',
              '7.webp',
              '8.webp',
              '9.webp',
              '10.webp',
              '11.webp',
              '12.webp',
              '13.webp',
              '14.webp',
              '15.webp',
              '16.webp',
              '17.webp',
              '18.webp',
              '19.webp',
              '20.webp',
              '21.webp',
              '22.webp',
              '23.webp',
              '24.webp',
              '25.webp',
              '26.webp',
              '27.webp',
              '28.webp',
              '29.webp',
              '30.webp',
              '31.webp',
              '32.webp',
              '33.webp',
              '34.webp',
              '35.webp',
              '36.webp',
              '37.webp',
              '38.webp',
              '39.webp',
              '40.webp',
              '41.webp',
              '42.webp',
              '43.webp',
              '44.webp',
              '45.webp',
              '46.webp',
              '47.webp',
              '48.webp',
              '49.webp',
              '50.webp',
              '51.webp',
              '52.webp',
              '53.webp',
              '54.webp',
              '55.webp',
              '56.webp',
              '57.webp',
              '58.webp',
              '59.webp',
              '60.webp',
              '61.webp',
              '62.webp',
              '63.webp',
              '64.webp',
              '65.webp',
              '66.webp',
              '67.webp',
              '68.webp',
              '69.webp',
              '70.webp',
              '71.webp',
              '72.webp',
              '73.webp',
              '74.webp',
              '75.webp',
              '76.webp',
              '77.webp',
              '78.webp',
              '79.webp',
              '80.webp',
              '81.webp',
              '82.webp',
              '83.webp',
              '84.webp',
              '85.webp',
              '86.webp',
              '87.webp',
              '88.webp',
              '89.webp',
              '90.webp',
              '91.webp',
              '92.webp',
              '93.webp',
              '94.webp',
              '95.webp',
              '96.webp',
              '97.webp',
              '98.webp',
              '99.webp',
              '100.webp',
              '101.webp',
              '102.webp',
              '103.webp',
              '104.webp',
            ].map((imgSrc, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                className='mb-4 break-inside-avoid'
              >
                <img
                  src={imgSrc}
                  alt={`Photos_${index}`}
                  className='w-full rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500'
                />
              </motion.div>
            ))}
          </div>
        </InView>
      </div>
    </div>
  );
}