import { motion, useReducedMotion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import './ImagesReveal.css'

export type ImageRevealItem = {
  src: string
  alt: string
  /** Rotation in degrees. Falls back to a default alternating pattern. */
  angle?: number
}

export type ImagesRevealProps = {
  images: ImageRevealItem[]
  /** Optional heading rendered above the row. */
  title?: string
}

const DEFAULT_ANGLES = [8, -15, -5, 10, -5]

const ENTRANCE: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
  mass: 0.5,
}

const STRAIGHTEN_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 150,
  damping: 20,
}

const STRAIGHTEN = {
  rotate: '0deg',
  scale: 1.02,
  zIndex: 10,
  transition: STRAIGHTEN_TRANSITION,
}

/**
 * Row of loosely-stacked, rotated image tiles that spring in with a stagger
 * and straighten when a tile is hovered, focused or tapped.
 *
 * Adapted from Animata's `image/images-reveal` shadcn registry item and
 * refactored to accept images (with meaningful alt text) plus an optional
 * per-tile rotation as props. Respects `prefers-reduced-motion`.
 */
export function ImagesReveal({ images, title }: ImagesRevealProps) {
  const reduce = useReducedMotion()

  return (
    <section
      className="p1v2__reveal"
      aria-labelledby={title ? 'p1v2-reveal-title' : undefined}
    >
      {title && (
        <h2 id="p1v2-reveal-title" className="p1v2__reveal-title">
          {title}
        </h2>
      )}
      <ul className="p1v2__reveal-row" role="list">
        {images.map((img, i) => {
          const angle = img.angle ?? DEFAULT_ANGLES[i % DEFAULT_ANGLES.length]
          return (
            <motion.li
              key={img.src}
              className="p1v2__reveal-cell"
              tabIndex={0}
              aria-label={img.alt}
              initial={reduce ? false : { opacity: 0, scale: 0.2, rotate: `${angle}deg` }}
              animate={{ opacity: 1, scale: 1, rotate: `${angle}deg` }}
              transition={reduce ? { duration: 0 } : { ...ENTRANCE, delay: i * 0.08 }}
              whileHover={reduce ? undefined : STRAIGHTEN}
              whileFocus={reduce ? undefined : STRAIGHTEN}
              whileTap={reduce ? undefined : STRAIGHTEN}
            >
              <img src={img.src} alt={img.alt} loading="lazy" draggable={false} />
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
