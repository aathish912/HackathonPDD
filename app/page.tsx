// app/page.tsx
'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const [email, setEmail] = React.useState('')
  const [touched, setTouched] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const normalizedEmail = email.trim()

  // Lightweight, practical email check (HTML5 also validates via type='email')
  const isEmailValid = React.useMemo(() => {
    if (!normalizedEmail) return false
    const at = normalizedEmail.indexOf('@')
    const dot = normalizedEmail.lastIndexOf('.')
    return at > 0 && dot > at + 1 && dot < normalizedEmail.length - 1
  }, [normalizedEmail])

  const showError = touched && !isEmailValid

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    setError(null)

    if (!isEmailValid) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setSubmitting(true)
      // Persist for the next page
      localStorage.setItem('userEmail', normalizedEmail)

      // Redirect (App Router)
      router.push('/task')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className='page'>
      <section className='card' aria-labelledby='title'>
        <header className='header'>
          <h1 id='title' className='title'>
            Continue with your email
          </h1>
          <p className='subtitle'>We’ll use this to associate your tasks with you.</p>
        </header>

        <form className='form' onSubmit={handleSubmit} noValidate>
          <div className='field'>
            <label className='label' htmlFor='email'>
              Email address
            </label>

            <input
              id='email'
              name='email'
              type='email'
              inputMode='email'
              autoComplete='email'
              placeholder='you@example.com'
              className={`input ${showError ? 'inputError' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={showError ? 'true' : 'false'}
              aria-describedby={showError || error ? 'email-error' : undefined}
              required
            />

            {(showError || error) && (
              <p id='email-error' className='error' role='alert'>
                {error ?? 'Please enter a valid email address.'}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='button'
            disabled={!isEmailValid || submitting}
          >
            {submitting ? 'Continuing…' : 'Continue'}
          </button>

          <p className='hint'>
            Your email is stored locally in your browser to prefill the next step.
          </p>
        </form>
      </section>

      <style jsx>{`
        .page {
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: radial-gradient(1200px 600px at 50% 0%, #eef2ff 0%, #ffffff 55%);
          color: #0f172a;
        }

        .card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
        }

        .header {
          margin-bottom: 18px;
        }

        .title {
          font-size: 1.5rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
        }

        .subtitle {
          margin: 0;
          color: #475569;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .form {
          display: grid;
          gap: 14px;
        }

        .field {
          display: grid;
          gap: 8px;
        }

        .label {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .input {
          height: 44px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          padding: 10px 12px;
          font-size: 1rem;
          outline: none;
          transition: border-color 120ms ease, box-shadow 120ms ease;
          background: #ffffff;
          color: #0f172a;
        }

        .input::placeholder {
          color: #94a3b8;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
        }

        .inputError {
          border-color: #ef4444;
        }

        .inputError:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.16);
        }

        .error {
          margin: 0;
          color: #b91c1c;
          font-size: 0.9rem;
        }

        .button {
          height: 44px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: #4f46e5;
          color: #ffffff;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 80ms ease, opacity 120ms ease, background 120ms ease;
        }

        .button:hover:enabled {
          background: #4338ca;
        }

        .button:active:enabled {
          transform: translateY(1px);
        }

        .button:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .hint {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 0.85rem;
          line-height: 1.4;
        }
      `}</style>
    </main>
  )
}