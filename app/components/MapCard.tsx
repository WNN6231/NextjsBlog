"use client";

import { motion } from "framer-motion";

export default function MapCard() {
  return (
    <section className="mt-12 space-y-6">
      
      <div className="
      relative w-full h-[320px] rounded-3xl overflow-hidden transition-all duration-500
      bg-zinc-100 border-zinc-300/50 border backdrop-blur-md
      dark:bg-[#161616]/80 dark:border-zinc-800/50
      border group
      ">
        {/* 背景：动态点阵地图 */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" className="fill-zinc-800 dark:fill-zinc-400/20 transition-colors duration-500" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            
            {/* 这里模拟大陆轮廓的模糊光影 */}
            <motion.circle
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              cx="60%" cy="40%" r="100" 
              className="fill-blue-400 dark:fill-blue-600" 
              filter="blur(80px)"
            />
          </svg>
        </div>

        {/* 核心动态：地理坐标线 */}
        <div className="absolute inset-0 pointer-events-none">
            {/* 模拟经纬度扫描线 */}
            <motion.div 
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-500/20 to-transparent"
            />
        </div>

        {/* 那个闪烁的定位点 */}
        <div className="absolute top-[45%] left-[65%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></span>
            </div>
            {/* 具体的标签 */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  mt-4 px-3 py-1.5 rounded-lg text-[12px] whitespace-nowrap border transition-colors
                  bg-white/80 text-zinc-800 border-zinc-200 shadow-sm
                  dark:bg-black/50 dark:text-white dark:border-white/10
                  backdrop-blur-md"
            >
                📍 浙江，杭州
            </motion.div>
        </div>

        {/* 底部信息栏 */}
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-tighter">30° 15' N, 120° 10' E</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white transition-colors">Hangzhou, China</h3>
            </div>
            <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Timezone</p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors">GMT +8</p>
            </div>
        </div>
      </div>
    </section>
  );
}