# Experiment Me — Roadmap

## Completed
- [x] Album-cover carousel on home page with real photo backgrounds, per-card Discovery/Research toggle, facts ticker
- [x] Admin dashboard auto-refresh (30s polling) with enhanced analytics (6 stat cards, anonymous completions, unique users per assessment)
- [x] Anonymous assessment result capture — non-logged-in completions saved to DB

## Upcoming — Results & Sharing
- [ ] Better results page — richer score breakdowns, visual charts, percentile comparisons, interpretation guidance
- [ ] Shareable results — single link to share assessment results (e.g. experimentme.com/share/xxx)

## Upcoming — Analytics & Tracking
- [ ] Add page view tracking (Vercel Analytics, Plausible, or custom) — currently no visitor count data
- [ ] Migrate middleware.ts to proxy convention (Next.js 16 deprecation warning)
- [ ] Replace Cloudflare Turnstile test keys with production keys for deployment

## Security & Code Quality
- [ ] Integrate [Semgrep](https://semgrep.dev/) for static analysis and security scanning
  - SAST (Static Application Security Testing) for Next.js / TypeScript
  - Add to CI pipeline for automated vulnerability detection
  - Custom rules for Supabase auth patterns and API route security
