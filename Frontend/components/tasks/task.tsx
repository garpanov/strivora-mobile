import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TaskPriority } from '@shared/types'
import { useTranslation } from 'react-i18next';

type TaskCardProps = {
  priority?: TaskPriority | boolean;
  title: string;
  description: string;
  timeLeft?: string;
  scheduledTime?: string;
  completed?: boolean;
  onDone?: () => void;
};

export default function TaskCard({
  priority = false,
  title,
  description,
  timeLeft,
  scheduledTime,
  completed = false,
  onDone,
}: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { t } = useTranslation();

  if (priority && typeof priority !== "boolean") {
    console.log("Rendering priority card with priority:", priority);
    const priorityConfig = {
      [TaskPriority.High]: {
        color: "#F87171",
        bg: "#450A0A",
        label: t("tasks.task.priority.high")
      },
      [TaskPriority.Medium]: {
        color: "#FACC15",
        bg: "#422006",
        label: t("tasks.task.priority.medium")
      },
      [TaskPriority.Low]: {
        color: "#4ADE80",
        bg: "#052E16",
        label: t("tasks.task.priority.low")
      }
    };
    return (
      <View style={styles.card}>
        <View style={styles.priorityRow}>
          <View style={[styles.priorityBadge, { backgroundColor: priorityConfig[priority].bg }]}>
            <Ionicons name="flash" size={16} color={priorityConfig[priority].color} />
          </View>
          <Text style={[styles.priorityLabel, { color: priorityConfig[priority].color }]}>{priorityConfig[priority].label}</Text>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.doneButton} onPress={onDone}>
            <Text style={styles.doneButtonText}>{t("tasks.task.done")}</Text>
          </TouchableOpacity>
          {timeLeft && (
            <Text style={styles.timeLeft}>{t("tasks.task.remaining")}: {timeLeft}</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.card, styles.cardLight]}>
      <View style={styles.scheduledRow}>
        <TouchableOpacity
          onPress={() => {
            setIsCompleted(prev => !prev);
            onDone?.();
          }}
          activeOpacity={0.7}
        >
          <View style={[styles.checkBadge, isCompleted ? styles.checkBadgeOn : styles.checkBadgeOff]}>
            {isCompleted && <Text style={styles.checkIcon}>✓</Text>}
          </View>
        </TouchableOpacity>
        {scheduledTime && (
          <Text style={styles.scheduledTime}>{scheduledTime}</Text>
        )}
      </View>

      <Text style={[styles.title]}>{title}</Text>
      <Text style={[styles.description]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(24, 24, 27, 0.4)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  cardLight: {
    backgroundColor: 'rgba(24, 24, 27, 0.6)',
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },

  // Priority card
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  priorityBadge: {
    width: 32,
    height: 32,
    borderRadius: 30,
    backgroundColor: '#450A0A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  priorityIcon: {
    fontSize: 16,
  },
  priorityLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    flex: 1,
  },
  exclamation: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  description: {
    color: '#8E8E93',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  doneButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  doneButtonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  timeLeft: {
    color: '#8E8E93',
    fontSize: 14,
  },

  // Scheduled card
  scheduledRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  checkBadge: {
    width: 22,
    height: 22,
    borderRadius: 14,
    marginLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadgeOn: {
    backgroundColor: '#4CD9C0',
  },
  checkBadgeOff: {
    borderWidth: 2,
    borderColor: '#8E8E93',
  },
  checkIcon: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },
  scheduledTime: {
    color: '#8E8E93',
    fontSize: 14,
  },
  titleDark: {
    color: '#000000',
  },
  descriptionDark: {
    color: '#3C3C43',
    marginBottom: 0,
  },
});