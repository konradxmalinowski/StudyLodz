# Setup

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 20 LTS or later | Required |
| npm | 10+ | Bundled with Node.js |
| Expo Go | Latest | Only for quick preview — see note below |
| Xcode | 15+ | iOS builds only; macOS only |
| Android Studio | Latest + SDK 34+ | Android builds only |
| EAS CLI | 16.25+ | Cloud builds and store submission |

> **Expo Go will not run this project.** The app uses `react-native-webview` and `react-native-worklets`, which require native modules not included in Expo Go. You must use a development build, local simulator, or physical device with the dev client. See the [Development section](./08-development.md) for setup.

## Installation

```sh
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
```

## Environment Variables

This project has no `.env` files and no runtime environment variables. All configuration is in:
- `app.json` — Expo app config (bundle ID, icons, splash screen, EAS project ID)
- `eas.json` — EAS build and submit profiles

## Running Locally

### Development server
```sh
npm start
```
Expo dev tools open in the browser. Then:
- Press `i` — iOS simulator (macOS only)
- Press `a` — Android emulator
- Press `w` — Web browser
- Scan QR code — Physical device with Expo Go (limited, see note above)

### Platform shortcuts
```sh
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web browser
```

### First-time device setup (development build)
For full functionality on a physical device, you need a development build:
```sh
npm install -g eas-cli
eas login
eas build --profile development --platform ios     # or android
```
Install the resulting `.ipa` / `.apk` on your device, then run `npm start` and scan the QR code.

## TypeScript Path Alias

The `@/*` alias resolves to the project root. Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

All internal imports use `@/` rather than relative paths.
