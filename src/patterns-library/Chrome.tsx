import type { ReactNode } from 'react'
import { PATTERNS } from './registry'

export type Route =
  | { view: 'patterns' }
  | { view: 'pathway' }
  | { view: 'about' }
  | { view: 'pattern'; id: string }

const NAV: Array<{ view: Route['view']; label: string }> = [
  { view: 'patterns', label: 'Patterns' },
  { view: 'pathway',  label: 'Pathway' },
  { view: 'about',    label: 'About' },
]

/**
 * Site chrome for the pattern library.
 *
 * Shaped after Symphonia's SiteChrome — sticky header, wordmark left, pill nav
 * right, active item as a filled pill — but wearing the Playbook's own
 * identity so this reads as a room inside the Playbook rather than a separate
 * product. The "Internal" tag is the honest label: this is the back room.
 */
export function Chrome({
  route,
  onNavigate,
  children,
}: {
  route: Route
  onNavigate: (r: Route) => void
  children: ReactNode
}) {
  // A pattern page is a child of Patterns, so that nav item stays lit.
  const activeView = route.view === 'pattern' ? 'patterns' : route.view
  const live = PATTERNS.filter((p) => p.status === 'live').length

  return (
    <div className="pl-chrome">
      <header className="pl-chrome__header">
        <div className="pl-chrome__row">
          <button
            type="button"
            className="pl-chrome__brand"
            onClick={() => onNavigate({ view: 'patterns' })}
          >
            <span className="pl-chrome__dot" aria-hidden="true" />
            <span className="pl-chrome__brandname">The RSD Playbook</span>
            <span className="pl-chrome__tag">Internal</span>
          </button>

          <nav className="pl-chrome__nav" aria-label="Primary">
            {NAV.map((item) => (
              <button
                key={item.view}
                type="button"
                className="pl-chrome__link"
                aria-current={activeView === item.view ? 'page' : undefined}
                onClick={() => onNavigate({ view: item.view } as Route)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="pl-chrome__main">{children}</main>

      <footer className="pl-chrome__footer">
        <div className="pl-chrome__row pl-chrome__row--footer">
          <span className="pl-chrome__muted">
            Pattern library · {live} patterns live in the Foundations pathway
          </span>
          <a className="pl-chrome__muted pl-chrome__out" href="/foundations">
            Open the pathway ↗
          </a>
        </div>
      </footer>
    </div>
  )
}
