import { PATTERNS } from './registry'

/**
 * What this room is and how to read it. Short by design — a colleague should
 * be able to finish this page and go straight to the patterns.
 */
export function AboutPage({ onOpen }: { onOpen: () => void }) {
  const live = PATTERNS.filter((p) => p.status === 'live').length
  const built = PATTERNS.filter((p) => p.status === 'built').length

  return (
    <div className="pl-index pl-index--narrow pl-about">
      <header className="pl-index__head">
        <h1 className="pl-display">About this library</h1>
        <p className="pl-lede">
          The back room of the RSD Playbook. It holds the graphical patterns the Playbook is
          built from, each one running live rather than shown as a picture.
        </p>
      </header>

      <section className="pl-pp__section">
        <h2 className="pl-pp__section-title">What&rsquo;s in it</h2>
        <ul className="pl-bullets">
          <li>{live} patterns rendering in the Foundations pathway today.</li>
          <li>{built} finished patterns with no page to sit on yet.</li>
          <li>
            Where a pattern had alternatives that were built and rejected, one or two are kept
            at the bottom of its page under &ldquo;Also considered&rdquo;.
          </li>
        </ul>
      </section>

      <section className="pl-pp__section">
        <h2 className="pl-pp__section-title">What&rsquo;s not</h2>
        <p className="pl-prose">
          Not every class in the build. Small typographic devices, layout grammar and the
          seventy-odd layout candidates that were never chosen are all left out — they would
          bury the patterns that actually do the work.
        </p>
      </section>

      <section className="pl-pp__section">
        <h2 className="pl-pp__section-title">How it stays honest</h2>
        <p className="pl-prose">
          Every demo imports the same component the pathway imports. Nothing here is a copy,
          so the library cannot drift from the product — change a pattern in Foundations and
          this page changes with it.
        </p>
      </section>

      <footer className="pl-pp__footer">
        <button type="button" className="pl-link" onClick={onOpen}>
          Go to the patterns →
        </button>
      </footer>
    </div>
  )
}
