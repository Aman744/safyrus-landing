'use client';

import { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, Play, Pause, RefreshCw } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function LabSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [labStatus, setLabStatus] = useState('ACTIVE');
  const [temperature, setTemperature] = useState(0.7);
  const [generationCount, setGenerationCount] = useState(1024);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 360);

    // Re-adjust size on window resize
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 360;
      }
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = 35;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      });
    }

    // Mouse tracking for connection
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw and connect particles
      particles.forEach((p, idx) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isRunning ? 'rgba(0, 191, 255, 0.7)' : 'rgba(100, 116, 139, 0.5)';
        ctx.shadowColor = '#00BFFF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Connect to other nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.15 - dist / 800})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 191, 255, ${0.4 - distMouse / 270})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Simple scanning radar sweep line
      const sweepY = (Date.now() / 15) % height;
      ctx.beginPath();
      ctx.moveTo(0, sweepY);
      ctx.lineTo(width, sweepY);
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.06)';
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRunning]);

  // Handle lab reset trigger
  const handleReset = () => {
    setLabStatus('RESETTING...');
    setTimeout(() => {
      setLabStatus('ACTIVE');
      setGenerationCount(prev => prev + 256);
    }, 1200);
  };

  return (
    <section id="lab" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            04 // INNOVATION RESEARCH
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            AI Innovation Lab
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-sapphire to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Descriptive Content */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <p className="text-slate-300 text-base leading-relaxed font-light">
                Our AI Innovation Lab operates as a sandbox for experimental architectures. Here, cognitive models undergo evolution testing inside simulated environments inspired by natural physics and sacred geometry.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                We develop multi-agent workflows, self-configuring pipelines, and real-time visual neural networks designed to solve hyper-dimensional logistics and structural puzzles.
              </p>
            </div>

            {/* Simulated Live Lab Controls */}
            <div className="mt-12 p-6 glassmorphism border border-white/[0.05] rounded-sm flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-slate-500 font-bold">
                  CONTROL CONSOLE
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  labStatus === 'ACTIVE' 
                    ? 'bg-sapphire/10 text-sapphire border border-sapphire/20' 
                    : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                }`}>
                  {labStatus}
                </span>
              </div>

              {/* Slider & Stat Toggles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">
                    Temperature Vector
                  </span>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-sapp"
                  />
                  <span className="font-mono text-xs text-white block mt-1">{temperature}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block mb-1">
                    Generative Cycles
                  </span>
                  <span className="font-mono text-xs text-white font-bold block">{generationCount} / sec</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-sapphire/50 text-xs font-mono uppercase text-slate-300 hover:text-white transition-all"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-sapphire" />
                      Pause Simulation
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      Start Simulation
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-4 flex items-center justify-center py-2.5 rounded bg-white/[0.03] border border-white/[0.08] hover:border-sapphire/50 text-xs font-mono uppercase text-slate-300 hover:text-white transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Neural Node Visualizer Canvas */}
          <div className="lg:col-span-7">
            <div className="h-full glassmorphism rounded-sm border border-white/[0.06] p-6 relative flex flex-col justify-between overflow-hidden min-h-[380px]">
              {/* Retro HUD grid overlay */}
              <div className="absolute inset-0 grid-bg-space opacity-20 pointer-events-none" />

              {/* Header HUD info */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono text-[9px] text-slate-500 relative z-10">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-sapphire" />
                  <span>NEURAL_CELLULAR_SIMULATION_ACTIVE</span>
                </div>
                <span>NODE_COUNT: 35</span>
              </div>

              {/* The Live Interactive Canvas */}
              <div className="relative w-full h-[360px] flex items-center justify-center my-4 z-10">
                <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
              </div>

              {/* Status bar */}
              <div className="border-t border-white/5 pt-3 flex items-center justify-between font-mono text-[9px] text-slate-500 relative z-10">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3 text-sapphire" />
                  <span>SECURITY_ENCRYPTED_SSL</span>
                </div>
                <span>FPS: 60 / STABLE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
