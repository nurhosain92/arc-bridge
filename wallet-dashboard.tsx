'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet, Copy, ExternalLink, TrendingUp, Clock,
  CheckCircle, ArrowUpRight, ArrowDownLeft, RefreshCw
} from 'lucide-react'

const mockAddress = '0x742d35Cc6634C0532925a3b8D4C9E4F2b3A1b2c3'
const shortAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

const portfolio = [
  { symbol: 'USDC', name: 'USD Coin', balance: '5,420.50', value: '$5,420.50', change: '+0.0%', icon: '$', color: '#2775CA' },
  { symbol: 'ETH', name: 'Ethereum', balance: '2.847', value: '$9,241.80', change: '+3.2%', icon: 'Ξ', color: '#627EEA' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.142', value: '$9,872.40', change: '+1.8%', icon: '₿', color: '#F7931A' },
  { symbol: 'ARB', name: 'Arbitrum', balance: '1,200', value: '$924.00', change: '-1.2%', icon: 'A', color: '#28A0F0' },
]

const pendingBridges = [
  { id: '1', from: 'Ethereum', to: 'Base', amount: '500 USDC', status: 'attestation', progress: 65, eta: '~7s' },
  { id: '2', from: 'Arbitrum', to: 'Optimism', amount: '1,200 USDC', status: 'confirming', progress: 30, eta: '~14s' },
]

export function WalletDashboard() {
  const [copied, setCopied] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(mockAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalValue = portfolio.reduce((sum, t) => sum + parseFloat(t.value.replace(/[$,]/g, '')), 0)

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--neon-purple)] font-medium mb-4 block">
            Wallet Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Your <span className="gradient-text">portfolio overview</span>
          </h2>
        </motion.div>

        {!walletConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto glass rounded-3xl p-10 border border-[var(--glass-border)] text-center"
          >
            <div className="w-16 h-16 rounded-2xl glass neon-border flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-[var(--neon-blue)]" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Connect Your Wallet</h3>
            <p className="text-sm text-foreground/50 mb-6">Connect your wallet to view your portfolio, pending bridges, and transaction history.</p>
            <button
              onClick={() => setWalletConnected(true)}
              className="w-full py-4 rounded-2xl bg-[var(--neon-blue)] text-white font-semibold glow-blue hover:bg-[var(--neon-blue)]/90 transition-all"
            >
              Connect Wallet
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left col: wallet info + portfolio */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wallet address card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl glass neon-border flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-foreground/40 mb-1">Connected Wallet</div>
                    <div className="font-mono text-sm text-foreground/80 flex items-center gap-2 flex-wrap">
                      {shortAddress(mockAddress)}
                      <button onClick={copyAddress} className="text-foreground/30 hover:text-[var(--neon-blue)] transition-colors">
                        {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a href="#" className="text-foreground/30 hover:text-[var(--neon-blue)] transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3" /> Portfolio Value
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Portfolio tokens */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl border border-[var(--glass-border)] overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-[var(--glass-border)] flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Portfolio</h3>
                  <button className="text-foreground/40 hover:text-foreground/80 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="divide-y divide-[var(--glass-border)]">
                  {portfolio.map((token, i) => (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm" style={{ background: token.color + '20', color: token.color }}>
                          {token.icon}
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{token.symbol}</div>
                          <div className="text-xs text-foreground/40">{token.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{token.value}</div>
                        <div className="text-xs font-mono text-foreground/40">{token.balance} {token.symbol}</div>
                      </div>
                      <div className={`ml-4 text-xs font-medium ${token.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {token.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right col: pending + completed */}
            <div className="space-y-6">
              {/* Pending bridges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl border border-[var(--glass-border)] overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-[var(--glass-border)]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <h3 className="font-semibold text-foreground text-sm">Pending Bridges</h3>
                    <span className="ml-auto px-2 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-medium">{pendingBridges.length}</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {pendingBridges.map(bridge => (
                    <div key={bridge.id} className="glass rounded-xl p-4 border border-[var(--glass-border)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--neon-blue)]" />
                          <span className="text-xs text-foreground/70 font-medium">{bridge.amount}</span>
                        </div>
                        <span className="text-xs text-amber-400">{bridge.eta}</span>
                      </div>
                      <div className="text-xs text-foreground/40 mb-3">{bridge.from} → {bridge.to}</div>
                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-purple)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${bridge.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-foreground/30 capitalize">{bridge.status}</span>
                        <span className="text-[10px] text-foreground/30">{bridge.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-5 border border-[var(--glass-border)]"
              >
                <h3 className="font-semibold text-foreground text-sm mb-4">Activity</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Total Bridges', value: '47', icon: ArrowUpRight, color: 'text-[var(--neon-blue)]' },
                    { label: 'Total Received', value: '52', icon: ArrowDownLeft, color: 'text-emerald-400' },
                    { label: 'Success Rate', value: '99.8%', icon: CheckCircle, color: 'text-[var(--neon-purple)]' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-xs text-foreground/50">{item.label}</span>
                      </div>
                      <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
