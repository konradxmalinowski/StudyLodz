import { AnimatedCard } from '@/components/animated-card';
import { ContentContainer } from '@/components/content-container';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { DISCOUNT_CATEGORIES, DISCOUNT_PARTNERS } from '@/constants/discounts';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DiscountsScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const { isTablet, padding, col2Width } = useResponsive();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const openLink = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(url).catch(() => {});
  };

  const toggleCategory = (name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory((prev) => (prev === name ? null : name));
  };

  const visiblePartners = selectedCategory
    ? DISCOUNT_PARTNERS.filter((p) => p.category === selectedCategory)
    : DISCOUNT_PARTNERS;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}><ContentContainer>
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
            <Pressable
              style={[styles.button, { backgroundColor: tintColor }]}
              onPress={() => openLink('https://kartalodzianina.pl/')}
            >
              <MaterialCommunityIcons name="web" size={20} color="#fff" />
              <ThemedText style={styles.buttonText}>Odwiedź stronę Karty Łodzianina</ThemedText>
            </Pressable>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={200}>
          <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
            <ThemedText type="subtitle">Kategorie zniżek</ThemedText>
            <ThemedText style={styles.hint}>Dotknij kategorię, aby filtrować listę.</ThemedText>
            <View style={styles.grid}>
              {DISCOUNT_CATEGORIES.map((category) => {
                const active = selectedCategory === category.name;
                return (
                  <Pressable
                    key={category.name}
                    onPress={() => toggleCategory(category.name)}
                    style={[
                      styles.categoryItem,
                      active && { backgroundColor: tintColor + '22', borderRadius: 12 },
                    ]}
                  >
                    <IconSymbol
                      name={category.icon as any}
                      size={28}
                      color={active ? tintColor : colorScheme === 'dark' ? '#9BA1A6' : '#687076'}
                    />
                    <ThemedText style={[styles.categoryText, active && { color: tintColor, fontWeight: '600' }]}>
                      {category.name}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
            <ThemedText type="subtitle">
              {selectedCategory ?? 'Wszystkie zniżki'}
            </ThemedText>
            <ThemedText style={styles.hint}>
              {visiblePartners.length} {visiblePartners.length === 1 ? 'partner' : 'partnerów'} — dane orientacyjne, zweryfikuj na kartalodzianina.pl
            </ThemedText>
            <View style={isTablet ? styles.partnersGridTablet : undefined}>
            {visiblePartners.map((partner) => (
              <Pressable
                key={partner.name}
                onPress={partner.url ? () => openLink(partner.url!) : undefined}
                style={({ pressed }) => [styles.partnerRow, isTablet && { width: col2Width, borderBottomWidth: 0, borderWidth: StyleSheet.hairlineWidth, borderColor: '#ccc', borderRadius: 8, padding: 8 }, pressed && { opacity: 0.7 }]}
              >
                <View style={styles.partnerContent}>
                  <ThemedText type="defaultSemiBold">{partner.name}</ThemedText>
                  <ThemedText style={styles.discountText}>{partner.discount}</ThemedText>
                  {partner.address && (
                    <ThemedText style={styles.addressText}>{partner.address}</ThemedText>
                  )}
                </View>
                {partner.url && (
                  <MaterialCommunityIcons name="open-in-new" size={18} color={tintColor} />
                )}
              </Pressable>
            ))}
            </View>
          </ThemedView>
        </AnimatedCard>
      </ContentContainer></ScrollView>
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
  hint: {
    fontSize: 13,
    opacity: 0.5,
    marginTop: -8,
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
    fontSize: 16,
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
    padding: 8,
    minWidth: 80,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.9,
  },
  partnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  partnerContent: {
    flex: 1,
    gap: 3,
  },
  discountText: {
    fontSize: 13,
    opacity: 0.75,
    lineHeight: 18,
  },
  addressText: {
    fontSize: 12,
    opacity: 0.5,
  },
  partnersGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
