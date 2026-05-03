import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ComponentProps } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const FOCUS_OPTIONS: { id: string; label: string; icon: IoniconsName }[] = [
  { id: 'work',   label: 'Робота', icon: 'briefcase' },
  { id: 'family', label: "Сім'я",  icon: 'git-branch' },
  { id: 'study',  label: 'Учоба',  icon: 'school' },
];

export default function FocusSelector() {
  const [selected, setSelected] = useState('work');

  return (
    <View style={styles.card}>
      <Text style={styles.title}>ПОТОЧНИЙ ФОКУС</Text>

      {FOCUS_OPTIONS.map((item) => {
        const isActive = selected === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.option, isActive && styles.optionActive]}
            onPress={() => setSelected(item.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={item.icon}
              size={20}
              color={isActive ? '#003733' : '#BDC9C6'}
              style={styles.icon}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
            {isActive && (
              <Ionicons name="checkmark-circle" size={16} color="#003733" />
            )}
          </TouchableOpacity>
        );
      })}

      <Text style={styles.hint}>
        Зміна фокусу адаптує AI-алгоритми аналізу ваших щоденних записів.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#282828ff',
    borderRadius: 20,
    padding: 30,
    gap: 10,
  },
  title: {
    color: '#8BF1E6',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#353535',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionActive: {
    backgroundColor: '#8BF1E6',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#BDC9C6',
  },
  labelActive: {
    color: '#003733',
    fontWeight: '600',
  },
  hint: {
    color: '#525252ff',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 18,
  },
});