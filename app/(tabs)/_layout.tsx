import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { HapticTab } from '@/components/haptic-tab';
import { ThemeToggle } from '@/components/theme-toggle';
import { IconSymbol, IconSymbolProps } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const AnimatedIcon = ({ name, color, focused }: IconSymbolProps & { focused: boolean }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1);
  }, [focused, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconSymbol size={28} name={name} color={color} />
    </Animated.View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <ThemeToggle />
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Główna',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="house.fill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="study"
        options={{
          title: 'Przewodnik',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="book.fill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="lodz"
        options={{
          title: 'O Łodzi',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="building.2.fill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scholarship"
        options={{
          title: 'Stypendium',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="banknote.fill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="costs"
        options={{
          title: 'Koszty',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="creditcard.fill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="discounts"
        options={{
          title: 'Zniżki',
          tabBarIcon: ({ color, focused }) => <AnimatedIcon name="tag.fill" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
