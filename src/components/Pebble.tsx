import type { CSSProperties } from 'react'
import { Box } from '@mantine/core'

type PebbleProps = {
  variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  size: number
  rotate?: number
  opacity?: number
  style?: CSSProperties
  visibleFrom?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export function Pebble({ variant, size, rotate = 0, opacity = 1, style, visibleFrom }: PebbleProps) {
  return (
    <Box
      component="img"
      src={`/pebbles/Pebble-${variant}.svg`}
      alt=""
      aria-hidden
      visibleFrom={visibleFrom}
      style={{
        position: 'absolute',
        width: size,
        height: 'auto',
        opacity,
        transform: `rotate(${rotate}deg)`,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
