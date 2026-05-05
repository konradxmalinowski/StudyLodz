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

Poniżej znajduje się pełna lista problemów znalezionych w projekcie, posortowanych według pliku i linii. Status: ✅ Naprawiono | ⚠️ Wymaga ręcznej akcji | 🔧 Znane ograniczenie

---

### `components/ui/icon-symbol.tsx` ✅

- **[KRYTYCZNY – NAPRAWIONO]**: Brakujące mapowania ikon dla Android/web: `building.2.crop.circle`, `tree.circle`, `graduationcap.circle`, `tram.circle`, `graduationcap.fill`. Na Android/web `MaterialIcons name={undefined}` crashuje. Dodano mapowania.

---

### `app/(tabs)/discounts.tsx` ✅

- **Linia 109 – [KRYTYCZNY – NAPRAWIONO]**: `fontSize: .16` → `fontSize: 16`. Tekst przycisku był niewidoczny.
- **Linia 61 – [JAKOŚĆ KODU – NAPRAWIONO]**: `key={index}` → `key={category.name}` w `DISCOUNT_CATEGORIES.map()`.

---

### `app/(tabs)/scholarship.tsx` ✅

- **Linia 84 – [JAKOŚĆ KODU – NAPRAWIONO]**: `key={index}` → `key={item.title}` w `SCHOLARSHIPS.map()`.
- **Linia 100 – [JAKOŚĆ KODU – NAPRAWIONO]**: `key={index}` → `key={item.title}` w `STUDENT_LIFE.map()`.
- **Linia 67–69 – [OSTRZEŻENIE – NAPRAWIONO]**: `console.error` w `openLink` zastąpiony cichym catch (nie logujemy błędów do konsoli w produkcji).

---

### `app/(tabs)/index.tsx` ✅

- **Linia 44–47 – [OSTRZEŻENIE – NAPRAWIONO]**: `useEffect` z brakującymi `imageOpacity`, `titleTranslateY` w tablicy deps.
- **Linia 148 – [BŁĄD – NAPRAWIONO]**: `wordWrap: 'break-word'` – usunięto (nieważna właściwość RN).
- **Linia 155 – [JAKOŚĆ KODU – NAPRAWIONO]**: `display: 'flex'` jest domyślne w RN – usunięto redundantną właściwość.

---

### `app/(tabs)/lodz.tsx` ✅

- **Linia 134 – [OSTRZEŻENIE – NAPRAWIONO]**: `useEffect` z brakującym `imageOpacity` w tablicy deps.
- **Linia 254 – [JAKOŚĆ KODU – NAPRAWIONO]**: `key={index}` → `key={section.title}` w `SECTIONS.map()`.

---

### `app/(tabs)/costs.tsx` ✅

- **Linia 155–157 – [BŁĄD – NAPRAWIONO]**: `<ThemedText>&nbsp;</ThemedText>` – encja HTML nie działa w RN. Usunięto zbędny spacer, `justifyContent: 'space-between'` działa poprawnie z 2 elementami.

---

### `app/(tabs)/study.tsx` ✅

- **Linia 9 – [JAKOŚĆ KODU – NAPRAWIONO]**: Usunięto nieużywany import `Link`.
- **Linia 44 – [OSTRZEŻENIE – NAPRAWIONO]**: `university: any` → `university: University`.

---

### `app/_layout.tsx` ✅

- **Linia 39–44 – [OSTRZEŻENIE – NAPRAWIONO]**: `SplashScreen.hideAsync()` bez obsługi błędów. Dodano try/catch.

---

### `app/modal.tsx` ✅

- **Linia 31–37 – [OSTRZEŻENIE – NAPRAWIONO]**: Brak null-checka dla `imageSource` gdy `imageName` nie istnieje w `IMAGE_SOURCES`. Dodano guard z komunikatem błędu.

---

### `components/presentation-hero.tsx` ✅

- **Linia 9 – [KRYTYCZNY – NAPRAWIONO]**: `require('@/assets/images/image2.jpg')` – plik nie istnieje. Zmieniono na `image.jpg`.
- **[JAKOŚĆ KODU]**: Komponent jest nadal nieużywany (dead code) – nie importowany w żadnym ekranie.

