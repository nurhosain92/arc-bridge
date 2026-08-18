'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What is ARC Bridge?',
    answer: 'ARC Bridge is a cross-chain asset transfer protocol built on Circle\'s Cross-Chain Transfer Protocol (CCTP). It enables instant, native USDC transfers across multiple blockchain networks without wrapping or custodians.',
  },
  {
    question: 'How does Circle CCTP work?',
    answer: 'Circle CCTP works through a burn-and-mint mechanism. When you initiate a transfer, your USDC is burned on the source chain. Circle\'s attestation service then verifies the burn, and native USDC is minted on the destination chain. This eliminates the need for liquidity pools or wrapped tokens.',
  },
  {
    question: 'How fast are transfers?',
    answer: 'Transfers typically complete in ~19 seconds end-to-end. The process involves ~2s for the burn transaction, ~12s for Circle\'s attestation, ~3s for cross-chain verification, and ~2s for minting on the destination chain.',
  },
  {
    question: 'What are the fees?',
    answer: 'ARC Bridge charges a 0.1% protocol fee on the transfer amount. You also pay destination chain gas fees (estimated at ~$0.12 on L2s, higher on Ethereum mainnet). There are no hidden fees or spread charges.',
  },
  {
    question: 'Is ARC Bridge safe to use?',
    answer: 'Yes. ARC Bridge has been audited by Trail of Bits and Consensys Diligence with zero critical findings. We use Circle\'s official CCTP contracts, which means the security of your USDC is guaranteed by Circle itself — the issuer of USDC.',
  },
  {
    question: 'What tokens can I bridge?',
    answer: 'Currently, ARC Bridge supports USDC (native) transfers only. This is intentional — by focusing on USDC via CCTP, we can guarantee you receive genuine native USDC without any bridge risk. Support for additional tokens may be added in future.',
  },
  {
    question: 'Which wallets are supported?',
    answer: 'ARC Bridge supports all major wallets including MetaMask, WalletConnect (400+ wallets), Coinbase Wallet, Rainbow, and Trust Wallet. Any EVM-compatible wallet works with our interface.',
  },
  {
    question: 'What happens if a transfer fails?',
    answer: 'In the rare event of a failure, your funds are never lost. The burn transaction can be re-attested and retried. Our support team monitors all failed transactions and will assist with recovery within 24 hours.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-[var(--neon-blue)]/40' : 'border-[var(--glass-border)]'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`font-medium text-sm sm:text-base transition-colors ${open ? 'text-[var(--neon-blue)]' : 'text-foreground'}`}>
          {faq.question}
        </span>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
            open
              ? 'bg-[var(--neon-blue)]/20 text-[var(--neon-blue)]'
              : 'glass border border-[var(--glass-border)] text-foreground/40'
          }`}
        >
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-[var(--glass-border)] mb-4" />
              <p className="text-sm text-foreground/55 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--neon-purple)] font-medium mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Common <span className="gradient-text">questions</span>
          </h2>
          <p className="text-foreground/50 text-pretty">Everything you need to know about ARC Bridge and Circle CCTP.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
