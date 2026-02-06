"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Photos", link: "/photos" },
  { name: "About", link: "/about" },
];

export default function FloatingNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const update = () => {
      if (!navRef.current) return;
      
      // 查找当前激活的元素
      const activeItem = navRef.current.querySelector(`[data-active="true"]`) as HTMLElement;
      
      if (activeItem) {
        const containerRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        // 精确计算相对位移
        // 减去 0.5 是为了抵消边框在渲染时的视觉重心偏移
        setCoords({
          x: itemRect.left - containerRect.left - 0.5, 
          width: itemRect.width,
          opacity: 1,
        });
      }
    };

    update();
    
    // 监听容器大小变化（比如字体渲染完后的宽度微变）
    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="relative flex items-center p-1 w-fit rounded-full bg-zinc-200/50 border-zinc-300/50 backdrop-blur-md border dark:bg-[#1b1b1b]/80 dark:border-white/5"
    >
      {/* 物理背景滑块 */}
      <motion.div
        className="absolute rounded-full z-0"
        animate={{
          x: coords.x,
          width: coords.width,
          opacity: coords.opacity,
        }}
        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
        style={{
          background: "var(--nav-pill-bg)",
          boxShadow: "var(--nav-pill-shadow)",
          border: "1px solid var(--nav-pill-border)",
          top: "4px",
          bottom: "4px",
          boxSizing: "border-box", // 关键：边框向内挤压
        }}
      />

      {navItems.map((item) => {
        const isActive = pathname === item.link;
        return (
          <Link
            key={item.name}
            href={item.link}
            data-active={isActive}
            className={`
              relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300
              flex items-center justify-center min-w-[64px]
              ${
                isActive
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }
            `}
          >
            {/* 增加平滑的过渡效果，让文字在变白时不会抖动 */}
            <span className="relative">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}