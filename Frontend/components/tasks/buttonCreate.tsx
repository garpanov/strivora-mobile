import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius } from '../main/design-tokens';
import { useRouter } from 'expo-router';


export default function ButtonCreate() {
    const router = useRouter();

    return (
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create_task")} activeOpacity={0.85}>
            <Text style={styles.addButtonText}>Додати завдання  +</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.onPrimary,
    letterSpacing: -0.2,
  },
});