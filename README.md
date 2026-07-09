<h1 align="center">StudiujWŁodzi</h1>
<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.79-61DAFB?logo=react&logoColor=white" alt="React Native">
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?logo=expo&logoColor=white" alt="Expo SDK 54">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/platform-iOS_%7C_Android_%7C_Web-lightgrey" alt="Platform">
  <img src="https://img.shields.io/badge/version-1.0.0-orange" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License MIT">
</p>
<p align="center">
  A cross-platform mobile app that aggregates university information, a city guide, scholarships, student discounts, and a cost-of-living calculator into a single offline-friendly experience for students in Łódź, Poland.
</p>

---

## Table of Contents

- [About](#about)
- [Recognition](#recognition)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)

---

## About

Students moving to Łódź face fragmented information — universities, discounts, scholarships, and cost estimates are spread across dozens of websites. **StudiujWŁodzi** aggregates everything into a single, offline-friendly mobile app.

| Audience | What they get |
|---|---|
| Prospective students | University comparison, field-of-study breakdowns |
| New arrivals | City guide, cost calculator, interactive campus map |
| Current students | Discount database, scholarship listings, student life tips |

---

## Recognition

**Finalist — TOP 3 · APPetyt na studiowanie w Łodzi** · November 2025  
*Organized by Uniwersytet Łódzki during Łódź IT Days at the Faculty of Mathematics and Computer Science*

Secured a finalist spot (Top 3 out of 13 competing teams) in a software development hackathon focused on promoting academic opportunities in Łódź. Responsibilities during the competition:

- Architected and built the mobile client application from scratch using React Native and Expo
- Designed a fluid user interface utilizing advanced navigation patterns and performance-optimized animations (Reanimated)
- Defended the technical architecture and product design during the final evaluation round before the university committee

---

## Features

| Screen | Description |
|---|---|
| **Home** | Animated navigation hub with quick-access cards |
| **University Guide** | Searchable list of Łódź universities with field-of-study details; filterable by type; tap any entry for a full detail modal |
| **About Łódź** | City overview — attractions, student life highlights, neighborhoods guide, and a campus map |
| **Campus Map** | Inline map preview (CARTO tiles via Leaflet) with a button that opens a full-screen interactive modal |
| **Scholarships & Student Life** | National scholarship types with amounts, gov.pl deep-links, and everyday student life tips |
| **Cost of Living Calculator** | Adjustable sliders across four categories; live pie chart and total; reset to defaults |
| **Student Discounts** | Categorized database of discount partners (Karta Łodzianina / Młodzi w Łodzi); tap a category to filter |
| **Dark / Light Mode** | System-aware theme, manual override persisted via AsyncStorage |

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [React Native](https://reactnative.dev/) + [Expo SDK 54](https://expo.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict mode) |
| Routing | [Expo Router v6](https://expo.github.io/router/) (file-based) |
| Navigation | [React Navigation](https://reactnavigation.org/) — Bottom Tabs |
| Animations | [React Native Reanimated 4](https://docs.swmansion.com/react-native-reanimated/) + `react-native-worklets` |
| Map | [Leaflet.js](https://leafletjs.com/) in `react-native-webview` — tiles from [CARTO](https://carto.com/) (OSM data) |
| Charts | [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit) + [react-native-svg](https://github.com/software-mansion/react-native-svg) |
| Sliders | [@react-native-community/slider](https://github.com/callstack/react-native-slider) |
| Haptics | [expo-haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) |
| Icons | [Expo Vector Icons](https://docs.expo.dev/guides/icons/) + [expo-symbols](https://docs.expo.dev/versions/latest/sdk/symbols/) (SF Symbols on iOS) |
| Gradients | [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) |
| Storage | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| Linting | [ESLint](https://eslint.org/) + `eslint-config-expo` |

---

## Project Structure

```
StudiujWLodzi/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Bottom tab navigator
│   │   ├── index.tsx             # Home screen
│   │   ├── study.tsx             # University guide
│   │   ├── lodz.tsx              # About Łódź
│   │   ├── scholarship.tsx       # Scholarships & student life
│   │   ├── costs.tsx             # Cost of living calculator
│   │   └── discounts.tsx         # Student discounts
│   ├── modal.tsx                 # Shared modal (university detail / image viewer / full-screen map)
│   └── _layout.tsx               # Root layout — fonts, splash screen, theme init
├── assets/
│   └── images/                   # App icon, splash screen, city photos
├── components/
│   ├── ui/
│   │   ├── collapsible.tsx
│   │   ├── custom-checkbox.tsx
│   │   ├── icon-symbol.tsx       # Cross-platform icon (SF Symbols on iOS, MaterialIcons elsewhere)
│   │   ├── icon-symbol.ios.tsx
│   │   ├── list-item.tsx
│   │   └── themed-icon.tsx
│   ├── animated-card.tsx         # Fade-in entrance card with optional press-scale interaction
│   ├── animated-category-item.tsx
│   ├── content-container.tsx     # Max-width centering wrapper (900 px cap) for tablet layouts
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── parallax-scroll-view.tsx
│   ├── presentation-hero.tsx
│   ├── read-more.tsx             # Expandable text — "Czytaj więcej / mniej"
│   ├── study-map.tsx             # Non-interactive campus map preview + modal launcher
│   ├── theme-toggle.tsx
│   ├── themed-text.tsx
│   └── themed-view.tsx
├── constants/
│   ├── discounts.ts              # Discount categories and partner list
│   ├── theme.ts                  # Color palette (light / dark)
│   └── universities.ts           # University data and field-of-study breakdowns
├── hooks/
│   ├── use-color-scheme.ts       # Color scheme with AsyncStorage persistence
│   ├── use-color-scheme.web.ts   # Web-specific override
│   ├── use-responsive.ts         # isTablet, padding, contentWidth helpers
│   └── use-theme-color.ts
├── docs/
│   ├── CHANGELOG.md
│   ├── CONTRIBUTING.md
│   └── DATA_SOURCES.md
├── app.json                      # Expo app config
├── eas.json                      # EAS Build / Submit config
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) LTS (v20 or later)
- A [development build](https://docs.expo.dev/develop/development-builds/introduction/) or a local simulator/emulator — this project uses `react-native-worklets` and `react-native-webview`, which require native modules and **do not run in plain Expo Go**
- iOS: [Xcode](https://developer.apple.com/xcode/) 15+ (macOS only)
- Android: [Android Studio](https://developer.android.com/studio) with SDK 34+

### Installation

```bash
git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
cd StudiujWLodzi
npm install
```

### Running the app

```bash
npm start
```

Expo developer tools will open in your browser. Then press a key to launch:

| Key | Target |
|---|---|
| `i` | iOS simulator (macOS only) |
| `a` | Android emulator |
| `w` | Web browser |
| Scan QR | A development build installed on a physical device (not Expo Go — see Prerequisites above) |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android emulator / device |
| `npm run ios` | Run on iOS simulator / device |
| `npm run web` | Run in a web browser |
| `npm run lint` | Run ESLint across the project |
| `npm run reset-project` | Reset Expo project cache and state |

---

## Data Sources

All content is currently static and bundled with the app. See [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) for a full breakdown of every dataset: origin, known limitations, authoritative sources, and recommended update cadence.

---

## Contributing

Contributions are welcome. Please read [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md) before opening a pull request.

---

## License

MIT — see [`LICENSE`](LICENSE) for details.
