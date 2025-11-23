import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8080/api/v1';

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

http.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const url = (config.url || '').toString();
  const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
  
  // Thêm token xác thực vào header nếu có token và không phải endpoint auth
  if (accessToken && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  // Xử lý FormData: xóa Content-Type để browser tự động thêm boundary
  // Authorization header đã được set ở trên nên sẽ được giữ lại
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isUnauthorized = error?.response?.status === 401;
    const url = (originalRequest?.url || '').toString();
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');
    const refreshToken = localStorage.getItem('refreshToken');
    if (isUnauthorized && refreshToken && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const newAccess = res?.data?.data?.accessToken || res?.data?.accessToken;
        if (newAccess) {
          localStorage.setItem('accessToken', newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return http(originalRequest);
        }
      } catch (_) {
      }
    }
    return Promise.reject(error);
  }
);


export async function fetchCategories(page = 0, size = 10) {
  const response = await http.get(`/categories?page=${page}&size=${size}`);
  return response.data;
}

export async function createCategory(formData) {
  const response = await http.post('/categories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

export async function fetchProducts(page = 0, size = 10) {
  const response = await http.get(`/products?page=${page}&size=${size}`);
  return response.data;
}

export async function searchProducts({ keyword, page = 0, size = 10 }) {
  const response = await http.get('/products/search', {
    params: { keyword, page, size }
  });

  const payload = response.data;
  const list = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];
  return { list, raw: payload };
}

export async function getProductDetail(productId) {
  const response = await http.get(`/products/detail/${productId}`);
  return response.data;
}

export default http;


