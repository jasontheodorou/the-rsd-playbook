import type { PracticeProfile } from '../components/PracticeForm'

const SESSION_KEY = 'rsd_session'
const PROFILE_KEY = 'rsd_profile'
const PROGRESS_KEY = 'rsd_progress'

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
  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: PracticeProfile): void {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function getProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function saveProgress(completed: Set<string>): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...completed]))
}
