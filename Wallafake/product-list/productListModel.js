import { customFetch } from '../utils/index.js';

export const getProducts = async () => {
  const endPoint = '/api/products?_expand=user';

  const products = await customFetch.get(endPoint);
  return products;
};
