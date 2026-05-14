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

const CAL_PADDING = 20;
const CELL_SIZE = Math.floor((width - CAL_PADDING * 2) / 7);

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const MONTHS = [
  'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
  'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень',
];
const MONTHS_SHORT = [
  'січ', 'лют', 'бер', 'кві', 'тра', 'чер',
  'лип', 'сер', 'вер', 'жов', 'лис', 'гру',
];

interface WhenPickerProps {
  onSelect?: (value: { date: Date }) => void;
  date?: Date;
}

export default function WhenPicker({ onSelect, date }: WhenPickerProps) {
  const [pickedDate, setPickedDate] = useState<Date | null>(date ?? null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(date ?? new Date());

  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openCalendar = () => {
    setShowCalendar(true);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 350, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const closeCalendar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 300, duration: 280, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setShowCalendar(false));
  };

  const handleDatePick = (day: number) => {
    const picked = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    setPickedDate(picked);
    onSelect?.({ date: picked });
    closeCalendar();
  };

  const prevMonth = () =>
    setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const nextMonth = () =>
    setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const monthAgo = new Date(todayStart);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>КОЛИ?</Text>

      <TouchableOpacity
        style={[styles.card, pickedDate && styles.cardSelected]}
        onPress={openCalendar}
        activeOpacity={0.75}
      >
        <Ionicons
          name="calendar-outline"
          size={28}
          color={pickedDate ? '#4DD9C0' : '#ccc'}
        />
        <Text style={[styles.cardLabel, pickedDate && styles.cardLabelSelected]}>
          {pickedDate ? formatDate(pickedDate) : 'Обрати дату'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent animationType="none">
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={closeCalendar} />

          <Animated.View style={[styles.calendar, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.calHeader}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.calMonthTitle}>
                {MONTHS[month]} {year}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
                <Ionicons name="chevron-forward" size={22} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.dayNames}>
              {DAYS.map(d => (
                <Text key={d} style={styles.dayName}>{d}</Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {Array.from({ length: startOffset }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.dayCellWrapper} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const cellDate = new Date(year, month, day);
                const isToday = cellDate.getTime() === todayStart.getTime();
                const isPast = cellDate < monthAgo;
                const isPicked =
                  pickedDate &&
                  pickedDate.getDate() === day &&
                  pickedDate.getMonth() === month &&
                  pickedDate.getFullYear() === year;

                return (
                  <TouchableOpacity
                    key={day}
                    style={styles.dayCellWrapper}
                    onPress={() => handleDatePick(day)}
                    activeOpacity={0.7}
                    disabled={isPast}
                  >
                    <View style={[
                      styles.dayCircle,
                      isToday && styles.dayCellToday,
                      isPicked && styles.dayCellPicked,
                    ]}>
                      <Text style={[
                        styles.dayText,
                        isPast && styles.dayTextPast,
                        isToday && styles.dayTextToday,
                        isPicked && styles.dayTextPicked,
                      ]}>
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

function formatDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_SHORT[date.getMonth()]}`;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Manrope',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: 'rgba(189, 201, 198, 0.6)',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    paddingVertical: 22,
    paddingHorizontal: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  cardSelected: {
    borderColor: '#28695dff',

  },
  cardLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cardLabelSelected: {
    color: '#4DD9C0',
  },
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
  dayCellWrapper: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
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