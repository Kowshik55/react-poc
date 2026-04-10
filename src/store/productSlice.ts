import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product, PaginationInfo } from '../types';

interface ProductState {
  items: Product[];
  selected: Product | null;
  pagination: PaginationInfo | null;
  loading: boolean;
  created: boolean;
  updated: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selected: null,
  pagination: null,
  loading: false,
  created: false,
  updated: false,
  error: null
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest(state, action: PayloadAction<{ page?: number; limit?: number }>) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<{ items: Product[]; pagination: PaginationInfo }>) {
      state.items = action.payload.items;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action: PayloadAction<Product>) {
      state.selected = action.payload;
      state.loading = false;
    },
    createProductRequest(state, action: PayloadAction<Omit<Product, 'id'>>) {
      state.loading = true;
      state.error = null;
      state.created = false;
      state.updated = false;
    },
    createProductSuccess(state) {
      state.loading = false;
      state.created = true;
      state.updated = false;
      state.pagination = null;
    },
    createProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.created = false;
      state.updated = false;
    },
    updateProductRequest(state, action: PayloadAction<{ id: number; data: Omit<Product, 'id'> }>) {
      state.loading = true;
      state.error = null;
      state.updated = false;
      state.created = false;
    },
    updateProductSuccess(state) {
      state.loading = false;
      state.updated = true;
      state.created = false;
      state.pagination = null;
    },
    updateProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.updated = false;
      state.created = false;
    },
    deleteProductRequest(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state) {
      state.loading = false;
    },
    deleteProductFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSelectedProduct(state) {
      state.selected = null;
    },
    clearCreated(state) {
      state.created = false;
      state.updated = false;
      state.error = null;
    }
  }
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductRequest,
  fetchProductSuccess,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  clearSelectedProduct,
  clearCreated
} = productSlice.actions;

export const productReducer = productSlice.reducer;
export default productReducer;
