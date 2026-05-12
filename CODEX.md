# CODEX.md — MLBB Atlas

> Important note: Write this file in English.
> Codex works better with clear English instructions.
> This file defines project context, coding rules, design direction, and implementation constraints.

---

## 1. Project Overview

- Name: MLBB Atlas
- Description: A clean esports analytics platform for Mobile Legends: Bang Bang competitive MPL regions.
- Goal: Help MLBB esports fans track MPL standings, schedules, statistics, season history, and playoff scenarios across multiple MPL regions in one place.
- Target Users: MLBB esports fans, MPL viewers, and users who want a simpler alternative to dense sites like Liquipedia.
- Version: v0.1.0
- Status: Active development

---

## 2. Tech Stack

- Language: TypeScript
- Framework: Next.js
- Styling: Tailwind CSS
- UI Library: shadcn/ui if needed
- Database: Supabase PostgreSQL
- ORM: Drizzle or Prisma
- Auth: Not required for v1
- State Management: Zustand if global state is needed
- Data Fetching: fetch / React Query if needed
- Package Manager: npm
- Deployment: Vercel

---

## 3. Commands

```bash
# Development
npm run dev
npm run build
npm run start
npm run lint
npm run format

# Package Management
npm install [package]

# Testing
npm run test
npm run test:unit
npm run test:e2e

# Database
npm run db:migrate
npm run db:seed
npm run db:reset
```

> Use npm unless instructed otherwise.  
> Do not install new packages without confirmation.

---

## 4. Project Structure

Architecture: feature-based structure

```txt
[root]/
  src/
    app/
      page.tsx
      layout.tsx
      globals.css

    components/
      ui/
      layout/
      home/
      regions/
      standings/
      schedule/
      teams/
      statistics/
      simulator/

    data/
      mock/

    lib/
      utils/
      constants/
      ranking/

    services/
      liquipedia/
      api/

    types/

  public/
    images/
    logos/
    patterns/

  CODEX.md
```

File placement rules:

- New UI components go inside `src/components/`.
- Homepage-specific components go inside `src/components/home/`.
- Region-related components go inside `src/components/regions/`.
- Ranking and standings logic goes inside `src/lib/ranking/`.
- Mock data goes inside `src/data/mock/`.
- TypeScript types go inside `src/types/`.
- API or data fetching logic goes inside `src/services/`.
- Do not create new top-level folders without confirmation.

---

## 5. Naming Conventions

```txt
# Files and Folders
- Components: PascalCase
  Example: RegionCard.tsx

- Non-components: camelCase
  Example: calculateStandings.ts

- Folders: kebab-case
  Example: region-dashboard/

- Next.js pages: page.tsx

- Layouts: layout.tsx

- Test files:
  [name].test.ts
  [name].spec.ts

# Code
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Functions: camelCase
- Types and interfaces: PascalCase
- Enums: PascalCase

# Git Branch
- Feature: feat/[feature-name]
- Bug fix: fix/[bug-name]
- Refactor: refactor/[name]
```

---

## 6. Code Conventions

```txt
# General
- Write clean, readable, maintainable code.
- Prefer clarity over cleverness.
- Avoid duplicated logic.
- Extract reusable logic into functions.
- Keep components small and focused.

# TypeScript
- Use strict TypeScript.
- Do not use `any`.
- Always type component props explicitly.
- Use interface for object shapes.
- Use type for unions, intersections, and utility types.

# Import Order
1. External libraries
2. Internal absolute imports
3. Relative imports
4. Types
5. Assets and styles

# Export Pattern
- Use named exports for components and utilities.
- Use default exports only for Next.js page.tsx and layout.tsx.

# Error Handling
- Use try-catch for async logic.
- Return meaningful error messages.
- Do not silently ignore errors.
```

---

## 7. Component Rules

