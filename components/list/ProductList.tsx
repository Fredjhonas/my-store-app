import { EMPTY_PRODUCT_LIST } from '@/constants/Messages';
import { Product } from '@/models/ProductModel';
import { Dimensions, FlatList, ImageStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import ImageLoader from '../ui/ImageLoader';

type ProductListProps = {
  products: Product[];
  isEmpty: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onPressItem: (itemId: number) => void;
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

const ProductList = ({
  products,
  isEmpty,
  isRefreshing,
  onRefresh,
  onPressItem,
}: ProductListProps) => {
  const renderEmptyComponent = () => {
    if (!isEmpty) return null;

    return (
      <View style={$emptyContainer}>
        <ThemedText type="subtitle">{EMPTY_PRODUCT_LIST}</ThemedText>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity style={$itemStyle} onPress={() => onPressItem(item.id)}>
        <ImageLoader imageUrl={item.image} style={$imageStyle} />
        <ThemedText
          style={{ fontWeight: 'bold', fontSize: 16 }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </ThemedText>
        <ThemedText type="subtitle">${item.price}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      testID="product-list"
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      contentContainerStyle={$listContainer}
      ListEmptyComponent={renderEmptyComponent}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      ListHeaderComponent={
        <ThemedText type="title" style={{ textAlign: 'center', marginVertical: 10 }}>
          Listado de Productos
        </ThemedText>
      }
    />
  );
};

export default ProductList;

const $itemStyle: ViewStyle = {
  padding: 20,
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 10,
  width: '45%',
  gap: 10,
};

const $imageStyle: ImageStyle = {
  width: '100%',
  height: SCREEN_HEIGHT * 0.2,
  borderRadius: 10,
};

const $listContainer: ViewStyle = {
  padding: 10,
  flexGrow: 1,
  paddingBottom: 20,
};

const $emptyContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
