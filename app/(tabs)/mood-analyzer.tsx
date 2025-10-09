import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function MoodAnalyzer() {
  const [mood, setMood] = useState<string | null>(null);

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Leela’s Mood Analyzer 🌈</ThemedText>
      <ThemedText style={styles.subtitle}>How are you feeling today?</ThemedText>

      <ThemedView style={styles.emojiRow}>
        <Pressable onPress={() => handleMoodSelect('😊')}>
          <ThemedText style={styles.emoji}>😊</ThemedText>
        </Pressable>
        <Pressable onPress={() => handleMoodSelect('😡')}>
          <ThemedText style={styles.emoji}>😡</ThemedText>
        </Pressable>
        <Pressable onPress={() => handleMoodSelect('😔')}>
          <ThemedText style={styles.emoji}>😔</ThemedText>
        </Pressable>
        <Pressable onPress={() => handleMoodSelect('😎')}>
          <ThemedText style={styles.emoji}>😎</ThemedText>
        </Pressable>
      </ThemedView>

      {mood && (
        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Mood Recorded</ThemedText>
          <ThemedText>You’re feeling {mood} today!</ThemedText>
          <ThemedText>
            {mood === '😊' && 'Great! Keep spreading positivity!'}
            {mood === '😡' && 'Take deep breaths. Anger fades, calm stays.'}
            {mood === '😔' && 'It’s okay to rest. Brighter days are ahead.'}
            {mood === '😎' && 'Confidence looks good on you!'}
          </ThemedText>
        </ThemedView>
      )}

      <Link href="/" style={styles.link}>
        <ThemedText type="link">← Back to Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, gap: 20 },
  subtitle: { textAlign: 'center', marginBottom: 10 },
  emojiRow: { flexDirection: 'row', gap: 20 },
  emoji: { fontSize: 40 },
  card: {
    width: '100%',
    backgroundColor: '#ffffff20',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  link: { marginTop: 20 },
});
