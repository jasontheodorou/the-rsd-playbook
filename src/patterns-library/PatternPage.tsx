import { useEffect, useState } from 'react'
import { CATEGORIES, type LibraryPattern } from './registry'

const TRIGGER_LABEL: Record<LibraryPattern['trigger'], string> = {
  mount:  'Renders on load',
  inView: 'Plays when scrolled into view',
  scroll: 'Driven by scroll position',
  press:  'Waits for the reader to choose',
}

/**
 * One pattern, one page.
 *
 * Shaped after Symphonia's PatternPage: a wide tinted canvas holding the live
 * pattern with a "Play again" control, then a narrow reading column beneath.
 * The replay matters here more than it does in Symphonia — most of these play
 * once on mount, so without it a reader sees each animation exactly once.
 */
export function PatternPage({
  pattern,
  onBack,
}: {
  pattern: LibraryPattern
  onBack: () => void
}) {
  const Demo = pattern.demo
  const category = CATEGORIES.find((c) => c.id === pattern.category)

  // Bumping the key remounts the demo, which replays entrance animations and
  // guarantees no pattern leaks an animation frame into the next one.
  const [playKey, setPlayKey] = useState(0)
  useEffect(() => setPlayKey((k) => k + 1), [pattern.id])

  const replayable = pattern.trigger === 'inView' || pattern.trigger === 'mount' || pattern.trigger === 'scroll'

  return (
    <div className="pl-pp">
      <nav className="pl-crumb" aria-label="Breadcrumb">
        <button type="button" className="pl-link" onClick={onBack}>Patterns</button>
        <span className="pl-crumb__sep" aria-hidden="true">/</span>
        <span className="pl-crumb__here">{pattern.name}</span>
      </nav>

      <div className={`pl-canvas pl-canvas--${pattern.category}`}>
        <div className="pl-canvas__stage" key={playKey}>
          <Demo />
        </div>
        {replayable && (
          <button
            type="button"
            className="pl-canvas__play"
            onClick={() => setPlayKey((k) => k + 1)}
          >
            <span aria-hidden="true">▶</span> Play again
          </button>
        )}
      </div>

      <div className="pl-pp__body">
        <header className="pl-pp__head">
          <div className="pl-pp__labels">
            {category && <span className="pl-badge">{category.label}</span>}
            <span className={`pl-badge pl-badge--${pattern.status}`}>
              {pattern.status === 'live' ? 'In the pathway' : 'Not yet placed'}
            </span>
          </div>
          <h1 className="pl-display">{pattern.name}</h1>
          <p className="pl-pp__desc">{pattern.description}</p>
        </header>

        <section className="pl-pp__section">
          <h2 className="pl-pp__section-title">What it does</h2>
          <p className="pl-prose">{pattern.whatItDoes}</p>
        </section>

        <section className="pl-pp__section">
          <h2 className="pl-pp__section-title">Where it&rsquo;s used</h2>
          {pattern.whereUsed.length > 0 ? (
            <ul className="pl-bullets">
              {pattern.whereUsed.map((w) => (
                <li key={w.ref}>
                  {w.label}
                  <code className="pl-ref">{w.ref}</code>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pl-prose pl-prose--quiet">
              Nowhere yet. It&rsquo;s built and working, but no page has claimed it.
            </p>
          )}
        </section>

        <section className="pl-pp__section">
          <h2 className="pl-pp__section-title">Behaviour</h2>
          <ul className="pl-bullets">
            <li>{TRIGGER_LABEL[pattern.trigger]}</li>
            <li>
              {pattern.accessibility.reducedMotion === 'supported'
                ? 'Honours reduced motion — renders a complete, still state'
                : pattern.accessibility.reducedMotion === 'partial'
                ? 'Partly honours reduced motion — the composition is readable, but the effect still runs'
                : 'Does not respond to reduced motion'}
            </li>
            {pattern.accessibility.keyboard === true && <li>Operable from the keyboard</li>}
            {pattern.accessibility.keyboard === false && <li>Needs a pointer — not keyboard operable</li>}
          </ul>
        </section>

        <DeveloperDetails pattern={pattern} />

        {pattern.alsoConsidered && pattern.alsoConsidered.length > 0 && (
          <section className="pl-pp__section">
            <details className="pl-fold">
              <summary className="pl-fold__summary">
                Also considered
                <span className="pl-fold__count">{pattern.alsoConsidered.length} not shipped</span>
              </summary>
              <div className="pl-fold__body">
                <p className="pl-fold__intro">
                  Built during the design of this pattern and set aside. Kept for the record —
                  none of these are in the Playbook.
                </p>
                {pattern.alsoConsidered.map((alt) => {
                  const AltDemo = alt.demo
                  return (
                    <div className="pl-alt" key={alt.name}>
                      <h3 className="pl-alt__name">{alt.name}</h3>
                      <p className="pl-alt__note">{alt.note}</p>
                      {AltDemo && (
                        <div className="pl-alt__demo">
                          <AltDemo />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </details>
          </section>
        )}

        <footer className="pl-pp__footer">
          <button type="button" className="pl-link" onClick={onBack}>← All patterns</button>
        </footer>
      </div>
    </div>
  )
}

/** Folded away so the page reads for a designer; opened, it reads for a developer. */
function DeveloperDetails({ pattern }: { pattern: LibraryPattern }) {
  return (
    <section className="pl-pp__section">
      <details className="pl-fold">
        <summary className="pl-fold__summary">
          Developer details
          <span className="pl-fold__count">
            {pattern.files.length} {pattern.files.length === 1 ? 'file' : 'files'}
          </span>
        </summary>
        <div className="pl-fold__body">
          <dl className="pl-dl">
            <dt>Built with</dt>
            <dd>
              <ul className="pl-tags">
                {pattern.builtWith.map((t) => <li key={t} className="pl-tag">{t}</li>)}
              </ul>
            </dd>

            <dt>Weight</dt>
            <dd>{pattern.weight}</dd>

            <dt>Reduced motion</dt>
            <dd>{pattern.accessibility.reducedMotion}</dd>

            <dt>Autoplays</dt>
            <dd>{pattern.accessibility.autoplay ? 'yes' : 'no'}</dd>

            <dt>Files</dt>
            <dd>
              <ul className="pl-files">
                {pattern.files.map((f) => <li key={f}><code>{f}</code></li>)}
              </ul>
            </dd>

            <dt>Packages</dt>
            <dd>{pattern.packages.length ? pattern.packages.join(', ') : 'none'}</dd>
          </dl>
        </div>
      </details>
    </section>
  )
}
