import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { ArrowRight } from 'lucide-react'
import { TopBar } from './TopBar'
import { OrangeCircle } from './Transform'

type AuthGateProps = {
  onSignIn: () => void
  onReturnHome: () => void
}

export function AuthGate({ onSignIn, onReturnHome }: AuthGateProps) {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <a className="skip-link" href="#gate-content">Skip to main content</a>

      <OrangeCircle
        size={280}
        opacity={0.08}
        style={{ position: 'absolute', top: -80, right: -100, pointerEvents: 'none' }}
      />

      <TopBar onHome={onReturnHome} onSignIn={onSignIn} />

      <Box
        component="main"
        id="gate-content"
        style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
      >
        <Container size="xs" px="md" py={72} style={{ width: '100%' }}>
          <Stack gap={40}>

            <Stack gap={12}>
              <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
                Pathway two — master your practice
              </Text>
              <Title order={1} fz={40} fw={700} c="#333333" lh={1.2}>
                You'll need to sign in.
              </Title>
              <Text fz={18} c="#5C5C5C" lh={1.6}>
                Pathway two tracks your progress and tailors the content to your role and the account you're working on.
              </Text>
            </Stack>

            <Group gap="md">
              <Button
                onClick={onSignIn}
                size="md"
                radius="xl"
                rightSection={<ArrowRight size={16} aria-hidden />}
                styles={{ root: { backgroundColor: '#213D59', color: '#ffffff', fontWeight: 700 } }}
              >
                Sign in
              </Button>
              <Button variant="subtle" color="dark" radius="xl" onClick={onReturnHome}>
                Go back
              </Button>
            </Group>

          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
