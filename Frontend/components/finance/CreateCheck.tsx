import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AutomateAccountingCardProps {
  /** Количество связанных источников. Если 0 — показывается заглушка вместо кнопок */
  count?: number;
  onScanReceipt?: () => void;
  onAttachScreenshot?: () => void;
}

export default function AutomateAccountingCard({
  count = 1,
  onScanReceipt,
  onAttachScreenshot,
}: AutomateAccountingCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Автоматизуйте свій облік</Text>

      <Text style={styles.description}>
        Підключіть свій банк або просто сфотографуйте чек. Наш ШІ розпізнає
        категорію та додасть витрату миттєво.
      </Text>

      {count === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Ще немає підключених джерел. Додайте перше, щоб почати.
          </Text>
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onScanReceipt}
            activeOpacity={0.85}
          >
            <Ionicons name="qr-code-outline" size={22} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Сканувати чек</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onAttachScreenshot}
            activeOpacity={0.85}
          >
            <Ionicons name="image-outline" size={22} color="#FFFFFF" />
            <Text style={styles.secondaryButtonText}>Прикріпити скріншот</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  backgroundColor: '#001f1dff',
  borderRadius: 20,
  padding: 24,
  borderColor: "rgba(0, 106, 99, 0.2)",
  borderWidth: 1
},

  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 28,
  },

  description: {
    color: '#A3B8B5',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },

  actions: {
    gap: 12,
  },

  // --- Primary button (зелёный) ---
  primaryButton: {
    backgroundColor: '#006A63',
    borderRadius: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // --- Secondary button (тёмный с бордером) ---
  secondaryButton: {
    backgroundColor: '#rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: '#rgba(255, 255, 255, 0.05)',
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  // --- Empty state ---
  emptyState: {
    paddingVertical: 16,
    alignItems: 'center',
  },

  emptyText: {
    color: '#A3B8B5',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});