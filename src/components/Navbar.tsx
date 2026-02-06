import Link from 'next/link'
import { NavbarClient } from './NavbarClient'

export async function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between relative">
        <Link href="/" className="text-xl font-semibold text-text tracking-tight">
          Liza Akinyi
        </Link>
        <NavbarClient />
      </div>
    </header>
  )
}
