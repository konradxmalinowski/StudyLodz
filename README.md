# StudyLodz – Your Student Essentials

A mobile app for every student in Łódź, Poland. It aggregates university info, city guides, scholarships, discounts, and a cost-of-living calculator into one place.

![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)

## About the Project

Students moving to Łódź face fragmented information — universities, discounts, scholarships, and events are spread across dozens of websites. **StudyLodz** solves this by aggregating everything into a single, offline-friendly mobile app.

### Target audience

| Group | What they get |
|---|---|
| Prospective students | University comparison, field-of-study descriptions |
| New arrivals | City guide, cost calculator, campus map |
| Current students | Discount database, scholarship listings, student life tips |

## Features

- **Home** — quick navigation hub with animated hero
- **University Guide** — searchable list of Łódź universities with field-of-study breakdowns and an interactive OpenStreetMap campus map
- **About Łódź** — city overview with attractions and student life highlights
- **Scholarships & Student Life** — scholarship types and everyday student life tips
- **Cost of Living Calculator** — adjustable sliders to estimate monthly expenses
- **Student Discounts** — categorized database of places offering student discounts
- **Dark / Light Mode** — system-aware theme with manual override, persisted via AsyncStorage

## Screenshots

> Screenshots coming soon.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Routing | [Expo Router](https://expo.github.io/router/) (file-based) |
| Navigation | [React Navigation](https://reactnavigation.org/) (Bottom Tabs) |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| Map | [Leaflet.js](https://leafletjs.com/) via [OpenStreetMap](https://www.openstreetmap.org/) inside `react-native-webview` |
| Charts | [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) |
| Sliders | [@react-native-community/slider](https://github.com/callstack/react-native-slider) |
| Haptics | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) |
| Icons | [Expo Vector Icons](https://docs.expo.dev/guides/icons/) + [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) |
| Styling | StyleSheet API, [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) |
| Storage | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| Linting | [ESLint](https://eslint.org/) + eslint-config-expo |

## Project Structure

```
StudyLodz/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Bottom tab navigator
│   │   ├── index.tsx         # Home screen
│   │   ├── study.tsx         # University guide
│   │   ├── lodz.tsx          # About Łódź
│   │   ├── scholarship.tsx   # Scholarships & student life
│   │   ├── costs.tsx         # Cost of living calculator
│   │   └── discounts.tsx     # Student discounts
│   ├── modal.tsx             # University detail modal
│   └── _layout.tsx           # Root layout (fonts, splash, theme)
├── assets/
│   └── images/               # App icons, splash, and photos
├── components/
│   ├── ui/
│   │   ├── collapsible.tsx
│   │   ├── custom-checkbox.tsx
│   │   ├── icon-symbol.tsx   # Cross-platform icon (iOS: SF Symbols, other: MaterialIcons)
│   │   ├── icon-symbol.ios.tsx
│   │   ├── list-item.tsx
│   │   └── themed-icon.tsx
│   ├── animated-card.tsx
│   ├── animated-category-item.tsx
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── parallax-scroll-view.tsx
│   ├── read-more.tsx
│   ├── study-map.tsx         # Interactive Leaflet map (native)
│   ├── study-map.web.tsx     # Map fallback for web
│   ├── theme-toggle.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── constants/
│   ├── theme.ts              # Color palette
│   └── universities.ts       # University and field-of-study data
├── hooks/
│   ├── use-color-scheme.ts
│   └── use-color-scheme.web.ts
├── docs/
│   ├── CHANGELOG.md          # Code audit history
│   └── CONTRIBUTING.md       # Contribution guide
├── app.json                  # Expo config
├── eas.json                  # EAS Build / Submit config
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (v20 or later)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Expo Go](https://expo.dev/go) on your iOS or Android device — **or** a simulator/emulator

For native builds:
- iOS: [Xcode](https://developer.apple.com/xcode/) (macOS only)
- Android: [Android Studio](https://developer.android.com/studio)

### Installation

```sh
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
```

### Running the App

```sh
npm start
```

Expo developer tools will open in your browser. Then choose a target:

| Command | Target |
|---|---|
| Press `i` | iOS simulator (macOS only) |
| Press `a` | Android emulator |
| Press `w` | Web browser |
| Scan QR code | Expo Go on a physical device |

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start the Expo development server |
| `npm run android` | Run directly on Android emulator/device |
| `npm run ios` | Run directly on iOS simulator/device |
| `npm run web` | Run in a web browser |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset Expo project state |

## Data Sources

Most content in the app is static. [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md) documents every hardcoded dataset: what it is, where it came from, what should eventually be scraped, and how often it should be refreshed.

## Contributing

Contributions are welcome. Please read [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) before opening a pull request.

## License

MIT — see [LICENSE](LICENSE) for details.
