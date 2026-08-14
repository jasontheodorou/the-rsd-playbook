/* eslint-disable */
// Payload Admin entrypoint. Boilerplate — see Payload docs for details.
import type { Metadata } from 'next'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import config from '../../../../src/payload.config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap })

export default Page
