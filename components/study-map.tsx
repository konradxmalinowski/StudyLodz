import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { ThemedView } from './themed-view';
import { IconSymbol } from './ui/icon-symbol';

const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

function AnimatedMapMarker({
  delay,
  coordinate,
  title,
}: {
  delay: number;
  coordinate: { latitude: number; longitude: number };
  title: string;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withTiming(1));
    opacity.value = withDelay(delay, withTiming(1));
  }, [scale, opacity, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Marker coordinate={coordinate} title={title}>
      <AnimatedThemedView style={[styles.marker, animatedStyle]} lightColor="#fff" darkColor="#1D3D47">
        <IconSymbol name="book.fill" size={20} color="#0a7ea4" />
      </AnimatedThemedView>
    </Marker>
  );
}

export function StudyMap() {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.76,
          longitude: 19.46,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}>
        <AnimatedMapMarker coordinate={{ latitude: 51.749, longitude: 19.455 }} title="Politechnika Łódzka" delay={100} />
        <AnimatedMapMarker coordinate={{ latitude: 51.773, longitude: 19.475 }} title="Uniwersytet Łódzki" delay={200} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});