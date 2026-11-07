import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/state/AppContext';

export default function RootLayout() {
  return <AppProvider><StatusBar style="light"/><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#09090B' }, animation: 'fade' }}><Stack.Screen name="(tabs)"/><Stack.Screen name="onboarding"/><Stack.Screen name="movement/[id]"/><Stack.Screen name="workout"/><Stack.Screen name="coach"/><Stack.Screen name="fuel"/><Stack.Screen name="rewards"/><Stack.Screen name="settings"/></Stack></AppProvider>;
}

