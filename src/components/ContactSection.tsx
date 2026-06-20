'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([
    'INIT SECURE SOCKET CHANNEL...',
    'READY FOR PAYLOAD CONFIGURATION...',
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setLogs((prev) => [...prev, 'ERROR: INVALID PAYLOAD STRUCTURE. FIELDS REMAIN NULL.']);
      return;
    }

    setStatus('transmitting');
    setLogs((prev) => [
      ...prev,
      `PACKET PREPARATION: ${formData.name.toUpperCase().replace(/\s+/g, '_')}_DATA_INIT`,
      'RESOLVING SMTP SOCKET ROUTING...',
      'TRANSMITTING ENCRYPTED CONTENT FIELD...',
    ]);

    setTimeout(() => {
      setStatus('success');
      setLogs((prev) => [
        ...prev,
        'RESPONSE CODE: 200 SUCCESS',
        'PAYLOAD TRANSMITTED AND BUFFERED.',
        'SAFYRUS NODE DISCONNECTING [OK]',
      ]);
    }, 2000);
  };

  return (
    <section id="contact" className="relative min-h-screen py-32 px-6 overflow-hidden z-10 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-sapphire font-semibold block mb-3">
            07 // TERMINAL DISPATCH
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-wider uppercase text-white">
            Start a Project
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-sapphire to-transparent mx-auto mt-4" />
        </div>

        {/* Futuristic Command Console Panel */}
        <div className="glassmorphism rounded-sm border border-white/[0.06] p-6 sm:p-10 relative overflow-hidden max-w-2xl mx-auto">
          {/* Retro Grid Backdrops */}
          <div className="absolute inset-0 grid-bg-space opacity-20 pointer-events-none" />

          {/* Console Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8 font-mono text-[9px] text-slate-500 relative z-10">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-sapphire" />
              <span>TERMINAL // TRANSMIT_PAYLOAD_TUNNEL</span>
            </div>
            <span>PORT_3000 // SECURE</span>
          </div>

          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 relative z-10"
              >
                {/* Name field */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-2 font-bold">
                    [01] Sender Identifier
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'transmitting'}
                    className="w-full bg-black/40 border border-white/5 hover:border-sapphire/30 focus:border-sapphire focus:glow-border-sapphire text-slate-100 rounded-sm py-3 px-4 outline-none font-mono text-sm transition-all placeholder-slate-600"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-2 font-bold">
                    [02] Secure Return Channel (Email)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={status === 'transmitting'}
                    className="w-full bg-black/40 border border-white/5 hover:border-sapphire/30 focus:border-sapphire focus:glow-border-sapphire text-slate-100 rounded-sm py-3 px-4 outline-none font-mono text-sm transition-all placeholder-slate-600"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-2 font-bold">
                    [03] Project Payload Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe capabilities requested and scaling scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={status === 'transmitting'}
                    className="w-full bg-black/40 border border-white/5 hover:border-sapphire/30 focus:border-sapphire focus:glow-border-sapphire text-slate-100 rounded-sm py-3 px-4 outline-none font-mono text-sm transition-all placeholder-slate-600 resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  className="w-full relative py-4 rounded-sm border border-sapphire/30 bg-sapphire/10 hover:bg-sapphire/20 text-white font-medium text-xs font-mono uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Send className={`w-3.5 h-3.5 text-sapphire group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 ${status === 'transmitting' ? 'animate-pulse' : ''}`} />
                  <span>
                    {status === 'transmitting' ? 'TRANSMITTING...' : 'TRANSMIT.PAYLOAD'}
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 relative z-10 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-sapphire/10 border border-sapphire/30 flex items-center justify-center text-sapphire animate-pulse">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
                  Transmission Successful
                </h3>
                <p className="text-slate-400 text-xs font-light max-w-sm">
                  Your coordinates have been buffered into our central databank. We will initialize secure contact shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                    setLogs(['RESET_FORM_PAYLOAD_SUCCESS', 'INIT SECURE SOCKET CHANNEL...']);
                  }}
                  className="px-6 py-2.5 rounded-sm border border-white/10 hover:border-slate-500 text-slate-400 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all"
                >
                  Configure New Payload
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console logs output */}
          <div className="mt-8 bg-black/50 border border-white/5 p-4 rounded-sm font-mono text-[9px] text-emerald-400/90 leading-relaxed overflow-hidden h-[100px] relative z-10 select-none">
            <div className="absolute top-0 right-0 p-2 text-slate-600 text-[7px] uppercase tracking-widest font-mono">
              CONSOLE_LOG_ECHO
            </div>
            <div className="flex flex-col gap-1 h-full justify-end">
              {logs.slice(-4).map((log, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-slate-600 mr-2">&gt;</span>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
