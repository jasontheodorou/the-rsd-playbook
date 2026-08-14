import type { Module } from './types'
import { modulesArraySchema } from './schemas'
import { getLocalModulesForUser } from './local'

export class DataError extends Error {
  code: 'timeout' | 'network' | 'http' | 'schema' | 'unknown'
  status?: number

  constructor(code: DataError['code'], message: string, opts?: { cause?: unknown; status?: number }) {
    super(message, opts?.cause ? { cause: opts.cause } : undefined)
    this.code = code
    if (opts?.status !== undefined) this.status = opts.status
  }
}

export function logError(err: unknown, context: Record<string, unknown> = {}): void {
  if (err instanceof DataError) {
    console.error(`[content:${err.code}]`, err.message, { ...context, cause: err.cause, status: err.status })
  } else {
    console.error('[content:unknown]', err, context)
  }
}

const CMS_URL = import.meta.env.VITE_CMS_URL as string | undefined
const REQUEST_TIMEOUT_MS = 8_000

type LoadOptions = {
  draft?: boolean
  previewToken?: string
  signal?: AbortSignal
}

/**
 * Synchronous read of pathway content from the local source. Used by views
 * that mounted before any CMS is wired up. When a CMS URL is configured, use
 * `loadPathwayContent` instead — this function ignores it.
 */
export function getPathwayContentSync(role: string, accountId: string): Module[] {
  return getLocalModulesForUser(role, accountId)
}

export async function loadPathwayContent(
  role: string,
  accountId: string,
  opts: LoadOptions = {},
): Promise<Module[]> {
  if (!CMS_URL) {
    return getLocalModulesForUser(role, accountId)
  }

  try {
    const raw = await fetchFromCms(role, accountId, opts)
    const parsed = modulesArraySchema.safeParse(raw)
    if (!parsed.success) {
      throw new DataError('schema', 'CMS returned content that failed validation', { cause: parsed.error })
    }
    return parsed.data
  } catch (err) {
    logError(err, { role, accountId, draft: !!opts.draft })
    // fail-open to local data so the site is never blank if the CMS is misbehaving
    return getLocalModulesForUser(role, accountId)
  }
}

async function fetchFromCms(role: string, accountId: string, opts: LoadOptions): Promise<unknown> {
  const params = new URLSearchParams({ role, accountId })
  if (opts.draft) params.set('draft', 'true')
  const url = `${CMS_URL!.replace(/\/$/, '')}/api/pathway?${params.toString()}`

  const headers: Record<string, string> = { accept: 'application/json' }
  if (opts.previewToken) headers['x-preview-token'] = opts.previewToken

  // one retry on transport failure
  let lastErr: unknown
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      return await requestWithTimeout(url, headers, opts.signal)
    } catch (err) {
      lastErr = err
      if (err instanceof DataError && (err.code === 'http' || err.code === 'schema')) throw err
      if (opts.signal?.aborted) throw err
      await sleep(150 + Math.random() * 150)
    }
  }
  throw lastErr
}

async function requestWithTimeout(url: string, headers: Record<string, string>, external?: AbortSignal): Promise<unknown> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(new DataError('timeout', `Request to ${url} timed out`)), REQUEST_TIMEOUT_MS)
  const signal = external ? mergeSignals(external, controller.signal) : controller.signal
  try {
    const res = await fetch(url, { headers, signal })
    if (!res.ok) throw new DataError('http', `CMS responded ${res.status}`, { status: res.status })
    return await res.json()
  } catch (err) {
    if (err instanceof DataError) throw err
    if (err instanceof Error && err.name === 'AbortError') {
      throw new DataError('timeout', 'Request aborted (timeout or user cancel)', { cause: err })
    }
    throw new DataError('network', 'Network error contacting CMS', { cause: err })
  } finally {
    clearTimeout(timer)
  }
}

function mergeSignals(a: AbortSignal, b: AbortSignal): AbortSignal {
  const controller = new AbortController()
  const onAbort = () => controller.abort(a.reason ?? b.reason)
  if (a.aborted || b.aborted) onAbort()
  else {
    a.addEventListener('abort', onAbort, { once: true })
    b.addEventListener('abort', onAbort, { once: true })
  }
  return controller.signal
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
