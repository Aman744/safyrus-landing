'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass, Shield, Orbit, Server } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  metrics: string[];
  tech: string[];
}

export default function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'Astraea AI',
      category: 'DEEP TECH',
      description: 'An autonomous deep-space telemetry pipeline tracking satellite networks and AI routing in real time.',
      icon: <Orbit className="w-8 h-8 text-sapphire" />,
      metrics: ['99.99% Routing Sync', '8.2ms Pipeline Sync', '12M Nodes Managed'],
      tech: ['Rust', 'R3F', 'Wasm'],
    },
    {
      title: 'Rita Core',
      category: 'DEEP CONTRACTS',
      description: 'A decentralized consensus framework structured around the Vedic principles of cosmic organization and mathematical balance.',
      icon: <Compass className="w-8 h-8 text-cyan-400" />,
      metrics: ['1.2M TPS Throughput', '0.02s Settlement', 'Sub-penny gas'],
      tech: ['Solidity', 'Go', 'ZeroKnowledge'],
    },
    {
      title: 'Moksha Engine',
      category: 'COGNITIVE OS',
      description: 'A self-optimizing cognitive interface model that reorganizes container workflows dynamically on edge locations.',
      icon: <Server className="w-8 h-8 text-sapphire-deep" />,
      metrics: ['98% Compute Efficiency', '2.5x Load Reduction', 'Agentic Allocations'],
      tech: ['Python', 'Kubernetes', 'PyTorch'],
    },
    {
      title: 'Vimana Swarm',
      category: 'SWARM INTELLIGENCE',
      description: 'Multi-agent simulation cluster coordinating autonomous drones and server fleets with decentralized logic trees.',
      icon: <Shield className="w-8 h-8 text-indigo-400" />,
      metrics: ['10,000 Nodes Simulated', 'Fully Decentralized', 'Self-Healing Nodes'],
      tech: ['Elixir', 'Docker', 'WebSockets'],
    },
  ];

  useEffect(() => {
    const scrollSection = scrollSectionRef.current;
    if (!scrollSection) return;

    // Calculate translation distance
    // We scroll xPercent: -100 * (projects.length - 1)
    // Wait, on mobile, we might want to disable horizontal scroll and stack vertically for readability
    // Let's use a media query match Media
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Horizontal translation on desktop
      gsap.to(scrollSection, {
        x: () => -(scrollSection.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollSection.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, [projects.length]);

  return (
    <div ref={containerRef} id="showcase" className="relative bg-space-bg">
      {/* Outer section wrapper for scroll track */}
      <div className="relative md:h-screen flex flex-col justify-center overflow-hidden py-32 md:py-0 px-6 md:px-0">
        
        {/* Horizontal flex panels container */}
        <div 
          ref={scrollSectionRef} 
          className="flex flex-col md:flex-row gap-8 md:gap-12 md:pl-[10vw] md:pr-[10vw] w-full md:w-max relative z-10"
        >
          {/* Intro Panel */}
          <div className="flex flex-col justify-center w-full md:w-[35vw] flex-shrink-0 mb-12 md:mb-0">
            <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
              05 // PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white leading-tight">
              Civilization-Scale <br />
              Deployments
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed font-light mt-6 max-w-sm">
              We design and construct digital infrastructures that blend structural integrity with modular scalability. Scroll horizontally to explore our latest case studies.
            </p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-6" />
          </div>

          {/* Project Panels */}
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="w-full md:w-[420px] h-[480px] rounded-sm glassmorphism border border-white/[0.04] p-8 flex flex-col justify-between flex-shrink-0 group hover:border-sapphire/40 glow-shadow-neon transition-all duration-500"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <span className="text-[10px] tracking-[0.2em] font-mono text-slate-500 font-bold uppercase">
                  {project.category}
                </span>
                <div className="w-14 h-14 rounded-sm bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-sapphire/30 transition-colors">
                  {project.icon}
                </div>
              </div>

              {/* Card Content */}
              <div>
                <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-sapphire transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
                  {project.description}
                </p>
                
                {/* Metrics */}
                <div className="flex flex-col gap-2 border-t border-b border-white/5 py-4 mb-6">
                  {project.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500 uppercase">{m.split(' ')[1]} {m.split(' ')[2] || 'Metric'}</span>
                      <span className="text-slate-200 font-bold">{m.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {project.tech.map((t) => (
                    <span 
                      key={t}
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-slate-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/10 group-hover:bg-sapphire group-hover:border-sapphire flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
