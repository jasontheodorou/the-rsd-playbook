import type { PilotPattern } from '../registry'

type Props = {
  patterns: PilotPattern[]
  activeId: string
  onSelect: (id: string) => void
}

/**
 * Narrow sidebar listing patterns. One row per pattern with a numeric prefix,
 * name, and status pill. Keyboard-navigable; the active row is signalled via
 * `aria-current`.
 */
export function PilotIndex({ patterns, activeId, onSelect }: Props) {
  return (
    <nav className="rp-index" aria-label="Pattern index">
      <span className="rp-index__label">Patterns</span>
      {patterns.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className="rp-index__item"
          aria-current={p.id === activeId ? 'true' : undefined}
          onClick={() => onSelect(p.id)}
        >
          <span className="rp-index__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="rp-index__name">{p.name}</span>
          <span className="rp-index__status" data-status={p.status}>{p.status}</span>
        </button>
      ))}
    </nav>
  )
}
