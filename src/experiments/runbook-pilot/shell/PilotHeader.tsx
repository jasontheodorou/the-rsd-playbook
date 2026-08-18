import type { PatternTheme } from '../registry'

type Props = {
  theme: PatternTheme
  reduced: boolean
  onToggleTheme: () => void
  onToggleReduced: () => void
}

/**
 * Sticky header with title, purpose, and the two shell controls.
 * Kept deliberately quiet — this is a workshop, not a marketing page.
 */
export function PilotHeader({ theme, reduced, onToggleTheme, onToggleReduced }: Props) {
  return (
    <header className="rp-header">
      <div className="rp-header__left">
        <span className="rp-eyebrow">Internal · experimental</span>
        <h1 className="rp-title">Runbook Pilot</h1>
        <p className="rp-subtitle">
          A controlled workshop for developing editorial visual patterns before any of them
          are introduced into the main product. Patterns here are unstyled experiments —
          not production commitments.
        </p>
      </div>
      <div className="rp-header__controls">
        <button
          type="button"
          className="rp-toggle"
          aria-pressed={theme === 'dark'}
          onClick={onToggleTheme}
        >
          <span className="rp-toggle__dot" aria-hidden="true" />
          {theme === 'dark' ? 'Dark canvas' : 'Light canvas'}
        </button>
        <button
          type="button"
          className="rp-toggle"
          aria-pressed={reduced}
          onClick={onToggleReduced}
        >
          <span className="rp-toggle__dot" aria-hidden="true" />
          Reduced motion
        </button>
      </div>
    </header>
  )
}
