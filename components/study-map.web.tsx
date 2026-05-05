import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { StyleSheet } from 'react-native';

export function StudyMap() {
  return (
    <ThemedView style={styles.container} lightColor="#f0f0f0" darkColor="#2c2c2e">
      <ThemedText style={styles.text}>
        Mapa dostępna tylko w aplikacji mobilnej.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  text: {
    opacity: 0.6,
    fontSize: 14,
  },
});
