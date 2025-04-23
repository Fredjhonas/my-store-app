import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';
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
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Image
                source={require('@/assets/images/my-store.png')}
                style={{ width: 40, height: 40 }}
              />
              <ThemedText type="subtitle">My Store</ThemedText>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={closeSession} style={$buttonStyle}>
              <ThemedText type="link" style={{ color: Colors.dark.error }}>
                Salir
              </ThemedText>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerTitle: 'Detalles',
          headerBackVisible: true,
          headerBackButtonDisplayMode: 'minimal',
          headerTitleAlign: 'center',
          headerTintColor: '#333',
        }}
      />
    </Stack.Navigator>
  );
}

const $buttonStyle: ViewStyle = {
  paddingHorizontal: 15,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: Colors.dark.error,
};
