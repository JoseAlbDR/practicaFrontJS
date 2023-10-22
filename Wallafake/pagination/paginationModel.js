import { customFetch } from '../utils/index.js';

export const getNumProducts = async (params) => {
  const endPoint = params?.name
    ? `/api/products?name=${params.name}`
    : '/api/products';

  try {
    const products = await customFetch.get(endPoint);
    return products.length;
  } catch (error) {
    throw error;
  }
};
