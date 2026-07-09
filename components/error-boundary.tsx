import { Component, type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            Coś poszło nie tak
          </ThemedText>
          <ThemedText style={styles.message}>
            Wystąpił nieoczekiwany błąd. Spróbuj ponownie — jeśli problem się powtórzy,
            zrestartuj aplikację.
          </ThemedText>
          <Pressable
            onPress={this.reset}
            style={[styles.button, { backgroundColor: Colors.light.tint }]}
            accessibilityRole="button"
            accessibilityLabel="Spróbuj ponownie">
            <ThemedText style={styles.buttonText}>Spróbuj ponownie</ThemedText>
          </Pressable>
        </ThemedView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    opacity: 0.75,
    lineHeight: 22,
    maxWidth: 320,
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});
