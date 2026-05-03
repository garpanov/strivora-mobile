import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import countries from 'i18n-iso-countries';
import ukLocale from 'i18n-iso-countries/langs/uk.json';

// Реєструємо українську локаль
countries.registerLocale(ukLocale);

export type Language = 'uk' | 'en' | 'ru';

export interface RegionalSettingsProps {
  country: string;           // ISO код країни, напр. "UA"
  language: Language;
  onCountryChange: (code: string) => void;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

// ─── Dropdown ────────────────────────────────────────────────────────────────

interface DropdownItem {
  code: string;
  label: string;
}

interface DropdownPickerProps {
  fieldLabel: string;
  selectedLabel: string;
  rightIcon: React.ComponentProps<typeof Ionicons>['name'];
  items: DropdownItem[];
  selectedCode: string;
  onSelect: (code: string) => void;
  searchable?: boolean;
}

function DropdownPicker({
  fieldLabel,
  selectedLabel,
  rightIcon,
  items,
  selectedCode,
  onSelect,
  searchable = false,
}: DropdownPickerProps) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  const close = () => {
    setVisible(false);
    setQuery('');
  };

  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{fieldLabel}</Text>

      <TouchableOpacity style={styles.selector} onPress={() => setVisible(true)} activeOpacity={0.7}>
        <Text style={styles.selectorText}>{selectedLabel}</Text>
        <Ionicons name={rightIcon} size={20} color="#7EECEA" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={close}>
          <View style={styles.dropdown}>
            {searchable && (
              <View style={styles.searchRow}>
                <Ionicons name="search" size={16} color="#888899" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Пошук країни..."
                  placeholderTextColor="#666677"
                  value={query}
                  onChangeText={setQuery}
                  autoFocus
                />
              </View>
            )}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const active = item.code === selectedCode;
                return (
                  <TouchableOpacity
                    style={[styles.dropdownItem, active && styles.dropdownItemActive]}
                    onPress={() => {
                      onSelect(item.code);
                      close();
                    }}
                  >
                    <Text style={[styles.dropdownItemText, active && styles.dropdownItemTextActive]}>
                      {item.label}
                    </Text>
                    {active && <Ionicons name="checkmark" size={18} color="#7EECEA" />}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RegionalSettings({
  country,
  language,
  onCountryChange,
  onLanguageChange,
}: RegionalSettingsProps) {

  // Будуємо список усіх країн з i18n-iso-countries (українською)
  const countryItems: DropdownItem[] = useMemo(() => {
    const obj = countries.getNames('uk', { select: 'official' });
    return Object.entries(obj)
      .map(([code, label]) => ({ code, label: `${label} (${code})` }))
      .sort((a, b) => a.label.localeCompare(b.label, 'uk'));
  }, []);

  const selectedCountryLabel =
    countryItems.find((c) => c.code === country)?.label ?? country;

  const selectedLanguageLabel =
    LANGUAGES.find((l) => l.code === language)?.label ?? language;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="earth" size={24} color="#7EECEA" />
        <Text style={styles.title}>РЕГІОНАЛЬНІ{'\n'}НАЛАШТУВАННЯ</Text>
      </View>

      {/* Country */}
      <DropdownPicker
        fieldLabel="РЕГІОН"
        selectedLabel={selectedCountryLabel}
        rightIcon="chevron-down"
        items={countryItems}
        selectedCode={country}
        onSelect={onCountryChange}
        searchable
      />

      {/* Language */}
      <DropdownPicker
        fieldLabel="МОВА ІНТЕРФЕЙСУ"
        selectedLabel={selectedLanguageLabel}
        rightIcon="globe-outline"
        items={LANGUAGES}
        selectedCode={language}
        onSelect={(code) => onLanguageChange(code as Language)}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2A2E',
    borderRadius: 16,
    padding: 24,
    gap: 20,
    marginVertical: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
    marginLeft: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
    lineHeight: 22,
  },
  fieldWrapper: {
    gap: 8,
  },
  fieldLabel: {
    color: '#888899',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3A3A40',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  selectorText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dropdown: {
    backgroundColor: '#2A2A2E',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3A3A40',
    maxHeight: 380,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A40',
    backgroundColor: '#222228',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A40',
  },
  dropdownItemActive: {
    backgroundColor: '#35353C',
  },
  dropdownItemText: {
    color: '#CCCCDD',
    fontSize: 15,
  },
  dropdownItemTextActive: {
    color: '#7EECEA',
    fontWeight: '600',
  },
});