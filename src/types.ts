export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  created_at?: string;
}

export interface ProductCreateRequest {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedProducts {
  data: Product[];
  pagination: PaginationInfo;
}
