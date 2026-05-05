import { View, Text, Switch, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

export default function AITimePicker() {
  const [enabled, setEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="sparkles" size={22} color="#4DD9C0" />
      </View>

      <View style={styles.textWrapper}>
        <Text style={styles.title}>Дозволити AI підібрати час</Text>
        <Text style={styles.subtitle}>Система проаналізує ваш графік</Text>
      </View>

      <Switch
        value={enabled}
        onValueChange={setEnabled}
        style={{ alignSelf: 'center' }}
        trackColor={{ false: '#3A3A3A', true: '#4DD9C0' }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 12,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 3,
    backgroundColor: '#2A2A2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    color: '#E2E2E2',
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    color: '#BDC9C6',
    fontSize: 13,
    marginTop: 2,
  },
});