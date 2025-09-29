import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

export async function getProductsByCategory(categoryName) {
  // Adjust endpoint to match your Spring backend if needed
  // Example supports: GET /products?category=<name>
  const response = await api.get('/products', {
    params: { category: categoryName }
  });
  return response.data;
}

export async function getProductById(productId) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export default api;


