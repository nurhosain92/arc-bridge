'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe, ChevronDown } from 'lucide-react'

interface HeroSectionProps {
  onLaunch: () => void
}

const floatingNodes = [
  { label: 'ETH', color: '#627EEA', x: '10%', y: '30%', delay: 0 },
  { label: 'BASE', color: '#0052FF', x: '85%', y: '25%', delay: 0.5 },
  { label: 'ARB', color: '#28A0F0', x: '8%', y: '65%', delay: 1 },
  { label: 'OP', color: '#FF0420', x: '88%', y: '60%', delay: 1.5 },
  { label: 'AVAX', color: '#E84142', x: '20%', y: '80%', delay: 0.8 },
  { label: 'MATIC', color: '#8247E5', x: '75%', y: '78%', delay: 1.2 },
]

const badges = [
  { icon: Shield, label: 'Circle CCTP Secured', color: 'text-emerald-400' },
  { icon: Zap, label: '~20s Transfer Time', color: 'text-[var(--neon-blue)]' },
  { icon: Globe, label: '8+ Chains Supported', color: 'text-[var(--neon-purple)]' },
]

export function HeroSection({ onLaunch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.06] blur-[120px] bg-[var(--neon-blue)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.06] blur-[120px] bg-[var(--neon-purple)]" />
        <div className="absolute bottom-[10%] left-[30%] w-[40%] h-[30%] rounded-full opacity-[0.04] blur-[100px] bg-[var(--neon-cyan)]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />

      {/* Floating network nodes */}
      {floatingNodes.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute hidden lg:flex items-center gap-1.5 glass neon-border rounded-xl px-3 py-2"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0],
          }}
          transition={{
            opacity: { delay: 0.5 + node.delay, duration: 0.5 },
            scale: { delay: 0.5 + node.delay, duration: 0.5 },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: node.delay },
          }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: node.color }} />
          <span className="text-xs font-mono font-medium text-foreground/80">{node.label}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass neon-border rounded-full px-4 py-2 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
          <span className="text-xs text-foreground/70 font-medium tracking-wider uppercase">
            Powered by Circle CCTP v2
          </span>
          <ArrowRight className="w-3 h-3 text-foreground/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05] mb-6"
        >
          <span className="text-foreground">Bridge Assets</span>
          <br />
          <span className="gradient-text text-glow-blue">Across Chains</span>
          <br />
          <span className="text-foreground">Instantly</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed mb-10 text-pretty"
        >
          Powered by ARC Protocol and Circle CCTP for secure, fast, native USDC transfers.
          No wrapped assets. No counterparty risk.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={onLaunch}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-[var(--neon-blue)] text-white text-base font-semibold hover:bg-[var(--neon-blue)]/90 transition-all duration-300 glow-blue"
          >
            Launch Bridge
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={onLaunch}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl glass neon-border text-base font-medium text-foreground/80 hover:text-foreground hover:bg-white/5 transition-all duration-300"
          >
            Connect Wallet
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {badges.map(badge => (
            <div
              key={badge.label}
              className="flex items-center gap-2 glass rounded-xl px-4 py-2.5"
            >
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span className="text-xs text-foreground/60 font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-foreground/30 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-foreground/30" />
      </motion.div>
    </section>
  )
}
