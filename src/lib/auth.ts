import type { PracticeProfile } from '../components/PracticeForm'
import { logError } from './log'

const SESSION_KEY = 'rsd_session'
const profileKey = (email: string) => `rsd_profile_${email.toLowerCase()}`
const progressKey = (email: string) => `rsd_progress_${email.toLowerCase()}`

const CREDENTIALS: Record<string, string> = {
  'servicedesigner@demo.com': 'sponges123!',
  'interactiondesigner@demo.com': 'sponges123!',
}

export function validateCredentials(email: string, password: string): boolean {
  return CREDENTIALS[email.toLowerCase()] === password
}

export type LocalSession = { email: string }

function readLocalStorage(key: string, context: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch (err) {
    logError(err, { op: 'localStorage.getItem', key, context })
    return null
  }
}

function writeLocalStorage(key: string, value: string, context: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch (err) {
    logError(err, { op: 'localStorage.setItem', key, context })
    return false
  }
}

function removeLocalStorage(key: string, context: string): void {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    logError(err, { op: 'localStorage.removeItem', key, context })
  }
}

function safeParse<T>(raw: string, context: string): T | null {
  try {
    return JSON.parse(raw) as T
  } catch (err) {
    logError(err, { op: 'JSON.parse', context, raw: raw.slice(0, 80) })
    return null
  }
}

export function getSession(): LocalSession | null {
  const raw = readLocalStorage(SESSION_KEY, 'getSession')
  if (!raw) return null
  return safeParse<LocalSession>(raw, 'getSession')
}

export function signIn(email: string): void {
  writeLocalStorage(SESSION_KEY, JSON.stringify({ email }), 'signIn')
}

export function signOut(): void {
  removeLocalStorage(SESSION_KEY, 'signOut')
}

export function getProfile(): PracticeProfile | null {
  const session = getSession()
  if (!session) return null
  const raw = readLocalStorage(profileKey(session.email), 'getProfile')
  if (!raw) return null
  return safeParse<PracticeProfile>(raw, 'getProfile')
}

export function saveProfile(profile: PracticeProfile): void {
  const session = getSession()
  if (!session) return
  writeLocalStorage(profileKey(session.email), JSON.stringify(profile), 'saveProfile')
}

export function getProgress(): Set<string> {
  const session = getSession()
  if (!session) return new Set()
  const raw = readLocalStorage(progressKey(session.email), 'getProgress')
  if (!raw) return new Set()
  const parsed = safeParse<string[]>(raw, 'getProgress')
  return parsed ? new Set(parsed) : new Set()
}

export function saveProgress(completed: Set<string>): void {
  const session = getSession()
  if (!session) return
  writeLocalStorage(progressKey(session.email), JSON.stringify([...completed]), 'saveProgress')
}
