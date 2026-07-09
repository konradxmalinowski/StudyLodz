# Landing page for StudiujWLodzi

## Problem summary
The app itself has no marketing front door — only the mobile/web app UI. We need a
standalone landing page that presents the app to prospective users, matches its visual
language, and deploys automatically to GitHub Pages (`gh-pages` branch) on every push.

## Decisions (confirmed with user)
- Landing page lives in its own `website/` folder — plain HTML/CSS/JS, independent of the
  Expo/React Native build. It is not part of `app/`, not exported via `expo export`, and
  does not affect EAS builds.
- No app-store / download CTA (app isn't published yet, `eas.json` `submit.production` is
  still `{}`). The page is pure presentation of what the app does. The only outbound CTA is
  a link to the public GitHub repository (real, not a placeholder).
- Deploy target: GitHub Pages via a `gh-pages` branch, rebuilt on every push to `main` that
  touches `website/**` (GitHub Actions + `peaceiris/actions-gh-pages`).

## Content sources (from real app data, not generic copy)
- `docs/00-overview.md` — purpose, target audience, problem framing (fragmented info across
  many university/city sites), full feature list
- `README.md` — features table, audience table, hackathon recognition (Top 3 finalist,
  APPetyt na studiowanie w Łodzi, Łódź IT Days, Uniwersytet Łódzki, Nov 2025)
- `docs/04-screens.md` / `docs/05-data.md` — concrete per-screen behavior (6 universities,
  17 discount partners across 6 categories, 4 scholarship types, cost calculator categories)
- `constants/theme.ts` — colors: tint `#4E56C0` (indigo), light bg `#fff`/text `#11181C`,
  dark bg `#151718`/text `#ECEDEE`
- `app/(tabs)/index.tsx` — section accent colors (`#4E56C0`, `#2E8B57`), card pattern (top
  border accent, icon chip with `accentColor + '18'` background, 16px radius, subtle shadow)
- `app/(tabs)/costs.tsx` — chart category colors (`#FF6384`, `#36A2EB`, `#FFCE56`, `#4BC0C0`)
  reused for feature-icon variety
- `hooks/use-responsive.ts` — breakpoint 768px, max content width 900px (mirrored in CSS)

## Sections
1. Hero — value proposition, app icon mark, hero photo (`assets/images/image.jpg`, already
   used as the in-app home header)
2. Problem — fragmented info across dozens of sites (real framing from docs/00-overview.md)
3. Features — 6 cards mirroring the actual screens (Home, Study guide, About Łódź,
   Scholarships, Cost calculator, Discounts) with real counts (6 universities, 17 partners,
   4 scholarships)
4. How it works — offline-first, static data, no accounts/login, no backend
5. Who it's for — 3 audience rows from README table (prospective students / new arrivals /
   current students)
6. Recognition — Top 3 finalist, APPetyt na studiowanie w Łodzi hackathon (real, adds
   credibility without marketing fluff)
7. CTA — link to GitHub repo (source, MIT license) — no store badges
8. Footer — author, license, repo link

## Visual direction
- No gradients, no hero video, no scroll-jacking animation. Static, editorial layout: real
  photo, generous whitespace, strong type hierarchy.
- Reuse app tokens: indigo tint, card style (16px radius, subtle shadow, light/dark card
  bg `#f9f9f9`/`#1c1c1e`), 768px/900px breakpoints.
- `prefers-color-scheme` driven dark mode using the exact app color values.
- System font stack (no webfont download) to match the app's native-feel typography.

## Files to add
- `website/index.html`
- `website/styles.css`
- `website/assets/` — optimized copies of `icon.png` (resized), `image.jpg`, `favicon.png`
- `.github/workflows/deploy-landing.yml` — builds nothing (static), publishes `website/` to
  `gh-pages` branch on push to `main` touching `website/**` or the workflow itself

## Agent delegation
None — this is a small, self-contained static HTML/CSS deliverable outside the RN app's
component system. No specialized agent (frontend-agent targets RN/Expo code) fits better
than direct implementation. No backend/database/auth/security-relevant surface is touched,
so those steps of the standard workflow are not applicable.

## Verification
- Open `website/index.html` directly in a browser tab (light + dark OS theme, mobile width
  ~375px and desktop ~1440px)
- Confirm `npm run lint` still passes for the untouched RN app (no regression)
- Confirm the new GitHub Actions workflow YAML is valid
