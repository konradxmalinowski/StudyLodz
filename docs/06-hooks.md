# Hooks

## `useColorScheme` (`hooks/use-color-scheme.ts`)

The central theme hook. Returns `'light'` or `'dark'`.

**Behavior:**
1. On mount, subscribes to `Appearance.addChangeListener` (system preference changes)
2. Reads the persisted override from `AsyncStorage` (async, best-effort)
3. If an override exists (`'light'` or `'dark'`), returns that regardless of system preference
4. Otherwise returns the system preference, defaulting to `'light'` if unavailable

**Module-level state:** The override is stored in a module-level `_override` variable — not in React state. A plain `listeners[]` array is used to re-render all subscribers when the override changes.

**Public API:**
- `useColorScheme()` — hook, returns `ColorSchemeName`
- `loadOverride()` — async function, reads from AsyncStorage; called once in `app/_layout.tsx` before the app renders
- `setColorSchemeOverride(value)` — async function; persists and notifies all subscribers

**Web variant (`hooks/use-color-scheme.web.ts`):** Same API but uses `localStorage` synchronously at module init instead of an async `AsyncStorage.getItem`. This avoids a flash-of-wrong-theme on web, where module init happens before the first render.

## `useThemeColor` (`hooks/use-theme-color.ts`)

Resolves a single color token for the current color scheme.

```ts
useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string
```

If `props[currentScheme]` is provided, returns it. Otherwise returns `Colors[currentScheme][colorName]`.

Color tokens available: `text`, `background`, `tint`, `icon`, `tabIconDefault`, `tabIconSelected`.

**Usage pattern:**
```tsx
// Use a token from the theme palette
const backgroundColor = useThemeColor({}, 'background');

// Override for one specific instance
const borderColor = useThemeColor({ light: '#eee', dark: '#333' }, 'background');
```

## `useResponsive` (`hooks/use-responsive.ts`)

Returns responsive layout values based on the current window width.

```ts
useResponsive(): {
  isTablet: boolean,      // width >= 768
  screenWidth: number,    // raw window width
  padding: number,        // 24 (phone) | 48 (tablet)
  headerHeight: number,   // 250 (phone) | 360 (tablet)
  contentWidth: number,   // min(screenWidth, 900) - padding * 2
  col2Width: number,      // (contentWidth - 16) / 2
  columns: number,        // 1 (phone) | 2 (tablet)
}
```

**Exported constants:**
- `TABLET_BREAKPOINT = 768` — used in `ParallaxScrollView` and `ContentContainer`
- `CONTENT_MAX_WIDTH = 900` — used in `ContentContainer` and `ParallaxScrollView`

**When to use `col2Width`:** Only for components that need a precise pixel width for a two-column item (e.g., chart sizing). For CSS grid layouts, prefer `flexBasis: '48%'`.
