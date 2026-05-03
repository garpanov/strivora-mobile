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

import { colors, spacing } from '@/components/main/design-tokens';
import Return from '@/components/menu/return';
import FAQHeader from '@/components/menu/faq/headerFAQ';
import VoiceInputCard from '@/components/menu/faq/voiceFAQ';
import FinanceCard from '@/components/menu/faq/financeFAQ';
import StatisticsCard from '@/components/menu/faq/statisticsFAQ';


export default function FAQScreen() {

    return (
      <View style={styles.screen}>
        <Return></Return>

   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          
        >
          <FAQHeader></FAQHeader>
          <VoiceInputCard />
          <FinanceCard />
          <StatisticsCard />
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    marginVertical: 15,
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: 20,
  },
  voiceWrap: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});