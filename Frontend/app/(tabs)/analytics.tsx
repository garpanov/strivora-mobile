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
import HeaderAnalytics from '@/components/analytics/headerAnalytics';
import DayFilterBar from '@/components/analytics/filter';
import FinanceWidget from '@/components/analytics/financeCheck';
import AiTipsCard from '@/components/analytics/aiTips';
import TaskCompletionWidget from '@/components/analytics/analyzeTasks';
import AnnualCharacteristics from '@/components/analytics/annualCharacteristics';

export default function AnalyticsScreen() {

    return (
      <View style={styles.screen}>
        <Header/>
   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          
        >
          <HeaderAnalytics />

          <DayFilterBar onFilterChange={(filter) => console.log(filter)} />

          <FinanceWidget amount={12400} />

          <AiTipsCard
            tips={[
              {
                title: "Ваш пік продуктивності — 10:00.",
                description: "Перенесіть «Складні Завдання» з вечора на ранок. Ви втрачаєте 2 години в TikTok саме після 21:00.",
              },
              {
                title: "Скоротіть соцмережі на 30хв.",
                description: "Це вивільнить час для вашої цілі «Вивчення мови», яку ви відкладали 4 дні.",
              },
            ]}
            onOptimize={() => console.log("optimize")}
          />

          <TaskCompletionWidget
            month="Лютий"
            year={2024}
            totalDays={29}
            dayData={{
              1:  { done: 5, total: 5 },
              2:  { done: 3, total: 6 },
              3:  { done: 1, total: 4 },
              4:  { done: 0, total: 5 },
              5:  { done: 4, total: 7 },
              6:  { done: 2, total: 5 },
              7:  { done: 6, total: 6 },
              8:  { done: 3, total: 8 },
              9:  { done: 1, total: 3 },
              10: { done: 0, total: 4 },
              11: { done: 5, total: 5 },
              12: { done: 4, total: 6 },
              13: { done: 2, total: 7 },
              14: { done: 3, total: 5 },
              15: { done: 0, total: 0 },
              16: { done: 1, total: 6 },
              17: { done: 0, total: 3 },
              18: { done: 4, total: 5 },
              19: { done: 6, total: 7 },
              20: { done: 3, total: 4 },
              21: { done: 2, total: 6 },
              22: { done: 1, total: 5 },
              23: { done: 7, total: 8 },
              24: { done: 4, total: 4 },
              25: { done: 0, total: 6 },
              26: { done: 3, total: 7 },
              27: { done: 0, total: 0 },
              28: { done: 5, total: 6 },
              29: { done: 4, total: 8 },
            }}
            discipline={84}
            skipped={12}
          />  

          <AnnualCharacteristics tags={["#Тег1", "#Тег2"]} />
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