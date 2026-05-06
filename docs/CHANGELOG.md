# Changelog

---

## Tablet Layout & Map Fixes (2026)

### Tablet Responsive Layout

- Added `ContentContainer` component — max-width 900 px, `alignSelf: 'center'`, used on all six tab screens to prevent content from stretching across wide displays.
- Fixed `AnimatedCard`: `style` prop was being passed to the inner `AnimatedThemedView` instead of the outer `Pressable`. This prevented `flex: 1` from participating in row flex containers. Moving the prop to `Pressable` fixed equal-width grid columns on tablet.
- All grid layouts switched from pixel-based widths (`col2Width`) to `flexBasis: '48%'` (no `flexGrow`). Pixel widths did not account for nested container padding (AnimatedCard + ThemedView), causing overflow on tablet.
- Added `contentWidth`, `col2Width`, and `columns` to `useResponsive` hook for future use.

### Campus Map

- Replaced OSM tile server (`tile.openstreetmap.org`) with **CARTO Voyager** (`basemaps.cartocdn.com`). OSM's volunteer-run servers block requests from mobile WebViews as they violate the tile usage policy. CARTO provides the same OSM-derived tiles from a commercial CDN with no such restriction.
- Resolved WebView-in-ScrollView gesture conflict. When a `WebView` is nested inside a `ScrollView`, the parent intercepts touch events before they reach Leaflet. Fixed by:
  1. Wrapping the WebView in `<View pointerEvents="none">` so the preview is purely visual.
  2. Adding an absolutely-positioned "Otwórz mapę" `Pressable` overlay.
  3. Navigating to `app/modal.tsx` with `params.map = 'campuses'`, where the WebView is the only scrollable surface — Leaflet receives all gestures correctly.

### Bug Fixes

- Fixed Metro JSX parser error: multiple closing tags on the same line (`</ContentContainer></ScrollView>`) caused "Expected corresponding JSX closing tag" errors. Tags are now on separate properly-indented lines.
- Downgraded `react-native-worklets` JS package from `0.6.1` to `0.5.1` to match the native Android build version, resolving a JS/native version mismatch crash on launch.

---

## Discount Partners & Scholarships (2025)

- Added `constants/discounts.ts` with 17 curated discount partners across 6 categories.
- Rebuilt discount screen: partners rendered as individual cards (not a flat list inside one card), enabling equal-height two-column grid on tablet with `alignItems: 'stretch'`.
- Added scholarship amounts (2024/2025 academic year) to the Scholarships screen.
- Fixed `react-native-worklets` version mismatch between declared package and native build.

---

## Responsive Layout Foundation (2025)

- Added `useResponsive` hook returning `isTablet`, `padding`, `screenWidth`, and `headerHeight`.
- All six tab screens adapted for tablet: 2-column grids, wider gallery images, adjusted padding.
- `AnimatedCard` `onPressIn`/`onPressOut` handlers now only registered when `onPress` is provided.

---

## Code Audit — Rounds 1–3 (2025)

Three-pass production-readiness audit. All critical and functional issues resolved.

### Summary

| Category | Found | Fixed |
|---|---|---|
| Critical (crash / invisible UI) | 4 | 4 |
| TypeScript / type contract errors | 2 | 2 |
| Functional / UX bugs | 4 | 4 |
| Warnings (potential issues) | 14 | 13 |
| Code quality / dead code | 11 | 9 |
| Requires manual action | 2 | — |
| **Total** | **37** | **32** |

### Resolved

#### `components/ui/icon-symbol.tsx`
- **[CRITICAL]** Missing icon mappings for Android/web: `building.2.crop.circle`, `tree.circle`, `graduationcap.circle`, `tram.circle`, `graduationcap.fill`. `MaterialIcons name={undefined}` crashed on Android/web. Added all mappings.
- **[TYPE ERROR]** `IconSymbolProps` was used in `(tabs)/_layout.tsx` but not exported. Added export.

#### `app/(tabs)/discounts.tsx`
- **[CRITICAL]** `fontSize: .16` → `fontSize: 16`. Button text was invisible.
- **[QUALITY]** `key={index}` → `key={category.name}` in `DISCOUNT_CATEGORIES.map()`.

