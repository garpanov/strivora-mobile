import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';

// Щит з половинкою (лівий верхній кут)
function ShieldHalfIcon() {
  return (
    <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      {/* Ліва половина — заповнена бірюзою */}
      <Path
        d="M12 2L4 5.5V11C4 15.55 7.41 19.74 12 21C16.59 19.74 20 15.55 20 11V5.5L12 2Z"
        fill="#1d6f60ff"
      />
      <Path
        d="M12 2L4 5.5V11C4 15.55 7.41 19.74 12 21V2Z"
        fill="#2dd4bf"
      />
    </Svg>
  );
}

// Великий щит із замком всередині
function ShieldLockIcon() {
  return (
    <Svg width="72" height="72" viewBox="0 0 24 24" fill="none">
      {/* Щит */}
      <Path
        d="M12 2L3 6V12C3 16.97 6.84 21.61 12 23C17.16 21.61 21 16.97 21 12V6L12 2Z"
        fill="#2a2a2a"
      />
      {/* Дужка замка */}
      <Path
        d="M9 11V9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9V11"
        stroke="#141414ff"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Корпус замка */}
      <Rect x="8.5" y="11" width="7" height="6" rx="1.5" fill="#141414ff" />
      {/* Замочна щілина */}
      <Circle cx="12" cy="13.5" r="1" fill="#141414ff" />
      <Rect x="11.4" y="14.2" width="1.2" height="1.8" rx="0.6" fill="#141414ff" />
    </Svg>
  );
}

export default function PrivacyCard() {
  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <ShieldHalfIcon />
        </View>
        <View style={styles.topRight}>
          <Text style={styles.number}>04</Text>
          <ShieldLockIcon />
        </View>
      </View>

      {/* Text content */}
      <Text style={styles.title}>Privacy</Text>
      <Text style={styles.description}>
        Uncompromising data protection for your income and app activity. We
        utilize end-to-end zero-knowledge protocols.
      </Text>

      {/* Tags */}
      <View style={styles.tagsRow}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>E2E ENCRYPTED</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>NO TRACKING</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#141414ff',
    borderRadius: 20,
    padding: 24,
    marginTop: 30
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(139, 241, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  number: {
    color: '#3D4947',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#aaaaaa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tagText: {
    color: '#ccc',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
});