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
import HeaderSettings from '@/components/menu/settings/headerSettings';
import RegionalSettings from '@/components/menu/settings/regionSettings';
import NotificationsCard from '@/components/menu/settings/notificationSettings';
import SystemSettings from '@/components/menu/settings/systemSettings';
import ObstacleScreen from '@/components/menu/settings/textBottomSettings';


export default function ProfileScreen() {

    return (
      <View style={styles.screen}>
        <Return></Return>

   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          
        >
            <HeaderSettings />

            <RegionalSettings
              country="UA"
              language="uk"
              onCountryChange={(code) => console.log('Selected country:', code)}
              onLanguageChange={(lang) => console.log('Selected language:', lang)}
            />

            <NotificationsCard />

            <SystemSettings />
            <ObstacleScreen />
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