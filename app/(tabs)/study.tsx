import { AnimatedCard } from '@/components/animated-card';
import { ContentContainer } from '@/components/content-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { University, UNIVERSITIES } from '@/constants/universities';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, LayoutAnimation, Pressable, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function StudyScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const borderColor = colorScheme === 'dark' ? '#444' : '#ccc';
  const { isTablet } = useResponsive();

  const [showPublic, setShowPublic] = useState(true);
  const [showArtistic, setShowArtistic] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const filteredUniversities = UNIVERSITIES.filter((uni) => {
    const matchesType = (showPublic && uni.type === 'publiczna') || (showArtistic && uni.type === 'artystyczna');
    const matchesSearch = uni.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [showPublic, showArtistic, searchQuery]);

  const handleCheckboxChange = (setter: (value: boolean) => void, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  const handlePress = (university: University) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: '/modal', params: { university: university.title } });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ContentContainer>
        <AnimatedCard delay={0}>
          <ThemedView style={styles.screenHeader}>
            <ThemedText type="title">Uczelnie w Łodzi</ThemedText>
            <ThemedText type="subtitleParagraph">
              19 uczelni, ponad 75 tysięcy studentów — znajdź kierunek i miejsce dla siebie.
            </ThemedText>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={200} style={styles.cardContainer}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Główne uczelnie w Łodzi
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              Łódź to jeden z najważniejszych ośrodków akademickich w kraju, goszczący 19 uczelni i ponad 75 tysięcy
              studentów.
            </ThemedText>
            <View style={[styles.searchWrapper, { borderColor: borderColor, backgroundColor: colorScheme === 'dark' ? '#2c2c2e' : '#f2f2f7' }]}>
              <IconSymbol name="magnifyingglass" size={16} color={colorScheme === 'dark' ? '#666' : '#999'} />
              <TextInput
                style={[styles.searchBar, { color: textColor }]}
                placeholder="Szukaj uczelni..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={colorScheme === 'dark' ? '#666' : '#999'}
              />
            </View>
            <View style={styles.filterContainer}>
              <View style={styles.switchContainer}>
                <ThemedText>Publiczne</ThemedText>
                <CustomCheckbox value={showPublic} onValueChange={(value) => handleCheckboxChange(setShowPublic, value)} />
              </View>
              <View style={styles.switchContainer}>
                <ThemedText>Artystyczne</ThemedText>
                <CustomCheckbox value={showArtistic} onValueChange={(value) => handleCheckboxChange(setShowArtistic, value)} />
              </View>
            </View>
            <View style={[styles.universityList, isTablet && styles.universityListTablet]}>
              {filteredUniversities.map((uni) => (
                <Pressable key={uni.title} onPress={() => handlePress(uni)} style={isTablet && styles.universityCardTablet}>
                  <ThemedView style={styles.universityCard} lightColor="#f9f9f9" darkColor="#1c1c1e">
                    <View style={styles.universityInfo}>
                      <View style={styles.universityTitleRow}>
                        <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>{uni.title}</ThemedText>
                        <View style={[styles.typeBadge, { backgroundColor: uni.type === 'artystyczna' ? '#FF6B6B22' : tintColor + '1A' }]}>
                          <Text style={[styles.typeBadgeText, { color: uni.type === 'artystyczna' ? '#E05050' : tintColor }]}>
                            {uni.type === 'artystyczna' ? 'Artystyczna' : 'Publiczna'}
                          </Text>
                        </View>
                      </View>
                      <ThemedText style={{ opacity: 0.7, fontSize: 14 }}>{uni.content}</ThemedText>
                    </View>
                    <IconSymbol name="chevron.right" size={20} color={colorScheme === 'dark' ? '#555' : '#ccc'} />
                  </ThemedView>
                </Pressable>
              ))}
            </View>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={500} style={styles.cardContainer}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Twoja przyszłość w Łodzi
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              Studiowanie w Łodzi to inwestycja w przyszłość. Miasto oferuje szerokie możliwości rozwoju zawodowego, a
              bliskość firm technologicznych i startupów stwarza idealne warunki do rozpoczęcia kariery.
            </ThemedText>
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
  screenHeader: {
    gap: 8,
  },
  cardContainer: {
    marginBottom: 20,
  },
  section: {
    gap: 16,
    padding: 4,
  },
  paragraph: {
    lineHeight: 22,
    paddingTop: 4,
  },
  appleTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingBottom: 4,
  },
  universityList: {
    gap: 16,
    paddingTop: 8,
  },
  universityListTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  universityCardTablet: {
    flexBasis: '48%',
  },
  universityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  universityInfo: {
    flex: 1,
    gap: 4,
    paddingRight: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 16,
    borderWidth: 1,
  },
  searchBar: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  universityTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
