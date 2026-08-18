'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Lock, Award, Network, Globe, Building } from 'lucide-react'

const securityFeatures = [
  {
    icon: Shield,
    title: 'Circle CCTP',
    description: 'Built on Circle\'s Cross-Chain Transfer Protocol — the industry gold standard for secure USDC transfers between blockchains.',
    color: '#3b82f6',
    tag: 'Core Protocol',
  },
  {
    icon: Lock,
    title: 'Native USDC',
    description: 'No wrapped or synthetic assets. Every transfer burns USDC on source and mints genuine USDC on destination via Circle\'s official contracts.',
    color: '#8b5cf6',
    tag: 'Asset Security',
  },
  {
    icon: Award,
    title: 'Audited Contracts',
    description: 'All ARC Protocol smart contracts have been independently audited by Trail of Bits and Consensys Diligence with zero critical findings.',
    color: '#06b6d4',
    tag: 'Smart Contracts',
  },
  {
    icon: Network,
    title: 'Decentralized',
    description: 'No central relayer or trusted third party. ARC uses Circle\'s permissionless attestation API with decentralized message passing.',
    color: '#10b981',
    tag: 'Architecture',
  },
  {
    icon: Globe,
    title: 'No Wrapped Assets',
    description: 'Unlike traditional bridges that create bridge-wrapped tokens, ARC Bridge only transfers native USDC — eliminating depeg risk entirely.',
    color: '#f59e0b',
    tag: 'Token Safety',
  },
  {
    icon: Building,
    title: 'Enterprise Security',
    description: 'Institutional-grade infrastructure with 99.98% uptime SLA, real-time monitoring, and automated circuit breakers for anomaly detection.',
    color: '#ef4444',
    tag: 'Infrastructure',
  },
]

export function SecuritySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-blue)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--neon-blue)]/[0.02] to-[var(--neon-purple)]/[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-medium mb-4 block">
            Security First
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built with <span className="gradient-text">uncompromising security</span>
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto text-pretty">
            Every layer of ARC Bridge is designed around security, from smart contracts to infrastructure.
          </p>
        </motion.div>

        {/* Score banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-12 glass rounded-2xl p-6 neon-border flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl glass neon-border flex flex-col items-center justify-center shrink-0">
              <div className="text-2xl font-bold text-emerald-400">99.8</div>
              <div className="text-xs text-foreground/40">Score</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Security Score: 99.8/100</h3>
            <p className="text-sm text-foreground/50">Independently assessed by DeFi Safety. Zero security incidents since mainnet launch. Continuously monitored 24/7.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--neon-blue)]/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-2.5 rounded-xl shrink-0"
                  style={{ background: feature.color + '15', border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <div
                  className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: feature.color + '15', color: feature.color, border: `1px solid ${feature.color}25` }}
                >
                  {feature.tag}
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">{feature.description}</p>

              {/* Bottom glow line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
