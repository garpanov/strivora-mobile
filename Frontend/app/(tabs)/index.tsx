import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';

import { colors, spacing } from '@/components/main/design-tokens';
import Header from '@/components/header';
import HeroSection from '@/components/main/herosection';
import ActiveTasksCard from '@/components/main/ActiveTasks';
import FinanceCard from '@/components/main/FinanceCard';
import StatsRow from '@/components/main/stats';
import DigitalStoicismCard from '@/components/main/digitalstoick';
import { useTasksStore, Task } from '@/store/useTasksStore';
import { TaskPriority, TaskStatus } from '@shared/types';
import { getTasksEndingToday } from '@/utils/task.utils';
 
// ─────────────────────────────────────────────────────────────────────────────
 
export default function HomeScreen({ navigation }: any) {

  const tasks_start = useTasksStore((state) => state.tasks)

  const tasks = getTasksEndingToday(tasks_start);

  const STATS =
    { time_value: '1г 24х', energy_value: '84%' }
  ;

  return (
    <View style={styles.screen}>
      <Header
        onBellPress={() => navigation?.navigate?.('Notifications')}
        hasNotification
      />
 
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        
      >
        <HeroSection
          streakDays={14}
          aiInsight="Ви зберегли високу концентрацію протягом 6 годин. Екранний час зменшився на 12%. Ваша здатність відкладати миттєве задоволення наближається до рівня «Майстер»."
        />
 
        <ActiveTasksCard
          tasks={tasks}
          date="24 Жовт"
          onTaskPress={(task) => navigation?.navigate?.('TaskDetail', { taskId: task.id })}
        />

        <FinanceCard
          balance="₴42,800"
          changePercent="8.4%"
          changePeriod="Цього тижня"
        />

        <StatsRow stats={ STATS } />

        <DigitalStoicismCard
          text="Ви використовували Instagram на 40 хвилин менше, ніж зазвичай. Цей час було перенаправлено на «Навчання». Система зафіксувала стан потоку о 10:45 ранку."
          tags={['#Фокус', '#Дисципліна']}
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