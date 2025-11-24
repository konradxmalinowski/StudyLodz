
import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useThemeColor } from '@/hooks/use-theme-color';

type ThemedIconProps = {
  xml: string;
  size?: number;
  color?: string;
};

export function ThemedIcon({ xml, size = 24, color }: ThemedIconProps) {
  const defaultColor = useThemeColor({}, 'text');
  const iconColor = color || defaultColor;

  // To change the color of the SVG, we replace the fill attribute.
  // This is a simple approach, might need to be more robust based on SVG structure.
  const coloredXml = xml.replace(/fill="[^"]*"/, `fill="${iconColor}"`);

  return <SvgXml xml={coloredXml} width={size} height={size} />;
}
