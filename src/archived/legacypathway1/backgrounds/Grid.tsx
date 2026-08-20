import { motion, useReducedMotion } from 'framer-motion'

/**
 * Grid — regular dot grid with a subtle diagonal highlight sweep.
 * Structured, considered, editorial.
 */
type Props = {
  /** Dot colour. Default warm grey. */
  color?: string
  /** px between dots. Default 32. */
  size?: number
  /** Dot alpha. Default 0.18. */
  intensity?: number
  /** Sweep cycle in seconds. Default 12. */
  cycle?: number
}

export function Grid({ color = '#8A8583', size = 32, intensity = 0.18, cycle = 12 }: Props) {
  const reduce = useReducedMotion()
  const dotSize = 1.5

  const dotSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
       <circle cx="${size / 2}" cy="${size / 2}" r="${dotSize}" fill="${color}" opacity="${intensity}" />
     </svg>`
  )

  return (
    <div className="p1v2-amb p1v2-amb-grid" aria-hidden="true">
      <div
        className="p1v2-amb-grid__dots"
        style={{ backgroundImage: `url("data:image/svg+xml,${dotSvg}")`, backgroundSize: `${size}px ${size}px` }}
      />
      {!reduce && (
        <motion.div
          className="p1v2-amb-grid__sweep"
          initial={{ x: '-30%', opacity: 0 }}
          animate={{ x: ['-30%', '130%'], opacity: [0, 0.5, 0] }}
          transition={{ duration: cycle, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        />
      )}
    </div>
  )
}
