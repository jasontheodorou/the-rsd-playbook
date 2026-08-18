import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import './JoiningDots.css'

/**
 * Progressive constellation. Starts sparse, adds a dot every ~1.5s until
 * ~20 dots. Hover lights any dot. Illustrates "more people joining".
 */
type Props = {
  /** Dot colour. Default warm blush. */
  color?: string
  /** Final dot count. Default 20. */
  target?: number
  /** ms between arrivals. Default 1500. */
  interval?: number
}

type Point = { x: number; y: number }

function seededPoints(n: number, seed = 7): Point[] {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: n }, () => ({ x: 6 + rand() * 88, y: 6 + rand() * 88 }))
}

export function JoiningDots({ color = '#D8B4A3', target = 20, interval = 1500 }: Props) {
  const reduce = useReducedMotion()
  const points = useMemo(() => seededPoints(target), [target])
  const [visibleCount, setVisibleCount] = useState(reduce ? target : 5)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (reduce) return
    if (visibleCount >= target) return
    const t = setTimeout(() => setVisibleCount((c) => c + 1), interval)
    return () => clearTimeout(t)
  }, [visibleCount, target, interval, reduce])

  return (
    <div className="p1v2-jd" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <AnimatePresence>
          {points.slice(0, visibleCount).map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y}
              r={hovered === i ? 1.4 : 0.9}
              fill={color}
              opacity={hovered === i ? 1 : 0.7}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: hovered === i ? 1 : 0.7 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer', pointerEvents: 'auto' }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
}
