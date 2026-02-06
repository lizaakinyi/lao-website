import React from 'react'
import './styles.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SubscriptionProvider } from '@/components/SubscriptionProvider'
import { SubscribeModal } from '@/components/SubscribeModal'

export const metadata = {
  title: {
    default: 'Liza Akinyi',
    template: '%s | Liza Akinyi',
  },
  description:
    'Authority Hub — Articles, tools, programs and speaking by Liza Akinyi.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text antialiased flex flex-col">
        <SubscriptionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <SubscribeModal />
        </SubscriptionProvider>
      </body>
    </html>
  )
}
