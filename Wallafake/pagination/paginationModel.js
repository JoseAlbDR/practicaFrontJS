import { customFetch } from '../utils/index.js';

export const getNumProducts = async () => {
  const endPoint = `/api/products`;
  const products = await customFetch.get(endPoint);
  return products.length;
};
