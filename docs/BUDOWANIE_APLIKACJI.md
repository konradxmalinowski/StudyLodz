# Jak zbudować aplikację mobilną tego typu

Przewodnik opisuje krok po kroku, jak zbudować aplikację informacyjną dla studentów — w oparciu o konkretne decyzje techniczne z projektu **StudiujWŁodzi**. Cel: aplikacja iOS/Android/web z plikowaniem tras, ciemnym motywem, animacjami i mapą, bez backendu.

---

## 1. Inicjalizacja projektu

```bash
npx create-expo-app@latest NazwaAplikacji --template blank-typescript
cd NazwaAplikacji
```

Upewnij się, że używasz **Expo SDK 54+** i **React Native 0.81+**. Expo Router wymaga `"main": "expo-router/entry"` w `package.json`.

```json
{
  "main": "expo-router/entry"
}
```

Zainstaluj wszystkie zależności na raz:

```bash
npx expo install \
  expo-router expo-haptics expo-linear-gradient expo-splash-screen \
  expo-status-bar expo-symbols expo-system-ui expo-web-browser \
  @expo/vector-icons \
  @react-native-async-storage/async-storage \
  @react-native-community/slider \
  @react-navigation/bottom-tabs @react-navigation/native @react-navigation/elements \
  react-native-reanimated react-native-worklets \
  react-native-gesture-handler react-native-safe-area-context \
  react-native-screens react-native-svg react-native-web react-native-webview \
  react-native-chart-kit
```

---

## 2. Struktura plików

Expo Router używa **file-based routingu** — każdy plik w `app/` to ekran lub layout.

```
app/
├── _layout.tsx          ← root layout (motywy, splash screen, ThemeProvider)
├── modal.tsx            ← współdzielony modal (szczegóły, przeglądarka obrazów, mapa)
└── (tabs)/
    ├── _layout.tsx      ← konfiguracja dolnego paska nawigacji
    ├── index.tsx         ← ekran główny
    ├── study.tsx
    ├── lodz.tsx
    ├── scholarship.tsx
    ├── costs.tsx
    └── discounts.tsx

components/
├── animated-card.tsx    ← karta z animacją wejścia (fade + slide)
├── content-container.tsx ← ograniczenie szerokości treści (max 900px, tablet)
├── parallax-scroll-view.tsx
├── themed-text.tsx
├── themed-view.tsx
└── ui/
    ├── icon-symbol.tsx   ← SF Symbols (iOS) / MaterialIcons (Android/web)
    └── custom-checkbox.tsx

constants/
├── theme.ts             ← paleta kolorów
└── universities.ts      ← dane statyczne

hooks/
├── use-color-scheme.ts  ← motyw z persystencją AsyncStorage
└── use-responsive.ts    ← isTablet, padding, contentWidth
```

> **Zasada:** dane statyczne (uczelnie, zniżki, stypendia) trzymaj w `constants/`. Nie używaj zewnętrznego API dopóki nie musisz — statyczne dane są szybsze i działają offline.

---

## 3. Root layout — motywy i splash screen

`app/_layout.tsx` odpowiada za trzy rzeczy: załadowanie motywu z AsyncStorage przed renderem, ukrycie splash screenu i owinięcie stosu w `ThemeProvider`.

```tsx
// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { loadOverride, useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadOverride(); // wczytaj motyw z AsyncStorage
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try { await SplashScreen.hideAsync(); } catch {}
    }
  }, [appIsReady]);

  const colorScheme = useColorScheme();
  if (!appIsReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ animation: 'fade' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </View>
  );
}
```

Kluczowa decyzja: `appIsReady = false` zwraca `null` (nie renderuje nic), zanim motyw zostanie wczytany. Dzięki temu nie ma migotania jasny→ciemny przy starcie.

---

## 4. Paleta kolorów i motyw

Trzymaj kolory w jednym miejscu. Nie rozrzucaj hardkodowanych wartości po ekranach.

```ts
// constants/theme.ts
const tint = '#4E56C0';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tint,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tint,
  },
};
```

Kolory kart (`#f9f9f9` / `#1c1c1e`) przekazuj jako `lightColor`/`darkColor` do `ThemedView`, nie na sztywno w stylach.

---

## 5. Persystencja motywu (ciemny/jasny/system)

