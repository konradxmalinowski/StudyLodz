import React, { useEffect } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { ThemedView } from './themed-view';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

export function AnimatedCard({
  children,
  delay = 0,
  style,
  onPress,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  onPress?: () => void;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
  }, [opacity, translateY, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        if (onPress) {
          scale.value = withSpring(0.98);
        }
      }}
      onPressOut={() => {
        if (onPress) {
          scale.value = withSpring(1);
        }
      }}>
      <AnimatedThemedView style={[styles.animatedCardContainer, style, animatedStyle]}>
        {children}
      </AnimatedThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  animatedCardContainer: {
    padding: 16,
    borderRadius: 8,
  },
});
