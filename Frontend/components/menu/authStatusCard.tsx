import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';

function GoogleIcon({ size = 28 }) {
  const s = size / 2;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', position: 'relative', marginHorizontal: 7 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, width: s, height: s, backgroundColor: '#4285F4' }} />
      <View style={{ position: 'absolute', top: 0, right: 0, width: s, height: s, backgroundColor: '#EA4335' }} />
      <View style={{ position: 'absolute', bottom: 0, left: 0, width: s, height: s, backgroundColor: '#34A853' }} />
      <View style={{ position: 'absolute', bottom: 0, right: 0, width: s, height: s, backgroundColor: '#FBBC05' }} />
      <View style={{ position: 'absolute', top: s / 2, left: s / 2, width: s, height: s, borderRadius: s / 2, backgroundColor: '#1B1B1B' }} />
    </View>
  );
}

interface AuthStatusCardProps {
  email?: string;
  onLogout?: () => void;
  onSecuritySettings?: () => void;
}

export default function AuthStatusCard({
  email = '',
  onLogout,
  onSecuritySettings,
}: AuthStatusCardProps) {
  const logoutAnim = useRef(new Animated.Value(0)).current;
  const [iconColor, setIconColor] = useState('#FFB4AB');

  const onLogoutPressIn = () => {
    setIconColor('#FF4433');
    Animated.timing(logoutAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onLogoutPressOut = () => {
    setIconColor('#FFB4AB');
    Animated.timing(logoutAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const logoutColor = logoutAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFB4AB', '#FF4433'],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.label}>СТАТУС АВТОРИЗАЦІЇ</Text>

      <View style={styles.row}>
        <GoogleIcon size={32} />
        <View style={styles.textBlock}>
          <Text style={styles.title}>Вхід через Google</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [styles.settingsBtn, pressed && styles.settingsBtnPressed]}
          onPress={onSecuritySettings}
        >
          <Text style={styles.settingsText}>Налаштування безпеки</Text>
        </Pressable>

        <Pressable
          onPressIn={onLogoutPressIn}
          onPressOut={onLogoutPressOut}
          onPress={onLogout}
        >
          <Animated.View style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={23} color={iconColor} />
            <Animated.Text style={[styles.logoutText, { color: logoutColor }]}>
              {'ВИЙТИ З\nАКАУНТА'}
            </Animated.Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    padding: 30,
    gap: 16,
  },
  label: {
    color: '#BDC9C6',
    fontSize: 12,
    letterSpacing: 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textBlock: {
    gap: 4,
  },
  title: {
    color: '#E2E2E2',
    fontSize: 20,
    fontWeight: '700',
  },
  email: {
    color: '#8BF1E6',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  settingsBtn: {
    flex: 1,
    borderColor: 'rgba(61, 73, 71, 0.3)',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  settingsBtnPressed: {
    backgroundColor: 'rgba(41, 41, 41, 0.25)',
    borderColor: 'rgba(35, 35, 35, 0.3)',
  },
  settingsText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});