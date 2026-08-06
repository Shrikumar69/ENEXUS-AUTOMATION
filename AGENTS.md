# AGENTS.md

This file helps AI coding agents work safely and quickly in this Playwright test repo.

## Project Type

- Node.js + TypeScript Playwright E2E automation.
- Login flow is implemented with Page Object Model + custom authenticated fixture.

## Runbook

- Install deps: `npm ci`
- Run all tests: `npm test`
- Run headed: `npm run test:headed`
- Run UI mode: `npm run test:ui`
- Preferred single-spec command: `npx playwright test tests/eNexus-Login/login.spec.ts`

Note: `npm run test:login` in [package.json](package.json) currently points to `tests/auth/login.spec.ts`, which does not exist in this repo layout.

## Environment Setup

- Copy values from [.env.example](.env.example).
- Required for authenticated tests:
  - `ENEXUS_USERNAME`
  - `ENEXUS_PASSWORD`
- Optional override:
  - `ENEXUS_LOGIN_URL` (defaults in [utils/env.ts](utils/env.ts))

## Core Structure

- Page objects: [pages/login.page.ts](pages/login.page.ts)
- Auth fixture: [fixtures/session.fixture.ts](fixtures/session.fixture.ts)
- Login tests: [tests/eNexus-Login/login.spec.ts](tests/eNexus-Login/login.spec.ts)
- Env helpers: [utils/env.ts](utils/env.ts)
- Playwright config: [playwright.config.ts](playwright.config.ts)
- CI workflow: [.github/workflows/playwright.yml](.github/workflows/playwright.yml)

## Non-Negotiable Conventions

- For authenticated tests, import `test` and `expect` from [fixtures/session.fixture.ts](fixtures/session.fixture.ts), not from `@playwright/test`.
- Keep selector fallback strategy in page objects (see [pages/login.page.ts](pages/login.page.ts)); avoid replacing resilient multi-selector locators with a single fragile selector.
- Keep tests small and assertion-focused; put navigation/login mechanics in fixtures and page objects.
- Prefer explicit waits/assertions used in current code style (`toBeVisible`, `toHaveURL`, `toHaveTitle`) with bounded timeouts.

## Playwright Behavior in This Repo

- `testDir` is `./tests`.
- Only Chromium project is enabled currently.
- Retries/workers are CI-aware in [playwright.config.ts](playwright.config.ts).
- `baseURL` is not configured; use full URLs via helpers.

## Safe Change Patterns

- Add or update locators in page objects first, then consume from tests.
- If adding a new authenticated spec, follow import/style from [tests/eNexus-Login/login.spec.ts](tests/eNexus-Login/login.spec.ts).
- If adding env-driven behavior, centralize it in [utils/env.ts](utils/env.ts).

## Validation Before Hand-off

- Run targeted spec first.
- Then run full suite if changes touch fixtures/config/shared helpers.
- For CI parity, ensure `npx playwright test` passes locally with env configured.
