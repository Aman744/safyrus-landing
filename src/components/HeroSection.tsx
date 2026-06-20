'use client';

import { motion } from 'framer-motion';
import { Compass, Rocket } from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-6 pt-20">
      {/* Radial overlay to dim background edges for cinema effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_90%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Subtitle / Tag */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-sapphire/20 bg-sapphire/5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 bg-sapphire rounded-full animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium text-sapphire glow-text-sapphire">
              A.I. INITIATIVE // ANCIENT COSMOLOGY
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider leading-[1.1] mb-8 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent uppercase"
          >
            Engineering the Future <br className="hidden sm:inline" />
            <span className="text-white">Through Intelligence,</span> <br />
            <span className="bg-gradient-to-r from-sapphire via-cyan-400 to-sapphire-deep bg-clip-text text-transparent glow-text-sapphire">
              Innovation & Civilization
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-slate-400 max-w-3xl leading-relaxed mb-12 font-light"
          >
            We create AI-powered digital ecosystems, intelligent products, immersive experiences, and transformative technologies inspired by timeless knowledge and modern innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center w-full sm:w-auto"
          >
            {/* CTA 1: Explore Capabilities */}
            <a
              href="#capabilities"
              className="relative w-full sm:w-auto px-8 py-4 rounded-sm border border-sapphire/40 bg-sapphire/10 text-white font-medium text-sm uppercase tracking-[0.2em] hover:glow-border-sapphire transition-all duration-300 flex items-center justify-center gap-2.5 overflow-hidden group shadow-lg shadow-sapphire/10"
            >
              {/* Sliding glow */}
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-sapphire/20 to-cyan-500/20 transition-all duration-500 ease-out group-hover:w-full" />
              <Compass className="w-4 h-4 text-sapphire animate-spin-slow group-hover:text-white" />
              <span className="relative">Explore Capabilities</span>
            </a>

            {/* CTA 2: Start a Project */}
            <a
              href="#contact"
              className="relative w-full sm:w-auto px-8 py-4 rounded-sm border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-300 text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2.5 group"
            >
              <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300 text-slate-400 group-hover:text-white" />
              <span>Start a Project</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-sapphire to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounce_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
