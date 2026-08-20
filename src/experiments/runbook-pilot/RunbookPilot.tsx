import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { patterns, findPatternById, type PatternTheme } from './registry'
import { PilotHeader } from './shell/PilotHeader'
import { PilotIndex } from './shell/PilotIndex'
import { PilotStage } from './shell/PilotStage'
import './RunbookPilot.css'

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/**
 * Runbook Pilot — /experiments/runbook-pilot
 *
 * A workshop route. Loads a pattern registry, presents them in a narrow
 * index, and renders one at a time in a stable stage. Deep-linkable via
 * `?pattern=<id>`; falls back to the first pattern otherwise.
 */
export function RunbookPilot({ onReturnHome: _onReturnHome }: { onReturnHome: () => void }) {
  const reduceOS = useReducedMotion()

  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window === 'undefined') return patterns[0].id
    const params = new URLSearchParams(window.location.search)
    const requested = findPatternById(params.get('pattern'))
    return requested?.id ?? patterns[0].id
  })

  // Shell-scoped toggles. Reduced motion defaults to OS preference, but the
  // user can force it on for testing without changing system settings.
  const [reducedOverride, setReducedOverride] = useState(false)
  const reduced = reduceOS || reducedOverride

  const active = findPatternById(activeId) ?? patterns[0]
  const [theme, setTheme] = useState<PatternTheme>(active.defaultTheme ?? 'dark')

  // Whenever the active pattern changes, sync its default theme and push the
  // id into the URL so links are shareable and back/forward works.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (url.searchParams.get('pattern') !== activeId) {
      url.searchParams.set('pattern', activeId)
      window.history.replaceState(null, '', url.toString())
    }
    const p = findPatternById(activeId)
    if (p?.defaultTheme) setTheme(p.defaultTheme)
  }, [activeId])

  return (
    <motion.div
      className="rp-root"
      data-theme={theme}
      initial={reduceOS ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduceOS ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduceOS ? { duration: 0.2 } : GROW_TRANSITION}
      style={{ transformOrigin: 'calc(50% - 190px) 50%' }}
    >
      <PilotHeader
        theme={theme}
        reduced={reduced}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onToggleReduced={() => setReducedOverride((r) => !r)}
      />
      <div className="rp-body">
        <PilotIndex patterns={patterns} activeId={activeId} onSelect={setActiveId} />
        <div className="rp-scroll">
          <PilotStage pattern={active} reduced={reduced} theme={theme} />
        </div>
      </div>
    </motion.div>
  )
}
