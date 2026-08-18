import type { ReactElement } from 'react'
import { BlueprintLattice } from './patterns/BlueprintLattice'
import { KineticTypeField } from './patterns/KineticTypeField'
import { SignalGrid } from './patterns/SignalGrid'

export type PatternStatus = 'draft' | 'review' | 'approved'
export type PatternTheme = 'light' | 'dark'

export type PatternProps = {
  reduced: boolean
  theme: PatternTheme
}

export type PilotPattern = {
  id: string
  name: string
  description: string
  status: PatternStatus
  tags: string[]
  component: (props: PatternProps) => ReactElement
  defaultTheme?: PatternTheme
}

export const patterns: PilotPattern[] = [
  {
    id: 'blueprint-lattice',
    name: 'Blueprint Lattice',
    description:
      'Editorial construction grid with an oversized typographic anchor. Fine SVG lines reveal in structural order to expose the underlying geometry.',
    status: 'review',
    tags: ['geometry', 'svg', 'editorial'],
    component: BlueprintLattice,
    defaultTheme: 'dark',
  },
  {
    id: 'kinetic-type-field',
    name: 'Kinetic Type Field',
    description:
      'A single headline treated with a clip-mask and measured stagger. Selectable text; motion is clamped so the composition stays readable at every frame.',
    status: 'review',
    tags: ['typography', 'motion', 'clip'],
    component: KineticTypeField,
    defaultTheme: 'dark',
  },
  {
    id: 'signal-grid',
    name: 'Signal Grid',
    description:
      'A modular CSS grid with a single focal disruption. A low-frequency pulse radiates from the focal point, leaving the surrounding rhythm quiet.',
    status: 'review',
    tags: ['grid', 'ambient', 'accent'],
    component: SignalGrid,
    defaultTheme: 'dark',
  },
]

export function findPatternById(id: string | null): PilotPattern | undefined {
  if (!id) return undefined
  return patterns.find((p) => p.id === id)
}
