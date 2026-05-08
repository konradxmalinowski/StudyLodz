# Frontend

## Framework and Version

- **React Native** 0.81.5 with **Expo SDK 54**
- **React** 19.1.0
- **Expo Router** v6 — file-based routing
- **TypeScript** 5.9 in strict mode
- **New Architecture enabled** (`newArchEnabled: true` in `app.json`)
- **React Compiler enabled** (`experiments.reactCompiler: true`) — automatic memoization at build time

## Navigation Structure

Navigation is built on two nested navigators provided by Expo Router (which wraps React Navigation):

```
Stack (root)
├── (tabs)          — renders the bottom tab navigator
│   ├── index       Główna / Home
│   ├── study       Przewodnik / University guide
│   ├── lodz        O Lodzi / About Lodz
│   ├── scholarship Stypendium / Scholarships
│   ├── costs       Koszty / Cost calculator
│   └── discounts   Znizki / Student discounts
└── modal           Shared modal (presentation: 'modal')
```

The Stack uses `animation: 'fade'` for all transitions. The modal screen uses the `presentation: 'modal'` option (slide-up on iOS, full-screen on Android). The close button in the modal header is rendered as a custom `headerRight` component in `app/_layout.tsx`.

## State Management

There is no global state library (no Redux, no Zustand, no Context). All state is local:

| State type | Where it lives | Mechanism |
|---|---|---|
| Dark/light theme override | Module-level `_override` in `use-color-scheme.ts` | `useState` + manual listeners array |
| System color scheme | `useColorScheme` hook local state | `Appearance.addChangeListener` |
| University filter (public/artistic) | `study.tsx` local `useState` | `LayoutAnimation` on change |
| University search query | `study.tsx` local `useState` | `LayoutAnimation` on change |
| Cost slider values | `costs.tsx` local `useState` (`costs` object) | `LayoutAnimation` on change |
| Selected discount category | `discounts.tsx` local `useState` | Filter applied via `.filter()` on render |
| ReadMore expanded/truncated | `read-more.tsx` local `useState` | Two-pass line-count measurement |

## Routing

Routes follow Expo Router file-based conventions:

| URL / pathname | Screen file |
|---|---|
| `/` | `app/(tabs)/index.tsx` |
| `/study` | `app/(tabs)/study.tsx` |
| `/lodz` | `app/(tabs)/lodz.tsx` |
| `/scholarship` | `app/(tabs)/scholarship.tsx` |
| `/costs` | `app/(tabs)/costs.tsx` |
| `/discounts` | `app/(tabs)/discounts.tsx` |
| `/modal?university=X` | `app/modal.tsx` — university detail |
| `/modal?image=X` | `app/modal.tsx` — full-screen image viewer |
| `/modal?map=campuses` | `app/modal.tsx` — interactive campus map |

Navigation between tabs uses the Expo Router `<Tabs>` component. Navigation to the modal uses `router.push({ pathname: '/modal', params: { ... } })`.

## UI Patterns and Component Conventions

### ThemedView and ThemedText
Every view and text element that participates in the theme system uses `ThemedView` and `ThemedText`. These are wrappers around the native `View` and `Text` that:
- Resolve background color and text color from `Colors[scheme]`
- Accept optional `lightColor` / `darkColor` props for per-instance overrides
- `ThemedView` also normalizes `transform` arrays to CSS strings for web compatibility

Do not use bare `View` / `Text` for content that must respond to theme changes.

### AnimatedCard
All screen content is wrapped in `AnimatedCard` blocks with staggered `delay` values (0, 100, 200, 300 ms). This provides a consistent fade-in + slide-up entrance animation across every screen. The delays create a sequential reveal effect as the screen loads.

```tsx
<AnimatedCard delay={0}>    {/* screen title */}
<AnimatedCard delay={100}>  {/* first section */}
<AnimatedCard delay={200}>  {/* second section */}
```

The `onPress` prop is only used when the card itself should be pressable (which applies a subtle scale-down effect on press). When only wrapping content, `onPress` is omitted.

### ContentContainer
Every scrollable screen (all tabs except Home, which uses `ParallaxScrollView`) wraps its content in `ContentContainer`. This applies:
- Horizontal padding: 24 px on phones, 48 px on tablets
- Max-width: 900 px with `alignSelf: 'center'` on tablets

Do not add horizontal padding directly to screen-level `ScrollView` or card children — that's `ContentContainer`'s job.

