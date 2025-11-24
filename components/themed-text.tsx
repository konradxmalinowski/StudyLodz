import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Flatten any array styles to a single object to avoid passing arrays to the DOM
  const baseStyles = [] as any[];
  baseStyles.push({ color });
  if (type === 'default') baseStyles.push(styles.default);
  if (type === 'title') baseStyles.push(styles.title);
  if (type === 'defaultSemiBold') baseStyles.push(styles.defaultSemiBold);
  if (type === 'subtitle') baseStyles.push(styles.subtitle);
  if (type === 'link') baseStyles.push(styles.link);

  const flattened = StyleSheet.flatten([baseStyles, style]);

  return <Text style={flattened} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
