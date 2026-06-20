'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function Navigation() {
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Lab', href: '#lab' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Temple', href: '#temple' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 glassmorphism border-b border-white/[0.05]"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Holographic Logo Icon */}
            <div className="absolute inset-0 border border-sapphire rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-700" />
            <div className="absolute inset-1.5 border border-sapphire-deep rounded-sm -rotate-45 group-hover:rotate-0 transition-transform duration-700" />
            <div className="w-2.5 h-2.5 bg-sapphire rounded-full animate-ping absolute" />
            <div className="w-1.5 h-1.5 bg-sapphire rounded-full z-10" />
          </div>
          <span className="font-display tracking-[0.25em] text-lg font-bold text-white group-hover:text-sapphire transition-colors duration-300">
            SAFYRUS
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] text-slate-400 hover:text-sapphire hover:glow-text-sapphire transition-all duration-300 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-sapphire transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="relative px-5 py-2.5 rounded-sm overflow-hidden group glassmorphism border border-white/[0.08] hover:border-sapphire/50 transition-colors duration-300"
          >
            {/* Hover background slide */}
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-sapphire-deep to-sapphire transition-all duration-500 ease-out group-hover:w-full" />
            <span className="relative flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white font-medium">
              <Terminal className="w-3.5 h-3.5" />
              Console.Init
            </span>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
