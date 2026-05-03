import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

type InsightCardProps = {
  percentage: number; // e.g. 15 (positive = less spent, negative = more spent)
  category: string;   // e.g. "каву"
  emptyText?: string; // shown when percentage === 0
};

export default function InsightCard({
  percentage,
  category,
  emptyText = 'Поки що немає даних для аналізу.',
}: InsightCardProps) {
  const { t } = useTranslation();

  if (percentage === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Ionicons name="bulb" size={20} color="#fff" />
        </View>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  const lessOrMore = percentage > 0 ? 'менше' : 'більше';
  const abs = Math.abs(percentage);
  const praise = percentage > 0 ? 'Чудовий самоконтроль!' : 'Зверніть увагу на витрати!';

  return (
    <View style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name="bulb" size={20} color="#fff" />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.mainText}>
          Ви витратили на {abs}% {lessOrMore} на {category} цього місяця.
        </Text>
        <Text style={styles.praiseText}>{praise}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#rgba(18, 18, 18, 0.7)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    marginTop: 10
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a7a6a',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textBlock: {
    flex: 1,
  },
  mainText: {
    color: '#A1A1AA',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    marginTop: 4
  },
  emptyText: {
    color: '#aaaaaa',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  praiseText: {
    color: '#006A63',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
  },
});