import { motion, useReducedMotion } from 'framer-motion'

/**
 * Drift — 2–3 soft-blur radial gradients that drift very slowly.
 * Warm, calm, welcoming. Colour and intensity per instance.
 */
type Props = {
  /** Two or three tint hexes. Blobs use these in order. */
  palette?: string[]
  /** 0–1. Overall alpha ceiling for each blob. Default 0.35. */
  intensity?: number
  /** Seconds per full drift cycle. Default 22. */
  cycle?: number
}

const DEFAULT_PALETTE = ['#F2E2D6', '#F1D46E', '#F2C58A']

export function Drift({ palette = DEFAULT_PALETTE, intensity = 0.35, cycle = 22 }: Props) {
  const reduce = useReducedMotion()
  const blobs = palette.slice(0, 3)

  return (
    <div className="p1v2-amb p1v2-amb-drift" aria-hidden="true">
      {blobs.map((color, i) => {
        const size = 60 + i * 15
        const startX = [10, 65, 35][i] ?? 40
        const startY = [20, 55, 75][i] ?? 40
        const style = {
          background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
          width: `${size}%`,
          height: `${size}%`,
          left: `${startX - size / 2}%`,
          top: `${startY - size / 2}%`,
          opacity: intensity,
        } as const

        if (reduce) {
          return <div key={i} className="p1v2-amb-drift__blob" style={style} />
        }

        return (
          <motion.div
            key={i}
            className="p1v2-amb-drift__blob"
            style={style}
            animate={{
              x: ['0%', '8%', '-4%', '0%'],
              y: ['0%', '-6%', '5%', '0%'],
            }}
            transition={{
              duration: cycle + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}
