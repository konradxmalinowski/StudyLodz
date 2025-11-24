import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={(() => {
        const flat = StyleSheet.flatten([
          {
            width: size,
            height: size,
          },
          style,
        ]) as any;

        // Normalize transform arrays into string if present
        if (flat && Array.isArray(flat.transform)) {
          try {
            const parts: string[] = [];
            for (const t of flat.transform) {
              const key = Object.keys(t)[0];
              const value = (t as any)[key];
              if (key === 'rotate') parts.push(`rotate(${value})`);
              else if (key === 'translateX') parts.push(`translateX(${typeof value === 'number' ? value + 'px' : value})`);
              else if (key === 'translateY') parts.push(`translateY(${typeof value === 'number' ? value + 'px' : value})`);
              else if (key === 'scale') parts.push(`scale(${value})`);
              else parts.push(`${key}(${value})`);
            }
            flat.transform = parts.join(' ');
          } catch {
            // noop
          }
        }

        return flat;
      })()}
    />
  );
}
