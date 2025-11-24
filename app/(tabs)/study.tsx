import { AnimatedCard } from '@/components/animated-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { UNIVERSITIES } from '@/constants/universities';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, LayoutAnimation, UIManager, Platform, Pressable, TextInput } from 'react-native';
import * as Haptics from 'expo-haptics';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function StudyScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const borderColor = colorScheme === 'dark' ? '#444' : '#ccc';

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
  }

  const handlePress = (university: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: '/modal', params: { university: university.title } });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AnimatedCard delay={200} style={styles.cardContainer}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Główne uczelnie w Łodzi
            </ThemedText>
            <ThemedText style={styles.paragraph}>
              Łódź to jeden z najważniejszych ośrodków akademickich w kraju, goszczący 19 uczelni i ponad 75 tysięcy
              studentów.
            </ThemedText>
            <TextInput
              style={[styles.searchBar, { color: textColor, borderColor: borderColor }]}
              placeholder="Szukaj uczelni..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
            />
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
            <View style={styles.universityList}>
              {filteredUniversities.map((uni) => (
                <Pressable key={uni.title} onPress={() => handlePress(uni)}>
                  <ThemedView style={styles.universityCard} lightColor="#f9f9f9" darkColor="#1c1c1e">
                    <View style={styles.universityInfo}>
                      <ThemedText type="defaultSemiBold">{uni.title}</ThemedText>
                      <ThemedText style={{ opacity: 0.8 }}>{uni.content}</ThemedText>
                    </View>
                    <IconSymbol name="chevron.right" size={24} color={tintColor} />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 24,
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
  universityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 20,
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 16,
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