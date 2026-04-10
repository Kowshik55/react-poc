import api from './api';
import type { Product, ProductCreateRequest, PaginatedProducts } from '../types';

export const fetchProducts = async (page: number = 1, limit: number = 10): Promise<PaginatedProducts> => {
  const response = await api.get<PaginatedProducts>('/products', {
    params: { page, limit }
  });
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (payload: ProductCreateRequest): Promise<Product> => {
  const response = await api.post<Product>('/products', payload);
  return response.data;
};

export const updateProduct = async (id: number, payload: ProductCreateRequest): Promise<Product> => {
  const response = await api.put<Product>(`/products/${id}`, payload);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
