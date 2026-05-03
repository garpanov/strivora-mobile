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
import ProfileHeader from '@/components/menu/headerProfile';
import PersonalInfoCard from '@/components/menu/userInfro';
import FocusSelector from '@/components/menu/userStatus';
import AuthStatusCard from '@/components/menu/authStatusCard';
import InfoCards from '@/components/menu/infoTechUser';


export default function ProfileScreen() {

    return (
      <View style={styles.screen}>
        <Return></Return>

   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          
        >
            <ProfileHeader />
            <PersonalInfoCard
                user={{
                    name: 'Олександр\nКоваленко',
                    id: '8829-STX',
                    birthDate: '14 Травня, 1992',
                    observationDays: 742,
                }}
                onEdit={() => console.log('edit')}
                />
            <FocusSelector />

            <AuthStatusCard
                email="alex.kovalenko.dev@gmail.com"
                onSecuritySettings={() => console.log('security')}
                onLogout={() => console.log('logout')}
                />

            <InfoCards
                items={[
                  { icon: 'server-outline', title: 'Сховище', subtitle: '12.4 GB використано' },
                  { icon: 'shield-checkmark-outline', title: 'Конфіденційність', subtitle: 'Шифрування E2E активоване' },
                  { icon: 'sync-outline', title: 'Синхронізація', subtitle: 'Щойно оновлено' },
                ]}
              />
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
    gap: spacing.md,
  },
  voiceWrap: {
    position: 'absolute',
    bottom: 96,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});