# Visionary — Base44 Dev Environment

## Overview
A Vite + React + TypeScript app ("Visionary") for tracking atomic visions (habits/goals), analyzing progress, and getting AI-powered mindset insights via Google Gemini.

## Setup
The app runs via `docker compose -f docker-compose.base44.yml up -d`.
- Node 22 base image, source bind-mounted at `/app`
- `npm install` runs on container startup, then `vite dev` with `--host 0.0.0.0`
- Vite dev server on port 5173, mapped to host port 3000
- Hot reload is active; edits appear in the preview automatically

## Missing Source Files
The original repo had empty placeholder files for `components/`, `hooks/`, and `services/` instead of directories. All component, hook, and service files were recreated from the import graph and type definitions. The root `AiSuggestionsPage.tsx` was moved to `components/`.

## External Credential
- `GEMINI_API_KEY` — Google Gemini API key. Get it from https://aistudio.google.com/apikey.
- A development placeholder is in `.env.base44-defaults` so the app boots without the real key.
- The real key is delivered via `/run/base44/app.env` (platform-managed, outside the repo).
- Without the real key, the app works but AI features (suggestions, text analysis, coaching) will show errors.

## Vite Config
- `vite.config.ts` uses `loadEnv` with empty prefix to read `GEMINI_API_KEY` from the environment, then defines it as `process.env.API_KEY` and `process.env.GEMINI_API_KEY` for client-side code.
- The `@` alias points to the repo root.
- `index.html` includes a Tailwind CDN script and Google Fonts; an importmap (for Google AI Studio's no-bundler preview) is present but ignored by Vite dev server.

## Verification
- `curl http://localhost:3000/` should return the Vite-served HTML with the Visionary title.
- The app starts on an opening page; clicking "Begin Your Journey" transitions to the home page.
- AI pages will error without a valid GEMINI_API_KEY.
