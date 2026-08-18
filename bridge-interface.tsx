'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownUp, ChevronDown, Zap, Info, Shield,
  Clock, AlertCircle, CheckCircle, Loader2, Wallet
} from 'lucide-react'

const chains = [
  { id: 1, name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
  { id: 8453, name: 'Base', symbol: 'BASE', icon: 'B', color: '#0052FF' },
  { id: 42161, name: 'Arbitrum', symbol: 'ARB', icon: 'A', color: '#28A0F0' },
  { id: 10, name: 'Optimism', symbol: 'OP', icon: 'O', color: '#FF0420' },
  { id: 43114, name: 'Avalanche', symbol: 'AVAX', icon: '▲', color: '#E84142' },
  { id: 137, name: 'Polygon', symbol: 'MATIC', icon: 'M', color: '#8247E5' },
]

const tokens = [
  { symbol: 'USDC', name: 'USD Coin', icon: '$', balance: '5,420.50' },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', balance: '2.847' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '₿', balance: '0.142' },
]

type BridgeState = 'idle' | 'connecting' | 'bridging' | 'success'

export function BridgeInterface() {
  const [fromChain, setFromChain] = useState(chains[0])
  const [toChain, setToChain] = useState(chains[1])
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [amount, setAmount] = useState('')
  const [bridgeState, setBridgeState] = useState<BridgeState>('idle')
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [showTokenDropdown, setShowTokenDropdown] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [slippage, setSlippage] = useState('0.5')

  const switchChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  const estimatedOutput = amount ? (parseFloat(amount) * 0.9985).toFixed(2) : '—'
  const bridgeFee = amount ? (parseFloat(amount) * 0.001).toFixed(2) : '—'
  const networkFee = '~$0.12'

  const handleBridge = () => {
    if (!walletConnected) {
      setWalletConnected(true)
      return
    }
    if (!amount) return
    setBridgeState('bridging')
    setTimeout(() => setBridgeState('success'), 3000)
  }

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
            Bridge Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Transfer assets <span className="gradient-text">in seconds</span>
          </h2>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-6 neon-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Bridge</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSlippage(slippage === '0.5' ? '1.0' : '0.5')}
                  className="text-xs text-foreground/50 hover:text-foreground/80 glass px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  Slippage: {slippage}%
                </button>
              </div>
            </div>

            {/* From */}
            <div className="glass rounded-2xl p-4 mb-2 border border-[var(--glass-border)] hover:border-[var(--neon-blue)]/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-foreground/40 uppercase tracking-wider">From</span>
                <button
                  onClick={() => { setShowFromDropdown(!showFromDropdown); setShowToDropdown(false) }}
                  className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: fromChain.color + '30', color: fromChain.color }}>
                    {fromChain.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{fromChain.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
                </button>
              </div>

              <AnimatePresence>
                {showFromDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-3 glass-strong rounded-xl border border-[var(--glass-border)] overflow-hidden"
                  >
                    {chains.filter(c => c.id !== toChain.id).map(chain => (
                      <button
                        key={chain.id}
                        onClick={() => { setFromChain(chain); setShowFromDropdown(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: chain.color + '30', color: chain.color }}>
                          {chain.icon}
                        </div>
                        <span className="text-sm text-foreground/80">{chain.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-2xl font-semibold text-foreground placeholder-foreground/20 outline-none"
                />
                <button
                  onClick={() => { setShowTokenDropdown(!showTokenDropdown); setShowFromDropdown(false); setShowToDropdown(false) }}
                  className="flex items-center gap-2 glass rounded-xl px-3 py-2 hover:bg-white/5 transition-colors shrink-0"
                >
                  <span className="text-sm font-bold text-foreground">{selectedToken.symbol}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
                </button>
              </div>

              <AnimatePresence>
                {showTokenDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-2 glass-strong rounded-xl border border-[var(--glass-border)] overflow-hidden"
                  >
                    {tokens.map(token => (
                      <button
                        key={token.symbol}
                        onClick={() => { setSelectedToken(token); setShowTokenDropdown(false) }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full glass border border-[var(--glass-border)] flex items-center justify-center text-sm font-bold text-[var(--neon-blue)]">
                            {token.icon}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-medium text-foreground">{token.symbol}</div>
                            <div className="text-xs text-foreground/40">{token.name}</div>
                          </div>
                        </div>
                        <span className="text-xs text-foreground/50 font-mono">{token.balance}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-foreground/30">Balance: {selectedToken.balance} {selectedToken.symbol}</span>
                <button
                  onClick={() => setAmount(selectedToken.balance.replace(',', ''))}
                  className="text-xs text-[var(--neon-blue)] hover:underline"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Switch button */}
            <div className="flex justify-center my-2">
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                onClick={switchChains}
                className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/10 transition-colors z-10"
              >
                <ArrowDownUp className="w-4 h-4" />
              </motion.button>
            </div>

            {/* To */}
            <div className="glass rounded-2xl p-4 mb-4 border border-[var(--glass-border)] hover:border-[var(--neon-blue)]/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-foreground/40 uppercase tracking-wider">To</span>
                <button
                  onClick={() => { setShowToDropdown(!showToDropdown); setShowFromDropdown(false) }}
                  className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 hover:bg-white/5 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: toChain.color + '30', color: toChain.color }}>
                    {toChain.icon}
                  </div>
                  <span className="text-sm font-medium text-foreground">{toChain.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
                </button>
              </div>

              <AnimatePresence>
                {showToDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-3 glass-strong rounded-xl border border-[var(--glass-border)] overflow-hidden"
                  >
                    {chains.filter(c => c.id !== fromChain.id).map(chain => (
                      <button
                        key={chain.id}
                        onClick={() => { setToChain(chain); setShowToDropdown(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                      >
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: chain.color + '30', color: chain.color }}>
                          {chain.icon}
                        </div>
                        <span className="text-sm text-foreground/80">{chain.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-2xl font-semibold text-foreground/30">
                {estimatedOutput}
              </div>
              <div className="text-xs text-foreground/30 mt-1">Estimated output ({selectedToken.symbol})</div>
            </div>

            {/* Fee breakdown */}
            {amount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="glass rounded-xl p-4 mb-4 border border-[var(--glass-border)] space-y-2"
              >
                {[
                  { label: 'Bridge Fee (0.1%)', value: `${bridgeFee} ${selectedToken.symbol}`, icon: Shield },
                  { label: 'Network Fee', value: networkFee, icon: Zap },
                  { label: 'Transfer Time', value: '~19 seconds', icon: Clock },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-3.5 h-3.5 text-foreground/30" />
                      <span className="text-xs text-foreground/50">{item.label}</span>
                    </div>
                    <span className="text-xs font-mono text-foreground/70">{item.value}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            <AnimatePresence mode="wait">
              {bridgeState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Bridge Successful!</span>
                </motion.div>
              ) : bridgeState === 'bridging' ? (
                <motion.div
                  key="loading"
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]/40 text-[var(--neon-blue)]"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-semibold">Bridging...</span>
                </motion.div>
              ) : (
                <motion.button
                  key="idle"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBridge}
                  className={`w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    !walletConnected
                      ? 'glass border border-[var(--neon-blue)]/40 text-[var(--neon-blue)] hover:bg-[var(--neon-blue)]/10'
                      : !amount
                      ? 'glass border border-[var(--glass-border)] text-foreground/30 cursor-not-allowed'
                      : 'bg-[var(--neon-blue)] text-white glow-blue hover:bg-[var(--neon-blue)]/90'
                  }`}
                >
                  {!walletConnected ? (
                    <><Wallet className="w-5 h-5" /> Connect Wallet</>
                  ) : !amount ? (
                    'Enter Amount'
                  ) : (
                    <><Zap className="w-5 h-5" /> Bridge Now</>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            <p className="text-center text-xs text-foreground/30 mt-4 flex items-center justify-center gap-1.5">
              <Shield className="w-3 h-3" />
              Secured by Circle CCTP • Native USDC transfers only
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
