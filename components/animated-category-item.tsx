import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withTiming, Easing } from 'react-native-reanimated';

interface AnimatedCategoryItemProps {
  children: React.ReactNode;
  index: number;
}

export function AnimatedCategoryItem({ children, index }: AnimatedCategoryItemProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(index * 100, withTiming(1, { duration: 500, easing: Easing.out(Easing.ease) }));
    translateY.value = withDelay(index * 100, withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }));
  }, [opacity, translateY, index]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '45%',
  },
});
