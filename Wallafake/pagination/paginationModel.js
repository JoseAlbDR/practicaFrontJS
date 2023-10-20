import { customFetch } from '../utils/index.js';

export const getNumProducts = async (params) => {
  const nameParam = new URLSearchParams(params).toString();
  const endPoint = params.name ? `/api/products?${nameParam}` : '/api/products';

  console.log(endPoint);
  const products = await customFetch.get(endPoint);
  return products.length;
};
