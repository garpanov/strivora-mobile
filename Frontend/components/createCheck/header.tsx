import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../main/design-tokens';

type HeaderCreateCheckProps = {
  edition?: boolean;
};

export default function HeaderCreateCheck({ edition = false }: HeaderCreateCheckProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.display}>
        {edition ? 'Редагувати' : 'Додати'}{' '}
        <Text style={styles.displayBold}>
          {edition ? 'запис' : 'витрату'}
        </Text>
      </Text>
      <View style={styles.subtitleRow}>
        <View style={styles.line} />
        <Text style={styles.subtitle}>
          {edition ? 'РЕДАГУВАННЯ ЗАПИСУ' : 'НОВИЙ ЗАПИС У ФІНАНСАХ'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  display: {
    ...typography.display,
    lineHeight: 60,
    color: '#ffffff',
    fontSize: 45,
    fontWeight: '300',
  },
  displayBold: {
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitleRow: {
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xs,
    gap: 10,
  },
  line: {
    width: 24,
    height: 1.5,
    backgroundColor: '#8BF1E6',
  },
  subtitle: {
    fontSize: 13,
    letterSpacing: 2,
    color: '#ffffff',
    fontWeight: '300',
  },
});