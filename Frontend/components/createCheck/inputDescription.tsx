import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  onChange: (text: string) => void;
  error: boolean;
}

export default function DescriptionSection({ onChange, error }: Props) {

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
          onChangeText={onChange}
          multiline
          textAlignVertical="top"
        />
      </View>
      {error && <Text style={styles.errorText}>Це поле є обов'язковим</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
    gap: 2,
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

  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
    fontWeight: '500',
  },
});