# Data Sources

This document tracks all static data in the app, notes where it came from, what should be scraped instead of maintained by hand, and links to authoritative sources.

---

## universities — `constants/universities.ts`

**Current state:** 6 universities, each with 5–10 hand-picked fields of study and a short description.

**Problem:** The lists are selective and will go stale. PŁ alone has ~30 degree programs; UŁ has 90+.

**Should be scraped from:**

| University | Programs page |
|---|---|
| Politechnika Łódzka | https://www.p.lodz.pl/kandydaci/kierunki-studiow |
| Uniwersytet Łódzki | https://www.uni.lodz.pl/kandydaci |
| Uniwersytet Medyczny w Łodzi | https://umed.lodz.pl/kandydaci |
| Akademia Sztuk Pięknych | https://asp.lodz.pl/pl/rekrutacja |
| Akademia Muzyczna | https://amuz.lodz.pl/rekrutacja |
| Szkoła Filmowa w Łodzi (PWSFTviT) | https://filmschool.lodz.pl/rekrutacja |

Authoritative national registry: https://polon.nauka.gov.pl (MEiN, updated each academic year).

**Scraper type:** Static HTML, once a year before recruitment season (May–June).

---

## campus map pins — `components/study-map.tsx`

**Current state (before fix):** Only 2 out of 6 universities were pinned — Politechnika Łódzka and Uniwersytet Łódzki.

**Fixed:** All 6 universities are now pinned with GPS coordinates sourced from OpenStreetMap.

**Coordinates used:**

| University | Address | lat | lon |
|---|---|---|---|
| Politechnika Łódzka | ul. Żeromskiego 116 | 51.7490 | 19.4550 |
| Uniwersytet Łódzki | ul. Narutowicza 65 | 51.7735 | 19.4678 |
| Uniwersytet Medyczny | ul. Kościuszki 4 | 51.7617 | 19.4527 |
| Akademia Sztuk Pięknych | ul. Wojska Polskiego 121 | 51.7752 | 19.4715 |
| Akademia Muzyczna | ul. Gdańska 32 | 51.7688 | 19.4636 |
| Szkoła Filmowa (PWSFTviT) | ul. Targowa 61/63 | 51.7583 | 19.4801 |

To update or verify: search each address on https://www.openstreetmap.org and read the URL coordinates.

---

## cost of living ranges — `app/(tabs)/costs.tsx`

**Current state:** Hard-coded slider ranges and default values.

| Category | min | max | default | Notes |
|---|---|---|---|---|
| Zakwaterowanie | 400 | 3500 | 800 PLN | Reasonable range (akademik ~400–600, kawalerka ~1500–2500) |
| Wyżywienie | 400 | 1200 | 600 PLN | Reasonable |
| Transport | 0 | 150 | **48 PLN** | Fixed: MPK Łódź student monthly pass (50% discount) = 48 PLN |
| Rozrywka i inne | 100 | 800 | 300 PLN | Reasonable |

**Fixed:** Transport default was 70 PLN; the real reduced student pass is **48 PLN**.

**Should be updated from:**
- Transport: https://www.mpk.lodz.pl/bilety — student pass = bilet miesięczny ulgowy
- Rent: https://www.otodom.pl or https://www.olx.pl (search "stancja Łódź", "kawalerka Łódź")
- GUS data for food/living: https://stat.gov.pl/obszary-tematyczne/ceny-handel/

**Recommended update cadence:** Once per academic year (September), before students search for accommodation.

---

## scholarships — `app/(tabs)/scholarship.tsx`

**Current state:** 4 national scholarship types (Rektora, Socjalne, Niepełnosprawności, Ministra) with descriptions and gov.pl links. No amounts shown.

**Problem:** Scholarship amounts are set per university, per academic year. Not shown at all.

**Amounts (2024/2025, approximate):**

| Scholarship | Approximate amount |
|---|---|
| Stypendium rektora | 600–1200 PLN/month depending on university |
| Stypendium socjalne | 400–1200 PLN/month (income-tested) |
| Stypendium dla niepełnosprawnych | 200–500 PLN/month depending on degree of disability |
| Stypendium ministra | ~4000 PLN one-time |

**Should be scraped from:** Each university's BIP or student affairs page. PŁ: https://www.p.lodz.pl/student/stypendia

**Scraper type:** PDF/HTML, annually (October, after universities publish their regulations for the new year).

---

## discount partners — `constants/discounts.ts` + `app/(tabs)/discounts.tsx`

**Current state (after fix):** 17 manually curated partners across 6 categories. Screen shows a filterable list — tap a category to narrow results; each entry shows name, discount terms, address, and an external link.

**Problem:** The 17 entries are a starting point. kartalodzianina.pl lists ~200+ partners.

**Should be scraped from:** https://kartalodzianina.pl/mlodzi — full partner list with name, address, discount description, and category.

**Scraper type:** Static HTML / possible JSON API. Inspect the Network tab to check for an API endpoint before writing an HTML scraper.

**Data shape (already typed in `constants/discounts.ts`):**
```ts
type DiscountPartner = {
  name: string;
  category: string;
  discount: string;
  address?: string;
  url?: string;
};
```

**To expand:** Replace the manual list in `DISCOUNT_PARTNERS` with output from the scraper. Category names must match the `DISCOUNT_CATEGORIES` array exactly.

---

## editorial content (no scraping needed)

The following data is curated, rarely changes, and would not benefit from scraping:

| Data | Location |
|---|---|
| City highlights (Piotrkowska, EC1, Manufaktura, Scena) | `lodz.tsx` — `TIDBITS` |
| Student life benefits (cost, culture, community, jobs) | `lodz.tsx` — `BENEFITS` |
| Neighborhood guides | `lodz.tsx` — `NEIGHBORHOODS` |
| Intro sections with photos | `lodz.tsx` — `SECTIONS` |
| Student life tips (Juwenalia, org, clubs, sport) | `scholarship.tsx` — `STUDENT_LIFE` |
