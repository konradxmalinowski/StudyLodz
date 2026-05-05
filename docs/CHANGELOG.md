# Changelog

## Code Audit — Rounds 1–3 (2025)

Three-pass production-readiness audit. All critical and functional issues are resolved.

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

---

### Resolved

#### `components/ui/icon-symbol.tsx`
- **[CRITICAL]** Missing icon mappings for Android/web: `building.2.crop.circle`, `tree.circle`, `graduationcap.circle`, `tram.circle`, `graduationcap.fill`. `MaterialIcons name={undefined}` crashed on Android/web. Added all mappings.
- **[TYPE ERROR]** `IconSymbolProps` was used in `(tabs)/_layout.tsx` but was not exported. Added export.

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
- **[QUALITY]** `React.useEffect` → named import `useEffect` for consistency.

#### `app/(tabs)/costs.tsx`
- **[BUG]** `<ThemedText>&nbsp;</ThemedText>` — HTML entity doesn't work in RN. Removed; `justifyContent: 'space-between'` handles layout correctly.

#### `app/(tabs)/study.tsx`
- **[QUALITY]** Removed unused `Link` import.
- **[WARNING]** `university: any` → `university: University`.

#### `app/_layout.tsx`
- **[WARNING]** `SplashScreen.hideAsync()` without error handling. Added try/catch.
- **[WARNING]** `console.warn(e)` in production catch block replaced with empty catch.

#### `app/modal.tsx`
- **[WARNING]** Missing null-check for `imageSource` when `imageName` is not in `IMAGE_SOURCES`. Added guard with error message.

#### `components/presentation-hero.tsx`
- **[CRITICAL]** `require('@/assets/images/image2.jpg')` — file did not exist. Changed to `image.jpg`.

#### `components/study-map.web.tsx`
- **[WARNING]** Returned `null` — map was invisible on web. Replaced with an informational UI fallback.

#### `components/animated-category-item.tsx`
- **[WARNING]** `useEffect` deps array completed: `[opacity, translateY, index]`.

#### `components/ui/custom-checkbox.tsx`
- **[WARNING]** `'thumb'` → `'background'` as `useThemeColor` key.

#### `components/animated-card.tsx`
- **[WARNING]** `onPressIn` / `onPressOut` registered even when `onPress` was `undefined`, blocking child touch events. Handlers now only set when `onPress` is defined.

#### `components/read-more.tsx`
- **[UX BUG]** "Read more" button was always visible even when text fit within `numberOfLines`. Implemented two-pass measurement: a hidden `ThemedText` without `numberOfLines` counts actual lines; button shows only when text is actually truncated.

#### `hooks/use-color-scheme.ts`
- **[WARNING]** Removed unnecessary `if (AsyncStorage)` guard (always truthy).

#### `hooks/use-color-scheme.web.ts`
- **[CRITICAL]** Missing `loadOverride` export. `app/_layout.tsx` imports it from `@/hooks/use-color-scheme` — on web the bundler resolves `.web.ts` where `loadOverride` was `undefined`. Calling `loadOverride()` threw `TypeError: loadOverride is not a function`. Added no-op export.

#### `constants/theme.ts`
- **[QUALITY]** Removed unused `Fonts` export and `Platform` import.

#### `components/parallax-scroll-view.tsx`
- **[QUALITY]** Removed unused `container` style.

#### `package.json`
- **[FIXED]** Removed unused packages: `lodash`, `@types/lodash`, `expo-image`, `lucide-react-native`, `expo-font`, `react-native-worklets`.
- **[FIXED]** Updated `@types/react-native` to `^0.73.0`.

#### `app.json`
- **[FIXED]** Added `bundleIdentifier: "com.konradxmalinowski.StudiujWLodzi"` for iOS.

---

### Requires manual action

1. **`app.json`** — configure Google Maps API key for Android production builds (`react-native-maps` requires `google-services.json` and `googleServicesFile`).
2. **`eas.json`** — fill in `submit.production` (`applicationId` for Android, `appleId`/`ascAppId` for iOS) before submitting to app stores.

---

### Known limitations (non-blocking)

- `components/hello-wave.tsx` — renders a wrench icon, not a waving hand. Name is misleading; author to decide on rename or icon change.
- `components/city-hero.tsx` — defined but not imported anywhere (dead code).
- No unit tests. `package.json` has no `test` script.
