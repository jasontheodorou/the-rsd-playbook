import type { ReactNode } from 'react'
import './SplitTonePanel.css'

type SplitTonePanelProps = {
  label: string
  children: ReactNode
}

/**
 * Horizontal panel bisected into two coloured bands: mist-cyan label
 * strip at the top, tinted-paper body below. Uses the pathway 1 palette.
 */
export function SplitTonePanel({ label, children }: SplitTonePanelProps) {
  return (
    <div className="split-tone-panel">
      <div className="split-tone-panel__band">
        <span className="split-tone-panel__label">{label}</span>
      </div>
      <div className="split-tone-panel__body">{children}</div>
    </div>
  )
}
