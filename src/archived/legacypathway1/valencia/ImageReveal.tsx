import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { resolveMotion, type ValenciaEnergy, type ValenciaSpeed, type ValenciaStyle } from './tokens'
import './ImageReveal.css'

/**
 * Adapted from valencia-pattern-library / image-reveal + MaskReveal.
 * A media block that unmasks into view: vertical, horizontal, or zoom.
 */
type Direction = 'vertical' | 'horizontal' | 'zoom'

type Props = {
  children: ReactNode
  style?: ValenciaStyle
  energy?: ValenciaEnergy
  speed?: ValenciaSpeed
  from?: Direction
  when?: 'load' | 'scroll'
  className?: string
}

function initialFor(from: Direction) {
  switch (from) {
    case 'horizontal': return { x: '-100%', y: 0, scale: 1 }
    case 'zoom':       return { x: 0, y: 0, scale: 1.15 }
    case 'vertical':
    default:           return { x: 0, y: '100%', scale: 1 }
  }
}

export function ImageReveal({
  children,
  style = 'editorial',
  energy = 'medium',
  speed = 'normal',
  from = 'vertical',
  when = 'load',
  className,
}: Props) {
  const reduce = useReducedMotion()
  const m = resolveMotion(style, energy, speed)
  const initial = reduce ? { x: 0, y: 0, scale: 1 } : initialFor(from)
  const visible = { x: 0, y: 0, scale: 1 }
  const transition = { duration: reduce ? 0 : m.duration, ease: m.ease }

  const inner = when === 'load'
    ? <motion.div className="v-mask__item" initial={initial} animate={visible} transition={transition}>{children}</motion.div>
    : <motion.div className="v-mask__item" initial={initial} whileInView={visible} viewport={{ once: true, amount: 0.25 }} transition={transition}>{children}</motion.div>

  return <div className={`v-mask ${className ?? ''}`}>{inner}</div>
}
