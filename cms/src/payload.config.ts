import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Pathways } from './collections/Pathways'
import { SiteSettings } from './globals/SiteSettings'
import { requestPublishEndpoint } from './endpoints/requestPublish'

const dirname = path.dirname(fileURLToPath(import.meta.url))

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing required env var: ${name}. See cms/.env.example for the full list. The CMS refuses to boot fail-closed.`,
    )
  }
  return value
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · rsd-manual',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Pathways],
  globals: [SiteSettings],
  endpoints: [requestPublishEndpoint],
  secret: requireEnv('PAYLOAD_SECRET'),
  db: postgresAdapter({
    pool: {
      connectionString: requireEnv('DATABASE_URL'),
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
    process.env.SITE_URL ?? 'http://localhost:5173',
    process.env.PREVIEW_URL ?? '',
  ].filter(Boolean),
  csrf: [
    process.env.SITE_URL ?? 'http://localhost:5173',
  ],
})
