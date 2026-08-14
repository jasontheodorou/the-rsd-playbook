import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ActionIcon, Box, Container, Group, Text, Title, UnstyledButton } from '@mantine/core'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { OrangeCircle } from '../components/Transform'
import { createDummySlides } from './slides'

/**
 * Pathway 1 — the RSD Playbook foundations deck.
 *
 * 13 slides. Each is a bleed layout: full-slide illustration behind a white
 * card at bottom-left / bottom-right / top-left / centre.
 */
export function Pathway1({ onReturnHome }: { onReturnHome: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slides = createDummySlides({ onJump: setCurrentIndex })
  const slide = slides[currentIndex]
  const isLast = currentIndex === slides.length - 1

  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const goNext = () => setCurrentIndex(i => i + 1)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) setCurrentIndex(i => i + 1)
      else if (e.key === 'ArrowLeft' && currentIndex > 0) setCurrentIndex(i => i - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentIndex, slides.length])

  const progress = ((currentIndex + 1) / slides.length) * 100

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top bar */}
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
            <UnstyledButton onClick={onReturnHome} aria-label="Return to home">
              <Group gap="sm" align="center" wrap="nowrap">
                <OrangeCircle size={12} />
                <Title order={1} fz={15} fw={700} c="#333333" lh={1}>
                  The RSD Playbook
                </Title>
                <Text fz={13} c="#5C5C5C" lh={1} ml={4}>
                  / Explore the foundations
                </Text>
              </Group>
            </UnstyledButton>
            <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.08em' }}>
              {currentIndex + 1} / {slides.length}
            </Text>
          </Group>
        </Container>

        <Box
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#E6E3DF',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <Box
            style={{
              height: '100%',
              width: '100%',
              transformOrigin: 'left center',
              transform: `scaleX(${progress / 100})`,
              backgroundColor: '#213D59',
              transition: 'transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1)',
              willChange: 'transform',
            }}
          />
        </Box>
      </Box>

      {/* Slide content */}
      <Box component="main" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ height: '100%' }}
        >
          {slide.content}
        </motion.div>
      </Box>

      {/* Bottom-centre pill — the only nav for the experiment.
          Sits below the slide, out of any content's way. */}
      <Box
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}
      >
        <Group
          gap={2}
          align="center"
          wrap="nowrap"
          style={{
            backgroundColor: 'rgba(33, 61, 89, 0.90)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: '6px 8px',
            boxShadow: '0 10px 30px rgba(33, 61, 89, 0.22)',
          }}
          aria-label="Slide navigation"
        >
          <ActionIcon
            onClick={goPrev}
            disabled={currentIndex === 0}
            variant="transparent"
            size="lg"
            radius="xl"
            aria-label="Previous slide"
            style={{ color: '#ffffff' }}
          >
            <ChevronLeft size={18} strokeWidth={2.5} aria-hidden />
          </ActionIcon>

          <Text
            size="xs"
            fw={700}
            c="#ffffff"
            px={10}
            style={{
              letterSpacing: '0.1em',
              minWidth: 52,
              textAlign: 'center',
              userSelect: 'none',
              opacity: 0.9,
            }}
          >
            {currentIndex + 1} / {slides.length}
          </Text>

          <ActionIcon
            onClick={isLast ? onReturnHome : goNext}
            variant="transparent"
            size="lg"
            radius="xl"
            aria-label={isLast ? 'Return home' : 'Next slide'}
            style={{ color: '#ffffff' }}
          >
            {isLast ? <RotateCcw size={18} strokeWidth={2.5} aria-hidden /> : <ChevronRight size={18} strokeWidth={2.5} aria-hidden />}
          </ActionIcon>
        </Group>
      </Box>
    </Box>
  )
}
