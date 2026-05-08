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

There is no CI/CD pipeline configured. Builds are triggered manually via the EAS CLI.
