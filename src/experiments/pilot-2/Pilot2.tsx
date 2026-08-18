import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import './Pilot2.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Pilot 2 — layout catalogue.
 *
 * Ten editorial layouts drawn from the same visual family — same marker
 * grammar, palette, typography and rhythm — showing all the ways a chapter
 * page can arrange: chapter marker · two sentences of body · a graphic slot.
 *
 * Real content and imagery slot in later. Modelled on the composition rules
 * of brand.dropbox.com/typography.
 */
export function Pilot2({ onReturnHome: _onReturnHome }: { onReturnHome: () => void }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="p2-root"
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: 'calc(50% - 190px) 50%',
      }}
    >
      <div className="p2-scroll">
        {/* ── Intro ─────────────────────────────────────────────────── */}
        <section className="p2-intro">
          <div className="p2-container">
            <span className="p2-eyebrow">Layout catalogue · Pilot 2</span>
            <h1 className="p2-intro__title">
              Ten compositions. One design system.
            </h1>
            <p className="p2-intro__lede">
              Each chapter carries a marker, two sentences of body copy, and a graphic slot.
              The layouts differ; the grammar stays constant.
            </p>
          </div>
        </section>

        {/* 01 · Left text, right portrait media */}
        <LayoutSection num="01" label="Text left · portrait media right">
          <div className="p2-container p2-grid p2-grid--tr">
            <div className="p2-text">
              <Marker num="01" label="Foundations" />
              <h2 className="p2-h2">Design at Transform is a practice, not a look.</h2>
              <p className="p2-body">
                We shape services that people trust — grounded in evidence, empathy and iteration.
                Every choice earns its place.
              </p>
            </div>
            <Placeholder shape="portrait" label="Portrait media" />
          </div>
        </LayoutSection>

        {/* 02 · Landscape media left, text right */}
        <LayoutSection num="02" label="Landscape media left · text right">
          <div className="p2-container p2-grid p2-grid--ml">
            <Placeholder shape="landscape" label="Landscape media" />
            <div className="p2-text p2-text--right">
              <Marker num="02" label="Practice" />
              <h2 className="p2-h2">We start by understanding people, needs and context.</h2>
              <p className="p2-body">
                From there we reimagine what a service could be. The visible product is only ever a
                small part of the whole.
              </p>
            </div>
          </div>
        </LayoutSection>

        {/* 03 · Hero display over landscape media */}
        <LayoutSection num="03" label="Hero display · media beneath">
          <div className="p2-container p2-hero">
            <Marker num="03" label="Head, Heart, Hands" />
            <h2 className="p2-display">Head. Heart. <em>Hands.</em></h2>
            <p className="p2-body p2-body--wide">
              Three ideas that guide every project: how we think about the problem, how we care
              about the people in it, and how we make it real.
            </p>
            <Placeholder shape="landscape-wide" label="Landscape media" />
          </div>
        </LayoutSection>

        {/* 04 · Numbered pillars grid */}
        <LayoutSection num="04" label="Numbered pillars">
          <div className="p2-container">
            <div className="p2-pillars__head">
              <Marker num="04" label="The skills" />
              <h2 className="p2-h2">
                Great designers combine <em>empathy</em>,<sup>1</sup> <em>systems thinking</em>,<sup>2</sup> <em>creativity</em>,<sup>3</sup> &amp; <em>collaboration</em>.<sup>4</sup>
              </h2>
              <p className="p2-body">
                Depth in one discipline, breadth across many. Every specialist bringing a
                different strength to the same problem.
              </p>
            </div>
            <div className="p2-pillars__grid">
              {[
                { n: '1', label: 'Empathy' },
                { n: '2', label: 'Systems thinking' },
                { n: '3', label: 'Creativity' },
                { n: '4', label: 'Collaboration' },
              ].map((p) => (
                <div key={p.n} className="p2-pillars__cell">
                  <span className="p2-chip">{p.n}</span>
                  <Placeholder shape="square" label={p.label} tone="soft" />
                </div>
              ))}
            </div>
          </div>
        </LayoutSection>

        {/* 05 · Coloured plane pull-quote with inset media */}
        <LayoutSection num="05" label="Coloured plane pull-quote">
          <div className="p2-container p2-grid p2-grid--pq">
            <div className="p2-callout p2-callout--peach">
              <span className="p2-callout__quote-mark" aria-hidden="true">“</span>
              <p className="p2-callout__quote">
                We turn uncertainty into clarity and&nbsp;possibility.
              </p>
              <p className="p2-callout__body">
                We create the conditions for good design to&nbsp;thrive.
              </p>
              <span className="p2-callout__attribution">Our north star</span>
            </div>
            <div className="p2-text">
              <Marker num="05" label="North star" />
              <Placeholder shape="square" label="Square media" />
            </div>
          </div>
        </LayoutSection>

        {/* 06 · Full-bleed media hero */}
        <LayoutSection num="06" label="Full-bleed media" bleed>
          <div className="p2-fullbleed">
            <Placeholder shape="fullbleed" label="Full-bleed landscape media" />
          </div>
          <div className="p2-container p2-hero p2-hero--after-bleed">
            <Marker num="06" label="Participation" />
            <h2 className="p2-h2">Great design is built on great collaboration.</h2>
            <p className="p2-body p2-body--wide">
              Participatory design is our default. We invite people to walk through the work with
              us, so the outcome is something we all own.
            </p>
          </div>
        </LayoutSection>

        {/* 07 · Text left, media triptych right */}
        <LayoutSection num="07" label="Text · media triptych">
          <div className="p2-container p2-grid p2-grid--tri">
            <div className="p2-text">
              <Marker num="07" label="What enables it" />
              <h2 className="p2-h2">Design succeeds when culture, leadership and systems align.</h2>
              <p className="p2-body">
                It fails when purpose is unclear or process becomes theatre. The work of design is
                as much about the conditions as the output.
              </p>
            </div>
            <div className="p2-triptych">
              <Placeholder shape="square" label="Culture" tone="soft" />
              <Placeholder shape="square" label="Leadership" tone="soft" />
              <Placeholder shape="square" label="Systems" tone="soft" />
            </div>
          </div>
        </LayoutSection>

        {/* 08 · Split — display statement + inset */}
        <LayoutSection num="08" label="Statement · media inset">
          <div className="p2-container p2-grid p2-grid--inset">
            <div className="p2-text">
              <Marker num="08" label="Why it matters" />
              <h2 className="p2-display p2-display--sm">Good design earns&nbsp;trust.</h2>
              <p className="p2-body">
                Services succeed when people believe in them. Not because they're polished, but
                because they earn it, moment by moment.
              </p>
            </div>
            <div className="p2-inset">
              <Placeholder shape="portrait" label="Portrait inset" />
            </div>
          </div>
        </LayoutSection>

        {/* 09 · Card overlay on media */}
        <LayoutSection num="09" label="Card overlay on media">
          <div className="p2-container p2-overlay">
            <Placeholder shape="landscape-wide" label="Landscape media" />
            <div className="p2-overlay__card">
              <Marker num="09" label="Craft" />
              <h2 className="p2-h2">Great design turns complex problems into simple outcomes.</h2>
              <p className="p2-body">
                Evidence, imagination and real voices working together. Small compromises
                compound; small clarities do too.
              </p>
            </div>
          </div>
        </LayoutSection>

        {/* 10 · Centered prose column */}
        <LayoutSection num="10" label="Centered prose · media below">
          <div className="p2-container p2-prose">
            <Marker num="10" label="Closing" centered />
            <h2 className="p2-h2 p2-h2--centered">Design with people, not for&nbsp;them.</h2>
            <p className="p2-body p2-body--centered">
              Participation surfaces hidden groups, embeds insight, and builds capability that
              lasts long after the project has finished.
            </p>
            <Placeholder shape="landscape" label="Landscape media" />
          </div>
        </LayoutSection>

        <div className="p2-endstop" aria-hidden="true">End of catalogue · 10 layouts</div>
      </div>
    </motion.div>
  )
}

// ── Layout helpers ─────────────────────────────────────────────────────────

function LayoutSection({
  num,
  label,
  children,
  bleed = false,
}: {
  num: string
  label: string
  children: ReactNode
  bleed?: boolean
}) {
  return (
    <section className={`p2-section ${bleed ? 'p2-section--bleed' : ''}`} aria-label={`${num} ${label}`}>
      <div className="p2-section__tag" aria-hidden="true">
        <span>{num}</span>
        <span>·</span>
        <span>{label}</span>
      </div>
      {children}
    </section>
  )
}

function Marker({ num, label, centered = false }: { num: string; label: string; centered?: boolean }) {
  return (
    <span className={`p2-marker ${centered ? 'p2-marker--centered' : ''}`}>
      <span className="p2-marker__num">{num}</span>
      <span className="p2-marker__rule" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}

function Placeholder({
  shape,
  label,
  tone = 'default',
}: {
  shape: 'portrait' | 'landscape' | 'landscape-wide' | 'fullbleed' | 'square'
  label: string
  tone?: 'default' | 'soft'
}) {
  return (
    <div className={`p2-placeholder p2-placeholder--${shape} p2-placeholder--${tone}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}
