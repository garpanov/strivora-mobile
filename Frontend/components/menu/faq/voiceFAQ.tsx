import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function VoiceInputCard() {
  return (
    <View style={styles.card}>
      {/* Номер картки */}
      <Text style={styles.number}>01</Text>

      {/* Іконка мікрофона */}
      <View style={styles.iconWrapper}>
        <Ionicons name="mic" size={28} color="#8BF1E6" />
      </View>

      {/* Заголовок */}
      <Text style={styles.title}>Voice Input</Text>

      {/* Опис */}
      <Text style={styles.description}>
        How to dictate tasks seamlessly. Our AI-driven engine captures intent
        from natural speech, converting ambient thoughts into structured stoic
        logs.
      </Text>

      {/* Кнопка */}
      <TouchableOpacity style={styles.link} onPress={() => {}}>
        <Text style={styles.linkText}>EXPLORE GUIDE</Text>
        <Ionicons name="arrow-forward" size={16} color="#4DD9C0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    padding: 24,
    marginTop: 30
  },
  number: {
    position: 'absolute',
    top: 24,
    right: 24,
    color: '#3D4947',
    fontSize: 14,
    fontWeight: '500',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(139, 241, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 7
  },
  description: {
    color: '#AAAAAA',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkText: {
    color: '#4DD9C0',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});