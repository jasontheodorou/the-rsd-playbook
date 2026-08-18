/**
 * Pathway 1 content — extracted verbatim from `main` `src/pathway1/slides.tsx`.
 * 13 pages that each become a vertical page in the pilot.
 * The 13 pages are grouped into 6 chapters for chapter-level navigation.
 */

export type PilotPage = {
  id: string
  num: string
  section: string
  headline: string
  body: [string, string]
  image: string
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
    id: 's4-design-wrong',
    num: '04',
    section: 'When it fails',
    headline: 'When design gets it wrong.',
    body: [
      'Human-centred design can fail too when its purpose is unclear, overly performative or stuck in endless loops.',
      'Good design needs clarity, discipline and real-world delivery, not just workshops, research and rituals.',
    ],
    image: '/illustrations/whenserviceslosepeople.svg',
  },
  {
    id: 's5-services-wrong',
    num: '05',
    section: 'When it fails',
    headline: 'When services go wrong.',
    body: [
      'Without human-centred design, services are built around systems and constraints instead of real lives.',
      'Design, learning and adaptability get pushed aside, leading to rigid decisions and services that fail people.',
    ],
    image: '/illustrations/whenserviceslosepeople2.svg',
  },
  {
    id: 's6-enabling',
    num: '06',
    section: 'Making it work',
    headline: 'Enabling good design.',
    body: [
      'Good design needs the right culture, shared language and space to learn, test and collaborate.',
      'It succeeds when people, systems and leadership work together to put human needs at the heart of decisions.',
    ],
    image: '/illustrations/ecosystem_001.png',
  },
  {
    id: 's7-connective',
    num: '07',
    section: 'The craft',
    headline: 'Connective creativity.',
    body: [
      'Great design turns complex problems into solutions that work for people, organisations and the long term.',
      'Researchers and designers connect evidence, creativity and real voices to reduce risk, build trust and create lasting value.',
    ],
    image: '/illustrations/designisconnectivecreativity.svg',
  },
  {
    id: 's8-tshaped',
    num: '08',
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
    num: '09',
    section: 'Our philosophy',
    headline: 'Head, heart and hands.',
    body: [
      'Our Head, Heart, Hands philosophy brings together clear thinking, genuine care and practical action.',
      'It helps organisations build better cultures and create services that make a real difference to people’s lives.',
    ],
    image: '/illustrations/head_heart_hands.png',
  },
  {
    id: 's10-head',
    num: '10',
    section: 'Head',
    headline: 'Understand deeply.',
    body: [
      'We start by understanding your people, needs and wider context, because no service exists in isolation.',
      'From there, we use human-centred thinking to reimagine services and tackle the deeper factors that shape their success.',
    ],
    image: '/illustrations/turninguncertaintyintopossibility.svg',
  },
  {
    id: 's11-heart',
    num: '11',
    section: 'Heart',
    headline: 'Driven by impact.',
    body: [
      'We’re driven by impact: solving the right problems, working closely together and keeping people at the centre.',
      'It’s how we create better services, adapt faster and make a meaningful difference.',
    ],
    image: '/illustrations/gooddesignearnstrust.svg',
  },
  {
    id: 's12-hands',
    num: '12',
    section: 'Hands',
    headline: 'Make it real.',
    body: [
      'We bring the right skills and methods to turn ideas into real services, focusing on what creates the most value.',
      'We test, learn and adapt as we go, changing direction when the evidence tells us to.',
    ],
    image: '/illustrations/makepossiblereal.svg',
  },
  {
    id: 's13-participation',
    num: '13',
    section: 'Closing',
    headline: 'Participation is our superpower.',
    body: [
      'Great design comes from designing together, building shared understanding and ownership along the way.',
      'By involving people directly, we turn ideas into tested solutions that create lasting change.',
    ],
    image: '/illustrations/part2.svg',
  },
]

export const PILOT_CHAPTERS: PilotChapter[] = [
  { id: 'welcome',      num: 'I',   name: 'Welcome',                startIndex: 0 },
  { id: 'north-star',   num: 'II',  name: 'Our north star',         startIndex: 1 },
  { id: 'why-matters',  num: 'III', name: 'Why it matters',         startIndex: 2 },
  { id: 'enabling',     num: 'IV',  name: 'What enables good design', startIndex: 5 },
  { id: 'skills',       num: 'V',   name: 'The skills we bring',    startIndex: 7 },
  { id: 'hhh',          num: 'VI',  name: 'Head, Heart and Hands',  startIndex: 8 },
  { id: 'participation',num: 'VII', name: 'Participation',          startIndex: 12 },
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