`use-color-scheme.ts` łączy `Appearance` React Native z `AsyncStorage`. Implementacja opiera się na module-level zmiennej `_override` i tablicy `listeners[]` — dzięki temu zmiana motywu propaguje się do wszystkich subskrybentów bez Context.

```ts
// hooks/use-color-scheme.ts
import { useEffect, useState } from 'react';
import { Appearance, type ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_COLOR_SCHEME_OVERRIDE';
let _override: ColorSchemeName | null = null;
const listeners: (() => void)[] = [];

export async function loadOverride() {
  const v = await AsyncStorage.getItem(STORAGE_KEY);
  _override = v as ColorSchemeName | null;
}

export async function setColorSchemeOverride(value: ColorSchemeName | 'system' | null) {
  _override = value === 'system' ? null : value;
  if (value === 'system' || value === null) {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } else {
    await AsyncStorage.setItem(STORAGE_KEY, value);
  }
  listeners.forEach((l) => l()); // poinformuj wszystkich subskrybentów
}

export function useColorScheme(): ColorSchemeName {
  const [system, setSystem] = useState(Appearance.getColorScheme());
  const [, setTick] = useState(0);

  useEffect(() => {
    loadOverride().then(() => setTick((t) => t + 1));
    const sub = Appearance.addChangeListener(({ colorScheme }) => setSystem(colorScheme));
    const l = () => setTick((t) => t + 1);
    listeners.push(l);
    return () => {
      listeners.splice(listeners.indexOf(l), 1);
      sub.remove();
    };
  }, []);

  if (_override === 'dark' || _override === 'light') return _override;
  return system ?? 'light';
}
```

---

## 6. Dolny pasek nawigacji z animowanymi ikonami

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const AnimatedIcon = ({ name, color, focused }) => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconSymbol size={28} name={name} color={color} />
    </Animated.View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      tabBarButton: HapticTab, // haptyka przy przełączaniu
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Główna',
        tabBarIcon: ({ color, focused }) => <AnimatedIcon name="house.fill" color={color} focused={focused} />,
      }} />
      {/* pozostałe ekrany... */}
    </Tabs>
  );
}
```

`HapticTab` to wrapper na `TouchableOpacity` z `Haptics.selectionAsync()`.

---

## 7. Komponenty bazowe: ThemedView i ThemedText

Każdy widok i tekst używający motywu powinien przez te dwa komponenty.

**ThemedView** — przyjmuje opcjonalne `lightColor`/`darkColor`, w stylach przekazuje `backgroundColor`. Na web dodatkowo konwertuje tablicę `transform` na string CSS (React DOM tego wymaga):

```tsx
export function ThemedView({ style, lightColor, darkColor, ...rest }) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const merged = StyleSheet.flatten([{ backgroundColor }, StyleSheet.flatten(style)]);
  // ... web transform workaround
  return <View style={merged} {...rest} />;
}
```

**ThemedText** — system typografii oparty na predefiniowanych typach:

| Typ | Rozmiar | Użycie |
|---|---|---|
| `title` | 32px bold | nagłówek ekranu |
| `subtitle` | 20px bold | nagłówek sekcji |
| `defaultSemiBold` | 16px 600 | tytuł karty |
| `default` | 16px | treść |
| `subtitleParagraph` | 16px, opacity 0.75 | podtytuł pod tytułem ekranu |
| `caption` | 12px, opacity 0.55 | podpis, metadane |
| `overline` | 11px, uppercase, letter-spacing | etykieta przed sekcją |

---

## 8. Animacje wejścia kart — AnimatedCard

Każda karta powinna pojawiać się z animacją fade-in + slide-up. Zbuduj jeden komponent i używaj go wszędzie:

```tsx
// components/animated-card.tsx
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue,
  withDelay, withSpring, withTiming } from 'react-native-reanimated';

export function AnimatedCard({ children, delay = 0, style, onPress }) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPress ? () => { scale.value = withSpring(0.98); } : undefined}
      onPressOut={onPress ? () => { scale.value = withSpring(1); } : undefined}
      style={style}
    >
      <AnimatedThemedView style={[styles.container, animatedStyle]}>
        {children}
      </AnimatedThemedView>
    </Pressable>
  );
}
```

Użycie z opóźnieniami — sekcje pojawiają się sekwencyjnie:

```tsx
<AnimatedCard delay={0}>   {/* tytuł ekranu */}
<AnimatedCard delay={100}> {/* pierwsza sekcja */}
<AnimatedCard delay={200}> {/* druga sekcja */}
```

---

## 9. Układ responsywny (telefon vs tablet)

Jeden hook dostarcza wszystkiego, co potrzebne do różnicowania layoutu:

```ts
// hooks/use-responsive.ts
export const TABLET_BREAKPOINT = 768;
export const CONTENT_MAX_WIDTH = 900;

