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
  kind: z.literal('card').optional(),
  id: z.string(),
  title: z.string(),
  minutes: z.number(),
  roles: z.array(z.string()),
  content: z.array(contentBlockSchema),
  resources: z.array(resourceGroupSchema).optional(),
})

const methodSchema = z.object({
  kind: z.literal('method'),
  id: z.string(),
  title: z.string(),
  minutes: z.number(),
  roles: z.array(z.string()),
  whatItIs: z.string(),
  whenToUse: z.array(z.string()),
  whatYouDo: z.array(z.string()),
  whatYouProduce: z.array(z.string()),
  whatGoodLooksLike: z.union([z.string(), z.array(z.string())]),
  relatedMethods: z.array(z.string()).optional(),
  resources: z.array(resourceGroupSchema).optional(),
  accountResources: z.array(resourceGroupSchema).optional(),
  progress: z.enum(['not-started', 'viewed', 'worked-through', 'practised']).optional(),
  bestPractice: z.object({
    image: z.string(),
    alt: z.string().optional(),
    description: z.string(),
    ctaLabel: z.string(),
    ctaHref: z.string(),
  }).optional(),
})

const moduleItemSchema = z.union([cardSchema, methodSchema])

const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  cards: z.array(moduleItemSchema),
})

export const modulesArraySchema = z.array(moduleSchema)

export type ValidatedModule = z.infer<typeof moduleSchema>
