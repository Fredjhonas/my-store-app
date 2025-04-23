import { useMutation } from '@tanstack/react-query';
import client from '../client';

export const useGetProductDetail = () => {
  const handleGetProductDetail = async (id: string) => {
    return client
      .get(`products/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response;
      });
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: handleGetProductDetail,
  });

  return {
    isGetDetailPending: isPending,
    getProductDetail: mutateAsync,
  };
};
