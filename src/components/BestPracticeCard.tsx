import './BestPracticeCard.css'

/**
 * BestPracticeCard — offset-plane CTA (Layouts gallery variant N01) in the
 * paleblue accent. Points to a real-world example of the method the user
 * is currently reading. Reusable across every method detail page.
 */

export type BestPractice = {
  /** Path to an image (relative to /public). */
  image: string
  /** Alt text for the image. */
  alt?: string
  /** One-sentence description of what the linked example shows. */
  description: string
  /** Button label — e.g. "See the map →". */
  ctaLabel: string
  /** Where the button goes. */
  ctaHref: string
}

export function BestPracticeCard({
  image,
  alt = '',
  description,
  ctaLabel,
  ctaHref,
}: BestPractice) {
  return (
    <div className="bp-card">
      <div className="bp-card__inner">
        <span className="bp-card__eyebrow">Best practice example</span>
        <div className="bp-card__image">
          <img src={image} alt={alt} loading="lazy" />
        </div>
        <p className="bp-card__desc">{description}</p>
        <a className="bp-card__button" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </div>
  )
}