#### `app/(tabs)/scholarship.tsx`
- **[QUALITY]** `key={index}` → `key={item.title}` in both `SCHOLARSHIPS.map()` and `STUDENT_LIFE.map()`.
- **[WARNING]** `console.error` in `openLink` replaced with silent catch.

#### `app/(tabs)/index.tsx`
- **[WARNING]** `useEffect` missing `imageOpacity`, `titleTranslateY` in deps array.
- **[BUG]** `wordWrap: 'break-word'` removed — invalid React Native style property.
- **[QUALITY]** Removed redundant `display: 'flex'` (default in RN).

#### `app/(tabs)/lodz.tsx`
- **[WARNING]** `useEffect` missing `imageOpacity` in deps array.
- **[QUALITY]** `key={index}` → `key={section.title}` in `SECTIONS.map()`.

#### `app/(tabs)/costs.tsx`
- **[BUG]** `<ThemedText>&nbsp;</ThemedText>` — HTML entity doesn't work in RN. Removed; `justifyContent: 'space-between'` handles layout correctly.

#### `app/(tabs)/study.tsx`
- **[QUALITY]** Removed unused `Link` import.
- **[WARNING]** `university: any` → `university: University`.

#### `app/_layout.tsx`
- **[WARNING]** `SplashScreen.hideAsync()` without error handling. Added try/catch.
- **[WARNING]** `console.warn(e)` in production catch block replaced with empty catch.

#### `app/modal.tsx`
- **[WARNING]** Missing null-check for `imageSource`. Added guard with error message.

#### `components/presentation-hero.tsx`
- **[CRITICAL]** `require('@/assets/images/image2.jpg')` — file did not exist. Changed to `image.jpg`.

#### `components/study-map.web.tsx`
- **[WARNING]** Returned `null` — map was invisible on web. Replaced with an informational fallback UI.

#### `components/animated-category-item.tsx`
- **[WARNING]** `useEffect` deps array completed: `[opacity, translateY, index]`.

#### `components/ui/custom-checkbox.tsx`
- **[WARNING]** `'thumb'` → `'background'` as `useThemeColor` key.

#### `components/animated-card.tsx`
- **[WARNING]** `onPressIn`/`onPressOut` registered even when `onPress` was `undefined`, blocking child touch events. Handlers now only set when `onPress` is provided.

#### `components/read-more.tsx`
- **[UX BUG]** "Read more" button always visible even when text fit within `numberOfLines`. Fixed with two-pass measurement: a hidden `ThemedText` without `numberOfLines` counts actual lines; button only shown when text is actually truncated.

#### `hooks/use-color-scheme.ts`
- **[WARNING]** Removed unnecessary `if (AsyncStorage)` guard (always truthy).

#### `hooks/use-color-scheme.web.ts`
- **[CRITICAL]** Missing `loadOverride` export. `app/_layout.tsx` imports it from `@/hooks/use-color-scheme` — on web the `.web.ts` resolver was used where `loadOverride` was `undefined`. Calling it threw `TypeError: loadOverride is not a function`. Added no-op export.

#### `constants/theme.ts`
- **[QUALITY]** Removed unused `Fonts` export and `Platform` import.

#### `components/parallax-scroll-view.tsx`
- **[QUALITY]** Removed unused `container` style.

#### `package.json`
- Removed unused packages: `lodash`, `@types/lodash`, `expo-image`, `lucide-react-native`, `expo-font`, `react-native-worklets`.
- Updated `@types/react-native` to `^0.73.0`.

#### `app.json`
- Added `bundleIdentifier: "com.konradxmalinowski.StudiujWLodzi"` for iOS.

### Requires manual action

1. **`eas.json`** — fill in `submit.production` (`applicationId` for Android, `appleId`/`ascAppId` for iOS) before submitting to app stores.

### Known limitations (non-blocking)

- `components/hello-wave.tsx` — renders a wrench icon, not a waving hand. Name is misleading.
- No unit tests. `package.json` has no `test` script.
