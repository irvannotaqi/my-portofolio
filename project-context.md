# Project Context: Irvanno's Technical PM Portfolio

## 1. Core Profile & Positioning
- **Owner:** Irvanno Taqi Irmawan
- **Background:** 7+ years as a Senior SDET / QA Automation Architect at Gojek, Tokopedia, and GoPay. Deep expertise in breaking/securing code, API latency, scale, and transaction funnels.
- **Goal:** Transitioning into Product Management. The site must show a technical but highly strategic, conversion-oriented, data-driven PM mindset.

## 2. Tech Stack & Infrastructure
- **Framework:** Next.js (App Router), TypeScript, Tailwind CSS
- **Testing:** Vitest (Pure logic separated into `utils/` and tested in `__tests__/`)
- **Hosting:** Vercel (Live at: https://irvanno.com)

## 3. Project Architecture
- `app/page.tsx` - Homepage featuring a programmatic `BioShell` terminal simulator, an optimized avatar, and personal narrative.
- `app/tools/funnel-simulator/page.tsx` - Payment conversion funnel simulation tool.
- `utils/funnelMath.ts` & `utils/syntaxHighlight.ts` - Core logical utilities.
- `__tests__/` - Vitest test cases proving system reliability and boundary testing.

## 4. Current Phase 2 Active Roadmap
- **Task 1 (Active):** UI/UX Fixes (Terminal domain to irvanno.com, high-contrast text fix, Copy cURL utility button, smooth page-load animations).
- **Task 2:** Recruiter Funnel Optimizations (PDF resume tab viewer, clean mailto anchor links).
- **Task 3:** Menu Simplification (Condense navigation to Home, About, and Product Teardowns).
- **Task 4:** Analytics Integration (Vercel Web Analytics/PostHog & Telegram/Discord CV download webhook).
- **Task 5:** MVP Content (Stripe vs. Adyen Cross-Border Smart Routing deep-dive teardown).