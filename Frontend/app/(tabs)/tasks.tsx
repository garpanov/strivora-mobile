import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';    

import { colors, spacing } from '@/components/main/design-tokens';
import Header from '@/components/header';
import HeaderTask from '@/components/tasks/headersTask';
import TaskFilterBar from '@/components/tasks/filter';
import VoiceInputCard from '@/components/tasks/createVoice';
import TaskCard from '@/components/tasks/task';
import { TaskPriority } from '@shared/types';

export default function TaskScreen() {

    return (
      <View style={styles.screen}>
        <Header/>
   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          
        >
          <HeaderTask
          />

          <TaskFilterBar
            onFilterChange={(filter) => console.log('Selected filter:', filter)}
          />

          <VoiceInputCard
            text="Запланувати аналіз особистої ефективності на завтра о 10 ранку та підготувати звіт для Stoic Lens"
            date="ЗАВТРА"
            time="10:00"
            onAdd={() => console.log('Task added')}
            onClose={() => console.log('Card closed')}
          />


          <TaskCard
            priority={TaskPriority.Low}
            title="Медитація та рефлексія"
            description="Основна практика самоконтролю на сьогодні. Необхідно 20 хвилин глибокого зосередження."
            timeLeft="2 години"
            onDone={() => console.log('done')}
          />

          <TaskCard
            priority={TaskPriority.High}
            title="Медитація та рефлексія"
            description="Основна практика самоконтролю на сьогодні. Необхідно 20 хвилин глибокого зосередження."
            timeLeft="2 години"
            onDone={() => console.log('done')}
          />

          <TaskCard
            priority={TaskPriority.Medium}
            title="Медитація та рефлексія"
            description="Основна практика самоконтролю на сьогодні. Необхідно 20 хвилин глибокого зосередження."
            timeLeft="2 години"
            onDone={() => console.log('done')}
          />

          <TaskCard
            title="Перегляд логів"
            description="Проаналізувати записи за минулий тиждень для виявлення патернів."
            scheduledTime="14:00"
            completed
          />

        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  bottomSpacer: {
    height: 100,
  },
  voiceWrap: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});