import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        contentStyle: { backgroundColor: '#0d0d0d' },
        headerStyle: { backgroundColor: '#0d0d0d' },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen 
  name="index" 
  options={{ 
    title: 'Сповіщення',
    headerLeft: () => (
      <TouchableOpacity 
        onPress={() => router.dismiss()}
        style={{ paddingHorizontal: 5 }}
      >
        <Ionicons name="close" size={24} color="#ffffff" />
      </TouchableOpacity>
    ),
  }} 
/>
      <Stack.Screen 
        name="[id]" 
        options={{ title: 'Деталі' }} 
      />
    </Stack>
  );
}