```txt
# Component Order
1. Imports
2. Types or interfaces
3. Mock data if local and temporary
4. Component definition
5. Hooks
6. Handlers
7. JSX return
8. Export

# Props
- Always type props explicitly.
- Use optional props only when needed.
- Keep props simple.
- Split components if props become too many.

# Server vs Client Component
- Default to Server Components.
- Use "use client" only when needed for:
  - useState
  - useEffect
  - event listeners
  - browser APIs
  - interactive UI
  - Zustand or client-side state

# Component Splitting
- Split components if they are reused.
- Keep one-off small components in the same file if it improves readability.
```

---

## 8. Styling Rules

```txt
# Design Direction
MLBB Atlas should feel like:
- clean esports analytics platform
- modern sports dashboard
- premium but calm
- readable and data-focused
- subtle MLBB/MPL identity

It should NOT feel like:
- RGB gaming website
- cyberpunk landing page
- hero-centric MLBB fan page
- generic SaaS dashboard
- Liquipedia clone
```

Visual rules:

- Use 90% monochrome dark UI.
- Use 10% accent color only.
- Main background: near-black / dark navy.
- Main text: white.
- Secondary text: soft gray.
- Primary accent: muted blue.
- Region colors should be subtle and limited to:
  - top borders
  - small badges
  - hover accents
  - active indicators

Recommended tokens:

```txt
background: #05080f
surface: #0b111c
surface-muted: #111827
border: #1f2937
text-primary: #f9fafb
text-secondary: #9ca3af
accent-blue: #3b82f6
accent-muted: #2563eb
```

Tailwind rules:

- Use Tailwind utilities directly in JSX.
- Use `cn()` for conditional classes.
- Do not use inline styles unless the value is truly dynamic.
- Do not use `!important`.
- Keep spacing generous.
- Prioritize readability over decoration.

Animation rules:

- Use subtle motion only.
- Avoid excessive glow.
- Avoid full RGB effects.
- Hover effects may include:
  - slight lift
  - soft border accent
  - subtle rotating border light
  - low-opacity background movement
- Do not use distracting animations for data-heavy components.

---

## 9. API & Data Fetching Rules

```txt
# Data Source Strategy
v1 should use mock data first.
Later, data can be integrated from Liquipedia or other sources.

# Data Source Priority
1. Mock data for UI development
2. Liquipedia data for MPL standings, schedule, teams, and journey
3. Community MLBB public API for future hero/player/match analytics

# Fetching Rules
- Server fetch for initial page data.
- Client fetch only for interactive data.
- Do not fetch data directly inside UI components.
- Place fetching logic in `src/services/`.

# API Response Format
Use consistent API response format:

{
  success: boolean;
  data: T | null;
  message: string;
}
```

Environment rules:

- Use environment variables for API URLs and secrets.
- Never hardcode secrets.
- Never expose server-only keys to the client.

---

## 10. State Management Rules

```txt
# State Priority
1. Local state
2. Lifted state
3. URL state
4. Global state

# Use Global State Only For
- selected region
- selected season
- simulator state
- UI preferences if needed

# Simulator State
The simulator should allow users to select match results and preview how standings change.
Do not mutate real standings data directly.
Always derive simulated standings from base standings + simulated results.
```

---

## 11. Performance Rules

```txt
# Components
- Keep homepage lightweight.
- Avoid unnecessary client components.
- Avoid large animation libraries unless confirmed.

# Images
- Use next/image.
- Always define width and height.
- Use WebP or AVIF when possible.
- Do not use raw img tags.

# Data
- Memoize expensive standings calculations.
- Keep ranking engine pure and testable.
- Avoid storing derived data when it can be calculated.
```

---

## 12. Git Rules

Commit after completing a meaningful change.

```txt
# Commit Format
feat: add global homepage
fix: resolve region card spacing issue
refactor: extract standings calculation logic
style: update homepage color palette
docs: update CODEX instructions
test: add ranking engine tests
chore: update project config
```

Rules:

