import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/ui/theme';
const icons: Record<string, keyof typeof Ionicons.glyphMap> = { index: 'home', train: 'fitness', calendar: 'calendar', progress: 'stats-chart', profile: 'person' };
export default function TabLayout() { return <Tabs screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.orange, tabBarInactiveTintColor: '#77777F', tabBarStyle: { backgroundColor: '#141417', borderTopColor: '#2A2A30', height: 66, paddingTop: 8, paddingBottom: 8 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }, tabBarIcon: ({ color, size }) => <Ionicons name={icons[route.name] ?? 'ellipse'} size={size} color={color}/> })}><Tabs.Screen name="index" options={{ title: 'Home' }}/><Tabs.Screen name="train" options={{ title: 'Train' }}/><Tabs.Screen name="calendar" options={{ title: 'Calendar' }}/><Tabs.Screen name="progress" options={{ title: 'Progress' }}/><Tabs.Screen name="profile" options={{ title: 'Profile' }}/></Tabs>; }

