import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TaskDescriptionInput() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleVoicePress = () => {
    setIsRecording((prev) => !prev);
    // TODO: підключити реальний запис голосу
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ОПИС ЗАВДАННЯ</Text>
        <View style={styles.container_second}>


        <TextInput
            style={styles.input}
            placeholder="Про що ви думаєте?"
            placeholderTextColor="#555"
            maxLength={1000}
            multiline
            value={text}
            onChangeText={setText}
        />

        <TouchableOpacity
            style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
            onPress={handleVoicePress}
            activeOpacity={0.8}
        >
            <Ionicons
            name={isRecording ? 'stop-circle' : 'mic'}
            size={20}
            color="#003733"
            />
            <Text style={styles.voiceButtonText}>
            {isRecording ? 'Зупинити' : 'Записати голосом'}
            </Text>
        </TouchableOpacity>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  container_second: {
    backgroundColor: '#131313ff',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    marginLeft: 10,
    color: '#aaa',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  input: {
    borderRadius: 10,
    padding: 14,
    color: '#fff',
    fontSize: 18,
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#8BF1E6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
  },
  voiceButtonActive: {
    backgroundColor: '#ff6b6b',
  },
  voiceButtonText: {
    color: '#111',
    fontWeight: '700',
    fontSize: 15,
  },
});