import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

type IconLib = typeof Ionicons | typeof MaterialCommunityIcons | typeof Feather;

const ICONS: Record<string, { iconLib: IconLib; icon: string; label: string }> = {
  index: {
    iconLib: Ionicons,
    icon: 'home',
    label: 'Home',
  },
  tasks: {
    iconLib: Ionicons,
    icon: 'checkmark-circle',
    label: 'Tasks',
  },
  finance: {
    iconLib: MaterialCommunityIcons,
    icon: 'cash-multiple',
    label: 'Finance',
  },
  analytics: {
    iconLib: Feather,
    icon: 'trending-up',
    label: 'Analytics',
  },
};

export default function BottomNav({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.nav, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;

        const config = ICONS[route.name];
        if (!config) return null;

        const Icon = config.iconLib;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={onPress}
            activeOpacity={0.75}
          >
            <Icon
              name={config.icon}
              size={22}
              color={isActive ? '#001c39' : '#c3c6cf'}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 8,
    paddingHorizontal: 3,
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 2,
  },
  tabActive: {
    backgroundColor: '#8bf1e6',
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#c3c6cf',
    marginTop: 4,
  },
  labelActive: {
    color: '#001c39',
  },
});