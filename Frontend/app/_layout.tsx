import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import "../language/i18n"

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0d0d0d',
    card: '#0d0d0d',
    border: '#0d0d0d',    
    notification: '#0d0d0d',
  },
};

export default function RootLayout() {
    const [loaded] = useFonts({
      'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
      'Inter-Bold':     require('../assets/fonts/Inter-Bold.ttf'),
      'Inter-Black':    require('../assets/fonts/Inter-Black.ttf'),
      'Inter-Medium':   require('../assets/fonts/Inter-Medium.ttf'),
    });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
  <View style={{ flex: 1, backgroundColor: '#0d0d0d' }}>
    <ThemeProvider value={MyTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false, 
          contentStyle: { backgroundColor: '#0d0d0d' },
          navigationBarColor: '#0d0d0d',
          animation: 'fade', 
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen 
          name="notifications" 
          options={{ presentation: 'modal', headerShown: false }} 
        />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="light" backgroundColor="#0d0d0d" />
    </ThemeProvider>
  </View>
);
}
