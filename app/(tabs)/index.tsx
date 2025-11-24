import { Image, Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AnimatedCard } from '@/components/animated-card';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

const SECTIONS = [
  {
    title: 'Przewodnik po studiach',
    description: 'Odkryj, dlaczego Łódź to idealne miejsce do nauki, życia i rozwoju. Przejdź do przewodnika, aby dowiedzieć się więcej.',
    link: '/study',
    buttonText: 'Otwórz przewodnik',
    icon: 'book.fill',
  },
  {
    title: 'Odkryj Łódź',
    description: 'Poznaj historię, kulturę i najciekawsze miejsca w Łodzi. Zobacz, co sprawia, że to miasto jest wyjątkowe.',
    link: '/lodz',
    buttonText: 'Poznaj miasto',
    icon: 'building.2.fill',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const imageOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const router = useRouter();

  useEffect(() => {
    imageOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
    titleTranslateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease), delay: 200 });
  }, []);

  const handlePress = (href: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(href);
  }

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: titleTranslateY.value }],
      opacity: interpolate(titleTranslateY.value, [20, 0], [0, 1])
    }
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

        {SECTIONS.map((section, index) => (
          <AnimatedCard key={section.title} delay={(index + 1) * 100}>
            <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
              <View style={styles.cardHeader}>
                <IconSymbol name={section.icon as any} size={32} color={tintColor} />
                <ThemedText type="subtitle" style={{ flexShrink: 1, fontSize: 22 }}>{section.title}</ThemedText>
              </View>
              <ThemedText style={styles.cardText}>{section.description}</ThemedText>
              <Pressable onPress={() => handlePress(section.link)} style={styles.link}>
                <ThemedView style={[styles.cta, { backgroundColor: tintColor }]} lightColor="#4E56C0" darkColor="#4E56C0">
                  <ThemedText style={styles.ctaText}>{section.buttonText}</ThemedText>
                  <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                </ThemedView>
              </Pressable>
            </ThemedView>
          </AnimatedCard>
        ))}
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
  link: {
    marginTop: 16,
    padding: 10,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    padding: 30,
    wordWrap: 'break-word',
    borderRadius: 20,
    gap: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 400,
    maxWidth: '98%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardText: {
    opacity: 0.85,
    lineHeight: 24,
    fontSize: 16,
  },
});
