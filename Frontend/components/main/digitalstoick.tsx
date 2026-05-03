import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  text: string;
  tags: string[];
};

export default function DigitalStoicismCard({ text, tags }: Props) {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('main.stoicism.title')}</Text>
      <Text style={styles.body}>{text}</Text>
      <View style={styles.tags}>
        {tags.map((tag, i) => (
          <View key={i} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#030303ff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 24,
    gap: 14
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  body: {
    fontSize: 15,
    color: '#c3c6cf',
    lineHeight: 22,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#1c2022',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8bf1e6',
  },
});