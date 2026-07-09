import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedText } from './themed-text';

const PREVIEW_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H" crossorigin="anonymous"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH" crossorigin="anonymous"></script>
  <style>
    body{margin:0;padding:0}
    #map{width:100%;height:100vh}
    .pin{width:32px;height:32px;background:#0a7ea4;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,.3);font-size:16px;text-align:center;line-height:32px}
  </style>
</head>
<body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:false,dragging:false,touchZoom:false,scrollWheelZoom:false,doubleClickZoom:false,boxZoom:false,keyboard:false}).setView([51.761,19.465],13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains:'abcd',
    maxZoom:19
  }).addTo(map);
  function mk(){return L.divIcon({html:'<div class="pin">🎓</div>',className:'',iconSize:[32,32],iconAnchor:[16,16]})}
  L.marker([51.749,19.455],{icon:mk()}).addTo(map);
  L.marker([51.773,19.468],{icon:mk()}).addTo(map);
  L.marker([51.762,19.453],{icon:mk()}).addTo(map);
  L.marker([51.775,19.472],{icon:mk()}).addTo(map);
  L.marker([51.769,19.464],{icon:mk()}).addTo(map);
  L.marker([51.758,19.480],{icon:mk()}).addTo(map);
</script>
</body>
</html>`;

export function StudyMap() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <WebView
          source={{ html: PREVIEW_HTML }}
          style={styles.map}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Pressable
        style={styles.overlay}
        onPress={() => router.push({ pathname: '/modal', params: { map: 'campuses' } })}
        accessibilityRole="button"
        accessibilityLabel="Otwórz interaktywną mapę kampusów"
      >
        <View style={[styles.openButton, { backgroundColor: tintColor }]}>
          <MaterialCommunityIcons name="map-search" size={18} color="#fff" />
          <ThemedText style={styles.openButtonText}>Otwórz mapę</ThemedText>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  map: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 12,
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  openButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
