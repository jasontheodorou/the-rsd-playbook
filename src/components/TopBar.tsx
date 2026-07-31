import { Box, Button, Container, Group, Text, Title } from '@mantine/core'
import { OrangeCircle } from './Transform'

type TopBarProps = {
  onHome?: () => void
  isLoggedIn?: boolean
  userEmail?: string
  onSignIn?: () => void
  onSignOut?: () => void
}

function roleFromEmail(email: string): { initials: string; label: string; colour: string } {
  if (email.toLowerCase().includes('servicedesigner')) {
    return { initials: 'SD', label: 'Senior service designer', colour: '#213D59' }
  }
  return { initials: 'ID', label: 'Consultant interaction designer', colour: '#EC671B' }
}

export function TopBar({ onHome, isLoggedIn, userEmail, onSignIn, onSignOut }: TopBarProps) {
  const wordmark = (
    <Group gap="sm" align="center" wrap="nowrap" style={{ cursor: onHome ? 'pointer' : 'default' }} onClick={onHome}>
      <OrangeCircle size={12} />
      <Title order={1} fz={15} fw={700} c="#333333" lh={1}>
        The RSD Playbook
      </Title>
    </Group>
  )

  const role = isLoggedIn && userEmail ? roleFromEmail(userEmail) : null

  const right = isLoggedIn ? (
    <Group gap="sm" align="center" wrap="nowrap">
      {role && (
        <Group gap={8} align="center" wrap="nowrap">
          <Box
            style={{
              width: 28, height: 28, borderRadius: '50%',
              backgroundColor: role.colour,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Text fz={10} fw={700} c="#ffffff" lh={1}>{role.initials}</Text>
          </Box>
          <Text fz={13} fw={600} c="#5C5C5C" visibleFrom="sm">{role.label}</Text>
        </Group>
      )}
      <Button variant="outline" color="dark" size="xs" radius="xl" onClick={onSignOut}>
        Sign out
      </Button>
    </Group>
  ) : onSignIn ? (
    <Button variant="outline" color="dark" size="xs" radius="xl" onClick={onSignIn}>
      Sign in
    </Button>
  ) : null

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E6E3DF',
        boxShadow: '0 1px 2px rgba(33, 61, 89, 0.04)',
      }}
    >
      <Container size="lg" py="md" px="md">
        <Group justify="space-between" align="center" wrap="nowrap">
          {wordmark}
          {right}
        </Group>
      </Container>
    </Box>
  )
}
