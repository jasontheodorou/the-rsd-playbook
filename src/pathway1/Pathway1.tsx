import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'framer-motion'
import { PILOT_PAGES, PILOT_CHAPTERS, chapterIndexForPage } from './pages'
import { Media } from '../pages/Layouts'
import '../pages/Layouts.css'
import './Pathway1.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Pathway1 — the foundations module as a click-through of vertical pages.
 * Mounted inside the RSD Playbook shell, so it doesn't render its own home
 * affordance — the persistent TopBar owns wordmark + navigation.
 */
export function Pathway1({ onReturnHome }: { onReturnHome: () => void }) {
  const [index, setIndex] = useState(0)
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const page = PILOT_PAGES[index]
  const isLast = index === PILOT_PAGES.length - 1
  const activeChapter = chapterIndexForPage(index)

  // Drives the vertical bar — grows top-to-bottom as the current page scrolls.
  const { scrollYProgress } = useScroll({ container: scrollRef })

  const advance = () => {
    if (isLast) return onReturnHome()
    setIndex((i) => Math.min(PILOT_PAGES.length - 1, i + 1))
  }

  const jumpToChapter = (chapterIdx: number) => {
    setIndex(PILOT_CHAPTERS[chapterIdx].startIndex)
    setChaptersOpen(false)
  }

  const resetScroll = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  useEffect(() => {
    resetScroll()
  }, [index])

  useEffect(() => {
    if (!chaptersOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChaptersOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chaptersOpen])

  const accent = page.accent ?? '#D8B4A3'
  const accentHover = page.accentHover ?? '#C69A87'
  const accentTrack = page.accentTrack ?? 'rgba(216, 180, 163, 0.28)'

  // Unified background across all chapters. Warm off-white that reads
  // as one paper stock through the whole pathway (also used behind the
  // Welcome video's text card).
  const bg = '#FCFBF8'

  return (
    <motion.div
      className="pilot-root"
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: 'calc(50% - 190px) 50%',
        ['--pilot-accent' as string]: accent,
        ['--pilot-accent-hover' as string]: accentHover,
        ['--pilot-accent-track' as string]: accentTrack,
        background: bg,
      } as React.CSSProperties}
    >
      {/* Full-bleed background video (welcome page only) — sits at root
          level so it extends behind the rail and hamburger. */}
      {page.video && (
        <>
          <video
            key={`bg-${page.id}`}
            className="pilot-bg-video"
            src={page.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="pilot-bg-scrim" aria-hidden="true" />
        </>
      )}

      {/* Chapter hamburger — small orange square on the left edge. */}
      <button
        type="button"
        className="pilot-hamburger"
        aria-label={chaptersOpen ? 'Close chapters' : 'Open chapters'}
        aria-expanded={chaptersOpen}
        onClick={() => setChaptersOpen((v) => !v)}
      >
        <span className="pilot-hamburger__lines" data-open={chaptersOpen ? 'true' : 'false'} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {chaptersOpen && (
          <>
            <motion.div
              key="scrim"
              className="pilot-chapscrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setChaptersOpen(false)}
            />
            <motion.aside
              key="panel"
              className="pilot-chappanel"
              role="dialog"
              aria-label="Chapters"
              initial={reduce ? { opacity: 0 } : { x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: -32, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.65, 0, 0.45, 1] }}
            >
              <div className="pilot-chappanel__label">Chapters</div>
              <ol className="pilot-chappanel__list">
                {PILOT_CHAPTERS.map((chapter, i) => {
                  const isCurrent = i === activeChapter
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        className="pilot-chappanel__item"
                        aria-current={isCurrent}
                        onClick={() => jumpToChapter(i)}
                      >
                        <span className="pilot-chappanel__num">{chapter.num}</span>
                        <span className="pilot-chappanel__name">{chapter.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Left rail — progress bar on the left, hairline divider on the right. */}
      <div className="pilot-rail" aria-hidden="true">
        <div className="pilot-vribbon">
          <motion.div
            className="pilot-vribbon__fill"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />
        </div>
      </div>

      <div ref={scrollRef} className="pilot-scroll">
        <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
          <motion.article
            key={page.id}
            className={page.video ? 'pilot-page--video' : 'p1v2'}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.45, 1] }}
          >
            {page.video ? (
              <div className="pilot-page__card">
                <span className="pilot-marker">
                  <span className="pilot-marker__num">{page.num}</span>
                  <span className="pilot-marker__rule" aria-hidden="true" />
                  <span>{page.section}</span>
                </span>
                <h1 className="pilot-page__headline">{page.headline}</h1>
                <p className="pilot-page__lede">{page.body[0]}</p>
                <p className="pilot-page__lede">{page.body[1]}</p>
                <button type="button" className="pilot-next" onClick={advance}>
                  <span className="pilot-next__label">
                    {isLast ? 'Finish' : 'Continue'}
                  </span>
                  <span className="pilot-next__meta">
                    {isLast ? 'Return home' : `Next · ${PILOT_PAGES[index + 1].section}`}
                  </span>
                  <span className="pilot-next__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <V2Page page={page} isLast={isLast} nextSection={PILOT_PAGES[index + 1]?.section} onAdvance={advance} />
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Body pages — twelve vertical pages (s2 … s13) using the p1v2
// layout-and-spacing grammar. `V2Shell` supplies the common hero +
// closing chrome; `V2Page` dispatches to a per-page body component.
// ─────────────────────────────────────────────────────────────────────

type V2Props = {
  page: (typeof PILOT_PAGES)[number]
  isLast: boolean
  nextSection?: string
  onAdvance: () => void
}

function V2Shell({
  page,
  isLast,
  nextSection,
  onAdvance,
  tightSrc,
  widestBodyIs = 'photo',
  children,
}: V2Props & {
  tightSrc?: string
  widestBodyIs?: 'photo' | 'panel'
  children: React.ReactNode
}) {
  return (
    <>
      <section className="p1v2__hero">
        <div className="p1v2__hero-text">
          <span className="pilot-marker p1v2__marker">
            <span className="pilot-marker__num">{page.num}</span>
            <span className="pilot-marker__rule" aria-hidden="true" />
            <span>{page.section}</span>
          </span>
          <h1 className="p1v2__headline">{page.headline}</h1>
          <p className="p1v2__lede">{page.body[0]}</p>
          <p className="p1v2__lede">{page.body[1]}</p>
        </div>
        <div className="p1v2__hero-art">
          <picture>
            {tightSrc && <source media="(max-width: 56.25rem)" srcSet={tightSrc} />}
            <img src={page.image} alt="" />
          </picture>
        </div>
      </section>

      <div className="p1v2__body">{children}</div>

      <footer className={`p1v2__foot${widestBodyIs === 'panel' ? ' p1v2__foot--no-photo' : ''}`}>
        <button type="button" className="pilot-next p1v2__next" onClick={onAdvance}>
          <span className="pilot-next__label">{isLast ? 'Finish' : 'Continue'}</span>
          <span className="pilot-next__meta">
            {isLast ? 'Return home' : `Next · ${nextSection ?? ''}`}
          </span>
          <span className="pilot-next__arrow" aria-hidden="true">→</span>
        </button>
      </footer>
    </>
  )
}

/** Dispatcher: picks the correct per-page body component. */
function V2Page(props: V2Props) {
  switch (props.page.id) {
    case 's2-north-star':          return <V2s2  {...props} />
    case 's3-good-design-matters': return <V2s3  {...props} />
    case 's4-design-wrong':        return <V2s4  {...props} />
    case 's5-services-wrong':      return <V2s5  {...props} />
    case 's6-enabling':            return <V2s6  {...props} />
    case 's7-connective':          return <V2s7  {...props} />
    case 's8-tshaped':             return <V2s8  {...props} />
    case 's9-hhh-framework':       return <V2s9  {...props} />
    case 's10-head':               return <V2s10 {...props} />
    case 's11-heart':              return <V2s11 {...props} />
    case 's12-hands':              return <V2s12 {...props} />
    case 's13-participation':      return <V2s13 {...props} />
    default: return null
  }
}

// ─────────────────────────────────────────────────────────────────────
// Per-page body components. Structure per original topology.
// ─────────────────────────────────────────────────────────────────────

function V2s2(p: V2Props) {
  const items = [
    'Expand understanding — surface lived experiences, systemic dynamics and unintended consequences.',
    'Enable sensemaking — use visualisation, prototyping and collaborative tools to help people hold more information and perspectives at once.',
    'Reframe problems — open up different interpretations and unlock new solutions.',
    'Design responsibly — ground our practice in rigour, ethics and transparency.',
    'Build trust and accountability — balance participatory and iterative approaches with clarity, scrutiny and traceability.',
  ]
  return (
    <V2Shell {...p} tightSrc="/illustrations/makepossiblereal-tight.svg" widestBodyIs="panel">
      <p className="p1v2__prose">
        Our purpose is to enable better, collective decisions through deep understanding of people,
        place, systems and contexts — creating environments for design to thrive.
      </p>
      <p className="p1v2__prose">
        Through evidence, empathy and iteration, we design with purpose. The aim is to deliver
        real-world outcomes that are meaningful, equitable and sustainable.
      </p>
      <p className="p1v2__prose">
        That means going beyond the visible product or service. We look at lived experience,
        systemic dynamics and the unintended consequences that more traditional approaches can
        overlook.
      </p>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Our role is to</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
      <p className="p1v2__prose">
        Design thrives through skilled people, but also through supportive organisational
        environments, leadership and culture. We need to shape the conditions for good design, as
        well as the capability to deliver it.
      </p>
    </V2Shell>
  )
}

function V2s3(p: V2Props) {
  const items = [
    'Improve effectiveness by addressing root causes.',
    'Enhance efficiency and reduce waste by removing duplication, simplifying interactions and preventing failure demand.',
    'Build trust and legitimacy by making services clear, fair and easy to use.',
    'Strengthen organisational learning and adaptability through feedback and iteration.',
    "Enable prevention and long-term value, rather than simply fixing today’s problems.",
    'Cultivate collaboration and systemic change across professions, agencies and communities.',
  ]
  return (
    <V2Shell {...p} tightSrc="/illustrations/gooddesignearnstrust-tight.svg" widestBodyIs="photo">
      <p className="p1v2__prose">
        Researchers and designers act as a bridge between citizens and institutions. Done well,
        human-centred design builds trust in the final service as something created with people,
        not to them.
      </p>
      <div className="p1v2__media">
        <img
          src="https://picsum.photos/seed/rsd-p3-bridge/1600/900"
          alt="A researcher and designer working alongside the people a service is meant to reach"
          loading="lazy"
        />
      </div>
      <p className="p1v2__prose">
        Well-designed services solve real problems, not symptoms. They are built on insight and
        evidence, increasing the likelihood that what we create actually addresses people&rsquo;s needs.
      </p>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Good design can</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
    </V2Shell>
  )
}

function V2s4(p: V2Props) {
  return (
    <V2Shell {...p} tightSrc="/illustrations/whenserviceslosepeople-tight.svg" widestBodyIs="panel">
      <p className="p1v2__prose">But human-centred design can get things wrong too.</p>
      <p className="p1v2__prose">
        Ambiguity about what &ldquo;design&rdquo; means creates misalignment and superficial
        practice. Endless research and design loops without delivery create scepticism. And teams
        can copy the rituals of design — Post-its, workshops and prototypes — without the
        underlying purpose or discipline.
      </p>
      <blockquote className="p1v2__pullquote">
        <span className="p1v2__pullquote-mark" aria-hidden="true">&ldquo;</span>
        <p className="p1v2__pullquote-text">
          Good design needs contextual grounding, clarity and delivered outcomes. It is substance
          over theatre.
        </p>
      </blockquote>
    </V2Shell>
  )
}

function V2s5(p: V2Props) {
  return (
    <V2Shell {...p} widestBodyIs="panel">
      <p className="p1v2__prose">
        When human-centred design is absent, services tend to be designed around systems and
        organisational constraints rather than people and the complexities of real life.
      </p>
      <p className="p1v2__prose">
        Design becomes peripheral. Fixed and compliance-driven mindsets dominate, and continuous
        learning disappears from the development process.
      </p>
    </V2Shell>
  )
}

function V2s6(p: V2Props) {
  const items = [
    'Embed design into the DNA — a culture where experimentation, learning and human-centred decisions are encouraged.',
    'Enable systems thinking and cross-boundary collaboration — multidisciplinary teams empowered to co-own outcomes.',
    'Create clear definitions and shared language — a common understanding of what design is and what it is for.',
    'Provide structures, resources and mandates that support design — shared standards, frameworks, skills and continuous evaluation.',
  ]
  return (
    <V2Shell {...p} widestBodyIs="photo">
      <p className="p1v2__prose">Design cannot succeed in a vacuum.</p>
      <p className="p1v2__prose">
        Good design listens deeply, tests ideas with real people and builds empathy into every
        level of decision-making.
      </p>
      <p className="p1v2__prose">
        For design to thrive, it needs to be embedded into the DNA of an organisation. Leadership
        and culture need to value experimentation, learning and human-centred decision-making,
        rather than treating design as something peripheral to delivery.
      </p>
      <div className="p1v2__paired">
        <div className="ly-asympair">
          <div className="ly-layered ly-layered--tl ly-layered--blue">
            <span className="ly-layered__plane" aria-hidden="true" />
            <Media shape="portrait-tall" seed="rsd-p6-dna" />
          </div>
          <div className="ly-asympair__side">
            <div className="ly-layered ly-layered--br ly-layered--yellow">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="square" seed="rsd-p6-culture" />
            </div>
          </div>
        </div>
      </div>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Four important conditions</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
    </V2Shell>
  )
}

function V2s7(p: V2Props) {
  return (
    <V2Shell {...p} tightSrc="/illustrations/designisconnectivecreativity-tight.svg" widestBodyIs="panel">
      <p className="p1v2__prose">
        At Transform, we describe the role of design as connective creativity.
      </p>
      <blockquote className="p1v2__pullquote">
        <span className="p1v2__pullquote-mark" aria-hidden="true">&ldquo;</span>
        <p className="p1v2__pullquote-text">
          Great design is about making sense of complex problems and creating solutions that are
          desirable, feasible, viable and sustainable.
        </p>
      </blockquote>
      <p className="p1v2__prose">
        Researchers and designers bridge these different elements. Through creativity, robust
        evidence and the participation of users, business owners, managers, frontline staff and
        industry experts, our work can deliver project objectives, de-risk implementation, build
        legitimacy and create value.
      </p>
    </V2Shell>
  )
}

function V2s8(p: V2Props) {
  const items = [
    'Human insight',
    'Data and statistical analysis',
    'Behavioural science',
    'Systems thinking',
    'Experimentation & prototyping',
    'Policy design',
    'Service design',
    'Strategic design',
    'Organisational design',
    'Interaction design',
    'Innovation',
  ]
  return (
    <V2Shell {...p} widestBodyIs="photo">
      <p className="p1v2__prose">
        It takes highly skilled, empathetic researchers, creative experimenters, strategic
        collaborators and ethical stewards of change.
      </p>
      <p className="p1v2__prose">
        Our researchers&rsquo; and designers&rsquo; expertise is built not just on what they
        design, but on how they enable others to see, understand and adapt to the needs of those
        who experience their products and services.
      </p>
      <p className="p1v2__prose">
        We think of these people as T-shaped specialists. They bring deep disciplinary expertise,
        while also being able to work across a wider set of human-centred transformation skills.
      </p>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Skills across the practice</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
      <div className="p1v2__paired">
        <div className="ly-avatarrow">
          <div className="ly-layered ly-layered--br ly-layered--warmgrey ly-avatarrow__avatar">
            <span className="ly-layered__plane" aria-hidden="true" />
            <Media shape="circle" seed="rsd-p8-face" />
          </div>
          <div className="ly-avatarrow__context">
            <div className="ly-layered ly-layered--tl ly-layered--paleblue">
              <span className="ly-layered__plane" aria-hidden="true" />
              <Media shape="16-9" seed="rsd-p8-context" />
            </div>
          </div>
        </div>
      </div>
      <p className="p1v2__prose">Different specialists contribute in different ways.</p>
      <p className="p1v2__prose">
        <strong>Researchers</strong> provide the foundation. They help us understand needs, wants,
        motivations, barriers and systems through the eyes of users. They frame problems, create
        hypotheses, test and evidence ideas before implementation.
      </p>
      <p className="p1v2__prose">
        <strong>Service designers</strong> are the bridge between research, UX, technology,
        operations, business and policy. They make visible how services function across the front
        and back stage, creating shared understanding.
      </p>
      <p className="p1v2__prose">
        <strong>UX and interaction designers</strong> make digital interactions clear, inclusive
        and evidence-driven, ensuring people can use products and services easily, safely and with
        confidence.
      </p>
      <p className="p1v2__prose">
        <strong>Content designers</strong> translate complexity into plain language and structure
        information so services are understandable, useful and accessible to all.
      </p>
      <p className="p1v2__prose">
        Designing best-in-class, future-facing products and services is a team sport. The value
        comes from bringing these capabilities together in collaborative, multidisciplinary teams.
      </p>
    </V2Shell>
  )
}

function V2s9(p: V2Props) {
  const triad: [string, string][] = [
    ['Head',  'is how we think and frame our work.'],
    ['Heart', 'is all the things we care about most.'],
    ['Hands', 'is how we deliver and get the job done.'],
  ]
  return (
    <V2Shell {...p} widestBodyIs="panel">
      <p className="p1v2__prose">
        We are passionate about building services that truly transform lives and make the world a
        better place through design.
      </p>
      <p className="p1v2__prose">
        That is captured in our research and design philosophy:{' '}
        <strong>Head, Heart, Hands.</strong>
      </p>
      <ul className="p1v2__triad">
        {triad.map(([term, def]) => (
          <li key={term}>
            <span className="p1v2__triad-term">{term}</span>
            <span className="p1v2__triad-def">{def}</span>
          </li>
        ))}
      </ul>
      <p className="p1v2__prose">
        Together, they help organisations establish cultures of expert and empathic
        problem-solving.
      </p>
    </V2Shell>
  )
}

function V2s10(p: V2Props) {
  const items = [
    'Individual needs, capability, motivation and opportunity.',
    'The service context — barriers, technology and implementation.',
    'Organisational goals, commercial priorities, capability and culture.',
    'Community influence and relationships.',
    'The wider environmental context influencing adoption and scale.',
  ]
  return (
    <V2Shell {...p} tightSrc="/illustrations/turninguncertaintyintopossibility-tight.svg" widestBodyIs="photo">
      <p className="p1v2__prose">
        We use human-centred frameworks to shape how we think. Those who use, deliver and manage
        services do not exist in a vacuum, so we need to understand the wider factors that shape
        the success or failure of a service.
      </p>
      <p className="p1v2__prose">That means taking a whole-system view.</p>
      <div className="p1v2__cinema">
        <div className="ly-layered ly-layered--tl ly-layered--paleblue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="21-9" seed="rsd-p10-system" />
        </div>
      </div>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">We consider</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
      <p className="p1v2__prose">
        Understanding how a service exists within this ecosystem is essential when designing
        end-to-end and front-to-back services.
      </p>
    </V2Shell>
  )
}

function V2s11(p: V2Props) {
  const items = [
    'Solve the right problem — a product or service can only ever be as good as the understanding of the problem it addresses.',
    'Co-location underpins collaboration — when we’re together, we can design better, deliver quicker and adapt as new insight emerges.',
    'We’re human first — as technological and physical worlds converge, people must stay at the centre of our work.',
  ]
  return (
    <V2Shell {...p} tightSrc="/illustrations/gooddesignearnstrust-tight.svg" widestBodyIs="photo">
      <p className="p1v2__prose">
        Heart is the &ldquo;why&rdquo; behind what we do — the things that get us out of bed in
        the morning.
      </p>
      <p className="p1v2__prose">
        It comes down to making an impact: improving lives, supporting people and making the world
        better.
      </p>
      <p className="p1v2__prose">Our approach is built around three core principles.</p>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--br ly-layered--terracotta">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="16-9" seed="rsd-p11-heart" />
        </div>
      </div>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Three core principles</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
    </V2Shell>
  )
}

function V2s12(p: V2Props) {
  const items = [
    'Proof of concept — testing whether an idea can become a real service or product.',
    'Prototype — testing the broader end-to-end journey and simulating real interactions.',
    'Pilot — testing a feature-rich service in an environment that mirrors the real world, with clearly defined outcomes for evaluation.',
  ]
  return (
    <V2Shell {...p} tightSrc="/illustrations/makepossiblereal-tight.svg" widestBodyIs="photo">
      <p className="p1v2__prose">
        Working alongside colleagues, clients and partners, we incrementally turn ideas, service
        concepts and prototypes into real working services.
      </p>
      <p className="p1v2__prose">
        We focus relentlessly on the elements that deliver the greatest value. We test
        assumptions, learn and enhance designs throughout the process.
      </p>
      <p className="p1v2__prose">
        Where assumptions or hypotheses fall short, we can pivot — returning to the research and
        insight and changing direction.
      </p>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--tl ly-layered--blue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <span className="ly-layered__plane ly-layered__plane--yellow ly-layered__plane--br" aria-hidden="true" />
          <Media shape="landscape" seed="rsd-p12-hands" />
        </div>
      </div>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">Levels of experimentation</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
      <blockquote className="p1v2__pullquote">
        <span className="p1v2__pullquote-mark" aria-hidden="true">&ldquo;</span>
        <p className="p1v2__pullquote-text">
          Head, Heart and Hands work together. We understand the world, stay focused on what
          matters, and make ideas tangible enough to test, learn from and improve.
        </p>
      </blockquote>
    </V2Shell>
  )
}

function V2s13(p: V2Props) {
  const items = [
    'Walking through scenarios in each other’s shoes.',
    'Developing future journeys.',
    'Creating service maps.',
    'Exploring future roles and structures.',
    'Bringing concepts to life.',
    'Testing ideas together.',
  ]
  return (
    <V2Shell {...p} widestBodyIs="photo">
      <p className="p1v2__prose">That is why participatory design is our default.</p>
      <p className="p1v2__prose">
        We want our work to be embedded into the culture of a project, programme and organisation,
        so it can live on and create positive change that everyone wants to sustain.
      </p>
      <p className="p1v2__prose">
        Our participation model demonstrates value and builds knowledge through doing. We invite
        and guide participants to experience the process themselves.
      </p>
      <div className="p1v2__paired">
        <div className="ly-overlap-pair">
          <div className="ly-overlap-pair__a">
            <Media shape="portrait" seed="rsd-p13-a" />
          </div>
          <div className="ly-overlap-pair__b">
            <Media shape="landscape" seed="rsd-p13-b" />
          </div>
        </div>
      </div>
      <aside className="p1v2__card">
        <span className="p1v2__card-label">That might mean</span>
        <ul className="p1v2__card-list">
          {items.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </aside>
      <p className="p1v2__prose">
        Participation isn&rsquo;t simply consultation. It&rsquo;s about people becoming active
        contributors to the design process.
      </p>
      <p className="p1v2__prose">
        By working openly and building knowledge through doing, we create greater shared
        understanding and ownership. The aim is not only to create a better service, but to
        strengthen the capability of the people and organisations who will continue to shape it.
      </p>
      <blockquote className="p1v2__pullquote">
        <span className="p1v2__pullquote-mark" aria-hidden="true">&ldquo;</span>
        <p className="p1v2__pullquote-text">
          Participation helps surface hidden user groups, bring their insight into focus and
          nurture in-house skills so innovation can continue.
        </p>
      </blockquote>
    </V2Shell>
  )
}
