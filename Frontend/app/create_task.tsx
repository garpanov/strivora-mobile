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
import HeaderCreateTask from '@/components/create_tasks/header';
import TaskDescriptionInput from '@/components/create_tasks/inputField';



export default function CreateTaskScreen() {

    return (
      <View style={styles.screen}>
        <Return></Return>

   
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ ...styles.content, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          
        >
            <HeaderCreateTask />
            <TaskDescriptionInput />
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