import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import ProductList from '../list/ProductList';

describe('ProductList Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'image1.png',
      description: 'Description 1',
      category: 'Category 1',
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      image: 'image2.png',
      description: 'Description 2',
      category: 'Category 2',
      rating: { rate: 4.0, count: 200 },
    },
  ];

  it('renders correctly with products', () => {
    const { getByText } = render(
      <ProductList
        products={mockProducts}
        isEmpty={false}
        isRefreshing={false}
        onRefresh={jest.fn()}
        onPressItem={jest.fn()}
      />
    );

    mockProducts.forEach((product) => {
      expect(getByText(product.title)).toBeTruthy();
      expect(getByText(`$${product.price}`)).toBeTruthy();
    });
  });

  it('renders empty state when no products are provided', () => {
    const { getByText } = render(
      <ProductList
        products={[]}
        isEmpty={true}
        isRefreshing={false}
        onRefresh={jest.fn()}
        onPressItem={jest.fn()}
      />
    );

    expect(getByText('No hay productos disponibles')).toBeTruthy();
  });

  it('calls onRefresh when the list is pulled down', () => {
    const mockOnRefresh = jest.fn();
    const { getByTestId } = render(
      <ProductList
        products={mockProducts}
        isEmpty={false}
        isRefreshing={false}
        onRefresh={mockOnRefresh}
        onPressItem={jest.fn()}
      />
    );

    fireEvent(getByTestId('product-list'), 'refresh');
    expect(mockOnRefresh).toHaveBeenCalledTimes(1);
  });

  it('calls onPressItem when a product is pressed', () => {
    const mockOnPressItem = jest.fn();
    const { getByText } = render(
      <ProductList
        products={mockProducts}
        isEmpty={false}
        isRefreshing={false}
        onRefresh={jest.fn()}
        onPressItem={mockOnPressItem}
      />
    );

    fireEvent.press(getByText('Product 1'));
    expect(mockOnPressItem).toHaveBeenCalledWith(1);
  });

  it('matches snapshot', () => {
    const { toJSON } = render(
      <ProductList
        products={mockProducts}
        isEmpty={false}
        isRefreshing={false}
        onRefresh={jest.fn()}
        onPressItem={jest.fn()}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
