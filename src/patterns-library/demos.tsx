import { useRef, type ReactNode } from 'react'
import { GoodDesignCollab } from '../pathway1/GoodDesignCollab'
import { ParticipationModel } from '../pathway1/ParticipationModel'
import HeadHeartHandsPattern from '../pathway1/HeadHeartHandsPattern'
import { TShapedTabs } from '../pages/patterns/TShapedTabs'
import { ImageCoverRevealBoxed } from '../experiments/pilot-3/patterns/ImageCoverRevealBoxed'
import { ImagesReveal } from '../pathway1/ImagesReveal'
import { KenBurnsImage } from '../pathway1/KenBurnsImage'
import { PinnedPhoto } from '../pathway1/PinnedPhoto'
import { QuoteCard } from '../pathway1/QuoteCard'
import { Media } from '../pages/Layouts'
import { NorthStarPattern } from '../pathway1/NorthStarPattern'
import { DiscoveryStar, type DiscoveryStarPoint } from '../components/DiscoveryStar'
import { RebuildTower } from '../components/RebuildTower'
import { Target, Zap, ShieldCheck, RefreshCw, Scale, Eye } from 'lucide-react'

/**
 * Demo wrappers for the pattern library.
 *
 * Every wrapper mounts the SHIPPED component with the SAME props the
 * Foundations pathway passes it — see the `whereUsed` refs in registry.ts.
 * Nothing here reimplements a pattern. If a pattern changes in the pathway,
 * this library changes with it, which is the whole point.
 *
 * The only liberties taken are containers: the pathway wraps these in
 * `.p1v2__*` blocks that own width and clipping, so each demo reproduces the
 * relevant wrapper rather than leaving the component unconstrained.
 */

/** Reproduces the pathway's page column so widths and type scale match. */
function PageColumn({ children }: { children: ReactNode }) {
  return <div className="p1v2 pl-demo-column">{children}</div>
}

/* ── 1 · Collaborative sticky board ─────────────────────────────────────── */

export function StickyBoardDemo() {
  return (
    <PageColumn>
      <GoodDesignCollab />
    </PageColumn>
  )
}

/* ── 2 · Participation model ────────────────────────────────────────────── */

export function ParticipationModelDemo() {
  return (
    <PageColumn>
      <ParticipationModel />
    </PageColumn>
  )
}

/* ── 3 · Head, Heart and Hands ──────────────────────────────────────────── */

export function HeadHeartHandsDemo() {
  return (
    <PageColumn>
      <HeadHeartHandsPattern initialActive="head" />
    </PageColumn>
  )
}

/* ── 4 · Morphing pill tabs ─────────────────────────────────────────────── */

export function PillTabsDemo() {
  return (
    <PageColumn>
      <div className="p1v2__tabs">
        <span className="ly-panel__eyebrow">The specialists</span>
        <TShapedTabs variant="pill" />
      </div>
    </PageColumn>
  )
}

export function UnderlineTabsDemo() {
  return (
    <PageColumn>
      <TShapedTabs variant="underline" />
    </PageColumn>
  )
}

export function WipeTabsDemo() {
  return (
    <PageColumn>
      <TShapedTabs variant="wipe" />
    </PageColumn>
  )
}

/* ── 5 · Image cover reveal (the wipe) ──────────────────────────────────── */

/**
 * The reveal is driven by scroll position within a container, so the demo
 * supplies its own scrolling box and passes the ref through exactly as
 * Pathway1 passes its `PathwayScrollContext` ref. Spacers above and below
 * give the wipe room to run.
 */
