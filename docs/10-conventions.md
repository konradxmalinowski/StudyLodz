# Conventions

## File and Folder Naming

- All source files use **kebab-case**: `animated-card.tsx`, `use-color-scheme.ts`, `content-container.tsx`
- Screen files inside `app/(tabs)/` are plain lowercase single-word names: `index.tsx`, `study.tsx`, `costs.tsx`
- Platform-specific files use the `.ios.tsx` suffix (Metro convention): `icon-symbol.ios.tsx`, `use-color-scheme.web.ts`
- All component and hook files are `.tsx` or `.ts` — never `.js` or `.jsx`
- Constants files are `.ts` (no JSX)

## Exported Names

- React components are exported as **PascalCase named exports**: `export function AnimatedCard`, `export function ThemedText`
- Screen components (Expo Router pages) use **default exports**: `export default function HomeScreen`
- Hooks use **camelCase prefixed with `use`**: `useColorScheme`, `useResponsive`, `useThemeColor`
- Constants (data arrays, static objects) are **SCREAMING_SNAKE_CASE**: `UNIVERSITIES`, `DISCOUNT_PARTNERS`, `DISCOUNT_CATEGORIES`
- Type definitions are **PascalCase**: `University`, `UniversityField`, `DiscountPartner`

## Import Ordering

All internal imports use the `@/` path alias (resolved to the project root). Example import block:

```tsx
// 1. React and React Native core
import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

// 2. Expo packages
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

// 3. Third-party packages
import { MaterialCommunityIcons } from '@expo/vector-icons';

// 4. Internal components (using @/ alias)
import { AnimatedCard } from '@/components/animated-card';
import { ThemedText } from '@/components/themed-text';

// 5. Internal constants and hooks
import { Colors } from '@/constants/theme';
import { UNIVERSITIES } from '@/constants/universities';
import { useColorScheme } from '@/hooks/use-color-scheme';
```

This ordering is a convention observed across the codebase, not enforced by a lint rule.

## Component Patterns

### Screen component structure
Every tab screen follows this structure:
```tsx
export default function ScreenNameScreen() {
  // 1. hooks
  const colorScheme = useColorScheme();
  const { isTablet } = useResponsive();

  // 2. derived values
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  // 3. handlers
  const handlePress = () => { ... };

  // 4. render
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ContentContainer>
          <AnimatedCard delay={0}> ... </AnimatedCard>
          <AnimatedCard delay={100}> ... </AnimatedCard>
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ ... });
```

### Inline data arrays
Screen-specific static data (not shared) is defined at the top of the file before the component:
```tsx
const SCHOLARSHIPS = [ ... ];
const STUDENT_LIFE = [ ... ];

export default function ScholarshipScreen() { ... }
```

### StyleSheet placement
`StyleSheet.create({})` is always at the bottom of the file, after the component definition.

## Colors and Theme

- Never hardcode theme colors inline — use `Colors[scheme].xxx` or `useThemeColor()`
- Card backgrounds use `lightColor="#f9f9f9" darkColor="#1c1c1e"` as the standard card surface
- Tint color is `#4E56C0` (indigo) — same for light and dark mode (`Colors.light.tint === Colors.dark.tint`)
- Category-specific accent colors (e.g., cost categories, home section cards) are defined as data properties on their respective data objects, not in `constants/theme.ts`

## Haptics

All meaningful user interactions trigger haptics:
- Light: filter changes, checkbox toggles, chip selection
- Medium: navigation, opening a modal, pressing a CTA
- Notification Success: destructive or confirmation actions (e.g., reset)

## Animations

- All entrance animations use `AnimatedCard` — do not build custom entrance animations for individual screen sections
- Animation delays in a screen should be `0, 100, 200, 300 ms` (one per major section)
- Use `withSpring` for interactive feedback (press scale), `withTiming` for entrance animations

## Data Integrity Rules

- `constants/universities.ts` — `type` must be `'publiczna'` or `'artystyczna'`; do not change the `University` type shape without updating `study.tsx` and `modal.tsx`
- `constants/discounts.ts` — `category` in `DISCOUNT_PARTNERS` must exactly match a `name` in `DISCOUNT_CATEGORIES`; the filter uses strict string equality
- Campus map pins — any pin update must be applied in both `components/study-map.tsx` AND `app/modal.tsx` (`CAMPUSES_MAP_HTML`)
- `components/ui/icon-symbol.tsx` — every SF Symbol name used anywhere in the codebase must have an entry in `MAPPING`; missing entries crash on Android/web

## No-console Rule

No `console.log`, `console.warn`, or `console.error` in production code paths. Error handling uses silent `try/catch` or `catch(() => {})`.

## Comments

Comments are only added when the "why" is non-obvious. Comments explaining "what" the code does are not used. Examples of acceptable comments in the codebase:
- The `pointerEvents="none"` explanation in `StudyMap`
- The "dynamic import to avoid circular init issues" note in `ThemeToggle`
- The hidden-measurement explanation in `ReadMore`
