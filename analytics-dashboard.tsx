'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

const volumeData = [
  { date: 'Jul 21', volume: 42, txs: 1200 },
  { date: 'Jul 22', volume: 58, txs: 1850 },
  { date: 'Jul 23', volume: 35, txs: 980 },
  { date: 'Jul 24', volume: 74, txs: 2100 },
  { date: 'Jul 25', volume: 89, txs: 2400 },
  { date: 'Jul 26', volume: 65, txs: 1750 },
  { date: 'Jul 27', volume: 112, txs: 3100 },
  { date: 'Jul 28', volume: 95, txs: 2700 },
]

const chainData = [
  { name: 'Ethereum', value: 35, color: '#627EEA' },
  { name: 'Base', value: 28, color: '#0052FF' },
  { name: 'Arbitrum', value: 18, color: '#28A0F0' },
  { name: 'Optimism', value: 10, color: '#FF0420' },
  { name: 'Others', value: 9, color: '#8247E5' },
]

const speedData = [
  { time: '00:00', avg: 18 }, { time: '04:00', avg: 22 }, { time: '08:00', avg: 17 },
  { time: '12:00', avg: 19 }, { time: '16:00', avg: 21 }, { time: '20:00', avg: 16 }, { time: '24:00', avg: 18 },
]

const tvlData = [
  { month: 'Feb', tvl: 120 }, { month: 'Mar', tvl: 185 }, { month: 'Apr', tvl: 240 },
  { month: 'May', tvl: 310 }, { month: 'Jun', tvl: 450 }, { month: 'Jul', tvl: 580 },
]

const tooltipStyle = {
  backgroundColor: 'rgba(8,8,28,0.95)',
  border: '1px solid rgba(100,100,200,0.2)',
  borderRadius: '12px',
  color: '#f0f0ff',
  fontSize: '12px',
}

export function AnalyticsDashboard() {
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
          <span className="text-xs uppercase tracking-widest text-[var(--neon-blue)] font-medium mb-4 block">
            Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Protocol <span className="gradient-text">performance</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bridge Volume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0 }}
            className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Bridge Volume</h3>
                <p className="text-xs text-foreground/40">7-day rolling volume (millions USD)</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[var(--neon-blue)]">$95M</div>
                <div className="text-xs text-emerald-400">+18.4% today</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,200,0.06)" />
                <XAxis dataKey="date" tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}M`, 'Volume']} />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} fill="url(#volGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Daily Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Daily Transactions</h3>
                <p className="text-xs text-foreground/40">Transaction count per day</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[var(--neon-purple)]">3,100</div>
                <div className="text-xs text-emerald-400">+22.1% today</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={volumeData}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,200,0.06)" />
                <XAxis dataKey="date" tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [v, 'Transactions']} />
                <Bar dataKey="txs" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Chain Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
          >
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-1">Top Chains</h3>
              <p className="text-xs text-foreground/40">Volume distribution by network</p>
            </div>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={chainData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {chainData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {chainData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-foreground/60">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono text-foreground/80">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* TVL Growth */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-[var(--glass-border)]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground mb-1">TVL Growth</h3>
                <p className="text-xs text-foreground/40">Total value locked over time (millions)</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[var(--neon-cyan)]">$580M</div>
                <div className="text-xs text-emerald-400">+383% YTD</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={tvlData}>
                <defs>
                  <linearGradient id="tvlGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,200,0.06)" />
                <XAxis dataKey="month" tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6060a0', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}M`, 'TVL']} />
                <Line type="monotone" dataKey="tvl" stroke="url(#tvlGrad)" strokeWidth={2.5} dot={{ fill: '#06b6d4', strokeWidth: 0, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
