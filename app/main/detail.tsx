import { useGetProductDetail } from '@/api/queries/product-detail';
import { ThemedText } from '@/components/ThemedText';
import ImageLoader from '@/components/ui/ImageLoader';
import { Colors } from '@/constants/Colors';
import { ERROR_GET_PRODUCT_DETAIL } from '@/constants/Messages';
import { useAlert } from '@/hooks/useAlert';
import { Product } from '@/models/ProductModel';
import { useAppSelector } from '@/store/hooks';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View, ViewStyle } from 'react-native';
import { MainStackParamList } from '../types';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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
      message: ERROR_GET_PRODUCT_DETAIL,
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={$containerStyle}>
      <ImageLoader imageUrl={productDetail?.image ?? ''} style={$imageStyle} />
      <View style={{ gap: 10, marginTop: 20 }}>
        <ThemedText type="title" style={{ fontWeight: 'bold' }}>
          {productDetail?.title}
        </ThemedText>
        <ThemedText type="subtitle">${productDetail?.price}</ThemedText>
        <View style={$descriptionContainer}>
          <ThemedText>{productDetail?.description}</ThemedText>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;

const $containerStyle: ViewStyle = {
  width: '85%',
  gap: 20,
  paddingVertical: 40,
  justifyContent: 'center',
  alignSelf: 'center',
};

const $imageStyle: ViewStyle = {
  width: '100%',
  height: SCREEN_HEIGHT * 0.4,
  borderRadius: 16,
  backgroundColor: 'white',
  padding: 40,
};

const $descriptionContainer: ViewStyle = {
  borderStyle: 'dashed',
  borderWidth: 1.5,
  borderColor: Colors.light.tint,
  marginVertical: 20,
  borderRadius: 10,
  padding: 15,
};
