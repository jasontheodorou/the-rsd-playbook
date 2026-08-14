import type { Module } from './types'
import { getModulesForUser } from '../../data/modules'

/**
 * Local fallback source. Reads from the hardcoded `modules.ts` so the SPA
 * works with zero backend. Once a CMS is wired up, `client.ts` reaches for it
 * first and only falls back here on error.
 */
export function getLocalModulesForUser(role: string, accountId: string): Module[] {
  return getModulesForUser(role, accountId) as Module[]
}
