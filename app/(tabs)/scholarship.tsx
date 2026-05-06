
import { AnimatedCard } from '@/components/animated-card';
import { ContentContainer } from '@/components/content-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCHOLARSHIPS = [
  {
    title: 'Stypendium rektora',
    description: 'Dla studentów z wysoką średnią ocen, osiągnięciami naukowymi, artystycznymi lub sportowymi. Zwykle przyznawane na rok akademicki.',
    icon: 'school-outline',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-rektora',
    amount: '600–1200 PLN/mies.',
  },
  {
    title: 'Stypendium socjalne',
    description: 'Dla studentów w trudnej sytuacji materialnej. Wysokość zależy od dochodu na osobę w rodzinie.',
    icon: 'cash-multiple',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-socjalne',
    amount: '400–1200 PLN/mies.',
  },
  {
    title: 'Stypendium dla osób z niepełnosprawnościami',
    description: 'Specjalne wsparcie dla studentów z orzeczeniem o niepełnosprawności.',
    icon: 'wheelchair-accessibility',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-dla-osob-z-niepelnosprawnosciami',
    amount: '200–500 PLN/mies.',
  },
  {
    title: 'Stypendium ministra',
    description: 'Za wybitne osiągnięcia naukowe, artystyczne lub sportowe. Przyznawane przez Ministra Edukacji i Nauki.',
    icon: 'trophy-award',
    url: 'https://www.gov.pl/web/edukacja-i-nauka/stypendium-ministra-za-wybitne-osiagniecia',
    amount: '~4000 PLN jednorazowo',
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
  const iconColor = colorScheme === 'dark' ? Colors.dark.icon : Colors.light.icon;
  const { isTablet } = useResponsive();

  const openLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(url).catch(() => {});
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ContentContainer>
          <AnimatedCard delay={0}>
            <ThemedView style={styles.header}>
              <ThemedText type="title">Stypendia i życie studenckie</ThemedText>
              <ThemedText type="subtitleParagraph">
                Studiowanie to nie tylko nauka! Zobacz, jakie wsparcie finansowe możesz uzyskać i jak wygląda życie studenckie w Łodzi.
              </ThemedText>
            </ThemedView>
          </AnimatedCard>

          <AnimatedCard delay={100}>
            <ThemedView style={styles.sectionContainer}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Dostępne stypendia</ThemedText>
              <View style={isTablet ? styles.gridTablet : styles.grid}>
                {SCHOLARSHIPS.map((item) => (
                  <Pressable
                    key={item.title}
                    onPress={() => item.url && openLink(item.url)}
                    style={({ pressed }) => [isTablet && styles.gridItemTablet, pressed && { opacity: 0.75 }]}
                  >
                    <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
                      <MaterialCommunityIcons name={item.icon as any} size={26} color={tintColor} />
                      <View style={styles.cardContent}>
                        <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                        <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
                        {item.amount && (
                          <View style={[styles.amountBadge, { backgroundColor: tintColor + '1A' }]}>
                            <ThemedText style={[styles.amount, { color: tintColor }]}>{item.amount}</ThemedText>
                          </View>
                        )}
                      </View>
                      {item.url && <MaterialCommunityIcons name="chevron-right" size={22} color={iconColor} />}
                    </ThemedView>
                  </Pressable>
                ))}
              </View>
            </ThemedView>
          </AnimatedCard>

          <AnimatedCard delay={200}>
            <ThemedView style={styles.sectionContainer}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Nie samą nauką student żyje</ThemedText>
              <View style={styles.grid}>
                {STUDENT_LIFE.map((item) => (
                  <ThemedView key={item.title} style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
                    <MaterialCommunityIcons name={item.icon as any} size={26} color={tintColor} />
                    <View style={styles.cardContent}>
                      <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                      <ThemedText style={styles.cardDescription}>{item.description}</ThemedText>
                    </View>
                  </ThemedView>
                ))}
              </View>
            </ThemedView>
          </AnimatedCard>
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  header: {
    gap: 8,
  },
  sectionContainer: {
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  grid: {
    gap: 10,
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItemTablet: {
    flexBasis: '48%',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
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
    lineHeight: 19,
  },
  amountBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 4,
  },
  amount: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
