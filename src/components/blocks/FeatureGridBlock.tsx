import type { Program } from '@/payload-types'

type FeatureGridBlockData = Extract<NonNullable<Program['layout']>[number], { blockType: 'featureGrid' }>

export function FeatureGridBlock({ block }: { block: FeatureGridBlockData }) {
  const cols = block.columns === '4' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
        {block.features?.map((feature) => (
          <div
            key={feature.id}
            className="rounded-xl border border-border bg-bg-card p-6 text-center"
          >
            {feature.icon && (
              <span className="mb-3 inline-block text-3xl">{feature.icon}</span>
            )}
            <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
            {feature.description && (
              <p className="text-sm text-text-secondary">{feature.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
