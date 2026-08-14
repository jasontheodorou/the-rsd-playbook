import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ActionIcon, Box, Container, Group, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { OrangeCircle } from './Transform'

export type Slide = {
  id: string
  content: ReactNode
}

type SlideDeckProps = {
  slides: Slide[]
  trail: string
  onReturnHome: () => void
  countedSlides?: number
  countStart?: number
}

export function SlideDeck({ slides, trail, onReturnHome, countedSlides, countStart = 0 }: SlideDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isLast = currentIndex === slides.length - 1
  const slide = slides[currentIndex]
  const counted = countedSlides ?? slides.length
  const isCounting = currentIndex >= countStart && currentIndex < countStart + counted
  const displayIndex = currentIndex - countStart + 1
  const progress = isCounting
    ? (Math.min(displayIndex, counted) / counted) * 100
    : currentIndex < countStart ? 0 : 100
  const isDesktop = useMediaQuery('(min-width: 760px)') ?? true

  const goPrev = () => setCurrentIndex(i => Math.max(0, i - 1))
  const goNext = () => setCurrentIndex(i => i + 1)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [currentIndex])

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

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a className="skip-link" href="#slide-content">Skip to main content</a>

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
                  / {trail}
                </Text>
              </Group>
            </UnstyledButton>
            {isCounting && (
              <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.08em' }}>
                {displayIndex} / {counted}
              </Text>
            )}
          </Group>
        </Container>

        {/* Progress bar */}
        <Box
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress through the pathway"
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
      <Box
        ref={scrollRef}
        component="main"
        id="slide-content"
        style={{ flex: 1, overflowY: 'auto' }}
      >
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {slide.content}
        </motion.div>
      </Box>

      {/* Bottom nav — content-flanking buttons on desktop, floating pill on mobile */}
      {isDesktop ? (
        <>
          {/* Left — previous */}
          <Box
            component="nav"
            aria-label="Previous slide"
            style={{
              position: 'fixed',
              left: 'max(100px, calc(50% - 580px))',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
              opacity: currentIndex === 0 ? 0 : 1,
              pointerEvents: currentIndex === 0 ? 'none' : 'auto',
              transition: 'opacity 220ms ease',
            }}
          >
            <ActionIcon
              onClick={goPrev}
              disabled={currentIndex === 0}
              size={64}
              radius="xl"
              variant="transparent"
              aria-label="Previous slide"
              className="slide-nav-btn"
            >
              <ChevronLeft size={24} strokeWidth={2.5} aria-hidden />
            </ActionIcon>
          </Box>

          {/* Right — next / return home */}
          <Box
            component="nav"
            aria-label={isLast ? 'Return home' : 'Next slide'}
            style={{
              position: 'fixed',
              right: 'max(100px, calc(50% - 580px))',
              top: '50%',
              transform: 'translate(50%, -50%)',
              zIndex: 10,
            }}
          >
            <ActionIcon
              onClick={isLast ? onReturnHome : goNext}
              size={64}
              radius="xl"
              variant="transparent"
              aria-label={isLast ? 'Return home' : 'Next slide'}
              className="slide-nav-btn"
            >
              {isLast ? <RotateCcw size={22} strokeWidth={2.5} aria-hidden /> : <ChevronRight size={24} strokeWidth={2.5} aria-hidden />}
            </ActionIcon>
          </Box>
        </>
      ) : (
        <Box
          component="footer"
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingBlock: 20,
            pointerEvents: 'none',
          }}
        >
          <Group
            gap={2}
            align="center"
            wrap="nowrap"
            className="slide-nav-pill"
            style={{
              borderRadius: 999,
              padding: '6px 8px',
              pointerEvents: 'auto',
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
              className="slide-nav-pill-icon"
            >
              <ChevronLeft size={18} strokeWidth={2.5} aria-hidden />
            </ActionIcon>

            {isCounting && (
              <Text
                size="xs"
                fw={700}
                c="#5C5C5C"
                px={8}
                style={{
                  letterSpacing: '0.08em',
                  minWidth: 46,
                  textAlign: 'center',
                  userSelect: 'none',
                }}
              >
                {displayIndex} / {counted}
              </Text>
            )}

            <ActionIcon
              onClick={isLast ? onReturnHome : goNext}
              variant="transparent"
              size="lg"
              radius="xl"
              aria-label={isLast ? 'Return home' : 'Next slide'}
              className="slide-nav-pill-icon"
            >
              {isLast ? <RotateCcw size={18} strokeWidth={2.5} aria-hidden /> : <ChevronRight size={18} strokeWidth={2.5} aria-hidden />}
            </ActionIcon>
          </Group>
        </Box>
      )}

    </Box>
  )
}

export function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <Container size="md" px="md" style={{ paddingTop: 48, paddingBottom: 72 }}>
      <Stack gap="xl" maw={680} style={{ marginInline: 'auto' }}>
        {children}
      </Stack>
    </Container>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Text size="xs" fw={700} tt="uppercase" c="#5C5C5C" style={{ letterSpacing: '0.1em' }}>
      {children}
    </Text>
  )
}

export function SlideTitle({ children }: { children: ReactNode }) {
  return (
    <Title order={2} fz={42} fw={700} c="#333333" lh={1.15}>
      {children}
    </Title>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <Text c="#333333" fz={20} fw={400} lh={1.55}>
      {children}
    </Text>
  )
}

export function Body({ children }: { children: ReactNode }) {
  return (
    <Text c="#333333" fz={17} lh={1.7}>
      {children}
    </Text>
  )
}

type SlideIllustrationProps = {
  src: string
  alt?: string
  maxWidth?: number
  radius?: number
  aspectRatio?: string
  objectPosition?: string
}

export function SlideIllustration({ src, alt = '', maxWidth = 480, radius = 8, aspectRatio, objectPosition = 'center' }: SlideIllustrationProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 14 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      style={{
        width: '100%',
        maxWidth,
        display: 'block',
        marginInline: 'auto',
        borderRadius: radius,
        ...(aspectRatio
          ? { aspectRatio, objectFit: 'cover', objectPosition, height: 'auto' }
          : { height: 'auto' }),
      }}
    />
  )
}

type SlideIconProps = {
  src: string
  alt?: string
  size?: number
  align?: 'left' | 'center' | 'right'
}

export function SlideIcon({ src, alt = '', size = 240, align = 'left' }: SlideIconProps) {
  const marginInline = align === 'center' ? 'auto' : align === 'right' ? '0 0 0 auto' : undefined
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.88, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 200, delay: 0.08 }}
      style={{ width: size, height: 'auto', display: 'block', marginInline }}
    />
  )
}
