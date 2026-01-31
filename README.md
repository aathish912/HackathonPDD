# Email & Task Entry Frontend

A simple two-page React frontend application for collecting user email and task information.

## Description

This application provides a user-friendly interface with two main pages:
1. **Email Capture Page** - Collects and validates user email address
2. **Task Entry Page** - Allows users to enter their task information

The application uses client-side routing and localStorage for email persistence across page navigation.

## Tech Stack

- **React 18** - UI library for building interactive components
- **React Router v7** - Client-side routing between pages
- **Vite** - Fast build tool and development server
- **localStorage** - Browser storage for email persistence

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

## Architecture Overview

### Module Structure

The application follows a feature-based organization:

```
src/
├── hooks/
│   └── use-email-storage.jsx    # Custom hook for email state management
├── utils/
│   └── validate-email.js        # Email validation utility
├── pages/
│   ├── email-capture.jsx        # Email input page (/)
│   └── task-entry.jsx           # Task input page (/tasks)
├── App.jsx                      # Root component with routing
└── main.jsx                     # Application entry point
```

### Key Features

- **Email Validation** - Client-side validation using HTML5 email patterns
- **State Persistence** - Email stored in localStorage for cross-page access
- **Progressive Validation** - Form validation on blur for better UX
- **Client-side Routing** - React Router for seamless navigation

### User Flow

1. User lands on email capture page (`/`)
2. User enters email address
3. Email is validated on blur
4. On valid submission, email is stored and user redirects to `/tasks`
5. Task entry page displays stored email and provides task input

## Project Configuration

- `vite.config.js` - Vite build configuration
- `package.json` - Dependencies and scripts
- `index.html` - HTML entry point

## Notes

This is a frontend-only application with no backend or database integration. All data is stored client-side in localStorage.
