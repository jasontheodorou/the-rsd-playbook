import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Frame, Hotspots, SRC, ZONES, byKey, mid, rect, type ZoneKey } from './stage'
import './ecosystem.css'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 340, damping: 30 }

function Plate({ className = '' }: { className?: string }) {
  return <img className={`eco-plate ${className}`.trim()} src={SRC} alt="" aria-hidden="true" />
}

function Copy({ k }: { k: ZoneKey }) {
  const z = byKey(k)!
  return (
    <>
      <span className="eco-copy__label" style={{ color: z.tint }}>
        {`0${z.n}`} · {z.label}
      </span>
      <h4 className="eco-copy__title">{z.title}</h4>
      {z.body.map((line) => <p key={line} className="eco-copy__body">{line}</p>)}
    </>
  )
}

/* ══ E01 · Contour ripple ════════════════════════════════════════════════
   The drawing is already concentric, so this reads the layers outward: an
   ellipse ripples from the centre to the selected ring, and a rail keeps
   the inside-out order visible. Nothing is dimmed — the ring does the work. */

export function RippleExecution() {
  const [active, setActive] = useState<ZoneKey | null>(null)
  const reduce = useReducedMotion()
  const z = byKey(active)
  // The ring stays mounted and is driven by opacity/scale instead of being
  // presence-toggled: conditionally mounting an SVG child through
  // AnimatePresence left a stale zero-opacity ellipse behind and blocked the
  // next one from arriving. `held` keeps the last geometry so it shrinks back
  // into the layer it came from rather than jumping to the centre.
  const [held, setHeld] = useState(ZONES[0])
  useEffect(() => { if (z) setHeld(z) }, [z])
  const hm = mid(held)

  return (
    <div className="eco-case">
      <Frame>
        <Plate />
        <Hotspots active={active} onPick={(k) => setActive(k === active ? null : k)} />

        <svg className="eco-ripple" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.ellipse
            cx={hm.x} cy={hm.y}
            rx={held.box.w * 100 * 0.72} ry={held.box.h * 100 * 0.66}
            fill="none" stroke={held.tint} strokeWidth={0.5}
            vectorEffect="non-scaling-stroke"
            animate={{ opacity: z ? 1 : 0, scale: z ? 1 : 0.25 }}
            transition={reduce ? { duration: 0.15 } : { duration: 0.6, ease: EASE }}
            style={{ transformOrigin: `${hm.x}% ${hm.y}%` }}
          />
        </svg>
      </Frame>

      <div className="eco-rail">
        {ZONES.map((zz) => (
          <button
            key={zz.key}
            className={`eco-rail__step${active === zz.key ? ' is-active' : ''}`}
            onClick={() => setActive(zz.key === active ? null : zz.key)}
          >
            <span className="eco-rail__dot" style={{ background: active === zz.key ? zz.tint : undefined }} />
            {zz.label}
          </button>
        ))}
      </div>

      <div className="eco-copy eco-copy--under">
        <motion.div
          key={active ?? 'idle'}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.32, ease: EASE }}
        >
          {z ? <Copy k={z.key} /> : (
            <p className="eco-copy__idle">
              Five layers of context, from one person outward. Pick a layer.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ══ E02 · Spotlight ════════════════════════════════════════════════════
   The raster-native one. Two copies of the same file: a drained base, and a
   full-strength copy masked to a soft circle over the live zone. Same URL,
   so the browser serves the second from cache. */

export function SpotlightExecution() {
  const [hover, setHover] = useState<ZoneKey | null>(null)
  const z = byKey(hover)
  const c = z ? mid(z) : { x: 50, y: 50 }
  const maskR = z ? Math.max(z.box.w, z.box.h * 0.5) * 100 * 1.15 : 0
  const mask = `radial-gradient(circle ${maskR}% at ${c.x}% ${c.y}%, #000 0%, #000 52%, transparent 78%)`

  return (
    <div className="eco-case">
      <Frame className="eco-frame--spot">
        <Plate className="eco-plate--drained" />
        <img
          className="eco-plate eco-plate--lit"
          src={SRC} alt="" aria-hidden="true"
          style={{
            opacity: z ? 1 : 0,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
        />
        <Hotspots active={hover} onEnter={setHover} onLeave={() => setHover(null)} />

        {z && (
          <div
            className={`eco-anchor eco-anchor--flag${c.x > 72 ? ' eco-anchor--end' : ''}`}
            style={{ left: `${c.x}%`, top: `${z.box.y * 100}%` }}
          >
            <div key={z.key} className="eco-flag">
              <span className="eco-flag__n" style={{ background: z.tint }}>{z.n}</span>
              {z.label}
            </div>
          </div>
        )}
      </Frame>

      <div className="eco-copy eco-copy--under">
        <motion.div
          key={hover ?? 'idle'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
        >
          {z ? <Copy k={z.key} /> : (
            <p className="eco-copy__idle">
              Move across the plate to bring a layer back into focus.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ══ E03 · Push in ══════════════════════════════════════════════════════
   The asset is 4638px wide, so there is real detail to spend. Selecting a
   zone scales the plate about that zone's centre — an optical zoom rather
   than a crop, with the resolution to hold up. */

export function ZoomExecution() {
  const [active, setActive] = useState<ZoneKey | null>(null)
  const reduce = useReducedMotion()
  const z = byKey(active)
  const c = z ? mid(z) : { x: 50, y: 50 }

  return (
    <div className="eco-case">
      <div className="eco-split">
        <Frame className="eco-frame--clip">
          <motion.div
            className="eco-zoomer"
            animate={{ scale: z ? 2.5 : 1 }}
            transition={reduce ? { duration: 0.2 } : { duration: 0.72, ease: EASE }}
            style={{ transformOrigin: `${c.x}% ${c.y}%` }}
          >
            <Plate />
          </motion.div>
          {/* Hotspots ride above the zoom so the un-zoomed targets stay put. */}
          {!z && <Hotspots active={active} onPick={(k) => setActive(k)} numbered />}
        </Frame>

        <aside className="eco-panel">
          <motion.div
            key={active ?? 'idle'}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.34, ease: EASE }}
          >
            {z ? (
              <>
                <Copy k={z.key} />
                <button className="eco-panel__back" onClick={() => setActive(null)}>
                  ← Pull back out
                </button>
              </>
            ) : (
              <p className="eco-copy__idle">
                Five numbered layers. Choose one and the plate pushes in on it.
              </p>
            )}
          </motion.div>
        </aside>
      </div>
    </div>
  )
}

/* ══ E04 · Pin map ══════════════════════════════════════════════════════
   The most literal reading: it is a map, so it gets pins. They drop in on a
   stagger, and the live one opens a callout tethered to its own pin. */

export function PinsExecution() {
  const [active, setActive] = useState<ZoneKey | null>(null)
  const [dropped, setDropped] = useState(false)
  const reduce = useReducedMotion()
  const z = byKey(active)
  const c = z ? mid(z) : null

  useEffect(() => {
    const t = setTimeout(() => setDropped(true), 250)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="eco-case">
      <Frame className="eco-frame--pins" >
        <Plate />

        {ZONES.map((zz, i) => {
          const m = mid(zz)
          return (
            <motion.button
              key={zz.key}
              className={`eco-pin${active === zz.key ? ' is-active' : ''}`}
              style={{ left: `${m.x}%`, top: `${m.y}%`, borderColor: zz.tint }}
              aria-label={`${zz.label} — ${zz.title}`}
              onClick={(e) => { e.stopPropagation(); setActive(zz.key === active ? null : zz.key) }}
              initial={reduce ? { opacity: 0, x: '-50%', y: '-50%' } : { opacity: 0, scale: 0.3, x: '-50%', y: '-50%' }}
              animate={dropped
                ? { opacity: 1, scale: 1, x: '-50%', y: '-50%' }
                : { opacity: 0, scale: 0.3, x: '-50%', y: '-50%' }}
              transition={reduce ? { duration: 0.15 } : { ...SPRING, delay: 0.07 * i }}
            >
              <span style={{ color: zz.tint }}>{zz.n}</span>
            </motion.button>
          )
        })}

        {z && c && (
          <div
            className={`eco-anchor${c.x > 68 ? ' eco-anchor--end' : ''}`}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <div key={z.key} className="eco-callout">
              <span className="eco-callout__rule" style={{ background: z.tint }} />
              <Copy k={z.key} />
            </div>
          </div>
        )}
      </Frame>
    </div>
  )
}

/* ══ E05 · Strata lift ══════════════════════════════════════════════════
   The plate is drawn in perspective already, so this leans into it: choosing
   a layer tips the board slightly and floats a tinted pane over that zone,
   as if the stratum had been lifted off the board. */

export function StrataExecution() {
  const [active, setActive] = useState<ZoneKey | null>(null)
  const z = byKey(active)

  return (
    <div className="eco-case">
      {/* The tilt is a CSS transform driven by data-active rather than a Motion
          animation, matching how the rest of this page handles movement. */}
      <div className="eco-scene">
        <div className="eco-tilt" data-active={active ?? ''}>
          <Frame>
            <Plate />
            <Hotspots active={active} onPick={(k) => setActive(k === active ? null : k)} />

            {z && (
                <div
                  key={z.key}
                  className="eco-pane"
                  style={{ ...rect(z, 0.02), background: z.tint, borderColor: z.tint }}
                />
            )}
          </Frame>
        </div>
      </div>

      <div className="eco-strata-list">
        {ZONES.map((zz) => (
          <button
            key={zz.key}
            className={`eco-strata${active === zz.key ? ' is-active' : ''}`}
            style={{ borderLeftColor: active === zz.key ? zz.tint : 'transparent' }}
            onClick={() => setActive(zz.key === active ? null : zz.key)}
          >
            <span className="eco-strata__n">{`0${zz.n}`}</span>
            <span className="eco-strata__label">{zz.label}</span>
          </button>
        ))}
      </div>

      <div className="eco-copy eco-copy--under">
        <motion.div
          key={active ?? 'idle'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
        >
          {z ? <Copy k={z.key} /> : (
            <p className="eco-copy__idle">Lift a layer off the board.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
