import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '.';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
