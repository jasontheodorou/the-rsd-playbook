/**
 * Seed the current hardcoded content into Payload.
 *
 * Reads the SPA's `src/data/modules.ts` output via `getModulesForUser` and
 * upserts two `pathways` documents: one for service designer, one for
 * interaction designer. Each card's `illustrationKey` is populated from the
 * bundled asset filenames.
 *
 * Idempotent: matches on `slug` and updates in place.
 *
 * Usage: `npm run seed` from inside `cms/`. Requires the CMS env vars
 * (DATABASE_URL, PAYLOAD_SECRET) to be set.
 */

import { getPayload } from 'payload'
import config from '../src/payload.config'
import { getModulesForUser } from '../../src/data/modules'

type SeedTarget = {
  slug: string
  title: string
  role: 'service-designer' | 'interaction-designer'
  sourceRole: string
}

const targets: SeedTarget[] = [
  { slug: 'service-designer', title: 'Senior service designer', role: 'service-designer', sourceRole: 'service designer' },
  { slug: 'interaction-designer', title: 'Consultant interaction designer', role: 'interaction-designer', sourceRole: 'interaction designer' },
]

// illustrationKey mapping — pathway 1 (foundations) has assigned illustrations
// today; pathway 2 (modules) does not. Any card that maps here gets its key
// set; the rest get an empty string, which the SPA renders as a plain layout.
const illustrationKeyByCardId: Record<string, string> = {
  // pathway 1 (foundations) card ids can be added here when the seed script
  // also handles that pathway. For now the modules-based pathway has no
  // illustrations per card.
}

async function main() {
  const payload = await getPayload({ config })

  for (const target of targets) {
    const modules = getModulesForUser(target.sourceRole, '') // '' = no account card

    const modulesForCms = modules.map((m) => ({
      moduleId: m.id,
      title: m.title,
      description: m.description,
      cards: m.cards.map((c) => ({
        cardId: c.id,
        title: c.title,
        minutes: c.minutes,
        illustrationKey: illustrationKeyByCardId[c.id] ?? '',
        content: c.content.map(mapContentBlock),
      })),
    }))

    const existing = await payload.find({
      collection: 'pathways',
      where: { slug: { equals: target.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'pathways',
        id: existing.docs[0].id,
        data: {
          title: target.title,
          slug: target.slug,
          role: target.role,
          modules: modulesForCms,
        },
      })
      console.log(`↻ Updated ${target.slug}`)
    } else {
      await payload.create({
        collection: 'pathways',
        data: {
          title: target.title,
          slug: target.slug,
          role: target.role,
          modules: modulesForCms,
        },
      })
      console.log(`＋ Created ${target.slug}`)
    }
  }

  console.log('Done.')
  process.exit(0)
}

function mapContentBlock(block: {
  type: string
  text?: string
  items?: string[]
  variant?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
}) {
  switch (block.type) {
    case 'paragraph':
      return { blockType: 'paragraph', text: block.text ?? '' }
    case 'heading':
      return { blockType: 'heading', text: block.text ?? '' }
    case 'list':
      return {
        blockType: 'list',
        items: (block.items ?? []).map((text) => ({ text })),
      }
    case 'callout':
      return {
        blockType: 'callout',
        variant: block.variant ?? 'tool',
        body: block.body ?? '',
        ctaLabel: block.ctaLabel ?? '',
        ctaHref: block.ctaHref ?? '',
      }
    default:
      throw new Error(`Unknown content block type: ${block.type}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
