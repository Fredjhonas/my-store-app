import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import queryClient from '@/api/queryClient';
import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/store';
import { selectIsLoggedIn } from '@/store/userSlice';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import AuthStack from './auth/_layout';
import MainStack from './main/_layout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    const subscription = store.subscribe(() => {
      const state = store.getState();
      const loggedIn = selectIsLoggedIn(state);
      setIsLoggedIn(loggedIn);
    });

    return () => {
      subscription();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {isLoggedIn ? <MainStack /> : <AuthStack />}
          <StatusBar style="dark" />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