export function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;
  const padding = isTablet ? 48 : 24;
  return {
    isTablet,
    screenWidth: width,
    padding,
    contentWidth: Math.min(width, CONTENT_MAX_WIDTH) - padding * 2,
  };
}
```

**ContentContainer** ogranicza szerokość treści na tabletach:

```tsx
export function ContentContainer({ children }) {
  const { isTablet, padding } = useResponsive();
  return (
    <View style={[
      { gap: 24, paddingHorizontal: padding, paddingVertical: 24 },
      isTablet && { maxWidth: CONTENT_MAX_WIDTH, alignSelf: 'center', width: '100%' },
    ]}>
      {children}
    </View>
  );
}
```

**Siatki dwukolumnowe** na tablecie:

```tsx
<View style={isTablet ? styles.gridTablet : styles.grid}>
  {items.map(item => (
    <Pressable style={isTablet && styles.gridItemTablet}>
      <ThemedView style={styles.card}>...</ThemedView>
    </Pressable>
  ))}
</View>

// style
grid: { gap: 12 },
gridTablet: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
gridItemTablet: { flexBasis: '48%' }, // NIE flex: 1 — powoduje overflow
```

> **Uwaga:** Używaj `flexBasis: '48%'` zamiast `width: 50%` w gridach. Pikselowe szerokości nie uwzględniają paddingów zagnieżdżonych kontenerów.

---

## 10. Ikony: SF Symbols (iOS) i MaterialIcons (Android/web)

`expo-symbols` daje dostęp do SF Symbols na iOS (tysiące ikon w stylu Apple). Na Androidzie i webie używamy `MaterialIcons` z `@expo/vector-icons`. Budujemy jeden komponent z mapowaniem:

```tsx
// components/ui/icon-symbol.tsx (Android/web fallback)
const MAPPING = {
  'house.fill': 'home',
  'book.fill': 'menu-book',
  'building.2.fill': 'location-city',
  'banknote.fill': 'savings',
  'chevron.right': 'chevron-right',
  magnifyingglass: 'search',
  // ... dodawaj mappingi w miarę potrzeby
} as const;

export function IconSymbol({ name, size, color }) {
  return <MaterialIcons name={MAPPING[name]} size={size} color={color} />;
}
```

```tsx
// components/ui/icon-symbol.ios.tsx (natywne SF Symbols)
import { SymbolView } from 'expo-symbols';
export function IconSymbol({ name, size, color, weight }) {
  return <SymbolView name={name} size={size} tintColor={color} weight={weight} />;
}
```

Expo Router automatycznie wybiera `.ios.tsx` na iOS i `.tsx` na pozostałych platformach.

---

## 11. Mapa w WebView (Leaflet + CARTO)

React Native nie ma natywnej mapy kafelkowej bez natywnych modułów. Najprostsze rozwiązanie: `react-native-webview` z Leaflet.js jako inlined HTML.

```tsx
const MAP_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>body{margin:0} #map{width:100%;height:100vh}</style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map').setView([51.761, 19.465], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map);
  L.marker([51.749, 19.455]).addTo(map).bindPopup('Politechnika Łódzka');
</script>
</body>
</html>`;
```

> **Ważne:** Nie używaj `tile.openstreetmap.org`. OSM blokuje requesty z mobilnych WebView jako naruszenie polityki użytkowania. Używaj **CARTO** (`basemaps.cartocdn.com`) — bezpłatne kafelki z CDN, bez limitu.

**Problem: WebView w ScrollView kradnie gesty**

Gdy `WebView` jest zagnieżdżony w `ScrollView`, rodzic przechwytuje dotknięcia zanim dotrą do Leaflet. Rozwiązanie:

```tsx
// podgląd — nieinteraktywny overlay
<View pointerEvents="none" style={StyleSheet.absoluteFill}>
  <WebView source={{ html: PREVIEW_HTML }} scrollEnabled={false} />
</View>
// przycisk "Otwórz mapę" otwiera modal gdzie WebView jest jedynym elementem
<Pressable onPress={() => router.push('/modal?map=campuses')}>
  <Text>Otwórz mapę</Text>
</Pressable>
```

