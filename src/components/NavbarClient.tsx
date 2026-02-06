'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/tools', label: 'Tools' },
  { href: '/programs', label: 'Programs' },
  { href: '/speaking', label: 'Speaking' },
]

export function NavbarClient() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 -mr-2 text-text"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Desktop CTAs */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="#newsletter"
          className="text-sm font-medium px-4 py-2 rounded-lg border border-border text-text hover:border-primary hover:text-primary transition-colors"
        >
          Newsletter
        </Link>
        <Link
          href="#book-a-call"
          className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          Book a Call
        </Link>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-bg border-b border-border shadow-lg md:hidden">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link
              href="#newsletter"
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-text-secondary hover:text-primary transition-colors"
            >
              Newsletter
            </Link>
            <Link
              href="#book-a-call"
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-primary"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
