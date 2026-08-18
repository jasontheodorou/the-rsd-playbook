import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, useScroll } from 'framer-motion'
import { PILOT_PAGES, PILOT_CHAPTERS, chapterIndexForPage } from './pages'
import { PageExpansion } from './expansions'
import './Pathway1.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Pathway1 — the foundations module as a click-through of vertical pages.
 * Mounted inside the RSD Playbook shell, so it doesn't render its own home
 * affordance — the persistent TopBar owns wordmark + navigation.
 */
export function Pathway1({ onReturnHome }: { onReturnHome: () => void }) {
  const [index, setIndex] = useState(0)
  const [chaptersOpen, setChaptersOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const page = PILOT_PAGES[index]
  const isLast = index === PILOT_PAGES.length - 1
  const activeChapter = chapterIndexForPage(index)

  // Drives the vertical bar — grows top-to-bottom as the current page scrolls.
  const { scrollYProgress } = useScroll({ container: scrollRef })

  const advance = () => {
    if (isLast) return onReturnHome()
    setIndex((i) => Math.min(PILOT_PAGES.length - 1, i + 1))
  }

  const jumpToChapter = (chapterIdx: number) => {
    setIndex(PILOT_CHAPTERS[chapterIdx].startIndex)
    setChaptersOpen(false)
  }

  const resetScroll = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }

  useEffect(() => {
    resetScroll()
  }, [index])

  useEffect(() => {
    if (!chaptersOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChaptersOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [chaptersOpen])

  const accent = page.accent ?? '#D8B4A3'
  const accentHover = page.accentHover ?? '#C69A87'
  const accentTrack = page.accentTrack ?? 'rgba(216, 180, 163, 0.28)'

  // Unified background across all chapters — the Head, Heart, Hands
  // butter cream reads warm without swinging tone chapter-to-chapter.
  const bg = '#FDFAF2'

  return (
    <motion.div
      className="pilot-root"
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{
        position: 'absolute',
        inset: 0,
        transformOrigin: 'calc(50% - 190px) 50%',
        ['--pilot-accent' as string]: accent,
        ['--pilot-accent-hover' as string]: accentHover,
        ['--pilot-accent-track' as string]: accentTrack,
        background: bg,
      } as React.CSSProperties}
    >
      {/* Full-bleed background video (welcome page only) — sits at root
          level so it extends behind the rail and hamburger. */}
      {page.video && (
        <>
          <video
            key={`bg-${page.id}`}
            className="pilot-bg-video"
            src={page.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="pilot-bg-scrim" aria-hidden="true" />
        </>
      )}

      {/* Chapter hamburger — small orange square on the left edge. */}
      <button
        type="button"
        className="pilot-hamburger"
        aria-label={chaptersOpen ? 'Close chapters' : 'Open chapters'}
        aria-expanded={chaptersOpen}
        onClick={() => setChaptersOpen((v) => !v)}
      >
        <span className="pilot-hamburger__lines" data-open={chaptersOpen ? 'true' : 'false'} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {chaptersOpen && (
          <>
            <motion.div
              key="scrim"
              className="pilot-chapscrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setChaptersOpen(false)}
            />
            <motion.aside
              key="panel"
              className="pilot-chappanel"
              role="dialog"
              aria-label="Chapters"
              initial={reduce ? { opacity: 0 } : { x: -32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { x: -32, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.65, 0, 0.45, 1] }}
            >
              <div className="pilot-chappanel__label">Chapters</div>
              <ol className="pilot-chappanel__list">
                {PILOT_CHAPTERS.map((chapter, i) => {
                  const isCurrent = i === activeChapter
                  return (
                    <li key={chapter.id}>
                      <button
                        type="button"
                        className="pilot-chappanel__item"
                        aria-current={isCurrent}
                        onClick={() => jumpToChapter(i)}
                      >
                        <span className="pilot-chappanel__num">{chapter.num}</span>
                        <span className="pilot-chappanel__name">{chapter.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Left rail — progress bar on the left, hairline divider on the right. */}
      <div className="pilot-rail" aria-hidden="true">
        <div className="pilot-vribbon">
          <motion.div
            className="pilot-vribbon__fill"
            style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          />
        </div>
      </div>

      <div ref={scrollRef} className="pilot-scroll">
        <AnimatePresence mode="wait" initial={false} onExitComplete={resetScroll}>
          <motion.article
            key={page.id}
            className={`pilot-page ${page.video ? 'pilot-page--video' : ''}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.45, 1] }}
          >
            {page.video ? (
              <div className="pilot-page__card">
                <span className="pilot-marker">
                  <span className="pilot-marker__num">{page.num}</span>
                  <span className="pilot-marker__rule" aria-hidden="true" />
                  <span>{page.section}</span>
                </span>
                <h1 className="pilot-page__headline">{page.headline}</h1>
                <p className="pilot-page__lede">{page.body[0]}</p>
                <p className="pilot-page__lede">{page.body[1]}</p>
                <button type="button" className="pilot-next" onClick={advance}>
                  <span className="pilot-next__label">
                    {isLast ? 'Finish' : 'Continue'}
                  </span>
                  <span className="pilot-next__meta">
                    {isLast ? 'Return home' : `Next · ${PILOT_PAGES[index + 1].section}`}
                  </span>
                  <span className="pilot-next__arrow" aria-hidden="true">→</span>
                </button>
              </div>
            ) : (
              <>
                <header className="pilot-page__head">
                  <span className="pilot-marker">
                    <span className="pilot-marker__num">{page.num}</span>
                    <span className="pilot-marker__rule" aria-hidden="true" />
                    <span>{page.section}</span>
                  </span>
                </header>

                <div className="pilot-page__body">
                  <div className="pilot-page__text">
                    <h1 className="pilot-page__headline">{page.headline}</h1>
                    <p className="pilot-page__lede">{page.body[0]}</p>
                    <p className="pilot-page__lede">{page.body[1]}</p>
                  </div>

                  <div className="pilot-page__art">
                    <img src={page.image} alt="" />
                  </div>
                </div>

                <PageExpansion pageId={page.id} />

                <footer className="pilot-page__foot">
                  <button type="button" className="pilot-next" onClick={advance}>
                    <span className="pilot-next__label">
                      {isLast ? 'Finish' : 'Continue'}
                    </span>
                    <span className="pilot-next__meta">
                      {isLast ? 'Return home' : `Next · ${PILOT_PAGES[index + 1].section}`}
                    </span>
                    <span className="pilot-next__arrow" aria-hidden="true">→</span>
                  </button>
                </footer>
              </>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
