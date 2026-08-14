export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'callout'
      variant: 'tool' | 'involve' | 'best-practice'
      body: string
      ctaLabel?: string
      ctaHref?: string
    }

export type ResourceTint = 'mist' | 'blush' | 'yellow'

export type ResourceItem = {
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
}

export type ResourceGroup = {
  heading: string
  tint: ResourceTint
  items: ResourceItem[]
}

export type Card = {
  id: string
  title: string
  minutes: number
  roles: string[]
  content: ContentBlock[]
  resources?: ResourceGroup[]
}

export type Module = {
  id: string
  title: string
  description: string
  cards: Card[]
}

export type Pathway = {
  id: string
  role: 'service-designer' | 'interaction-designer'
  title: string
  modules: Module[]
}
