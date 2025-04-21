import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import client from '../client';

type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const useAuthLogin = () => {
  const { saveSession } = useAuth();

  const handleLogin = async ({ username, password }: LoginParams) => {
    return client
      .post('auth/login', {
        username,
        password,
      })
      .then((res) => {
        saveSession(res.data.token);
        return { token: res.data.token };
      })
      .catch((error) => {
        throw error.response;
      });
  };

  const { isPending, mutate } = useMutation<LoginResponse, AxiosError, LoginParams>({
    mutationFn: handleLogin,
  });

  return {
    isLoginPending: isPending,
    loginRequest: mutate,
  };
};
