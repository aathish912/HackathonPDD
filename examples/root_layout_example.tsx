/**
 * examples/root_layout_example.tsx
 *
 * Demonstrates how to use the Next.js App Router root layout defined in `app/layout.tsx`.
 *
 * In a real Next.js app you typically **do not import** the root layout manually—Next.js
 * automatically applies `app/layout.tsx` to all routes.
 *
 * This example shows:
 * 1) How to import and render the layout in a standalone script (useful for testing/previewing)
 * 2) How to reuse the exported `metadata` object.
 */

import React from 'react'
import ReactDOMServer from 'react-dom/server'

// IMPORTANT: use the actual module name "layout" and import from the real file location.
import RootLayout, { metadata } from '../app/layout'

/**
 * Example child content that would normally come from a page (e.g. `app/page.tsx`).
 *
 * @returns JSX.Element
 *   The page content to be placed into the RootLayout's `{children}` slot.
 */
function ExamplePage(): JSX.Element {
  return (
    <section>
      <h1>Welcome</h1>
      <p>This content is rendered inside the layout's <main> container.</p>
    </section>
  )
}

/**
 * Renders the RootLayout to an HTML string for demonstration/testing.
 *
 * @param children - React.ReactNode
 *   The nested route/page content to be rendered inside the layout.
 *
 * @returns string
 *   The full HTML string produced by the RootLayout.
 */
function renderLayout(children: React.ReactNode): string {
  // RootLayout returns an <html> element, so renderToStaticMarkup is appropriate.
  return '<!doctype html>' + ReactDOMServer.renderToStaticMarkup(<RootLayout>{children}</RootLayout>)
}

// --- Example usage ---

// 1) Reuse metadata (e.g., for tests or for sharing constants across modules)
console.log('Site default title:', metadata.title)
console.log('Site description:', metadata.description)

// 2) Render the layout with page content
const html = renderLayout(<ExamplePage />)
console.log(html)