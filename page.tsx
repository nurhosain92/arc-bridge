'use client'

import { useState } from 'react'
import { ParticleBackground } from '@/components/particle-background'
import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { StatsSection } from '@/components/stats-section'
import { NetworksSection } from '@/components/networks-section'
import { BridgeInterface } from '@/components/bridge-interface'
import { CCTPFlow } from '@/components/cctp-flow'
import { WalletDashboard } from '@/components/wallet-dashboard'
import { TransactionHistory } from '@/components/transaction-history'
import { AnalyticsDashboard } from '@/components/analytics-dashboard'
import { SecuritySection } from '@/components/security-section'
import { FAQSection } from '@/components/faq-section'
import { Footer } from '@/components/footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    const el = document.getElementById(section)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="relative min-h-screen aurora-bg">
      <ParticleBackground />

      <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />

      <main className="relative z-10">
        <div id="home">
          <HeroSection onLaunch={() => handleSectionChange('bridge')} />
        </div>

        <div id="stats">
          <StatsSection />
        </div>

        <div id="networks">
          <NetworksSection />
        </div>

        <div id="bridge">
          <BridgeInterface />
        </div>

        <div id="cctp">
          <CCTPFlow />
        </div>

        <div id="dashboard">
          <WalletDashboard />
        </div>

        <div id="history">
          <TransactionHistory />
        </div>

        <div id="analytics">
          <AnalyticsDashboard />
        </div>

        <div id="security">
          <SecuritySection />
        </div>

        <div id="faq">
          <FAQSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}
