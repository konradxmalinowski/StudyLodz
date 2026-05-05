import React, { useCallback, useState } from 'react';
import { NativeSyntheticEvent, Pressable, StyleSheet, TextLayoutEventData, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';

interface ReadMoreProps {
  children: string;
  numberOfLines?: number;
}

export function ReadMore({ children, numberOfLines = 3 }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const handleHiddenLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
    },
    [numberOfLines]
  );

  return (
    <View>
      {/* Hidden full text used only to count actual lines — invisible, non-interactive */}
      <View pointerEvents="none" style={styles.hidden}>
        <ThemedText onTextLayout={handleHiddenLayout}>{children}</ThemedText>
      </View>
      <ThemedText numberOfLines={isExpanded ? undefined : numberOfLines}>
        {children}
      </ThemedText>
      {isTruncated && (
        <Pressable onPress={() => setIsExpanded((v) => !v)}>
          <ThemedText style={{ color: tintColor, marginTop: 4 }}>
            {isExpanded ? 'Pokaż mniej' : 'Czytaj więcej'}
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    right: 0,
  },
});
