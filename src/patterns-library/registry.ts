import type { ComponentType } from 'react'
import * as D from './demos'

/**
 * The pattern library registry — the single source of truth for /patterns.
 *
 * SCOPE: the graphical and interactive patterns of the build — the pieces that
 * carry a page visually. Each carries a `status`: 'live' patterns are rendering
 * in the Foundations pathway now, and every `whereUsed` entry on them is a real
 * render site verified in the code; 'built' patterns are finished and working
 * but not yet placed on a page.
 *
 * Deliberately absent: candidates never chosen, small typographic devices
 * (the eyebrow label, the brand marks), and layout grammar that isn't a
 * graphical element in its own right. This is not an inventory of every class
 * in the build.
 *
 * `alsoConsidered` holds alternatives that were genuinely built and then
 * rejected. It renders collapsed: available as history, never competing.
 *
 * Metadata shape follows the Symphonia library (jasontheodorou/pattern-test)
 * so the two read the same way — description + whatItDoes, whereUsed, an
 * accessibility block, and a developer-details payload.
 */

export type PatternCategory = 'motion' | 'image' | 'editorial'

/**
 * Where a pattern stands in the build.
 *  'live'  — rendering in the Foundations pathway right now.
 *  'built' — finished and working, but not yet placed on a page.
 */
export type PatternStatus = 'live' | 'built'

/** How much work the pattern does at runtime — shown in developer details. */
export type Weight = 'light' | 'medium' | 'heavy'

/** What starts it. Drives the "Play again" affordance on the canvas. */
export type Trigger = 'mount' | 'inView' | 'scroll' | 'press'

export type Accessibility = {
  /** Does it render a complete, readable state under prefers-reduced-motion? */
  reducedMotion: 'supported' | 'partial' | 'none'
  /** Can it be operated from the keyboard? Null where there is nothing to operate. */
  keyboard: boolean | null
  /** Does any content depend on hover alone? */
  hoverOnly: boolean
  /** Does it animate without being asked? */
  autoplay: boolean
}

export type WhereUsed = {
  /** The page, in the reader's language. */
  label: string
  /** Source reference, e.g. 'Pathway1.tsx:647'. */
  ref: string
  /** Foundations page id, so the pathway map can cross-reference. */
  pageId?: string
}

export type Alternative = {
  name: string
  note: string
  demo?: ComponentType
}

export type LibraryPattern = {
  id: string
  name: string
  category: PatternCategory
  status: PatternStatus
  /** One line, on the card and under the title. */
  description: string
  /** Prose, 2–3 sentences, on the pattern page. */
  whatItDoes: string
  whereUsed: WhereUsed[]
  trigger: Trigger
  weight: Weight
  accessibility: Accessibility
  builtWith: string[]
  /** Files a developer would need. First entry is the pattern itself. */
  files: string[]
  packages: string[]
  alsoConsidered?: Alternative[]
  demo: ComponentType
  /** Per-tile scale override. Unset means the uniform tile scale, which fits
   *  the 720px demo column to the tile width — see .pl-card__scale. */
  cardScale?: number
  /** Override for patterns whose page demo doesn't read as a thumbnail. */
  cardDemo?: ComponentType
}

export const CATEGORIES: Array<{
  id: PatternCategory
  label: string
  description: string
}> = [
  { id: 'motion',    label: 'Motion',    description: 'Patterns the reader drives, or that play as the page moves.' },
  { id: 'image',     label: 'Image',     description: 'How photography is framed, planed and animated.' },
  { id: 'editorial', label: 'Editorial', description: 'Typographic devices set into the body copy.' },
]

