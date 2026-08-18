/*
 * Motion tokens lifted from valencia-pattern-library.
 * Kept co-located with the patterns so this experiment stays self-contained.
 * If Valencia gets published as a package we'll swap the imports.
 */

export type ValenciaStyle = 'quiet' | 'clear' | 'editorial' | 'bold' | 'playful'
export type ValenciaEnergy = 'low' | 'medium' | 'high'
export type ValenciaSpeed = 'slow' | 'normal' | 'fast'

export type MotionStyleTokens = {
  duration: number
  distance: number
  stagger: number
  ease: [number, number, number, number]
  spring: { stiffness: number; damping: number }
}

export const motionStyles: Record<ValenciaStyle, MotionStyleTokens> = {
  quiet:     { duration: 0.55, distance: 16, stagger: 0.035, ease: [0.2, 0.8, 0.2, 1], spring: { stiffness: 220, damping: 30 } },
  clear:     { duration: 0.32, distance: 20, stagger: 0.030, ease: [0.4, 0.0, 0.2, 1], spring: { stiffness: 300, damping: 32 } },
  editorial: { duration: 0.72, distance: 48, stagger: 0.065, ease: [0.65, 0, 0.45, 1], spring: { stiffness: 180, damping: 24 } },
  bold:      { duration: 0.68, distance: 80, stagger: 0.075, ease: [0.65, 0, 0.35, 1], spring: { stiffness: 200, damping: 20 } },
  playful:   { duration: 0.50, distance: 40, stagger: 0.050, ease: [0.2, 0.9, 0.25, 1], spring: { stiffness: 250, damping: 17 } },
}

type EnergyMultipliers = { distance: number; scale: number; stagger: number }

export const energy: Record<ValenciaEnergy, EnergyMultipliers> = {
  low:    { distance: 0.55, scale: 0.5, stagger: 0.7 },
  medium: { distance: 1.0,  scale: 1.0, stagger: 1.0 },
  high:   { distance: 1.45, scale: 1.3, stagger: 1.2 },
}

export const speed: Record<ValenciaSpeed, number> = {
  slow:   1.35,
  normal: 1.0,
  fast:   0.75,
}

export type ResolvedMotion = {
  duration: number
  distance: number
  stagger: number
  scale: number
  ease: MotionStyleTokens['ease']
  spring: MotionStyleTokens['spring']
}

export function resolveMotion(
  style: ValenciaStyle = 'quiet',
  e: ValenciaEnergy = 'medium',
  s: ValenciaSpeed = 'normal',
): ResolvedMotion {
  const base = motionStyles[style]
  const em = energy[e]
  const sm = speed[s]
  return {
    duration: base.duration * sm,
    distance: base.distance * em.distance,
    stagger:  base.stagger  * em.stagger,
    scale:    em.scale,
    ease:     base.ease,
    spring:   base.spring,
  }
}
