import { useState } from 'react'
import { Box, Button, Container, Group, Stack, Text, TextInput, PasswordInput, Title } from '@mantine/core'
import { ArrowRight } from 'lucide-react'
import { Pebble } from '../components/Pebble'
import { signIn, validateCredentials } from '../lib/auth'

type SignInProps = {
  onReturnHome: () => void
  onSignedIn: () => void
}

export function SignIn({ onReturnHome, onSignedIn }: SignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canSubmit = email.trim().length > 0 && password.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateCredentials(email.trim(), password)) {
      setError('Those details don\'t match our records. Please try again.')
      return
    }
    signIn(email.trim())
    onSignedIn()
  }

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
      <a className="skip-link" href="#sign-in-content">Skip to main content</a>

      <Pebble variant={6} size={200} rotate={-15} opacity={0.55} style={{ top: 60, left: 60 }} visibleFrom="lg" />
      <Pebble variant={4} size={180} rotate={20} opacity={0.45} style={{ bottom: 60, right: 60 }} visibleFrom="lg" />

      <Box
        component="main"
        id="sign-in-content"
        style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
      >
        <Container size="xs" px="md" py={72} style={{ width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <Stack gap={40}>

              <Stack gap={12}>
                <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
                  Pathway two — master your practice
                </Text>
                <Title order={1} fz={40} fw={700} c="#333333" lh={1.2}>
                  Sign in.
                </Title>
                <Text fz={18} c="#5C5C5C" lh={1.6}>
                  Use the details provided to you by Transform.
                </Text>
              </Stack>

              <Stack gap={24}>
                <TextInput
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.currentTarget.value)}
                  required
                  size="md"
                  radius="sm"
                  styles={fieldStyles}
                />
                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
                  required
                  size="md"
                  radius="sm"
                  styles={fieldStyles}
                />
                {error && (
                  <Text size="sm" fw={600} c="red">{error}</Text>
                )}
              </Stack>

              <Group gap="md">
                <Button
                  type="submit"
                  size="md"
                  radius="xl"
                  disabled={!canSubmit}
                  rightSection={<ArrowRight size={16} aria-hidden />}
                  styles={{
                    root: {
                      backgroundColor: canSubmit ? '#213D59' : undefined,
                      color: canSubmit ? '#ffffff' : undefined,
                      fontWeight: 700,
                    },
                  }}
                >
                  Sign in
                </Button>
                <Button variant="subtle" color="dark" radius="xl" onClick={onReturnHome}>
                  Go back
                </Button>
              </Group>

            </Stack>
          </form>
        </Container>
      </Box>
    </Box>
  )
}

const fieldStyles = {
  label: {
    fontSize: 15,
    fontWeight: 700,
    color: '#333333',
    marginBottom: 6,
  },
  input: {
    borderColor: '#E6E3DF',
    backgroundColor: '#ffffff',
    color: '#333333',
    '&:focus': { borderColor: '#213D59' },
  },
}
