import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { PatternProps } from '../registry'

/**
 * Signal Grid
 *
 * Modular 14×8 CSS-Grid field of small square "cells". A single focal cell
 * — offset from centre — pulses on a slow rhythm; its accent radiates
 * outward in a soft ring every ~4 s. Non-focal cells sit at a low fixed
 * opacity so the composition reads as a quiet field with one point of life.
 *
 * Under reduced motion the pulse is switched off and the strongest static
 * frame is displayed (focal cell fully lit, ring at rest).
 */
const COLS = 14
const ROWS = 8
const FOCAL_COL = 9 // 0-indexed → column 10 of 14, right-of-centre
const FOCAL_ROW = 3

export function SignalGrid({ reduced, theme }: PatternProps) {
  const cellColour =
    theme === 'light' ? 'rgba(19,17,17,0.14)' : 'rgba(244,242,236,0.14)'
  const cellStroke =
    theme === 'light' ? 'rgba(19,17,17,0.08)' : 'rgba(244,242,236,0.08)'
  const label =
    theme === 'light' ? 'rgba(19,17,17,0.5)' : 'rgba(244,242,236,0.5)'
  const accent = '#ec671b'

  // Pause the pulse when the tab is hidden — cheap perf win, no visible cost.
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const pulsing = !reduced && visible

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        padding: 'clamp(28px, 4vw, 56px)',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 20,
      }}
    >
      {/* Meta rule */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontFamily: 'ui-monospace, "SF Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: label,
        }}
      >
        <span>Pattern 03 · signal</span>
        <span
          style={{
            flex: 1,
            height: 1,
            background: theme === 'light' ? 'rgba(19,17,17,0.12)' : 'rgba(244,242,236,0.12)',
          }}
        />
        <span>{COLS}×{ROWS} field · 1 focal</span>
      </div>

      {/* Grid field */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          gap: 'clamp(6px, 0.9vw, 12px)',
          minHeight: 0,
        }}
      >
        {Array.from({ length: COLS * ROWS }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const isFocal = col === FOCAL_COL && row === FOCAL_ROW

          if (isFocal) {
            return (
              <FocalCell
                key={i}
                pulsing={pulsing}
                accent={accent}
                stroke={cellStroke}
              />
            )
          }

          // Distance from focal — used for a very slight opacity fall-off
          // so the field breathes around the accent without any per-cell
          // animation loops.
          const dx = col - FOCAL_COL
          const dy = row - FOCAL_ROW
          const dist = Math.sqrt(dx * dx + dy * dy)
          const nearBoost = Math.max(0, 1 - dist / 5)

          return (
            <div
              key={i}
              aria-hidden="true"
              style={{
                background: cellColour,
                border: `1px solid ${cellStroke}`,
                opacity: 0.4 + nearBoost * 0.35,
              }}
            />
          )
        })}

        {/* Slow ring — pure CSS transform + opacity, single element */}
        {pulsing && (
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.4, opacity: 0.35 }}
            animate={{ scale: 3.4, opacity: 0 }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              position: 'absolute',
              // Position the ring's centre over the focal cell using the
              // same grid tracks — column 10 of 14, row 4 of 8.
              left: `${((FOCAL_COL + 0.5) / COLS) * 100}%`,
              top: `${((FOCAL_ROW + 0.5) / ROWS) * 100}%`,
              width: 80,
              height: 80,
              marginLeft: -40,
              marginTop: -40,
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              pointerEvents: 'none',
              transformOrigin: 'center',
              willChange: 'transform, opacity',
            }}
          />
        )}

        {/* Vertical scan — a CSS-animated accent band that drifts across the
            grid every ~5 s. Sits above the cells so they light up as it
            passes without any per-cell state. */}
        {pulsing && <div aria-hidden="true" className="rp-signal-band" />}
      </div>

      {/* Focal legend */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'flex-end',
          fontFamily: 'ui-monospace, "SF Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: label,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            background: accent,
            boxShadow: `0 0 0 3px rgba(236,103,27,0.18)`,
          }}
          aria-hidden="true"
        />
        <span>Focal · col {FOCAL_COL + 1} · row {FOCAL_ROW + 1}</span>
      </div>
    </div>
  )
}

function FocalCell({
  pulsing,
  accent,
  stroke,
}: {
  pulsing: boolean
  accent: string
  stroke: string
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0.85 }}
      animate={pulsing ? { opacity: [0.85, 1, 0.85] } : { opacity: 1 }}
      transition={
        pulsing
          ? { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
          : { duration: 0 }
      }
      style={{
        background: accent,
        border: `1px solid ${stroke}`,
        boxShadow: `0 0 0 2px rgba(236,103,27,0.18)`,
        willChange: pulsing ? 'opacity' : 'auto',
      }}
    />
  )
}
