import type { CSSProperties, ReactNode } from 'react'

type OrangeCircleProps = {
  size?: number
  opacity?: number
  ring?: boolean
  style?: CSSProperties
}

export function OrangeCircle({ size = 12, opacity = 1, ring = false, style }: OrangeCircleProps) {
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: '50%',
        backgroundColor: '#EC671B',
        opacity: Math.max(opacity, 0.7),
        ...(ring && { boxShadow: '0 0 0 2px #ffffff' }),
        ...style,
      }}
    />
  )
}

type HighlightedHeadlineProps = {
  before?: ReactNode
  accent: ReactNode
  after?: ReactNode
  size?: number
}

export function HighlightedHeadline({ before, accent, after, size = 42 }: HighlightedHeadlineProps) {
  return (
    <h1
      style={{
        fontSize: size,
        lineHeight: 1.2,
        fontWeight: 700,
        color: '#333333',
        margin: 0,
        fontFamily: "'Open Sans', sans-serif",
      }}
    >
      {before && <>{before} </>}
      <span
        style={{
          textDecoration: 'underline',
          textDecorationColor: '#EC671B',
          textDecorationThickness: 5,
          textUnderlineOffset: 6,
        }}
      >
        {accent}
      </span>
      {after}
    </h1>
  )
}