export function CoverRevealDemo() {
  const scrollRef = useRef<HTMLDivElement>(null)
  return (
    <PageColumn>
      <p className="pl-demo-hint">Scroll inside the frame to run the reveal. It only plays once.</p>
      <div className="pl-scrollbox" ref={scrollRef}>
        <div className="pl-scrollbox__spacer" />
        <div className="p1v2__reveal">
          <ImageCoverRevealBoxed
            imageUrl="/photos/board-review.jpg"
            heading="Depth in one discipline, breadth across many."
            scrollContainer={scrollRef}
            height={420}
          />
        </div>
        <div className="pl-scrollbox__spacer" />
      </div>
    </PageColumn>
  )
}

/* ── 6 · Staged image reveal ────────────────────────────────────────────── */

export function ImagesRevealDemo() {
  return (
    <PageColumn>
      <ImagesReveal
        images={[
          { src: '/photos/lego-raised.png', alt: 'A colleague holding up a completed Lego build for the room to see.' },
          { src: '/photos/three-way-conversation.png', alt: 'Three colleagues in an animated small-group conversation.' },
          { src: '/photos/team-meeting.png', alt: 'Five colleagues gathered at a bright meeting table with laptops.' },
          { src: '/photos/lego-show-and-tell.png', alt: 'Two colleagues sharing a small Lego build together.' },
          { src: '/photos/lego-trees.png', alt: 'Hands placing green Lego "trees" into a shared build.' },
        ]}
      />
    </PageColumn>
  )
}

/* ── 7 · Ken Burns photo ────────────────────────────────────────────────── */

export function KenBurnsDemo() {
  return (
    <PageColumn>
      <div className="p1v2__media">
        <KenBurnsImage
          src="/photos/hands-many-lego.png"
          alt="Many hands reaching into a shared pile of Lego bricks — creating with people, not to them."
          focal="center"
          duration={8}
        />
      </div>
    </PageColumn>
  )
}

/* ── 8 · Pinned photo ───────────────────────────────────────────────────── */

export function PinnedPhotoDemo() {
  return (
    <PageColumn>
      <div className="p1v2__paired">
        <PinnedPhoto
          src="/photos/eunice-tracey.jpg"
          alt="Eunice and Tracey — a moment from the practice."
        />
      </div>
    </PageColumn>
  )
}

/* ── 9 · Offset plane media ─────────────────────────────────────────────── */

/** All three shipped configurations, labelled, in the order they appear. */
export function OffsetPlaneDemo() {
  return (
    <PageColumn>
      <p className="pl-demo-label">Pale blue, offset top-left — Head, Heart and Hands</p>
      <div className="p1v2__cinema">
        <div className="ly-layered ly-layered--tl ly-layered--paleblue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="21-9" src="/photos/head-flipchart.png" alt="Three colleagues sketching a diagram together at a flipchart." />
        </div>
      </div>

      <p className="pl-demo-label">Terracotta, offset bottom-right</p>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--br ly-layered--terracotta">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="16-9" src="/photos/journey-map-group.jpg" alt="A diverse group sharing a hand-drawn journey map." />
        </div>
      </div>

      <p className="pl-demo-label">Two planes — blue top-left, yellow bottom-right</p>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--tl ly-layered--blue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <span className="ly-layered__plane ly-layered__plane--yellow ly-layered__plane--br" aria-hidden="true" />
          <Media shape="landscape" src="/photos/lego-prototyping.jpg" alt="Hands sorting Lego bricks — physical prototyping." />
        </div>
      </div>
    </PageColumn>
  )
}

export function OffsetPlaneWarmGreyDemo() {
  return (
    <PageColumn>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--tl ly-layered--warmgrey">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="16-9" src="/photos/team-meeting.png" alt="Warm grey plane variant." />
        </div>
      </div>
    </PageColumn>
  )
}

export function OffsetPlaneTopRightDemo() {
  return (
    <PageColumn>
      <div className="p1v2__paired">
        <div className="ly-layered ly-layered--tr ly-layered--paleblue">
          <span className="ly-layered__plane" aria-hidden="true" />
          <Media shape="16-9" src="/photos/team-meeting.png" alt="Top-right offset variant." />
        </div>
      </div>
    </PageColumn>
  )
}

