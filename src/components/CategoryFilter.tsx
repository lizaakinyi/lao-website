'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

const categories = [
  { label: 'All', value: '' },
  { label: 'Business News', value: 'business-news' },
  { label: 'Funding', value: 'funding' },
  { label: 'Thoughts', value: 'thoughts' },
]

export function CategoryFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const active = searchParams.get('category') || ''

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => setCategory(cat.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            active === cat.value
              ? 'bg-primary text-white'
              : 'bg-bg-elevated text-text-secondary hover:bg-primary/10 hover:text-primary'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
