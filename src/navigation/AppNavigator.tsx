import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../features/records/HomeScreen';
import AddRecordScreen from '../features/records/AddRecordScreen';
import HistoryScreen from '../features/records/HistoryScreen';
import DailyRecordScreen from '../features/records/DailyRecordScreen';
import EditRecordScreen from '../features/records/EditRecordScreen';
import WelcomeScreen from '../features/welcome/WelcomeScreen';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRecord" component={AddRecordScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="DailyRecord" component={DailyRecordScreen} />
        <Stack.Screen name="EditRecord" component={EditRecordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
