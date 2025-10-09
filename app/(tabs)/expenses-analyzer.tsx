import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

interface Expense {
  id: string;
  topic: string;
  amount: number;
  date: string;
  day: string;
}

export default function ExpensesAnalyzer() {
  const [topic, setTopic] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = () => {
    if (!topic.trim() || !amount.trim()) return;

    const date = new Date();
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toLocaleDateString();

    const newExpense: Expense = {
      id: Math.random().toString(),
      topic,
      amount: parseFloat(amount),
      date: dateString,
      day,
    };

    setExpenses(prev => [...prev, newExpense]);
    setTopic('');
    setAmount('');
  };

  const totalByTopic = expenses.reduce((acc: any, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + item.amount;
    return acc;
  }, {});

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Leela’s Expenses Analyzer 💸</ThemedText>
      <ThemedText style={styles.subtitle}>Track your daily expenses by topic</ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter Topic (e.g., Food, Travel)"
        value={topic}
        onChangeText={setTopic}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Amount (₹)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Pressable style={styles.button} onPress={addExpense}>
        <ThemedText type="defaultSemiBold">Add Expense</ThemedText>
      </Pressable>

      {expenses.length > 0 && (
        <>
          <ThemedText type="subtitle" style={styles.listTitle}>
            Your Expenses:
          </ThemedText>

          <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ThemedView style={styles.card}>
                <ThemedText type="defaultSemiBold">{item.topic}</ThemedText>
                <ThemedText>₹{item.amount}</ThemedText>
                <ThemedText>{item.day}, {item.date}</ThemedText>
              </ThemedView>
            )}
          />

          <ThemedView style={styles.summaryCard}>
            <ThemedText type="subtitle">Summary by Category:</ThemedText>
            {Object.keys(totalByTopic).map(topic => (
              <ThemedText key={topic}>
                {topic}: ₹{totalByTopic[topic].toFixed(2)}
              </ThemedText>
            ))}
          </ThemedView>
        </>
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
  card: {
    width: '100%',
    backgroundColor: '#ffffff15',
    padding: 14,
    borderRadius: 12,
    marginVertical: 5,
  },
  listTitle: { alignSelf: 'flex-start', marginTop: 10 },
  summaryCard: {
    width: '100%',
    backgroundColor: '#ffffff10',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },
  link: { marginTop: 20 },
});
