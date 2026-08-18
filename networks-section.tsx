'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, CheckCircle, Clock } from 'lucide-react'

interface Network {
  name: string
  symbol: string
  color: string
  bg: string
  status: 'live' | 'soon'
  token: string
  gasLevel: 'low' | 'medium' | 'high'
  gasText: string
  chainId: number
  icon: string
}

const networks: Network[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    color: '#627EEA',
    bg: 'rgba(98, 126, 234, 0.1)',
    status: 'live',
    token: 'ETH',
    gasLevel: 'high',
    gasText: '~18 Gwei',
    chainId: 1,
    icon: 'Ξ',
  },
  {
    name: 'Base',
    symbol: 'BASE',
    color: '#0052FF',
    bg: 'rgba(0, 82, 255, 0.1)',
    status: 'live',
    token: 'ETH',
    gasLevel: 'low',
    gasText: '~0.01 Gwei',
    chainId: 8453,
    icon: 'B',
  },
  {
    name: 'Arbitrum',
    symbol: 'ARB',
    color: '#28A0F0',
    bg: 'rgba(40, 160, 240, 0.1)',
    status: 'live',
    token: 'ETH',
    gasLevel: 'low',
    gasText: '~0.1 Gwei',
    chainId: 42161,
    icon: 'A',
  },
  {
    name: 'Optimism',
    symbol: 'OP',
    color: '#FF0420',
    bg: 'rgba(255, 4, 32, 0.1)',
    status: 'live',
    token: 'ETH',
    gasLevel: 'low',
    gasText: '~0.05 Gwei',
    chainId: 10,
    icon: 'O',
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    color: '#E84142',
    bg: 'rgba(232, 65, 66, 0.1)',
    status: 'live',
    token: 'AVAX',
    gasLevel: 'medium',
    gasText: '~25 nAVAX',
    chainId: 43114,
    icon: '▲',
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    color: '#8247E5',
    bg: 'rgba(130, 71, 229, 0.1)',
    status: 'live',
    token: 'MATIC',
    gasLevel: 'low',
    gasText: '~30 Gwei',
    chainId: 137,
    icon: 'M',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945FF',
    bg: 'rgba(153, 69, 255, 0.1)',
    status: 'soon',
    token: 'SOL',
    gasLevel: 'low',
    gasText: '~0.000005 SOL',
    chainId: 0,
    icon: '◎',
  },
  {
    name: 'Linea',
    symbol: 'LINEA',
    color: '#61DFFF',
    bg: 'rgba(97, 223, 255, 0.1)',
    status: 'soon',
    token: 'ETH',
    gasLevel: 'low',
    gasText: '~0.02 Gwei',
    chainId: 59144,
    icon: 'L',
  },
]

const gasColors = {
  low: 'text-emerald-400',
  medium: 'text-amber-400',
  high: 'text-rose-400',
}

export function NetworksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--neon-purple)] font-medium mb-4 block">
            Supported Networks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Bridge across <span className="gradient-text">every major chain</span>
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto text-pretty">
            Native USDC transfers secured by Circle CCTP across all supported networks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {networks.map((network, i) => (
            <motion.div
              key={network.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`group relative glass rounded-2xl p-5 border transition-all duration-300 overflow-hidden cursor-pointer ${
                network.status === 'live'
                  ? 'border-[var(--glass-border)] hover:border-[var(--neon-blue)]/40'
                  : 'border-[var(--glass-border)]/50 opacity-60'
              }`}
            >
              {/* Status indicator */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
                  style={{ background: network.bg, color: network.color }}
                >
                  {network.icon}
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  network.status === 'live' ? 'badge-live' : 'badge-soon'
                }`}>
                  {network.status === 'live'
                    ? <CheckCircle className="w-3 h-3" />
                    : <Clock className="w-3 h-3" />
                  }
                  {network.status === 'live' ? 'Live' : 'Soon'}
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{network.name}</h3>
              <div className="text-xs text-foreground/40 mb-3">Chain ID: {network.chainId || 'TBA'}</div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/40">Native Token</span>
                  <span className="text-xs font-mono font-medium text-foreground/70">{network.token}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground/40">Gas</span>
                  <div className="flex items-center gap-1.5">
                    <Zap className={`w-3 h-3 ${gasColors[network.gasLevel]}`} />
                    <span className={`text-xs font-mono ${gasColors[network.gasLevel]}`}>{network.gasText}</span>
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${network.color}08 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
