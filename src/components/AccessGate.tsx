import { useState, type FormEvent } from 'react'

const GATE_KEY = 'rsd_gate'
const PASSWORD = import.meta.env.VITE_GATE_PASSWORD as string | undefined

export function isGateOpen(): boolean {
  if (!PASSWORD) return import.meta.env.DEV
  try {
    return localStorage.getItem(GATE_KEY) === PASSWORD
  } catch {
    return false
  }
}

export function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      try { localStorage.setItem(GATE_KEY, value) } catch { /* */ }
      onUnlock()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: '40px 48px',
        width: '100%',
        maxWidth: 360,
      }}>
        <p style={{ margin: '0 0 20px', fontSize: 15, color: '#333', fontWeight: 600 }}>
          Enter password to continue
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false) }}
            autoFocus
            placeholder="Password"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 12px',
              fontSize: 15,
              border: error ? '1px solid #c0392b' : '1px solid #ccc',
              borderRadius: 6,
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: error ? 8 : 16,
            }}
          />
          {error && (
            <p style={{ margin: '0 0 12px', fontSize: 13, color: '#c0392b' }}>
              Incorrect password.
            </p>
          )}
          <button
            type="submit"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px 0',
              fontSize: 15,
              fontWeight: 600,
              background: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