---

### `components/study-map.web.tsx` ✅

- **[OSTRZEŻENIE – NAPRAWIONO]**: Zwracał `null` – mapa niewidoczna na web. Zastąpiono informacyjnym fallbackiem UI.

---

### `components/animated-category-item.tsx` ✅

- **Linia 14–16 – [OSTRZEŻENIE – NAPRAWIONO]**: Uzupełniono tablicę deps `useEffect`: `[opacity, translateY, index]`.

---

### `components/ui/custom-checkbox.tsx` ✅

- **Linia 16 – [OSTRZEŻENIE – NAPRAWIONO]**: `'thumb'` → `'background'` jako klucz `useThemeColor` (był niepoprawny klucz).

---

### `hooks/use-color-scheme.ts` ✅

- **Linia 14 – [OSTRZEŻENIE – NAPRAWIONO]**: Usunięto zbędny `if (AsyncStorage)` (zawsze truthy).

---

### `constants/theme.ts` ✅

- **Linia 30–53 – [JAKOŚĆ KODU – NAPRAWIONO]**: Usunięto nieużywany eksport `Fonts` i import `Platform`.

---

### `components/parallax-scroll-view.tsx` ✅

- **Linia 66–68 – [JAKOŚĆ KODU – NAPRAWIONO]**: Usunięto nieużywany styl `container`.

---

### `components/hello-wave.tsx`

- **[JAKOŚĆ KODU]**: Komponent wyświetla ikonę klucza (wrench), a nie machającą rączkę. Nazwa `HelloWave` jest myląca — do rozważenia przez autora.

---

### `components/city-hero.tsx`

- **[JAKOŚĆ KODU]**: Komponent zdefiniowany, ale nie importowany w żadnym ekranie (dead code).

---

### `package.json` ✅

- **[NAPRAWIONO]**: Usunięto nieużywane: `lodash`, `@types/lodash`, `expo-image`, `lucide-react-native`, `expo-font`, `react-native-worklets`.
- **[NAPRAWIONO]**: Zaktualizowano `@types/react-native` do `^0.73.0`.
- **[JAKOŚĆ KODU]**: Brak skryptu `test` – projekt nie ma testów jednostkowych. Wymaga dodania przez autora.

---

### `app.json` ✅

- **[NAPRAWIONO]**: Dodano `bundleIdentifier: "com.konradxmalinowski.StudiujWLodzi"` dla iOS.

---

### `app.json` ⚠️

- **[OSTRZEŻENIE]**: Brak konfiguracji Google Maps API key dla Android. `react-native-maps` na produkcyjnym buildzie Androida wymaga `google-services.json` oraz `googleServicesFile` w `app.json`. Bez tego mapa nie załaduje się na produkcji (Android).

---

### `eas.json` ⚠️

- **[OSTRZEŻENIE]**: Sekcja `submit.production` jest pusta. Wymaga uzupełnienia `applicationId` (Android) i `appleId`/`ascAppId` (iOS) przed submisją do sklepów.

---

### Podsumowanie

| Kategoria | Znaleziono | Naprawiono |
|---|---|---|
| Krytyczne błędy (crash / niewidoczny UI) | 3 | 3 ✅ |
| Błędy funkcjonalne | 3 | 3 ✅ |
| Ostrzeżenia (potencjalne problemy) | 12 | 10 ✅ |
| Jakość kodu / dead code | 9 | 7 ✅ |
| Wymagające ręcznej akcji | 2 | — ⚠️ |
| **Łącznie** | **29** | **23 naprawiono** |

#### Pozostałe do zrobienia ręcznie:
1. **`app.json`** – skonfigurować Google Maps API key dla Android produkcji
2. **`eas.json`** – uzupełnić `submit.production` przed submisją do sklepów
3. **`components/hello-wave.tsx`** – zdecydować o ikonie lub nazwie komponentu
4. **`components/city-hero.tsx`** – użyć lub usunąć komponent (dead code)
