import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '.';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
