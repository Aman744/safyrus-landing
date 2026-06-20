'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Network, Sparkles } from 'lucide-react';

interface ClientNode {
  id: string;
  name: string;
  percentage: number;
  icon: React.ReactNode;
  metrics: { label: string; value: string }[];
  consoleOutput: string[];
}

export default function Capabilities() {
  const clients: ClientNode[] = [
    {
      id: 'americas',
      name: 'North America Nodes',
      percentage: 98,
      icon: <Sparkles className="w-5 h-5" />,
      metrics: [
        { label: 'Active Edge Servers', value: '450 Distributed' },
        { label: 'Network Latency', value: '12.4ms' },
        { label: 'Data Throughput', value: '42.5 TB/s' },
      ],
      consoleOutput: [
        'CONNECTING EST-NY-GATEWAY...',
        'SYNCING EAST COAST CDN EDGE NODES...',
        'SPAWNING RETRIEVAL BALANCERS...',
        'TRAFFIC ROUTING EFFICIENCY: 98.4%',
        'SECURE SSL CHANNEL INITIALIZED.',
      ],
    },
    {
      id: 'europe',
      name: 'European Core Clusters',
      percentage: 95,
      icon: <Cpu className="w-5 h-5" />,
      metrics: [
        { label: 'Active Clusters', value: '256 Nodes' },
        { label: 'Server Uptime', value: '99.998%' },
        { label: 'Sync Velocity', value: '18 TB/s' },
      ],
      consoleOutput: [
        'INIT LON-FRANKFURT-FIBER...',
        'BALANCING CENTRAL REGIONAL LOADS...',
        'STAGED CDN UPDATE APPLIED [OK]',
        'PACKET loss rate: 0.0000%',
        'REGIONAL LOAD DECLARED STABLE.',
      ],
    },
    {
      id: 'asia',
      name: 'Asia Pacific Grid',
      percentage: 99,
      icon: <Network className="w-5 h-5" />,
      metrics: [
        { label: 'Active Hubs', value: 'Tokyo/Mumbai' },
        { label: 'Fiber Latency', value: '8.2ms' },
        { label: 'Query Concurrency', value: '4.8M / sec' },
      ],
      consoleOutput: [
        'ESTABLISHING DEL-TYO CONNECT...',
        'BALANCING SUBSEA PACKET PATHWAYS...',
        'SYNC STATUS: 100% SYNCHRONIZED',
        'CDN EDGE HUBS RESPONDING STABLE...',
        'PACIFIC EDGE PIPELINE RUNNING.',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<ClientNode>(clients[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timeout = setTimeout(() => {
      setProgress(activeTab.percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="capabilities" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            03 // CLIENTS & OPERATIONS
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            Global Client Network
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Client Node Selector */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Zooming out of the local nodes, our digital ecosystems span the entire globe. We connect clients through active, self-healing network clusters orbiting the planet.
              </p>
            </div>
            {clients.map((cap) => {
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
                  <span
                    className={`font-mono text-xs ${
                      isActive ? 'text-sapphire font-bold' : 'text-slate-500 group-hover:text-slate-400'
                    }`}
                  >
                    {cap.percentage}% Sync
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Console Details Overlaying Earth Globe */}
          <div className="lg:col-span-7">
            <div className="h-full bg-black/40 backdrop-blur-sm p-8 rounded-sm border border-white/[0.06] relative flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 grid-bg-space opacity-10 pointer-events-none" />

              {/* Console Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sapphire animate-ping" />
                  <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono">
                    CONSOLE // GLOBAL_CLIENTS_ROUTING_SYNC
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  ACTIVE_GLOBE
                </span>
              </div>

              {/* Console Body */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center flex-grow">
                {/* 1. Progress Ring */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r={radius}
                        className="stroke-white/[0.03]"
                        strokeWidth="4"
                        fill="transparent"
                      />
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
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="font-mono text-4xl font-black text-white glow-text-sapphire">
                        {progress}%
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">
                        SYNC RATE
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Metrics */}
                <div className="md:col-span-7 flex flex-col gap-6">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
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

              {/* Logs */}
              <div className="relative z-10 mt-8 bg-black/40 border border-white/5 p-4 rounded-sm font-mono text-[10px] text-emerald-400/90 leading-relaxed overflow-hidden h-[120px]">
                <div className="absolute top-0 right-0 p-2 text-slate-600 select-none text-[8px] uppercase tracking-widest font-mono">
                  ACTIVE_ROUTE_LOG
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