/* ── 10 · Tinted quote card ─────────────────────────────────────────────── */

export function QuoteCardDemo() {
  return (
    <PageColumn>
      <QuoteCard
        text="We turn uncertainty into clarity and possibility."
        attribution="Our north star"
        tone="yellow"
      />
    </PageColumn>
  )
}

export function QuoteCardTerracottaDemo() {
  return (
    <PageColumn>
      <QuoteCard text="We turn uncertainty into clarity and possibility." attribution="Our north star" tone="terracotta" />
    </PageColumn>
  )
}

export function QuoteCardPaleBlueDemo() {
  return (
    <PageColumn>
      <QuoteCard text="We turn uncertainty into clarity and possibility." attribution="Our north star" tone="paleblue" />
    </PageColumn>
  )
}

/* ── Built, not yet placed ──────────────────────────────────────────────── */

/**
 * These three are finished patterns with no home in the pathway yet. They are
 * mounted exactly as they stand today — the props below are the ones their
 * only existing render site (/demo) passes them.
 */

export function NorthStarDemo() {
  return (
    <PageColumn>
      <NorthStarPattern />
    </PageColumn>
  )
}

const starPoints: [
  DiscoveryStarPoint, DiscoveryStarPoint, DiscoveryStarPoint,
  DiscoveryStarPoint, DiscoveryStarPoint, DiscoveryStarPoint,
] = [
  { id: 'real-problems', title: 'Real problems', body: 'Trust starts with services that solve what actually matters to people.', icon: <Target size={20} strokeWidth={2} /> },
  { id: 'less-waste',    title: 'Less waste',    body: 'Every unnecessary step erodes belief. Simpler journeys build confidence.', icon: <Zap size={20} strokeWidth={2} /> },
  { id: 'confidence',    title: 'Confidence',    body: 'People must feel able to move forward without confusion or fear.', icon: <ShieldCheck size={20} strokeWidth={2} /> },
  { id: 'learning',      title: 'Learning',      body: 'Services that keep learning keep earning trust over time.', icon: <RefreshCw size={20} strokeWidth={2} /> },
  { id: 'fairness',      title: 'Fairness',      body: 'Trust survives when everyone can use the service, not only those it was designed around.', icon: <Scale size={20} strokeWidth={2} /> },
  { id: 'honesty',       title: 'Honesty',       body: 'Trust breaks the moment a service overclaims what it does or hides how it works.', icon: <Eye size={20} strokeWidth={2} /> },
]

export function DiscoveryStarDemo() {
  return (
    <div className="pl-demo-column pl-centre">
      <DiscoveryStar
        className="rsd-trust-star"
        points={starPoints}
        completionMessage="We&rsquo;re all in"
      />
    </div>
  )
}

export function RebuildTowerDemo() {
  return (
    <div className="pl-demo-column pl-demo-column--wide">
      <RebuildTower />
    </div>
  )
}

/* ── Card tiles ─────────────────────────────────────────────────────────────
   A few patterns don't thumbnail from their page demo. The cover reveal shows
   as a blank box until you scroll it; the offset-plane page stacks all three
   shipped configurations. These render the recognisable frame instead. */

/** The reveal in its covered state — the cream-and-ink face is the recognisable part. */
export function CoverRevealCard() {
  return (
    <div className="pl-demo-column">
      <ImageCoverRevealBoxed
        imageUrl="/photos/board-review.jpg"
        heading="Depth in one discipline, breadth across many."
        height={340}
      />
    </div>
  )
}

/** One plane rather than all three. */
export function OffsetPlaneCard() {
  return (
    <div className="pl-demo-column">
      <div className="ly-layered ly-layered--tl ly-layered--paleblue">
        <span className="ly-layered__plane" aria-hidden="true" />
        <Media shape="16-9" src="/photos/head-flipchart.png" alt="" />
      </div>
    </div>
  )
}
