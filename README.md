# 🎓 StudyLodz – Your Student Essentials

Welcome to **StudyLodz**, a mobile application designed for every student in Łódź! 🇵🇱 This app aims to be your main source of information and guidance for navigating student life, from academic matters to social activities.

## 📜 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Available Scripts](#-available-scripts)

## 🌟 About the Project

### Theme and Purpose

The main goal of the **"Study in Łódź"** app is to create a central, easily accessible source of information for students in Łódź. Its purpose is to simplify adapting to a new academic and city environment and make everyday student life easier.

### Why Was This App Created?

The idea for the app came from observing the challenges students face, especially those coming to Łódź from other cities. Information about universities, city life, available discounts, scholarships, or cultural events is often scattered across many sources. The "Study in Łódź" app was created to solve this problem by aggregating all essential information in a single, intuitive mobile platform.

### Who Is This App For?

The app is designed for:

* **Prospective students:** Helps choose the right university and study program in Łódź.
* **New students:** Serves as a guide and assistant during the first weeks and months in a new city.
* **Current students:** Provides easy access to information about discounts, events, scholarships, and academic life, helping students make the most of what Łódź has to offer.

## ✨ Features

* 🏠 **Home Screen:** Your command center for quick access to all app features.
* 📖 **University Guide:** A comprehensive guide to universities in Łódź.
* 🏙️ **About Łódź:** Explore the city, its attractions, and why it’s a great place to study.
* 💰 **Scholarships & Student Life:** Find information about available scholarships and student life tips.
* 💸 **Cost of Living Calculator:** Estimate your monthly expenses with our handy calculator.
* 🏷️ **Student Discounts:** A database of places offering student discounts.

## 🚀 Tech Stack

The project uses modern technologies to ensure the best user experience:

