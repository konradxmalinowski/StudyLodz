# Contributing to StudiujWŁodzi

Thank you for your interest in contributing. Please follow the guidelines below to keep the codebase consistent and the review process smooth.

---

## Prerequisites

- [Node.js](https://nodejs.org/) LTS (v20 or later)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- Expo CLI: `npm install -g expo-cli` (optional — `npx expo` works without a global install)

---

## Setup

```sh
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
npm start
```

> The app uses `react-native-webview` and `react-native-worklets`, which require a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or a local simulator. Expo Go will not run this project.

---

## Workflow

1. Fork the repository and create a branch from `main`.
2. Keep each branch focused on one logical change.
3. Run `npm run lint` — all lint errors must be fixed before opening a PR.
4. Test on at least two targets (e.g. iOS simulator + Android emulator, or phone + web).
5. Open a pull request against `main` with a clear title and description of **what** changed and **why**.

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     new functionality
fix:      bug fix
refactor: restructuring without behavior change
chore:    tooling, config, or dependency updates
docs:     documentation only
```

- Subject line ≤ 72 characters, imperative mood, no trailing period.
- One logical change per commit.

---

## Code Style

- All code is TypeScript with strict mode enabled.
- Follow existing naming and file-structure conventions.
- No comments unless the **why** is non-obvious (not the what).
- No unused imports or dead code.
- No `console.log` / `console.warn` / `console.error` in production paths.

---

## Adding or Updating Data

### Universities — `constants/universities.ts`

Follow the existing `University` type exactly. Do not change the type shape without updating every consuming screen (`study.tsx`, `modal.tsx`).

### Discount partners — `constants/discounts.ts`

Follow the existing `DiscountPartner` type. Category names in `DISCOUNT_PARTNERS` must exactly match entries in `DISCOUNT_CATEGORIES` — the filter in `discounts.tsx` does a strict string comparison.

### Campus map pins — `components/study-map.tsx`

Coordinates are hardcoded Leaflet marker positions. To add or correct a pin, find the exact GPS coordinates on [openstreetmap.org](https://www.openstreetmap.org) and update both `study-map.tsx` (preview) and the `CAMPUSES_MAP_HTML` constant in `app/modal.tsx` (interactive modal).

---

## Reporting Bugs

Open a GitHub issue with:

- Steps to reproduce
- Expected vs. actual behavior
- Platform (iOS / Android / Web) and Expo SDK version
- Relevant error output or screenshot
