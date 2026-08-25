import { type ReactNode } from 'react'

/* ── ecosystem_001.png, made interactive ───────────────────────────────────
   This one is a raster (4638×1842 RGBA), not an SVG, so there is nothing
   inside to address — no paths, no ids. Every region is therefore defined by
   coordinates measured off the artwork and expressed as fractions of the
   image box, which means they survive any display size but NOT a re-export
   at different framing. If the source vector ever turns up, the element-level
   approach used for part2.svg becomes possible instead.

   The drawing is concentric: one figure at the centre, contours rippling out
   to the city edge. That is exactly the five layers of context in V2s9's
   "head" list, so the zones run inside-out in that order.                   */

export const SRC = '/illustrations/ecosystem_001.png'
export const ASPECT = 4638 / 1842

export type ZoneKey = 'individual' | 'service' | 'organisation' | 'community' | 'wider'

export type Zone = {
  key: ZoneKey
  n: number
  label: string
  title: string
  body: string[]
  tint: string
  /** Fractions of the image box: measured, then checked against the artwork. */
  box: { x: number; y: number; w: number; h: number }
}

export const ZONES: Zone[] = [
  {
    key: 'individual',
    n: 1,
    label: 'The individual',
    title: 'One person, and what they are trying to do',
    body: [
      'Everything starts with a person and the thing they are actually trying to get done.',
      'Their capability, motivation and opportunity decide whether a service works at all.',
    ],
    tint: '#619CBA',
    box: { x: 0.222, y: 0.375, w: 0.128, h: 0.215 },
  },
  {
    key: 'service',
    n: 2,
    label: 'The service',
    title: 'The steps, the handoffs, the technology',
    body: [
      'Around the person sits the service itself — its steps, its handoffs, its technology.',
      'This is where barriers show up, and where implementation either helps or gets in the way.',
    ],
    tint: '#F1D46E',
    box: { x: 0.370, y: 0.320, w: 0.145, h: 0.320 },
  },
  {
    key: 'organisation',
    n: 3,
    label: 'The organisation',
    title: 'Goals, priorities, capability and culture',
    body: [
      'Every service carries the shape of the organisation delivering it.',
      'Goals, commercial priorities, capability and culture all leave their mark on the experience.',
    ],
    tint: '#D8B4A3',
    box: { x: 0.520, y: 0.350, w: 0.075, h: 0.270 },
  },
  {
    key: 'community',
    n: 4,
    label: 'The community',
    title: 'Influence and relationships',
    body: [
      'People do not decide alone. Family, neighbours and local networks carry real weight.',
      'Community influence often explains adoption better than the design does.',
    ],
    tint: '#CBD9DA',
    box: { x: 0.665, y: 0.290, w: 0.175, h: 0.430 },
  },
  {
    key: 'wider',
    n: 5,
    label: 'The wider system',
    title: 'Policy, economics, infrastructure',
    body: [
      'Beyond all of it sits policy, economics, infrastructure and the wider environment.',
      'This is the context that decides whether something can scale, or only ever pilots well.',
    ],
    tint: '#EC671B',
    box: { x: 0.730, y: 0.015, w: 0.140, h: 0.250 },
  },
]

export const byKey = (k: ZoneKey | null) => ZONES.find((z) => z.key === k)

/** Percentage rect for an overlay, with a little padding for easier hitting. */
export function rect(z: Zone, pad = 0.012) {
  return {
    left: `${(z.box.x - pad) * 100}%`,
    top: `${(z.box.y - pad) * 100}%`,
    width: `${(z.box.w + pad * 2) * 100}%`,
    height: `${(z.box.h + pad * 2) * 100}%`,
  }
}

/** Zone centre as page percentages. */
export function mid(z: Zone) {
  return { x: (z.box.x + z.box.w / 2) * 100, y: (z.box.y + z.box.h / 2) * 100 }
}

/* Padding belongs on the outer stage; anything positioned lives in the frame,
   which is exactly the artwork's box. Learned the hard way on part2.svg:
   percentages resolve against the padding box, so overlays inside a padded
   stage stretch vertically and stop lining up with the drawing. */
export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`eco-frame ${className}`.trim()} style={{ aspectRatio: String(ASPECT) }}>
      {children}
    </div>
  )
}

/** Transparent hit targets. The line art is far too fine to click directly. */
export function Hotspots({
  active, onEnter, onLeave, onPick, numbered = false,
}: {
  active: ZoneKey | null
  onEnter?: (k: ZoneKey) => void
  onLeave?: () => void
  onPick?: (k: ZoneKey) => void
  numbered?: boolean
}) {
  return (
    <>
      {ZONES.map((z) => (
        <button
          key={z.key}
          className={`eco-hot${active === z.key ? ' is-active' : ''}`}
          style={rect(z)}
          aria-label={`${z.label} — ${z.title}`}
          aria-pressed={active === z.key}
          onMouseEnter={() => onEnter?.(z.key)}
          onFocus={() => onEnter?.(z.key)}
          onMouseLeave={() => onLeave?.()}
          onBlur={() => onLeave?.()}
          onClick={(e) => { e.stopPropagation(); onPick?.(z.key) }}
        >
          {numbered && <span className="eco-hot__pin">{z.n}</span>}
        </button>
      ))}
    </>
  )
}
