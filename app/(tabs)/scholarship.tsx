
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Linking, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const SCHOLARSHIPS = [
  {
    title: 'Stypendium rektora',
    description: 'Dla studentów z wysoką średnią ocen, osiągnięciami naukowymi, artystycznymi lub sportowymi. Zwykle przyznawane na rok akademicki.',
    icon: 'school-outline',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-rektora',
  },
  {
    title: 'Stypendium socjalne',
    description: 'Dla studentów w trudnej sytuacji materialnej. Wysokość zależy od dochodu na osobę w rodzinie.',
    icon: 'cash-multiple',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-socjalne',
  },
  {
    title: 'Stypendium dla osób z niepełnosprawnościami',
    description: 'Specjalne wsparcie dla studentów z orzeczeniem o niepełnosprawności.',
    icon: 'wheelchair-accessibility',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-dla-osob-z-niepelnosprawnosciami',
  },
    {
    title: 'Stypendium ministra',
    description: 'Za wybitne osiągnięcia naukowe, artystyczne lub sportowe. Przyznawane przez Ministra Edukacji i Nauki.',
    icon: 'trophy-award',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-ministra-za-wybitne-osiagniecia',
  },
];

const STUDENT_LIFE = [
  {
    title: 'Juwenalia',
    description: 'Coroczne święto studentów, pełne koncertów, imprez i wydarzeń kulturalnych. To najlepszy czas na integrację!',
    icon: 'party-popper',
  },
  {
    title: 'Organizacje studenckie i koła naukowe',
    description: 'Rozwijaj swoje pasje, zdobywaj doświadczenie i poznawaj ludzi o podobnych zainteresowaniach. Od kół filmowych po robotykę - jest w czym wybierać.',
    icon: 'account-group-outline',
  },
  {
    title: 'Kluby studenckie',
    description: 'Łódź tętni życiem nocnym. Wiele klubów oferuje zniżki dla studentów i organizuje imprezy tematyczne.',
    icon: 'music-note-outline',
  },
    {
    title: 'Wydarzenia sportowe',
    description: 'Uniwersytety oferują dostęp do nowoczesnych obiektów sportowych i organizują liczne zawody międzyuczelniane.',
    icon: 'basketball',
  },
];

export default function ScholarshipScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const iconColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const gradientColors: [string, string] = colorScheme === 'dark' ? ['#1c1c1e', '#2c2c2e'] : ['#f9f9f9', '#e9e9e9'];

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Stypendia i życie studenckie</ThemedText>
          <ThemedText style={styles.subtitle}>
            Studiowanie to nie tylko nauka! Zobacz, jakie wsparcie finansowe możesz uzyskać i jak wygląda życie studenckie w Łodzi.
          </ThemedText>
        </View>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Dostępne stypendia</ThemedText>
          {SCHOLARSHIPS.map((item, index) => (
            <Pressable key={index} onPress={() => item.url && openLink(item.url)}>
              <LinearGradient colors={gradientColors} style={styles.card}>
                <MaterialCommunityIcons name={item.icon as any} size={28} color={tintColor} />
                <View style={styles.cardContent}>
                  <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                  <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
                </View>
                {item.url && <MaterialCommunityIcons name="chevron-right" size={24} color={iconColor} />}
              </LinearGradient>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.sectionContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Nie samą nauką student żyje</ThemedText>
          {STUDENT_LIFE.map((item, index) => (
            <LinearGradient key={index} colors={gradientColors} style={styles.card}>
              <MaterialCommunityIcons name={item.icon as any} size={28} color={tintColor} />
              <View style={styles.cardContent}>
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
              </View>
            </LinearGradient>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    lineHeight: 22,
  },
  sectionContainer: {
    gap: 16,
    padding: 20,
    borderRadius: 20,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardDescription: {
    opacity: 0.7,
    fontSize: 14,
    lineHeight: 18,
  },
});
