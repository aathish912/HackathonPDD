'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function TaskPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = React.useState('')
  const [task, setTask] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)
  const [lastSavedTask, setLastSavedTask] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const emailFromUrl = searchParams.get('email')?.trim()
    const emailFromStorage =
      typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null

    const resolvedEmail = emailFromUrl || emailFromStorage || ''

    if (!resolvedEmail) {
      router.replace('/')
      return
    }

    setEmail(resolvedEmail)

    try {
      localStorage.setItem('userEmail', resolvedEmail)
    } catch {
      // Ignore storage failures
    }
  }, [router, searchParams])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitted(false)

    const trimmed = task.trim()
    if (!trimmed) {
      setError('Please enter a task before submitting.')
      return
    }

    setLastSavedTask(trimmed)
    setSubmitted(true)
    setTask('')
  }

  function handleAddAnother() {
    setSubmitted(false)
    setError(null)
    setTask('')
  }

  function handleBackToEmail() {
    router.push('/')
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Enter your task</h1>
            <p style={styles.subtitle}>
              Add a task description below. This is saved on the frontend only.
            </p>
          </div>

          <div style={styles.emailWrap} aria-label='Signed in email'>
            <span style={styles.emailLabel}>Email</span>
            <span style={styles.emailValue} title={email}>
              {email}
            </span>
          </div>
        </header>

        <form onSubmit={handleSubmit} style={styles.form} aria-describedby='task-help'>
          <label htmlFor='task' style={styles.label}>
            Task description
          </label>

          <p id='task-help' style={styles.helpText}>
            Be as detailed as you like. Use multiple lines for steps, notes, or acceptance criteria.
          </p>

          <textarea
            id='task'
            name='task'
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
              if (submitted) setSubmitted(false)
              if (error) setError(null)
            }}
            placeholder='Example: Draft a project outline for Q1, including milestones and owners...'
            rows={10}
            required
            style={styles.textarea}
          />

          {error && (
            <div role='alert' style={styles.errorBox}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button type='submit' style={styles.primaryButton}>
              Save task
            </button>

            <button type='button' onClick={handleBackToEmail} style={styles.secondaryButton}>
              Back to email
            </button>
          </div>
        </form>

        {submitted && (
          <section style={styles.successBox} aria-live='polite'>
            <h2 style={styles.successTitle}>Saved!</h2>
            <p style={styles.successText}>Your task was recorded (frontend only).</p>

            {lastSavedTask && (
              <div style={styles.previewBox}>
                <div style={styles.previewLabel}>Last saved task</div>
                <pre style={styles.previewText}>{lastSavedTask}</pre>
              </div>
            )}

            <div style={styles.actions}>
              <button type='button' onClick={handleAddAnother} style={styles.primaryButton}>
                Add another task
              </button>
              <button type='button' onClick={handleBackToEmail} style={styles.secondaryButton}>
                Edit email
              </button>
            </div>
          </section>
        )}

        <footer style={styles.footer}>
          <span style={styles.footerText}>
            Tip: you can also pass email via URL: <code style={styles.code}>/task?email=you@example.com</code>
          </span>
        </footer>
      </div>
    </main>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: '24px',
    display: 'grid',
    placeItems: 'center',
    background:
      'radial-gradient(1200px 600px at 20% 0%, rgba(99, 102, 241, 0.18), transparent 60%), radial-gradient(1200px 600px at 80% 20%, rgba(16, 185, 129, 0.14), transparent 55%), #0b1020',
    color: '#e5e7eb',
  },
  card: {
    width: '100%',
    maxWidth: 860,
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(17, 24, 39, 0.72)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    backdropFilter: 'blur(10px)',
    padding: 20,
  },
  header: {
    display: 'flex',
    gap: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: '6px 6px 14px 6px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  title: {
    margin: 0,
    fontSize: 28,
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
  },
  subtitle: {
    margin: '8px 0 0 0',
    color: 'rgba(229,231,235,0.80)',
    maxWidth: 560,
  },
  emailWrap: {
    display: 'grid',
    gap: 4,
    padding: '10px 12px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.04)',
    minWidth: 240,
  },
  emailLabel: {
    fontSize: 12,
    color: 'rgba(229,231,235,0.72)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  emailValue: {
    fontSize: 14,
    color: '#e5e7eb',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  form: {
    padding: '16px 6px 6px 6px',
    display: 'grid',
    gap: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
  },
  helpText: {
    margin: 0,
    fontSize: 13,
    color: 'rgba(229,231,235,0.75)',
  },
  textarea: {
    width: '100%',
    resize: 'vertical',
    minHeight: 220,
    padding: 14,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(0,0,0,0.25)',
    color: '#e5e7eb',
    outline: 'none',
    lineHeight: 1.5,
    fontSize: 14,
  },
  actions: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 6,
  },
  primaryButton: {
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'linear-gradient(180deg, rgba(99,102,241,0.95), rgba(79,70,229,0.95))',
    color: 'white',
    padding: '10px 14px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 600,
  },
  secondaryButton: {
    border: '1px solid rgba(255,255,255,0.14)',
    background: 'rgba(255,255,255,0.06)',
    color: '#e5e7eb',
    padding: '10px 14px',
    borderRadius: 12,
    cursor: 'pointer',
    fontWeight: 600,
  },
  errorBox: {
    borderRadius: 12,
    border: '1px solid rgba(248, 113, 113, 0.35)',
    background: 'rgba(248, 113, 113, 0.12)',
    color: '#fecaca',
    padding: '10px 12px',
    fontSize: 13,
  },
  successBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    border: '1px solid rgba(16, 185, 129, 0.30)',
    background: 'rgba(16, 185, 129, 0.10)',
  },
  successTitle: {
    margin: 0,
    fontSize: 18,
    letterSpacing: '-0.01em',
  },
  successText: {
    margin: '6px 0 0 0',
    color: 'rgba(229,231,235,0.85)',
  },
  previewBox: {
    marginTop: 12,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.18)',
    padding: 12,
  },
  previewLabel: {
    fontSize: 12,
    color: 'rgba(229,231,235,0.72)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 8,
  },
  previewText: {
    margin: 0,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: 13,
    lineHeight: 1.5,
    color: '#e5e7eb',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(229,231,235,0.70)',
  },
  code: {
    padding: '2px 6px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.20)',
  },
}
