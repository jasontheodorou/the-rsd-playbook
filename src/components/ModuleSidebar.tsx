import { Group, Stack, Text, UnstyledButton } from '@mantine/core'
import { CompleteIndicator, type IndicatorState } from './CompleteIndicator'
import type { Card } from '../lib/content'

type ModuleSidebarProps = {
  cards: Card[]
  selectedCardId: string
  completed: Set<string>
  onSelect: (id: string) => void
}

export function ModuleSidebar({ cards, selectedCardId, completed, onSelect }: ModuleSidebarProps) {
  return (
    <nav aria-label="Cards in this module">
      <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.06em' }} mb="sm">
        In this module
      </Text>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {cards.map((card) => {
          const isComplete = completed.has(card.id)
          const isSelected = card.id === selectedCardId
          const state: IndicatorState = isComplete ? 'complete' : isSelected ? 'current' : 'upcoming'

          return (
            <li key={card.id} style={{ marginBottom: 4 }}>
              <UnstyledButton
                onClick={() => onSelect(card.id)}
                aria-current={isSelected ? 'true' : undefined}
                style={{ width: '100%', borderRadius: 8 }}
              >
                <Group
                  p="sm"
                  align="center"
                  wrap="nowrap"
                  style={{
                    borderRadius: 8,
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    border: isSelected ? '1px solid #E6E3DF' : '1px solid transparent',
                  }}
                >
                  <CompleteIndicator state={state} />
                  <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                    <Text fw={isSelected ? 700 : 600} c="#333333" size="sm" style={{ lineHeight: 1.3 }}>
                      {card.title}
                    </Text>
                    <Text size="xs" c="#5C5C5C">{card.minutes} min</Text>
                  </Stack>
                </Group>
              </UnstyledButton>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
