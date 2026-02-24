# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Link Safe Sense** (學會分辨詐騙連結) is a Traditional Chinese educational web app that teaches users to identify phishing/scam URLs through 7 interactive lessons and a quiz. Deployed to GitHub Pages at the `/link-safe-sense/` base path.

## Commands

```bash
bun install          # Install dependencies (CI uses Bun; npm also works locally)
bun run dev          # Dev server on port 8080
bun run build        # Production build (outputs to dist/)
bun run lint         # ESLint
bun run test         # Run tests once (Vitest)
bun run test:watch   # Watch mode
```

Run a single test file: `bunx vitest run src/test/example.test.ts`

## Architecture

- **React 18 + TypeScript SPA** built with Vite (SWC plugin for fast compilation)
- **Routing**: React Router v6 in `src/App.tsx` — routes: `/`, `/quiz`, `/quiz/result`, `/lessons`, `/lesson/:slug`
- **UI**: shadcn-ui (Radix primitives) + Tailwind CSS with custom HSL color variables (`safe`, `danger`, `neutral`). Components in `src/components/ui/`
- **State**: React Query for async data, localStorage for quiz results persistence
- **SEO**: react-helmet-async with schema.org JSON-LD structured data (WebSite, Article, Course)
- **Forms**: react-hook-form + Zod validation

### Key Directories

- `src/pages/` — Route page components (Index, Quiz, QuizResult, Lessons, Lesson)
- `src/components/` — App components (UrlBreakdown, LineChat, SmsMessage, EmailCard, LessonQuiz, etc.)
- `src/components/ui/` — shadcn-ui primitives (do not manually edit; use shadcn CLI to add/update)
- `src/constants/` — Lesson metadata: titles, slugs, reading times, descriptions (metadata-driven design)
- `src/hooks/` — Custom hooks (use-mobile, use-toast)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

### Lesson System

Lessons are defined in `src/constants/lessons.ts` (LESSON_TITLES, LESSON_SLUGS, SLUG_TO_ID). The `src/pages/Lesson.tsx` component dynamically renders Lesson1–Lesson7 based on the `:slug` route param.

## Configuration Notes

- **Path alias**: `@` maps to `src/` (configured in both vite.config.ts and tsconfig)
- **Base path**: `/link-safe-sense/` in vite.config.ts (for GitHub Pages)
- **TypeScript**: Relaxed settings — `noImplicitAny: false`, `strictNullChecks: false`
- **ESLint**: Flat config (v9), `@typescript-eslint/no-unused-vars` is off
- **Tests**: Vitest with jsdom, globals enabled, pattern: `src/**/*.{test,spec}.{ts,tsx}`
- **CI/CD**: GitHub Actions deploys to GitHub Pages on push to `main` using Bun
