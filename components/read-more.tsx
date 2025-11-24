import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface ReadMoreProps {
  children: string;
  numberOfLines?: number;
}

export function ReadMore({ children, numberOfLines = 3 }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <ThemedText numberOfLines={isExpanded ? undefined : numberOfLines}>
        {children}
      </ThemedText>
      <Pressable onPress={toggle}>
        <ThemedText style={{ color: tintColor, marginTop: 4 }}>
          {isExpanded ? 'Pokaż mniej' : 'Czytaj więcej'}
        </ThemedText>
      </Pressable>
    </View>
  );
}
