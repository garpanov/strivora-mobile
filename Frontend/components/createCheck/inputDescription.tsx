import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function DescriptionSection() {
  const [note, setNote] = useState('');

  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>ОПИС</Text>
      </View>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Додати примітку..."
          placeholderTextColor="rgba(189, 201, 198, 0.3)"
          maxLength={100}
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
  },

  heading: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
  },

  headingText: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: 'rgba(189, 201, 198, 0.6)',
  },

  card: {
    alignSelf: 'stretch',
    padding: 24,
    minHeight: 130,
    backgroundColor: 'rgba(31, 31, 31, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
  },

  input: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(189, 201, 198, 1)',
    minHeight: 80,
    width: '100%',
  },
});