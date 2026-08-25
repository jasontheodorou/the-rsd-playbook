import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ICONS, VB, centre, pct, useIllustration, type IconKey } from './stage'
import './superpower.css'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 380, damping: 30 }

/* Percentage geometry only lines up with the artwork if the box it resolves
   against IS the artwork. Any padding on the stage (headroom for popovers,
   room for a caption) would otherwise stretch every overlay vertically, so
   padding lives on the stage and everything positioned lives in here. */
function Frame({ children }: { children: ReactNode }) {
  return <div className="spw-frame">{children}</div>
}

/* Transparent hit targets. The pencils and bubble strokes are far too thin
   to click, so the artwork stays visual and these take the interaction. */
function Hotspots({
  onEnter, onLeave, onPick, active, labelled = false,
}: {
  onEnter?: (k: IconKey) => void
  onLeave?: () => void
  onPick?: (k: IconKey) => void
  active: IconKey | null
  labelled?: boolean
}) {
  return (
    <>
      {ICONS.map((ic, n) => (
        <button
          key={ic.key}
          className={`spw-hot${active === ic.key ? ' is-active' : ''}`}
          style={pct(ic.box)}
          aria-label={ic.title}
          aria-pressed={active === ic.key}
          onMouseEnter={() => onEnter?.(ic.key)}
          onFocus={() => onEnter?.(ic.key)}
          onMouseLeave={() => onLeave?.()}
          onBlur={() => onLeave?.()}
          // Stopped here: S02 dismisses on a background click, and without
          // this the hotspot's own selection was cancelled by its own bubble.
          onClick={(e) => { e.stopPropagation(); onPick?.(ic.key) }}
        >
          {labelled && <span className="spw-hot__num">{n + 1}</span>}
        </button>
      ))}
    </>
  )
}

function Art({
  mode, active, hover = null,
}: { mode: string; active: IconKey | null; hover?: IconKey | null }) {
  const { hostRef, ready } = useIllustration()
  return (
    <div
      ref={hostRef}
      className={`spw-art${ready ? ' is-ready' : ''}`}
      data-mode={mode}
      data-active={active ?? ''}
      data-hover={hover ?? ''}
      aria-hidden="true"
    />
  )
}

/* ══ S01 · Sidebar dossier ══════════════════════════════════════════════ */

export function SidebarExecution() {
  const [active, setActive] = useState<IconKey | null>(null)
  const [hover, setHover] = useState<IconKey | null>(null)
  const reduce = useReducedMotion()
  const cur = ICONS.find((i) => i.key === active)

  return (
    <div className="spw-split">
      <div className="spw-stage">
        <Frame>
          <Art mode="dim-others" active={active} hover={hover} />
          <Hotspots
            active={active}
            onEnter={setHover}
            onLeave={() => setHover(null)}
            onPick={(k) => setActive(k === active ? null : k)}
          />
        </Frame>
      </div>

      <aside className="spw-panel">
        <AnimatePresence mode="wait" initial={false}>
          {cur ? (
            <motion.div
              key={cur.key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0.15 : 0.34, ease: EASE }}
            >
              <span className="spw-panel__swatch" style={{ background: cur.colour }} />
              <h3 className="spw-panel__title">{cur.title}</h3>
              <p className="spw-panel__body">{cur.body}</p>
              <button className="spw-panel__clear" onClick={() => setActive(null)}>Clear</button>
            </motion.div>
          ) : (
            <motion.p
              key="idle" className="spw-panel__idle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              Four moments in how we bring people into the work.
              <strong> Choose one.</strong>
            </motion.p>
          )}
        </AnimatePresence>
      </aside>
    </div>
  )
}

/* ══ S02 · Popover pinned to the icon ═══════════════════════════════════ */

