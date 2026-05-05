import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// Фіксований розмір клітинки — щоб круг був ідеальним
const CAL_PADDING = 20;
const CELL_SIZE = Math.floor((width - CAL_PADDING * 2) / 7);

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const MONTHS = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];

type Option = 'today' | 'tomorrow' | 'week' | 'date';

interface WhenPickerProps {
  onSelect?: (value: { type: Option; date?: Date }) => void;
}

export default function WhenPicker({ onSelect }: WhenPickerProps) {
  const [selected, setSelected] = useState<Option | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [pickedDate, setPickedDate] = useState<Date | null>(null);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openCalendar = () => {
    setShowCalendar(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeCalendar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setShowCalendar(false));
  };

  const handleOption = (type: Option) => {
    setSelected(type);
    if (type === 'date') {
      openCalendar();
    } else {
      const date = new Date();
      if (type === 'tomorrow') date.setDate(date.getDate() + 1);
      onSelect?.({ type, date });
    }
  };

  const handleDatePick = (day: number) => {
    const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    setPickedDate(date);
    onSelect?.({ type: 'date', date });
    closeCalendar();
  };

  const prevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    // Convert Sunday=0 to Monday=0
    const startOffset = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { startOffset, daysInMonth };
  };

  const { startOffset, daysInMonth } = getDaysInMonth();
  const today = new Date();

  const options: { type: Option; label: string; icon: string }[] = [
    { type: 'today', label: 'Сьогодні', icon: 'today-outline' },
    { type: 'tomorrow', label: 'Завтра', icon: 'refresh-outline' },
    { type: 'week', label: 'На тиждень', icon: 'reorder-four-outline' },
    { type: 'date', label: pickedDate ? formatDate(pickedDate) : 'Обрати дату', icon: 'calendar-outline' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>КОЛИ?</Text>

      <View style={styles.grid}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.type}
            style={[
              styles.card,
              selected === opt.type && styles.cardSelected,
            ]}
            onPress={() => handleOption(opt.type)}
            activeOpacity={0.75}
          >
            <Ionicons
              name={opt.icon as any}
              size={28}
              color={selected === opt.type ? '#4DD9C0' : '#ccc'}
            />
            <Text style={[styles.cardLabel, selected === opt.type && styles.cardLabelSelected]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Modal */}
      <Modal visible={showCalendar} transparent animationType="none">
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={closeCalendar} />
          <Animated.View
            style={[styles.calendar, { transform: [{ translateY: slideAnim }] }]}
          >
            {/* Header */}
            <View style={styles.calHeader}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.calMonthTitle}>
                {MONTHS[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Day names */}
            <View style={styles.dayNames}>
              {DAYS.map((d) => (
                <Text key={d} style={styles.dayName}>{d}</Text>
              ))}
            </View>

            {/* Days grid */}
            <View style={styles.daysGrid}>
              {Array.from({ length: startOffset }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.dayCellWrapper} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const cellDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                const isToday = cellDate.getTime() === todayStart.getTime();
                const isPast = cellDate < todayStart;
                const isPicked =
                  pickedDate &&
                  day === pickedDate.getDate() &&
                  calendarDate.getMonth() === pickedDate.getMonth() &&
                  calendarDate.getFullYear() === pickedDate.getFullYear();

                return (
                  <TouchableOpacity
                    key={day}
                    style={styles.dayCellWrapper}
                    onPress={() => !isPast && handleDatePick(day)}
                    activeOpacity={isPast ? 1 : 0.7}
                    disabled={isPast}
                  >
                    <View
                      style={[
                        styles.dayCircle,
                        isToday && styles.dayCellToday,
                        isPicked && styles.dayCellPicked,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isPast && styles.dayTextPast,
                          isToday && styles.dayTextToday,
                          isPicked && styles.dayTextPicked,
                        ]}
                      >
                        {day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={closeCalendar}>
              <Text style={styles.closeBtnText}>Закрити</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

function formatDate(date: Date) {
  return `${date.getDate()} ${['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'][date.getMonth()]}`;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  title: {
    color: '#aaa',
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: (width - 82) / 2,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: '#4DD9C0',
    backgroundColor: '#1a2e2b',
  },
  cardLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardLabelSelected: {
    color: '#4DD9C0',
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  calendar: {
    backgroundColor: '#1c1c1e',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  calMonthTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  navBtn: {
    padding: 6,
  },
  dayNames: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  dayName: {
    width: CELL_SIZE,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // Wrapper займає рівну частину рядка
  dayCellWrapper: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Сам круг — фіксований квадрат із borderRadius
  dayCircle: {
    width: CELL_SIZE - 8,
    height: CELL_SIZE - 8,
    borderRadius: (CELL_SIZE - 8) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellToday: {
    backgroundColor: '#2a2a2a',
  },
  dayCellPicked: {
    backgroundColor: '#4DD9C0',
  },
  dayText: {
    color: '#ddd',
    fontSize: 15,
  },
  dayTextPast: {
    color: '#444',
  },
  dayTextToday: {
    color: '#fff',
    fontWeight: '700',
  },
  dayTextPicked: {
    color: '#000',
    fontWeight: '700',
  },
  closeBtn: {
    marginTop: 18,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#2a2a2a',
    borderRadius: 14,
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});