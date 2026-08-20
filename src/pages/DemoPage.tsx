import { Box, Container, Stack, Text, Title } from '@mantine/core'
import { Target, Zap, ShieldCheck, RefreshCw, Scale, Eye } from 'lucide-react'
import { DiscoveryStar, type DiscoveryStarPoint } from '../components/DiscoveryStar'
import { RebuildTower } from '../components/RebuildTower'

const points: [
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
  DiscoveryStarPoint,
] = [
  { id: 'real-problems', title: 'Real problems', body: 'Trust starts with services that solve what actually matters to people.', icon: <Target size={20} strokeWidth={2} /> },
  { id: 'less-waste',    title: 'Less waste',    body: 'Every unnecessary step erodes belief. Simpler journeys build confidence.', icon: <Zap size={20} strokeWidth={2} /> },
  { id: 'confidence',    title: 'Confidence',    body: 'People must feel able to move forward without confusion or fear.', icon: <ShieldCheck size={20} strokeWidth={2} /> },
  { id: 'learning',      title: 'Learning',      body: 'Services that keep learning keep earning trust over time.', icon: <RefreshCw size={20} strokeWidth={2} /> },
  { id: 'fairness',      title: 'Fairness',      body: 'Trust survives when everyone can use the service, not only those it was designed around.', icon: <Scale size={20} strokeWidth={2} /> },
  { id: 'honesty',       title: 'Honesty',       body: 'Trust breaks the moment a service overclaims what it does or hides how it works.', icon: <Eye size={20} strokeWidth={2} /> },
]

export function DemoPage() {
  return (
    <Container size="lg" py={64} px="md">
      <Stack gap={72}>
        <Stack gap="xs" style={{ textAlign: 'center' }}>
          <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
            Two little interactive things
          </Text>
          <Title order={1} fz={38} fw={700} c="#333333" lh={1.15}>
            Have a play.
          </Title>
          <Text c="#5C5C5C" fz={16} maw={520} style={{ margin: '0 auto' }}>
            Click the star's points to reveal what makes design trustworthy. Then drag the Lego pieces onto the base to rebuild the tower.
          </Text>
        </Stack>

        <Stack gap={16} align="center">
          <Text fz={12} fw={700} tt="uppercase" c="#EC671B" style={{ letterSpacing: '0.14em' }}>
            One · The discovery star
          </Text>
          <Box style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <DiscoveryStar className="rsd-trust-star" points={points} completionMessage="We're all in" />
          </Box>
        </Stack>

        <Stack gap={16}>
          <Text fz={12} fw={700} tt="uppercase" c="#EC671B" style={{ letterSpacing: '0.14em', textAlign: 'center' }}>
            Two · The rebuild tower
          </Text>
          <Box style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
            <RebuildTower />
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}
