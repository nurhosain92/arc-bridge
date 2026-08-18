'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Lock, Eye, CheckCircle, Coins, ArrowDown } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Lock,
    title: 'Lock USDC',
    subtitle: 'Source Chain',
    description: 'Your USDC is burned (destroyed) on the source chain using Circle\'s official burn contract. No wrapping — the native USDC ceases to exist on the source.',
    color: '#3b82f6',
    time: '~2s',
  },
  {
    step: 2,
    icon: Eye,
    title: 'CCTP Attestation',
    subtitle: 'Circle API',
    description: 'Circle\'s attestation service observes the burn event and issues a cryptographic signature proving the burn occurred. This is the security backbone.',
    color: '#8b5cf6',
    time: '~12s',
  },
  {
    step: 3,
    icon: CheckCircle,
    title: 'Cross-Chain Verification',
    subtitle: 'ARC Protocol',
    description: 'ARC\'s smart contracts on the destination chain verify Circle\'s attestation signature, confirming the burn is valid and finalized before proceeding.',
    color: '#06b6d4',
    time: '~3s',
  },
  {
    step: 4,
    icon: Coins,
    title: 'Mint Native USDC',
    subtitle: 'Destination Chain',
    description: 'Fresh, native USDC is minted on the destination chain by Circle\'s official minter contract. You receive real USDC, not a wrapped or bridged version.',
    color: '#10b981',
    time: '~2s',
  },
]

export function CCTPFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setIsRunning(true), 600)
    return () => clearTimeout(timer)
  }, [inView])

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <section ref={ref} className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[var(--neon-blue)]/[0.02]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--neon-blue)] font-medium mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Circle CCTP <span className="gradient-text">Transfer Flow</span>
          </h2>
          <p className="text-foreground/50 max-w-lg mx-auto text-pretty">
            The most secure cross-chain USDC transfer protocol. No wrapped assets, no custodians.
          </p>
        </motion.div>

        {/* Desktop: Horizontal stepper */}
        <div className="hidden lg:block">
          <div className="relative flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={step.step} className="flex-1 relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-10 left-1/2 right-0 h-px z-0">
                    <div className="h-full bg-[var(--glass-border)]" />
                    <motion.div
                      className="absolute inset-0 h-full"
                      style={{ background: `linear-gradient(90deg, ${step.color}, ${steps[i + 1].color})` }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={inView && activeStep > i ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative z-10 flex flex-col items-center px-4"
                >
                  {/* Step circle */}
                  <motion.div
                    animate={activeStep === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                      activeStep >= i ? 'glow-blue' : ''
                    }`}
                    style={{
                      background: activeStep >= i ? step.color + '20' : 'rgba(8,8,28,0.6)',
                      border: `2px solid ${activeStep >= i ? step.color : 'rgba(100,100,200,0.15)'}`,
                    }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: activeStep >= i ? step.color : '#404070' }} />
                  </motion.div>

                  {/* Step label */}
                  <div className="text-center">
                    <div className="text-xs text-foreground/30 mb-1">Step {step.step}</div>
                    <div className="font-semibold text-foreground mb-1" style={{ color: activeStep >= i ? step.color : undefined }}>{step.title}</div>
                    <div className="text-xs text-foreground/40 mb-3">{step.subtitle}</div>
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono"
                      style={{
                        background: step.color + '15',
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                      }}
                    >
                      {step.time}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Description panel */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 max-w-xl mx-auto glass rounded-2xl p-6 border border-[var(--glass-border)] text-center"
          >
            <p className="text-sm text-foreground/60 leading-relaxed">{steps[activeStep].description}</p>
          </motion.div>
        </div>

        {/* Mobile: Vertical stepper */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex gap-4"
            >
              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <div className="absolute left-5 top-14 bottom-0 w-px bg-[var(--glass-border)]" />
              )}

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10"
                style={{
                  background: step.color + '20',
                  border: `2px solid ${step.color}`,
                }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} />
              </div>

              <div className="glass rounded-2xl p-5 flex-1 border border-[var(--glass-border)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: step.color + '20', color: step.color }}
                  >
                    {step.time}
                  </span>
                </div>
                <div className="text-xs text-foreground/40 mb-2">{step.subtitle}</div>
                <p className="text-xs text-foreground/50 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 glass neon-border rounded-full px-6 py-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
            <span className="text-sm text-foreground/70">Total transfer time:</span>
            <span className="text-sm font-bold text-emerald-400">~19 seconds</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
