import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ObstacleScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(45, 212, 191, 0.7)', 'transparent']}
        style={styles.line}
      />
      <Text style={styles.quote}>THE OBSTACLE IS THE WAY.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  line: {
    width: 1,
    height: 60,
  },
  quote: {
    color: '#4a5a5a',
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: '300',
  },
});