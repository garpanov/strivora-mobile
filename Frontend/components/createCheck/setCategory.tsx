import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ExpenseCategory } from '@shared/types';

const CATEGORIES = [
  { key: ExpenseCategory.Necessities, label: 'ЖИТЛО', icon: 'home-outline' },
  { key: ExpenseCategory.Entertainment, label: 'ПРОДУКТИ', icon: 'cart-outline' },
  { key: ExpenseCategory.Growth, label: 'РОЗВАГИ', icon: 'game-controller-outline' },
  { key: ExpenseCategory.Other, label: 'ІНШЕ', icon: 'shapes-outline' },
];

interface CategorySelectorProps {
  selected?: ExpenseCategory;
  onSelect: (category: ExpenseCategory) => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ВИБЕРІТЬ КАТЕГОРІЮ</Text>
      <View style={styles.grid}>
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.key;
          return (
            <TouchableOpacity
              key={cat.key}
              style={[styles.button, isActive && styles.buttonActive]}
              onPress={() => onSelect(cat.key)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={cat.icon as any}
                size={24}
                color={isActive ? '#8BF1E6' : 'rgba(139, 241, 230, 0.7)'}
              />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    gap: 12,
    paddingHorizontal: 20
  },
  heading: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: 'rgba(189, 201, 198, 0.6)',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    width: 175,
    height: 108,
    backgroundColor: 'rgba(27, 27, 27, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  buttonActive: {
    borderColor: 'rgba(139, 241, 230, 0.3)',
    backgroundColor: 'rgba(139, 241, 230, 0.05)',
  },
  label: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 1.5,
    color: 'rgba(189, 201, 198, 0.8)',
    textAlign: 'center',
  },
  labelActive: {
    color: '#8BF1E6',
  },
});