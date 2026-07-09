# Deployment

All builds and store submission are handled via **EAS Build** (Expo Application Services). Local Xcode and Android Studio are not required for production builds.

For detailed step-by-step instructions including Apple ID setup, App Store Connect configuration, and Google Play Console setup, see the comprehensive guide in [`docs/BUILD.md`](./BUILD.md).

## EAS Build Profiles

Defined in `eas.json`:

| Profile | Platform | Output | Purpose |
|---|---|---|---|
| `development` | iOS / Android | internal distribution | Dev client build for local development |
| `preview` | Android | `.apk` | Direct install / sideloading on a personal device |
| `production` | iOS | `.ipa` | App Store submission |
| `production` | Android | `.aab` | Google Play submission |

`autoIncrement: true` is set on the production profile — build numbers increment automatically on each production build.

## Quick Reference Commands

```sh
# Install EAS CLI
npm install -g eas-cli

# Authenticate
eas login

# Build for personal Android device (no Play account needed)
eas build --platform android --profile preview

# Production builds
eas build --platform ios --profile production
eas build --platform android --profile production
eas build --platform all --profile production     # both at once

# Submit to stores (uses the last completed build)
eas submit --platform ios --latest
eas submit --platform android --latest
eas submit --platform all --latest
```

## App Identifiers

| Platform | Identifier |
|---|---|
| iOS bundle ID | `com.konradxmalinowski.StudiujWLodzi` |
| Android package | `com.konradxmalinowski.StudiujWLodzi` |
| EAS project ID | `7819e89d-90b2-459d-a1ce-e21164de1eeb` |
| Expo slug | `StudiujWLodzi` |
| Deep link scheme | `studiujwlodzi` |

## Releasing a New Version

1. Update `"version"` in `app.json` (e.g., `"1.0.1"`)
2. Build numbers are auto-incremented — no manual change needed
3. Run the production build and submit:
   ```sh
   eas build --platform all --profile production
   eas submit --platform all --latest
   ```

## App Store Configuration Notes

**iOS:** `ITSAppUsesNonExemptEncryption: false` is set in `app.json` → `ios.infoPlist`. This is required by Apple for apps that do not use non-exempt encryption; it prevents the compliance question during review.

**Android:** Adaptive icon layers are configured in `app.json`:
- `foregroundImage`: `android-icon-foreground.png`
- `backgroundImage`: `android-icon-background.png`
- `backgroundColor`: `#E6F4FE`
- `monochromeImage`: `android-icon-monochrome.png`

Edge-to-edge is enabled (`edgeToEdgeEnabled: true`). Predictive back gesture is disabled (`predictiveBackGestureEnabled: false`).

## Web Export

```sh
npx expo export --platform web
```

Output goes to `dist/`. The web build uses `"output": "static"` (configured in `app.json`). The `dist/` directory is committed to the repository (it already exists with a previous export).

## Build Monitoring

All builds are visible at:
```
https://expo.dev/accounts/konradxmalinowski/projects/StudiujWLodzi/builds
```

## CI/CD

`.github/workflows/ci.yml` runs lint, typecheck, and the Jest test suite on every push/PR to `main`. It does not build or submit the app — native builds are still triggered manually via the EAS CLI.

`.github/workflows/deploy-landing.yml` validates and deploys the marketing site in `website/` to the `gh-pages` branch whenever `website/**` changes on `main`.

## Rolling Back

**Website (`website/`):** deploys are just a git-tracked static site — revert the offending commit and push; `deploy-landing.yml` redeploys automatically:
```sh
git revert <bad-commit-sha>
git push
```

**Mobile app:** native releases can't be rolled back the way a web deploy can — once a build is live in the App Store / Google Play, the only options are:
- Submit a new build with the fix and request **expedited review** (Apple typically approves expedited requests within 24-48h for clear regressions)
- If the issue is severe enough to warrant pulling the app, temporarily unpublish it from App Store Connect / Play Console while the fix is prepared

There is currently no remote feature-flag/kill-switch mechanism in the app (out of scope at this project's size — see CLAUDE.md's "no global state management" convention), so a broken native release cannot be mitigated without shipping a new build.
