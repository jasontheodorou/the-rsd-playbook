/**
 * Draft mode detection. On a Vercel Preview deployment, the URL carries
 * `?draft=true&token=...` when opened from Payload's Live Preview / preview
 * link. The Vite SPA reads those values and forwards them to the CMS client.
 *
 * Production ignores these params entirely — draft content is never served
 * from the production origin.
 */

const IS_PROD = import.meta.env.PROD && import.meta.env.MODE !== 'preview'

export type DraftContext = {
  draft: boolean
  previewToken?: string
}

export function readDraftContext(): DraftContext {
  if (IS_PROD) return { draft: false }
  if (typeof window === 'undefined') return { draft: false }

  const params = new URLSearchParams(window.location.search)
  const draft = params.get('draft') === 'true'
  const previewToken = params.get('token') ?? undefined

  return { draft, previewToken }
}
