'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import Capabilities from '@/components/Capabilities';
import LabSection from '@/components/LabSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import TempleSection from '@/components/TempleSection';
import ContactSection from '@/components/ContactSection';
import Scene3D from '@/components/Scene3D';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-[#050505] text-slate-100 selection:bg-sapphire selection:text-black">
      {/* 1. Full-screen Loading Entrance */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          {/* 2. Persistent Background WebGL 3D Canvas */}
          <Scene3D />

          {/* 3. HTML Content Overlay Layer */}
          <div className="relative z-10 w-full pointer-events-none">
            {/* Enable pointer-events on direct interactive children */}
            <div className="pointer-events-auto">
              {/* Header Navigation */}
              <Navigation />

              {/* Sections Container */}
              <div className="w-full">
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <Capabilities />
                <LabSection />
                <ShowcaseSection />
                <TempleSection />
                <ContactSection />
              </div>

              {/* Footer */}
              <footer className="border-t border-white/5 py-12 px-6 bg-black/80 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Left Brand info */}
                  <div className="flex flex-col gap-2 text-center md:text-left">
                    <span className="font-display tracking-[0.2em] font-bold text-white text-base">
                      SAFYRUS AI
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-semibold">
                      EST. 2026 // NEURAL CIVILIZATION INITIATIVE
                    </span>
                  </div>

                  {/* Copyright */}
                  <span className="text-[10px] font-mono text-slate-500 text-center md:text-right">
                    © {new Date().getFullYear()} SAFYRUS. ALL DATA ENCRYPTED. COGNITIVE AGENTS ACTIVE.
                  </span>
                </div>
              </footer>
            </div>
          </div>
        </SmoothScroll>
      )}
    </main>
  );
}
