import { useEffect, useState, type ReactNode } from 'react'
import type { PilotPattern, PatternProps } from '../registry'

type Props = {
  pattern: PilotPattern
  reduced: boolean
  theme: 'light' | 'dark'
  slot?: ReactNode
}

/**
 * The stage holds a single pattern at a time. Every time the pattern id
 * changes we bump a `key`, forcing a fresh mount so patterns cannot leak
 * subscriptions or animation frames between one another.
 */
export function PilotStage({ pattern, reduced, theme }: Props) {
  const [mountKey, setMountKey] = useState(0)

  useEffect(() => {
    setMountKey((k) => k + 1)
  }, [pattern.id])

  const Component = pattern.component
  const props: PatternProps = { reduced, theme }

  return (
    <div className="rp-stage-wrap">
      <div className="rp-stage-meta">
        <div>
          <h2 className="rp-stage-meta__title">{pattern.name}</h2>
          <p className="rp-stage-meta__desc">{pattern.description}</p>
        </div>
        <div className="rp-stage-meta__tags">
          {pattern.tags.map((t) => (
            <span key={t} className="rp-tag">{t}</span>
          ))}
        </div>
      </div>
      <div className="rp-stage" data-pattern-id={pattern.id}>
        <Component key={mountKey} {...props} />
      </div>
    </div>
  )
}
