import { customFetch } from '../utils/index.js';

export const getNumProducts = async (params) => {
  const endPoint = params?.name
    ? `/api/products?name=${params.name}`
    : '/api/products';

  const products = await customFetch.get(endPoint);
  return products.length;
};
