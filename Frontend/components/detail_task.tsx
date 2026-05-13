import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { TaskPriority, TaskStatus } from '@shared/types';
import { useChangeStatusTask, useDeleteTask } from '@/hooks/tasks/createTask';

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dateStarted: Date;
  dateEnd: Date;
}

interface TaskDetailCardProps {
  task: Task;
  onClose?: () => void;
}

const PRIORITY_CONFIG: Record<TaskPriority, { label: string; color: string; textColor: string }> = {
  [TaskPriority.High]: { label: 'ВИСОКИЙ ПРІОРИТЕТ', color: '#ff3b30', textColor: '#fff' },
  [TaskPriority.Medium]: { label: 'СЕРЕДНІЙ ПРІОРИТЕТ', color: '#ff9500', textColor: '#000' },
  [TaskPriority.Low]: { label: 'НИЗЬКИЙ ПРІОРИТЕТ', color: '#555', textColor: '#fff' },
};

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; textColor: string }> = {
  [TaskStatus.InProgress]: { label: 'В ПРОЦЕСІ', color: '#00e5b0', textColor: '#000' },
  [TaskStatus.Expired]: { label: 'ПРОПУЩЕНО', color: '#4a9eff', textColor: '#000' },
  [TaskStatus.Done]: { label: 'ВИКОНАНО', color: '#2a2a2a', textColor: '#888' },
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });

const getDurationDays = (start: Date, end: Date) => {
  const ms = end.getTime() - start.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

export default function TaskDetailCard({ task, onClose }: TaskDetailCardProps) {
  const [done, setDone] = useState(task.status === TaskStatus.Done);
  const router = useRouter();

  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];
  const durationDays = getDurationDays(task.dateStarted, task.dateEnd);

  const { changeStatus } = useChangeStatusTask();
  const { handleDelete } = useDeleteTask();

  const handleStatusChange = () => {
    const newStatus = done ? TaskStatus.InProgress : TaskStatus.Done;
    changeStatus(task.id, newStatus);
    setDone(newStatus === TaskStatus.Done);
  };

  return (
    <View style={styles.container}>
      {/* Header badges */}
      <View style={styles.header}>
        <View style={[styles.badge, { backgroundColor: status.color }]}>
          <Text style={[styles.badgeText, { color: status.textColor }]}>{status.label}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: priority.color }]}>
          <Text style={[styles.badgeText, { color: priority.textColor }]}>{priority.label}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>{task.name}</Text>

        {/* Meta */}
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={15} color="#aaa" />
            <Text style={styles.metaText}>{durationDays} дн.</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={15} color="#aaa" />
            <Text style={styles.metaText}>
              {formatDate(task.dateStarted)} — {formatDate(task.dateEnd)}
            </Text>
          </View>
        </View>

        {/* Description block */}
        <Text style={styles.sectionLabel}>ОПИС ЗАВДАННЯ</Text>
        <View style={styles.descBox}>
          <Text style={styles.descText}>{task.description}</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={[styles.btnPrimary, done && styles.btnPrimaryDone]}
          onPress={handleStatusChange}
          activeOpacity={0.85}
        >
          <Ionicons
            name={done ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={22}
            color="#000"
          />
          <Text style={styles.btnPrimaryText}>
            {done ? 'Виконано!' : 'Відмітити як виконане'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} activeOpacity={0.7} onPress={() => router.push(`/task_editing/${task.id}`)}>
          <Text style={styles.btnSecondaryText}>Редагувати завдання</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnThird} activeOpacity={0.7} onPress={() => handleDelete(task.id)}>
          <Text style={styles.btnThirdText}>Видалити завдання</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    fontWeight: '700',
    fontSize: 11,
  },
  closeBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 14,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    color: '#aaa',
    fontSize: 14,
  },
  sectionLabel: {
    color: '#555',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  descBox: {
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  descText: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
  },
  btnPrimary: {
    backgroundColor: '#00e5b0',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },
  btnPrimaryDone: {
    backgroundColor: '#00b589',
  },
  btnPrimaryText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: '#1c1c1c',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSecondaryText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
    btnThird: {
    borderRadius: 14,
    paddingVertical: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnThirdText: {
    color: '#e34c4cff',
    fontWeight: '600',
    fontSize: 18,
  },
});