export const PATTERNS: LibraryPattern[] = [

  /* ── Motion ──────────────────────────────────────────────────────────── */

  {
    id: 'sticky-board',
    name: 'Collaborative sticky board',
    category: 'motion',
    status: 'live',
    description: 'Cursors drag sticky notes onto a shared board, then settle into an idle drift.',
    whatItDoes:
      'Two named cursors move across a board, pick up sticky notes, place them, and pause to watch each other type. Once the notes have landed the cursors drift in slow idle loops rather than stopping dead, so the board reads as a room still working. Every position is a percentage of the board, so cursors and notes share one coordinate system and the composition holds at any size.',
    whereUsed: [{ label: 'Participation', ref: 'Pathway1.tsx:830', pageId: 's13-participation' }],
    trigger: 'inView',
    weight: 'heavy',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: true },
    builtWith: ['framer-motion', 'useAnimationControls', 'useInView', 'scoped CSS'],
    files: ['src/pathway1/GoodDesignCollab.tsx', 'src/pathway1/GoodDesignCollab.css'],
    packages: ['framer-motion'],
    demo: D.StickyBoardDemo,
  },
  {
    id: 'participation-model',
    name: 'Participation model',
    category: 'motion',
    status: 'live',
    description: 'Four moments on a wired diagram, expanded one at a time.',
    whatItDoes:
      'The four moments of the participation model sit on a connector diagram. Choosing one draws a wire to its panel and expands the copy while the others recede. The colours are deepened from the original artwork’s own fills — the drawing’s pale tints read as shapes but are too faint for a 2px rule on the cream ground.',
    whereUsed: [{ label: 'Participation', ref: 'Pathway1.tsx:810', pageId: 's13-participation' }],
    trigger: 'press',
    weight: 'medium',
    accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
    builtWith: ['framer-motion', 'AnimatePresence', 'SVG connectors', 'scoped CSS'],
    files: ['src/pathway1/ParticipationModel.tsx', 'src/pages/superpower/executions.tsx', 'src/pages/superpower/superpower.css'],
    packages: ['framer-motion'],
    demo: D.ParticipationModelDemo,
  },
  {
    id: 'head-heart-hands',
    name: 'Head, Heart and Hands',
    category: 'motion',
    status: 'live',
    description: 'Three panels; choosing one expands its photograph and copy.',
    whatItDoes:
      'The three principles sit as equal panels. Selecting one expands it to carry a photograph and its explanation while the other two compress to an icon and title. It opens on Head rather than closed, so the reader sees the pattern working before touching it.',
    whereUsed: [{ label: 'Head, Heart and Hands', ref: 'Pathway1.tsx:687', pageId: 's9-hhh-framework' }],
    trigger: 'press',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
    builtWith: ['React state', 'CSS transitions', 'scoped CSS'],
    files: ['src/pathway1/HeadHeartHandsPattern.tsx', 'src/pathway1/HeadHeartHandsPattern.css'],
    packages: [],
    demo: D.HeadHeartHandsDemo,
  },
  {
    id: 'pill-tabs',
    name: 'Morphing pill tabs',
    category: 'motion',
    status: 'live',
    description: 'An orange pill travels to the chosen tab; copy slides in from the side you came from.',
    whatItDoes:
      'Four practices share one panel. The orange pill animates to whichever tab is chosen, and the panel copy slides in from the direction you travelled — pick a tab to the right and the text enters from the right. The panel height is fixed, so nothing below it jumps as you move between tabs.',
    whereUsed: [{ label: 'The skills we bring', ref: 'Pathway1.tsx:647', pageId: 's8-tshaped' }],
    trigger: 'press',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
    builtWith: ['framer-motion', 'layoutId', 'AnimatePresence', 'scoped CSS'],
    files: ['src/pages/patterns/TShapedTabs.tsx', 'src/pages/patterns/TShapedTabs.css'],
    packages: ['framer-motion'],
    alsoConsidered: [
      { name: 'Sliding underline', note: 'The most restrained of the five — an orange rule slides under the tabs. Rejected as too quiet for the page’s only interactive moment.', demo: D.UnderlineTabsDemo },
      { name: 'Editorial wipe', note: 'A large ghost numeral changes behind the copy, revealed by a wipe with an orange leading edge. Rejected as too loud beside the cover reveal directly above it.', demo: D.WipeTabsDemo },
    ],
    demo: D.PillTabsDemo,
  },
  {
    id: 'cover-reveal',
    name: 'Image cover reveal',
    category: 'motion',
    status: 'live',
    description: 'A cream cover wipes away as you scroll, revealing the photograph beneath.',
    whatItDoes:
      'The image starts fully covered, heading in ink on cream. As the box scrolls up the cover clips away from the right and the heading beneath is revealed in white. The ink heading is a child of the cover, so one clip removes both the cream and the ink together — no sub-pixel seam can appear between them. Progress only ratchets upward, so scrolling back does not un-reveal the image.',
    whereUsed: [{ label: 'The skills we bring', ref: 'Pathway1.tsx:638', pageId: 's8-tshaped' }],
    trigger: 'scroll',
    weight: 'medium',
    accessibility: { reducedMotion: 'partial', keyboard: null, hoverOnly: false, autoplay: false },
    builtWith: ['framer-motion', 'useScroll', 'useTransform', 'clip-path'],
    files: ['src/experiments/pilot-3/patterns/ImageCoverRevealBoxed.tsx'],
    packages: ['framer-motion'],
    demo: D.CoverRevealDemo,
    cardDemo: D.CoverRevealCard,
  },
  {
    id: 'images-reveal',
    name: 'Staged image reveal',
    category: 'motion',
    status: 'live',
    description: 'Five photographs spring into a rotated scatter as the row enters view.',
    whatItDoes:
      'Photographs arrive on a spring with alternating rotations, staggered so they land one after another rather than together. The angles are fixed defaults rather than random, so the composition is identical every time it is seen.',
    whereUsed: [{ label: 'Why it matters', ref: 'Pathway1.tsx:377', pageId: 's3-good-design-matters' }],
    trigger: 'inView',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: true },
    builtWith: ['framer-motion', 'spring transitions', 'whileInView', 'scoped CSS'],
    files: ['src/pathway1/ImagesReveal.tsx', 'src/pathway1/ImagesReveal.css'],
    packages: ['framer-motion'],
    demo: D.ImagesRevealDemo,
  },

  /* ── Image ───────────────────────────────────────────────────────────── */

  {
    id: 'ken-burns',
    name: 'Ken Burns photograph',
    category: 'image',
    status: 'live',
    description: 'A slow zoom and drift toward a focal point, once the photo is in view.',
    whatItDoes:
      'The image scales to about 1.05 over eight seconds and drifts a percentage point or two toward a named focal point. It adds motion to the image only — the container owns width and aspect ratio — so it drops into any existing image slot without changing the layout.',
    whereUsed: [{ label: 'Why it matters', ref: 'Pathway1.tsx:394', pageId: 's3-good-design-matters' }],
    trigger: 'inView',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: true },
    builtWith: ['framer-motion', 'useReducedMotion'],
    files: ['src/pathway1/KenBurnsImage.tsx'],
    packages: ['framer-motion'],
    demo: D.KenBurnsDemo,
  },
  {
    id: 'pinned-photo',
    name: 'Pinned photograph',
    category: 'image',
    status: 'live',
    description: 'A yellow plane rotates into place behind the photo, like pinning a print to a wall.',
    whatItDoes:
      'The photograph sits on a yellow plane offset to the top left. When it scrolls into view the plane settles from square into its resting rotation of about minus three degrees over 2.4 seconds. The photo itself never moves — only the plane behind it — which is what makes it read as pinning rather than sliding.',
    whereUsed: [{ label: 'What enables good design', ref: 'Pathway1.tsx:543', pageId: 's6-enabling' }],
    trigger: 'inView',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: true },
    builtWith: ['framer-motion', 'whileInView', '.ly-layered CSS'],
    files: ['src/pathway1/PinnedPhoto.tsx', 'src/pages/Layouts.css'],
    packages: ['framer-motion'],
    demo: D.PinnedPhotoDemo,
  },
  {
    id: 'offset-plane',
    name: 'Offset plane media',
    category: 'image',
    status: 'live',
    description: 'A flat colour plane sits behind the image, offset to one corner.',
    whatItDoes:
      'One mechanism produces every framed image in the pathway: a wrapper, a direction modifier and a colour modifier. The plane offsets 22px to the named corner and takes its colour from the Valencia accents. A second plane can be added on the opposite corner, which the pathway does exactly once.',
    whereUsed: [
      { label: 'Head, Heart and Hands — pale blue, top left', ref: 'Pathway1.tsx:704', pageId: 's9-hhh-framework' },
      { label: 'Head, Heart and Hands — terracotta, bottom right', ref: 'Pathway1.tsx:739', pageId: 's9-hhh-framework' },
      { label: 'Head, Heart and Hands — blue and yellow, both corners', ref: 'Pathway1.tsx:769', pageId: 's9-hhh-framework' },
    ],
    trigger: 'mount',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: false },
    builtWith: ['CSS only', '.ly-layered + direction + colour modifiers'],
    files: ['src/pages/Layouts.css'],
    packages: [],
    alsoConsidered: [
      { name: 'Warm grey plane', note: 'In the CSS and never used — the warm grey reads as a shadow rather than a deliberate plane.', demo: D.OffsetPlaneWarmGreyDemo },
      { name: 'Top-right offset', note: 'Also available. The pathway settled on top-left and bottom-right only, so the offsets alternate down the page.', demo: D.OffsetPlaneTopRightDemo },
    ],
    demo: D.OffsetPlaneDemo,
    cardDemo: D.OffsetPlaneCard,
  },

  /* ── Editorial ───────────────────────────────────────────────────────── */

  {
    id: 'quote-card',
    name: 'Tinted quote card',
    category: 'editorial',
    status: 'live',
    description: 'A tinted plane with an oversized Georgia speech mark in the corner.',
    whatItDoes:
      'The pathway’s tint box. A flat tinted plane carries the quotation, with a large Georgia speech mark set into the top-left corner and an optional attribution beneath. It ships in yellow at all four sites, so the tint reads as one recurring device rather than a palette on display.',
    whereUsed: [
      { label: 'Our north star', ref: 'Pathway1.tsx:357', pageId: 's2-north-star' },
      { label: 'What enables good design', ref: 'Pathway1.tsx:502', pageId: 's6-enabling' },
      { label: 'What enables good design', ref: 'Pathway1.tsx:579', pageId: 's6-enabling' },
      { label: 'Participation', ref: 'Pathway1.tsx:786', pageId: 's13-participation' },
    ],
    trigger: 'mount',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: null, hoverOnly: false, autoplay: false },
    builtWith: ['CSS only', 'Georgia for the speech mark'],
    files: ['src/pathway1/QuoteCard.tsx', 'src/pathway1/QuoteCard.css'],
    packages: [],
    alsoConsidered: [
      { name: 'Terracotta tone', note: 'Built and available. Reads as a warning rather than a quotation against the cream ground.', demo: D.QuoteCardTerracottaDemo },
      { name: 'Pale blue tone', note: 'Built and available. Too close in value to the pale blue image planes, so the two devices competed.', demo: D.QuoteCardPaleBlueDemo },
    ],
    demo: D.QuoteCardDemo,
  },

  /* ── Built, not yet placed ───────────────────────────────────────────────
     Finished patterns with no home in the pathway yet. Kept in the library
     because they are real work and the next round of pages may want them. */

  {
    id: 'north-star',
    name: 'Interactive north star',
    category: 'motion',
    status: 'built',
    description: 'A constellation of stars; the focal star holds the centre while the others answer it.',
    whatItDoes:
      'Stars are drawn as ray sets rather than glyphs, so each one can differ in ray count, length and rotation. One is marked focal and holds the centre; the rest enter on a stagger around it. The whole composition is SVG, so it stays crisp at any size and needs no image asset.',
    whereUsed: [],
    trigger: 'inView',
    weight: 'light',
    accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: true },
    builtWith: ['framer-motion', 'hand-built SVG', 'useReducedMotion'],
    files: ['src/pathway1/NorthStarPattern.tsx', 'src/pathway1/NorthStarPattern.css'],
    packages: ['framer-motion'],
    demo: D.NorthStarDemo,
  },
  {
    id: 'discovery-star',
    name: 'Discovery star',
    category: 'motion',
    status: 'built',
    description: 'A six-point star; clicking each point reveals what sits behind it, with a celebration once all six are found.',
    whatItDoes:
      'Six points arranged around a centre, each holding a title, a line of copy and an icon. Clicking a point opens it and marks it found; when all six have been discovered the centre plays a short celebration and shows a completion pill. It is the one pattern in the build that tracks progress within itself rather than reporting up.',
    whereUsed: [],
    trigger: 'press',
    weight: 'medium',
    accessibility: { reducedMotion: 'supported', keyboard: true, hoverOnly: false, autoplay: false },
    builtWith: ['motion (v13)', 'AnimatePresence', 'lucide-react icons', 'scoped CSS'],
    files: ['src/components/DiscoveryStar.tsx', 'src/components/DiscoveryStar.css'],
    packages: ['motion', 'lucide-react'],
    demo: D.DiscoveryStarDemo,
  },
  {
    id: 'rebuild-tower',
    name: 'Lego rebuild tower',
    category: 'motion',
    status: 'built',
    description: 'Drag scattered Lego bricks onto a base to rebuild the tower, one brick at a time.',
    whatItDoes:
      'Bricks start scattered and are dragged onto a studded base. Each brick has a target slot and layer, so the tower can only be built in a valid order, and each one placed opens the note that belongs to it. Pointer events are handled directly rather than through a drag library, which is why it works with touch as well as mouse.',
    whereUsed: [],
    trigger: 'press',
    weight: 'heavy',
    accessibility: { reducedMotion: 'none', keyboard: false, hoverOnly: false, autoplay: false },
    builtWith: ['React state', 'pointer events', 'CSS transforms'],
    files: ['src/components/RebuildTower.tsx', 'src/components/RebuildTower.css'],
    packages: [],
    demo: D.RebuildTowerDemo,
  },
]
export function findPattern(id: string | null | undefined): LibraryPattern | undefined {
  if (!id) return undefined
  return PATTERNS.find((p) => p.id === id)
}

