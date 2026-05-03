import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SystemSettings() {
  const handleClearCache = () => {
    Alert.alert('Кеш очищено', 'Кеш додатку успішно очищено.');
  };

  const handleResetData = () => {
    Alert.alert(
      'Скинути всі дані?',
      'Цю дію неможливо скасувати.',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Скинути', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings" size={22} color="#8BF1E6" />
        <Text style={styles.title}>СИСТЕМА</Text>
      </View>

      {/* Version */}
      <View style={styles.versionRow}>
        <Text style={styles.label}>ВЕРСІЯ ДОДАТКА</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>v2.4.0-stable</Text>
        </View>
      </View>

      {/* Clear Cache */}
      <TouchableOpacity style={styles.actionButton} onPress={handleClearCache}>
        <Text style={styles.actionText}>Очистити кеш</Text>
        <Ionicons name="brush" size={22} color="#BDC9C6" />
      </TouchableOpacity>

      {/* Reset Data */}
      <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={handleResetData}>
        <Text style={styles.dangerText}>Скинути всі дані</Text>
        <View style={styles.dangerIcon}>
          <Ionicons name="close" size={16} color="#FFB4AB" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 35,
    gap: 16,
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  title: {
    color: '#BDC9C6',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: 10,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 7
  },
  label: {
    color: '#BDC9C6',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  badge: {
    backgroundColor: 'rgba(139, 241, 230, 0.1)',
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#8BF1E6',
    fontSize: 12,
    letterSpacing: 1.5,
    fontFamily: 'monospace',
  },
  actionButton: {
    backgroundColor: 'rgba(53, 53, 53, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: {
    color: '#E2E2E2',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: 'rgba(147, 0, 10, 0.2)',
    marginHorizontal: 7,
  },
  dangerText: {
    color: '#FFB4AB',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerIcon: {
    borderWidth: 1.5,
    borderColor: '#FFB4AB',
    borderRadius: 4,
    padding: 2,
  },
});