import { Image } from 'expo-image';
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, Leela!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.boxContainer}>

        {/* Mood Analyzer */}
        <Link href="/mood-analyzer" asChild>
          <Pressable style={styles.box}>
            <ThemedText type="subtitle">Leela Mood Analyzer</ThemedText>
            <ThemedText type="default">
              Track and understand emotional patterns.
            </ThemedText>
          </Pressable>
        </Link>

        {/* Expenses Analyzer */}
        <Link href="/expenses-analyzer" asChild>
          <Pressable style={styles.box}>
            <ThemedText type="subtitle">Leela Expenses Analyzer</ThemedText>
            <ThemedText type="default">
              Monitor spending and manage your budget smartly.
            </ThemedText>
          </Pressable>
        </Link>

        {/* Consistency Analyzer */}
        <Link href="/consistency-analyzer" asChild>
          <Pressable style={styles.box}>
            <ThemedText type="subtitle">Leela Consistency Analyzer</ThemedText>
            <ThemedText type="default">
              Analyze habits and daily consistency progress.
            </ThemedText>
          </Pressable>
        </Link>

      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  boxContainer: {
    gap: 16,
  },
  box: {
    backgroundColor: '#ffffff20',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
