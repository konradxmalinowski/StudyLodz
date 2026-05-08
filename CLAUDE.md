# CLAUDE.md — StudiujWLodzi

## Purpose

StudiujWLodzi is a Polish-language mobile app for students in Lodz, Poland. It aggregates static university data, city guide content, scholarship listings, a cost-of-living calculator, and a student-discount database into a single offline-capable app. There is no backend, no API, and no database — all content is TypeScript constants shipped with the binary.

Platforms: iOS, Android, Web (static export).

## Stack

**Framework:** React Native 0.81 + Expo SDK 54, React 19  
**Language:** TypeScript 5.9, strict mode  
**Routing:** Expo Router v6 (file-based, `app/` directory)  
**Navigation:** React Navigation bottom tabs + Stack  
**Animations:** React Native Reanimated 4 + react-native-worklets 0.5.1  
**Map:** Leaflet 1.9.4 in react-native-webview (CARTO Voyager tiles)  
**Charts:** react-native-chart-kit + react-native-svg  
**Sliders:** @react-native-community/slider  
**Haptics:** expo-haptics  
**Icons:** expo-symbols (SF Symbols, iOS only) + @expo/vector-icons MaterialIcons (Android/web fallback)  
**Storage:** @react-native-async-storage/async-storage (theme persistence)  
**Build:** EAS Build (cloud, no local Xcode/Android Studio needed for production)  
**Linting:** ESLint with eslint-config-expo (flat config)  
**Other:** React Compiler enabled (`experiments.reactCompiler: true`)

## Architecture Summary

The app is a pure client. No network requests are made at runtime except for Leaflet tile CDN calls when the map is open.

```
app/_layout.tsx          Root: loads theme from AsyncStorage, hides splash, wraps in Stack
app/(tabs)/_layout.tsx   Bottom tab bar: 6 tabs, animated icons, ThemeToggle header button
app/(tabs)/*.tsx          6 screen files — each self-contained with local state
app/modal.tsx            Shared modal — 3 modes selected by URL params:
                           ?university=X  → field-of-study list
                           ?image=X       → full-screen image viewer
                           ?map=campuses  → interactive Leaflet map

constants/universities.ts  UNIVERSITIES array (6 entries, typed)
constants/discounts.ts     DISCOUNT_CATEGORIES + DISCOUNT_PARTNERS arrays (typed)
constants/theme.ts         Colors object (light/dark palettes)

hooks/use-color-scheme.ts  Theme with AsyncStorage persistence; module-level state + listeners
hooks/use-responsive.ts    isTablet (>=768px), padding, CONTENT_MAX_WIDTH (900px)
hooks/use-theme-color.ts   Resolves a color token for the current scheme

components/AnimatedCard    Fade+slide entrance animation wrapper (used on every screen)
components/ContentContainer  Max-width centering for tablet (900px cap)
components/StudyMap        Non-interactive WebView preview + "Otworz mape" button → modal
components/ThemedView      Theme-aware View with web CSS-transform workaround
components/ThemedText      Theme-aware Text with 8-type typography system
```

Data flows: `constants/*.ts` → screen components → `ThemedView`/`ThemedText` → `useColorScheme()` → `Colors[scheme]`

## Working Rules

### Import paths
Always use the `@/` alias for internal imports. Never use relative paths like `../../components/...`.

### Component naming
- Screens: `export default function ScreenNameScreen()`
- Shared components: `export function ComponentName()`
- Hooks: `export function useHookName()`
- Data constants: `SCREAMING_SNAKE_CASE`

### File naming
All files are kebab-case: `animated-card.tsx`, `use-color-scheme.ts`. Platform variants: `.ios.tsx` for iOS, `.web.ts` for web.

### Screen structure (must follow this order)
1. Hooks
2. Derived values from theme/responsive hooks
3. Event handlers
4. Return JSX: `SafeAreaView` > `ScrollView` > `ContentContainer` > `AnimatedCard` blocks

### Card styling standard
```tsx
<ThemedView
  style={styles.card}
  lightColor="#f9f9f9"
  darkColor="#1c1c1e"
>
```
`borderRadius: 16`, `padding: 16–24`, shadow with `elevation: 2–5`.

### Tablet grid layout (critical)
Use `flexBasis: '48%'` for two-column grid items — never `flex: 1` or pixel widths. Pixel widths overflow due to nested container padding. `flex: 1` fails in wrapping flex containers.

