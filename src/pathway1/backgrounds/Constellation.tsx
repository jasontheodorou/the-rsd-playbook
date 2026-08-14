import { motion, useReducedMotion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * Constellation — small dots with thin lines fading in and out between them.
 * Connection. Network. People joining.
 */
type Props = {
  /** Dot + line colour. Default warm grey. */
  color?: string
  /** Number of dots. Default 12. */
  count?: number
  /** How many nearest-neighbour lines to draw per dot. Default 2. */
  connections?: number
  /** Alpha ceiling for dots. Default 0.55. */
  intensity?: number
}

type Point = { x: number; y: number }

// Deterministic random so the constellation doesn't reshuffle on every render.
function seededPoints(n: number, seed = 42): Point[] {
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  return Array.from({ length: n }, () => ({
    x: 8 + rand() * 84,
    y: 8 + rand() * 84,
  }))
}

function nearest(points: Point[], from: number, k: number): number[] {
  const others = points
    .map((p, i) => ({ i, d: (p.x - points[from].x) ** 2 + (p.y - points[from].y) ** 2 }))
    .filter((o) => o.i !== from)
    .sort((a, b) => a.d - b.d)
  return others.slice(0, k).map((o) => o.i)
}

export function Constellation({
  color = '#8A8583',
  count = 12,
  connections = 2,
  intensity = 0.55,
}: Props) {
  const reduce = useReducedMotion()
  const points = useMemo(() => seededPoints(count), [count])
  const edges = useMemo(() => {
    const seen = new Set<string>()
    const out: [number, number][] = []
    points.forEach((_, i) => {
      nearest(points, i, connections).forEach((j) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) {
          seen.add(key)
          out.push([i, j])
        }
      })
    })
    return out
  }, [points, connections])

  return (
    <div className="p1v2-amb p1v2-amb-constellation" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        {edges.map(([a, b], i) => {
          const p1 = points[a]
          const p2 = points[b]
          if (reduce) {
            return (
              <line
                key={i}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={color} strokeWidth="0.1" opacity={0.15}
              />
            )
          }
          return (
            <motion.line
              key={i}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={color} strokeWidth="0.1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0] }}
              transition={{
                duration: 6 + (i % 4) * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 6) * 0.8,
              }}
            />
          )
        })}
        {points.map((p, i) => {
          if (reduce) {
            return <circle key={i} cx={p.x} cy={p.y} r="0.5" fill={color} opacity={intensity} />
          }
          return (
            <motion.circle
              key={i}
              cx={p.x} cy={p.y} r="0.5"
              fill={color}
              initial={{ opacity: intensity * 0.5 }}
              animate={{ opacity: [intensity * 0.4, intensity, intensity * 0.4] }}
              transition={{
                duration: 4 + (i % 3) * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: (i % 5) * 0.5,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
