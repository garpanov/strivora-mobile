// components/NotificationItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { AlertType, Notification } from '../../app/notification/typeNotification';

const DOT_COLOR: Record<AlertType, string> = {
  [AlertType.Tips]:     '#EF9F27',
  [AlertType.Progress]: '#3B82F6',
  [AlertType.Update]:   '#6B7280',
};

interface Props {
  item: Notification;
  onRead: (id: string) => void;
}

export const NotificationItem = ({ item, onRead }: Props) => {
  const read = item.isRead;

  return (
    <TouchableOpacity
      style={[styles.item, read && styles.itemRead]}
      onPress={() => {
        onRead(item.id);
        router.push(`/notification/${item.id}`);
      }}
      activeOpacity={0.7}
    >
      {/* Dot — прихований якщо прочитано */}
      <View style={styles.dotSlot}>
        {!read && (
          <View style={[styles.dot, { backgroundColor: DOT_COLOR[item.type] }]} />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, read && styles.titleRead]}>{item.title}</Text>
          <Text style={[styles.time, read && styles.timeRead]}>{item.time}</Text>
        </View>
        <Text style={[styles.body, read && styles.bodyRead]}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 14,
  },
  itemRead: {
    opacity: 0.4,
  },

  dotSlot: {
    width: 9,
    marginTop: 5,
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  content: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: -0.1,
  },
  titleRead: {
    fontFamily: 'Inter-Regular',
  },

  time: {
    color: '#444',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 12,
    marginTop: 1,
  },
  timeRead: {
    color: '#333',
  },

  body: {
    color: '#777',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
    lineHeight: 19,
  },
  bodyRead: {
    color: '#555',
  },
});