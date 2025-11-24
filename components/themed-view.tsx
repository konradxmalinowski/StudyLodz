import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...rest }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // Ensure we pass a single flattened style object to the underlying View
  const flattened = StyleSheet.flatten(style);
  const merged = StyleSheet.flatten([{ backgroundColor }, flattened]);

  // If transform is an array (common in RN), convert to a CSS transform string for web
  // so that react-dom doesn't try to set an indexed property on CSSStyleDeclaration.
  if (merged && Array.isArray(merged.transform)) {
    try {
      const parts: string[] = [];
      for (const t of merged.transform) {
        const key = Object.keys(t)[0];
        const value = (t as any)[key];
        if (key === 'rotate') {
          parts.push(`rotate(${value})`);
        } else if (key === 'translateX') {
          parts.push(`translateX(${typeof value === 'number' ? value + 'px' : value})`);
        } else if (key === 'translateY') {
          parts.push(`translateY(${typeof value === 'number' ? value + 'px' : value})`);
        } else if (key === 'translate') {
          const [x, y] = Array.isArray(value) ? value : [value, 0];
          parts.push(`translate(${typeof x === 'number' ? x + 'px' : x}, ${typeof y === 'number' ? y + 'px' : y})`);
        } else if (key === 'scale') {
          parts.push(`scale(${value})`);
        } else {
          // fallback: try to stringify
          parts.push(`${key}(${value})`);
        }
      }

      merged.transform = parts.join(' ');
    } catch {
      // if anything goes wrong, silently ignore and keep merged.transform as-is
    }
  }

  return <View style={merged} {...rest} />;
}
