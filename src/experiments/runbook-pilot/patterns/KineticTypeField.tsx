import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { PatternProps } from '../registry'

/**
 * Kinetic Type Field
 *
 * One headline, treated with:
 *   · a per-word entry stagger (translate-y + opacity)
 *   · a slow, clamped pointer-driven skew on capable devices
 *   · a fixed layout — no measurement inside RAF, no reflow loop
 *
 * The headline stays real, selectable HTML text. The clip mask is applied to
 * a single word for accent, so most of the copy remains typographically
 * unaltered.
 *
 * Under reduced motion, the composition renders complete and the pointer
 * skew is disabled.
 */
const HEADLINE = ['A', 'quiet', 'grammar', 'for', 'motion']
const ACCENT_INDEX = 2 // 'grammar'
const SUB = 'Type that behaves like design — measured, deliberate, quiet.'

export function KineticTypeField({ reduced, theme }: PatternProps) {
  const fg = theme === 'light' ? '#131111' : '#f4f2ec'
  const muted = theme === 'light' ? 'rgba(19,17,17,0.55)' : 'rgba(244,242,236,0.55)'
  const accent = '#ec671b'
  const rule = theme === 'light' ? 'rgba(19,17,17,0.16)' : 'rgba(244,242,236,0.16)'

  const stageRef = useRef<HTMLDivElement>(null)
  const [skew, setSkew] = useState(0)

  // Pointer-driven micro-skew — passive listener, RAF-throttled, clamped to
  // ±1.6deg so composition never becomes uncomfortable. Disabled entirely
  // when the user prefers reduced motion.
  useEffect(() => {
    if (reduced) return
    const el = stageRef.current
    if (!el) return

    let raf = 0
    let latestX = 0.5
    const handle = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      latestX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        // Map 0..1 → -1.6..+1.6
        setSkew((latestX - 0.5) * 3.2)
      })
    }
    el.addEventListener('pointermove', handle, { passive: true })
    return () => {
      el.removeEventListener('pointermove', handle)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduced])

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

  return (
    <div
      ref={stageRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateRows: '1fr auto',
        padding: 'clamp(24px, 4vw, 56px)',
        boxSizing: 'border-box',
      }}
    >
      {/* Meta rule + label above the headline */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.05, ease }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifySelf: 'start',
          alignSelf: 'start',
          fontFamily: 'ui-monospace, "SF Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: muted,
        }}
      >
        <span>Pattern 02 · kinetic</span>
        <span style={{ width: 40, height: 1, background: rule }} />
      </motion.div>

      {/* Headline. Real text, per-word entry, clip accent on 'grammar'. */}
      <div style={{ alignSelf: 'end' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "'Open Sans', -apple-system, sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(40px, 6.2vw, 92px)',
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            color: fg,
            maxWidth: '18ch',
            transform: reduced ? 'none' : `skewX(${skew * -0.35}deg)`,
            transformOrigin: 'left center',
            willChange: reduced ? 'auto' : 'transform',
            transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word + i}
              style={{ display: 'inline-block', marginRight: '0.24em' }}
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.75,
                delay: reduced ? 0 : 0.12 + i * 0.08,
                ease,
              }}
            >
              {i === ACCENT_INDEX ? (
                <span
                  className={reduced ? undefined : 'rp-kinetic-accent'}
                  style={reduced ? { color: accent } : undefined}
                >
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.8, ease }}
          style={{
            margin: '24px 0 0',
            maxWidth: '40ch',
            fontFamily: "'Open Sans', -apple-system, sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            lineHeight: 1.55,
            color: muted,
          }}
        >
          {SUB}
        </motion.p>
      </div>
    </div>
  )
}

