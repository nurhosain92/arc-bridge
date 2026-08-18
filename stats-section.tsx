'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Activity, Globe, Clock, Shield, Layers } from 'lucide-react'

interface StatCard {
  icon: React.ElementType
  label: string
  value: string
  numericValue: number
  prefix: string
  suffix: string
  subtext: string
  color: string
  delay: number
}

const stats: StatCard[] = [
  {
    icon: TrendingUp,
    label: 'Total Volume',
    value: '$2.4B',
    numericValue: 2.4,
    prefix: '$',
    suffix: 'B',
    subtext: '+12.4% this week',
    color: 'text-[var(--neon-blue)]',
    delay: 0,
  },
  {
    icon: Activity,
    label: 'Total Transactions',
    value: '1.8M',
    numericValue: 1.8,
    prefix: '',
    suffix: 'M',
    subtext: '+8.2% this week',
    color: 'text-[var(--neon-purple)]',
    delay: 0.1,
  },
  {
    icon: Globe,
    label: 'Chains Supported',
    value: '8',
    numericValue: 8,
    prefix: '',
    suffix: '',
    subtext: '2 coming soon',
    color: 'text-[var(--neon-cyan)]',
    delay: 0.2,
  },
  {
    icon: Clock,
    label: 'Avg Transfer Time',
    value: '~19s',
    numericValue: 19,
    prefix: '~',
    suffix: 's',
    subtext: 'Fastest in class',
    color: 'text-emerald-400',
    delay: 0.3,
  },
  {
    icon: Shield,
    label: 'Security Score',
    value: '99.8%',
    numericValue: 99.8,
    prefix: '',
    suffix: '%',
    subtext: 'Zero incidents',
    color: 'text-amber-400',
    delay: 0.4,
  },
  {
    icon: Layers,
    label: 'Total Value Locked',
    value: '$580M',
    numericValue: 580,
    prefix: '$',
    suffix: 'M',
    subtext: '+5.1% this week',
    color: 'text-rose-400',
    delay: 0.5,
  },
]

function AnimatedNumber({ value, prefix, suffix, running }: { value: number; prefix: string; suffix: string; running: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!running) return
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, running])

  const formatted = value < 10 && suffix !== 's' && suffix !== '%'
    ? display.toFixed(1)
    : Math.round(display).toString()

  return <span>{prefix}{formatted}{suffix}</span>
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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
            Protocol Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Trusted by the <span className="gradient-text">entire ecosystem</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative glass rounded-2xl p-6 border border-[var(--glass-border)] hover:border-[var(--neon-blue)]/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-[var(--neon-blue)]/[0.03] rounded-2xl" />
              </div>

              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl glass border border-[var(--glass-border)] ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Live</span>
                </div>
              </div>

              <div className={`text-3xl font-bold mb-1 ${stat.color} text-glow-blue`}>
                <AnimatedNumber
                  value={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  running={inView}
                />
              </div>
              <div className="text-sm font-medium text-foreground/80 mb-1">{stat.label}</div>
              <div className="text-xs text-foreground/40">{stat.subtext}</div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${stat.color}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
