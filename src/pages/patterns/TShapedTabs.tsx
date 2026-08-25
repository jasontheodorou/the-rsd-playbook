import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import './TShapedTabs.css'

/* ── The four practices, copy lifted from the s8-tshaped "specialists" panel ── */

type Practice = {
  id: string
  tab: string
  sub: string
  body: string[]
}

const PRACTICES: Practice[] = [
  {
    id: 'service',
    tab: 'Service',
    sub: 'The bridge between disciplines',
    body: [
      'Service designers connect research, UX, technology, operations and policy.',
      'They make visible how a service works across front and back stage.',
    ],
  },
  {
    id: 'content',
    tab: 'Content',
    sub: 'Complexity made plain',
    body: [
      'Content designers turn complexity into plain language.',
      'They structure information so services stay understandable and accessible.',
    ],
  },
  {
    id: 'interaction',
    tab: 'Interaction',
    sub: 'Interfaces people can trust',
    body: [
      'UX and interaction designers make digital interactions clear, inclusive and evidence-driven.',
      'People can then use a service easily, safely and with confidence.',
    ],
  },
  {
    id: 'research',
    tab: 'Research',
    sub: 'Where the work begins',
    body: [
      'Researchers understand needs, motivations and systems through the eyes of users.',
      'They frame problems and test ideas before anything gets built.',
    ],
  },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const SPRING = { type: 'spring' as const, stiffness: 420, damping: 38, mass: 0.9 }

export type TShapedVariant = 'underline' | 'pill' | 'rail' | 'stack' | 'wipe'

export function TShapedTabs({ variant }: { variant: TShapedVariant }) {
  switch (variant) {
    case 'underline':   return <Underline />
    case 'pill':        return <Pill />
    case 'rail':        return <Rail />
    case 'stack':       return <Stack />
    case 'wipe':        return <Wipe />
  }
}

/* ── Shared bits ─────────────────────────────────────────────────────────── */

function Eyebrow({ tone = 'grey' }: { tone?: 'grey' | 'light' }) {
  return <span className={`tst__eyebrow tst__eyebrow--${tone}`}>Skills across the practice</span>
}

function Body({ p }: { p: Practice }) {
  return (
    <>
      <h4 className="tst__sub">{p.sub}</h4>
      {p.body.map((line) => <p key={line} className="tst__body">{line}</p>)}
    </>
  )
}

/* ── T01 · Sliding underline ──────────────────────────────────────────────
   The restrained one. An orange rule slides between tabs via layoutId;
   content crossfades and lifts. Closest to the tinted box it replaces. */

function Underline() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const uid = useId()
  const p = PRACTICES[active]

  return (
    <div className="tst tst--underline">
      <Eyebrow />
      <div className="tst__tabs tst__tabs--underline" role="tablist" aria-label="Design practices">
        {PRACTICES.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            className={`tst__tab tst__tab--underline${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {t.tab}
            {i === active && (
              <motion.span
                layoutId={`${uid}-rule`}
                className="tst__rule"
                transition={reduce ? { duration: 0 } : SPRING}
              />
            )}
          </button>
        ))}
      </div>

      <div className="tst__panel" role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0.15 : 0.36, ease: EASE }}
          >
            <Body p={p} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── T02 · Morphing pill + directional slide ──────────────────────────────
   An orange pill morphs behind the active label; the panel slides in from
   whichever side you came from, so travel has direction. */

function Pill() {
  const [[active, dir], setState] = useState<[number, number]>([0, 0])
  const reduce = useReducedMotion()
  const uid = useId()
  const p = PRACTICES[active]

  const go = (i: number) => setState([i, i > active ? 1 : -1])

  return (
    <div className="tst tst--pill">
      <div className="tst__tabs tst__tabs--pill" role="tablist" aria-label="Design practices">
        {PRACTICES.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            className={`tst__tab tst__tab--pill${i === active ? ' is-active' : ''}`}
            onClick={() => go(i)}
          >
            {i === active && (
              <motion.span
                layoutId={`${uid}-pill`}
                className="tst__pillbg"
                transition={reduce ? { duration: 0 } : SPRING}
              />
            )}
            <span className="tst__tab-label">{t.tab}</span>
          </button>
        ))}
      </div>

      <div className="tst__panel tst__panel--pill" role="tabpanel">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={p.id}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 44 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -44 }}
            transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
          >
            <Body p={p} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── T03 · Filmstrip rail ─────────────────────────────────────────────────
   All four panels live on one track that slides. Nothing mounts or
   unmounts, so the box never changes height — the calmest of the five. */

function Rail() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()

  return (
    <div className="tst tst--rail">
      <div className="tst__tabs tst__tabs--rail" role="tablist" aria-label="Design practices">
        {PRACTICES.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            className={`tst__tab tst__tab--rail${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <motion.span
              className="tst__tick"
              animate={{ scaleX: i === active ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.42, ease: EASE }}
            />
            <span className="tst__tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="tst__tab-label">{t.tab}</span>
          </button>
        ))}
      </div>

      <div className="tst__viewport" role="tabpanel">
        <motion.div
          className="tst__track"
          animate={{ x: `-${active * 100}%` }}
          transition={reduce ? { duration: 0 } : SPRING}
        >
          {PRACTICES.map((t) => (
            <div key={t.id} className="tst__cell" aria-hidden={t.id !== PRACTICES[active].id}>
              <Body p={t} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ── T04 · Stacked depth ──────────────────────────────────────────────────
   A segmented control on a navy header. Panels come forward out of the
   stack — the outgoing card recedes rather than sliding away. */

function Stack() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const uid = useId()
  const p = PRACTICES[active]

  return (
    <div className="tst tst--stack">
      <div className="tst__stackhead">
        <Eyebrow tone="light" />
        <div className="tst__tabs tst__tabs--stack" role="tablist" aria-label="Design practices">
          {PRACTICES.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              className={`tst__tab tst__tab--stack${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {i === active && (
                <motion.span
                  layoutId={`${uid}-seg`}
                  className="tst__segbg"
                  transition={reduce ? { duration: 0 } : SPRING}
                />
              )}
              <span className="tst__tab-label">{t.tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tst__panel tst__panel--stack" role="tabpanel">
        {/* In-flow invisible copy — the cards stack absolutely on top, so this
            is what actually gives the panel the height of the active copy. */}
        <div className="tst__sizer" aria-hidden="true"><Body p={p} /></div>
        <AnimatePresence initial={false}>
          <motion.div
            key={p.id}
            className="tst__stackcard"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03, y: -10 }}
            transition={{
              duration: reduce ? 0.15 : 0.42,
              ease: EASE,
              // Clear the outgoing card fast so the two don't sit on top of
              // each other as legible text.
              opacity: { duration: reduce ? 0.15 : 0.2 },
            }}
          >
            <Body p={p} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── T05 · Editorial wipe ─────────────────────────────────────────────────
   The expressive one. A ghost numeral sits behind the copy, and each
   change is revealed by a clip-path wipe chased by an orange leading edge. */

function Wipe() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const p = PRACTICES[active]

  return (
    <div className="tst tst--wipe">
      <div className="tst__tabs tst__tabs--wipe" role="tablist" aria-label="Design practices">
        {PRACTICES.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={i === active}
            className={`tst__tab tst__tab--wipe${i === active ? ' is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <motion.span
              className="tst__dot"
              aria-hidden="true"
              animate={{ scale: i === active ? 1 : 0, opacity: i === active ? 1 : 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.34, ease: EASE }}
            />
            <span className="tst__tab-label">{t.tab}</span>
          </button>
        ))}
      </div>

      <div className="tst__panel tst__panel--wipe" role="tabpanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${p.id}-num`}
            className="tst__ghost"
            aria-hidden="true"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -26 }}
            transition={{ duration: reduce ? 0.15 : 0.5, ease: EASE }}
          >
            {String(active + 1).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            className="tst__wipecopy"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 0 100%)' }}
            transition={{ duration: reduce ? 0.15 : 0.52, ease: EASE }}
          >
            <Body p={p} />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.span
            key={`${p.id}-edge`}
            className="tst__edge"
            aria-hidden="true"
            initial={{ left: '0%', opacity: reduce ? 0 : 1 }}
            animate={{ left: '100%', opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.56, ease: EASE }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
