import { Box, Container, Stack, Text } from '@mantine/core'
import { ArrowRight, Target, Zap, ShieldCheck, RefreshCw, Scale, Eye } from 'lucide-react'
import { Button } from '@mantine/core'
import { HighlightedHeadline, OrangeCircle } from '../components/Transform'
import { Body, SlideFrame, SlideIcon, SlideIllustration, SlideTitle, type Slide } from '../components/SlideDeck'
import { DiscoveryStar, type DiscoveryStarPoint } from '../components/DiscoveryStar'
import { RebuildTower } from '../components/RebuildTower'

const trustPoints: [
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
] = [
  { id: 'real-problems', title: 'Real problems', body: 'Trust starts with services that solve what actually matters to people.', icon: <Target size={20} strokeWidth={2} /> },
  { id: 'less-waste', title: 'Less waste', body: 'Every unnecessary step erodes belief. Simpler journeys build confidence.', icon: <Zap size={20} strokeWidth={2} /> },
  { id: 'confidence', title: 'Confidence', body: 'People must feel able to move forward without confusion or fear.', icon: <ShieldCheck size={20} strokeWidth={2} /> },
  { id: 'learning', title: 'Learning', body: 'Services that keep learning keep earning trust over time.', icon: <RefreshCw size={20} strokeWidth={2} /> },
  { id: 'fairness', title: 'Fairness', body: 'Trust survives when everyone can use the service, not only those it was designed around.', icon: <Scale size={20} strokeWidth={2} /> },
  { id: 'honesty', title: 'Honesty', body: 'Trust breaks the moment a service overclaims what it does or hides how it works.', icon: <Eye size={20} strokeWidth={2} /> },
]

type SlideOpts = {
  onReturnHome: () => void
  onNextPathway: () => void
}

function Lines({ items }: { items: string[] }) {
  return (
    <Stack gap="sm">
      {items.map(line => (
        <Text key={line} c="#333333" fz={20} lh={1.6}>{line}</Text>
      ))}
    </Stack>
  )
}

