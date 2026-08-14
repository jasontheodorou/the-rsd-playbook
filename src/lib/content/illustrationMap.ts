/**
 * illustrationKey → asset URL mapping.
 *
 * In V1 the CMS surface is text-only. Editors cannot swap illustrations.
 * Every slide has an `illustrationKey` string that this map resolves to a
 * bundled asset. Adding a new illustration is a deliberate developer PR.
 *
 * Pathway 1 (foundations) slides use these keys today. When pathway 1
 * content moves into the CMS, the CMS document stores `illustrationKey`
 * and the SPA looks it up here.
 */

export const illustrationMap: Record<string, string> = {
  turninguncertaintyintopossibility: '/illustrations/turninguncertaintyintopossibility.svg',
  gooddesignearnstrust: '/illustrations/gooddesignearnstrust.svg',
  whenserviceslosepeople: '/illustrations/whenserviceslosepeople.svg',
  designisconnectivecreativity: '/illustrations/designisconnectivecreativity.svg',
  head_heart_hands: '/illustrations/head_heart_hands.png',
  ecosystem_001: '/illustrations/ecosystem_001.png',
  makepossiblereal: '/illustrations/makepossiblereal.svg',
  standardistransformational: '/illustrations/standardistransformational.svg',
}

const FALLBACK = '/illustrations/placeholder.svg'

export function resolveIllustration(key: string | undefined | null): string {
  if (!key) return FALLBACK
  return illustrationMap[key] ?? FALLBACK
}
