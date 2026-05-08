# Development

## Starting the Dev Environment

```sh
npm start
```

Expo launches Metro bundler and opens the dev tools in the browser.

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm start` | `expo start` | Start the Expo development server |
| `npm run ios` | `expo start --ios` | Open on iOS simulator |
| `npm run android` | `expo start --android` | Open on Android emulator |
| `npm run web` | `expo start --web` | Open in web browser |
| `npm run lint` | `expo lint` | Run ESLint across the project |
| `npm run reset-project` | `node ./scripts/reset-project.js` | Reset Expo project cache and state |

## Linting

The project uses `eslint-config-expo` with the flat config format:

```sh
npm run lint
# or
npx expo lint
```

All lint errors must be fixed before opening a PR. There is no pre-commit hook configured — enforce manually.

Key lint rules in effect (from `eslint-config-expo`):
- `react-hooks/exhaustive-deps` — all `useEffect` / `useCallback` / `useMemo` deps must be complete
- `react-hooks/rules-of-hooks` — hooks must follow the rules of hooks
- No `console.log` / `console.warn` / `console.error` in production paths
- No unused imports

## TypeScript

Strict mode is enabled (`"strict": true` in `tsconfig.json`). The project extends `expo/tsconfig.base`.

There is no standalone `tsc` check script. TypeScript errors surface during Expo Metro bundling and in your editor.

## Testing

There are no automated tests in this project. `package.json` has no `test` script. All verification is manual:
- Test on iOS simulator
- Test on Android emulator
- Test in web browser
- Test in dark mode and light mode
- Test on a wide screen (tablet, browser window ≥ 768 px) for responsive layout

## Development Workflow

1. Pull latest from `main` before starting
2. Create a feature branch from `main`
3. Run `npm start` and verify changes on at least two targets
4. Run `npm run lint` — fix all errors
5. Commit with a Conventional Commit message
6. Open a PR against `main`

## Adding a New Screen

1. Create the file at `app/(tabs)/my-screen.tsx`
2. Add a `<Tabs.Screen>` entry in `app/(tabs)/_layout.tsx` with `name`, `title`, and `tabBarIcon`
3. Add the SF Symbol name to `MAPPING` in `components/ui/icon-symbol.tsx` if it is not already there
4. Wrap content in `ContentContainer` and `AnimatedCard` blocks

## Adding a New Icon

SF Symbol names are used everywhere. On Android and web they map to Material Icons.

1. Find the SF Symbol name you want (e.g., `star.fill`)
2. Find the closest Material Icon name on https://icons.expo.fyi
3. Add the mapping to `MAPPING` in `components/ui/icon-symbol.tsx`:
   ```ts
   'star.fill': 'star',
   ```
4. Use `<IconSymbol name="star.fill" ... />` in your component

Missing mappings silently crash the Android/web builds with `MaterialIcons name={undefined}`.

## Updating Static Data

### Adding a university
Edit `constants/universities.ts`. Follow the `University` type exactly. The `type` field must be `'publiczna'` or `'artystyczna'`.

### Adding a discount partner
Edit `constants/discounts.ts`. The `category` field must exactly match one of the strings in `DISCOUNT_CATEGORIES`.

### Updating the campus map
Pins are in two files — update both:
- `components/study-map.tsx` (preview)
- `app/modal.tsx` → `CAMPUSES_MAP_HTML` constant (interactive modal)

## Common Pitfalls

**`flex: 1` in tablet two-column grids** — Use `flexBasis: '48%'` instead. `flex: 1` does not participate correctly in wrapping flex containers with nested padding.

**Missing icon mapping** — Any SF Symbol name without an entry in `MAPPING` in `icon-symbol.tsx` will render as `undefined` on Android and web, causing a crash.

**`LayoutAnimation` call order** — Call `LayoutAnimation.configureNext()` before the `setState` call that triggers the layout change, not after.

**PieChart width** — The chart width must subtract all container padding: `screenWidth - padding * 2 - 32` (the 32 accounts for `AnimatedCard`'s 16 px padding on each side).

**WebView in ScrollView** — Never put an interactive WebView directly inside a ScrollView. Use the `pointerEvents="none"` + overlay button pattern from `StudyMap`.

**Theme flash on startup** — `app/_layout.tsx` returns `null` until `loadOverride()` resolves. Do not render anything before `appIsReady` is true.
