import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type User = {
  id: string;
  name: string;
  birthDate: string;
  observationDays: number;
};

type Props = {
  user: User;
  onEdit: () => void;
};

export default function PersonalInfoCard({ user, onEdit }: Props) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionLabel}>ОСОБИСТА ІНФОРМАЦІЯ</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
          <Ionicons name="pencil" size={16} color="#2dd4bf" />
        </TouchableOpacity>
      </View>

      {/* Name & ID */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.id}>ID: {user.id}</Text>

      <View style={styles.divider} />

      {/* Info Row */}
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.infoLabel}>ДАТА{'\n'}НАРОДЖЕННЯ</Text>
          <Text style={styles.infoValue}>{user.birthDate}</Text>
        </View>
        <View>
          <Text style={styles.infoLabel}>ПЕРІОД{'\n'}СПОСТЕРЕЖЕННЯ</Text>
          <Text style={styles.infoValue}>{user.observationDays} дні</Text>
        </View>
      </View>

      {/* AI Badge */}
      <View style={styles.badge}>
        <Ionicons name="settings" size={18} color="#2dd4bf" />
        <Text style={styles.badgeText}>AI ANALYSIS{'\n'}ENABLED</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 24,
    marginVertical: 16,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#2dd4bf',
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '600',
  },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 38,
  },
  id: {
    color: '#888',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 24,
  },
  infoLabel: {
    color: '#666',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 6,
  },
  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 10,
  },
  badgeText: {
    color: '#2dd4bf',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});