- One commit per focused change.
- Do not commit `.env` or secret files.
- Do not mix unrelated changes in one commit.
- Ask before large refactors.

---

## 13. Features

```txt
# Finished
- [ ] Global homepage
- [ ] Region cards
- [ ] Featured matches section
- [ ] Current highlights section

# In Progress
- [ ] MLBB Atlas visual identity
- [ ] Homepage layout
- [ ] Mock data structure

# Planned v1
- [ ] MPL region selector
- [ ] Region dashboard
- [ ] Teams page
- [ ] Schedule by week
- [ ] Current standings
- [ ] Standings after selected week
- [ ] Statistics page
- [ ] Journey page
- [ ] Simulator page

# Future
- [ ] Team detail page
- [ ] Recent form
- [ ] Playoff qualification status
- [ ] Upper bracket status
- [ ] Eliminated status
- [ ] Liquipedia integration
- [ ] Hero statistics
- [ ] Player analytics
- [ ] Prediction system
```

---

## 14. Testing

```txt
# Testing Approach
- Unit tests for ranking logic
- Unit tests for simulator logic
- Manual testing for UI
- E2E tests later if needed

# Must Test
- standings calculation
- match result parsing
- net game win calculation
- ranking order
- simulator result updates
- playoff qualification logic
- eliminated team logic

# Do Not Prioritize Yet
- simple presentational components
- static layout components
- third-party libraries
```

Minimum coverage:

- Ranking engine: high priority
- Simulator logic: high priority
- UI components: medium priority

---

## 15. Do Not

If the task is ambiguous, ask first before coding.

```txt
# Structure
- Do not create new top-level folders without confirmation.
- Do not delete files without confirmation.
- Do not move files without confirmation.
- Do not change folder structure without confirmation.

# Code
- Do not use `any`.
- Do not hardcode secrets.
- Do not install packages without confirmation.
- Do not remove working features without clear instruction.
- Do not use useEffect for initial data fetching.
- Do not write fetch logic directly inside UI components.

# Design
- Do not make the UI RGB neon.
- Do not make it cyberpunk.
- Do not make it look like a generic SaaS dashboard.
- Do not make it hero-centric.
- Do not use large MLBB character splash art.
- Do not overuse gradients or glow.
- Do not sacrifice readability for decoration.

# Data
- Do not mutate source standings data directly.
- Do not assume all MPL regions have the same rules without checking.
- Do not hardcode current season data permanently.
- Do not build player career tracking in v1.
```

---

## 16. Environment Variables

```txt
# Setup
Copy .env.example to .env.local for local development.
Never commit .env or .env.local.

# Public Variables
NEXT_PUBLIC_APP_NAME=MLBB Atlas
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server-only Variables
DATABASE_URL=
LIQUIPEDIA_API_URL=
LIQUIPEDIA_USER_AGENT=
SUPABASE_SERVICE_ROLE_KEY=

# Optional Future Variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## 17. Product Direction

MLBB Atlas is an esports-first platform.

Users do not come here to learn what Mobile Legends is.
Users come here because they already follow MLBB esports and want to quickly understand:

- standings
- schedules
- team performance
- statistics
- playoffs
- season history
- possible ranking scenarios

The product should be easier to read than Liquipedia and cleaner than official MPL websites.

Core positioning:

```txt
A clean MLBB esports analytics hub for every MPL region.
```

---

## 18. Homepage Requirements

Build the global homepage first.

The global homepage should act as a hub before users enter a specific MPL region.

Required sections:

- Header
- Hero section
- Featured matches
- Explore regions
- Current highlights

Homepage copy:

```txt
Title:
Track Every MPL Region

Subtitle:
Standings, schedules, statistics, and season history across Southeast Asian MLBB esports.
```

Regions:

- MPL Indonesia
- MPL Philippines
- MPL Malaysia
- MPL Singapore
- MPL Cambodia

Mock data is allowed.

Keep the UI:

- monochrome first
- subtle accent second
- readable always