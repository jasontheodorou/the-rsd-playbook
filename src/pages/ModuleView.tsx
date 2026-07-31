import { useState } from 'react'
import { Box, Container, Grid, Paper, Stack, Text, UnstyledButton } from '@mantine/core'
import { TopBar } from '../components/TopBar'
import { CardView } from '../components/CardView'
import { ModuleSidebar } from '../components/ModuleSidebar'
import { getModulesForUser } from '../data/modules'
import type { PracticeProfile } from '../components/PracticeForm'

type ModuleViewProps = {
  profile: PracticeProfile
  userEmail: string
  completed: Set<string>
  onToggleComplete: (cardId: string) => void
  onReturnHome: () => void
  isLoggedIn?: boolean
  onSignOut?: () => void
}

export function ModuleView({ profile, userEmail, completed, onToggleComplete, onReturnHome, isLoggedIn, onSignOut }: ModuleViewProps) {
  const modules = getModulesForUser(profile.role, profile.account_id)

  const [activeModuleId, setActiveModuleId] = useState(modules[0].id)
  const [selectedCardId, setSelectedCardId] = useState(
    () => modules[0].cards.find(c => !completed.has(c.id))?.id ?? modules[0].cards[0].id
  )

  const module1Complete = modules[0].cards.every(c => completed.has(c.id))

  const mod = modules.find(m => m.id === activeModuleId) ?? modules[0]
  const cards = mod.cards
  const currentCard = cards.find(c => c.id === selectedCardId) ?? cards[0]
  const currentIndex = cards.findIndex(c => c.id === currentCard.id)

  const handleModuleSwitch = (moduleId: string) => {
    setActiveModuleId(moduleId)
    const newCards = (modules.find(m => m.id === moduleId) ?? modules[0]).cards
    setSelectedCardId(newCards.find(c => !completed.has(c.id))?.id ?? newCards[0].id)
  }

  const handleToggle = () => {
    const wasComplete = completed.has(currentCard.id)
    onToggleComplete(currentCard.id)
    if (!wasComplete) {
      const next = cards.find((c, i) => i > currentIndex && !completed.has(c.id))
      if (next) setSelectedCardId(next.id)
    }
  }

  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <TopBar onHome={onReturnHome} isLoggedIn={isLoggedIn} userEmail={userEmail} onSignOut={onSignOut} />

      <Box component="main" id="main-content" style={{ flex: 1 }}>
        <Container size="xl" py={32}>
          <Paper bg="#FFFFFF" radius="md" withBorder style={{ overflow: 'hidden' }}>

            {/* Module tabs */}
            <Box style={{ display: 'flex', borderBottom: '1px solid #E6E3DF' }}>
              {modules.map((m, i) => {
                const isActive = m.id === activeModuleId
                const isLocked = i > 0 && !module1Complete
                const doneCount = m.cards.filter(c => completed.has(c.id)).length
                return (
                  <UnstyledButton
                    key={m.id}
                    onClick={() => !isLocked && handleModuleSwitch(m.id)}
                    disabled={isLocked}
                    style={{
                      flex: 1,
                      padding: '16px 20px',
                      borderBottom: isActive ? '2px solid #213D59' : '2px solid transparent',
                      backgroundColor: isActive ? '#FFFFFF' : '#FAF8F6',
                      borderRight: i < modules.length - 1 ? '1px solid #E6E3DF' : undefined,
                      textAlign: 'left',
                      cursor: isLocked ? 'default' : 'pointer',
                      opacity: isLocked ? 0.4 : 1,
                    }}
                  >
                    <Stack gap={2}>
                      <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.06em' }}>
                        Module {i + 1}
                      </Text>
                      <Text size="sm" fw={isActive ? 700 : 600} c="#333333" lh={1.3}>
                        {m.title}
                      </Text>
                      <Text size="xs" c="#5C5C5C">
                        {isLocked ? 'Complete module 1 to unlock' : `${doneCount} of ${m.cards.length} complete`}
                      </Text>
                    </Stack>
                  </UnstyledButton>
                )
              })}
            </Box>

            {/* Sidebar + card content */}
            <Grid gutter={0}>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box bg="#FAF8F6" p="lg" style={{ height: '100%', borderRight: '1px solid #E6E3DF' }}>
                  <ModuleSidebar
                    cards={cards}
                    selectedCardId={selectedCardId}
                    completed={completed}
                    onSelect={setSelectedCardId}
                  />
                </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Box p={32}>
                  <CardView
                    key={currentCard.id}
                    card={currentCard}
                    cardIndex={currentIndex + 1}
                    totalCards={cards.length}
                    isComplete={completed.has(currentCard.id)}
                    onToggleComplete={handleToggle}
                  />
                </Box>
              </Grid.Col>
            </Grid>

          </Paper>
        </Container>
      </Box>
    </Box>
  )
}
