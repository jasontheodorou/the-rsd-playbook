import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import './HHHOrbs.css'

/**
 * Three orbs — Head, Heart, Hands. Pulse to invite. Hover reveals a label.
 * Click jumps the deck to the corresponding sub-slide.
 */
type Props = {
  /** Called with the index the deck should jump to. */
  onJump: (index: number) => void
  /** Slide indexes for head/heart/hands respectively. */
  targets: [number, number, number]
}

const ORBS = [
  { key: 'head',  label: 'Head',  color: '#619CBA', top: '22%', left: '22%' },
  { key: 'heart', label: 'Heart', color: '#D8B4A3', top: '22%', left: '72%' },
  { key: 'hands', label: 'Hands', color: '#F1D46E', top: '68%', left: '50%' },
] as const

export function HHHOrbs({ onJump, targets }: Props) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="p1v2-hhh" aria-hidden={false}>
      {ORBS.map((orb, i) => (
        <button
          key={orb.key}
          type="button"
          className="p1v2-hhh__orb"
          style={{ top: orb.top, left: orb.left }}
          onClick={() => onJump(targets[i])}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(i)}
          onBlur={() => setHovered(null)}
          aria-label={`Jump to ${orb.label}`}
        >
          {/* Slow pulse ring */}
          {!reduce && (
            <motion.span
              className="p1v2-hhh__pulse"
              style={{ background: orb.color }}
              animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.6 }}
            />
          )}
          {/* Solid dot */}
          <span className="p1v2-hhh__dot" style={{ background: orb.color }} />

          <AnimatePresence>
            {hovered === i && (
              <motion.span
                className="p1v2-hhh__label"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                {orb.label}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  )
}
