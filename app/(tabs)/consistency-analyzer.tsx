import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

interface Goal {
  id: string;
  title: string;
  progress: { date: string; day: string; done: boolean }[];
}

export default function ConsistencyAnalyzer() {
  const [goalTitle, setGoalTitle] = useState('');
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = () => {
    if (!goalTitle.trim()) return;

    const today = new Date();
    const dateString = today.toLocaleDateString();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });

    const newGoal: Goal = {
      id: Math.random().toString(),
      title: goalTitle,
      progress: [{ date: dateString, day, done: false }],
    };

    setGoals(prev => [...prev, newGoal]);
    setGoalTitle('');
  };

  const toggleProgress = (goalId: string, date: string) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? {
              ...goal,
              progress: goal.progress.map(p =>
                p.date === date ? { ...p, done: !p.done } : p
              ),
            }
          : goal
      )
    );
  };

  const addTodayForAllGoals = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString();
    const day = today.toLocaleDateString('en-US', { weekday: 'long' });

    setGoals(prev =>
      prev.map(goal => {
        const already = goal.progress.some(p => p.date === dateString);
        if (already) return goal;
        return {
          ...goal,
          progress: [...goal.progress, { date: dateString, day, done: false }],
        };
      })
    );
  };

  const calcProgress = (goal: Goal) => {
    const done = goal.progress.filter(p => p.done).length;
    return Math.round((done / goal.progress.length) * 100);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Leela’s Consistency Analyzer 📆</ThemedText>
      <ThemedText style={styles.subtitle}>
        Set and track multiple goals with daily updates.
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter new goal (e.g., Exercise)"
        value={goalTitle}
        onChangeText={setGoalTitle}
      />

      <Pressable style={styles.button} onPress={addGoal}>
        <ThemedText type="defaultSemiBold">Add Goal</ThemedText>
      </Pressable>

      <Pressable style={styles.smallButton} onPress={addTodayForAllGoals}>
        <ThemedText>Add Today’s Entry for All Goals</ThemedText>
      </Pressable>

      <FlatList
        data={goals}
        keyExtractor={goal => goal.id}
        renderItem={({ item: goal }) => (
          <ThemedView style={styles.goalCard}>
            <ThemedText type="subtitle">{goal.title}</ThemedText>

            <FlatList
              horizontal
              data={goal.progress}
              keyExtractor={p => p.date}
              renderItem={({ item: day }) => (
                <Pressable
                  onPress={() => toggleProgress(goal.id, day.date)}
                  style={[
                    styles.dayBox,
                    { backgroundColor: day.done ? '#4CAF50' : '#ffffff20' },
                  ]}
                >
                  <ThemedText>{day.day.slice(0, 3)}</ThemedText>
                  <ThemedText>{day.done ? '✅' : '❌'}</ThemedText>
                </Pressable>
              )}
            />

            <ThemedText style={{ marginTop: 8 }}>
              Progress: {calcProgress(goal)}%
            </ThemedText>
          </ThemedView>
        )}
      />

      <Link href="/" style={styles.link}>
        <ThemedText type="link">← Back to Home</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, gap: 20 },
  subtitle: { textAlign: 'center', marginBottom: 10 },
  input: {
    width: '100%',
    backgroundColor: '#ffffff20',
    padding: 12,
    borderRadius: 12,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  smallButton: {
    backgroundColor: '#ffffff20',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  goalCard: {
    width: '100%',
    backgroundColor: '#ffffff15',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  dayBox: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: { marginTop: 20 },
});
