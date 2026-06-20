'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shield, Compass } from 'lucide-react';

export default function TempleSection() {
  return (
    <section id="temple" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center justify-center">
      {/* Dark radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Rotating Sacred Geometry Mandala Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
          {/* Outer circle */}
          <circle cx="100" cy="100" r="95" fill="none" stroke="#00BFFF" strokeWidth="0.5" />
          {/* Inner concentric rings */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#00BFFF" strokeWidth="0.3" strokeDasharray="3,3" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#00BFFF" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="#00BFFF" strokeWidth="0.3" />
          
          {/* Star geometry / Triangles (representing Sri Yantra style layers) */}
          <polygon points="100,20 170,140 30,140" fill="none" stroke="#2563EB" strokeWidth="0.4" />
          <polygon points="100,180 170,60 30,60" fill="none" stroke="#00BFFF" strokeWidth="0.4" />
          
          <polygon points="100,35 155,130 45,130" fill="none" stroke="#2563EB" strokeWidth="0.3" />
          <polygon points="100,165 155,70 45,70" fill="none" stroke="#00BFFF" strokeWidth="0.3" />
          
          {/* Outer rays */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const x1 = 100 + 80 * Math.cos(angle);
            const y1 = 100 + 80 * Math.sin(angle);
            const x2 = 100 + 95 * Math.cos(angle);
            const y2 = 100 + 95 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00BFFF" strokeWidth="0.3" />
            );
          })}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center"
        >
          {/* Section Indicator */}
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-6">
            06 // SACRED SPACES
          </span>

          {/* Title */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-widest uppercase text-white mb-8">
            Temple of Innovation
          </h2>
          
          <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-sapphire to-transparent mb-10" />

          {/* Core Philosophy Copy */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light mb-12 max-w-2xl">
            In the ancient Sanskrit tradition, <strong className="text-sapphire glow-text-sapphire">Ṛta</strong> represents the cosmic rhythm that orders the universe. We embed this structural blueprint of equilibrium into cognitive agent networks, generating balanced systems that align technological execution with natural harmony.
          </p>

          {/* Stepped Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full mt-6">
            <div className="p-6 glassmorphism border border-white/[0.04] rounded-sm group hover:border-sapphire/30 transition-all duration-300">
              <div className="w-10 h-10 bg-sapphire/5 border border-sapphire/15 rounded-sm flex items-center justify-center mb-4 text-sapphire">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Cosmic Symmetry
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Employing fractal geometry blueprints to partition neural layers for maximum parallel load capabilities.
              </p>
            </div>

            <div className="p-6 glassmorphism border border-white/[0.04] rounded-sm group hover:border-sapphire/30 transition-all duration-300">
              <div className="w-10 h-10 bg-sapphire/5 border border-sapphire/15 rounded-sm flex items-center justify-center mb-4 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Geometric Resonance
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Tuning generative neural weights to mathematical ratios found in ancient architectural sanctuaries.
              </p>
            </div>

            <div className="p-6 glassmorphism border border-white/[0.04] rounded-sm group hover:border-sapphire/30 transition-all duration-300">
              <div className="w-10 h-10 bg-sapphire/5 border border-sapphire/15 rounded-sm flex items-center justify-center mb-4 text-sapphire-deep">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Architectural Integrity
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Constructing decentralized networks inspired by modular stone sanctuaries designed to endure for epochs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
