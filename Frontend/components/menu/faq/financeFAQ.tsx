import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FinanceCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.number}>02</Text>

      <View style={styles.iconBox}>
        <Ionicons name="receipt-outline" size={28} color="#8BF1E6" />
      </View>

      <Text style={styles.title}>Finance</Text>
      <Text style={styles.description}>
        Receipt scanning and real-time bank sync for the disciplined observer.
      </Text>

      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
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
  iconBox: {
    width: 60,
    height: 60,
    backgroundColor: '#rgba(139, 241, 230, 0.1)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    color: '#888',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  progressFill: {
    width: '60%',
    height: 4,
    backgroundColor: '#5EEAD4',
    borderRadius: 2,
  },
});