import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

const FILTERS = [
  { id: 'today', label: 'tasks.filter.today' },
  { id: 'tomorrow', label: 'tasks.filter.tomorrow' },
  { id: 'week', label: 'tasks.filter.week' },
  { id: 'month', label: 'tasks.filter.month' },
  { id: 'year', label: 'tasks.filter.year' },
  { id: 'other', label: 'tasks.filter.other' }
];

type TaskFilterBarProps = {
  onFilterChange?: (filter: string) => void;
};

export default function TaskFilterBar({ onFilterChange }: TaskFilterBarProps) {
  const [active, setActive] = useState('today');
  const { t } = useTranslation();

  const handlePress = (id: string) => {
    setActive(id);
    onFilterChange?.(id);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => handlePress(filter.id)}
            style={[styles.chip, active === filter.id && styles.chipActive]}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, active === filter.id && styles.labelActive]}>
              {t(filter.label)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    paddingVertical: 8,
    marginVertical: 20
  },
  container: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#1c1c1e',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  labelActive: {
    color: '#000',
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
});