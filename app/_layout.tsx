import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import queryClient from '@/api/queryClient';
import AlertModal from '@/components/modal/AlertModal';
import { useAlert } from '@/hooks/useAlert';
import { useAuth } from '@/hooks/useAuth';
import { store } from '@/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import AuthStack from './auth/_layout';
import MainStack from './main/_layout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { isAuthenticated, isLoading } = useAuth();
  const { alert, visible, hideAlert } = useAlert();

  useEffect(() => {
    if (loaded && !isLoading) SplashScreen.hideAsync();
  }, [loaded, isLoading]);

  if (!loaded) return null;

  const alertProps = {
    visible,
    onClose: hideAlert,
    ...alert,
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <ThemeProvider value={DefaultTheme}>
            {isAuthenticated ? <MainStack /> : <AuthStack />}
            <AlertModal {...alertProps} />
            <StatusBar style="dark" />
          </ThemeProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
