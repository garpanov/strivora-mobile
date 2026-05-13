import { router, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function taskLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0d0d0d' },
      }}
    >

      <Stack.Screen 
        name="[id]" 
      />
    </Stack>
  );
}