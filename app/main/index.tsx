import { useGetProducts } from '@/api/queries/product-list';
import ProductList from '@/components/list/ProductList';
import { Colors } from '@/constants/Colors';
import { useAppSelector } from '@/store/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { MainStackParamList } from '../types';

export default function HomeScreen() {
  const { getProducts, isGetProductsPending } = useGetProducts();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const products = useAppSelector((state) => state.productList.products);
  const isEmpty = products.length === 0 && !isGetProductsPending;
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  useFocusEffect(
    useCallback(() => {
      getProducts();
    }, [getProducts])
  );

  const handleRefresh = () => {
    if (!isGetProductsPending) {
      setIsRefreshing(true);
      getProducts().finally(() => setIsRefreshing(false));
    }
  };

  const handleGoToDetail = (productId: number) => {
    navigation.navigate('Detail', {
      id: productId.toString(),
    });
  };

  if (isGetProductsPending && !isRefreshing) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <ProductList
      products={products}
      isEmpty={isEmpty}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onPressItem={(productId) => handleGoToDetail(productId)}
    />
  );
}