* **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Routing:** [Expo Router](https://expo.github.io/router/)
* **Navigation:** [React Navigation](https://reactnavigation.org/)
* **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
* **Icons:** [Lucide React Native](https://lucide.dev/) & [Expo Vector Icons](https://docs.expo.dev/guides/icons/)
* **Styling:** StyleSheet, Expo Linear Gradient
* **Linting:** [ESLint](https://eslint.org/)

## 📂 Project Structure

The project has a clear and scalable folder structure that makes development and maintenance easier:

```
StudyInLodz/
├── app/                # Main app logic and file-based routing
│   ├── (tabs)/         # Screens available in the bottom navigation
│   │   ├── index.tsx   # Home screen
│   │   ├── study.tsx   # University guide
│   │   ├── lodz.tsx    # About Łódź
│   │   ├── scholarship.tsx # Scholarships & student life
│   │   ├── costs.tsx   # Cost calculator
│   │   └── discounts.tsx # Student discounts
│   └── _layout.tsx     # Main app layout
├── assets/             # Images, fonts, and other static resources
├── components/         # Reusable UI components
├── constants/          # Constants (themes, university data, etc.)
├── hooks/              # Custom React hooks
└── ...                 # Configuration files
```

## 🏁 Getting Started

Follow these steps to run a local copy of the project.

### Requirements

Make sure you have [Node.js](https://nodejs.org/) (LTS version) and [npm](https://www.npmjs.com/) installed on your computer.

### Installation

1. Clone the repository (if you haven’t already):

   ```sh
   git clone https://github.com/konradxmalinowski/StudiujWLodzi.git
   cd StudiujWLodzi
   ```
2. Install all project dependencies:

   ```sh
   npm install
   ```

### Running the App

After installing dependencies, you can start the app:

```sh
npm start
```

This will open the Expo developer tools in your browser. Then you can run the app on:

* Android emulator or device (requires Android Studio)
* iOS simulator or device (requires Xcode on macOS)
* Web browser

## 📜 Available Scripts

The following scripts are available in the project:

* `npm start`: Starts the Expo development server.
* `npm run android`: Runs the app on an Android emulator/device.
* `npm run ios`: Runs the app on an iOS simulator/device.
* `npm run web`: Runs the app in a web browser.
* `npm run lint`: Runs ESLint to find and fix code issues.
* `npm run reset-project`: Resets the project state (custom script).

---

## 🐛 Audyt kodu – Problemy i błędy (Production Readiness Review)

Poniżej znajduje się pełna lista problemów znalezionych w projekcie, posortowanych według pliku i linii. Błędy krytyczne są oznaczone jako **[KRYTYCZNY]**, reszta jako **[BŁĄD]**, **[OSTRZEŻENIE]** lub **[JAKOŚĆ KODU]**.

---

### `app/(tabs)/discounts.tsx`

- **Linia 109 – [KRYTYCZNY]**: `fontSize: .16` – wartość `0.16` (zamiast `16`) sprawia, że tekst przycisku "Odwiedź stronę Karty Łodzianina" jest niewidoczny (rozmiar czcionki 0.16px). Poprawna wartość: `fontSize: 16`.

---

### `app/(tabs)/index.tsx`

- **Linia 148 – [BŁĄD]**: `wordWrap: 'break-word'` – to właściwość CSS/web, nieobsługiwana przez React Native `StyleSheet`. Na platformach natywnych jest ignorowana, ale może powodować ostrzeżenia lub błędy na niektórych wersjach `react-native-web`.
- **Linia 160 – [OSTRZEŻENIE]**: `width: 400` z `maxWidth: '98%'` – hardkodowana szerokość `400` px może wychodzić poza ekran na bardzo wąskich urządzeniach, zanim `maxWidth` zadziała. Lepiej użyć tylko `maxWidth`.

---

### `app/(tabs)/lodz.tsx`

- **Linia 254 – [JAKOŚĆ KODU]**: `key={index}` w `.map()` na tablicy `SECTIONS` – używanie indeksu tablicy jako `key` jest antywzorcem w React. Należy używać stabilnego identyfikatora, np. `key={section.title}`.

---

### `app/(tabs)/study.tsx`

- **Linia 9 – [JAKOŚĆ KODU]**: Import `Link` z `expo-router` jest nieużywany. Powinien zostać usunięty (linting powinien to wychwytywać).
- **Linia 44 – [OSTRZEŻENIE]**: `handlePress` przyjmuje parametr `university: any` – słabe typowanie. Powinien używać typu `University` z `@/constants/universities`.

---

### `app/(tabs)/costs.tsx`

- **Linia 156 – [BŁĄD]**: `<ThemedText>&nbsp;</ThemedText>` – encja HTML `&nbsp;` nie jest obsługiwana w React Native. W środowisku natywnym zostanie wyświetlona jako literalny tekst `&nbsp;`. Należy użyć spacji lub pustego View.

---

### `app/modal.tsx`

- **Linia 31–37 – [OSTRZEŻENIE]**: Brak obsługi przypadku, gdy `imageName` zostanie przekazany, ale nie istnieje w `IMAGE_SOURCES`. Zmienna `imageSource` będzie `undefined`, a `<Image source={undefined}>` może powodować crash lub biały ekran. Należy dodać guard: `if (!imageSource) return <Text>Nie znaleziono obrazu</Text>`.

---

### `components/presentation-hero.tsx`

- **Linia 9 – [KRYTYCZNY]**: `require('@/assets/images/image2.jpg')` – plik `image2.jpg` **nie istnieje** w katalogu `assets/images/`. Montowanie tego komponentu spowoduje crash aplikacji (Metro bundler error). Komponent jest na razie nieużywany (dead code), ale sam błąd importu może powodować problemy przy bundlowaniu.

---

### `components/study-map.web.tsx`

- **Cały plik – [OSTRZEŻENIE]**: Komponent `StudyMap` na web zwraca `null` – mapa jest całkowicie niewidoczna w przeglądarce. Brak fallbacku (np. statyczny obraz lub informacja "Mapa niedostępna w przeglądarce").

---

### `components/hello-wave.tsx`

- **Linia 4 – [JAKOŚĆ KODU]**: Komponent `HelloWave` wyświetla ikonę klucza (wrench), a nie machającą rączkę. Nazwa komponenty jest myląca. Albo ikona powinna być zmieniona na emoji 👋 lub odpowiednią ikonę pozdrowienia, albo komponent powinien zostać przemianowany.

---

### `components/city-hero.tsx`

- **Cały plik – [JAKOŚĆ KODU]**: Komponent `CityHero` jest zdefiniowany, ale nie jest importowany w żadnym ekranie aplikacji (dead code). Powinien zostać albo użyty, albo usunięty.

---

### `components/animated-category-item.tsx`

- **Linia 14–16 – [OSTRZEŻENIE]**: `useEffect` odwołuje się do `opacity`, `translateY` (shared values) wewnątrz efektu, ale nie zawiera ich w tablicy zależności. W trybie `strict` z React Compiler może to generować ostrzeżenia. Poprawna tablica: `[opacity, translateY, index]`.

---

### `components/ui/custom-checkbox.tsx`

- **Linia 16 – [OSTRZEŻENIE]**: `useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'thumb')` – `'thumb'` nie jest poprawnym kluczem w `Colors.light` ani `Colors.dark`. TypeScript w trybie strict powinien to wychwycić. Działa tylko dlatego, że oba argumenty `light` i `dark` są podane (fallback do `colorFromProps`), ale jest to nieczyste TypeScript i generuje błąd typów.

---

### `hooks/use-color-scheme.ts`

- **Linia 14 – [OSTRZEŻENIE]**: `if (AsyncStorage)` – `AsyncStorage` jest zawsze truthy (zaimportowany obiekt modułu nigdy nie jest `null`). Ten warunek jest zbędny i może prowadzić do fałszywego poczucia bezpieczeństwa. Należy usunąć ten guard lub używać sprawdzenia `typeof`.

---

### `constants/theme.ts`

- **Linia 30–53 – [JAKOŚĆ KODU]**: Eksportowana stała `Fonts` nie jest używana nigdzie w projekcie. Jest to dead code, który powinien zostać usunięty lub udokumentowany.

---

### `components/parallax-scroll-view.tsx`

- **Linia 66–68 – [JAKOŚĆ KODU]**: Styl `container` (`flex: 1`) jest zdefiniowany w `StyleSheet.create`, ale nigdy nie jest używany w komponencie. Dead code.

---

### `package.json`

- **Linia 14 – [OSTRZEŻENIE]**: `@types/lodash` jest wymieniony w `dependencies` (zależności produkcyjne), a powinien być w `devDependencies`. Typy TypeScript nigdy nie powinny być w `dependencies`.
- **[OSTRZEŻENIE]**: Biblioteki `lodash` i `@types/lodash` są zainstalowane, ale nie są używane w żadnym pliku projektu. Są to nieużywane zależności zwiększające rozmiar bundla.
- **[OSTRZEŻENIE]**: `@types/react-native: ^0.72.8` jest bardzo przestarzałą wersją typów (0.72.x), podczas gdy `react-native` to `^0.81.5`. Rozbieżność wersji typów i biblioteki może powodować błędy TS lub brak podpowiedzi IDE.
- **[JAKOŚĆ KODU]**: Brak skryptu `test` – projekt nie ma żadnych testów jednostkowych ani integracyjnych. Dla aplikacji produkcyjnej jest to poważna luka.

---

### `app.json`

- **[OSTRZEŻENIE]**: Brak `bundleIdentifier` dla platformy iOS (sekcja `ios`). Podany jest jedynie `supportsTablet: true`. Dla buildu produkcyjnego na iOS wymagany jest `bundleIdentifier` (np. `"bundleIdentifier": "com.konradxmalinowski.StudiujWLodzi"`). Bez niego build EAS zakończy się błędem lub wygeneruje losowy identyfikator.

---

### `.gitignore`

- **[OSTRZEŻENIE]**: Katalog `dist/` jest wymieniony w `.gitignore`, ale folder `dist/` jest już obecny w repozytorium (był zacommitowany przed dodaniem reguły). Artefakty buildu nie powinny być w repozytorium. Należy je usunąć: `git rm -r --cached dist/`.

---

### `eas.json`

- **[OSTRZEŻENIE]**: Brak skonfigurowanej platformy w `submit.production`. Sekcja `submit: { production: {} }` jest pusta – brak konfiguracji `applicationId` (Android) czy `appleId`/`ascAppId` (iOS). Submission do sklepów wymaga uzupełnienia tych danych przed wydaniem.

---

### Podsumowanie

| Kategoria | Liczba |
|---|---|
| Krytyczne błędy (crash / niewidoczny UI) | 2 |
| Błędy funkcjonalne | 2 |
| Ostrzeżenia (potencjalne problemy) | 10 |
| Jakość kodu / dead code | 7 |
| **Łącznie** | **21** |

#### Priorytety naprawy przed wydaniem produkcyjnym:
1. `discounts.tsx:109` – poprawić `fontSize: .16` → `fontSize: 16`
2. `presentation-hero.tsx:9` – usunąć lub naprawić brakujący plik `image2.jpg`
3. `app.json` – dodać `bundleIdentifier` dla iOS
4. `package.json` – przenieść `@types/lodash` do `devDependencies`, usunąć nieużywane `lodash`/`@types/lodash`, zaktualizować `@types/react-native`
5. `index.tsx:148` – usunąć `wordWrap: 'break-word'`
6. `costs.tsx:156` – zastąpić `&nbsp;` zwykłą spacją lub usunąć
7. `modal.tsx` – dodać null-check dla `imageSource`
8. `.gitignore` – usunąć `dist/` z repozytorium (`git rm -r --cached dist/`)
9. `eas.json` – uzupełnić konfigurację `submit.production`
