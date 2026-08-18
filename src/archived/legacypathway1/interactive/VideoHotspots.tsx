import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import './VideoHotspots.css'

/**
 * Pulsing dots overlaid on a video slide. Click a dot to reveal a small info
 * card. Click anywhere else to dismiss.
 *
 * Positions are given as % of the slide, chosen so hotspots + reveal cards
 * stay clear of the main card at bottom-left.
 */

export type Hotspot = {
  id: string
  /** % from left. */
  x: string
  /** % from top. */
  y: string
  title: string
  body: string
  /** Which side of the dot the info card opens toward. Default 'below'. */
  reveal?: 'below' | 'above' | 'left' | 'right'
}

type Props = {
  hotspots: Hotspot[]
  accentColor?: string
}

export function VideoHotspots({ hotspots, accentColor = '#EC671B' }: Props) {
  const [open, setOpen] = useState<string | null>(null)
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Element)) {
        setOpen(null)
        return
      }
      if (target.closest('.p1v2-hs__spot') || target.closest('.p1v2-hs__card')) return
      setOpen(null)
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return (
    <div ref={rootRef} className="p1v2-hs">
      {hotspots.map((h, i) => (
        <div
          key={h.id}
          className="p1v2-hs__slot"
          style={{ left: h.x, top: h.y }}
        >
          <button
            type="button"
            className="p1v2-hs__spot"
            onClick={(event) => {
              event.stopPropagation()
              setOpen(open === h.id ? null : h.id)
            }}
            aria-label={`Reveal: ${h.title}`}
            aria-expanded={open === h.id}
          >
            {!reduce && (
              <motion.span
                className="p1v2-hs__pulse"
                style={{ background: accentColor }}
                animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: i * 0.6,
                }}
              />
            )}
            <span className="p1v2-hs__dot" />
          </button>

          <AnimatePresence>
            {open === h.id && (
              <motion.aside
                className={`p1v2-hs__card p1v2-hs__card--${h.reveal ?? 'below'}`}
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
              >
                <h4 className="p1v2-hs__title">{h.title}</h4>
                <p className="p1v2-hs__body">{h.body}</p>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
