import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FAQHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>KNOWLEDGE BASE</Text>

      <View style={styles.titleRow}>
        <Text style={styles.titleBold}>FAQ </Text>
        <Text style={styles.titleLight}>(Допомога)</Text>
      </View>

      <View style={styles.statusBadge}>
        <Ionicons name="ellipse" size={10} color="#8BF1E6" />
        <Text style={styles.statusText}>SYSTEM STATUS: OPTIMAL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    paddingTop: 20,
    paddingBottom: 16,
    gap: 10,
  },
  label: {
    color: '#8BF1E6',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  titleBold: {
    color: '#E2E2E2',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
  },
  titleLight: {
    color: '#3D4947',
    fontSize: 48,
    fontWeight: '300',
    lineHeight: 56,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 20,
    paddingVertical: 19,
    borderRadius: 16,
    gap: 13,

  },
  statusText: {
    color: '#BDC9C6',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.7,
  },
});