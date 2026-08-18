import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AccessGate, isGateOpen } from './components/AccessGate'
import { getSession, signOut, getProfile, saveProfile, getProgress, saveProgress } from './lib/auth'
import { HomePage } from './components/HomePage'
import { PracticeForm, type PracticeProfile } from './components/PracticeForm'
import { TopBar } from './components/TopBar'
import { SignIn } from './pages/SignIn'
import { ModuleView } from './pages/ModuleView'
import { LayoutPreview } from './pages/LayoutPreview'
import { Layouts } from './pages/Layouts'
import { PastePage } from './pages/PastePage'
import { DemoPage } from './pages/DemoPage'
import { Pathway1 } from './pathway1/Pathway1'
import { Pilot2 } from './experiments/pilot-2/Pilot2'
import { Pilot3 } from './experiments/pilot-3/Pilot3'
import { RunbookPilot } from './experiments/runbook-pilot/RunbookPilot'

type View =
  | { type: 'home' }
  | { type: 'foundations' }
  | { type: 'pilot-2' }
  | { type: 'pilot-3' }
  | { type: 'runbook-pilot' }
  | { type: 'sign-in' }
  | { type: 'practice-form' }
  | { type: 'modules'; profile: PracticeProfile }
  | { type: 'layout-preview' }
  | { type: 'layouts' }

const GROW_TRANSITION = { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

function getTrail(view: View): string | undefined {
  switch (view.type) {
    case 'foundations':   return 'Explore the foundations'
    case 'pilot-2':       return 'Layout catalogue'
    case 'pilot-3':       return 'Follow-on layouts'
    case 'runbook-pilot': return 'Runbook pilot'
    case 'sign-in':       return 'Sign in'
    case 'practice-form': return 'Master your practice'
    case 'modules':       return 'Master your practice'
    case 'layout-preview':return 'Layout preview'
    case 'layouts':       return 'Layout catalogue'
    default:              return undefined
  }
}

function Pathway2Shell({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { scale: 0.32, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { scale: 0.32, opacity: 0 }}
      transition={reduce ? { duration: 0.2 } : GROW_TRANSITION}
      style={{
        position: 'absolute',
        inset: 0,
        background: '#ffffff',
        borderRadius: 12,
        overflow: 'auto',
        // Anchored 190px right of viewport centre — the pathway 2 card slot.
        transformOrigin: 'calc(50% + 190px) 50%',
      }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const [gateOpen, setGateOpen] = useState(() => isGateOpen())
  const [view, setView] = useState<View>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/experiments/pilot')   return { type: 'foundations' }
      if (window.location.pathname === '/experiments/pilot-2') return { type: 'pilot-2' }
      if (window.location.pathname === '/experiments/pilot-3') return { type: 'pilot-3' }
      if (window.location.pathname === '/experiments/runbook-pilot') return { type: 'runbook-pilot' }
      if (window.location.pathname === '/layouts') return { type: 'layouts' }
    }
    return { type: 'home' }
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getSession())
  const [completed, setCompleted] = useState<Set<string>>(() => getProgress())

  if (!gateOpen) return <AccessGate onUnlock={() => setGateOpen(true)} />

  const isPasteRoute = typeof window !== 'undefined' && window.location.pathname === '/paste'
  if (isPasteRoute) return <PastePage />

  const isDemoRoute = typeof window !== 'undefined' && window.location.pathname === '/demo'
  if (isDemoRoute) return <DemoPage />

  const goHome = () => setView({ type: 'home' })

  const handlePracticeClick = () => {
    if (!isLoggedIn) {
      setView({ type: 'sign-in' })
      return
    }
    const profile = getProfile()
    if (profile) {
      setView({ type: 'modules', profile })
    } else {
      setView({ type: 'practice-form' })
    }
  }

  const handleSignIn = () => {
    setIsLoggedIn(true)
    const profile = getProfile()
    if (profile) {
      setView({ type: 'modules', profile })
    } else {
      setView({ type: 'practice-form' })
    }
  }

  const handleSignOut = () => {
    signOut()
    setIsLoggedIn(false)
    setCompleted(new Set())
    setView({ type: 'home' })
  }

  const toggleComplete = (cardId: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(cardId)) next.delete(cardId)
      else next.add(cardId)
      saveProgress(next)
      return next
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', overflow: 'hidden' }}>
      {/* Persistent top bar — always mounted, never scaled. Content below animates. */}
      <TopBar
        trail={getTrail(view)}
        onHome={goHome}
        isLoggedIn={isLoggedIn}
        userEmail={getSession()?.email ?? undefined}
        onSignIn={() => setView({ type: 'sign-in' })}
        onSignOut={handleSignOut}
      />

      <div style={{
        flex: 1,
        minHeight: 0,
        position: 'relative',
      }}>
        <AnimatePresence mode="sync" initial={false}>
          {view.type === 'layout-preview' && (
            <LayoutPreview key="layout-preview" onReturnHome={goHome} />
          )}

          {view.type === 'foundations' && (
            <Pathway1 key="foundations" onReturnHome={goHome} />
          )}

          {view.type === 'pilot-2' && (
            <Pilot2 key="pilot-2" onReturnHome={goHome} />
          )}

          {view.type === 'pilot-3' && (
            <Pilot3 key="pilot-3" onReturnHome={goHome} />
          )}

          {view.type === 'runbook-pilot' && (
            <RunbookPilot key="runbook-pilot" onReturnHome={goHome} />
          )}

          {view.type === 'layouts' && (
            <Layouts key="layouts" onReturnHome={goHome} />
          )}

          {view.type === 'sign-in' && (
            <Pathway2Shell key="sign-in">
              <SignIn onReturnHome={goHome} onSignedIn={handleSignIn} />
            </Pathway2Shell>
          )}

          {view.type === 'practice-form' && (
            <Pathway2Shell key="practice-form">
              <PracticeForm
                onReturnHome={goHome}
                onSubmit={(profile) => {
                  saveProfile(profile)
                  setView({ type: 'modules', profile })
                }}
              />
            </Pathway2Shell>
          )}

          {view.type === 'modules' && (
            <Pathway2Shell key="modules">
              <ModuleView
                profile={view.profile}
                userEmail={getSession()?.email ?? ''}
                completed={completed}
                onToggleComplete={toggleComplete}
                onReturnHome={goHome}
                isLoggedIn={isLoggedIn}
                onSignOut={handleSignOut}
              />
            </Pathway2Shell>
          )}

          {view.type === 'home' && (
            <HomePage
              key="home"
              onFoundations={() => setView({ type: 'foundations' })}
              onPractice={handlePracticeClick}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
