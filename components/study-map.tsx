import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const MAP_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    body{margin:0;padding:0}
    #map{width:100%;height:100vh}
    .pin{width:32px;height:32px;background:#0a7ea4;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;box-shadow:0 2px 4px rgba(0,0,0,.3);font-size:16px;text-align:center;line-height:32px}
  </style>
</head>
<body>
<div id="map"></div>
<script>
  var map=L.map('map',{zoomControl:false}).setView([51.761,19.465],13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains:'abcd',
    maxZoom:19
  }).addTo(map);
  function mk(){return L.divIcon({html:'<div class="pin">🎓</div>',className:'',iconSize:[32,32],iconAnchor:[16,16]})}
  L.marker([51.749,19.455],{icon:mk()}).addTo(map).bindPopup('Politechnika Łódzka');
  L.marker([51.773,19.468],{icon:mk()}).addTo(map).bindPopup('Uniwersytet Łódzki');
  L.marker([51.762,19.453],{icon:mk()}).addTo(map).bindPopup('Uniwersytet Medyczny');
  L.marker([51.775,19.472],{icon:mk()}).addTo(map).bindPopup('Akademia Sztuk Pięknych');
  L.marker([51.769,19.464],{icon:mk()}).addTo(map).bindPopup('Akademia Muzyczna');
  L.marker([51.758,19.480],{icon:mk()}).addTo(map).bindPopup('Szkoła Filmowa');
</script>
</body>
</html>`;

export function StudyMap() {
  return (
    <View style={styles.container}>
      <WebView
        source={{ html: MAP_HTML }}
        style={styles.map}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
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
});
