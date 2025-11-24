import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function CityHero() {
  return (
    <ThemedView style={styles.heroContainer} lightColor="#A1CEDC" darkColor="#1D3D47">
      <View style={styles.artWrap}>
        <Image
          source={require('@/assets/images/image.jpg')}
          style={styles.skyline}
          resizeMode="cover"
        />
      </View>
      <ThemedText type="title" style={styles.title}>
        Studiuj w Łodzi
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Miasto z duszą przemysłowej przeszłości i pulsującą sceną kreatywną
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    gap: 8,
  },
  artWrap: {
    width: '100%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skyline: {
    width: '95%',
    height: '100%',
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.95,
  },
});
