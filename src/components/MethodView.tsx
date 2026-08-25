import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core'
import type { Method, ResourceGroup, ResourceItem, ResourceTint } from '../lib/content'
import { BestPracticeCard } from './BestPracticeCard'

const tintColours: Record<ResourceTint, string> = {
  mist: '#E5EDEE',
  blush: '#F2E2D6',
  yellow: '#F9F0CE',
}

type MethodViewProps = {
  method: Method
  cardIndex: number
  totalCards: number
  isComplete: boolean
  onToggleComplete: () => void
}

export function MethodView({
  method,
  cardIndex,
  totalCards,
  isComplete,
  onToggleComplete,
}: MethodViewProps) {
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text size="xs" fw={700} tt="uppercase" c="#EC671B" style={{ letterSpacing: '0.14em' }}>
          Method · {cardIndex} of {totalCards} · {method.minutes} min
        </Text>
        <Title order={2} fz={28} fw={700} c="#333333" lh={1.25}>
          {method.title}
        </Title>
      </Stack>

      <Section title="What it is">
        <Text c="#333333" size="md" lh={1.6}>{method.whatItIs}</Text>
      </Section>

      <Section title="When to use it">
        <Bullets items={method.whenToUse} />
      </Section>

      <Section title="What you do">
        <Bullets items={method.whatYouDo} />
      </Section>

      <Section title="What you produce">
        <Bullets items={method.whatYouProduce} />
      </Section>

      <Section title="What good looks like">
        {Array.isArray(method.whatGoodLooksLike) ? (
          <Bullets items={method.whatGoodLooksLike} />
        ) : (
          <Text c="#333333" size="md" lh={1.6}>{method.whatGoodLooksLike}</Text>
        )}
      </Section>

      {method.bestPractice && (
        <BestPracticeCard {...method.bestPractice} />
      )}

      {method.resources && method.resources.length > 0 && (
        <Stack gap="xl" pt="xl" style={{ borderTop: '1px solid #E6E3DF' }}>
          {method.resources.map((group, i) => (
            <ResourceGroupBlock key={i} group={group} />
          ))}
        </Stack>
      )}

      <Group justify="space-between" mt="lg" pt="lg" style={{ borderTop: '1px solid #E6E3DF' }}>
        <Text size="sm" c={isComplete ? '#213D59' : '#5C5C5C'} fw={isComplete ? 700 : 400}>
          {isComplete ? 'Completed' : 'Not yet complete'}
        </Text>
        {isComplete ? (
          <Button variant="outline" color="dark" size="sm" onClick={onToggleComplete}>
            Mark as not complete
          </Button>
        ) : (
          <Button onClick={onToggleComplete} styles={{ root: { backgroundColor: '#213D59' } }}>
            Mark as complete
          </Button>
        )}
      </Group>
    </Stack>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack gap="xs">
      <Title order={3} fz={13} fw={700} c="#5C5C5C" tt="uppercase" style={{ letterSpacing: '0.14em' }}>
        {title}
      </Title>
      {children}
    </Stack>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 24, color: '#333333' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 8, fontSize: 15, lineHeight: 1.6, paddingLeft: 4 }}>
          {item}
        </li>
      ))}
    </ul>
  )
}

function ResourceGroupBlock({ group }: { group: ResourceGroup }) {
  return (
    <Stack gap="md">
      <Title order={3} fz={20} fw={700} c="#333333">{group.heading}</Title>
      <Stack gap="md">
        {group.items.map((item, i) => (
          <ResourceCard key={i} item={item} tint={group.tint} />
        ))}
      </Stack>
    </Stack>
  )
}

function ResourceCard({ item, tint }: { item: ResourceItem; tint: ResourceTint }) {
  return (
    <Paper bg={tintColours[tint]} p="xl" radius="md">
      <Stack gap="md" align="flex-start">
        <Stack gap="xs">
          <Title order={4} fz={18} fw={700} c="#333333" lh={1.3}>{item.title}</Title>
          <Text c="#333333" size="md" lh={1.5}>{item.description}</Text>
        </Stack>
        {item.ctaLabel && (
          <Button component="a" href={item.ctaHref ?? '#'} size="sm" styles={{ root: { backgroundColor: '#213D59' } }}>
            {item.ctaLabel}
          </Button>
        )}
      </Stack>
    </Paper>
  )
}
