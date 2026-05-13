import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type StartText = {
  name?: string;
  onChange?: (name: string) => void;
  error?: boolean;
}

export default function TaskNameInput({ name, onChange, error }: StartText) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>НАЗВА</Text>
        <View style={styles.container_second}>
        <TextInput
            style={styles.input}
            placeholder="Введіть назву завдання"
            placeholderTextColor="#555"
            maxLength={1000}
            multiline
            value={name}
            onChangeText={onChange}
        />
        </View>
        {error && <Text style={styles.errorText}>Назва повинна бути від 3 до 100 символів</Text>}


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
    padding: 6,
    color: '#fff',
    fontSize: 18,
    minHeight: 20,
    textAlignVertical: 'top',

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
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
    fontWeight: '500',
  },
});