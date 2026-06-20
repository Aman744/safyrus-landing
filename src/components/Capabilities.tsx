'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Network, Zap, Settings, BarChart, Eye, Sparkles } from 'lucide-react';

interface Capability {
  id: string;
  name: string;
  percentage: number;
  icon: React.ReactNode;
  metrics: { label: string; value: string }[];
  consoleOutput: string[];
}

export default function Capabilities() {
  const capabilities: Capability[] = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      percentage: 98,
      icon: <Sparkles className="w-5 h-5" />,
      metrics: [
        { label: 'Model Parameters', value: '450B Active' },
        { label: 'Inference Latency', value: '8.4ms' },
        { label: 'Context Length', value: '2.4M Tokens' },
      ],
      consoleOutput: [
        'INIT SYSTEM.COGNITION...',
        'LOADING DYNAMIC ATTENTION WEIGHTS [OK]',
        'SPAWNING RETRIEVAL AGENTS...',
        'SEMANTIC KNOWLEDGE SYNERGY: 98.4%',
        'SYSTEM READY FOR INFERENCE OPERATIONS.',
      ],
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      percentage: 95,
      icon: <Cpu className="w-5 h-5" />,
      metrics: [
        { label: 'Loss Convergence', value: '0.0042' },
        { label: 'Training Clusters', value: '1,024 H100s' },
        { label: 'Epoch Velocity', value: '4.8 TB/s' },
      ],
      consoleOutput: [
        'STARTING OPTIMIZATION CYCLE #4902...',
        'COMPUTING GRADIENTS & WEIGHT VECTORS...',
        'LOSS DECREASE RATE: -0.012% / min',
        'BACKPROPAGATION PIPELINE INJECTED',
        'MODEL WEIGHTS SUCCESSFULLY ALIGNED.',
      ],
    },
    {
      id: 'cv',
      name: 'Computer Vision',
      percentage: 92,
      icon: <Eye className="w-5 h-5" />,
      metrics: [
        { label: 'Detection Speed', value: '120 FPS' },
        { label: 'Resolution support', value: '8K Spatial' },
        { label: 'Object Classes', value: '50,000+' },
      ],
      consoleOutput: [
        'ACTIVATING SPATIAL RECONSTRUCTION...',
        'MAPPING 3D ENVIRONMENT VECTORS [OK]',
        'IDENTIFYING GEOMETRIC ARCHITECTURES...',
        'BOUNDING BOX SEGMENTATION SPEED: 1.4ms',
        'ENVIRONMENT STABLE. SPATIAL SYNC OK.',
      ],
    },
    {
      id: 'genai',
      name: 'Generative AI',
      percentage: 97,
      icon: <Zap className="w-5 h-5" />,
      metrics: [
        { label: 'Token Throughput', value: '250 T/s' },
        { label: 'Vibe Matching', value: '99.2%' },
        { label: 'Diffusion Steps', value: '20 Iter/s' },
      ],
      consoleOutput: [
        'BOOTING SYNTHETIC CONTENT KERNEL...',
        'MAPPING LATENT NOISE SPACE...',
        'DECODING MULTI-MODAL PIXEL FLOWS...',
        'GENERATIVE RESOLUTION: 4096 x 4096',
        'VECTOR FIELD EXPANSION COMPLETE.',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Platforms',
      percentage: 99,
      icon: <Network className="w-5 h-5" />,
      metrics: [
        { label: 'System Uptime', value: '99.999%' },
        { label: 'Active Clusters', value: '48 Regions' },
        { label: 'Concurrent Queries', value: '2.5M / sec' },
      ],
      consoleOutput: [
        'SYNCING SYSTEM CORE MICROSERVICES...',
        'BALANCING GLOBAL NETWORK LOADS...',
        'HEALTH CHECK: ALL NODES STABLE [100%]',
        'REDISTRIBUTING EDGE REPLICAS...',
        'SYSTEM TRAFFIC FLOW DECLARED OPTIMAL.',
      ],
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure',
      percentage: 94,
      icon: <Activity className="w-5 h-5" />,
      metrics: [
        { label: 'Resource efficiency', value: '94.2%' },
        { label: 'Packet Routing', value: '1.2ms Avg' },
        { label: 'Secure Isolation', value: 'Hypervisor' },
      ],
      consoleOutput: [
        'SCANNING CLOUD INSTANCE ORCHESTRATION...',
        'PROVISIONING COMPUTE PODS [OK]',
        'COMPILING ZERO-TRUST POLICIES...',
        'PACKET LOSS RATE: 0.0000%',
        'INFRASTRUCTURE AUTO-SCALING ONLINE.',
      ],
    },
    {
      id: 'automation',
      name: 'Automation Systems',
      percentage: 96,
      icon: <Settings className="w-5 h-5" />,
      metrics: [
        { label: 'Process Speedup', value: '14.5x' },
        { label: 'Task Autonomy', value: 'Fully Agentic' },
        { label: 'Logic Cycles', value: '2B / day' },
      ],
      consoleOutput: [
        'LAUNCHING WORKFLOW EXECUTION ENGINE...',
        'VERIFYING DYNAMIC TRIGGER SCRIPTS...',
        'RESOLVING CONDITIONAL LOGIC PATTERNS...',
        'TRIGGERED AGENT SUBROUTINES: 450 Active',
        'CRITICAL ACTION CHAINS EXECUTING.',
      ],
    },
    {
      id: 'analytics',
      name: 'Data Analytics',
      percentage: 93,
      icon: <BarChart className="w-5 h-5" />,
      metrics: [
        { label: 'Query Latency', value: '42ms' },
        { label: 'Data Scanned', value: '12 PB / day' },
        { label: 'Indexing Time', value: 'Real-time' },
      ],
      consoleOutput: [
        'COMPILING METRIC DATABASES...',
        'AGGREGATING HYPER-DIMENSIONAL VECTORS...',
        'REFRESHING REALTIME POWER-BI STREAMS...',
        'INDEXING VECTOR SIMILARITIES: 42ms',
        'QUERY CACHING OPTIMIZED FOR SCALE.',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<Capability>(capabilities[0]);
  const [progress, setProgress] = useState(0);

  // Animate progress ring on tab switch
  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => {
      setProgress(activeTab.percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  // SVG ring properties
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="capabilities" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            03 // COMMAND CENTER
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            Operational Capabilities
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Capability Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {capabilities.map((cap) => {
              const isActive = activeTab.id === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap)}
                  className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between group ${
                    isActive
                      ? 'bg-sapphire/10 border-sapphire/60 shadow-md shadow-sapphire/5'
                      : 'bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-sm flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'bg-sapphire/20 border-sapphire text-sapphire'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 group-hover:border-slate-500 group-hover:text-white'
                      }`}
                    >
                      {cap.icon}
                    </div>
                    <span
                      className={`text-sm tracking-wide transition-colors ${
                        isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {cap.name}
                    </span>
                  </div>
                  {/* Small progress label */}
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-sapphire font-bold' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {cap.percentage}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Holographic Command Console */}
          <div className="lg:col-span-7">
            <div className="h-full glassmorphism p-8 rounded-sm border border-white/[0.06] relative flex flex-col justify-between overflow-hidden">
              {/* Retro HUD grid line overlays */}
              <div className="absolute inset-0 grid-bg-space opacity-30 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sapphire/20 to-transparent animate-[pulse_3s_infinite]" />

              {/* Console Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sapphire animate-ping" />
                  <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono">
                    TERMINAL // {activeTab.id.toUpperCase()}_CAPABILITY_ONLINE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  NODE // SECURE_SOCKET
                </span>
              </div>

              {/* Console Body Layout */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-grow">
                {/* 1. Animated Holographic Progress Ring */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Background Ring */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r={radius}
                        className="stroke-white/[0.03]"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      {/* Animated Foreground Ring */}
                      <circle
                        cx="88"
                        cy="88"
                        r={radius}
                        className="stroke-sapphire glow-border-sapphire transition-all duration-1000 ease-out"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Inner glowing core */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-mono text-4xl font-black text-white glow-text-sapphire">
                        {progress}%
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
                        INTEGRITY
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Key Metrics Stats */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                    {activeTab.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {activeTab.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-white/[0.01] border border-white/[0.04] rounded-sm">
                        <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">
                          {m.label}
                        </span>
                        <span className="font-mono text-sm text-slate-200 font-bold">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Console Live Code Stream Footer */}
              <div className="relative z-10 mt-8 bg-black/40 border border-white/5 p-4 rounded-sm font-mono text-[10px] text-emerald-400/90 leading-relaxed overflow-hidden h-[120px]">
                <div className="absolute top-0 right-0 p-2 text-slate-600 select-none text-[8px] uppercase tracking-widest font-mono">
                  LOG_STREAM
                </div>
                <div className="flex flex-col gap-1.5 h-full justify-end select-none">
                  <AnimatePresence mode="popLayout">
                    {activeTab.consoleOutput.map((line, idx) => (
                      <motion.div
                        key={`${activeTab.id}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <span className="text-slate-600 mr-2">&gt;</span>
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
