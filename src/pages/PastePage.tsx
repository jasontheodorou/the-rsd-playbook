import { useState, type FormEvent } from 'react'
import { Alert, Button, Container, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { sendPaste } from '../lib/paste'

export function PastePage() {
  const [label, setLabel] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    setSending(true)
    setStatus('idle')
    setErrorMessage('')
    try {
      await sendPaste(text, label || undefined)
      setStatus('sent')
      setText('')
      setLabel('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSending(false)
    }
  }

  return (
    <Container size="sm" py={64}>
      <Stack gap="xl">
        <Stack gap="xs">
          <Text
            size="xs"
            fw={700}
            tt="uppercase"
            c="#5C5C5C"
            style={{ letterSpacing: '0.1em' }}
          >
            Drop copy
          </Text>
          <Text fz={32} fw={700} c="#333333" lh={1.2}>
            Paste anything here.
          </Text>
          <Text c="#5C5C5C" fz={17} lh={1.5}>
            What you send here lands in the terminal on the dev machine within a second.
            Great for slide copy written on another computer.
          </Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Label (optional)"
              placeholder="e.g. Slide 1 welcome rewrite"
              value={label}
              onChange={(e) => setLabel(e.currentTarget.value)}
              disabled={sending}
              size="md"
            />
            <Textarea
              label="Copy"
              placeholder="Paste your text here"
              autosize
              minRows={10}
              maxRows={40}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              disabled={sending}
              size="md"
              required
            />
            {status === 'sent' && (
              <Alert color="teal" variant="light">
                Sent. Paste more any time.
              </Alert>
            )}
            {status === 'error' && (
              <Alert color="red" variant="light">
                Send failed: {errorMessage}
              </Alert>
            )}
            <Button
              type="submit"
              size="md"
              loading={sending}
              disabled={!text.trim()}
              styles={{ root: { backgroundColor: '#213D59', color: '#fff', fontWeight: 700 } }}
            >
              Send
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}