/**
 * The Foundations journey, in reading order, with the patterns each page uses.
 * Drives the Pathway view — the orientation piece, so a reader meets the
 * composition before the parts.
 *
 * Names and order mirror PILOT_CHAPTERS in src/pathway1/pages.ts.
 */
export const JOURNEY: Array<{ pageId: string; num: string; name: string; note: string }> = [
  { pageId: 's1-welcome',             num: 'I',    name: 'Welcome',                  note: 'Full-bleed video, held on its last frame. No patterns of its own.' },
  { pageId: 's2-north-star',          num: 'II',   name: 'Our north star',           note: 'Prose closing on the first quote card.' },
  { pageId: 's3-good-design-matters', num: 'III',  name: 'Why it matters',           note: 'The scattered photo reveal, then a slow Ken Burns close.' },
  { pageId: 's4-process-wrong',       num: 'IV',   name: 'When process goes wrong',  note: 'Prose and asides only — a deliberate quiet page.' },
  { pageId: 's6-enabling',            num: 'V',    name: 'What enables good design', note: 'The pinned photograph, between two quote cards.' },
  { pageId: 's8-tshaped',             num: 'VI',   name: 'The skills we bring',      note: 'The busiest page: the cover reveal, then the pill tabs.' },
  { pageId: 's9-hhh-framework',       num: 'VII',  name: 'Head, Heart and Hands',    note: 'The three-panel pattern and all three offset plane treatments.' },
  { pageId: 's13-participation',      num: 'VIII', name: 'Participation',            note: 'Closes on the participation model and the sticky board.' },
]

/** Patterns used on a given Foundations page, in registry order. */
export function patternsForPage(pageId: string): LibraryPattern[] {
  return PATTERNS.filter((p) => p.whereUsed.some((w) => w.pageId === pageId))
}
