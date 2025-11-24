import { AnimatedCard } from '@/components/animated-card';
import { ReadMore } from '@/components/read-more';
import { StudyMap } from '@/components/study-map';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
  const imageOpacity = useSharedValue(0);
  const router = useRouter();

  React.useEffect(() => {
    imageOpacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gallery}>
          <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: 'lodz1.jpg' } })}>
            <AnimatedImage source={require('@/assets/images/lodz1_jpg.jpg')} style={[styles.image, { opacity: imageOpacity }]} />
          </Pressable>
          <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: 'lodz2.jpg' } })}>
            <AnimatedImage source={require('@/assets/images/lodz2_jpg.jpg')} style={[styles.image, { opacity: imageOpacity }]} />
          </Pressable>
          <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: 'lodz3.png' } })}>
            <AnimatedImage source={require('@/assets/images/lodz3_png.png')} style={[styles.image, { opacity: imageOpacity }]} />
          </Pressable>
          <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: 'lodz4.png' } })}>
            <AnimatedImage source={require('@/assets/images/lodz4_png.png')} style={[styles.image, { opacity: imageOpacity }]} />
          </Pressable>
          <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: 'lodz5.png' } })}>
            <AnimatedImage source={require('@/assets/images/lodz5.png')} style={[styles.image, { opacity: imageOpacity }]} />
          </Pressable>
        </ScrollView>

        <AnimatedCard style={styles.cardContainer}>
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

        <AnimatedCard delay={100} style={styles.cardContainer}>
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
                  style={styles.card}
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

        <AnimatedCard delay={200} style={styles.cardContainer}>
            <ThemedView style={styles.section}>
                <ThemedText type="subtitle" style={styles.appleTitle}>
                Odkryj miasto
                </ThemedText>
                <View style={styles.grid}>
                {TIDBITS.map((tidbit) => (
                    <ThemedView key={tidbit.title} style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
                    <View style={styles.cardHeader}>
                        <IconSymbol name={tidbit.icon as any} size={24} color={tintColor} />
                        <ThemedText type="defaultSemiBold" style={{ flexShrink: 1 }}>{tidbit.title}</ThemedText>
                    </View>
                    <ThemedText style={styles.cardText}>{tidbit.description}</ThemedText>
                    </ThemedView>
                ))}
                </View>
            </ThemedView>
        </AnimatedCard>

        <AnimatedCard delay={300} style={styles.cardContainer}>
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

        <AnimatedCard delay={400} style={styles.cardContainer}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.appleTitle}>
              Gdzie zamieszkać?
            </ThemedText>
            <View style={styles.grid}>
              {NEIGHBORHOODS.map((neighborhood) => (
                <ThemedView key={neighborhood.title} style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
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
          <AnimatedCard key={index} delay={400 + index * 100}>
            <ThemedView style={styles.card} lightColor="#f9f9f9" darkColor="#1c1c1e">
              <View style={styles.cardHeader}>
                <Pressable onPress={() => router.push({ pathname: '/modal', params: { image: section.imageName } })}>
                  <Image source={section.image} style={styles.cardImage} />
                </Pressable>
                <ThemedText type="subtitle" style={{ flexShrink: 1 }}>{section.title}</ThemedText>
              </View>
              <ReadMore>{section.content}</ReadMore>
            </ThemedView>
          </AnimatedCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
      gap: 24,
    },
    gallery: {
      paddingHorizontal: 24,
      gap: 16,
      marginBottom: 24,
    },
    image: {
      width: 200,
      height: 300,
      borderRadius: 20,
    },
    cardContainer: {
      paddingHorizontal: 24,
      marginBottom: 20,
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
      borderRadius: 20,
      gap: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      flex: 1,
      minWidth: 280,
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
  });