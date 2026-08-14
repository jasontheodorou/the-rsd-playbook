import { motion, useReducedMotion } from 'framer-motion'

/**
 * Orbs — small pulsing orbs placed around the slide. Non-interactive by default.
 * Interactive variants live in the `interactive/` folder.
 */
type Props = {
  /** Colours cycled through the orbs. */
  palette?: string[]
  /** Number of orbs. Default 5. */
  count?: number
  /** Base orb radius in px. Default 90. */
  size?: number
  /** Base pulse period in seconds. Default 5. */
  cycle?: number
  /** Alpha ceiling. Default 0.4. */
  intensity?: number
}

// Deterministic pseudo-random positions so orbs don't jump on re-render.
const POSITIONS = [
  { top: '12%', left: '18%' },
  { top: '70%', left: '82%' },
  { top: '78%', left: '12%' },
  { top: '18%', left: '78%' },
  { top: '48%', left: '48%' },
  { top: '38%', left: '8%' },
] as const

export function Orbs({
  palette = ['#F1D46E', '#F2E2D6', '#CBD9DA', '#F2C58A', '#D8B4A3'],
  count = 5,
  size = 90,
  cycle = 5,
  intensity = 0.4,
}: Props) {
  const reduce = useReducedMotion()
  const orbs = POSITIONS.slice(0, Math.min(count, POSITIONS.length))

  return (
    <div className="p1v2-amb p1v2-amb-orbs" aria-hidden="true">
      {orbs.map((pos, i) => {
        const color = palette[i % palette.length]
        const px = size + (i % 3) * 20
        const style = {
          ...pos,
          width: px,
          height: px,
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
          opacity: intensity,
        }

        if (reduce) return <div key={i} className="p1v2-amb-orbs__orb" style={style} />

        return (
          <motion.div
            key={i}
            className="p1v2-amb-orbs__orb"
            style={style}
            animate={{ scale: [1, 1.15, 1], opacity: [intensity, intensity * 0.65, intensity] }}
            transition={{
              duration: cycle + (i * 0.7),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        )
      })}
    </div>
  )
}
