# Overview

## What the Project Does

StudiujWLodzi (StudyLodz) is a Polish-language mobile app for students in Lodz, Poland. It aggregates university information, a city guide, national scholarship listings, a cost-of-living calculator, and a student-discount database into one offline-friendly application that runs on iOS, Android, and web.

## Main Goal and Purpose

Students relocating to Lodz face fragmented information spread across dozens of institutional and municipal websites. This app collects that information into a single, curated, always-available reference. All content is static and bundled with the app — no server or account is required.

## Target Audience

- Prospective students comparing Lodz universities and fields of study
- New arrivals who need a city overview, neighborhood guide, and cost estimate
- Current students looking for active discounts or scholarship details

## Feature List

- **Home screen** — animated navigation hub with quick-access cards linking to the main sections
- **University guide** (`/study`) — searchable and filterable list of 6 Lodz universities; tap any entry to open a detail modal with fields of study
- **About Lodz** (`/lodz`) — horizontal photo gallery, city highlights, student life section, neighborhood guide, campus map preview, and thematic long-read cards
- **Campus map** — non-interactive inline preview (Leaflet + CARTO tiles via WebView); "Otwórz mape" opens a full-screen interactive modal
- **Scholarships and student life** (`/scholarship`) — four national scholarship types with approximate amounts and gov.pl deep-links; student life highlights
- **Cost-of-living calculator** (`/costs`) — adjustable sliders for four spending categories; live pie chart; reset-to-defaults button
- **Student discounts** (`/discounts`) — 17 curated partners across 6 categories (Karta Lodzianina / Mlodzi w Lodzi); horizontal category-chip filter
- **Dark / light mode** — system-aware by default; manual toggle persisted to AsyncStorage (or localStorage on web)
- **Tablet layout** — all screens cap content width at 900 px and switch to two-column grids above 768 px
