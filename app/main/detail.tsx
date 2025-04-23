import { useGetProductDetail } from '@/api/queries/product-detail';
import { useAlert } from '@/hooks/useAlert';
import { Product } from '@/models/ProductModel';
import { useAppSelector } from '@/store/hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MainStackParamList } from '../types';

const DetailScreen = () => {
  const { params } = useRoute<RouteProp<MainStackParamList, 'Detail'>>();
  const productId = params?.id || '';
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  // Custom hook to fetch product details
  const { isGetDetailPending, getProductDetail } = useGetProductDetail();
  const { showAlert } = useAlert();
  const products = useAppSelector((state) => state.productList.products);

  const getProductStoreDetail = () => {
    if (products.length === 0) {
      showErrorMessage();
      return;
    }
    const product = products.find((item) => item.id.toString() === productId);
    if (product) setProductDetail(product);
  };

  const showErrorMessage = () => {
    showAlert({
      title: 'Oops!',
      message: 'Error al obtener los detalles del producto',
      type: 'warning',
    });
  };

  const handleSuccess = (res: Product) => {
    if (res?.id) {
      setProductDetail(res);
    } else getProductStoreDetail();
  };

  const handleGetProductDetail = async () => {
    getProductDetail(productId)
      .then((res) => handleSuccess(res))
      .catch(() => getProductStoreDetail());
  };

  useEffect(() => {
    if (productId?.length > 0) handleGetProductDetail();
  }, [productId]);

  if (isGetDetailPending) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Detail {productDetail?.title} </Text>
    </View>
  );
};

export default DetailScreen;
