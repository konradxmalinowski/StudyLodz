import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { AnimatedCard } from '@/components/animated-card';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useResponsive } from '@/hooks/use-responsive';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter, type Href } from 'expo-router';
import { useEffect } from 'react';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const SECTIONS = [
  {
    title: 'Przewodnik po studiach',
    description: 'Odkryj, dlaczego Łódź to idealne miejsce do nauki, życia i rozwoju. Przejdź do przewodnika, aby dowiedzieć się więcej.',
    link: '/study' as Href,
    buttonText: 'Otwórz przewodnik',
    icon: 'book.fill',
    accentColor: '#4E56C0',
  },
  {
    title: 'Odkryj Łódź',
    description: 'Poznaj historię, kulturę i najciekawsze miejsca w Łodzi. Zobacz, co sprawia, że to miasto jest wyjątkowe.',
    link: '/lodz' as Href,
    buttonText: 'Poznaj miasto',
    icon: 'building.2.fill',
    accentColor: '#2E8B57',
  },
];

export default function HomeScreen() {
  const { isTablet } = useResponsive();
  const imageOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const router = useRouter();

  useEffect(() => {
    imageOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
    titleTranslateY.value = withDelay(200, withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }));
  }, [imageOpacity, titleTranslateY]);

  const handlePress = (href: Href) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(href);
  };

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleTranslateY.value }],
      opacity: interpolate(titleTranslateY.value, [20, 0], [0, 1]),
    };
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <AnimatedImage
          source={require('@/assets/images/image.jpg')}
          style={[styles.headerImage, { opacity: imageOpacity }]}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.contentContainer}>
        <AnimatedCard delay={0}>
          <ThemedView style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <View style={{ flex: 1 }}>
                <AnimatedThemedText type="title" style={titleAnimatedStyle}>Witaj w Łodzi Akademickiej</AnimatedThemedText>
              </View>
              <HelloWave />
            </View>
          </ThemedView>
        </AnimatedCard>

        <View style={isTablet ? styles.sectionsRow : styles.sectionsCol}>
          {SECTIONS.map((section, index) => (
            <AnimatedCard key={section.title} delay={(index + 1) * 100} style={isTablet ? styles.sectionCardTablet : undefined}>
              <ThemedView style={[styles.card, { borderTopColor: section.accentColor }]} lightColor="#f9f9f9" darkColor="#1c1c1e">
                <View style={[styles.iconWrap, { backgroundColor: section.accentColor + '18' }]}>
                  <IconSymbol name={section.icon as any} size={28} color={section.accentColor} />
                </View>
                <ThemedText type="subtitle" style={{ fontSize: 20 }}>{section.title}</ThemedText>
                <ThemedText style={styles.cardText}>{section.description}</ThemedText>
                <Pressable onPress={() => handlePress(section.link)} style={styles.link}>
                  <View style={[styles.cta, { backgroundColor: section.accentColor }]}>
                    <ThemedText style={styles.ctaText}>{section.buttonText}</ThemedText>
                    <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
                  </View>
                </Pressable>
              </ThemedView>
            </AnimatedCard>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contentContainer: {
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  sectionsCol: {
    gap: 16,
  },
  sectionsRow: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  sectionCardTablet: {
    flex: 1,
  },
  link: {
    marginTop: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    flexDirection: 'column',
    flex: 1,
    borderTopWidth: 3,
  },
  cardText: {
    opacity: 0.75,
    lineHeight: 22,
    fontSize: 15,
  },
});
