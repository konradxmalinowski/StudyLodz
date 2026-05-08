# Architecture

## System Architecture

StudiujWLodzi is a purely client-side mobile application with no backend, no API calls, and no database. All content is hardcoded in TypeScript constants files and shipped with the binary. The only network traffic at runtime is the Leaflet tile CDN (`basemaps.cartocdn.com`) loaded inside a WebView — the app is otherwise fully offline.

```
┌──────────────────────────────────────────────────────────────┐
│                        Expo / React Native                    │
│                                                              │
│  app/_layout.tsx  (root: theme init, splash, Stack nav)      │
│       │                                                      │
│       ├── app/(tabs)/_layout.tsx  (bottom tab navigator)     │
│       │       ├── index.tsx       Home                       │
│       │       ├── study.tsx       University guide           │
│       │       ├── lodz.tsx        About Lodz                 │
│       │       ├── scholarship.tsx Scholarships               │
│       │       ├── costs.tsx       Cost calculator            │
│       │       └── discounts.tsx   Student discounts          │
│       │                                                      │
│       └── modal.tsx  (shared modal — 3 modes via params)     │
│                                                              │
│  components/          Reusable UI primitives                 │
│  constants/           Static data (universities, discounts)  │
│  hooks/               Theme, responsive, color utilities     │
│                                                              │
│  ┌────────────────────────────────────────────┐              │
│  │  WebView (react-native-webview)             │              │
│  │    Leaflet 1.9.4 + CARTO Voyager tiles      │              │
│  │    Used for campus map preview and modal    │              │
│  └────────────────────────────────────────────┘              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

```
constants/universities.ts
constants/discounts.ts
app/(tabs)/costs.tsx (inline CATEGORIES array)
app/(tabs)/scholarship.tsx (inline SCHOLARSHIPS array)
app/(tabs)/lodz.tsx (inline TIDBITS, BENEFITS, etc.)
         │
         │  imported directly into screen components
         ▼
Screen component (React state for filter/slider values)
         │
         │  rendered via
         ▼
ThemedView / ThemedText / AnimatedCard / ...
         │
         │  theme colors from
         ▼
useColorScheme() → Colors[scheme].xxx
         │
         │  override persisted in
         ▼
AsyncStorage (native) / localStorage (web)
```

For the campus map specifically:

```
StudyMap component (inline WebView, pointerEvents=none)
         │  user taps overlay button
         ▼
router.push('/modal?map=campuses')
         │
         ▼
modal.tsx renders full-screen WebView
         │  fetches at runtime (requires network)
         ▼
CARTO CDN (basemaps.cartocdn.com) — OSM-derived map tiles
```

## Key Architectural Decisions

### Static data only
All content lives in `constants/`. There is no API, no CMS, and no fetch call. This makes the app fully offline-capable and eliminates latency. The trade-off is that updating data (e.g., new universities, new discounts) requires a new app release.

### File-based routing with Expo Router
Expo Router v6 maps the `app/` directory directly to routes. A single `app/modal.tsx` handles three distinct modal use cases (university detail, image viewer, full-screen map) by switching on URL params. This avoids duplicating modal scaffolding across screens.

### Theme without Context
`useColorScheme` uses a module-level `_override` variable and a plain listeners array instead of React Context. This allows `setColorSchemeOverride` to be called from anywhere (including the `ThemeToggle` button in a header) without a provider wrapping the entire tree.

### WebView for maps
React Native has no built-in tile-map renderer. `react-native-webview` with Leaflet inlined as an HTML string avoids the complexity of native map SDKs while keeping the bundle self-contained (the JS/CSS is loaded from unpkg CDN at runtime, not bundled). CARTO Voyager tiles replace OSM's own tile server, which blocks requests from mobile WebViews.

### Gesture isolation for the map preview
When a WebView is nested inside a ScrollView, the parent intercepts touch events. The preview resolves this by rendering the WebView behind a `pointerEvents="none"` wrapper, then overlaying a Pressable button that navigates to the full-screen modal — where the WebView is the only scrollable surface.

### Tablet layout via flexBasis, not pixel widths
Two-column grids use `flexBasis: '48%'` rather than calculated pixel widths. Pixel widths fail to account for nested container padding (AnimatedCard adds 16 px per side on top of ContentContainer's horizontal padding), causing overflow on tablet. `flexBasis` percentages compute against the flex container, which already accounts for all padding.

### React Compiler enabled
`app.json` enables `experiments.reactCompiler: true`, which means Expo's build pipeline activates the React Compiler (auto-memoization). Manual `useMemo`/`useCallback` are generally not needed for performance-sensitive rendering paths.
