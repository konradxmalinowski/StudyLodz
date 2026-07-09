import { AnimatedCard } from '@/components/animated-card';
import { ContentContainer } from '@/components/content-container';
import { ReadMore } from '@/components/read-more';
import { StudyMap } from '@/components/study-map';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useResponsive } from '@/hooks/use-responsive';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { Easing, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const TIDBITS = [
  {
    icon: 'figure.walk',
    title: 'Ulica Piotrkowska',
    description:
      'Najdłuższy deptak w Europie z dziesiątkami kawiarni, restauracji i zjawiskowymi muralami.',
  },
  {
    icon: 'bolt.fill',
    title: 'EC1 Łódź',
    description:
      'Dawna elektrownia przekształcona w interaktywne centrum nauki i sztuki – idealne na weekend.',
  },
  {
    icon: 'bag.fill',
    title: 'Manufaktura',
    description:
      'Tętniące życiem centrum handlowo-rozrywkowe w odrestaurowanych fabrykach z XIX wieku.',
  },
  {
    icon: 'theatermasks.fill',
    title: 'Scena artystyczna',
    description:
      'Nowoczesne galerie, Teatr Wielki i kina studyjne z ambitnym repertuarem dla koneserów.',
  },
];

const BENEFITS = [
  {
    icon: 'banknote.fill',
    title: 'Koszty życia',
    description:
      'Przystępniejsze niż w Warszawie — tańsze mieszkania, jedzenie i życie studenckie.',
    lightColor: '#f9f9f9',
    darkColor: '#1c1c1e',
  },
  {
    icon: 'theatermasks.fill',
    title: 'Kultura i wydarzenia',
    description:
      'Festiwale filmowe (ŁFF), galerie, koncerty i alternatywne kluby — nigdy nie jest nudno.',
    lightColor: '#f9f9f9',
    darkColor: '#1c1c1e',
  },
  {
    icon: 'person.3.fill',
    title: 'Społeczność',
    description:
      'Dużo organizacji studenckich, hackathony, inicjatywy społeczne i coworkingi.',
    lightColor: '#f9f9f9',
    darkColor: '#1c1c1e',
  },
  {
    icon: 'briefcase.fill',
    title: 'Droga do pracy',
    description:
      'Bliskość firm technologicznych, szansy na staże i współprace z lokalnym biznesem.',
    lightColor: '#f9f9f9',
    darkColor: '#1c1c1e',
  },
];

const NEIGHBORHOODS = [
  {
    icon: 'building.2.crop.circle',
    title: 'Śródmieście',
    description: 'Centrum miasta, blisko do wielu wydziałów UŁ i PŁ, tętniące życiem kulturalnym. Wyższe ceny najmu.',
  },
  {
    icon: 'tree.circle',
    title: 'Retkinia / Karolew',
    description: 'Dobrze skomunikowane z centrum, dużo zieleni i parków. Spokojniejsza okolica z przystępnymi cenami.',
  },
  {
    icon: 'graduationcap.circle',
    title: 'Widzew (kampus UŁ)',
    description: 'Idealne dla studentów Uniwersytetu Łódzkiego. Bliskość wydziałów, biblioteki i akademików.',
  },
  {
    icon: 'tram.circle',
    title: 'Radogoszcz (Bałuty)',
    description: 'Spokojna i zielona część miasta z niższymi cenami najmu, ale z dłuższym dojazdem do centrum.',
  },
];

const SECTIONS = [
    {
      title: 'UNESCO Miasto Filmu',
      image: require('@/assets/images/lodz1_png.png'),
      imageName: 'lodz1.png',
      content: 'Znana na świecie dzięki prestiżowej Szkole Filmowej, która wykształciła laureatów Oscara, takich jak Roman Polański i Andrzej Wajda.',
    },
    {
      title: 'Akademickie Serce Polski',
      image: require('@/assets/images/lodz2_png.png'),
      imageName: 'lodz2.png',
      content: 'Łódź to jeden z najważniejszych ośrodków akademickich w kraju, oferujący szeroki wachlarz możliwości edukacyjnych.',
    },
    {
      title: 'Praca i Rozwój Kariery: Łódź jako Biznesowy Hub',
      image: require('@/assets/images/lodz3_png.png'),
      imageName: 'lodz3.png',
      content: 'Prawie 100 centrów SSC i dynamiczny rozwój sektorów IT, logistyki oraz obsługi klienta (BPO/IT) czynią Łódź atrakcyjnym rynkiem pracy.',
    },
    {
      title: 'Manufaktura – Serce Rozrywki i Rekreacji',
      image: require('@/assets/images/lodz1_jpg.jpg'),
      imageName: 'lodz1.jpg',
      content: 'Dawne fabryki Izraela Poznańskiego zostały przekształcone w tętniące życiem centrum handlowo-kulturalne, oferujące zakupy, rozrywkę i gastronomię.',
    },
  ];

export default function LodzScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const { isTablet, padding } = useResponsive();
  const imageOpacity = useSharedValue(0);
  const router = useRouter();

  useEffect(() => {
    imageOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
  }, [imageOpacity]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.gallery, { paddingHorizontal: padding }]}>
          {(['lodz1.jpg', 'lodz2.jpg', 'lodz3.png', 'lodz4.png', 'lodz5.png'] as const).map((name, index) => (
            <Pressable
              key={name}
              onPress={() => router.push({ pathname: '/modal', params: { image: name } })}
              accessibilityRole="imagebutton"
              accessibilityLabel={`Zdjęcie Łodzi ${index + 1} z 5, dotknij aby powiększyć`}>
              <AnimatedImage
                source={
                  name === 'lodz1.jpg' ? require('@/assets/images/lodz1_jpg.jpg') :
                  name === 'lodz2.jpg' ? require('@/assets/images/lodz2_jpg.jpg') :
                  name === 'lodz3.png' ? require('@/assets/images/lodz3_png.png') :
                  name === 'lodz4.png' ? require('@/assets/images/lodz4_png.png') :
                  require('@/assets/images/lodz5.png')
                }
                style={[styles.image, isTablet && styles.imageTablet, { opacity: imageOpacity }]}
              />
            </Pressable>
          ))}
        </ScrollView>
        <ContentContainer>

        <AnimatedCard>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Dlaczego Łódź?
            </ThemedText>
            <ReadMore>
              Łódź, miasto o bogatej historii przemysłowej, przekształciło się w tętniące życiem centrum akademickie i
              kulturowe. To tutaj historia spotyka się z nowoczesnością, a postindustrialne przestrzenie zyskują nowe
              życie jako centra sztuki, nauki i biznesu. Studiowanie w Łodzi to nie tylko nauka, ale także możliwość
              bycia częścią tej dynamicznej transformacji.
            </ReadMore>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={100}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Życie studenckie
            </ThemedText>
            <ReadMore>
              Łódź oferuje idealne warunki do życia studenckiego. Przystępne koszty utrzymania, bogata oferta kulturalna
              oraz liczne organizacje studenckie sprawiają, że każdy znajdzie tu coś dla siebie.
            </ReadMore>
            <View style={styles.grid}>
              {BENEFITS.map((card) => (
                <ThemedView
                  key={card.title}
                  style={[styles.card, isTablet && styles.cardTablet]}
                  lightColor={card.lightColor}
                  darkColor={card.darkColor}>
                  <View style={styles.cardHeader}>
                    <IconSymbol name={card.icon as any} size={28} color={tintColor} />
                    <ThemedText type="subtitle" style={{ flexShrink: 1 }}>{card.title}</ThemedText>
                  </View>
                  <ThemedText style={styles.cardText}>{card.description}</ThemedText>
                </ThemedView>
              ))}
            </View>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.appleTitle}>
                Odkryj miasto
                </ThemedText>
                <View style={styles.grid}>
                {TIDBITS.map((tidbit, index) => (
                    <ThemedView key={tidbit.title} style={[styles.tidbitCard, isTablet && styles.cardTablet]} lightColor="#f9f9f9" darkColor="#1c1c1e">
                    <ThemedText style={styles.tidbitNumber}>{String(index + 1).padStart(2, '0')}</ThemedText>
                    <ThemedText type="defaultSemiBold" style={styles.tidbitTitle}>{tidbit.title}</ThemedText>
                    <ThemedText style={styles.cardText}>{tidbit.description}</ThemedText>
                    </ThemedView>
                ))}
                </View>
            </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={300}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Kampusy w sercu miasta
            </ThemedText>
            <ReadMore>
              Główne kampusy Uniwersytetu Łódzkiego i Politechniki Łódzkiej znajdują się w centrum miasta, co ułatwia
              dostęp do wszystkich atrakcji.
            </ReadMore>
            <View style={{ paddingTop: 8 }}>
              <StudyMap />
            </View>
          </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={400}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Gdzie zamieszkać?
            </ThemedText>
            <View style={styles.grid}>
              {NEIGHBORHOODS.map((neighborhood) => (
                <ThemedView key={neighborhood.title} style={[styles.card, isTablet && styles.cardTablet]} lightColor="#f9f9f9" darkColor="#1c1c1e">
                  <View style={styles.cardHeader}>
                    <IconSymbol name={neighborhood.icon as any} size={24} color={tintColor} />
                    <ThemedText type="defaultSemiBold" style={{ flexShrink: 1 }}>{neighborhood.title}</ThemedText>
                  </View>
                  <ThemedText style={styles.cardText}>{neighborhood.description}</ThemedText>
                </ThemedView>
              ))}
            </View>
          </ThemedView>
        </AnimatedCard>

        {SECTIONS.map((section, index) => (
          <AnimatedCard key={section.title} delay={400 + index * 100}>
            <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
              <View style={styles.cardHeader}>
                <Pressable
                  onPress={() => router.push({ pathname: '/modal', params: { image: section.imageName } })}
                  accessibilityRole="imagebutton"
                  accessibilityLabel={`Zdjęcie: ${section.title}, dotknij aby powiększyć`}>
                  <Image source={section.image} style={styles.cardImage} />
                </Pressable>
                <ThemedText type="subtitle" style={{ flexShrink: 1 }}>{section.title}</ThemedText>
              </View>
              <ReadMore>{section.content}</ReadMore>
            </ThemedView>
          </AnimatedCard>
        ))}
        </ContentContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    scroll: {
      flexGrow: 1,
    },
    gallery: {
      gap: 16,
      marginBottom: 24,
    },
    image: {
      width: 200,
      height: 300,
      borderRadius: 20,
    },
    imageTablet: {
      width: 280,
      height: 400,
    },
    section: {
      gap: 16,
      padding: 4,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      justifyContent: 'center',
      paddingTop: 8,
    },
    card: {
      padding: 20,
      borderRadius: 16,
      gap: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      flex: 1,
      minWidth: 260,
    },
    cardTablet: {
      flexBasis: '48%',
      flex: 0,
      minWidth: 0,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingBottom: 4,
    },
    cardText: {
      opacity: 0.85,
      lineHeight: 20,
    },
    appleTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 4,
      paddingBottom: 4,
    },
    cardImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
    },
    tidbitCard: {
      padding: 20,
      borderRadius: 16,
      gap: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
      flex: 1,
      minWidth: 260,
    },
    tidbitNumber: {
      fontSize: 28,
      fontWeight: '800',
      opacity: 0.1,
      lineHeight: 32,
    },
    tidbitTitle: {
      marginTop: -4,
    },
  });