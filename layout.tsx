import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ARC Bridge — Cross-Chain Asset Transfer Protocol',
  description: 'Bridge assets across chains instantly. Powered by ARC Protocol and Circle CCTP for secure, fast, native USDC transfers.',
  keywords: ['bridge', 'cross-chain', 'USDC', 'CCTP', 'DeFi', 'Ethereum', 'Base', 'Arbitrum'],
  openGraph: {
    title: 'ARC Bridge',
    description: 'Bridge assets across chains instantly with native USDC',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#04040f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background dark`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
