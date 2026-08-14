import { Component, type ErrorInfo, type ReactNode } from 'react'
import { logError } from '../lib/log'

type Props = {
  children: ReactNode
  fallback?: (reset: () => void) => ReactNode
}

type State = {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logError(error, { componentStack: info.componentStack })
  }

  reset = (): void => this.setState({ error: null })

  render(): ReactNode {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback(this.reset)
      return <DefaultFallback error={this.state.error} onReset={this.reset} />
    }
    return this.props.children
  }
}

function DefaultFallback({ error, onReset }: { error: Error; onReset: () => void }) {
  return (
    <div
      role="alert"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: '#f5f5f5',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: '32px 40px',
          maxWidth: 480,
          width: '100%',
        }}
      >
        <h1 style={{ margin: '0 0 12px', fontSize: 20, color: '#213D59' }}>Something went wrong</h1>
        <p style={{ margin: '0 0 16px', color: '#333', fontSize: 15 }}>
          The page hit an unexpected error. You can try again — if it keeps happening, refresh the browser.
        </p>
        {import.meta.env.DEV && (
          <pre
            style={{
              margin: '0 0 16px',
              padding: 12,
              background: '#f6f6f6',
              borderRadius: 4,
              fontSize: 12,
              color: '#c0392b',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {error.message}
          </pre>
        )}
        <button
          type="button"
          onClick={onReset}
          style={{
            padding: '10px 20px',
            fontSize: 15,
            fontWeight: 600,
            background: '#213D59',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
