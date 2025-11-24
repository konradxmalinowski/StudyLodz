import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '../themed-text';

export function ListItem({ children }: PropsWithChildren) {
  return (
    <View style={styles.listItem}>
      <ThemedText>•</ThemedText>
      <ThemedText style={styles.listItemText}>{children}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  listItemText: {
    flex: 1,
  },
});