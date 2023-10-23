import { RESOURCE_ENDPOINT } from '../config/const.js';
import { customFetch } from '../utils/index.js';

export const getProduct = async (id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}?_expand=user`;
  const product = await customFetch.get(url);
  return product;
};

export const deleteProduct = async (id) => {
  const url = `${RESOURCE_ENDPOINT}/${id}`;
  await customFetch.delete(url);
};