### IconSymbol
All SF Symbol names (the iOS convention) are used everywhere. On iOS, `icon-symbol.ios.tsx` renders native SF Symbols. On Android and web, `icon-symbol.tsx` maps each SF Symbol name to the closest Material Icon. Any new icon used in the codebase requires a mapping entry added to the `MAPPING` object in `icon-symbol.tsx`.

### Typography system
`ThemedText` accepts a `type` prop that maps to a predefined style:

| Type | Font size | Weight | Use case |
|---|---|---|---|
| `title` | 32 px | bold | Screen or card headline |
| `subtitle` | 20 px | bold | Section heading |
| `defaultSemiBold` | 16 px | 600 | Card title, prominent label |
| `default` | 16 px | normal | Body text |
| `subtitleParagraph` | 16 px | normal, opacity 0.75 | Subtitle under a screen title |
| `caption` | 12 px | normal, opacity 0.55 | Meta text, helper text |
| `overline` | 11 px | 600, uppercase | Section label before content |
| `link` | 16 px | normal, blue | Tappable links |

### Cards
Standard card styling across all screens:
- `borderRadius: 16`
- `padding: 16–24`
- `lightColor="#f9f9f9"` / `darkColor="#1c1c1e"` passed to `ThemedView`
- Shadow: `shadowOpacity: 0.06–0.1`, `elevation: 2–5`

Category-specific cards (Costs screen) additionally use a `borderLeftWidth: 4` stripe in the category's data color.

### Grid layouts (tablet two-column)
```tsx
<View style={isTablet ? styles.gridTablet : styles.grid}>
  <Pressable style={isTablet && styles.gridItemTablet}>
    <ThemedView style={styles.card}>...</ThemedView>
  </Pressable>
</View>

// styles
grid: { gap: 12 },
gridTablet: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
gridItemTablet: { flexBasis: '48%' },  // never use flex: 1 in grids
```

Use `flexBasis: '48%'` (not `flex: 1`, not pixel widths) for two-column grid items on tablet.

## Animations

All animations use React Native Reanimated 4 with the Worklet API:

| Animation | Where used | API |
|---|---|---|
| Fade + slide-up entrance | `AnimatedCard` | `useSharedValue`, `withDelay`, `withTiming` |
| Tab icon scale bounce | `(tabs)/_layout.tsx` `AnimatedIcon` | `useSharedValue`, `withSpring` |
| Parallax header | `ParallaxScrollView` | `useScrollOffset`, `interpolate` |
| Card press scale | `AnimatedCard` (when `onPress` present) | `withSpring` |
| Collapsible chevron rotate | `Collapsible` | `withSpring`, `useAnimatedStyle` |
| Waving hand | `HelloWave` | `withRepeat`, `withTiming` |
| Image fade-in | `index.tsx`, `lodz.tsx` | `useSharedValue`, `withTiming` |
| Title slide-up | `index.tsx` | `useSharedValue`, `withTiming`, `interpolate` |
| Custom switch slide | `CustomSwitch` | `useSharedValue`, `withTiming` |

## Responsive Design

The `useResponsive` hook returns:

```ts
{
  isTablet: boolean,      // width >= 768
  screenWidth: number,
  padding: number,        // 24 (phone) or 48 (tablet)
  headerHeight: number,   // 250 (phone) or 360 (tablet)
  contentWidth: number,   // max 900 minus padding
  col2Width: number,      // (contentWidth - 16) / 2
  columns: number,        // 1 or 2
}
```

The `TABLET_BREAKPOINT` is 768 px and `CONTENT_MAX_WIDTH` is 900 px — both exported from `use-responsive.ts` and used in `ContentContainer` and `ParallaxScrollView`.

## Theme System

Theme state flows as:
1. App starts: `app/_layout.tsx` calls `loadOverride()` which reads from AsyncStorage
2. `useColorScheme()` returns the override if set, otherwise the system preference
3. `useThemeColor(props, colorName)` resolves the correct color for the current scheme
4. `ThemeProvider` (React Navigation) is fed the `DarkTheme` or `DefaultTheme` for navigation chrome

Changing the theme calls `setColorSchemeOverride(scheme)` which:
1. Updates the module-level `_override` variable
2. Persists to AsyncStorage / localStorage
3. Notifies all `useColorScheme` subscribers via the listeners array
4. Causes all subscribers to re-render with the new scheme

The tint color is `#4E56C0` (indigo) for both light and dark modes.
