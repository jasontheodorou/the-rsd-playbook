import { z } from 'zod'

const contentBlockSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('paragraph'), text: z.string() }),
  z.object({ type: z.literal('heading'), text: z.string() }),
  z.object({ type: z.literal('list'), items: z.array(z.string()) }),
  z.object({
    type: z.literal('callout'),
    variant: z.enum(['tool', 'involve', 'best-practice']),
    body: z.string(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
  }),
])

const resourceItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
})

const resourceGroupSchema = z.object({
  heading: z.string(),
  tint: z.enum(['mist', 'blush', 'yellow']),
  items: z.array(resourceItemSchema),
})

const cardSchema = z.object({
  id: z.string(),
  title: z.string(),
  minutes: z.number(),
  roles: z.array(z.string()),
  content: z.array(contentBlockSchema),
  resources: z.array(resourceGroupSchema).optional(),
})

const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  cards: z.array(cardSchema),
})

export const modulesArraySchema = z.array(moduleSchema)

export type ValidatedModule = z.infer<typeof moduleSchema>