### Animations
All screen content uses `AnimatedCard` with staggered `delay` values (0, 100, 200, 300 ms). Do not create custom entrance animations for individual screen sections.

### Haptics
All meaningful interactions trigger haptics: Light (filter/checkbox), Medium (navigation/CTA), Notification Success (confirm/reset).

### Icons
Every SF Symbol name used anywhere must have an entry in `MAPPING` in `components/ui/icon-symbol.tsx`. Missing entries silently crash Android/web.

### Data invariants
- `constants/universities.ts`: `type` must be `'publiczna'` or `'artystyczna'`
- `constants/discounts.ts`: `category` must exactly match a `name` in `DISCOUNT_CATEGORIES`
- Campus map pins: update both `components/study-map.tsx` AND `app/modal.tsx` (`CAMPUSES_MAP_HTML`)

### No console
No `console.log/warn/error` in production code paths.

## AI Agent Guidelines

### Before making any change
1. Read the relevant screen file fully — understand what data it uses and what state it manages
2. Check `constants/theme.ts` before adding any color value
3. Check `components/ui/icon-symbol.tsx` before using any SF Symbol name
4. Read `docs/10-conventions.md` if unsure about naming or structure

### What NOT to do
- Do not add global state management (Context, Redux, Zustand) — local state is intentional
- Do not add network fetch calls — this is a static-data app
- Do not use `flex: 1` in two-column grid items on tablet layouts
- Do not use OSM tile server (`tile.openstreetmap.org`) — use CARTO (`basemaps.cartocdn.com`)
- Do not put an interactive WebView directly inside a ScrollView — use the `pointerEvents="none"` + overlay button pattern
- Do not hardcode colors inline — use `Colors[scheme]` or `useThemeColor()`
- Do not use relative `../../` import paths — use `@/`
- Do not modify `dist/` contents manually — regenerate with `npx expo export --platform web`
- Do not add `console.log` in production paths

### How to safely add a new feature
1. Determine if the data belongs in `constants/` (shared/large) or inline in the screen file (small/screen-specific)
2. Add icon mappings before using any new SF Symbol
3. Wrap new screen sections in `AnimatedCard` with appropriate delay
4. Use `ContentContainer` as the top-level container for any new tab screen
5. Test responsive behavior: phone (< 768 px) and tablet (>= 768 px)
6. Test both light and dark mode
7. Run `npm run lint` — zero errors required

### Critical files requiring extra care
| File | Why |
|---|---|
| `components/ui/icon-symbol.tsx` | Missing entries crash Android/web |
| `hooks/use-color-scheme.ts` | Module-level state — order of operations matters for startup |
| `app/_layout.tsx` | Theme and splash screen init — changes here affect every screen |
| `app/modal.tsx` | Three distinct modes in one file — test all three after any change |
| `constants/universities.ts` | Type shape is shared; changing it breaks `study.tsx` and `modal.tsx` |
| `constants/discounts.ts` | Category names are compared with strict equality in `discounts.tsx` |

## Important Notes

### Expo Go does not work
`react-native-webview` and `react-native-worklets` require native modules. Use a development build or local simulator.

### react-native-worklets must stay at 0.5.1
Version 0.6.1 caused a JS/native version mismatch crash on Android launch. Do not upgrade without verifying the native build version matches.

### Map is network-dependent
Leaflet tiles require network access. Map will show a blank background offline. Leaflet JS/CSS itself is loaded from `unpkg.com` at runtime.

### Theme flash prevention
`app/_layout.tsx` returns `null` before `loadOverride()` resolves. The root `View` background color is set immediately based on the color scheme to prevent white flashes.

### PieChart width formula
Always: `Math.min(screenWidth - padding * 2 - 32, 860)`. The 32 px accounts for `AnimatedCard`'s 16 px padding on each side. Omitting this causes overflow.

### EAS submit config is incomplete
`eas.json` `submit.production` is currently `{}`. Before store submission, add `appleId`/`ascAppId` (iOS) and `serviceAccountKeyPath`/`track` (Android). See `docs/BUILD.md`.

### Two unused components
`components/presentation-hero.tsx` and `components/animated-category-item.tsx` are not used by any current screen. They are dead code.