W modalu `WebView` nie ma nad sobą `ScrollView`, więc Leaflet dostaje wszystkie gesty.

---

## 12. Wykresy — PieChart

```tsx
import { PieChart } from 'react-native-chart-kit';
const { screenWidth, padding } = useResponsive();

<PieChart
  data={[
    { name: 'Zakwaterowanie', population: 800, color: '#FF6384', legendFontColor: '#000' },
    { name: 'Wyżywienie', population: 600, color: '#36A2EB', legendFontColor: '#000' },
  ]}
  width={screenWidth - padding * 2 - 32}  // odejmij padding kontenerów
  height={220}
  chartConfig={{
    backgroundColor: 'transparent',
    backgroundGradientFrom: '#f9f9f9',
    backgroundGradientTo: '#e9e9e9',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
/>
```

> Szerokość wykresu musi uwzględniać **cały padding na ścieżce od krawędzi ekranu do wykresu**: padding ContentContainer + padding AnimatedCard (16px po każdej stronie = 32px dodatkowe).

---

## 13. Haptics — informacja zwrotna dotykowa

Używaj `expo-haptics` przy każdej interakcji. Trzy poziomy:

```tsx
import * as Haptics from 'expo-haptics';

// Przy zaznaczeniu/filtracji (subtelne)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Przy nawigacji/otwieraniu (średnie)
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Przy potwierdzeniu akcji (reset, zapisanie)
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
```

---

## 14. Modal współdzielony

Zamiast osobnych modali dla każdego ekranu, jeden `app/modal.tsx` obsługuje wszystkie przypadki przez parametry trasy:

```
/modal?university=Politechnika Łódzka  → widok kierunków
/modal?image=lodz1.jpg                 → przeglądarka zdjęć
/modal?map=campuses                    → pełnoekranowa mapa
```

```tsx
// app/modal.tsx
const params = useLocalSearchParams();

if (params.map === 'campuses') return <WebView source={{ html: CAMPUSES_HTML }} />;
if (params.image) return <ImageViewer imageName={params.image} />;
return <UniversityDetail name={params.university} />;
```

---

## 15. Wzorce wizualnego designu

### Karty
- Wszystkie karty: `borderRadius: 16`, `padding: 16–20`
- Tło: `lightColor="#f9f9f9" darkColor="#1c1c1e"` (nieznacznie odróżnia się od tła strony)
- Cień: `shadowOpacity: 0.06–0.1`, `elevation: 2–4`

### Ikony w kartach z własnym kolorem
Kiedy masz kategorie z własnymi kolorami (wykres + karty), użyj tego samego koloru wszędzie:

```tsx
const CATEGORIES = [
  { name: 'Zakwaterowanie', color: '#FF6384', icon: 'home-city-outline' },
  // ...
];

<ThemedView style={[styles.card, { borderLeftColor: category.color, borderLeftWidth: 4 }]}>
  <MaterialCommunityIcons color={category.color} />
  <ThemedText style={{ color: category.color }}>{value}</ThemedText>
  <Slider minimumTrackTintColor={category.color} thumbTintColor={category.color} />
</ThemedView>
```

### Pill chips (selektor kategorii)
```tsx
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {categories.map(cat => {
    const active = selected === cat.name;
    return (
      <Pressable
        style={[styles.chip,
          active
            ? { backgroundColor: tintColor, borderColor: tintColor }
            : { borderColor: '#d0d0d0' }
        ]}
        onPress={() => setSelected(active ? null : cat.name)}
      >
        <Text style={{ color: active ? '#fff' : textColor }}>{cat.name}</Text>
      </Pressable>
    );
  })}
</ScrollView>
```

### Odznaki / pill badges
```tsx
<View style={[styles.badge, { backgroundColor: tintColor + '1A' }]}>
  <Text style={{ color: tintColor, fontWeight: '700', fontSize: 12 }}>
    600–1200 PLN/mies.
  </Text>
</View>

// style
badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, alignSelf: 'flex-start' }
```

---

## 16. Dane statyczne — wzorzec constants/

