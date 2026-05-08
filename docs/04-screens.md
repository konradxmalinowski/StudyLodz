# Screens and Key Components

## Screens

### Home (`app/(tabs)/index.tsx`)

The entry screen. Uses `ParallaxScrollView` with a full-bleed hero image that fades in on mount. Below the header, two `AnimatedCard` section cards link to the Study guide and About Lodz screens. On tablet, the cards render side-by-side in a flex row; on phone they stack vertically.

Key behaviors:
- Hero image `opacity` animates from 0 to 1 via `withTiming` on mount (800 ms)
- Title text animates in with a `translateY` slide from 20 px to 0 (600 ms, 200 ms delay)
- Section cards each have an `accentColor` that colors their top border, icon container, and CTA button
- Pressing a CTA fires `Haptics.impactAsync(Medium)` before navigating

### University Guide (`app/(tabs)/study.tsx`)

Searchable, filterable list of 6 Lodz universities. Content is sourced from `constants/universities.ts`.

Key behaviors:
- Two `CustomCheckbox` filters: "Publiczne" and "Artystyczne" (filter by `uni.type`)
- Text search by university name (`searchQuery` against `uni.title.toLowerCase()`)
- `LayoutAnimation.configureNext(easeInEaseOut)` applied before state changes for smooth list reflow
- Pressing a university card navigates to `/modal?university=<title>`
- Each card shows a type badge (`Publiczna` / `Artystyczna`) with distinct color coding
- On tablet, university cards render in a `flexBasis: '48%'` two-column wrap

### About Lodz (`app/(tabs)/lodz.tsx`)

City guide with multiple content sections:
1. Horizontal image gallery (5 photos) — images are tappable and open in the image viewer modal
2. "Dlaczego Lodz?" — `ReadMore` expandable text
3. "Zycie studenckie" — 4 BENEFITS cards in a wrapping grid
4. "Odkryj miasto" — 4 TIDBITS cards with numbered (01–04) styling instead of icons
5. "Kampusy w sercu miasta" — `StudyMap` component (non-interactive preview + "Otworz mape" button)
6. "Gdzie zamieszkac?" — 4 NEIGHBORHOODS cards
7. SECTIONS — 4 image+text cards (each image is tappable)

### Scholarships (`app/(tabs)/scholarship.tsx`)

Two sections:
1. **Dostepne stypendia** — 4 national scholarship types, each as a card with `MaterialCommunityIcons` icon, description, and an amount pill badge; cards are tappable and open the gov.pl URL via `Linking.openURL`
2. **Nie samą nauką student zyje** — 4 student life cards (Juwenalia, Organizacje, Kluby, Sport)

On tablet, scholarships render in a two-column `flexBasis: '48%'` grid.

### Cost-of-Living Calculator (`app/(tabs)/costs.tsx`)

Interactive calculator with:
- `PieChart` (react-native-chart-kit) at top — updates live as sliders change
- Four `Slider` components (one per category: rent, food, transport, entertainment) — each card uses its category's data color for the left border, icon, value text, and slider track/thumb
- Total cost display with a reset button
- `LayoutAnimation` applied on `costs` state change for smooth height transitions
- `Haptics.notificationAsync(Success)` on reset

Chart width is calculated as `Math.min(screenWidth - padding * 2 - 32, 860)` — the 32 px accounts for `AnimatedCard`'s 16 px inner padding on each side.

### Student Discounts (`app/(tabs)/discounts.tsx`)

Category-filtered list of 17 discount partners sourced from `constants/discounts.ts`.

Key behaviors:
- Horizontal `ScrollView` of pill-shaped category chips — tap to filter, tap again to clear
- Active chip: solid tintColor background + white text
- `visiblePartners` computed from `DISCOUNT_PARTNERS.filter(p => p.category === selectedCategory)`, or all partners when `selectedCategory === null`
- Each partner card shows name, discount description, optional address, and optional external link icon
- Tapping a card with a `url` opens it via `Linking.openURL`
- "Odwiedz strone Karty Lodzianina" button links to `kartalodzianina.pl`

