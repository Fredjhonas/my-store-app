import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import HomeScreen from '.';
import { MainStackParamList } from '../types';
import DetailScreen from './detail';

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
          headerRight: () => (
            <Button title="Salir" color={Colors.light.error} onPress={closeSession} />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerTitle: 'Detalles',
          headerBackVisible: true,
          headerBackTitle: 'Volver',
          headerTintColor: '#333',
        }}
      />
    </Stack.Navigator>
  );
}