```ts
// constants/universities.ts
export type University = {
  title: string;
  content: string;
  type: 'publiczna' | 'artystyczna';
  fields: { name: string; description: string }[];
};

export const UNIVERSITIES: University[] = [
  {
    title: 'Politechnika Łódzka',
    content: 'Wiodąca uczelnia techniczna w Polsce Centralnej.',
    type: 'publiczna',
    fields: [
      { name: 'Informatyka', description: 'Programowanie, sieci, AI.' },
      // ...
    ],
  },
];
```

Dane typuj ściśle — pozwala to na type-safe dostęp w całej aplikacji i chroni przed błędami literówek w nazwach typów.

---

## 17. ESLint

Projekt używa `eslint-config-expo`. Konfiguracja w `eslint.config.js`:

```js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
module.exports = defineConfig([...expoConfig]);
```

Uruchom sprawdzenie:

```bash
npx expo lint
```

Typowe pułapki do sprawdzenia:
- Brakujące mappingi ikon w `icon-symbol.tsx` dla Android/web
- `useEffect` z brakującymi zależnościami (`eslint-plugin-react-hooks`)
- Nieużywane importy po refaktoringu

---

## 18. Lista zależności i do czego służą

| Pakiet | Do czego |
|---|---|
| `expo-router` | file-based routing, nawigacja |
| `react-native-reanimated` | animacje (Worklet API) |
| `react-native-worklets` | silnik workletów dla Reanimated 4 |
| `expo-haptics` | wibracje/haptyka |
| `expo-linear-gradient` | gradienty (opcjonalne) |
| `expo-symbols` | SF Symbols na iOS |
| `@expo/vector-icons` | MaterialIcons na Android/web |
| `react-native-webview` | mapa Leaflet, osadzony HTML |
| `react-native-chart-kit` | wykresy (PieChart, BarChart) |
| `react-native-svg` | wymagane przez chart-kit |
| `@react-native-community/slider` | suwaki zakresów |
| `@react-native-async-storage/async-storage` | persystencja (motyw, ustawienia) |
| `react-native-safe-area-context` | obsługa notcha i paska systemu |
| `react-native-gesture-handler` | gesty natywne |
| `react-native-screens` | natywna optymalizacja nawigacji |

---

## 19. Częste pułapki

**1. `flex: 1` w gridzie tabletowym zamiast `flexBasis: '48%'`**
`flex: 1` działa, gdy kontener ma stałą szerokość. W zagnieżdżonych kontenerach z paddingiem (AnimatedCard + ThemedView) powoduje overflow. Używaj `flexBasis: '48%'` bez `flex`.

**2. OSM tiles zablokowane**
`tile.openstreetmap.org` blokuje requesty z WebView. Zamień na CARTO lub MapTiler.

**3. WebView w ScrollView — skradzione gesty**
Rozwiązanie: `pointerEvents="none"` na podglądzie + osobny modal z pełnoekranowym WebView.

**4. Szerokość wykresu bez uwzględnienia paddingów**
Każdy kontener owijający wykres (ContentContainer + AnimatedCard) dodaje padding. Odejmij całość od `screenWidth`.

**5. `useEffect` bez zależności dla `useSharedValue`**
Reanimated `useSharedValue` jest stabilną referencją, ale ESLint `react-hooks/exhaustive-deps` wymaga jej w deps array. Dodaj wartości do tablicy zależności.

**6. Brak mappingu ikony na Androidzie**
SF Symbol użyty w kodzie bez odpisu w `MAPPING` renderuje `undefined` jako nazwę ikony — crash na Androidzie/web. Zawsze dodawaj mapowanie przy każdej nowej ikonie.

**7. `LayoutAnimation` + Reanimated**
`LayoutAnimation` (React Native) i Reanimated działają na różnych warstwach i nie kolidują — ale `LayoutAnimation.configureNext()` musi być wywołane **przed** zmianą stanu, który go wyzwala.

---

## 20. Checklist przed publikacją

- [ ] `eas.json` uzupełniony (`applicationId` Android, `bundleIdentifier` iOS)
- [ ] `app.json` — ikona, splash screen, nazwa, wersja
- [ ] Ikony we wszystkich rozmiarach (1024×1024 dla sklepów)
- [ ] Działanie w trybie offline (statyczne dane → OK; CDN tiles → wymagają sieci)
- [ ] Przetestowane na fizycznym urządzeniu iOS i Android
- [ ] Przetestowane w trybie ciemnym
- [ ] Przetestowane na tablecie (≥768px)
- [ ] `npx expo lint` — 0 errors
