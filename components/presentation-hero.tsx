import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export function PresentationHero({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.outer}>
      <ImageBackground
        source={require('@/assets/images/image2.jpg')}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover">
        <ThemedView style={styles.overlay} lightColor="rgba(0,0,0,0.35)" darkColor="rgba(0,0,0,0.5)">
          <ThemedText type="title" style={styles.title}>
            Chcesz więcej?
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Zobacz przykładowe kierunki i oferty
          </ThemedText>

          <ThemedView style={styles.cta}>
            <ThemedText style={styles.ctaText}>Odkryj więcej →</ThemedText>
          </ThemedView>
        </ThemedView>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    marginTop: 6,
    marginBottom: 12,
    textAlign: 'center',
  },
  cta: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  ctaText: {
    color: '#0a7ea4',
    fontWeight: '700',
  },
});
