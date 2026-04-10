import api from './api';
import type { AuthCredentials, AuthResponse } from '../types';

export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const signup = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/signup', credentials);
  return response.data;
};
