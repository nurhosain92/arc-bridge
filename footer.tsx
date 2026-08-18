'use client'

import { motion } from 'framer-motion'
import { Zap, Code2, MessageSquare, AtSign, Send, Shield } from 'lucide-react'

const links = {
  product: [
    { label: 'Bridge', href: '#' },
    { label: 'Analytics', href: '#' },
    { label: 'Dashboard', href: '#' },
    { label: 'History', href: '#' },
  ],
  developers: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'SDK', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Disclosures', href: '#' },
  ],
}

const socials = [
  { icon: Code2, label: 'GitHub', href: '#' },
  { icon: AtSign, label: 'Twitter', href: '#' },
  { icon: MessageSquare, label: 'Discord', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--glass-border)] pt-16 pb-8 px-4">
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-blue)]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg glass neon-border flex items-center justify-center">
                <Zap className="w-4 h-4 text-[var(--neon-blue)]" />
              </div>
              <span className="font-semibold">
                <span className="gradient-text">ARC</span>
                <span className="text-foreground/70 ml-1 font-light">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-foreground/40 leading-relaxed max-w-xs mb-6 text-pretty">
              The most secure cross-chain USDC bridge. Powered by Circle CCTP for native, trustless transfers across every major blockchain.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl glass border border-[var(--glass-border)] flex items-center justify-center text-foreground/40 hover:text-[var(--neon-blue)] hover:border-[var(--neon-blue)]/30 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs uppercase tracking-widest text-foreground/30 font-medium mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--glass-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            © 2025 ARC Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
              <span className="text-xs text-foreground/30">All systems operational</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-[var(--glass-border)]">
              <Shield className="w-3 h-3 text-[var(--neon-blue)]" />
              <span className="text-xs text-foreground/40">Secured by Circle CCTP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