export function createFoundationSlides({ onNextPathway }: SlideOpts): Slide[] {
  return [

  // ── 1 — Welcome ──────────────────────────────────────────────────────────
  {
    id: 'welcome',
    content: (
      <Container size="md" px="md" style={{ position: 'relative', paddingTop: 120, paddingBottom: 120 }}>
        <OrangeCircle
          size={420}
          style={{ position: 'absolute', top: -120, right: -180, opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}
        />
        <Stack gap="lg" maw={680} style={{ marginInline: 'auto', position: 'relative', zIndex: 1 }}>
          <HighlightedHeadline
            before="Welcome to design at"
            accent="Transform"
            size={52}
          />
          <Text c="#5C5C5C" fz={20} lh={1.6} maw={560}>
            Research and design help us turn uncertainty into clarity, understand people and systems,
            and create services that work in the real world.
          </Text>
          <Body>
            This pathway introduces the shared philosophy, principles and working habits behind
            Transform's research and design practice. It is the common foundation for everyone,
            before moving into role-specific methods, examples and activities.
          </Body>
        </Stack>
      </Container>
    ),
  },

  // ── 2 — Turning uncertainty into possibility ──────────────────────────────
  {
    id: 'uncertainty',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Turning uncertainty into possibility.</SlideTitle>
        </Stack>
        <Lines items={[
          'We create clarity where things are complex.',
          'Better decisions, made together.',
          'Grounded in people, places and systems.',
          'Design with purpose. Outcomes that matter.',
        ]} />
        <SlideIcon src="/illustrations/turninguncertaintyintopossibility.svg" size={360} align="center" />
      </SlideFrame>
    ),
  },

  // ── 3 — Good design earns trust ───────────────────────────────────────────
  {
    id: 'trust',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Good design earns trust.</SlideTitle>
        </Stack>
        <Text c="#5C5C5C" fz={18} lh={1.6}>
          Services succeed when people believe in them. Not because they are polished — because
          they earn it. Explore what makes trust real.
        </Text>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <DiscoveryStar
            className="rsd-trust-star"
            points={trustPoints}
            completionMessage="We're all in"
          />
        </Box>
      </SlideFrame>
    ),
  },

  // ── 4 — When services lose people ────────────────────────────────────────
  {
    id: 'failure',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>When services lose people.</SlideTitle>
        </Stack>
        <SlideIcon src="/illustrations/whenserviceslosepeople2.svg" size={360} align="center" />
        <Lines items={[
          'Services fail when systems come first.',
          'When design is decorative.',
          'When feedback is absent.',
          'When decisions serve the organisation, not the people living the experience.',
        ]} />
        <RebuildTower />
      </SlideFrame>
    ),
  },

  // ── 5 — Design is connective creativity ──────────────────────────────────
  {
    id: 'connective',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Design is connective creativity.</SlideTitle>
        </Stack>
        <Lines items={[
          'Design is not the surface.',
          'It is the bridge.',
        ]} />
        <SlideIcon src="/illustrations/designisconnectivecreativity.svg" size={360} align="center" />
        <Lines items={[
          'Between evidence and imagination. Users and institutions. Ambition and delivery.',
          'Desirable. Feasible. Viable. Sustainable.',
        ]} />
      </SlideFrame>
    ),
  },

  // ── 6 — Think with head, heart, hands ────────────────────────────────────
  {
    id: 'hhh',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Think with head, heart, hands.</SlideTitle>
        </Stack>
        <SlideIllustration src="/illustrations/head_heart_hands.png" alt="Head, heart and hands" maxWidth={680} radius={0} />
        <Lines items={[
          'Head frames the world.',
          'Heart keeps us human.',
          'Hands make change real.',
          'This is how good intentions become working services.',
        ]} />
      </SlideFrame>
    ),
  },

  // ── 7 — See the whole system ──────────────────────────────────────────────
  {
    id: 'system',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>See the whole system.</SlideTitle>
        </Stack>
        <Lines items={[
          'People do not live in touchpoints.',
          'They live in systems.',
          'Individual needs. Service realities. Organisational pressures. Communities. Environments.',
          'Design must hold them all.',
        ]} />
        <SlideIllustration src="/illustrations/ecosystem_001.png" maxWidth={680} radius={0} />
      </SlideFrame>
    ),
  },

  // ── 8 — Put people in the work ────────────────────────────────────────────
  {
    id: 'participation',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Put people in the work.</SlideTitle>
        </Stack>
        <Lines items={[
          'Participation is not theatre.',
          'It is how legitimacy is built.',
          'Bring people closer to the decisions that shape their lives.',
          'Design with them, not for them.',
        ]} />
        <SlideIllustration src="/illustrations/part2.svg" maxWidth={680} radius={0} />
      </SlideFrame>
    ),
  },

  // ── 9 — Make the possible real ────────────────────────────────────────────
  {
    id: 'making',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Make the possible real.</SlideTitle>
        </Stack>
        <Lines items={[
          'Ideas must leave the wall.',
        ]} />
        <SlideIcon src="/illustrations/makepossiblereal.svg" size={360} align="center" />
        <Lines items={[
          'Prototype. Test. Learn. Pivot.',
          'The work becomes stronger when it meets reality early.',
        ]} />
      </SlideFrame>
    ),
  },

  // ── 10 — The standard is transformational ────────────────────────────────
  {
    id: 'standard',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>The standard is transformational.</SlideTitle>
        </Stack>
        <SlideIcon src="/illustrations/standardistransformational.svg" size={360} align="center" />
        <Lines items={[
          'Our work must be human, ethical and systemic.',
          'Accessible by default.',
          'Grounded in lived experience.',
          'Measured by impact, not activity.',
        ]} />
      </SlideFrame>
    ),
  },

  // ── 11 — Build, learn, evolve together ───────────────────────────────────
  {
    id: 'evolve',
    content: (
      <SlideFrame>
        <Stack gap="sm">
          <SlideTitle>Build, learn, evolve together.</SlideTitle>
        </Stack>
        <SlideIcon src="/illustrations/lego-bricks-refined.png" alt="Lego bricks" size={260} />
        <Lines items={[
          'Design does not end at delivery.',
          'Services live, change and reveal themselves over time.',
          'So we keep learning.',
          'We build for adaptation, accountability and lasting value.',
        ]} />
      </SlideFrame>
    ),
  },

  // ── 12 — Closing ─────────────────────────────────────────────────────────
  {
    id: 'closing',
    content: (
      <Container size="md" px="md" style={{ paddingTop: 96, paddingBottom: 120 }}>
        <Stack gap="xl" maw={560} style={{ marginInline: 'auto', alignItems: 'center', textAlign: 'center' }}>
          <OrangeCircle size={140} />
          <Text fz={44} fw={700} c="#333333" lh={1.2} style={{ fontFamily: "'Open Sans', sans-serif" }}>
            The philosophy is shared.
          </Text>
          <Body>
            What happens next depends on your role. Pathway two takes everything here
            and makes it specific to how you actually work.
          </Body>
          <Button
            size="md"
            radius="xl"
            rightSection={<ArrowRight size={16} aria-hidden />}
            styles={{ root: { backgroundColor: '#213D59', color: '#ffffff', fontWeight: 700 } }}
            onClick={onNextPathway}
          >
            Start pathway two
          </Button>
        </Stack>
      </Container>
    ),
  },
]}
