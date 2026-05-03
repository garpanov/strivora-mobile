import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SupportCard() {
  return (
    <LinearGradient
      colors={['#2ee8c8', '#2ee8c820', '#0d0d0d']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Маєте{'\n'}запитання?</Text>
        <Text style={styles.subtitle}>
          Наша команда підтримки{'\n'}працює 24/7 для вашого спокою.
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={['#8BF1E6', '#8BF1E6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>НАПИСАТИ ПІДТРИМЦІ</Text>
            <Ionicons name="arrow-forward" size={18} color="#003733" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 22,
    padding: 1.5,
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#0d0d0d',
    borderRadius: 21,
    padding: 32,
    alignItems: 'center',
  },
  title: {
    color: '#E2E2E2',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    color: '#BDC9C6',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#003733',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 1.2,
  },
});