import { motion, useReducedMotion } from 'framer-motion'

/**
 * Sweep — a thin, blurred band of light drifts diagonally.
 * Cinematic. Moment-of-attention.
 */
type Props = {
  /** Sweep colour. Default warm cream. */
  color?: string
  /** Cycle in seconds. Default 10. */
  cycle?: number
  /** Alpha ceiling. Default 0.28. */
  intensity?: number
  /** 'tl-br' | 'bl-tr' */
  direction?: 'tl-br' | 'bl-tr'
}

export function Sweep({ color = '#F1D46E', cycle = 10, intensity = 0.28, direction = 'tl-br' }: Props) {
  const reduce = useReducedMotion()
  const rotate = direction === 'tl-br' ? 12 : -12

  if (reduce) return null

  return (
    <div className="p1v2-amb p1v2-amb-sweep" aria-hidden="true">
      <motion.div
        className="p1v2-amb-sweep__band"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
          transform: `rotate(${rotate}deg)`,
        }}
        initial={{ x: '-40%', opacity: 0 }}
        animate={{ x: ['-40%', '140%'], opacity: [0, intensity, 0] }}
        transition={{ duration: cycle, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
      />
    </div>
  )
}
