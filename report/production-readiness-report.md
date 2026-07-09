# Production Readiness Report

**Project:** StudiujWŁodzi (React Native / Expo SDK 54 mobile app for iOS, Android, Web) + new static marketing landing page (`website/`)
**Audit Date:** 2026-07-09
**Auditor:** Production Readiness Auditor Agent
**Scope:** Full repository audit — the Expo Router mobile app (`app/`, `components/`, `hooks/`, `constants/`), the new standalone static landing page (`website/`) and its GitHub Actions deploy workflow (`.github/workflows/deploy-landing.yml`), all `docs/*.md`, and root-level config (`package.json`, `eas.json`, `app.json`, `eslint.config.js`, `tsconfig.json`). No live device testing, no runtime profiling, no App Store/Play Console access — findings are from static analysis only.

> **Note on report location:** the standard instructions specify saving to `/report/production-readiness-report.md`, but the sandbox filesystem root is read-only. This report is saved instead at `<repo-root>/report/production-readiness-report.md`.

---

## Executive Summary

This is a solo-developer, fully static, offline-first mobile app with **no backend, no database, and no accounts** — by design, the vast majority of the standard backend/database checklist (49 of 87 items) is genuinely N/A, and that architectural simplicity is itself a strength: there is very little attack surface. The real gaps cluster in five places: **(1)** no privacy policy exists anywhere, which will hard-block App Store / Google Play submission regardless of how little data the app collects; **(2)** zero automated tests and zero CI pipeline (confirmed by the project's own docs: *"There is no CI/CD pipeline configured"*) — the only quality gate is a developer manually remembering to run `npm run lint`; **(3)** several city-gallery photos are shipped as uncompressed PNG (up to 3.7MB each, ~14.8MB total) instead of JPEG/WebP, bloating install size for an app explicitly marketed as offline-friendly for students with weak connectivity; **(4)** zero accessibility labels (`accessibilityLabel`/`accessibilityRole`) anywhere in the app, and no crash/error reporting (Sentry-equivalent), meaning production crashes are invisible to the developer; **(5)** the new `website/` static site has no CSP, no Open Graph tags, no `robots.txt`/sitemap, and no automated check before every push-to-`main` deploys it live. None of these are exotic fixes — all are same-day-to-one-week efforts for a project this size.

### Score
- ✅ PASS: 12/87
- ⚠️ PARTIAL: 5/87
- ❌ FAIL: 9/87
- 🔵 N/A: 60/87
- 🔍 NEEDS REVIEW: 1/87

### Critical Blockers (must fix before go-live / store submission)
1. **No privacy policy** (#34) — Apple App Store Connect and Google Play Console both require a privacy policy URL to submit an app, even one that collects zero data. This blocks store submission entirely, independent of the already-known `eas.json` `submit.production: {}` gap.
2. **`eas.json` `submit.production` is empty** (already documented in repo, re-confirmed here) — no `appleId`/`ascAppId` or `serviceAccountKeyPath`/`track`, so `eas submit` cannot run yet.

### Other High-Priority Items (fix shortly after or before launch)
- No test suite, no CI gate (#12, #27) — every change ships untested and unreviewed by automation.
- No crash/error reporting SDK (#30) and no root-level React error boundary (#7) — production crashes are invisible.
- Zero accessibility labels across the entire app (#44).
- Uncompressed multi-megabyte PNG photo assets bloating install size (#87).
- No automated dependency vulnerability scanning; `npm audit` currently reports 28 known vulnerabilities, including 1 critical and 9 high (#38).

---

## Detailed Findings

### 🗄️ Database — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 1 | Migrations | 🔵 N/A | — | No database exists. All content (`constants/universities.ts`, `constants/discounts.ts`) is static TypeScript, compiled into the binary at build time — confirmed via repo-wide grep, no ORM, no SQL, no DB client library in `package.json`. | None. If a backend is ever added, adopt a migration tool then. |
| 2 | Backups | 🔵 N/A | — | No database to back up. The git repository (GitHub-hosted) is the sole source of truth for content. | None. |
| 3 | Backup restore tests | 🔵 N/A | — | Same as above. | None. |
| 4 | Indexes | 🔵 N/A | — | No database. In-app "lookups" (search in `study.tsx`, category filter in `discounts.tsx`) run in-memory `Array.filter` over a few dozen static records — no indexing concern at this scale. | None. |
| 5 | Constraints (UNIQUE/FK/CHECK) | 🔵 N/A | — | No database-level constraints applicable. Note: `University.type` is a TypeScript union (`'publiczna' \| 'artystyczna'`) enforced at compile time — good. `DiscountPartner.category` (`constants/discounts.ts`) is a plain `string`, not a union of `DISCOUNT_CATEGORIES` names — the invariant that category strings match exactly is enforced only by `docs/CONTRIBUTING.md` convention and manual review, not by the type system. | Low-effort improvement: derive `category: (typeof DISCOUNT_CATEGORIES)[number]['name']` as a literal union type so a typo fails `tsc` instead of silently breaking the filter UI at runtime. |
| 6 | Connection pooling | 🔵 N/A | — | No database connections exist. | None. |

### 🖥️ Frontend — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 7 | Error handling | ⚠️ PARTIAL | 🟠 HIGH | `try/catch` is used correctly around `AsyncStorage`/`SplashScreen` calls (`hooks/use-color-scheme.ts` lines 12-19, 23-31; `app/_layout.tsx` lines 25-33, 41-45) with safe fallbacks. However, there is **no root-level React `ErrorBoundary`** anywhere in `app/_layout.tsx` or `(tabs)/_layout.tsx` (confirmed via repo-wide grep for `ErrorBoundary`/`componentDidCatch` — zero matches), and **no crash reporting service** is integrated (see #30). A render-time exception in any screen (e.g. an out-of-bounds array access while iterating `constants/*`) would white-screen the entire app with no recovery path and no visibility to the developer. | Add an `ErrorBoundary` component wrapping the root `Stack` in `app/_layout.tsx` with a friendly fallback screen ("Coś poszło nie tak" + reload button), and pair it with error tracking (#30) so exceptions are actually reported once shipped. |
| 8 | Forms + validation | 🔵 N/A | — | The only user text input in the app is the local search `TextInput` in `app/(tabs)/study.tsx` (line 73), which does client-side, in-memory `Array.filter` over static data — there is no submission, no server round-trip, and therefore no injection or validation risk in the traditional sense. | None required. If a real form (e.g. feedback) is ever added, both client and any future server-side validation must be added together. |
| 9 | Responsiveness | ✅ PASS | — | `hooks/use-responsive.ts` defines `isTablet` (≥768px breakpoint) and a `CONTENT_MAX_WIDTH` of 900px; `components/content-container.tsx` centers content on tablets; the documented `flexBasis: '48%'` grid convention (CLAUDE.md) avoids the `flex: 1` overflow bug in nested containers. The new `website/styles.css` independently implements 7 `@media (min-width: 768px)` breakpoints plus a `prefers-reduced-motion` fallback. Viewport meta tag present in `website/index.html` line 5. | None — continue verifying at 320px/768px/1280px when adding new screens/sections per the existing convention. |
| 10 | Loading states | ✅ PASS | — | `app/_layout.tsx` holds the native splash screen visible (`SplashScreen.preventAutoHideAsync()`, line 18) until `appIsReady` is true and the AsyncStorage theme override has resolved (lines 20-54), then renders `null` in the interim (line 52-54) rather than a broken partial UI. Since there is no runtime network fetching inside any screen (all data renders synchronously from static constants), there is no other async gap requiring a spinner. | None. |
| 11 | Security (CSP headers) | ❌ FAIL | 🟡 MEDIUM | `website/index.html` has no `Content-Security-Policy` meta tag and GitHub Pages (the deploy target per `.github/workflows/deploy-landing.yml`) does not allow custom HTTP response headers without fronting it with a CDN/Cloudflare. Actual risk is low today — the site ships **zero JavaScript** (confirmed: no `<script>` tags, no `.js` files in `website/`) — but there is no defense-in-depth if that changes later. Separately, both `study-map.tsx` and `modal.tsx` load Leaflet from `unpkg.com` at runtime inside a WebView with **no Subresource Integrity (`integrity=`) attribute** on the `<script>`/`<link>` tags (lines 16-17 / 18-19), so a compromised or MITM'd unpkg CDN response would execute unverified code inside the WebView. Native app itself has no HTTP response context (N/A there). | Add a restrictive `<meta http-equiv="Content-Security-Policy">` tag to `website/index.html` (e.g. `default-src 'self'; img-src 'self'; style-src 'self'`). Add `integrity`/`crossorigin` attributes to the unpkg Leaflet `<script>`/`<link>` tags in both `study-map.tsx` and `modal.tsx`, or vendor Leaflet locally into the WebView HTML string instead of fetching it live. |
| 12 | Tests | ❌ FAIL | 🟠 HIGH | Zero test files anywhere in the repo (`find . -iname "*.test.*" -o -iname "*.spec.*"` returns nothing, excluding `node_modules`), no test runner (`jest`, `vitest`, etc.) in `package.json` scripts or devDependencies. The only quality gate is `npm run lint`, run manually per `docs/CONTRIBUTING.md` — not enforced by any CI (see #27). Given that data invariants like category-name matching (#5) are enforced only by convention, an untested typo in `constants/discounts.ts` would silently break the discounts filter with no test catching it. | Add Jest + `@testing-library/react-native` (Expo's recommended stack) with at minimum: a unit test asserting every `DiscountPartner.category` exists in `DISCOUNT_CATEGORIES`, a smoke-render test per tab screen, and a snapshot/logic test for the cost calculator's total math. |

### ⚙️ Backend — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 13 | Input validation | 🔵 N/A | — | No backend/API exists anywhere in this repo. Confirmed via repo-wide grep: no PHP, no Node/Express server, no `fetch(`/`axios` calls in `app/`, `components/`, `hooks/`, or `constants/`. All data is static and bundled at build time. | None. |
| 14 | Input sanitization | 🔵 N/A | — | Same as #13 — no server-side data handling exists. | None. |
| 15 | Error handling (server) | 🔵 N/A | — | No server process exists to crash or leak stack traces. | None. |
| 16 | Logs | 🔵 N/A | — | No server to log requests/auth events. Client-side: repo-wide grep for `console.log/warn/error` in `app/components/hooks/constants` returns zero matches — the CLAUDE.md "no console" rule is being followed. | None. |
| 17 | Environment configs | 🔵 N/A (verified clean) | — | `docs/07-setup.md` states explicitly: *"This project has no `.env` files and no runtime environment variables."* Confirmed no hardcoded secrets/API keys anywhere in source via grep; `.gitignore` correctly excludes `.env*.local` as a precaution even though none are used. | None. |
| 18 | CORS config | 🔵 N/A | — | No API/server to configure CORS on. | None. |
| 19 | CSRF protection | 🔵 N/A | — | No session cookies, no server-side mutating endpoints. | None. |
| 20 | HTTP-only cookies | 🔵 N/A | — | No cookies are set by this app anywhere (native app has none; `website/index.html` ships zero JavaScript, so it cannot set any either). The one piece of persisted state, the theme override, is stored in `AsyncStorage` (device-local key/value store), not a cookie. | None. |
| 21 | Rate limiting | 🔵 N/A | — | No server/API endpoints to rate-limit. | None. |
| 22 | Health checks | 🔵 N/A | — | No server process whose liveness needs checking. | None. |
| 23 | Tests (backend) | 🔵 N/A | — | No backend exists to test. (Frontend/general test coverage is captured under #12, which is a genuine FAIL.) | None. |

### 🏗️ DevOps / Infrastructure — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 24 | SSL/TLS | ✅ PASS | — | `website/` is deployed to GitHub Pages via `gh-pages` branch (`.github/workflows/deploy-landing.yml`), which serves exclusively over HTTPS with a valid, auto-managed certificate. All runtime network calls from the native app (Leaflet.js/CSS from `unpkg.com`, map tiles from `basemaps.cartocdn.com` in `components/study-map.tsx` and `app/modal.tsx`) use `https://` exclusively — confirmed via grep, no `http://` URLs found. | None. |
| 25 | Staging environment | ⚠️ PARTIAL | 🟢 LOW | The mobile app has a de facto pre-release channel: `eas.json`'s `preview` profile (internal distribution, Android `apk` buildType) is used for sideloading test builds before a `production` build is cut — this functions as informal staging for the app. However, the **website has no staging step at all**: every push to `main` touching `website/**` deploys directly and immediately to the public `gh-pages` branch (`.github/workflows/deploy-landing.yml`, no environment gate, no manual approval, no PR-preview build). | Document the EAS `preview` profile explicitly as the pre-release testing step in `docs/09-deployment.md`. For the website, consider a `pull_request` preview deploy (e.g. to a `gh-pages-preview` path or a Netlify/Vercel PR preview) before merging to `main`, or at minimum require PR review before merge given `main` auto-deploys. |
| 26 | Production environment hardening | 🔵 N/A | — | No self-managed production server exists. Distribution is entirely through Apple App Store / Google Play (hardened by the platform) and GitHub Pages (hardened by GitHub). There are no shared credentials between "production" and "development" environments because no environment-specific credentials exist at all (per #17). | None actionable at this architecture. |
| 27 | CI/CD pipeline | ❌ FAIL | 🟠 HIGH | `docs/09-deployment.md` states explicitly: *"There is no CI/CD pipeline configured. Builds are triggered manually via the EAS CLI."* The only workflow in `.github/workflows/` is `deploy-landing.yml`, which deploys the static site straight to production with **zero checks** — no HTML validation, no link check, no lint step — before publishing. There is no workflow at all that runs `npm run lint` or a build check on pull requests for the app code, despite `docs/CONTRIBUTING.md` asking contributors to run lint manually before opening a PR. | Add a `.github/workflows/ci.yml` that runs on every PR/push: `npm ci`, `npm run lint`, `npx tsc --noEmit`, and (once #12 is fixed) `npm test`. Add a minimal lint/HTML-validate step to `deploy-landing.yml` before the `peaceiris/actions-gh-pages` publish step. |
| 28 | Secrets management | ✅ PASS | — | No secrets exist in the repository (verified via grep for common secret patterns and via `git log --all -p` history checks — 40 commits total, nothing suspicious found in scope of this review). `deploy-landing.yml` uses the auto-provisioned `secrets.GITHUB_TOKEN`, scoped minimally to `permissions: contents: write` (line 11-12) — appropriately least-privilege. `.gitignore` excludes `.env*.local`, `*.jks`, `*.p8`, `*.p12`, `*.key`, `*.mobileprovision` as a precaution even though the project currently needs none of them. | None. Continue this discipline if any future integration needs a real secret — use GitHub Actions encrypted secrets, never commit it. |
| 29 | Monitoring & alerts | 🔵 N/A | — | No hosted service exists whose infrastructure metrics (error rate, latency, CPU) need monitoring. App Store/Play Store and GitHub Pages platform health is outside this project's control. | None. |
| 30 | Error tracking | ❌ FAIL | 🟠 HIGH | No Sentry/Bugsnag/Rollbar-equivalent SDK is present in `package.json` or initialized anywhere in the codebase. Once this app ships to real devices, any unhandled exception (see #7) is completely invisible to the developer — the only feedback channel would be a 1-star store review or a GitHub issue from a frustrated user. | Integrate `sentry-expo`/`@sentry/react-native` (has a generous free tier suitable for a solo/hobby project) with source maps uploaded on each EAS build, so real production crashes and their stack traces are actually visible. |
| 31 | Docker | 🔵 N/A | — | No server component exists to containerize. EAS Build handles native compilation in Expo's managed cloud infrastructure; the website is plain static files. Docker would add zero value here. | None. |

### 📄 Documentation — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 32 | README | ✅ PASS | — | `README.md` is thorough: badges, table of contents, About/Recognition/Features/Tech Stack/Project Structure/Getting Started/Available Scripts/Data Sources/Contributing/License sections, with a full project tree and setup commands. Minor inconsistency: the root README's "Prerequisites" lists "Expo Go" as a way to run the app before the "Note" below it clarifies Expo Go won't actually work (`react-native-webview`/`react-native-worklets` need native modules) — `docs/07-setup.md` states this more clearly upfront. | Low-priority polish: reorder the root README's Prerequisites section so the Expo Go caveat appears before, not after, listing it as an option — avoids a first-five-minutes dead end for new contributors. |
| 33 | Setup guide | ✅ PASS | — | `docs/07-setup.md` is a genuinely complete step-by-step guide: prerequisites table with versions, explicit statement that zero env vars are needed, install steps, running-locally steps for all 4 targets, first-time development-build instructions, and the TypeScript path-alias config — a new developer would not need to ask any clarifying questions. | None. |

### ⚖️ Legal & Compliance — Mandatory

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 34 | Privacy policy | ❌ FAIL | 🔴 CRITICAL | No `/privacy`, `PRIVACY.md`, or equivalent page exists anywhere in the repo or on `website/` (confirmed via `find . -iname '*privacy*'` — zero results). Even though the app collects effectively no personal data (no accounts, no network calls except map tiles, one local AsyncStorage key for theme), **both Apple App Store Connect and Google Play Console require a privacy policy URL to submit an app**, regardless of how minimal the data collection is. This is a hard submission blocker, separate from the already-documented `eas.json` `submit.production: {}` gap. | Write a short privacy policy (a single static page is sufficient given the minimal footprint) covering: no account/registration, no personal data transmitted, the one local-only theme preference stored via AsyncStorage, and the third-party map tile provider (CARTO/unpkg.com) contacted only when the user opens the campus map. Host it as a page on `website/` (e.g. `website/privacy.html`) and link it from both app store listings. |
| 35 | Terms of service | 🔵 N/A | — | No accounts, no payments, no user-generated content, no ability for users to interact with each other. Per checklist guidance ("not all small apps legally require ToS"), this is reasonably N/A for a free, single-purpose reference app at this scale. | Optional: a short "Acceptable Use" note could still be added if listing on app stores that request one, but not legally required today. |
| 36 | Cookie consent | 🔵 N/A | — | No cookies are ever set. `website/index.html` ships zero JavaScript (confirmed — no `<script>` tags, no external analytics), and the native app's only persisted value is a local AsyncStorage key, not a cookie, and is essential app functionality (theme preference) rather than tracking. The landing page itself explicitly markets "Bez konta i bez śledzenia" (no account and no tracking) — consistent with what was found in code. | None. |
| 37 | GDPR / data compliance | 🔵 N/A (low residual risk) | — | No personal data is collected, so there is no lawful-basis, export, or erasure mechanism needed — the strongest possible GDPR posture is "collect nothing." The one dependency is that the app store "Data Safety" (Google Play) / "App Privacy" (Apple) declarations must be filled out truthfully during submission to reflect this — tied to item #34. | Ensure the store listing's data-collection questionnaire accurately states "no data collected" once submission (#34) proceeds. |
| 38 | Dependency updates | ❌ FAIL | 🟠 HIGH | No `.github/dependabot.yml` or `renovate.json` exists anywhere in the repo (confirmed via `find`). `npm audit --production` reports **28 vulnerabilities: 1 critical, 9 high, 17 moderate, 1 low** (e.g. a critical `shell-quote` CWE-77/78 command-injection-class advisory, GHSA-w7jw-789q-3m8p, and a high-severity `ws` memory-exhaustion DoS, GHSA-96hv-2xvq-fx4p) — these are transitive dev-tooling dependencies (Expo CLI toolchain, Metro dev middleware) rather than code shipped inside the compiled app binary, which meaningfully limits real-world exploitability, but there is currently zero automated process that would catch or flag *newly* published CVEs going forward. | Enable Dependabot (`.github/dependabot.yml` with `package-ecosystem: npm`, weekly schedule) or GitHub's built-in Dependabot alerts at minimum. Run `npm audit fix` for the fixable subset now; re-evaluate `npm audit fix --force` only after confirming it doesn't break Expo's pinned tool versions. |

### 🗄️ Database — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 39 | Encryption at rest | 🔵 N/A | — | No database. The app stores no sensitive personal data on-device; the one AsyncStorage key (theme preference) is non-sensitive. | None. |
| 40 | Replication | 🔵 N/A | — | No database. | None. |
| 41 | Performance monitoring | 🔵 N/A | — | No database/query layer to monitor. | None. |
| 42 | Soft delete / archiving | 🔵 N/A | — | No user-deletable entities exist in the data model (universities/discounts/scholarships are curator-managed static content, not user records). | None. |
| 43 | Seed data | 🔵 N/A | — | No relational database; the "seed data" role is effectively filled by `constants/*.ts` itself, which is already the single source of truth documented in `docs/DATA_SOURCES.md`. | None. |

### 🖥️ Frontend — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 44 | Accessibility (WCAG) | ❌ FAIL | 🟠 HIGH | Repo-wide grep for `accessibilityLabel`/`accessibilityRole`/`accessible=` across `app/` and `components/` returns **zero matches**. Icon-only interactive elements (the modal close button in `app/_layout.tsx` lines 68-77, the search input in `study.tsx`, category filter chips in `discounts.tsx`) have no screen-reader labels. `<Image>` components (`app/modal.tsx` line 88, `app/(tabs)/lodz.tsx` line 260) have no `accessibilityLabel`, RN's equivalent of `alt` text — a screen-reader user gets nothing describing the university gallery photos or campus map preview. The `website/` static page does noticeably better in comparison: semantic landmarks (`<header>`, `<nav aria-label="Nawigacja">`, `<main>`, `<footer>`), decorative SVG icons correctly marked `aria-hidden="true"`, and a real `alt` description on the hero photo — but this doesn't offset the app-side gap, since the app is the primary product. | Add `accessibilityLabel` to every icon-only `Pressable`/`TouchableOpacity` and every content `<Image>`; add `accessibilityRole="button"`/`"search"` where appropriate. Prioritize the modal close button, tab bar icons, and gallery images first — these are the highest-traffic interactive elements. |
| 45 | SEO | ⚠️ PARTIAL | 🟡 MEDIUM | `website/index.html` has a descriptive `<title>` and `<meta name="description">` (lines 6-7) and correct semantic HTML structure (`h1`→`h2`→`h3` hierarchy observed through the features/audience sections). However there are **no Open Graph tags** (`og:title`, `og:description`, `og:image`) so shares to social media/Slack/Messenger render with no preview card, **no canonical URL**, **no `robots.txt`**, and **no `sitemap.xml`** anywhere in `website/` (confirmed via `ls`). Not applicable to the native app itself (no traditional SEO surface). | Add OG + Twitter Card meta tags (image can reuse `assets/hero.jpg`), a `robots.txt` allowing all crawlers, and a minimal `sitemap.xml` — all trivial additions to a single-page static site and directly improve discoverability/shareability of the new landing page. |
| 46 | Lazy loading | 🔵 N/A | — | `website/` is a single page with only two content images (hero + brand icon), both reasonably sized (hero.jpg is 311KB) and above/near the fold — native lazy-loading would provide negligible benefit and, for the hero image specifically, would actively hurt perceived load time (LCP) if misapplied. The native app has no equivalent web `loading="lazy"` concept; all screen images render from bundled local assets, not over a network, so there is no meaningful "defer until visible" benefit to chase. | None currently warranted. Revisit only if the website gains a long image-heavy page. |
| 47 | Code splitting | 🔵 N/A | — | `website/` ships zero JavaScript — nothing to split. For the native app, Metro bundles one JS bundle per platform at install time (downloaded once via the app store, not per-navigation over a network), so the size-per-navigation problem this checklist item targets doesn't apply the same way it does to a web SPA. Repo-wide grep found no `React.lazy()` and only one incidental dynamic `import()` (`components/theme-toggle.tsx` line 20, used to avoid a require cycle, not for splitting). | Low-priority: if the Expo web export (`web.output: "static"`) is ever promoted to a real deployed target (distinct from `website/`), reassess route-based lazy loading there specifically, since that is the one context where bundle-splitting would meaningfully help. |
| 48 | Internationalization (i18n) | 🔵 N/A | — | Explicitly single-locale by design — CLAUDE.md states the purpose is "a Polish-language mobile app for students in Lodz, Poland," and all UI copy across every screen and the website is hardcoded Polish text with no translation library present. | None — correctly scoped for the stated audience. |
| 49 | Dark mode | ✅ PASS | — | Full theme system: `constants/theme.ts` defines light/dark palettes, `hooks/use-color-scheme.ts` respects `Appearance` system preference with an AsyncStorage-persisted manual override, and `components/theme-toggle.tsx` exposes the toggle in the header. `website/styles.css` independently mirrors the same palette via `@media (prefers-color-scheme: dark)` (lines 16-24) with matching CSS custom properties. | None. |
| 50 | State management | 🔵 N/A | — | Explicitly a deliberate architectural decision documented in CLAUDE.md: *"Do not add global state management (Context, Redux, Zustand) — local state is intentional."* Each screen is self-contained per the architecture summary; the one genuinely cross-cutting piece of state (theme) is handled via a lightweight module-level listener pattern (`hooks/use-color-scheme.ts`) rather than a full state library, appropriately scaled to the app's size. | None. |
| 51 | Data caching | 🔵 N/A | — | No API calls exist anywhere to cache (confirmed by the fetch/axios grep in #13) — all data renders synchronously from in-memory constants, so a data-fetching cache library (React Query/SWR) would add no value. | None. |
| 52 | Analytics | 🔵 N/A | — | No analytics SDK found anywhere in `package.json` or source. Consistent with the landing page's own explicit claim ("Bez konta i bez śledzenia" / no account and no tracking) — correctly N/A rather than a gap. | None — if analytics is ever added, it must be paired with cookie consent (#36) and disclosed in the (currently missing, #34) privacy policy. |
| 53 | PWA / offline mode | ⚠️ PARTIAL | 🟢 LOW | The core product is already "offline-first" by architecture (static bundled data, network only for optional map tiles) for the primary iOS/Android targets, which are inherently installable via the app stores — PWA infrastructure adds no value there. However, `app.json`'s `web.output: "static"` target (the Expo web export) has no `manifest.json`, no registered Service Worker, and no offline fallback page — if that web build is ever actually deployed/promoted as a product surface (distinct from the marketing `website/`), it would not be installable or offline-capable despite the rest of the app's offline-first ethos. | Low priority given web is a secondary/tertiary platform today. If the web export becomes a real deployed target, add `expo-manifest`/a basic Service Worker via `@expo/webpack-config` or equivalent so the messaging ("works offline") is true on every platform, not just native. |

### ⚙️ Backend — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 54 | Redis | 🔵 N/A | — | No server exists to need session storage, caching, or a job queue backing store. | None. |
| 55 | 2FA / MFA | 🔵 N/A | — | No user accounts exist anywhere in this app. | None. |
| 56 | RBAC | 🔵 N/A | — | No user accounts or roles exist — the app is fully public, single-tier, no admin surface. | None. |
| 57 | Refresh tokens | 🔵 N/A | — | No authentication of any kind exists. | None. |
| 58 | API versioning | 🔵 N/A | — | No API exists. | None. |
| 59 | Swagger / OpenAPI | 🔵 N/A | — | No API exists. | None. |
| 60 | Queue system | 🔵 N/A | — | No background jobs exist; nothing is slow or resource-intensive enough (all data is static, in-memory) to warrant deferring off the main thread via a queue. | None. |
| 61 | Cron jobs | 🔵 N/A | — | No automated recurring server-side task exists. Content refresh (per `docs/DATA_SOURCES.md`'s recommended annual update cadence for universities/discounts/costs data) is a manual, human-driven maintenance task, not a software cron job. | None — could eventually be automated as a scraper (already scoped in `docs/DATA_SOURCES.md`), at which point this item would become newly applicable. |
| 62 | Email service | 🔵 N/A | — | No accounts, no notifications, no transactional email need exists. | None. |
| 63 | File storage | 🔵 N/A | — | No user uploads exist anywhere in the app. | None. |
| 64 | ORM / ORM optimization | 🔵 N/A | — | No database, no ORM. | None. |
| 65 | WebSockets / realtime | 🔵 N/A | — | No real-time data requirement exists in this app's feature set. | None. |
| 66 | Feature flags | 🔵 N/A | — | Solo-developer, infrequent-release, static-content app — a feature-flag system would be pure overhead at this scale and release cadence. | None. |

### 🏗️ DevOps / Infrastructure — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 67 | Reverse proxy | 🔵 N/A | — | GitHub Pages (fully managed) handles this for `website/`; no self-hosted origin server exists anywhere in this project. | None. |
| 68 | CDN | ✅ PASS | — | GitHub Pages serves `website/` through its Fastly-backed CDN by default — no additional configuration needed or possible to improve on for a project this size. | None. |
| 69 | Load balancing | 🔵 N/A | — | Fully managed static hosting; no backend instances to balance across. | None. |
| 70 | Auto-scaling | 🔵 N/A | — | No compute instances exist that need to scale. | None. |
| 71 | WAF / Firewall | 🔵 N/A | — | No custom origin server is exposed to the public internet; GitHub Pages' baseline protections are outside this project's control and sufficient for a static marketing page with no forms or dynamic behavior. | None. |
| 72 | Git hooks | ❌ FAIL | 🟡 MEDIUM | No Husky/lefthook/pre-commit configuration exists anywhere (`find . -iname ".husky" -o -iname "lefthook*"` returns nothing; no `prepare` script in `package.json`). `docs/CONTRIBUTING.md` relies entirely on developer discipline ("Run `npm run lint` — all lint errors must be fixed before opening a PR") with zero automated enforcement — and since there is also no CI gate (#27), an un-linted or type-broken commit currently has no barrier at all before landing on `main`. | Add Husky with a `pre-commit` hook running `npm run lint` (and `tsc --noEmit`) — a `prepare: "husky install"` script plus a `.husky/pre-commit` file is a 10-minute addition that meaningfully compounds with fixing #27. |
| 73 | Audit logs | 🔵 N/A | — | No user accounts, no admin actions, no sensitive data — nothing exists that would need a forensic audit trail. | None. |
| 74 | Observability | 🔵 N/A | — | No distributed system or multi-service architecture exists; this is a single static site plus an offline client app. Basic monitoring/error-tracking gaps are already captured individually under #29/#30 rather than needing a full observability stack. | None. |
| 75 | Disaster recovery | 🔵 N/A | — | Fully stateless: the only artifact that matters is the git repository itself (already replicated by GitHub) plus EAS build artifacts (retained by Expo). There is no user data anywhere that could be catastrophically lost. A formal DR runbook would have negligible marginal value at this architecture and scale. | None. |

### 📄 Documentation — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 76 | API docs | 🔵 N/A | — | No API exists to document. | None. |
| 77 | Architecture docs | ✅ PASS | — | `docs/01-architecture.md` includes a genuine ASCII architecture diagram (lines 7-33) showing the component tree, the WebView/Leaflet subsystem, and a written data-flow section — clear and accurate against the actual code structure verified during this audit. | None. |
| 78 | Deployment guide | ⚠️ PARTIAL | 🟢 LOW | `docs/09-deployment.md` and `docs/BUILD.md` together cover EAS build profiles, app identifiers, release steps, and App Store configuration notes (`ITSAppUsesNonExemptEncryption`) in detail. However, **no rollback procedure is documented** for either the mobile app (what to do if a bad build reaches the store — e.g. expedited review vs. remote config kill switch) or the website (`git revert` + re-run of `deploy-landing.yml` is implicit but never written down). Per the checklist definition, this specifically downgrades an otherwise-solid deployment guide to PARTIAL. | Add a short "Rolling Back" section to `docs/09-deployment.md`: for the website, document `git revert <commit> && git push` (workflow re-deploys automatically); for the app, note that native releases can't be "rolled back" in the traditional sense — document the actual mitigation (expedited review request, or a remote feature-flag kill switch if #66 is ever adopted). |
| 79 | Changelog | ✅ PASS | — | `docs/CHANGELOG.md` exists with dated, descriptive entries covering UI unification work, animation consistency fixes, and component removals — genuinely useful history, not a placeholder file. | None. |
| 80 | Contribution guide | ✅ PASS | — | `docs/CONTRIBUTING.md` is thorough: prerequisites, setup, branching/PR workflow, Conventional Commits format, code style rules, and — notably — explicit instructions for safely extending the two most fragile data files (`constants/universities.ts`, `constants/discounts.ts`) and the campus map pins, directly addressing the exact critical-file risks CLAUDE.md itself calls out. | None. |

### 🔒 Security — Advanced

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 81 | Security audits | 🔍 NEEDS REVIEW | — | No evidence of a documented past security review exists in the repo (no security-labeled issues, no review notes found), but this cannot be conclusively ruled out from static analysis alone. Given the architecture (no backend, no accounts, no sensitive data), the residual risk surface is inherently small even without a formal audit. | Not urgent given the risk profile, but a lightweight self-review before the first store submission (focusing on the WebView/unpkg CDN trust boundary flagged in #11) would be a reasonable, low-cost step. |
| 82 | Penetration tests | 🔵 N/A | — | No sensitive data, no accounts, no payment processing, no regulated-industry context — a hobby-scale open-source reference app does not warrant a professional pentest engagement per the checklist's own guidance. | None. |
| 83 | Licensing | ✅ PASS | — | The project itself is MIT-licensed (`LICENSE`, matches the README badge). Spot-checked direct runtime dependencies (`expo`, `react`, `react-native`, `react-native-webview`, `react-native-reanimated`, `react-native-worklets`, `expo-router`) — all MIT. One transitive dependency, `node-forge`, is dual-licensed `BSD-3-Clause OR GPL-2.0` — safe to consume under its permissive BSD option; no AGPL/GPL-only package was found anywhere in `node_modules` during this scan. | None currently. Consider adding `license-checker` as a one-off CI step if the dependency tree grows significantly, to catch any future copyleft addition automatically. |

### 🎯 Other — Additional

| # | Check | Status | Severity | Finding | Recommendation |
|---|-------|--------|----------|---------|----------------|
| 84 | Admin panel | 🔵 N/A | — | No user accounts or operational data exist that would benefit from an admin UI — content is updated by editing TypeScript source files directly (per `docs/DATA_SOURCES.md`'s workflow) and redeploying. | None. |
| 85 | Notifications system | 🔵 N/A | — | No accounts, and no feature in the app's current scope (university guide, cost calculator, discount list, scholarship info) that requires push/email/in-app notifications. | None. |
| 86 | Search engine | 🔵 N/A | — | The in-app "search" (`study.tsx`) filters ~6 universities in-memory; the discount list (`discounts.tsx`) filters ~17 partners by category. A dedicated search engine (Elasticsearch/Algolia/Meilisearch) would be significant over-engineering at this data volume — a database-grade search problem simply doesn't exist yet. | None at current scale. Revisit only if `docs/DATA_SOURCES.md`'s planned expansion (19 universities, 200+ discount partners) is fully executed and search UX starts to feel sluggish — even then, a few hundred records is still well within plain array-filter territory. |
| 87 | Performance optimization | ❌ FAIL | 🟠 HIGH | Concrete, file-verified finding: several city-gallery photographs are shipped as **uncompressed PNG** rather than JPEG/WebP, which is the wrong format for photographic content and massively inflates file size for no visual benefit. Confirmed via `file`/`ls`: `assets/images/lodz4_png.png` (3.69MB, 1600×1065), `lodz2_png.png` (3.18MB, 1500×1000), `lodz5.png` (2.5MB, 1440×1080), `lodz1_jpg.jpg` (2.03MB — also oversized for a JPEG at this resolution), `lodz3_png.png` (1.67MB), `lodz1_png.png` (1.33MB), plus `icon.png` at 393KB for a 1024×1024 app icon (typically achievable well under 100KB). All of these are genuinely used — confirmed via grep, they're `require()`'d in both `app/(tabs)/lodz.tsx` (city gallery) and `app/modal.tsx` (full-screen image viewer) — this is roughly **14.8MB of photo assets bundled into every single install**, for an app whose own marketing copy emphasizes working well on weak connectivity/limited storage. | Re-export all photographic assets (`lodz1`–`lodz5`, `icon.png`) as JPEG (quality ~80) or WebP using a tool like `sharp`/`squoosh` — typically an 80-90% size reduction with no visible quality loss for photos. Re-generate `icon.png` from source art at a reasonable PNG compression level (1024×1024 PNGs for app icons are routinely under 150KB when properly optimized). This alone would likely cut several megabytes off the shipped app size. |

---

## Action Plan

### 🔴 Critical — Fix Before Launch
1. **Privacy policy (#34)** — Write and publish a short privacy policy page (`website/privacy.html` or similar), covering the app's minimal data footprint, and link it from both store listings. Required for App Store/Play Store submission regardless of how little data is collected. — *Effort: 1-2 hours.*
2. **`eas.json` `submit.production` config (already known)** — Add `appleId`/`ascAppId` (iOS) and `serviceAccountKeyPath`/`track` (Android) per `docs/BUILD.md` before attempting `eas submit`. — *Effort: 30-60 minutes, requires Apple/Google credentials.*

### 🟠 High — Fix Shortly After Launch
1. **Add a test suite (#12)** — Jest + `@testing-library/react-native`; start with data-invariant tests (category matching, university type union) and a smoke render test per screen. — *Effort: 1-2 days.*
2. **Add a CI pipeline (#27)** — GitHub Actions workflow running lint + typecheck (+ tests once #12 lands) on every PR; add a minimal check step to `deploy-landing.yml` before publish. — *Effort: half a day.*
3. **Integrate crash/error reporting (#30) + root ErrorBoundary (#7)** — `@sentry/react-native` (or `sentry-expo`) plus a top-level `ErrorBoundary` component in `app/_layout.tsx`. — *Effort: half a day.*
4. **Accessibility labels (#44)** — Add `accessibilityLabel`/`accessibilityRole` to all icon-only buttons and content images, starting with the modal close button, tab icons, and gallery images. — *Effort: 1 day.*
5. **Compress photo assets (#87)** — Re-export `lodz1`–`lodz5` gallery photos and `icon.png` as optimized JPEG/WebP/PNG. — *Effort: 2-3 hours.*
6. **Dependency vulnerability scanning (#38)** — Enable Dependabot; run `npm audit fix` for the fixable subset now. — *Effort: 1 hour to enable, ongoing triage after.*

### 🟡 Medium — Next Sprint
1. **Git pre-commit hooks (#72)** — Husky `pre-commit` running lint + typecheck, complementing the new CI gate. — *Effort: 1-2 hours.*
2. **Website SEO basics (#45)** — Open Graph tags, `robots.txt`, `sitemap.xml` for `website/index.html`. — *Effort: 2-3 hours.*
3. **CSP + Subresource Integrity (#11)** — Add a CSP meta tag to `website/index.html`; add `integrity` attributes (or vendor locally) to the unpkg-loaded Leaflet assets in `study-map.tsx`/`modal.tsx`. — *Effort: 2-3 hours.*
4. **Type-safe discount category (#5)** — Derive `DiscountPartner.category` as a literal union from `DISCOUNT_CATEGORIES` instead of a bare `string`. — *Effort: 30 minutes.*

### 🟢 Low — Backlog
1. **Staging step for website deploys (#25)** — PR-preview or manual-approval gate before `gh-pages` publish; document the EAS `preview` profile as the app's informal staging channel. — *Effort: half a day.*
2. **Deployment rollback docs (#78)** — Add a short "Rolling Back" section to `docs/09-deployment.md`. — *Effort: 30 minutes.*
3. **README Expo Go ordering (#32)** — Reorder the Prerequisites section so the Expo Go caveat isn't a dead end. — *Effort: 10 minutes.*
4. **PWA manifest for web export (#53)** — Only relevant if the Expo web build is ever promoted to a real deployed surface. — *Effort: half a day, deferred.*

---

## Evidence Log

**Files/directories inspected:**
- `CLAUDE.md` (architecture, conventions, known constraints)
- `package.json`, `package-lock.json`, `eas.json`, `app.json`, `eslint.config.js`, `tsconfig.json`, `.gitignore`
- `app/_layout.tsx`, `app/modal.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/*.tsx` (all 6 tab screens)
- `components/*.tsx` (all, including `presentation-hero.tsx`/`animated-category-item.tsx` — confirmed dead code as already documented)
- `hooks/use-color-scheme.ts`, `hooks/use-color-scheme.web.ts`, `hooks/use-responsive.ts`
- `constants/universities.ts`, `constants/discounts.ts`, `constants/theme.ts`
- `website/index.html`, `website/styles.css`, `website/assets/*`
- `.github/workflows/deploy-landing.yml`
- `docs/00-overview.md` through `docs/10-conventions.md`, `docs/BUILD.md`, `docs/CHANGELOG.md`, `docs/CONTRIBUTING.md`, `docs/DATA_SOURCES.md`
- `README.md`, `LICENSE`
- `assets/images/*` (file sizes and dimensions via `file`/`ls`)

**Commands run:**
- `grep -rn "console\.\(log\|warn\|error\)" app components hooks constants` → zero matches
- `grep -rn "fetch(\|axios"` across app/components/hooks/constants → zero matches (confirms no network/backend)
- `grep -rln "try {"` → `use-color-scheme.web.ts`, `icon-symbol.ios.tsx`, `app/_layout.tsx`, `themed-view.tsx`, `use-color-scheme.ts`
- `grep -rn "accessibilityLabel\|accessibilityRole\|accessible="` app components → 0 matches
- `find . -iname "*.test.*" -o -iname "*.spec.*"` (excluding node_modules) → 0 results; no test runner in `package.json`
- `find . -iname ".husky" -o -iname "lefthook*"`, `find .github -iname "dependabot*" -o -iname "renovate*"` → 0 results
- `find . -iname '*privacy*' -o -iname '*terms*'` (excluding node_modules) → 0 results
- `npm audit --production --json` → `{'info': 0, 'low': 1, 'moderate': 17, 'high': 9, 'critical': 1, 'total': 28}`; critical finding identified as `shell-quote` (GHSA-w7jw-789q-3m8p)
- `git ls-files dist/` → empty (confirms `dist/` is gitignored, contradicting `docs/09-deployment.md`'s claim that it's committed — minor doc drift, not separately scored)
- `git log --all --oneline | wc -l` → 40 commits; no secret patterns found via history/diff review in scope
- License spot-check on `expo`, `react`, `react-native`, `react-native-webview`, `react-native-reanimated`, `react-native-worklets`, `expo-router` package.json `license` fields → all MIT; broader `node_modules` scan for GPL-family licenses found only `node-forge` (`BSD-3-Clause OR GPL-2.0`, dual-licensed, safe under BSD option)
- `file`/`ls -la` on `assets/images/*` and `website/assets/*` → identified oversized PNG photo assets (see #87) and confirmed `website/assets/hero.jpg` (311KB, 1300×640) is reasonably sized
- `grep -oE 'href="#[a-z-]+"'` / `grep -oE 'id="[a-z-]+"'` on `website/index.html` → all internal anchors resolve, no broken links found
- `grep -n "https://\|http://"` in `components/study-map.tsx`, `app/modal.tsx` → confirmed all external requests (unpkg.com, basemaps.cartocdn.com) use HTTPS

**Known pre-existing items (per user's brief, not re-flagged as new discoveries, but retained for completeness):**
- `eas.json` `submit.production: {}` — confirmed still empty; folded into Critical Blockers above alongside the newly-found privacy policy gap.
- `components/presentation-hero.tsx` and `components/animated-category-item.tsx` — confirmed genuinely unreferenced by any screen (only `presentation-hero.tsx` has a stray internal `require('@/assets/images/image.jpg')`, but the component itself is never imported/rendered anywhere).
- University field lists (6 of ~19) and discount partners (17 of ~200+) — confirmed against `docs/DATA_SOURCES.md`, consistent with what's documented; not re-flagged as a new finding.

**Deviation from standard instructions:** report saved to `<repo-root>/report/production-readiness-report.md` instead of `/report/production-readiness-report.md` because the sandbox filesystem root is read-only (see agent memory: `project-report-root-readonly`).
