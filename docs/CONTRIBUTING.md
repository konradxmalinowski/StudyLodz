# Contributing to StudyLodz

Thanks for your interest in contributing. Follow the steps below.

## Prerequisites

Node.js LTS (v20+), npm, and Expo CLI installed locally.

## Setup

```sh
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
npm start
```

## Workflow

1. Fork the repository and create a branch from `main`.
2. Make your changes. One logical change per branch.
3. Run `npm run lint` — all lint errors must pass before opening a PR.
4. Test on at least two targets (e.g. iOS simulator + Android emulator, or device + web).
5. Open a pull request against `main` with a clear description of what and why.

## Commit messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat:     new functionality
fix:      bug fix
refactor: restructuring without behavior change
chore:    tooling, config, dependencies
docs:     documentation only
```

Keep the subject line under 72 characters, imperative mood, no trailing period.

## Code style

- All code is TypeScript with strict mode.
- Follow the existing naming and file structure conventions.
- No comments unless the **why** is non-obvious.
- No unused imports or dead code.
- No `console.log` / `console.warn` / `console.error` in production paths.

## Adding university or discount data

Data lives in `constants/universities.ts`. Follow the existing `University` type — do not change the type shape without a corresponding update to all consuming screens.

## Reporting bugs

Open a GitHub issue with:
- Steps to reproduce
- Expected vs. actual behavior
- Platform (iOS / Android / Web) and Expo SDK version
