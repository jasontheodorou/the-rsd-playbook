import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core'
import type { Card, ContentBlock, ResourceGroup, ResourceItem, ResourceTint } from '../data/modules'

const tintColours: Record<ResourceTint, string> = {
  mist: '#E5EDEE',
  blush: '#F2E2D6',
  yellow: '#F9F0CE',
}

type CardViewProps = {
  card: Card
  cardIndex: number
  totalCards: number
  isComplete: boolean
  onToggleComplete: () => void
}

export function CardView({ card, cardIndex, totalCards, isComplete, onToggleComplete }: CardViewProps) {
  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.06em' }}>
          Card {cardIndex} of {totalCards} · {card.minutes} min
        </Text>
        <Title order={2} fz={28} fw={700} c="#333333" lh={1.25}>
          {card.title}
        </Title>
      </Stack>

      <Stack gap="md">
        {card.content.map((block, i) => (
          <BlockRenderer key={i} block={block} />
        ))}
      </Stack>

      {card.resources && card.resources.length > 0 && (
        <Stack gap="xl" pt="xl" style={{ borderTop: '1px solid #E6E3DF' }}>
          {card.resources.map((group, i) => (
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

const calloutLabels = { tool: 'Tool', involve: 'Involve', 'best-practice': 'Best practice' }
const calloutColours = { tool: '#E5EDEE', involve: '#F2E2D6', 'best-practice': '#F9F0CE' }

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === 'paragraph') {
    return <Text c="#333333" size="md" lh={1.6}>{block.text}</Text>
  }
  if (block.type === 'heading') {
    return <Title order={3} fz={20} fw={700} c="#333333" mt="md" lh={1.3}>{block.text}</Title>
  }
  if (block.type === 'callout') {
    return (
      <Paper bg={calloutColours[block.variant]} px="lg" py="lg" radius="md">
        <Stack gap="md" align="flex-start">
          <Text fz={11} fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.1em' }}>
            {calloutLabels[block.variant]}
          </Text>
          <Text c="#333333" size="md" lh={1.6}>{block.body}</Text>
          {block.ctaLabel && (
            <Button
              component="a"
              href={block.ctaHref ?? '#'}
              size="sm"
              variant="outline"
              styles={{
                root: {
                  borderColor: '#333333',
                  color: '#333333',
                  backgroundColor: 'transparent',
                  fontWeight: 600,
                },
              }}
            >
              {block.ctaLabel}
            </Button>
          )}
        </Stack>
      </Paper>
    )
  }
  return (
    <ul style={{ margin: 0, paddingLeft: 24, color: '#333333' }}>
      {block.items.map((item, i) => (
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
