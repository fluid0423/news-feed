import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { FeedScreen } from './src/screens/FeedScreen';
import { CATEGORIES, FeedCategory } from './src/constants/feeds';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<FeedCategory, string> = {
  뉴스: '📰',
  스포츠: '⚽',
  연예: '🎬',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: '#ffffff' },
            headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            tabBarStyle: { backgroundColor: '#ffffff', borderTopColor: '#e5e7eb' },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarIcon: ({ focused }) => (
              <Text style={{ fontSize: focused ? 22 : 20 }}>
                {TAB_ICONS[route.name as FeedCategory]}
              </Text>
            ),
          })}
        >
          {CATEGORIES.map((category) => (
            <Tab.Screen
              key={category}
              name={category}
              children={() => <FeedScreen category={category} />}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
