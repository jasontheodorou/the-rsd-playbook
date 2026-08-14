import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isAdmin, isAdminField, isEditor, isPublisher } from '../access/roles'
import { notifyOnPublishRequest } from '../hooks/notifyOnPublishRequest'

/**
 * Pathways collection.
 *
 * Content model mirrors the shape the SPA currently expects (Module[] → Card[]
 * → ContentBlock[]), so a rendered pathway is a straight join between what
 * editors save and what the SPA reads via /api/pathway.
 *
 * V1 constraint: text-only editing. The `illustrationKey` field is present
 * so the SPA can resolve a bundled asset, but it is read-only for editors and
 * publishers. Only admins can change it, which will effectively never happen
 * unless we later add editable illustrations.
 */
export const Pathways: CollectionConfig = {
  slug: 'pathways',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'role', 'updatedAt', '_status'],
    livePreview: {
      url: ({ data }) => {
        const site = process.env.SITE_URL ?? 'http://localhost:5173'
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        return `${site}/preview/pathway/${slug}?draft=true`
      },
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true, // published reads are public; drafts are guarded via ?draft=true + token elsewhere
    create: isPublisher,
    update: isEditor,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [notifyOnPublishRequest],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Service designer', value: 'service-designer' },
        { label: 'Interaction designer', value: 'interaction-designer' },
      ],
      access: { update: isAdminField },
    },
    {
      name: 'modules',
      type: 'array',
      required: true,
      minRows: 1,
      admin: { description: 'Modules the learner works through in order.' },
      fields: [
        { name: 'moduleId', type: 'text', required: true, admin: { readOnly: true } },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        {
          name: 'cards',
          type: 'array',
          required: true,
          minRows: 1,
          fields: [
            { name: 'cardId', type: 'text', required: true, admin: { readOnly: true } },
            { name: 'title', type: 'text', required: true },
            { name: 'minutes', type: 'number', required: true, min: 1 },
            {
              name: 'illustrationKey',
              type: 'text',
              admin: {
                readOnly: true,
                description: 'Fixed at build time. Editors and publishers cannot change this in V1.',
              },
              access: { update: isAdminField },
            },
            {
              name: 'content',
              type: 'blocks',
              required: true,
              blocks: [
                {
                  slug: 'paragraph',
                  fields: [{ name: 'text', type: 'textarea', required: true }],
                },
                {
                  slug: 'heading',
                  fields: [{ name: 'text', type: 'text', required: true }],
                },
                {
                  slug: 'list',
                  fields: [
                    {
                      name: 'items',
                      type: 'array',
                      required: true,
                      minRows: 1,
                      fields: [{ name: 'text', type: 'text', required: true }],
                    },
                  ],
                },
                {
                  slug: 'callout',
                  fields: [
                    {
                      name: 'variant',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Tool', value: 'tool' },
                        { label: 'Involve', value: 'involve' },
                        { label: 'Best practice', value: 'best-practice' },
                      ],
                    },
                    { name: 'body', type: 'textarea', required: true },
                    { name: 'ctaLabel', type: 'text' },
                    { name: 'ctaHref', type: 'text' },
                  ],
                },
                {
                  slug: 'richText',
                  fields: [{ name: 'body', type: 'richText', editor: lexicalEditor({}) }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'pendingPublishRequest',
      type: 'group',
      admin: {
        description: 'Set by "Request publish" — cleared once a publisher publishes.',
        readOnly: true,
      },
      fields: [
        { name: 'requestedBy', type: 'relationship', relationTo: 'users' },
        { name: 'requestedAt', type: 'date' },
        { name: 'note', type: 'textarea' },
      ],
    },
  ],
}
