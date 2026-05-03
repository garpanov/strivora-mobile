import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';
import { ComponentProps } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

type InfoItem = {
  icon: IoniconsName;
  title: string;
  subtitle: string;
};

type Props = {
  items: InfoItem[];
};

export default function InfoCards({ items }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.iconWrapper}>
            <Ionicons name={item.icon} size={22} color="#8BF1E6" />
          </View>
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#131313',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#rgba(139, 241, 230, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  subtitle: {
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 2,
  },
});