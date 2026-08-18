'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, ChevronDown, ExternalLink } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navLinks = [
  { label: 'Bridge', section: 'bridge' },
  { label: 'Dashboard', section: 'dashboard' },
  { label: 'Analytics', section: 'analytics' },
  { label: 'History', section: 'history' },
]

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong border-b border-[var(--glass-border)]' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onSectionChange('home')}
          className="flex items-center gap-2.5 group"
          aria-label="ARC Bridge Home"
        >
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-[var(--neon-blue)] opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
            <div className="relative w-8 h-8 rounded-lg glass neon-border flex items-center justify-center">
              <Zap className="w-4 h-4 text-[var(--neon-blue)]" />
            </div>
          </div>
          <span className="text-base font-semibold tracking-tight">
            <span className="gradient-text">ARC</span>
            <span className="text-foreground/70 ml-1 font-light">Bridge</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => onSectionChange(link.section)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === link.section
                  ? 'text-[var(--neon-blue)] bg-[var(--neon-blue)]/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-[var(--glass-border)]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
            <span className="text-xs text-foreground/60">Mainnet</span>
          </div>
          <button
            onClick={() => onSectionChange('bridge')}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-[var(--neon-blue)] text-white hover:bg-[var(--neon-blue)]/80 transition-all duration-200 glow-blue"
          >
            Launch App
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg glass text-foreground/70"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-[var(--glass-border)]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <button
                  key={link.section}
                  onClick={() => { onSectionChange(link.section); setMobileOpen(false) }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                    activeSection === link.section
                      ? 'text-[var(--neon-blue)] bg-[var(--neon-blue)]/10'
                      : 'text-foreground/60'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => { onSectionChange('bridge'); setMobileOpen(false) }}
                className="mt-2 px-4 py-3 rounded-xl text-sm font-medium bg-[var(--neon-blue)] text-white"
              >
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
