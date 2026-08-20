import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ActionIcon, Box, Group, Text } from '@mantine/core'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { createDummySlides } from './slides'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Pathway 1 — the RSD Playbook foundations deck.
 *
 * 13 slides. Each is a bleed layout: full-slide illustration behind a white
 * card at bottom-left / bottom-right / top-left / centre.
 */
export function Pathway1({ onReturnHome }: { onReturnHome: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reduce = useReducedMotion()
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
    <motion.div
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        borderRadius: 12,
        overflow: 'hidden',
        // Anchored 190px left of viewport centre — that's where the pathway 1
        // card sits on any screen wide enough to show the two-column grid.
        transformOrigin: 'calc(50% - 190px) 50%',
      }}
    >
      {/* Progress bar — thin strip along the top of the content area */}
      <Box
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
        style={{
          position: 'relative',
          height: 3,
          backgroundColor: '#E6E3DF',
          overflow: 'hidden',
          pointerEvents: 'none',
          flexShrink: 0,
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
    </motion.div>
  )
}
