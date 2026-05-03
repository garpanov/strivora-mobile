import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';


const FILTERS = [
  { id: 'week', label: 'analysis_filter_week' },
  { id: 'month', label: 'analysis_filter_month' },
  { id: 'year', label: 'analysis_filter_year' }
];

type DayFilterBarProps = {
  onFilterChange?: (filter: string) => void;
};

export default function DayFilterBar({ onFilterChange }: DayFilterBarProps) {
  const [active, setActive] = useState('week');
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
    marginBottom: 20
  },
  container: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#282B2E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: '#8BF1E6',
  },
  label: {
    color: '#d0d0d0ff',
    fontSize: 15,
    fontWeight: '600',
  },
  labelActive: {
    color: '#006F67',
    fontWeight: '600',
  },
});