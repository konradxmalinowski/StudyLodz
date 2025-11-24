import { AnimatedCard } from '@/components/animated-card';
import { AnimatedCategoryItem } from '@/components/animated-category-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

const DISCOUNT_CATEGORIES = [
  { name: 'Transport publiczny', icon: 'bus.fill' },
  { name: 'Kultura i sztuka', icon: 'theatermasks.fill' },
  { name: 'Sport i rekreacja', icon: 'figure.pool.swim' },
  { name: 'Gastronomia', icon: 'fork.knife' },
  { name: 'Edukacja i rozwój', icon: 'book.fill' },
  { name: 'Zdrowie i uroda', icon: 'heart.fill' },
];

export default function DiscountsScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  const openLink = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('https://kartalodzianina.pl/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AnimatedCard>
          <ThemedView style={styles.header}>
            <ThemedText type="title">Zniżki studenckie w Łodzi</ThemedText>
            <ThemedText style={styles.subtitle}>
              Dzięki Karcie Łodzianina i pakietowi &quot;Młodzi w Łodzi&quot; możesz korzystać z wielu atrakcyjnych zniżek w całym mieście.
            </ThemedText>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={100}>
          <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
            <ThemedText type="subtitle">Jak to działa?</ThemedText>
            <ThemedText style={styles.paragraph}>
              Pakiet &quot;Młodzi w Łodzi&quot; jest bezpłatny i przeznaczony dla studentów łódzkich uczelni do 26. roku życia. Aby go aktywować, wystarczy złożyć wniosek online lub w jednym z punktów obsługi i okazać ważną legitymację studencką.
            </ThemedText>
            <Pressable style={[styles.button, { backgroundColor: tintColor }]} onPress={openLink}>
              <MaterialCommunityIcons name="web" size={20} color="#fff" />
              <ThemedText style={styles.buttonText}>Odwiedź stronę Karty Łodzianina</ThemedText>
            </Pressable>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
            <ThemedText type="subtitle">Kategorie zniżek</ThemedText>
            <View style={styles.grid}>
              {DISCOUNT_CATEGORIES.map((category, index) => (
                <AnimatedCategoryItem key={index} index={index}>
                  <View style={styles.categoryItem}>
                    <IconSymbol name={category.icon as any} size={28} color={tintColor} />
                    <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
                  </View>
                </AnimatedCategoryItem>
              ))}
            </View>
          </ThemedView>
        </AnimatedCard>
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
  card: {
    padding: 24,
    borderRadius: 20,
    gap: 16,
  },
  paragraph: {
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: .16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
    marginTop: 8,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 8,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.9,
  },
});
