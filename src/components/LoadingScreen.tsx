'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulated load percentage progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // short delay to show 100%
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4; // increment randomly
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 w-screen h-screen z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background soft nebula spot */}
      <div className="absolute w-[400px] h-[400px] bg-sapphire-deep/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center gap-10 relative z-10">
        {/* Spinning Sacred Geometry Mandala Loader */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Inner ring */}
          <div className="absolute w-24 h-24 border border-sapphire/35 rounded-full animate-spin-slow" />
          
          {/* Middle Ring */}
          <div className="absolute w-32 h-32 border border-dashed border-cyan-400/25 rounded-full animate-spin-reverse-slow" />

          {/* Outer geometric rings */}
          <svg viewBox="0 0 100 100" className="w-36 h-36 animate-spin-slow absolute">
            <polygon 
              points="50,10 90,75 10,75" 
              fill="none" 
              stroke="#00BFFF" 
              strokeWidth="0.5" 
              className="glow-border-sapphire" 
            />
            <polygon 
              points="50,90 90,25 10,25" 
              fill="none" 
              stroke="#2563EB" 
              strokeWidth="0.5" 
            />
          </svg>

          {/* Glowing central core */}
          <div className="w-4 h-4 bg-sapphire rounded-full animate-pulse glow-bg-sapphire" />
        </div>

        {/* Loading details */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500 font-bold">
            SYSTEM BOOT SEQUENCE
          </span>
          <span className="font-mono text-3xl font-extrabold text-white glow-text-sapphire tracking-wide">
            {progress}%
          </span>
          <div className="w-48 h-[2px] bg-white/5 rounded-full mt-2 overflow-hidden relative">
            <motion.div 
              className="h-full bg-gradient-to-r from-sapphire to-cyan-400 glow-bg-sapphire"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase text-sapphire/60 tracking-[0.2em] font-semibold mt-1">
            Loading 3D Engine & Shader Arrays...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
