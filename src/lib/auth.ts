import type { PracticeProfile } from '../components/PracticeForm'

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

export function getSession(): LocalSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function signIn(email: string): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY)
}

export function getProfile(): PracticeProfile | null {
  const session = getSession()
  if (!session) return null
  try {
    const raw = localStorage.getItem(profileKey(session.email))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: PracticeProfile): void {
  const session = getSession()
  if (!session) return
  localStorage.setItem(profileKey(session.email), JSON.stringify(profile))
}

export function getProgress(): Set<string> {
  const session = getSession()
  if (!session) return new Set()
  try {
    const raw = localStorage.getItem(progressKey(session.email))
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function saveProgress(completed: Set<string>): void {
  const session = getSession()
  if (!session) return
  localStorage.setItem(progressKey(session.email), JSON.stringify([...completed]))
}
