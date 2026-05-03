import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from './design-tokens';
import { useTranslation } from 'react-i18next';

export type Task = {
  id: string;
  icon: string;
  title: string;
  duration: string;
  priority: 'Високий' | 'Середній' | 'Низький';
};

type Props = {
  tasks: Task[];
  date: string;
  onTaskPress?: (task: Task) => void;
  onAddPress?: () => void;
};

export default function ActiveTasksCard({ tasks, date, onTaskPress, onAddPress }: Props) {
    const { t, i18n } = useTranslation();
    return (
        <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
            <Text style={styles.title}>{t('main.tasks.title')}</Text>
            <Text style={styles.date}>{t('main.tasks.day')}{"\n"}{date}</Text>
        </View>

        {/* Task list — spacing instead of dividers */}
        <View style={styles.list}>
            {tasks.map((task) => (
            <TouchableOpacity
                key={task.id}
                style={styles.taskRow}
                onPress={() => onTaskPress?.(task)}
                activeOpacity={0.7}
            >
                <View style={styles.iconBox}>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                </View>

                <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskMeta}>{task.duration} · Пріоритет: {task.priority}</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
            ))}
        </View>

        {/* Primary CTA — gradient-style button */}
        <TouchableOpacity style={styles.addButton} onPress={onAddPress} activeOpacity={0.85}>
            <Text style={styles.addButtonText}>Додати завдання  +</Text>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: radius.md,
    padding: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.sm,
  },
  title: {
    ...typography.headline,
    color: '#ffffff',
  },
  date: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    fontSize: 13,
    letterSpacing: 0.3,
    lineHeight: 21,
  },
  list: {
    gap: spacing.lg, // spacing instead of dividers per design rules
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskIcon: {
    fontSize: 20,
  },
  taskInfo: {
    flex: 1,
    gap: 4,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.2,
  },
  taskMeta: {
    ...typography.label,
    color: colors.onSurfaceVariant,
    fontSize: 11,
    letterSpacing: 0.3,
    textTransform: 'none',
    fontWeight: '400',
  },
  chevron: {
    fontSize: 22,
    color: colors.outlineVariant,
    fontWeight: '300',
  },
  // Primary button — gradient from primaryFixed → primary
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: -0.2,
  },
});