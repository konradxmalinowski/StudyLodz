import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { ErrorBoundary } from '@/components/error-boundary';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { loadOverride, useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load the color scheme
        await loadOverride();
      } catch {
        // loadOverride is best-effort; app renders regardless
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      try {
        await SplashScreen.hideAsync();
      } catch {
        // splash screen might already be hidden
      }
    }
  }, [appIsReady]);

  const colorScheme = useColorScheme();
  const router = useRouter();

  if (!appIsReady) {
    return null;
  }

  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  return (
    <View style={{ flex: 1, backgroundColor }} onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ErrorBoundary>
          <Stack screenOptions={{ animation: 'fade' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{
                presentation: 'modal',
                title: 'Kierunki Studiów',
                headerRight: () => (
                  <Pressable
                    onPress={() => router.back()}
                    accessibilityRole="button"
                    accessibilityLabel="Zamknij">
                    <IconSymbol
                      name="xmark"
                      size={28}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ opacity: 0.7, padding: 8 }}
                    />
                  </Pressable>
                ),
              }}
            />
          </Stack>
        </ErrorBoundary>
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}