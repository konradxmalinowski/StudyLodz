import { CONTENT_MAX_WIDTH, useResponsive } from '@/hooks/use-responsive';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface ContentContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ContentContainer({ children, style }: ContentContainerProps) {
  const { isTablet, padding } = useResponsive();
  return (
    <View
      style={[
        styles.base,
        { paddingHorizontal: padding, paddingVertical: 24 },
        isTablet && styles.centered,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    gap: 24,
    width: '100%',
  },
  centered: {
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
});
