import { useState } from 'react'
import { PATTERNS, CATEGORIES, type LibraryPattern, type PatternCategory } from './registry'

type Filter = PatternCategory | 'all'

/* Demos render into a fixed 720px column (see demos.tsx). Tiles are ~382px
   wide, so this scales the column to sit inside the tile with the tint showing
   at the edges. Uniform across the grid so the cards read as a set; taller
   patterns centre-crop rather than shrink further. */
const TILE_SCALE = 0.48

/**
 * The patterns index.
 *
 * Cards carry a live demo in a tinted tile, as Symphonia's PatternCard does —
 * a colleague should recognise the pattern from the grid, not read a label and
 * guess. Grouped by status, so "what's in the pathway" and "what's built and
 * waiting" are answered before any filtering happens.
 */
export function PatternsIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const [filter, setFilter] = useState<Filter>('all')

  const visible = filter === 'all' ? PATTERNS : PATTERNS.filter((p) => p.category === filter)
  const live = visible.filter((p) => p.status === 'live')
  const built = visible.filter((p) => p.status === 'built')
  const activeCategory = CATEGORIES.find((c) => c.id === filter)

  const countFor = (f: Filter) =>
    f === 'all' ? PATTERNS.length : PATTERNS.filter((p) => p.category === f).length

  return (
    <div className="pl-index">
      <header className="pl-index__head">
        <h1 className="pl-display">Patterns</h1>
        <p className="pl-lede">
          The graphical patterns of the Playbook — every one live in the page, not a
          screenshot. Open any of them for what it does, where it sits, and what it&rsquo;s made of.
        </p>
      </header>

      <nav className="pl-subnav" aria-label="Filter by category">
        <Chip active={filter === 'all'} count={countFor('all')} onClick={() => setFilter('all')}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            active={filter === c.id}
            count={countFor(c.id)}
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </Chip>
        ))}
      </nav>

      {activeCategory && <p className="pl-subnav__note">{activeCategory.description}</p>}

      {live.length > 0 && (
        <Group
          title="In the pathway"
          note="Rendering in Foundations right now."
          patterns={live}
          onOpen={onOpen}
        />
      )}

      {built.length > 0 && (
        <Group
          title="Built, not yet placed"
          note="Finished and working. No page uses them yet."
          patterns={built}
          onOpen={onOpen}
        />
      )}
    </div>
  )
}

function Group({
  title,
  note,
  patterns,
  onOpen,
}: {
  title: string
  note: string
  patterns: LibraryPattern[]
  onOpen: (id: string) => void
}) {
  return (
    <section className="pl-group">
      <div className="pl-group__head">
        <h2 className="pl-group__title">{title}</h2>
        <span className="pl-group__note">{note}</span>
      </div>
      <ul className="pl-grid">
        {patterns.map((p) => (
          <li key={p.id}>
            <Card pattern={p} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Card({
  pattern,
  onOpen,
}: {
  pattern: LibraryPattern
  onOpen: (id: string) => void
}) {
  const Demo = pattern.cardDemo ?? pattern.demo
  return (
    /* Not a button. The tile mounts real patterns, several of which contain
       their own buttons, and interactive content cannot nest. Instead the
       pattern name is the single control and its ::after stretches over the
       whole card, so the card is clickable but the DOM stays valid. `inert`
       takes the tile out of the tab order and the accessibility tree. */
    <article className="pl-card">
      <div
        className={`pl-card__art pl-card__art--${pattern.category}`}
        aria-hidden="true"
        inert
      >
        <div
          className="pl-card__scale"
          style={{ transform: `scale(${pattern.cardScale ?? TILE_SCALE})` }}
        >
          <Demo />
        </div>
      </div>
      <div className="pl-card__caption">
        <h3 className="pl-card__heading">
          <button
            type="button"
            className="pl-card__name"
            onClick={() => onOpen(pattern.id)}
          >
            {pattern.name}
          </button>
        </h3>
        <p className="pl-card__desc">{pattern.description}</p>
        {pattern.status === 'built' && (
          <span className="pl-card__flag">Not yet placed</span>
        )}
      </div>
    </article>
  )
}

function Chip({
  children,
  active,
  count,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  count: number
  onClick: () => void
}) {
  return (
    <button type="button" className="pl-chip" aria-pressed={active} onClick={onClick}>
      {children}
      <span className="pl-chip__count">{count}</span>
    </button>
  )
}
