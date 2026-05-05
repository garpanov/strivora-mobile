// screens/NotificationDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AlertType, Notification } from './typeNotification';
export const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'System Breach Detected',
    body: 'Unauthorized access attempt detected from IP: 192.168.1.104. Protocol Alpha-6 initiated. All security modules are now active.',
    time: '2m ago',
    type: AlertType.Tips,
    isRead: false,
    subtitle: 'NETWORK SECURITY',
  },
  {
    id: '2',
    title: 'Power Anomaly',
    body: 'Main reactor core cooling system reported a 15% drop in efficiency. Backup systems are standing by.',
    time: '15m ago',
    type: AlertType.Tips,
    isRead: false,
    subtitle: 'REACTOR CORE',
  },
  {
    id: '3',
    title: 'Market Expansion',
    body: 'The latest quarterly projection indicates a significant shift in regional demand patterns. Our automated monitoring systems have identified a 14.2% increase in consumer engagement across the Northern Corridor.\n\nThis trend suggests a pivotal opportunity for aggressive deployment of resources. Tactical adjustments are recommended within the next operational window to maximize capture rate.',
    time: '1h ago',
    type: AlertType.Progress,
    isRead: true,
    subtitle: 'SECTOR 7G ANALYSIS',
  },
  {
    id: '4',
    title: 'Software Update',
    body: 'Kernel update v2.4.1 applied successfully. All systems nominal.',
    time: '6h ago',
    type: AlertType.Update,
    isRead: true,
    subtitle: 'SYSTEM CORE',
  },
];

const TYPE_CONFIG: Record<AlertType, { label: string; color: string; bg: string; icon: string }> = {
  [AlertType.Tips]:     { label: 'Alert',    color: '#EF9F27', bg: '#EF9F2715', icon: '⚠︎' },
  [AlertType.Progress]: { label: 'Progress', color: '#3B82F6', bg: '#3B82F615', icon: '↗' },
  [AlertType.Update]:   { label: 'Update',   color: '#6B7280', bg: '#6B728015', icon: '↻' },
};

export default function NotificationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const notification = NOTIFICATIONS.find((n) => n.id === id);

  if (!notification) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>✕</Text>
        <Text style={styles.errorText}>Сповіщення не знайдено</Text>
      </View>
    );
  }

  const config = TYPE_CONFIG[notification.type];

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Тип-бейдж */}
      <View style={[styles.badge, { backgroundColor: config.bg }]}>
        <Text style={[styles.badgeIcon, { color: config.color }]}>{config.icon}</Text>
        <Text style={[styles.badgeLabel, { color: config.color }]}>{config.label}</Text>
      </View>

      {/* Заголовок */}
      <Text style={styles.title}>{notification.title}</Text>

      {/* Час */}
      <Text style={styles.time}>{notification.time}</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Тіло */}
      <Text style={styles.body}>{notification.body}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 10,
  },
  badgeIcon: {
    fontSize: 13,
  },
  badgeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Title & time
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: 32,
    marginBottom: 8,
  },
  time: {
    color: '#444',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },

  // Divider
  divider: {
    height: 0.5,
    backgroundColor: '#1F1F1F',
    marginVertical: 14,
  },

  // Body
  body: {
    color: '#999',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
  },

  // Error
  centered: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorIcon: {
    color: '#333',
    fontSize: 32,
  },
  errorText: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
});