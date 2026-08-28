import { JOURNEY, PATTERNS, patternsForPage } from './registry'

/**
 * The Pathway view — how the eight Foundations pages are composed from the
 * library. Orientation before inventory: a colleague should be able to see
 * where each pattern sits in the read before opening any of them.
 */
export function PathwayPage({ onOpen }: { onOpen: (id: string) => void }) {
  const unplaced = PATTERNS.filter((p) => p.status === 'built')

  return (
    <div className="pl-index">
      <header className="pl-index__head">
        <h1 className="pl-display">Pathway</h1>
        <p className="pl-lede">
          Foundations is eight pages, read top to bottom. This is which patterns build each one.
        </p>
      </header>

      <ol className="pl-journey">
        {JOURNEY.map((page) => {
          const used = patternsForPage(page.pageId)
          return (
            <li className="pl-journey__row" key={page.pageId}>
              <span className="pl-journey__num" aria-hidden="true">{page.num}</span>
              <div className="pl-journey__main">
                <h2 className="pl-journey__name">{page.name}</h2>
                <p className="pl-journey__note">{page.note}</p>
                {used.length > 0 && (
                  <ul className="pl-journey__uses">
                    {used.map((p) => (
                      <li key={p.id}>
                        <button type="button" className="pl-pill" onClick={() => onOpen(p.id)}>
                          {p.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {unplaced.length > 0 && (
        <section className="pl-group">
          <div className="pl-group__head">
            <h2 className="pl-group__title">Waiting for a page</h2>
            <span className="pl-group__note">
              Built, working, and not yet in the read above.
            </span>
          </div>
          <ul className="pl-journey__uses pl-journey__uses--loose">
            {unplaced.map((p) => (
              <li key={p.id}>
                <button type="button" className="pl-pill" onClick={() => onOpen(p.id)}>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
