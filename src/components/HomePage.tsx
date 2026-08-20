import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react'
import { Box, Button, Container, SimpleGrid, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { HighlightedHeadline, OrangeCircle } from './Transform'
import type { LucideIcon } from 'lucide-react'

type HomePageProps = {
  onFoundations: () => void
  onPractice: () => void
}

export function HomePage({ onFoundations, onPractice }: HomePageProps) {
  return (
    <Box style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }}>
      <a className="skip-link" href="#home-content">Skip to main content</a>

      {/* Decorative orange circle — large, off-canvas, low opacity */}
      <OrangeCircle
        size={320}
        opacity={0.07}
        style={{ position: 'absolute', top: -80, right: -120, pointerEvents: 'none' }}
      />

      <Box
        component="main"
        id="home-content"
        style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}
      >
        <Container size="lg" py={80} px="md" style={{ width: '100%' }}>
          <Stack gap={56}>

            {/* Hero */}
            <Stack gap={16} style={{ textAlign: 'center', alignItems: 'center' }}>
              <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
                Transform design practice
              </Text>
              <HighlightedHeadline
                before="The RSD"
                accent="Playbook"
                size={52}
              />
              <Text fz={18} c="#5C5C5C" lh={1.6} maw={480} style={{ margin: '0 auto' }}>
                What good design looks like at Transform
              </Text>
            </Stack>

            {/* Pathway label */}
            <Stack gap={24} style={{ alignItems: 'center' }}>
              <Text fz={13} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.12em' }}>
                Select a pathway
              </Text>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
                <PathwayCard
                  eyebrow="Pathway one"
                  title="Explore the foundations"
                  accentWord="foundations"
                  beforeWord="Explore the "
                  lede="Understand the principles behind research-led service design and how they shape the way we work."
                  Icon={BookOpen}
                  cta="Start exploring"
                  onClick={onFoundations}
                />
                <PathwayCard
                  eyebrow="Pathway two"
                  title="Master your practice"
                  accentWord="practice"
                  beforeWord="Master your "
                  lede="Go deeper into RSD methods, tools and techniques — organised around the moments that matter in your work."
                  Icon={Sparkles}
                  cta="Go deeper"
                  onClick={onPractice}
                />
              </SimpleGrid>
            </Stack>

          </Stack>
        </Container>
      </Box>
    </Box>
  )
}


type PathwayCardProps = {
  eyebrow: string
  title: string
  accentWord: string
  beforeWord: string
  lede: string
  Icon: LucideIcon
  cta: string
  onClick: () => void
}

function PathwayCard({ eyebrow, beforeWord, accentWord, lede, Icon, cta, onClick }: PathwayCardProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      className="pathway-card"
      aria-label={`${beforeWord}${accentWord} — ${cta}`}
      style={{
        position: 'relative',
        backgroundColor: '#ffffff',
        border: '1px solid #E6E3DF',
        borderRadius: 12,
        padding: '40px 36px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 28,
        minHeight: 320,
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: '0 1px 3px rgba(33, 61, 89, 0.05)',
      }}
    >
      <ArrowUpRight
        size={18}
        aria-hidden
        className="card-arrow"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: '#CCC8C4',
          transition: 'all 220ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      />

      <Stack gap={16}>
        <Icon size={28} strokeWidth={1.75} aria-hidden style={{ color: '#213D59' }} />
        <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
          {eyebrow}
        </Text>
        <Title order={2} fz={30} fw={700} c="#333333" lh={1.2} m={0}>
          {beforeWord}
          <span style={{
            textDecoration: 'underline',
            textDecorationColor: '#EC671B',
            textDecorationThickness: 4,
            textUnderlineOffset: 5,
          }}>
            {accentWord}
          </span>
        </Title>
        <Text fz={16} c="#5C5C5C" lh={1.6} maw="34ch" m={0}>
          {lede}
        </Text>
      </Stack>

      <Button
        component="span"
        size="sm"
        radius="xl"
        rightSection={<ArrowRight size={15} aria-hidden />}
        styles={{ root: { backgroundColor: '#213D59', color: '#ffffff', alignSelf: 'flex-start', fontWeight: 700 } }}
      >
        {cta}
      </Button>
    </UnstyledButton>
  )
}
