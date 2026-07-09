# Data

## Overview

All application data is static TypeScript — hardcoded at build time and bundled with the app binary. There is no network API, database, or CMS. Data updates require a new app release.

## Data Sources

### `constants/universities.ts`

**Type definitions:**
```ts
type UniversityField = {
  name: string;
  description: string;
};

type University = {
  title: string;
  content: string;
  fields: UniversityField[];
  type: 'publiczna' | 'artystyczna';
};
```

**`UNIVERSITIES` array** — 6 universities:

| University | Type | Fields |
|---|---|---|
| Politechnika Lodzka | publiczna | 16 fields |
| Uniwersytet Lodzki | publiczna | 18 fields |
| Uniwersytet Medyczny | publiczna | 11 fields |
| Akademia Sztuk Pieknych | artystyczna | 9 fields |
| Akademia Muzyczna | artystyczna | 8 fields |
| Szkola Filmowa w Lodzi | artystyczna | 7 fields |

Consumed by: `app/(tabs)/study.tsx` (list view) and `app/modal.tsx` (detail view via `.find()` by `title`).

**Update rule:** Do not change the `University` type shape without updating both consumers. Category names in `type` must remain `'publiczna'` or `'artystyczna'` — the filter in `study.tsx` does a strict comparison.

### `constants/discounts.ts`

**Type definitions:**
```ts
type DiscountPartner = {
  name: string;
  category: string;   // must exactly match a DISCOUNT_CATEGORIES name
  discount: string;
  address?: string;
  url?: string;
};
```

**`DISCOUNT_CATEGORIES`** — 6 categories:

| Name | Icon |
|---|---|
| Transport publiczny | `bus.fill` |
| Kultura i sztuka | `theatermasks.fill` |
| Sport i rekreacja | `figure.pool.swim` |
| Gastronomia | `fork.knife` |
| Edukacja i rozwoj | `book.fill` |
| Zdrowie i uroda | `heart.fill` |

**`DISCOUNT_PARTNERS`** — 17 partners distributed across those 6 categories.

Consumed by: `app/(tabs)/discounts.tsx`. The filter is a strict `p.category === selectedCategory` string match. A partner with a `category` value not in `DISCOUNT_CATEGORIES` will never appear in category-filtered view (it will still appear in the "all" list).

### Inline data in screen files

Some data is defined at the top of its screen file rather than in `constants/`. This applies to data that is small, screen-specific, and unlikely to be reused:

| Array | File | Items |
|---|---|---|
| `SCHOLARSHIPS` | `scholarship.tsx` | 4 national scholarship types |
| `STUDENT_LIFE` | `scholarship.tsx` | 4 student life highlights |
| `CATEGORIES` | `costs.tsx` | 4 cost categories with slider config |
| `TIDBITS` | `lodz.tsx` | 4 city highlight cards |
| `BENEFITS` | `lodz.tsx` | 4 student life benefit cards |
| `NEIGHBORHOODS` | `lodz.tsx` | 4 neighborhood descriptions |
| `SECTIONS` | `lodz.tsx` | 4 long-read sections with images |
| `SECTIONS` (home) | `index.tsx` | 2 quick-nav section cards |

## Static Image Assets

Images used in the app:

| File | Used in |
|---|---|
| `image.jpg` | Home screen parallax header; `PresentationHero` |
| `lodz1_jpg.jpg` | Lodz gallery + SECTIONS card |
| `lodz2_jpg.jpg` | Lodz gallery |
| `lodz1_png.jpg` | Lodz gallery + SECTIONS card |
| `lodz2_png.jpg` | Lodz gallery + SECTIONS card |
| `lodz3_png.jpg` | Lodz gallery + SECTIONS card |
| `lodz4_png.jpg` | Lodz gallery |
| `lodz5.jpg` | Lodz gallery |

All city gallery photos are stored as optimized JPEG (re-encoded from the original PNG exports to cut install size — see `docs/CHANGELOG.md`); filenames keep their historical `_png`/`_jpg` suffixes as identifiers even though every file is now JPEG-encoded.

All city images are referenced both from `lodz.tsx` (inline `require` statements) and from a key-based map in `modal.tsx` (`IMAGE_SOURCES`) for the full-screen viewer. When adding a new image, both locations must be updated.

## Campus Map Data

Map pins are hardcoded Leaflet markers in two places:
1. `components/study-map.tsx` — the non-interactive preview
2. `app/modal.tsx` (`CAMPUSES_MAP_HTML`) — the full-screen interactive modal

Both use identical coordinates. When updating a pin, update both files.

| University | Lat | Lon |
|---|---|---|
| Politechnika Lodzka | 51.749 | 19.455 |
| Uniwersytet Lodzki | 51.773 | 19.468 |
| Uniwersytet Medyczny | 51.762 | 19.453 |
| Akademia Sztuk Pieknych | 51.775 | 19.472 |
| Akademia Muzyczna | 51.769 | 19.464 |
| Szkola Filmowa | 51.758 | 19.480 |

Map tiles: CARTO Voyager (`basemaps.cartocdn.com`). OSM's own tile server (`tile.openstreetmap.org`) is explicitly not used — it blocks requests from mobile WebViews.

## AsyncStorage Key

The theme override is persisted under the key `APP_COLOR_SCHEME_OVERRIDE`. Possible values: `'light'`, `'dark'`, or absent (system default). The key is defined as a constant inside `hooks/use-color-scheme.ts`.

## Known Data Limitations

See `docs/DATA_SOURCES.md` for a full breakdown:
- University field lists cover 6 of Lodz's 19 universities, and each list is selective
- Discount partners cover 17 of ~200+ listed on kartalodzianina.pl
- Cost-of-living ranges are estimates updated manually; transport default (48 PLN) reflects the 2024/2025 MPK student monthly pass
- Scholarship amounts are approximate 2024/2025 figures and vary by university
