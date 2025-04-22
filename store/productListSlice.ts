import { Product } from '@/models/ProductModel';
import { createSlice } from '@reduxjs/toolkit';

interface ProductListState {
  products: Product[];
}

const initialState: ProductListState = {
  products: [],
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { setProducts, clearProducts } = productListSlice.actions;
export default productListSlice.reducer;

export const selectProducts = (state: { productList: ProductListState }) =>
  state.productList.products;

export const selectProductById = (state: { productList: ProductListState }, id: number) =>
  state.productList.products.find((product) => product.id === id);
