import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
} from 'react-native';

interface TransactionInputProps {
  onChange?: (value: string) => void;
}

export const TransactionInput: React.FC<TransactionInputProps> = ({ onChange }) => {
  const inputRef = useRef<TextInput>(null);
  const [value, setValue] = useState('');

  const handleChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, '');
    setValue(digits);
    onChange?.(digits);
  };

  return (
    <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.card}>
        <View style={styles.topGradientLine} />

        <Text style={styles.label}>Сума транзакції</Text>

        <View style={styles.inputRow}>
            <TextInput
            ref={inputRef}
            style={styles.amountInput}
            placeholder="0"
            placeholderTextColor="#8bf1e78f"
            keyboardType="number-pad"
            value={value}
            onChangeText={handleChange}
            maxLength={6}
            selectionColor="#8BF1E6"
            cursorColor="#8BF1E6"
            />
            {/* Currency symbol ₴ */}
            <Text style={styles.currency}>₴</Text>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 220,
    backgroundColor: 'rgba(31, 31, 31, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: 40,
    gap: 24,
    shadowColor: '#8BF1E6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  topGradientLine: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    height: 4,
    backgroundColor: 'rgba(139, 241, 230, 0.12)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Manrope' : 'Manrope-Bold',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: 'rgba(189, 201, 198, 0.6)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flex: 1,
  },
  amountInput: {
    flex: 1,
    fontWeight: '300',
    fontSize: 52,
    letterSpacing: -3.6,
    color: '#8BF1E6',
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  currency: {
    fontFamily: Platform.OS === 'ios' ? 'Manrope' : 'Manrope-Light',
    fontWeight: '300',
    fontSize: 30,
    lineHeight: 36,
    color: 'rgba(189, 201, 198, 0.4)',
    marginBottom: 6,
    marginLeft: 8,
  },
});