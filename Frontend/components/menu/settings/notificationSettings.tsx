import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ToggleProps = {
  value: boolean;
  onToggle: () => void;
};

const Toggle = ({ value, onToggle }: ToggleProps) => {
  const translateX = React.useRef(new Animated.Value(value ? 22 : 0)).current;
  const bgColor = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 22 : 0,
        useNativeDriver: true,
        speed: 20,
        bounciness: 4,
      }),
      Animated.timing(bgColor, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const interpolatedBg = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#353535', '#8BF1E6'],
  });

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
      <Animated.View style={[styles.toggle, { backgroundColor: interpolatedBg }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

type NotificationItemProps = {
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: () => void;
};

const NotificationItem = ({ title, subtitle, value, onToggle }: NotificationItemProps) => (
  <View style={styles.item}>
    <View style={styles.itemText}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemSubtitle}>{subtitle}</Text>
    </View>
    <Toggle value={value} onToggle={onToggle} />
  </View>
);

type NotificationSettings = {
  tasks: boolean;
  finance: boolean;
  ai: boolean;
};

export default function NotificationsCard() {
  const [settings, setSettings] = useState<NotificationSettings>({
    tasks: true,
    finance: true,
    ai: false,
  });

  const toggle = (key: keyof NotificationSettings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="notifications" size={24} color="#8BF1E6" />
        <Text style={styles.headerText}>СПОВІЩЕННЯ</Text>
      </View>

      <NotificationItem
        title="Нагадування завдань"
        subtitle="Focus deep dive alerts"
        value={settings.tasks}
        onToggle={() => toggle('tasks')}
      />
      <View style={styles.divider} />
      <NotificationItem
        title="Звіти про фінанси"
        subtitle="Weekly analytical summary"
        value={settings.finance}
        onToggle={() => toggle('finance')}
      />
      <View style={styles.divider} />
      <NotificationItem
        title="Поради AI"
        subtitle="Stoic mindfulness insights"
        value={settings.ai}
        onToggle={() => toggle('ai')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 30,
    gap: 16,
    borderColor: "#rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    marginBottom: 12,
    marginLeft: 2,
  },
  headerText: {
    color: '#BDC9C6',
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: 3,
  },
  item: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  itemText: {
    flex: 1,
    marginRight: 16,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700' as const,
    marginBottom: 2,
  },
  itemSubtitle: {
    color: '#888888',
    fontSize: 13,
  },
  divider: {
    height: 1,

  },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center' as const,
    paddingHorizontal: 3,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});