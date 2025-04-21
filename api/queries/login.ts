import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import client from '../client';

type LoginParams = {
  username: string;
  password: string;
};

export const useAuthLogin = () => {
  const { saveSession } = useAuth();

  const handleLogin = async ({ username, password }: LoginParams) => {
    return client
      .post('auth/login', {
        username,
        password,
      })
      .then((res) => saveSession(res.data.token))
      .catch((error) => {
        throw error.response.data;
      });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: handleLogin,
  });

  return {
    isLoginPending: isPending,
    loginRequest: mutate,
  };
};
