import { customFetch } from '../utils/index.js';

export const createProduct = async (product, token) => {
  const url = '/api/products';

  await customFetch.post(url, { body: product, auth: `Bearer ${token}` });
};
