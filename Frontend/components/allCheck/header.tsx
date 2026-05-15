import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TransactionHeader() {
  return (
    <View style={styles.header}>
        <Text style={styles.label}>ОГЛЯД ФІНАНСІВ</Text>

        <Text style={styles.title}>{"Історія"}</Text>
        <Text style={styles.subtitle}>{"Транзакцій"}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
  },
  label: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(139, 241, 230, 0.6)',
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '300',
    fontSize: 46,
    letterSpacing: -0.9,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'Manrope',
    fontWeight: '400',
    fontSize: 54,
    letterSpacing: -0.9,
    color: '#8BF1E6',
  },
});