### Shared Modal (`app/modal.tsx`)

One screen handles three distinct presentations via URL params:

| Param | Renders |
|---|---|
| `params.map === 'campuses'` | Full-screen `WebView` with interactive Leaflet map |
| `params.image` | Full-screen image viewer (dark background, tappable to go back) |
| `params.university` | Scrollable list of fields of study for the specified university |

The modal title defaults to "Kierunki Studiow" (shown in the navigation header). For image and map modes the header is still present but the content fills the screen. The close button in the header is rendered as `headerRight` in `app/_layout.tsx`.

## Key Reusable Components

### `AnimatedCard`
Wraps any content in a fade-in (opacity 0 → 1) + slide-up (translateY 20 → 0) entrance animation. The `delay` prop (ms) staggers multiple cards on the same screen. When `onPress` is provided, adds a press-scale animation (0.98 on press in, 1 on press out). The `style` prop is applied to the outer `Pressable`, not the animated view — this is important for `flex: 1` participation in flex containers.

### `ContentContainer`
A layout wrapper that constrains content width to 900 px on tablets and centers it with `alignSelf: 'center'`. All tab screens (except Home) use this as their top-level container. The horizontal padding (24 px phone / 48 px tablet) is applied here — do not apply it again to child cards.

### `StudyMap`
Renders a non-interactive preview of the campus map (200 px tall WebView with `pointerEvents="none"`) plus an absolutely-positioned "Otworz mape" button that launches the full-screen modal. The preview and the modal use identical HTML/JS for the map, differing only in that the preview disables all Leaflet controls and the modal enables them.

### `ThemedText` (type system)
See [03-frontend.md — Typography system](./03-frontend.md) for the full type table.

### `ReadMore`
Expandable text that shows the first N lines (default 3) with a "Czytaj wiecej" button. Uses a two-pass measurement strategy: a hidden `ThemedText` (absolutely positioned, `opacity: 0`) renders the full text and reports its line count via `onTextLayout`; the visible `ThemedText` uses `numberOfLines` to truncate. The expand button is only shown if the hidden measurement proves truncation is actually happening.

### `IconSymbol` / `IconSymbol.ios`
Cross-platform icon. iOS gets native SF Symbols; Android/web gets Material Icons mapped from the SF Symbol name. Every SF Symbol name used in the app must have an entry in the `MAPPING` object in `icon-symbol.tsx` — missing entries cause a crash on Android.

### `HapticTab`
Drop-in replacement for the default tab bar button. On iOS it fires `Haptics.impactAsync(Light)` on press-in. On Android and web, it behaves like a normal pressable (haptics are iOS-only in this app).

### `ThemeToggle`
A pill-shaped button in every screen's navigation header (right side). Displays an SVG sun or moon icon alongside "Jasny" / "Ciemny" text. Toggling calls `setColorSchemeOverride` from `use-color-scheme`. Uses a dynamic import to avoid circular module initialization.

### `ParallaxScrollView`
Used only on the Home screen. Renders a parallax header image that translates and scales on scroll using `useScrollOffset` + `interpolate`. On tablet the header height is 360 px (vs 250 px on phone). Content below the header is rendered in a `ThemedView` with a fixed padding.

### `HelloWave`
An animated SVG waving-hand icon displayed on the Home screen next to the title. Uses `withRepeat` + `withTiming` to oscillate the icon rotation between 0° and 25° four times.

### `ThemedIcon`
Renders an SVG string using `react-native-svg`'s `SvgXml`. The SVG fill color is replaced with the current theme's text color using a regex substitution on the XML string. Used for SVG icons that don't have Material/SF Symbol equivalents (e.g., the moon and sun icons in `ThemeToggle`, the waving hand in `HelloWave`).
