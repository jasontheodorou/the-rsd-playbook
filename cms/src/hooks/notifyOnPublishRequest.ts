import type { CollectionAfterChangeHook } from 'payload'
import { Resend } from 'resend'

/**
 * When an editor saves a draft with a fresh `pendingPublishRequest`, email
 * every user with the `publisher` or `admin` role.
 *
 * Idempotent guard: we only fire the email if `requestedAt` moved forward
 * versus the previous document version.
 */
export const notifyOnPublishRequest: CollectionAfterChangeHook = async ({ doc, previousDoc, req, operation }) => {
  if (operation !== 'update') return doc

  const current = doc?.pendingPublishRequest?.requestedAt
  const prev = previousDoc?.pendingPublishRequest?.requestedAt
  if (!current || current === prev) return doc

  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM ?? 'no-reply@transformuk.com'
  const siteUrl = process.env.SITE_URL ?? 'http://localhost:5173'

  if (!resendKey) {
    req.payload.logger.warn('[notifyOnPublishRequest] RESEND_API_KEY not set; skipping email')
    return doc
  }

  const resend = new Resend(resendKey)

  const { docs: publishers } = await req.payload.find({
    collection: 'users',
    where: {
      or: [
        { role: { equals: 'publisher' } },
        { role: { equals: 'admin' } },
      ],
    },
    limit: 100,
    depth: 0,
  })

  const to = publishers.map((u) => (u as { email: string }).email).filter(Boolean)
  if (to.length === 0) {
    req.payload.logger.warn('[notifyOnPublishRequest] no publishers to notify')
    return doc
  }

  const requester = doc?.pendingPublishRequest?.requestedBy
  const note = doc?.pendingPublishRequest?.note ?? ''
  const reviewUrl = `${siteUrl}/preview/pathway/${doc.slug}?draft=true`

  try {
    await resend.emails.send({
      from,
      to,
      subject: `Publish request: ${doc.title}`,
      text: [
        `${typeof requester === 'object' ? requester.email : 'An editor'} requested a publish on "${doc.title}".`,
        note ? `\nNote: ${note}` : '',
        `\nReview: ${reviewUrl}`,
        `Admin: ${process.env.CMS_URL ?? 'http://localhost:3001'}/admin/collections/pathways/${doc.id}`,
      ].join('\n'),
    })
  } catch (err) {
    req.payload.logger.error({ err }, '[notifyOnPublishRequest] Resend send failed')
  }

  return doc
}
