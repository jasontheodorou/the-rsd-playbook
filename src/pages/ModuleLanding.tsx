import { Box, Button, Card, Container, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { TopBar } from '../components/TopBar'
import { HighlightedHeadline } from '../components/Transform'
import { modules, type Module } from '../data/modules'
import type { PracticeProfile } from '../components/PracticeForm'

type ModuleLandingProps = {
  profile: PracticeProfile
  onOpenModule: (id: string) => void
  onReturnHome: () => void
}

export function ModuleLanding({ profile, onOpenModule, onReturnHome }: ModuleLandingProps) {
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <TopBar onHome={onReturnHome} />

      <Box component="main" id="main-content" style={{ flex: 1 }}>
        <Container size="lg" py={48}>
          <Stack gap={32}>

            <Paper bg="#FFFFFF" radius="md" p={48} withBorder>
              <Stack gap="md" maw={640}>
                <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.06em' }}>
                  Pathway two — master your practice
                </Text>
                <HighlightedHeadline before="Your" accent="pathway" after="." />
                <Text size="lg" c="#5C5C5C" lh={1.6}>
                  Built for {profile.role.toLowerCase()}s. Three modules covering research, mapping and design — work through them in any order.
                </Text>
              </Stack>
            </Paper>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {modules.map((m, i) => (
                <ModuleCard
                  key={m.id}
                  module={m}
                  index={i + 1}
                  onOpen={() => onOpenModule(m.id)}
                />
              ))}
            </SimpleGrid>

          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function ModuleCard({ module, index, onOpen }: { module: Module; index: number; onOpen: () => void }) {
  return (
    <Card withBorder radius="md" padding="lg" bg="#FFFFFF" style={{ height: '100%' }}>
      <Stack gap="md" h="100%">
        <Text size="xs" fw={700} tt="uppercase" c="#213D59" style={{ letterSpacing: '0.06em' }}>
          Module {index}
        </Text>
        <Stack gap={4}>
          <Title order={2} fz={18} fw={700} c="#333333" lh={1.4}>
            {module.title}
          </Title>
        </Stack>
        <Text c="#5C5C5C" style={{ flex: 1 }} lh={1.6}>
          {module.description}
        </Text>
        <Text size="sm" c="#5C5C5C">
          {module.cards.length} cards
        </Text>
        <Button
          onClick={onOpen}
          fullWidth
          styles={{ root: { backgroundColor: '#213D59', color: '#ffffff' } }}
        >
          Open module {index}
        </Button>
      </Stack>
    </Card>
  )
}
