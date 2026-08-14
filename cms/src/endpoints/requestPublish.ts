import type { Endpoint, PayloadRequest } from 'payload'
import { z } from 'zod'

const bodySchema = z.object({
  pathwayId: z.string().min(1),
  note: z.string().max(500).optional(),
})

/**
 * POST /api/pathways/request-publish
 *
 * Editor calls this from the admin UI. It stamps the draft with
 * `pendingPublishRequest.{ requestedBy, requestedAt, note }`. An afterChange
 * hook then emails every publisher.
 *
 * Access: any authenticated user with editor+ role.
 */
export const requestPublishEndpoint: Endpoint = {
  path: '/pathways/request-publish',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    if (!req.user) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 })
    }

    let payload: unknown
    try {
      payload = await req.json?.()
    } catch {
      return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const parsed = bodySchema.safeParse(payload)
    if (!parsed.success) {
      return Response.json({ error: 'Invalid body', details: parsed.error.flatten() }, { status: 400 })
    }

    try {
      const updated = await req.payload.update({
        collection: 'pathways',
        id: parsed.data.pathwayId,
        draft: true,
        data: {
          pendingPublishRequest: {
            requestedBy: req.user.id,
            requestedAt: new Date().toISOString(),
            note: parsed.data.note ?? '',
          },
        },
        user: req.user,
      })
      return Response.json({ ok: true, id: updated.id })
    } catch (err) {
      req.payload.logger.error({ err }, '[requestPublish] update failed')
      return Response.json({ error: 'Failed to record publish request' }, { status: 500 })
    }
  },
}
