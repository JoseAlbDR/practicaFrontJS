import { customFetch } from '../utils/index.js';

export const getProduct = async (id) => {
  const url = `/api/products/${id}?_expand=user`;
  const product = await customFetch.get(url);
  return product;
};

export const deleteProduct = async (id) => {
  const url = `/api/products/${id}`;
  await customFetch.delete(url);
};
