import { useState } from 'react'
import { AccessGate, isGateOpen } from './components/AccessGate'
import { getSession, signOut, getProfile, saveProfile, getProgress, saveProgress } from './lib/auth'
import { HomePage } from './components/HomePage'
import { SlideDeck } from './components/SlideDeck'
import { PracticeForm, type PracticeProfile } from './components/PracticeForm'
import { SignIn } from './pages/SignIn'
import { ModuleView } from './pages/ModuleView'
import { LayoutPreview } from './pages/LayoutPreview'
import { createFoundationSlides } from './slides/foundations'

type View =
  | { type: 'home' }
  | { type: 'foundations' }
  | { type: 'sign-in' }
  | { type: 'practice-form' }
  | { type: 'modules'; profile: PracticeProfile }
  | { type: 'layout-preview' }

export default function App() {
  const [gateOpen, setGateOpen] = useState(() => isGateOpen())
  const [view, setView] = useState<View>({ type: 'home' })
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getSession())
  const [completed, setCompleted] = useState<Set<string>>(() => getProgress())

  if (!gateOpen) return <AccessGate onUnlock={() => setGateOpen(true)} />

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

  if (view.type === 'sign-in') {
    return (
      <SignIn
        onReturnHome={goHome}
        onSignedIn={handleSignIn}
      />
    )
  }

  if (view.type === 'layout-preview') {
    return <LayoutPreview onReturnHome={goHome} />
  }

  if (view.type === 'foundations') {
    return (
      <SlideDeck
        slides={createFoundationSlides({
          onReturnHome: goHome,
          onNextPathway: handlePracticeClick,
        })}
        trail="Explore the foundations"
        onReturnHome={goHome}
        countedSlides={10}
        countStart={1}
      />
    )
  }

  if (view.type === 'practice-form') {
    return (
      <PracticeForm
        onReturnHome={goHome}
        onSubmit={(profile) => {
          saveProfile(profile)
          setView({ type: 'modules', profile })
        }}
      />
    )
  }

  if (view.type === 'modules') {
    return (
      <ModuleView
        profile={view.profile}
        userEmail={getSession()?.email ?? ''}
        completed={completed}
        onToggleComplete={toggleComplete}
        onReturnHome={goHome}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
      />
    )
  }

  return (
    <>
      <HomePage
        onFoundations={() => setView({ type: 'foundations' })}
        onPractice={handlePracticeClick}
        isLoggedIn={isLoggedIn}
        onSignIn={() => setView({ type: 'sign-in' })}
        onSignOut={handleSignOut}
      />
    </>
  )
}
