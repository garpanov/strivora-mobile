import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TaskPriority } from '@shared/types';

interface PriorityPickerProps {
  initialValue?: TaskPriority;
  onChange?: (priority: TaskPriority) => void;
}

const OPTIONS = [TaskPriority.Low, TaskPriority.Medium, TaskPriority.High];

export default function PriorityPicker({ initialValue = TaskPriority.Low, onChange }: PriorityPickerProps) {
  const [selected, setSelected] = useState<TaskPriority>(initialValue);

  const handleSelect = (priority: TaskPriority) => {
    setSelected(priority);
    onChange?.(priority);
  };

  return (
    <View>
      <Text style={styles.label}>PRIORITY</Text>
      <View style={styles.container}>
        {OPTIONS.map((option) => {
          const isActive = selected === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.option, isActive && styles.optionActive]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.8}
            >
              <Text style={[styles.optionText, isActive && styles.optionTextActive]}>
                {option === TaskPriority.Medium ? 'Med' : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 20
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 4,
    gap: 4,
    marginBottom: 15
  },
  option: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    backgroundColor: '#8BF1E6',
  },
  optionText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#111',
    fontWeight: '700',
  },
});