import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { AnimatedCard } from '@/components/animated-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { UNIVERSITIES } from '@/constants/universities';
import { useColorScheme } from '@/hooks/use-color-scheme';

const CAMPUSES_MAP_HTML = `<!DOCTYPE html>
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
  var map=L.map('map').setView([51.761,19.465],13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains:'abcd',
    maxZoom:19
  }).addTo(map);
  function mk(){return L.divIcon({html:'<div class="pin">🎓</div>',className:'',iconSize:[32,32],iconAnchor:[16,16]})}
  L.marker([51.749,19.455],{icon:mk()}).addTo(map).bindPopup('<b>Politechnika Łódzka</b>');
  L.marker([51.773,19.468],{icon:mk()}).addTo(map).bindPopup('<b>Uniwersytet Łódzki</b>');
  L.marker([51.762,19.453],{icon:mk()}).addTo(map).bindPopup('<b>Uniwersytet Medyczny</b>');
  L.marker([51.775,19.472],{icon:mk()}).addTo(map).bindPopup('<b>Akademia Sztuk Pięknych</b>');
  L.marker([51.769,19.464],{icon:mk()}).addTo(map).bindPopup('<b>Akademia Muzyczna</b>');
  L.marker([51.758,19.480],{icon:mk()}).addTo(map).bindPopup('<b>Szkoła Filmowa</b>');
</script>
</body>
</html>`;

const IMAGE_SOURCES: { [key: string]: any } = {
  'lodz1.jpg': require('@/assets/images/lodz1_jpg.jpg'),
  'lodz2.jpg': require('@/assets/images/lodz2_jpg.jpg'),
  'lodz3.png': require('@/assets/images/lodz3_png.jpg'),
  'lodz1.png': require('@/assets/images/lodz1_png.jpg'),
  'lodz2.png': require('@/assets/images/lodz2_png.jpg'),
  'lodz4.png': require('@/assets/images/lodz4_png.jpg'),
  'lodz5.png': require('@/assets/images/lodz5.jpg'),
};

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const universityName = params.university as string;
  const imageName = params.image as string;
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  if (params.map === 'campuses') {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ html: CAMPUSES_MAP_HTML }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }

  if (imageName) {
    const imageSource = IMAGE_SOURCES[imageName];
    if (!imageSource) {
      return (
        <Pressable style={styles.modalContainer} onPress={() => router.back()}>
          <ThemedText style={{ color: '#fff' }}>Nie znaleziono obrazu</ThemedText>
        </Pressable>
      );
    }
    return (
      <Pressable
        style={styles.modalContainer}
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel="Zdjęcie w pełnym rozmiarze, dotknij aby zamknąć">
        <Image source={imageSource} style={styles.modalImage} accessibilityLabel="Zdjęcie Łodzi" />
      </Pressable>
    );
  }

  const university = UNIVERSITIES.find((u) => u.title === universityName);
  const fields = university?.fields || [];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <IconSymbol name="graduationcap.fill" size={48} color={tintColor} />
          <ThemedText type="title">{universityName}</ThemedText>
          <ThemedText style={styles.subtitle}>Przykładowe kierunki studiów</ThemedText>
        </View>
        {fields.length > 0 ? (
          <View style={styles.listContainer}>
            {fields.map((field, index) => (
              <AnimatedCard key={field.name} delay={index * 100}>
                <ThemedView style={styles.fieldCard} lightColor="#f9f9f9" darkColor="#1c1c1e">
                  <ThemedText type="defaultSemiBold">{field.name}</ThemedText>
                  <ThemedText style={{ opacity: 0.8 }}>{field.description}</ThemedText>
                </ThemedView>
              </AnimatedCard>
            ))}
          </View>
        ) : (
          <ThemedText>Brak danych dla tej uczelni.</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
    paddingBottom: 40,
  },
  header: {
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '600',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  fieldCard: {
    padding: 20,
    borderRadius: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    minWidth: 280,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
