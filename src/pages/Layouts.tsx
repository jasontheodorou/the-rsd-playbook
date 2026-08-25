import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ImageCoverRevealBoxed } from '../experiments/pilot-3/patterns/ImageCoverRevealBoxed'
import { TShapedTabs } from './patterns/TShapedTabs'
import './Layouts.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

type Shape = 'portrait' | 'landscape' | 'landscape-wide' | 'fullbleed' | 'square'

export function Layouts({ onReturnHome: _onReturnHome }: { onReturnHome: () => void }) {
  const reduce = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      className="ly-root"
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%' }}
    >
      <div ref={scrollRef} className="ly-scroll">

        {/* ── T-shaped skills · tabbed practice panels. Five treatments to
              replace the tinted "specialists" box on s8-tshaped. ── */}

        <Banner num="T01" name="T-shaped tabs · Sliding underline" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <TShapedTabs variant="underline" />
          </div>
        </section>

        <Banner num="T02" name="T-shaped tabs · Morphing pill + directional slide" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <TShapedTabs variant="pill" />
          </div>
        </section>

        <Banner num="T03" name="T-shaped tabs · Filmstrip rail" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <TShapedTabs variant="rail" />
          </div>
        </section>

        <Banner num="T04" name="T-shaped tabs · Stacked depth (navy head)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <TShapedTabs variant="stack" />
          </div>
        </section>

        <Banner num="T05" name="T-shaped tabs · Editorial wipe + ghost numeral" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <TShapedTabs variant="wipe" />
          </div>
        </section>

        {/* ── New CTA card variants — image + one-sentence description
              + button, framed in Transform accent orange. Pick one. ── */}

        <Banner num="N01" name="CTA card · Offset plane behind" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-ctacard-row">
              <CtaCard variant="offset" />
            </div>
          </div>
        </section>

        <Banner num="N02" name="CTA card · Framed border" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-ctacard-row">
              <CtaCard variant="framed" />
            </div>
          </div>
        </section>

        <Banner num="N03" name="CTA card · Pinned rotated plane" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-ctacard-row">
              <CtaCard variant="pinned" />
            </div>
          </div>
        </section>

        <Banner num="N04" name="CTA card · Corner brackets" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-ctacard-row">
              <CtaCard variant="brackets" />
            </div>
          </div>
        </section>

        <Banner num="N05" name="CTA card · Pill background" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-ctacard-row">
              <CtaCard variant="pill" />
            </div>
          </div>
        </section>

        <Banner num="L01" name="Text left · Portrait right" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--tr">
            <div className="ly-text">
              <h2 className="ly-h2">Design at Transform is a practice, not a look.</h2>
              <p className="ly-body">
                We shape services that people trust — grounded in evidence, empathy and iteration.
                Every choice earns its place.
              </p>
            </div>
            <Placeholder shape="portrait" />
          </div>
        </section>

        <Banner num="L02" name="Landscape left · Text right" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--ml">
            <Placeholder shape="landscape" />
            <div className="ly-text">
              <h2 className="ly-h2">We start by understanding people, needs and context.</h2>
              <p className="ly-body">
                From there we reimagine what a service could be. The visible product is only ever a
                small part of the whole.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L03" name="Display headline · Landscape media" />
        <section className="ly-section">
          <div className="ly-container ly-hero">
            <h2 className="ly-display">Head. Heart. <em>Hands.</em></h2>
            <p className="ly-body ly-body--wide">
              Three ideas that guide every project: how we think about the problem, how we care
              about the people in it, and how we make it real.
            </p>
            <Placeholder shape="landscape-wide" />
          </div>
        </section>

        <Banner num="L04" name="Numbered pillars (4-cell)" />
        <section className="ly-section">
          <div className="ly-container">
            <div className="ly-pillars__head">
              <h2 className="ly-h2">
                Great designers combine <em>empathy</em>, <em>systems thinking</em>, <em>creativity</em>, and <em>collaboration</em>.
              </h2>
              <p className="ly-body">
                Depth in one discipline, breadth across many. Every specialist bringing a
                different strength to the same problem.
              </p>
            </div>
            <div className="ly-pillars__grid">
              {['1', '2', '3', '4'].map((n) => (
                <div key={n} className="ly-pillars__cell">
                  <span className="ly-chip">{n}</span>
                  <Placeholder shape="square" tone="soft" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner num="L05" name="Callout plane · Square media" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--pq">
            <div className="ly-callout ly-callout--peach">
              <p className="ly-callout__quote">
                We turn uncertainty into clarity and&nbsp;possibility.
              </p>
              <p className="ly-callout__body">
                We create the conditions for good design to&nbsp;thrive.
              </p>
            </div>
            <Placeholder shape="square" />
          </div>
        </section>

        <Banner num="L06" name="Full-bleed landscape · Text beneath" />
        <section className="ly-section ly-section--bleed">
          <div className="ly-fullbleed">
            <Placeholder shape="fullbleed" />
          </div>
          <div className="ly-container ly-hero ly-hero--after-bleed">
            <h2 className="ly-h2">Great design is built on great collaboration.</h2>
            <p className="ly-body ly-body--wide">
              Participatory design is our default. We invite people to walk through the work with
              us, so the outcome is something we all own.
            </p>
          </div>
        </section>

        <Banner num="L07" name="Text left · Media triptych" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--tri">
            <div className="ly-text">
              <h2 className="ly-h2">Design succeeds when culture, leadership and systems align.</h2>
              <p className="ly-body">
                It fails when purpose is unclear or process becomes theatre. The work of design is
                as much about the conditions as the output.
              </p>
            </div>
            <div className="ly-triptych">
              <Placeholder shape="square" tone="soft" />
              <Placeholder shape="square" tone="soft" />
              <Placeholder shape="square" tone="soft" />
            </div>
          </div>
        </section>

        <Banner num="L08" name="Statement · Portrait inset" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--inset">
            <div className="ly-text">
              <h2 className="ly-display ly-display--sm">Good design earns&nbsp;trust.</h2>
              <p className="ly-body">
                Services succeed when people believe in them. Not because they're polished, but
                because they earn it, moment by moment.
              </p>
            </div>
            <div className="ly-inset">
              <Placeholder shape="portrait" />
            </div>
          </div>
        </section>

        <Banner num="L09" name="Overlay card on media" />
        <section className="ly-section">
          <div className="ly-container ly-overlay">
            <Placeholder shape="landscape-wide" />
            <div className="ly-overlay__card">
              <h2 className="ly-h2">Great design turns complex problems into simple outcomes.</h2>
              <p className="ly-body">
                Evidence, imagination and real voices working together. Small compromises
                compound; small clarities do too.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L10" name="Centered prose · Landscape media" />
        <section className="ly-section">
          <div className="ly-container ly-prose">
            <h2 className="ly-h2 ly-h2--centered">Design with people, not for&nbsp;them.</h2>
            <p className="ly-body ly-body--centered">
              Participation surfaces hidden groups, embeds insight, and builds capability that
              lasts long after the project has finished.
            </p>
            <Placeholder shape="landscape" />
          </div>
        </section>

        <Banner num="L11" name="Text · Portrait media (compact)" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--tr">
            <div className="ly-text">
              <h2 className="ly-h2">How we work: people, place, systems and&nbsp;context.</h2>
              <p className="ly-body">
                We look beyond the visible product or service to the people using it and delivering it.
                That fuller picture is where good design begins.
              </p>
            </div>
            <Placeholder shape="portrait" />
          </div>
        </section>

        <Banner num="L12" name="Contrast pair · Twin landscape" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro">Two failure modes, one root cause.</h2>
            <p className="ly-body ly-body--intro">
              Services fail people when systems come first. Design fails services when it becomes
              theatre. Both begin the same way — losing sight of who this is for.
            </p>
            <div className="ly-contrast">
              <Placeholder shape="landscape" />
              <Placeholder shape="landscape" />
            </div>
          </div>
        </section>

        <Banner num="L13" name="Three-part triptych (labelled)" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro">Three parts of the same practice.</h2>
            <p className="ly-body ly-body--intro">
              Head frames the problem. Heart holds onto the people in it. Hands make it real.
            </p>
            <div className="ly-triptych ly-triptych--labelled">
              {['Head', 'Heart', 'Hands'].map((title) => (
                <div key={title} className="ly-triptych__cell">
                  <span className="ly-h3">{title}</span>
                  <Placeholder shape="square" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner num="L14" name="Numbered process (4 steps)" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro">How trust is earned.</h2>
            <p className="ly-body ly-body--intro">
              Four things good services do, consistently. Miss one and belief erodes; hold all four
              and it compounds.
            </p>
            <ol className="ly-steps">
              {[
                { n: '1', title: 'Address real problems' },
                { n: '2', title: 'Reduce waste' },
                { n: '3', title: 'Build confidence' },
                { n: '4', title: 'Keep learning' },
              ].map((s) => (
                <li key={s.n} className="ly-steps__item">
                  <span className="ly-steps__num">{s.n}</span>
                  <span className="ly-steps__title">{s.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Banner num="L15" name="Six-cell specimen grid" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro">The disciplines under our T.</h2>
            <p className="ly-body ly-body--intro">
              Six specialisms our team brings to complex problems. Each one is a depth; together
              they are our breadth.
            </p>
            <div className="ly-specimen">
              {[
                'Research',
                'Service design',
                'Interaction',
                'Systems thinking',
                'Policy design',
                'Content design',
              ].map((label) => (
                <div key={label} className="ly-specimen__cell">
                  <Placeholder shape="square" />
                  <span className="ly-h3">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner num="L16" name="Callout plane · Portrait media" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--pq">
            <div className="ly-callout ly-callout--peach">
              <p className="ly-callout__quote">
                Design succeeds when leadership, culture and systems align.
              </p>
              <p className="ly-callout__body">
                It stalls when any of those three drifts out of tune with the others.
              </p>
            </div>
            <Placeholder shape="portrait" />
          </div>
        </section>

        <Banner num="L17" name="Centered intro · Landscape wide" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro ly-h2--centered">A single frame, three overlaps.</h2>
            <p className="ly-body ly-body--intro ly-body--centered">
              Where evidence, imagination and lived experience overlap is where great design lives.
              The diagram makes the overlap visible.
            </p>
            <Placeholder shape="landscape-wide" />
          </div>
        </section>

        <Banner num="L18" name="Timeline sequence (4 markers)" />
        <section className="ly-section">
          <div className="ly-container">
            <h2 className="ly-h2 ly-h2--intro">How participation unfolds.</h2>
            <p className="ly-body ly-body--intro">
              Four moments where participants shape the outcome. The line is never linear, but
              always visible.
            </p>
            <div className="ly-timeline">
              {[
                { n: '01', title: 'Invite' },
                { n: '02', title: 'Walk through' },
                { n: '03', title: 'Prototype' },
                { n: '04', title: 'Sustain' },
              ].map((step, i, arr) => (
                <div key={step.n} className="ly-timeline__step">
                  <div className="ly-timeline__marker">
                    <span className="ly-timeline__dot" aria-hidden="true" />
                    {i < arr.length - 1 && <span className="ly-timeline__line" aria-hidden="true" />}
                  </div>
                  <span className="ly-h3">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner num="L19" name="Detail · Portrait inset (right)" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--inset">
            <div className="ly-text">
              <h2 className="ly-h2">What clarity looks like in&nbsp;practice.</h2>
              <p className="ly-body">
                Turning uncertainty into clarity means naming the problem clearly, the constraints
                honestly, and the assumptions openly. That's what the north star asks of us daily.
              </p>
            </div>
            <div className="ly-inset">
              <Placeholder shape="portrait" />
            </div>
          </div>
        </section>

        <Banner num="L20" name="Landscape left · Text right (variant)" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--ml">
            <Placeholder shape="landscape" />
            <div className="ly-text">
              <h2 className="ly-h2">From concept to something you can&nbsp;use.</h2>
              <p className="ly-body">
                Hands means making the idea testable — a prototype, a walkthrough, a working
                version. It's how we learn where the concept holds and where it needs to bend.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L21" name="Asymmetric display · Side inset" />
        <section className="ly-section">
          <div className="ly-container ly-asymm">
            <h2 className="ly-h2 ly-display">
              Where evidence and imagination&nbsp;meet.
            </h2>
            <div className="ly-asymm__side">
              <p className="ly-body">
                Great design lives in the overlap of what we can measure, what we can imagine, and
                what people live through. The overlap is where useful ideas start.
              </p>
              <Placeholder shape="square" />
            </div>
          </div>
        </section>

        <Banner num="L22" name="Portrait left · Text right" />
        <section className="ly-section">
          <div className="ly-container ly-grid ly-grid--ml">
            <Placeholder shape="portrait" />
            <div className="ly-text">
              <h2 className="ly-h2">Shared language changes the work.</h2>
              <p className="ly-body">
                Design succeeds when people share a vocabulary for it. Clear terms and clear
                definitions turn every conversation into a step forward, not a translation problem.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L23" name="Image cover reveal · Boxed" />
        <section className="ly-section">
          <div className="ly-container">
            <ImageCoverRevealBoxed
              imageUrl="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&fit=crop"
              heading="Design lives in the overlap between evidence and imagination."
              bgColor="#FAF8F6"
              inkColor="#111"
              scrollContainer={scrollRef}
              height={520}
            />
            <div className="ly-prose">
              <h2 className="ly-h2 ly-h2--centered">A quiet moment for the whole&nbsp;picture.</h2>
              <p className="ly-body ly-body--centered">
                Every so often a chapter ends and the reader deserves space to catch up. This layout
                gives the last idea room to settle before the next one begins.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L24" name="Prose · Margin note (accent rule)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-note">
            <div className="ly-note__body">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems. We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
              <p className="ly-body">
                That means looking beyond the visible product or service — to the people using it, the people
                delivering it, and the wider environment it sits within.
              </p>
            </div>
            <aside className="ly-note__side">
              <span className="ly-note__label">In practice</span>
              We work in the open, with the people affected by the work.
            </aside>
          </div>
        </section>

        <Banner num="L25" name="Prose · Inline pull-highlight" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-prose-narrow">
            <p className="ly-body">
              Design at Transform is a practice, not a look. <mark className="ly-mark">We turn uncertainty into clarity and possibility.</mark>
              By understanding people, place and systems, we help teams make better collective decisions.
            </p>
            <p className="ly-body">
              We look beyond the visible product to the people using it, the people delivering it, and the
              wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L26" name="Two-column body · Accent rule" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-twocol">
            <div className="ly-twocol__col">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems.
              </p>
              <p className="ly-body">
                We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
            </div>
            <div className="ly-twocol__rule" aria-hidden="true" />
            <div className="ly-twocol__col">
              <p className="ly-body">
                That means looking beyond the visible product or service — to the people using it and the people
                delivering it.
              </p>
              <p className="ly-body">
                Our aim is to design outcomes that are meaningful, equitable and sustainable.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L27" name="Prose · Aside card (top-right)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-aside">
            <div className="ly-aside__body">
              <p className="ly-body">
                We expand understanding, surface lived experiences and make sense of complex problems.
                Evidence, empathy and iteration help teams make better collective decisions.
              </p>
              <p className="ly-body">
                That means looking beyond the visible product or service — to the people, the organisation,
                and the wider environment it sits within.
              </p>
            </div>
            <aside className="ly-aside__card">
              <span className="ly-aside__eyebrow">A note on scope</span>
              <p className="ly-aside__body-copy">
                We consider four layers: the user, the deliverer, the organisation, and the system around them.
              </p>
            </aside>
          </div>
        </section>

        <Banner num="L28" name="Prose · Definition strip" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-defn">
            <div className="ly-defn__strip">
              <span className="ly-defn__term">North star</span>
              <span className="ly-defn__glyph" aria-hidden="true">·</span>
              <span className="ly-defn__meaning">The purpose behind the practice — what the work is ultimately for.</span>
            </div>
            <p className="ly-body">
              Our role is to expand understanding, surface lived experiences and make sense of complex
              problems. We use evidence, empathy and iteration to help teams make better collective decisions.
            </p>
            <p className="ly-body">
              That means looking beyond the visible product or service — to the people using it, the people
              delivering it, and the wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L29" name="Prose · Stat trio (accent)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-stats">
            <div className="ly-stats__body">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems.
              </p>
              <p className="ly-body">
                Evidence, empathy and iteration are how we help teams make better collective decisions.
              </p>
            </div>
            <div className="ly-stats__grid">
              {[
                { n: '01', label: 'Evidence' },
                { n: '02', label: 'Empathy' },
                { n: '03', label: 'Iteration' },
              ].map((s) => (
                <div key={s.n} className="ly-stats__cell">
                  <span className="ly-stats__num">{s.n}</span>
                  <span className="ly-stats__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Banner num="L30" name="Prose · Numbered footnotes" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-foot">
            <div className="ly-foot__body">
              <p className="ly-body">
                Our role is to expand understanding<sup className="ly-sup">1</sup>, surface lived experiences
                and make sense of complex problems. We use evidence, empathy and iteration<sup className="ly-sup">2</sup>
                to help teams make better collective decisions.
              </p>
              <p className="ly-body">
                That means looking beyond the visible product or service<sup className="ly-sup">3</sup>.
              </p>
            </div>
            <ol className="ly-foot__notes">
              <li><span className="ly-foot__num">1</span><span>Understanding the people, the place, and the systems around them.</span></li>
              <li><span className="ly-foot__num">2</span><span>Small, honest tests. Learn, then adjust.</span></li>
              <li><span className="ly-foot__num">3</span><span>Users, deliverers, organisation, environment.</span></li>
            </ol>
          </div>
        </section>

        <Banner num="L31" name="Prose · Tinted panel (sand)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-panel ly-panel--sand">
              <span className="ly-panel__eyebrow">Our north star</span>
              <p className="ly-panel__body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems. We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
              <p className="ly-panel__body">
                Our aim is to design with purpose and create outcomes that are meaningful, equitable and
                sustainable.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L32" name="Prose · Boxout with corner tab" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-tabbed">
            <div className="ly-tabbed__body">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems. We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
              <p className="ly-body">
                Our aim is to design outcomes that are meaningful, equitable and sustainable.
              </p>
            </div>
            <div className="ly-tabbed__box">
              <span className="ly-tabbed__tab" aria-hidden="true" />
              <span className="ly-tabbed__label">Four layers</span>
              <ul className="ly-tabbed__list">
                <li>The people using it</li>
                <li>The people delivering it</li>
                <li>The organisation around it</li>
                <li>The wider environment</li>
              </ul>
            </div>
          </div>
        </section>

        <Banner num="L33" name="Prose · Accent rule + inline glyph" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-glyph">
            <div className="ly-glyph__badge" aria-hidden="true">
              <span className="ly-glyph__square" />
              <span className="ly-glyph__square ly-glyph__square--peach" />
              <span className="ly-glyph__square ly-glyph__square--blue" />
            </div>
            <div className="ly-glyph__body">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems. We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
              <p className="ly-body">
                That means looking beyond the visible product or service — to the people, the organisation,
                and the wider environment it sits within.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L34" name="16:9 image · Caption below" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <Media shape="16-9" seed="rsd-workshop" />
            <p className="ly-body ly-simple__caption">
              Our role is to expand understanding, surface lived experiences and make sense of complex
              problems. Evidence, empathy and iteration help teams make better collective decisions.
            </p>
          </div>
        </section>

        <Banner num="L35" name="Square image · Body right" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediarow ly-mediarow--sq">
            <Media shape="square" seed="rsd-sketch" />
            <div className="ly-mediarow__text">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex
                problems.
              </p>
              <p className="ly-body">
                We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L36" name="16:9 image · Offset plane (blue, top-left)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--tl ly-layered--blue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-collab" />
            </div>
            <p className="ly-body ly-simple__caption">
              We look beyond the visible product to the people using it, the people delivering it, and the
              wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L37" name="Twin squares · Body above" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediaset">
            <p className="ly-body ly-mediaset__caption">
              Our aim is to design outcomes that are meaningful, equitable and sustainable — for the people
              using the service, and the people delivering it.
            </p>
            <div className="ly-twinsq">
              <Media shape="square" seed="rsd-notes" />
              <Media shape="square" seed="rsd-team" />
            </div>
          </div>
        </section>

        <Banner num="L38" name="16:9 image · Yellow boxout beside" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediarow ly-mediarow--wide">
            <Media shape="16-9" seed="rsd-studio" />
            <div className="ly-boxout ly-boxout--yellow">
              <span className="ly-boxout__label">Our north star</span>
              <p className="ly-boxout__body">
                Design with purpose. Create outcomes that are meaningful, equitable and sustainable.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L39" name="16:9 image · Terracotta boxout below" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <Media shape="16-9" seed="rsd-whiteboard" />
            <div className="ly-boxout ly-boxout--terracotta">
              <span className="ly-boxout__label">In practice</span>
              <p className="ly-boxout__body">
                We consider four layers — the people using it, the people delivering it, the organisation
                around it, and the wider environment it sits within.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L40" name="Square image · Offset plane (yellow, top-left)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple ly-simple--narrow">
            <div className="ly-layered ly-layered--tl ly-layered--yellow">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="square" seed="rsd-post-its" />
            </div>
            <p className="ly-body ly-simple__caption">
              Our role is to expand understanding, surface lived experiences and make sense of complex problems.
            </p>
          </div>
        </section>

        <Banner num="L41" name="16:9 image · Offset plane (terracotta, bottom-right)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--br ly-layered--terracotta">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-desk" />
            </div>
            <p className="ly-body ly-simple__caption">
              Evidence, empathy and iteration help teams make better collective decisions.
            </p>
          </div>
        </section>

        <Banner num="L42" name="Portrait image · Offset plane (warm grey) · Body right" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediarow ly-mediarow--portrait">
            <div className="ly-layered ly-layered--tl ly-layered--warmgrey">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="portrait" seed="rsd-portrait" />
            </div>
            <div className="ly-mediarow__text">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex problems.
              </p>
              <p className="ly-body">
                We use evidence, empathy and iteration to help teams make better collective decisions.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L43" name="Twin 16:9 · Alternating planes (blue TL / terracotta BR)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediaset">
            <div className="ly-twin169">
              <div className="ly-layered ly-layered--tl ly-layered--blue">
                <span className="ly-layered__plane" aria-hidden="true" />
                <Media shape="16-9" seed="rsd-pair-a" />
              </div>
              <div className="ly-layered ly-layered--br ly-layered--terracotta">
                <span className="ly-layered__plane" aria-hidden="true" />
                <Media shape="16-9" seed="rsd-pair-b" />
              </div>
            </div>
            <p className="ly-body ly-mediaset__caption">
              That means looking beyond the visible product — to the people using it, the people delivering
              it, and the wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L44" name="16:9 image · Double offset planes (yellow + blue)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--tl ly-layered--yellow">
              <span className="ly-layered__plane" aria-hidden="true" />
              <span className="ly-layered__plane ly-layered__plane--blue ly-layered__plane--br" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-double" />
            </div>
            <p className="ly-body ly-simple__caption">
              Our aim is to design with purpose and create outcomes that are meaningful, equitable and sustainable.
            </p>
          </div>
        </section>

        <Banner num="L45" name="Body left · Square image + plane (pale blue, bottom-right)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-mediarow ly-mediarow--flip">
            <div className="ly-mediarow__text">
              <p className="ly-body">
                Our role is to expand understanding, surface lived experiences and make sense of complex problems.
              </p>
              <p className="ly-body">
                That means looking beyond the visible product or service — to the people, the organisation,
                and the wider environment it sits within.
              </p>
            </div>
            <div className="ly-layered ly-layered--br ly-layered--paleblue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="square" seed="rsd-flip" />
            </div>
          </div>
        </section>

        <Banner num="L46" name="Cinematic 21:9 · Terracotta plane (bottom-right)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--br ly-layered--terracotta">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="21-9" seed="rsd-cinema" />
            </div>
            <p className="ly-body ly-simple__caption">
              We look beyond the visible product or service — to the people using it, the people delivering
              it, the organisation around it, and the wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L47" name="Portrait + Square · Asymmetric pair (mixed planes)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-asympair">
            <div className="ly-layered ly-layered--tl ly-layered--blue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="portrait-tall" seed="rsd-tall" />
            </div>
            <div className="ly-asympair__side">
              <div className="ly-layered ly-layered--br ly-layered--yellow">
                <span className="ly-layered__plane" aria-hidden="true" />
                <Media shape="square" seed="rsd-companion" />
              </div>
              <p className="ly-body">
                Our aim is to design outcomes that are meaningful, equitable and sustainable.
              </p>
            </div>
          </div>
        </section>

        <Banner num="L49" name="Landscape 3:2 · Diagonal double plane (blue TL + yellow BR)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--tl ly-layered--blue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <span className="ly-layered__plane ly-layered__plane--yellow ly-layered__plane--br" aria-hidden="true" />
              <Media shape="landscape" seed="rsd-diagonal" />
            </div>
            <p className="ly-body ly-simple__caption">
              That means looking beyond the visible product or service — to the people, the organisation,
              and the wider environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L50" name="Square image · Rotated plane (pinned feel)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple ly-simple--narrow">
            <div className="ly-layered ly-layered--tl ly-layered--yellow ly-layered--rotate">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="square" seed="rsd-pinned" />
            </div>
            <p className="ly-body ly-simple__caption">
              Our role is to expand understanding, surface lived experiences and make sense of complex problems.
            </p>
          </div>
        </section>

        <Banner num="L51" name="Portrait image · Plane extends below as caption block" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple ly-simple--narrow">
            <div className="ly-caption-plane ly-caption-plane--terracotta">
              <Media shape="portrait" seed="rsd-caption" />
              <div className="ly-caption-plane__foot">
                <span className="ly-caption-plane__label">Our north star</span>
                <p className="ly-caption-plane__text">
                  Design with purpose. Create outcomes that are meaningful, equitable and sustainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Banner num="L52" name="16:9 image · Horizontal ribbon (extends sideways)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--ribbon ly-layered--blue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-ribbon" />
            </div>
            <p className="ly-body ly-simple__caption">
              Evidence, empathy and iteration help teams make better collective decisions.
            </p>
          </div>
        </section>

        <Banner num="L53" name="Overlapping image pair (portrait + landscape)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-overlap-pair">
            <div className="ly-overlap-pair__a">
              <Media shape="portrait" seed="rsd-ovl-a" />
            </div>
            <div className="ly-overlap-pair__b">
              <Media shape="landscape" seed="rsd-ovl-b" />
            </div>
            <p className="ly-body ly-overlap-pair__caption">
              Our role is to expand understanding, surface lived experiences and make sense of complex problems.
            </p>
          </div>
        </section>

        <Banner num="L54" name="Square image · Circular plane behind (terracotta)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple ly-simple--narrow">
            <div className="ly-layered ly-layered--circleplane ly-layered--terracotta">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="square" seed="rsd-circle-bg" />
            </div>
            <p className="ly-body ly-simple__caption">
              That means looking beyond the visible product or service — to the people using it and the wider
              environment it sits within.
            </p>
          </div>
        </section>

        <Banner num="L55" name="21:9 landscape · Small square inset overlapping" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-nest">
            <Media shape="21-9" seed="rsd-nest-big" />
            <div className="ly-nest__inset">
              <div className="ly-layered ly-layered--br ly-layered--yellow">
                <span className="ly-layered__plane" aria-hidden="true" />
                <Media shape="square" seed="rsd-nest-small" />
              </div>
            </div>
            <p className="ly-body ly-nest__caption">
              We use evidence, empathy and iteration to help teams make better collective decisions.
            </p>
          </div>
        </section>

        <Banner num="L56" name="16:9 image · Split-colour diagonal plane" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-simple">
            <div className="ly-layered ly-layered--tl ly-layered--split">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-split" />
            </div>
            <p className="ly-body ly-simple__caption">
              Our aim is to design with purpose and create outcomes that are meaningful, equitable and sustainable.
            </p>
          </div>
        </section>

        <Banner num="L57" name="Filmstrip · Three landscapes on a shared plane" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-filmstrip ly-filmstrip--paleblue">
              <span className="ly-filmstrip__plane" aria-hidden="true" />
              <div className="ly-filmstrip__cells">
                <Media shape="landscape" seed="rsd-film-a" />
                <Media shape="landscape" seed="rsd-film-b" />
                <Media shape="landscape" seed="rsd-film-c" />
              </div>
            </div>
            <p className="ly-body ly-filmstrip__caption">
              Our role is to expand understanding, surface lived experiences and make sense of complex problems.
            </p>
          </div>
        </section>

        <Banner num="L58" name="Oversized speech mark · Adjacent quote (terracotta)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-qblock">
            <span className="ly-qblock__mark ly-qblock__mark--terracotta" aria-hidden="true">&ldquo;</span>
            <div className="ly-qblock__body">
              <p className="ly-qblock__text">
                We turn uncertainty into clarity and&nbsp;possibility.
              </p>
              <span className="ly-qblock__attribution">Our north star</span>
            </div>
          </div>
        </section>

        <Banner num="L59" name="Bookended speech marks (open + close, blue)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-bookend">
            <span className="ly-bookend__open" aria-hidden="true">&ldquo;</span>
            <p className="ly-bookend__text">
              We turn uncertainty into clarity and&nbsp;possibility.
            </p>
            <span className="ly-bookend__close" aria-hidden="true">&rdquo;</span>
          </div>
        </section>

        <Banner num="L60" name="Faint mega speech mark backdrop · Quote on top" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-qbg">
              <span className="ly-qbg__mark" aria-hidden="true">&ldquo;</span>
              <p className="ly-qbg__text">
                Design at Transform is a practice, not a&nbsp;look.
              </p>
              <span className="ly-qbg__attribution">Our practice</span>
            </div>
          </div>
        </section>

        <Banner num="L61" name="Multi-line stacked display · Accent emphasis" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-stacked">
            <p>We turn</p>
            <p>uncertainty</p>
            <p>into <em>clarity</em>.</p>
            <span className="ly-stacked__attribution">Our north star</span>
          </div>
        </section>

        <Banner num="L62" name="Quote card · Yellow plane with speech-mark corner" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container">
            <div className="ly-qcard ly-qcard--yellow">
              <span className="ly-qcard__mark" aria-hidden="true">&ldquo;</span>
              <p className="ly-qcard__text">
                Great design turns complex problems into simple outcomes for people, organisations and the
                long&nbsp;term.
              </p>
              <span className="ly-qcard__attribution">The craft</span>
            </div>
          </div>
        </section>

        <Banner num="L63" name="Twin quotes · Compare/contrast (blue + terracotta)" />
        <section className="ly-section ly-section--sm">
          <div className="ly-container ly-twoq">
            <blockquote className="ly-twoq__cell">
              <span className="ly-twoq__mark" aria-hidden="true">&ldquo;</span>
              <p className="ly-twoq__text">
                Design at Transform is a practice, not a look.
              </p>
              <span className="ly-twoq__attribution">Our practice</span>
            </blockquote>
            <blockquote className="ly-twoq__cell">
              <span className="ly-twoq__mark" aria-hidden="true">&ldquo;</span>
              <p className="ly-twoq__text">
                We turn uncertainty into clarity and possibility.
              </p>
              <span className="ly-twoq__attribution">Our north star</span>
            </blockquote>
          </div>
        </section>

      </div>
    </motion.div>
  )
}

function Banner({ num, name }: { num: string; name: string }) {
  return (
    <div className="ly-banner">
      <div className="ly-container ly-banner__inner">
        <span className="ly-banner__num">{num}</span>
        <span className="ly-banner__name">{name}</span>
      </div>
    </div>
  )
}

type CtaVariant = 'offset' | 'framed' | 'pinned' | 'brackets' | 'pill'

function CtaCard({ variant }: { variant: CtaVariant }) {
  return (
    <div className={`ly-ctacard ly-ctacard--${variant}`}>
      <div className="ly-ctacard__inner">
        <div className="ly-ctacard__image">
          <img
            src="/photos/journey-map-group.jpg"
            alt=""
            loading="lazy"
          />
        </div>
        <p className="ly-ctacard__desc">
          A short introduction to how we work at Transform.
        </p>
        <a className="ly-ctacard__button" href="#">
          Explore <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

function Placeholder({ shape, tone = 'default' }: { shape: Shape; tone?: 'default' | 'soft' }) {
  return <div className={`ly-placeholder ly-placeholder--${shape} ly-placeholder--${tone}`} aria-hidden="true" />
}

export type MediaShape = '16-9' | '21-9' | 'square' | 'landscape' | 'portrait' | 'portrait-tall' | 'circle'

const SHAPE_DIMS: Record<MediaShape, [number, number]> = {
  '16-9': [1600, 900],
  '21-9': [2100, 900],
  square: [900, 900],
  landscape: [1200, 800],
  portrait: [800, 1000],
  'portrait-tall': [800, 1200],
  circle: [900, 900],
}

/**
 * Image slot with a fixed aspect shape. If `src` is passed, uses that
 * (with `alt` for accessibility); otherwise falls back to a deterministic
 * picsum.photos URL keyed by `seed`.
 * `bare` skips the wrapper so it can sit inside an existing layered/aspect box.
 */
export function Media({
  shape,
  seed,
  src,
  alt = '',
  bare = false,
}: {
  shape: MediaShape
  seed?: string
  src?: string
  alt?: string
  bare?: boolean
}) {
  const [w, h] = SHAPE_DIMS[shape]
  const resolvedSrc = src ?? `https://picsum.photos/seed/${seed ?? 'placeholder'}/${w}/${h}`
  const img = <img src={resolvedSrc} alt={alt} className="ly-media__img" loading="lazy" />
  if (bare) return img
  return <div className={`ly-media ly-media--${shape}`}>{img}</div>
}
