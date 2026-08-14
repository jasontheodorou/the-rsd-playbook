/**
 * Single logging sink. Console for now — swap in Sentry / Logtail / Vercel's
 * observability by changing this one file. Every unexpected error in the app
 * should reach here; nothing should be swallowed.
 */

export function logError(err: unknown, context: Record<string, unknown> = {}): void {
  const payload = {
    ...context,
    message: err instanceof Error ? err.message : String(err),
    stack: err instanceof Error ? err.stack : undefined,
  }
  console.error('[app]', payload)
}
