import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, radius } from '../main/design-tokens';
import { useTranslation } from 'react-i18next';

export default function HeaderCreateTask() {
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.display}>Додати{"\n"}завдання</Text>

      <Text style={styles.subtitle}>НОВИЙ ЗАПИС У СИСТЕМІ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  display: {
    ...typography.display,
    letterSpacing: 0.5,
    lineHeight: 60,
    color: '#E2E2E2',
    paddingTop: 15,
    fontSize: 60
  },
  subtitle: {
    fontSize: 16,
    marginVertical: spacing.xs,
    letterSpacing: 2,
    color: "#BDC9C6",
    fontWeight: "200",
  },
});