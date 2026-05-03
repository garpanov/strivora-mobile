import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function VoiceInputCard({ text, date, time, onAdd, onClose }: { text: string; date: string; time: string; onAdd: () => void; onClose: () => void; }) {
  const { t } = useTranslation();

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.labelRow}>
          <View style={styles.dot} />
          <Text style={styles.labelText}>{t('tasks.voice.input.label')}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Task text */}
      <Text style={styles.taskText}>{text}</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{date}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Text style={styles.addBtnText}>{t('tasks.voice.input.add')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 24,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00E5C0',
  },
  labelText: {
    color: '#00E5C0',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: 'Inter',
  },
  closeBtn: {
    color: '#888',
    fontSize: 18,
  },
  taskText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 23,
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    backgroundColor: '#222222',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipText: {
    color: '#CCCCCC',
    fontSize: 13,
    fontWeight: '600',
  },
  addBtn: {
    marginLeft: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  addBtnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
  },
});