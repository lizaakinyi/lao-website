import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Coming Soon — Liza Akinyi-Owino',
  title: 'Liza Akinyi-Owino',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
