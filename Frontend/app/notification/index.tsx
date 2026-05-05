
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { AlertType, Notification } from './typeNotification';
import { NotificationItem } from './notificationItem';

export const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'System Breach Detected',
    body: 'Unauthorized access attempt detected from IP: 192.168.1.104.',
    time: '2m ago',
    type: AlertType.Tips,
    isRead: false,
  },
  {
    id: '2',
    title: 'Power Anomaly',
    body: 'Main reactor core cooling system reported a 15% drop in efficiency.',
    time: '15m ago',
    type: AlertType.Tips,
    isRead: false,
  },
  {
    id: '3',
    title: 'Market Expansion',
    body: 'Sector 7 analysis complete. Growth potential estimated at 24.5%.',
    time: '1h ago',
    type: AlertType.Progress,
    isRead: true,
  },
  {
    id: '4',
    title: 'Software Update',
    body: 'Kernel update v2.4.1 applied successfully.',
    time: '6h ago',
    type: AlertType.Update,
    isRead: true,
  },
];

const Separator = () => <View style={styles.separator} />;

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <View style={styles.container}>
      <FlatList<Notification>
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem item={item} onRead={markAsRead} />
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d' },
  separator: {
    height: 0.5,
    backgroundColor: '#1F1F1F',
    marginLeft: 43,
  },
});