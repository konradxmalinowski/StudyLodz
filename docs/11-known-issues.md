# Known Issues and Technical Notes

## No Automated Tests

There are no unit tests, integration tests, or snapshot tests. `package.json` has no `test` script. All quality assurance is manual. This is an accepted trade-off for a small, read-only app with static data — but it means refactoring has no safety net.

## Data Staleness

All content is static and will go stale without manual updates and app releases:
- University fields of study cover 6 of Lodz's 19 universities, and each list is a curated subset
- Discount partners cover 17 of ~200+ listed on kartalodzianina.pl
- Cost-of-living values reflect 2024/2025 academic year prices
- Scholarship amounts are approximate; exact values vary per university and are set annually

See `docs/DATA_SOURCES.md` for authoritative URLs and recommended update cadence.

## Map Requires Network

The campus map (both preview and full-screen modal) fetches tiles from `basemaps.cartocdn.com` at runtime. The app is otherwise fully offline. Users without a network connection at the time they open the map will see a blank tile area with markers only. There is no offline tile caching.

## `hello-wave.tsx` Name Mismatch

The `HelloWave` component renders a waving-hand SVG icon (confirmed working) but is historically noted in the changelog as "renders a wrench icon, not a waving hand." The name is potentially misleading but the behavior is correct in the current code. This is a legacy note.

## No Version-Code Management Beyond `autoIncrement`

`eas.json` sets `autoIncrement: true` for the production profile. This means EAS automatically increments the iOS `buildNumber` and Android `versionCode`. The human-readable `version` in `app.json` must be updated manually before each release — there is no script or reminder for this.

## `icon-symbol.tsx` Mapping is Manual

Every SF Symbol name used anywhere in the app must have a corresponding entry in the `MAPPING` object in `components/ui/icon-symbol.tsx`. There is no automated check for this. A missing mapping silently results in `MaterialIcons name={undefined}` on Android and web, which crashes the icon render. This is an ongoing maintenance burden when adding new icons.

## `ThemedView` Web Transform Workaround

`ThemedView` contains a manual workaround to convert React Native transform arrays into CSS transform strings for web (React DOM cannot handle array-form transforms). This patch is applied directly in the component with a try/catch. If React Native's web support changes this behavior, the workaround may conflict. The same pattern exists in `icon-symbol.ios.tsx`.

## `react-native-worklets` Version Sensitivity

`react-native-worklets` must be pinned to `0.5.1` (currently in `package.json`). Version `0.6.1` caused a JS/native version mismatch crash on launch on Android. Upgrading requires verifying both the JS package version and the native build version match.

## No CI/CD

There is no GitHub Actions or other CI pipeline. Lint, build, and submit are all manual. A failed build is only detected when `eas build` is run.

## `eas.json` Submit Config is Incomplete

The `submit.production` block in `eas.json` is currently empty (`{}`). Before submitting to stores, the following must be added:
- iOS: `appleId`, `ascAppId` (from App Store Connect)
- Android: `serviceAccountKeyPath`, `track`

See `docs/BUILD.md` sections 5 and 7 for how to configure these.

## Web Output in `dist/` is Committed

The `dist/` directory (static web export) is committed to the repository. This is intentional for simple static hosting but means the repo always contains binary assets. Git history for binary files in `dist/` is unusually large. Regenerate with `npx expo export --platform web` when updating.

## No Error Boundary

There is no React error boundary. An uncaught render error in any component will crash the app entirely with a red screen in development and a white screen in production.

## `PresentationHero` is Unused

The `components/presentation-hero.tsx` component exists in the repository but is not imported or used by any screen. It is dead code. It renders a full-bleed image hero with an overlay CTA, visually similar to what `ParallaxScrollView` achieves. It could be removed or repurposed.

## `AnimatedCategoryItem` is Unused

`components/animated-category-item.tsx` exists but is not imported by any current screen. It is dead code from an earlier version of the discounts UI.

## Leaflet Loaded from CDN

The Leaflet JS/CSS is loaded from `unpkg.com` at runtime:
```
https://unpkg.com/leaflet@1.9.4/dist/leaflet.css
https://unpkg.com/leaflet@1.9.4/dist/leaflet.js
```

If unpkg is unavailable or slow, the map will fail to load. The files are not bundled locally.
