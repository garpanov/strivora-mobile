import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StatisticsCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Ionicons name="bar-chart" size={28} color="#8BF1E6" />
        </View>
        <Text style={styles.number}>03</Text>
      </View>

      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.description}>
        Data sources and AI conclusions. Visualize your mental and financial
        entropy through deep analytical models.
      </Text>

      <View style={styles.tags}>
        <View style={styles.tag}>
          <Ionicons name="sparkles" size={16} color="#fff" />
        </View>
        <View style={styles.tag}>
          <Ionicons name="server" size={16} color="#fff" />
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#rgba(139, 241, 230, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: '#3D4947',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 25,
    marginBottom: 12,
  },
  description: {
    color: '#aaa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,

  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});