import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from './main/design-tokens';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import SlideMenu from './menu/slideNav';
import { useRouter } from 'expo-router';

type Props = {
  onBellPress?: () => void;
  hasNotification?: boolean;
};

export default function Header({ onBellPress }: Props) {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <View style={[styles.wrapper, { paddingTop: insets.top }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.background}
        />
        <View style={styles.row}>
          {/* Left side */}
          <View style={styles.left}>
            {/* Hamburger */}
            <TouchableOpacity
              onPress={() => setMenuOpen(true)}
              style={styles.iconBtn}
              hitSlop={HIT}
            >
              <View style={styles.line} />
              <View style={styles.line} />
              <View style={styles.line} />
            </TouchableOpacity>
            {/* Title */}
            <Text style={styles.title}>Strivora</Text>
          </View>

          {/* Right side */}
          <TouchableOpacity
            onPress={() => router.push('/notification')}
            style={styles.iconBtn}
            hitSlop={HIT}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="#8bf1e6"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>

      {/* Slide menu — rendered outside wrapper so it covers full screen */}
      <SlideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        securityLevel="HIGH"
        menuItems={[
          {
            icon: 'person-outline',
            label: 'Profile',
            onPress: () => router.push('/profile'),
          },
          {
            icon: 'settings-outline',
            label: 'Settings',
            onPress: () => router.push('/settings'),
          },
          {
            icon: 'help-circle-outline',
            label: 'FAQ',
            onPress: () => router.push('/faq'),
          },
          {
            icon: 'log-out-outline',
            label: 'Log Out',
            onPress: () => console.log('Log Out'),
          },
        ]}
      />
    </>
  );
}

const HIT = {
  top: 12,
  bottom: 12,
  left: 12,
  right: 12,
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    height: 56,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    marginLeft: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 22,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginVertical: 2.5,
  },
  separator: {
    height: 1,
    backgroundColor: colors.surfaceContainerHigh,
    marginHorizontal: spacing.xxl,
    opacity: 0.6,
  },
});