import { Group, Stack, Text } from '@mantine/core'
import { SlideDeck, SlideFrame, SlideIllustration, SlideIcon, Eyebrow, SlideTitle } from '../components/SlideDeck'
import { OrangeCircle } from '../components/Transform'

type Props = { onReturnHome: () => void }

const img = (seed: string, w = 680, h = 400) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

function Lines({ items }: { items: string[] }) {
  return (
    <Stack gap="sm">
      {items.map(line => (
        <Text key={line} c="#333333" fz={20} lh={1.6}>{line}</Text>
      ))}
    </Stack>
  )
}

function DotList({ items }: { items: string[] }) {
  return (
    <Stack gap={0}>
      {items.map(item => (
        <Group key={item} gap="md" align="flex-start" wrap="nowrap" py={10}
          style={{ borderBottom: '1px solid #E6E3DF' }}>
          <OrangeCircle size={7} style={{ marginTop: 7, flexShrink: 0 }} />
          <Text c="#333333" fz={17} lh={1.6}>{item}</Text>
        </Group>
      ))}
    </Stack>
  )
}

function LabelTag({ children }: { children: React.ReactNode }) {
  return (
    <Text fz={11} fw={700} tt="uppercase"
      style={{
        letterSpacing: '0.12em', color: '#ffffff', backgroundColor: '#EC671B',
        display: 'inline-block', padding: '4px 10px', borderRadius: 4,
      }}>
      {children}
    </Text>
  )
}

const lines = [
  'We create clarity where things are complex.',
  'Better decisions, made together.',
  'Grounded in people, places and systems.',
  'Design with purpose. Outcomes that matter.',
]

const listItems = [
  'Solve root causes rather than symptoms',
  'Reduce waste and duplication',
  'Build trust and legitimacy',
  'Support learning and adaptation',
  'Create prevention and long-term value',
  'Enable collaboration and systemic change',
]

export function LayoutPreview({ onReturnHome }: Props) {
  return (
    <SlideDeck
      trail="Layout preview"
      onReturnHome={onReturnHome}
      slides={[

        // ── Layout 2 — Image between header and content ───────────────────────
        {
          id: 'layout-2',
          content: (
            <SlideFrame>
              <LabelTag>Layout 2 — Image between header and content</LabelTag>
              <Stack gap="sm">
                <Eyebrow>What we do</Eyebrow>
                <SlideTitle>Turning uncertainty into possibility.</SlideTitle>
              </Stack>
              <SlideIllustration src={img('between', 680, 320)} maxWidth={680} radius={10} />
              <Lines items={lines} />
            </SlideFrame>
          ),
        },

        // ── Layout 2b — Icon between header and content ───────────────────────
        {
          id: 'layout-2b',
          content: (
            <SlideFrame>
              <LabelTag>Layout 2b — Icon between header and content</LabelTag>
              <Stack gap="sm">
                <Eyebrow>What we do</Eyebrow>
                <SlideTitle>Turning uncertainty into possibility.</SlideTitle>
              </Stack>
              <SlideIcon src={img('icon', 300, 300)} size={240} align="left" />
              <Lines items={lines} />
            </SlideFrame>
          ),
        },

        // ── Layout 3 — Image below content ────────────────────────────────────
        {
          id: 'layout-3',
          content: (
            <SlideFrame>
              <LabelTag>Layout 3 — Image below content</LabelTag>
              <Stack gap="sm">
                <Eyebrow>Why it matters</Eyebrow>
                <SlideTitle>Good design earns trust.</SlideTitle>
              </Stack>
              <DotList items={listItems} />
              <SlideIllustration src={img('below', 680, 300)} maxWidth={680} radius={10} />
            </SlideFrame>
          ),
        },

        // ── Layout 4 — Image mid-list ─────────────────────────────────────────
        {
          id: 'layout-4',
          content: (
            <SlideFrame>
              <LabelTag>Layout 4 — Image mid-list</LabelTag>
              <Stack gap="sm">
                <Eyebrow>Why it matters</Eyebrow>
                <SlideTitle>Good design earns trust.</SlideTitle>
              </Stack>
              <DotList items={listItems.slice(0, 3)} />
              <SlideIllustration src={img('midlist', 680, 240)} maxWidth={680} radius={10} />
              <DotList items={listItems.slice(3)} />
            </SlideFrame>
          ),
        },

      ]}
    />
  )
}
