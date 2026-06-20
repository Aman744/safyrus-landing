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
    // Map bounds to degree range (max 12 deg rotation)
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTilt({ rx: rotateX, ry: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setIsHovered(false);
  };

  // Add different float animations by index to make them move asynchronously
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
      className={`relative rounded-sm p-6 glassmorphism-interactive glow-shadow-neon border border-white/[0.04] cursor-pointer flex flex-col h-[280px] justify-between ${floatClass}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Glow highlight on hover */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(0,191,255,0.08)_0%,transparent_50%)] pointer-events-none rounded-sm transition-opacity duration-300" 
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Top Section */}
      <div>
        <div className="w-12 h-12 rounded-sm bg-sapphire/5 border border-sapphire/15 flex items-center justify-center mb-5 group-hover:border-sapphire/50 transition-colors duration-300">
          <div className={`${isHovered ? 'text-sapphire glow-text-sapphire scale-110' : 'text-slate-300'} transition-all duration-300`}>
            {card.icon}
          </div>
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide mb-3 group-hover:text-sapphire transition-colors duration-300">
          {card.title}
        </h3>
        <p className="text-slate-400 text-xs leading-relaxed font-light">
          {card.description}
        </p>
      </div>

      {/* Bottom Section: Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {card.tags.map((tag) => (
          <span 
            key={tag} 
            className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-slate-500 font-medium"
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
      description: 'Architecting custom LLMs, autonomous agent systems, cognitive nodes, and deep generative neural networks.',
      icon: <Brain className="w-6 h-6" />,
      tags: ['LLMs', 'Cognitive', 'Agents'],
    },
    {
      title: 'Product Engineering',
      description: 'Designing resilient production architectures, high-performance engines, and core application servers.',
      icon: <Cpu className="w-6 h-6" />,
      tags: ['Rust', 'Go', 'Systems'],
    },
    {
      title: 'Web & Mobile Development',
      description: 'Building immersive spatial applications, interactive WebGL products, and responsive modular codebases.',
      icon: <Smartphone className="w-6 h-6" />,
      tags: ['Next.js', 'React Native', 'Three.js'],
    },
    {
      title: 'Digital Transformation',
      description: 'Re-engineering legacy business processes into automated, AI-driven pipelines to maximize efficiency.',
      icon: <Sparkles className="w-6 h-6" />,
      tags: ['Automation', 'APIs', 'Workflow'],
    },
    {
      title: 'Cloud Solutions',
      description: 'Deploying serverless infrastructure, Kubernetes orchestration, auto-scaling architectures, and hyper-security.',
      icon: <Cloud className="w-6 h-6" />,
      tags: ['AWS', 'K8s', 'DevOps'],
    },
    {
      title: 'Data Intelligence',
      description: 'Structuring automated pipelines, training vectors, semantic search engines, and real-time analytical nodes.',
      icon: <Database className="w-6 h-6" />,
      tags: ['RAG', 'VectorDB', 'Pipelines'],
    },
    {
      title: 'UX & Experience Design',
      description: 'Synthesizing dark cyber aesthetics, liquid transitions, tactile interaction models, and spatial UIs.',
      icon: <Eye className="w-6 h-6" />,
      tags: ['Figma', 'Prototyping', 'Visuals'],
    },
    {
      title: 'Research & Innovation',
      description: 'Pioneering custom algorithms, deep learning models, mathematical optimizations, and cosmic geometry visualizers.',
      icon: <Atom className="w-6 h-6" />,
      tags: ['R&D', 'Algorithms', 'DeepTech'],
    },
  ];

  return (
    <section id="services" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      {/* Background glowing ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sapphire-deep/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            02 // SERVICES ENGINE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            Anti-Gravity Capabilities
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} card={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
