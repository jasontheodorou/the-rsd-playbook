import { Box, Button, Container, Group, Select, Stack, Text, Title } from '@mantine/core'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { TopBar } from './TopBar'
import { OrangeCircle } from './Transform'

export type PracticeProfile = {
  role: string
  seniority: string
  account_id: string
  account_name: string
}

type PracticeFormProps = {
  onReturnHome: () => void
  onSubmit: (profile: PracticeProfile) => void
}

const ROLES = ['Service designer', 'Content designer']
const SENIORITY = ['Consultant', 'Senior']
const ACCOUNTS = [
  { value: 'hmcts', label: 'HM Courts and Tribunals Service' },
  { value: 'dfe', label: 'Department for Education' },
]

export function PracticeForm({ onReturnHome, onSubmit }: PracticeFormProps) {
  const [role, setRole] = useState<string | null>(null)
  const [seniority, setSeniority] = useState<string | null>(null)
  const [accountId, setAccountId] = useState<string | null>(null)
  const accounts = ACCOUNTS

  const selectedAccount = accounts.find(a => a.value === accountId)
  const canSubmit = role && seniority && accountId && selectedAccount

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <a className="skip-link" href="#form-content">Skip to main content</a>

      <OrangeCircle
        size={280}
        opacity={0.08}
        style={{ position: 'absolute', top: -80, right: -100, pointerEvents: 'none' }}
      />

      <TopBar onHome={onReturnHome} />

      <Box
        component="main"
        id="form-content"
        style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
      >
        <Container size="xs" px="md" py={72} style={{ width: '100%' }}>
          <Stack gap={40}>

            <Stack gap={12}>
              <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.14em' }}>
                Pathway two — master your practice
              </Text>
              <Title order={1} fz={40} fw={700} c="#333333" lh={1.2}>
                Tell us a little about you.
              </Title>
              <Text fz={18} c="#5C5C5C" lh={1.6}>
                We'll use this to build a learning pathway that fits your role and the account you're working on.
              </Text>
            </Stack>

            <Stack gap={24}>
              <Select
                label="What's your role?"
                placeholder="Select a role"
                data={ROLES}
                value={role}
                onChange={setRole}
                size="md"
                radius="sm"
                styles={selectStyles}
              />
              <Select
                label="What's your seniority?"
                placeholder="Select an option"
                data={SENIORITY}
                value={seniority}
                onChange={setSeniority}
                size="md"
                radius="sm"
                styles={selectStyles}
              />
              <Select
                label="Which account are you working on?"
                placeholder="Select an account"
                data={accounts}
                value={accountId}
                onChange={setAccountId}
                size="md"
                radius="sm"
                styles={selectStyles}
              />
            </Stack>

            <Group gap="md">
              <Button
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
                onClick={() => canSubmit && onSubmit({
                  role: role!,
                  seniority: seniority!,
                  account_id: accountId!,
                  account_name: selectedAccount!.label,
                })}
              >
                Build my pathway
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

const selectStyles = {
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
