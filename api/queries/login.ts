import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/userSlice';
import { useMutation } from '@tanstack/react-query';
import client from '../client';

type LoginParams = {
  username: string;
  password: string;
};

export const useAuthLogin = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async ({ username, password }: LoginParams) => {
    return client
      .post('auth/login', {
        username,
        password,
      })
      .then((res) => {
        dispatch(setUser(res.data));
      })
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
