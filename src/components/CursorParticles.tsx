'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = 60;

    // Track mouse coordinates
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn 1-2 particles on movement
      if (particles.length < maxParticles) {
        const size = Math.random() * 5 + 3; // 3px to 8px
        const maxLife = Math.random() * 40 + 30; // lifespan in frames
        
        // Sapphire blue colors
        const colors = ['#00BFFF', '#2563EB', '#00E5FF', '#3b82f6'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particles.push({
          x: mouse.x,
          y: mouse.y,
          // Float outwards and slightly upwards
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.5, 
          size,
          alpha: 1,
          life: maxLife,
          maxLife,
          color,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Render loop
    let animationId: number;
    
    const drawDiamond = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      c.moveTo(0, -size);
      c.lineTo(size * 0.6, 0);
      c.lineTo(0, size);
      c.lineTo(-size * 0.6, 0);
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Process particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.life--;

        // Fade out near end of life
        p.alpha = p.life / p.maxLife;

        // Draw glowing particle
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = p.alpha * 0.75;
        
        drawDiamond(ctx, p.x, p.y, p.size, p.rotation);

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      
      // Reset canvas context settings
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-[999] pointer-events-none"
    />
  );
}
