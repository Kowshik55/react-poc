import { all, call, put, takeLatest } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import { login } from '../services/authService';
import {
  loginRequest,
  loginSuccess,
  loginFailure
} from './authSlice';
import {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productService';
import {
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
  deleteProductFailure
} from './productSlice';

function* handleLogin(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const response = yield call(login, action.payload);
    localStorage.setItem('token', response.token);
    yield put(loginSuccess(response.token));
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message || 'Login failed'));
  }
}

function* handleFetchProducts(action: ReturnType<typeof fetchProductsRequest>): SagaIterator {
  try {
    const page = action.payload?.page || 1;
    const limit = action.payload?.limit || 10;
    const response = yield call(fetchProducts, page, limit);
    yield put(fetchProductsSuccess({ items: response.data, pagination: response.pagination }));
  } catch (error: any) {
    yield put(fetchProductsFailure(error?.response?.data?.message || 'Failed to load products'));
  }
}

function* handleFetchProduct(action: ReturnType<typeof fetchProductRequest>): SagaIterator {
  try {
    const product = yield call(fetchProductById, action.payload);
    yield put(fetchProductSuccess(product));
  } catch (error: any) {
    yield put(fetchProductsFailure(error?.response?.data?.message || 'Failed to load product'));
  }
}

function* handleCreateProduct(action: ReturnType<typeof createProductRequest>): SagaIterator {
  try {
    yield call(createProduct, action.payload);
    yield put(createProductSuccess());
    yield put(fetchProductsRequest({ page: 1, limit: 5 }));
  } catch (error: any) {
    yield put(createProductFailure(error?.response?.data?.message || 'Failed to create product'));
  }
}

function* handleUpdateProduct(action: ReturnType<typeof updateProductRequest>): SagaIterator {
  try {
    yield call(updateProduct, action.payload.id, action.payload.data);
    yield put(updateProductSuccess());
    yield put(fetchProductsRequest({ page: 1, limit: 5 }));
  } catch (error: any) {
    yield put(updateProductFailure(error?.response?.data?.message || 'Failed to update product'));
  }
}

function* handleDeleteProduct(action: ReturnType<typeof deleteProductRequest>): SagaIterator {
  try {
    yield call(deleteProduct, action.payload);
    yield put(deleteProductSuccess());
    yield put(fetchProductsRequest({ page: 1, limit: 5 }));
  } catch (error: any) {
    yield put(deleteProductFailure(error?.response?.data?.message || 'Failed to delete product'));
  }
}

export default function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(loginRequest.type, handleLogin),
    takeLatest(fetchProductsRequest.type, handleFetchProducts),
    takeLatest(fetchProductRequest.type, handleFetchProduct),
    takeLatest(createProductRequest.type, handleCreateProduct),
    takeLatest(updateProductRequest.type, handleUpdateProduct),
    takeLatest(deleteProductRequest.type, handleDeleteProduct)
  ]);
}
