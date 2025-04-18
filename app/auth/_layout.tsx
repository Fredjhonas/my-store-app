import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import LoginScreen from './login';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
