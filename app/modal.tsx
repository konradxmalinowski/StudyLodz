import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AnimatedCard } from '@/components/animated-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { UNIVERSITIES } from '@/constants/universities';
import { useColorScheme } from '@/hooks/use-color-scheme';

const IMAGE_SOURCES: { [key: string]: any } = {
  'lodz1.jpg': require('@/assets/images/lodz1_jpg.jpg'),
  'lodz2.jpg': require('@/assets/images/lodz2_jpg.jpg'),
  'lodz3.png': require('@/assets/images/lodz3_png.png'),
  'lodz1.png': require('@/assets/images/lodz1_png.png'),
  'lodz2.png': require('@/assets/images/lodz2_png.png'),
  'lodz4.png': require('@/assets/images/lodz4_png.png'),
  'lodz5.png': require('@/assets/images/lodz5.png'),
};

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const universityName = params.university as string;
  const imageName = params.image as string;
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  if (imageName) {
    const imageSource = IMAGE_SOURCES[imageName];
    return (
      <Pressable style={styles.modalContainer} onPress={() => router.back()}>
        <Image source={imageSource} style={styles.modalImage} />
      </Pressable>
    );
  }

  const university = UNIVERSITIES.find((u) => u.title === universityName);
  const fields = university?.fields || [];

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <IconSymbol name="graduationcap.fill" size={48} color={tintColor} />
          <ThemedText type="title">{universityName}</ThemedText>
          <ThemedText style={styles.subtitle}>Przykładowe kierunki studiów</ThemedText>
        </View>
        {fields.length > 0 ? (
          <View style={styles.listContainer}>
            {fields.map((field, index) => (
              <AnimatedCard key={field.name} delay={index * 100}>
                <ThemedView style={styles.fieldCard} lightColor="#f9f9f9" darkColor="#1c1c1e">
                  <ThemedText type="defaultSemiBold">{field.name}</ThemedText>
                  <ThemedText style={{ opacity: 0.8 }}>{field.description}</ThemedText>
                </ThemedView>
              </AnimatedCard>
            ))}
          </View>
        ) : (
          <ThemedText>Brak danych dla tej uczelni.</ThemedText>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
    paddingBottom: 40,
  },
  header: {
    gap: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
    fontWeight: '600',
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  fieldCard: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
