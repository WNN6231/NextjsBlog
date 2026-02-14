"use client";

import React, { useEffect, useRef } from 'react';
import SakanaWidget from 'sakana-widget';
import 'sakana-widget/lib/index.css';

const Sakana: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<SakanaWidget | null>(null);

  useEffect(() => {

    const handle = requestAnimationFrame(() => {
      if (containerRef.current && !widgetRef.current) {
        try {
          const instance = new SakanaWidget({
            size: 200,
            autoFit: false,
            character: 'chisato',
          });
          
          instance.mount(containerRef.current);
          widgetRef.current = instance;
        } catch (err) {
          console.error("SakanaWidget 挂载失败:", err);  
        }
      }
    });

    return () => {
      cancelAnimationFrame(handle);
      if (widgetRef.current) {
        widgetRef.current.unmount();
        widgetRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      className="sakana-container"
      style={{ 
        position: 'fixed', 
        left: '60px', 
        bottom: '20px', 
        zIndex: 50,
        width: '200px',
        height: '200px'
      }}
    >
      {/* 实际挂载点 */}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Sakana;