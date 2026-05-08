# Folder Structure

## Annotated Tree

```
StudiujWLodzi/
│
├── app/                          # All screens and navigation layouts (Expo Router)
│   ├── _layout.tsx               # Root layout: theme init, splash screen, Stack navigator
│   ├── modal.tsx                 # Shared modal (3 modes: university detail, image, map)
│   └── (tabs)/                   # Route group — renders as bottom tab navigator
│       ├── _layout.tsx           # Tab bar configuration, ThemeToggle header button
│       ├── index.tsx             # Home screen
│       ├── study.tsx             # University guide
│       ├── lodz.tsx              # About Lodz city guide
│       ├── scholarship.tsx       # Scholarships and student life
│       ├── costs.tsx             # Cost-of-living calculator
│       └── discounts.tsx         # Student discount database
│
├── assets/
│   └── images/                   # Static image assets
│       ├── icon.png              # App icon (1024×1024, used by Expo)
│       ├── splash-icon.png       # Splash screen image
│       ├── favicon.png           # Web favicon
│       ├── image.jpg             # Home screen parallax hero image
│       ├── android-icon-*.png    # Adaptive icon layers (foreground, background, monochrome)
│       ├── lodz1_jpg.jpg         # City photo gallery images
│       ├── lodz2_jpg.jpg
│       ├── lodz1_png.png
│       ├── lodz2_png.png
│       ├── lodz3_png.png
│       ├── lodz4_png.png
│       └── lodz5.png
│
├── components/                   # Shared, reusable UI components
│   ├── animated-card.tsx         # Fade+slide entrance animation wrapper; optional press-scale
│   ├── animated-category-item.tsx # Staggered list item entrance animation (index-based delay)
│   ├── content-container.tsx     # Max-width (900 px) centering wrapper for tablet layouts
│   ├── external-link.tsx         # expo-web-browser in-app link wrapper
│   ├── haptic-tab.tsx            # HapticTab — iOS haptic feedback on tab press
│   ├── hello-wave.tsx            # Animated waving-hand SVG icon used on Home screen
│   ├── parallax-scroll-view.tsx  # Home screen scroll view with parallax header image
│   ├── presentation-hero.tsx     # Full-bleed image hero card with overlay CTA
│   ├── read-more.tsx             # Expandable text with "Czytaj wiecej / Pokaz mniej"
│   ├── study-map.tsx             # Non-interactive campus map preview + modal launcher
│   ├── theme-toggle.tsx          # Dark/light mode toggle button (placed in header)
│   ├── themed-text.tsx           # Theme-aware Text with type system (title, subtitle, etc.)
│   ├── themed-view.tsx           # Theme-aware View; handles web CSS transform arrays
│   └── ui/                       # Primitive UI atoms
│       ├── collapsible.tsx       # Animated expand/collapse section
│       ├── custom-checkbox.tsx   # Custom themed checkbox (also exports CustomSwitch)
│       ├── icon-symbol.tsx       # Cross-platform icon: MaterialIcons fallback (Android/web)
│       ├── icon-symbol.ios.tsx   # iOS-specific: native SF Symbols via expo-symbols
│       ├── list-item.tsx         # Simple bullet-point list item
│       └── themed-icon.tsx       # SVG icon tinted with theme color via react-native-svg
│
├── constants/                    # All static application data
│   ├── discounts.ts              # DISCOUNT_CATEGORIES and DISCOUNT_PARTNERS arrays
│   ├── theme.ts                  # Colors object — light and dark palettes
│   └── universities.ts           # UNIVERSITIES array with fields of study; University type
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts       # Theme hook with AsyncStorage persistence (native)
│   ├── use-color-scheme.web.ts   # Web override: uses localStorage instead of AsyncStorage
│   ├── use-responsive.ts         # isTablet, padding, contentWidth, col2Width helpers
│   └── use-theme-color.ts        # Resolves a named color token for the current scheme
│
├── docs/                         # Project documentation
│   ├── 00-overview.md            (this documentation set)
│   ├── BUDOWANIE_APLIKACJI.md    Build guide in Polish
│   ├── BUILD.md                  English build and submit guide (EAS)
│   ├── CHANGELOG.md              Development history
│   ├── CONTRIBUTING.md           Contributor guidelines
│   └── DATA_SOURCES.md           Data provenance and update cadence
│
├── scripts/
│   └── reset-project.js          Expo utility: resets project cache and state
│
├── dist/                         Static web export output (do not edit manually)
├── app.json                      Expo app configuration
├── eas.json                      EAS Build and Submit profiles
├── eslint.config.js              ESLint configuration (eslint-config-expo, flat config)
├── tsconfig.json                 TypeScript config (strict mode, @/* path alias)
├── package.json                  npm scripts and dependencies
└── expo-env.d.ts                 Expo TypeScript environment declarations
```

## Entry Points

| File | Role |
|---|---|
| `package.json` → `"main": "expo-router/entry"` | Registers Expo Router as the React Native entry point |
| `app/_layout.tsx` | Root layout — first component mounted; handles splash, theme init |
| `app/(tabs)/_layout.tsx` | Configures the bottom tab bar and mounts the six tab screens |

## Non-Obvious Structural Notes

**`(tabs)` route group** — The parentheses in `(tabs)` are an Expo Router convention for a route group. The name is not part of the URL; it only affects how the navigator is structured. Files inside render inside the tab bar defined by `(tabs)/_layout.tsx`.

**`icon-symbol.ios.tsx` vs `icon-symbol.tsx`** — Expo Router uses Metro's platform-specific extension resolution. On iOS the `.ios.tsx` file is loaded; on Android and web the plain `.tsx` file is loaded. Both export the same `IconSymbol` function signature.

**`use-color-scheme.web.ts`** — Same pattern: Metro loads this file on web instead of `use-color-scheme.ts`. The web version uses `localStorage` synchronously at module init, avoiding an async read that would cause a flash-of-wrong-theme.

**`dist/`** — This is the output of `expo export --platform web` (static HTML/JS). It is committed to the repository but should not be edited manually. Regenerate with `npm run web` (builds) or `eas build`.

**`constants/` vs inline arrays in screens** — Large datasets that might grow or be shared (universities, discounts) live in `constants/`. Small, screen-specific arrays (e.g., `SCHOLARSHIPS`, `TIDBITS`, `BENEFITS`, `NEIGHBORHOODS`) are defined inline at the top of their screen file. This is a consistent convention throughout the project.
