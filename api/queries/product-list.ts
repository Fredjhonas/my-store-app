import { ERROR_GET_PRODUCT_LIST } from '@/constants/Messages';
import { useAlert } from '@/hooks/useAlert';
import { store } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { selectProducts, setProducts } from '@/store/productListSlice';
import { useMutation } from '@tanstack/react-query';
import client from '../client';

export const useGetProducts = () => {
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();

  const handleGetProducts = async () => {
    return client
      .get('products')
      .then((res) => {
        const products = res.data;
        dispatch(setProducts(products));
        return products;
      })
      .catch((error) => {
        const state = store.getState();
        const storeProducts = selectProducts(state);
        if (storeProducts.length > 0) {
          return;
        }

        showAlert({
          title: 'Oops!',
          message: ERROR_GET_PRODUCT_LIST,
          type: 'warning',
        });

        throw error.response;
      });
  };

  const { isPending, mutateAsync } = useMutation({
    mutationFn: handleGetProducts,
  });

  return {
    isGetProductsPending: isPending,
    getProducts: mutateAsync,
  };
};
