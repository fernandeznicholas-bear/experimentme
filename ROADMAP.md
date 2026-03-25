# Experiment Me — Roadmap

## Completed
- [x] Album-cover carousel on home page — replaced flat assessment grid with 3D perspective carousel (gradient cards, icons, facts ticker, Discovery/Research toggle)
- [x] Admin dashboard auto-refresh — polls analytics API every 30 seconds with last-refresh timestamp
- [x] Enhanced dashboard analytics — 6 stat cards (Total Users, Completers, Completions, Avg/User, New Users, Data Consent), unique users per assessment in performance table

## Security & Code Quality
- [ ] Integrate [Semgrep](https://semgrep.dev/) for static analysis and security scanning
  - SAST (Static Application Security Testing) for Next.js / TypeScript
  - Add to CI pipeline for automated vulnerability detection
  - Custom rules for Supabase auth patterns and API route security

## Upcoming
- [ ] Migrate middleware.ts to proxy convention (Next.js 16 deprecation warning)
- [ ] Replace Cloudflare Turnstile test keys with production keys for deployment
