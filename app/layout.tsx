// app/layout.tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Task Manager',
    template: '%s · Task Manager',
  },
  description: 'Simple task management application',
  applicationName: 'Task Manager',
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <div className='app-shell'>
          <a href='#main' className='skip-link'>
            Skip to content
          </a>

          <header className='app-header'>
            <div className='container header-inner'>
              <div className='brand'>Task Manager</div>
              <nav className='nav' aria-label='Primary navigation'>
                <a className='nav-link' href='/'>
                  Home
                </a>
                <a className='nav-link' href='/tasks'>
                  Tasks
                </a>
              </nav>
            </div>
          </header>

          <main id='main' className='app-main'>
            <div className='container'>{children}</div>
          </main>

          <footer className='app-footer'>
            <div className='container footer-inner'>
              <span>© {new Date().getFullYear()} Task Manager</span>
              <span className='footer-muted'>Built with Next.js</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}