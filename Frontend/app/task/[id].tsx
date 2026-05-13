import React, { use } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import TaskDetailCard from '@/components/detail_task';
import {useTasksStore} from '@/store/useTasksStore';
import Return from '@/components/menu/return';


export default function TaskDetailScreen() {
    const router = useRouter();
    const tasks = useTasksStore((state) => state.tasks);
    const { id } = useLocalSearchParams();
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return (
        <View style={styles.centered}>
          <Return></Return>
          <Text style={styles.errorText}>Завдання не знайдено</Text>
        </View>
      );
    }

  return (
    <View style={styles.scroll}>
      <Return></Return>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TaskDetailCard task={task} onClose={() => router.back()} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 10,
  },
  badgeIcon: {
    fontSize: 13,
  },
  badgeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Title & time
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 8,
  },
  time: {
    color: '#444',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },

  // Divider
  divider: {
    height: 0.5,
    backgroundColor: '#1F1F1F',
    marginVertical: 14,
  },

  // Body
  body: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
  },

  // Error
  centered: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorIcon: {
    color: '#333',
    fontSize: 32,
  },
  errorText: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
});