import { motion } from 'framer-motion'
import type { PatternProps } from '../registry'

/**
 * Blueprint Lattice
 *
 * Editorial construction-grid aesthetic. A responsive SVG viewBox anchors
 * three fine construction rules (horizontal and vertical), one oversized
 * typographic anchor, and a small asymmetric lattice of intersecting lines.
 *
 * Motion reveals the geometry in structural order:
 *   1. Two vertical rules stroke in.
 *   2. Two horizontal rules stroke in.
 *   3. Diagonal lattice strokes in.
 *   4. Intersection nodes fade in.
 *   5. Typography fades and translates up slightly.
 *
 * Under reduced motion the composition renders complete on first paint.
 */
export function BlueprintLattice({ reduced, theme }: PatternProps) {
  const line = theme === 'light' ? 'rgba(19,17,17,0.55)' : 'rgba(244,242,236,0.55)'
  const fine = theme === 'light' ? 'rgba(19,17,17,0.28)' : 'rgba(244,242,236,0.28)'
  const grid = theme === 'light' ? 'rgba(19,17,17,0.08)' : 'rgba(244,242,236,0.08)'
  const ink = theme === 'light' ? '#131111' : '#f4f2ec'
  const accent = '#ec671b'

  const dur = reduced ? 0 : 1
  const delayStep = reduced ? 0 : 0.18
  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

  // Base viewBox is 1000×600 — patterns are anchored at grid intersections.
  return (
    <svg
      viewBox="0 0 1000 600"
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Faint background grid — 8 columns × 5 rows. Non-animated. */}
      <g stroke={grid} strokeWidth="0.5">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 125} y1={0} x2={i * 125} y2={600} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 120} x2={1000} y2={i * 120} />
        ))}
      </g>

      {/* Primary construction rules — two vertical, two horizontal */}
      <g stroke={line} strokeWidth="1.25" fill="none">
        <ConstructionLine
          d="M 250 60 L 250 540"
          reduced={reduced}
          delay={0}
          duration={dur * 0.9}
          ease={ease}
        />
        <ConstructionLine
          d="M 750 60 L 750 540"
          reduced={reduced}
          delay={delayStep}
          duration={dur * 0.9}
          ease={ease}
        />
        <ConstructionLine
          d="M 80 180 L 920 180"
          reduced={reduced}
          delay={delayStep * 2}
          duration={dur * 1.0}
          ease={ease}
        />
        <ConstructionLine
          d="M 80 420 L 920 420"
          reduced={reduced}
          delay={delayStep * 2.4}
          duration={dur * 1.0}
          ease={ease}
        />
      </g>

      {/* Asymmetric diagonal lattice — thin stroke, offset from centre */}
      <g stroke={fine} strokeWidth="0.75" fill="none">
        <ConstructionLine
          d="M 250 180 L 750 420"
          reduced={reduced}
          delay={delayStep * 3}
          duration={dur * 1.1}
          ease={ease}
        />
        <ConstructionLine
          d="M 250 420 L 620 180"
          reduced={reduced}
          delay={delayStep * 3.4}
          duration={dur * 1.0}
          ease={ease}
        />
        <ConstructionLine
          d="M 620 180 L 750 420"
          reduced={reduced}
          delay={delayStep * 3.8}
          duration={dur * 0.9}
          ease={ease}
        />
      </g>

      {/* Intersection nodes — appear last, sparingly */}
      {[
        { cx: 250, cy: 180 },
        { cx: 750, cy: 180 },
        { cx: 250, cy: 420 },
        { cx: 750, cy: 420 },
        { cx: 620, cy: 180 },
      ].map((p, i) => (
        <motion.circle
          key={`n${i}`}
          cx={p.cx}
          cy={p.cy}
          r={4}
          fill={ink}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.35,
            delay: reduced ? 0 : 0.8 + i * 0.08,
            ease,
          }}
        />
      ))}

      {/* Accent node — the one warm point in the composition.
          A slow pulsing halo keeps the composition alive at rest. */}
      <motion.circle
        cx={620}
        cy={180}
        r={7}
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: '620px 180px' }}
        transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.1, ease }}
      />
      {!reduced && (
        <>
          {/* Three phase-offset halos so a pulse is always in view */}
          <circle
            className="rp-blueprint-halo"
            cx={620}
            cy={180}
            r={7}
            fill="none"
            stroke={accent}
            strokeWidth="1.25"
          />
          <circle
            className="rp-blueprint-halo rp-blueprint-halo--b"
            cx={620}
            cy={180}
            r={7}
            fill="none"
            stroke={accent}
            strokeWidth="1.25"
          />
          <circle
            className="rp-blueprint-halo rp-blueprint-halo--c"
            cx={620}
            cy={180}
            r={7}
            fill="none"
            stroke={accent}
            strokeWidth="1.25"
          />
        </>
      )}

      {/* Slow horizontal scanner — a hairline that drifts down the composition
          every ~6 s. Sits behind the typography so it is felt, not read. */}
      {!reduced && (
        <line
          className="rp-blueprint-scanner"
          x1={80}
          x2={920}
          y1={180}
          y2={180}
          stroke={accent}
          strokeWidth="0.75"
          strokeDasharray="4 6"
          opacity={0.55}
        />
      )}

      {/* Oversized typographic anchor — real SVG text so it stays crisp */}
      <motion.g
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 1.25, ease }}
      >
        <text
          x={80}
          y={330}
          fill={ink}
          style={{
            fontFamily: "'Open Sans', -apple-system, sans-serif",
            fontWeight: 800,
            fontSize: 180,
            letterSpacing: '-0.03em',
          }}
        >
          Lattice
        </text>
        <text
          x={80}
          y={370}
          fill={theme === 'light' ? 'rgba(19,17,17,0.55)' : 'rgba(244,242,236,0.55)'}
          style={{
            fontFamily: 'ui-monospace, "SF Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Pattern 01 · construction
        </text>
      </motion.g>

      {/* Anchor labels for the accent node */}
      <motion.g
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 1.35, ease }}
      >
        <line x1={620} y1={155} x2={620} y2={130} stroke={accent} strokeWidth="1" />
        <text
          x={620}
          y={118}
          textAnchor="middle"
          fill={accent}
          style={{
            fontFamily: 'ui-monospace, "SF Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          Focal
        </text>
      </motion.g>
    </svg>
  )
}

// A single stroke-drawn construction line, animated via strokeDashoffset.
function ConstructionLine({
  d,
  reduced,
  delay,
  duration,
  ease,
}: {
  d: string
  reduced: boolean
  delay: number
  duration: number
  ease: [number, number, number, number]
}) {
  // Use pathLength normalisation so every line animates in the same 0→1 space
  // regardless of how long the actual geometry is.
  return (
    <motion.path
      d={d}
      pathLength={1}
      strokeDasharray={1}
      initial={reduced ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration, delay, ease }}
    />
  )
}
