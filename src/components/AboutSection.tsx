'use client';

import { motion } from 'framer-motion';
import { Compass, Cpu, History } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Custom CountUp counter hook/helper
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const end = value;
          const totalFrames = duration * 60;
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const currentCount = Math.round(end * (1 - (1 - progress) * (1 - progress)));
            setCount(currentCount);

            if (frame === totalFrames) {
              clearInterval(counter);
              setCount(end);
            }
          }, 1000 / 60);

          return () => clearInterval(counter);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutSection() {
  const timeline = [
    {
      title: 'Ancient Foundations',
      description: 'Harnessing the algorithms of Vedic mathematics, binary logic roots, and cosmic cycles of sacred geometry.',
      icon: <History className="w-5 h-5 text-sapphire" />,
      year: 'HERITAGE',
    },
    {
      title: 'Technical Synthesis',
      description: 'Bridging deep engineering principles with advanced computing frameworks for structural resilience.',
      icon: <Cpu className="w-5 h-5 text-sapphire-deep" />,
      year: 'SYNTHESIS',
    },
    {
      title: 'AI Convergence',
      description: 'Launching self-governing cognitive networks, generative models, and multi-agent systems designed for the next epoch.',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      year: 'FUTURE',
    },
  ];

  return (
    <section id="about" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            01 // CORE ETHOS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            Heritage Meets Intelligence
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Core Text & Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <p className="text-slate-300 text-lg leading-relaxed font-light max-w-2xl">
              Safyrus stands at the confluence of ancient intellectual traditions and next-generation cognitive systems. We decode complex variables through AI frameworks anchored in timeless organizational patterns.
            </p>

            {/* Timeline */}
            <div className="relative border-l border-white/5 pl-8 ml-4 flex flex-col gap-12">
              {timeline.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  key={index}
                  className="relative group"
                >
                  {/* Timeline bullet */}
                  <div className="absolute -left-[53px] top-1 w-10 h-10 rounded-full bg-space-bg border border-white/10 group-hover:border-sapphire flex items-center justify-center transition-colors duration-300 backdrop-blur-md shadow-md">
                    {item.icon}
                  </div>

                  <span className="text-[10px] tracking-[0.25em] text-slate-500 font-bold block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sapphire transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl font-light">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Overlay structure targeting background crystal */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Visual Frame wrapper pointing to Sapphire */}
            <div className="w-full max-w-sm glassmorphism p-8 rounded-sm border border-white/[0.08] relative group">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sapphire/60" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sapphire/60" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sapphire/60" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sapphire/60" />
              
              <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6 font-bold">
                SYSTEM METRICS // LIVE
              </h4>

              {/* Counters */}
              <div className="flex flex-col gap-6">
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-white flex items-baseline gap-1">
                    <Counter value={99} />
                    <span className="text-sapphire">.9%</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-light">
                    Model Inference Accuracy
                  </span>
                </div>
                
                <div className="h-[1px] bg-white/5 w-full" />
                
                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-white flex items-baseline gap-1">
                    <span className="text-sapphire-deep">+</span>
                    <Counter value={100} />
                    <span className="text-slate-300">K</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-light">
                    Holographic Geometry Render Nodes
                  </span>
                </div>

                <div className="h-[1px] bg-white/5 w-full" />

                <div>
                  <div className="text-4xl sm:text-5xl font-mono font-bold text-white flex items-baseline gap-1">
                    <Counter value={10} />
                    <span className="text-sapphire">X</span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-light">
                    Operational Acceleration Velocity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
