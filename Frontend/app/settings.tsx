import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d', paddingTop: 60, paddingHorizontal: 20 }}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
      >
        <Ionicons name="arrow-back" size={24} color="#ffffff" />
        <Text style={{ color: '#ffffff', fontSize: 16 }}>Back</Text>
      </TouchableOpacity>

      <Text style={{ color: '#ffffff', fontSize: 24, marginTop: 32 }}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#030303ff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 24,
    gap: 14
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  body: {
    fontSize: 15,
    color: '#c3c6cf',
    lineHeight: 22,
  },
  tags: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#1c2022',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8bf1e6',
  },
});