import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ImageReveal } from './valencia/ImageReveal'
import './slides.css'

export type ExperimentSlide = {
  id: string
  label: string
  content: ReactNode
}

// ── Chapter marker ──────────────────────────────────────────────────────────

function ChapterMarker({ num, label }: { num: string; label: string }) {
  return (
    <div className="p1v2-marker">
      <span className="p1v2-marker__num">{num}</span>
      <span className="p1v2-marker__rule" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

// ── Types ───────────────────────────────────────────────────────────────────

type ImageMode = 'illustration' | 'photo' | 'video' | 'color'
type Layout = 'bl' | 'br' | 'tl' | 'center'

type SlideDef = {
  id: string
  num: string
  section: string
  headline: string
  body: [string, string]
  image: string
  imageAlt?: string
  imageMode?: ImageMode
  layout?: Layout
  /** Slide background colour. Overrides the default cream. */
  bgColor?: string
}

// ── The 13 pathway-1 slides ─────────────────────────────────────────────────

const DEFS: SlideDef[] = [
  { id: 's1-welcome',
    num: '01', section: 'Welcome',
    headline: 'Welcome to design at Transform.',
    body: [
      'We turn uncertainty into clarity and possibility.',
      'By understanding people, places and systems, we help teams make better decisions and create space for good design.',
    ],
    image: '/videos/postits.mp4',
    imageMode: 'video',
    layout: 'bl' },
  { id: 's2-north-star',
    num: '02', section: 'Our north star',
    headline: 'Purpose-driven north star.',
    body: [
      'We turn uncertainty into clarity and possibility.',
      'By understanding people, places and systems, we help teams make better decisions and create space for good design.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'br', bgColor: '#E98B73' },   // Coral
  { id: 's3-good-design-matters',
    num: '03', section: 'Why it matters',
    headline: 'Good design matters.',
    body: [
      'Good research and design help us think clearly, act with empathy and create things people trust.',
      'They bridge people and institutions, making services feel built with people, not done to them.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#D99A5E' },   // Warm ochre
  { id: 's4-design-wrong',
    num: '04', section: 'When it fails',
    headline: 'When design gets it wrong.',
    body: [
      'Human-centred design can fail too when its purpose is unclear, overly performative or stuck in endless loops.',
      'Good design needs clarity, discipline and real-world delivery, not just workshops, research and rituals.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'tl', bgColor: '#E7B66C' },   // Golden ochre
  { id: 's5-services-wrong',
    num: '05', section: 'When it fails',
    headline: 'When services go wrong.',
    body: [
      'Without human-centred design, services are built around systems and constraints instead of real lives.',
      'Design, learning and adaptability get pushed aside, leading to rigid decisions and services that fail people.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'tl', bgColor: '#B8C96A' },   // Olive
  { id: 's6-enabling',
    num: '06', section: 'Making it work',
    headline: 'Enabling good design.',
    body: [
      'Good design needs the right culture, shared language and space to learn, test and collaborate.',
      'It succeeds when people, systems and leadership work together to put human needs at the heart of decisions.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#7FBD83' },   // Sage green
  { id: 's7-connective',
    num: '07', section: 'The craft',
    headline: 'Connective creativity.',
    body: [
      'Great design turns complex problems into solutions that work for people, organisations and the long term.',
      'Researchers and designers connect evidence, creativity and real voices to reduce risk, build trust and create lasting value.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'br', bgColor: '#67B9A6' },   // Muted teal
  { id: 's8-tshaped',
    num: '08', section: 'The people',
    headline: 'T-shaped skills.',
    body: [
      'Great designers combine empathy, creativity, systems thinking and collaboration.',
      'Their value lies not just in what they design, but in helping others see, understand and adapt to people’s needs.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#65AEB8' },   // Soft blue-teal
  { id: 's9-hhh-framework',
    num: '09', section: 'Our philosophy',
    headline: 'Head, heart and hands.',
    body: [
      'Our Head, Heart, Hands philosophy brings together clear thinking, genuine care and practical action.',
      'It helps organisations build better cultures and create services that make a real difference to people’s lives.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'center', bgColor: '#729BC4' },   // Soft blue
  { id: 's10-head',
    num: '10', section: 'Head',
    headline: 'Understand deeply.',
    body: [
      'We start by understanding your people, needs and wider context, because no service exists in isolation.',
      'From there, we use human-centred thinking to reimagine services and tackle the deeper factors that shape their success.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#8B8FC7' },   // Lavender-blue
  { id: 's11-heart',
    num: '11', section: 'Heart',
    headline: 'Driven by impact.',
    body: [
      'We’re driven by impact: solving the right problems, working closely together and keeping people at the centre.',
      'It’s how we create better services, adapt faster and make a meaningful difference.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#A784BE' },   // Dusty purple
  { id: 's12-hands',
    num: '12', section: 'Hands',
    headline: 'Make it real.',
    body: [
      'We bring the right skills and methods to turn ideas into real services, focusing on what creates the most value.',
      'We test, learn and adapt as we go, changing direction when the evidence tells us to.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'bl', bgColor: '#C184AC' },   // Dusty rose-purple
  { id: 's13-participation',
    num: '13', section: 'Closing',
    headline: 'Participation is our superpower.',
    body: [
      'Great design comes from designing together, building shared understanding and ownership along the way.',
      'By involving people directly, we turn ideas into tested solutions that create lasting change.',
    ],
    image: '',
    imageMode: 'color',
    layout: 'center', bgColor: '#D78B91' },   // Dusty rose
]

// ── The bleed slide ─────────────────────────────────────────────────────────

function BleedSlide({ def }: { def: SlideDef }) {
  const layout = def.layout ?? 'bl'
  const cardClass = `p1v2-bleed__card p1v2-bleed__card--${layout}`
  const isPhoto = def.imageMode === 'photo'
  const isVideo = def.imageMode === 'video'
  const isColor = def.imageMode === 'color'
  const bgClass = isPhoto
    ? 'p1v2-bleed__bg p1v2-bleed__bg--photo'
    : isVideo
      ? 'p1v2-bleed__bg p1v2-bleed__bg--video'
      : 'p1v2-bleed__bg'

  const cardOffset = (() => {
    switch (layout) {
      case 'tl':     return { x: 0, y: -16 }
      case 'br':     return { x: 0, y: 16 }
      case 'center': return { x: 0, y: 20 }
      case 'bl':
      default:       return { x: 0, y: 16 }
    }
  })()

  return (
    <div
      className="p1v2-slide p1v2-bleed"
      data-layout={layout}
      style={def.bgColor ? { background: def.bgColor } : undefined}
    >
      {!isColor && (
        <div className={bgClass}>
          {isVideo ? (
            <video
              className="p1v2-bleed__video"
              src={def.image}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onEnded={(event) => {
                const v = event.currentTarget
                // Freeze on the last frame: seek right to the end and pause,
                // so the final composition holds instead of resetting or looping.
                v.currentTime = Math.max(0, v.duration - 0.05)
                v.pause()
              }}
            />
          ) : (
            <ImageReveal from="zoom" style="editorial" speed="slow">
              <img src={def.image} alt={def.imageAlt ?? ''} />
            </ImageReveal>
          )}
        </div>
      )}


      <motion.div
        className={cardClass}
        initial={{ opacity: 0, ...cardOffset }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <ChapterMarker num={def.num} label={def.section} />
        <h2 className="p1v2-bleed__headline">{def.headline}</h2>
        <p className="p1v2-bleed__body">{def.body[0]}</p>
        <p className="p1v2-bleed__body">{def.body[1]}</p>
      </motion.div>
    </div>
  )
}

// ── Public API ──────────────────────────────────────────────────────────────
// createDummySlides accepts opts for future use (e.g. deck navigation from
// interactive slides — parked for V2). Ignored today.

type CreateOpts = {
  onJump?: (index: number) => void
}

export function createDummySlides(_opts: CreateOpts = {}): ExperimentSlide[] {
  return DEFS.map((def) => ({
    id: def.id,
    label: `${def.num} · ${def.section}`,
    content: <BleedSlide def={def} />,
  }))
}
