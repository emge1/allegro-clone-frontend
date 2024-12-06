import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/',
});

export const fetchSubcategoriesCategory = (categoryId) => {
  return axios.get(`http://127.0.0.1:8000/categories/${categoryId}/subcategories/`);
};

export const fetchProductsCategory = (categoryId) => {
  return axios.get(`http://127.0.0.1:8000/categories/${categoryId}/products/`);
};

export default api;
