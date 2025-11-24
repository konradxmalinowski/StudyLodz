import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, LayoutAnimation, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, UIManager, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CATEGORIES = [
  {
    name: 'Zakwaterowanie',
    key: 'rent',
    min: 400,
    max: 3500,
    step: 50,
    initialValue: 800,
    description: 'Akademik, stancja lub kawalerka',
    icon: 'home-city-outline',
    color: '#FF6384',
  },
  {
    name: 'Wyżywienie',
    key: 'food',
    min: 400,
    max: 1200,
    step: 50,
    initialValue: 600,
    description: 'Jedzenie na mieście i w domu',
    icon: 'food-apple-outline',
    color: '#36A2EB',
  },
  {
    name: 'Transport',
    key: 'transport',
    min: 0,
    max: 150,
    step: 10,
    initialValue: 70,
    description: 'Bilet miesięczny lub jednorazowe',
    icon: 'bus-outline',
    color: '#FFCE56',
  },
  {
    name: 'Rozrywka i inne',
    key: 'entertainment',
    min: 100,
    max: 800,
    step: 20,
    initialValue: 300,
    description: 'Kino, imprezy, siłownia, etc.',
    icon: 'party-popper',
    color: '#4BC0C0',
  },
];

const initialCosts = CATEGORIES.reduce((acc, category) => {
  acc[category.key] = category.initialValue;
  return acc;
}, {} as { [key: string]: number });

export default function CostsScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const iconColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const gradientColors: [string, string] = colorScheme === 'dark' ? ['#1c1c1e', '#2c2c2e'] : ['#f9f9f9', '#e9e9e9'];

  const [costs, setCosts] = useState(initialCosts);

  const totalCost = Object.values(costs).reduce((acc, value) => acc + value, 0);

  const chartData = CATEGORIES.map(category => ({
    name: category.name,
    population: costs[category.key],
    color: category.color,
    legendFontColor: colorScheme === 'dark' ? '#FFF' : '#000',
    legendFontSize: 12,
  }));

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [costs]);

  const handleValueChange = (key: string, value: number) => {
    setCosts((prevCosts) => ({ ...prevCosts, [key]: value }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const resetCosts = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCosts(initialCosts);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title">Kalkulator kosztów życia</ThemedText>
          <ThemedText style={styles.subtitle}>
            Oszacuj swoje miesięczne wydatki w Łodzi. Poniższe wartości to rozsądne szacunki, które możesz dostosować do swoich potrzeb.
          </ThemedText>
        </View>

        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 64}
          height={220}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: colorScheme === 'dark' ? '#1c1c1e' : '#f9f9f9',
            backgroundGradientTo: colorScheme === 'dark' ? '#2c2c2e' : '#e9e9e9',
            color: (opacity = 1) => colorScheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
            propsForLabels: {
              fontWeight: 'bold',
            },
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />

        {CATEGORIES.map((category) => (
          <ThemedView key={category.key} style={styles.categoryContainer} lightColor="#f9f9f9" darkColor="#1c1c1e">
            <View style={styles.categoryHeader}>
              <View style={styles.categoryTitle}>
                <MaterialCommunityIcons name={category.icon as any} size={24} color={iconColor} />
                <ThemedText type="subtitle">{category.name}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={{ color: tintColor }}>{costs[category.key]} PLN</ThemedText>
            </View>
            <ThemedText style={styles.categoryDescription}>{category.description}</ThemedText>
            <Slider
              style={styles.slider}
              minimumValue={category.min}
              maximumValue={category.max}
              step={category.step}
              value={costs[category.key]}
              onValueChange={(value) => handleValueChange(category.key, value)}
              minimumTrackTintColor={tintColor}
              maximumTrackTintColor={colorScheme === 'dark' ? '#444' : '#ccc'}
              thumbTintColor={tintColor}
            />
          </ThemedView>
        ))}

        <LinearGradient colors={gradientColors} style={[styles.totalContainer, { borderLeftColor: tintColor }]}>
          <View style={styles.totalHeader}>
            <ThemedText style={styles.totalLabel}>Całkowity koszt miesięczny:</ThemedText> 
            <ThemedText>&nbsp;</ThemedText>
            <Pressable onPress={resetCosts}>
              <MaterialCommunityIcons name="restore" size={24} color={iconColor} />
            </Pressable>
          </View>
          <ThemedText style={[styles.totalValue, { color: tintColor }]}>{totalCost} PLN</ThemedText>
        </LinearGradient>
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
  categoryContainer: {
    padding: 20,
    borderRadius: 20,
    gap: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDescription: {
    opacity: 0.7,
    fontSize: 14,
    marginLeft: 32,
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 8,
  },
  totalContainer: {
    padding: 24,
    borderRadius: 20,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    opacity: 0.8,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
});