export function PopoverExecution() {
  const [active, setActive] = useState<IconKey | null>(null)
  const [hover, setHover] = useState<IconKey | null>(null)
  const reduce = useReducedMotion()
  const cur = ICONS.find((i) => i.key === active)
  const c = cur ? centre(cur.box) : null
  // Keep the card inside the frame near the edges.
  const shiftX = c ? (c.x > 70 ? '-86%' : c.x < 22 ? '-14%' : '-50%') : '-50%'
  // Hangs below its icon. Anchoring to the icon's lower edge (rather than
  // translating up by a share of the card's own height) means the offset
  // doesn't drift as the copy length changes — and all four icons sit in the
  // upper half of the drawing, so there's room beneath but not above.
  const anchorTop = cur ? ((cur.box.y + cur.box.h) / VB.h) * 100 : 0

  return (
    <div className="spw-stage spw-stage--tall" onClick={() => setActive(null)}>
      <Frame>
        <Art mode="dim-others" active={active} hover={hover} />
        <Hotspots
          active={active}
          onEnter={setHover}
          onLeave={() => setHover(null)}
          onPick={(k) => setActive(k === active ? null : k)}
        />

        <AnimatePresence>
          {cur && c && (
            <motion.div
              className="spw-pop"
              // x/y go through Motion rather than CSS: Motion owns `transform`
              // on this element, so a CSS translate here would be overwritten
              // by the scale animation and the card would sit off-centre.
              style={{
                left: `${c.x}%`, top: `${anchorTop}%`,
                marginTop: 14, transformOrigin: 'top center',
              }}
              initial={reduce
                ? { opacity: 0, x: shiftX }
                : { opacity: 0, scale: 0.72, x: shiftX }}
              animate={{ opacity: 1, scale: 1, x: shiftX }}
              exit={reduce
                ? { opacity: 0, x: shiftX }
                : { opacity: 0, scale: 0.82, x: shiftX }}
              transition={reduce ? { duration: 0.15 } : SPRING}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="spw-pop__dot" style={{ background: cur.colour }} />
              <h4 className="spw-pop__title">{cur.title}</h4>
              <p className="spw-pop__body">{cur.body}</p>
              <span className="spw-pop__tail" />
            </motion.div>
          )}
        </AnimatePresence>
      </Frame>
    </div>
  )
}

/* ══ S03 · Guided walk-through ══════════════════════════════════════════ */

export function StepperExecution() {
  const [i, setI] = useState(0)
  const [playing, setPlaying] = useState(false)
  const reduce = useReducedMotion()
  const cur = ICONS[i]

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      setI((n) => {
        if (n === ICONS.length - 1) { setPlaying(false); return n }
        return n + 1
      })
    }, 2600)
    return () => clearTimeout(t)
  }, [playing, i])

  return (
    <div className="spw-step">
      <div className="spw-stage spw-stage--labelled">
        <Frame>
          <Art mode="dim-others" active={cur.key} />
          <Hotspots
            active={cur.key}
            labelled
            onPick={(k) => { setPlaying(false); setI(ICONS.findIndex((x) => x.key === k)) }}
          />
        </Frame>
      </div>

      <div className="spw-rail">
        {ICONS.map((ic, n) => (
          <button
            key={ic.key}
            className={`spw-rail__seg${n === i ? ' is-active' : ''}${n < i ? ' is-done' : ''}`}
            onClick={() => { setPlaying(false); setI(n) }}
            aria-label={ic.title}
          />
        ))}
      </div>

      <div className="spw-step__foot">
        <div className="spw-step__caption">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cur.key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: reduce ? 0.15 : 0.34, ease: EASE }}
            >
              <span className="spw-step__num">{`0${i + 1}`}</span>
              <h4 className="spw-step__title">{cur.title}</h4>
              <p className="spw-step__body">{cur.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="spw-step__ctrls">
          <button onClick={() => { setPlaying(false); setI(Math.max(0, i - 1)) }} disabled={i === 0}>Back</button>
          <button
            className="spw-step__play"
            onClick={() => { if (i === ICONS.length - 1) setI(0); setPlaying((p) => !p) }}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setPlaying(false); setI(Math.min(ICONS.length - 1, i + 1)) }} disabled={i === ICONS.length - 1}>Next</button>
        </div>
      </div>
    </div>
  )
}

/* ══ S04 · Ghost and reveal ═════════════════════════════════════════════ */

