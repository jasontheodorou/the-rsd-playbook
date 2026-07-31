export type IndicatorState = 'complete' | 'current' | 'upcoming'

type CompleteIndicatorProps = {
  state: IndicatorState
  size?: number
}

export function CompleteIndicator({ state, size = 24 }: CompleteIndicatorProps) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
  } as const

  if (state === 'complete') {
    return (
      <span role="img" aria-label="Complete" style={{ ...base, backgroundColor: '#213D59' }}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 7L6 10L11 4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }

  if (state === 'current') {
    return (
      <span role="img" aria-label="Currently viewing" style={{ ...base, backgroundColor: '#213D59' }}>
        <span aria-hidden style={{ width: size * 0.35, height: size * 0.35, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
      </span>
    )
  }

  return (
    <span role="img" aria-label="Not started" style={{ ...base, border: '2px solid #8A8583', backgroundColor: 'transparent' }} />
  )
}
