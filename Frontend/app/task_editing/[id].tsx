import React, { use, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {useTasksStore} from '@/store/useTasksStore';
import Return from '@/components/menu/return';

import HeaderCreateTask from '@/components/create_tasks/header';
import TaskNameInput from '@/components/create_tasks/inputName';
import TaskDescriptionInput from '@/components/create_tasks/inputField';
import PriorityPicker from '@/components/create_tasks/priority_change';
import WhenPicker from '@/components/create_tasks/dateField';
import SaveButton from '@/components/create_tasks/buttonCreate';
import { useCreateTask } from '@/hooks/tasks/createTask';
import { TaskPriority, Task, TaskStatus } from '@shared/types';

const defaultTask: Task = {
  id: '',
  name: '',
  description: '',
  priority: TaskPriority.Low,
  dateEnd: new Date(),
  dateStarted: new Date(),
  status: TaskStatus.InProgress,
};


export default function TaskDetailScreen() {
  const tasks = useTasksStore((state) => state.tasks);
  const { id } = useLocalSearchParams();
  const task = tasks.find((task) => task.id === id);

  defaultTask.id = task?.id ?? '';
  defaultTask.name = task?.name ?? '';
  defaultTask.description = task?.description ?? '';
  defaultTask.priority = task?.priority ?? TaskPriority.Low;
  defaultTask.dateEnd = task?.dateEnd ?? new Date();
  defaultTask.dateStarted = task?.dateStarted ?? new Date();
  defaultTask.status = task?.status ?? TaskStatus.InProgress;

  const {
    name, setName,
    description, setDescription,
    priority, setPriority,
    date, setDate,
    errors,
    handleUpdate,
  } = useCreateTask({
    task: defaultTask
  });

  if (!task) {
    return (
      <View style={styles.centered}>
        <Return />
        <Text style={styles.errorText}>Завдання не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.scroll}>
      <Return />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderCreateTask edition={true} />

        <TaskNameInput
          name={name}         
          onChange={setName}
          error={errors.name}
        />
        <TaskDescriptionInput
          description={description}
          onChange={setDescription}
          error={errors.description}
        />
        <PriorityPicker
          initialValue={task.priority}
          onChange={setPriority}
        />
        <WhenPicker
          onSelect={({ date: picked }) => {
            if (picked) setDate(picked);
          }}
          date={task.dateEnd}
        />
        <SaveButton onPress={handleUpdate} />
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
    padding: 20,
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