export function GhostExecution() {
  const [hover, setHover] = useState<IconKey | null>(null)
  const reduce = useReducedMotion()
  const cur = ICONS.find((i) => i.key === hover)
  const c = cur ? centre(cur.box) : null
  // The flower sits at 88% across, so a centred tag would spill off the
  // right edge — pull it back in the same way the popover does.
  const shiftX = c ? (c.x > 78 ? '-82%' : c.x < 22 ? '-18%' : '-50%') : '-50%'

  return (
    <div className="spw-stage spw-stage--ghost">
      <Frame>
        <Art mode="ghost" active={hover} />

        <AnimatePresence>
          {cur && c && (
            <motion.span
              key={`halo-${cur.key}`}
              className="spw-halo"
              style={{ left: `${c.x}%`, top: `${c.y}%`, background: cur.colour }}
              initial={reduce
                ? { opacity: 0, x: '-50%', y: '-50%' }
                : { opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
              animate={{ opacity: 0.24, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, x: '-50%', y: '-50%' }}
              transition={reduce ? { duration: 0.15 } : { duration: 0.5, ease: EASE }}
            />
          )}
        </AnimatePresence>

        <Hotspots active={hover} onEnter={setHover} onLeave={() => setHover(null)} />

        <AnimatePresence>
          {cur && c && (
            <motion.div
              key={`tag-${cur.key}`}
              className="spw-tag"
              style={{ left: `${c.x}%`, top: '100%' }}
              initial={reduce ? { opacity: 0, x: shiftX } : { opacity: 0, x: shiftX, y: 8 }}
              animate={{ opacity: 1, x: shiftX, y: 18 }}
              exit={{ opacity: 0, x: shiftX }}
              transition={{ duration: reduce ? 0.12 : 0.26, ease: EASE }}
            >
              <strong>{cur.title}</strong>
              <span>{cur.body}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Frame>
    </div>
  )
}

/* ══ S05 · Drawn connector ══════════════════════════════════════════════
   Reusable: the pathway uses the same mechanic with its own copy.        */

export type ConnectorItem = {
  key: IconKey
  colour: string
  title: string
  /** A single line, or one paragraph per sentence. */
  body: string | string[]
}

export function ConnectorPattern({
  items = ICONS,
  className = '',
}: { items?: ConnectorItem[]; className?: string }) {
  const [active, setActive] = useState<IconKey | null>(null)
  const [hover, setHover] = useState<IconKey | null>(null)
  const reduce = useReducedMotion()
  const cur = items.find((i) => i.key === active)
  const def = ICONS.find((i) => i.key === active)
  const c = def ? centre(def.box) : null

  return (
    <div className={`spw-conn ${className}`.trim()}>
      <div className="spw-stage">
        <Frame>
          {/* "subtle" rather than "dim-others": the unselected icons only
              step back a little, so activating one is a nudge not a spotlight. */}
          <Art mode="subtle" active={active} hover={hover} />
          <Hotspots
            active={active}
            onEnter={setHover}
            onLeave={() => setHover(null)}
            onPick={(k) => setActive(k === active ? null : k)}
          />

          <svg
            className="spw-conn__wire"
            viewBox={`0 0 ${VB.w} ${VB.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <AnimatePresence>
              {cur && def && c && (
                <motion.line
                  key={cur.key}
                  x1={(c.x / 100) * VB.w} y1={def.box.y + def.box.h}
                  x2={(c.x / 100) * VB.w} y2={VB.h}
                  stroke={cur.colour} strokeWidth={2.5} strokeLinecap="round"
                  initial={reduce ? { opacity: 0 } : { pathLength: 0, opacity: 1 }}
                  animate={reduce ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0.15 : 0.42, ease: EASE }}
                />
              )}
            </AnimatePresence>
          </svg>
        </Frame>
      </div>

      <AnimatePresence initial={false}>
        {cur && (
          <motion.div
            key="strip" className="spw-strip"
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
            style={{ overflow: 'hidden' }}
          >
            <div className="spw-strip__inner" style={{ borderTopColor: cur.colour }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={cur.key}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <h4 className="spw-strip__title">{cur.title}</h4>
                  {(Array.isArray(cur.body) ? cur.body : [cur.body]).map((line) => (
                    <p key={line} className="spw-strip__body">{line}</p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** The test page's S05. */
export function ConnectorExecution() {
  return <ConnectorPattern />
}
