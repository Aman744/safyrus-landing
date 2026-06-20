'use client';

import { useRef, useState, MouseEvent } from 'react';
import {
  Brain,
  Cpu,
  Smartphone,
  Sparkles,
  Cloud,
  Database,
  Eye,
  Atom,
} from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

function ServiceCard({ card, index }: { card: ServiceItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTilt({ rx: rotateX, ry: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setIsHovered(false);
  };

  const floatClass = index % 3 === 0 
    ? 'animate-[float_7s_ease-in-out_infinite]' 
    : index % 3 === 1 
      ? 'animate-[float_6s_ease-in-out_infinite_1s]' 
      : 'animate-[float_8s_ease-in-out_infinite_2s]';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-sm p-5 glassmorphism-interactive glow-shadow-neon border border-white/[0.04] cursor-pointer flex flex-col h-[220px] justify-between ${floatClass}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,191,255,0.06)_0%,transparent_50%)] pointer-events-none rounded-sm transition-opacity duration-300" 
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <div>
        <div className="w-10 h-10 rounded-sm bg-sapphire/5 border border-sapphire/15 flex items-center justify-center mb-4 group-hover:border-sapphire/50 transition-colors duration-300">
          <div className={`${isHovered ? 'text-sapphire glow-text-sapphire scale-110' : 'text-slate-300'} transition-all duration-300`}>
            {card.icon}
          </div>
        </div>
        <h3 className="text-base font-bold text-white tracking-wide mb-2 group-hover:text-sapphire transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-slate-400 text-[11px] leading-relaxed font-light">
          {card.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {card.tags.map((tag) => (
          <span 
            key={tag} 
            className="text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] text-slate-500 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const services: ServiceItem[] = [
    {
      title: 'AI Innovation',
      description: 'Architecting custom LLMs, autonomous agent systems, and deep generative networks.',
      icon: <Brain className="w-5 h-5" />,
      tags: ['LLMs', 'Agents'],
    },
    {
      title: 'Product Engineering',
      description: 'Designing resilient production architectures and high-performance engines.',
      icon: <Cpu className="w-5 h-5" />,
      tags: ['Rust', 'Systems'],
    },
    {
      title: 'Web & Mobile Dev',
      description: 'Building immersive spatial applications and responsive modular codebases.',
      icon: <Smartphone className="w-5 h-5" />,
      tags: ['Next.js', 'Three.js'],
    },
    {
      title: 'Digital Transformation',
      description: 'Re-engineering legacy business processes into automated, AI-driven pipelines.',
      icon: <Sparkles className="w-5 h-5" />,
      tags: ['APIs', 'Workflow'],
    },
    {
      title: 'Cloud Solutions',
      description: 'Deploying serverless infrastructure and auto-scaling orchestrations.',
      icon: <Cloud className="w-5 h-5" />,
      tags: ['AWS', 'DevOps'],
    },
    {
      title: 'Data Intelligence',
      description: 'Structuring automated training pipelines and semantic search vectors.',
      icon: <Database className="w-5 h-5" />,
      tags: ['RAG', 'VectorDB'],
    },
    {
      title: 'Experience Design',
      description: 'Synthesizing dark cyber aesthetics and spatial touch interfaces.',
      icon: <Eye className="w-5 h-5" />,
      tags: ['Figma', 'Visuals'],
    },
    {
      title: 'Research & R&D',
      description: 'Pioneering mathematical optimizations and cosmic geometry visualizers.',
      icon: <Atom className="w-5 h-5" />,
      tags: ['Algorithms', 'DeepTech'],
    },
  ];

  return (
    <section id="services" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sapphire-deep/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Framed open space for the Cognitive Head bursting with ideas */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
              02 // SERVICES ENGINE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white leading-tight">
              Cognitive <br />
              Capabilities
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4 mb-6" />
            <p className="text-slate-400 text-sm leading-relaxed font-light max-w-sm">
              We design and construct digital products that spark creative thinking, bursting with rockets, books, and code streams directly inspired by your vision.
            </p>
          </div>

          {/* Right Column: Compact Services Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} card={service} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
