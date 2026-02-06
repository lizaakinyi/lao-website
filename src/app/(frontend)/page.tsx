import { getPayload } from 'payload'
import Image from 'next/image'
import React from 'react'
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
} from 'lucide-react'

import config from '@/payload.config'
import './styles.css'

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.6a8.21 8.21 0 0 0 4.76 1.51v-3.4c0-.01-1-.02-1-.02z" />
  </svg>
)

const platformIcons: Record<string, React.FC<{ size?: number }>> = {
  instagram: Instagram,
  x: XIcon,
  linkedin: Linkedin,
  tiktok: TikTokIcon,
  facebook: Facebook,
  youtube: Youtube,
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const title = siteSettings?.title || 'Liza Akinyi-Owino'
  const subtitle = siteSettings?.subtitle
  const socialLinks = siteSettings?.socialLinks || []

  return (
    <div className="home">
      <div className="content">
        <div className="hero-image">
          <Image
            src="/hero.webp"
            alt="Liza Akinyi-Owino"
            width={280}
            height={280}
            priority
          />
        </div>
        <p className="coming-soon">Coming Soon</p>
        <h1>{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {socialLinks.length > 0 && (
          <div className="social-links">
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
                >
                  <Icon size={24} />
                </a>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
