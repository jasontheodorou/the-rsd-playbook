import { motion, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { ImageCoverRevealBoxed } from './patterns/ImageCoverRevealBoxed'
import './Pilot3.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Pilot 3 — follow-on layouts.
 *
 * Ten sub-section templates that would sit below the hero sections in /pilot.
 * Each layout carries the same three ingredients — a headline, two sentences,
 * a graphic slot — but arranges them differently. Backgrounds cycle through
 * three barely-perceptible cream tones.
 */
export function Pilot3({ onReturnHome: _onReturnHome }: { onReturnHome: () => void }) {
  const reduce = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      className="p3-root"
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
      <div ref={scrollRef} className="p3-scroll">
        {/* Intro */}
        <section className="p3-intro" data-tone="base">
          <div className="p3-container">
            <h1 className="p3-intro__title">
              What comes after each hero.
            </h1>
            <p className="p3-intro__lede">
              Sub-section templates that build on the pathway 1 chapters — expanding a definition,
              breaking down a framework, showing evidence, or drawing a comparison.
            </p>
          </div>
        </section>

        {/* 01 · Text left, portrait media right */}
        <Section tone="airy">
          <div className="p3-container p3-grid p3-grid--tr">
            <div className="p3-text">
              <h2 className="p3-h2">How we work: people, place, systems and&nbsp;context.</h2>
              <p className="p3-body">
                We look beyond the visible product or service to the people using it and delivering it.
                That fuller picture is where good design begins.
              </p>
            </div>
            <Placeholder shape="portrait" />
          </div>
        </Section>

        {/* 02 · Contrast pair */}
        <Section tone="warm">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro">Two failure modes, one root cause.</h2>
            <p className="p3-body p3-body--intro">
              Services fail people when systems come first. Design fails services when it becomes
              theatre. Both begin the same way — losing sight of who this is for.
            </p>
            <div className="p3-contrast">
              <Placeholder shape="landscape" />
              <Placeholder shape="landscape" />
            </div>
          </div>
        </Section>

        {/* 03 · Three-part breakdown */}
        <Section tone="base">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro">Three parts of the same practice.</h2>
            <p className="p3-body p3-body--intro">
              Head frames the problem. Heart holds onto the people in it. Hands make it real.
            </p>
            <div className="p3-triptych">
              {['Head', 'Heart', 'Hands'].map((title) => (
                <div key={title} className="p3-triptych__cell">
                  <span className="p3-h3">{title}</span>
                  <Placeholder shape="square" />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 04 · Numbered process */}
        <Section tone="airy">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro">How trust is earned.</h2>
            <p className="p3-body p3-body--intro">
              Four things good services do, consistently. Miss one and belief erodes; hold all four
              and it compounds.
            </p>
            <ol className="p3-steps">
              {[
                { n: '1', title: 'Address real problems' },
                { n: '2', title: 'Reduce waste' },
                { n: '3', title: 'Build confidence' },
                { n: '4', title: 'Keep learning' },
              ].map((s) => (
                <li key={s.n} className="p3-steps__item">
                  <span className="p3-steps__num">{s.n}</span>
                  <span className="p3-steps__title">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* 05 · Discipline specimens grid */}
        <Section tone="base">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro">The disciplines under our T.</h2>
            <p className="p3-body p3-body--intro">
              Six specialisms our team brings to complex problems. Each one is a depth; together
              they are our breadth.
            </p>
            <div className="p3-specimen">
              {[
                'Research',
                'Service design',
                'Interaction',
                'Systems thinking',
                'Policy design',
                'Content design',
              ].map((label) => (
                <div key={label} className="p3-specimen__cell">
                  <Placeholder shape="square" />
                  <span className="p3-h3">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 06 · Pull quote plane */}
        <Section tone="warm">
          <div className="p3-container p3-grid p3-grid--pq">
            <div className="p3-callout">
              <p className="p3-callout__quote">
                Design succeeds when leadership, culture and systems align.
              </p>
              <p className="p3-callout__body">
                It stalls when any of those three drifts out of tune with the others.
              </p>
            </div>
            <div className="p3-text">
              <Placeholder shape="portrait" />
            </div>
          </div>
        </Section>

        {/* 07 · Diagram plane */}
        <Section tone="airy">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro p3-h2--centered">A single frame, three overlaps.</h2>
            <p className="p3-body p3-body--intro p3-body--centered">
              Where evidence, imagination and lived experience overlap is where great design lives.
              The diagram makes the overlap visible.
            </p>
            <Placeholder shape="landscape-wide" />
          </div>
        </Section>

        {/* 08 · Timeline sequence */}
        <Section tone="base">
          <div className="p3-container">
            <h2 className="p3-h2 p3-h2--intro">How participation unfolds.</h2>
            <p className="p3-body p3-body--intro">
              Four moments where participants shape the outcome. The line is never linear, but
              always visible.
            </p>
            <div className="p3-timeline">
              {[
                { n: '01', title: 'Invite' },
                { n: '02', title: 'Walk through' },
                { n: '03', title: 'Prototype' },
                { n: '04', title: 'Sustain' },
              ].map((step, i, arr) => (
                <div key={step.n} className="p3-timeline__step">
                  <div className="p3-timeline__marker">
                    <span className="p3-timeline__dot" aria-hidden="true" />
                    {i < arr.length - 1 && <span className="p3-timeline__line" aria-hidden="true" />}
                  </div>
                  <span className="p3-h3">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* 09 · Detail with inset */}
        <Section tone="warm">
          <div className="p3-container p3-grid p3-grid--inset">
            <div className="p3-text">
              <h2 className="p3-h2">What clarity looks like in&nbsp;practice.</h2>
              <p className="p3-body">
                Turning uncertainty into clarity means naming the problem clearly, the constraints
                honestly, and the assumptions openly. That's what the north star asks of us daily.
              </p>
            </div>
            <div className="p3-inset">
              <Placeholder shape="portrait" />
            </div>
          </div>
        </Section>

        {/* 10 · Media + text */}
        <Section tone="base">
          <div className="p3-container p3-grid p3-grid--ml">
            <Placeholder shape="landscape" />
            <div className="p3-text p3-text--right">
              <h2 className="p3-h2">From concept to something you can&nbsp;use.</h2>
              <p className="p3-body">
                Hands means making the idea testable — a prototype, a walkthrough, a working
                version. It's how we learn where the concept holds and where it needs to bend.
              </p>
            </div>
          </div>
        </Section>

        {/* 11 · Asymmetric display + inset — cool tone */}
        <Section tone="cool">
          <div className="p3-container p3-asymm">
            <h2 className="p3-h2 p3-display">
              Where evidence and imagination&nbsp;meet.
            </h2>
            <div className="p3-asymm__side">
              <p className="p3-body">
                Great design lives in the overlap of what we can measure, what we can imagine, and
                what people live through. The overlap is where useful ideas start.
              </p>
              <Placeholder shape="square" />
            </div>
          </div>
        </Section>

        {/* 12 · Portrait media left · text right — cool tone */}
        <Section tone="cool">
          <div className="p3-container p3-grid p3-grid--ml">
            <Placeholder shape="portrait" />
            <div className="p3-text p3-text--right">
              <h2 className="p3-h2">Shared language changes the work.</h2>
              <p className="p3-body">
                Design succeeds when people share a vocabulary for it. Clear terms and clear
                definitions turn every conversation into a step forward, not a translation problem.
              </p>
            </div>
          </div>
        </Section>

        {/* 13 · Image cover reveal (cribbed from valencia-pattern-library) —
              boxed scroll-driven reveal, heading sweeps ink → white in step. */}
        <Section tone="cool">
          <div className="p3-container">
            <ImageCoverRevealBoxed
              imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&fit=crop"
              heading="Design lives in the overlap between evidence and imagination."
              bgColor="#E8EDEE"
              inkColor="#111"
              scrollContainer={scrollRef}
              height={520}
            />
            <div className="p3-prose">
              <h2 className="p3-h2 p3-h2--centered">A quiet moment for the whole&nbsp;picture.</h2>
              <p className="p3-body p3-body--centered">
                Every so often a chapter ends and the reader deserves space to catch up. This layout
                gives the last idea room to settle before the next one begins.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </motion.div>
  )
}

// ── Helpers ────────────────────────────────────────────────────────────────

function Section({ tone, children }: { tone: 'base' | 'warm' | 'airy' | 'cool'; children: ReactNode }) {
  return <section className="p3-section" data-tone={tone}>{children}</section>
}

function Placeholder({ shape }: { shape: 'portrait' | 'landscape' | 'landscape-wide' | 'square' }) {
  return <div className={`p3-placeholder p3-placeholder--${shape}`} aria-hidden="true" />
}
