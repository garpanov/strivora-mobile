// CreateTaskScreen.tsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { spacing } from '@/components/main/design-tokens';
import Return from '@/components/menu/return';
import HeaderCreateTask from '@/components/create_tasks/header';
import TaskDescriptionInput from '@/components/create_tasks/inputField';
import WhenPicker from '@/components/create_tasks/dateField';
import SaveButton from '@/components/create_tasks/buttonCreate';
import PriorityPicker from '@/components/create_tasks/priority_change';
import TaskNameInput from '@/components/create_tasks/inputName';
import { TaskPriority, TaskStatus, Task } from '@shared/types';
import { useCreateTask } from '@/hooks/tasks/createTask';

const defaultTask: Task = {
  id: '',
  name: '',
  description: '',
  priority: TaskPriority.Low,
  dateEnd: new Date(),
  dateStarted: new Date(),
  status: TaskStatus.InProgress,
};

export default function CreateTaskScreen() {
  const {
    name, setName,
    description, setDescription,
    priority, setPriority,
    date, setDate,
    errors,
    handleSave,
  } = useCreateTask({
    task: defaultTask
  });

  return (
    <View style={styles.screen}>
      <Return />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ ...styles.content, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCreateTask />

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
          initialValue={priority}
          onChange={setPriority}
        />

        <WhenPicker
          date={date}
          onSelect={({ date: picked }) => {
            if (picked) setDate(picked);
          }}
        />

        <SaveButton onPress={handleSave} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 15,
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
});