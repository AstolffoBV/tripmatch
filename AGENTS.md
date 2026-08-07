<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TripMatch project guide

## Product concept

TripMatch is a reverse travel discovery and booking-style application. Unlike a traditional booking website, the user does not begin by choosing a destination. The user describes the kind of trip they want, and the application progressively narrows and ranks destinations that match those preferences.

Preferences may include:

- Type of trip
- Beach or mountains
- Preferred weather and temperature
- Sea temperature
- Budget
- Nature
- Nightlife
- Culture
- Food
- Activities
- Travel duration
- Season
- Flight or travel time
- Crowd level
- Family friendliness
- Romantic atmosphere

The matching experience should make the progressive filtering understandable. For example:

```text
200 destinations
-> Beach: 90
-> Warm weather: 45
-> Warm sea: 25
-> Medium budget: 14
-> Quiet destination: 7
-> Nature: 4
```

The final result should recommend and rank the best destinations, provide a match score, and explain why each destination is a good match. A representative result is `Sardinia — 94% match`.

## Technical direction

- Use Next.js 16, React, TypeScript, Tailwind CSS, and the App Router.
- Keep application source code under `src/`.
- Use Git and GitHub for version control and collaboration.
- Initially use local, structured destination data.
- Do not require paid services, APIs, or tooling.
- Supabase may be introduced later using its free tier when persistent storage provides a clear benefit.
- The recommendation system should eventually become a weighted destination-matching engine.

## Intended source structure

As the application grows, organize source code along these boundaries:

```text
src/
  app/          Routes, layouts, and route-level composition
  components/   Reusable UI components
  data/         Structured destination data and data access
  engine/       Filtering, scoring, ranking, and explanations
  types/        Shared TypeScript domain types
  utils/        Small general-purpose helpers
```

Create these directories only when the project needs them; do not add empty architecture speculatively.

## Development principles

- Keep the project readable for a beginner.
- Prefer the simplest solution that meets the current requirement before introducing more complex architecture.
- Do not install a dependency unless it provides a clear, concrete benefit.
- Use strict TypeScript types and avoid weakening type safety without a documented reason.
- Keep UI, destination data, recommendation logic, and shared types separated.
- Build reusable components where reuse is real or imminent.
- Avoid unnecessary abstractions and premature generalization.
- Explain significant architectural decisions and their tradeoffs.
- Keep the entire project usable with free tools and services.
- Modify only files related to the current task.
- Do not make large architectural changes without explaining them first.
- Prefer incremental development in small, testable steps.
- Keep recommendation rules deterministic and explainable so users can understand why destinations were included, excluded, or ranked.
