const DEFAULT_TOPIC = 'rsd-paste-8f4a2c9e1d7b'

const TOPIC = (import.meta.env.VITE_PASTE_TOPIC as string | undefined) || DEFAULT_TOPIC

export function getPasteTopic(): string {
  return TOPIC
}

export async function sendPaste(text: string, label?: string): Promise<void> {
  const headers: Record<string, string> = {}
  if (label) headers.Title = label
  const res = await fetch(`https://ntfy.sh/${TOPIC}`, {
    method: 'POST',
    body: text,
    headers,
  })
  if (!res.ok) {
    throw new Error(`ntfy responded ${res.status}`)
  }
}
