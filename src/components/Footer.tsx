import Link from 'next/link'
import { Instagram, Linkedin, Facebook, Youtube } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { XIcon, TikTokIcon } from '@/components/icons'
import { NewsletterForm } from './NewsletterForm'

const platformIcons: Record<string, React.FC<{ size?: number }>> = {
  instagram: Instagram,
  x: XIcon,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
  facebook: Facebook,
  youtube: Youtube,
}

const quickLinks = [
  { href: '/articles', label: 'Articles' },
  { href: '/tools', label: 'Tools' },
  { href: '/programs', label: 'Programs' },
  { href: '/speaking', label: 'Speaking' },
]

export async function Footer() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
  const socialLinks = siteSettings?.socialLinks || []

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand + newsletter upsell */}
          <div>
            <Link href="/" className="text-lg font-semibold text-text tracking-tight">
              Liza Akinyi
            </Link>
            <p className="mt-3 mb-4 text-sm text-text-secondary leading-relaxed">
              Get funding news, tools, and insights delivered weekly.
            </p>
            <NewsletterForm />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
              Connect
            </h3>
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map((link) => {
                  const Icon = platformIcons[link.platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="text-text-secondary hover:text-primary transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-text-secondary">
          &copy; {new Date().getFullYear()} Liza Akinyi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
