import { store } from '@/store';
import { selectIsLoggedIn, setUser } from '@/store/userSlice';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

const SECURE_TOKEN_KEY = 'my_store_token';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = store.subscribe(() => {
      const state = store.getState();
      const loggedIn = selectIsLoggedIn(state);
      setIsAuthenticated(loggedIn);
    });

    return () => {
      subscription();
    };
  }, []);

  const checkToken = async () => {
    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync(SECURE_TOKEN_KEY);
      if (token) {
        setIsAuthenticated(true);
        store.dispatch(setUser({ token }));
      } else {
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveSession = async (token: string) => {
    await SecureStore.setItemAsync(SECURE_TOKEN_KEY, token);
    setIsAuthenticated(true);
    store.dispatch(setUser({ token }));
  };

  const closeSession = async () => {
    await SecureStore.deleteItemAsync(SECURE_TOKEN_KEY);
    setIsAuthenticated(false);
    store.dispatch(setUser(null));
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    saveSession,
    closeSession,
  };
};
