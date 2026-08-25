/**
 * Pathway 1 content — one welcome page + 12 vertical body pages.
 * Body pages use the p1v2 layout-and-spacing grammar (hero + single-flow body).
 * Grouped into 7 chapters for chapter-level navigation.
 */

export type PilotPage = {
  id: string
  num: string
  section: string
  headline: string
  body: [string, string]
  /** Omit to suppress the hero artwork — s13 shows part2.svg interactively
   *  in the body instead, so a hero copy would duplicate it. */
  image?: string
  /** Optional full-bleed background video (welcome page). Overrides the image. */
  video?: string
  /** Page-specific accent for rail + hamburger. Defaults to terracotta. */
  accent?: string
  accentHover?: string
  accentTrack?: string
}

export type PilotChapter = {
  id: string
  num: string
  name: string
  /** Index into PILOT_PAGES for the chapter's first page. */
  startIndex: number
}

export const PILOT_PAGES: PilotPage[] = [
  {
    id: 's1-welcome',
    num: '01',
    section: 'Welcome',
    headline: 'Welcome to research and design at Transform.',
    body: [
      'We turn uncertainty into clarity and possibility.',
      'By understanding people, places and systems, we help teams make better decisions and create space for good design.',
    ],
    image: '/illustrations/turninguncertaintyintopossibility.svg',
    video: '/videos/postits.mp4',
  },
  {
    id: 's2-north-star',
    num: '02',
    section: 'Our north star',
    headline: 'Purpose-driven north star.',
    body: [
      'We turn uncertainty into clarity and possibility.',
      'By understanding people, places and systems, we help teams make better decisions and create space for good design.',
    ],
    image: '/illustrations/makepossiblereal.svg',
  },
  {
    id: 's3-good-design-matters',
    num: '03',
    section: 'Why it matters',
    headline: 'Good design matters.',
    body: [
      'Good research and design help us think clearly, act with empathy and create things people trust.',
      'They bridge people and institutions, making services feel built with people, not done to them.',
    ],
    image: '/illustrations/gooddesignearnstrust.svg',
  },
  {
    id: 's4-process-wrong',
    num: '04',
    section: 'When it fails',
    headline: 'When the process goes wrong.',
    body: [
      'The way we work can fail in two distinct ways.',
      'Sometimes design is absent. Sometimes it is present but hollow. Both leave services that fail people.',
    ],
    image: '/illustrations/whenserviceslosepeople.svg',
  },
  {
    id: 's6-enabling',
    num: '05',
    section: 'Making it work',
    headline: 'Enabling good design.',
    body: [
      'Good design needs the right culture, shared language and space to learn, test and collaborate.',
      'It succeeds when people, systems and leadership work together to put human needs at the heart of decisions.',
    ],
    image: '/illustrations/ecosystem_001.png',
  },
  {
    id: 's8-tshaped',
    num: '06',
    section: 'The people',
    headline: 'T-shaped skills.',
    body: [
      'Great designers combine empathy, creativity, systems thinking and collaboration.',
      'Their value lies not just in what they design, but in helping others see, understand and adapt to people’s needs.',
    ],
    image: '/illustrations/standardistransformational.svg',
  },
  {
    id: 's9-hhh-framework',
    num: '07',
    section: 'Our philosophy',
    headline: 'Head, heart and hands.',
    body: [
      'Our Head, Heart, Hands philosophy brings together clear thinking, genuine care and practical action.',
      'It helps organisations build better cultures and create services that make a real difference to people’s lives.',
    ],
    image: '/illustrations/head_heart_hands.png',
  },
  {
    id: 's13-participation',
    num: '08',
    section: 'Closing',
    headline: 'Participation is our superpower.',
    body: [
      'Great design comes from designing together, building shared understanding and ownership along the way.',
      'By involving people directly, we turn ideas into tested solutions that create lasting change.',
    ],
    // part2.svg now appears interactively in the body, so the hero carries
    // its own graphic rather than a duplicate of it.
    image: '/illustrations/convo.svg',
  },
]

export const PILOT_CHAPTERS: PilotChapter[] = [
  { id: 'welcome',       num: 'I',   name: 'Welcome',                  startIndex: 0 },
  { id: 'north-star',    num: 'II',  name: 'Our north star',           startIndex: 1 },
  { id: 'why-matters',   num: 'III', name: 'Why it matters',           startIndex: 2 },
  { id: 'enabling',      num: 'IV',  name: 'What enables good design', startIndex: 4 },
  { id: 'skills',        num: 'V',   name: 'The skills we bring',      startIndex: 5 },
  { id: 'hhh',           num: 'VI',  name: 'Head, Heart and Hands',    startIndex: 6 },
  { id: 'participation', num: 'VII', name: 'Participation',            startIndex: 7 },
]

/** Returns the index of the chapter that contains the given page index. */
export function chapterIndexForPage(pageIndex: number): number {
  let i = 0
  for (let c = 0; c < PILOT_CHAPTERS.length; c++) {
    if (PILOT_CHAPTERS[c].startIndex <= pageIndex) i = c
    else break
  }
  return i
}
