'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight, Search, Filter, ChevronDown } from 'lucide-react'

type TxStatus = 'completed' | 'pending' | 'failed'

interface Transaction {
  hash: string
  amount: string
  token: string
  sourceChain: string
  destChain: string
  status: TxStatus
  time: string
  usdValue: string
}

const transactions: Transaction[] = [
  { hash: '0xa1b2c3d4e5f6...', amount: '5,000', token: 'USDC', sourceChain: 'Ethereum', destChain: 'Base', status: 'completed', time: '2m ago', usdValue: '$5,000.00' },
  { hash: '0xf6e5d4c3b2a1...', amount: '1,200', token: 'USDC', sourceChain: 'Arbitrum', destChain: 'Optimism', status: 'pending', time: '5m ago', usdValue: '$1,200.00' },
  { hash: '0xabcdef123456...', amount: '800', token: 'USDC', sourceChain: 'Base', destChain: 'Ethereum', status: 'completed', time: '15m ago', usdValue: '$800.00' },
  { hash: '0x123456abcdef...', amount: '3,500', token: 'USDC', sourceChain: 'Polygon', destChain: 'Arbitrum', status: 'completed', time: '1h ago', usdValue: '$3,500.00' },
  { hash: '0xdeadbeef1234...', amount: '250', token: 'USDC', sourceChain: 'Optimism', destChain: 'Base', status: 'failed', time: '2h ago', usdValue: '$250.00' },
  { hash: '0xcafe12345678...', amount: '10,000', token: 'USDC', sourceChain: 'Ethereum', destChain: 'Avalanche', status: 'completed', time: '3h ago', usdValue: '$10,000.00' },
  { hash: '0xbabe9876abcd...', amount: '2,750', token: 'USDC', sourceChain: 'Avalanche', destChain: 'Polygon', status: 'completed', time: '5h ago', usdValue: '$2,750.00' },
  { hash: '0x9876fedc5432...', amount: '500', token: 'USDC', sourceChain: 'Base', destChain: 'Optimism', status: 'completed', time: '8h ago', usdValue: '$500.00' },
]

const chainColors: Record<string, string> = {
  Ethereum: '#627EEA',
  Base: '#0052FF',
  Arbitrum: '#28A0F0',
  Optimism: '#FF0420',
  Avalanche: '#E84142',
  Polygon: '#8247E5',
}

export function TransactionHistory() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<TxStatus | 'all'>('all')

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.hash.includes(search) || tx.sourceChain.toLowerCase().includes(search.toLowerCase()) || tx.destChain.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || tx.status === statusFilter
    return matchSearch && matchStatus
  })

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
          <span className="text-xs uppercase tracking-widest text-[var(--neon-cyan)] font-medium mb-4 block">
            Transaction History
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Every transfer, <span className="gradient-text">fully tracked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl border border-[var(--glass-border)] overflow-hidden"
        >
          {/* Filters */}
          <div className="px-6 py-4 border-b border-[var(--glass-border)] flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input
                type="text"
                placeholder="Search by hash, chain..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-[var(--glass-border)] text-sm text-foreground placeholder-foreground/30 bg-transparent outline-none focus:border-[var(--neon-blue)]/40 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'completed', 'pending', 'failed'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                    statusFilter === status
                      ? 'bg-[var(--neon-blue)] text-white'
                      : 'glass border border-[var(--glass-border)] text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-[var(--glass-border)]">
            {['Tx Hash', 'Amount', 'From', 'To', 'Status', 'Time', ''].map(col => (
              <div key={col} className="text-xs uppercase tracking-wider text-foreground/30 font-medium">{col}</div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-[var(--glass-border)]">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-foreground/30 text-sm">No transactions found</div>
            ) : (
              filtered.map((tx, i) => (
                <motion.div
                  key={tx.hash}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Hash */}
                  <div className="font-mono text-xs text-[var(--neon-blue)] flex items-center gap-1">
                    <span className="hidden md:block">{tx.hash}</span>
                    <span className="md:hidden">{tx.hash.slice(0, 10)}...</span>
                  </div>

                  {/* Amount */}
                  <div>
                    <div className="font-medium text-sm text-foreground">{tx.amount} {tx.token}</div>
                    <div className="text-xs text-foreground/40">{tx.usdValue}</div>
                  </div>

                  {/* From */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: (chainColors[tx.sourceChain] || '#666') + '25', color: chainColors[tx.sourceChain] || '#666' }}>
                      {tx.sourceChain[0]}
                    </div>
                    <span className="text-xs text-foreground/70">{tx.sourceChain}</span>
                  </div>

                  {/* To */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: (chainColors[tx.destChain] || '#666') + '25', color: chainColors[tx.destChain] || '#666' }}>
                      {tx.destChain[0]}
                    </div>
                    <span className="text-xs text-foreground/70">{tx.destChain}</span>
                  </div>

                  {/* Status */}
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium badge-${tx.status}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="text-xs text-foreground/40">{tx.time}</div>

                  {/* Link */}
                  <a href="#" className="text-foreground/30 hover:text-[var(--neon-blue)] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[var(--glass-border)] flex items-center justify-between">
            <span className="text-xs text-foreground/30">{filtered.length} transactions</span>
            <button className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/70 transition-colors">
              Load more <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
