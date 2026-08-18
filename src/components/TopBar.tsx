import { Box, Button, Container, Group, Text, Title } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import { OrangeCircle } from './Transform'

type TopBarProps = {
  onHome?: () => void
  isLoggedIn?: boolean
  userEmail?: string
  onSignIn?: () => void
  onSignOut?: () => void
  /** Optional trail text shown after the wordmark, e.g. "Explore the foundations". */
  trail?: string
}

function roleFromEmail(email: string): { initials: string; label: string; colour: string } {
  if (email.toLowerCase().includes('servicedesigner')) {
    return { initials: 'SD', label: 'Service designer', colour: '#213D59' }
  }
  return { initials: 'ID', label: 'Interaction designer', colour: '#EC671B' }
}

export function TopBar({ onHome, isLoggedIn, userEmail, onSignIn, onSignOut, trail }: TopBarProps) {
  const wordmark = (
    <Group gap="sm" align="center" wrap="nowrap" style={{ cursor: onHome ? 'pointer' : 'default' }} onClick={onHome}>
      <OrangeCircle size={12} />
      <Title order={1} fz={15} fw={700} c="#333333" lh={1}>
        The RSD Playbook
      </Title>
      <AnimatePresence mode="wait">
        {trail && (
          <motion.span
            key={trail}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}
          >
            <span style={{ color: '#CCC8C4', fontSize: 15, lineHeight: 1 }}>/</span>
            <Text component="span" fz={13} c="#5C5C5C" lh={1}>{trail}</Text>
          </motion.span>
        )}
      </AnimatePresence>
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
