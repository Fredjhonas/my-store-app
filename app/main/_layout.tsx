import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from '.';
import { MainStackParamList } from '../types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const { closeSession } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerLeft: () => <ThemedText type="subtitle">My Store</ThemedText>,
          headerRight: () => <Button title="Salir" onPress={closeSession} />,
        }}
      />
    </Stack.Navigator>
  );
}
