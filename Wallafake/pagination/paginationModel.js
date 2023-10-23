import { customFetch } from '../utils/index.js';

export const getNumProducts = async (params) => {
  const searchParams = new URLSearchParams(params);

  const endPoint = `/api/products?${searchParams.toString()}`;

  try {
    const products = await customFetch.get(endPoint);
    return products.length;
  } catch (error) {
    throw error;
  }
};
