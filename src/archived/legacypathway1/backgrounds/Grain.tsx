import { motion, useReducedMotion } from 'framer-motion'

/**
 * Grain — SVG noise texture with a slow position drift.
 * Paper-feel. Tactile. Almost imperceptible.
 */
type Props = {
  /** Alpha of the overlay. Default 0.07. Higher = coarser paper. */
  intensity?: number
  /** Cycle in seconds for drift. Default 18. */
  cycle?: number
}

const NOISE_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix values='0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.6 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(%23n)'/>
  </svg>`
)

export function Grain({ intensity = 0.07, cycle = 18 }: Props) {
  const reduce = useReducedMotion()
  const style = {
    backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
    backgroundSize: '220px 220px',
    opacity: intensity,
  }

  if (reduce) return <div className="p1v2-amb p1v2-amb-grain" style={style} aria-hidden="true" />

  return (
    <motion.div
      className="p1v2-amb p1v2-amb-grain"
      style={style}
      animate={{ backgroundPosition: ['0px 0px', '80px -40px', '0px 0px'] }}
      transition={{ duration: cycle, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    />
  )
}
